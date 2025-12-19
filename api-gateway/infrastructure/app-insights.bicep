@description('The name of the Application Insights resource')
param appInsightsName string

@description('The Azure region where the resource should be deployed')
param location string = resourceGroup().location

@description('Tags to assign to the resource')
param tags object = {}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  tags: tags
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
    Request_Source: 'rest'
    WorkspaceResourceId: '' // Ideally linked to a Log Analytics Workspace in production
  }
}

output appInsightsInstrumentationKey string = appInsights.properties.InstrumentationKey
output appInsightsConnectionString string = appInsights.properties.ConnectionString
output appInsightsId string = appInsights.id