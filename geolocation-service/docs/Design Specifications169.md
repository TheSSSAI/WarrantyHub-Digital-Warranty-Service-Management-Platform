# 1 Analysis Metadata

| Property | Value |
|----------|-------|
| Analysis Timestamp | 2025-05-21T14:30:00Z |
| Repository Component Id | geolocation-service |
| Analysis Completeness Score | 98 |
| Critical Findings Count | 4 |
| Analysis Methodology | Systematic decomposition of cached architectural c... |

# 2 Repository Analysis

## 2.1 Repository Definition

### 2.1.1 Scope Boundaries

- Real-time ingestion of high-frequency GPS coordinates from technician mobile clients
- Broadcasting location updates to subscribed customer clients via WebSockets
- Management of active travel sessions and state (Travel Mode)
- Calculation of ETAs via external mapping APIs (e.g., Mapbox/Azure Maps)
- Persistence of location history for audit and compliance (24-hour retention)

### 2.1.2 Technology Stack

- Node.js (Runtime)
- NestJS v10.3.x (Framework)
- Socket.IO (WebSocket Protocol)
- Redis (Pub/Sub Backplane & Hot State Store)
- TimescaleDB / PostGIS (Time-series Persistence)
- Azure Maps / Mapbox API (External Geospatial Service)

### 2.1.3 Architectural Constraints

- End-to-end latency must be < 2 seconds (REQ-PERF-002)
- Must handle high concurrency of open WebSocket connections
- Strict isolation from stateless REST API services to prevent event loop blocking
- Must operate within Azure Kubernetes Service (AKS) with horizontal scaling support

### 2.1.4 Dependency Relationships

#### 2.1.4.1 Upstream_Auth: Identity Service

##### 2.1.4.1.1 Dependency Type

Upstream_Auth

##### 2.1.4.1.2 Target Component

Identity Service

##### 2.1.4.1.3 Integration Pattern

JWT Token Validation

##### 2.1.4.1.4 Reasoning

WebSocket connections must be authenticated upon handshake using the standard platform JWT.

#### 2.1.4.2.0 Context_Validation: Service Request Service

##### 2.1.4.2.1 Dependency Type

Context_Validation

##### 2.1.4.2.2 Target Component

Service Request Service

##### 2.1.4.2.3 Integration Pattern

Synchronous HTTP / Cached Lookup

##### 2.1.4.2.4 Reasoning

Must verify that a technician is actually assigned to the job ID they are attempting to broadcast location for.

#### 2.1.4.3.0 External_API: Azure Maps / Mapbox

##### 2.1.4.3.1 Dependency Type

External_API

##### 2.1.4.3.2 Target Component

Azure Maps / Mapbox

##### 2.1.4.3.3 Integration Pattern

HTTP Client (Circuit Breaker)

##### 2.1.4.3.4 Reasoning

Required for dynamic ETA calculation based on current coordinates.

### 2.1.5.0.0 Analysis Insights

This is a stateful microservice distinct from the standard REST API services. It requires a Redis Adapter for Socket.IO to enable horizontal scaling across multiple pods in AKS. The data model explicitly requires time-series optimization (TimescaleDB) rather than standard relational storage.

# 3.0.0.0.0 Requirements Mapping

## 3.1.0.0.0 Functional Requirements

### 3.1.1.0.0 Requirement Id

#### 3.1.1.1.0 Requirement Id

REQ-FUNC-009

#### 3.1.1.2.0 Requirement Description

Technician 'Travel Mode' shares real-time GPS location with customer

#### 3.1.1.3.0 Implementation Implications

- Implement WebSocket Gateway with namespaces/rooms per Job ID
- Create 'StartSharing' and 'StopSharing' event handlers

#### 3.1.1.4.0 Required Components

- NotificationGateway
- LocationService

#### 3.1.1.5.0 Analysis Reasoning

Core functionality requiring persistent connection management.

### 3.1.2.0.0 Requirement Id

#### 3.1.2.1.0 Requirement Id

US-044

#### 3.1.2.2.0 Requirement Description

User views technician live location and ETA on map

