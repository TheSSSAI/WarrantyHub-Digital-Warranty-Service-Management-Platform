# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-002 |
| Extraction Timestamp | 2025-05-24T15:30:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | Production-Ready |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-BR-001

#### 1.2.1.2 Requirement Text

The system must prevent users from editing the Serial Number, Purchase Date, and Model fields of a registered product after the first service request has been created for that product.

#### 1.2.1.3 Validation Criteria

- Verify that product updates are blocked if the 'isLocked' flag is true.
- Verify that the 'isLocked' flag is set to true upon receipt of a 'ServiceRequestCreated' event.

#### 1.2.1.4 Implementation Implications

- Implement an event listener for 'ServiceRequestCreated'.
- Add 'isLocked' boolean column to Product entity.
- Add validation logic in UpdateProductCommand handler.

#### 1.2.1.5 Extraction Reasoning

This business rule introduces an asynchronous dependency on the Service Request Service and requires specific state management logic within the Product domain.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-FUNC-004

#### 1.2.2.2 Requirement Text

The system shall allow a user to initiate an ownership transfer of a registered product to another user.

#### 1.2.2.3 Validation Criteria

- Verify transfer initiation creates a pending record.
- Verify acceptance transfers ownership and history.
- Verify rejection/expiry cancels the transfer.

#### 1.2.2.4 Implementation Implications

- Define 'TransferRequest' entity with state machine (Pending, Accepted, Rejected, Expired).
- Publish 'TransferInitiated', 'TransferAccepted', 'TransferRejected' integration events.
- Implement Expiration logic via scheduled job.

#### 1.2.2.5 Extraction Reasoning

Complex workflow involving cross-user data modification and asynchronous notifications.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-DATA-001

#### 1.2.3.2 Requirement Text

The system shall process uploaded invoice images... using an OCR service.

#### 1.2.3.3 Validation Criteria

- Verify 'InvoiceUploaded' event is published upon upload.
- Verify product data is updated when OCR results are received.

#### 1.2.3.4 Implementation Implications

- Publish 'InvoiceUploadedForProcessing' event to Azure Service Bus.
- Expose internal endpoint or event listener to receive extracted data from 'async-processors-service'.

#### 1.2.3.5 Extraction Reasoning

Decouples the heavy OCR processing from the user-facing API using an event-driven pattern.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

ProductService

#### 1.3.1.2 Component Specification

Core domain service managing the lifecycle of Products, Warranties, and Master Catalog data.

#### 1.3.1.3 Implementation Requirements

- CQRS implementation for separation of reads and writes.
- Integration with Azure Service Bus for event publishing/subscribing.
- TypeORM repositories for PostgreSQL persistence.

#### 1.3.1.4 Architectural Context

Domain Service in the Backend Layer

#### 1.3.1.5 Extraction Reasoning

The central component responsible for the repository's primary domain logic.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

WarrantyEngine

#### 1.3.2.2 Component Specification

Domain logic component responsible for calculating warranty expiry dates based on purchase date and policies.

#### 1.3.2.3 Implementation Requirements

- Date calculation utilities handling leap years and timezones.
- Logic to apply Brand/Model specific warranty terms.

#### 1.3.2.4 Architectural Context

Domain Service Helper

#### 1.3.2.5 Extraction Reasoning

Isolates the business rules for warranty calculation as required by REQ-FUNC-005.

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Domain Layer

#### 1.4.1.2 Layer Responsibilities

Enforcing business rules (locking, transfers), state changes, and event generation.

#### 1.4.1.3 Layer Constraints

- Pure TypeScript logic.
- No direct dependency on external infrastructure (use Ports).

#### 1.4.1.4 Implementation Patterns

- Domain Driven Design
- Aggregate Roots

#### 1.4.1.5 Extraction Reasoning

Ensures business rules are isolated from HTTP/Database concerns.

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Application Layer

#### 1.4.2.2 Layer Responsibilities

Orchestrating use cases (Register Product, Transfer Ownership) and mapping DTOs.

#### 1.4.2.3 Layer Constraints

- Transactional consistency.
- Validation of inputs.

#### 1.4.2.4 Implementation Patterns

- CQRS (Command/Query Handlers)

#### 1.4.2.5 Extraction Reasoning

Standard NestJS/CQRS architecture pattern used in the project.

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IMessageBroker

#### 1.5.1.2 Source Repository

REPO-SL-011

#### 1.5.1.3 Method Contracts

##### 1.5.1.3.1 Method Name

###### 1.5.1.3.1.1 Method Name

publish

###### 1.5.1.3.1.2 Method Signature

publish<T>(topic: string, event: T): Promise<void>

###### 1.5.1.3.1.3 Method Purpose

Publishes domain events (e.g., TransferInitiated, InvoiceUploaded) to Azure Service Bus.

###### 1.5.1.3.1.4 Integration Context

Used in Command Handlers after successful state changes.

##### 1.5.1.3.2.0 Method Name

###### 1.5.1.3.2.1 Method Name

subscribe

###### 1.5.1.3.2.2 Method Signature

subscribe<T>(topic: string, handler: (event: T) => Promise<void>): void

###### 1.5.1.3.2.3 Method Purpose

Listens for integration events from other services (e.g., ServiceRequestCreated).

###### 1.5.1.3.2.4 Integration Context

Used to trigger side effects like product locking.

#### 1.5.1.4.0.0 Integration Pattern

Pub/Sub

#### 1.5.1.5.0.0 Communication Protocol

AMQP

#### 1.5.1.6.0.0 Extraction Reasoning

Essential for decoupling Product Service from Notification, OCR, and Service Request services.

### 1.5.2.0.0.0 Interface Name

#### 1.5.2.1.0.0 Interface Name

