variable "subscription_id" {
  type        = string
  description = "The Azure Subscription ID where resources will be deployed."
}

variable "environment" {
  type        = string
  description = "The deployment environment (e.g., dev, staging, prod)."
  default     = "dev"
}

variable "location" {
  type        = string
  description = "The Azure Region where resources will be deployed."
  default     = "eastus"
}

variable "project_name" {
  type        = string
  description = "The name of the project, used for resource naming."
  default     = "warrantyhub"
}

# --- Module Specific Overrides ---

variable "vnet_address_space" {
  type        = list(string)
  description = "CIDR block for the Virtual Network."
  default     = ["10.0.0.0/16"]
}

variable "aks_node_count" {
  type        = number
  description = "Initial number of nodes for the AKS cluster."
  default     = 2
}

variable "db_sku_name" {
  type        = string
  description = "SKU for PostgreSQL Database."
  default     = "B_Standard_B1ms"
}