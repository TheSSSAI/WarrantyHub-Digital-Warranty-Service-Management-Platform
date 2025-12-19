# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-BS-005 |
| Extraction Timestamp | 2025-05-21T14:30:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-FUNC-009

#### 1.2.1.2 Requirement Text

The technician's mobile application shall provide a 'Travel Mode' feature that... shares the technician's real-time GPS location with the corresponding customer.

#### 1.2.1.3 Validation Criteria

- Verify that location updates are received by the server via WebSocket.
- Verify that updates are broadcast only to the specific room for the Service Request ID.

#### 1.2.1.4 Implementation Implications

- Implement Socket.IO Gateway with 'technician' and 'customer' namespaces or rooms.
- Use Redis Pub/Sub to distribute messages across scaled service instances.

#### 1.2.1.5 Extraction Reasoning

Core functionality of this microservice.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-PERF-002

#### 1.2.2.2 Requirement Text

The end-to-end latency for a technician's GPS location update... must be less than 2 seconds.

#### 1.2.2.3 Validation Criteria

- Verify end-to-end transmission time is < 2000ms.
- Verify non-blocking persistence (fire-and-forget to DB).

#### 1.2.2.4 Implementation Implications

- Use in-memory Redis for the 'hot' path of location distribution.
- Offload historical persistence to an asynchronous background worker or write-behind queue.

#### 1.2.2.5 Extraction Reasoning

Determines the architectural pattern (Redis vs DB) for real-time data flow.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

US-044

#### 1.2.3.2 Requirement Text

User views technician live location and ETA on map.

#### 1.2.3.3 Validation Criteria

- Verify ETA is calculated based on current coordinates and destination.
- Verify ETA updates are throttled to prevent external API rate limits.

#### 1.2.3.4 Implementation Implications

- Integrate with Azure Maps or Mapbox API for ETA calculation.
- Implement caching for ETA values (e.g., recalculate only every 60s or 500m change).

#### 1.2.3.5 Extraction Reasoning

Adds external API dependency and business logic to the streaming service.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

GeolocationGateway

#### 1.3.1.2 Component Specification

Socket.IO Gateway managing persistent connections, authentication, and event routing.

#### 1.3.1.3 Implementation Requirements

- Use @nestjs/websockets.
- Implement OnGatewayConnection/Disconnect for session tracking.
- Use RedisAdapter for clustering.

#### 1.3.1.4 Architectural Context

Presentation/Interface Layer (WebSocket)

#### 1.3.1.5 Extraction Reasoning

Primary entry point for mobile clients.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

LocationTrackingService

#### 1.3.2.2 Component Specification

Service handling business logic: broadcasting updates, calculating ETA, and queuing persistence.

#### 1.3.2.3 Implementation Requirements

- Interface with Redis for state.
- Interface with External Map API.
- Interface with Persistence Repository.

#### 1.3.2.4 Architectural Context

Application Service Layer

#### 1.3.2.5 Extraction Reasoning

Orchestrates the data flow defined in Sequence Diagram 379.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

TimescalePersistenceWorker

#### 1.3.3.2 Component Specification

Background process to batch-insert location points into TimescaleDB.

#### 1.3.3.3 Implementation Requirements

- Buffer incoming location points.
- Flush to DB every N seconds or M records.

#### 1.3.3.4 Architectural Context

Infrastructure/Persistence Layer

#### 1.3.3.5 Extraction Reasoning

Satisfies the need for audit logs (REQ-AUDIT-001) without blocking the real-time stream.

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Real-Time Interface Layer

#### 1.4.1.2 Layer Responsibilities

Handling WebSocket connections, authenticating headers, routing messages to rooms.

#### 1.4.1.3 Layer Constraints

- Must be stateless (state offloaded to Redis).
- Must handle high concurrency.

#### 1.4.1.4 Implementation Patterns

- Gateway Pattern
- Adapter Pattern (Redis IoAdapter)

#### 1.4.1.5 Extraction Reasoning

Required to support horizontal scaling on AKS (REQ-SCAL-001).

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Domain Logic Layer

#### 1.4.2.2 Layer Responsibilities

ETA calculation, geofencing checks (optional), authorization validation.

#### 1.4.2.3 Layer Constraints

- Async execution for external API calls.

#### 1.4.2.4 Implementation Patterns

- Service Layer
- Proxy Pattern (for External APIs)

#### 1.4.2.5 Extraction Reasoning

Encapsulates the business rules for tracking.

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IIdentityService

#### 1.5.1.2 Source Repository

REPO-BS-001

