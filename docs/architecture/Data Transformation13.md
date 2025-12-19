# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- .NET 8
- React 18
- Flutter 3.19+
- PostgreSQL with PostGIS
- Azure Service Bus

## 1.3 Service Interfaces

- RESTful APIs (via API Gateway)
- Asynchronous Messaging (via Azure Service Bus)

## 1.4 Data Models

- Domain Entities (EF Core)
- Data Transfer Objects (DTOs)
- Message Payloads (JSON)
- View Models (Client-side)

# 2.0 Data Mapping Strategy

## 2.1 Essential Mappings

### 2.1.1 Mapping Id

#### 2.1.1.1 Mapping Id

MAPPING-001

#### 2.1.1.2 Source

CSV Row (Bulk Import)

#### 2.1.1.3 Target

ProductModel Entity

#### 2.1.1.4 Transformation

direct

#### 2.1.1.5 Configuration

##### 2.1.1.5.1 Header Mapping

| Property | Value |
|----------|-------|
| Brand Name | BrandId (lookup required) |
| Model Number | modelNumber |
| Model Name | name |
| Warranty (months) | defaultWarrantyMonths |

#### 2.1.1.6.0 Mapping Technique

Row-by-row parsing and object instantiation.

#### 2.1.1.7.0 Justification

Required for REQ-FUNC-012, which mandates a bulk import mechanism for product models.

#### 2.1.1.8.0 Complexity

medium

### 2.1.2.0.0 Mapping Id

#### 2.1.2.1.0 Mapping Id

MAPPING-002

#### 2.1.2.2.0 Source

Azure AI Document Intelligence JSON Output

#### 2.1.2.3.0 Target

UserProduct DTO (for pre-filling form)

#### 2.1.2.4.0 Transformation

direct

#### 2.1.2.5.0 Configuration

##### 2.1.2.5.1 Field Mapping

###### 2.1.2.5.1.1 Purchase Date

purchaseDate

###### 2.1.2.5.1.2 Serial Number

serialNumber

#### 2.1.2.6.0.0 Mapping Technique

Key-value mapping from OCR service's structured output to the application's DTO.

#### 2.1.2.7.0.0 Justification

Core requirement of REQ-DATA-001 to parse uploaded invoices and pre-fill fields.

#### 2.1.2.8.0.0 Complexity

medium

### 2.1.3.0.0.0 Mapping Id

#### 2.1.3.1.0.0 Mapping Id

MAPPING-003

#### 2.1.3.2.0.0 Source

ServiceRequest Entity

#### 2.1.3.3.0.0 Target

Firebase Cloud Messaging (FCM) Payload

#### 2.1.3.4.0.0 Transformation

flattened

#### 2.1.3.5.0.0 Configuration

##### 2.1.3.5.1.0 Payload Structure

###### 2.1.3.5.1.1 Notification

####### 2.1.3.5.1.1.1 Title

WarrantyHub Update

####### 2.1.3.5.1.1.2 Body

Your service request #<serviceRequestId> has been updated to <status>.

###### 2.1.3.5.1.2.0 Data

####### 2.1.3.5.1.2.1 Screen

ServiceRequestDetail

####### 2.1.3.5.1.2.2 Id

<serviceRequestId>

#### 2.1.3.6.0.0.0 Mapping Technique

Constructing a nested JSON object from flat entity properties.

#### 2.1.3.7.0.0.0 Justification

Required for REQ-INTG-001 to send meaningful push notifications to mobile clients.

#### 2.1.3.8.0.0.0 Complexity

simple

### 2.1.4.0.0.0.0 Mapping Id

#### 2.1.4.1.0.0.0 Mapping Id

MAPPING-004

#### 2.1.4.2.0.0.0 Source

GeoJSON (from Mapbox GL JS)

#### 2.1.4.3.0.0.0 Target

PostGIS GEOMETRY (Polygon)

#### 2.1.4.4.0.0.0 Transformation

custom

#### 2.1.4.5.0.0.0 Configuration

