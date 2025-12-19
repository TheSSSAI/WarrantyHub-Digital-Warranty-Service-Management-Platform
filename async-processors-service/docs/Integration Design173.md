# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BW-009 |
| Extraction Timestamp | 2025-05-22T16:30:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-DATA-001

#### 1.2.1.2 Requirement Text

The system shall process uploaded invoice images and PDFs using an Optical Character Recognition (OCR) service to automatically extract and suggest values for the Product Name, Brand, Purchase Date, and Serial Number fields.

#### 1.2.1.3 Validation Criteria

- Verify that after an invoice is uploaded, the system attempts OCR processing.
- Verify that extracted data is sent back to the Product Service.
- Verify resilience against OCR service failures (Circuit Breaker).

#### 1.2.1.4 Implementation Implications

- Implement 'InvoiceUploadedForProcessing' event consumer.
- Integrate Azure AI Document Intelligence SDK.
- Implement callback mechanism to Product Service API.

#### 1.2.1.5 Extraction Reasoning

This repository hosts the background worker dedicated to performing this asynchronous, resource-intensive task.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-BR-002

#### 1.2.2.2 Requirement Text

The system must automatically expire a pending product ownership transfer request if the recipient does not accept or reject it within 72 hours of initiation.

#### 1.2.2.3 Validation Criteria

- Verify cron job triggers at defined intervals.
- Verify the job invokes the expiration logic in the Product Service.

#### 1.2.2.4 Implementation Implications

- Configure NestJS Schedule module for cron execution.
- Implement secure internal API client to trigger 'expire-pending' endpoint on Product Service.

#### 1.2.2.5 Extraction Reasoning

This repository hosts the scheduler component responsible for triggering temporal business rules.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

OcrWorkerService

#### 1.3.1.2 Component Specification

Event-driven consumer that orchestrates the OCR workflow: Event Receipt -> File Download -> AI Analysis -> Result Callback.

#### 1.3.1.3 Implementation Requirements

- Idempotent message handling using Message ID.
- Secure storage access using Managed Identity.
- Circuit Breaker wrapping external AI calls.

#### 1.3.1.4 Architectural Context

Async Worker Layer / Event Consumer

#### 1.3.1.5 Extraction Reasoning

Core component for REQ-DATA-001.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

TransferExpiryScheduler

#### 1.3.2.2 Component Specification

Time-based trigger service that initiates the domain logic for expiring stale transfer requests.

#### 1.3.2.3 Implementation Requirements

- Cron expression configuration via environment variables.
- Distributed lock mechanism (optional but recommended) to prevent duplicate runs in scaled environments.

#### 1.3.2.4 Architectural Context

Async Worker Layer / Scheduler

#### 1.3.2.5 Extraction Reasoning

Core component for REQ-BR-002.

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Worker Layer', 'layer_responsibilities': 'Asynchronous task processing, external service integration (AI), scheduled job triggering.', 'layer_constraints': ['No direct database access (must go through Domain Service APIs).', 'Stateless execution to support auto-scaling.', "Must handle 'at-least-once' message delivery."], 'implementation_patterns': ['Competing Consumers', 'Circuit Breaker', 'Retry Pattern'], 'extraction_reasoning': 'Standard pattern for isolating heavy/background processing from user-facing APIs.'}

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IProductInternalApi

#### 1.5.1.2 Source Repository

product-service

#### 1.5.1.3 Method Contracts

##### 1.5.1.3.1 Method Name

###### 1.5.1.3.1.1 Method Name

updateOcrResult

###### 1.5.1.3.1.2 Method Signature

POST /internal/v1/invoices/{invoiceId}/ocr-result (Body: ExtractedDataDto)

###### 1.5.1.3.1.3 Method Purpose

Updates the invoice record in the Product Service with data extracted by the OCR worker.

###### 1.5.1.3.1.4 Integration Context

Called after successful Document Intelligence analysis.

##### 1.5.1.3.2.0 Method Name

###### 1.5.1.3.2.1 Method Name

processExpiredTransfers

###### 1.5.1.3.2.2 Method Signature

POST /internal/v1/transfers/process-expired

###### 1.5.1.3.2.3 Method Purpose

Triggers the domain logic to identify and expire stale transfers.

###### 1.5.1.3.2.4 Integration Context

Called by the scheduled cron job.

#### 1.5.1.4.0.0 Integration Pattern

Synchronous HTTP (Internal Network)

#### 1.5.1.5.0.0 Communication Protocol

REST / JSON

#### 1.5.1.6.0.0 Extraction Reasoning

The worker delegates domain state mutations back to the owning service.

### 1.5.2.0.0.0 Interface Name

#### 1.5.2.1.0.0 Interface Name

IMessagingBus

#### 1.5.2.2.0.0 Source Repository

warranty-hub-infrastructure

#### 1.5.2.3.0.0 Method Contracts

- {'method_name': 'subscribe', 'method_signature': "subscribe(topic: 'invoice-events', subscription: 'ocr-worker', handler: Function)", 'method_purpose': 'Listens for invoice upload events to trigger processing.', 'integration_context': 'Application startup.'}

#### 1.5.2.4.0.0 Integration Pattern

Pub/Sub

#### 1.5.2.5.0.0 Communication Protocol

AMQP (Azure Service Bus)

#### 1.5.2.6.0.0 Extraction Reasoning

Primary input channel for the OCR workflow.

### 1.5.3.0.0.0 Interface Name

#### 1.5.3.1.0.0 Interface Name

IDocumentIntelligence

#### 1.5.3.2.0.0 Source Repository

Azure AI

#### 1.5.3.3.0.0 Method Contracts

- {'method_name': 'analyzeDocument', 'method_signature': "beginAnalyzeDocument(modelId: 'prebuilt-invoice', document: Stream)", 'method_purpose': 'Performs the actual OCR analysis.', 'integration_context': 'Within OcrWorkerService process loop.'}

#### 1.5.3.4.0.0 Integration Pattern

External SDK

#### 1.5.3.5.0.0 Communication Protocol

HTTPS

#### 1.5.3.6.0.0 Extraction Reasoning

Critical 3rd party dependency.

## 1.6.0.0.0.0 Exposed Interfaces

- {'interface_name': 'Worker Health API', 'consumer_repositories': ['Kubernetes Cluster'], 'method_contracts': [{'method_name': 'getHealth', 'method_signature': 'GET /health', 'method_purpose': 'Liveness and readiness probe for the container orchestrator.', 'implementation_requirements': 'Must check connectivity to Service Bus and Product Service.'}], 'service_level_requirements': ['Response within 200ms'], 'implementation_constraints': ['No authentication required for kubelet (internal only)'], 'extraction_reasoning': 'Standard operational requirement for k8s deployments.'}

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

NestJS v10.3.x, Node.js

### 1.7.2.0.0.0 Integration Technologies

- Azure Service Bus SDK
- Azure AI Form Recognizer SDK
- Axios (HTTP Client)

### 1.7.3.0.0.0 Performance Constraints

OCR processing latency is dependent on Azure AI; Worker must handle backpressure via Service Bus prefetch counts. Scheduler must guarantee execution within defined windows.

### 1.7.4.0.0.0 Security Requirements

Service-to-Service authentication (e.g., Client Credentials flow or mTLS) for calling Product Service. Managed Identity for accessing Azure resources.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | All functional requirements (OCR, Expiry) mapped t... |
| Cross Reference Validation | Validated against Product Service inputs (Sequence... |
| Implementation Readiness Assessment | High. Clear separation of concerns and interface d... |
| Quality Assurance Confirmation | Resilience patterns (Circuit Breaker) explicitly i... |

