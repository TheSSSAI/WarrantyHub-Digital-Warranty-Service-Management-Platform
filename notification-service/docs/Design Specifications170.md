# 1 Analysis Metadata

| Property | Value |
|----------|-------|
| Analysis Timestamp | 2025-05-24T10:00:00Z |
| Repository Component Id | notification-service |
| Analysis Completeness Score | 98 |
| Critical Findings Count | 4 |
| Analysis Methodology | Systematic decomposition of architectural context,... |

# 2 Repository Analysis

## 2.1 Repository Definition

### 2.1.1 Scope Boundaries

- Inbound: Asynchronous event consumption from Azure Service Bus (Business Events)
- Processing: Notification routing, template selection, and user preference filtering
- Outbound: Dispatching messages to external providers (Firebase Cloud Messaging, Azure Communication Services)
- Persistence: Logging sent notifications for the 'Notification Center' feature (US-073)

### 2.1.2 Technology Stack

- Node.js (Runtime)
- NestJS v10.3.x (Framework)
- Azure Service Bus (Event Ingestion)
- Firebase Admin SDK (Push Notifications)
- Azure Communication Services (Email/SMS)
- PostgreSQL (Notification History)
- Redis (Preference Caching/Deduplication)

### 2.1.3 Architectural Constraints

- Must operate asynchronously to avoid blocking upstream business services
- Must handle high throughput with idempotent processing
- Strict separation between notification logic and channel adapters (Ports & Adapters)
- Compliance with GDPR for PII handling in notification payloads

### 2.1.4 Dependency Relationships

#### 2.1.4.1 Upstream Producer: service-request-service

##### 2.1.4.1.1 Dependency Type

Upstream Producer

##### 2.1.4.1.2 Target Component

service-request-service

##### 2.1.4.1.3 Integration Pattern

Pub/Sub via Azure Service Bus

##### 2.1.4.1.4 Reasoning

Receives status change events to trigger notifications.

#### 2.1.4.2.0 Upstream Producer: product-service

##### 2.1.4.2.1 Dependency Type

Upstream Producer

##### 2.1.4.2.2 Target Component

product-service

##### 2.1.4.2.3 Integration Pattern

Pub/Sub via Azure Service Bus

##### 2.1.4.2.4 Reasoning

Receives warranty expiry events.

#### 2.1.4.3.0 External Service: Firebase Cloud Messaging (FCM)

##### 2.1.4.3.1 Dependency Type

External Service

##### 2.1.4.3.2 Target Component

Firebase Cloud Messaging (FCM)

##### 2.1.4.3.3 Integration Pattern

HTTP/SDK

##### 2.1.4.3.4 Reasoning

Primary channel for mobile push notifications (REQ-INTG-001).

#### 2.1.4.4.0 External Service: Azure Communication Services

##### 2.1.4.4.1 Dependency Type

External Service

##### 2.1.4.4.2 Target Component

Azure Communication Services

##### 2.1.4.4.3 Integration Pattern

HTTP/SDK

##### 2.1.4.4.4 Reasoning

Primary channel for Email and SMS delivery.

### 2.1.5.0.0 Analysis Insights

The service acts as the central communication hub. It requires a robust Strategy Pattern to handle multiple channels (Push, Email, SMS) dynamically based on event types and user preferences. The inclusion of 'Notification History' (US-073) mandates a persistence layer within this service, transforming it from a pure stateless worker into a stateful service responsible for the user's notification feed.

# 3.0.0.0.0 Requirements Mapping

## 3.1.0.0.0 Functional Requirements

### 3.1.1.0.0 Requirement Id

#### 3.1.1.1.0 Requirement Id

REQ-INTG-001

#### 3.1.1.2.0 Requirement Description

Integrate with FCM to send push notifications to Android and iOS.

#### 3.1.1.3.0 Implementation Implications

- Implement FcmNotificationAdapter using firebase-admin
- Handle FCM token management (or retrieval from payload)

#### 3.1.1.4.0 Required Components

- FcmAdapter
- NotificationService

#### 3.1.1.5.0 Analysis Reasoning

Direct requirement for push notification capability.

