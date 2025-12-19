# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-007 |
| Extraction Timestamp | 2025-01-27T10:30:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-FUNC-011

#### 1.2.1.2 Requirement Text

The system shall provide a report or dashboard widget for Brand Admins that analyzes and displays the most frequent 'Type of Issue' selections from service requests for their products.

#### 1.2.1.3 Validation Criteria

- Verify that the dashboard displays a chart showing the count of service requests per issue type.
- Verify that the data can be filtered by product model and a specific date range.

#### 1.2.1.4 Implementation Implications

- Service must query the read-replica database to perform aggregation without locking the primary DB.
- API endpoint must accept query parameters for 'brandId', 'productModel', and 'dateRange'.
- Response format must be optimized for charting libraries (e.g., arrays of label/value pairs).

#### 1.2.1.5 Extraction Reasoning

This is the primary functional driver for the reporting service's existence.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

US-086

#### 1.2.2.2 Requirement Text

Brand Admin: View a dashboard of product and service analytics

#### 1.2.2.3 Validation Criteria

- Dashboard loads with LCP < 2.5s
- Widgets display Total Registered Products, Warranty Status breakdown, and Average Service Resolution Time

#### 1.2.2.4 Implementation Implications

- Implement multiple aggregation endpoints for different KPI widgets.
- Ensure strict data tenancy so Brand Admins only see their own brand's data.

#### 1.2.2.5 Extraction Reasoning

Defines the specific metrics and widgets the service must populate.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

US-088

#### 1.2.3.2 Requirement Text

Brand Admin: View a geographic distribution map of products and requests

#### 1.2.3.3 Validation Criteria

- Map displays clustered data points
- Toggle between Product Distribution and Service Request Distribution

#### 1.2.3.4 Implementation Implications

- Implement GeoJSON aggregation endpoints.
- Query user address data linked to products and requests.

#### 1.2.3.5 Extraction Reasoning

Requires specific geospatial aggregation capabilities.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

ReportingController

#### 1.3.1.2 Component Specification

Exposes REST API endpoints for fetching analytical data. Handles request validation and tenancy enforcement.

#### 1.3.1.3 Implementation Requirements

- Use NestJS CQRS QueryBus to dispatch read requests.
- Validate JWT token and extract Brand ID for query scoping.

#### 1.3.1.4 Architectural Context

Presentation Layer (API)

#### 1.3.1.5 Extraction Reasoning

Entry point for the frontend dashboard.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

ReadReplicaRepository

#### 1.3.2.2 Component Specification

Data access layer specifically configured to connect to the PostgreSQL Read Replica instance.

#### 1.3.2.3 Implementation Requirements

- Inject 'READ_REPLICA_SOURCE' DataSource.
- Execute optimized SQL aggregations or use TypeORM QueryBuilder with read-only permissions.

#### 1.3.2.4 Architectural Context

Infrastructure Layer (Data Access)

#### 1.3.2.5 Extraction Reasoning

Enforces the architectural pattern of offloading heavy reads from the primary transaction database.

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Query Service Layer', 'layer_responsibilities': 'Processing analytical queries, data aggregation, and read-side business logic.', 'layer_constraints': ['Must strictly use the Read Replica connection.', 'Must not perform any write operations.'], 'implementation_patterns': ['CQRS (Query Side)', 'Read Replica Isolation'], 'extraction_reasoning': 'The service is explicitly defined as a read-optimized reporting service.'}

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IPostgresReadReplica

#### 1.5.1.2 Source Repository

REPO-IN-004

#### 1.5.1.3 Method Contracts

- {'method_name': 'ExecuteQuery', 'method_signature': 'query(sql: string, parameters?: any[]): Promise<any>', 'method_purpose': 'Executes SELECT statements against the replicated database.', 'integration_context': 'Used by Repositories to fetch aggregated data.'}

#### 1.5.1.4 Integration Pattern

Database Protocol (PostgreSQL Wire)

#### 1.5.1.5 Communication Protocol

TCP/IP

#### 1.5.1.6 Extraction Reasoning

Infrastructure dependency for the read replica connection string and access credentials.

### 1.5.2.0 Interface Name

#### 1.5.2.1 Interface Name

ISharedAuth

#### 1.5.2.2 Source Repository

REPO-SL-011

#### 1.5.2.3 Method Contracts

- {'method_name': 'JwtAuthGuard', 'method_signature': 'canActivate(context: ExecutionContext): boolean', 'method_purpose': 'Validates the incoming bearer token.', 'integration_context': 'Applied to all controller routes.'}

#### 1.5.2.4 Integration Pattern

Library Import

#### 1.5.2.5 Communication Protocol

In-Process

#### 1.5.2.6 Extraction Reasoning

Shared library dependency for security enforcement.

## 1.6.0.0 Exposed Interfaces

- {'interface_name': 'IReportingApi', 'consumer_repositories': ['REPO-FE-002', 'REPO-GW-013'], 'method_contracts': [{'method_name': 'GetFrequentFaults', 'method_signature': 'GET /api/v1/analytics/brands/{brandId}/faults?startDate=...&endDate=...', 'method_purpose': 'Returns fault count aggregated by issue type.', 'implementation_requirements': 'Must filter by Brand ID from token.'}, {'method_name': 'GetKpiSummary', 'method_signature': 'GET /api/v1/analytics/brands/{brandId}/kpi-summary', 'method_purpose': 'Returns high-level metrics (total products, avg resolution time).', 'implementation_requirements': 'Fast aggregation for dashboard load.'}, {'method_name': 'GetGeographicDistribution', 'method_signature': 'GET /api/v1/analytics/brands/{brandId}/geo-distribution', 'method_purpose': 'Returns aggregated product/request counts by region or postal code.', 'implementation_requirements': 'GeoJSON format response.'}], 'service_level_requirements': ['P95 latency < 500ms for heavy aggregations.', 'High Availability (Read Replica fallback if possible).'], 'implementation_constraints': ['Strict Tenant Isolation (Brand ID check).', 'Pagination or limit on detailed rows.'], 'extraction_reasoning': 'These endpoints match the dashboard widgets described in User Stories US-086, US-087, US-088.'}

## 1.7.0.0 Technology Context

### 1.7.1.0 Framework Requirements

NestJS v10.3.x, TypeORM

### 1.7.2.0 Integration Technologies

- PostgreSQL Read Replica
- JSON (REST API)

### 1.7.3.0 Performance Constraints

Analytical queries must not block the main thread. Heavy queries should use database-level aggregation functions.

### 1.7.4.0 Security Requirements

Authentication via JWT. Authorization via Role Guards (BrandAdmin, SuperAdmin). Data filtering by BrandId.

## 1.8.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | All dashboard widgets identified in requirements m... |
| Cross Reference Validation | Validated against REQ-FUNC-011 and US-086. Depende... |
| Implementation Readiness Assessment | High. The separation of concerns (Read vs Write) i... |
| Quality Assurance Confirmation | The integration design effectively isolates analyt... |

