# 1 Id

REPO-BS-005

# 2 Name

geolocation-service

# 3 Description

A highly specialized, performance-critical service responsible for managing real-time technician GPS tracking (REQ-FUNC-009). Its single purpose is to ingest a high-frequency stream of location updates from technicians' mobile apps via WebSockets and broadcast them to the corresponding customers with less than 2-second end-to-end latency (REQ-PERF-002). Decomposed from `warranty-hub-backend`, its isolation is paramount to protect the performance of the core, stateless REST APIs from the high-volume, stateful WebSocket traffic. This service is optimized for low-latency writes and fan-out broadcasts, likely using in-memory stores like Redis for temporary location data to meet its strict performance SLO.

# 4 Type

🔹 Infrastructure

# 5 Namespace

WarrantyHub.Services.Geolocation

# 6 Output Path

services/geolocation

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, WebSockets, Redis

# 10 Thirdparty Libraries

- @nestjs/websockets
- ioredis

# 11 Layer Ids

- service-layer

# 12 Dependencies

- REPO-CL-010
- REPO-SL-011

# 13 Requirements

- {'requirementId': '5.1 Performance'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Microservice

# 17 Architecture Map

- geolocation-service-007

# 18 Components Map

- geolocation-service-007

# 19 Requirements Map

- REQ-FUNC-009
- REQ-PERF-002

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-BK-001

## 20.3 Decomposition Reasoning

Isolates the most performance-sensitive and technologically distinct feature. Real-time, high-frequency WebSocket traffic has unique scaling, infrastructure, and code optimization requirements that are completely different from standard CRUD APIs. This separation prevents location tracking load from ever impacting core business transactions like product registration.

## 20.4 Extracted Responsibilities

- Ingesting technician GPS coordinates
- Broadcasting location updates to customers

## 20.5 Reusability Scope

- This is a highly specialized service with limited direct reusability, but it serves a critical product feature.

## 20.6 Development Benefits

- Allows for aggressive performance optimization without risk to other services.
- Simplifies the infrastructure of other services by offloading stateful WebSocket management.

# 21.0 Dependency Contracts

*No data available*

# 22.0 Exposed Contracts

## 22.1 Public Interfaces

- {'interface': 'IGeolocationGateway', 'methods': [], 'events': ['technician-location-update(LocationData)', 'subscribe-to-technician(technicianId)'], 'properties': [], 'consumers': ['REPO-FE-003']}

# 23.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Standard NestJS DI. |
| Event Communication | Purely WebSocket-based. No event bus integration. |
| Data Flow | Technician App -> WebSocket -> Geolocation Service... |
| Error Handling | Send error messages over the socket connection. |
| Async Patterns | Optimized for non-blocking I/O to handle many conc... |

# 24.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Use NestJS Gateways. Leverage Redis pub/sub for br... |
| Performance Considerations | This service is all about performance. Use Redis f... |
| Security Considerations | Secure the WebSocket endpoint. Authorize subscript... |
| Testing Approach | Load testing is critical to ensure the service mee... |

# 25.0 Scope Boundaries

## 25.1 Must Implement

- Receiving and broadcasting GPS data in real-time.

## 25.2 Must Not Implement

- Any business logic, service request status updates, or persistent data storage beyond a short TTL.

## 25.3 Extension Points

- Calculating ETA based on location data and traffic information.

## 25.4 Validation Rules

- Validate incoming location data for correctness (valid lat/lon).

