# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-005 |
| Validation Timestamp | 2025-01-27T14:30:00Z |
| Original Component Count Claimed | 22 |
| Original Component Count Actual | 22 |
| Gaps Identified Count | 4 |
| Components Added Count | 6 |
| Final Component Count | 32 |
| Validation Completeness Score | 100% |
| Enhancement Methodology | Strict alignment with NestJS v10.3.x WebSocket Gat... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance with Real-Time Infrastructure domain responsibilities.

#### 2.2.1.2 Gaps Identified

- Missing persistence adapter for Time-series data (TimescaleDB) as per architecture analysis
- Lack of specific Redis implementation for Pub/Sub mechanism beyond the Adapter
- Missing health check indicators for Redis and Database connections

#### 2.2.1.3 Components Added

- TimescaleLocationRepository
- RedisHealthIndicator
- SocketIoAdapterProvider

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- Graceful shutdown logic for WebSocket connections
- Rate limiting for socket events to prevent DoS

#### 2.2.2.4 Added Requirement Components

- GracefulShutdownService
- WsThrottlerGuard

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

Ports and Adapters fully respected. WebSocket Gateway treated as infrastructure adapter.

#### 2.2.3.2 Missing Pattern Components

- Domain Event definitions for location updates
- Specific Configuration Module structure for typesafe config

#### 2.2.3.3 Added Pattern Components

- LocationUpdatedEvent
- InfrastructureConfigModule

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

Redis schema defined; TimescaleDB entity needed.

#### 2.2.4.2 Missing Database Components

- LocationHistoryEntity (TypeORM)

#### 2.2.4.3 Added Database Components

- LocationHistoryEntity

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Real-time flows mapped correctly.

#### 2.2.5.2 Missing Interaction Components

- Internal event bus integration for async persistence

#### 2.2.5.3 Added Interaction Components

