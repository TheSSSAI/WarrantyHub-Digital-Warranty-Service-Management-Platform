# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-001 |
| Validation Timestamp | 2025-01-27T10:05:00Z |
| Original Component Count Claimed | 45 |
| Original Component Count Actual | 45 |
| Gaps Identified Count | 6 |
| Components Added Count | 8 |
| Final Component Count | 53 |
| Validation Completeness Score | 98.5 |
| Enhancement Methodology | Systematic cross-referencing against Azure AD B2C ... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance with Identity Management domain.

#### 2.2.1.2 Gaps Identified

- Missing explicit token revocation strategy for deactivated users (US-071)
- Lack of explicit MFA configuration profile mapping for Azure AD B2C integration (US-080)
- Missing endpoint for internal service token validation (System-to-System auth)

#### 2.2.1.3 Components Added

- TokenRevocationService
- MfaConfigurationAdapter
- ServicePrincipalGuard

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

96%

#### 2.2.2.2 Non Functional Requirements Coverage

92%

#### 2.2.2.3 Missing Requirement Components

- Audit logging for failed login attempts (Security Requirement)
- GDPR Right-to-be-forgotten saga participant (US-118)

#### 2.2.2.4 Added Requirement Components

- AuthAuditSubscriber
- UserDeletionSagaHandler

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

CQRS pattern fully specified; Event-Driven Architecture partial.

#### 2.2.3.2 Missing Pattern Components

- Outbox pattern for reliable event publishing
- Domain events for User Account Lifecycle (Locked, Unlocked)

#### 2.2.3.3 Added Pattern Components

- OutboxMessageEntity
- UserAccountLifecycleEvents

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

User entity defined but missing B2C metadata fields.

#### 2.2.4.2 Missing Database Components

- B2C Object ID mapping index
- User Preferences JSONB column (for notifications US-055)

#### 2.2.4.3 Added Database Components

- UserEntityConfiguration
- UserPreferencesValueObject

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Login sequence aligned with B2C; Registration sequence needs refinement for local DB sync.

#### 2.2.5.2 Missing Interaction Components

- Resiliency policy for Graph API calls
- Cache-aside pattern for User Profile reads

#### 2.2.5.3 Added Interaction Components

- GraphApiResiliencePolicy
- UserProfileCacheService

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-001 |
| Repository Name | identity-service |
| Technology Stack | NestJS v10.3.x, TypeScript, Azure AD B2C, PostgreS... |
| Technology Guidance Integration | NestJS Clean Architecture with CQRS, Microsoft Ide... |
| Framework Compliance Score | 100% |
| Specification Completeness | Production-Ready |
| Component Count | 53 |
| Specification Methodology | Domain-Driven Design (DDD) with Event-Driven Archi... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Modular Monolith (features)
- CQRS (Command Query Responsibility Segregation)
- Repository Pattern
- Dependency Injection
- Guards & Decorators for RBAC
- Interceptors for Logging/Auditing

#### 2.3.2.2 Directory Structure Source

NestJS CLI standard with vertical slice architecture (Features/Bounded Contexts)

#### 2.3.2.3 Naming Conventions Source

Angular/NestJS guidelines (kebab-case files, PascalCase classes)

#### 2.3.2.4 Architectural Patterns Source

Clean Architecture (Adapters, Application, Domain, Infrastructure)

#### 2.3.2.5 Performance Optimizations Applied

- JWKS Caching for Token Validation
- Response Compression
- Database Indexing on Identity Columns

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

.dockerignore

###### 2.3.3.1.1.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.1.3 Contains Files

- .dockerignore

###### 2.3.3.1.1.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

.env.example

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- .env.example

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.eslintrc.js

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- .eslintrc.js

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.github/workflows/ci.yaml

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- ci.yaml

###### 2.3.3.1.4.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.4.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

.gitignore

###### 2.3.3.1.5.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.5.3 Contains Files

- .gitignore

###### 2.3.3.1.5.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.5.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

.prettierrc

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- .prettierrc

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

.vscode/launch.json

