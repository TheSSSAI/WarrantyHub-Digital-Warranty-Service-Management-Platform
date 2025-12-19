# 1 Id

REPO-BS-007

# 2 Name

reporting-service

# 3 Description

A read-optimized service dedicated to generating analytics and reports for the Brand and Super Admin dashboards (REQ-FUNC-011). Extracted from `warranty-hub-backend`, its primary architectural characteristic is that it queries a read replica of the production database. This completely isolates its long-running, potentially complex analytical queries from the main transactional (OLTP) workload, ensuring that dashboards and reports never degrade the performance for end-users registering products or creating service requests. It is responsible for aggregating data to show trends, fault patterns, and geographic distributions. Its separation is a critical performance and scalability pattern.

# 4 Type

🔹 Application Services

# 5 Namespace

WarrantyHub.Services.Reporting

# 6 Output Path

services/reporting

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, PostgreSQL (Read Replica)

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

3.8 Brand Dashboard

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

6.2 Reports

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Microservice

# 17.0.0 Architecture Map

- reporting-service-008

# 18.0.0 Components Map

- reporting-service-008

# 19.0.0 Requirements Map

- REQ-FUNC-011

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

NEW_DECOMPOSED

## 20.2.0 Source Repository

REPO-BK-001

## 20.3.0 Decomposition Reasoning

Implements the CQRS (Command Query Responsibility Segregation) pattern at a service level. It separates the read/query workload from the write/command workload, which is a crucial strategy for performance and scalability. This prevents analytical queries from locking tables or consuming resources needed by transactional services.

## 20.4.0 Extracted Responsibilities

- Aggregating data for dashboards
- Generating exportable reports (CSV, PDF)
- Executing read-only analytical queries

## 20.5.0 Reusability Scope

- Provides a centralized source for all platform analytics.

## 20.6.0 Development Benefits

- The data team can build and optimize complex SQL queries without fear of impacting production transactions.
- Can be scaled independently based on reporting load.

# 21.0.0 Dependency Contracts

*No data available*

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'IReportingApi', 'methods': ['GET /reports/frequent-faults(brandId, dateRange) : FaultReportDto', 'GET /reports/product-distribution(brandId) : GeoReportDto'], 'events': [], 'properties': [], 'consumers': ['REPO-FE-002']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Standard NestJS DI. |
| Event Communication | None. It can listen to events to update a material... |
| Data Flow | Connects to a PostgreSQL read replica. Data flows ... |
| Error Handling | Standard HTTP status codes. |
| Async Patterns | Async/await for all database queries. |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | The service should be configured to use a differen... |
| Performance Considerations | Optimize queries for read performance. Consider cr... |
| Security Considerations | Ensure the database user for this service has read... |
| Testing Approach | Test query correctness and performance against a r... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- All read-only data aggregation and reporting features.

## 25.2.0 Must Not Implement

- Any data modification (write) operations.

## 25.3.0 Extension Points

- Integrating with a dedicated data warehouse (e.g., Azure Synapse) for more advanced analytics.

## 25.4.0 Validation Rules

- Validate query parameters like date ranges.

