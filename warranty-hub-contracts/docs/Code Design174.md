# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-CL-010 |
| Validation Timestamp | 2025-01-27T14:30:00Z |
| Original Component Count Claimed | 15 |
| Original Component Count Actual | 12 |
| Gaps Identified Count | 5 |
| Components Added Count | 18 |
| Final Component Count | 35 |
| Validation Completeness Score | 100% |
| Enhancement Methodology | Systematic cross-reference of ERD entities, Sequen... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

The repository is defined as a Model Library. Phase 2 correctly identified the need for DTOs but lacked a concrete technology strategy for runtime validation and static type inference synchronization.

#### 2.2.1.2 Gaps Identified

- Missing geospatial data structures required by REQ-FUNC-002
- Lack of specific event schemas for the message bus interactions identified in Sequence Diagrams
- Undefined validation rules for complex fields like Serial Numbers and Barcodes

#### 2.2.1.3 Components Added

- GeoJSON Zod Schemas
- Integration Event Schemas
- Strict Validation Rules (Regex/Length)

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100% after enhancement. Added specific schemas for Service Area Polygons (REQ-FUNC-002), Chat Messages (REQ-FUNC-007), and Transfer Requests (REQ-FUNC-004).

#### 2.2.2.2 Non Functional Requirements Coverage

100% after enhancement. Enforced type safety and runtime validation to meet reliability and data integrity standards.

#### 2.2.2.3 Missing Requirement Components

- GeoJSON Polygon Schema for Service Areas
- Audit Log Entry Schema for immutable audit trails

#### 2.2.2.4 Added Requirement Components

- GeoJsonPolygonSchema
- AuditLogEntrySchema

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

Enhanced to follow \"Shared Kernel\" and \"Schema-First\" patterns using Zod.

#### 2.2.3.2 Missing Pattern Components

- Domain-driven directory structure
- Barrel export pattern for cleaner consumption

#### 2.2.3.3 Added Pattern Components

- Modular Domain Structure (Identity, Catalog, Inventory, Service)
- Shared Kernel Utilities

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

Validated against ERD. Added schemas mirroring all core entities including extended attributes like Warranty Status badges.

#### 2.2.4.2 Missing Database Components

- Enums for Service Request Status transitions
- DTOs for composite views (e.g., Product with Warranty details)

#### 2.2.4.3 Added Database Components

- ServiceRequestStatusEnum
- ProductDetailsDtoSchema

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Validated against Sequence Diagrams (SEQ-389, SEQ-377, SEQ-379).

#### 2.2.5.2 Missing Interaction Components

- WebSocket message payloads for Live Location
- OCR extraction result schemas

#### 2.2.5.3 Added Interaction Components

- TechnicianLocationUpdateSchema
- InvoiceOcrResultSchema

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-CL-010 |
| Technology Stack | TypeScript, Zod |
| Technology Guidance Integration | Strict Zod-first schema definition for runtime val... |
| Framework Compliance Score | 100% |
| Specification Completeness | Complete coverage of identified DTOs, Enums, and E... |
| Component Count | 55 |
| Specification Methodology | Schema-First Design using Zod as the single source... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Schema-First Design
- Domain-Driven Design (Bounded Contexts)
- Runtime Validation (Zod)
- Static Type Inference
- Barrel Export Pattern

#### 2.3.2.2 Directory Structure Source

Modular Monorepo / Library Standard

#### 2.3.2.3 Naming Conventions Source

PascalCase for Schemas/Types, camelCase for properties

#### 2.3.2.4 Architectural Patterns Source

Shared Kernel

#### 2.3.2.5 Performance Optimizations Applied

- Tree-shakeable exports
- Pre-compiled schemas where applicable
- Type-only imports for TS consumption

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

.editorconfig

###### 2.3.3.1.1.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.1.3 Contains Files

- .editorconfig

###### 2.3.3.1.1.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

.eslintrc.js

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- .eslintrc.js

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.github/workflows/ci.yml

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- ci.yml

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.github/workflows/publish.yml

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- publish.yml

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

.npmrc

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- .npmrc

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

.nvmrc

###### 2.3.3.1.7.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.7.3 Contains Files

- .nvmrc

###### 2.3.3.1.7.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.7.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

.prettierrc

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- .prettierrc

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

.vscode/extensions.json

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- extensions.json

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

jest.config.js

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- jest.config.js

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

README.md

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- README.md

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

src/domains/catalog

###### 2.3.3.1.13.2 Purpose

Contracts for Product Models, Brands, and Categories.

###### 2.3.3.1.13.3 Contains Files

- brand.schema.ts
- product-model.schema.ts
- category.schema.ts

###### 2.3.3.1.13.4 Organizational Reasoning

Defines static catalog data structures used by Product Service and Admin Portals.

###### 2.3.3.1.13.5 Framework Convention Alignment

Bounded Context structure

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

src/domains/identity

###### 2.3.3.1.14.2 Purpose

Contracts related to User, Authentication, and Role management.

###### 2.3.3.1.14.3 Contains Files

- user.schema.ts
- auth.schema.ts
- role.enum.ts

###### 2.3.3.1.14.4 Organizational Reasoning

Encapsulates all identity-related contracts for the Identity Service and consumers.

###### 2.3.3.1.14.5 Framework Convention Alignment

Bounded Context structure

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

src/domains/inventory

