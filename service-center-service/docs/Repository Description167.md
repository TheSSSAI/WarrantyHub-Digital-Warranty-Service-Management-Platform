# 1 Id

REPO-BS-003

# 2 Name

service-center-service

# 3 Description

This specialized service manages the onboarding and configuration of Service Centers. Its sole responsibility is to handle service center profiles, their brand authorizations, and their geographic service areas, including complex geospatial data like geofenced polygons and postal code lists (REQ-FUNC-002). Extracted from `warranty-hub-backend`, this service acts as the backend for the Super Admin portal's onboarding workflows. By isolating the geospatial logic and data, it allows for specialized technology (PostGIS) and optimization without complicating other, more standard, business services. This focused scope ensures that the complex logic of service area management is contained and can be maintained by specialists.

# 4 Type

🔹 Application Services

# 5 Namespace

WarrantyHub.Services.ServiceCenter

# 6 Output Path

services/service-center

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, PostgreSQL with PostGIS

# 10 Thirdparty Libraries

- pg
- geospatial libraries (e.g., turf.js)

# 11 Layer Ids

- service-layer

# 12 Dependencies

- REPO-CL-010
- REPO-SL-011

# 13 Requirements

- {'requirementId': '3.1 Super Admin & Onboarding Module'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Microservice

# 17 Architecture Map

- service-center-service-004

# 18 Components Map

- service-center-service-004

# 19 Requirements Map

- REQ-FUNC-002

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-BK-001

## 20.3 Decomposition Reasoning

Isolates the highly specialized and technologically distinct domain of geospatial data management. PostGIS and related libraries have unique dependencies and performance characteristics. Separating this service simplifies the technology stack of other core services and allows for focused optimization of spatial queries.

## 20.4 Extracted Responsibilities

- CRUD for Service Center profiles
- Management of geofenced service area polygons
- Management of service area postal codes
- Linking service centers to brands

## 20.5 Reusability Scope

- Its data is consumed by the Service Request service for routing logic.

## 20.6 Development Benefits

- Allows developers with geospatial expertise to work independently.
- Prevents complex geospatial library dependencies from polluting other services.

# 21.0 Dependency Contracts

*No data available*

# 22.0 Exposed Contracts

## 22.1 Public Interfaces

- {'interface': 'IServiceCenterApi', 'methods': ['POST /service-centers(CreateCenterDto) : CenterDto', 'PUT /service-centers/{id}/service-area(ServiceAreaDto) : void', 'GET /service-centers/find-by-location(lat, lon, brandId) : CenterDto[]'], 'events': [], 'properties': [], 'consumers': ['REPO-BS-004', 'REPO-FE-002']}

# 23.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Standard NestJS DI. |
| Event Communication | None. Primarily a request-reply service. |
| Data Flow | Manages writes to ServiceCenter and ServiceArea ta... |
| Error Handling | Standard HTTP status codes. |
| Async Patterns | Async/await for all PostGIS queries. |

# 24.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Use a library that provides good integration with ... |
| Performance Considerations | Ensure spatial indexes (GiST) are created and used... |
| Security Considerations | Endpoints should be restricted to SuperAdmins and ... |
| Testing Approach | Integration tests are critical to validate the cor... |

# 25.0 Scope Boundaries

## 25.1 Must Implement

- All aspects of service center profile and service area management.

## 25.2 Must Not Implement

- Service request routing logic (it only provides the data for routing), technician management.

## 25.3 Extension Points

- Supporting more complex service area definitions (e.g., areas with holes).

## 25.4 Validation Rules

- Validate that uploaded polygon data is a valid GeoJSON format.

