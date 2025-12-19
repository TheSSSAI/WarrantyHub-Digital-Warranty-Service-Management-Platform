variable "registry_name" {
  type        = string
  description = "Name of the Container Registry."
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name."
}

variable "location" {
  type        = string
  description = "Azure region."
}

variable "sku" {
  type        = string
  description = "The SKU of the Container Registry (Basic, Standard, Premium)."
  default     = "Standard"
  validation {
    condition     = contains(["Basic", "Standard", "Premium"], var.sku)
    error_message = "SKU must be Basic, Standard, or Premium."
  }
}

variable "admin_enabled" {
  type        = bool
  description = "Enable admin user."
  default     = false
}

variable "tags" {
  type        = map(string)
  description = "Tags."
  default     = {}
}