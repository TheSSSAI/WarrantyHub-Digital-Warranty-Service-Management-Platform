# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-044 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: View the technician's live location and ETA ... |
| As A User Story | As a User waiting for a service visit, I want to v... |
| User Persona | The end-user (Consumer) who has raised a service r... |
| Business Value | Improves customer satisfaction and trust by provid... |
| Functional Area | Service Request Management |
| Story Theme | Real-Time Service Tracking |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-044-01

### 3.1.2 Scenario

Happy Path: Technician location is visible when 'Travel Mode' is active

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user has a service request with the status 'Technician Assigned' AND the assigned technician has activated 'Travel Mode' for this job

### 3.1.5 When

the user navigates to the details screen of this service request in the mobile app

### 3.1.6 Then

a map interface is displayed, centered to show both the user's service address and the technician's location

### 3.1.7 Validation Notes

Verify the Mapbox API is called and the map renders correctly. The technician's and user's locations should be represented by distinct icons.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-044-02

### 3.2.2 Scenario

Live location updates are received and displayed

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the user is viewing the technician's location on the map

### 3.2.5 When

the technician's device sends a new location coordinate

### 3.2.6 Then

the technician's icon on the user's map moves to the new location with a latency of less than 2 seconds

### 3.2.7 Validation Notes

This requires an E2E test. A mock location provider can be used to simulate the technician's movement and verify the update on the user's device via the WebSocket connection.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-044-03

### 3.3.2 Scenario

Dynamic ETA is displayed and updated

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the user is viewing the technician's location on the map

### 3.3.5 When

the technician's location is updated

### 3.3.6 Then

an ETA (e.g., '15 minutes' or '2:45 PM') is displayed and recalculated based on the new location and traffic data from the mapping service

### 3.3.7 Validation Notes

Verify that the ETA value changes as the mock technician location gets closer to or further from the destination.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-044-04

### 3.4.2 Scenario

Map view is not available when 'Travel Mode' is inactive

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a user has a service request with the status 'Technician Assigned' AND the technician has NOT activated 'Travel Mode'

### 3.4.5 When

the user navigates to the service request details screen

### 3.4.6 Then

the map interface is not displayed

### 3.4.7 And

a placeholder message is shown, such as 'Track your technician's location here once they are on the way.'

### 3.4.8 Validation Notes

Check the UI state when the backend confirms travel mode is inactive for the specific job.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-044-05

### 3.5.2 Scenario

Map view is removed when technician deactivates 'Travel Mode'

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

the user is actively viewing the live location map

### 3.5.5 When

the technician deactivates 'Travel Mode' (e.g., upon arrival)

### 3.5.6 Then

the map view is replaced with a status message, such as 'The technician has arrived.'

### 3.5.7 Validation Notes

The WebSocket event for deactivation should trigger a UI state change on the user's app.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-044-06

### 3.6.2 Scenario

Handling intermittent technician connectivity

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

the user is viewing the live location map

### 3.6.5 When

the system does not receive a location update from the technician's device for over 60 seconds

### 3.6.6 Then

the technician's icon remains at its last known location

### 3.6.7 And

a visual indicator is displayed on the UI, such as 'Location last updated 1 minute ago.'

### 3.6.8 Validation Notes

Simulate a network drop on the technician's side and verify the UI update on the user's side.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An interactive map view (powered by Mapbox).
- A distinct icon for the technician's location (e.g., a van).
- A distinct icon for the user's service address (e.g., a house).
- A text element to display the dynamic ETA.
- A placeholder view with instructional text for when tracking is not active.

## 4.2.0 User Interactions

- User can pan and zoom the map.
- Tapping on the technician or user icon could show the address details (optional).

## 4.3.0 Display Requirements

- The technician's name and photo (from US-043) should be displayed near the map for context.
- The ETA should be human-readable (e.g., 'in 12 minutes') and update regularly.

## 4.4.0 Accessibility Needs

- All text elements (ETA, status messages) must meet WCAG 2.1 AA contrast ratios.
- Map elements should have appropriate labels for screen readers where possible.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-044-01

### 5.1.2 Rule Description

Technician location is only shared when 'Travel Mode' is explicitly activated for a specific, assigned job.

