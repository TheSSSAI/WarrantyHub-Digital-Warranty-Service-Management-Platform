# 1 Design

code_design

# 2 Code Specfication

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-004 |
| Validation Timestamp | 2025-05-24T12:00:00Z |
| Original Component Count Claimed | 2 |
| Original Component Count Actual | 2 |
| Gaps Identified Count | 6 |
| Components Added Count | 14 |
| Final Component Count | 22 |
| Validation Completeness Score | 100% |
| Enhancement Methodology | Systematic decomposition using Domain-Driven Desig... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance. The distinction between the transactional lifecycle management and the real-time chat component is critical and well-preserved.

#### 2.2.1.2 Gaps Identified

- Missing Domain Service for complex Routing Logic (selecting best service center).
- Missing Infrastructure Adapter for Azure Blob Storage (Signature Capture).
- Lack of specific Redis configuration for WebSocket scaling.

#### 2.2.1.3 Components Added

- RoutingDomainService
- AzureBlobStorageAdapter
- RedisIoAdapterConfiguration
- DisputeRequestHandler

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- REQ-FUNC-008: Logic for time-window validation on disputes.
- REQ-SCAL-001: WebSocket backplane configuration.

#### 2.2.2.4 Added Requirement Components

- TimeWindowValidator
- RedisAdapterFactory

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

CQRS and Gateway patterns verified.

#### 2.2.3.2 Missing Pattern Components

- Explicit Port definitions for external service dependencies (Product, Service Center).
- Domain Event definitions for lifecycle changes.

#### 2.2.3.3 Added Pattern Components

- IProductIntegrationPort
- IServiceCenterIntegrationPort
- ServiceRequestStatusChangedEvent

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

Core entities defined.

#### 2.2.4.2 Missing Database Components

- Value Object mapping for GeoLocation (PostGIS).

#### 2.2.4.3 Added Database Components

- GeoLocationValueObject

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Sequence 393 (Routing) and Chat flows mapped.

#### 2.2.5.2 Missing Interaction Components

- Resilience logic (Circuit Breaker) for synchronous upstream calls.

#### 2.2.5.3 Added Interaction Components

