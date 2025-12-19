# 1 Components

## 1.1 Components

### 1.1.1 Gateway

#### 1.1.1.1 Id

api-gateway-001

#### 1.1.1.2 Name

APIGateway

#### 1.1.1.3 Description

The unified entry point for all web and mobile clients. It is responsible for request routing, authentication, rate limiting, and SSL termination, abstracting the internal microservice architecture from the clients.

#### 1.1.1.4 Type

🔹 Gateway

#### 1.1.1.5 Dependencies

- identity-service-002
- product-service-003
- service-center-service-004
- service-request-service-005
- geolocation-service-007
- reporting-service-008

#### 1.1.1.6 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.1.7 Interfaces

- REST API

#### 1.1.1.8 Technology

YARP (Yet Another Reverse Proxy) on .NET 8

#### 1.1.1.9 Resources

| Property | Value |
|----------|-------|
| Cpu | 1 core |
| Memory | 2GB |
| Network | 1Gbps |

#### 1.1.1.10 Configuration

##### 1.1.1.10.1 Routes

Defined via configuration files

##### 1.1.1.10.2 Jwt Validation

Configured with Identity Service public keys

#### 1.1.1.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

#### 1.1.1.12.0 Responsible Features

- Centralized Authentication
- Request Routing
- Rate Limiting

#### 1.1.1.13.0 Security

##### 1.1.1.13.1 Requires Authentication

✅ Yes

##### 1.1.1.13.2 Requires Authorization

❌ No

##### 1.1.1.13.3 Allowed Roles

*No items available*

### 1.1.2.0.0 Service

#### 1.1.2.1.0 Id

identity-service-002

#### 1.1.2.2.0 Name

IdentityService

#### 1.1.2.3.0 Description

Manages user accounts, authentication (JWT generation), authorization (roles and claims), and user profiles for all system roles. It also handles the bulk import of technician rosters.

#### 1.1.2.4.0 Type

🔹 Service

#### 1.1.2.5.0 Dependencies

- Persistence Layer (Database)
- Messaging Infrastructure

#### 1.1.2.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.2.7.0 Interfaces

- REST API (for user management)
- OIDC Endpoints (for token issuance)

#### 1.1.2.8.0 Technology

.NET 8, ASP.NET Core 8

#### 1.1.2.9.0 Resources

##### 1.1.2.9.1 Cpu

1 core

##### 1.1.2.9.2 Memory

2GB

#### 1.1.2.10.0 Configuration

| Property | Value |
|----------|-------|
| Database Url | env:DB_CONNECTION_STRING |
| Jwt Secret Key | env:JWT_SECRET |
| Token Lifetime | 900s |

#### 1.1.2.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 60 |
| Timeout | 10 |

#### 1.1.2.12.0 Responsible Features

- User Authentication & Authorization
- User Profile Management
- REQ-FUNC-012 (Technician Rosters)

#### 1.1.2.13.0 Security

##### 1.1.2.13.1 Requires Authentication

✅ Yes

##### 1.1.2.13.2 Requires Authorization

✅ Yes

##### 1.1.2.13.3 Allowed Roles

- SuperAdmin
- ServiceAdmin

### 1.1.3.0.0 Service

#### 1.1.3.1.0 Id

product-service-003

#### 1.1.3.2.0 Name

ProductService

#### 1.1.3.3.0 Description

Handles the core logic for product management, including brands, models, user-registered products, and ownership transfers. It initiates OCR processing for uploaded invoices and calculates warranty status.

#### 1.1.3.4.0 Type

🔹 Service

#### 1.1.3.5.0 Dependencies

- Persistence Layer (Database)
- Messaging Infrastructure

#### 1.1.3.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.3.7.0 Interfaces

- REST API

#### 1.1.3.8.0 Technology

.NET 8, ASP.NET Core 8

#### 1.1.3.9.0 Resources

##### 1.1.3.9.1 Cpu

2 cores

##### 1.1.3.9.2 Memory

4GB

#### 1.1.3.10.0 Configuration

##### 1.1.3.10.1 Database Url

env:DB_CONNECTION_STRING

##### 1.1.3.10.2 Invoice Queue Name

invoice-processing

#### 1.1.3.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 60 |
| Timeout | 10 |

#### 1.1.3.12.0 Responsible Features

- REQ-BR-001
- REQ-FUNC-004
- REQ-FUNC-005
- REQ-DATA-001 (Initiation)
- REQ-FUNC-012 (Product Models)

#### 1.1.3.13.0 Security

##### 1.1.3.13.1 Requires Authentication

✅ Yes

##### 1.1.3.13.2 Requires Authorization

✅ Yes

##### 1.1.3.13.3 Allowed Roles

