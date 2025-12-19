output "vnet_id" {
  value       = azurerm_virtual_network.this.id
  description = "The ID of the Virtual Network."
}

output "vnet_name" {
  value       = azurerm_virtual_network.this.name
  description = "The name of the Virtual Network."
}

output "subnet_ids" {
  value       = { for k, v in azurerm_subnet.this : k => v.id }
  description = "Map of Subnet IDs."
}

output "vnet_address_space" {
  value       = azurerm_virtual_network.this.address_space
  description = "The address space of the Virtual Network."
}