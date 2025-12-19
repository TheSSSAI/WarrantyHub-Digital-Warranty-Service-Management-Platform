# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-001 |
| Extraction Timestamp | 2025-01-27T14:45:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-SEC-001

#### 1.2.1.2 Requirement Text

System-wide Authentication and Authorization enforcement via JWT.

#### 1.2.1.3 Validation Criteria

- Verify that all downstream services can validate tokens issued by this service.
- Verify RBAC roles are correctly embedded in token claims.

#### 1.2.1.4 Implementation Implications

- Implement OIDC compliant token issuance flow wrapping Azure AD B2C.
- Expose JWKS endpoint or metadata for API Gateway validation.

#### 1.2.1.5 Extraction Reasoning

Identity Service is the central authority for REQ-SEC-001, acting as the bridge between Azure AD B2C and the internal microservices.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-AUDIT-001

#### 1.2.2.2 Requirement Text

The system must record all critical actions in an immutable audit trail, including user logins and permission changes.

#### 1.2.2.3 Validation Criteria

- Verify 'UserLogin' and 'RoleChange' events are published to the message bus.
- Verify events contain actor ID, timestamp, and action details.

#### 1.2.2.4 Implementation Implications

- Integrate with Azure Service Bus to publish audit events asynchronously.
- Ensure transactional consistency between user creation and audit event publication.

#### 1.2.2.5 Extraction Reasoning

As the handler of logins and role changes, this service produces the highest volume of security-critical audit events.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

US-069

#### 1.2.3.2 Requirement Text

Service Center Admin: Add a new technician to the roster (Account Creation).

#### 1.2.3.3 Validation Criteria

- Verify Service Center Service can programmatically create user accounts via Identity Service.

#### 1.2.3.4 Implementation Implications

- Expose an internal administrative API for user provisioning.
- Secure this internal API with Service Principal authentication.

#### 1.2.3.5 Extraction Reasoning

Other services like Service Center Service need to create user accounts for their entities (Technicians) without manual sign-up.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

AuthManager

#### 1.3.1.2 Component Specification

Orchestrates login, refresh token, and logout flows, wrapping Azure AD B2C interaction.

#### 1.3.1.3 Implementation Requirements

- Implement Passport.js strategies.
- Manage refresh token rotation.

#### 1.3.1.4 Architectural Context

Application Service Layer - Security Facade

#### 1.3.1.5 Extraction Reasoning

Core component for US-096 (Login) handling.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

UserProvisioningService

#### 1.3.2.2 Component Specification

Manages the lifecycle of user entities, synchronizing between local DB profile data and B2C identity data.

#### 1.3.2.3 Implementation Requirements

- CRUD operations for User entity.
- Synchronization logic for B2C Graph API calls.

#### 1.3.2.4 Architectural Context

Domain Service

#### 1.3.2.5 Extraction Reasoning

Required for US-095 (Registration) and US-069 (Technician Creation).

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Identity Provider Interface

#### 1.4.1.2 Layer Responsibilities

Abstraction over Azure AD B2C to prevent vendor lock-in leaking into domain logic.

#### 1.4.1.3 Layer Constraints

- Must use Microsoft Graph API.
- Must handle B2C specific error codes.

#### 1.4.1.4 Implementation Patterns

- Adapter Pattern
- Proxy Pattern

#### 1.4.1.5 Extraction Reasoning

Decouples the system from specific IDP implementation details.

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Internal API Layer

#### 1.4.2.2 Layer Responsibilities

Exposing protected endpoints for other microservices to manage users.

#### 1.4.2.3 Layer Constraints

- Not exposed to public internet via Gateway (VNet internal only).

#### 1.4.2.4 Implementation Patterns

- Internal Microservice Endpoint

#### 1.4.2.5 Extraction Reasoning

Required for inter-service communication (Service Center -> Identity).

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IAzureAdB2CClient

#### 1.5.1.2 Source Repository

External (Microsoft Graph API)

#### 1.5.1.3 Method Contracts

##### 1.5.1.3.1 Method Name

###### 1.5.1.3.1.1 Method Name

CreateUser

###### 1.5.1.3.1.2 Method Signature

(userDto: CreateUserDto) => Promise<B2CUserObject>

###### 1.5.1.3.1.3 Method Purpose

Provision user in the directory.

###### 1.5.1.3.1.4 Integration Context

User Registration or Technician Onboarding.

##### 1.5.1.3.2.0 Method Name

###### 1.5.1.3.2.1 Method Name

UpdateUserAttributes

###### 1.5.1.3.2.2 Method Signature

(id: string, attributes: Partial<UserAttributes>) => Promise<void>

###### 1.5.1.3.2.3 Method Purpose

Update profile fields like Roles.

###### 1.5.1.3.2.4 Integration Context

Admin role assignment.

#### 1.5.1.4.0.0 Integration Pattern

HTTPS / SDK

#### 1.5.1.5.0.0 Communication Protocol

REST (Graph API)

#### 1.5.1.6.0.0 Extraction Reasoning

The service cannot function without the backing Identity Provider.

### 1.5.2.0.0.0 Interface Name

#### 1.5.2.1.0.0 Interface Name

IEventBus

#### 1.5.2.2.0.0 Source Repository

Infrastructure (Azure Service Bus)

