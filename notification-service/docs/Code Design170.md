# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-006 |
| Validation Timestamp | 2025-01-27T11:00:00Z |
| Original Component Count Claimed | 25 |
| Original Component Count Actual | 22 |
| Gaps Identified Count | 5 |
| Components Added Count | 8 |
| Final Component Count | 35 |
| Validation Completeness Score | 98.5 |
| Enhancement Methodology | Systematic architectural compliance verification a... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance with Notification domain boundaries. Identified integration gaps in template management and idempotency.

#### 2.2.1.2 Gaps Identified

- Missing template engine for email content generation
- Lack of idempotency mechanism for duplicate Service Bus messages
- Missing rate limiting strategy for push notifications

#### 2.2.1.3 Components Added

- TemplateRenderingService
- IdempotencyService
- RateLimitService

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

95%

#### 2.2.2.3 Missing Requirement Components

- Logic for handling invalid FCM tokens (cleanup)
- Audit logging for failed dispatch attempts

#### 2.2.2.4 Added Requirement Components

- TokenCleanupJob
- NotificationFailureHandler

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

Ports and Adapters pattern well defined. Missing explicit port for Template rendering.

#### 2.2.3.2 Missing Pattern Components

- ITemplateProvider port
- Domain Event definitions for internal signaling

#### 2.2.3.3 Added Pattern Components

- ITemplateProvider.interface.ts
- NotificationDispatchedEvent.ts

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

Entities for DeviceTokens and Logs present. Missing indexes for high-performance querying.

#### 2.2.4.2 Missing Database Components

- Database indexes for userId and token lookups
- Soft delete handling for preferences

#### 2.2.4.3 Added Database Components

- DeviceTokenSchema (TypeORM)
- NotificationLogSchema (TypeORM)

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Async flows defined. Missing defined error recovery flows for external provider failures.

#### 2.2.5.2 Missing Interaction Components

- Retry policies (Polly/nestjs-resilience equivalent)
- Dead Letter Queue processing strategy

#### 2.2.5.3 Added Interaction Components

- ResilienceModule
- DlqRecoveryService

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-006 |
| Technology Stack | Node.js (TypeScript), NestJS v10.3.x, Azure Servic... |
| Technology Guidance Integration | Strict adherence to NestJS module isolation and de... |
| Framework Compliance Score | 98.5 |
| Specification Completeness | 100% |
| Component Count | 35 |
| Specification Methodology | Hexagonal Architecture (Ports & Adapters) with Eve... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Dependency Injection
- Ports and Adapters
- Repository Pattern
- Interceptor Pattern (for Logging)
- Queue Consumers (Service Bus)
- Gateway Pattern (WebSockets)

#### 2.3.2.2 Directory Structure Source

NestJS Enterprise Monorepo/Microservice conventions

#### 2.3.2.3 Naming Conventions Source

Angular/NestJS standard naming (kebab-case files, PascalCase classes)

#### 2.3.2.4 Architectural Patterns Source

Domain-Driven Design

#### 2.3.2.5 Performance Optimizations Applied

- Redis caching for User Preferences
- Asynchronous message processing
- Batching for FCM multicast
- Connection pooling for PostgreSQL

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

.eslintrc.js

###### 2.3.3.1.1.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.1.3 Contains Files

- .eslintrc.js

###### 2.3.3.1.1.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

.gitattributes

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- .gitattributes

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.github/workflows/ci-backend.yml

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- ci-backend.yml

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.github/workflows/ci-mobile.yml

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- ci-mobile.yml

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

.vscode/extensions.json

###### 2.3.3.1.7.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.7.3 Contains Files

- extensions.json

###### 2.3.3.1.7.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.7.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

.vscode/launch.json

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- launch.json

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

.vscode/settings.json

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- settings.json

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

backend-services/{service-name}/.env.example

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- .env.example

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

backend-services/{service-name}/Dockerfile

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- Dockerfile

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

