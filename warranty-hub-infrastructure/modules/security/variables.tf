variable "vault_name" {
  type        = string
  description = "Name of the Key Vault."
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name."
}

variable "location" {
  type        = string
  description = "Azure region."
}

variable "tenant_id" {
  type        = string
  description = "The Azure AD Tenant ID."
}

variable "sku_name" {
  type        = string
  description = "The SKU name for the Key Vault (standard or premium)."
  default     = "standard"
}

variable "tags" {
  type        = map(string)
  description = "Tags."
  default     = {}
}