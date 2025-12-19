# ---------------------------------------------------------------------------------------------------------------------
# DATA SOURCES
# Retrieve current client configuration for tenant ID.
# ---------------------------------------------------------------------------------------------------------------------
data "azurerm_client_config" "current" {}

# ---------------------------------------------------------------------------------------------------------------------
# AZURE KEY VAULT
# Secure store for secrets, keys, and certificates.
# Enforces RBAC authorization for zero-trust access management.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_key_vault" "this" {
  name                = var.vault_name
  location            = var.location
  resource_group_name = var.resource_group_name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"

  # Security Features
  enabled_for_disk_encryption = true
  enabled_for_deployment      = false # Set true if VM deployment is needed
  enabled_for_template_deployment = false
  
  # Enable RBAC for granular access control instead of Access Policies
  enable_rbac_authorization = true

  # Recovery features (Soft Delete is mandatory in Azure now, but we configure retention)
  soft_delete_retention_days = 90
  purge_protection_enabled   = true

  # Networking
  # In a strict zero-trust environment, we would set default_action to "Deny"
  # and allow only specific IPs or Virtual Networks.
  network_acls {
    bypass         = "AzureServices"
    default_action = "Allow" # Should be Deny in Prod with private endpoints configured
    # ip_rules       = var.allowed_ip_ranges
    # virtual_network_subnet_ids = var.allowed_subnet_ids
  }

  tags = var.tags
}

# ---------------------------------------------------------------------------------------------------------------------
# KEY VAULT SECRET (Example)
# Placeholder for initial infrastructure secrets if needed.
# Real application secrets should be injected via pipeline or generated dynamically.
# ---------------------------------------------------------------------------------------------------------------------
# resource "azurerm_key_vault_secret" "example" {
#   name         = "example-secret"
#   value        = "s3cr3t"
#   key_vault_id = azurerm_key_vault.this.id
# }