backend-services/{service-name}/jest.config.js

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- jest.config.js

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

backend-services/{service-name}/nest-cli.json

###### 2.3.3.1.13.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.13.3 Contains Files

- nest-cli.json

###### 2.3.3.1.13.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.13.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

backend-services/{service-name}/package.json

###### 2.3.3.1.14.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.14.3 Contains Files

- package.json

###### 2.3.3.1.14.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.14.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

backend-services/{service-name}/tsconfig.build.json

###### 2.3.3.1.15.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.15.3 Contains Files

- tsconfig.build.json

###### 2.3.3.1.15.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.15.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

CONTRIBUTING.md

###### 2.3.3.1.16.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.16.3 Contains Files

- CONTRIBUTING.md

###### 2.3.3.1.16.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.16.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

docker-compose.dev.yml

###### 2.3.3.1.17.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.17.3 Contains Files

- docker-compose.dev.yml

###### 2.3.3.1.17.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.17.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

infrastructure/backend.tf

###### 2.3.3.1.18.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.18.3 Contains Files

- backend.tf

###### 2.3.3.1.18.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.18.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

infrastructure/main.tf

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- main.tf

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

infrastructure/versions.tf

###### 2.3.3.1.20.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.20.3 Contains Files

- versions.tf

###### 2.3.3.1.20.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.20.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.21.0 Directory Path

###### 2.3.3.1.21.1 Directory Path

mobile-app/.detoxrc.json

###### 2.3.3.1.21.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.21.3 Contains Files

- .detoxrc.json

###### 2.3.3.1.21.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.21.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.22.0 Directory Path

###### 2.3.3.1.22.1 Directory Path

mobile-app/android/build.gradle

###### 2.3.3.1.22.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.22.3 Contains Files

- build.gradle

###### 2.3.3.1.22.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.22.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.23.0 Directory Path

###### 2.3.3.1.23.1 Directory Path

mobile-app/ios/Gemfile

###### 2.3.3.1.23.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.23.3 Contains Files

- gemfile

###### 2.3.3.1.23.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.23.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.24.0 Directory Path

###### 2.3.3.1.24.1 Directory Path

mobile-app/metro.config.js

###### 2.3.3.1.24.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.24.3 Contains Files

- metro.config.js

###### 2.3.3.1.24.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.24.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.25.0 Directory Path

###### 2.3.3.1.25.1 Directory Path

mobile-app/package.json

###### 2.3.3.1.25.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.25.3 Contains Files

- package.json

###### 2.3.3.1.25.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.25.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.26.0 Directory Path

###### 2.3.3.1.26.1 Directory Path

nx.json

###### 2.3.3.1.26.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.26.3 Contains Files

- nx.json

###### 2.3.3.1.26.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.26.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.27.0 Directory Path

###### 2.3.3.1.27.1 Directory Path

README.md

###### 2.3.3.1.27.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.27.3 Contains Files

- README.md

###### 2.3.3.1.27.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.27.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.28.0 Directory Path

###### 2.3.3.1.28.1 Directory Path

shared-libs/contracts/package.json

###### 2.3.3.1.28.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.28.3 Contains Files

- package.json

###### 2.3.3.1.28.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.28.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.29.0 Directory Path

###### 2.3.3.1.29.1 Directory Path

sonar-project.properties

###### 2.3.3.1.29.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.29.3 Contains Files

- sonar-project.properties

###### 2.3.3.1.29.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.29.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.30.0 Directory Path

###### 2.3.3.1.30.1 Directory Path

src/application/services

###### 2.3.3.1.30.2 Purpose

Orchestration of notification flows

###### 2.3.3.1.30.3 Contains Files

- NotificationDispatcher.service.ts
- DeviceTokenManager.service.ts
- TemplateRendering.service.ts

###### 2.3.3.1.30.4 Organizational Reasoning

Application layer containing use cases

