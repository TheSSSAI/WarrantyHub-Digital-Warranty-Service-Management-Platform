# 1 Id

REPO-BW-009

# 2 Name

async-processors-service

# 3 Description

A repository for background worker processes that handle long-running, asynchronous tasks. This component was created by extracting non-real-time processing logic from the original `warranty-hub-backend`. It currently houses two primary workers: the OCR Processing Worker, which consumes `InvoiceUploadedForProcessing` events and calls Azure AI Document Intelligence (REQ-DATA-001), and the Scheduled Job Worker, which runs periodically (e.g., as a Kubernetes CronJob) to expire pending ownership transfers (REQ-BR-002). Consolidating these simple, non-API workers into a single repository simplifies deployment and management, while still isolating their resource consumption and dependencies from the main API services.

# 4 Type

🔹 Utility Library

# 5 Namespace

WarrantyHub.Workers.Async

# 6 Output Path

workers/async

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, Azure Service Bus

# 10 Thirdparty Libraries

- @azure/service-bus
- node-cron

# 11 Layer Ids

- service-layer

# 12 Dependencies

- REPO-CL-010
- REPO-SL-011

# 13 Requirements

- {'requirementId': '3.7 Invoice Vault'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Microservice

# 17 Architecture Map

- ocr-worker-009
- scheduler-worker-010

# 18 Components Map

- ocr-worker-009
- scheduler-worker-010

# 19 Requirements Map

- REQ-DATA-001
- REQ-BR-002

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-BK-001

## 20.3 Decomposition Reasoning

Groups simple, non-API background workers together for operational simplicity. It isolates resource-intensive (OCR) and scheduled tasks from the user-facing API services, preventing them from impacting API performance and allowing them to be scaled independently based on queue length or job schedule.

## 20.4 Extracted Responsibilities

- Asynchronous invoice OCR processing
- Scheduled expiration of ownership transfers

## 20.5 Reusability Scope

- This repository can host future background processing jobs as the platform grows.

## 20.6 Development Benefits

- Keeps API service codebases clean and focused on request/reply logic.
- Independent deployment allows for updates to background jobs without restarting API services.

# 21.0 Dependency Contracts

*No data available*

# 22.0 Exposed Contracts

## 22.1 Public Interfaces

*No items available*

# 23.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Standard NestJS DI. |
| Event Communication | Consumes events from Azure Service Bus. |
| Data Flow | Reads messages from a queue, processes them (e.g.,... |
| Error Handling | Uses retries and DLQs for message processing. Logs... |
| Async Patterns | Entirely asynchronous. |

# 24.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Can be deployed as two separate containers from th... |
| Performance Considerations | The OCR worker can be scaled out with HPA based on... |
| Security Considerations | Manage external API keys (for OCR service) securel... |
| Testing Approach | Unit test the logic of each worker. Integration te... |

# 25.0 Scope Boundaries

## 25.1 Must Implement

- OCR processing pipeline
- Scheduled job for transfer expiration

## 25.2 Must Not Implement

- Exposing any public API endpoints.
- Real-time processing.

## 25.3 Extension Points

- Adding new asynchronous workers for tasks like data archival or report generation.

## 25.4 Validation Rules

*No items available*

