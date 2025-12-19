# =============================================================================
# Production Environment Configuration
# =============================================================================
# This file instantiates the shared infrastructure stack for the 'prod' environment.
# It applies high-availability configurations, zone redundancy, and larger SKUs
# to meet the strict SLAs (99.9% uptime) and performance requirements (RTO < 4h).
# =============================================================================

terraform {
  backend "azurerm" {}
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.116.0"
    }
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = true # Protect production resources
    }
    key_vault {
      purge_soft_delete_on_destroy = false # Recoverable secrets
      recover_soft_deleted_key_vaults = true
    }
    postgresql_flexible_server {
      restart_server_on_configuration_value_change = true
      swap_with_primary_acknowledge_enabled        = true
    }
  }
}

# -----------------------------------------------------------------------------
# Infrastructure Stack Instantiation
# -----------------------------------------------------------------------------
module "warranty_hub_prod" {
  source = "../../infrastructure"

  # ---------------------------------------------------------------------------
  # Global Settings
  # ---------------------------------------------------------------------------
  project_name   = var.project_name
  environment    = "prod"
  location       = var.location
  location_short = var.location_short

  # ---------------------------------------------------------------------------
  # Networking
  # ---------------------------------------------------------------------------
  # Production uses a larger CIDR block to support scaling
  vnet_address_space = ["10.100.0.0/16"]
  subnets            = var.subnets

  # ---------------------------------------------------------------------------
  # Compute (AKS)
  # ---------------------------------------------------------------------------
  # Scaled for high availability and performance (REQ-PERF-001)
  # Uses Standard tier VMs for stable performance
  aks_node_count     = 3
  aks_min_node_count = 3
  aks_max_node_count = 10 # Supports REQ-SCAL-001 auto-scaling
  aks_vm_size        = "Standard_D4s_v5" 

  # ---------------------------------------------------------------------------
  # Data & Persistence
  # ---------------------------------------------------------------------------
  # Database: General Purpose, High Availability, Geo-Redundancy (REQ-REL-001)
  db_sku_name             = "GP_Standard_D4s_v3"
  db_storage_mb           = 524288 # 512 GB start
  db_geo_redundant_backup = true

  # Storage: Geo-Zone-Redundant Storage for max durability (REQ-REL-001)
  storage_replication_type = "GZRS"
  storage_containers       = var.storage_containers

  # Redis: Standard tier (SLA supported, Replication enabled)
  redis_sku_name = "Standard"
  redis_family   = "C"
  redis_capacity = 2 # 2.5GB cache

  # ---------------------------------------------------------------------------
  # Services
  # ---------------------------------------------------------------------------
  servicebus_sku    = "Standard" # or "Premium" if JMS or specific isolation needed
  servicebus_queues = var.servicebus_queues
  servicebus_topics = var.servicebus_topics
  
  acr_sku           = "Premium" # Supports Geo-replication if needed for DR
  
  log_retention_days = 365 # 1 year retention for Audit logs (REQ-AUDIT-001)
}