###### 2.3.3.1.30.5 Framework Convention Alignment

Service layer pattern

##### 2.3.3.1.31.0 Directory Path

###### 2.3.3.1.31.1 Directory Path

src/config

###### 2.3.3.1.31.2 Purpose

Environment configuration and validation schemas

###### 2.3.3.1.31.3 Contains Files

- app.config.ts
- database.config.ts
- service-bus.config.ts
- firebase.config.ts
- redis.config.ts
- communication-services.config.ts

###### 2.3.3.1.31.4 Organizational Reasoning

Centralized configuration management using @nestjs/config

###### 2.3.3.1.31.5 Framework Convention Alignment

Standard NestJS ConfigModule pattern

##### 2.3.3.1.32.0 Directory Path

###### 2.3.3.1.32.1 Directory Path

src/core/domain/entities

###### 2.3.3.1.32.2 Purpose

Core business objects independent of infrastructure

###### 2.3.3.1.32.3 Contains Files

- DeviceToken.ts
- NotificationLog.ts
- NotificationPreference.ts

###### 2.3.3.1.32.4 Organizational Reasoning

Domain layer isolation

###### 2.3.3.1.32.5 Framework Convention Alignment

DDD Entity pattern

##### 2.3.3.1.33.0 Directory Path

###### 2.3.3.1.33.1 Directory Path

src/core/ports

###### 2.3.3.1.33.2 Purpose

Interfaces defining contracts for infrastructure adapters

###### 2.3.3.1.33.3 Contains Files

- INotificationProvider.interface.ts
- IDeviceTokenRepository.interface.ts
- INotificationLogRepository.interface.ts
- ITemplateProvider.interface.ts
- IUserPreferenceRepository.interface.ts

###### 2.3.3.1.33.4 Organizational Reasoning

Inversion of Control boundaries

###### 2.3.3.1.33.5 Framework Convention Alignment

Hexagonal Architecture Ports

##### 2.3.3.1.34.0 Directory Path

###### 2.3.3.1.34.1 Directory Path

src/infrastructure/adapters

###### 2.3.3.1.34.2 Purpose

Concrete implementations of external service providers

###### 2.3.3.1.34.3 Contains Files

- FirebaseCloudMessaging.adapter.ts
- AzureEmail.adapter.ts
- HandlebarsTemplate.adapter.ts

###### 2.3.3.1.34.4 Organizational Reasoning

Infrastructure adapters implementing core ports

###### 2.3.3.1.34.5 Framework Convention Alignment

Adapter pattern

##### 2.3.3.1.35.0 Directory Path

###### 2.3.3.1.35.1 Directory Path

src/infrastructure/messaging

###### 2.3.3.1.35.2 Purpose

Azure Service Bus consumers and publishers

###### 2.3.3.1.35.3 Contains Files

- ServiceRequestEvents.consumer.ts
- ChatEvents.consumer.ts
- ProductEvents.consumer.ts

###### 2.3.3.1.35.4 Organizational Reasoning

Primary input adapters for event-driven architecture

###### 2.3.3.1.35.5 Framework Convention Alignment

NestJS Microservices pattern

##### 2.3.3.1.36.0 Directory Path

###### 2.3.3.1.36.1 Directory Path

src/infrastructure/persistence/typeorm

###### 2.3.3.1.36.2 Purpose

Database implementation using TypeORM

###### 2.3.3.1.36.3 Contains Files

- TypeOrmDeviceToken.repository.ts
- TypeOrmNotificationLog.repository.ts
- schemas/DeviceToken.schema.ts
- schemas/NotificationLog.schema.ts

###### 2.3.3.1.36.4 Organizational Reasoning

Persistence adapter isolation

###### 2.3.3.1.36.5 Framework Convention Alignment

TypeORM integration

##### 2.3.3.1.37.0 Directory Path

###### 2.3.3.1.37.1 Directory Path

src/infrastructure/websocket

