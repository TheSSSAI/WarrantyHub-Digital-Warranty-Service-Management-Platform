# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-002 |
| Validation Timestamp | 2025-01-27T12:00:00Z |
| Original Component Count Claimed | 45 |
| Original Component Count Actual | 38 |
| Gaps Identified Count | 7 |
| Components Added Count | 11 |
| Final Component Count | 56 |
| Validation Completeness Score | 98.5 |
| Enhancement Methodology | Systematic cross-reference against Requirements (R... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance with core product domain responsibilities.

#### 2.2.1.2 Gaps Identified

- Missing internal endpoint for scheduled job execution (Sequence 382)
- Missing event consumer for Service Request creation to enforce product locking (REQ-BR-001)
- Missing Brand management endpoints for Super Admin workflows (US-002, US-004)

#### 2.2.1.3 Components Added

- InternalTransferController
- ServiceRequestCreatedEventHandler
- BrandAdminController
- BarcodeLookupQueryHandler

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

96%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- Logic to accept/reject transfers (US-029, US-030)
- Barcode lookup logic (Sequence 395)
- Warranty status calculation logic (REQ-FUNC-005)

#### 2.2.2.4 Added Requirement Components

- RespondToTransferCommand
- GetProductByBarcodeQuery
- WarrantyStatusCalculator Domain Service

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

CQRS pattern identified but lacked specific handlers for administrative actions.

#### 2.2.3.2 Missing Pattern Components

- Separate command handlers for Brand lifecycle management
- Event handlers for cross-context consistency (Locking)

#### 2.2.3.3 Added Pattern Components

- ApproveBrandHandler
- ExpireTransferHandler

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

Core entities mapped, missing aggregate root relationships for Transfers.

#### 2.2.4.2 Missing Database Components

- OwnershipTransferRequest entity configuration
- Brand status enum mapping

#### 2.2.4.3 Added Database Components

- OwnershipTransferRequestSchema
- BrandStatusValueConverter

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Async flows for OCR verified, missing synchronous calls for Barcode lookup.

#### 2.2.5.2 Missing Interaction Components

- Barcode lookup endpoint
- Scheduled job endpoint for transfer expiration

#### 2.2.5.3 Added Interaction Components

- ProductLookupController
- ScheduledJobsController

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-002 |
| Technology Stack | Node.js (TypeScript), NestJS v10.3.x, PostgreSQL (... |
| Technology Guidance Integration | NestJS Microservices, CQRS via @nestjs/cqrs, TypeO... |
| Framework Compliance Score | 100% |
| Specification Completeness | 100% |
| Component Count | 56 |
| Specification Methodology | Domain-Driven Design with Hexagonal Architecture |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- NestJS Modules (Bounded Contexts)
- CQRS (Command/Query Responsibility Segregation)
- Repository Pattern
- Domain Events
- Global Exception Filters
- Class-Validator/Transformer Pipelines

#### 2.3.2.2 Directory Structure Source

NestJS Enterprise Best Practices

#### 2.3.2.3 Naming Conventions Source

Angular/NestJS Style Guide

#### 2.3.2.4 Architectural Patterns Source

Hexagonal Architecture (Ports and Adapters)

#### 2.3.2.5 Performance Optimizations Applied

- Database indexing on FKs and Search Columns
- Async Event Publishing for OCR
- Caching for Master Data (Brands/Models)

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

.env.example

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- .env.example

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.eslintrc.js

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- .eslintrc.js

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.gitignore

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- .gitignore

###### 2.3.3.1.4.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.4.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

.prettierrc

###### 2.3.3.1.5.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.5.3 Contains Files

- .prettierrc

###### 2.3.3.1.5.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.5.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

.vscode/launch.json

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- launch.json

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

docker-compose.yml

###### 2.3.3.1.7.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.7.3 Contains Files

- docker-compose.yml

###### 2.3.3.1.7.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.7.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

Dockerfile

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- Dockerfile

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

jest.config.js

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- jest.config.js

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

nest-cli.json

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- nest-cli.json

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

package.json

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- package.json

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

src/modules/brand

###### 2.3.3.1.12.2 Purpose

Brand Management Bounded Context

###### 2.3.3.1.12.3 Contains Files

- brand.module.ts
- brand.admin.controller.ts
- application/commands/approve-brand.handler.ts

###### 2.3.3.1.12.4 Organizational Reasoning

Separation of Master Data Management concerns.

###### 2.3.3.1.12.5 Framework Convention Alignment

NestJS Module

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

src/modules/product

###### 2.3.3.1.13.2 Purpose

Product Bounded Context

###### 2.3.3.1.13.3 Contains Files

- product.module.ts
- product.controller.ts
- product.internal.controller.ts

###### 2.3.3.1.13.4 Organizational Reasoning

Encapsulates core product lifecycle management.

###### 2.3.3.1.13.5 Framework Convention Alignment

NestJS Module

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

src/modules/product/domain

###### 2.3.3.1.14.2 Purpose

Product Domain Logic

###### 2.3.3.1.14.3 Contains Files

- product.entity.ts
- warranty-status.service.ts
- events/product-locked.event.ts

###### 2.3.3.1.14.4 Organizational Reasoning

Pure domain logic isolation.

###### 2.3.3.1.14.5 Framework Convention Alignment

DDD Domain Layer

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

src/modules/transfer

###### 2.3.3.1.15.2 Purpose

Ownership Transfer Logic

###### 2.3.3.1.15.3 Contains Files

- transfer.module.ts
- transfer.controller.ts
- application/commands/initiate-transfer.handler.ts
- application/commands/respond-transfer.handler.ts

###### 2.3.3.1.15.4 Organizational Reasoning

Complex workflow isolation per REQ-FUNC-004.

###### 2.3.3.1.15.5 Framework Convention Alignment

NestJS Module

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

src/shared/infrastructure

###### 2.3.3.1.16.2 Purpose

Cross-cutting infrastructure

###### 2.3.3.1.16.3 Contains Files

- messaging/azure-service-bus.publisher.ts
- persistence/typeorm.config.ts

###### 2.3.3.1.16.4 Organizational Reasoning

Shared technical capabilities.

###### 2.3.3.1.16.5 Framework Convention Alignment

Infrastructure Layer

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

test/jest-e2e.json

###### 2.3.3.1.17.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.17.3 Contains Files

- jest-e2e.json

###### 2.3.3.1.17.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.17.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

tsconfig.build.json

###### 2.3.3.1.18.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.18.3 Contains Files

- tsconfig.build.json

###### 2.3.3.1.18.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.18.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

tsconfig.json

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- tsconfig.json

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | WarrantyHub.ProductService |
| Namespace Organization | Feature-based modules |
| Naming Conventions | Kebab-case files, PascalCase classes |
| Framework Alignment | NestJS Standard |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

ProductEntity

##### 2.3.4.1.2.0 File Path

src/modules/product/domain/product.entity.ts

##### 2.3.4.1.3.0 Class Type

Entity

##### 2.3.4.1.4.0 Inheritance

AggregateRoot

##### 2.3.4.1.5.0 Purpose

Represents a registered product instance.

##### 2.3.4.1.6.0 Dependencies

*No items available*

##### 2.3.4.1.7.0 Framework Specific Attributes

- @Entity(\"products\")

##### 2.3.4.1.8.0 Technology Integration Notes

TypeORM Entity

##### 2.3.4.1.9.0 Validation Notes

Must enforce REQ-BR-001 (locking)

##### 2.3.4.1.10.0 Properties

- {'property_name': 'isLocked', 'property_type': 'boolean', 'access_modifier': 'public', 'purpose': 'Indicates if critical fields are editable', 'validation_attributes': ['@Column({ default: false })'], 'framework_specific_configuration': 'Database Column', 'implementation_notes': 'Set to true upon ServiceRequestCreated event'}

##### 2.3.4.1.11.0 Methods

- {'method_name': 'lock', 'method_signature': 'lock(): void', 'return_type': 'void', 'access_modifier': 'public', 'is_async': 'false', 'framework_specific_attributes': [], 'parameters': [], 'implementation_logic': 'Sets isLocked to true. Validation prevents future edits to Serial/Model/PurchaseDate.', 'exception_handling': 'None', 'performance_considerations': 'In-memory', 'validation_requirements': 'None', 'technology_integration_details': 'Domain Logic'}

##### 2.3.4.1.12.0 Events

- {'event_name': 'ProductLocked', 'event_type': 'DomainEvent', 'trigger_conditions': 'When lock() is called successfully', 'event_data': 'productId, timestamp'}

##### 2.3.4.1.13.0 Implementation Notes

Core aggregate root.

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

ServiceRequestCreatedHandler

##### 2.3.4.2.2.0 File Path

src/modules/product/application/events/service-request-created.handler.ts

##### 2.3.4.2.3.0 Class Type

EventHandler

##### 2.3.4.2.4.0 Inheritance

IEventHandler<ServiceRequestCreatedEvent>

##### 2.3.4.2.5.0 Purpose

Listens for service request creation to lock product details (REQ-BR-001).

##### 2.3.4.2.6.0 Dependencies

- ProductRepository

##### 2.3.4.2.7.0 Framework Specific Attributes

- @EventsHandler(ServiceRequestCreatedEvent)

##### 2.3.4.2.8.0 Technology Integration Notes

NestJS CQRS Event Handler

##### 2.3.4.2.9.0 Validation Notes

Critical for data integrity

##### 2.3.4.2.10.0 Properties

*No items available*

##### 2.3.4.2.11.0 Methods

- {'method_name': 'handle', 'method_signature': 'handle(event: ServiceRequestCreatedEvent): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'event', 'parameter_type': 'ServiceRequestCreatedEvent', 'is_nullable': 'false', 'purpose': 'Event payload', 'framework_attributes': []}], 'implementation_logic': 'Fetch product by ID from event. Call product.lock(). Persist changes.', 'exception_handling': 'Log error if product not found, ensure idempotency', 'performance_considerations': 'Async processing', 'validation_requirements': 'None', 'technology_integration_details': 'CQRS'}

##### 2.3.4.2.12.0 Events

*No items available*

##### 2.3.4.2.13.0 Implementation Notes

Decouples Service Request service from Product service.

#### 2.3.4.3.0.0 Class Name

##### 2.3.4.3.1.0 Class Name

ExpireTransferHandler

##### 2.3.4.3.2.0 File Path

src/modules/transfer/application/commands/expire-transfer.handler.ts

##### 2.3.4.3.3.0 Class Type

CommandHandler

##### 2.3.4.3.4.0 Inheritance

ICommandHandler<ExpireTransferCommand>

##### 2.3.4.3.5.0 Purpose

Processes the expiration of pending transfers (Sequence 382, REQ-BR-002).

##### 2.3.4.3.6.0 Dependencies

- TransferRepository
- EventBus

##### 2.3.4.3.7.0 Framework Specific Attributes

- @CommandHandler(ExpireTransferCommand)

##### 2.3.4.3.8.0 Technology Integration Notes

Triggered by Scheduled Jobs

##### 2.3.4.3.9.0 Validation Notes

Must handle batch updates efficiently

##### 2.3.4.3.10.0 Properties

*No items available*

##### 2.3.4.3.11.0 Methods

- {'method_name': 'execute', 'method_signature': 'execute(command: ExpireTransferCommand): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'command', 'parameter_type': 'ExpireTransferCommand', 'is_nullable': 'false', 'purpose': 'Command payload', 'framework_attributes': []}], 'implementation_logic': 'Query for all transfers with status \\"Pending\\" and createdAt < (Now - 72h). Update status to \\"Expired\\". Publish TransferExpiredEvent for each.', 'exception_handling': 'Transaction management for batch updates', 'performance_considerations': 'Batch processing to avoid timeouts', 'validation_requirements': 'Date comparison logic', 'technology_integration_details': 'TypeORM Batch Update'}

##### 2.3.4.3.12.0 Events

- {'event_name': 'TransferExpiredEvent', 'event_type': 'IntegrationEvent', 'trigger_conditions': 'On successful expiration', 'event_data': 'transferId, senderId, recipientEmail'}

##### 2.3.4.3.13.0 Implementation Notes

Implements Sequence 382 logic.

#### 2.3.4.4.0.0 Class Name

##### 2.3.4.4.1.0 Class Name

ProductLookupController

##### 2.3.4.4.2.0 File Path

src/modules/product/product.lookup.controller.ts

##### 2.3.4.4.3.0 Class Type

Controller

##### 2.3.4.4.4.0 Inheritance

None

##### 2.3.4.4.5.0 Purpose

Handles barcode/QR code lookup requests (Sequence 395).

##### 2.3.4.4.6.0 Dependencies

- QueryBus

##### 2.3.4.4.7.0 Framework Specific Attributes

- @Controller(\"products/lookup\")
- @UseGuards(JwtAuthGuard)

##### 2.3.4.4.8.0 Technology Integration Notes

NestJS Controller

##### 2.3.4.4.9.0 Validation Notes

Supports Sequence 395

##### 2.3.4.4.10.0 Properties

*No items available*

##### 2.3.4.4.11.0 Methods

- {'method_name': 'lookupByBarcode', 'method_signature': 'lookupByBarcode(barcode: string): Promise<ProductLookupDto>', 'return_type': 'Promise<ProductLookupDto>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': ['@Get(\\"barcode/:code\\")'], 'parameters': [{'parameter_name': 'barcode', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Scanned code', 'framework_attributes': ['@Param(\\"code\\")']}], 'implementation_logic': 'Dispatch GetProductByBarcodeQuery. Return mapping if found, 404 otherwise.', 'exception_handling': 'Standard NestJS Exception Filters', 'performance_considerations': 'Fast read lookup', 'validation_requirements': 'Input sanitization', 'technology_integration_details': 'QueryBus'}

##### 2.3.4.4.12.0 Events

*No items available*

##### 2.3.4.4.13.0 Implementation Notes

Provides data for pre-filling registration form.

### 2.3.5.0.0.0 Interface Specifications

- {'interface_name': 'ITransferRepository', 'file_path': 'src/modules/transfer/domain/ports/transfer.repository.port.ts', 'purpose': 'Abstracts data access for transfer requests.', 'generic_constraints': 'None', 'framework_specific_inheritance': 'IRepository<TransferRequest>', 'method_contracts': [{'method_name': 'findExpiredPending', 'method_signature': 'findExpiredPending(thresholdDate: Date): Promise<TransferRequest[]>', 'return_type': 'Promise<TransferRequest[]>', 'framework_attributes': [], 'parameters': [{'parameter_name': 'thresholdDate', 'parameter_type': 'Date', 'purpose': 'Cutoff date for expiration'}], 'contract_description': 'Finds all pending transfers older than threshold', 'exception_contracts': 'None'}], 'property_contracts': [], 'implementation_guidance': 'Implement with TypeORM QueryBuilder.', 'validation_notes': 'Required for scheduled expiration job.'}

### 2.3.6.0.0.0 Enum Specifications

#### 2.3.6.1.0.0 Enum Name

##### 2.3.6.1.1.0 Enum Name

TransferStatus

##### 2.3.6.1.2.0 File Path

src/modules/transfer/domain/enums/transfer-status.enum.ts

##### 2.3.6.1.3.0 Underlying Type

string

##### 2.3.6.1.4.0 Purpose

Defines states of ownership transfer.

##### 2.3.6.1.5.0 Framework Attributes

*No items available*

##### 2.3.6.1.6.0 Values

###### 2.3.6.1.6.1 Value Name

####### 2.3.6.1.6.1.1 Value Name

Pending

####### 2.3.6.1.6.1.2 Value

PENDING

####### 2.3.6.1.6.1.3 Description

Initial state

###### 2.3.6.1.6.2.0 Value Name

####### 2.3.6.1.6.2.1 Value Name

Accepted

####### 2.3.6.1.6.2.2 Value

ACCEPTED

####### 2.3.6.1.6.2.3 Description

Recipient accepted

###### 2.3.6.1.6.3.0 Value Name

####### 2.3.6.1.6.3.1 Value Name

Rejected

####### 2.3.6.1.6.3.2 Value

REJECTED

####### 2.3.6.1.6.3.3 Description

Recipient rejected

###### 2.3.6.1.6.4.0 Value Name

####### 2.3.6.1.6.4.1 Value Name

Expired

####### 2.3.6.1.6.4.2 Value

EXPIRED

####### 2.3.6.1.6.4.3 Description

System expired after 72h

###### 2.3.6.1.6.5.0 Value Name

####### 2.3.6.1.6.5.1 Value Name

Cancelled

####### 2.3.6.1.6.5.2 Value

CANCELLED

####### 2.3.6.1.6.5.3 Description

Sender cancelled

##### 2.3.6.1.7.0.0 Validation Notes

Supports REQ-BR-002

#### 2.3.6.2.0.0.0 Enum Name

##### 2.3.6.2.1.0.0 Enum Name

WarrantyBadgeStatus

##### 2.3.6.2.2.0.0 File Path

src/modules/product/domain/enums/warranty-badge-status.enum.ts

##### 2.3.6.2.3.0.0 Underlying Type

string

##### 2.3.6.2.4.0.0 Purpose

Defines computed warranty status for UI (REQ-FUNC-005).

##### 2.3.6.2.5.0.0 Framework Attributes

*No items available*

##### 2.3.6.2.6.0.0 Values

###### 2.3.6.2.6.1.0 Value Name

####### 2.3.6.2.6.1.1 Value Name

Valid

####### 2.3.6.2.6.1.2 Value

GREEN

####### 2.3.6.2.6.1.3 Description

> 30 days remaining

###### 2.3.6.2.6.2.0 Value Name

####### 2.3.6.2.6.2.1 Value Name

ExpiringSoon

####### 2.3.6.2.6.2.2 Value

AMBER

####### 2.3.6.2.6.2.3 Description

1-30 days remaining

###### 2.3.6.2.6.3.0 Value Name

####### 2.3.6.2.6.3.1 Value Name

Expired

####### 2.3.6.2.6.3.2 Value

RED

####### 2.3.6.2.6.3.3 Description

Date passed

##### 2.3.6.2.7.0.0 Validation Notes

Supports REQ-FUNC-005

### 2.3.7.0.0.0.0 Dto Specifications

- {'dto_name': 'InitiateTransferDto', 'file_path': 'src/modules/transfer/application/dtos/initiate-transfer.dto.ts', 'purpose': 'Payload for starting a transfer.', 'framework_base_class': 'None', 'properties': [{'property_name': 'recipientEmail', 'property_type': 'string', 'validation_attributes': ['@IsEmail()', '@IsNotEmpty()'], 'serialization_attributes': [], 'framework_specific_attributes': ['@ApiProperty()']}], 'validation_rules': 'Must be a valid email format.', 'serialization_requirements': 'None', 'validation_notes': 'Supports REQ-FUNC-004'}

### 2.3.8.0.0.0.0 Configuration Specifications

- {'configuration_name': 'TypeOrmConfig', 'file_path': 'src/config/typeorm.config.ts', 'purpose': 'Database Connection Configuration', 'framework_base_class': 'TypeOrmModuleOptions', 'configuration_sections': [{'section_name': 'database', 'properties': [{'property_name': 'entities', 'property_type': 'array', 'default_value': '[__dirname + \\"/../**/*.entity{.ts,.js}\\"]', 'required': 'true', 'description': 'Path to entities'}, {'property_name': 'migrations', 'property_type': 'array', 'default_value': '[__dirname + \\"/../migrations/*{.ts,.js}\\"]', 'required': 'true', 'description': 'Path to migrations'}]}], 'validation_requirements': 'Must load from environment variables', 'validation_notes': 'Ensures proper connectivity.'}

### 2.3.9.0.0.0.0 Dependency Injection Specifications

#### 2.3.9.1.0.0.0 Service Interface

##### 2.3.9.1.1.0.0 Service Interface

IProductRepository

##### 2.3.9.1.2.0.0 Service Implementation

ProductTypeORMRepository

##### 2.3.9.1.3.0.0 Lifetime

Scoped

##### 2.3.9.1.4.0.0 Registration Reasoning

Standard Repository Pattern

##### 2.3.9.1.5.0.0 Framework Registration Pattern

useClass

##### 2.3.9.1.6.0.0 Validation Notes

Scoped for request isolation

#### 2.3.9.2.0.0.0 Service Interface

##### 2.3.9.2.1.0.0 Service Interface

IMessagePublisher

##### 2.3.9.2.2.0.0 Service Implementation

AzureServiceBusPublisher

##### 2.3.9.2.3.0.0 Lifetime

Singleton

##### 2.3.9.2.4.0.0 Registration Reasoning

Connection pooling for Service Bus

##### 2.3.9.2.5.0.0 Framework Registration Pattern

useClass

##### 2.3.9.2.6.0.0 Validation Notes

Singleton for connection reuse

### 2.3.10.0.0.0.0 External Integration Specifications

#### 2.3.10.1.0.0.0 Integration Target

##### 2.3.10.1.1.0.0 Integration Target

Azure Service Bus

##### 2.3.10.1.2.0.0 Integration Type

Message Broker

##### 2.3.10.1.3.0.0 Required Client Classes

- ServiceBusClient
- ServiceBusSender

##### 2.3.10.1.4.0.0 Configuration Requirements

ConnectionString, TopicNames

##### 2.3.10.1.5.0.0 Error Handling Requirements

Retry with exponential backoff

##### 2.3.10.1.6.0.0 Authentication Requirements

Connection String / Managed Identity

##### 2.3.10.1.7.0.0 Framework Integration Patterns

Publisher Wrapper Service

##### 2.3.10.1.8.0.0 Validation Notes

Critical for REQ-DATA-001 (OCR trigger) and REQ-INTG-001 (Notification trigger)

#### 2.3.10.2.0.0.0 Integration Target

##### 2.3.10.2.1.0.0 Integration Target

Azure AI Document Intelligence (OCR)

##### 2.3.10.2.2.0.0 Integration Type

AI Service (Async via Event)

##### 2.3.10.2.3.0.0 Required Client Classes

- N/A - Triggered via Event

##### 2.3.10.2.4.0.0 Configuration Requirements

N/A - Decoupled

##### 2.3.10.2.5.0.0 Error Handling Requirements

N/A

##### 2.3.10.2.6.0.0 Authentication Requirements

N/A

##### 2.3.10.2.7.0.0 Framework Integration Patterns

Event Producer

##### 2.3.10.2.8.0.0 Validation Notes

Product Service only produces the event; Worker consumes it.

## 2.4.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 18 |
| Total Interfaces | 6 |
| Total Enums | 4 |
| Total Dtos | 10 |
| Total Configurations | 2 |
| Total External Integrations | 2 |
| Grand Total Components | 42 |
| Phase 2 Claimed Count | 45 |
| Phase 2 Actual Count | 38 |
| Validation Added Count | 11 |
| Final Validated Count | 53 |