- Customer
- BrandAdmin
- SuperAdmin

### 1.1.4.0.0 Service

#### 1.1.4.1.0 Id

service-center-service-004

#### 1.1.4.2.0 Name

ServiceCenterService

#### 1.1.4.3.0 Description

Manages service center profiles and their geographic service areas. Handles the creation and querying of geofenced polygons and postal code lists using geospatial database capabilities.

#### 1.1.4.4.0 Type

🔹 Service

#### 1.1.4.5.0 Dependencies

- Persistence Layer (PostgreSQL with PostGIS)

#### 1.1.4.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.4.7.0 Interfaces

- REST API

#### 1.1.4.8.0 Technology

.NET 8, ASP.NET Core 8, NetTopologySuite

#### 1.1.4.9.0 Resources

##### 1.1.4.9.1 Cpu

1 core

##### 1.1.4.9.2 Memory

2GB

#### 1.1.4.10.0 Configuration

##### 1.1.4.10.1 Database Url

env:DB_CONNECTION_STRING

#### 1.1.4.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 60 |
| Timeout | 10 |

#### 1.1.4.12.0 Responsible Features

- REQ-FUNC-002

#### 1.1.4.13.0 Security

##### 1.1.4.13.1 Requires Authentication

✅ Yes

##### 1.1.4.13.2 Requires Authorization

✅ Yes

##### 1.1.4.13.3 Allowed Roles

- SuperAdmin

### 1.1.5.0.0 Service

#### 1.1.5.1.0 Id

service-request-service-005

#### 1.1.5.2.0 Name

ServiceRequestService

#### 1.1.5.3.0 Description

Orchestrates the lifecycle of a service request ticket. Manages ticket states, assignments, and provides the real-time, two-way chat functionality. It also stores artifacts like customer signatures.

#### 1.1.5.4.0 Type

🔹 Service

#### 1.1.5.5.0 Dependencies

- Persistence Layer (Database)
- Messaging Infrastructure

#### 1.1.5.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.5.7.0 Interfaces

- REST API
- WebSocket Hub (SignalR)

#### 1.1.5.8.0 Technology

.NET 8, ASP.NET Core 8, SignalR

#### 1.1.5.9.0 Resources

##### 1.1.5.9.1 Cpu

2 cores

##### 1.1.5.9.2 Memory

4GB

#### 1.1.5.10.0 Configuration

##### 1.1.5.10.1 Database Url

env:DB_CONNECTION_STRING

##### 1.1.5.10.2 Service Request Event Topic

service-request-events

#### 1.1.5.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 60 |
| Timeout | 10 |

#### 1.1.5.12.0 Responsible Features

- REQ-FUNC-007
- REQ-FUNC-008
- REQ-FUNC-010

#### 1.1.5.13.0 Security

##### 1.1.5.13.1 Requires Authentication

✅ Yes

##### 1.1.5.13.2 Requires Authorization

✅ Yes

##### 1.1.5.13.3 Allowed Roles

- Customer
- Technician
- ServiceAdmin

### 1.1.6.0.0 Service

#### 1.1.6.1.0 Id

notification-service-006

#### 1.1.6.2.0 Name

NotificationService

#### 1.1.6.3.0 Description

A centralized component that handles sending push notifications. It subscribes to business events (e.g., chat message sent, status updated) and uses FCM to deliver notifications to Android and iOS devices.

#### 1.1.6.4.0 Type

🔹 Service

#### 1.1.6.5.0 Dependencies

- Persistence Layer (Database for FCM tokens)
- Messaging Infrastructure
- Firebase Admin SDK (External)

#### 1.1.6.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.6.7.0 Interfaces

- Event Consumer

#### 1.1.6.8.0 Technology

.NET 8 Worker Service, Firebase Admin SDK

#### 1.1.6.9.0 Resources

##### 1.1.6.9.1 Cpu

1 core

##### 1.1.6.9.2 Memory

1GB

#### 1.1.6.10.0 Configuration

| Property | Value |
|----------|-------|
| Database Url | env:DB_CONNECTION_STRING |
| Fcm Credentials | env:FCM_CREDENTIALS_JSON |
| Notification Topic | system-notifications |

#### 1.1.6.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | *N/A* |
| Interval | 0 |
| Timeout | 0 |

#### 1.1.6.12.0 Responsible Features

- REQ-INTG-001

#### 1.1.6.13.0 Security

##### 1.1.6.13.1 Requires Authentication

❌ No

##### 1.1.6.13.2 Requires Authorization

❌ No

##### 1.1.6.13.3 Allowed Roles

*No items available*

### 1.1.7.0.0 Service

#### 1.1.7.1.0 Id

geolocation-service-007

#### 1.1.7.2.0 Name

