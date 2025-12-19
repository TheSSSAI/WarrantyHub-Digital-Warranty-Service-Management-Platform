# 1 Style

Microservices

# 2 Patterns

## 2.1 API Gateway

### 2.1.1 Name

API Gateway

### 2.1.2 Description

A single entry point for all client requests (Web, Mobile). It routes requests to the appropriate downstream microservice, handles cross-cutting concerns like authentication, SSL termination, and rate limiting. This simplifies client logic and enhances security.

### 2.1.3 Benefits

- Single point of entry and security enforcement
- Simplified client applications
- Decouples clients from internal service architecture

### 2.1.4 Tradeoffs

- Can become a bottleneck if not managed correctly
- Adds another component to develop and maintain

### 2.1.5 Applicability

#### 2.1.5.1 Scenarios

- Providing a unified interface to a system of microservices
- Handling requests from multiple types of clients (e.g., web and mobile)

#### 2.1.5.2 Constraints

- Requires careful design to avoid becoming a monolithic choke point

## 2.2.0.0 Clean Architecture

### 2.2.1.0 Name

Clean Architecture

### 2.2.2.0 Description

Applied to the internal design of each backend microservice. This pattern enforces a strict separation of concerns by organizing code into layers (Domain, Application, Infrastructure, Presentation/API) with a clear dependency rule: inner layers know nothing about outer layers. This addresses maintainability and testability.

### 2.2.3.0 Benefits

- Independent of frameworks and UI
- Highly testable business logic
- Decoupled from database and external agencies

### 2.2.4.0 Tradeoffs

- Higher initial complexity and boilerplate code

### 2.2.5.0 Applicability

#### 2.2.5.1 Scenarios

- Building complex business applications that need to be maintained over time
- Ensuring business logic can be tested in isolation

#### 2.2.5.2 Constraints

- May be overkill for very simple CRUD-based services

## 2.3.0.0 Background Worker / Asynchronous Processing

### 2.3.1.0 Name

Background Worker / Asynchronous Processing

### 2.3.2.0 Description

Used for long-running or non-critical tasks to avoid blocking user-facing API requests. Specifically applied for processing uploaded invoices with OCR (REQ-DATA-001) and expiring pending ownership transfers (REQ-BR-002). This is implemented using a message queue and dedicated worker services.

### 2.3.3.0 Benefits

- Improved API responsiveness and user experience
- Increased system reliability by decoupling tasks
- Enables retry logic for failed operations

### 2.3.4.0 Tradeoffs

- Adds complexity of managing a message broker and worker processes

### 2.3.5.0 Applicability

#### 2.3.5.1 Scenarios

- Tasks that are time-consuming, like file processing or third-party API calls
- Scheduled or periodic jobs

#### 2.3.5.2 Constraints

- Requires mechanisms to communicate task status back to the user

# 3.0.0.0 Layers

## 3.1.0.0 Presentation

### 3.1.1.0 Id

client_web

### 3.1.2.0 Name

Web Client (Admin Portal)

### 3.1.3.0 Description

A Single Page Application (SPA) providing user interfaces for Super Admins and Brand Admins. It handles features like service area definition (REQ-FUNC-002) and brand-level reporting (REQ-FUNC-011). It must adhere to WCAG 2.1 AA standards (REQ-UI-001).

### 3.1.4.0 Technologystack

React 18, TypeScript 5.4, Mapbox GL JS (for mapping), Recharts (for dashboards)

### 3.1.5.0 Language

TypeScript

### 3.1.6.0 Type

🔹 Presentation

### 3.1.7.0 Responsibilities

- Render administrative dashboards and forms
- Provide interactive map for geofencing
- Communicate with the backend via the API Gateway

### 3.1.8.0 Components

- Dashboard Widgets
- Map Component
- Data Tables and Forms
- Authentication Module

### 3.1.9.0 Interfaces

*No items available*

### 3.1.10.0 Dependencies

- {'layerId': 'api_gateway', 'type': 'Required'}

### 3.1.11.0 Constraints

- {'type': 'Accessibility', 'description': 'Must conform to WCAG 2.1 Level AA (REQ-UI-001).'}

## 3.2.0.0 Presentation

