terraform {
  backend "azurerm" {
    resource_group_name  = "rg-warrantyhub-tfstate-dev"
    storage_account_name = "stwhubtfstatedev"
    container_name       = "tfstate"
    key                  = "warrantyhub.dev.tfstate"
    use_oidc             = true
  }
}