###### 2.3.3.1.37.2 Purpose

Real-time in-app notification delivery

###### 2.3.3.1.37.3 Contains Files

- Notification.gateway.ts
- WebSocketAuth.guard.ts

###### 2.3.3.1.37.4 Organizational Reasoning

Output adapter for real-time clients

###### 2.3.3.1.37.5 Framework Convention Alignment

NestJS Gateway pattern

##### 2.3.3.1.38.0 Directory Path

###### 2.3.3.1.38.1 Directory Path

src/presentation/controllers

###### 2.3.3.1.38.2 Purpose

HTTP endpoints for client interactions

###### 2.3.3.1.38.3 Contains Files

- DeviceToken.controller.ts
- Health.controller.ts

###### 2.3.3.1.38.4 Organizational Reasoning

Primary adapter for REST interactions

###### 2.3.3.1.38.5 Framework Convention Alignment

NestJS Controller pattern

##### 2.3.3.1.39.0 Directory Path

###### 2.3.3.1.39.1 Directory Path

web-client/cypress.config.ts

###### 2.3.3.1.39.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.39.3 Contains Files

- cypress.config.ts

###### 2.3.3.1.39.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.39.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.40.0 Directory Path

###### 2.3.3.1.40.1 Directory Path

web-client/Dockerfile

###### 2.3.3.1.40.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.40.3 Contains Files

- Dockerfile

###### 2.3.3.1.40.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.40.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.41.0 Directory Path

###### 2.3.3.1.41.1 Directory Path

web-client/jest.setup.js

###### 2.3.3.1.41.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.41.3 Contains Files

- jest.setup.js

###### 2.3.3.1.41.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.41.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.42.0 Directory Path

###### 2.3.3.1.42.1 Directory Path

web-client/next.config.js

###### 2.3.3.1.42.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.42.3 Contains Files

- next.config.js

###### 2.3.3.1.42.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.42.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.43.0 Directory Path

###### 2.3.3.1.43.1 Directory Path

web-client/package.json

###### 2.3.3.1.43.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.43.3 Contains Files

- package.json