IIdentityService

#### 1.5.2.2.0.0 Source Repository

REPO-BS-001

#### 1.5.2.3.0.0 Method Contracts

- {'method_name': 'validateToken', 'method_signature': 'validateToken(token: string): Promise<UserContext>', 'method_purpose': 'Validates the JWT and extracts user claims.', 'integration_context': 'Middleware/Guard level for every API request.'}

#### 1.5.2.4.0.0 Integration Pattern

In-Process Library (Shared Guard) / HTTP

#### 1.5.2.5.0.0 Communication Protocol

HTTP/HTTPS

#### 1.5.2.6.0.0 Extraction Reasoning

Product operations are user-scoped; identity verification is a strict dependency.

### 1.5.3.0.0.0 Interface Name

#### 1.5.3.1.0.0 Interface Name

IBlobStorage

#### 1.5.3.2.0.0 Source Repository

REPO-IN-004

#### 1.5.3.3.0.0 Method Contracts

- {'method_name': 'generateSasToken', 'method_signature': 'generateSasToken(container: string, blobName: string, permissions: string): Promise<string>', 'method_purpose': 'Generates a secure upload URL for invoice images.', 'integration_context': 'During product registration initiation.'}

#### 1.5.3.4.0.0 Integration Pattern

SDK Wrapper

#### 1.5.3.5.0.0 Communication Protocol

HTTPS

#### 1.5.3.6.0.0 Extraction Reasoning

Required for REQ-DATA-001 to allow clients to upload invoices securely.

## 1.6.0.0.0.0 Exposed Interfaces

### 1.6.1.0.0.0 Interface Name

#### 1.6.1.1.0.0 Interface Name

IProductCatalogApi

#### 1.6.1.2.0.0 Consumer Repositories

- REPO-FE-002
- REPO-FE-003
- REPO-GW-013

#### 1.6.1.3.0.0 Method Contracts

##### 1.6.1.3.1.0 Method Name

###### 1.6.1.3.1.1 Method Name

GetProducts

###### 1.6.1.3.1.2 Method Signature

GET /api/v1/products?userId={uuid}

###### 1.6.1.3.1.3 Method Purpose

Retrieves a list of products for a user.

###### 1.6.1.3.1.4 Implementation Requirements

Pagination, Filtering by Brand/Category.

##### 1.6.1.3.2.0 Method Name

###### 1.6.1.3.2.1 Method Name

GetProductDetails

###### 1.6.1.3.2.2 Method Signature

GET /api/v1/products/{id}

###### 1.6.1.3.2.3 Method Purpose

Retrieves detailed info, including warranty status and calculated expiry.

###### 1.6.1.3.2.4 Implementation Requirements

Include 'isLocked' status and computed warranty status badge color.

##### 1.6.1.3.3.0 Method Name

###### 1.6.1.3.3.1 Method Name

RegisterProduct

###### 1.6.1.3.3.2 Method Signature

POST /api/v1/products

###### 1.6.1.3.3.3 Method Purpose

Registers a new product.

###### 1.6.1.3.3.4 Implementation Requirements

Triggers 'ProductRegistered' and 'InvoiceUploaded' events.

#### 1.6.1.4.0.0 Service Level Requirements

- P95 latency < 250ms for reads.

#### 1.6.1.5.0.0 Implementation Constraints

- Must enforce tenancy (users can only see their own products).

#### 1.6.1.6.0.0 Extraction Reasoning

Core functionality required by frontend clients.

### 1.6.2.0.0.0 Interface Name

#### 1.6.2.1.0.0 Interface Name

IProductInternalApi

#### 1.6.2.2.0.0 Consumer Repositories

- REPO-BS-004
- REPO-BW-009

#### 1.6.2.3.0.0 Method Contracts

##### 1.6.2.3.1.0 Method Name

###### 1.6.2.3.1.1 Method Name

ValidateWarranty

###### 1.6.2.3.1.2 Method Signature

GET /internal/v1/products/{id}/warranty-status

###### 1.6.2.3.1.3 Method Purpose

Used by Service Request Service to validate warranty before ticket creation.

###### 1.6.2.3.1.4 Implementation Requirements

Fast response, cached if possible.

##### 1.6.2.3.2.0 Method Name

###### 1.6.2.3.2.1 Method Name

UpdateOcrData

###### 1.6.2.3.2.2 Method Signature

PATCH /internal/v1/products/{id}/ocr-data

###### 1.6.2.3.2.3 Method Purpose

Callback for OCR worker to update product details extracted from invoice.

###### 1.6.2.3.2.4 Implementation Requirements

System-to-system authentication required.

#### 1.6.2.4.0.0 Service Level Requirements

- High availability critical for Service Request creation flow.

#### 1.6.2.5.0.0 Implementation Constraints

- Internal VNet access only.

#### 1.6.2.6.0.0 Extraction Reasoning

Inter-service dependencies for workflow automation.

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

NestJS v10.3.x, TypeORM, Class-Validator

### 1.7.2.0.0.0 Integration Technologies

- Azure Service Bus
- Azure Blob Storage
- REST/HTTP

### 1.7.3.0.0.0 Performance Constraints

Product list retrieval must be optimized with database indexes on userId. Warranty calculation should be efficient.

### 1.7.4.0.0.0 Security Requirements

RBAC via Guards. Internal APIs secured with Client Credentials or mTLS. Input validation via DTOs.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | Mapped REQ-BR-001 (Locking), REQ-FUNC-004 (Transfe... |
| Cross Reference Validation | Validated dependencies with Identity Service (Auth... |
| Implementation Readiness Assessment | High. Clear interface definitions, database intera... |
| Quality Assurance Confirmation | Integration design adheres to Clean Architecture a... |

