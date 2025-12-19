# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-004 |
| Extraction Timestamp | 2025-05-24T12:30:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | Production-Ready |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-FUNC-007

#### 1.2.1.2 Requirement Text

The system shall provide a real-time, two-way chat interface within each service request ticket, enabling communication between the user and the assigned service center personnel or technician.

#### 1.2.1.3 Validation Criteria

- Verify WebSocket connection handling
- Verify message persistence to database
- Verify real-time event broadcasting via Redis backplane

#### 1.2.1.4 Implementation Implications

- Implement NestJS Gateway with Socket.IO
- Configure Redis IoAdapter for horizontal scaling
- Implement message persistence via TypeORM

#### 1.2.1.5 Extraction Reasoning

Core feature necessitating a stateful WebSocket layer distinct from the stateless REST API.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-FUNC-001

#### 1.2.2.2 Requirement Text

Automated routing of service requests to appropriate service centers.

#### 1.2.2.3 Validation Criteria

- Verify service center selection based on geospatial coverage
- Verify round-robin assignment logic

#### 1.2.2.4 Implementation Implications

- Synchronous call to Service Center Service to resolve coverage
- Domain logic to select best candidate
- Transactional assignment during request creation

#### 1.2.2.5 Extraction Reasoning

Implicit core business logic for the 'Service Request Manager' component.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-FUNC-010

#### 1.2.3.2 Requirement Text

The technician's mobile application shall provide an interface to capture a customer's digital signature... and save it as a PNG image file.

#### 1.2.3.3 Validation Criteria

- Verify secure upload of image data
- Verify linking of image URL to service request

#### 1.2.3.4 Implementation Implications

- Implement multipart/form-data endpoint
- Integrate with Azure Blob Storage SDK

#### 1.2.3.5 Extraction Reasoning

Requires specific infrastructure integration for file storage.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

ServiceRequestManager

#### 1.3.1.2 Component Specification

Orchestrates the lifecycle of tickets (Create, Assign, Resolve, Dispute). Implements the core State Machine.

#### 1.3.1.3 Implementation Requirements

- CQRS Command Handlers
- State Machine validation logic
- Distributed Transaction management (Saga pattern coordination)

#### 1.3.1.4 Architectural Context

Domain Layer / Application Layer

#### 1.3.1.5 Extraction Reasoning

The central nervous system of the repository.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

ChatGateway

#### 1.3.2.2 Component Specification

Manages persistent WebSocket connections for real-time chat.

#### 1.3.2.3 Implementation Requirements

- Socket.IO Server
- Redis Adapter
- JWT Guard for WebSockets

#### 1.3.2.4 Architectural Context

Interface Layer (Real-time)

#### 1.3.2.5 Extraction Reasoning

Separates stateful connection handling from stateless business logic.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

RoutingEngine

#### 1.3.3.2 Component Specification

Domain service responsible for selecting the optimal Service Center for a new request.

#### 1.3.3.3 Implementation Requirements

- Geospatial distance calculation
- Integration with Service Center Service

#### 1.3.3.4 Architectural Context

Domain Service

#### 1.3.3.5 Extraction Reasoning

Encapsulates complex assignment logic.

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Application Service Layer

#### 1.4.1.2 Layer Responsibilities

Orchestrating use cases (Create Request, Post Message), managing transactions, and interacting with infrastructure adapters.

#### 1.4.1.3 Layer Constraints

- Must be stateless
- Must handle resiliency (Circuit Breakers) for external calls

#### 1.4.1.4 Implementation Patterns

- CQRS
- Outbox Pattern (for reliable event publishing)

#### 1.4.1.5 Extraction Reasoning

Standard Microservice Layering.

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Interface Layer

#### 1.4.2.2 Layer Responsibilities

Exposing REST endpoints and WebSocket namespaces.

#### 1.4.2.3 Layer Constraints

- DTO Validation
- Rate Limiting

#### 1.4.2.4 Implementation Patterns

- Controller Pattern
- Gateway Pattern

#### 1.4.2.5 Extraction Reasoning

Handling diverse input protocols (HTTP, WSS).

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IProductService

#### 1.5.1.2 Source Repository

REPO-BS-002

#### 1.5.1.3 Method Contracts

- {'method_name': 'validateWarranty', 'method_signature': 'GET /products/{id}/warranty-status', 'method_purpose': 'Verifies product existence and warranty validity during request creation.', 'integration_context': "Synchronous call within 'CreateServiceRequest' command handler."}

#### 1.5.1.4 Integration Pattern

Synchronous REST with Circuit Breaker

#### 1.5.1.5 Communication Protocol

HTTP/1.1

#### 1.5.1.6 Extraction Reasoning

Critical dependency; request cannot be created for invalid products.

### 1.5.2.0 Interface Name

#### 1.5.2.1 Interface Name

IServiceCenterService

#### 1.5.2.2 Source Repository

REPO-BS-003

#### 1.5.2.3 Method Contracts

- {'method_name': 'findCandidates', 'method_signature': 'GET /service-centers/candidates?lat={lat}&long={long}&brand={brandId}', 'method_purpose': 'Retrieves list of eligible service centers based on location and brand.', 'integration_context': "Synchronous call within 'RoutingEngine' logic."}

