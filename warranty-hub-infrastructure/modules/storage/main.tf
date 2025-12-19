# ---------------------------------------------------------------------------------------------------------------------
# STORAGE ACCOUNT
# Primary storage for unstructured data (Invoices, Images, Audit Logs).
# Supports REQ-REL-001 (DR) via replication strategy.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_storage_account" "this" {
  name                     = var.account_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = var.replication_type # LRS, GRS, or GZRS
  account_kind             = "StorageV2"
  min_tls_version          = "TLS1_2"

  # Security settings
  allow_nested_items_to_be_public = false
  shared_access_key_enabled       = true # Consider disabling if using pure RBAC
  # public_network_access_enabled = false # Enable for Private Link only

  blob_properties {
    versioning_enabled       = true
    change_feed_enabled      = true
    last_access_time_enabled = true

    delete_retention_policy {
      days = 7
    }
    
    container_delete_retention_policy {
      days = 7
    }
  }

  tags = var.tags
}

# ---------------------------------------------------------------------------------------------------------------------
# STORAGE CONTAINERS
# Dynamically creates containers based on input map (e.g., invoices, images).
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_storage_container" "this" {
  for_each = var.containers

  name                  = each.key
  storage_account_name  = azurerm_storage_account.this.name
  container_access_type = try(each.value.access_type, "private")
}

# ---------------------------------------------------------------------------------------------------------------------
# IMMUTABILITY POLICY (WORM)
# Specifically for Audit Logs container to satisfy REQ-AUDIT-001.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_storage_container_immutability_policy" "audit" {
  count = var.enable_audit_immutability ? 1 : 0

  storage_container_resource_manager_id = azurerm_storage_container.this["audit-logs"].resource_manager_id
  immutability_period_in_days           = 365 # 1 year retention
  protected_append_writes_all_enabled   = true
  protected_append_writes_request_types = ["All"]
}