output "id" {
  value       = azurerm_container_registry.this.id
  description = "The ID of the Container Registry."
}

output "login_server" {
  value       = azurerm_container_registry.this.login_server
  description = "The URL of the Container Registry."
}

output "admin_username" {
  value       = azurerm_container_registry.this.admin_username
  description = "The admin username (if enabled)."
}

output "admin_password" {
  value       = azurerm_container_registry.this.admin_password
  description = "The admin password (if enabled)."
  sensitive   = true
}