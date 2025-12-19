# ---------------------------------------------------------------------------------------------------------------------
# VIRTUAL NETWORK
# Defines the core network boundary for the Warranty Hub platform.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_virtual_network" "this" {
  name                = var.vnet_name
  location            = var.location
  resource_group_name = var.resource_group_name
  address_space       = var.address_space
  tags                = var.tags

  lifecycle {
    ignore_changes = [tags]
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# SUBNETS
# Creates subnets dynamically based on the input map.
# Supports delegation for PaaS services (e.g., PostgreSQL Flexible Server).
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_subnet" "this" {
  for_each = var.subnets

  name                 = each.key
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = each.value.address_prefixes

  # Control private endpoint network policies (Enabled/Disabled)
  private_endpoint_network_policies_enabled     = try(each.value.private_endpoint_network_policies_enabled, true)
  private_link_service_network_policies_enabled = try(each.value.private_link_service_network_policies_enabled, true)

  # Service Endpoints for direct PaaS access where Private Link isn't used or as a backup
  service_endpoints = try(each.value.service_endpoints, [])

  # Dynamic delegation block for services requiring subnet delegation (e.g., PostgreSQL)
  dynamic "delegation" {
    for_each = try(each.value.delegation, null) != null ? [each.value.delegation] : []

    content {
      name = delegation.value.name
      service_delegation {
        name    = delegation.value.service_delegation.name
        actions = try(delegation.value.service_delegation.actions, [])
      }
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# ROUTE TABLE
# Basic route table to route traffic to the internet or virtual appliances.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_route_table" "this" {
  name                = "${var.vnet_name}-rt"
  location            = var.location
  resource_group_name = var.resource_group_name
  tags                = var.tags

  route {
    name           = "default-internet"
    address_prefix = "0.0.0.0/0"
    next_hop_type  = "Internet"
  }
}

# Associate Route Table with Subnets (excluding delegated subnets if they don't support it)
resource "azurerm_subnet_route_table_association" "this" {
  for_each = {
    for k, v in var.subnets : k => v
    if try(v.associate_route_table, true)
  }

  subnet_id      = azurerm_subnet.this[each.key].id
  route_table_id = azurerm_route_table.this.id
}