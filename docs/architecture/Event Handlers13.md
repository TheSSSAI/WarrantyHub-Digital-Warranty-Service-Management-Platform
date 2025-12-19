# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Architecture Type

Microservices with Asynchronous Background Workers

## 1.3 Technology Stack

- .NET 8
- Azure Service Bus

## 1.4 Bounded Contexts

- Product Management
- Service Request Management
- Notification Management
- User & Identity Management
- Auditing

# 2.0 Project Specific Events

## 2.1 Event Id

### 2.1.1 Event Id

EVT_001

### 2.1.2 Event Name

InvoiceUploadedForProcessing

### 2.1.3 Event Type

command

### 2.1.4 Category

🔹 File Processing

### 2.1.5 Description

A command message sent to a worker to initiate OCR processing for a newly uploaded invoice file. This is required by REQ-DATA-001.

### 2.1.6 Trigger Condition

A user successfully uploads an invoice file via the Product Service.

### 2.1.7 Source Context

Product Management

### 2.1.8 Target Contexts

- Background Worker Service

### 2.1.9 Payload

#### 2.1.9.1 Schema

| Property | Value |
|----------|-------|
| Invoice Id | Guid |
| User Product Id | Guid |
| File Url | string |

#### 2.1.9.2 Required Fields

- invoiceId
- userProductId
- fileUrl

#### 2.1.9.3 Optional Fields

*No items available*

### 2.1.10.0 Frequency

medium

### 2.1.11.0 Business Criticality

normal

### 2.1.12.0 Data Source

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| Table | Invoice |
| Operation | create |

### 2.1.13.0 Routing

| Property | Value |
|----------|-------|
| Routing Key | *N/A* |
| Exchange | *N/A* |
| Queue | ocr-processing-queue |

### 2.1.14.0 Consumers

- {'service': 'OCR Processing Worker', 'handler': 'ProcessInvoice', 'processingType': 'async'}

### 2.1.15.0 Dependencies

- REQ-DATA-001

### 2.1.16.0 Error Handling

| Property | Value |
|----------|-------|
| Retry Strategy | Exponential Backoff |
| Dead Letter Queue | ocr-processing-queue/$deadletterqueue |
| Timeout Ms | 300000 |

## 2.2.0.0 Event Id

### 2.2.1.0 Event Id

EVT_002

### 2.2.2.0 Event Name

ServiceRequestStatusChanged

### 2.2.3.0 Event Type

domain

### 2.2.4.0 Category

🔹 Service Management

### 2.2.5.0 Description

Published when the status of a service request is updated. Used to trigger push notifications to the user as per REQ-INTG-001.

### 2.2.6.0 Trigger Condition

The status field of a ServiceRequest entity is modified.

### 2.2.7.0 Source Context

Service Request Management

### 2.2.8.0 Target Contexts

- Notification Management

### 2.2.9.0 Payload

#### 2.2.9.1 Schema

| Property | Value |
|----------|-------|
| Service Request Id | Guid |
| User Id | Guid |
| Old Status | string |
| New Status | string |

#### 2.2.9.2 Required Fields

- serviceRequestId
- userId
- newStatus

#### 2.2.9.3 Optional Fields

- oldStatus

### 2.2.10.0 Frequency

high

### 2.2.11.0 Business Criticality

important

### 2.2.12.0 Data Source

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| Table | ServiceRequest |
| Operation | update |

### 2.2.13.0 Routing

| Property | Value |
|----------|-------|
| Routing Key | servicerequest.status.changed |
| Exchange | domain-events-topic |
| Queue | *N/A* |

### 2.2.14.0 Consumers

- {'service': 'Notification Service', 'handler': 'SendServiceStatusNotification', 'processingType': 'async'}

### 2.2.15.0 Dependencies

- REQ-INTG-001

### 2.2.16.0 Error Handling

| Property | Value |
|----------|-------|
| Retry Strategy | Exponential Backoff |
| Dead Letter Queue | domain-events-topic/Subscriptions/notifications-su... |
| Timeout Ms | 60000 |

## 2.3.0.0 Event Id

### 2.3.1.0 Event Id

EVT_003

### 2.3.2.0 Event Name

OwnershipTransferExpired

### 2.3.3.0 Event Type

system

### 2.3.4.0 Category

