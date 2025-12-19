@description('The name of the Key Vault')
param keyVaultName string

@description('The Principal ID of the APIM Managed Identity')
param apimPrincipalId string

@description('Tenant ID for the Azure subscription')
param tenantId string = subscription().tenantId

// 'Key Vault Secrets User' role ID
var secretsUserRoleDefinitionId = '4633458b-17de-408a-b874-0445c86b69e6'

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

// Assign RBAC Role to APIM Managed Identity
resource keyVaultRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(keyVault.id, apimPrincipalId, secretsUserRoleDefinitionId)
  scope: keyVault
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', secretsUserRoleDefinitionId)
    principalId: apimPrincipalId
    principalType: 'ServicePrincipal'
  }
}

// Alternatively, if using Access Policies (Legacy)
resource keyVaultAccessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2022-07-01' = {
  name: 'add'
  parent: keyVault
  properties: {
    accessPolicies: [
      {
        tenantId: tenantId
        objectId: apimPrincipalId
        permissions: {
          secrets: [
            'get'
            'list'
          ]
        }
      }
    ]
  }
}