GeolocationService

#### 1.1.7.3.0 Description

Manages real-time technician GPS tracking for the 'Travel Mode' feature. It ingests location updates from the technician's app and broadcasts them to the corresponding customer's map view via WebSockets.

#### 1.1.7.4.0 Type

🔹 Service

#### 1.1.7.5.0 Dependencies

- Persistence Layer (Database for transient storage)
- Redis Cache (for low-latency broadcast)

#### 1.1.7.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.7.7.0 Interfaces

- WebSocket Hub (SignalR)

#### 1.1.7.8.0 Technology

.NET 8, ASP.NET Core 8, SignalR

#### 1.1.7.9.0 Resources

##### 1.1.7.9.1 Cpu

2 cores

##### 1.1.7.9.2 Memory

2GB

#### 1.1.7.10.0 Configuration

| Property | Value |
|----------|-------|
| Database Url | env:DB_CONNECTION_STRING |
| Redis Url | env:REDIS_URL |
| Location Update Interval | 1s |

#### 1.1.7.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

#### 1.1.7.12.0 Responsible Features

- REQ-FUNC-009
- REQ-PERF-002

#### 1.1.7.13.0 Security

##### 1.1.7.13.1 Requires Authentication

✅ Yes

##### 1.1.7.13.2 Requires Authorization

✅ Yes

##### 1.1.7.13.3 Allowed Roles

- Customer
- Technician

### 1.1.8.0.0 Service

#### 1.1.8.1.0 Id

reporting-service-008

#### 1.1.8.2.0 Name

ReportingService

#### 1.1.8.3.0 Description

Provides aggregated data for dashboards and reports. It is optimized for read-heavy analytical queries, such as analyzing the most frequent issue types for a brand, potentially by querying a read replica.

#### 1.1.8.4.0 Type

🔹 Service

#### 1.1.8.5.0 Dependencies

- Persistence Layer (Read Replica Database)

#### 1.1.8.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.8.7.0 Interfaces

- REST API

#### 1.1.8.8.0 Technology

.NET 8, ASP.NET Core 8

#### 1.1.8.9.0 Resources

##### 1.1.8.9.1 Cpu

2 cores

##### 1.1.8.9.2 Memory

4GB

#### 1.1.8.10.0 Configuration

##### 1.1.8.10.1 Read Replica Db Url

env:DB_READ_REPLICA_URL

#### 1.1.8.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 60 |
| Timeout | 10 |

#### 1.1.8.12.0 Responsible Features

- REQ-FUNC-011

#### 1.1.8.13.0 Security

##### 1.1.8.13.1 Requires Authentication

✅ Yes

##### 1.1.8.13.2 Requires Authorization

✅ Yes

##### 1.1.8.13.3 Allowed Roles

- BrandAdmin
- SuperAdmin

### 1.1.9.0.0 Worker

#### 1.1.9.1.0 Id

ocr-worker-009

#### 1.1.9.2.0 Name

OCRProcessingWorker

#### 1.1.9.3.0 Description

A background worker that processes invoice files asynchronously. It consumes messages from a queue, communicates with an external OCR service, and persists the extracted data.

#### 1.1.9.4.0 Type

🔹 Worker

#### 1.1.9.5.0 Dependencies

- Persistence Layer (Database)
- Messaging Infrastructure
- Azure Blob Storage
- Azure AI Document Intelligence SDK (External)

#### 1.1.9.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.9.7.0 Interfaces

- Event Consumer

#### 1.1.9.8.0 Technology

.NET 8 Worker Service

#### 1.1.9.9.0 Resources

##### 1.1.9.9.1 Cpu

1 core

##### 1.1.9.9.2 Memory

2GB

#### 1.1.9.10.0 Configuration

| Property | Value |
|----------|-------|
| Database Url | env:DB_CONNECTION_STRING |
| Ocr Service Endpoint | env:OCR_ENDPOINT |
| Invoice Queue Name | invoice-processing |

#### 1.1.9.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | *N/A* |
| Interval | 0 |
| Timeout | 0 |

#### 1.1.9.12.0 Responsible Features

- REQ-DATA-001 (Processing)

#### 1.1.9.13.0 Security

##### 1.1.9.13.1 Requires Authentication

❌ No

##### 1.1.9.13.2 Requires Authorization

❌ No

##### 1.1.9.13.3 Allowed Roles

*No items available*

### 1.1.10.0.0 Worker

#### 1.1.10.1.0 Id

scheduler-worker-010

#### 1.1.10.2.0 Name

ScheduledJobWorker

#### 1.1.10.3.0 Description

A background worker that executes time-based tasks. Its primary responsibility is to periodically query for pending product ownership transfers and expire those that have exceeded the 72-hour window.

