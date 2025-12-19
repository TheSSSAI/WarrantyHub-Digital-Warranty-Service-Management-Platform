# ---------------------------------------------------------------------------------------------------------------------
# AZURE CONTAINER REGISTRY (ACR)
# Stores Docker images for the Warranty Hub microservices.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_container_registry" "this" {
  name                = var.acr_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = var.sku # Standard or Premium recommended for prod
  admin_enabled       = false   # Best practice: use Managed Identity / Service Principal

  # Geo-replication for Disaster Recovery (REQ-REL-001)
  # Only available in Premium SKU
  dynamic "georeplications" {
    for_each = var.sku == "Premium" && var.georeplication_location != null ? [1] : []
    content {
      location                = var.georeplication_location
      zone_redundancy_enabled = true
      tags                    = var.tags
    }
  }

  # Network Rule Set (Only for Premium SKU)
  # Restrict access to specific IPs or Subnets
  dynamic "network_rule_set" {
    for_each = var.sku == "Premium" ? [1] : []
    content {
      default_action = "Deny"
      # ip_rule { ... }
      # virtual_network { ... }
    }
  }

  tags = var.tags
}