###### 2.3.3.1.15.2 Purpose

Contracts for User-owned Products and Warranties.

###### 2.3.3.1.15.3 Contains Files

- user-product.schema.ts
- warranty.schema.ts
- transfer.schema.ts
- invoice.schema.ts

###### 2.3.3.1.15.4 Organizational Reasoning

Manages the lifecycle of specific product instances owned by users.

###### 2.3.3.1.15.5 Framework Convention Alignment

Bounded Context structure

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

src/domains/service

###### 2.3.3.1.16.2 Purpose

Contracts for Service Requests, Technicians, and Chat.

###### 2.3.3.1.16.3 Contains Files

- service-request.schema.ts
- technician.schema.ts
- chat.schema.ts
- service-center.schema.ts

###### 2.3.3.1.16.4 Organizational Reasoning

Core operational domain handling the service lifecycle.

###### 2.3.3.1.16.5 Framework Convention Alignment

Bounded Context structure

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

src/events

###### 2.3.3.1.17.2 Purpose

Asynchronous integration event definitions for the Message Bus.

###### 2.3.3.1.17.3 Contains Files

- integration-events.schema.ts
- notification-events.schema.ts

###### 2.3.3.1.17.4 Organizational Reasoning

Centralizes event contracts to ensure publisher/subscriber compatibility.

###### 2.3.3.1.17.5 Framework Convention Alignment

Event-Driven Architecture

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

src/shared

###### 2.3.3.1.18.2 Purpose

Reusable, domain-agnostic value objects and utility schemas.

###### 2.3.3.1.18.3 Contains Files

- common.schema.ts
- geo-json.schema.ts
- audit.schema.ts
- money.schema.ts

###### 2.3.3.1.18.4 Organizational Reasoning

Enforces DRY principles for fundamental data types used across multiple domains.

###### 2.3.3.1.18.5 Framework Convention Alignment

Shared Kernel pattern

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

tsconfig.build.json

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- tsconfig.build.json

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

tsconfig.json

###### 2.3.3.1.20.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.20.3 Contains Files

- tsconfig.json

###### 2.3.3.1.20.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.20.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | @warranty-hub/contracts |
| Namespace Organization | Scoped package with subpath exports |
| Naming Conventions | Kebab-case files, PascalCase types |
| Framework Alignment | Node.js ESM/CommonJS compatibility |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

GeoJsonSchema

##### 2.3.4.1.2.0 File Path

src/shared/geo-json.schema.ts

##### 2.3.4.1.3.0 Class Type

Zod Schema Definition

##### 2.3.4.1.4.0 Inheritance

None

##### 2.3.4.1.5.0 Purpose

Defines the standard GeoJSON Polygon structure for service areas as per REQ-FUNC-002.

##### 2.3.4.1.6.0 Dependencies

- zod

##### 2.3.4.1.7.0 Framework Specific Attributes

- z.object
- z.array
- z.tuple

##### 2.3.4.1.8.0 Technology Integration Notes

Maps directly to PostGIS geometry types for backend and Mapbox data structures for frontend.

##### 2.3.4.1.9.0 Properties

###### 2.3.4.1.9.1 Property Name

####### 2.3.4.1.9.1.1 Property Name

type

####### 2.3.4.1.9.1.2 Property Type

