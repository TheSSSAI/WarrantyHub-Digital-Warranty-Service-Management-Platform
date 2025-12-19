# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-CL-010 |
| Extraction Timestamp | 2025-05-24T10:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-DATA-001

#### 1.2.1.2 Requirement Text

The system shall process uploaded invoice images and PDFs using an Optical Character Recognition (OCR) service...

#### 1.2.1.3 Validation Criteria

- Verify that the user must explicitly confirm or edit the OCR-extracted data.

#### 1.2.1.4 Implementation Implications

- Define 'InvoiceOcrResultSchema' with optional fields for partial extraction
- Define 'ProductRegistrationSchema' that merges OCR data with user input

#### 1.2.1.5 Extraction Reasoning

The contract must handle the fuzzy nature of OCR (nullable fields) and the strict requirements of final registration (REQ-DATA-001).

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-FUNC-002

#### 1.2.2.2 Requirement Text

The system shall provide an interface for a Super Admin to define a service center's geographic service area by inputting a list of postal codes and drawing a geofenced polygon on a map.

#### 1.2.2.3 Validation Criteria

- Verify that the interface allows for drawing a polygon on an integrated map.

#### 1.2.2.4 Implementation Implications

- Define 'GeoJSONPolygonSchema' using Zod to validate coordinate arrays and closed loops
- Define 'ServiceAreaDTO' combining postal codes and geometry

#### 1.2.2.5 Extraction Reasoning

Complex spatial data types need rigorous validation logic encapsulated in the schema shared between the Admin UI and the Service Center Service.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-FUNC-007

#### 1.2.3.2 Requirement Text

The system shall provide a real-time, two-way chat interface within each service request ticket...

#### 1.2.3.3 Validation Criteria

- Verify that a user can send a message and it is visible to the assigned service center admin and technician.

#### 1.2.3.4 Implementation Implications

- Define 'ChatMessageSchema' for WebSocket payloads
- Define 'ChatHistoryDTO' for REST API retrieval

#### 1.2.3.5 Extraction Reasoning

Real-time chat requires a strict message contract shared between Mobile Apps, Web Portals, and the Backend Service Request Service.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-AUDIT-001

#### 1.2.4.2 Requirement Text

The system must record all critical actions in an immutable audit trail...

#### 1.2.4.3 Validation Criteria

- Verify that audit logs are stored in a secure, tamper-proof storage system.

#### 1.2.4.4 Implementation Implications

- Define a standardized 'AuditLogEntrySchema' containing actor, action, target, and changes

#### 1.2.4.5 Extraction Reasoning

A unified schema ensures consistent logging across all distributed microservices for compliance.

### 1.2.5.0 Requirement Id

#### 1.2.5.1 Requirement Id

REQ-PERF-002

#### 1.2.5.2 Requirement Text

The end-to-end latency for a technician's GPS location update... must be less than 2 seconds.

#### 1.2.5.3 Validation Criteria

- Verify that WebSockets are used for real-time communication to minimize latency.

#### 1.2.5.4 Implementation Implications

- Define lightweight 'TechnicianLocationUpdateSchema' for high-frequency transmission

#### 1.2.5.5 Extraction Reasoning

High-frequency geospatial data needs lightweight but strict validation to prevent processing corrupt location packets.

## 1.3.0.0 Relevant Components

- {'component_name': 'Shared Contract Library', 'component_specification': 'A centralized NPM package containing Zod schemas, TypeScript types, and OpenAPI definitions used by all services and clients.', 'implementation_requirements': ['Must export Zod schemas for runtime validation', 'Must export inferred TypeScript types for static analysis', 'Must generate OpenAPI specs for API Gateway configuration'], 'architectural_context': 'Shared Kernel', 'extraction_reasoning': 'This component acts as the semantic glue for the microservices architecture, ensuring protocol compliance.'}

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Shared Kernel', 'layer_responsibilities': 'Definition of ubiquitous language, data structures, and validation rules shared across the entire system.', 'layer_constraints': ['Must have zero runtime dependencies on backend infrastructure (databases, etc.)', 'Must be versioned semantically'], 'implementation_patterns': ['Schema-First Design', 'Code-First OpenAPI Generation'], 'extraction_reasoning': 'This repository sits at the core of the dependency graph, depended upon by Presentation, Application, and Domain layers of other services.'}

## 1.5.0.0 Dependency Interfaces

*No items available*

## 1.6.0.0 Exposed Interfaces

### 1.6.1.0 Interface Name

#### 1.6.1.1 Interface Name

Product & Inventory Contracts

#### 1.6.1.2 Consumer Repositories

- REPO-BS-002
- REPO-FE-002
- REPO-FE-003
- REPO-BW-009

#### 1.6.1.3 Method Contracts

##### 1.6.1.3.1 Method Name

###### 1.6.1.3.1.1 Method Name

ProductRegistrationSchema

###### 1.6.1.3.1.2 Method Signature

z.object({ serialNumber: z.string(), purchaseDate: z.date(), modelId: z.uuid() })

###### 1.6.1.3.1.3 Method Purpose

Validates payload for registering a new product.

###### 1.6.1.3.1.4 Implementation Requirements

Must handle both manual entry and OCR-merged data.

##### 1.6.1.3.2.0 Method Name

