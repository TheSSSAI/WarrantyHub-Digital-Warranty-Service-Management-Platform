# 1 Id

REPO-BS-004

# 2 Name

service-request-service

# 3 Description

This service orchestrates the entire lifecycle of a service request ticket. Decomposed from `warranty-hub-backend`, it is the most workflow-intensive component, managing states from 'Requested' through to 'Resolved' and 'Disputed'. It is responsible for the core business process of routing new requests to the correct service center by consuming data from the Product and Service Center services. It also hosts the real-time, two-way chat functionality via WebSockets (REQ-FUNC-007) and handles the capture of customer digital signatures (REQ-FUNC-010). Its separation is critical for managing the complexity of the service workflow and for isolating the stateful, real-time WebSocket connections from the stateless REST APIs of other services.

# 4 Type

🔹 Business Logic

# 5 Namespace

WarrantyHub.Services.ServiceRequest

# 6 Output Path

services/service-request

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, PostgreSQL, WebSockets (via NestJS Gateway)

# 10 Thirdparty Libraries

- pg
- @nestjs/websockets

# 11 Layer Ids

- service-layer

# 12 Dependencies

- REPO-BS-002
- REPO-BS-003
- REPO-CL-010
- REPO-SL-011

# 13 Requirements

- {'requirementId': '3.4 Service Request Module'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Microservice

# 17 Architecture Map

- service-request-service-005

# 18 Components Map

- service-request-service-005

# 19 Requirements Map

- REQ-FUNC-007
- REQ-FUNC-008
- REQ-FUNC-010

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-BK-001

## 20.3 Decomposition Reasoning

Isolates the complex business workflow and state management of a service ticket. It also contains stateful WebSocket connections, which have different scaling and deployment considerations than stateless REST services. This separation prevents workflow complexity from leaking into other domains.

## 20.4 Extracted Responsibilities

- Service request creation and lifecycle management
- Routing logic for assigning requests to service centers
- Hosting real-time chat via WebSockets
- Handling service disputes

## 20.5 Reusability Scope

- Acts as the central hub for all service-related activities.

## 20.6 Development Benefits

- A dedicated team can focus on improving the service workflow.
- Independent scaling of WebSocket infrastructure based on active users.

# 21.0 Dependency Contracts

## 21.1 Repo-Bs-002

### 21.1.1 Required Interfaces

- {'interface': 'IProductApi', 'methods': ['GET /products/{id}/validate-warranty() : WarrantyStatusDto'], 'events': [], 'properties': []}

### 21.1.2 Integration Pattern

Synchronous REST API call during request creation.

### 21.1.3 Communication Protocol

HTTP/S

## 21.2.0 Repo-Bs-003

### 21.2.1 Required Interfaces

- {'interface': 'IServiceCenterApi', 'methods': ['GET /service-centers/find-by-location(lat, lon, brandId) : CenterDto[]'], 'events': [], 'properties': []}

### 21.2.2 Integration Pattern

Synchronous REST API call for routing logic.

### 21.2.3 Communication Protocol

HTTP/S

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'IServiceRequestApi', 'methods': ['POST /service-requests(CreateRequestDto) : RequestDto', 'GET /service-requests/{id} : RequestDetailsDto', 'PUT /service-requests/{id}/status(UpdateStatusDto) : void'], 'events': ['ServiceRequestStatusChanged(requestId, newStatus, userId)'], 'properties': [], 'consumers': ['REPO-BS-006', 'REPO-FE-002', 'REPO-FE-003']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Standard NestJS DI. |
| Event Communication | Publishes status change events to Azure Service Bu... |
| Data Flow | Coordinates reads from Product/ServiceCenter servi... |
| Error Handling | API errors via HTTP codes; WebSocket errors via er... |
| Async Patterns | Heavy use of async/await for I/O. Real-time commun... |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Implement a NestJS Gateway for WebSocket communica... |
| Performance Considerations | Use a Redis backplane for SignalR/WebSockets to sc... |
| Security Considerations | Authorize WebSocket connections and message handle... |
| Testing Approach | Test WebSocket handlers with a mock client. Integr... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- Ticket creation, status updates, chat, disputes, routing.

## 25.2.0 Must Not Implement

- Product data management, user authentication, raw GPS coordinate handling.

## 25.3.0 Extension Points

- Adding automated escalations based on SLAs.
- Integrating with a knowledge base for troubleshooting.

## 25.4.0 Validation Rules

- Ensure a product is under a valid warranty before creating a ticket.
- Validate status transitions (e.g., cannot go from 'Resolved' to 'Assigned').