### 3.2.1.0 Id

client_mobile

### 3.2.2.0 Name

Mobile Clients (Customer & Technician)

### 3.2.3.0 Description

A cross-platform mobile application for Android and iOS, serving both end-users (customers) and technicians. It implements features like push notifications (REQ-INTG-001), real-time chat (REQ-FUNC-007), technician GPS tracking (REQ-FUNC-009), and digital signature capture (REQ-FUNC-010).

### 3.2.4.0 Technologystack

Flutter 3.19+, Dart 3.x, google_maps_flutter, signature package

### 3.2.5.0 Language

Dart

### 3.2.6.0 Type

🔹 Presentation

### 3.2.7.0 Responsibilities

- Provide user-facing product and service request management
- Enable real-time communication and location sharing
- Capture user input including signatures and GPS data
- Handle push notifications

### 3.2.8.0 Components

- Digital Warranty Card UI
- Service Request Chat View
- Technician Travel Mode Map View
- Digital Signature Canvas
- Push Notification Handler

### 3.2.9.0 Interfaces

*No items available*

### 3.2.10.0 Dependencies

- {'layerId': 'api_gateway', 'type': 'Required'}

### 3.2.11.0 Constraints

#### 3.2.11.1 Device Access

##### 3.2.11.1.1 Type

🔹 Device Access

##### 3.2.11.1.2 Description

Requires access to device GPS for location tracking (REQ-FUNC-009).

#### 3.2.11.2.0 Accessibility

##### 3.2.11.2.1 Type

🔹 Accessibility

##### 3.2.11.2.2 Description

Must conform to WCAG 2.1 Level AA (REQ-UI-001).

## 3.3.0.0.0 APIGateway

### 3.3.1.0.0 Id

api_gateway

### 3.3.2.0.0 Name

API Gateway

### 3.3.3.0.0 Description

The single entry point for all client applications. It provides a unified API surface, handles request routing to internal microservices, and enforces cross-cutting concerns like authentication and rate limiting. Deployed on Azure Kubernetes Service.

### 3.3.4.0.0 Technologystack

Azure API Management or YARP (Yet Another Reverse Proxy) on .NET 8

### 3.3.5.0.0 Language

Configuration (YAML/JSON) or C#

### 3.3.6.0.0 Type

🔹 APIGateway

### 3.3.7.0.0 Responsibilities

- Route incoming HTTP(S) requests to the correct microservice
- Authenticate clients using JWT
- Aggregate results from multiple services if needed
- Provide SSL termination

### 3.3.8.0.0 Components

- Routing Engine
- Authentication Middleware
- Rate Limiting Policy Engine

### 3.3.9.0.0 Interfaces

*No items available*

### 3.3.10.0.0 Dependencies

- {'layerId': 'backend_services', 'type': 'Required'}

### 3.3.11.0.0 Constraints

*No items available*

## 3.4.0.0.0 ApplicationServices

### 3.4.1.0.0 Id

backend_services

### 3.4.2.0.0 Name

Backend Microservices

### 3.4.3.0.0 Description

A collection of independently deployable services that implement the core business logic of the application. Each service is built using Clean Architecture and communicates via REST APIs and a message bus. Deployed as containers on Azure Kubernetes Service (AKS) as per REQ-SCAL-001.

### 3.4.4.0.0 Technologystack

.NET 8, ASP.NET Core 8, Entity Framework Core 8, SignalR (for real-time), MediatR

### 3.4.5.0.0 Language

C#

### 3.4.6.0.0 Type

🔹 ApplicationServices

### 3.4.7.0.0 Responsibilities

- Implement all business rules and functional requirements
- Manage data persistence and integrity
- Integrate with third-party services like FCM and OCR
- Provide secure, fine-grained APIs for consumption by clients

### 3.4.8.0.0 Components

- Identity Service
- Product Service
- Service Center Service
- Service Request Service
- Notification Service
- Geolocation Service
- Reporting Service
- Background Worker Service

### 3.4.9.0.0 Interfaces

*No items available*

### 3.4.10.0.0 Dependencies

#### 3.4.10.1.0 Required

##### 3.4.10.1.1 Layer Id

persistence

##### 3.4.10.1.2 Type