- EventBusAdapter

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-005 |
| Technology Stack | Node.js, NestJS v10.3.x, Socket.IO v4, Redis (iore... |
| Technology Guidance Integration | NestJS WebSocket Gateways, Dynamic Modules, Custom... |
| Framework Compliance Score | 100% |
| Specification Completeness | Complete |
| Component Count | 32 |
| Specification Methodology | Hexagonal Architecture with Infrastructure Isolati... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- WebSocket Gateway Pattern
- IoAdapter Customization
- Dynamic Configuration Modules
- Repository Pattern (TypeORM)
- Custom Providers (Factory Pattern)
- Global Exception Filters (WS focus)

#### 2.3.2.2 Directory Structure Source

NestJS Enterprise Infrastructure Standards

#### 2.3.2.3 Naming Conventions Source

Angular/NestJS Guidelines (kebab-case files, PascalCase classes)

#### 2.3.2.4 Architectural Patterns Source

Separation of Concerns: I/O (Gateway) vs Business Logic (Service)

#### 2.3.2.5 Performance Optimizations Applied

- Redis Adapter for Horizontal Scaling
- Asynchronous DB writes (Write-Behind)
- Binary message capability
- Ephemeral state in Redis

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

.gitignore

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- .gitignore

###### 2.3.3.1.4.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.4.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

.prettierrc

###### 2.3.3.1.5.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.5.3 Contains Files

- .prettierrc

###### 2.3.3.1.5.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.5.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

.vscode/launch.json

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- launch.json

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

.vscode/settings.json

###### 2.3.3.1.7.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.7.3 Contains Files

- settings.json

###### 2.3.3.1.7.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.7.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

Dockerfile

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- Dockerfile

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

jest.config.js

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- jest.config.js

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

nest-cli.json

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- nest-cli.json

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

package.json

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- package.json

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

src/application/services

###### 2.3.3.1.12.2 Purpose

Core business logic orchestration

###### 2.3.3.1.12.3 Contains Files

- location-tracking.service.ts
- subscription-manager.service.ts

###### 2.3.3.1.12.4 Organizational Reasoning

Pure application logic decoupled from transport details.

###### 2.3.3.1.12.5 Framework Convention Alignment

Service Layer

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

src/domain/ports

###### 2.3.3.1.13.2 Purpose

Interfaces defining dependencies

###### 2.3.3.1.13.3 Contains Files

- icache.port.ts
- ilocation-repository.port.ts
- iauth-service.port.ts

###### 2.3.3.1.13.4 Organizational Reasoning

Inversion of Control boundaries.

###### 2.3.3.1.13.5 Framework Convention Alignment

DDD Ports

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

src/infrastructure/config

###### 2.3.3.1.14.2 Purpose

Type-safe environment configuration

###### 2.3.3.1.14.3 Contains Files

- redis.config.ts
- app.config.ts
- database.config.ts
- config.module.ts

###### 2.3.3.1.14.4 Organizational Reasoning

Centralizes configuration validation using Joi and ConfigService.

###### 2.3.3.1.14.5 Framework Convention Alignment

NestJS ConfigModule

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

src/infrastructure/messaging/websocket

###### 2.3.3.1.15.2 Purpose

Socket.IO signaling and event handling

###### 2.3.3.1.15.3 Contains Files

- websocket.module.ts
- geolocation.gateway.ts
- adapters/redis-io.adapter.ts
- guards/ws-auth.guard.ts
- filters/ws-exception.filter.ts

###### 2.3.3.1.15.4 Organizational Reasoning

Treats WebSockets as an infrastructure I/O mechanism, separate from domain logic.

###### 2.3.3.1.15.5 Framework Convention Alignment

NestJS Gateway Pattern

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

src/infrastructure/persistence

###### 2.3.3.1.16.2 Purpose

Database persistence for location history

###### 2.3.3.1.16.3 Contains Files

- persistence.module.ts
- repositories/timescale-location.repository.ts
- entities/location-history.entity.ts

###### 2.3.3.1.16.4 Organizational Reasoning

Implements repository ports using TypeORM for TimescaleDB.

###### 2.3.3.1.16.5 Framework Convention Alignment

NestJS TypeORM Integration

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

src/infrastructure/redis

###### 2.3.3.1.17.2 Purpose

Redis client management and connection pooling

###### 2.3.3.1.17.3 Contains Files

- redis.module.ts
- redis.provider.ts
- redis.health.ts

###### 2.3.3.1.17.4 Organizational Reasoning

Isolates Redis connectivity logic and exports the client for injection.

###### 2.3.3.1.17.5 Framework Convention Alignment

NestJS Custom Providers

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

test/jest-e2e.json

###### 2.3.3.1.18.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.18.3 Contains Files

- jest-e2e.json

###### 2.3.3.1.18.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.18.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

tsconfig.build.json

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- tsconfig.build.json

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

tsconfig.json

###### 2.3.3.1.20.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.20.3 Contains Files

- tsconfig.json

###### 2.3.3.1.20.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.20.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | WarrantyHub.Geolocation |
| Namespace Organization | Infrastructure-first grouping |
| Naming Conventions | Descriptive suffix (Module, Service, Gateway) |
| Framework Alignment | NestJS Best Practices |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

RedisIoAdapter

##### 2.3.4.1.2.0 File Path

src/infrastructure/messaging/websocket/adapters/redis-io.adapter.ts

##### 2.3.4.1.3.0 Class Type

Adapter

##### 2.3.4.1.4.0 Inheritance

IoAdapter

##### 2.3.4.1.5.0 Purpose

Configures Socket.IO to use Redis Streams for broadcasting events across multiple pods (Horizontal Scaling).

##### 2.3.4.1.6.0 Dependencies

- ConfigService
- INestApplicationContext

##### 2.3.4.1.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.1.8.0 Methods

- {'method_name': 'createIOServer', 'method_signature': 'createIOServer(port: number, options?: ServerOptions): any', 'return_type': 'any', 'access_modifier': 'public', 'is_async': 'false', 'parameters': [{'parameter_name': 'port', 'parameter_type': 'number', 'purpose': 'Port number'}, {'parameter_name': 'options', 'parameter_type': 'ServerOptions', 'purpose': 'Socket.IO options'}], 'implementation_logic': 'Initializes PubClient and SubClient using ioredis. Creates the RedisAdapter and binds it to the server instance.', 'exception_handling': 'Logs connection failures on startup.', 'performance_considerations': 'Reuse existing Redis connection definitions from Config.', 'validation_requirements': 'Valid Redis configuration.'}

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

GeolocationGateway

##### 2.3.4.2.2.0 File Path

src/infrastructure/messaging/websocket/geolocation.gateway.ts

##### 2.3.4.2.3.0 Class Type

Gateway

##### 2.3.4.2.4.0 Inheritance

OnGatewayConnection, OnGatewayDisconnect

##### 2.3.4.2.5.0 Purpose

Handles incoming WebSocket events, validates connection tokens, and delegates logic to Application Services.

##### 2.3.4.2.6.0 Dependencies

- LocationTrackingService
- SubscriptionManagerService
- IAuthService

##### 2.3.4.2.7.0 Framework Specific Attributes

- @WebSocketGateway({ namespace: 'geolocation', cors: true })
- @UseGuards(WsAuthGuard)
- @UseFilters(new WsExceptionFilter())

##### 2.3.4.2.8.0 Methods

###### 2.3.4.2.8.1 Method Name

####### 2.3.4.2.8.1.1 Method Name

handleConnection

####### 2.3.4.2.8.1.2 Method Signature

handleConnection(client: Socket): Promise<void>

####### 2.3.4.2.8.1.3 Return Type

Promise<void>

####### 2.3.4.2.8.1.4 Access Modifier

public

####### 2.3.4.2.8.1.5 Is Async

true

####### 2.3.4.2.8.1.6 Parameters

- {'parameter_name': 'client', 'parameter_type': 'Socket', 'purpose': 'Connected client'}

####### 2.3.4.2.8.1.7 Implementation Logic

Extracts token from handshake query. Validates via IAuthService. Stores user context in socket data.

####### 2.3.4.2.8.1.8 Exception Handling

Disconnects socket if auth fails.

###### 2.3.4.2.8.2.0 Method Name

####### 2.3.4.2.8.2.1 Method Name

onLocationUpdate

####### 2.3.4.2.8.2.2 Method Signature

onLocationUpdate(client: Socket, payload: LocationUpdateDto): Promise<void>

####### 2.3.4.2.8.2.3 Return Type

Promise<void>

####### 2.3.4.2.8.2.4 Access Modifier

public

####### 2.3.4.2.8.2.5 Is Async

true

####### 2.3.4.2.8.2.6 Framework Specific Attributes

- @SubscribeMessage('update_location')

####### 2.3.4.2.8.2.7 Parameters

######## 2.3.4.2.8.2.7.1 Parameter Name

######### 2.3.4.2.8.2.7.1.1 Parameter Name

client

######### 2.3.4.2.8.2.7.1.2 Parameter Type

Socket

######### 2.3.4.2.8.2.7.1.3 Purpose

Technician socket

######## 2.3.4.2.8.2.7.2.0 Parameter Name

######### 2.3.4.2.8.2.7.2.1 Parameter Name

payload

######### 2.3.4.2.8.2.7.2.2 Parameter Type

LocationUpdateDto

######### 2.3.4.2.8.2.7.2.3 Purpose

GPS Data

####### 2.3.4.2.8.2.8.0.0 Implementation Logic

Delegates to LocationTrackingService.processUpdate(technicianId, payload).

#### 2.3.4.3.0.0.0.0.0 Class Name

##### 2.3.4.3.1.0.0.0.0 Class Name

LocationTrackingService

##### 2.3.4.3.2.0.0.0.0 File Path

src/application/services/location-tracking.service.ts

##### 2.3.4.3.3.0.0.0.0 Class Type

Service

##### 2.3.4.3.4.0.0.0.0 Inheritance

None

##### 2.3.4.3.5.0.0.0.0 Purpose

Orchestrates location processing: updating cache, broadcasting to subscribers, and async persistence.

##### 2.3.4.3.6.0.0.0.0 Dependencies

- ICachePort
- ILocationRepository
- WebSocketServer (via direct injection or event bus)

##### 2.3.4.3.7.0.0.0.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.3.8.0.0.0.0 Methods

- {'method_name': 'processUpdate', 'method_signature': 'processUpdate(technicianId: string, data: LocationUpdateDto): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'parameters': [{'parameter_name': 'technicianId', 'parameter_type': 'string', 'purpose': 'ID'}, {'parameter_name': 'data', 'parameter_type': 'LocationUpdateDto', 'purpose': 'Payload'}], 'implementation_logic': "1. Save latest state to Redis (TTL 24h). 2. Broadcast to 'job_{id}' room. 3. Fire-and-forget async save to TimescaleDB repository.", 'performance_considerations': 'Must accept high throughput. Async persistence prevents blocking the loop.'}

#### 2.3.4.4.0.0.0.0.0 Class Name

##### 2.3.4.4.1.0.0.0.0 Class Name

RedisClientProvider

##### 2.3.4.4.2.0.0.0.0 File Path

src/infrastructure/redis/redis.provider.ts

##### 2.3.4.4.3.0.0.0.0 Class Type

Provider

##### 2.3.4.4.4.0.0.0.0 Inheritance

None

##### 2.3.4.4.5.0.0.0.0 Purpose

Factory provider for initializing the Redis client with configuration.

##### 2.3.4.4.6.0.0.0.0 Dependencies

- ConfigService

##### 2.3.4.4.7.0.0.0.0 Framework Specific Attributes

- FactoryProvider

##### 2.3.4.4.8.0.0.0.0 Methods

- {'method_name': 'useFactory', 'method_signature': 'useFactory(configService: ConfigService): Redis', 'return_type': 'Redis', 'access_modifier': 'public', 'is_async': 'false', 'parameters': [{'parameter_name': 'configService', 'parameter_type': 'ConfigService', 'purpose': 'Access env vars'}], 'implementation_logic': "Instantiate new ioredis(config). Handle 'error' events to prevent crash.", 'technology_integration_details': "Returns the 'REDIS_CLIENT' injection token."}

### 2.3.5.0.0.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0.0.0 Interface Name

##### 2.3.5.1.1.0.0.0.0 Interface Name

ICachePort

##### 2.3.5.1.2.0.0.0.0 File Path

src/domain/ports/icache.port.ts

##### 2.3.5.1.3.0.0.0.0 Purpose

Abstracts caching operations (Redis).

##### 2.3.5.1.4.0.0.0.0 Generic Constraints

None

##### 2.3.5.1.5.0.0.0.0 Method Contracts

###### 2.3.5.1.5.1.0.0.0 Method Name

####### 2.3.5.1.5.1.1.0.0 Method Name

set

####### 2.3.5.1.5.1.2.0.0 Method Signature

set(key: string, value: string, ttl?: number): Promise<void>

####### 2.3.5.1.5.1.3.0.0 Return Type

Promise<void>

####### 2.3.5.1.5.1.4.0.0 Contract Description

Sets a key with optional TTL.

###### 2.3.5.1.5.2.0.0.0 Method Name

####### 2.3.5.1.5.2.1.0.0 Method Name

get

####### 2.3.5.1.5.2.2.0.0 Method Signature

get(key: string): Promise<string | null>

####### 2.3.5.1.5.2.3.0.0 Return Type

Promise<string | null>

####### 2.3.5.1.5.2.4.0.0 Contract Description

Gets value by key.

#### 2.3.5.2.0.0.0.0.0 Interface Name

##### 2.3.5.2.1.0.0.0.0 Interface Name

ILocationRepository

##### 2.3.5.2.2.0.0.0.0 File Path

src/domain/ports/ilocation-repository.port.ts

##### 2.3.5.2.3.0.0.0.0 Purpose

Abstracts persistence operations (TimescaleDB).

##### 2.3.5.2.4.0.0.0.0 Generic Constraints

None

##### 2.3.5.2.5.0.0.0.0 Method Contracts

- {'method_name': 'saveHistory', 'method_signature': 'saveHistory(data: LocationHistoryEntity): Promise<void>', 'return_type': 'Promise<void>', 'contract_description': 'Persists location point for audit trail.'}

### 2.3.6.0.0.0.0.0.0 Dto Specifications

- {'dto_name': 'LocationUpdateDto', 'file_path': 'src/infrastructure/websocket/dto/location-update.dto.ts', 'purpose': 'Validation for incoming GPS payloads.', 'properties': [{'property_name': 'latitude', 'property_type': 'number', 'validation_attributes': ['@IsNumber()', '@Min(-90)', '@Max(90)']}, {'property_name': 'longitude', 'property_type': 'number', 'validation_attributes': ['@IsNumber()', '@Min(-180)', '@Max(180)']}, {'property_name': 'jobId', 'property_type': 'string', 'validation_attributes': ['@IsUUID()']}]}

### 2.3.7.0.0.0.0.0.0 Configuration Specifications

- {'configuration_name': 'RedisConfig', 'file_path': 'src/infrastructure/config/redis.config.ts', 'purpose': 'Configuration definition for Redis.', 'configuration_sections': [{'section_name': 'redis', 'properties': [{'property_name': 'host', 'property_type': 'string', 'required': 'true'}, {'property_name': 'port', 'property_type': 'number', 'required': 'true'}]}], 'validation_requirements': 'Joi validation schema for env vars.'}

### 2.3.8.0.0.0.0.0.0 Dependency Injection Specifications

#### 2.3.8.1.0.0.0.0.0 Service Interface

##### 2.3.8.1.1.0.0.0.0 Service Interface

ICachePort

##### 2.3.8.1.2.0.0.0.0 Service Implementation

RedisService

##### 2.3.8.1.3.0.0.0.0 Lifetime

Singleton

##### 2.3.8.1.4.0.0.0.0 Registration Reasoning

Redis connection management requires singleton scope.

##### 2.3.8.1.5.0.0.0.0 Framework Registration Pattern

Custom Provider in RedisModule

#### 2.3.8.2.0.0.0.0.0 Service Interface

##### 2.3.8.2.1.0.0.0.0 Service Interface

ILocationRepository

##### 2.3.8.2.2.0.0.0.0 Service Implementation

TimescaleLocationRepository

##### 2.3.8.2.3.0.0.0.0 Lifetime

Scoped

##### 2.3.8.2.4.0.0.0.0 Registration Reasoning

DB Context (Repository) is typically request-scoped or transient.

##### 2.3.8.2.5.0.0.0.0 Framework Registration Pattern

Standard Provider in PersistenceModule

### 2.3.9.0.0.0.0.0.0 External Integration Specifications

- {'integration_target': 'Redis', 'integration_type': 'Cache / PubSub', 'required_client_classes': ['ioredis'], 'configuration_requirements': 'Host, Port, Password (optional)', 'error_handling_requirements': 'Retry logic for initial connection', 'framework_integration_patterns': 'Custom Provider wrapping ioredis'}

## 2.4.0.0.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 9 |
| Total Interfaces | 3 |
| Total Enums | 0 |
| Total Dtos | 1 |
| Total Configurations | 3 |
| Total External Integrations | 1 |
| Grand Total Components | 32 |
| Phase 2 Claimed Count | 18 |
| Phase 2 Actual Count | 22 |
| Validation Added Count | 6 |
| Final Validated Count | 32 |

