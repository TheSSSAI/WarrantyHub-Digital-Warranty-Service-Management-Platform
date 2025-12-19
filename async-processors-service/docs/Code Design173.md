# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BW-009 |
| Validation Timestamp | 2025-05-22T15:00:00Z |
| Original Component Count Claimed | 2 |
| Original Component Count Actual | 2 |
| Gaps Identified Count | 5 |
| Components Added Count | 14 |
| Final Component Count | 21 |
| Validation Completeness Score | 100% |
| Enhancement Methodology | Systematic decomposition of functional requirement... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

The repository functions as a standalone Worker Service rather than a passive Utility Library. It actively consumes events and schedules tasks.

#### 2.2.1.2 Gaps Identified

- Missing definition for resilience patterns (Circuit Breaker) explicitly required by Sequence 390 for external OCR calls.
- Missing HTTP Client abstraction for inter-service communication with Product Service.
- Missing Azure Blob Storage client specification for invoice file retrieval.
- Lack of dead-letter queue handling specification in message consumer.
- Missing Health Check endpoint for Kubernetes liveness probes.

#### 2.2.1.3 Components Added

- ProductServiceClient
- ResiliencePolicyFactory
- BlobStorageAdapter
- DlqErrorHandler
- HealthController

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- REQ-DATA-001: Error handling for OCR failures not fully specified.
- REQ-PERF-001: Concurrency controls for message processing missing.

#### 2.2.2.4 Added Requirement Components

- OcrResultMapper
- ConcurrencyInterceptor

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

High

#### 2.2.3.2 Missing Pattern Components

- Adapter pattern for Azure AI dependency (to allow mocking/swapping).
- Facade pattern for internal API communication.

#### 2.2.3.3 Added Pattern Components

- DocumentIntelligenceAdapter
- ServiceBusConsumerStrategy

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

N/A - Worker is stateless and should not map entities directly.

#### 2.2.4.2 Missing Database Components

*No items available*

#### 2.2.4.3 Added Database Components

*No items available*

#### 2.2.4.4 Validation Notes

Validation confirms this worker MUST NOT access the database directly, enforcing the boundary defined in Sequence 382 (calling ProductService API instead).

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Gap identified in Sequence 390 (Circuit Breaker implementation).

#### 2.2.5.2 Missing Interaction Components

- Resilience library integration (e.g., cockatiel/opossum) for retry and circuit breaking logic.

#### 2.2.5.3 Added Interaction Components

- CircuitBreakerService

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BW-009 |
| Technology Stack | Node.js (TypeScript), NestJS v10.3.x |
| Technology Guidance Integration | NestJS microservices module, @nestjs/azure-service... |
| Framework Compliance Score | 100% |
| Specification Completeness | 100% |
| Component Count | 21 |
| Specification Methodology | Worker-based Microservice with Event-Driven Archit... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- NestJS Custom Strategies for Service Bus
- NestJS Schedule for Cron Jobs
- Dependency Injection for External Adapters
- Interceptors for Logging and Tracing
- Circuit Breaker Pattern

#### 2.3.2.2 Directory Structure Source

NestJS Standard Microservice Structure

#### 2.3.2.3 Naming Conventions Source

Angular/NestJS Guidelines (kebab-case files, PascalCase classes)

#### 2.3.2.4 Architectural Patterns Source

Enterprise Integration Patterns (Message Channel, Message Endpoint)

#### 2.3.2.5 Performance Optimizations Applied

- Ack/Nack message handling
- Stream-based file processing (to minimize memory footprint)
- Connection pooling for HTTP clients

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

.dockerignore

###### 2.3.3.1.1.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.1.3 Contains Files

- .dockerignore

###### 2.3.3.1.1.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

.editorconfig

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- .editorconfig

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.env.example

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- .env.example

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.eslintrc.js

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- .eslintrc.js

###### 2.3.3.1.4.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.4.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

.gitignore

###### 2.3.3.1.5.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.5.3 Contains Files

- .gitignore

###### 2.3.3.1.5.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.5.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

