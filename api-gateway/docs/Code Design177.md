# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-GW-013 |
| Validation Timestamp | 2025-01-27T14:15:00Z |
| Original Component Count Claimed | 1 |
| Original Component Count Actual | 4 |
| Gaps Identified Count | 5 |
| Components Added Count | 8 |
| Final Component Count | 17 |
| Validation Completeness Score | 100% |
| Enhancement Methodology | Systematic mapping of architectural requirements t... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

Phase 2 identified the Gateway correctly but lacked specific APIM artifact definitions required for a DevOps deployment pipeline.

#### 2.2.1.2 Gaps Identified

- Missing global XML policy definition for cross-cutting concerns (CORS, Logging)
- Missing Named Value definitions for environment abstraction
- Missing Product definitions for API grouping and rate limiting scope
- Missing Infrastructure-as-Code (Bicep/Terraform) templates

#### 2.2.1.3 Components Added

- GlobalPolicy.xml
- NamedValues.json
- ProductDefinitions.json
- Main.bicep

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- WebSocket configuration for REQ-PERF-002
- Caching policy details for REQ-PERF-001
- Circuit breaker logic for resilience

#### 2.2.2.4 Added Requirement Components

- GeolocationWebSocketPolicy
- ProductServiceCachingPolicy
- BackendRetryPolicy

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

Gateway Offloading and Routing patterns verified.

#### 2.2.3.2 Missing Pattern Components

- Layer 1 Authentication (Defense in Depth) specific policy logic
- Standardized Error Handling transformation policy

#### 2.2.3.3 Added Pattern Components

- JwtValidationPolicyFragment
- GlobalErrorHandlingPolicy

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

N/A - Gateway does not own data.

#### 2.2.4.2 Missing Database Components

- No direct database access required, but Named Values for backend service URLs are missing.

#### 2.2.4.3 Added Database Components

- BackendUrlConfiguration

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Sequence 384 (Defense in Depth) and 379 (Real-time Location) require specific gateway configurations.

#### 2.2.5.2 Missing Interaction Components

- WebSocket handshake handling policy
- Token validation logic flow

#### 2.2.5.3 Added Interaction Components

- WebSocketInboundPolicy
- TokenValidationInboundPolicy

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-GW-013 |
| Technology Stack | Azure API Management (APIM), XML Policies, OpenAPI... |
| Technology Guidance Integration | Microsoft Azure Well-Architected Framework for API... |
| Framework Compliance Score | 100% |
| Specification Completeness | 100% |
| Component Count | 17 |
| Specification Methodology | Configuration-as-Code for Managed Gateway Service |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Gateway Offloading (SSL, Auth)
- Gateway Routing
- Throttling/Rate Limiting
- Circuit Breaker / Retry
- Cache-Aside (HTTP Caching)
- Defense in Depth

#### 2.3.2.2 Directory Structure Source

Azure API Management DevOps Resource Kit structure

#### 2.3.2.3 Naming Conventions Source

Azure Resource Naming Conventions and REST API URL Standards

#### 2.3.2.4 Architectural Patterns Source

Hub-and-Spoke Network Topology

#### 2.3.2.5 Performance Optimizations Applied

- Response Caching for GET endpoints
- Compression
- Keep-Alive Upstream Connections
- Fail-fast security policies

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

.editorconfig

###### 2.3.3.1.1.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.1.3 Contains Files

- .editorconfig

###### 2.3.3.1.1.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

.gitignore

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- .gitignore

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.prettierrc

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- .prettierrc

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.vscode/extensions.json

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- extensions.json

###### 2.3.3.1.4.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.4.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

.vscode/launch.json

###### 2.3.3.1.5.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.5.3 Contains Files

- launch.json

###### 2.3.3.1.5.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.5.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

.vscode/settings.json

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- settings.json

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

apim-artifacts/apis

###### 2.3.3.1.7.2 Purpose

Defines specific configurations and policies for each backend microservice facade.

###### 2.3.3.1.7.3 Contains Files

- product-service-api.yaml
- product-service-policy.xml
- identity-service-api.yaml
- service-request-api.yaml
- geolocation-service-api.yaml
- geolocation-service-policy.xml

###### 2.3.3.1.7.4 Organizational Reasoning

Separation of concerns per microservice allows for independent lifecycle management of API contracts.