#### 3.1.2.3.0 Implementation Implications

- Implement client-side subscription to job-specific rooms
- Integrate ETA calculation logic on location update receipt

#### 3.1.2.4.0 Required Components

- EtaCalculationService
- RedisIoAdapter

#### 3.1.2.5.0 Analysis Reasoning

Requires efficient fan-out of location data to specific consumers.

### 3.1.3.0.0 Requirement Id

#### 3.1.3.1.0 Requirement Id

REQ-PERF-002

#### 3.1.3.2.0 Requirement Description

End-to-end latency < 2 seconds

#### 3.1.3.3.0 Implementation Implications

- Use in-memory Redis for immediate coordinate relay
- Decouple DB persistence from the broadcast loop (asynchronous write-behind)

#### 3.1.3.4.0 Required Components

- RedisCacheModule
- AsyncPersistenceWorker

#### 3.1.3.5.0 Analysis Reasoning

Direct DB writes on every location packet will violate latency SLOs.

## 3.2.0.0.0 Non Functional Requirements

### 3.2.1.0.0 Requirement Type

#### 3.2.1.1.0 Requirement Type

Scalability

#### 3.2.1.2.0 Requirement Specification

Horizontal scaling on AKS

#### 3.2.1.3.0 Implementation Impact

Must use Redis Adapter for Socket.IO

#### 3.2.1.4.0 Design Constraints

- Stateless application servers (sticky sessions handled by Ingress/Gateway)
- Redis as single source of truth for active rooms

#### 3.2.1.5.0 Analysis Reasoning

WebSocket connections are stateful; scaling requires a backplane to route messages between nodes.

### 3.2.2.0.0 Requirement Type

#### 3.2.2.1.0 Requirement Type

Data Retention

#### 3.2.2.2.0 Requirement Specification

Purge location data after 24 hours (REQ-FUNC-009)

#### 3.2.2.3.0 Implementation Impact

Configure TTL on Redis keys and retention policies on TimescaleDB hypertable

#### 3.2.2.4.0 Design Constraints

- Automated cleanup jobs
- Time-partitioned database tables

#### 3.2.2.5.0 Analysis Reasoning

Compliance and storage optimization requirement.

## 3.3.0.0.0 Requirements Analysis Summary

The service is a high-performance I/O bridge. Critical path is Technician -> WSS -> Redis -> WSS -> Customer. Persistence and ETA calculation are side-effects that must not block the primary relay loop.

# 4.0.0.0.0 Architecture Analysis

## 4.1.0.0.0 Architectural Patterns

### 4.1.1.0.0 Pattern Name

#### 4.1.1.1.0 Pattern Name

Hexagonal Architecture (Ports and Adapters)

#### 4.1.1.2.0 Pattern Application

Strict separation of WebSocket/HTTP adapters from Domain Location Logic

#### 4.1.1.3.0 Required Components

- InfrastructureModule
- DomainModule
- ApplicationModule

#### 4.1.1.4.0 Implementation Strategy

NestJS Modules enforcing boundaries; Gateways interact with Application Services via Interfaces.

#### 4.1.1.5.0 Analysis Reasoning

Allows switching underlying transport (e.g., swapping Socket.IO for Fastify/ws) without changing business logic.

### 4.1.2.0.0 Pattern Name

#### 4.1.2.1.0 Pattern Name

Pub/Sub Pattern

#### 4.1.2.2.0 Pattern Application

Broadcasting location updates across clustered instances

#### 4.1.2.3.0 Required Components

- Redis
- Socket.IO Redis Adapter

#### 4.1.2.4.0 Implementation Strategy

Configure NestJS WebSocketAdapter to use Redis IoAdapter.

#### 4.1.2.5.0 Analysis Reasoning

Essential for horizontal scalability in Kubernetes.

## 4.2.0.0.0 Integration Points

### 4.2.1.0.0 Integration Type

#### 4.2.1.1.0 Integration Type

Real-time Ingress/Egress

#### 4.2.1.2.0 Target Components

- Technician Mobile App
- Customer Mobile App

#### 4.2.1.3.0 Communication Pattern

