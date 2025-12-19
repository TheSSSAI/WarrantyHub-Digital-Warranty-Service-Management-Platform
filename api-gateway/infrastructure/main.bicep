// --------------------------------------------------------------------------------
// Main Infrastructure Orchestrator
// Dependency Level: 2
// 
// Purpose: Orchestrates the deployment of the API Management Gateway and its dependencies.
// Architectural Pattern: Hub-and-Spoke / Modular Infrastructure
// 
// Dependencies:
// - infrastructure/app-insights.bicep (Level 0)
// - infrastructure/key-vault-access.bicep (Level 0)
// - infrastructure/apim-service.bicep (Level 1)
// --------------------------------------------------------------------------------

targetScope = 'resourceGroup'

// --------------------------------------------------------------------------------
// Parameters
// --------------------------------------------------------------------------------

@description('The environment code (e.g., dev, stg, prod).')
@allowed([
  'dev'
  'stg'
  'prod'
])
param environment string

@description('The Azure region for the deployment.')
param location string = resourceGroup().location

@description('The name of the API Management publisher (Organization Name).')
param publisherName string

@description('The email address of the API Management publisher.')
param publisherEmail string

@description('The SKU tier for API Management (e.g., Developer, Standard, Premium).')
@allowed([
  'Developer'
  'Standard'
  'Premium'
])
param apimSku string = 'Developer'

@description('The number of scale units for the APIM instance.')
param apimSkuCount int = 1

@description('The name of the existing Key Vault to grant APIM access to.')
param keyVaultName string

// --------------------------------------------------------------------------------
// Variables
// --------------------------------------------------------------------------------

var appInsightsName = 'appi-warrantyhub-${environment}'
var apimServiceName = 'apim-warrantyhub-${environment}'

// --------------------------------------------------------------------------------
// Modules
// --------------------------------------------------------------------------------

// 1. Deploy Application Insights (Level 0)
// Provides centralized logging and telemetry for the Gateway.
module appInsights './app-insights.bicep' = {
  name: 'deploy-app-insights'
  params: {
    name: appInsightsName
    location: location
    environment: environment
  }
}

// 2. Deploy API Management Service (Level 1)
// The core gateway infrastructure. Depends on App Insights for configuration.
module apimService './apim-service.bicep' = {
  name: 'deploy-apim-service'
  params: {
    serviceName: apimServiceName
    location: location
    publisherName: publisherName
    publisherEmail: publisherEmail
    skuName: apimSku
    skuCapacity: apimSkuCount
    // Inject App Insights connection details for the logger resource
    appInsightsName: appInsightsName
    appInsightsInstrumentationKey: appInsights.outputs.instrumentationKey
    appInsightsConnectionString: appInsights.outputs.connectionString
  }
  dependsOn: [
    appInsights
  ]
}

// 3. Configure Key Vault Access (Level 0)
// Grants the APIM Managed Identity 'Key Vault Secret User' permissions.
// This allows APIM to fetch Named Values (secrets) at runtime.
module keyVaultAccess './key-vault-access.bicep' = {
  name: 'configure-key-vault-access'
  params: {
    keyVaultName: keyVaultName
    // The Principal ID of the APIM System-Assigned Managed Identity
    principalId: apimService.outputs.apimPrincipalId
    tenantId: subscription().tenantId
  }
  dependsOn: [
    apimService
  ]
}

// --------------------------------------------------------------------------------
// Outputs
// --------------------------------------------------------------------------------

@description('The name of the deployed API Management service.')
output apimName string = apimService.outputs.apimName

@description('The Gateway URL of the API Management service.')
output gatewayUrl string = apimService.outputs.gatewayUrl

@description('The Developer Portal URL.')
output portalUrl string = apimService.outputs.portalUrl

@description('The Managed Identity Principal ID of the APIM service.')
output apimIdentityPrincipalId string = apimService.outputs.apimPrincipalId