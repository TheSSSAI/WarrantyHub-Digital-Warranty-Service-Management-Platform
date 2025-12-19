# 1 Id

REPO-BW-008

# 2 Name

audit-service

# 3 Description

A simple, event-driven background service with the single responsibility of creating an immutable audit trail for all critical platform actions (REQ-AUDIT-001). Decomposed from the `warranty-hub-backend`, this service subscribes to a dedicated 'CriticalActionOccurred' event on the message bus. When it receives an event, it persists the payload into a secure, long-term `AuditLog` table. This complete decoupling ensures that auditing can be added to any action across the system just by publishing an event, without the source service needing any knowledge of the auditing implementation. It also guarantees that the performance of writing audit logs never impacts the performance of the primary user-facing transaction.

# 4 Type

🔹 Utility Library

# 5 Namespace

WarrantyHub.Workers.Audit

# 6 Output Path

workers/audit

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, Azure Service Bus, PostgreSQL

# 10 Thirdparty Libraries

- pg
- @azure/service-bus

# 11 Layer Ids

- service-layer

# 12 Dependencies

- REPO-CL-010
- REPO-SL-011

# 13 Requirements

- {'requirementId': '5.9 Auditability'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Microservice

# 17 Architecture Map

- audit-service-011

# 18 Components Map

- audit-service-011

# 19 Requirements Map

- REQ-AUDIT-001

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-BK-001

## 20.3 Decomposition Reasoning

Separates the cross-cutting concern of auditing into a dedicated, decoupled consumer. This is a classic event-driven pattern that improves the resilience and maintainability of the system. Business services are not burdened with the implementation details of logging audit trails.

## 20.4 Extracted Responsibilities

- Subscribing to audit events
- Persisting audit logs to the database

## 20.5 Reusability Scope

- Provides a single sink for all audit events across the entire platform, now and in the future.

## 20.6 Development Benefits

- Simplifies business logic in other services.
- Allows the auditing schema and storage to be changed without affecting any other service.

# 21.0 Dependency Contracts

*No data available*

# 22.0 Exposed Contracts

## 22.1 Public Interfaces

*No items available*

# 23.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Standard NestJS DI. |
| Event Communication | Subscribes to an 'audit-events' topic on Azure Ser... |
| Data Flow | Receives event message and writes a record to the ... |
| Error Handling | Failed writes are retried. Persistent failures mov... |
| Async Patterns | Fully asynchronous worker. |

# 24.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Implement as a lightweight NestJS worker applicati... |
| Performance Considerations | Ensure efficient bulk inserts if audit event volum... |
| Security Considerations | The AuditLog table should be protected with restri... |
| Testing Approach | Test that the worker correctly deserializes events... |

# 25.0 Scope Boundaries

## 25.1 Must Implement

- Persisting audit event data.

## 25.2 Must Not Implement

- Deciding what constitutes an auditable event (this is the responsibility of the event publishers).

## 25.3 Extension Points

- Forwarding audit logs to an external security information and event management (SIEM) system.

## 25.4 Validation Rules

- Validate the schema of incoming audit events.