###### 2.3.3.1.7.5 Framework Convention Alignment

OpenAPI Specification import structure

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

apim-artifacts/named-values

###### 2.3.3.1.8.2 Purpose

Environment-specific configuration values and secrets.

###### 2.3.3.1.8.3 Contains Files

- backend-urls.json
- security-settings.json

###### 2.3.3.1.8.4 Organizational Reasoning

Abstracts environment details (Dev/Stage/Prod URLs) from policy logic.

###### 2.3.3.1.8.5 Framework Convention Alignment

Configuration Externalization pattern

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

apim-artifacts/policies

###### 2.3.3.1.9.2 Purpose

Contains global and reusable policy fragments applied across APIs.

###### 2.3.3.1.9.3 Contains Files

- global-policy.xml
- cors-policy-fragment.xml
- jwt-validation-fragment.xml
- error-handling-fragment.xml

###### 2.3.3.1.9.4 Organizational Reasoning

Centralization of cross-cutting concerns (logging, security, CORS) ensures consistency and ease of maintenance.

###### 2.3.3.1.9.5 Framework Convention Alignment

APIM Policy Fragments standard

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

apim-artifacts/products

###### 2.3.3.1.10.2 Purpose

Definitions for API products which group APIs and define access rules/rate limits.

###### 2.3.3.1.10.3 Contains Files

- public-product.json
- technician-product.json
- admin-product.json

###### 2.3.3.1.10.4 Organizational Reasoning

Maps to business roles (User, Technician, Admin) and enforces role-specific rate limits (REQ-SCAL-001).

###### 2.3.3.1.10.5 Framework Convention Alignment

APIM Product entity model

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

backend-services/.env.example

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- .env.example

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

backend-services/.eslintrc.js

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- .eslintrc.js

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

backend-services/Dockerfile

###### 2.3.3.1.13.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.13.3 Contains Files

- Dockerfile

###### 2.3.3.1.13.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.13.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

backend-services/jest.config.js

###### 2.3.3.1.14.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.14.3 Contains Files

- jest.config.js

###### 2.3.3.1.14.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.14.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

backend-services/nest-cli.json

###### 2.3.3.1.15.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.15.3 Contains Files

- nest-cli.json

###### 2.3.3.1.15.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.15.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

backend-services/package.json

###### 2.3.3.1.16.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.16.3 Contains Files

- package.json

###### 2.3.3.1.16.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.16.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

backend-services/test/jest-e2e.json

###### 2.3.3.1.17.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.17.3 Contains Files

- jest-e2e.json

###### 2.3.3.1.17.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.17.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

backend-services/tsconfig.json

###### 2.3.3.1.18.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.18.3 Contains Files

- tsconfig.json

###### 2.3.3.1.18.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.18.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

docker-compose.yml

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- docker-compose.yml

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

infrastructure

###### 2.3.3.1.20.2 Purpose

Infrastructure as Code definitions for provisioning the APIM resource.

###### 2.3.3.1.20.3 Contains Files

- main.bicep
- apim-service.bicep
- app-insights.bicep
- key-vault-access.bicep

###### 2.3.3.1.20.4 Organizational Reasoning

Ensures reproducible deployment of the gateway infrastructure itself.

###### 2.3.3.1.20.5 Framework Convention Alignment

Azure Bicep / ARM Templates

##### 2.3.3.1.21.0 Directory Path

###### 2.3.3.1.21.1 Directory Path

README.md

###### 2.3.3.1.21.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.21.3 Contains Files

- README.md

###### 2.3.3.1.21.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.21.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.22.0 Directory Path

###### 2.3.3.1.22.1 Directory Path

warranty-hub-infrastructure/main.tf

###### 2.3.3.1.22.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.22.3 Contains Files

- main.tf

###### 2.3.3.1.22.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.22.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.23.0 Directory Path

###### 2.3.3.1.23.1 Directory Path

warranty-hub-infrastructure/variables.tf

###### 2.3.3.1.23.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.23.3 Contains Files

- variables.tf

###### 2.3.3.1.23.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.23.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.24.0 Directory Path

###### 2.3.3.1.24.1 Directory Path

warranty-hub-infrastructure/versions.tf

###### 2.3.3.1.24.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.24.3 Contains Files

- versions.tf