##### 2.1.4.5.1.0.0 Library

NetTopologySuite

##### 2.1.4.5.2.0.0 Srid

4326

#### 2.1.4.6.0.0.0 Mapping Technique

Using a geospatial library to parse the GeoJSON coordinate array and create a valid PostGIS geometry object.

#### 2.1.4.7.0.0.0 Justification

Required for REQ-FUNC-002, which allows an admin to define a service area by drawing a polygon on a map.

#### 2.1.4.8.0.0.0 Complexity

complex

### 2.1.5.0.0.0.0 Mapping Id

#### 2.1.5.1.0.0.0 Mapping Id

MAPPING-005

#### 2.1.5.2.0.0.0 Source

Collection of ServiceRequest Entities

#### 2.1.5.3.0.0.0 Target

Reporting DTO (for Brand Dashboard)

#### 2.1.5.4.0.0.0 Transformation

aggregation

#### 2.1.5.5.0.0.0 Configuration

##### 2.1.5.5.1.0.0 Group By

issueTypeId

##### 2.1.5.5.2.0.0 Aggregate Function

COUNT(serviceRequestId)

#### 2.1.5.6.0.0.0 Mapping Technique

Database query (e.g., LINQ GroupBy) to count occurrences of each issue type.

#### 2.1.5.7.0.0.0 Justification

Required for REQ-FUNC-011 to provide an analysis of frequent fault patterns.

#### 2.1.5.8.0.0.0 Complexity

medium

## 2.2.0.0.0.0.0 Object To Object Mappings

- {'sourceObject': 'UserProduct (Domain Entity)', 'targetObject': 'UserProductDto (API DTO)', 'fieldMappings': [{'sourceField': 'userProductId', 'targetField': 'id', 'transformation': 'Direct', 'dataTypeConversion': 'None'}, {'sourceField': 'serialNumber', 'targetField': 'serialNumber', 'transformation': 'Direct', 'dataTypeConversion': 'None'}, {'sourceField': 'warrantyExpiryDate', 'targetField': 'warrantyStatus', 'transformation': 'Custom Logic (Date -> Enum/String)', 'dataTypeConversion': 'Date to String'}]}

## 2.3.0.0.0.0.0 Data Type Conversions

### 2.3.1.0.0.0.0 From

#### 2.3.1.1.0.0.0 From

String (ISO 8601 format from DTO)

#### 2.3.1.2.0.0.0 To

DateTime (.NET Type)

#### 2.3.1.3.0.0.0 Conversion Method

DateTime.Parse()

#### 2.3.1.4.0.0.0 Validation Required

✅ Yes

### 2.3.2.0.0.0.0 From

#### 2.3.2.1.0.0.0 From

String (GeoJSON)

#### 2.3.2.2.0.0.0 To

NTS Geometry (NetTopologySuite)

#### 2.3.2.3.0.0.0 Conversion Method

NetTopologySuite.IO.GeoJsonReader

#### 2.3.2.4.0.0.0 Validation Required

✅ Yes

## 2.4.0.0.0.0.0 Bidirectional Mappings

- {'entity': 'UserProduct', 'forwardMapping': 'Entity to DTO for API responses', 'reverseMapping': 'DTO to Entity for create/update operations', 'consistencyStrategy': 'Manual mapping or use of a library like AutoMapper to ensure consistency between API contracts and domain logic.'}

# 3.0.0.0.0.0.0 Schema Validation Requirements

## 3.1.0.0.0.0.0 Field Level Validations

### 3.1.1.0.0.0.0 Field

#### 3.1.1.1.0.0.0 Field

User.email

#### 3.1.1.2.0.0.0 Rules

- NotNull
- NotEmpty
- ValidEmailFormat

#### 3.1.1.3.0.0.0 Priority

🚨 critical

#### 3.1.1.4.0.0.0 Error Message

A valid email address is required.

### 3.1.2.0.0.0.0 Field

#### 3.1.2.1.0.0.0 Field

Bulk Import CSV: modelNumber

