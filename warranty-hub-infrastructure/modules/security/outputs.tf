output "vault_id" {
  value       = azurerm_key_vault.this.id
  description = "The ID of the Key Vault."
}

output "vault_uri" {
  value       = azurerm_key_vault.this.vault_uri
  description = "The URI of the Key Vault."
}