#### 1.1.10.4.0 Type

🔹 Worker

#### 1.1.10.5.0 Dependencies

- Persistence Layer (Database)

#### 1.1.10.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Trigger Type | Kubernetes CronJob |

#### 1.1.10.7.0 Interfaces

- Scheduled Trigger

#### 1.1.10.8.0 Technology

.NET 8 Worker Service

#### 1.1.10.9.0 Resources

##### 1.1.10.9.1 Cpu

0.5 cores

##### 1.1.10.9.2 Memory

512MB

#### 1.1.10.10.0 Configuration

##### 1.1.10.10.1 Database Url

env:DB_CONNECTION_STRING

##### 1.1.10.10.2 Cron Schedule

0 * * * *

#### 1.1.10.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | *N/A* |
| Interval | 0 |
| Timeout | 0 |

#### 1.1.10.12.0 Responsible Features

- REQ-BR-002

#### 1.1.10.13.0 Security

##### 1.1.10.13.1 Requires Authentication

❌ No

##### 1.1.10.13.2 Requires Authorization

❌ No

##### 1.1.10.13.3 Allowed Roles

*No items available*

### 1.1.11.0.0 Service

#### 1.1.11.1.0 Id

audit-service-011

#### 1.1.11.2.0 Name

AuditService

#### 1.1.11.3.0 Description

A dedicated service that consumes critical action events from across the system (e.g., user logins, permission changes) and records them in an immutable audit trail for security and compliance purposes.

#### 1.1.11.4.0 Type

🔹 Service

#### 1.1.11.5.0 Dependencies

- Persistence Layer (Database)
- Messaging Infrastructure

#### 1.1.11.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |

#### 1.1.11.7.0 Interfaces

- Event Consumer

#### 1.1.11.8.0 Technology

.NET 8 Worker Service

#### 1.1.11.9.0 Resources

##### 1.1.11.9.1 Cpu

1 core

##### 1.1.11.9.2 Memory

1GB

#### 1.1.11.10.0 Configuration

##### 1.1.11.10.1 Database Url

env:DB_CONNECTION_STRING

##### 1.1.11.10.2 Audit Events Topic

audit-events

#### 1.1.11.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | *N/A* |
| Interval | 0 |
| Timeout | 0 |

#### 1.1.11.12.0 Responsible Features

- REQ-AUDIT-001

#### 1.1.11.13.0 Security

##### 1.1.11.13.1 Requires Authentication

❌ No

##### 1.1.11.13.2 Requires Authorization

❌ No

##### 1.1.11.13.3 Allowed Roles

*No items available*

## 1.2.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Environment | production |
| Logging Level | INFO |
| Scalability Strategy | AKS with Horizontal Pod Autoscalers (REQ-SCAL-001) |
| Performance Target | P95 latency < 250ms (REQ-PERF-001) |
| Disaster Recovery | RTO < 4h, RPO < 15m (REQ-REL-001, REQ-REL-002) |

# 2.0.0.0.0 Component Relations

## 2.1.0.0.0 Architecture

### 2.1.1.0.0 Components

#### 2.1.1.1.0 Gateway

##### 2.1.1.1.1 Id

api-gateway-001

##### 2.1.1.1.2 Name

ApiGateway

##### 2.1.1.1.3 Description

The single entry point for all client applications. It provides a unified API surface, handles request routing to internal microservices, and enforces cross-cutting concerns like authentication, rate limiting, and SSL termination.

##### 2.1.1.1.4 Type

🔹 Gateway

##### 2.1.1.1.5 Dependencies

- identity-service-002
- product-service-003
- service-center-service-004
- service-request-service-005
- notification-service-006
- geolocation-service-007
- reporting-service-008

##### 2.1.1.1.6 Properties

*No data available*

##### 2.1.1.1.7 Interfaces

- Public REST API

##### 2.1.1.1.8 Technology

Azure API Management

##### 2.1.1.1.9 Resources

###### 2.1.1.1.9.1 Cpu

N/A (Managed Service)

###### 2.1.1.1.9.2 Memory

N/A (Managed Service)

##### 2.1.1.1.10.0 Configuration

| Property | Value |
|----------|-------|
| Jwt Validation Policy | Enforced |
| Cors Policy | Configured for clients |
| Rate Limit Policy | Standard |

##### 2.1.1.1.11.0 Health Check

*Not specified*

##### 2.1.1.1.12.0 Responsible Features

- API Routing
- Client Authentication
- Rate Limiting
- SSL Termination

##### 2.1.1.1.13.0 Security

###### 2.1.1.1.13.1 Requires Authentication

✅ Yes

###### 2.1.1.1.13.2 Requires Authorization

❌ No

