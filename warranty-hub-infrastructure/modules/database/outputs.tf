output "server_id" {
  value       = azurerm_postgresql_flexible_server.this.id
  description = "The ID of the PostgreSQL Flexible Server."
}

output "server_fqdn" {
  value       = azurerm_postgresql_flexible_server.this.fqdn
  description = "The Fully Qualified Domain Name of the server."
}

output "server_name" {
  value       = azurerm_postgresql_flexible_server.this.name
  description = "The name of the server."
}

output "admin_username" {
  value       = azurerm_postgresql_flexible_server.this.administrator_login
  description = "The administrator username."
}