🔹 Workflow Management

### 2.3.5.0 Description

A scheduled message that is delivered after 72 hours to trigger the expiration of a pending ownership transfer, fulfilling REQ-BR-002.

### 2.3.6.0 Trigger Condition

An ownership transfer request is created and a scheduled message is enqueued for 72 hours later.

### 2.3.7.0 Source Context

Product Management

### 2.3.8.0 Target Contexts

- Background Worker Service

### 2.3.9.0 Payload

#### 2.3.9.1 Schema

##### 2.3.9.1.1 Transfer Request Id

Guid

#### 2.3.9.2.0 Required Fields

- transferRequestId

#### 2.3.9.3.0 Optional Fields

*No items available*

### 2.3.10.0.0 Frequency

low

### 2.3.11.0.0 Business Criticality

normal

### 2.3.12.0.0 Data Source

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| Table | OwnershipTransferRequest |
| Operation | create |

### 2.3.13.0.0 Routing

| Property | Value |
|----------|-------|
| Routing Key | *N/A* |
| Exchange | *N/A* |
| Queue | transfer-expiration-queue |

### 2.3.14.0.0 Consumers

- {'service': 'Scheduled Job Worker', 'handler': 'ExpireOwnershipTransfer', 'processingType': 'async'}

### 2.3.15.0.0 Dependencies

- REQ-BR-002

### 2.3.16.0.0 Error Handling

| Property | Value |
|----------|-------|
| Retry Strategy | Fixed Interval |
| Dead Letter Queue | transfer-expiration-queue/$deadletterqueue |
| Timeout Ms | 60000 |

## 2.4.0.0.0 Event Id

### 2.4.1.0.0 Event Id

EVT_004

### 2.4.2.0.0 Event Name

CriticalActionOccurred

### 2.4.3.0.0 Event Type

integration

### 2.4.4.0.0 Category

🔹 Auditing

### 2.4.5.0.0 Description

A generic event published whenever a critical, auditable action occurs, such as a user login or permission change. Required by REQ-AUDIT-001.

### 2.4.6.0.0 Trigger Condition

Any action defined as 'critical' in the business logic is executed.

### 2.4.7.0.0 Source Context

Multiple

### 2.4.8.0.0 Target Contexts

- Auditing

### 2.4.9.0.0 Payload

#### 2.4.9.1.0 Schema

| Property | Value |
|----------|-------|
| User Id | Guid |
| Action Type | string |
| Target Entity | string |
| Target Entity Id | string |
| Change Details | Json |

#### 2.4.9.2.0 Required Fields

- actionType
- targetEntity
- targetEntityId

#### 2.4.9.3.0 Optional Fields

- userId
- changeDetails

### 2.4.10.0.0 Frequency

high

### 2.4.11.0.0 Business Criticality

important

### 2.4.12.0.0 Data Source

| Property | Value |
|----------|-------|
| Database | N/A |
| Table | N/A |
| Operation | N/A |

### 2.4.13.0.0 Routing

| Property | Value |
|----------|-------|
| Routing Key | audit.action.occurred |
| Exchange | system-events-topic |
| Queue | *N/A* |

### 2.4.14.0.0 Consumers

- {'service': 'Background Worker Service', 'handler': 'PersistAuditLog', 'processingType': 'async'}

### 2.4.15.0.0 Dependencies

- REQ-AUDIT-001

### 2.4.16.0.0 Error Handling

| Property | Value |
|----------|-------|
| Retry Strategy | Exponential Backoff |
| Dead Letter Queue | system-events-topic/Subscriptions/auditing-sub/$de... |
| Timeout Ms | 30000 |

# 3.0.0.0.0 Event Types And Schema Design

## 3.1.0.0.0 Essential Event Types

### 3.1.1.0.0 Event Name

#### 3.1.1.1.0 Event Name

InvoiceUploadedForProcessing

#### 3.1.1.2.0 Category

🔹 command

#### 3.1.1.3.0 Description

Triggers the OCR background job.

#### 3.1.1.4.0 Priority

🟡 medium

### 3.1.2.0.0 Event Name

#### 3.1.2.1.0 Event Name

ServiceRequestStatusChanged

#### 3.1.2.2.0 Category

🔹 domain

#### 3.1.2.3.0 Description