###### 2.1.1.1.13.3 Allowed Roles

*No items available*

#### 2.1.1.2.0.0 Service

##### 2.1.1.2.1.0 Id

identity-service-002

##### 2.1.1.2.2.0 Name

IdentityService

##### 2.1.1.2.3.0 Description

Manages user authentication, authorization, roles, and profiles. Responsible for issuing JWTs and managing the technician roster.

##### 2.1.1.2.4.0 Type

🔹 Service

##### 2.1.1.2.5.0 Dependencies

- persistence-layer-014
- messaging-infra-015
- audit-service-009

##### 2.1.1.2.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.2.7.0 Interfaces

- REST API (/api/identity)

##### 2.1.1.2.8.0 Technology

.NET 8, ASP.NET Core, Entity Framework Core

##### 2.1.1.2.9.0 Resources

###### 2.1.1.2.9.1 Cpu

1 core

###### 2.1.1.2.9.2 Memory

1GB

##### 2.1.1.2.10.0 Configuration

| Property | Value |
|----------|-------|
| Jwt Issuer | self |
| Jwt Audience | clients |
| Token Lifetime | 1 hour |

##### 2.1.1.2.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

##### 2.1.1.2.12.0 Responsible Features

- User Registration
- User Login (Authentication)
- Role-Based Access Control (Authorization)
- Technician Roster Import (REQ-FUNC-012)
- User Login Auditing (REQ-AUDIT-001)

##### 2.1.1.2.13.0 Security

###### 2.1.1.2.13.1 Requires Authentication

❌ No

###### 2.1.1.2.13.2 Requires Authorization

❌ No

###### 2.1.1.2.13.3 Allowed Roles

*No items available*

#### 2.1.1.3.0.0 Service

##### 2.1.1.3.1.0 Id

product-service-003

##### 2.1.1.3.2.0 Name

ProductService

##### 2.1.1.3.3.0 Description

Manages brands, product models, user-registered products, digital warranty cards, ownership transfers, and invoices.

##### 2.1.1.3.4.0 Type

🔹 Service

##### 2.1.1.3.5.0 Dependencies

- persistence-layer-014
- messaging-infra-015
- audit-service-009

##### 2.1.1.3.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.3.7.0 Interfaces

- REST API (/api/products)

##### 2.1.1.3.8.0 Technology

.NET 8, ASP.NET Core, Entity Framework Core

##### 2.1.1.3.9.0 Resources

###### 2.1.1.3.9.1 Cpu

2 cores

###### 2.1.1.3.9.2 Memory

2GB

##### 2.1.1.3.10.0 Configuration

###### 2.1.1.3.10.1 Transfer Request Ttl

72 hours

##### 2.1.1.3.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

##### 2.1.1.3.12.0 Responsible Features

- Product Field Lock (REQ-BR-001)
- Ownership Transfer Initiation (REQ-FUNC-004)
- Ownership Transfer Expiration (REQ-BR-002)
- Digital Warranty Card Status (REQ-FUNC-005)
- Invoice Upload & OCR Trigger (REQ-DATA-001)
- Product Model Import (REQ-FUNC-012)

##### 2.1.1.3.13.0 Security

###### 2.1.1.3.13.1 Requires Authentication

✅ Yes

###### 2.1.1.3.13.2 Requires Authorization

✅ Yes

###### 2.1.1.3.13.3 Allowed Roles

- Customer
- Technician
- ServiceAdmin
- BrandAdmin
- SuperAdmin

#### 2.1.1.4.0.0 Service

##### 2.1.1.4.1.0 Id

service-center-service-004

##### 2.1.1.4.2.0 Name

ServiceCenterService

##### 2.1.1.4.3.0 Description

Manages service center profiles and their geographic service areas using geofenced polygons and postal codes.

##### 2.1.1.4.4.0 Type

🔹 Service

##### 2.1.1.4.5.0 Dependencies

- persistence-layer-014
- NetTopologySuite
- audit-service-009

##### 2.1.1.4.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.4.7.0 Interfaces

- REST API (/api/service-centers)

##### 2.1.1.4.8.0 Technology

.NET 8, ASP.NET Core, Entity Framework Core (with PostGIS provider)

##### 2.1.1.4.9.0 Resources

###### 2.1.1.4.9.1 Cpu

1 core

###### 2.1.1.4.9.2 Memory

1.5GB

##### 2.1.1.4.10.0 Configuration

*No data available*

##### 2.1.1.4.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

##### 2.1.1.4.12.0 Responsible Features

- Service Area Definition (REQ-FUNC-002)

##### 2.1.1.4.13.0 Security

###### 2.1.1.4.13.1 Requires Authentication

✅ Yes

###### 2.1.1.4.13.2 Requires Authorization

