output "id" {
  value       = azurerm_cognitive_account.this.id
  description = "The ID of the Cognitive Services Account."
}

output "endpoint" {
  value       = azurerm_cognitive_account.this.endpoint
  description = "The endpoint URL."
}

output "primary_access_key" {
  value       = azurerm_cognitive_account.this.primary_access_key
  description = "The primary access key."
  sensitive   = true
}