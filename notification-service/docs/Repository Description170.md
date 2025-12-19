# 1 Id

REPO-BS-006

# 2 Name

notification-service

# 3 Description

A decoupled, event-driven service responsible for handling all user-facing notifications. Extracted from `warranty-hub-backend`, this service subscribes to business events (like 'ServiceRequestStatusChanged' or 'WarrantyExpiring') from other services via Azure Service Bus. Upon receiving an event, it determines the user's preferences and dispatches the notification through the appropriate channel, such as Firebase Cloud Messaging (FCM) for push notifications (REQ-INTG-001) or Azure Communication Services for emails/SMS. This separation creates a highly extensible and resilient notification system. New event types or new notification channels can be added with zero changes to the core business logic services.

# 4 Type

🔹 Infrastructure

# 5 Namespace

WarrantyHub.Services.Notification

# 6 Output Path

services/notification

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, Azure Service Bus, Firebase Admin SDK

# 10 Thirdparty Libraries

- firebase-admin
- @azure/service-bus

# 11 Layer Ids

- service-layer

# 12 Dependencies

- REPO-CL-010
- REPO-SL-011

# 13 Requirements

- {'requirementId': '6.1 Reminders & Alerts'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Microservice

# 17 Architecture Map

- notification-service-006

# 18 Components Map

- notification-service-006

# 19 Requirements Map

- REQ-INTG-001

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-BK-001

## 20.3 Decomposition Reasoning

Decouples the logic of sending notifications from the business logic that triggers them. This follows the Single Responsibility Principle. The core services should not know or care *how* a notification is sent. This also isolates third-party dependencies (FCM, Azure Communication Services), making them easier to manage, update, or replace.

## 20.4 Extracted Responsibilities

- Subscribing to domain events
- Formatting notification content
- Integrating with FCM for push notifications
- Integrating with email/SMS providers

## 20.5 Reusability Scope

- This service is a reusable platform capability for any other service that needs to send notifications.

## 20.6 Development Benefits

- Adding a new notification (e.g., for a new event) only requires changes in this service.
- Business logic services are simplified and have fewer external dependencies.

# 21.0 Dependency Contracts

*No data available*

# 22.0 Exposed Contracts

## 22.1 Public Interfaces

- {'interface': 'INotificationApi', 'methods': ['POST /notifications/register-device(DeviceRegistrationDto) : void'], 'events': [], 'properties': [], 'consumers': ['REPO-FE-003']}

# 23.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Standard NestJS DI. |
| Event Communication | Primary consumer of events from Azure Service Bus. |
| Data Flow | Event Bus -> Notification Service -> External Prov... |
| Error Handling | Implements retry logic for sending notifications. ... |
| Async Patterns | Entirely asynchronous and event-driven. |

# 24.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Implement as a NestJS application that listens to ... |
| Performance Considerations | Can be scaled horizontally based on the volume of ... |
| Security Considerations | Securely store API keys for FCM and other provider... |
| Testing Approach | Integration tests should use a mock event bus and ... |

# 25.0 Scope Boundaries

## 25.1 Must Implement

- Listening for events and sending notifications via configured channels.

## 25.2 Must Not Implement

- Any core business logic; it should not decide *when* a notification should be sent, only *how*.

## 25.3 Extension Points

- Adding new channels (e.g., Slack, WhatsApp).
- Implementing user-configurable notification preferences.

## 25.4 Validation Rules

- Validate device tokens before attempting to send a push notification.

