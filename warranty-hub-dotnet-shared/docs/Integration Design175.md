# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-SL-011 |
| Extraction Timestamp | 2025-01-27T12:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-AUDIT-001

#### 1.2.1.2 Requirement Text

The system must record all critical actions in an immutable audit trail, including user logins, changes to permissions, and modifications to key data entities.

#### 1.2.1.3 Validation Criteria

- Verify that an '@Audit()' decorator exists and correctly intercepts method calls.
- Verify that the library produces standard 'AuditLogEntry' objects matching the schema required by the Audit Service.

#### 1.2.1.4 Implementation Implications

- Implement 'AuditInterceptor' using NestJS interceptors to capture request context (User, IP) and response status.
- Define 'AuditLogEntry' interface and 'AuditAction' enum in the shared library to enforce consistency.

#### 1.2.1.5 Extraction Reasoning

This library is the enforcement point for ensuring all microservices generate consistent audit logs without code duplication.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-SEC-001

#### 1.2.2.2 Requirement Text

System-wide Authentication and Authorization enforcement via JWT.

#### 1.2.2.3 Validation Criteria

- Verify that the 'JwtAuthGuard' correctly validates tokens against Azure AD B2C JWKS.
- Verify that the '@Roles()' decorator correctly enforces RBAC policies.

#### 1.2.2.4 Implementation Implications

- Implement a reusable 'AuthModule' that can be imported by any microservice to secure its routes.
- Implement 'TokenValidatorService' to handle caching of public keys.

#### 1.2.2.5 Extraction Reasoning

Centralizing security logic prevents configuration drift and ensures all services enforce the same Zero Trust policies.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-FUNC-002

#### 1.2.3.2 Requirement Text

The system shall provide an interface... to define a service center's geographic service area... drawing a geofenced polygon.

#### 1.2.3.3 Validation Criteria

- Verify that TypeORM entities can easily use Geometry types.
- Verify GeoJSON validation logic is shared.

#### 1.2.3.4 Implementation Implications

- Implement custom TypeORM 'ValueTransformer' for PostGIS Geometry <-> GeoJSON conversion.
- Define standard 'GeoPoint' and 'GeoPolygon' DTOs with class-validator decorators.

#### 1.2.3.5 Extraction Reasoning

Geospatial logic is complex and specific to PostGIS; abstracting it here prevents errors in the Service Center and Geolocation services.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-PERF-001

#### 1.2.4.2 Requirement Text

The system's standard API endpoints must respond with a 95th percentile (P95) latency of less than 250 milliseconds.

#### 1.2.4.3 Validation Criteria

- Verify that shared middleware does not add >5ms latency.
- Verify that database connection pooling is configured optimally in the shared module.

#### 1.2.4.4 Implementation Implications

- Implement 'DatabaseModule' with optimized pool settings for TypeORM.
- Implement 'RedisCacheModule' to simplify caching implementation for consuming services.

#### 1.2.4.5 Extraction Reasoning

Standardizing infrastructure configuration is key to meeting performance SLAs across the ecosystem.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

AuthSharedModule

#### 1.3.1.2 Component Specification

Provides Guards, Strategies, and Decorators for JWT authentication and RBAC authorization.

#### 1.3.1.3 Implementation Requirements

- Export 'JwtAuthGuard' and 'RolesGuard'.
- Export 'User' decorator for extracting claims.
- Integrate with passport-jwt.

#### 1.3.1.4 Architectural Context

Cross-Cutting Security Layer

#### 1.3.1.5 Extraction Reasoning

Enforces REQ-SEC-001 across all microservices.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

ObservabilityModule

#### 1.3.2.2 Component Specification

Configures OpenTelemetry instrumentation, structured logging (Pino/Winston), and global exception filters.

#### 1.3.2.3 Implementation Requirements

- Auto-instrument HTTP and GRPC.
- Implement 'GlobalExceptionFilter' to format errors as RFC 7807 Problem Details.
- Propagate W3C Trace Context.

#### 1.3.2.4 Architectural Context

Cross-Cutting Observability Layer

#### 1.3.2.5 Extraction Reasoning

Standardizes logging and tracing for REQ-PERF-001 and debugging.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

DatabaseSharedModule

#### 1.3.3.2 Component Specification

Provides abstract 'BaseEntity', 'BaseRepository', and PostGIS configuration.

#### 1.3.3.3 Implementation Requirements

- Implement soft-delete logic in 'BaseRepository'.
- Provide 'GeoJsonTransformer' for spatial columns.

#### 1.3.3.4 Architectural Context

Data Access Foundation

#### 1.3.3.5 Extraction Reasoning

