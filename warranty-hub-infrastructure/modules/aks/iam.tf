# ---------------------------------------------------------------------------------------------------------------------
# IDENTITY AND ACCESS MANAGEMENT (IAM) FOR AKS
# ---------------------------------------------------------------------------------------------------------------------
# Configures the necessary Role Based Access Control (RBAC) assignments for the AKS cluster
# to interact with other Azure resources (Networking, Container Registry, etc.).
# ---------------------------------------------------------------------------------------------------------------------

# ---------------------------------------------------------------------------------------------------------------------
# NETWORK PERMISSIONS
# ---------------------------------------------------------------------------------------------------------------------
# The AKS Cluster Identity (specifically the Identity used by the Control Plane/Cloud Provider) 
# needs permissions on the Subnet to configure Load Balancers and assign IPs for Pods (Azure CNI).
resource "azurerm_role_assignment" "aks_network_contributor" {
  scope                = var.vnet_subnet_id
  role_definition_name = "Network Contributor"
  principal_id         = azurerm_kubernetes_cluster.this.identity[0].principal_id
  
  description = "Allows AKS Cluster Identity to manage networking resources in the subnet (Load Balancers, IPs)."
}

# ---------------------------------------------------------------------------------------------------------------------
# CONTAINER REGISTRY PERMISSIONS
# ---------------------------------------------------------------------------------------------------------------------
# The Kubelet Identity (used by the nodes to pull images) needs AcrPull permissions 
# on the Azure Container Registry.
resource "azurerm_role_assignment" "aks_acr_pull" {
  scope                = var.acr_id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.this.kubelet_identity[0].object_id
  
  description = "Allows AKS Kubelet Identity to pull container images from the ACR."
}

# ---------------------------------------------------------------------------------------------------------------------
# MONITORING PERMISSIONS
# ---------------------------------------------------------------------------------------------------------------------
# Allows the cluster to publish metrics to Azure Monitor.
# Note: The oms_agent configuration in main.tf handles the log ingestion authorization automatically 
# via the Managed Identity created by the addon, but explicit metric publishing role is good practice 
# if using custom metrics.
resource "azurerm_role_assignment" "aks_metrics_publisher" {
  scope                = azurerm_kubernetes_cluster.this.id
  role_definition_name = "Monitoring Metrics Publisher"
  principal_id         = azurerm_kubernetes_cluster.this.identity[0].principal_id
  
  description = "Allows AKS to publish metrics to Azure Monitor."
}

# ---------------------------------------------------------------------------------------------------------------------
# DATA RESOURCES (PRIVATE DNS)
# ---------------------------------------------------------------------------------------------------------------------
# If using Private DNS Zones for other resources (DB, Redis), the AKS cluster needs
# permissions to resolve/read them if they are in the same RG, or linked via VNet.
# Assuming standard VNet linking is handled in the Networking module, no specific
# RBAC is needed here unless the cluster itself manages DNS records (which is not standard for Private Links).