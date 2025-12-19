# ---------------------------------------------------------------------------------------------------------------------
# LOG ANALYTICS WORKSPACE
# Centralized logging repository for all Azure resources and AKS container logs.
# Critical for REQ-AUDIT-001 (Audit Trail) and system observability.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_log_analytics_workspace" "this" {
  name                = var.workspace_name
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "PerGB2018"
  retention_in_days   = 30 # Adjust based on compliance requirements (e.g., 365 for audit)

  tags = var.tags
}

# ---------------------------------------------------------------------------------------------------------------------
# APPLICATION INSIGHTS
# APM for backend services and frontend applications.
# Linked to Log Analytics Workspace for unified querying.
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_application_insights" "this" {
  name                = var.app_insights_name
  location            = var.location
  resource_group_name = var.resource_group_name
  workspace_id        = azurerm_log_analytics_workspace.this.id
  application_type    = "web"

  tags = var.tags
}

# ---------------------------------------------------------------------------------------------------------------------
# DIAGNOSTIC SETTINGS (Optional Generic Example)
# Can be applied to specific resources to route logs to this workspace.
# ---------------------------------------------------------------------------------------------------------------------
# resource "azurerm_monitor_diagnostic_setting" "example" {
#   name                       = "example-diag"
#   target_resource_id         = var.target_resource_id
#   log_analytics_workspace_id = azurerm_log_analytics_workspace.this.id
#   ...
# }