# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-006 |
| Extraction Timestamp | 2025-01-27T10:45:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-INTG-001

#### 1.2.1.2 Requirement Text

The system shall integrate with the Firebase Cloud Messaging (FCM) service to send push notifications to Android and iOS mobile clients.

#### 1.2.1.3 Validation Criteria

- Verify push notifications are sent/received upon service request status changes.
- Verify system handles FCM tokens for device registration and unregistration.
- Verify successful delivery to both iOS (APNs bridge) and Android.

#### 1.2.1.4 Implementation Implications

- Implement `FcmProvider` adapter wrapping `firebase-admin` SDK.
- Expose REST endpoints for mobile clients to register/unregister device tokens.
- Handle invalid token responses from FCM by removing them from the database.

#### 1.2.1.5 Extraction Reasoning

Core technical requirement defining the primary output channel for mobile alerts.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

US-090

#### 1.2.2.2 Requirement Text

User: Manage my notification preferences.

#### 1.2.2.3 Validation Criteria

- Verify notification is NOT sent if user preference is disabled for that channel/type.

#### 1.2.2.4 Implementation Implications

- Implement `NotificationPreferenceService` to query user settings before dispatching.
- Cache preferences in Redis to minimize latency during high-volume event processing.

#### 1.2.2.5 Extraction Reasoning

Critical business rule that acts as a gatekeeper logic within the notification flow.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

US-073

#### 1.2.3.2 Requirement Text

View notification history in an In-App Notification Center.

#### 1.2.3.3 Validation Criteria

- Verify that sent notifications are persisted to the database.
- Verify API returns paginated history of notifications for the user.

#### 1.2.3.4 Implementation Implications

- Implement `NotificationHistoryEntity` and repository.
- Expose `GET /api/v1/notifications` endpoint.

#### 1.2.3.5 Extraction Reasoning

Transforms the service from a simple fire-and-forget worker into a stateful service with persistence responsibilities.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

US-101

#### 1.2.4.2 Requirement Text

Send automated notifications for service request status changes.

#### 1.2.4.3 Validation Criteria

- Verify Service Bus events trigger the correct notification template.

#### 1.2.4.4 Implementation Implications

- Implement `ServiceRequestEventConsumer` to listen to `service-request.status-changed` topic.

#### 1.2.4.5 Extraction Reasoning

Defines the primary trigger mechanism for the service.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

NotificationDispatcher

#### 1.3.1.2 Component Specification

Orchestrates the reception of events, checking of preferences, selection of templates, and delegation to specific channel providers.

#### 1.3.1.3 Implementation Requirements

- Implement Strategy Pattern for channel selection (Push, Email, SMS).
- Integrate with Redis for preference lookup.
- Ensure idempotency based on event IDs.

#### 1.3.1.4 Architectural Context

Domain Service Layer

#### 1.3.1.5 Extraction Reasoning

Central logic unit decoupling event consumption from delivery mechanisms.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

EventConsumers

#### 1.3.2.2 Component Specification

Set of Azure Service Bus listeners handling specific business events (Status Changed, Chat Message, etc.).

#### 1.3.2.3 Implementation Requirements

- Use NestJS Microservices `@EventPattern` decorators.
- Validate incoming payloads against shared contracts (`warranty-hub-contracts`).

#### 1.3.2.4 Architectural Context

Interface Adapters / Messaging

#### 1.3.2.5 Extraction Reasoning

Entry point for asynchronous triggers.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

ChannelAdapters

#### 1.3.3.2 Component Specification

Wrappers for external communication services (FCM, Azure Communication Services).

#### 1.3.3.3 Implementation Requirements

- Implement circuit breakers for external API calls.
- Handle provider-specific error codes (e.g., token expired).

#### 1.3.3.4 Architectural Context

Infrastructure Layer

#### 1.3.3.5 Extraction Reasoning

Ports and Adapters pattern implementation for external dependencies.

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Messaging Layer

#### 1.4.1.2 Layer Responsibilities

Consuming events from Azure Service Bus, deserializing payloads, and acknowledging messages.

