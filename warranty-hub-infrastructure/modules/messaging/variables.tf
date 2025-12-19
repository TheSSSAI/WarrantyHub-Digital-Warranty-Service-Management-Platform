variable "namespace_name" {
  type        = string
  description = "Name of the Service Bus Namespace."
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
  description = "Defines the SKU to use (Basic, Standard, or Premium)."
  default     = "Standard"
  validation {
    condition     = contains(["Basic", "Standard", "Premium"], var.sku)
    error_message = "SKU must be Basic, Standard, or Premium."
  }
}

variable "queues" {
  type        = list(string)
  description = "List of queue names to create."
  default     = []
}

variable "topics" {
  type        = list(string)
  description = "List of topic names to create."
  default     = []
}

variable "tags" {
  type        = map(string)
  description = "Tags."
  default     = {}
}