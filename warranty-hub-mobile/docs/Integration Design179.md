# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-FE-003 |
| Extraction Timestamp | 2025-05-25T15:30:00Z |
| Mapping Validation Score | 98% |
| Context Completeness Score | 95% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-FUNC-009

#### 1.2.1.2 Requirement Text

Technician 'Travel Mode' shares real-time GPS location with customer via mobile app.

#### 1.2.1.3 Validation Criteria

- Verify app requests 'Always' or 'While Using' location permissions based on OS version.
- Verify location updates are sent via WebSocket while app is backgrounded.
- Verify updates cease immediately upon job status change.

#### 1.2.1.4 Implementation Implications

- Integrate 'react-native-background-geolocation' or similar robust library for battery-efficient tracking.
- Implement Socket.IO client for real-time transmission to match backend 'geolocation-service'.
- Handle OS-level background execution limits.

#### 1.2.1.5 Extraction Reasoning

Core feature for Technician persona requiring native module integration and real-time socket communication.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

US-075

#### 1.2.2.2 Requirement Text

Technician: User's Offline Actions are Queued for Syncing

#### 1.2.2.3 Validation Criteria

- Verify actions (e.g., status update, notes) are persisted locally when network is unreachable.
- Verify auto-sync triggers upon network restoration.
- Verify FIFO processing order of queued actions.

#### 1.2.2.4 Implementation Implications

- Implement 'OfflineQueueManager' using WatermelonDB for persistence.
- Use 'NetInfo' to listen for connectivity changes.
- Implement a 'SyncEngine' to replay requests to the API Gateway.

#### 1.2.2.5 Extraction Reasoning

Critical reliability requirement for field service operations.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-INTG-001

#### 1.2.3.2 Requirement Text

Integrate with Firebase Cloud Messaging (FCM) for push notifications.

#### 1.2.3.3 Validation Criteria

- Verify device token registration on app launch.
- Verify deep linking to specific screens (Chat, Job Details) from notification taps.

#### 1.2.3.4 Implementation Implications

- Integrate '@react-native-firebase/messaging'.
- Implement 'NotificationHandler' to manage foreground/background/quit state message reception.
- Define deep link URL schemes (e.g., 'warrantyhub://job/{id}').

#### 1.2.3.5 Extraction Reasoning

Primary channel for user alerts and updates.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-FUNC-007

#### 1.2.4.2 Requirement Text

Real-time, two-way chat interface.

#### 1.2.4.3 Validation Criteria

- Verify messages appear in real-time without polling.
- Verify chat history loads from local cache for offline viewing.

#### 1.2.4.4 Implementation Implications

- Use Socket.IO for bi-directional messaging.
- Persist chat history in WatermelonDB for offline access.

#### 1.2.4.5 Extraction Reasoning

Requires integration with 'service-request-service' WebSocket gateway.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

NetworkingModule

#### 1.3.1.2 Component Specification

Centralized networking layer handling REST (Axios) and WebSocket (Socket.IO) connections.

#### 1.3.1.3 Implementation Requirements

- Automatic JWT injection in headers.
- Token refresh logic (Interceptor).
- Standardized error handling and transformation.

#### 1.3.1.4 Architectural Context

Infrastructure Layer - Communication

#### 1.3.1.5 Extraction Reasoning

Ensures consistent communication with the API Gateway and handles auth state.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

OfflineSyncEngine

#### 1.3.2.2 Component Specification

Background service that monitors network state and processes the persistent mutation queue.

#### 1.3.2.3 Implementation Requirements

- Read from 'OfflineQueue' table in WatermelonDB.
- Execute mutations serially.
- Handle non-retryable errors (e.g., 400 Bad Request) by flagging items for user intervention.

#### 1.3.2.4 Architectural Context

Application Layer - Data Reliability

#### 1.3.2.5 Extraction Reasoning

Direct implementation of US-075.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

LocationService

#### 1.3.3.2 Component Specification

Native module wrapper for GPS tracking.

#### 1.3.3.3 Implementation Requirements

- Configure background location constraints.
- Emit coordinates to NetworkingModule for socket transmission.
- Manage battery optimization settings.

#### 1.3.3.4 Architectural Context

Infrastructure Layer - Native Adapter

#### 1.3.3.5 Extraction Reasoning

Required for REQ-FUNC-009.

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Presentation Layer

#### 1.4.1.2 Layer Responsibilities

React Native screens, components, and view models (hooks).

#### 1.4.1.3 Layer Constraints

- Must be platform-agnostic (iOS/Android) where possible.
- Must support Dark Mode/Light Mode via theming.

#### 1.4.1.4 Implementation Patterns

- Component-Container
- Custom Hooks

#### 1.4.1.5 Extraction Reasoning

Standard frontend architecture.

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Infrastructure Layer

#### 1.4.2.2 Layer Responsibilities

API communication, local database access, native device features (Camera, GPS).

#### 1.4.2.3 Layer Constraints

- Must handle platform differences (Permissions, File Paths).
- Must abstract external dependencies.

#### 1.4.2.4 Implementation Patterns

- Repository Pattern
- Adapter Pattern

#### 1.4.2.5 Extraction Reasoning

Isolates the app from network and device specifics.

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IApiGateway

#### 1.5.1.2 Source Repository

REPO-GW-013

#### 1.5.1.3 Method Contracts

