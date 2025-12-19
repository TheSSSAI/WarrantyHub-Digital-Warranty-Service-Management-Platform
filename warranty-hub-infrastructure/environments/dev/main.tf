# =============================================================================
# Development Environment Configuration
# =============================================================================
# This file instantiates the shared infrastructure stack for the 'dev' environment.
# It uses the variables defined in `variables.tf` and values from `terraform.tfvars`
# to configure the stack with cost-effective, lower-tier resources suitable for
# development and testing.
# =============================================================================

terraform {
  # Backend configuration is partial; specific keys are passed at init time
  # via the `-backend-config` CLI parameter or a separate backend.conf file.
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
      prevent_deletion_if_contains_resources = false # Allow easier teardown in dev
    }
    key_vault {
      purge_soft_delete_on_destroy = true # Allow immediate re-creation in dev
    }
  }
  
  # In Dev, we might want to skip registration of providers to speed up apply
  # if they are already registered in the subscription.
  skip_provider_registration = true
}

# -----------------------------------------------------------------------------
# Infrastructure Stack Instantiation
# -----------------------------------------------------------------------------
module "warranty_hub_dev" {
  source = "../../infrastructure"

  # ---------------------------------------------------------------------------
  # Global Settings
  # ---------------------------------------------------------------------------
  project_name   = var.project_name
  environment    = "dev"
  location       = var.location
  location_short = var.location_short

  # ---------------------------------------------------------------------------
  # Networking
  # ---------------------------------------------------------------------------
  # Dev uses a smaller CIDR block
  vnet_address_space = ["10.0.0.0/16"]
  subnets            = var.subnets

  # ---------------------------------------------------------------------------
  # Compute (AKS)
  # ---------------------------------------------------------------------------
  # Scaled down for cost efficiency
  aks_node_count     = 1
  aks_min_node_count = 1
  aks_max_node_count = 3
  aks_vm_size        = "Standard_B2s" # Burstable generic workload

  # ---------------------------------------------------------------------------
  # Data & Persistence
  # ---------------------------------------------------------------------------
  # Database: Burstable tier, no geo-redundancy
  db_sku_name             = "B_Standard_B1ms"
  db_storage_mb           = 32768
  db_geo_redundant_backup = false

  # Storage: Local redundancy only
  storage_replication_type = "LRS"
  storage_containers       = var.storage_containers

  # Redis: Basic tier (no SLA, no replication)
  redis_sku_name = "Basic"
  redis_family   = "C"
  redis_capacity = 0 # 250MB cache

  # ---------------------------------------------------------------------------
  # Services
  # ---------------------------------------------------------------------------
  servicebus_sku    = "Standard" # No Topics support in Basic, must use Standard
  servicebus_queues = var.servicebus_queues
  servicebus_topics = var.servicebus_topics
  
  acr_sku           = "Basic"
  
  log_retention_days = 30
}