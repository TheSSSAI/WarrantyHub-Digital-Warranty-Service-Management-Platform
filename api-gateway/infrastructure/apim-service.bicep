@description('The name of the API Management service instance.')
param apimName string

@description('The Azure region where the APIM service will be deployed.')
param location string = resourceGroup().location

@description('The name of the publisher (organization) for the developer portal.')
param publisherName string

@description('The email address of the publisher for notifications.')
param publisherEmail string

@description('The pricing tier of the APIM service (Developer, Basic, Standard, Premium).')
@allowed([
  'Developer'
  'Basic'
  'Standard'
  'Premium'
])
param sku string = 'Developer'

@description('The number of scale units for the APIM service.')
param skuCount int = 1

@description('The name of the Application Insights instance to link for observability.')
param appInsightsName string

@description('The Instrumentation Key for Application Insights.')
@secure()
param appInsightsInstrumentationKey string

@description('The type of Virtual Network integration (None, External, Internal).')
@allowed([
  'None'
  'External'
  'Internal'
])
param virtualNetworkType string = 'None'

@description('The Resource ID of the subnet for VNet integration. Required if virtualNetworkType is not None.')
param subnetResourceId string = ''

@description('The raw XML content of the global policy to apply to the APIM service.')
param globalPolicyContent string

// 1. API Management Service Resource
resource apimService 'Microsoft.ApiManagement/service@2023-05-01-preview' = {
  name: apimName
  location: location
  sku: {
    name: sku
    capacity: skuCount
  }
  identity: {
    type: 'SystemAssigned' // Enable Managed Identity for Key Vault access
  }
  properties: {
    publisherEmail: publisherEmail
    publisherName: publisherName
    virtualNetworkType: virtualNetworkType
    virtualNetworkConfiguration: (virtualNetworkType == 'None') ? null : {
      subnetResourceId: subnetResourceId
    }
    // Disable weak TLS protocols
    customProperties: {
      'Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10': 'False'
      'Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls11': 'False'
      'Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Ssl30': 'False'
      'Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TripleDes168': 'False'
      'Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls10': 'False'
      'Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls11': 'False'
      'Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Ssl30': 'False'
    }
  }
}

// 2. Application Insights Logger Configuration
// Links the APIM instance to the App Insights workspace for telemetry
resource apimLogger 'Microsoft.ApiManagement/service/loggers@2023-05-01-preview' = {
  parent: apimService
  name: 'application-insights'
  properties: {
    loggerType: 'applicationInsights'
    credentials: {
      instrumentationKey: appInsightsInstrumentationKey
    }
    isBuffered: true
    description: 'Global Application Insights logger for WarrantyHub API Gateway'
  }
}

// 3. Global Diagnostic Settings
// Configures what telemetry is sent to the logger (Request/Response bodies, Headers)
resource apimDiagnostics 'Microsoft.ApiManagement/service/diagnostics@2023-05-01-preview' = {
  parent: apimService
  name: 'applicationinsights' // Must be named 'applicationinsights' or 'azuremonitor'
  properties: {
    loggerId: apimLogger.id
    alwaysLog: 'allErrors' // Log all failed requests
    sampling: {
      samplingType: 'fixed'
      percentage: (sku == 'Developer') ? 100 : 20 // Sample 100% in Dev, 20% in Prod
    }
    frontend: {
      request: {
        body: {
          bytes: 1024 // Log first 1KB of request body
        }
        headers: [
          'Content-Type'
          'Accept'
          'Authorization' // Be careful with PII/Secrets, ensure logs are secure
          'X-Correlation-ID'
        ]
      }
      response: {
        body: {
          bytes: 1024
        }
        headers: [
          'Content-Type'
          'X-Correlation-ID'
        ]
      }
    }
    backend: {
      request: {
        body: {
          bytes: 1024
        }
        headers: [
          'Content-Type'
          'X-Correlation-ID'
        ]
      }
      response: {
        body: {
          bytes: 1024
        }
        headers: [
          'Content-Type'
        ]
      }
    }
  }
}

// 4. Global Policy Assignment
// Applies the global-policy.xml content to the APIM instance
resource globalPolicy 'Microsoft.ApiManagement/service/policies@2023-05-01-preview' = {
  parent: apimService
  name: 'policy'
  properties: {
    format: 'rawxml'
    value: globalPolicyContent
  }
}

// 5. Outputs
// Return the Managed Identity Principal ID to allow Key Vault access assignment in subsequent steps
output apimIdentityPrincipalId string = apimService.identity.principalId
output apimName string = apimService.name
output gatewayUrl string = apimService.properties.gatewayUrl