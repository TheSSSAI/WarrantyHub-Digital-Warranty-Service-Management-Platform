variable "subscription_id" {
  type        = string
  description = "The Azure Subscription ID for Production."
}

variable "environment" {
  type        = string
  description = "The deployment environment."
  default     = "prod"
}

variable "location" {
  type        = string
  description = "The primary Azure Region for Production."
  default     = "eastus"
}

variable "secondary_location" {
  type        = string
  description = "The secondary Azure Region for Disaster Recovery."
  default     = "westus"
}

variable "project_name" {
  type        = string
  description = "The project name."
  default     = "warrantyhub"
}

# --- Module Specific Configuration ---
variable "db_password" {
  type        = string
  description = "Administrator password for PostgreSQL."
  sensitive   = true
}