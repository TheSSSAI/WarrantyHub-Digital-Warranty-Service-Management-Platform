environment           = "dev"
location              = "eastus2"
project_name          = "whub"

# Networking
vnet_address_space    = ["10.0.0.0/16"]

# AKS
aks_node_count        = 1
# Development does not need high availability or large scale
aks_min_node_count    = 1
aks_max_node_count    = 3
aks_vm_size           = "Standard_B2s"

# Database
# B-Series for cost efficiency in Dev
db_sku_name           = "B_Standard_B1ms"
db_storage_mb         = 32768
db_geo_redundant      = false

# Storage
storage_replication   = "LRS"

# Redis
redis_sku_name        = "Basic"
redis_family          = "C"
redis_capacity        = 0

# Messaging
servicebus_sku        = "Standard"