output "account_id" {
  value       = azurerm_storage_account.this.id
  description = "The ID of the Storage Account."
}

output "account_name" {
  value       = azurerm_storage_account.this.name
  description = "The name of the Storage Account."
}

output "primary_connection_string" {
  value       = azurerm_storage_account.this.primary_connection_string
  description = "The primary connection string."
  sensitive   = true
}

output "primary_blob_endpoint" {
  value       = azurerm_storage_account.this.primary_blob_endpoint
  description = "The endpoint URL for blob storage."
}