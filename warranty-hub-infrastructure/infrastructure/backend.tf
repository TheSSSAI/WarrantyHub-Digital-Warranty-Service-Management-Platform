# Global Backend Configuration
# Specific bucket/container details are injected via partial configuration at init time
# or defined in environment-specific backend files.

terraform {
  backend "azurerm" {
    # The resource_group_name, storage_account_name, container_name, and key
    # are provided during 'terraform init' via -backend-config options or 
    # environment specific files to support multi-environment state management.
    use_oidc = true
  }
}