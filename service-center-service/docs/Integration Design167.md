# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-003 |
| Extraction Timestamp | 2025-01-27T10:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-FUNC-002

#### 1.2.1.2 Requirement Text

The system shall provide an interface for a Super Admin to define a service center's geographic service area by inputting a list of postal codes and drawing a geofenced polygon on a map.

#### 1.2.1.3 Validation Criteria

- Verify input of postal code lists
- Verify drawing and persistence of valid GeoJSON polygons
- Verify spatial queries correctly identify service centers covering a specific location

#### 1.2.1.4 Implementation Implications

- Database must enable PostGIS extension
- Entities must use GEOMETRY or GEOGRAPHY data types (SRID 4326)
- API must accept and validate GeoJSON payloads

#### 1.2.1.5 Extraction Reasoning

This is the core functional requirement explicitly mapped to this repository in the definition.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-AUDIT-001

#### 1.2.2.2 Requirement Text

The system must record all critical actions in an immutable audit trail, including user logins, changes to permissions, and modifications to key data entities.

#### 1.2.2.3 Validation Criteria

- Verify 'ServiceCenterApproved' events are emitted/logged
- Verify 'ServiceCenterRejected' events are emitted/logged
- Verify service area modifications are logged

#### 1.2.2.4 Implementation Implications

- Integration with Audit Service or Message Bus to publish audit events on state changes
- Transactional consistency between state update and audit event generation

#### 1.2.2.5 Extraction Reasoning

This service manages the lifecycle (Approval/Rejection) of Service Centers, which are critical administrative actions requiring audit trails.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-PERF-001

#### 1.2.3.2 Requirement Text

The system's standard API endpoints must respond with a 95th percentile (P95) latency of less than 250 milliseconds under the defined standard load.

#### 1.2.3.3 Validation Criteria

- Verify geospatial lookup queries execute within latency limits

#### 1.2.3.4 Implementation Implications

- Mandatory GiST (Generalized Search Tree) indexes on spatial columns
- Optimization of point-in-polygon queries

#### 1.2.3.5 Extraction Reasoning

The 'find-by-location' endpoint is a critical path for the Service Request creation flow and must meet performance standards.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

ServiceCenterController

#### 1.3.1.2 Component Specification

Handles HTTP REST requests for service center lifecycle management and geospatial definition.

#### 1.3.1.3 Implementation Requirements

- Implement CRUD endpoints
- Implement approval/rejection endpoints
- Implement service area definition endpoints

#### 1.3.1.4 Architectural Context

Service Layer - Entry Point

#### 1.3.1.5 Extraction Reasoning

Standard NestJS controller pattern required for exposing functionality.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

GeoSpatialService

#### 1.3.2.2 Component Specification

Encapsulates complex PostGIS logic and spatial calculations.

#### 1.3.2.3 Implementation Requirements

- Handle GeoJSON parsing and validation
- Execute ST_Contains/ST_Intersects queries
- Manage coordinate system transformations if necessary

#### 1.3.2.4 Architectural Context

Service Layer - Domain Logic

#### 1.3.2.5 Extraction Reasoning

Isolates the specialized geospatial logic specified in the repository description.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

ServiceCenterEntity

#### 1.3.3.2 Component Specification

TypeORM entity definition for the Service Center profile.

#### 1.3.3.3 Implementation Requirements

- Define columns for profile data
- Define Many-to-Many relationship with Brands
- Define One-to-Many relationship with ServiceAreas

#### 1.3.3.4 Architectural Context

Data Access Layer

#### 1.3.3.5 Extraction Reasoning

Core domain entity managed by this repository.

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Service Layer

#### 1.4.1.2 Layer Responsibilities

Business logic execution, spatial data validation, orchestration of state changes.

#### 1.4.1.3 Layer Constraints

- Must not contain direct database queries (use Repository pattern)
- Must enforce RBAC checks for Super Admin

