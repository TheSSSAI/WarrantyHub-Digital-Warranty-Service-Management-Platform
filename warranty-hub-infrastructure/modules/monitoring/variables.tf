variable "workspace_name" {
  type        = string
  description = "Name of the Log Analytics Workspace."
}

variable "app_insights_name" {
  type        = string
  description = "Name of the Application Insights resource."
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name."
}

variable "location" {
  type        = string
  description = "Azure region."
}

variable "retention_in_days" {
  type        = number
  description = "Log retention period in days."
  default     = 30
}

variable "tags" {
  type        = map(string)
  description = "Tags."
  default     = {}
}