Notifies consumers of service status changes for push notifications.

#### 3.1.2.4.0 Priority

🔴 high

### 3.1.3.0.0 Event Name

#### 3.1.3.1.0 Event Name

OwnershipTransferExpired

#### 3.1.3.2.0 Category

🔹 system

#### 3.1.3.3.0 Description

Triggers the expiration logic for pending transfers.

#### 3.1.3.4.0 Priority

🟡 medium

### 3.1.4.0.0 Event Name

#### 3.1.4.1.0 Event Name

CriticalActionOccurred

#### 3.1.4.2.0 Category

🔹 integration

#### 3.1.4.3.0 Description

Decouples business services from the audit logging implementation.

#### 3.1.4.4.0 Priority

🔴 high

## 3.2.0.0.0 Schema Design

| Property | Value |
|----------|-------|
| Format | JSON |
| Reasoning | JSON is human-readable, widely supported across pl... |
| Consistency Approach | All events will share a common envelope containing... |

## 3.3.0.0.0 Schema Evolution

| Property | Value |
|----------|-------|
| Backward Compatibility | ✅ |
| Forward Compatibility | ❌ |
| Strategy | Additive changes only. New optional fields can be ... |

## 3.4.0.0.0 Event Structure

### 3.4.1.0.0 Standard Fields

- eventId
- eventTimestamp
- eventType
- eventVersion
- correlationId

### 3.4.2.0.0 Metadata Requirements

- A correlationId must be propagated from the initial API request through all subsequent events to enable distributed tracing.

# 4.0.0.0.0 Event Routing And Processing

## 4.1.0.0.0 Routing Mechanisms

### 4.1.1.0.0 Queue (Azure Service Bus)

#### 4.1.1.1.0 Type

🔹 Queue (Azure Service Bus)

#### 4.1.1.2.0 Description

Point-to-point delivery for command-style messages where only one consumer should process the message.

#### 4.1.1.3.0 Use Case

Sending an invoice to the OCR worker (REQ-DATA-001).

### 4.1.2.0.0 Topic/Subscription (Azure Service Bus)

#### 4.1.2.1.0 Type

🔹 Topic/Subscription (Azure Service Bus)

#### 4.1.2.2.0 Description

Publish/subscribe mechanism for domain and integration events, allowing multiple independent services to react to the same event.

#### 4.1.2.3.0 Use Case

Broadcasting a 'ServiceRequestStatusChanged' event to the Notification Service and potentially other future subscribers.

## 4.2.0.0.0 Processing Patterns

- {'pattern': 'sequential', 'applicableScenarios': ['All identified use cases'], 'implementation': 'Each consumer service will process messages from its queue or subscription one by one. Concurrency can be scaled by adding more instances of the consumer service.'}

## 4.3.0.0.0 Filtering And Subscription

### 4.3.1.0.0 Filtering Mechanism

Azure Service Bus subscription rules based on message properties (e.g., eventType).

### 4.3.2.0.0 Subscription Model

Each consumer service will have its own subscription to a topic, with filters to receive only the events it is interested in.

### 4.3.3.0.0 Routing Keys

- servicerequest.status.changed
- audit.action.occurred

## 4.4.0.0.0 Handler Isolation

| Property | Value |
|----------|-------|
| Required | ✅ |
| Approach | Microservice architecture provides process-level i... |
| Reasoning | Prevents a failure in one event handler from impac... |

## 4.5.0.0.0 Delivery Guarantees

| Property | Value |
|----------|-------|
| Level | at-least-once |
| Justification | This is the default for Azure Service Bus Standard... |
| Implementation | Consumers must be designed to be idempotent. For e... |

# 5.0.0.0.0 Event Storage And Replay

## 5.1.0.0.0 Persistence Requirements

| Property | Value |
|----------|-------|
| Required | ❌ |
| Duration | N/A |
| Reasoning | The system does not have a requirement for replayi... |

## 5.2.0.0.0 Event Sourcing

### 5.2.1.0.0 Necessary

❌ No

### 5.2.2.0.0 Justification

Event sourcing would introduce significant complexity without addressing any of the current requirements. The system's state is effectively managed via traditional CRUD operations on a relational database.

### 5.2.3.0.0 Scope

*No items available*

## 5.3.0.0.0 Technology Options