Standardizes data access patterns and geospatial handling (REQ-FUNC-002).

### 1.3.4.0 Component Name

#### 1.3.4.1 Component Name

EventBusModule

#### 1.3.4.2 Component Specification

Wraps Azure Service Bus SDK to enforce standard event envelopes and serialization.

#### 1.3.4.3 Implementation Requirements

- Export 'EventPublisher' service.
- Enforce 'IntegrationEvent' interface for all messages.

#### 1.3.4.4 Architectural Context

Messaging Infrastructure Layer

#### 1.3.4.5 Extraction Reasoning

Ensures consistent asynchronous communication schemas.

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Shared Kernel', 'layer_responsibilities': 'Enforce consistency, reduce code duplication, and standardize operational patterns (logging, security, error handling) across all microservices.', 'layer_constraints': ['Must not contain business domain logic (e.g., pricing rules).', 'Must be stateless.', 'Must be versioned strictly (SemVer).'], 'implementation_patterns': ['Library Pattern', 'Decorator Pattern', 'Template Method Pattern'], 'extraction_reasoning': 'Acts as the foundational substrate for the microservices architecture.'}

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

Azure Service Bus SDK

#### 1.5.1.2 Source Repository

Infrastructure (Azure)

#### 1.5.1.3 Method Contracts

- {'method_name': 'createSender', 'method_signature': 'createSender(queueName: string): ServiceBusSender', 'method_purpose': 'Creates a client to send messages.', 'integration_context': 'Wrapped by EventBusModule.'}

#### 1.5.1.4 Integration Pattern

SDK Wrapper

#### 1.5.1.5 Communication Protocol

AMQP

#### 1.5.1.6 Extraction Reasoning

Library abstracts this dependency to allow for easier testing and standardization.

### 1.5.2.0 Interface Name

#### 1.5.2.1 Interface Name

TypeORM DataSource

#### 1.5.2.2 Source Repository

Infrastructure (PostgreSQL)

#### 1.5.2.3 Method Contracts

- {'method_name': 'initialize', 'method_signature': 'initialize(): Promise<DataSource>', 'method_purpose': 'Establishes database connection pool.', 'integration_context': 'Wrapped by DatabaseSharedModule.'}

#### 1.5.2.4 Integration Pattern

ORM

#### 1.5.2.5 Communication Protocol

TCP

#### 1.5.2.6 Extraction Reasoning

Library provides the standard configuration for this connection.

## 1.6.0.0 Exposed Interfaces

- {'interface_name': 'Shared Library API', 'consumer_repositories': ['REPO-BS-001', 'REPO-BS-002', 'REPO-BS-003', 'REPO-BS-004', 'REPO-BS-005', 'REPO-BS-006', 'REPO-BS-007', 'REPO-BW-008', 'REPO-BW-009'], 'method_contracts': [{'method_name': 'AuthModule.registerAsync', 'method_signature': 'registerAsync(options: AuthModuleOptions): DynamicModule', 'method_purpose': 'Configures authentication for a microservice.', 'implementation_requirements': 'Accepts JWKS URI and Audience.'}, {'method_name': '@Audit()', 'method_signature': '@Audit(action: string, resource?: string)', 'method_purpose': 'Decorator to mark a controller method for audit logging.', 'implementation_requirements': 'Uses reflection to attach metadata.'}, {'method_name': 'BaseRepository.softDelete', 'method_signature': 'softDelete(id: string): Promise<void>', 'method_purpose': 'Performs a safe soft-delete operation.', 'implementation_requirements': 'Sets deletedAt timestamp.'}], 'service_level_requirements': ['Library load time < 50ms', 'Runtime overhead < 2ms per request'], 'implementation_constraints': ['Must be tree-shakeable', 'No side effects on import'], 'extraction_reasoning': 'These are the primary touchpoints for consuming microservices.'}

## 1.7.0.0 Technology Context

### 1.7.1.0 Framework Requirements

NestJS v10.3.x, Node.js, TypeScript

### 1.7.2.0 Integration Technologies

- NPM Registry (Private)
- OpenTelemetry
- Passport.js

### 1.7.3.0 Performance Constraints

Library code runs in the hot path of every request; zero-allocation patterns preferred where possible.

### 1.7.4.0 Security Requirements

JWT validation logic must adhere to OIDC standards. Configuration must be injected via environment variables.

## 1.8.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | Verified coverage of Security (Auth), Observabilit... |
| Cross Reference Validation | Confirmed usage by all backend services (BS-001 to... |
| Implementation Readiness Assessment | High. Patterns are standard NestJS idioms. |
| Quality Assurance Confirmation | The library enforces the architectural standards d... |

