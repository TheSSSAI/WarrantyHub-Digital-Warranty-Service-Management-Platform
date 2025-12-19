# 1 Id

REPO-BS-002

# 2 Name

product-service

# 3 Description

This service is the core of the product and warranty management domain. It is responsible for all logic related to Brands, Product Models, User-owned Products, digital warranty cards, and ownership transfers. Decomposed from `warranty-hub-backend`, this service encapsulates the entire lifecycle of a product within the platform, from registration to transfer or deletion. It manages the product catalog, calculates warranty expiry dates, and handles the business rules for locking product details (REQ-BR-001). It also acts as the trigger point for invoice processing by publishing an event for the OCR worker. This separation allows the product domain to evolve independently, for example, by adding new product attributes or warranty types, without impacting the service request process.

# 4 Type

🔹 Business Logic

# 5 Namespace

WarrantyHub.Services.Product

# 6 Output Path

services/product

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, PostgreSQL

# 10 Thirdparty Libraries

- pg

# 11 Layer Ids

- service-layer

# 12 Dependencies

- REPO-CL-010
- REPO-SL-011

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

3.2 User Product Registration

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

3.3 Digital Warranty Card

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Microservice

# 17.0.0 Architecture Map

- product-service-003

# 18.0.0 Components Map

- product-service-003

# 19.0.0 Requirements Map

- REQ-FUNC-004
- REQ-FUNC-005
- REQ-BR-001
- REQ-DATA-001

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

NEW_DECOMPOSED

## 20.2.0 Source Repository

REPO-BK-001

## 20.3.0 Decomposition Reasoning

Separated to create a clear boundary around the Product & Warranty bounded context. This allows for focused development on product-related features and provides a clear ownership model for the product data schema. Its performance and scaling needs may differ from the service request system.

## 20.4.0 Extracted Responsibilities

- CRUD operations for Brands, Models, and UserProducts
- Warranty expiry calculation
- Ownership transfer logic
- Triggering invoice OCR processing

## 20.5.0 Reusability Scope

- Provides a centralized API for product data, consumed by both the Service Request service and frontend clients.

## 20.6.0 Development Benefits

- Product team can iterate on features without creating merge conflicts with other service teams.
- Independent scaling and database optimization for product catalog data.

# 21.0.0 Dependency Contracts

*No data available*

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'IProductApi', 'methods': ['GET /products/{id} : ProductDetailsDto', 'POST /products(CreateProductDto) : ProductDetailsDto', 'POST /products/{id}/transfer(TransferRequestDto) : void'], 'events': ['InvoiceUploadedForProcessing(invoiceId, fileUrl)', 'WarrantyExpiring(productId, userId)'], 'properties': [], 'consumers': ['REPO-BS-004', 'REPO-FE-002', 'REPO-FE-003']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Standard NestJS dependency injection. |
| Event Communication | Publishes events to Azure Service Bus when invoice... |
| Data Flow | Manages all writes to the Product, Brand, Model, a... |
| Error Handling | Uses standard HTTP status codes for API responses. |
| Async Patterns | Async/await for all database interactions and even... |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Use TypeORM or Prisma for data access. Implement r... |
| Performance Considerations | Index frequently queried columns like serial_numbe... |
| Security Considerations | Ensure users can only access and manage their own ... |
| Testing Approach | Unit tests for business logic (e.g., warranty calc... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- All aspects of product registration, warranty cards, and ownership.

## 25.2.0 Must Not Implement

- Service request logic, user authentication, technician management.

## 25.3.0 Extension Points

- Support for different types of warranties (e.g., extended, accidental damage).

## 25.4.0 Validation Rules

- Validate serial number format against brand-specific regex.
- Ensure purchase date is not in the future.

