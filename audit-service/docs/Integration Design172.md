# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BW-008 |
| Extraction Timestamp | 2025-01-27T20:30:00Z |
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

- Verify that audit logs are stored in a secure, tamper-proof storage system
- Verify that the audit service consumes events from all domains (Identity, Product, Service Request)

#### 1.2.1.4 Implementation Implications

- Implement a dedicated Azure Service Bus consumer for the 'audit-events' topic
- Ensure database connection uses a user with INSERT-only privileges if possible, or strict access controls to prevent modification

#### 1.2.1.5 Extraction Reasoning

This is the primary functional mandate for this microservice.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

US-114

#### 1.2.2.2 Requirement Text

System: Log critical actions in an immutable audit trail for security and compliance

#### 1.2.2.3 Validation Criteria

- Log entry must contain: unique logId, timestamp, actor, action, outcome, target, and details

#### 1.2.2.4 Implementation Implications

- Utilize shared DTOs from 'warranty-hub-contracts' to validate incoming event payloads against the standard schema before persistence

#### 1.2.2.5 Extraction Reasoning

Defines the specific data structure required for the integration interface.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

AuditEventConsumer

#### 1.3.1.2 Component Specification

NestJS Controller utilizing the Microservices module to subscribe to Azure Service Bus topics.

#### 1.3.1.3 Implementation Requirements

- Configure Azure Service Bus connection using Managed Identity
- Implement Dead Letter Queue handling for malformed events
- Use 'CriticalActionOccurred' event pattern matcher

#### 1.3.1.4 Architectural Context

Asynchronous Event Sink / Consumer

#### 1.3.1.5 Extraction Reasoning

The entry point for data entering the audit service from other microservices.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

AuditLogRepository

#### 1.3.2.2 Component Specification

Data access layer responsible for persisting validated audit events to the immutable storage.

#### 1.3.2.3 Implementation Requirements

- Use TypeORM to map DTOs to the PostgreSQL 'audit_logs' table
- Ensure efficient write throughput (batching if necessary)

#### 1.3.2.4 Architectural Context

Persistence Adapter

#### 1.3.2.5 Extraction Reasoning

The integration point between the application logic and the database infrastructure.

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Messaging Infrastructure Layer

#### 1.4.1.2 Layer Responsibilities

Reliable consumption of system-wide events.

#### 1.4.1.3 Layer Constraints

- Must handle message deduplication (Idempotency)
- Must not block if the database is temporarily unavailable (Retry policy)

#### 1.4.1.4 Implementation Patterns

- Competing Consumers
- Event-Driven Architecture

#### 1.4.1.5 Extraction Reasoning

Connects the service to the broader ecosystem via Azure Service Bus.

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Data Access Layer

#### 1.4.2.2 Layer Responsibilities

Persistence of audit records.

#### 1.4.2.3 Layer Constraints

- Append-only logic
- Data retention adherence

#### 1.4.2.4 Implementation Patterns

- Repository Pattern

#### 1.4.2.5 Extraction Reasoning

Connects the service to the underlying Azure Database for PostgreSQL.

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IServiceBusConsumer

#### 1.5.1.2 Source Repository

WarrantyHub.Infrastructure (Azure Service Bus)

#### 1.5.1.3 Method Contracts

- {'method_name': 'subscribe', 'method_signature': "@EventPattern('CriticalActionOccurred') handle(payload: CriticalActionEventDto, context: RmqContext)", 'method_purpose': 'Listens for audit events published by Identity, Product, and Service Request services.', 'integration_context': 'Triggered asynchronously whenever a critical action occurs in the platform.'}

#### 1.5.1.4 Integration Pattern

Pub/Sub

#### 1.5.1.5 Communication Protocol

AMQP (SBMP)

#### 1.5.1.6 Extraction Reasoning

The service's primary input channel.

### 1.5.2.0 Interface Name

#### 1.5.2.1 Interface Name

Audit Schema Contract

#### 1.5.2.2 Source Repository

REPO-CL-010

#### 1.5.2.3 Method Contracts

- {'method_name': 'AuditLogEntrySchema', 'method_signature': 'z.object({ actorId: string, actionType: string, ... })', 'method_purpose': 'Provides the validation rules and type definitions for the audit payload.', 'integration_context': 'Used during message deserialization and validation.'}

#### 1.5.2.4 Integration Pattern

Shared Library Import

#### 1.5.2.5 Communication Protocol

In-Process

#### 1.5.2.6 Extraction Reasoning

Ensures type safety and contract adherence between producers and this consumer.

## 1.6.0.0 Exposed Interfaces

- {'interface_name': 'Health Check API', 'consumer_repositories': ['Kubernetes Cluster (Liveness/Readiness Probes)'], 'method_contracts': [{'method_name': 'GET /health', 'method_signature': 'check(): Promise<HealthCheckResult>', 'method_purpose': 'Reports the status of the Service Bus connection and Database connection.', 'implementation_requirements': 'Must return 200 OK only if both DB write capability and SB connection are active.'}], 'service_level_requirements': ['Response time < 200ms'], 'implementation_constraints': ['No authentication required (internal cluster network only)'], 'extraction_reasoning': 'Standard operational interface for containerized microservices.'}

## 1.7.0.0 Technology Context

### 1.7.1.0 Framework Requirements

NestJS v10.3.x, @nestjs/azure-service-bus

### 1.7.2.0 Integration Technologies

- Azure Service Bus
- PostgreSQL
- TypeORM

### 1.7.3.0 Performance Constraints

Consumer must be able to process events faster than the aggregate generation rate of all producers to prevent lag.

### 1.7.4.0 Security Requirements

Service Bus connection string stored in Key Vault; Database connection uses SSL; User-assigned Managed Identity for Azure resources.

## 1.8.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | Verified against producers (REPO-BS-001, REPO-BS-0... |
| Cross Reference Validation | Confirmed that 'CriticalActionOccurred' event exis... |
| Implementation Readiness Assessment | High. The consumer logic and schema definitions ar... |
| Quality Assurance Confirmation | The decoupled design ensures that audit logging fa... |

