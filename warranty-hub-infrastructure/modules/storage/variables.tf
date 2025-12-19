variable "account_name" {
  type        = string
  description = "Name of the storage account. Must be globally unique."
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name."
}

variable "location" {
  type        = string
  description = "Azure region."
}

variable "replication_type" {
  type        = string
  description = "Defines the type of replication to use (LRS, GRS, RA-GRS)."
  validation {
    condition     = contains(["LRS", "GRS", "ZRS", "GZRS"], var.replication_type)
    error_message = "Replication type must be one of LRS, GRS, ZRS, or GZRS."
  }
}

variable "account_tier" {
  type        = string
  description = "Defines the Tier to use for this storage account (Standard or Premium)."
  default     = "Standard"
}

variable "containers" {
  type        = map(object({
    access_type = string
  }))
  description = "Map of containers to create and their access levels."
  default     = {}
}

variable "enable_retention_policy" {
  type        = bool
  description = "Enable soft delete retention policy."
  default     = true
}

variable "tags" {
  type        = map(string)
  description = "Tags."
  default     = {}
}