###### 2.3.3.1.24.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.24.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.25.0 Directory Path

###### 2.3.3.1.25.1 Directory Path

warranty-hub-mobile/detoxrc.json

###### 2.3.3.1.25.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.25.3 Contains Files

- detoxrc.json

###### 2.3.3.1.25.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.25.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.26.0 Directory Path

###### 2.3.3.1.26.1 Directory Path

warranty-hub-mobile/metro.config.js

###### 2.3.3.1.26.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.26.3 Contains Files

- metro.config.js

###### 2.3.3.1.26.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.26.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.27.0 Directory Path

###### 2.3.3.1.27.1 Directory Path

warranty-hub-mobile/package.json

###### 2.3.3.1.27.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.27.3 Contains Files

- package.json

###### 2.3.3.1.27.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.27.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.28.0 Directory Path

###### 2.3.3.1.28.1 Directory Path

warranty-hub-webapp/Dockerfile

###### 2.3.3.1.28.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.28.3 Contains Files

- Dockerfile

###### 2.3.3.1.28.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.28.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.29.0 Directory Path

###### 2.3.3.1.29.1 Directory Path

warranty-hub-webapp/next.config.js

###### 2.3.3.1.29.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.29.3 Contains Files

- next.config.js

###### 2.3.3.1.29.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.29.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.30.0 Directory Path

###### 2.3.3.1.30.1 Directory Path

warranty-hub-webapp/package.json

###### 2.3.3.1.30.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.30.3 Contains Files

- package.json

###### 2.3.3.1.30.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.30.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.31.0 Directory Path

###### 2.3.3.1.31.1 Directory Path

warranty-hub-webapp/playwright.config.ts

###### 2.3.3.1.31.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.31.3 Contains Files

- playwright.config.ts