Asynchronous / Full-Duplex (WebSockets)

#### 4.2.1.4.0 Interface Requirements

- Socket.IO v4 Protocol
- JWT Authorization Handshake

#### 4.2.1.5.0 Analysis Reasoning

Primary operational interface for the service.

### 4.2.2.0.0 Integration Type

#### 4.2.2.1.0 Integration Type

Persistence

#### 4.2.2.2.0 Target Components

- PostgreSQL (TimescaleDB)

#### 4.2.2.3.0 Communication Pattern

Asynchronous Write-Behind

#### 4.2.2.4.0 Interface Requirements

- TypeORM / Prisma with PostGIS support

#### 4.2.2.5.0 Analysis Reasoning

Location history storage for audit trails.

## 4.3.0.0.0 Layering Strategy

| Property | Value |
|----------|-------|
| Layer Organization | NestJS Modular Monolith structure specialized for ... |
| Component Placement | Gateways in Infrastructure/Messaging; ETA logic in... |
| Analysis Reasoning | Ensures testability and separation of concerns, cr... |

# 5.0.0.0.0 Database Analysis

## 5.1.0.0.0 Entity Mappings

- {'entity_name': 'TechnicianLocation', 'database_table': 'technician_locations', 'required_properties': ['timestamp (PK, Dimension)', 'technicianId (PK, Dimension)', 'serviceRequestId', 'latitude', 'longitude'], 'relationship_mappings': ['None (High volume insert, logical link only)'], 'access_patterns': ['High frequency inserts', 'Time-range reads for history replay'], 'analysis_reasoning': 'Mapped directly to TimescaleDB Hypertable concept from Diagram ID 73.'}

## 5.2.0.0.0 Data Access Requirements

### 5.2.1.0.0 Operation Type

#### 5.2.1.1.0 Operation Type

Write

#### 5.2.1.2.0 Required Methods

- insertLocationPoint

#### 5.2.1.3.0 Performance Constraints

Must support batched inserts or high-throughput stream

#### 5.2.1.4.0 Analysis Reasoning

Standard ORM save() may be too slow; consider bulk inserts or buffering.

### 5.2.2.0.0 Operation Type

#### 5.2.2.1.0 Operation Type

Read

#### 5.2.2.2.0 Required Methods

- getLatestLocation

#### 5.2.2.3.0 Performance Constraints

< 10ms

#### 5.2.2.4.0 Analysis Reasoning

Must fetch from Redis, not DB, for real-time needs.

## 5.3.0.0.0 Persistence Strategy

