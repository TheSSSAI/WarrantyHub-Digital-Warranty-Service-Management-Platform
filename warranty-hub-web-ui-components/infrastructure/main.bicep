param location string = resourceGroup().location
param acrName string = 'warrantyhubacr'
param aksName string = 'warrantyhub-aks-prod'

resource acr 'Microsoft.ContainerRegistry/registries@2021-09-01' = {
  name: acrName
  location: location
  sku: {
    name: 'Standard'
  }
  properties: {
    adminUserEnabled: false
  }
}

resource aks 'Microsoft.ContainerService/managedClusters@2022-05-02.preview' = {
  name: aksName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    dnsPrefix: 'warrantyhub-aks'
    agentPoolProfiles: [
      {
        name: 'default'
        count: 2
        vmSize: 'Standard_D2_v2'
        mode: 'System'
      }
    ]
  }
}

// Role Assignment for AKS to pull from ACR
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(aks.id, acr.id, 'AcrPull')
  scope: acr
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d') // AcrPull
    principalId: aks.properties.identityProfile.kubeletidentity.objectId
    principalType: 'ServicePrincipal'
  }
}