output "cluster_id" {
  value       = azurerm_kubernetes_cluster.this.id
  description = "The ID of the AKS Cluster."
}

output "cluster_name" {
  value       = azurerm_kubernetes_cluster.this.name
  description = "The name of the AKS Cluster."
}

output "kube_config" {
  value       = azurerm_kubernetes_cluster.this.kube_config_raw
  description = "Raw Kubernetes config to be used by kubectl."
  sensitive   = true
}

output "oidc_issuer_url" {
  value       = azurerm_kubernetes_cluster.this.oidc_issuer_url
  description = "The OIDC Issuer URL for Workload Identity."
}

output "kubelet_identity_id" {
  value       = azurerm_kubernetes_cluster.this.kubelet_identity[0].object_id
  description = "The Object ID of the Kubelet Managed Identity."
}