#### 1.4.1.4 Implementation Patterns

- Controller-Service-Repository pattern
- DTO validation pipes

#### 1.4.1.5 Extraction Reasoning

Standard NestJS architecture.

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Data Access Layer

#### 1.4.2.2 Layer Responsibilities

Persistence of Service Center profiles and spatial data.

#### 1.4.2.3 Layer Constraints

- Must use PostGIS extension
- Must use spatial indexes

#### 1.4.2.4 Implementation Patterns

- TypeORM / Prisma with spatial plugin

#### 1.4.2.5 Extraction Reasoning

Repository explicitly mentions PostgreSQL with PostGIS.

## 1.5.0.0 Dependency Interfaces

- {'interface_name': 'IMessagingProvider', 'source_repository': 'messaging-infrastructure', 'method_contracts': [{'method_name': 'publishEvent', 'method_signature': 'publish(topic: string, event: IntegrationEvent)', 'method_purpose': 'Publishes lifecycle events (Approved, Rejected) to trigger notifications and auditing.', 'integration_context': 'Called after successful transaction commit of status change.'}], 'integration_pattern': 'Asynchronous Event-Driven', 'communication_protocol': 'AMQP / Azure Service Bus SDK', 'extraction_reasoning': 'Required to fulfill notification requirements for US-005 and US-006.'}

## 1.6.0.0 Exposed Interfaces

- {'interface_name': 'IServiceCenterApi', 'consumer_repositories': ['REPO-BS-004', 'REPO-FE-002'], 'method_contracts': [{'method_name': 'CreateServiceCenter', 'method_signature': 'POST /service-centers (body: CreateCenterDto): CenterDto', 'method_purpose': 'Registers a new service center profile.', 'implementation_requirements': 'Validate input, set initial status to PENDING.'}, {'method_name': 'DefineServiceArea', 'method_signature': 'PUT /service-centers/{id}/service-area (body: ServiceAreaDto): void', 'method_purpose': 'Updates the geographic service area.', 'implementation_requirements': 'Validate GeoJSON validity (closed loops, non-intersecting). Persist to GEOMETRY column.'}, {'method_name': 'FindCentersByLocation', 'method_signature': 'GET /service-centers/find-by-location?lat={lat}&lon={lon}&brandId={brandId}: CenterDto[]', 'method_purpose': 'Returns service centers covering a specific coordinate for a specific brand.', 'implementation_requirements': 'Execute efficient PostGIS query using ST_Contains and brand association check.'}, {'method_name': 'ApproveServiceCenter', 'method_signature': 'PATCH /service-centers/{id}/approve: void', 'method_purpose': 'Transitions status to APPROVED.', 'implementation_requirements': 'RBAC: Super Admin only. Trigger ServiceCenterApproved event.'}], 'service_level_requirements': ['P95 Latency < 250ms for spatial lookups'], 'implementation_constraints': ['Spatial data must be SRID 4326'], 'extraction_reasoning': 'Explicitly defined in repository contract and required by User Stories US-005, US-008, US-098.'}

## 1.7.0.0 Technology Context

### 1.7.1.0 Framework Requirements

NestJS v10.3.x with TypeScript.

### 1.7.2.0 Integration Technologies

- PostgreSQL
- PostGIS
- Azure Service Bus (for events)

### 1.7.3.0 Performance Constraints

Spatial queries must use GiST indexes. API latency < 250ms.

### 1.7.4.0 Security Requirements

RBAC enforcement (Super Admin for writes). Input validation for GeoJSON to prevent injection/DoS.

## 1.8.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | All repository-mapped requirements (REQ-FUNC-002) ... |
| Cross Reference Validation | Validated against Service Request Service needs (R... |
| Implementation Readiness Assessment | High. Specific technology (PostGIS), schema requir... |
| Quality Assurance Confirmation | Scope boundaries respected: No routing logic, only... |

