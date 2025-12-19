# ---------------------------------------------------------------------------------------------------------------------
# AZURE AI SERVICES (Cognitive Services)
# Specifically provisions resources for Document Intelligence (OCR) (REQ-DATA-001).
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_cognitive_account" "this" {
  name                = var.account_name
  location            = var.location
  resource_group_name = var.resource_group_name
  kind                = "FormRecognizer" # Specific kind for Document Intelligence
  sku_name            = var.sku_name     # e.g., S0

  # Security: Disable local auth if using AAD auth exclusively (recommended)
  # local_auth_enabled = false 

  # Networking
  public_network_access_enabled = true # Set to false if using Private Endpoints
  
  # Ensure identity is assigned for RBAC
  identity {
    type = "SystemAssigned"
  }

  tags = var.tags
}