provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy    = false
      recover_soft_deleted_key_vaults = true
    }
    # Production safeguards
    resource_group {
      prevent_deletion_if_contains_resources = true
    }
  }
  subscription_id = var.subscription_id
  environment     = "public"
  use_oidc        = true
}

provider "azuread" {
  use_oidc = true
}