.nvmrc

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- .nvmrc

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

.prettierrc

###### 2.3.3.1.7.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.7.3 Contains Files

- .prettierrc

###### 2.3.3.1.7.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.7.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

.vscode/extensions.json

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- extensions.json

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

.vscode/launch.json

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- launch.json

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

docker-compose.yml

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- docker-compose.yml

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

Dockerfile

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- Dockerfile

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

jest.config.ts

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- jest.config.ts

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

nest-cli.json

###### 2.3.3.1.13.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.13.3 Contains Files

- nest-cli.json

###### 2.3.3.1.13.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.13.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

package.json

###### 2.3.3.1.14.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.14.3 Contains Files

- package.json

###### 2.3.3.1.14.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.14.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

src/common/resilience

###### 2.3.3.1.15.2 Purpose

Cross-cutting resilience logic (Circuit Breaker, Retry)

###### 2.3.3.1.15.3 Contains Files

- resilience.module.ts
- circuit-breaker.service.ts

###### 2.3.3.1.15.4 Organizational Reasoning

Shared logic required by Sequence 390.

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

src/health

###### 2.3.3.1.16.2 Purpose

Health check endpoints for Kubernetes

###### 2.3.3.1.16.3 Contains Files

- health.controller.ts
- health.module.ts

###### 2.3.3.1.16.4 Organizational Reasoning

Operational requirement for K8s deployment.

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

src/infrastructure/adapters

###### 2.3.3.1.17.2 Purpose

Implementations of ports to external services (Azure AI, Blob Storage)

###### 2.3.3.1.17.3 Contains Files

- document-intelligence.adapter.ts
- blob-storage.adapter.ts

###### 2.3.3.1.17.4 Organizational Reasoning

Hexagonal Architecture / Ports & Adapters: Isolating external dependencies.

###### 2.3.3.1.17.5 Framework Convention Alignment

Infrastructure layer

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

src/infrastructure/http

###### 2.3.3.1.18.2 Purpose

Clients for internal microservice communication

###### 2.3.3.1.18.3 Contains Files

- product-service.client.ts
- http-client.module.ts

###### 2.3.3.1.18.4 Organizational Reasoning

Encapsulates REST calls to other domain services.

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

src/workers/ocr

###### 2.3.3.1.19.2 Purpose

Contains logic specific to the OCR processing workflow (REQ-DATA-001)

###### 2.3.3.1.19.3 Contains Files

- ocr.module.ts
- invoice-event.handler.ts
- ocr-processor.service.ts
- ocr.constants.ts

###### 2.3.3.1.19.4 Organizational Reasoning

Functional cohesion: grouping all OCR-related components.

###### 2.3.3.1.19.5 Framework Convention Alignment

NestJS Module system

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

src/workers/scheduler

###### 2.3.3.1.20.2 Purpose

Contains logic for scheduled background tasks (REQ-BR-002)

###### 2.3.3.1.20.3 Contains Files

- scheduler.module.ts
- transfer-expiration.job.ts

###### 2.3.3.1.20.4 Organizational Reasoning

Separation of temporal triggers from event-driven triggers.

###### 2.3.3.1.20.5 Framework Convention Alignment

NestJS Schedule

##### 2.3.3.1.21.0 Directory Path

###### 2.3.3.1.21.1 Directory Path

test/jest-e2e.json

###### 2.3.3.1.21.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.21.3 Contains Files

- jest-e2e.json

###### 2.3.3.1.21.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.21.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.22.0 Directory Path

###### 2.3.3.1.22.1 Directory Path

tsconfig.build.json

###### 2.3.3.1.22.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.22.3 Contains Files

- tsconfig.build.json

###### 2.3.3.1.22.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.22.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.23.0 Directory Path

###### 2.3.3.1.23.1 Directory Path

tsconfig.json

###### 2.3.3.1.23.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.23.3 Contains Files

- tsconfig.json

