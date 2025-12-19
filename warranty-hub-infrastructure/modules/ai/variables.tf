variable "account_name" {
  type        = string
  description = "Name of the Cognitive Services Account."
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name."
}

variable "location" {
  type        = string
  description = "Azure region."
}

variable "sku_name" {
  type        = string
  description = "SKU for the service (e.g., S0)."
  default     = "S0"
}

variable "tags" {
  type        = map(string)
  description = "Tags."
  default     = {}
}