#### 3.1.2.2.0.0.0 Rules

- NotNullOrEmpty
- MaxLength(100)

#### 3.1.2.3.0.0.0 Priority

🔴 high

#### 3.1.2.4.0.0.0 Error Message

Model Number is required and cannot exceed 100 characters.

## 3.2.0.0.0.0.0 Cross Field Validations

- {'validationId': 'VAL-001', 'fields': ['ServiceRequest.status', 'ServiceRequest.resolvedAt'], 'rule': "If 'status' is 'Resolved', then 'resolvedAt' must not be null.", 'condition': "ServiceRequest.status == 'Resolved'", 'errorHandling': 'Reject update with a 400 Bad Request error.'}

## 3.3.0.0.0.0.0 Business Rule Validations

- {'ruleId': 'BR-001', 'description': 'Prevent editing of critical product details after the first service request has been created.', 'fields': ['UserProduct.serialNumber', 'UserProduct.purchaseDate', 'UserProduct.productModelId'], 'logic': 'On an update request for a UserProduct, check if UserProduct.serviceRequestCount > 0. If true, reject changes to the specified fields.', 'priority': 'critical'}

## 3.4.0.0.0.0.0 Conditional Validations

- {'condition': "User.role is 'Technician' or 'ServiceAdmin'", 'applicableFields': ['User.serviceCenterId'], 'validationRules': ['NotNull']}

## 3.5.0.0.0.0.0 Validation Groups

- {'groupName': 'BulkImportValidation', 'validations': ['VAL-CSV-001: Check for required columns.', 'VAL-CSV-002: Validate data types for each cell (e.g., integer for warranty months).', 'VAL-CSV-003: Check for referential integrity (e.g., Brand Name exists).'], 'executionOrder': 1, 'stopOnFirstFailure': False}

# 4.0.0.0.0.0.0 Transformation Pattern Evaluation

## 4.1.0.0.0.0.0 Selected Patterns

### 4.1.1.0.0.0.0 Pattern

#### 4.1.1.1.0.0.0 Pattern

adapter

#### 4.1.1.2.0.0.0 Use Case

Integrating with external services like Firebase Cloud Messaging (FCM) and Azure AI Document Intelligence (OCR).

#### 4.1.1.3.0.0.0 Implementation

A dedicated class in the Notification Service (for FCM) and Background Worker Service (for OCR) that translates internal models into the specific request format required by the external API.

#### 4.1.1.4.0.0.0 Justification

Decouples the core application from the specific implementation details of third-party services, allowing them to be swapped out more easily.

### 4.1.2.0.0.0.0 Pattern

#### 4.1.2.1.0.0.0 Pattern

converter

#### 4.1.2.2.0.0.0 Use Case

Converting between different data type representations, such as GeoJSON strings from the frontend to PostGIS GEOMETRY objects in the backend.

#### 4.1.2.3.0.0.0 Implementation

Utilizing the NetTopologySuite library to handle the complex logic of parsing and creating valid geospatial objects.

#### 4.1.2.4.0.0.0 Justification

Encapsulates complex data type conversion logic into a reusable and maintainable component, leveraging a specialized library.

## 4.2.0.0.0.0.0 Pipeline Processing

### 4.2.1.0.0.0.0 Required

✅ Yes

### 4.2.2.0.0.0.0 Stages

#### 4.2.2.1.0.0.0 Stage

##### 4.2.2.1.1.0.0 Stage

Invoice Upload

##### 4.2.2.1.2.0.0 Transformation

HTTP multipart/form-data to file stream in Azure Blob Storage.

##### 4.2.2.1.3.0.0 Dependencies

*No items available*

#### 4.2.2.2.0.0.0 Stage

##### 4.2.2.2.1.0.0 Stage

Queue for Processing

##### 4.2.2.2.2.0.0 Transformation

Create and enqueue 'InvoiceUploadedForProcessing' message.

##### 4.2.2.2.3.0.0 Dependencies

- Invoice Upload

#### 4.2.2.3.0.0.0 Stage

