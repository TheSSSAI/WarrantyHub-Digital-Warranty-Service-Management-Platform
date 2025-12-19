variable "cache_name" {
  type        = string
  description = "Name of the Redis Cache."
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
  description = "The SKU of Redis to use (Basic, Standard, Premium)."
  default     = "Basic"
}

variable "family" {
  type        = string
  description = "The SKU family (C or P)."
  default     = "C"
}

variable "capacity" {
  type        = number
  description = "The size of the Redis cache to deploy."
  default     = 0
}

variable "tags" {
  type        = map(string)
  description = "Tags."
  default     = {}
}