🔹 Required

#### 3.4.10.2.0 Required

##### 3.4.10.2.1 Layer Id

messaging

##### 3.4.10.2.2 Type

🔹 Required

### 3.4.11.0.0 Constraints

- {'type': 'Scalability', 'description': 'Must be configured for horizontal scaling using HPAs on AKS (REQ-SCAL-001).'}

## 3.5.0.0.0 Messaging

### 3.5.1.0.0 Id

messaging

### 3.5.2.0.0 Name

Messaging Infrastructure

### 3.5.3.0.0 Description

Provides asynchronous communication capabilities between microservices and enables background processing. Used for decoupling long-running tasks like OCR from the main request/response flow.

### 3.5.4.0.0 Technologystack

Azure Service Bus

### 3.5.5.0.0 Language

N/A

### 3.5.6.0.0 Type

🔹 Messaging

### 3.5.7.0.0 Responsibilities

- Guarantee message delivery between services
- Enable event-driven communication patterns
- Queue tasks for background workers

### 3.5.8.0.0 Components

- Queues (for commands)
- Topics/Subscriptions (for events)

### 3.5.9.0.0 Interfaces

*No items available*

### 3.5.10.0.0 Dependencies

*No items available*

### 3.5.11.0.0 Constraints

*No items available*

## 3.6.0.0.0 Persistence

### 3.6.1.0.0 Id

persistence

### 3.6.2.0.0 Name

Persistence Layer

### 3.6.3.0.0 Description

Manages the state of the application. Includes the primary transactional database, a cache for performance, and blob storage for unstructured data like images and documents.

### 3.6.4.0.0 Technologystack

Azure Database for PostgreSQL 16 (with PostGIS), Azure Cache for Redis 7, Azure Blob Storage

### 3.6.5.0.0 Language

SQL

### 3.6.6.0.0 Type

🔹 Persistence

### 3.6.7.0.0 Responsibilities

- Provide durable storage for all application data
- Support geospatial queries as per REQ-FUNC-002
- Provide low-latency access to frequently used data via caching
- Store binary files like invoices and signatures

### 3.6.8.0.0 Components

- PostgreSQL Database
- Redis Cache
- Blob Storage Container

### 3.6.9.0.0 Interfaces

*No items available*

### 3.6.10.0.0 Dependencies

*No items available*

### 3.6.11.0.0 Constraints

- {'type': 'Reliability', 'description': 'Must support a Recovery Point Objective (RPO) of < 15 minutes (REQ-REL-002) and Recovery Time Objective (RTO) of < 4 hours (REQ-REL-001).'}

# 4.0.0.0.0 Quality Attributes

## 4.1.0.0.0 Performance

### 4.1.1.0.0 Tactics

- Use of Redis for caching frequently accessed data (Brands, Product Models, Service Area data)
- Use of WebSockets (via SignalR) for real-time GPS location updates to meet < 2s latency (REQ-PERF-002)
- Asynchronous processing of OCR jobs using a message queue to prevent API blocking
- Database indexing as specified in the data model to optimize queries
- Using a read-replica database for the Reporting Service to isolate analytical workloads

### 4.1.2.0.0 Metrics

- P95 API latency < 250ms under standard load (REQ-PERF-001)
- End-to-end GPS location update latency < 2 seconds (REQ-PERF-002)

## 4.2.0.0.0 Scalability

### 4.2.1.0.0 Tactics

- Backend designed as stateless microservices
- Containerization of services using Docker
- Orchestration and auto-scaling via Azure Kubernetes Service (AKS) with Horizontal Pod Autoscalers (REQ-SCAL-001)

### 4.2.2.0.0 Approach

Horizontal

## 4.3.0.0.0 Security

| Property | Value |
|----------|-------|
| Authentication | OpenID Connect (OIDC) with JWT bearer tokens, mana... |
| Authorization | Role-Based Access Control (RBAC) enforced at the A... |
| Data Protection | All data in transit encrypted with TLS 1.2+. Sensi... |

## 4.4.0.0.0 Reliability

### 4.4.1.0.0 Tactics