### 3.1.2.0.0 Requirement Id

#### 3.1.2.1.0 Requirement Id

US-090

#### 3.1.2.2.0 Requirement Description

Manage notification preferences (Opt-in/Opt-out by channel and type).

#### 3.1.2.3.0 Implementation Implications

- Implement PreferenceFilterService to check user settings before dispatch
- Cache preferences in Redis to minimize latency during high-volume events

#### 3.1.2.4.0 Required Components

- PreferenceService
- RedisCacheModule

#### 3.1.2.5.0 Analysis Reasoning

Critical business rule to prevent spam and respect user choice.

### 3.1.3.0.0 Requirement Id

#### 3.1.3.1.0 Requirement Id

US-073

#### 3.1.3.2.0 Requirement Description

View notification history in an In-App Notification Center.

#### 3.1.3.3.0 Implementation Implications

- Persist all user-facing notifications to a 'notifications' table
- Expose GET /notifications API for mobile clients

#### 3.1.3.4.0 Required Components

- NotificationRepository
- NotificationController

#### 3.1.3.5.0 Analysis Reasoning

Transforms ephemeral alerts into a persistent record.

### 3.1.4.0.0 Requirement Id

#### 3.1.4.1.0 Requirement Id

US-101

#### 3.1.4.2.0 Requirement Description

Send automated notifications for service request status changes.

#### 3.1.4.3.0 Implementation Implications

- Subscribe to 'ServiceRequestStatusChanged' topic on Service Bus
- Map status codes to specific notification templates

#### 3.1.4.4.0 Required Components

- ServiceRequestEventConsumer
- TemplateEngine

#### 3.1.4.5.0 Analysis Reasoning

Core trigger for the majority of system notifications.

## 3.2.0.0.0 Non Functional Requirements

### 3.2.1.0.0 Requirement Type

#### 3.2.1.1.0 Requirement Type

Performance

#### 3.2.1.2.0 Requirement Specification

P95 latency from event trigger to FCM dispatch < 5 seconds.

#### 3.2.1.3.0 Implementation Impact

Requires efficient event processing pipeline and non-blocking I/O.

#### 3.2.1.4.0 Design Constraints

- Use BullMQ or internal queues for throttling if load spikes
- Optimize database writes for notification history (write-behind or async)

#### 3.2.1.5.0 Analysis Reasoning

Real-time user expectation for service updates.

### 3.2.2.0.0 Requirement Type

#### 3.2.2.1.0 Requirement Type

Reliability

#### 3.2.2.2.0 Requirement Specification

Ensure delivery even in case of transient external service failures.

#### 3.2.2.3.0 Implementation Impact

Implement retry policies with exponential backoff for FCM/ACS calls.

#### 3.2.2.4.0 Design Constraints

- Dead Letter Queue (DLQ) configuration on Service Bus
- Resilience patterns (Circuit Breaker) for external APIs

#### 3.2.2.5.0 Analysis Reasoning

Notifications are critical for technician arrival and warranty expiry.

## 3.3.0.0.0 Requirements Analysis Summary

The service must balance real-time dispatch (Push) with reliability (Email) and persistence (History). The architecture must support adding new channels (e.g., WhatsApp) without refactoring the core event consumption logic.

# 4.0.0.0.0 Architecture Analysis

## 4.1.0.0.0 Architectural Patterns

### 4.1.1.0.0 Pattern Name

#### 4.1.1.1.0 Pattern Name

Ports and Adapters (Hexagonal)

#### 4.1.1.2.0 Pattern Application

Isolating notification logic from specific providers (FCM, ACS).

#### 4.1.1.3.0 Required Components

- INotificationChannel (Port)
- FcmAdapter
- EmailAdapter

#### 4.1.1.4.0 Implementation Strategy

Define interfaces in the domain layer; implement adapters in infrastructure modules.

#### 4.1.1.5.0 Analysis Reasoning

Allows switching providers or adding channels without changing business rules.

### 4.1.2.0.0 Pattern Name

#### 4.1.2.1.0 Pattern Name

Event-Driven Architecture

#### 4.1.2.2.0 Pattern Application

Asynchronous consumption of business events to trigger notifications.