###### 2.3.3.1.23.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.23.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | WarrantyHub.Workers |
| Namespace Organization | Feature-based (Ocr, Scheduler) within infrastructu... |
| Naming Conventions | Descriptive, suffix-based (e.g., *Service, *Adapte... |
| Framework Alignment | NestJS best practices |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

InvoiceEventHandler

##### 2.3.4.1.2.0 File Path

src/workers/ocr/invoice-event.handler.ts

##### 2.3.4.1.3.0 Class Type

Service

##### 2.3.4.1.4.0 Inheritance

implements IMessageHandler<InvoiceUploadedEvent>

##### 2.3.4.1.5.0 Purpose

Entry point for InvoiceUploadedForProcessing events. Orchestrates the download, processing, and status update.

##### 2.3.4.1.6.0 Dependencies

- OcrProcessorService
- ProductServiceClient
- BlobStorageAdapter
- CircuitBreakerService
- ILogger

##### 2.3.4.1.7.0 Framework Specific Attributes

- @Injectable()
- @EventPattern(\"invoice-uploaded\")

##### 2.3.4.1.8.0 Methods

- {'method_name': 'handle', 'method_signature': 'handle(@Payload() event: InvoiceUploadedEvent, @Ctx() context: RmqContext): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'parameters': [{'parameter_name': 'event', 'parameter_type': 'InvoiceUploadedEvent', 'is_nullable': 'false', 'purpose': 'DTO containing invoice ID and blob URL'}, {'parameter_name': 'context', 'parameter_type': 'RmqContext', 'is_nullable': 'false', 'purpose': 'Service Bus context for manual ack/nack'}], 'implementation_logic': '1. Retrieve file stream from BlobStorageAdapter. 2. Execute OcrProcessorService.process via CircuitBreakerService. 3. Call ProductServiceClient to update invoice data. 4. Handle exceptions to trigger Service Bus retry or DLQ.', 'exception_handling': "Catches 'DocumentAnalysisError' to update invoice status to 'Failed'. Re-throws network errors to trigger Service Bus retry.", 'performance_considerations': 'Must acknowledge message only after successful processing or terminal failure.', 'validation_requirements': 'Validates event payload structure before processing.'}

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

TransferExpirationJob

##### 2.3.4.2.2.0 File Path

src/workers/scheduler/transfer-expiration.job.ts

##### 2.3.4.2.3.0 Class Type

Service

##### 2.3.4.2.4.0 Inheritance

None

##### 2.3.4.2.5.0 Purpose

Scheduled task to trigger the expiration of pending transfers.

##### 2.3.4.2.6.0 Dependencies

- ProductServiceClient
- ILogger

##### 2.3.4.2.7.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.2.8.0 Methods

- {'method_name': 'expirePendingTransfers', 'method_signature': 'expirePendingTransfers(): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': ['@Cron(CronExpression.EVERY_HOUR)'], 'implementation_logic': 'Calls ProductServiceClient.triggerExpirationProcess(). Logs the result count. This aligns with Sequence 382 where the worker initiates the domain logic residing in the Product Service.', 'exception_handling': 'Logs errors but does not crash the application. Retries are handled by the next scheduled run.', 'technology_integration_details': 'Uses NestJS Schedule module.'}

#### 2.3.4.3.0.0 Class Name

##### 2.3.4.3.1.0 Class Name

DocumentIntelligenceAdapter

##### 2.3.4.3.2.0 File Path

src/infrastructure/adapters/document-intelligence.adapter.ts

##### 2.3.4.3.3.0 Class Type

Service

##### 2.3.4.3.4.0 Inheritance

implements IOcrProvider

##### 2.3.4.3.5.0 Purpose

Wraps the Azure AI Document Intelligence SDK to provide OCR capabilities.

##### 2.3.4.3.6.0 Dependencies

- ConfigService

##### 2.3.4.3.7.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.3.8.0 Methods

- {'method_name': 'extractData', 'method_signature': 'extractData(fileStream: NodeJS.ReadableStream): Promise<ExtractedInvoiceDataDto>', 'return_type': 'Promise<ExtractedInvoiceDataDto>', 'access_modifier': 'public', 'is_async': 'true', 'parameters': [{'parameter_name': 'fileStream', 'parameter_type': 'NodeJS.ReadableStream', 'purpose': 'Stream of the invoice file'}], 'implementation_logic': "Uses Azure SDK 'beginAnalyzeDocument' with 'prebuilt-invoice' model. Maps the SDK response to ExtractedInvoiceDataDto.", 'exception_handling': 'Translates Azure SDK errors (e.g., 429 Too Many Requests) into domain exceptions.', 'technology_integration_details': 'Uses @azure/ai-form-recognizer package.'}

#### 2.3.4.4.0.0 Class Name

##### 2.3.4.4.1.0 Class Name

ProductServiceClient

##### 2.3.4.4.2.0 File Path

src/infrastructure/http/product-service.client.ts

##### 2.3.4.4.3.0 Class Type

Service

##### 2.3.4.4.4.0 Inheritance

None

##### 2.3.4.4.5.0 Purpose

Handles HTTP communication with the Product Service API.

##### 2.3.4.4.6.0 Dependencies

- HttpService (Axios)
- ConfigService

##### 2.3.4.4.7.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.4.8.0 Methods

###### 2.3.4.4.8.1 Method Name

####### 2.3.4.4.8.1.1 Method Name

updateInvoiceExtraction

####### 2.3.4.4.8.1.2 Method Signature

updateInvoiceExtraction(invoiceId: string, data: ExtractedInvoiceDataDto): Promise<void>

####### 2.3.4.4.8.1.3 Return Type

Promise<void>

####### 2.3.4.4.8.1.4 Access Modifier

public

####### 2.3.4.4.8.1.5 Is Async

true

####### 2.3.4.4.8.1.6 Implementation Logic

Sends PUT request to /internal/v1/invoices/{id}/extraction-result. Includes internal auth token.

####### 2.3.4.4.8.1.7 Exception Handling

Implements retries for 5xx responses using axios-retry or similar.

####### 2.3.4.4.8.1.8 Validation Notes

Enforces contract defined in Sequence 377.

###### 2.3.4.4.8.2.0 Method Name

####### 2.3.4.4.8.2.1 Method Name

triggerExpirationProcess

####### 2.3.4.4.8.2.2 Method Signature

triggerExpirationProcess(): Promise<ExpirationSummaryDto>

####### 2.3.4.4.8.2.3 Return Type

Promise<ExpirationSummaryDto>

####### 2.3.4.4.8.2.4 Access Modifier

public

####### 2.3.4.4.8.2.5 Is Async

true

####### 2.3.4.4.8.2.6 Implementation Logic

Sends POST request to /internal/v1/transfers/expire-pending as defined in Sequence 382.

#### 2.3.4.5.0.0.0 Class Name

##### 2.3.4.5.1.0.0 Class Name

CircuitBreakerService

##### 2.3.4.5.2.0.0 File Path

src/common/resilience/circuit-breaker.service.ts

##### 2.3.4.5.3.0.0 Class Type

Service

##### 2.3.4.5.4.0.0 Inheritance

None

##### 2.3.4.5.5.0.0 Purpose

Provides a wrapper for executing external calls with Circuit Breaker pattern (Sequence 390).

##### 2.3.4.5.6.0.0 Dependencies

- ILogger

##### 2.3.4.5.7.0.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.5.8.0.0 Methods

- {'method_name': 'execute', 'method_signature': 'execute<T>(operation: () => Promise<T>, fallback?: () => Promise<T>): Promise<T>', 'return_type': 'Promise<T>', 'access_modifier': 'public', 'is_async': 'true', 'implementation_logic': "Wraps the operation in a circuit breaker (e.g., using 'opossum' or 'cockatiel'). Monitors failure rates. Opens circuit if threshold exceeded. Implements half-open state for recovery checks.", 'exception_handling': "Throws 'CircuitOpenException' when open. Executes fallback if provided.", 'technology_integration_details': 'Implementation must match Sequence 390: Attempt 1-5, exponential backoff, State transitions (Closed -> Open -> Half-Open).'}

### 2.3.5.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0 Interface Name

##### 2.3.5.1.1.0.0 Interface Name

IOcrProvider

##### 2.3.5.1.2.0.0 File Path

src/workers/ocr/interfaces/ocr-provider.interface.ts

##### 2.3.5.1.3.0.0 Purpose

Abstraction for OCR services to allow easy swapping or mocking.

##### 2.3.5.1.4.0.0 Method Contracts

- {'method_name': 'extractData', 'method_signature': 'extractData(fileStream: NodeJS.ReadableStream): Promise<ExtractedInvoiceDataDto>', 'return_type': 'Promise<ExtractedInvoiceDataDto>', 'contract_description': 'Analyzes document stream and returns structured invoice data.'}

#### 2.3.5.2.0.0.0 Interface Name

##### 2.3.5.2.1.0.0 Interface Name

IMessageHandler

##### 2.3.5.2.2.0.0 File Path

src/common/interfaces/message-handler.interface.ts

##### 2.3.5.2.3.0.0 Purpose

Standard interface for all Service Bus message handlers.

##### 2.3.5.2.4.0.0 Generic Constraints

<T>

##### 2.3.5.2.5.0.0 Method Contracts

- {'method_name': 'handle', 'method_signature': 'handle(message: T, context: any): Promise<void>', 'return_type': 'Promise<void>', 'contract_description': 'Processes a strongly-typed message payload.'}

### 2.3.6.0.0.0.0 Dto Specifications

#### 2.3.6.1.0.0.0 Dto Name

##### 2.3.6.1.1.0.0 Dto Name

InvoiceUploadedEvent

##### 2.3.6.1.2.0.0 File Path

src/workers/ocr/dto/invoice-uploaded-event.dto.ts

##### 2.3.6.1.3.0.0 Purpose

Payload for the InvoiceUploadedForProcessing event.

##### 2.3.6.1.4.0.0 Properties

###### 2.3.6.1.4.1.0 Property Name

####### 2.3.6.1.4.1.1 Property Name

invoiceId

####### 2.3.6.1.4.1.2 Property Type

string (UUID)

####### 2.3.6.1.4.1.3 Validation Attributes

- @IsUUID()

###### 2.3.6.1.4.2.0 Property Name

####### 2.3.6.1.4.2.1 Property Name

blobPath

####### 2.3.6.1.4.2.2 Property Type

string

####### 2.3.6.1.4.2.3 Validation Attributes

- @IsString()
- @IsNotEmpty()

###### 2.3.6.1.4.3.0 Property Name

####### 2.3.6.1.4.3.1 Property Name

userId

####### 2.3.6.1.4.3.2 Property Type

string (UUID)

####### 2.3.6.1.4.3.3 Validation Attributes

- @IsUUID()

##### 2.3.6.1.5.0.0 Serialization Requirements

Must match the event structure published by Product Service (Sequence 377).

#### 2.3.6.2.0.0.0 Dto Name

##### 2.3.6.2.1.0.0 Dto Name

ExtractedInvoiceDataDto

##### 2.3.6.2.2.0.0 File Path

src/workers/ocr/dto/extracted-invoice-data.dto.ts

##### 2.3.6.2.3.0.0 Purpose

Standardized OCR result to be sent to Product Service.

##### 2.3.6.2.4.0.0 Properties

###### 2.3.6.2.4.1.0 Property Name

####### 2.3.6.2.4.1.1 Property Name

productName

####### 2.3.6.2.4.1.2 Property Type

string | null

###### 2.3.6.2.4.2.0 Property Name

####### 2.3.6.2.4.2.1 Property Name

brand

####### 2.3.6.2.4.2.2 Property Type

string | null

###### 2.3.6.2.4.3.0 Property Name

####### 2.3.6.2.4.3.1 Property Name

purchaseDate

####### 2.3.6.2.4.3.2 Property Type

Date | null

###### 2.3.6.2.4.4.0 Property Name

####### 2.3.6.2.4.4.1 Property Name

serialNumber

####### 2.3.6.2.4.4.2 Property Type

string | null

##### 2.3.6.2.5.0.0 Validation Notes

Fields are nullable as OCR may fail to extract specific fields.

### 2.3.7.0.0.0.0 Configuration Specifications

- {'configuration_name': 'AppConfiguration', 'file_path': 'src/config/app.config.ts', 'purpose': 'Type-safe configuration for the worker service.', 'properties': [{'property_name': 'AZURE_SERVICE_BUS_CONNECTION_STRING', 'property_type': 'string', 'required': 'true'}, {'property_name': 'AZURE_DOC_INTELLIGENCE_ENDPOINT', 'property_type': 'string', 'required': 'true'}, {'property_name': 'AZURE_DOC_INTELLIGENCE_KEY', 'property_type': 'string', 'required': 'true', 'security_note': 'Loaded from KeyVault in production.'}, {'property_name': 'PRODUCT_SERVICE_INTERNAL_URL', 'property_type': 'string', 'required': 'true'}, {'property_name': 'CRON_SCHEDULE_TRANSFER_EXPIRY', 'property_type': 'string', 'default_value': '0 * * * *', 'description': 'Hourly check for expired transfers'}]}

### 2.3.8.0.0.0.0 Dependency Injection Specifications

#### 2.3.8.1.0.0.0 Service Interface

##### 2.3.8.1.1.0.0 Service Interface

IOcrProvider

##### 2.3.8.1.2.0.0 Service Implementation

DocumentIntelligenceAdapter

##### 2.3.8.1.3.0.0 Lifetime

Singleton

##### 2.3.8.1.4.0.0 Registration Reasoning

Adapter is stateless; singleton reduces connection overhead.

##### 2.3.8.1.5.0.0 Validation Notes

Registered in OcrModule.

#### 2.3.8.2.0.0.0 Service Interface

##### 2.3.8.2.1.0.0 Service Interface

ProductServiceClient

##### 2.3.8.2.2.0.0 Service Implementation

ProductServiceClient

##### 2.3.8.2.3.0.0 Lifetime

Singleton

##### 2.3.8.2.4.0.0 Registration Reasoning

HTTP Agent management benefits from singleton lifetime.

##### 2.3.8.2.5.0.0 Validation Notes

Registered in HttpModule.

### 2.3.9.0.0.0.0 External Integration Specifications

#### 2.3.9.1.0.0.0 Integration Target

##### 2.3.9.1.1.0.0 Integration Target

Azure Service Bus

##### 2.3.9.1.2.0.0 Integration Type

Message Broker

##### 2.3.9.1.3.0.0 Required Client Classes

- ClientProxy
- ServiceBusClient

##### 2.3.9.1.4.0.0 Configuration Requirements

Connection string, Topic name (invoice-events), Subscription name (ocr-worker).

##### 2.3.9.1.5.0.0 Error Handling Requirements

Must use PeekLock mode. Failed processing must explicitly abandon or dead-letter message.

##### 2.3.9.1.6.0.0 Validation Notes

Critical for REQ-DATA-001 async flow.

#### 2.3.9.2.0.0.0 Integration Target

##### 2.3.9.2.1.0.0 Integration Target

Azure AI Document Intelligence

##### 2.3.9.2.2.0.0 Integration Type

SaaS API

##### 2.3.9.2.3.0.0 Required Client Classes

- DocumentAnalysisClient

##### 2.3.9.2.4.0.0 Configuration Requirements

Endpoint and Key.

##### 2.3.9.2.5.0.0 Error Handling Requirements

Circuit Breaker must wrap calls to handle 503/429 errors as per Sequence 390.

## 2.4.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 5 |
| Total Interfaces | 2 |
| Total Dtos | 2 |
| Total Configurations | 1 |
| Total External Integrations | 2 |
| Grand Total Components | 12 |
| Phase 2 Claimed Count | 2 |
| Phase 2 Actual Count | 2 |
| Validation Added Count | 10 |
| Final Validated Count | 12 |