| Property | Value |
|----------|-------|
| Orm Configuration | TypeORM with TimescaleDB support enabled (or raw S... |
| Migration Requirements | Scripts to enable PostGIS and TimescaleDB extensio... |
| Analysis Reasoning | Standard Postgres is insufficient for time-series ... |

# 6.0.0.0.0 Sequence Analysis

## 6.1.0.0.0 Interaction Patterns

### 6.1.1.0.0 Sequence Name

#### 6.1.1.1.0 Sequence Name

Real-time Location Sharing (Sequence ID 379)

#### 6.1.1.2.0 Repository Role

Central Broker

#### 6.1.1.3.0 Required Interfaces

- ILocationGateway
- IEtaService

#### 6.1.1.4.0 Method Specifications

##### 6.1.1.4.1 Method Name

###### 6.1.1.4.1.1 Method Name

handleLocationUpdate

###### 6.1.1.4.1.2 Interaction Context

On 'location_update' socket event

###### 6.1.1.4.1.3 Parameter Analysis

Payload: { lat, long, heading, speed, timestamp }

###### 6.1.1.4.1.4 Return Type Analysis

Void (Ack to client)

###### 6.1.1.4.1.5 Analysis Reasoning

Triggers Redis broadcast, DB persist (async), and ETA recalc (throttled).

##### 6.1.1.4.2.0 Method Name

###### 6.1.1.4.2.1 Method Name

subscribeToJob

###### 6.1.1.4.2.2 Interaction Context

On 'join_job_room' socket event

###### 6.1.1.4.2.3 Parameter Analysis

jobId

###### 6.1.1.4.2.4 Return Type Analysis

Void

###### 6.1.1.4.2.5 Analysis Reasoning

Adds socket ID to Redis room for specific Service Request.

#### 6.1.1.5.0.0 Analysis Reasoning

Direct implementation of the defined business sequence for tracking.

### 6.1.2.0.0.0 Sequence Name

#### 6.1.2.1.0.0 Sequence Name

ETA Calculation (Sequence ID 400)

#### 6.1.2.2.0.0 Repository Role

Orchestrator

#### 6.1.2.3.0.0 Required Interfaces

- IMapProvider

#### 6.1.2.4.0.0 Method Specifications

- {'method_name': 'calculateEta', 'interaction_context': 'Periodically during active travel', 'parameter_analysis': 'Origin (Tech), Destination (Customer)', 'return_type_analysis': 'number (seconds)', 'analysis_reasoning': 'External API call wrapped in Circuit Breaker to prevent cascading failures.'}

#### 6.1.2.5.0.0 Analysis Reasoning

Required to enrich the location stream with value-add data.

## 6.2.0.0.0.0 Communication Protocols

- {'protocol_type': 'WebSocket (Socket.IO)', 'implementation_requirements': 'Namespace: /geolocation, Rooms: job_{id}', 'analysis_reasoning': 'Standard for bi-directional real-time communication in Node.js ecosystem.'}

# 7.0.0.0.0.0 Critical Analysis Findings

## 7.1.0.0.0.0 Finding Category

### 7.1.1.0.0.0 Finding Category

Architecture mismatch

### 7.1.2.0.0.0 Finding Description

Context mentions .NET SignalR in high-level architecture but repository specifies Node.js/NestJS.

### 7.1.3.0.0.0 Implementation Impact

Implementation must strictly follow the Repository specification (NestJS), implying a polyglot microservices environment. Do not use SignalR patterns; use Socket.IO patterns.

### 7.1.4.0.0.0 Priority Level

High

### 7.1.5.0.0.0 Analysis Reasoning

Following the wrong stack will result in total project failure.

## 7.2.0.0.0.0 Finding Category

### 7.2.1.0.0.0 Finding Category

Performance Risk

### 7.2.2.0.0.0 Finding Description

ETA Calculation API costs and latency.

### 7.2.3.0.0.0 Implementation Impact

Must implement throttling/debouncing on ETA calls (e.g., only every 30s or on significant movement) rather than on every location packet.

### 7.2.4.0.0.0 Priority Level

Medium

### 7.2.5.0.0.0 Analysis Reasoning

Calling Mapbox API every second for every technician will cause massive costs and latency.

## 7.3.0.0.0.0 Finding Category

### 7.3.1.0.0.0 Finding Category

Data Integrity

### 7.3.2.0.0.0 Finding Description

Technician offline/online state synchronization.

### 7.3.3.0.0.0 Implementation Impact

Need specific socket disconnect handlers to update Redis state immediately if a technician loses connection.

### 7.3.4.0.0.0 Priority Level

Medium

### 7.3.5.0.0.0 Analysis Reasoning

Customers must know if tracking stops due to network loss vs. job completion.

# 8.0.0.0.0.0 Analysis Traceability

## 8.1.0.0.0.0 Cached Context Utilization

Utilized Sequence Diagrams 379 and 400 for flow; Database Diagram 73 for TimescaleDB entity; Requirements REQ-PERF-002 for latency constraints.

## 8.2.0.0.0.0 Analysis Decision Trail

- Selected Socket.IO over ws based on NestJS ecosystem maturity
- Chose Redis Adapter for scaling based on AKS requirement
- Decoupled persistence to async write-behind to meet <2s latency

## 8.3.0.0.0.0 Assumption Validations

- Assumed TimescaleDB extension is available in the PostgreSQL instance
- Assumed authentication is handled via shared JWT secret or JWKS

## 8.4.0.0.0.0 Cross Reference Checks

- Verified 'Travel Mode' requirement against Functional Requirements
- Checked Database schema against TimescaleDB best practices

