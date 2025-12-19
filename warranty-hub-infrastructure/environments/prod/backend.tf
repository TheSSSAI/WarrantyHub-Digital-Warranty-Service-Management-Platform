terraform {
  backend "azurerm" {
    resource_group_name  = "rg-warrantyhub-tfstate-prod"
    storage_account_name = "stwhubtfstateprod"
    container_name       = "tfstate"
    key                  = "warrantyhub.prod.tfstate"
    use_oidc             = true
  }
}