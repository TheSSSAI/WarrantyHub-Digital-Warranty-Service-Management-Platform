output "namespace_id" {
  value       = azurerm_servicebus_namespace.this.id
  description = "The ID of the Service Bus Namespace."
}

output "namespace_name" {
  value       = azurerm_servicebus_namespace.this.name
  description = "The name of the Service Bus Namespace."
}

output "primary_connection_string" {
  value       = azurerm_servicebus_namespace.this.default_primary_connection_string
  description = "Primary connection string for the Service Bus Namespace."
  sensitive   = true
}