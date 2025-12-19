output "id" {
  value       = azurerm_redis_cache.this.id
  description = "The ID of the Redis Cache."
}

output "hostname" {
  value       = azurerm_redis_cache.this.hostname
  description = "The hostname of the Redis Cache."
}

output "ssl_port" {
  value       = azurerm_redis_cache.this.ssl_port
  description = "The SSL port of the Redis Cache."
}

output "primary_connection_string" {
  value       = azurerm_redis_cache.this.primary_connection_string
  description = "The primary connection string."
  sensitive   = true
}