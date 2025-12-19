variable "resource_group_name" {
  type        = string
  description = "Name of the resource group."
}

variable "location" {
  type        = string
  description = "Azure region for deployment."
}

variable "vnet_name" {
  type        = string
  description = "Name of the Virtual Network."
}

variable "address_space" {
  type        = list(string)
  description = "The address space that is used the virtual network."
  validation {
    condition     = length(var.address_space) > 0
    error_message = "The address_space list must not be empty."
  }
}

variable "subnets" {
  type = map(object({
    address_prefixes  = list(string)
    service_endpoints = optional(list(string))
    delegation_name   = optional(string)
  }))
  description = "Map of subnet configurations. Key is subnet name."
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to resources."
  default     = {}
}