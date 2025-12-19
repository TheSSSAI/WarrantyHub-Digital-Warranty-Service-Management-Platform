# ---------------------------------------------------------------------------------------------------------------------
# AZURE KUBERNETES SERVICE (AKS) MODULE
# ---------------------------------------------------------------------------------------------------------------------
# This module provisions an enterprise-grade AKS cluster with the following characteristics:
# - Azure CNI Networking for seamless VNet integration
# - OIDC Issuer and Workload Identity enabled for secure, secret-less authentication
# - System and User node pool separation for stability
# - Cluster Autoscaler enabled for horizontal scaling (REQ-SCAL-001)
# - Zone Redundancy for High Availability (REQ-REL-001)
# - Integrated Azure Monitor for Observability
# ---------------------------------------------------------------------------------------------------------------------

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.116.0"
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# AKS CLUSTER RESOURCE
# ---------------------------------------------------------------------------------------------------------------------
resource "azurerm_kubernetes_cluster" "this" {
  name                = var.cluster_name
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = var.dns_prefix
  kubernetes_version  = var.kubernetes_version

  # Production-grade SKU for SLA guarantees
  sku_tier = "Standard"

  # Automatic upgrade channel for security patching
  automatic_channel_upgrade = "patch"

  # -----------------------------------------------------------------------------------------------------------------
  # IDENTITY CONFIGURATION
  # -----------------------------------------------------------------------------------------------------------------
  # Using System Assigned identity for the cluster infrastructure. 
  # This identity will be granted permissions on the VNet and ACR in iam.tf.
  identity {
    type = "SystemAssigned"
  }

  # Enable OIDC Issuer and Workload Identity for pod-level identity federation (Zero Trust)
  oidc_issuer_enabled       = true
  workload_identity_enabled = true

  # -----------------------------------------------------------------------------------------------------------------
  # DEFAULT NODE POOL (SYSTEM)
  # -----------------------------------------------------------------------------------------------------------------
  # This pool is reserved for system pods (CoreDNS, metrics-server, etc.) to ensure cluster stability.
  default_node_pool {
    name                 = "system"
    node_count           = var.system_node_count
    vm_size              = var.system_vm_size
    vnet_subnet_id       = var.vnet_subnet_id
    zones                = var.availability_zones
    enable_auto_scaling  = true
    min_count            = 2
    max_count            = 5
    os_disk_size_gb      = 50
    os_disk_type         = "Managed"
    type                 = "VirtualMachineScaleSets"
    only_critical_addons_enabled = true # Taints this pool so only system pods run here by default

    # Tagging for cost allocation
    tags = merge(var.tags, {
      "PoolType" = "System"
    })
  }

  # -----------------------------------------------------------------------------------------------------------------
  # NETWORKING CONFIGURATION
  # -----------------------------------------------------------------------------------------------------------------
  # Using Azure CNI for direct VNet integration, allowing pods to access VNet resources (DB, Redis) directly.
  network_profile {
    network_plugin      = "azure"
    network_policy      = "azure" # Enforce network policies for security
    load_balancer_sku   = "standard"
    service_cidr        = var.service_cidr
    dns_service_ip      = var.dns_service_ip
    
    # Outbound type can be customized (e.g., userDefinedRouting) if a firewall is used, 
    # defaulting to loadBalancer for standard setups.
    outbound_type       = "loadBalancer"
  }

  # -----------------------------------------------------------------------------------------------------------------
  # ACCESS CONTROL
  # -----------------------------------------------------------------------------------------------------------------
  # Integration with Azure AD for RBAC.
  azure_active_directory_role_based_access_control {
    managed                = true
    azure_rbac_enabled     = true
    admin_group_object_ids = var.admin_group_object_ids
  }

  # -----------------------------------------------------------------------------------------------------------------
  # ADDONS & INTEGRATIONS
  # -----------------------------------------------------------------------------------------------------------------
  
  # Container Insights (Azure Monitor)
  oms_agent {
    log_analytics_workspace_id = var.log_analytics_workspace_id
  }

  # Key Vault Secrets Provider (for mounting secrets as volumes if needed)
  key_vault_secrets_provider {
    secret_rotation_enabled  = true
    secret_rotation_interval = "2m"
  }

  # Microsoft Defender for Containers
  microsoft_defender {
    log_analytics_workspace_id = var.log_analytics_workspace_id
  }

  # Cluster Autoscaler Profile - optimized for responsiveness
  auto_scaler_profile {
    balance_similar_node_groups = true
    scan_interval               = "10s"
    scale_down_delay_after_add  = "10m"
  }

  lifecycle {
    ignore_changes = [
      default_node_pool[0].node_count # Let autoscaler manage this
    ]
  }

  tags = var.tags
}

# ---------------------------------------------------------------------------------------------------------------------
# USER NODE POOL
# ---------------------------------------------------------------------------------------------------------------------
# Dedicated pool for application workloads. Separating this from system nodes ensures
# application resource usage doesn't impact cluster management.
resource "azurerm_kubernetes_cluster_node_pool" "user" {
  name                  = "user"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.this.id
  vm_size               = var.user_vm_size
  vnet_subnet_id        = var.vnet_subnet_id
  zones                 = var.availability_zones
  
  # Scaling configuration (REQ-SCAL-001)
  enable_auto_scaling   = true
  min_count             = var.user_min_node_count
  max_count             = var.user_max_node_count
  node_count            = var.user_min_node_count

  os_disk_size_gb       = 100
  os_disk_type          = "Managed"
  mode                  = "User" # Indicates this pool is for application workloads

  # Labels for node affinity
  node_labels = {
    "workload" = "application"
  }

  lifecycle {
    ignore_changes = [
      node_count # Let autoscaler manage this
    ]
  }

  tags = merge(var.tags, {
    "PoolType" = "User"
  })
}