### 5.1.3 Enforcement Point

Backend Location Service, before broadcasting coordinates.

### 5.1.4 Violation Handling

Location data received from a technician not in 'Travel Mode' for that job is discarded and not broadcast.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-044-02

### 5.2.2 Rule Description

Technician location data history must be purged 24 hours after job completion.

### 5.2.3 Enforcement Point

A scheduled cleanup job in the backend system.

### 5.2.4 Violation Handling

N/A - System process. Failure should trigger a high-priority alert to the engineering team.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-079

#### 6.1.1.2 Dependency Reason

This story is entirely dependent on the technician's ability to activate 'Travel Mode' to start sharing their location.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

Requires the service request details screen to exist, which is where the map view will be implemented.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-043

#### 6.1.3.2 Dependency Reason

The technician's profile information (name, photo) should be displayed alongside the map for user context and security.

## 6.2.0.0 Technical Dependencies

- A real-time communication service (Location Service using WebSockets) must be operational.
- Integration with the Mapbox API for map tiles and ETA calculation.
- The Technician mobile app must have a reliable way to capture and transmit GPS coordinates.

## 6.3.0.0 Data Dependencies

- User's service address (lat/long) associated with the service request.
- Technician's real-time location (lat/long) from their device.

## 6.4.0.0 External Dependencies

- Availability and performance of the Mapbox API.
- Availability and accuracy of GPS services on the technician's mobile device.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Location updates from the technician's device to the user's map display shall have a latency of less than 2 seconds.
- The technician app's location tracking must be optimized to minimize battery drain.

## 7.2.0.0 Security

- All location data must be transmitted over secure channels (WSS).
- Access to the WebSocket endpoint for receiving location data must be authenticated and authorized.
- Technician location data is considered PII and must be handled according to the data protection policy, including secure storage and timely deletion.

## 7.3.0.0 Usability

- The map should be intuitive and require no user training.
- The ETA must be clearly visible and easy to understand.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported iOS (14.0+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

High

## 8.2.0.0 Complexity Factors

- Requires development across three components: User App (React Native), Technician App (React Native), and Backend (NestJS).
- Implementation of a scalable and reliable WebSocket service for real-time communication.
- Integration with a third-party mapping and routing API (Mapbox).
- Managing battery consumption on the technician's device.
- Complex E2E testing scenarios are required.

## 8.3.0.0 Technical Risks

- Mapbox API costs could exceed budget if not monitored.
- Inaccurate GPS data from technician devices leading to poor user experience.
- Scalability issues with the WebSocket server under high load.

## 8.4.0.0 Integration Points

- User Mobile App <-> Backend Location Service (via WebSocket)
- Technician Mobile App <-> Backend Location Service (via REST/WebSocket)
- Backend Location Service <-> Mapbox API (for ETA calculation)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security
- Usability

## 9.2.0.0 Test Scenarios

- Verify map rendering and ETA calculation for a technician in 'Travel Mode'.
- Verify UI state when technician is not in 'Travel Mode'.
- Simulate network loss for both user and technician to test graceful degradation.
- Test the full lifecycle: technician activates mode, moves, deactivates mode.
- Verify location data is purged from the system after the retention period.

## 9.3.0.0 Test Data Needs

- Test accounts for a user and a technician.
- An active service request linking the two accounts.
- A mock location data provider to simulate technician movement for automated E2E tests.

## 9.4.0.0 Testing Tools

- Playwright for E2E testing.
- Jest/React Testing Library for frontend unit tests.
- Jest/Supertest for backend unit/integration tests.
- A WebSocket load testing tool (e.g., k6).

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing between apps and backend service completed successfully
- Automated E2E test for the happy path scenario is created and passing
- User interface reviewed and approved by UX/UI designer
- Performance requirement for update latency is verified
- Security requirements for data handling and privacy are validated
- Documentation for the Location Service API is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

13

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story requires coordinated effort from frontend (both apps) and backend developers.
- The prerequisite stories, especially US-079, must be completed in a prior sprint.
- Allocate time for setting up and configuring the Mapbox integration and WebSocket service.

## 11.4.0.0 Release Impact

This is a major, high-visibility feature for the user-facing mobile application and a key differentiator for the platform.