*No items available*

## 5.4.0.0.0 Replay Capabilities

### 5.4.1.0.0 Required

❌ No

### 5.4.2.0.0 Scenarios

*No items available*

### 5.4.3.0.0 Implementation

Not applicable. Dead-lettered messages can be manually resubmitted for reprocessing individual failures, but bulk replay is not required.

## 5.5.0.0.0 Retention Policy

| Property | Value |
|----------|-------|
| Strategy | No long-term retention of events is required. |
| Duration | Events are deleted from the broker immediately aft... |
| Archiving Approach | Not applicable. |

# 6.0.0.0.0 Dead Letter Queue And Error Handling

## 6.1.0.0.0 Dead Letter Strategy

| Property | Value |
|----------|-------|
| Approach | Utilize the built-in Dead Letter Queue (DLQ) featu... |
| Queue Configuration | MaxDeliveryCount will be set to a reasonable numbe... |
| Processing Logic | A separate monitoring process or an Azure Function... |

## 6.2.0.0.0 Retry Policies

- {'errorType': 'Transient errors (e.g., network issues, temporary database unavailability)', 'maxRetries': 5, 'backoffStrategy': 'exponential', 'delayConfiguration': 'Default broker configuration (e.g., starts with 1 second, doubles with each retry).'}

## 6.3.0.0.0 Poison Message Handling

| Property | Value |
|----------|-------|
| Detection Mechanism | The 'MaxDeliveryCount' threshold on the Azure Serv... |
| Handling Strategy | Automatic transfer to the DLQ for offline analysis... |
| Alerting Required | ✅ |

## 6.4.0.0.0 Error Notification

### 6.4.1.0.0 Channels

- Azure Monitor Alerts
- Email

### 6.4.2.0.0 Severity

critical

### 6.4.3.0.0 Recipients

- On-call DevOps Team

## 6.5.0.0.0 Recovery Procedures

- {'scenario': 'A message is in the DLQ due to a bug in the consumer code.', 'procedure': '1. Analyze the message and error details. 2. Fix the bug in the consumer service. 3. Deploy the fix. 4. Manually move the message from the DLQ back to the main queue for reprocessing.', 'automationLevel': 'semi-automated'}

# 7.0.0.0.0 Event Versioning Strategy

## 7.1.0.0.0 Schema Evolution Approach

| Property | Value |
|----------|-------|
| Strategy | Lenient consumers that ignore unknown properties. ... |
| Versioning Scheme | Semantic versioning (e.g., 1.0.0) applied to the e... |
| Migration Strategy | No forced migration. New versions are introduced, ... |

## 7.2.0.0.0 Compatibility Requirements

| Property | Value |
|----------|-------|
| Backward Compatible | ✅ |
| Forward Compatible | ❌ |
| Reasoning | Ensuring backward compatibility is critical to all... |

## 7.3.0.0.0 Version Identification

| Property | Value |
|----------|-------|
| Mechanism | A dedicated version field in the event payload or ... |
| Location | payload |
| Format | eventVersion: \"1.0\" |

## 7.4.0.0.0 Consumer Upgrade Strategy

| Property | Value |
|----------|-------|
| Approach | Consumers are updated to handle the new event vers... |
| Rollout Strategy | Standard rolling deployment for consumer services. |
| Rollback Procedure | Standard rollback of the consumer deployment if is... |

## 7.5.0.0.0 Schema Registry

| Property | Value |
|----------|-------|
| Required | ❌ |
| Technology | N/A |
| Governance | For the current scope, a schema registry is an unn... |

# 8.0.0.0.0 Event Monitoring And Observability

## 8.1.0.0.0 Monitoring Capabilities

- {'capability': 'Queue/Subscription Metrics Monitoring', 'justification': 'Essential for understanding system health and identifying bottlenecks.', 'implementation': 'Azure Monitor for Azure Service Bus metrics (e.g., Active Messages, Dead-Lettered Messages, Incoming/Outgoing Requests).'}

## 8.2.0.0.0 Tracing And Correlation

| Property | Value |
|----------|-------|
| Tracing Required | ✅ |
| Correlation Strategy | Pass a single `correlationId` from the initial API... |
| Trace Id Propagation | A custom header (`X-Correlation-ID`) for HTTP requ... |