##### 1.5.1.3.1 Method Name

###### 1.5.1.3.1.1 Method Name

auth/login

###### 1.5.1.3.1.2 Method Signature

POST /api/v1/auth/login

###### 1.5.1.3.1.3 Method Purpose

Authenticate user and retrieve JWT.

###### 1.5.1.3.1.4 Integration Context

User Login Screen.

##### 1.5.1.3.2.0 Method Name

###### 1.5.1.3.2.1 Method Name

technician/jobs

###### 1.5.1.3.2.2 Method Signature

GET /api/v1/technician/jobs

###### 1.5.1.3.2.3 Method Purpose

Fetch assigned jobs for the logged-in technician.

###### 1.5.1.3.2.4 Integration Context

Dashboard load or Pull-to-Refresh.

##### 1.5.1.3.3.0 Method Name

###### 1.5.1.3.3.1 Method Name

service-requests/status

###### 1.5.1.3.3.2 Method Signature

PATCH /api/v1/service-requests/{id}/status

###### 1.5.1.3.3.3 Method Purpose

Update status (e.g., 'En Route', 'Resolved').

###### 1.5.1.3.3.4 Integration Context

Technician workflow actions.

#### 1.5.1.4.0.0 Integration Pattern

REST / HTTP 1.1

#### 1.5.1.5.0.0 Communication Protocol

HTTPS (JSON)

#### 1.5.1.6.0.0 Extraction Reasoning

The mobile app routes all HTTP traffic through the API Gateway.

### 1.5.2.0.0.0 Interface Name

#### 1.5.2.1.0.0 Interface Name

IGeolocationGateway

#### 1.5.2.2.0.0 Source Repository

REPO-BS-005

#### 1.5.2.3.0.0 Method Contracts

- {'method_name': 'update_location', 'method_signature': "socket.emit('update_location', { lat, long, heading, speed, jobId })", 'method_purpose': 'Stream real-time GPS coordinates.', 'integration_context': 'Active Travel Mode background task.'}

#### 1.5.2.4.0.0 Integration Pattern

WebSocket (Socket.IO)

#### 1.5.2.5.0.0 Communication Protocol

WSS

#### 1.5.2.6.0.0 Extraction Reasoning

Direct connection to Geolocation Service via Gateway for low-latency tracking. Note: Corrected from SignalR to Socket.IO to match backend service definition.

### 1.5.3.0.0.0 Interface Name

#### 1.5.3.1.0.0 Interface Name

IChatGateway

#### 1.5.3.2.0.0 Source Repository

REPO-BS-004

#### 1.5.3.3.0.0 Method Contracts

##### 1.5.3.3.1.0 Method Name

###### 1.5.3.3.1.1 Method Name

send_message

###### 1.5.3.3.1.2 Method Signature

socket.emit('send_message', { content, requestId })

###### 1.5.3.3.1.3 Method Purpose

Send a chat message.

###### 1.5.3.3.1.4 Integration Context

Chat Screen.

##### 1.5.3.3.2.0 Method Name

###### 1.5.3.3.2.1 Method Name

receive_message

###### 1.5.3.3.2.2 Method Signature

socket.on('new_message', (msg) => void)

###### 1.5.3.3.2.3 Method Purpose

Receive real-time chat messages.

###### 1.5.3.3.2.4 Integration Context

Chat Screen / Global Listener.

#### 1.5.3.4.0.0 Integration Pattern

WebSocket (Socket.IO)

#### 1.5.3.5.0.0 Communication Protocol

WSS

#### 1.5.3.6.0.0 Extraction Reasoning

Real-time chat functionality.

## 1.6.0.0.0.0 Exposed Interfaces

- {'interface_name': 'Deep Link Handlers', 'consumer_repositories': ['External OS (iOS/Android)', 'REPO-BS-006 (Notification Service)'], 'method_contracts': [{'method_name': 'warrantyhub://chat/{id}', 'method_signature': 'handleOpenUrl(url)', 'method_purpose': 'Navigate directly to chat screen.', 'implementation_requirements': 'Parse params, check auth state, navigate or queue navigation.'}, {'method_name': 'warrantyhub://job/{id}', 'method_signature': 'handleOpenUrl(url)', 'method_purpose': 'Navigate directly to job details.', 'implementation_requirements': 'Parse params, check auth state, navigate or queue navigation.'}], 'service_level_requirements': ['Navigation < 1s'], 'implementation_constraints': ['Must handle cold start vs warm start.'], 'extraction_reasoning': 'Required for Push Notification interactions.'}

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

React Native 0.73.x, TypeScript. State management via Zustand/React Query.

### 1.7.2.0.0.0 Integration Technologies

- Socket.IO Client (v4)
- Axios (REST)
- WatermelonDB (SQLite Sync)
- @react-native-firebase/messaging

### 1.7.3.0.0.0 Performance Constraints

60fps UI. Minimal battery drain for background location. Offline-first read access < 100ms.

### 1.7.4.0.0.0 Security Requirements

JWT storage in SecureStore/KeyChain. SSL Pinning recommended. No PII logging.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | Mapped all backend dependencies including the corr... |
| Cross Reference Validation | Verified endpoints against API Gateway policies an... |
| Implementation Readiness Assessment | High. Clear patterns for offline sync, real-time c... |
| Quality Assurance Confirmation | Integration design adheres to mobile performance a... |