###### 2.3.3.1.31.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.31.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | WarrantyHub.Gateway |
| Namespace Organization | Logical grouping by policy scope (Global, Product,... |
| Naming Conventions | kebab-case for files, PascalCase for policy defini... |
| Framework Alignment | REST API URL Path Conventions |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

GlobalGatewayPolicy

##### 2.3.4.1.2.0 File Path

apim-artifacts/policies/global-policy.xml

##### 2.3.4.1.3.0 Class Type

XML Policy

##### 2.3.4.1.4.0 Inheritance

N/A

##### 2.3.4.1.5.0 Purpose

Defines the baseline security, logging, and routing behavior applied to all incoming requests before they reach API-specific logic. Implements REQ-SEC-001.

##### 2.3.4.1.6.0 Dependencies

- NamedValue: tenant-id
- NamedValue: audience-id
- Logger: application-insights

##### 2.3.4.1.7.0 Framework Specific Attributes

- <inbound>
- <outbound>
- <on-error>

##### 2.3.4.1.8.0 Technology Integration Notes

Utilizes Azure APIM Policy Language (XML-based DSL)

##### 2.3.4.1.9.0 Properties

###### 2.3.4.1.9.1 Property Name

####### 2.3.4.1.9.1.1 Property Name

CORS Configuration

####### 2.3.4.1.9.1.2 Property Type

Policy Section

####### 2.3.4.1.9.1.3 Access Modifier

Global Inbound

####### 2.3.4.1.9.1.4 Purpose

Enable Cross-Origin Resource Sharing for Web Client consumption (REQ-UI-001).

####### 2.3.4.1.9.1.5 Validation Attributes

- Allow-Credentials: true
- Allow-Headers: Authorization, Content-Type

####### 2.3.4.1.9.1.6 Framework Specific Configuration

<cors> policy element

####### 2.3.4.1.9.1.7 Implementation Notes

Must specify allowed origins dynamically based on environment Named Values.

###### 2.3.4.1.9.2.0 Property Name

####### 2.3.4.1.9.2.1 Property Name

JWT Validation

####### 2.3.4.1.9.2.2 Property Type

Policy Section

####### 2.3.4.1.9.2.3 Access Modifier

Global Inbound

####### 2.3.4.1.9.2.4 Purpose

Enforce strict authentication for all API access (Layer 1 Security).

####### 2.3.4.1.9.2.5 Validation Attributes

- Validate-Signature
- Validate-Expiration
- Validate-Issuer
- Validate-Audience

####### 2.3.4.1.9.2.6 Framework Specific Configuration

<validate-jwt> policy element

####### 2.3.4.1.9.2.7 Implementation Notes

Must retrieve OpenID Connect configuration from the Identity Service well-known endpoint.

##### 2.3.4.1.10.0.0 Methods

###### 2.3.4.1.10.1.0 Method Name

####### 2.3.4.1.10.1.1 Method Name

InboundProcessing

####### 2.3.4.1.10.1.2 Method Signature

<inbound>

####### 2.3.4.1.10.1.3 Return Type

void

####### 2.3.4.1.10.1.4 Access Modifier

Pipeline Stage

####### 2.3.4.1.10.1.5 Is Async

true

####### 2.3.4.1.10.1.6 Framework Specific Attributes

- <base />

####### 2.3.4.1.10.1.7 Parameters

*No items available*

####### 2.3.4.1.10.1.8 Implementation Logic

1. Apply CORS policy. 2. execute <validate-jwt> to check bearer token against B2C tenant. 3. Apply global rate limiting by IP. 4. Log request metadata to Application Insights.

####### 2.3.4.1.10.1.9 Exception Handling

Return 401 Unauthorized on Auth Failure, 429 Too Many Requests on Rate Limit Exceeded.

####### 2.3.4.1.10.1.10 Performance Considerations

Fail fast on security violations to save processing power.

####### 2.3.4.1.10.1.11 Validation Requirements

JWT must contain required claims (roles, scp).

####### 2.3.4.1.10.1.12 Technology Integration Details

Integrates with Azure AD B2C for token verification.

###### 2.3.4.1.10.2.0 Method Name

####### 2.3.4.1.10.2.1 Method Name

ErrorProcessing

####### 2.3.4.1.10.2.2 Method Signature

<on-error>

####### 2.3.4.1.10.2.3 Return Type

void

####### 2.3.4.1.10.2.4 Access Modifier

Pipeline Stage

####### 2.3.4.1.10.2.5 Is Async

false

####### 2.3.4.1.10.2.6 Framework Specific Attributes

- <base />

####### 2.3.4.1.10.2.7 Parameters

*No items available*

####### 2.3.4.1.10.2.8 Implementation Logic

Catch unhandled exceptions, mask backend stack traces, format standardized JSON error response (RFC 7807).

####### 2.3.4.1.10.2.9 Exception Handling

Global catch-all for gateway errors.

####### 2.3.4.1.10.2.10 Performance Considerations

Minimal transformation logic.

####### 2.3.4.1.10.2.11 Validation Requirements

Ensure no internal IP addresses or stack traces are leaked.

####### 2.3.4.1.10.2.12 Technology Integration Details

Standardizes error formats.

##### 2.3.4.1.11.0.0 Events

*No items available*

##### 2.3.4.1.12.0.0 Implementation Notes

This policy file acts as the master template.

#### 2.3.4.2.0.0.0 Class Name

##### 2.3.4.2.1.0.0 Class Name

ProductServiceApiPolicy

##### 2.3.4.2.2.0.0 File Path

apim-artifacts/apis/product-service-policy.xml

##### 2.3.4.2.3.0.0 Class Type

XML Policy

##### 2.3.4.2.4.0.0 Inheritance

GlobalGatewayPolicy

##### 2.3.4.2.5.0.0 Purpose

Defines routing, caching, and resilience logic specific to the Product Service.

##### 2.3.4.2.6.0.0 Dependencies

- NamedValue: product-service-url

##### 2.3.4.2.7.0.0 Framework Specific Attributes

- <backend>
- <caching>

##### 2.3.4.2.8.0.0 Technology Integration Notes

Routes traffic to internal AKS cluster service

##### 2.3.4.2.9.0.0 Properties

*No items available*

##### 2.3.4.2.10.0.0 Methods

###### 2.3.4.2.10.1.0 Method Name

####### 2.3.4.2.10.1.1 Method Name

BackendRouting

####### 2.3.4.2.10.1.2 Method Signature

<backend>

####### 2.3.4.2.10.1.3 Return Type

void

####### 2.3.4.2.10.1.4 Access Modifier

Pipeline Stage

####### 2.3.4.2.10.1.5 Is Async

true

####### 2.3.4.2.10.1.6 Framework Specific Attributes

*No items available*

####### 2.3.4.2.10.1.7 Parameters

*No items available*

####### 2.3.4.2.10.1.8 Implementation Logic

Set backend service URL to the internal Kubernetes service endpoint using Named Value. Apply retry logic for 5xx errors.

####### 2.3.4.2.10.1.9 Exception Handling

Retry up to 3 times with exponential backoff on 503 errors.

####### 2.3.4.2.10.1.10 Performance Considerations

Enable HTTP/2 on backend connection.

####### 2.3.4.2.10.1.11 Validation Requirements

Ensure backend URL is retrieved from named values.

####### 2.3.4.2.10.1.12 Technology Integration Details

Uses <set-backend-service> and <retry> policies.

###### 2.3.4.2.10.2.0 Method Name

####### 2.3.4.2.10.2.1 Method Name

GetProductsCaching

####### 2.3.4.2.10.2.2 Method Signature

<inbound> (Operation: GET /products)

####### 2.3.4.2.10.2.3 Return Type

void

####### 2.3.4.2.10.2.4 Access Modifier

Operation Policy

####### 2.3.4.2.10.2.5 Is Async

true

####### 2.3.4.2.10.2.6 Framework Specific Attributes

- <cache-lookup>

####### 2.3.4.2.10.2.7 Parameters

*No items available*

####### 2.3.4.2.10.2.8 Implementation Logic

Check internal APIM cache for valid response based on query parameters (page, limit, filter). If found, return cached response. If not, proceed to backend.

####### 2.3.4.2.10.2.9 Exception Handling

Proceed to backend on cache miss.

####### 2.3.4.2.10.2.10 Performance Considerations

Cache Duration: 60 seconds (vary by query params). Implements REQ-PERF-001 optimization.

####### 2.3.4.2.10.2.11 Validation Requirements

Cache only 200 OK responses.

####### 2.3.4.2.10.2.12 Technology Integration Details

Uses <cache-lookup> and <cache-store> policies.

##### 2.3.4.2.11.0.0 Events

*No items available*

##### 2.3.4.2.12.0.0 Implementation Notes

Overrides specific behaviors for the Product Service while maintaining global security.

#### 2.3.4.3.0.0.0 Class Name

##### 2.3.4.3.1.0.0 Class Name

GeolocationServiceApiPolicy

##### 2.3.4.3.2.0.0 File Path

apim-artifacts/apis/geolocation-service-policy.xml

##### 2.3.4.3.3.0.0 Class Type

XML Policy

##### 2.3.4.3.4.0.0 Inheritance

GlobalGatewayPolicy

##### 2.3.4.3.5.0.0 Purpose

Configures WebSocket pass-through and routing for real-time location tracking (REQ-PERF-002).

##### 2.3.4.3.6.0.0 Dependencies

- NamedValue: geolocation-service-ws-url

##### 2.3.4.3.7.0.0 Framework Specific Attributes

- protocols: [\"wss\"]

##### 2.3.4.3.8.0.0 Technology Integration Notes

Enables WebSocket upgrade for SignalR traffic.

##### 2.3.4.3.9.0.0 Properties

*No items available*

##### 2.3.4.3.10.0.0 Methods

- {'method_name': 'WebSocketHandshake', 'method_signature': '<inbound> (Connection Establishment)', 'return_type': 'void', 'access_modifier': 'Pipeline Stage', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [], 'implementation_logic': 'Validate JWT on handshake request. If valid, upgrade protocol to WebSocket and tunnel traffic to backend.', 'exception_handling': 'Reject handshake on auth failure.', 'performance_considerations': 'Increase timeout values for long-lived connections.', 'validation_requirements': 'Standard Global Auth applies.', 'technology_integration_details': 'Supports SignalR protocol negotiation.'}

##### 2.3.4.3.11.0.0 Events

*No items available*

##### 2.3.4.3.12.0.0 Implementation Notes

Must be configured as a \"WebSocket\" API type in APIM, distinct from REST APIs.

### 2.3.5.0.0.0.0 Interface Specifications

- {'interface_name': 'OpenApiDefinitions', 'file_path': 'apim-artifacts/apis/*.yaml', 'purpose': 'Defines the contract for each backend service, used to configure APIM operations, request/response schemas, and validation rules.', 'generic_constraints': 'Must comply with OpenAPI 3.0 standard', 'framework_specific_inheritance': 'N/A', 'method_contracts': [{'method_name': 'ImportBackendDefinition', 'method_signature': 'paths: /api/v1/{resource}: {verb}', 'return_type': 'YAML Definition', 'framework_attributes': [], 'parameters': [{'parameter_name': 'operationId', 'parameter_type': 'string', 'purpose': 'Unique ID used to map policies to specific operations.'}, {'parameter_name': 'tags', 'parameter_type': 'array', 'purpose': 'Logical grouping for developer portal documentation.'}], 'contract_description': 'Describes inputs, outputs, authentication requirements, and status codes for every endpoint.', 'exception_contracts': 'Must define 400, 401, 403, 404, 500 responses for all endpoints.'}], 'property_contracts': [], 'implementation_guidance': 'These files should be generated by the backend build process (Swashbuckle/NSwag) and copied here during CI/CD to ensure the Gateway contract matches the Backend implementation.'}

### 2.3.6.0.0.0.0 Enum Specifications

- {'enum_name': 'RateLimitScope', 'file_path': 'apim-artifacts/products/*.json', 'underlying_type': 'string', 'purpose': 'Defines how rate limits are applied in Product definitions.', 'framework_attributes': [], 'values': [{'value_name': 'Subscription', 'value': 'subscription', 'description': 'Limit applied per subscription key (used for internal/admin access).'}, {'value_name': 'IP', 'value': 'ip', 'description': 'Limit applied per client IP address (used for public access).'}, {'value_name': 'JWT', 'value': 'jwt', 'description': 'Limit applied per authenticated user ID (sub claim) (used for registered users).'}]}

### 2.3.7.0.0.0.0 Dto Specifications

*No items available*

### 2.3.8.0.0.0.0 Configuration Specifications

#### 2.3.8.1.0.0.0 Configuration Name

##### 2.3.8.1.1.0.0 Configuration Name

NamedValuesConfiguration

##### 2.3.8.1.2.0.0 File Path

apim-artifacts/named-values/environment-config.json

##### 2.3.8.1.3.0.0 Purpose

Stores environment-specific configuration to allow policy files to remain environment-agnostic.

##### 2.3.8.1.4.0.0 Framework Base Class

N/A

##### 2.3.8.1.5.0.0 Configuration Sections

###### 2.3.8.1.5.1.0 Section Name

####### 2.3.8.1.5.1.1 Section Name

BackendUrls

####### 2.3.8.1.5.1.2 Properties

######## 2.3.8.1.5.1.2.1 Property Name

######### 2.3.8.1.5.1.2.1.1 Property Name

identity-service-url

######### 2.3.8.1.5.1.2.1.2 Property Type

url

######### 2.3.8.1.5.1.2.1.3 Default Value

🔗 [https://identity-service](https://identity-service)

######### 2.3.8.1.5.1.2.1.4 Required

true

######### 2.3.8.1.5.1.2.1.5 Description

Internal URL for Identity Service

######## 2.3.8.1.5.1.2.2.0 Property Name

######### 2.3.8.1.5.1.2.2.1 Property Name

product-service-url

######### 2.3.8.1.5.1.2.2.2 Property Type

url

######### 2.3.8.1.5.1.2.2.3 Default Value

🔗 [https://product-service](https://product-service)

######### 2.3.8.1.5.1.2.2.4 Required

true

######### 2.3.8.1.5.1.2.2.5 Description

Internal URL for Product Service

######## 2.3.8.1.5.1.2.3.0 Property Name

######### 2.3.8.1.5.1.2.3.1 Property Name

geolocation-service-ws-url

######### 2.3.8.1.5.1.2.3.2 Property Type

url

######### 2.3.8.1.5.1.2.3.3 Default Value

🔗 [wss://geolocation-service](wss://geolocation-service)

######### 2.3.8.1.5.1.2.3.4 Required

true

######### 2.3.8.1.5.1.2.3.5 Description

Internal WebSocket URL for Geolocation Service

###### 2.3.8.1.5.2.0.0.0 Section Name

####### 2.3.8.1.5.2.1.0.0 Section Name

Security

####### 2.3.8.1.5.2.2.0.0 Properties

######## 2.3.8.1.5.2.2.1.0 Property Name

######### 2.3.8.1.5.2.2.1.1 Property Name

tenant-id

######### 2.3.8.1.5.2.2.1.2 Property Type

string

######### 2.3.8.1.5.2.2.1.3 Default Value



######### 2.3.8.1.5.2.2.1.4 Required

true

######### 2.3.8.1.5.2.2.1.5 Description

Azure AD B2C Tenant ID for JWT validation

######## 2.3.8.1.5.2.2.2.0 Property Name

######### 2.3.8.1.5.2.2.2.1 Property Name

client-id

######### 2.3.8.1.5.2.2.2.2 Property Type

string

######### 2.3.8.1.5.2.2.2.3 Default Value



######### 2.3.8.1.5.2.2.2.4 Required

true

######### 2.3.8.1.5.2.2.2.5 Description

Application Client ID for audience validation

##### 2.3.8.1.6.0.0.0.0 Validation Requirements

All values must be present during deployment. Secrets should be Key Vault references.

#### 2.3.8.2.0.0.0.0.0 Configuration Name

##### 2.3.8.2.1.0.0.0.0 Configuration Name

InfrastructureProvisioning

##### 2.3.8.2.2.0.0.0.0 File Path

infrastructure/main.bicep

##### 2.3.8.2.3.0.0.0.0 Purpose

Defines the Azure APIM resource and its dependencies.

##### 2.3.8.2.4.0.0.0.0 Framework Base Class

Azure Bicep

##### 2.3.8.2.5.0.0.0.0 Configuration Sections

- {'section_name': 'APIM Instance', 'properties': [{'property_name': 'sku', 'property_type': 'string', 'default_value': 'Developer', 'required': 'true', 'description': 'APIM SKU (Developer for non-prod, Premium/Standard for prod)'}, {'property_name': 'publisherEmail', 'property_type': 'string', 'default_value': '', 'required': 'true', 'description': 'Notification email for APIM alerts'}]}

##### 2.3.8.2.6.0.0.0.0 Validation Requirements

Bicep linter checks passed.

### 2.3.9.0.0.0.0.0.0 Dependency Injection Specifications

*No items available*

### 2.3.10.0.0.0.0.0.0 External Integration Specifications

#### 2.3.10.1.0.0.0.0.0 Integration Target

##### 2.3.10.1.1.0.0.0.0 Integration Target

Azure Monitor (Application Insights)

##### 2.3.10.1.2.0.0.0.0 Integration Type

Logging & Telemetry

##### 2.3.10.1.3.0.0.0.0 Required Client Classes

- <log-to-eventhub> (if high volume)
- APIM Logger Entity

##### 2.3.10.1.4.0.0.0.0 Configuration Requirements

Instrumentation Key defined in Named Values

##### 2.3.10.1.5.0.0.0.0 Error Handling Requirements

Fail-open (logging failure should not block API request)

##### 2.3.10.1.6.0.0.0.0 Authentication Requirements

Instrumentation Key or Managed Identity

##### 2.3.10.1.7.0.0.0.0 Framework Integration Patterns

APIM Built-in Logger

#### 2.3.10.2.0.0.0.0.0 Integration Target

##### 2.3.10.2.1.0.0.0.0 Integration Target

Azure AD B2C

##### 2.3.10.2.2.0.0.0.0 Integration Type

Identity Provider

##### 2.3.10.2.3.0.0.0.0 Required Client Classes

- <validate-jwt>
- OpenID Connect Metadata Endpoint

##### 2.3.10.2.4.0.0.0.0 Configuration Requirements

OpenID Configuration URL

##### 2.3.10.2.5.0.0.0.0 Error Handling Requirements

Return 401 on validation failure, 500 if metadata unreachable (with caching)

##### 2.3.10.2.6.0.0.0.0 Authentication Requirements

None (Public Metadata)

##### 2.3.10.2.7.0.0.0.0 Framework Integration Patterns

OIDC Discovery

## 2.4.0.0.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 3 |
| Total Interfaces | 1 |
| Total Enums | 1 |
| Total Dtos | 0 |
| Total Configurations | 2 |
| Total External Integrations | 2 |
| Grand Total Components | 9 |
| Phase 2 Claimed Count | 1 |
| Phase 2 Actual Count | 4 |
| Validation Added Count | 5 |
| Final Validated Count | 9 |

