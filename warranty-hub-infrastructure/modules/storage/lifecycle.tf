# ---------------------------------------------------------------------------------------------------------------------
# STORAGE LIFECYCLE MANAGEMENT
# Automates data tiering to optimize costs (e.g., Hot -> Cool -> Archive).
# Essential for long-term retention of invoices and logs (7 years).
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_storage_management_policy" "this" {
  count = var.enable_retention_policy ? 1 : 0

  storage_account_id = azurerm_storage_account.this.id

  rule {
    name    = "archive-old-data"
    enabled = true
    filters {
      prefix_match = ["invoices", "audit-logs"]
      blob_types   = ["blockBlob"]
    }
    actions {
      base_blob {
        tier_to_cool_after_days_since_modification_greater_than    = 30
        tier_to_archive_after_days_since_modification_greater_than = 90
        delete_after_days_since_modification_greater_than          = 2555 # 7 years
      }
      snapshot {
        delete_after_days_since_creation_greater_than = 90
      }
    }
  }
}