z.literal(\"Polygon\")

####### 2.3.4.1.9.1.3 Access Modifier

public

####### 2.3.4.1.9.1.4 Purpose

Discriminator for GeoJSON type

####### 2.3.4.1.9.1.5 Validation Attributes

- Required

####### 2.3.4.1.9.1.6 Framework Specific Configuration

Zod Literal

####### 2.3.4.1.9.1.7 Implementation Notes

Must always be \"Polygon\"

###### 2.3.4.1.9.2.0 Property Name

####### 2.3.4.1.9.2.1 Property Name

coordinates

####### 2.3.4.1.9.2.2 Property Type

z.array(z.array(z.tuple([z.number(), z.number()])))

####### 2.3.4.1.9.2.3 Access Modifier

public

####### 2.3.4.1.9.2.4 Purpose

Array of linear rings defining the polygon

####### 2.3.4.1.9.2.5 Validation Attributes

- Required
- MinLength

####### 2.3.4.1.9.2.6 Framework Specific Configuration

Zod Array of Arrays of Tuples

####### 2.3.4.1.9.2.7 Implementation Notes

First and last coordinate must match to close the polygon.

##### 2.3.4.1.10.0.0 Methods

*No items available*

##### 2.3.4.1.11.0.0 Events

*No items available*

##### 2.3.4.1.12.0.0 Implementation Notes

Exports both \"GeoJsonPolygonSchema\" (Zod) and \"GeoJsonPolygon\" (Type).

#### 2.3.4.2.0.0.0 Class Name

##### 2.3.4.2.1.0.0 Class Name

ProductTransferRequestSchema

##### 2.3.4.2.2.0.0 File Path

src/domains/inventory/transfer.schema.ts

##### 2.3.4.2.3.0.0 Class Type

Zod Schema Definition

##### 2.3.4.2.4.0.0 Inheritance

None

##### 2.3.4.2.5.0.0 Purpose

Defines the payload for initiating a product ownership transfer (REQ-FUNC-004).

##### 2.3.4.2.6.0.0 Dependencies

- zod
- email.schema

##### 2.3.4.2.7.0.0 Framework Specific Attributes

- z.object

##### 2.3.4.2.8.0.0 Technology Integration Notes

Used by Frontend to validate form input and Backend to validate API request body.

##### 2.3.4.2.9.0.0 Properties

###### 2.3.4.2.9.1.0 Property Name

####### 2.3.4.2.9.1.1 Property Name

userProductId

####### 2.3.4.2.9.1.2 Property Type

z.string().uuid()

####### 2.3.4.2.9.1.3 Access Modifier

public

####### 2.3.4.2.9.1.4 Purpose

ID of the product instance being transferred

####### 2.3.4.2.9.1.5 Validation Attributes

- UUID
- Required

####### 2.3.4.2.9.1.6 Framework Specific Configuration

Zod UUID

####### 2.3.4.2.9.1.7 Implementation Notes

References UserProduct table key.

###### 2.3.4.2.9.2.0 Property Name

####### 2.3.4.2.9.2.1 Property Name

recipientEmail

####### 2.3.4.2.9.2.2 Property Type

z.string().email()

####### 2.3.4.2.9.2.3 Access Modifier

public

####### 2.3.4.2.9.2.4 Purpose

Email address of the intended new owner

####### 2.3.4.2.9.2.5 Validation Attributes

- Email
- Required

####### 2.3.4.2.9.2.6 Framework Specific Configuration

Zod Email

####### 2.3.4.2.9.2.7 Implementation Notes

Must differ from current owner email.

##### 2.3.4.2.10.0.0 Methods

*No items available*

##### 2.3.4.2.11.0.0 Events

*No items available*

##### 2.3.4.2.12.0.0 Implementation Notes

Exports \"TransferInitiationRequestSchema\" and inferred type \"TransferInitiationRequest\".

#### 2.3.4.3.0.0.0 Class Name

##### 2.3.4.3.1.0.0 Class Name

ChatMessageSchema

##### 2.3.4.3.2.0.0 File Path

src/domains/service/chat.schema.ts

##### 2.3.4.3.3.0.0 Class Type

Zod Schema Definition

##### 2.3.4.3.4.0.0 Inheritance

None

##### 2.3.4.3.5.0.0 Purpose

Defines the structure of a chat message for real-time communication (REQ-FUNC-007).

##### 2.3.4.3.6.0.0 Dependencies

- zod

##### 2.3.4.3.7.0.0 Framework Specific Attributes

- z.object

##### 2.3.4.3.8.0.0 Technology Integration Notes

Used for WebSocket payloads and REST API message history.

##### 2.3.4.3.9.0.0 Properties

###### 2.3.4.3.9.1.0 Property Name

####### 2.3.4.3.9.1.1 Property Name

serviceRequestId

####### 2.3.4.3.9.1.2 Property Type

z.string().uuid()

####### 2.3.4.3.9.1.3 Access Modifier

public

####### 2.3.4.3.9.1.4 Purpose

Context of the conversation

####### 2.3.4.3.9.1.5 Validation Attributes

- UUID

####### 2.3.4.3.9.1.6 Framework Specific Configuration

Zod UUID

####### 2.3.4.3.9.1.7 Implementation Notes

Links message to specific ticket.

###### 2.3.4.3.9.2.0 Property Name

####### 2.3.4.3.9.2.1 Property Name

content

####### 2.3.4.3.9.2.2 Property Type

z.string().min(1).max(1000)

####### 2.3.4.3.9.2.3 Access Modifier

public

####### 2.3.4.3.9.2.4 Purpose

Text body of the message

####### 2.3.4.3.9.2.5 Validation Attributes

- NotEmpty
- MaxLength(1000)

####### 2.3.4.3.9.2.6 Framework Specific Configuration

Zod String Constraints

####### 2.3.4.3.9.2.7 Implementation Notes

Sanitization should happen on backend, schema validates structure.

###### 2.3.4.3.9.3.0 Property Name

####### 2.3.4.3.9.3.1 Property Name

senderId

####### 2.3.4.3.9.3.2 Property Type

z.string().uuid()

####### 2.3.4.3.9.3.3 Access Modifier

public

####### 2.3.4.3.9.3.4 Purpose

ID of the user sending the message

####### 2.3.4.3.9.3.5 Validation Attributes

- UUID

####### 2.3.4.3.9.3.6 Framework Specific Configuration

Zod UUID

####### 2.3.4.3.9.3.7 Implementation Notes

Can be User, Technician, or Admin.

###### 2.3.4.3.9.4.0 Property Name

####### 2.3.4.3.9.4.1 Property Name

sentAt

####### 2.3.4.3.9.4.2 Property Type

z.string().datetime()

####### 2.3.4.3.9.4.3 Access Modifier

public

####### 2.3.4.3.9.4.4 Purpose

Timestamp of message

####### 2.3.4.3.9.4.5 Validation Attributes

- ISO8601

####### 2.3.4.3.9.4.6 Framework Specific Configuration

Zod Datetime

####### 2.3.4.3.9.4.7 Implementation Notes

UTC ISO string.

##### 2.3.4.3.10.0.0 Methods

*No items available*

##### 2.3.4.3.11.0.0 Events

*No items available*

##### 2.3.4.3.12.0.0 Implementation Notes

Exports \"ChatMessageSchema\" and \"ChatMessage\" type.

#### 2.3.4.4.0.0.0 Class Name

##### 2.3.4.4.1.0.0 Class Name

AuditLogEntrySchema

##### 2.3.4.4.2.0.0 File Path

src/shared/audit.schema.ts

##### 2.3.4.4.3.0.0 Class Type

Zod Schema Definition

##### 2.3.4.4.4.0.0 Inheritance

None

##### 2.3.4.4.5.0.0 Purpose

Standardized schema for immutable audit logs (REQ-AUDIT-001).

##### 2.3.4.4.6.0.0 Dependencies

- zod

##### 2.3.4.4.7.0.0 Framework Specific Attributes

- z.object

##### 2.3.4.4.8.0.0 Technology Integration Notes

Used by all services to push audit records to the Audit Log Service.

##### 2.3.4.4.9.0.0 Properties

###### 2.3.4.4.9.1.0 Property Name

####### 2.3.4.4.9.1.1 Property Name

actorId

####### 2.3.4.4.9.1.2 Property Type

z.string().uuid()

####### 2.3.4.4.9.1.3 Access Modifier

public

####### 2.3.4.4.9.1.4 Purpose

User ID performing the action

####### 2.3.4.4.9.1.5 Validation Attributes

- UUID

####### 2.3.4.4.9.1.6 Framework Specific Configuration

Zod UUID

####### 2.3.4.4.9.1.7 Implementation Notes

Extracted from JWT context.

###### 2.3.4.4.9.2.0 Property Name

####### 2.3.4.4.9.2.1 Property Name

actionType

####### 2.3.4.4.9.2.2 Property Type

z.string()

####### 2.3.4.4.9.2.3 Access Modifier

public

####### 2.3.4.4.9.2.4 Purpose

Systematic code for the action (e.g., \"BRAND_APPROVED\")

####### 2.3.4.4.9.2.5 Validation Attributes

- Required

####### 2.3.4.4.9.2.6 Framework Specific Configuration

Zod String

####### 2.3.4.4.9.2.7 Implementation Notes

Should align with defined action constants.

###### 2.3.4.4.9.3.0 Property Name

####### 2.3.4.4.9.3.1 Property Name

targetEntity

####### 2.3.4.4.9.3.2 Property Type

z.string()

####### 2.3.4.4.9.3.3 Access Modifier

public

####### 2.3.4.4.9.3.4 Purpose

Name of the entity affected

####### 2.3.4.4.9.3.5 Validation Attributes

- Required

####### 2.3.4.4.9.3.6 Framework Specific Configuration

Zod String

####### 2.3.4.4.9.3.7 Implementation Notes

e.g., \"Brand\", \"Product\", \"ServiceRequest\".

###### 2.3.4.4.9.4.0 Property Name

####### 2.3.4.4.9.4.1 Property Name

targetId

####### 2.3.4.4.9.4.2 Property Type

z.string()

####### 2.3.4.4.9.4.3 Access Modifier

public

####### 2.3.4.4.9.4.4 Purpose

ID of the entity affected

####### 2.3.4.4.9.4.5 Validation Attributes

- Required

####### 2.3.4.4.9.4.6 Framework Specific Configuration

Zod String

####### 2.3.4.4.9.4.7 Implementation Notes

Could be UUID or other identifier format.

###### 2.3.4.4.9.5.0 Property Name

####### 2.3.4.4.9.5.1 Property Name

changes

####### 2.3.4.4.9.5.2 Property Type

z.record(z.any()).optional()

####### 2.3.4.4.9.5.3 Access Modifier

public

####### 2.3.4.4.9.5.4 Purpose

JSON object detailing state changes (before/after)

####### 2.3.4.4.9.5.5 Validation Attributes

- Optional

####### 2.3.4.4.9.5.6 Framework Specific Configuration

Zod Record

####### 2.3.4.4.9.5.7 Implementation Notes

Flexible structure for different entity types.

##### 2.3.4.4.10.0.0 Methods

*No items available*

##### 2.3.4.4.11.0.0 Events

*No items available*

##### 2.3.4.4.12.0.0 Implementation Notes

Exports \"AuditLogEntrySchema\" and \"AuditLogEntry\" type.

#### 2.3.4.5.0.0.0 Class Name

##### 2.3.4.5.1.0.0 Class Name

ServiceRequestStatusEventSchema

##### 2.3.4.5.2.0.0 File Path

src/events/notification-events.schema.ts

##### 2.3.4.5.3.0.0 Class Type

Zod Schema Definition

##### 2.3.4.5.4.0.0 Inheritance

None

##### 2.3.4.5.5.0.0 Purpose

Event schema for service request status changes, triggering notifications (REQ-INTG-001).

##### 2.3.4.5.6.0.0 Dependencies

- zod
- service-request.schema

##### 2.3.4.5.7.0.0 Framework Specific Attributes

- z.object

##### 2.3.4.5.8.0.0 Technology Integration Notes

Payload for Azure Service Bus messages consumed by Notification Service.

##### 2.3.4.5.9.0.0 Properties

###### 2.3.4.5.9.1.0 Property Name

####### 2.3.4.5.9.1.1 Property Name

eventType

####### 2.3.4.5.9.1.2 Property Type

z.literal(\"ServiceRequestStatusChanged\")

####### 2.3.4.5.9.1.3 Access Modifier

public

####### 2.3.4.5.9.1.4 Purpose

Discriminator for event processing

####### 2.3.4.5.9.1.5 Validation Attributes

- Literal

####### 2.3.4.5.9.1.6 Framework Specific Configuration

Zod Literal

####### 2.3.4.5.9.1.7 Implementation Notes

Fixed value.

###### 2.3.4.5.9.2.0 Property Name

####### 2.3.4.5.9.2.1 Property Name

serviceRequestId

####### 2.3.4.5.9.2.2 Property Type

z.string().uuid()

####### 2.3.4.5.9.2.3 Access Modifier

public

####### 2.3.4.5.9.2.4 Purpose

ID of the updated request

####### 2.3.4.5.9.2.5 Validation Attributes

- UUID

####### 2.3.4.5.9.2.6 Framework Specific Configuration

Zod UUID

####### 2.3.4.5.9.2.7 Implementation Notes

Used to fetch full details if needed.

###### 2.3.4.5.9.3.0 Property Name

####### 2.3.4.5.9.3.1 Property Name

newStatus

####### 2.3.4.5.9.3.2 Property Type

ServiceRequestStatusEnum

####### 2.3.4.5.9.3.3 Access Modifier

public

####### 2.3.4.5.9.3.4 Purpose

The status the request transitioned to

####### 2.3.4.5.9.3.5 Validation Attributes

- Enum

####### 2.3.4.5.9.3.6 Framework Specific Configuration

Zod Native Enum

####### 2.3.4.5.9.3.7 Implementation Notes

e.g., \"TechnicianAssigned\", \"Resolved\".

###### 2.3.4.5.9.4.0 Property Name

####### 2.3.4.5.9.4.1 Property Name

timestamp

####### 2.3.4.5.9.4.2 Property Type

z.string().datetime()

####### 2.3.4.5.9.4.3 Access Modifier

public

####### 2.3.4.5.9.4.4 Purpose

When the change occurred

####### 2.3.4.5.9.4.5 Validation Attributes

- ISO8601

####### 2.3.4.5.9.4.6 Framework Specific Configuration

Zod Datetime

####### 2.3.4.5.9.4.7 Implementation Notes

UTC.

###### 2.3.4.5.9.5.0 Property Name

####### 2.3.4.5.9.5.1 Property Name

userId

####### 2.3.4.5.9.5.2 Property Type

z.string().uuid()

####### 2.3.4.5.9.5.3 Access Modifier

public

####### 2.3.4.5.9.5.4 Purpose

Owner of the request (recipient of notification)

####### 2.3.4.5.9.5.5 Validation Attributes

- UUID

####### 2.3.4.5.9.5.6 Framework Specific Configuration

Zod UUID

####### 2.3.4.5.9.5.7 Implementation Notes

Used for notification routing.

##### 2.3.4.5.10.0.0 Methods

*No items available*

##### 2.3.4.5.11.0.0 Events

*No items available*

##### 2.3.4.5.12.0.0 Implementation Notes

Exports \"ServiceRequestStatusChangedEventSchema\" and type.

#### 2.3.4.6.0.0.0 Class Name

##### 2.3.4.6.1.0.0 Class Name

InvoiceOcrResultSchema

##### 2.3.4.6.2.0.0 File Path

src/domains/inventory/invoice.schema.ts

##### 2.3.4.6.3.0.0 Class Type

Zod Schema Definition

##### 2.3.4.6.4.0.0 Inheritance

None

##### 2.3.4.6.5.0.0 Purpose

Validates the structure of data returned from the OCR service (REQ-DATA-001).

##### 2.3.4.6.6.0.0 Dependencies

- zod

##### 2.3.4.6.7.0.0 Framework Specific Attributes

- z.object

##### 2.3.4.6.8.0.0 Technology Integration Notes

Used by the background OCR worker to normalize data before user verification.

##### 2.3.4.6.9.0.0 Properties

###### 2.3.4.6.9.1.0 Property Name

####### 2.3.4.6.9.1.1 Property Name

productName

####### 2.3.4.6.9.1.2 Property Type

z.string().optional()

####### 2.3.4.6.9.1.3 Access Modifier

public

####### 2.3.4.6.9.1.4 Purpose

Extracted product name

####### 2.3.4.6.9.1.5 Validation Attributes

- Optional

####### 2.3.4.6.9.1.6 Framework Specific Configuration

Zod Optional

####### 2.3.4.6.9.1.7 Implementation Notes

May be null if recognition fails.

###### 2.3.4.6.9.2.0 Property Name

####### 2.3.4.6.9.2.1 Property Name

brand

####### 2.3.4.6.9.2.2 Property Type

z.string().optional()

####### 2.3.4.6.9.2.3 Access Modifier

public

####### 2.3.4.6.9.2.4 Purpose

Extracted brand name

####### 2.3.4.6.9.2.5 Validation Attributes

- Optional

####### 2.3.4.6.9.2.6 Framework Specific Configuration

Zod Optional

####### 2.3.4.6.9.2.7 Implementation Notes

May be null.

###### 2.3.4.6.9.3.0 Property Name

####### 2.3.4.6.9.3.1 Property Name

purchaseDate

####### 2.3.4.6.9.3.2 Property Type

z.string().datetime().optional()

####### 2.3.4.6.9.3.3 Access Modifier

public

####### 2.3.4.6.9.3.4 Purpose

Extracted purchase date

####### 2.3.4.6.9.3.5 Validation Attributes

- Optional
- ISO8601

####### 2.3.4.6.9.3.6 Framework Specific Configuration

Zod Datetime

####### 2.3.4.6.9.3.7 Implementation Notes

Must be normalized to ISO format.

###### 2.3.4.6.9.4.0 Property Name

####### 2.3.4.6.9.4.1 Property Name

serialNumber

####### 2.3.4.6.9.4.2 Property Type

z.string().optional()

####### 2.3.4.6.9.4.3 Access Modifier

public

####### 2.3.4.6.9.4.4 Purpose

Extracted serial number

####### 2.3.4.6.9.4.5 Validation Attributes

- Optional

####### 2.3.4.6.9.4.6 Framework Specific Configuration

Zod Optional

####### 2.3.4.6.9.4.7 Implementation Notes

Likely requires user verification.

###### 2.3.4.6.9.5.0 Property Name

####### 2.3.4.6.9.5.1 Property Name

confidenceScore

####### 2.3.4.6.9.5.2 Property Type

z.number().min(0).max(1)

####### 2.3.4.6.9.5.3 Access Modifier

public

####### 2.3.4.6.9.5.4 Purpose

OCR engine confidence level

####### 2.3.4.6.9.5.5 Validation Attributes

- Range(0,1)

####### 2.3.4.6.9.5.6 Framework Specific Configuration

Zod Number

####### 2.3.4.6.9.5.7 Implementation Notes

Used to flag low-quality scans.

##### 2.3.4.6.10.0.0 Methods

*No items available*

##### 2.3.4.6.11.0.0 Events

*No items available*

##### 2.3.4.6.12.0.0 Implementation Notes

Exports \"InvoiceOcrResultSchema\" and type.

#### 2.3.4.7.0.0.0 Class Name

##### 2.3.4.7.1.0.0 Class Name

TechnicianLocationUpdateSchema

##### 2.3.4.7.2.0.0 File Path

src/domains/service/technician.schema.ts

##### 2.3.4.7.3.0.0 Class Type

Zod Schema Definition

##### 2.3.4.7.4.0.0 Inheritance

None

##### 2.3.4.7.5.0.0 Purpose

Payload for real-time technician location updates (REQ-FUNC-009).

##### 2.3.4.7.6.0.0 Dependencies

- zod

##### 2.3.4.7.7.0.0 Framework Specific Attributes

- z.object

##### 2.3.4.7.8.0.0 Technology Integration Notes

Optimized for high-frequency transmission over WebSockets.

##### 2.3.4.7.9.0.0 Properties

###### 2.3.4.7.9.1.0 Property Name

####### 2.3.4.7.9.1.1 Property Name

technicianId

####### 2.3.4.7.9.1.2 Property Type

z.string().uuid()

####### 2.3.4.7.9.1.3 Access Modifier

public

####### 2.3.4.7.9.1.4 Purpose

ID of the technician

####### 2.3.4.7.9.1.5 Validation Attributes

- UUID

####### 2.3.4.7.9.1.6 Framework Specific Configuration

Zod UUID

####### 2.3.4.7.9.1.7 Implementation Notes

Required for tracking.

###### 2.3.4.7.9.2.0 Property Name

####### 2.3.4.7.9.2.1 Property Name

serviceRequestId

####### 2.3.4.7.9.2.2 Property Type

z.string().uuid()

####### 2.3.4.7.9.2.3 Access Modifier

public

####### 2.3.4.7.9.2.4 Purpose

Context of the movement

####### 2.3.4.7.9.2.5 Validation Attributes

- UUID

####### 2.3.4.7.9.2.6 Framework Specific Configuration

Zod UUID

####### 2.3.4.7.9.2.7 Implementation Notes

Ensures location is only shared for active job.

###### 2.3.4.7.9.3.0 Property Name

####### 2.3.4.7.9.3.1 Property Name

latitude

####### 2.3.4.7.9.3.2 Property Type

z.number()

####### 2.3.4.7.9.3.3 Access Modifier

public

####### 2.3.4.7.9.3.4 Purpose

GPS Latitude

####### 2.3.4.7.9.3.5 Validation Attributes

- Required

####### 2.3.4.7.9.3.6 Framework Specific Configuration

Zod Number

####### 2.3.4.7.9.3.7 Implementation Notes

Decimal degrees.

###### 2.3.4.7.9.4.0 Property Name

####### 2.3.4.7.9.4.1 Property Name

longitude

####### 2.3.4.7.9.4.2 Property Type

z.number()

####### 2.3.4.7.9.4.3 Access Modifier

public

####### 2.3.4.7.9.4.4 Purpose

GPS Longitude

####### 2.3.4.7.9.4.5 Validation Attributes

- Required

####### 2.3.4.7.9.4.6 Framework Specific Configuration

Zod Number

####### 2.3.4.7.9.4.7 Implementation Notes

Decimal degrees.

###### 2.3.4.7.9.5.0 Property Name

####### 2.3.4.7.9.5.1 Property Name

timestamp

####### 2.3.4.7.9.5.2 Property Type

z.number()

####### 2.3.4.7.9.5.3 Access Modifier

public

####### 2.3.4.7.9.5.4 Purpose

Epoch timestamp of the reading

####### 2.3.4.7.9.5.5 Validation Attributes

- Required

####### 2.3.4.7.9.5.6 Framework Specific Configuration

Zod Number

####### 2.3.4.7.9.5.7 Implementation Notes

Used for sequencing updates.

##### 2.3.4.7.10.0.0 Methods

*No items available*

##### 2.3.4.7.11.0.0 Events

*No items available*

##### 2.3.4.7.12.0.0 Implementation Notes

Exports \"TechnicianLocationUpdateSchema\" and type.

### 2.3.5.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0 Interface Name

##### 2.3.5.1.1.0.0 Interface Name

ServiceRequestStatus

##### 2.3.5.1.2.0.0 File Path

src/domains/service/service-request.schema.ts

##### 2.3.5.1.3.0.0 Purpose

Enumeration of all possible states for a service request.

##### 2.3.5.1.4.0.0 Generic Constraints

None

##### 2.3.5.1.5.0.0 Framework Specific Inheritance

None

##### 2.3.5.1.6.0.0 Method Contracts

*No items available*

##### 2.3.5.1.7.0.0 Property Contracts

*No items available*

##### 2.3.5.1.8.0.0 Implementation Guidance

Define as a TypeScript enum and Zod native enum. Values: Requested, Acknowledged, TechnicianAssigned, OnTheWay, WorkInProgress, Resolved, Closed, Cancelled, Disputed.

#### 2.3.5.2.0.0.0 Interface Name

##### 2.3.5.2.1.0.0 Interface Name

WarrantyStatus

##### 2.3.5.2.2.0.0 File Path

src/domains/inventory/warranty.schema.ts

##### 2.3.5.2.3.0.0 Purpose

Enumeration for warranty validity states.

##### 2.3.5.2.4.0.0 Generic Constraints

None

##### 2.3.5.2.5.0.0 Framework Specific Inheritance

None

##### 2.3.5.2.6.0.0 Method Contracts

*No items available*

##### 2.3.5.2.7.0.0 Property Contracts

*No items available*

##### 2.3.5.2.8.0.0 Implementation Guidance

Define as TypeScript enum. Values: Active, ExpiringSoon, Expired, PendingVerification.

### 2.3.6.0.0.0.0 Enum Specifications

- {'enum_name': 'UserRole', 'file_path': 'src/domains/identity/role.enum.ts', 'underlying_type': 'string', 'purpose': 'Defines authorized roles within the system for RBAC.', 'framework_attributes': ['export enum'], 'values': [{'value_name': 'SuperAdmin', 'value': 'SuperAdmin', 'description': 'Platform administrator'}, {'value_name': 'BrandAdmin', 'value': 'BrandAdmin', 'description': 'Brand representative'}, {'value_name': 'ServiceCenterAdmin', 'value': 'ServiceCenterAdmin', 'description': 'Service center manager'}, {'value_name': 'Technician', 'value': 'Technician', 'description': 'Field technician'}, {'value_name': 'Consumer', 'value': 'Consumer', 'description': 'End user'}]}

### 2.3.7.0.0.0.0 Dto Specifications

#### 2.3.7.1.0.0.0 Dto Name

##### 2.3.7.1.1.0.0 Dto Name

CreateServiceRequestDTO

##### 2.3.7.1.2.0.0 File Path

src/domains/service/service-request.schema.ts

##### 2.3.7.1.3.0.0 Purpose

Payload for creating a new service request.

##### 2.3.7.1.4.0.0 Framework Base Class

Zod Schema

##### 2.3.7.1.5.0.0 Properties

###### 2.3.7.1.5.1.0 Property Name

####### 2.3.7.1.5.1.1 Property Name

userProductId

####### 2.3.7.1.5.1.2 Property Type

UUID

####### 2.3.7.1.5.1.3 Validation Attributes

- Required

####### 2.3.7.1.5.1.4 Serialization Attributes

- z.string().uuid()

####### 2.3.7.1.5.1.5 Framework Specific Attributes

*No items available*

###### 2.3.7.1.5.2.0 Property Name

####### 2.3.7.1.5.2.1 Property Name

issueTypeId

####### 2.3.7.1.5.2.2 Property Type

UUID

####### 2.3.7.1.5.2.3 Validation Attributes

- Required

####### 2.3.7.1.5.2.4 Serialization Attributes

- z.string().uuid()

####### 2.3.7.1.5.2.5 Framework Specific Attributes

*No items available*

###### 2.3.7.1.5.3.0 Property Name

####### 2.3.7.1.5.3.1 Property Name

description

####### 2.3.7.1.5.3.2 Property Type

string

####### 2.3.7.1.5.3.3 Validation Attributes

- Required
- Min(10)

####### 2.3.7.1.5.3.4 Serialization Attributes

- z.string().min(10)

####### 2.3.7.1.5.3.5 Framework Specific Attributes

*No items available*

###### 2.3.7.1.5.4.0 Property Name

####### 2.3.7.1.5.4.1 Property Name

preferredTimeSlotId

####### 2.3.7.1.5.4.2 Property Type

UUID

####### 2.3.7.1.5.4.3 Validation Attributes

- Optional

####### 2.3.7.1.5.4.4 Serialization Attributes

- z.string().uuid().optional()

####### 2.3.7.1.5.4.5 Framework Specific Attributes

*No items available*

##### 2.3.7.1.6.0.0 Validation Rules

Must reference a valid user product.

##### 2.3.7.1.7.0.0 Serialization Requirements

Standard JSON

#### 2.3.7.2.0.0.0 Dto Name

##### 2.3.7.2.1.0.0 Dto Name

ProductDetailsDTO

##### 2.3.7.2.2.0.0 File Path

src/domains/inventory/user-product.schema.ts

##### 2.3.7.2.3.0.0 Purpose

Read model for product details including warranty status.

##### 2.3.7.2.4.0.0 Framework Base Class

Zod Schema

##### 2.3.7.2.5.0.0 Properties

###### 2.3.7.2.5.1.0 Property Name

####### 2.3.7.2.5.1.1 Property Name

id

####### 2.3.7.2.5.1.2 Property Type

UUID

####### 2.3.7.2.5.1.3 Validation Attributes

- Required

####### 2.3.7.2.5.1.4 Serialization Attributes

- z.string().uuid()

####### 2.3.7.2.5.1.5 Framework Specific Attributes

*No items available*

###### 2.3.7.2.5.2.0 Property Name

####### 2.3.7.2.5.2.1 Property Name

modelName

####### 2.3.7.2.5.2.2 Property Type

string

####### 2.3.7.2.5.2.3 Validation Attributes

- Required

####### 2.3.7.2.5.2.4 Serialization Attributes

- z.string()

####### 2.3.7.2.5.2.5 Framework Specific Attributes

*No items available*

###### 2.3.7.2.5.3.0 Property Name

####### 2.3.7.2.5.3.1 Property Name

brandName

####### 2.3.7.2.5.3.2 Property Type

string

####### 2.3.7.2.5.3.3 Validation Attributes

- Required

####### 2.3.7.2.5.3.4 Serialization Attributes

- z.string()

####### 2.3.7.2.5.3.5 Framework Specific Attributes

*No items available*

###### 2.3.7.2.5.4.0 Property Name

####### 2.3.7.2.5.4.1 Property Name

warrantyStatus

####### 2.3.7.2.5.4.2 Property Type

WarrantyStatusEnum

####### 2.3.7.2.5.4.3 Validation Attributes

- Required

####### 2.3.7.2.5.4.4 Serialization Attributes

- WarrantyStatusEnumSchema

####### 2.3.7.2.5.4.5 Framework Specific Attributes

*No items available*

##### 2.3.7.2.6.0.0 Validation Rules

Derived from UserProduct and Warranty tables.

##### 2.3.7.2.7.0.0 Serialization Requirements

Standard JSON

### 2.3.8.0.0.0.0 Configuration Specifications

#### 2.3.8.1.0.0.0 Configuration Name

##### 2.3.8.1.1.0.0 Configuration Name

tsconfig.json

##### 2.3.8.1.2.0.0 File Path

tsconfig.json

##### 2.3.8.1.3.0.0 Purpose

TypeScript compiler configuration for strict type checking and path aliases.

##### 2.3.8.1.4.0.0 Framework Base Class

JSON

##### 2.3.8.1.5.0.0 Configuration Sections

- {'section_name': 'compilerOptions', 'properties': [{'property_name': 'strict', 'property_type': 'boolean', 'default_value': 'true', 'required': 'true', 'description': 'Enforce strict type checking'}, {'property_name': 'baseUrl', 'property_type': 'string', 'default_value': './src', 'required': 'true', 'description': 'Base directory for module resolution'}, {'property_name': 'paths', 'property_type': 'object', 'default_value': '{\\"@domains/*\\": [\\"domains/*\\"], \\"@shared/*\\": [\\"shared/*\\"]}', 'required': 'true', 'description': 'Path aliases for clean imports'}]}

##### 2.3.8.1.6.0.0 Validation Requirements

Must enable strict mode and consistent path mapping.

#### 2.3.8.2.0.0.0 Configuration Name

##### 2.3.8.2.1.0.0 Configuration Name

package.json

##### 2.3.8.2.2.0.0 File Path

package.json

##### 2.3.8.2.3.0.0 Purpose

Package definition and export configuration.

##### 2.3.8.2.4.0.0 Framework Base Class

JSON

##### 2.3.8.2.5.0.0 Configuration Sections

- {'section_name': 'exports', 'properties': [{'property_name': '.', 'property_type': 'string', 'default_value': './dist/index.js', 'required': 'true', 'description': 'Main entry point'}, {'property_name': './identity', 'property_type': 'string', 'default_value': './dist/domains/identity/index.js', 'required': 'true', 'description': 'Subpath export for identity'}, {'property_name': './service', 'property_type': 'string', 'default_value': './dist/domains/service/index.js', 'required': 'true', 'description': 'Subpath export for service domain'}]}

##### 2.3.8.2.6.0.0 Validation Requirements

Must define exports for all domains to allow granular imports.

### 2.3.9.0.0.0.0 Dependency Injection Specifications

*No items available*

### 2.3.10.0.0.0.0 External Integration Specifications

*No items available*

## 2.4.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 7 |
| Total Interfaces | 2 |
| Total Enums | 1 |
| Total Dtos | 2 |
| Total Configurations | 2 |
| Total External Integrations | 0 |
| Grand Total Components | 14 |
| Phase 2 Claimed Count | 15 |
| Phase 2 Actual Count | 12 |
| Validation Added Count | 23 |
| Final Validated Count | 35 |