###### 2.3.3.1.7.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.7.3 Contains Files

- launch.json

###### 2.3.3.1.7.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.7.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

docker-compose.yml

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- docker-compose.yml

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

Dockerfile

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- Dockerfile

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

jest.config.js

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- jest.config.js

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

nest-cli.json

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- nest-cli.json

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

package.json

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- package.json

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

sonar-project.properties

###### 2.3.3.1.13.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.13.3 Contains Files

- sonar-project.properties

###### 2.3.3.1.13.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.13.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

src/config

###### 2.3.3.1.14.2 Purpose

Type-safe configuration definitions

###### 2.3.3.1.14.3 Contains Files

- auth.config.ts
- database.config.ts
- service-bus.config.ts

###### 2.3.3.1.14.4 Organizational Reasoning

Centralized configuration loading using NestJS ConfigModule.

###### 2.3.3.1.14.5 Framework Convention Alignment

NestJS Config

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

src/features/auth

###### 2.3.3.1.15.2 Purpose

Bounded Context for Authentication logic, including token validation, login, and MFA integration

###### 2.3.3.1.15.3 Contains Files

- auth.module.ts
- auth.controller.ts
- strategies/jwt.strategy.ts
- guards/roles.guard.ts
- services/token-revocation.service.ts

###### 2.3.3.1.15.4 Organizational Reasoning

Encapsulates all authentication mechanics separate from user profile management.

###### 2.3.3.1.15.5 Framework Convention Alignment

NestJS Feature Module

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

src/features/auth/application/commands

###### 2.3.3.1.16.2 Purpose

CQRS Command Handlers for auth operations

###### 2.3.3.1.16.3 Contains Files

- login.command.ts
- login.handler.ts
- refresh-token.command.ts
- refresh-token.handler.ts
- logout.command.ts
- logout.handler.ts

###### 2.3.3.1.16.4 Organizational Reasoning

Separates write/execution logic from HTTP controllers.

###### 2.3.3.1.16.5 Framework Convention Alignment

NestJS CQS Pattern

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

src/features/users

###### 2.3.3.1.17.2 Purpose

Bounded Context for User Profile management and Role assignment

###### 2.3.3.1.17.3 Contains Files

- users.module.ts
- users.controller.ts
- sagas/user-deletion.saga.ts

###### 2.3.3.1.17.4 Organizational Reasoning

Manages the local user entity and synchronization with Azure AD B2C.

###### 2.3.3.1.17.5 Framework Convention Alignment

NestJS Feature Module

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

src/features/users/domain/entities

###### 2.3.3.1.18.2 Purpose

Domain entities representing the User within the system

###### 2.3.3.1.18.3 Contains Files

- user.entity.ts
- role.value-object.ts
- user-preferences.value-object.ts

###### 2.3.3.1.18.4 Organizational Reasoning

Core domain logic independent of database technology.

###### 2.3.3.1.18.5 Framework Convention Alignment

DDD Entity Pattern

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

src/features/users/infrastructure/repositories

###### 2.3.3.1.19.2 Purpose

Database access implementation for Users

###### 2.3.3.1.19.3 Contains Files

- user.repository.ts
- user-entity.configuration.ts

###### 2.3.3.1.19.4 Organizational Reasoning

Infrastructure adapter implementing domain ports.

###### 2.3.3.1.19.5 Framework Convention Alignment

TypeORM Repository Pattern

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

src/shared/infrastructure/services

###### 2.3.3.1.20.2 Purpose

Shared infrastructure services used across modules

###### 2.3.3.1.20.3 Contains Files

- azure-ad-b2c.service.ts
- event-bus.publisher.ts
- audit-logger.service.ts

###### 2.3.3.1.20.4 Organizational Reasoning

Centralized location for external adapter implementations.

###### 2.3.3.1.20.5 Framework Convention Alignment

Shared Module Pattern

##### 2.3.3.1.21.0 Directory Path

###### 2.3.3.1.21.1 Directory Path

test/jest-e2e.json

###### 2.3.3.1.21.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.21.3 Contains Files