✅ Yes

###### 2.1.1.4.13.3 Allowed Roles

- SuperAdmin

#### 2.1.1.5.0.0 Service

##### 2.1.1.5.1.0 Id

service-request-service-005

##### 2.1.1.5.2.0 Name

ServiceRequestService

##### 2.1.1.5.3.0 Description

Handles the entire lifecycle of a service request, including status changes, disputes, real-time chat, and digital signature capture.

##### 2.1.1.5.4.0 Type

🔹 Service

##### 2.1.1.5.5.0 Dependencies

- persistence-layer-014
- messaging-infra-015
- audit-service-009
- product-service-003

##### 2.1.1.5.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.5.7.0 Interfaces

- REST API (/api/service-requests)
- WebSocket Hub (/hubs/chat)

##### 2.1.1.5.8.0 Technology

.NET 8, ASP.NET Core, Entity Framework Core, SignalR

##### 2.1.1.5.9.0 Resources

###### 2.1.1.5.9.1 Cpu

2 cores

###### 2.1.1.5.9.2 Memory

2GB

##### 2.1.1.5.10.0 Configuration

###### 2.1.1.5.10.1 Dispute Window Days

7

##### 2.1.1.5.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

##### 2.1.1.5.12.0 Responsible Features

- Real-time Chat (REQ-FUNC-007)
- Service Request Disputing (REQ-FUNC-008)
- Digital Signature Capture (REQ-FUNC-010)

##### 2.1.1.5.13.0 Security

###### 2.1.1.5.13.1 Requires Authentication

✅ Yes

###### 2.1.1.5.13.2 Requires Authorization

✅ Yes

###### 2.1.1.5.13.3 Allowed Roles

- Customer
- Technician
- ServiceAdmin

#### 2.1.1.6.0.0 Service

##### 2.1.1.6.1.0 Id

notification-service-006

##### 2.1.1.6.2.0 Name

NotificationService

##### 2.1.1.6.3.0 Description

Integrates with Firebase Cloud Messaging (FCM) to send push notifications to mobile clients. It listens to business events from other services.

##### 2.1.1.6.4.0 Type

🔹 Service

##### 2.1.1.6.5.0 Dependencies

- persistence-layer-014
- messaging-infra-015
- Firebase Admin SDK

##### 2.1.1.6.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.6.7.0 Interfaces

- REST API (/api/notifications/register-device)
- MessageBus Event Consumers

##### 2.1.1.6.8.0 Technology

.NET 8, ASP.NET Core

##### 2.1.1.6.9.0 Resources

###### 2.1.1.6.9.1 Cpu

1 core

###### 2.1.1.6.9.2 Memory

1GB

##### 2.1.1.6.10.0 Configuration

###### 2.1.1.6.10.1 Fcm Service Account Key

from-key-vault

##### 2.1.1.6.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

##### 2.1.1.6.12.0 Responsible Features

- FCM Integration (REQ-INTG-001)

##### 2.1.1.6.13.0 Security

###### 2.1.1.6.13.1 Requires Authentication

✅ Yes

###### 2.1.1.6.13.2 Requires Authorization

✅ Yes

###### 2.1.1.6.13.3 Allowed Roles

- Customer
- Technician

#### 2.1.1.7.0.0 Service

##### 2.1.1.7.1.0 Id

geolocation-service-007

##### 2.1.1.7.2.0 Name

GeolocationService

##### 2.1.1.7.3.0 Description

Manages real-time GPS location updates from technicians using 'Travel Mode'. Optimized for high-frequency writes and low-latency broadcast via WebSockets.

##### 2.1.1.7.4.0 Type

🔹 Service

##### 2.1.1.7.5.0 Dependencies

- persistence-layer-014
- messaging-infra-015

##### 2.1.1.7.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.7.7.0 Interfaces

- WebSocket Hub (/hubs/location)

##### 2.1.1.7.8.0 Technology

.NET 8, ASP.NET Core, SignalR, PostGIS

##### 2.1.1.7.9.0 Resources

###### 2.1.1.7.9.1 Cpu

2 cores

###### 2.1.1.7.9.2 Memory

2GB

##### 2.1.1.7.10.0 Configuration

###### 2.1.1.7.10.1 Location Update Throttle Ms

500

##### 2.1.1.7.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

##### 2.1.1.7.12.0 Responsible Features

- Technician 'Travel Mode' GPS Sharing (REQ-FUNC-009)
- Low-Latency GPS Updates (REQ-PERF-002)

##### 2.1.1.7.13.0 Security

###### 2.1.1.7.13.1 Requires Authentication

✅ Yes

###### 2.1.1.7.13.2 Requires Authorization

✅ Yes

