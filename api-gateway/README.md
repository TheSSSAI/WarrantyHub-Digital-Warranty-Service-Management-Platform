# WarrantyHub API Gateway Configuration

This repository contains the declarative configuration and Infrastructure-as-Code (IaC) definitions for the WarrantyHub Azure API Management (APIM) instance. It acts as the single entry point for all client applications (Mobile App, Web Portals), enforcing security, rate limiting, and routing traffic to backend microservices.

## Repository Structure

- **apim-artifacts/apis/**: OpenAPI (Swagger) specifications for backend services.
- **apim-artifacts/named-values/**: Environment-specific configuration values (URLs, IDs).
- **apim-artifacts/policies/**: Reusable XML policy fragments (CORS, JWT Validation, Error Handling).
- **apim-artifacts/products/**: API Product definitions grouping APIs by consumer (Public, Technician, Admin).
- **infrastructure/**: Bicep templates for provisioning Azure resources.

## Architecture

The API Gateway implements the **Gateway Offloading** pattern:
1.  **SSL Termination**: Handled at the edge.
2.  **Authentication**: Layer 1 security via JWT validation against Azure AD B2C.
3.  **Routing**: Dynamic routing to backend microservices based on request paths.
4.  **Resilience**: Circuit breakers and retry logic (configured in Level 1 policies).

## Deployment

Infrastructure is deployed using Azure Bicep:

```bash
az deployment group create --resource-group <rg-name> --template-file infrastructure/main.bicep
```

APIM configurations (APIs, Policies, Products) are applied via the Azure API Management DevOps Resource Kit in the CI/CD pipeline.

## Security

- **Zero Trust**: All endpoints (except public metadata) require a valid Bearer token.
- **CORS**: Strictly scoped to known frontend origins.
- **Secrets**: stored in Azure Key Vault and referenced via Named Values.