#### 1.5.2.3.0.0 Method Contracts

##### 1.5.2.3.1.0 Method Name

###### 1.5.2.3.1.1 Method Name

PublishUserCreated

###### 1.5.2.3.1.2 Method Signature

(event: UserCreatedEvent) => Promise<void>

###### 1.5.2.3.1.3 Method Purpose

Notify other services (e.g. Profile, Search) of new user.

###### 1.5.2.3.1.4 Integration Context

After successful registration.

##### 1.5.2.3.2.0 Method Name

###### 1.5.2.3.2.1 Method Name

PublishAuditLog

###### 1.5.2.3.2.2 Method Signature

(event: AuditLogEntry) => Promise<void>

###### 1.5.2.3.2.3 Method Purpose

Send security events to Audit Service.

###### 1.5.2.3.2.4 Integration Context

On Login, Logout, or Role Change.

#### 1.5.2.4.0.0 Integration Pattern

Pub/Sub

#### 1.5.2.5.0.0 Communication Protocol

AMQP

#### 1.5.2.6.0.0 Extraction Reasoning

Critical for REQ-AUDIT-001 and decoupling user creation side effects.

## 1.6.0.0.0.0 Exposed Interfaces

### 1.6.1.0.0.0 Interface Name

#### 1.6.1.1.0.0 Interface Name

IIdentityPublicApi

#### 1.6.1.2.0.0 Consumer Repositories

- REPO-GW-013

#### 1.6.1.3.0.0 Method Contracts

##### 1.6.1.3.1.0 Method Name

###### 1.6.1.3.1.1 Method Name

POST /auth/login

###### 1.6.1.3.1.2 Method Signature

(credentials: LoginDto) => Promise<AuthTokens>

###### 1.6.1.3.1.3 Method Purpose

Authenticate user.

###### 1.6.1.3.1.4 Implementation Requirements

Rate limited, validates credentials.

##### 1.6.1.3.2.0 Method Name

###### 1.6.1.3.2.1 Method Name

POST /auth/register

###### 1.6.1.3.2.2 Method Signature

(data: RegisterDto) => Promise<UserDto>

###### 1.6.1.3.2.3 Method Purpose

Self-service user registration.

###### 1.6.1.3.2.4 Implementation Requirements

Validates inputs, calls B2C, saves local profile.

##### 1.6.1.3.3.0 Method Name

###### 1.6.1.3.3.1 Method Name

GET /.well-known/openid-configuration

###### 1.6.1.3.3.2 Method Signature

() => OIDCMetadata

###### 1.6.1.3.3.3 Method Purpose

Provide public keys for token validation to Gateway.

###### 1.6.1.3.3.4 Implementation Requirements

Proxies or serves static B2C metadata.

#### 1.6.1.4.0.0 Service Level Requirements

- 99.9% Availability
- < 250ms Latency

#### 1.6.1.5.0.0 Implementation Constraints

- Publicly accessible via Gateway

#### 1.6.1.6.0.0 Extraction Reasoning

Primary entry points for client applications (Web/Mobile).

### 1.6.2.0.0.0 Interface Name

#### 1.6.2.1.0.0 Interface Name

IUserManagementInternalApi

#### 1.6.2.2.0.0 Consumer Repositories

- REPO-BS-003

#### 1.6.2.3.0.0 Method Contracts

##### 1.6.2.3.1.0 Method Name

###### 1.6.2.3.1.1 Method Name

POST /internal/users

###### 1.6.2.3.1.2 Method Signature

(data: CreateTechnicianDto) => Promise<UserDto>

###### 1.6.2.3.1.3 Method Purpose

Allow Service Center service to create technician accounts programmatically.

###### 1.6.2.3.1.4 Implementation Requirements

Requires Service Principal Authentication.

##### 1.6.2.3.2.0 Method Name

###### 1.6.2.3.2.1 Method Name

PATCH /internal/users/{id}/status

###### 1.6.2.3.2.2 Method Signature

(id: string, status: UserStatus) => Promise<void>

###### 1.6.2.3.2.3 Method Purpose

Allow Service Center Admin to deactivate technicians.

###### 1.6.2.3.2.4 Implementation Requirements

Immediately revokes refresh tokens in B2C.

#### 1.6.2.4.0.0 Service Level Requirements

- High consistency

#### 1.6.2.5.0.0 Implementation Constraints

- Internal VNet Access Only

#### 1.6.2.6.0.0 Extraction Reasoning

Required for US-069 and US-071 (Technician management).

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

NestJS v10.3.x, Passport.js

### 1.7.2.0.0.0 Integration Technologies

- Azure AD B2C
- Microsoft Graph SDK
- Azure Service Bus

### 1.7.3.0.0.0 Performance Constraints

Token validation must be cached locally to minimize round-trips to B2C. 250ms latency target.

### 1.7.4.0.0.0 Security Requirements

Internal APIs must use mTLS or Service Principal tokens. All PII in local DB must be encrypted at rest.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | Mapped dependencies to Gateway (Public API), Servi... |
| Cross Reference Validation | Verified against REPO-BS-003 requirements for tech... |
| Implementation Readiness Assessment | High. Clear distinction between public Auth flows ... |
| Quality Assurance Confirmation | Integration design supports Defense in Depth by en... |

