output "workspace_id" {
  value       = azurerm_log_analytics_workspace.this.id
  description = "The ID of the Log Analytics Workspace."
}

output "workspace_customer_id" {
  value       = azurerm_log_analytics_workspace.this.workspace_id
  description = "The Workspace (Customer) ID."
}

output "app_insights_id" {
  value       = azurerm_application_insights.this.id
  description = "The ID of the Application Insights resource."
}

output "app_insights_connection_string" {
  value       = azurerm_application_insights.this.connection_string
  description = "The Connection String for Application Insights."
  sensitive   = true
}

output "app_insights_instrumentation_key" {
  value       = azurerm_application_insights.this.instrumentation_key
  description = "The Instrumentation Key for Application Insights."
  sensitive   = true
}