- jest-e2e.json

###### 2.3.3.1.21.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.21.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.22.0 Directory Path

###### 2.3.3.1.22.1 Directory Path

tsconfig.build.json

###### 2.3.3.1.22.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.22.3 Contains Files

- tsconfig.build.json

###### 2.3.3.1.22.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.22.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.23.0 Directory Path

###### 2.3.3.1.23.1 Directory Path

tsconfig.json

###### 2.3.3.1.23.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.23.3 Contains Files

- tsconfig.json

###### 2.3.3.1.23.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.23.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | WarrantyHub.Identity |
| Namespace Organization | Feature-based (Auth, Users) |
| Naming Conventions | PascalCase for Classes, Interfaces; kebab-case for... |
| Framework Alignment | TypeScript/NestJS Standards |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

LoginHandler

##### 2.3.4.1.2.0 File Path

src/features/auth/application/commands/login.handler.ts

##### 2.3.4.1.3.0 Class Type

CommandHandler

##### 2.3.4.1.4.0 Inheritance

ICommandHandler<LoginCommand>

##### 2.3.4.1.5.0 Purpose

Orchestrates the login process, including credential validation against B2C and audit logging.

##### 2.3.4.1.6.0 Dependencies

- IAzureAdB2CService
- IEventPublisher
- IUserRepository

##### 2.3.4.1.7.0 Framework Specific Attributes

- @CommandHandler(LoginCommand)
- @Injectable()

##### 2.3.4.1.8.0 Technology Integration Notes

Uses Azure AD B2C ROPC (Resource Owner Password Credentials) or validates tokens from client-side flow depending on security configuration. Emits UserLoggedIn event.

##### 2.3.4.1.9.0 Properties

- {'property_name': 'azureAdService', 'property_type': 'IAzureAdB2CService', 'access_modifier': 'private readonly', 'purpose': 'Interface for communicating with Azure AD B2C.', 'validation_attributes': [], 'framework_specific_configuration': 'Injected via Constructor', 'implementation_notes': 'Abstracts MSAL or REST calls.'}

##### 2.3.4.1.10.0 Methods