##### 4.2.2.3.1.0.0 Stage

OCR Extraction

##### 4.2.2.3.2.0.0 Transformation

File from Blob Storage to structured JSON via Azure AI Document Intelligence.

##### 4.2.2.3.3.0.0 Dependencies

- Queue for Processing

#### 4.2.2.4.0.0.0 Stage

##### 4.2.2.4.1.0.0 Stage

Persist Results

##### 4.2.2.4.2.0.0 Transformation

Structured JSON to Invoice.extractedData (JSONB) field.

##### 4.2.2.4.3.0.0 Dependencies

- OCR Extraction

### 4.2.3.0.0.0.0 Parallelization

❌ No

## 4.3.0.0.0.0.0 Processing Mode

### 4.3.1.0.0.0.0 Real Time

#### 4.3.1.1.0.0.0 Required

✅ Yes

#### 4.3.1.2.0.0.0 Scenarios

- Broadcasting technician GPS location updates during 'Travel Mode'.

#### 4.3.1.3.0.0.0 Latency Requirements

< 2 seconds (REQ-PERF-002)

### 4.3.2.0.0.0.0 Batch

| Property | Value |
|----------|-------|
| Required | ✅ |
| Batch Size | 1000 |
| Frequency | On-demand (for bulk import) or Scheduled (e.g., da... |

### 4.3.3.0.0.0.0 Streaming

| Property | Value |
|----------|-------|
| Required | ❌ |
| Streaming Framework | N/A |
| Windowing Strategy | N/A |

## 4.4.0.0.0.0.0 Canonical Data Model

### 4.4.1.0.0.0.0 Applicable

❌ No

### 4.4.2.0.0.0.0 Scope

*No items available*

### 4.4.3.0.0.0.0 Benefits

- Not applicable. The system's scope does not involve complex integrations with disparate systems that would justify the overhead of a canonical data model. The internal domain models serve as the authoritative schema.

# 5.0.0.0.0.0.0 Version Handling Strategy

## 5.1.0.0.0.0.0 Schema Evolution

### 5.1.1.0.0.0.0 Strategy

Additive Changes Only

### 5.1.2.0.0.0.0 Versioning Scheme

URL Path Versioning (e.g., /api/v1/...)

### 5.1.3.0.0.0.0 Compatibility

| Property | Value |
|----------|-------|
| Backward | ✅ |
| Forward | ❌ |
| Reasoning | Clients must be tolerant of new fields appearing i... |

## 5.2.0.0.0.0.0 Transformation Versioning

| Property | Value |
|----------|-------|
| Mechanism | Code versioning via Git. |
| Version Identification | Transformation logic is versioned alongside the se... |
| Migration Strategy | Deploy new version of the service with updated tra... |

## 5.3.0.0.0.0.0 Data Model Changes

| Property | Value |
|----------|-------|
| Migration Path | Use Entity Framework Core migrations to manage dat... |
| Rollback Strategy | EF Core migrations provide 'down' scripts for roll... |
| Validation Strategy | Run integration tests against the migrated schema ... |

## 5.4.0.0.0.0.0 Schema Registry

| Property | Value |
|----------|-------|
| Required | ❌ |
| Technology | N/A |
| Governance | Not required for the current system scale. DTOs de... |

# 6.0.0.0.0.0.0 Performance Optimization

## 6.1.0.0.0.0.0 Critical Requirements

### 6.1.1.0.0.0.0 Operation

#### 6.1.1.1.0.0.0 Operation

Standard API Endpoint Response

#### 6.1.1.2.0.0.0 Max Latency

250ms (P95)

#### 6.1.1.3.0.0.0 Throughput Target

10,000 concurrent users

#### 6.1.1.4.0.0.0 Justification

As per non-functional requirement REQ-PERF-001.

### 6.1.2.0.0.0.0 Operation

#### 6.1.2.1.0.0.0 Operation

Real-time GPS Location Update

#### 6.1.2.2.0.0.0 Max Latency

2 seconds (end-to-end)

#### 6.1.2.3.0.0.0 Throughput Target

N/A

#### 6.1.2.4.0.0.0 Justification

As per non-functional requirement REQ-PERF-002.

## 6.2.0.0.0.0.0 Parallelization Opportunities

- {'transformation': 'Bulk CSV Import (REQ-FUNC-012)', 'parallelizationStrategy': 'Process chunks of the CSV file in parallel using multiple worker threads or instances.', 'expectedGain': 'Significant reduction in total import time for large files.'}

## 6.3.0.0.0.0.0 Caching Strategies

- {'cacheType': 'Distributed Cache (Redis)', 'cacheScope': 'Frequently accessed, rarely changed data like Brands and Product Models.', 'evictionPolicy': 'Least Recently Used (LRU)', 'applicableTransformations': ['Bulk Import Validation (looking up brand names)', 'Product Registration (populating model dropdowns)']}

## 6.4.0.0.0.0.0 Memory Optimization

### 6.4.1.0.0.0.0 Techniques

- Streaming for large file uploads (invoices, bulk import CSVs) to avoid loading entire files into memory.

### 6.4.2.0.0.0.0 Thresholds

Monitor container memory usage via AKS metrics.

### 6.4.3.0.0.0.0 Monitoring Required

✅ Yes

## 6.5.0.0.0.0.0 Lazy Evaluation

### 6.5.1.0.0.0.0 Applicable

❌ No

### 6.5.2.0.0.0.0 Scenarios

*No items available*

### 6.5.3.0.0.0.0 Implementation

N/A

## 6.6.0.0.0.0.0 Bulk Processing

### 6.6.1.0.0.0.0 Required

✅ Yes

### 6.6.2.0.0.0.0 Batch Sizes

#### 6.6.2.1.0.0.0 Optimal

1,000

#### 6.6.2.2.0.0.0 Maximum

5,000

### 6.6.3.0.0.0.0 Parallelism

4

# 7.0.0.0.0.0.0 Error Handling And Recovery

## 7.1.0.0.0.0.0 Error Handling Strategies

### 7.1.1.0.0.0.0 Error Type

#### 7.1.1.1.0.0.0 Error Type

OCR Processing Failure (REQ-DATA-001)

#### 7.1.1.2.0.0.0 Strategy

Fail gracefully

#### 7.1.1.3.0.0.0 Fallback Action

Update the Invoice.ocrStatus to 'Failed' and notify the user to enter product details manually.

#### 7.1.1.4.0.0.0 Escalation Path

- Log error for analysis

### 7.1.2.0.0.0.0 Error Type

#### 7.1.2.1.0.0.0 Error Type

Bulk Import Row Failure (REQ-FUNC-012)

#### 7.1.2.2.0.0.0 Strategy

Continue on error

#### 7.1.2.3.0.0.0 Fallback Action

Skip the invalid row, log the error with the row number and data, and continue processing the rest of the file. Generate a final report of all failed rows.

#### 7.1.2.4.0.0.0 Escalation Path

- User-facing error report

## 7.2.0.0.0.0.0 Logging Requirements

### 7.2.1.0.0.0.0 Log Level

warn

### 7.2.2.0.0.0.0 Included Data

- CorrelationId
- ServiceName
- TransformationId
- ErrorMessage
- SourceData (if not PII)

### 7.2.3.0.0.0.0 Retention Period

30 days

### 7.2.4.0.0.0.0 Alerting

✅ Yes

## 7.3.0.0.0.0.0 Partial Success Handling

### 7.3.1.0.0.0.0 Strategy

For bulk imports, track successful and failed rows separately and provide a summary report to the user upon completion.

### 7.3.2.0.0.0.0 Reporting Mechanism

A downloadable CSV file containing failed rows and a corresponding error message for each.

### 7.3.3.0.0.0.0 Recovery Actions

- User can correct the failed rows in the report and re-upload.

## 7.4.0.0.0.0.0 Circuit Breaking

- {'dependency': 'Azure AI Document Intelligence (OCR)', 'threshold': '5 consecutive failures', 'timeout': '30 seconds', 'fallbackStrategy': 'Immediately fail subsequent requests and return an error indicating the service is temporarily unavailable.'}

## 7.5.0.0.0.0.0 Retry Strategies

- {'operation': 'FCM Push Notification Send', 'maxRetries': 3, 'backoffStrategy': 'exponential', 'retryConditions': ['5xx server errors from FCM', 'Network timeout']}

## 7.6.0.0.0.0.0 Error Notifications

- {'condition': 'OCR service circuit breaker is opened.', 'recipients': ['DevOps On-Call'], 'severity': 'critical', 'channel': 'Azure Monitor Alert'}

# 8.0.0.0.0.0.0 Project Specific Transformations

## 8.1.0.0.0.0.0 Invoice OCR Processing

### 8.1.1.0.0.0.0 Transformation Id

PST-001

### 8.1.2.0.0.0.0 Name

Invoice OCR Processing

### 8.1.3.0.0.0.0 Description

Transforms an uploaded invoice image or PDF into structured data fields for product registration.

### 8.1.4.0.0.0.0 Source

#### 8.1.4.1.0.0.0 Service

Product Service

#### 8.1.4.2.0.0.0 Model

Invoice File (Blob)

#### 8.1.4.3.0.0.0 Fields

- File Content

### 8.1.5.0.0.0.0 Target

#### 8.1.5.1.0.0.0 Service

Product Service

#### 8.1.5.2.0.0.0 Model

Invoice Entity

#### 8.1.5.3.0.0.0 Fields

- extractedData

### 8.1.6.0.0.0.0 Transformation

#### 8.1.6.1.0.0.0 Type

🔹 custom

#### 8.1.6.2.0.0.0 Logic

Asynchronous pipeline: Upload -> Queue -> Worker -> Call Azure AI Document Intelligence API -> Parse JSON Response -> Update Database.

#### 8.1.6.3.0.0.0 Configuration

*No data available*

### 8.1.7.0.0.0.0 Frequency

on-demand

### 8.1.8.0.0.0.0 Criticality

medium

### 8.1.9.0.0.0.0 Dependencies

- REQ-DATA-001

### 8.1.10.0.0.0.0 Validation

#### 8.1.10.1.0.0.0 Pre Transformation

- File type check (PDF, JPG, PNG)
- File size limit

#### 8.1.10.2.0.0.0 Post Transformation

- Check if key fields (e.g., PurchaseDate) were found in the response.

### 8.1.11.0.0.0.0 Performance

| Property | Value |
|----------|-------|
| Expected Volume | Low to Medium |
| Latency Requirement | Under 60 seconds (asynchronous) |
| Optimization Strategy | Background processing via message queue. |

## 8.2.0.0.0.0.0 Bulk Product Model Import

### 8.2.1.0.0.0.0 Transformation Id

PST-002

### 8.2.2.0.0.0.0 Name

Bulk Product Model Import

### 8.2.3.0.0.0.0 Description

Transforms rows from an uploaded CSV file into ProductModel records in the database.

### 8.2.4.0.0.0.0 Source

#### 8.2.4.1.0.0.0 Service

Product Service (Admin)

#### 8.2.4.2.0.0.0 Model

CSV File

#### 8.2.4.3.0.0.0 Fields

- brandName
- modelNumber
- name
- defaultWarrantyMonths

### 8.2.5.0.0.0.0 Target

#### 8.2.5.1.0.0.0 Service

Product Service

#### 8.2.5.2.0.0.0 Model

ProductModel Entity

#### 8.2.5.3.0.0.0 Fields

- brandId
- modelNumber
- name
- defaultWarrantyMonths

### 8.2.6.0.0.0.0 Transformation

#### 8.2.6.1.0.0.0 Type

🔹 direct

#### 8.2.6.2.0.0.0 Logic

Parse each CSV row, validate data, look up Brand ID from brand name, and map to a new ProductModel entity. Perform bulk insert for efficiency.

#### 8.2.6.3.0.0.0 Configuration

*No data available*

### 8.2.7.0.0.0.0 Frequency

on-demand

### 8.2.8.0.0.0.0 Criticality

medium

### 8.2.9.0.0.0.0 Dependencies

- REQ-FUNC-012

### 8.2.10.0.0.0.0 Validation

#### 8.2.10.1.0.0.0 Pre Transformation

- Dry-run validation of the entire CSV file for formatting and data integrity errors.

#### 8.2.10.2.0.0.0 Post Transformation

- Verify row count of imported data matches successful rows from the validation report.

### 8.2.11.0.0.0.0 Performance

| Property | Value |
|----------|-------|
| Expected Volume | Low (infrequent) |
| Latency Requirement | Under 5 minutes for 10,000 rows |
| Optimization Strategy | Bulk database operations (e.g., EFCore.BulkExtensi... |

## 8.3.0.0.0.0.0 Warranty Status Calculation

### 8.3.1.0.0.0.0 Transformation Id

PST-003

### 8.3.2.0.0.0.0 Name

Warranty Status Calculation

### 8.3.3.0.0.0.0 Description

Transforms a product's warranty expiry date into a color-coded status for UI display.

### 8.3.4.0.0.0.0 Source

#### 8.3.4.1.0.0.0 Service

Product Service

#### 8.3.4.2.0.0.0 Model

UserProduct Entity

#### 8.3.4.3.0.0.0 Fields

- warrantyExpiryDate

### 8.3.5.0.0.0.0 Target

#### 8.3.5.1.0.0.0 Service

API Gateway / Client

#### 8.3.5.2.0.0.0 Model

UserProductDto

#### 8.3.5.3.0.0.0 Fields

- warrantyStatus

### 8.3.6.0.0.0.0 Transformation

#### 8.3.6.1.0.0.0 Type

🔹 custom

#### 8.3.6.2.0.0.0 Logic

IF (expiryDate < today) THEN 'Red' ELSE IF (expiryDate < today + 30) THEN 'Amber' ELSE 'Green'. This logic can be in the backend mapping or the frontend client.

#### 8.3.6.3.0.0.0 Configuration

*No data available*

### 8.3.7.0.0.0.0 Frequency

real-time

### 8.3.8.0.0.0.0 Criticality

high

### 8.3.9.0.0.0.0 Dependencies

- REQ-FUNC-005

### 8.3.10.0.0.0.0 Validation

#### 8.3.10.1.0.0.0 Pre Transformation

- Ensure warrantyExpiryDate is not null.

#### 8.3.10.2.0.0.0 Post Transformation

*No items available*

### 8.3.11.0.0.0.0 Performance

| Property | Value |
|----------|-------|
| Expected Volume | High |
| Latency Requirement | Negligible (<1ms) |
| Optimization Strategy | Perform calculation in-memory during object mappin... |

# 9.0.0.0.0.0.0 Implementation Priority

## 9.1.0.0.0.0.0 Component

### 9.1.1.0.0.0.0 Component

DTO to Entity Mappings (Core Services)

### 9.1.2.0.0.0.0 Priority

🔴 high

### 9.1.3.0.0.0.0 Dependencies

*No items available*

### 9.1.4.0.0.0.0 Estimated Effort

Medium

### 9.1.5.0.0.0.0 Risk Level

low

## 9.2.0.0.0.0.0 Component

### 9.2.1.0.0.0.0 Component

PST-001: Invoice OCR Processing

### 9.2.2.0.0.0.0 Priority

🔴 high

### 9.2.3.0.0.0.0 Dependencies

- Background Worker Service setup
- Azure Blob Storage setup

### 9.2.4.0.0.0.0 Estimated Effort

High

### 9.2.5.0.0.0.0 Risk Level

medium

## 9.3.0.0.0.0.0 Component

### 9.3.1.0.0.0.0 Component

PST-002: Bulk Product Model Import

### 9.3.2.0.0.0.0 Priority

🟡 medium

### 9.3.3.0.0.0.0 Dependencies

*No items available*

### 9.3.4.0.0.0.0 Estimated Effort

Medium

### 9.3.5.0.0.0.0 Risk Level

medium

## 9.4.0.0.0.0.0 Component

### 9.4.1.0.0.0.0 Component

Geospatial Transformations (Geofencing)

### 9.4.2.0.0.0.0 Priority

🟡 medium

### 9.4.3.0.0.0.0 Dependencies

- PostGIS extension enabled

### 9.4.4.0.0.0.0 Estimated Effort

Medium

### 9.4.5.0.0.0.0 Risk Level

low

# 10.0.0.0.0.0.0 Risk Assessment

## 10.1.0.0.0.0.0 Risk

### 10.1.1.0.0.0.0 Risk

Low accuracy or inconsistent output from the third-party OCR service.

### 10.1.2.0.0.0.0 Impact

high

### 10.1.3.0.0.0.0 Probability

medium

### 10.1.4.0.0.0.0 Mitigation

Implement a mandatory user review and confirmation step for all OCR-extracted data before saving (as required by REQ-DATA-001). Choose a mature OCR provider like Azure AI Document Intelligence.

### 10.1.5.0.0.0.0 Contingency Plan

If OCR is unreliable, the feature degrades gracefully to manual user input, which is the baseline functionality.

## 10.2.0.0.0.0.0 Risk

### 10.2.1.0.0.0.0 Risk

Poorly formatted or invalid data in bulk import CSV files causes data corruption or failed imports.

### 10.2.2.0.0.0.0 Impact

medium

### 10.2.3.0.0.0.0 Probability

high

### 10.2.4.0.0.0.0 Mitigation

Provide a downloadable CSV template. Implement a robust 'dry-run' validation feature that checks the entire file and provides a detailed error report without committing any data.

### 10.2.5.0.0.0.0 Contingency Plan

Provide clear documentation and support for administrators performing the import. Have a database rollback plan for any catastrophic failed import.

# 11.0.0.0.0.0.0 Recommendations

## 11.1.0.0.0.0.0 Category

### 11.1.1.0.0.0.0 Category

🔹 Technology

### 11.1.2.0.0.0.0 Recommendation

Use a dedicated object-to-object mapping library like AutoMapper for .NET to standardize and simplify the transformation between domain entities and DTOs.

### 11.1.3.0.0.0.0 Justification

Reduces boilerplate code, enforces conventions, and improves maintainability of transformation logic.

### 11.1.4.0.0.0.0 Priority

🔴 high

### 11.1.5.0.0.0.0 Implementation Notes

Define mapping profiles within each microservice for the entities it owns.

## 11.2.0.0.0.0.0 Category

### 11.2.1.0.0.0.0 Category

🔹 Implementation

### 11.2.2.0.0.0.0 Recommendation

For the bulk import feature, perform database operations in a single transaction and use a bulk insert library.

### 11.2.3.0.0.0.0 Justification

Ensures data integrity (all or nothing) and significantly improves performance over inserting rows one by one.

### 11.2.4.0.0.0.0 Priority

🔴 high

### 11.2.5.0.0.0.0 Implementation Notes

Use a library like EFCore.BulkExtensions to handle efficient bulk operations with Entity Framework Core.

## 11.3.0.0.0.0.0 Category

### 11.3.1.0.0.0.0 Category

🔹 Design

### 11.3.2.0.0.0.0 Recommendation

Isolate all direct interactions with third-party services (FCM, OCR) behind an Adapter interface.

### 11.3.3.0.0.0.0 Justification

Follows Clean Architecture principles, making the system easier to test (by mocking the adapter) and allowing the third-party service to be replaced with minimal impact on business logic.

### 11.3.4.0.0.0.0 Priority

🔴 high

### 11.3.5.0.0.0.0 Implementation Notes

Define interfaces like `IOcrService` and `IPushNotificationService` in the Application layer and implement them in the Infrastructure layer.

