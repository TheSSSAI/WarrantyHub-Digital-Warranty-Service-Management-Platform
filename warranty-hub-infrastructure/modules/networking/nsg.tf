# ---------------------------------------------------------------------------------------------------------------------
# NETWORK SECURITY GROUPS (NSG)
# Implements zero-trust networking principles by default.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_network_security_group" "this" {
  for_each = var.subnets

  name                = "${each.key}-nsg"
  location            = var.location
  resource_group_name = var.resource_group_name
  tags                = var.tags
}

# ---------------------------------------------------------------------------------------------------------------------
# NSG RULES - BASELINE
# Allow intra-VNet traffic and Deny all other inbound by default (via Azure default rules).
# We add specific rules here if defined in variables, or establish a secure baseline.
# ---------------------------------------------------------------------------------------------------------------------

# Example: Allow HTTPS Inbound for Application Gateway Subnet (if identifiable)
resource "azurerm_network_security_rule" "https_inbound" {
  for_each = {
    for k, v in var.subnets : k => v
    if length(regexall(".*gateway.*", k)) > 0
  }

  name                        = "AllowHTTPSInbound"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "443"
  source_address_prefix       = "Internet"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.this[each.key].name
}

# Example: Allow GatewayManager for Application Gateway
resource "azurerm_network_security_rule" "gateway_manager" {
  for_each = {
    for k, v in var.subnets : k => v
    if length(regexall(".*gateway.*", k)) > 0
  }

  name                        = "AllowGatewayManager"
  priority                    = 110
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "65200-65535"
  source_address_prefix       = "GatewayManager"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.this[each.key].name
}

# ---------------------------------------------------------------------------------------------------------------------
# SUBNET ASSOCIATION
# Attach NSGs to their respective subnets.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_subnet_network_security_group_association" "this" {
  for_each = var.subnets

  subnet_id                 = azurerm_subnet.this[each.key].id
  network_security_group_id = azurerm_network_security_group.this[each.key].id
}