#### 4.1.2.3.0 Required Components

- AzureServiceBusModule
- EventDispatcher

#### 4.1.2.4.0 Implementation Strategy

Use NestJS Microservices package with Azure Service Bus transport.

#### 4.1.2.5.0 Analysis Reasoning

Decouples the notification service from upstream domains (Product, Service Request).

### 4.1.3.0.0 Pattern Name

#### 4.1.3.1.0 Pattern Name

Strategy Pattern

#### 4.1.3.2.0 Pattern Application

Selecting the correct notification channels based on event type and user preference.

#### 4.1.3.3.0 Required Components

- NotificationStrategyFactory
- ChannelStrategies

#### 4.1.3.4.0 Implementation Strategy

Factory selects strategies (e.g., 'Urgent' = Push+SMS, 'Info' = Push only) at runtime.

#### 4.1.3.5.0 Analysis Reasoning

Flexible handling of diverse notification types (Alerts vs Reminders).

## 4.2.0.0.0 Integration Points

### 4.2.1.0.0 Integration Type

#### 4.2.1.1.0 Integration Type

Inbound Asynchronous

#### 4.2.1.2.0 Target Components

- Azure Service Bus

#### 4.2.1.3.0 Communication Pattern

Pub/Sub

#### 4.2.1.4.0 Interface Requirements

- CloudEvents standard
- Typed DTOs for event payloads

#### 4.2.1.5.0 Analysis Reasoning

Standard mechanism for receiving triggers from other microservices.

### 4.2.2.0.0 Integration Type

#### 4.2.2.1.0 Integration Type

Outbound API

#### 4.2.2.2.0 Target Components

- Firebase Cloud Messaging

#### 4.2.2.3.0 Communication Pattern

Request/Response (Async)

#### 4.2.2.4.0 Interface Requirements

- OAuth2 Authentication
- Batch sending capability

#### 4.2.2.5.0 Analysis Reasoning

Required for mobile push notifications.

## 4.3.0.0.0 Layering Strategy

| Property | Value |
|----------|-------|
| Layer Organization | NestJS Modular Monolith structure within the micro... |
| Component Placement | Event Listeners in Controller/Interface layer; Cha... |
| Analysis Reasoning | Adheres to Clean Architecture principles supported... |

# 5.0.0.0.0 Database Analysis

## 5.1.0.0.0 Entity Mappings

### 5.1.1.0.0 Entity Name

#### 5.1.1.1.0 Entity Name

NotificationLog

#### 5.1.1.2.0 Database Table

notification_logs

#### 5.1.1.3.0 Required Properties

- id (UUID)
- userId (Indexed)
- title
- body
- type
- readStatus
- metadata (JSONB)
- createdAt

#### 5.1.1.4.0 Relationship Mappings

- None (Self-contained for high write throughput)

#### 5.1.1.5.0 Access Patterns

- Write-heavy (Append only)
- Read by UserID + Pagination (Desc Date)

#### 5.1.1.6.0 Analysis Reasoning

Supports US-073 (Notification History) and audit requirements.

### 5.1.2.0.0 Entity Name

#### 5.1.2.1.0 Entity Name

NotificationTemplate

#### 5.1.2.2.0 Database Table

notification_templates

#### 5.1.2.3.0 Required Properties

- templateKey (PK)
- channel
- contentPattern
- language

#### 5.1.2.4.0 Relationship Mappings

*No items available*

#### 5.1.2.5.0 Access Patterns

- Read-heavy (Cached)

#### 5.1.2.6.0 Analysis Reasoning

Allows dynamic content management without code deploys.

## 5.2.0.0.0 Data Access Requirements

### 5.2.1.0.0 Operation Type

#### 5.2.1.1.0 Operation Type

```sql
INSERT
```

#### 5.2.1.2.0 Required Methods

- createLog

#### 5.2.1.3.0 Performance Constraints

Must not block notification dispatch.

#### 5.2.1.4.0 Analysis Reasoning

Logging is secondary to dispatch; create asynchronously.

### 5.2.2.0.0 Operation Type

#### 5.2.2.1.0 Operation Type

```sql
SELECT
```