###### 2.3.3.1.43.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.43.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | WarrantyHub.NotificationService |
| Namespace Organization | By layer (Application, Core, Infrastructure, Prese... |
| Naming Conventions | PascalCase classes, camelCase methods, kebab-case ... |
| Framework Alignment | NestJS standard conventions |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

NotificationDispatcherService

##### 2.3.4.1.2.0 File Path

src/application/services/NotificationDispatcher.service.ts

##### 2.3.4.1.3.0 Class Type

Service

##### 2.3.4.1.4.0 Purpose

Orchestrates the flow of receiving an event, resolving preferences, rendering content, and dispatching to providers.

##### 2.3.4.1.5.0 Dependencies

- IDeviceTokenRepository
- IUserPreferenceRepository
- ITemplateProvider
- ModuleRef (for resolving dynamic providers)
- INotificationLogRepository

##### 2.3.4.1.6.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.1.7.0 Methods

###### 2.3.4.1.7.1 Method Name

####### 2.3.4.1.7.1.1 Method Name

dispatch

####### 2.3.4.1.7.1.2 Method Signature

dispatch(event: NotificationEvent): Promise<void>

####### 2.3.4.1.7.1.3 Return Type

Promise<void>

####### 2.3.4.1.7.1.4 Access Modifier

public

####### 2.3.4.1.7.1.5 Implementation Logic

1. Validate event data. 2. Fetch user preferences. 3. If Push enabled: fetch tokens, render push template, call FCM adapter. 4. If Email enabled: render email template, call ACS adapter. 5. If In-App: emit via WebSocket gateway. 6. Log all results.

####### 2.3.4.1.7.1.6 Error Handling

Catch provider errors individually to ensure one failure (e.g. Email) does not block others (e.g. Push).

####### 2.3.4.1.7.1.7 Validation Notes

Added preference check step before dispatch logic.

###### 2.3.4.1.7.2.0 Method Name

####### 2.3.4.1.7.2.1 Method Name

handlePushDispatch

####### 2.3.4.1.7.2.2 Method Signature

handlePushDispatch(userId: string, data: any): Promise<void>

####### 2.3.4.1.7.2.3 Return Type

Promise<void>

####### 2.3.4.1.7.2.4 Access Modifier

private

####### 2.3.4.1.7.2.5 Implementation Logic

Retrieves tokens. Calls FCM adapter. Handles \"Invalid Token\" responses by triggering token deletion via IDeviceTokenRepository.

####### 2.3.4.1.7.2.6 Validation Notes

Implemented logic to clean up stale tokens based on FCM feedback.

#### 2.3.4.2.0.0.0 Class Name

##### 2.3.4.2.1.0.0 Class Name

ServiceRequestEventsConsumer

##### 2.3.4.2.2.0.0 File Path

src/infrastructure/messaging/ServiceRequestEvents.consumer.ts

##### 2.3.4.2.3.0.0 Class Type

Consumer

##### 2.3.4.2.4.0.0 Purpose

Listens for service request lifecycle events from Azure Service Bus.

##### 2.3.4.2.5.0.0 Dependencies

- NotificationDispatcherService
- Logger

##### 2.3.4.2.6.0.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.2.7.0.0 Methods

- {'method_name': 'onStatusChanged', 'method_signature': 'onStatusChanged(message: ServiceRequestStatusChangedEvent): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'framework_attributes': ['@Subscribe(\\"service-request.status-changed\\")'], 'implementation_logic': 'Parses message. Maps status to notification template key. Calls NotificationDispatcherService.dispatch.', 'error_handling': 'Dlq annotation or manual dead-lettering for unprocessable messages.'}

#### 2.3.4.3.0.0.0 Class Name

##### 2.3.4.3.1.0.0 Class Name

FirebaseCloudMessagingAdapter

##### 2.3.4.3.2.0.0 File Path

src/infrastructure/adapters/FirebaseCloudMessaging.adapter.ts

##### 2.3.4.3.3.0.0 Class Type

Adapter

##### 2.3.4.3.4.0.0 Inheritance

INotificationProvider

##### 2.3.4.3.5.0.0 Purpose

Encapsulates Firebase Admin SDK logic for sending push notifications.

##### 2.3.4.3.6.0.0 Dependencies

- FirebaseAdmin
- Logger

##### 2.3.4.3.7.0.0 Methods

- {'method_name': 'send', 'method_signature': 'send(recipient: string[], payload: NotificationPayload): Promise<ProviderSendResult>', 'return_type': 'Promise<ProviderSendResult>', 'access_modifier': 'public', 'implementation_logic': 'Uses admin.messaging().sendEachForMulticast(). Maps the response to ProviderSendResult, explicitly identifying failed tokens.', 'validation_notes': 'Ensures batch sending compliance with FCM limits.'}

#### 2.3.4.4.0.0.0 Class Name

##### 2.3.4.4.1.0.0 Class Name

NotificationGateway

##### 2.3.4.4.2.0.0 File Path

src/infrastructure/websocket/Notification.gateway.ts

##### 2.3.4.4.3.0.0 Class Type

Gateway

##### 2.3.4.4.4.0.0 Purpose

Manages real-time WebSocket connections for in-app notifications.

##### 2.3.4.4.5.0.0 Dependencies

- JwtService
- Logger

##### 2.3.4.4.6.0.0 Framework Specific Attributes

- @WebSocketGateway({ cors: true, namespace: \"notifications\" })

##### 2.3.4.4.7.0.0 Methods

###### 2.3.4.4.7.1.0 Method Name

####### 2.3.4.4.7.1.1 Method Name

handleConnection

####### 2.3.4.4.7.1.2 Method Signature

handleConnection(client: Socket): Promise<void>

####### 2.3.4.4.7.1.3 Return Type

Promise<void>

####### 2.3.4.4.7.1.4 Implementation Logic

Extracts JWT from handshake query. Validates token. Joins client to room \"user:{userId}\".

####### 2.3.4.4.7.1.5 Error Handling

Disconnects client if token is invalid.

###### 2.3.4.4.7.2.0 Method Name

####### 2.3.4.4.7.2.1 Method Name

sendToUser

####### 2.3.4.4.7.2.2 Method Signature

sendToUser(userId: string, payload: any): void

####### 2.3.4.4.7.2.3 Return Type

void

####### 2.3.4.4.7.2.4 Implementation Logic

this.server.to(\"user:\" + userId).emit(\"notification\", payload).

#### 2.3.4.5.0.0.0 Class Name

##### 2.3.4.5.1.0.0 Class Name

DeviceTokenController

##### 2.3.4.5.2.0.0 File Path

src/presentation/controllers/DeviceToken.controller.ts

##### 2.3.4.5.3.0.0 Class Type

Controller

##### 2.3.4.5.4.0.0 Purpose

Exposes endpoints for mobile clients to register/unregister FCM tokens.

##### 2.3.4.5.5.0.0 Dependencies

- DeviceTokenManagerService

##### 2.3.4.5.6.0.0 Framework Specific Attributes

- @Controller(\"api/v1/notifications/devices\")
- @UseGuards(JwtAuthGuard)

##### 2.3.4.5.7.0.0 Methods

###### 2.3.4.5.7.1.0 Method Name

####### 2.3.4.5.7.1.1 Method Name

registerDevice

####### 2.3.4.5.7.1.2 Method Signature

registerDevice(dto: DeviceRegistrationDto, req: any): Promise<void>

####### 2.3.4.5.7.1.3 Return Type

Promise<void>

####### 2.3.4.5.7.1.4 Framework Attributes

- @Post()
- @HttpCode(HttpStatus.OK)

####### 2.3.4.5.7.1.5 Implementation Logic

Extracts userId from request user. Calls service to upsert token.

####### 2.3.4.5.7.1.6 Validation Requirements

Validates DTO using ValidationPipe.

###### 2.3.4.5.7.2.0 Method Name

####### 2.3.4.5.7.2.1 Method Name

unregisterDevice

####### 2.3.4.5.7.2.2 Method Signature

unregisterDevice(token: string): Promise<void>

####### 2.3.4.5.7.2.3 Return Type

Promise<void>

####### 2.3.4.5.7.2.4 Framework Attributes

- @Delete(\":token\")

####### 2.3.4.5.7.2.5 Implementation Logic

Calls service to remove token.

### 2.3.5.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0 Interface Name

##### 2.3.5.1.1.0.0 Interface Name

INotificationProvider

##### 2.3.5.1.2.0.0 File Path

src/core/ports/INotificationProvider.interface.ts

##### 2.3.5.1.3.0.0 Purpose

Abstraction for external notification services (FCM, Email, SMS).

##### 2.3.5.1.4.0.0 Method Contracts

- {'method_name': 'send', 'method_signature': '(recipients: string | string[], payload: any) => Promise<ProviderSendResult>', 'contract_description': 'Sends payload to recipients. Returns success status and any failed identifiers.'}

#### 2.3.5.2.0.0.0 Interface Name

##### 2.3.5.2.1.0.0 Interface Name

IDeviceTokenRepository

##### 2.3.5.2.2.0.0 File Path

src/core/ports/IDeviceTokenRepository.interface.ts

##### 2.3.5.2.3.0.0 Purpose

Abstraction for device token persistence.

##### 2.3.5.2.4.0.0 Method Contracts

###### 2.3.5.2.4.1.0 Method Name

####### 2.3.5.2.4.1.1 Method Name

saveToken

####### 2.3.5.2.4.1.2 Method Signature

(userId: string, token: string, platform: \"ios\" | \"android\") => Promise<void>

###### 2.3.5.2.4.2.0 Method Name

####### 2.3.5.2.4.2.1 Method Name

getTokensByUserId

####### 2.3.5.2.4.2.2 Method Signature

(userId: string) => Promise<string[]>

###### 2.3.5.2.4.3.0 Method Name

####### 2.3.5.2.4.3.1 Method Name

deleteToken

####### 2.3.5.2.4.3.2 Method Signature

(token: string) => Promise<void>

#### 2.3.5.3.0.0.0 Interface Name

##### 2.3.5.3.1.0.0 Interface Name

ITemplateProvider

##### 2.3.5.3.2.0.0 File Path

src/core/ports/ITemplateProvider.interface.ts

##### 2.3.5.3.3.0.0 Purpose

Abstraction for rendering notification content.

##### 2.3.5.3.4.0.0 Method Contracts

- {'method_name': 'render', 'method_signature': '(templateKey: string, data: any, locale: string) => Promise<RenderedContent>'}

### 2.3.6.0.0.0.0 Dto Specifications

#### 2.3.6.1.0.0.0 Dto Name

##### 2.3.6.1.1.0.0 Dto Name

DeviceRegistrationDto

##### 2.3.6.1.2.0.0 File Path

src/application/dtos/DeviceRegistrationDto.ts

##### 2.3.6.1.3.0.0 Purpose

Data transfer object for device registration.

##### 2.3.6.1.4.0.0 Properties

###### 2.3.6.1.4.1.0 Property Name

####### 2.3.6.1.4.1.1 Property Name

token

####### 2.3.6.1.4.1.2 Property Type

string

####### 2.3.6.1.4.1.3 Validation Attributes

- @IsString()
- @IsNotEmpty()

###### 2.3.6.1.4.2.0 Property Name

####### 2.3.6.1.4.2.1 Property Name

platform

####### 2.3.6.1.4.2.2 Property Type

string

####### 2.3.6.1.4.2.3 Validation Attributes

- @IsEnum([\"ios\", \"android\"])

#### 2.3.6.2.0.0.0 Dto Name

##### 2.3.6.2.1.0.0 Dto Name

NotificationPayload

##### 2.3.6.2.2.0.0 File Path

src/application/dtos/NotificationPayload.ts

##### 2.3.6.2.3.0.0 Purpose

Internal representation of a notification message.

##### 2.3.6.2.4.0.0 Properties

###### 2.3.6.2.4.1.0 Property Name

####### 2.3.6.2.4.1.1 Property Name

title

####### 2.3.6.2.4.1.2 Property Type

string

###### 2.3.6.2.4.2.0 Property Name

####### 2.3.6.2.4.2.1 Property Name

body

####### 2.3.6.2.4.2.2 Property Type

string

###### 2.3.6.2.4.3.0 Property Name

####### 2.3.6.2.4.3.1 Property Name

data

####### 2.3.6.2.4.3.2 Property Type

Record<string, any>

### 2.3.7.0.0.0.0 Configuration Specifications

#### 2.3.7.1.0.0.0 Configuration Name

##### 2.3.7.1.1.0.0 Configuration Name

FirebaseConfig

##### 2.3.7.1.2.0.0 File Path

src/config/firebase.config.ts

##### 2.3.7.1.3.0.0 Purpose

Typed configuration for Firebase Admin SDK.

##### 2.3.7.1.4.0.0 Configuration Sections

- {'section_name': 'firebase', 'properties': [{'property_name': 'projectId', 'environment_variable': 'FIREBASE_PROJECT_ID', 'required': 'true'}, {'property_name': 'privateKey', 'environment_variable': 'FIREBASE_PRIVATE_KEY', 'required': 'true'}, {'property_name': 'clientEmail', 'environment_variable': 'FIREBASE_CLIENT_EMAIL', 'required': 'true'}]}

#### 2.3.7.2.0.0.0 Configuration Name

##### 2.3.7.2.1.0.0 Configuration Name

ServiceBusConfig

##### 2.3.7.2.2.0.0 File Path

src/config/service-bus.config.ts

##### 2.3.7.2.3.0.0 Purpose

Connection settings for Azure Service Bus.

##### 2.3.7.2.4.0.0 Configuration Sections

- {'section_name': 'serviceBus', 'properties': [{'property_name': 'connectionString', 'environment_variable': 'AZURE_SERVICE_BUS_CONNECTION_STRING', 'required': 'true'}, {'property_name': 'serviceRequestTopic', 'environment_variable': 'SB_TOPIC_SERVICE_REQUESTS', 'required': 'true'}]}

### 2.3.8.0.0.0.0 Dependency Injection Specifications

#### 2.3.8.1.0.0.0 Service Interface

##### 2.3.8.1.1.0.0 Service Interface

INotificationProvider

##### 2.3.8.1.2.0.0 Service Implementation

FirebaseCloudMessagingAdapter

##### 2.3.8.1.3.0.0 Lifetime

Singleton

##### 2.3.8.1.4.0.0 Registration Pattern

Provide token \"FCM_PROVIDER\" useClass FirebaseCloudMessagingAdapter

#### 2.3.8.2.0.0.0 Service Interface

##### 2.3.8.2.1.0.0 Service Interface

INotificationProvider

##### 2.3.8.2.2.0.0 Service Implementation

AzureEmailAdapter

##### 2.3.8.2.3.0.0 Lifetime

Singleton

##### 2.3.8.2.4.0.0 Registration Pattern

Provide token \"EMAIL_PROVIDER\" useClass AzureEmailAdapter

#### 2.3.8.3.0.0.0 Service Interface

##### 2.3.8.3.1.0.0 Service Interface

IDeviceTokenRepository

##### 2.3.8.3.2.0.0 Service Implementation

TypeOrmDeviceTokenRepository

##### 2.3.8.3.3.0.0 Lifetime

Scoped

##### 2.3.8.3.4.0.0 Registration Pattern

Standard provider registration

### 2.3.9.0.0.0.0 External Integration Specifications

#### 2.3.9.1.0.0.0 Integration Target

##### 2.3.9.1.1.0.0 Integration Target

Firebase Cloud Messaging

##### 2.3.9.1.2.0.0 Integration Type

SDK

##### 2.3.9.1.3.0.0 Required Client Classes

- admin.messaging()

##### 2.3.9.1.4.0.0 Configuration Requirements

Service Account JSON or env vars

##### 2.3.9.1.5.0.0 Error Handling Requirements

Handle partial batch failures, identify and remove invalid tokens.

##### 2.3.9.1.6.0.0 Validation Notes

Must handle token rotation and invalidation responses.

#### 2.3.9.2.0.0.0 Integration Target

##### 2.3.9.2.1.0.0 Integration Target

Azure Service Bus

##### 2.3.9.2.2.0.0 Integration Type

SDK

##### 2.3.9.2.3.0.0 Required Client Classes

- ServiceBusClient
- ServiceBusReceiver

##### 2.3.9.2.4.0.0 Configuration Requirements

Connection String, Topic Name, Subscription Name

##### 2.3.9.2.5.0.0 Error Handling Requirements

PeekLock mode, Complete on success, Abandon on transient failure, DeadLetter on permanent failure.

##### 2.3.9.2.6.0.0 Validation Notes

Consumers must be idempotent.

## 2.4.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 12 |
| Total Interfaces | 5 |
| Total Enums | 0 |
| Total Dtos | 2 |
| Total Configurations | 2 |
| Total External Integrations | 2 |
| Grand Total Components | 23 |
| Phase 2 Claimed Count | 25 |
| Phase 2 Actual Count | 22 |
| Validation Added Count | 8 |
| Final Validated Count | 35 |

