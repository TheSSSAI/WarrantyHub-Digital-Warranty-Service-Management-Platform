# =============================================================================
# WarrantyHub Infrastructure Composition Root
# =============================================================================
# This is the primary orchestration module that composes all lower-level modules
# into a cohesive infrastructure stack. It manages the lifecycle of the Resource Group,
# generates secure credentials, and wires dependencies between networking, data,
# compute, and security components.
# =============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.116.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 3.0.0"
    }
  }
}

# -----------------------------------------------------------------------------
# Data Sources & Local Variables
# -----------------------------------------------------------------------------
data "azurerm_client_config" "current" {}

locals {
  # Standardized naming convention for the resource group
  resource_group_name = "rg-${var.project_name}-${var.environment}-${var.location_short}"
  
  # Common tags applied to all resources for billing and governance
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "DevOps"
  }
}

# -----------------------------------------------------------------------------
# Core Resource Group
# -----------------------------------------------------------------------------
resource "azurerm_resource_group" "main" {
  name     = local.resource_group_name
  location = var.location
  tags     = local.common_tags
}

# -----------------------------------------------------------------------------
# Secret Generation
# -----------------------------------------------------------------------------
# Generate secure, random passwords for infrastructure components.
# These are never output to console, only stored in Key Vault.

resource "random_password" "db_admin_password" {
  length           = 24
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "random_password" "redis_password" {
  count            = 0 # Redis creates its own keys, but this placeholder is kept for custom auth scenarios
  length           = 24
  special          = true
}

# -----------------------------------------------------------------------------
# Module: Networking
# -----------------------------------------------------------------------------
# Deploys the Virtual Network, Subnets, and Network Security Groups (NSGs).
# Serves as the foundation for all VNet-injected resources (AKS, DB, Redis).

module "networking" {
  source = "../modules/networking"

  vnet_name           = "vnet-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  address_space       = var.vnet_address_space
  subnets             = var.subnets
  tags                = local.common_tags
}

# -----------------------------------------------------------------------------
# Module: Monitoring
# -----------------------------------------------------------------------------
# Deploys Log Analytics and Application Insights.
# Required early for AKS diagnostics and application telemetry.

module "monitoring" {
  source = "../modules/monitoring"

  workspace_name      = "law-${var.project_name}-${var.environment}"
  app_insights_name   = "appi-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  retention_in_days   = var.log_retention_days
  tags                = local.common_tags
}

# -----------------------------------------------------------------------------
# Module: Security (Key Vault)
# -----------------------------------------------------------------------------
# Deploys Azure Key Vault for secret management.
# Dependencies: Networking (for Private Link - if enabled in module), Client Config.

module "security" {
  source = "../modules/security"

  vault_name          = "kv-${var.project_name}-${var.environment}-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  object_id           = data.azurerm_client_config.current.object_id
  tags                = local.common_tags

  # Ensure networking is ready before provisioning secure endpoints
  depends_on = [module.networking]
}

# Random suffix for global uniqueness of Key Vault URL
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# -----------------------------------------------------------------------------
# Module: Registry (ACR)
# -----------------------------------------------------------------------------
# Deploys Azure Container Registry for storing Docker images.

module "registry" {
  source = "../modules/registry"

  acr_name            = "acr${var.project_name}${var.environment}${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = var.acr_sku
  tags                = local.common_tags
}

# -----------------------------------------------------------------------------
# Module: Storage
# -----------------------------------------------------------------------------
# Deploys Storage Accounts for invoices, images, and audit logs.
# Enforces WORM compliance for audit logs via module configuration.

module "storage" {
  source = "../modules/storage"

  account_name            = "st${var.project_name}${var.environment}${random_string.suffix.result}"
  resource_group_name     = azurerm_resource_group.main.name
  location                = azurerm_resource_group.main.location
  replication_type        = var.storage_replication_type
  containers              = var.storage_containers
  enable_retention_policy = true
  tags                    = local.common_tags
}

# -----------------------------------------------------------------------------
# Module: Database (PostgreSQL)
# -----------------------------------------------------------------------------
# Deploys PostgreSQL Flexible Server with PostGIS extension.
# Injects into the delegated database subnet defined in networking.

module "database" {
  source = "../modules/database"

  server_name                  = "psql-${var.project_name}-${var.environment}"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  sku_name                     = var.db_sku_name
  storage_mb                   = var.db_storage_mb
  admin_username               = "psqladmin"
  admin_password               = random_password.db_admin_password.result
  version                      = "16"
  geo_redundant_backup_enabled = var.db_geo_redundant_backup
  
  # Network Integration
  vnet_id             = module.networking.vnet_id
  delegated_subnet_id = module.networking.subnet_ids["database"]
  
  # Secret Management integration
  key_vault_id = module.security.vault_id
  
  tags = local.common_tags

  depends_on = [module.networking, module.security]
}

# -----------------------------------------------------------------------------
# Module: Redis Cache
# -----------------------------------------------------------------------------
# Deploys Azure Cache for Redis for application caching and SignalR backplane.

module "redis" {
  source = "../modules/redis"

  cache_name          = "redis-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku_name            = var.redis_sku_name
  family              = var.redis_family
  capacity            = var.redis_capacity
  subnet_id           = module.networking.subnet_ids["data"] # Or specific redis subnet if architected
  
  tags = local.common_tags
}

# -----------------------------------------------------------------------------
# Module: Messaging (Service Bus)
# -----------------------------------------------------------------------------
# Deploys Service Bus Namespace, Topics, and Queues for event-driven architecture.

module "messaging" {
  source = "../modules/messaging"

  namespace_name      = "sb-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = var.servicebus_sku
  queues              = var.servicebus_queues
  topics              = var.servicebus_topics
  
  tags = local.common_tags
}

# -----------------------------------------------------------------------------
# Module: AI (Document Intelligence)
# -----------------------------------------------------------------------------
# Deploys Azure AI Services for OCR processing of invoices.

module "ai" {
  source = "../modules/ai"

  account_name        = "ai-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku_name            = "S0"
  
  tags = local.common_tags
}

# -----------------------------------------------------------------------------
# Module: AKS (Compute)
# -----------------------------------------------------------------------------
# Deploys the Kubernetes cluster.
# This module is last as it depends on networking, registry, and monitoring.

module "aks" {
  source = "../modules/aks"

  cluster_name               = "aks-${var.project_name}-${var.environment}"
  resource_group_name        = azurerm_resource_group.main.name
  location                   = azurerm_resource_group.main.location
  dns_prefix                 = "${var.project_name}-${var.environment}"
  
  # Scaling Configuration (REQ-SCAL-001)
  node_count                 = var.aks_node_count
  min_node_count             = var.aks_min_node_count
  max_node_count             = var.aks_max_node_count
  vm_size                    = var.aks_vm_size
  
  # Network Integration
  vnet_subnet_id             = module.networking.subnet_ids["aks"]
  
  # Integrations
  log_analytics_workspace_id = module.monitoring.workspace_id
  
  tags = local.common_tags

  depends_on = [module.networking, module.monitoring]
}

# -----------------------------------------------------------------------------
# Post-Deployment Configuration
# -----------------------------------------------------------------------------
# Assign ACR Pull role to AKS Kubelet identity
resource "azurerm_role_assignment" "aks_acr_pull" {
  principal_id                     = module.aks.kubelet_identity_id
  role_definition_name             = "AcrPull"
  scope                            = module.registry.id
  skip_service_principal_aad_check = true
}