#### 1.5.1.3 Method Contracts

- {'method_name': 'verifyToken', 'method_signature': 'verifyToken(token: string): Promise<UserContext>', 'method_purpose': 'Validates the JWT sent during the WebSocket handshake.', 'integration_context': 'Connection establishment.'}

#### 1.5.1.4 Integration Pattern

Library Import (Shared Guard) / Internal HTTP

#### 1.5.1.5 Communication Protocol

In-Process / HTTP

#### 1.5.1.6 Extraction Reasoning

Secure WebSockets require token validation on connect.

### 1.5.2.0 Interface Name

#### 1.5.2.1 Interface Name

IServiceRequestService

#### 1.5.2.2 Source Repository

REPO-BS-004

#### 1.5.2.3 Method Contracts

##### 1.5.2.3.1 Method Name

###### 1.5.2.3.1.1 Method Name

validateAssignment

###### 1.5.2.3.1.2 Method Signature

validateAssignment(jobId: string, technicianId: string): Promise<boolean>

###### 1.5.2.3.1.3 Method Purpose

Verifies that the technician is currently assigned to the job they are broadcasting for.

###### 1.5.2.3.1.4 Integration Context

On 'start_travel_mode' event.

##### 1.5.2.3.2.0 Method Name

###### 1.5.2.3.2.1 Method Name

getJobDestination

###### 1.5.2.3.2.2 Method Signature

getJobDestination(jobId: string): Promise<GeoPoint>

###### 1.5.2.3.2.3 Method Purpose

Retrieves the customer address for ETA calculation.

###### 1.5.2.3.2.4 Integration Context

On 'start_travel_mode' event (cached for session).

#### 1.5.2.4.0.0 Integration Pattern

Synchronous HTTP / gRPC

#### 1.5.2.5.0.0 Communication Protocol

HTTP/2 (gRPC preferred)

#### 1.5.2.6.0.0 Extraction Reasoning

Geolocation service needs context about the job to authorize streams and calculate ETA.

### 1.5.3.0.0.0 Interface Name

#### 1.5.3.1.0.0 Interface Name

IMapProvider

#### 1.5.3.2.0.0 Source Repository

External (Azure Maps)

#### 1.5.3.3.0.0 Method Contracts

- {'method_name': 'getRouteDirections', 'method_signature': 'getRouteDirections(origin: GeoPoint, dest: GeoPoint): Promise<RouteSummary>', 'method_purpose': 'Calculates distance and travel time.', 'integration_context': 'Periodic interval during tracking (e.g., every 60s).'}

#### 1.5.3.4.0.0 Integration Pattern

External API Adapter

#### 1.5.3.5.0.0 Communication Protocol

HTTPS

#### 1.5.3.6.0.0 Extraction Reasoning

Required for US-044 (ETA display).

## 1.6.0.0.0.0 Exposed Interfaces

- {'interface_name': 'Geolocation WebSocket API', 'consumer_repositories': ['REPO-FE-003'], 'method_contracts': [{'method_name': 'join_room', 'method_signature': "emit('join_room', { jobId: string })", 'method_purpose': "Allows customer or admin to subscribe to a job's location stream.", 'implementation_requirements': 'Validates user has rights to view this job.'}, {'method_name': 'location_update', 'method_signature': "on('location_update', (data: LocationDto) => void)", 'method_purpose': 'Receives stream of coordinates from technician.', 'implementation_requirements': 'Updates Redis cache and broadcasts to room.'}], 'service_level_requirements': ['Sub-100ms processing time', 'Guaranteed ordering not required (latest update wins)'], 'implementation_constraints': ['Socket.IO v4 client required'], 'extraction_reasoning': 'The primary interface for the mobile applications.'}

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

NestJS v10.3.x, Socket.IO

### 1.7.2.0.0.0 Integration Technologies

- Redis (Pub/Sub)
- TimescaleDB (Time-series)
- Azure Maps API

### 1.7.3.0.0.0 Performance Constraints

Must handle high write throughput (e.g., 1000 concurrent technicians sending updates every 5s).

### 1.7.4.0.0.0 Security Requirements

WSS (TLS 1.2), JWT Authentication, RBAC (Technician vs Customer scopes).

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | Mapped all upstream (Mobile), downstream (Maps, DB... |
| Cross Reference Validation | Validated against Sequence Diagram 379 and 400. Co... |
| Implementation Readiness Assessment | High. Clear boundaries and protocols defined. |
| Quality Assurance Confirmation | Integration patterns ensure isolation of high-freq... |

