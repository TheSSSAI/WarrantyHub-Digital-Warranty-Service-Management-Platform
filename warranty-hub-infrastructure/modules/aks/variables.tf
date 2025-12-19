variable "cluster_name" {
  type        = string
  description = "Name of the AKS cluster."
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name."
}

variable "location" {
  type        = string
  description = "Azure region."
}

variable "dns_prefix" {
  type        = string
  description = "DNS prefix for the cluster."
}

variable "node_count" {
  type        = number
  description = "Initial node count."
  default     = 1
}

variable "min_node_count" {
  type        = number
  description = "Minimum node count for autoscaling."
  default     = 1
}

variable "max_node_count" {
  type        = number
  description = "Maximum node count for autoscaling."
  default     = 3
}

variable "vm_size" {
  type        = string
  description = "Virtual machine size for the node pool."
  default     = "Standard_B2s"
}

variable "vnet_subnet_id" {
  type        = string
  description = "Subnet ID for the node pool (Azure CNI)."
}

variable "log_analytics_workspace_id" {
  type        = string
  description = "Log Analytics Workspace ID for container insights."
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply."
  default     = {}
}