#### 1.5.2.4 Integration Pattern

Synchronous REST with Circuit Breaker

#### 1.5.2.5 Communication Protocol

HTTP/1.1

#### 1.5.2.6 Extraction Reasoning

Routing logic depends on geospatial data owned by Service Center Service.

### 1.5.3.0 Interface Name

#### 1.5.3.1 Interface Name

IMessagingBus

#### 1.5.3.2 Source Repository

REPO-IN-004

#### 1.5.3.3 Method Contracts

- {'method_name': 'publishEvent', 'method_signature': 'publish(topic: string, message: DomainEvent)', 'method_purpose': 'Publishes status changes and chat messages for async processing (Notification, Audit).', 'integration_context': 'Post-commit in Command Handlers.'}

#### 1.5.3.4 Integration Pattern

Fire-and-Forget / Pub-Sub

#### 1.5.3.5 Communication Protocol

AMQP (Azure Service Bus)

#### 1.5.3.6 Extraction Reasoning

Decouples side effects like email/push notifications.

## 1.6.0.0 Exposed Interfaces

### 1.6.1.0 Interface Name

#### 1.6.1.1 Interface Name

Service Request REST API

#### 1.6.1.2 Consumer Repositories

- REPO-FE-002
- REPO-FE-003
- REPO-GW-013

#### 1.6.1.3 Method Contracts

##### 1.6.1.3.1 Method Name

###### 1.6.1.3.1.1 Method Name

Create Request

###### 1.6.1.3.1.2 Method Signature

POST /api/v1/service-requests

###### 1.6.1.3.1.3 Method Purpose

Initiates a new ticket.

###### 1.6.1.3.1.4 Implementation Requirements

Transactional: Validate Product -> Route -> Save -> Emit Event.

##### 1.6.1.3.2.0 Method Name

###### 1.6.1.3.2.1 Method Name

Update Status

###### 1.6.1.3.2.2 Method Signature

PATCH /api/v1/service-requests/{id}/status

###### 1.6.1.3.2.3 Method Purpose

Transitions ticket state (e.g., to Resolved).

###### 1.6.1.3.2.4 Implementation Requirements

State Machine validation required.

##### 1.6.1.3.3.0 Method Name

###### 1.6.1.3.3.1 Method Name

Upload Signature

###### 1.6.1.3.3.2 Method Signature

POST /api/v1/service-requests/{id}/signature

###### 1.6.1.3.3.3 Method Purpose

Attaches proof of completion.

###### 1.6.1.3.3.4 Implementation Requirements

Multipart upload to Blob Storage.

#### 1.6.1.4.0.0 Service Level Requirements

- 99.9% Availability
- < 500ms P95 Latency

#### 1.6.1.5.0.0 Implementation Constraints

- Idempotency Keys required for POST methods

#### 1.6.1.6.0.0 Extraction Reasoning

Primary operational interface.

### 1.6.2.0.0.0 Interface Name

#### 1.6.2.1.0.0 Interface Name

Chat WebSocket API

#### 1.6.2.2.0.0 Consumer Repositories

- REPO-FE-002
- REPO-FE-003
- REPO-GW-013

#### 1.6.2.3.0.0 Method Contracts

##### 1.6.2.3.1.0 Method Name

###### 1.6.2.3.1.1 Method Name

Join Room

###### 1.6.2.3.1.2 Method Signature

Event: join_room { ticketId }

###### 1.6.2.3.1.3 Method Purpose

Subscribes client to updates for a specific ticket.

###### 1.6.2.3.1.4 Implementation Requirements

Validate user access to ticket.

##### 1.6.2.3.2.0 Method Name

###### 1.6.2.3.2.1 Method Name

Send Message

###### 1.6.2.3.2.2 Method Signature

Event: send_message { content, ticketId }

###### 1.6.2.3.2.3 Method Purpose

Broadcasts message to room participants.

###### 1.6.2.3.2.4 Implementation Requirements

Persist to DB async, Ack to sender immediately.

#### 1.6.2.4.0.0 Service Level Requirements

- Real-time delivery (< 200ms)

#### 1.6.2.5.0.0 Implementation Constraints

- Sticky sessions or Redis Backplane required

#### 1.6.2.6.0.0 Extraction Reasoning

Required for REQ-FUNC-007.

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

NestJS v10.3.x, TypeORM, @nestjs/websockets, @nestjs/cqrs

### 1.7.2.0.0.0 Integration Technologies

- Azure Service Bus
- Azure Blob Storage
- Redis (Pub/Sub for Socket.IO)

### 1.7.3.0.0.0 Performance Constraints

Chat must handle high concurrency; Database requires indexing on Status and UserID.

### 1.7.4.0.0.0 Security Requirements

JWT validation for both REST and WSS. WSS requires token in handshake query or header. strict RBAC enforcement.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | Mapped all functional requirements (Chat, Routing,... |
| Cross Reference Validation | Validated dependencies against Product Service (RE... |
| Implementation Readiness Assessment | Production-Ready. Patterns for Resilience (Circuit... |
| Quality Assurance Confirmation | Integration design adheres to Clean Architecture a... |

