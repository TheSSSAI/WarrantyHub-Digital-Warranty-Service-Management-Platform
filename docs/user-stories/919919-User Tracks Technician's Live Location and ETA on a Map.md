# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-072 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Tracks Technician's Live Location and ETA on ... |
| As A User Story | As a User waiting for a service appointment, I wan... |
| User Persona | The Consumer/End-User who has raised a service req... |
| Business Value | Increases customer satisfaction and trust by provi... |
| Functional Area | Service Request Management |
| Story Theme | Real-Time Service Tracking |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User views live tracking when technician is on the way

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a user with a service request where the technician's status is 'Technician Assigned'

### 3.1.5 When

the technician updates their job status to 'On The Way' AND activates 'Travel Mode' in their app

### 3.1.6 Then

the service request details screen on my app displays a map interface showing the technician's live location, my service address location, and an estimated time of arrival (ETA).

### 3.1.7 Validation Notes

Verify that the map view appears automatically upon the technician activating travel mode. The map should show two distinct pins/icons.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Map and ETA update in near real-time

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the live tracking map for my service request

### 3.2.5 When

the technician is moving towards my location

### 3.2.6 Then

the technician's icon on the map moves to reflect their new position with a latency of less than 2 seconds, AND the ETA is recalculated and updated on the screen at least every 60 seconds.

### 3.2.7 Validation Notes

Use a GPS simulator or conduct a field test to verify location updates are smooth and the ETA changes based on location and simulated traffic data from the map provider.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Tracking stops when technician arrives or deactivates travel mode

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am viewing the live tracking map

### 3.3.5 When

the technician either updates their job status to 'Work In Progress' OR manually deactivates 'Travel Mode'

### 3.3.6 Then

the map interface is removed and replaced with a status message, such as 'The technician has arrived.'

### 3.3.7 Validation Notes

Test both trigger conditions (status update and manual deactivation) to ensure the tracking view is correctly dismissed.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Technician is on the way but has not enabled location sharing

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I have a service request and the technician's status is 'On The Way'

### 3.4.5 When

the technician has NOT activated 'Travel Mode'

### 3.4.6 Then

the map interface is NOT displayed, and I see a message like 'Technician is on the way. Live location will be available once the technician enables it.'

### 3.4.7 Validation Notes

Verify that the UI distinguishes between the 'On The Way' status and the active 'Travel Mode' state.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Handling technician's GPS signal loss

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am viewing the live tracking map

### 3.5.5 When

the system stops receiving location updates from the technician's device for more than 30 seconds

### 3.5.6 Then

the technician's icon on the map remains at its last known position, AND a visual indicator (e.g., a timestamp 'Last updated 1 minute ago') appears, AND the ETA may display 'ETA recalculating...' or become unavailable.

### 3.5.7 Validation Notes

Simulate a network or GPS failure on the technician's device to verify the user's UI gracefully handles stale data.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User's device loses network connectivity

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am viewing the live tracking map

### 3.6.5 When

my mobile device loses internet connectivity

### 3.6.6 Then

the app displays a clear offline indicator, AND the map shows the last received data until connectivity is restored, at which point it syncs automatically.

### 3.6.7 Validation Notes

Enable airplane mode on the user's device during live tracking to test the offline handling and automatic reconnection.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

ETA calculation service is unavailable

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I am viewing the live tracking map

### 3.7.5 When

the external mapping service (Azure Maps) fails to provide an ETA

### 3.7.6 Then

the map and technician location continue to display correctly, but the ETA field shows a message like 'ETA unavailable'.

### 3.7.7 Validation Notes

Use a mock service or tool like Charles Proxy to simulate an API failure from the mapping service and verify the UI does not crash.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An interactive map view (e.g., using Azure Maps SDK).
- A distinct icon for the technician's location (e.g., a van).
- A distinct icon for the user's service address (e.g., a house pin).
- A clearly visible text element to display the ETA.
- Zoom in/out controls for the map.
- A status message area for non-tracking states (e.g., 'Technician has arrived').

## 4.2.0 User Interactions

- The user can pan and zoom the map to explore the route.
- The map should auto-zoom initially to fit both the technician and the destination in the viewport.

## 4.3.0 Display Requirements

- The ETA should be human-readable (e.g., 'Arriving in 12 minutes', 'Arriving at 2:45 PM').
- The technician's icon should smoothly animate between location updates.

## 4.4.0 Accessibility Needs

- All text (ETA, status messages) must meet WCAG 2.1 AA contrast ratios.
- A text-based equivalent of the visual information should be available to screen readers (e.g., 'Technician is currently 2.5 miles away and is expected to arrive in 12 minutes.').

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Location data for a technician is only shared with the specific user whose service request is in an active 'Travel Mode' state.

### 5.1.3 Enforcement Point

Backend Location Service (WebSocket Gateway)

### 5.1.4 Violation Handling