###### 1.6.1.3.2.1 Method Name

ProductTransferRequestSchema

###### 1.6.1.3.2.2 Method Signature

z.object({ recipientEmail: z.string().email(), productId: z.uuid() })

###### 1.6.1.3.2.3 Method Purpose

Validates request to transfer ownership (REQ-FUNC-004).

###### 1.6.1.3.2.4 Implementation Requirements

Strict email validation required.

#### 1.6.1.4.0.0 Service Level Requirements

- Validation < 5ms CPU time

#### 1.6.1.5.0.0 Implementation Constraints

- Must be JSON-serializable

#### 1.6.1.6.0.0 Extraction Reasoning

Defines the data shape for the core Product domain.

### 1.6.2.0.0.0 Interface Name

#### 1.6.2.1.0.0 Interface Name

Service & Operation Contracts

#### 1.6.2.2.0.0 Consumer Repositories

- REPO-BS-003
- REPO-BS-004
- REPO-BS-005
- REPO-FE-002
- REPO-FE-003

#### 1.6.2.3.0.0 Method Contracts

##### 1.6.2.3.1.0 Method Name

###### 1.6.2.3.1.1 Method Name

ServiceRequestCreateSchema

###### 1.6.2.3.1.2 Method Signature

z.object({ issueType: z.uuid(), description: z.string(), mediaUrls: z.array(z.string().url()) })

###### 1.6.2.3.1.3 Method Purpose

Validates creation of a service ticket.

###### 1.6.2.3.1.4 Implementation Requirements

Enforce media array limits.

##### 1.6.2.3.2.0 Method Name

###### 1.6.2.3.2.1 Method Name

GeoJsonPolygonSchema

###### 1.6.2.3.2.2 Method Signature

z.object({ type: 'Polygon', coordinates: z.array(z.array(z.tuple([number, number]))) })

###### 1.6.2.3.2.3 Method Purpose

Validates service area geofences (REQ-FUNC-002).

###### 1.6.2.3.2.4 Implementation Requirements

Must enforce closed loop (first and last coordinate match).

##### 1.6.2.3.3.0 Method Name

###### 1.6.2.3.3.1 Method Name

ChatMessageSchema

###### 1.6.2.3.3.2 Method Signature

z.object({ ticketId: z.uuid(), content: z.string(), senderId: z.uuid() })

###### 1.6.2.3.3.3 Method Purpose

Validates real-time chat messages (REQ-FUNC-007).

###### 1.6.2.3.3.4 Implementation Requirements

Used in WebSocket payloads.

#### 1.6.2.4.0.0 Service Level Requirements

- Zero dependency overhead

#### 1.6.2.5.0.0 Implementation Constraints

- Compatible with PostGIS and Mongo schemas

#### 1.6.2.6.0.0 Extraction Reasoning

Defines the operational data structures for Service Centers and Requests.

### 1.6.3.0.0.0 Interface Name

#### 1.6.3.1.0.0 Interface Name

Integration Event Contracts

#### 1.6.3.2.0.0 Consumer Repositories

- REPO-BS-006
- REPO-BW-008
- REPO-GW-013

#### 1.6.3.3.0.0 Method Contracts

##### 1.6.3.3.1.0 Method Name

###### 1.6.3.3.1.1 Method Name

AuditLogEntrySchema

###### 1.6.3.3.1.2 Method Signature

z.object({ actorId: z.uuid(), action: z.string(), target: z.string(), changes: z.record(z.any()) })

###### 1.6.3.3.1.3 Method Purpose

Standardizes audit logs for REQ-AUDIT-001.

###### 1.6.3.3.1.4 Implementation Requirements

Flexible 'changes' field for polymorphic data.

##### 1.6.3.3.2.0 Method Name

###### 1.6.3.3.2.1 Method Name

NotificationEventSchema

###### 1.6.3.3.2.2 Method Signature

z.object({ userId: z.uuid(), type: NotificationTypeEnum, payload: z.record(z.any()) })

###### 1.6.3.3.2.3 Method Purpose

Standardizes async notification triggers (REQ-INTG-001).

###### 1.6.3.3.2.4 Implementation Requirements

Must support deep-linking metadata.

#### 1.6.3.4.0.0 Service Level Requirements

- High Schema Stability

#### 1.6.3.5.0.0 Implementation Constraints

- CloudEvents compliant structure

#### 1.6.3.6.0.0 Extraction Reasoning

Ensures reliable asynchronous communication between microservices.

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

TypeScript 5.x, Zod 3.x

### 1.7.2.0.0.0 Integration Technologies

- OpenAPI 3.0 Generator
- JSON Schema

### 1.7.3.0.0.0 Performance Constraints

Validation logic must be tree-shakeable and lightweight to minimize frontend bundle size and backend CPU usage.

### 1.7.4.0.0.0 Security Requirements

Schemas must enforce strict typing to prevent Prototype Pollution and Mass Assignment vulnerabilities. Sensitive fields (passwords) must be handled with specific schema rules.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | 100% - All functional requirements involving data ... |
| Cross Reference Validation | Validated against backend service requirements (Po... |
| Implementation Readiness Assessment | High - Technology choices (Zod) and structure (Dom... |
| Quality Assurance Confirmation | The contracts library provides the necessary 'glue... |