- Deployment of multiple replicas for each microservice on AKS
- Use of Azure Database for PostgreSQL Point-in-Time Restore to meet RPO/RTO requirements (REQ-REL-001, REQ-REL-002)
- Asynchronous communication via Azure Service Bus for resilient inter-service communication
- Health checks for services to enable automated recovery by Kubernetes

## 4.5.0.0.0 Maintainability

### 4.5.1.0.0 Tactics

- Decomposition into fine-grained microservices based on business capabilities
- Application of Clean Architecture within each microservice to separate concerns
- Use of Dependency Injection throughout the .NET backend
- Comprehensive automated testing suite (unit, integration, end-to-end)

## 4.6.0.0.0 Extensibility

### 4.6.1.0.0 Tactics

- API-first design allows for new clients to be developed
- Microservices can be independently updated, replaced, or extended without impacting the entire system

# 5.0.0.0.0 Technology Stack

## 5.1.0.0.0 Primary Language

C# 12

## 5.2.0.0.0 Frameworks

- .NET 8
- ASP.NET Core 8
- Entity Framework Core 8
- React 18
- Flutter 3.19+

## 5.3.0.0.0 Database

| Property | Value |
|----------|-------|
| Type | PostgreSQL with PostGIS extension |
| Version | 16 |
| Orm | Entity Framework Core 8 with Npgsql provider |

## 5.4.0.0.0 Domain Specific Libraries

### 5.4.1.0.0 NetTopologySuite

#### 5.4.1.1.0 Name

NetTopologySuite

#### 5.4.1.2.0 Version

2.5+

#### 5.4.1.3.0 Purpose

To handle GEOMETRY and GEOGRAPHY data types within the .NET backend for geospatial features (REQ-FUNC-002).

#### 5.4.1.4.0 Domain

Field Service Management

### 5.4.2.0.0 Firebase Admin SDK for .NET

#### 5.4.2.1.0 Name

Firebase Admin SDK for .NET

#### 5.4.2.2.0 Version

Latest stable

#### 5.4.2.3.0 Purpose

To integrate with Firebase Cloud Messaging for sending push notifications (REQ-INTG-001).

#### 5.4.2.4.0 Domain

Third-Party Integrations

### 5.4.3.0.0 Azure AI Document Intelligence SDK

#### 5.4.3.1.0 Name

Azure AI Document Intelligence SDK

#### 5.4.3.2.0 Version

Latest stable

#### 5.4.3.3.0 Purpose

To integrate with an OCR service for extracting data from invoices (REQ-DATA-001).

#### 5.4.3.4.0 Domain

Third-Party Integrations

## 5.5.0.0.0 Infrastructure

| Property | Value |
|----------|-------|
| Logging | Serilog with sinks for Azure Monitor |
| Caching | Azure Cache for Redis 7 |
| Testing | xUnit, Moq (for .NET backend); Jest, React Testing... |

# 6.0.0.0.0 Backend Services

## 6.1.0.0.0 File processing

### 6.1.1.0.0 Name

OCR Processing Worker

### 6.1.2.0.0 Purpose

Listens for messages indicating a new invoice has been uploaded, downloads the file, sends it to the Azure AI Document Intelligence service, and persists the extracted results (REQ-DATA-001).

### 6.1.3.0.0 Type

🔹 File processing

### 6.1.4.0.0 Communication

Consumes messages from an Azure Service Bus queue.

## 6.2.0.0.0 Workflow

### 6.2.1.0.0 Name

Scheduled Job Worker

### 6.2.2.0.0 Purpose

Runs on a schedule to perform time-based tasks, primarily to query for pending ownership transfers and mark them as 'Expired' if they exceed the 72-hour window (REQ-BR-002).

### 6.2.3.0.0 Type

🔹 Workflow

### 6.2.4.0.0 Communication

Triggered by a scheduler (e.g., a Kubernetes CronJob or Azure Functions Timer Trigger).

# 7.0.0.0.0 Cross Cutting Concerns

| Property | Value |
|----------|-------|
| Logging | Structured logging implemented in all microservice... |
| Exception Handling | Global exception handling middleware in each ASP.N... |
| Configuration | Managed via Azure App Configuration for centralize... |
| Validation | Request DTOs are validated using the FluentValidat... |
| Security | JWT validation middleware in the API Gateway and i... |