#### 1.4.1.3 Layer Constraints

- Must handle dead-lettering for malformed messages.
- Must process messages asynchronously.

#### 1.4.1.4 Implementation Patterns

- Pub/Sub
- Competing Consumers

#### 1.4.1.5 Extraction Reasoning

Service is primarily event-driven.

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Domain Layer

#### 1.4.2.2 Layer Responsibilities

Notification routing logic, template rendering, preference enforcement.

#### 1.4.2.3 Layer Constraints

- Pure business logic, independent of transport.

#### 1.4.2.4 Implementation Patterns

- Strategy Pattern
- Template Method

#### 1.4.2.5 Extraction Reasoning

Core business logic as defined in the repository analysis.

### 1.4.3.0 Layer Name

#### 1.4.3.1 Layer Name

Infrastructure Layer

#### 1.4.3.2 Layer Responsibilities

Persistence of history, communication with FCM/ACS, Redis caching.

#### 1.4.3.3 Layer Constraints

- External API calls must be resilient (retry/circuit breaker).

#### 1.4.3.4 Implementation Patterns

- Repository Pattern
- Adapter Pattern

#### 1.4.3.5 Extraction Reasoning

Handles all I/O and external side effects.

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IServiceBusConsumer

#### 1.5.1.2 Source Repository

Azure Service Bus (Infrastructure)

#### 1.5.1.3 Method Contracts

##### 1.5.1.3.1 Method Name

###### 1.5.1.3.1.1 Method Name

handleServiceRequestStatusChanged

###### 1.5.1.3.1.2 Method Signature

(event: ServiceRequestStatusChangedEvent) => Promise<void>

###### 1.5.1.3.1.3 Method Purpose

Triggers notification workflow when a ticket status updates.

###### 1.5.1.3.1.4 Integration Context

Subscribed to `sb-topic-service-requests`.

##### 1.5.1.3.2.0 Method Name

###### 1.5.1.3.2.1 Method Name

handleChatMessageSent

###### 1.5.1.3.2.2 Method Signature

(event: ChatMessageSentEvent) => Promise<void>

###### 1.5.1.3.2.3 Method Purpose

Triggers push notification for new chat messages.

###### 1.5.1.3.2.4 Integration Context

Subscribed to `sb-topic-chat`.

##### 1.5.1.3.3.0 Method Name

###### 1.5.1.3.3.1 Method Name

handleWarrantyExpiring

###### 1.5.1.3.3.2 Method Signature

(event: WarrantyExpiringEvent) => Promise<void>

###### 1.5.1.3.3.3 Method Purpose

Triggers reminder email/push for warranty expiry.

###### 1.5.1.3.3.4 Integration Context

Subscribed to `sb-topic-products`.

#### 1.5.1.4.0.0 Integration Pattern

Pub/Sub

#### 1.5.1.5.0.0 Communication Protocol

AMQP

#### 1.5.1.6.0.0 Extraction Reasoning

Primary input mechanism for the service.

### 1.5.2.0.0.0 Interface Name

#### 1.5.2.1.0.0 Interface Name

IFirebaseMessaging

#### 1.5.2.2.0.0 Source Repository

External (Google)

#### 1.5.2.3.0.0 Method Contracts

- {'method_name': 'sendMulticast', 'method_signature': '(message: MulticastMessage) => Promise<BatchResponse>', 'method_purpose': 'Sends push notifications to mobile devices.', 'integration_context': 'Called by FcmAdapter.'}

#### 1.5.2.4.0.0 Integration Pattern

HTTP Client

#### 1.5.2.5.0.0 Communication Protocol

REST/HTTP2

#### 1.5.2.6.0.0 Extraction Reasoning

Required for REQ-INTG-001.

### 1.5.3.0.0.0 Interface Name

#### 1.5.3.1.0.0 Interface Name

IAzureCommunicationServices

#### 1.5.3.2.0.0 Source Repository

External (Microsoft)

#### 1.5.3.3.0.0 Method Contracts

- {'method_name': 'sendEmail', 'method_signature': '(message: EmailMessage) => Promise<EmailSendStatus>', 'method_purpose': 'Sends transactional emails.', 'integration_context': 'Called by EmailAdapter.'}