###### 2.1.1.7.13.3 Allowed Roles

- Customer
- Technician

#### 2.1.1.8.0.0 Service

##### 2.1.1.8.1.0 Id

reporting-service-008

##### 2.1.1.8.2.0 Name

ReportingService

##### 2.1.1.8.3.0 Description

Provides aggregated data and analytics for dashboards, such as analyzing frequent issue types for brands. Reads from a database replica to prevent performance impact on transactional services.

##### 2.1.1.8.4.0 Type

🔹 Service

##### 2.1.1.8.5.0 Dependencies

- persistence-layer-014 (Read Replica)

##### 2.1.1.8.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.8.7.0 Interfaces

- REST API (/api/reports)

##### 2.1.1.8.8.0 Technology

.NET 8, ASP.NET Core, Entity Framework Core

##### 2.1.1.8.9.0 Resources

###### 2.1.1.8.9.1 Cpu

1 core

###### 2.1.1.8.9.2 Memory

1.5GB

##### 2.1.1.8.10.0 Configuration

###### 2.1.1.8.10.1 Connection String

read-replica-db-url

##### 2.1.1.8.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

##### 2.1.1.8.12.0 Responsible Features

- Brand Dashboard Analytics (REQ-FUNC-011)

##### 2.1.1.8.13.0 Security

###### 2.1.1.8.13.1 Requires Authentication

✅ Yes

###### 2.1.1.8.13.2 Requires Authorization

✅ Yes

###### 2.1.1.8.13.3 Allowed Roles

- BrandAdmin
- SuperAdmin

#### 2.1.1.9.0.0 Service

##### 2.1.1.9.1.0 Id

audit-service-009

##### 2.1.1.9.2.0 Name

AuditService

##### 2.1.1.9.3.0 Description

A centralized service that subscribes to audit events from other microservices and persists them to an immutable audit log. Ensures comprehensive auditability.

##### 2.1.1.9.4.0 Type

🔹 Service

##### 2.1.1.9.5.0 Dependencies

- persistence-layer-014
- messaging-infra-015

##### 2.1.1.9.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.9.7.0 Interfaces

- MessageBus Event Consumers

##### 2.1.1.9.8.0 Technology

.NET 8 Worker Service

##### 2.1.1.9.9.0 Resources

###### 2.1.1.9.9.1 Cpu

0.5 cores

###### 2.1.1.9.9.2 Memory

512MB

##### 2.1.1.9.10.0 Configuration

*No data available*

##### 2.1.1.9.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 60 |
| Timeout | 10 |

##### 2.1.1.9.12.0 Responsible Features

- Immutable Audit Trail (REQ-AUDIT-001)

##### 2.1.1.9.13.0 Security

###### 2.1.1.9.13.1 Requires Authentication

❌ No

###### 2.1.1.9.13.2 Requires Authorization

❌ No

###### 2.1.1.9.13.3 Allowed Roles

*No items available*

#### 2.1.1.10.0.0 Worker

##### 2.1.1.10.1.0 Id

invoice-ocr-worker-010

##### 2.1.1.10.2.0 Name

InvoiceOcrWorker

##### 2.1.1.10.3.0 Description

A background worker that listens for 'InvoiceUploaded' events, downloads the file, processes it with an OCR service, and updates the invoice record with the extracted data.

##### 2.1.1.10.4.0 Type

🔹 Worker

##### 2.1.1.10.5.0 Dependencies

- messaging-infra-015
- Azure AI Document Intelligence SDK
- product-service-003

##### 2.1.1.10.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | AKS |

##### 2.1.1.10.7.0 Interfaces

*No items available*

##### 2.1.1.10.8.0 Technology

.NET 8 Worker Service

##### 2.1.1.10.9.0 Resources

###### 2.1.1.10.9.1 Cpu

1 core

###### 2.1.1.10.9.2 Memory

1GB

##### 2.1.1.10.10.0 Configuration

###### 2.1.1.10.10.1 Ocr Service Endpoint

from-key-vault

###### 2.1.1.10.10.2 Ocr Service Key

from-key-vault

##### 2.1.1.10.11.0 Health Check

*Not specified*

##### 2.1.1.10.12.0 Responsible Features

- Automated Invoice Data Extraction (REQ-DATA-001)

##### 2.1.1.10.13.0 Security

###### 2.1.1.10.13.1 Requires Authentication

❌ No

###### 2.1.1.10.13.2 Requires Authorization

❌ No

###### 2.1.1.10.13.3 Allowed Roles

*No items available*

#### 2.1.1.11.0.0 Worker

##### 2.1.1.11.1.0 Id

transfer-expiry-worker-011

##### 2.1.1.11.2.0 Name

TransferExpiryWorker