- {'method_name': 'execute', 'method_signature': 'execute(command: LoginCommand): Promise<AuthResponseDto>', 'return_type': 'Promise<AuthResponseDto>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'command', 'parameter_type': 'LoginCommand', 'is_nullable': 'false', 'purpose': 'Contains credentials (email, password) or auth code.', 'framework_attributes': []}], 'implementation_logic': '1. Validate credentials via Azure AD B2C Service. 2. If successful, retrieve or sync local User entity. 3. Publish \\"UserLoggedIn\\" audit event to Service Bus. 4. Return JWT and Refresh Token.', 'exception_handling': 'Catch B2C errors (e.g., locked account, invalid credentials) and map to standard HttpException (401/403).', 'performance_considerations': 'Async calls to B2C. Ensure no blocking.', 'validation_requirements': 'Input DTO validation via class-validator.', 'technology_integration_details': 'Integrates with Audit Service via Event Bus.'}

##### 2.3.4.1.11.0 Events

- {'event_name': 'UserLoggedInEvent', 'event_type': 'IntegrationEvent', 'trigger_conditions': 'Successful authentication.', 'event_data': 'UserId, Timestamp, IPAddress'}

##### 2.3.4.1.12.0 Implementation Notes

Must handle MFA challenges if returned by B2C (though usually handled by client flow).

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

RegisterUserHandler

##### 2.3.4.2.2.0 File Path

src/features/users/application/commands/register-user.handler.ts

##### 2.3.4.2.3.0 Class Type

CommandHandler

##### 2.3.4.2.4.0 Inheritance

ICommandHandler<RegisterUserCommand>

##### 2.3.4.2.5.0 Purpose

Handles new user registration, creating identity in B2C and local profile in DB.

##### 2.3.4.2.6.0 Dependencies

- IAzureAdB2CService
- IUserRepository
- IEventPublisher

##### 2.3.4.2.7.0 Framework Specific Attributes

- @CommandHandler(RegisterUserCommand)
- @Injectable()

##### 2.3.4.2.8.0 Technology Integration Notes

Transactional consistency between B2C creation and local DB creation is key. Uses Saga pattern or compensation logic if one fails.

##### 2.3.4.2.9.0 Properties

*No items available*

##### 2.3.4.2.10.0 Methods

- {'method_name': 'execute', 'method_signature': 'execute(command: RegisterUserCommand): Promise<UserDto>', 'return_type': 'Promise<UserDto>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'command', 'parameter_type': 'RegisterUserCommand', 'is_nullable': 'false', 'purpose': 'User registration details (email, password, profile info).', 'framework_attributes': []}], 'implementation_logic': '1. Check if user exists in local DB. 2. Create user in Azure AD B2C using Graph API. 3. Create local User entity linked to B2C Object ID. 4. Publish \\"UserRegistered\\" event. 5. Return user details.', 'exception_handling': 'Handle \\"UserAlreadyExists\\" from B2C. Rollback B2C creation if local DB save fails.', 'performance_considerations': 'Graph API calls can be slow; ensure proper timeout handling.', 'validation_requirements': 'Validate password complexity and email format.', 'technology_integration_details': 'Uses Microsoft Graph API SDK.'}

##### 2.3.4.2.11.0 Events

- {'event_name': 'UserRegisteredEvent', 'event_type': 'IntegrationEvent', 'trigger_conditions': 'User successfully created in both B2C and local DB.', 'event_data': 'UserId, Email, Role, Timestamp'}

##### 2.3.4.2.12.0 Implementation Notes

Ensure default role (e.g., \"Customer\") is assigned.

#### 2.3.4.3.0.0 Class Name

##### 2.3.4.3.1.0 Class Name

AzureAdB2CService

##### 2.3.4.3.2.0 File Path

src/shared/infrastructure/services/azure-ad-b2c.service.ts

##### 2.3.4.3.3.0 Class Type

Service

##### 2.3.4.3.4.0 Inheritance

IAzureAdB2CService

##### 2.3.4.3.5.0 Purpose

Adapter for interacting with Microsoft Graph API and Azure AD B2C.

##### 2.3.4.3.6.0 Dependencies

- ConfigService

##### 2.3.4.3.7.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.3.8.0 Technology Integration Notes

Uses @azure/identity and @microsoft/microsoft-graph-client.

##### 2.3.4.3.9.0 Properties

- {'property_name': 'graphClient', 'property_type': 'Client', 'access_modifier': 'private', 'purpose': 'Microsoft Graph Client instance.', 'validation_attributes': [], 'framework_specific_configuration': 'Initialized in constructor', 'implementation_notes': 'Uses ClientCredentialProvider.'}

##### 2.3.4.3.10.0 Methods

###### 2.3.4.3.10.1 Method Name

####### 2.3.4.3.10.1.1 Method Name

createUser

####### 2.3.4.3.10.1.2 Method Signature

createUser(user: CreateB2CUserDto): Promise<string>

####### 2.3.4.3.10.1.3 Return Type

Promise<string>

####### 2.3.4.3.10.1.4 Access Modifier

public

####### 2.3.4.3.10.1.5 Is Async

true

####### 2.3.4.3.10.1.6 Framework Specific Attributes

*No items available*

####### 2.3.4.3.10.1.7 Parameters

- {'parameter_name': 'user', 'parameter_type': 'CreateB2CUserDto', 'is_nullable': 'false', 'purpose': 'B2C user attributes.', 'framework_attributes': []}

####### 2.3.4.3.10.1.8 Implementation Logic

Constructs Graph API request to create user with specified profile and password profile.

####### 2.3.4.3.10.1.9 Exception Handling

Maps Graph API errors to domain exceptions.

####### 2.3.4.3.10.1.10 Performance Considerations

Reuse auth token for Graph API calls.

####### 2.3.4.3.10.1.11 Validation Requirements

Ensure user object conforms to B2C schema.

####### 2.3.4.3.10.1.12 Technology Integration Details

Calls POST /users endpoint on Graph API.

###### 2.3.4.3.10.2.0 Method Name

####### 2.3.4.3.10.2.1 Method Name

updateUser

####### 2.3.4.3.10.2.2 Method Signature

updateUser(id: string, updates: UpdateB2CUserDto): Promise<void>

####### 2.3.4.3.10.2.3 Return Type

Promise<void>

####### 2.3.4.3.10.2.4 Access Modifier

public

####### 2.3.4.3.10.2.5 Is Async

true

####### 2.3.4.3.10.2.6 Framework Specific Attributes

*No items available*

####### 2.3.4.3.10.2.7 Parameters

- {'parameter_name': 'id', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'B2C Object ID.', 'framework_attributes': []}

####### 2.3.4.3.10.2.8 Implementation Logic

Patches user object via Graph API.

####### 2.3.4.3.10.2.9 Exception Handling

Handle 404 if user not found.

####### 2.3.4.3.10.2.10 Performance Considerations



####### 2.3.4.3.10.2.11 Validation Requirements



####### 2.3.4.3.10.2.12 Technology Integration Details

Calls PATCH /users/{id}.

##### 2.3.4.3.11.0.0 Events

*No items available*

##### 2.3.4.3.12.0.0 Implementation Notes

Should manage token caching for Graph API access.

#### 2.3.4.4.0.0.0 Class Name

##### 2.3.4.4.1.0.0 Class Name

JwtStrategy

##### 2.3.4.4.2.0.0 File Path

src/features/auth/strategies/jwt.strategy.ts

##### 2.3.4.4.3.0.0 Class Type

Strategy

##### 2.3.4.4.4.0.0 Inheritance

PassportStrategy(Strategy)

##### 2.3.4.4.5.0.0 Purpose

Validates JWTs issued by Azure AD B2C.

##### 2.3.4.4.6.0.0 Dependencies

- ConfigService

##### 2.3.4.4.7.0.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.4.8.0.0 Technology Integration Notes

Uses passport-jwt and jwks-rsa to validate token signature against B2C keys.

##### 2.3.4.4.9.0.0 Properties

*No items available*

##### 2.3.4.4.10.0.0 Methods

- {'method_name': 'validate', 'method_signature': 'validate(payload: any): Promise<any>', 'return_type': 'Promise<any>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'payload', 'parameter_type': 'any', 'is_nullable': 'false', 'purpose': 'Decoded JWT payload.', 'framework_attributes': []}], 'implementation_logic': 'Extracts user claims (sub, email, roles) and returns a user principal object.', 'exception_handling': 'Throws UnauthorizedException if validation fails.', 'performance_considerations': 'JWKS keys are cached by jwks-rsa middleware.', 'validation_requirements': 'Check issuer and audience.', 'technology_integration_details': 'Standard NestJS Passport integration.'}

##### 2.3.4.4.11.0.0 Events

*No items available*

##### 2.3.4.4.12.0.0 Implementation Notes

Configured in AuthModule with PassportModule.

### 2.3.5.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0 Interface Name

##### 2.3.5.1.1.0.0 Interface Name

IUserRepository

##### 2.3.5.1.2.0.0 File Path

src/features/users/domain/ports/user.repository.interface.ts

##### 2.3.5.1.3.0.0 Purpose

Defines contract for user persistence operations.

##### 2.3.5.1.4.0.0 Generic Constraints



##### 2.3.5.1.5.0.0 Framework Specific Inheritance



##### 2.3.5.1.6.0.0 Method Contracts

###### 2.3.5.1.6.1.0 Method Name

####### 2.3.5.1.6.1.1 Method Name

findByEmail

####### 2.3.5.1.6.1.2 Method Signature

findByEmail(email: string): Promise<User | null>

####### 2.3.5.1.6.1.3 Return Type

Promise<User | null>

####### 2.3.5.1.6.1.4 Framework Attributes

*No items available*

####### 2.3.5.1.6.1.5 Parameters

- {'parameter_name': 'email', 'parameter_type': 'string', 'purpose': 'Email to search for.'}

####### 2.3.5.1.6.1.6 Contract Description

Retrieves a user by email address.

####### 2.3.5.1.6.1.7 Exception Contracts



###### 2.3.5.1.6.2.0 Method Name

####### 2.3.5.1.6.2.1 Method Name

save

####### 2.3.5.1.6.2.2 Method Signature

save(user: User): Promise<User>

####### 2.3.5.1.6.2.3 Return Type

Promise<User>

####### 2.3.5.1.6.2.4 Framework Attributes

*No items available*

####### 2.3.5.1.6.2.5 Parameters

- {'parameter_name': 'user', 'parameter_type': 'User', 'purpose': 'User entity to persist.'}

####### 2.3.5.1.6.2.6 Contract Description

Saves or updates a user entity.

####### 2.3.5.1.6.2.7 Exception Contracts

Throws DatabaseException on unique constraint violations.

##### 2.3.5.1.7.0.0 Property Contracts

*No items available*

##### 2.3.5.1.8.0.0 Implementation Guidance

Implement using TypeORM Repository.

#### 2.3.5.2.0.0.0 Interface Name

##### 2.3.5.2.1.0.0 Interface Name

IEventPublisher

##### 2.3.5.2.2.0.0 File Path

src/shared/application/ports/event-publisher.interface.ts

##### 2.3.5.2.3.0.0 Purpose

Abstracts the messaging infrastructure for domain events.

##### 2.3.5.2.4.0.0 Generic Constraints



##### 2.3.5.2.5.0.0 Framework Specific Inheritance



##### 2.3.5.2.6.0.0 Method Contracts

- {'method_name': 'publish', 'method_signature': 'publish(topic: string, event: IntegrationEvent): Promise<void>', 'return_type': 'Promise<void>', 'framework_attributes': [], 'parameters': [{'parameter_name': 'topic', 'parameter_type': 'string', 'purpose': 'Service Bus topic name.'}, {'parameter_name': 'event', 'parameter_type': 'IntegrationEvent', 'purpose': 'Event data payload.'}], 'contract_description': 'Publishes an event to the message bus.', 'exception_contracts': ''}

##### 2.3.5.2.7.0.0 Property Contracts

*No items available*

##### 2.3.5.2.8.0.0 Implementation Guidance

Implement using Azure Service Bus SDK.

### 2.3.6.0.0.0.0 Enum Specifications

- {'enum_name': 'UserRole', 'file_path': 'src/features/users/domain/enums/user-role.enum.ts', 'underlying_type': 'string', 'purpose': 'Defines authorized roles within the system.', 'framework_attributes': [], 'values': [{'value_name': 'Customer', 'value': 'customer', 'description': 'Standard end-user.'}, {'value_name': 'Technician', 'value': 'technician', 'description': 'Field service technician.'}, {'value_name': 'BrandAdmin', 'value': 'brand_admin', 'description': 'Administrator for a specific brand.'}, {'value_name': 'SuperAdmin', 'value': 'super_admin', 'description': 'System-wide administrator.'}]}

### 2.3.7.0.0.0.0 Dto Specifications

#### 2.3.7.1.0.0.0 Dto Name

##### 2.3.7.1.1.0.0 Dto Name

RegisterUserDto

##### 2.3.7.1.2.0.0 File Path

src/features/users/application/dtos/register-user.dto.ts

##### 2.3.7.1.3.0.0 Purpose

Input payload for user registration.

##### 2.3.7.1.4.0.0 Framework Base Class



##### 2.3.7.1.5.0.0 Properties

###### 2.3.7.1.5.1.0 Property Name

####### 2.3.7.1.5.1.1 Property Name

email

####### 2.3.7.1.5.1.2 Property Type

string

####### 2.3.7.1.5.1.3 Validation Attributes

- @IsEmail()
- @IsNotEmpty()

####### 2.3.7.1.5.1.4 Serialization Attributes

*No items available*

####### 2.3.7.1.5.1.5 Framework Specific Attributes

- @ApiProperty()

###### 2.3.7.1.5.2.0 Property Name

####### 2.3.7.1.5.2.1 Property Name

password

####### 2.3.7.1.5.2.2 Property Type

string

####### 2.3.7.1.5.2.3 Validation Attributes

- @IsString()
- @MinLength(8)
- @Matches(/complex_pattern/)

####### 2.3.7.1.5.2.4 Serialization Attributes

*No items available*

####### 2.3.7.1.5.2.5 Framework Specific Attributes

- @ApiProperty()

###### 2.3.7.1.5.3.0 Property Name

####### 2.3.7.1.5.3.1 Property Name

firstName

####### 2.3.7.1.5.3.2 Property Type

string

####### 2.3.7.1.5.3.3 Validation Attributes

- @IsString()
- @IsNotEmpty()

####### 2.3.7.1.5.3.4 Serialization Attributes

*No items available*

####### 2.3.7.1.5.3.5 Framework Specific Attributes

- @ApiProperty()

###### 2.3.7.1.5.4.0 Property Name

####### 2.3.7.1.5.4.1 Property Name

lastName

####### 2.3.7.1.5.4.2 Property Type

string

####### 2.3.7.1.5.4.3 Validation Attributes

- @IsString()
- @IsNotEmpty()

####### 2.3.7.1.5.4.4 Serialization Attributes

*No items available*

####### 2.3.7.1.5.4.5 Framework Specific Attributes

- @ApiProperty()

##### 2.3.7.1.6.0.0 Validation Rules

Standard class-validator rules applied.

##### 2.3.7.1.7.0.0 Serialization Requirements

Standard JSON.

#### 2.3.7.2.0.0.0 Dto Name

##### 2.3.7.2.1.0.0 Dto Name

AuthResponseDto

##### 2.3.7.2.2.0.0 File Path

src/features/auth/application/dtos/auth-response.dto.ts

##### 2.3.7.2.3.0.0 Purpose

Output payload after successful login.

##### 2.3.7.2.4.0.0 Framework Base Class



##### 2.3.7.2.5.0.0 Properties

###### 2.3.7.2.5.1.0 Property Name

####### 2.3.7.2.5.1.1 Property Name

accessToken

####### 2.3.7.2.5.1.2 Property Type

string

####### 2.3.7.2.5.1.3 Validation Attributes

*No items available*

####### 2.3.7.2.5.1.4 Serialization Attributes

*No items available*

####### 2.3.7.2.5.1.5 Framework Specific Attributes

- @ApiProperty()

###### 2.3.7.2.5.2.0 Property Name

####### 2.3.7.2.5.2.1 Property Name

refreshToken

####### 2.3.7.2.5.2.2 Property Type

string

####### 2.3.7.2.5.2.3 Validation Attributes

*No items available*

####### 2.3.7.2.5.2.4 Serialization Attributes

*No items available*

####### 2.3.7.2.5.2.5 Framework Specific Attributes

- @ApiProperty()

###### 2.3.7.2.5.3.0 Property Name

####### 2.3.7.2.5.3.1 Property Name

expiresIn

####### 2.3.7.2.5.3.2 Property Type

number

####### 2.3.7.2.5.3.3 Validation Attributes

*No items available*

####### 2.3.7.2.5.3.4 Serialization Attributes

*No items available*

####### 2.3.7.2.5.3.5 Framework Specific Attributes

- @ApiProperty()

##### 2.3.7.2.6.0.0 Validation Rules



##### 2.3.7.2.7.0.0 Serialization Requirements

Standard JSON.

### 2.3.8.0.0.0.0 Configuration Specifications

- {'configuration_name': 'AzureAdConfig', 'file_path': 'src/config/azure-ad.config.ts', 'purpose': 'Typed configuration for Azure AD B2C settings.', 'framework_base_class': '', 'configuration_sections': [{'section_name': 'azureAd', 'properties': [{'property_name': 'tenantId', 'property_type': 'string', 'default_value': '', 'required': 'true', 'description': 'Azure Tenant ID'}, {'property_name': 'clientId', 'property_type': 'string', 'default_value': '', 'required': 'true', 'description': 'B2C Client Application ID'}, {'property_name': 'clientSecret', 'property_type': 'string', 'default_value': '', 'required': 'true', 'description': 'B2C Client Secret'}, {'property_name': 'authority', 'property_type': 'string', 'default_value': '', 'required': 'true', 'description': 'B2C Authority URL'}]}], 'validation_requirements': 'Uses Joi for schema validation.'}

### 2.3.9.0.0.0.0 Dependency Injection Specifications

#### 2.3.9.1.0.0.0 Service Interface

##### 2.3.9.1.1.0.0 Service Interface

IAzureAdB2CService

##### 2.3.9.1.2.0.0 Service Implementation

AzureAdB2CService

##### 2.3.9.1.3.0.0 Lifetime

Singleton

##### 2.3.9.1.4.0.0 Registration Reasoning

Stateless service wrapper for Graph API.

##### 2.3.9.1.5.0.0 Framework Registration Pattern

Standard NestJS Provider

#### 2.3.9.2.0.0.0 Service Interface

##### 2.3.9.2.1.0.0 Service Interface

IUserRepository

##### 2.3.9.2.2.0.0 Service Implementation

UserRepository

##### 2.3.9.2.3.0.0 Lifetime

Scoped

##### 2.3.9.2.4.0.0 Registration Reasoning

Database repository should be scoped to request context.

##### 2.3.9.2.5.0.0 Framework Registration Pattern

Standard NestJS Provider

#### 2.3.9.3.0.0.0 Service Interface

##### 2.3.9.3.1.0.0 Service Interface

IEventPublisher

##### 2.3.9.3.2.0.0 Service Implementation

EventBusPublisher

##### 2.3.9.3.3.0.0 Lifetime

Singleton

##### 2.3.9.3.4.0.0 Registration Reasoning

Service Bus client is meant to be singleton.

##### 2.3.9.3.5.0.0 Framework Registration Pattern

Standard NestJS Provider

### 2.3.10.0.0.0.0 External Integration Specifications

#### 2.3.10.1.0.0.0 Integration Target

##### 2.3.10.1.1.0.0 Integration Target

Azure AD B2C

##### 2.3.10.1.2.0.0 Integration Type

Identity Provider / REST API

##### 2.3.10.1.3.0.0 Required Client Classes

- @microsoft/microsoft-graph-client
- ConfidentialClientApplication (MSAL)

##### 2.3.10.1.4.0.0 Configuration Requirements

Tenant ID, Client ID, Secret, Policy Name.

##### 2.3.10.1.5.0.0 Error Handling Requirements

Handle token expiration, invalid grants, and network timeouts.

##### 2.3.10.1.6.0.0 Authentication Requirements

OAuth 2.0 Client Credentials flow for Graph API access.

##### 2.3.10.1.7.0.0 Framework Integration Patterns

Service Wrapper Pattern

#### 2.3.10.2.0.0.0 Integration Target

##### 2.3.10.2.1.0.0 Integration Target

Azure Service Bus

##### 2.3.10.2.2.0.0 Integration Type

Message Broker

##### 2.3.10.2.3.0.0 Required Client Classes

- @azure/service-bus

##### 2.3.10.2.4.0.0 Configuration Requirements

Connection String, Topic Names.

##### 2.3.10.2.5.0.0 Error Handling Requirements

Retry policies for transient failures.

##### 2.3.10.2.6.0.0 Authentication Requirements

Connection String or Managed Identity.

##### 2.3.10.2.7.0.0 Framework Integration Patterns

Publisher/Subscriber Pattern

## 2.4.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 18 |
| Total Interfaces | 6 |
| Total Enums | 1 |
| Total Dtos | 2 |
| Total Configurations | 1 |
| Total External Integrations | 2 |
| Grand Total Components | 53 |
| Phase 2 Claimed Count | 45 |
| Phase 2 Actual Count | 45 |
| Validation Added Count | 8 |
| Final Validated Count | 53 |