## 8.3.0.0.0 Performance Metrics

### 8.3.1.0.0 Metric

#### 8.3.1.1.0 Metric

End-to-end event processing latency

#### 8.3.1.2.0 Threshold

< 5 seconds for P99

#### 8.3.1.3.0 Alerting

✅ Yes

### 8.3.2.0.0 Metric

#### 8.3.2.1.0 Metric

DLQ message count

#### 8.3.2.2.0 Threshold

> 0

#### 8.3.2.3.0 Alerting

✅ Yes

## 8.4.0.0.0 Event Flow Visualization

| Property | Value |
|----------|-------|
| Required | ❌ |
| Tooling | N/A |
| Scope | While nice to have, direct visualization is not es... |

## 8.5.0.0.0 Alerting Requirements

### 8.5.1.0.0 Condition

#### 8.5.1.1.0 Condition

Messages in any Dead Letter Queue > 0 for 5 minutes

#### 8.5.1.2.0 Severity

critical

#### 8.5.1.3.0 Response Time

Acknowledge within 15 minutes

#### 8.5.1.4.0 Escalation Path

- On-call DevOps Engineer

### 8.5.2.0.0 Condition

#### 8.5.2.1.0 Condition

Active message count in any queue > 1000 for 10 minutes

#### 8.5.2.2.0 Severity

warning

#### 8.5.2.3.0 Response Time

Acknowledge within 1 hour

#### 8.5.2.4.0 Escalation Path

- DevOps Team

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

Azure Service Bus Provisioning and Configuration

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

*No items available*

### 9.1.4.0.0 Estimated Effort

Low

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

OCR Worker Implementation (EVT_001)

### 9.2.2.0.0 Priority

🔴 high

### 9.2.3.0.0 Dependencies

- Azure Service Bus Provisioning and Configuration

### 9.2.4.0.0 Estimated Effort

Medium

## 9.3.0.0.0 Component

### 9.3.1.0.0 Component

Notification Handler Implementation (EVT_002)

### 9.3.2.0.0 Priority

🔴 high

### 9.3.3.0.0 Dependencies

- Azure Service Bus Provisioning and Configuration

### 9.3.4.0.0 Estimated Effort

Medium

## 9.4.0.0.0 Component

### 9.4.1.0.0 Component

DLQ Monitoring and Alerting Setup

### 9.4.2.0.0 Priority

🟡 medium

### 9.4.3.0.0 Dependencies

- Azure Service Bus Provisioning and Configuration

### 9.4.4.0.0 Estimated Effort

Low

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

Event handlers are not idempotent, leading to duplicate processing on retries.

### 10.1.2.0.0 Impact

medium

### 10.1.3.0.0 Probability

medium

### 10.1.4.0.0 Mitigation

Enforce strict code reviews and testing for idempotency in all message handlers. Use database constraints and status checks to prevent duplicate operations.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

Lack of correlation ID propagation makes debugging distributed workflows difficult.

### 10.2.2.0.0 Impact

medium

### 10.2.3.0.0 Probability

high

### 10.2.4.0.0 Mitigation

Implement a standard middleware/library in all services to ensure the `correlationId` is consistently passed and logged.

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Implementation

### 11.1.2.0.0 Recommendation

Leverage the native Azure Service Bus SDKs for .NET to simplify integration and utilize built-in features like retries and DLQ handling.

### 11.1.3.0.0 Justification

Reduces development effort and relies on a well-supported, robust client library.

### 11.1.4.0.0 Priority

🔴 high

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Design

### 11.2.2.0.0 Recommendation

Keep event payloads minimal and focused on the event's context. Avoid including large, unnecessary data.

### 11.2.3.0.0 Justification

Improves performance, reduces messaging costs, and simplifies consumer logic. Consumers can call back to an API for more details if needed (Claim-Check Pattern).

### 11.2.4.0.0 Priority

🔴 high

## 11.3.0.0.0 Category

### 11.3.1.0.0 Category

🔹 Evolution

### 11.3.2.0.0 Recommendation

Defer implementation of a Schema Registry until the number of event types or consuming teams grows significantly.

### 11.3.3.0.0 Justification

Avoids premature optimization and unnecessary infrastructure overhead for the current scope of the project.

### 11.3.4.0.0 Priority

🟡 medium