##### 2.1.1.11.3.0 Description

A scheduled background job that runs periodically to find and mark pending ownership transfers as 'Expired' if they exceed the 72-hour time-to-live.

##### 2.1.1.11.4.0 Type

🔹 Worker

##### 2.1.1.11.5.0 Dependencies

- product-service-003

##### 2.1.1.11.6.0 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | Kubernetes CronJob |

##### 2.1.1.11.7.0 Interfaces

*No items available*

##### 2.1.1.11.8.0 Technology

.NET 8 Console App

##### 2.1.1.11.9.0 Resources

###### 2.1.1.11.9.1 Cpu

0.5 cores

###### 2.1.1.11.9.2 Memory

512MB

##### 2.1.1.11.10.0 Configuration

###### 2.1.1.11.10.1 Schedule

0 * * * *

##### 2.1.1.11.11.0 Health Check

*Not specified*

##### 2.1.1.11.12.0 Responsible Features

- Automatic Expiration of Transfers (REQ-BR-002)

##### 2.1.1.11.13.0 Security

###### 2.1.1.11.13.1 Requires Authentication

❌ No

###### 2.1.1.11.13.2 Requires Authorization

❌ No

###### 2.1.1.11.13.3 Allowed Roles

*No items available*

#### 2.1.1.12.0.0 Client

##### 2.1.1.12.1.0 Id

web-client-012

##### 2.1.1.12.2.0 Name

AdminWebClient

##### 2.1.1.12.3.0 Description

A Single Page Application (SPA) for Super Admins and Brand Admins, providing dashboards, reporting, and management interfaces. It is developed to meet WCAG 2.1 Level AA conformance.

##### 2.1.1.12.4.0 Type

🔹 Client

##### 2.1.1.12.5.0 Dependencies

- api-gateway-001

##### 2.1.1.12.6.0 Properties

*No data available*

##### 2.1.1.12.7.0 Interfaces

- Web UI

##### 2.1.1.12.8.0 Technology

React 18, TypeScript, Mapbox GL JS, Recharts

##### 2.1.1.12.9.0 Resources

*No data available*

##### 2.1.1.12.10.0 Configuration

###### 2.1.1.12.10.1 Api Base Url

🔗 [https://api.example.com](https://api.example.com)

##### 2.1.1.12.11.0 Health Check

*Not specified*

##### 2.1.1.12.12.0 Responsible Features

- Service Area Management UI (REQ-FUNC-002)
- Brand Dashboard UI (REQ-FUNC-011)
- Accessibility Conformance (REQ-UI-001)

##### 2.1.1.12.13.0 Security

###### 2.1.1.12.13.1 Requires Authentication

✅ Yes

###### 2.1.1.12.13.2 Requires Authorization

✅ Yes

###### 2.1.1.12.13.3 Allowed Roles

- SuperAdmin
- BrandAdmin

#### 2.1.1.13.0.0 Client

##### 2.1.1.13.1.0 Id

mobile-client-013

##### 2.1.1.13.2.0 Name

MobileClient

##### 2.1.1.13.3.0 Description

A cross-platform mobile application for both customers and technicians, providing interfaces for product management, service requests, real-time chat, and location tracking. It is developed to meet WCAG 2.1 Level AA conformance.

##### 2.1.1.13.4.0 Type

🔹 Client

##### 2.1.1.13.5.0 Dependencies

- api-gateway-001
- Device GPS
- FCM

##### 2.1.1.13.6.0 Properties

*No data available*

##### 2.1.1.13.7.0 Interfaces

- Mobile UI

##### 2.1.1.13.8.0 Technology

Flutter 3.19+, Dart

##### 2.1.1.13.9.0 Resources

*No data available*

##### 2.1.1.13.10.0 Configuration

###### 2.1.1.13.10.1 Api Base Url

🔗 [https://api.example.com](https://api.example.com)

##### 2.1.1.13.11.0 Health Check

*Not specified*

##### 2.1.1.13.12.0 Responsible Features

- Push Notification Handling (REQ-INTG-001)
- Real-time Chat UI (REQ-FUNC-007)
- Technician Travel Mode UI (REQ-FUNC-009)
- Digital Signature UI (REQ-FUNC-010)
- Accessibility Conformance (REQ-UI-001)

##### 2.1.1.13.13.0 Security

###### 2.1.1.13.13.1 Requires Authentication

✅ Yes

###### 2.1.1.13.13.2 Requires Authorization

✅ Yes

###### 2.1.1.13.13.3 Allowed Roles

- Customer
- Technician

### 2.1.2.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Environment | production |
| Logging Level | INFO |
| P95 Api Latency Target Ms | 250 |
| Gps Update Latency Target Ms | 2000 |