Connection is refused or terminated if the requesting user is not authorized for the specific job's location stream.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Location sharing automatically ceases after a maximum of 4 hours of continuous activation for a single job to prevent battery drain and prolonged data sharing.

### 5.2.3 Enforcement Point

Technician Mobile Application

### 5.2.4 Violation Handling

The technician is notified, and 'Travel Mode' is automatically deactivated. The user's tracking screen is updated accordingly.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-054

#### 6.1.1.2 Dependency Reason

This story cannot be implemented until the Technician has the ability to activate 'Travel Mode' and start broadcasting their location from their mobile app.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-053

#### 6.1.2.2 Dependency Reason

The Technician must be able to update their job status to 'On The Way', which is a primary trigger for this feature's context.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-040

#### 6.1.3.2 Dependency Reason

A user-facing screen to track the overall status of a service request must exist to embed this map feature into.

## 6.2.0.0 Technical Dependencies

- A real-time backend service (Location Service) capable of handling WebSocket connections for broadcasting location data.
- Mobile app (user) integration with a mapping SDK (Azure Maps).
- Mobile app (technician) integration with a location service SDK to capture and transmit GPS data reliably in the background.

## 6.3.0.0 Data Dependencies

- Access to the service request record, including the user's service address.
- Access to the assigned technician's ID to subscribe to the correct location stream.

## 6.4.0.0 External Dependencies

- Azure Maps API for map tiles, routing, and ETA calculations. The service must be available and responsive.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Location updates from the technician's device to the user's map display shall have a latency of less than 2 seconds.
- The feature should be optimized to minimize battery consumption on both the user's and technician's devices.

## 7.2.0.0 Security

- All location data must be transmitted over a secure, encrypted channel (WSS).
- The backend must enforce strict authorization, ensuring only the customer associated with the active service request can access a technician's location stream.
- Location data must not be stored long-term; it is ephemeral and for in-transit use only.

## 7.3.0.0 Usability

- The map interface must be intuitive and require no user training.
- The ETA and technician location must be the most prominent elements on the screen.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards, particularly for text contrast and screen reader support.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported iOS (14+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

High

## 8.2.0.0 Complexity Factors

- Requires real-time, bi-directional communication using WebSockets, which is more complex than standard REST.
- Involves three separate components: User App, Technician App, and a new Backend Location Service.
- Handling background location services on both iOS and Android has platform-specific challenges and requires careful permission handling and battery optimization.
- Integration with a third-party mapping service (Azure Maps) for ETA calculation adds an external dependency.

## 8.3.0.0 Technical Risks

- Inaccurate GPS data from the technician's device.
- High battery drain on the technician's device due to continuous GPS usage.
- Scalability of the WebSocket server under high load (many concurrent technicians).
- Potential for high costs from the Azure Maps API if not managed carefully.

## 8.4.0.0 Integration Points

- Technician App -> Location Service (sends GPS coordinates).
- Location Service -> User App (broadcasts coordinates via WebSocket).
- Location Service -> Azure Maps API (requests route and ETA).
- User App -> Azure Maps SDK (renders map and route).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- End-to-end flow: Technician starts travel mode, user sees map, technician moves, user sees updates, technician stops travel mode, user sees tracking end.
- GPS/Network failure simulation for both technician and user devices.
- Battery consumption analysis on technician device over a 1-hour tracking session.
- Load testing the WebSocket service with 1,000+ concurrent connections.
- Verification of map rendering and functionality on a range of target devices and OS versions.

## 9.3.0.0 Test Data Needs

- Test accounts for a user and a technician.
- A created and assigned service request.
- Valid addresses for testing routing and ETA calculations.
- GPS coordinate data for simulated journeys.

## 9.4.0.0 Testing Tools

- GPS simulation tools for mobile devices.
- WebSocket testing clients (e.g., Postman).
- Network throttling tools (e.g., Charles Proxy) to simulate poor connectivity.
- Mobile device performance and battery monitoring tools.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code for all three components (User App, Tech App, Backend) is peer-reviewed and merged.
- Unit and integration tests are implemented with sufficient coverage (>80%) for new logic.
- An automated E2E test for the core tracking flow is created and passing.
- Performance NFR for location update latency (<2s) is verified.
- Security review of the location data transmission and authorization logic is completed and signed off.
- UI/UX has been reviewed and approved by the product owner.
- Documentation for the Location Service API and its operation is created.
- Story is deployed and verified in the staging environment using real devices.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

13

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a large story that may need to be split into technical sub-tasks (Backend, Tech App, User App) that can be worked on in parallel.
- A technical spike may be required beforehand to finalize the choice of WebSocket library and investigate the nuances of background location tracking on iOS and Android.
- Requires cross-functional collaboration between backend, iOS, and Android developers throughout the sprint.

## 11.4.0.0 Release Impact

This is a major feature enhancement that will be a key highlight in release notes and marketing communications to users.

