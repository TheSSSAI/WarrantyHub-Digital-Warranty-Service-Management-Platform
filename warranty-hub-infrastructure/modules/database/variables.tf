variable "server_name" {
  type        = string
  description = "Name of the PostgreSQL server."
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
  description = "SKU Name for the DB (e.g., GP_Standard_D4s_v3)."
}

variable "storage_mb" {
  type        = number
  description = "Storage capacity in MB."
}

variable "admin_username" {
  type        = string
  description = "Administrator username."
  default     = "psqladmin"
}

variable "admin_password" {
  type        = string
  description = "Administrator password."
  sensitive   = true
}

variable "geo_redundant_backup_enabled" {
  type        = bool
  description = "Enable Geo-Redundant backups (Req: REQ-REL-001)."
  default     = false
}

variable "delegated_subnet_id" {
  type        = string
  description = "ID of the subnet delegated to PostgreSQL Flexible Server."
}

variable "private_dns_zone_id" {
  type        = string
  description = "ID of the Private DNS Zone for PostgreSQL."
}

variable "tags" {
  type        = map(string)
  description = "Tags."
  default     = {}
}