#### 1.5.3.4.0.0 Integration Pattern

HTTP Client

#### 1.5.3.5.0.0 Communication Protocol

REST

#### 1.5.3.6.0.0 Extraction Reasoning

Required for email notifications defined in US-105/US-100.

## 1.6.0.0.0.0 Exposed Interfaces

### 1.6.1.0.0.0 Interface Name

#### 1.6.1.1.0.0 Interface Name

INotificationDeviceApi

#### 1.6.1.2.0.0 Consumer Repositories

- REPO-FE-003

#### 1.6.1.3.0.0 Method Contracts

##### 1.6.1.3.1.0 Method Name

###### 1.6.1.3.1.1 Method Name

registerDevice

###### 1.6.1.3.1.2 Method Signature

POST /api/v1/notifications/devices

###### 1.6.1.3.1.3 Method Purpose

Registers a device FCM token for a user.

###### 1.6.1.3.1.4 Implementation Requirements

Body: { fcmToken: string, platform: 'ios'|'android' }

##### 1.6.1.3.2.0 Method Name

###### 1.6.1.3.2.1 Method Name

unregisterDevice

###### 1.6.1.3.2.2 Method Signature

```sql
DELETE /api/v1/notifications/devices/{token}
```

###### 1.6.1.3.2.3 Method Purpose

Removes a device token on logout.

###### 1.6.1.3.2.4 Implementation Requirements

Idempotent deletion.

#### 1.6.1.4.0.0 Service Level Requirements

- High Availability
- < 200ms latency

#### 1.6.1.5.0.0 Implementation Constraints

- Authenticated via JWT

#### 1.6.1.6.0.0 Extraction Reasoning

Mobile clients need a direct way to register push tokens.

### 1.6.2.0.0.0 Interface Name

#### 1.6.2.1.0.0 Interface Name

INotificationHistoryApi

#### 1.6.2.2.0.0 Consumer Repositories

- REPO-FE-003
- REPO-FE-002

#### 1.6.2.3.0.0 Method Contracts

##### 1.6.2.3.1.0 Method Name

###### 1.6.2.3.1.1 Method Name

getHistory

###### 1.6.2.3.1.2 Method Signature

GET /api/v1/notifications

###### 1.6.2.3.1.3 Method Purpose

Retrieves past notifications for the Notification Center (US-073).

###### 1.6.2.3.1.4 Implementation Requirements

Supports pagination (limit/offset).

##### 1.6.2.3.2.0 Method Name

###### 1.6.2.3.2.1 Method Name

markAsRead

###### 1.6.2.3.2.2 Method Signature

PATCH /api/v1/notifications/{id}/read

###### 1.6.2.3.2.3 Method Purpose

Updates read status of a notification.

###### 1.6.2.3.2.4 Implementation Requirements

Updates `read_at` timestamp.

#### 1.6.2.4.0.0 Service Level Requirements

- < 300ms latency

#### 1.6.2.5.0.0 Implementation Constraints

- Authenticated via JWT
- User can only access own history

#### 1.6.2.6.0.0 Extraction Reasoning

Supports the in-app Notification Center feature.

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

NestJS v10.3.x, Node.js

### 1.7.2.0.0.0 Integration Technologies

- Azure Service Bus (@azure/service-bus)
- Firebase Admin SDK
- Azure Communication Services SDK
- Redis (ioredis)
- TypeORM (PostgreSQL)

### 1.7.3.0.0.0 Performance Constraints

Event processing to dispatch < 5s. History API < 200ms.

### 1.7.4.0.0.0 Security Requirements

Tokens stored encrypted. No PII in logs. RBAC for API endpoints.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | 100% - Mapped inputs (Bus), Outputs (FCM/ACS/DB), ... |
| Cross Reference Validation | Validated against REQ-INTG-001, US-090, US-073, an... |
| Implementation Readiness Assessment | High. Clear separation of concerns and defined con... |
| Quality Assurance Confirmation | The design supports all functional requirements in... |

