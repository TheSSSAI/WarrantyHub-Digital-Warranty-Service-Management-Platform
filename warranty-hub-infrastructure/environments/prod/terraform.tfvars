environment           = "prod"
location              = "eastus"
secondary_location    = "westus"
project_name          = "whub"

# Networking
vnet_address_space    = ["10.1.0.0/16"]

# AKS - Production Scale & Availability
aks_node_count        = 3
aks_min_node_count    = 3
aks_max_node_count    = 10
aks_vm_size           = "Standard_D4s_v3"

# Database - High Availability & Performance
db_sku_name           = "GP_Standard_D4s_v3"
db_storage_mb         = 262144
db_geo_redundant      = true

# Storage - Reliability (REQ-REL-001)
storage_replication   = "GRS"

# Redis
redis_sku_name        = "Standard"
redis_family          = "C"
redis_capacity        = 1

# Messaging
servicebus_sku        = "Premium"