#### 5.2.2.2.0 Required Methods

- findByUser
- markAsRead

#### 5.2.2.3.0 Performance Constraints

< 200ms query time for history list.

#### 5.2.2.4.0 Analysis Reasoning

Direct user-facing feature (Notification Center).

## 5.3.0.0.0 Persistence Strategy

| Property | Value |
|----------|-------|
| Orm Configuration | TypeORM with Repository Pattern. |
| Migration Requirements | Standard migration scripts for creating tables and... |
| Analysis Reasoning | Consistent with platform stack; robust for relatio... |

# 6.0.0.0.0 Sequence Analysis

## 6.1.0.0.0 Interaction Patterns

- {'sequence_name': 'ProcessIncomingEvent', 'repository_role': 'Consumer & Dispatcher', 'required_interfaces': ['IMessagingConsumer', 'INotificationService'], 'method_specifications': [{'method_name': 'handleUserEvent', 'interaction_context': 'On Service Bus Message', 'parameter_analysis': 'Event Payload (Type, UserId, Data)', 'return_type_analysis': 'void (Ack/Nack)', 'analysis_reasoning': 'Entry point for the notification flow.'}, {'method_name': 'dispatch', 'interaction_context': 'Inside NotificationService', 'parameter_analysis': 'NotificationContext', 'return_type_analysis': 'Promise<Result>', 'analysis_reasoning': 'Orchestrates preference check, template rendering, and channel sending.'}], 'analysis_reasoning': 'Ensures reliable processing pipeline.'}

## 6.2.0.0.0 Communication Protocols

- {'protocol_type': 'AMQP / SBMP', 'implementation_requirements': 'Azure Service Bus Client via NestJS Microservices.', 'analysis_reasoning': 'Reliable, durable messaging protocol.'}

# 7.0.0.0.0 Critical Analysis Findings

## 7.1.0.0.0 Finding Category

### 7.1.1.0.0 Finding Category

Architectural Risk

### 7.1.2.0.0 Finding Description

User Preferences lookup could become a bottleneck if fetched synchronously from User Service for every event.

### 7.1.3.0.0 Implementation Impact

High latency per notification.

### 7.1.4.0.0 Priority Level

High

### 7.1.5.0.0 Analysis Reasoning

Must implement Redis caching for preferences or require upstream services to enrich event payloads with preference data.

## 7.2.0.0.0 Finding Category

### 7.2.1.0.0 Finding Category

Data Integrity

### 7.2.2.0.0 Finding Description

FCM Token management logic is critical; tokens expire and must be refreshed.

### 7.2.3.0.0 Implementation Impact

Failed deliveries.

### 7.2.4.0.0 Priority Level

Medium

### 7.2.5.0.0 Analysis Reasoning

Need a mechanism to prune invalid tokens based on FCM responses.

## 7.3.0.0.0 Finding Category

### 7.3.1.0.0 Finding Category

Feature Completeness

### 7.3.2.0.0 Finding Description

US-073 requires a read API ('GET /notifications') which transforms this from a worker to a web service.

### 7.3.3.0.0 Implementation Impact

Service must expose HTTP endpoints, not just consume events.

### 7.3.4.0.0 Priority Level

High

### 7.3.5.0.0 Analysis Reasoning

Dual responsibility (Worker + API) requires careful module structure.

# 8.0.0.0.0 Analysis Traceability

## 8.1.0.0.0 Cached Context Utilization

Utilized requirements (US-101, US-126, US-073), architecture (Microservices), and tech stack (NestJS, Azure) to define the service boundaries.

## 8.2.0.0.0 Analysis Decision Trail

- Identified need for persistence due to US-073 (History).
- Identified need for Redis due to preference checking performance risk.
- Selected Ports & Adapters to handle multiple channels (FCM, ACS).

## 8.3.0.0.0 Assumption Validations

- Assumed FCM is the sole push provider as per REQ-INTG-001.
- Assumed Azure Service Bus is the event transport.

## 8.4.0.0.0 Cross Reference Checks

- Validated against 'Notification Service' component in architecture JSON.
- Checked dependencies against 'User Service' for preferences.