- HttpResilienceInterceptor

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-004 |
| Technology Stack | Node.js (TypeScript), NestJS v10.3.x, PostgreSQL (... |
| Technology Guidance Integration | NestJS CQRS Module, NestJS WebSockets, Clean Archi... |
| Framework Compliance Score | 100% |
| Specification Completeness | Complete |
| Component Count | 22 |
| Specification Methodology | Domain-Driven Design (DDD) with Hexagonal Architec... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- CQRS (Command/Query Responsibility Segregation)
- Gateway Pattern (WebSockets)
- Ports and Adapters (Hexagonal)
- Repository Pattern
- Domain Services
- Guards (Authorization)

#### 2.3.2.2 Directory Structure Source

NestJS Enterprise Standard

#### 2.3.2.3 Naming Conventions Source

Angular/NestJS Guidelines

#### 2.3.2.4 Architectural Patterns Source

Clean Architecture

#### 2.3.2.5 Performance Optimizations Applied

- Redis Adapter for WebSocket Horizontal Scaling
- Async Event Publishing for non-blocking notifications
- Database Indexing on Status and TechnicianID

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

src/modules/service-request

###### 2.3.3.1.1.2 Purpose

Bounded Context for Ticket Lifecycle Management.

###### 2.3.3.1.1.3 Contains Files

- service-request.module.ts
- service-request.controller.ts

###### 2.3.3.1.1.4 Organizational Reasoning

Encapsulates REST API and Workflow logic.

###### 2.3.3.1.1.5 Framework Convention Alignment

NestJS Feature Module

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

src/modules/service-request/domain

###### 2.3.3.1.2.2 Purpose

Pure Domain Logic and Business Rules.

###### 2.3.3.1.2.3 Contains Files

- service-request.entity.ts
- services/routing.domain-service.ts
- value-objects/geo-location.vo.ts
- ports/service-request.repository.port.ts

###### 2.3.3.1.2.4 Organizational Reasoning

Isolates business rules from framework and infrastructure.

###### 2.3.3.1.2.5 Framework Convention Alignment

DDD Domain Layer

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

src/modules/service-request/application

###### 2.3.3.1.3.2 Purpose

Application Use Cases (CQRS).

###### 2.3.3.1.3.3 Contains Files

- commands/create-request.handler.ts
- commands/resolve-request.handler.ts
- commands/dispute-request.handler.ts

###### 2.3.3.1.3.4 Organizational Reasoning

Orchestrates domain objects and infrastructure ports.

###### 2.3.3.1.3.5 Framework Convention Alignment

NestJS CQRS Handlers

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

src/modules/chat

###### 2.3.3.1.4.2 Purpose

Real-time Communication Sub-domain.

###### 2.3.3.1.4.3 Contains Files

- chat.module.ts
- chat.gateway.ts
- chat.service.ts

###### 2.3.3.1.4.4 Organizational Reasoning

Separates stateful WebSocket logic from stateless REST flow.

###### 2.3.3.1.4.5 Framework Convention Alignment

NestJS Gateway

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

src/infrastructure

###### 2.3.3.1.5.2 Purpose

Technical Implementations of Ports.

###### 2.3.3.1.5.3 Contains Files

- adapters/http-product-service.adapter.ts
- adapters/http-service-center.adapter.ts
- adapters/azure-blob-storage.adapter.ts
- persistence/typeorm-service-request.repository.ts

###### 2.3.3.1.5.4 Organizational Reasoning

Keeps external dependencies at the edge of the architecture.

###### 2.3.3.1.5.5 Framework Convention Alignment

Infrastructure Layer

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | WarrantyHub.ServiceRequest |
| Namespace Organization | Feature-based (Request, Chat) |
| Naming Conventions | PascalCase classes, kebab-case files |
| Framework Alignment | NestJS Standard |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

CreateServiceRequestHandler

##### 2.3.4.1.2.0 File Path

src/modules/service-request/application/commands/create-request.handler.ts

##### 2.3.4.1.3.0 Class Type

CommandHandler

##### 2.3.4.1.4.0 Inheritance

ICommandHandler<CreateServiceRequestCommand>

##### 2.3.4.1.5.0 Purpose

Orchestrates the creation of a ticket: Validates Warranty -> Routes to Center -> Persists Request.

##### 2.3.4.1.6.0 Dependencies

- IServiceRequestRepository
- IProductIntegrationPort
- IServiceCenterIntegrationPort
- RoutingDomainService
- EventPublisher

##### 2.3.4.1.7.0 Framework Specific Attributes

- @CommandHandler(CreateServiceRequestCommand)

##### 2.3.4.1.8.0 Technology Integration Notes

Uses NestJS CQRS CommandBus.

##### 2.3.4.1.9.0 Properties

*No items available*

##### 2.3.4.1.10.0 Methods

- {'method_name': 'execute', 'method_signature': 'execute(command: CreateServiceRequestCommand): Promise<ServiceRequestDto>', 'return_type': 'Promise<ServiceRequestDto>', 'access_modifier': 'public', 'is_async': 'true', 'parameters': [{'parameter_name': 'command', 'parameter_type': 'CreateServiceRequestCommand', 'is_nullable': 'false', 'purpose': 'Input DTO containing product, user, and issue details'}], 'implementation_logic': '1. Call ProductPort.validateWarranty(). 2. If valid, call ServiceCenterPort.findCandidates(). 3. Call RoutingDomainService.selectBestCenter(). 4. Create ServiceRequest Entity. 5. Repository.save(). 6. Publish RequestCreatedEvent.', 'exception_handling': "Throw 'WarrantyExpiredException' or 'NoServiceCenterFoundException' which map to HTTP 400/404.", 'performance_considerations': 'Parallelize Product and ServiceCenter checks if possible, though routing depends on location.', 'validation_requirements': 'Validates that Product ID belongs to User.', 'technology_integration_details': 'Integration with external microservices via HTTP Adapters.'}

##### 2.3.4.1.11.0 Events

- {'event_name': 'ServiceRequestCreatedEvent', 'event_type': 'IntegrationEvent', 'trigger_conditions': 'Successful persistence of new request.', 'event_data': 'RequestId, UserId, Status, ServiceCenterId'}

##### 2.3.4.1.12.0 Implementation Notes

Core workflow entry point.

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

RoutingDomainService

##### 2.3.4.2.2.0 File Path

src/modules/service-request/domain/services/routing.domain-service.ts

##### 2.3.4.2.3.0 Class Type

DomainService

##### 2.3.4.2.4.0 Inheritance

None

##### 2.3.4.2.5.0 Purpose

Pure logic to select the optimal service center based on geospatial distance and brand authorization rules.

##### 2.3.4.2.6.0 Dependencies

*No items available*

##### 2.3.4.2.7.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.2.8.0 Technology Integration Notes

Stateless service.

##### 2.3.4.2.9.0 Properties

*No items available*

##### 2.3.4.2.10.0 Methods

- {'method_name': 'selectBestCenter', 'method_signature': 'selectBestCenter(userLocation: GeoLocation, candidates: ServiceCenterDto[]): ServiceCenterDto', 'return_type': 'ServiceCenterDto', 'access_modifier': 'public', 'is_async': 'false', 'parameters': [{'parameter_name': 'userLocation', 'parameter_type': 'GeoLocation', 'is_nullable': 'false', 'purpose': "User's GPS coordinates"}, {'parameter_name': 'candidates', 'parameter_type': 'ServiceCenterDto[]', 'is_nullable': 'false', 'purpose': 'List of potential centers covering the area'}], 'implementation_logic': 'Sort candidates by distance to userLocation. Apply load-balancing rules if available (Round Robin). Return top candidate.', 'exception_handling': 'Throw DomainException if list is empty.', 'performance_considerations': 'In-memory calculation.', 'validation_requirements': 'Candidates must be active and brand-authorized.', 'technology_integration_details': 'Pure TypeScript logic.'}

##### 2.3.4.2.11.0 Events

*No items available*

##### 2.3.4.2.12.0 Implementation Notes

Decouples routing rules from the orchestrator.

#### 2.3.4.3.0.0 Class Name

##### 2.3.4.3.1.0 Class Name

ChatGateway

##### 2.3.4.3.2.0 File Path

src/modules/chat/chat.gateway.ts

##### 2.3.4.3.3.0 Class Type

Gateway

##### 2.3.4.3.4.0 Inheritance

OnGatewayConnection, OnGatewayDisconnect

##### 2.3.4.3.5.0 Purpose

Manages real-time WebSocket connections, authentication, and message routing for specific tickets.

##### 2.3.4.3.6.0 Dependencies

- ChatService
- JwtService

##### 2.3.4.3.7.0 Framework Specific Attributes

- @WebSocketGateway({ namespace: 'chat' })
- @UseGuards(WsJwtGuard)

##### 2.3.4.3.8.0 Technology Integration Notes

Must use RedisIoAdapter for multi-instance deployments (REQ-SCAL-001).

##### 2.3.4.3.9.0 Properties

*No items available*

##### 2.3.4.3.10.0 Methods

###### 2.3.4.3.10.1 Method Name

####### 2.3.4.3.10.1.1 Method Name

handleConnection

####### 2.3.4.3.10.1.2 Method Signature

handleConnection(client: Socket, ...args: any[]): Promise<void>

####### 2.3.4.3.10.1.3 Return Type

Promise<void>

####### 2.3.4.3.10.1.4 Access Modifier

public

####### 2.3.4.3.10.1.5 Is Async

true

####### 2.3.4.3.10.1.6 Parameters

- {'parameter_name': 'client', 'parameter_type': 'Socket', 'is_nullable': 'false', 'purpose': 'Connected client instance'}

####### 2.3.4.3.10.1.7 Implementation Logic

Validate JWT from handshake query. Extract UserID. Join client to rooms for their active Service Request IDs.

####### 2.3.4.3.10.1.8 Exception Handling

Disconnect if auth fails.

####### 2.3.4.3.10.1.9 Performance Considerations

Keep lightweight.

####### 2.3.4.3.10.1.10 Validation Requirements

JWT signature check.

####### 2.3.4.3.10.1.11 Technology Integration Details

Socket.IO

###### 2.3.4.3.10.2.0 Method Name

####### 2.3.4.3.10.2.1 Method Name

handleMessage

####### 2.3.4.3.10.2.2 Method Signature

handleMessage(client: Socket, payload: SendMessageDto): Promise<void>

####### 2.3.4.3.10.2.3 Return Type

Promise<void>

####### 2.3.4.3.10.2.4 Access Modifier

public

####### 2.3.4.3.10.2.5 Is Async

true

####### 2.3.4.3.10.2.6 Framework Specific Attributes

- @SubscribeMessage('send_message')

####### 2.3.4.3.10.2.7 Parameters

######## 2.3.4.3.10.2.7.1 Parameter Name

######### 2.3.4.3.10.2.7.1.1 Parameter Name

client

######### 2.3.4.3.10.2.7.1.2 Parameter Type

Socket

######### 2.3.4.3.10.2.7.1.3 Is Nullable

false

######### 2.3.4.3.10.2.7.1.4 Purpose

Sender

######## 2.3.4.3.10.2.7.2.0 Parameter Name

######### 2.3.4.3.10.2.7.2.1 Parameter Name

payload

######### 2.3.4.3.10.2.7.2.2 Parameter Type

SendMessageDto

######### 2.3.4.3.10.2.7.2.3 Is Nullable

false

######### 2.3.4.3.10.2.7.2.4 Purpose

Message content and TicketID

####### 2.3.4.3.10.2.8.0.0 Implementation Logic

1. Verify user access to TicketID room. 2. Persist message via ChatService. 3. Emit 'new_message' event to room. 4. Publish ChatMessageSent integration event (for Push Notification).

####### 2.3.4.3.10.2.9.0.0 Exception Handling

Ack with error if failed.

####### 2.3.4.3.10.2.10.0.0 Performance Considerations

Async persistence.

####### 2.3.4.3.10.2.11.0.0 Validation Requirements

Payload validation.

####### 2.3.4.3.10.2.12.0.0 Technology Integration Details

Broadcasts to room.

##### 2.3.4.3.11.0.0.0.0 Events

- {'event_name': 'ChatMessageSent', 'event_type': 'IntegrationEvent', 'trigger_conditions': 'Message successfully handled.', 'event_data': 'SenderId, RecipientId, ContentSnippet'}

##### 2.3.4.3.12.0.0.0.0 Implementation Notes

Real-time engine.

### 2.3.5.0.0.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0.0.0 Interface Name

##### 2.3.5.1.1.0.0.0.0 Interface Name

IServiceRequestRepository

##### 2.3.5.1.2.0.0.0.0 File Path

src/modules/service-request/domain/ports/service-request.repository.port.ts

##### 2.3.5.1.3.0.0.0.0 Purpose

Abstracts data access for Service Request aggregates.

##### 2.3.5.1.4.0.0.0.0 Generic Constraints

None

##### 2.3.5.1.5.0.0.0.0 Framework Specific Inheritance

None

##### 2.3.5.1.6.0.0.0.0 Method Contracts

###### 2.3.5.1.6.1.0.0.0 Method Name

####### 2.3.5.1.6.1.1.0.0 Method Name

save

####### 2.3.5.1.6.1.2.0.0 Method Signature

save(request: ServiceRequestEntity): Promise<ServiceRequestEntity>

####### 2.3.5.1.6.1.3.0.0 Return Type

Promise<ServiceRequestEntity>

####### 2.3.5.1.6.1.4.0.0 Framework Attributes

*No items available*

####### 2.3.5.1.6.1.5.0.0 Parameters

- {'parameter_name': 'request', 'parameter_type': 'ServiceRequestEntity', 'purpose': 'Entity to persist'}

####### 2.3.5.1.6.1.6.0.0 Contract Description

Persists the entity state.

####### 2.3.5.1.6.1.7.0.0 Exception Contracts

Throws PersistenceException on DB error.

###### 2.3.5.1.6.2.0.0.0 Method Name

####### 2.3.5.1.6.2.1.0.0 Method Name

findById

####### 2.3.5.1.6.2.2.0.0 Method Signature

findById(id: string): Promise<ServiceRequestEntity | null>

####### 2.3.5.1.6.2.3.0.0 Return Type

Promise<ServiceRequestEntity | null>

####### 2.3.5.1.6.2.4.0.0 Framework Attributes

*No items available*

####### 2.3.5.1.6.2.5.0.0 Parameters

- {'parameter_name': 'id', 'parameter_type': 'string', 'purpose': 'UUID'}

####### 2.3.5.1.6.2.6.0.0 Contract Description

Retrieves aggregate by ID.

####### 2.3.5.1.6.2.7.0.0 Exception Contracts

None

##### 2.3.5.1.7.0.0.0.0 Property Contracts

*No items available*

##### 2.3.5.1.8.0.0.0.0 Implementation Guidance

Implemented by TypeOrmServiceRequestRepository.

#### 2.3.5.2.0.0.0.0.0 Interface Name

##### 2.3.5.2.1.0.0.0.0 Interface Name

IProductIntegrationPort

##### 2.3.5.2.2.0.0.0.0 File Path

src/modules/service-request/domain/ports/product-integration.port.ts

##### 2.3.5.2.3.0.0.0.0 Purpose

Port for communicating with the Product Service.

##### 2.3.5.2.4.0.0.0.0 Generic Constraints

None

##### 2.3.5.2.5.0.0.0.0 Framework Specific Inheritance

None

##### 2.3.5.2.6.0.0.0.0 Method Contracts

- {'method_name': 'validateWarranty', 'method_signature': 'validateWarranty(productId: string, userId: string): Promise<WarrantyValidationResult>', 'return_type': 'Promise<WarrantyValidationResult>', 'framework_attributes': [], 'parameters': [{'parameter_name': 'productId', 'parameter_type': 'string', 'purpose': 'Product UUID'}, {'parameter_name': 'userId', 'parameter_type': 'string', 'purpose': 'User UUID'}], 'contract_description': 'Checks if product exists, belongs to user, and has active warranty.', 'exception_contracts': 'Throws IntegrationException on timeout.'}

##### 2.3.5.2.7.0.0.0.0 Property Contracts

*No items available*

##### 2.3.5.2.8.0.0.0.0 Implementation Guidance

Implemented by HttpProductServiceAdapter.

### 2.3.6.0.0.0.0.0.0 Enum Specifications

- {'enum_name': 'ServiceRequestStatus', 'file_path': 'src/modules/service-request/domain/enums/service-request-status.enum.ts', 'underlying_type': 'string', 'purpose': 'Defines the state machine for the request lifecycle.', 'framework_attributes': [], 'values': [{'value_name': 'REQUESTED', 'value': 'requested', 'description': 'Initial state.'}, {'value_name': 'ASSIGNED', 'value': 'assigned', 'description': 'Technician assigned.'}, {'value_name': 'IN_PROGRESS', 'value': 'in_progress', 'description': 'Technician working.'}, {'value_name': 'RESOLVED', 'value': 'resolved', 'description': 'Work done.'}, {'value_name': 'DISPUTED', 'value': 'disputed', 'description': 'User rejected resolution (REQ-FUNC-008).'}, {'value_name': 'CLOSED', 'value': 'closed', 'description': 'Final state.'}], 'validation_notes': 'Used in State Machine validation logic.'}

### 2.3.7.0.0.0.0.0.0 Dto Specifications

- {'dto_name': 'CreateServiceRequestDto', 'file_path': 'src/modules/service-request/interface/dtos/create-service-request.dto.ts', 'purpose': 'Validation schema for creation endpoint.', 'framework_base_class': 'None', 'properties': [{'property_name': 'productId', 'property_type': 'string', 'validation_attributes': ['@IsUUID()', '@IsNotEmpty()'], 'serialization_attributes': [], 'framework_specific_attributes': []}, {'property_name': 'issueDescription', 'property_type': 'string', 'validation_attributes': ['@IsString()', '@MinLength(10)'], 'serialization_attributes': [], 'framework_specific_attributes': []}, {'property_name': 'coordinates', 'property_type': 'GeoLocationDto', 'validation_attributes': ['@ValidateNested()'], 'serialization_attributes': [], 'framework_specific_attributes': []}], 'validation_rules': 'Strict input validation.', 'serialization_requirements': 'JSON'}

### 2.3.8.0.0.0.0.0.0 Configuration Specifications

- {'configuration_name': 'RedisConfig', 'file_path': 'src/config/redis.config.ts', 'purpose': 'Configures Redis connection for WebSocket Adapter.', 'framework_base_class': 'None', 'configuration_sections': [{'section_name': 'redis', 'properties': [{'property_name': 'host', 'property_type': 'string', 'default_value': 'localhost', 'required': 'true', 'description': 'Redis Host'}, {'property_name': 'port', 'property_type': 'number', 'default_value': '6379', 'required': 'true', 'description': 'Redis Port'}]}], 'validation_requirements': 'Validates on startup.', 'validation_notes': 'Required for WS scaling.'}

### 2.3.9.0.0.0.0.0.0 Dependency Injection Specifications

#### 2.3.9.1.0.0.0.0.0 Service Interface

##### 2.3.9.1.1.0.0.0.0 Service Interface

IServiceRequestRepository

##### 2.3.9.1.2.0.0.0.0 Service Implementation

TypeOrmServiceRequestRepository

##### 2.3.9.1.3.0.0.0.0 Lifetime

Scoped

##### 2.3.9.1.4.0.0.0.0 Registration Reasoning

Standard repo scope.

##### 2.3.9.1.5.0.0.0.0 Framework Registration Pattern

Custom Provider: { provide: IServiceRequestRepository, useClass: TypeOrmServiceRequestRepository }

##### 2.3.9.1.6.0.0.0.0 Validation Notes

Registered in ServiceRequestModule.

#### 2.3.9.2.0.0.0.0.0 Service Interface

##### 2.3.9.2.1.0.0.0.0 Service Interface

IProductIntegrationPort

##### 2.3.9.2.2.0.0.0.0 Service Implementation

HttpProductServiceAdapter

##### 2.3.9.2.3.0.0.0.0 Lifetime

Singleton

##### 2.3.9.2.4.0.0.0.0 Registration Reasoning

Stateless adapter, safe as singleton.

##### 2.3.9.2.5.0.0.0.0 Framework Registration Pattern

@Injectable()

##### 2.3.9.2.6.0.0.0.0 Validation Notes

Registered in InfrastructureModule.

### 2.3.10.0.0.0.0.0.0 External Integration Specifications

#### 2.3.10.1.0.0.0.0.0 Integration Target

##### 2.3.10.1.1.0.0.0.0 Integration Target

Product Service

##### 2.3.10.1.2.0.0.0.0 Integration Type

REST API

##### 2.3.10.1.3.0.0.0.0 Required Client Classes

- HttpService

##### 2.3.10.1.4.0.0.0.0 Configuration Requirements

PRODUCT_SERVICE_URL env var.

##### 2.3.10.1.5.0.0.0.0 Error Handling Requirements

Circuit Breaker (nestjs-resilience) on requests.

##### 2.3.10.1.6.0.0.0.0 Authentication Requirements

Internal Service Token (JWT).

##### 2.3.10.1.7.0.0.0.0 Framework Integration Patterns

HttpAdapter

##### 2.3.10.1.8.0.0.0.0 Validation Notes

Synchronous dependency.

#### 2.3.10.2.0.0.0.0.0 Integration Target

##### 2.3.10.2.1.0.0.0.0 Integration Target

Azure Blob Storage

##### 2.3.10.2.2.0.0.0.0 Integration Type

SDK

##### 2.3.10.2.3.0.0.0.0 Required Client Classes

- BlobServiceClient

##### 2.3.10.2.4.0.0.0.0 Configuration Requirements

AZURE_STORAGE_CONNECTION_STRING.

##### 2.3.10.2.5.0.0.0.0 Error Handling Requirements

Retry on upload failure.

##### 2.3.10.2.6.0.0.0.0 Authentication Requirements

SAS Token or Connection String.

##### 2.3.10.2.7.0.0.0.0 Framework Integration Patterns

Adapter Wrapper

##### 2.3.10.2.8.0.0.0.0 Validation Notes

For Signature Images (REQ-FUNC-010).

## 2.4.0.0.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 5 |
| Total Interfaces | 3 |
| Total Enums | 1 |
| Total Dtos | 2 |
| Total Configurations | 1 |
| Total External Integrations | 2 |
| Grand Total Components | 22 |
| Phase 2 Claimed Count | 2 |
| Phase 2 Actual Count | 2 |
| Validation Added Count | 14 |
| Final Validated Count | 22 |

# 3.0.0.0.0.0.0.0.0 File Structure

## 3.1.0.0.0.0.0.0.0 Directory Organization

### 3.1.1.0.0.0.0.0.0 Directory Path

#### 3.1.1.1.0.0.0.0.0 Directory Path

.dockerignore

#### 3.1.1.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.1.3.0.0.0.0.0 Contains Files

- .dockerignore

#### 3.1.1.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.1.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.2.0.0.0.0.0.0 Directory Path

#### 3.1.2.1.0.0.0.0.0 Directory Path

.env.example

#### 3.1.2.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.2.3.0.0.0.0.0 Contains Files

- .env.example

#### 3.1.2.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.2.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.3.0.0.0.0.0.0 Directory Path

#### 3.1.3.1.0.0.0.0.0 Directory Path

.eslintrc.js

#### 3.1.3.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.3.3.0.0.0.0.0 Contains Files

- .eslintrc.js

#### 3.1.3.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.3.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.4.0.0.0.0.0.0 Directory Path

#### 3.1.4.1.0.0.0.0.0 Directory Path

.gitignore

#### 3.1.4.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.4.3.0.0.0.0.0 Contains Files

- .gitignore

#### 3.1.4.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.4.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.5.0.0.0.0.0.0 Directory Path

#### 3.1.5.1.0.0.0.0.0 Directory Path

.prettierrc

#### 3.1.5.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.5.3.0.0.0.0.0 Contains Files

- .prettierrc

#### 3.1.5.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.5.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.6.0.0.0.0.0.0 Directory Path

#### 3.1.6.1.0.0.0.0.0 Directory Path

docker-compose.yml

#### 3.1.6.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.6.3.0.0.0.0.0 Contains Files

- docker-compose.yml

#### 3.1.6.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.6.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.7.0.0.0.0.0.0 Directory Path

#### 3.1.7.1.0.0.0.0.0 Directory Path

Dockerfile

#### 3.1.7.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.7.3.0.0.0.0.0 Contains Files

- Dockerfile

#### 3.1.7.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.7.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.8.0.0.0.0.0.0 Directory Path

#### 3.1.8.1.0.0.0.0.0 Directory Path

jest.config.js

#### 3.1.8.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.8.3.0.0.0.0.0 Contains Files

- jest.config.js

#### 3.1.8.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.8.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.9.0.0.0.0.0.0 Directory Path

#### 3.1.9.1.0.0.0.0.0 Directory Path

nest-cli.json

#### 3.1.9.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.9.3.0.0.0.0.0 Contains Files

- nest-cli.json

#### 3.1.9.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.9.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.10.0.0.0.0.0.0 Directory Path

#### 3.1.10.1.0.0.0.0.0 Directory Path

package.json

#### 3.1.10.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.10.3.0.0.0.0.0 Contains Files

- package.json

#### 3.1.10.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.10.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.11.0.0.0.0.0.0 Directory Path

#### 3.1.11.1.0.0.0.0.0 Directory Path

test/jest-e2e.json

#### 3.1.11.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.11.3.0.0.0.0.0 Contains Files

- jest-e2e.json

#### 3.1.11.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.11.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.12.0.0.0.0.0.0 Directory Path

#### 3.1.12.1.0.0.0.0.0 Directory Path

tsconfig.build.json

#### 3.1.12.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.12.3.0.0.0.0.0 Contains Files

- tsconfig.build.json

#### 3.1.12.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.12.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.13.0.0.0.0.0.0 Directory Path

#### 3.1.13.1.0.0.0.0.0 Directory Path

tsconfig.json

#### 3.1.13.2.0.0.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.13.3.0.0.0.0.0 Contains Files

- tsconfig.json

#### 3.1.13.4.0.0.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.13.5.0.0.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

