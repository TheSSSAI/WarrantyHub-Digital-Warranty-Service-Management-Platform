# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-054 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician Activates 'Travel Mode' to Share Locati... |
| As A User Story | As a Technician, I want to activate a 'Travel Mode... |
| User Persona | Technician using the dedicated mobile application ... |
| Business Value | Improves customer satisfaction by providing transp... |
| Functional Area | Service Request Management - Technician Mobile App |
| Story Theme | Real-Time Service Tracking |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Technician successfully activates Travel Mode

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Technician is logged into the mobile app, has an assigned job open on the details screen, and has granted location permissions

### 3.1.5 When

the Technician taps the 'Activate Travel Mode' button

### 3.1.6 Then

the UI button changes to an active state (e.g., 'Deactivate Travel Mode'), a visual indicator confirms the mode is active, the app begins sending secure location updates to the backend, and the associated customer can view the location on their map.

### 3.1.7 Validation Notes

Verify via UI change on the technician app. The backend should confirm receipt of WebSocket messages. The customer app (US-072) should display the location pin.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician manually deactivates Travel Mode

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

Travel Mode is currently active for a job

### 3.2.5 When

the Technician taps the 'Deactivate Travel Mode' button

### 3.2.6 Then

the app immediately stops sending location updates, the UI button reverts to its inactive state ('Activate Travel Mode'), and the customer's map view stops receiving live updates.

### 3.2.7 Validation Notes

Verify UI change and cessation of WebSocket messages from the client.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: Location services are disabled on the device

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

a Technician is on the job details screen and location services are turned off at the OS level

### 3.3.5 When

the Technician taps the 'Activate Travel Mode' button

### 3.3.6 Then

the app displays a non-blocking, user-friendly message prompting the user to enable location services and Travel Mode remains inactive.

### 3.3.7 Validation Notes

Test on both iOS and Android with location services disabled in device settings.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: First-time use requires location permission

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a Technician is using the feature for the first time and has not yet granted location permissions to the app

### 3.4.5 When

the Technician taps the 'Activate Travel Mode' button

### 3.4.6 Then

the app must trigger the native OS permission prompt for location access. If granted, Travel Mode activates. If denied, a message explains the feature cannot be used without permission.

### 3.4.7 Validation Notes

Test on a fresh app install or after revoking permissions manually in OS settings.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

System automatically deactivates Travel Mode after 4 hours

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

Travel Mode has been continuously active for a single job for 3 hours and 59 minutes

### 3.5.5 When

the 4-hour time limit is reached

### 3.5.6 Then

Travel Mode automatically deactivates, the app stops sending location data, and the UI on the technician's app updates to reflect the inactive state.

### 3.5.7 Validation Notes

This can be tested by setting a short, configurable timeout in a test environment.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

System automatically deactivates Travel Mode on job status change

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

Travel Mode is active for a job

### 3.6.5 When

the Technician updates the job status to 'Work In Progress' or 'Resolved'

### 3.6.6 Then

Travel Mode automatically deactivates and the app stops sending location data.

### 3.6.7 Validation Notes

Activate Travel Mode, then change the job status and verify that location sharing stops.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Handling network connectivity loss

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

Travel Mode is active and the technician's device loses network connectivity

### 3.7.5 When

the app attempts to send a location update

### 3.7.6 Then

the technician's app UI should indicate an offline status, and the customer's map should display the technician's last known location with a timestamp.

### 3.7.7 Validation Notes

Use network simulation tools to test airplane mode or poor network conditions.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clear, accessible toggle switch or button on the job details screen, labeled 'Activate Travel Mode'.
- A persistent visual indicator (e.g., a banner, icon, or status text) on the job details screen when Travel Mode is active.
- System-native dialog for location permission requests.
- User-friendly alert/toast message for error conditions (e.g., 'Please enable location services to use Travel Mode').

## 4.2.0 User Interactions

- A single tap on the button activates/deactivates the mode.
- The app should handle the OS-level permission dialog flow.

## 4.3.0 Display Requirements

- The button text must change dynamically to reflect the current state (e.g., 'Activate Travel Mode' vs. 'Deactivate Travel Mode').
- The active state indicator must be unambiguous.

## 4.4.0 Accessibility Needs

- The button and status indicators must have sufficient color contrast and be compatible with screen readers (WCAG 2.1 AA).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Location sharing is strictly limited to the duration when 'Travel Mode' is active for a specific, assigned job.

### 5.1.3 Enforcement Point

Mobile application logic and backend authorization service.

### 5.1.4 Violation Handling

The backend must reject any location data sent for a job where Travel Mode is not in an active state in the system.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Travel Mode must automatically deactivate after a maximum of 4 hours of continuous activation for a single job.

### 5.2.3 Enforcement Point

A server-side timer or a reliable client-side background task should enforce this.

### 5.2.4 Violation Handling

The system terminates the location sharing session and updates the job status accordingly.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Travel Mode must automatically deactivate when the job status is updated by the technician (e.g., to 'Work In Progress', 'Resolved').

### 5.3.3 Enforcement Point

Mobile application logic triggered by the job status update action.

### 5.3.4 Violation Handling

The location sharing session is terminated as part of the status update workflow.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-051

#### 6.1.1.2 Dependency Reason

Technician must be able to view a list of assigned jobs to select one.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-052

#### 6.1.2.2 Dependency Reason

The UI control for activating Travel Mode will reside on the job details screen.

## 6.2.0.0 Technical Dependencies

- A backend Location Service capable of managing secure WebSocket (WSS) connections.
- Technician mobile app integration with native device GPS/location APIs (iOS Core Location, Android Location Services).
- Authentication service to issue and validate tokens for securing the WebSocket connection.

## 6.3.0.0 Data Dependencies

- Requires access to the `ServiceRequest` data model, which links a specific Technician to a specific User (customer) for a job.

## 6.4.0.0 External Dependencies

- Reliability of the device's GPS hardware.
- User granting of OS-level location permissions.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Location updates from the technician's device to the user's map display shall have a latency of less than 2 seconds.
- The feature must be optimized to minimize battery consumption on the technician's mobile device, using efficient location update strategies (e.g., adjusting frequency based on movement).

## 7.2.0.0 Security

- All location data must be transmitted over a secure, encrypted channel (WSS using TLS 1.2+).
- Backend must enforce strict authorization; only the technician assigned to the job can send location data for it, and only the customer who raised the request can view it.

## 7.3.0.0 Usability

- Activation and deactivation must be a simple, one-tap action.
- The current status of Travel Mode must be clearly and persistently visible to the technician.

## 7.4.0.0 Accessibility

- All UI elements must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Must function correctly on supported versions of iOS (14+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing and managing real-time, stateful WebSocket connections.
- Handling mobile-specific challenges: background processing, battery optimization, and OS permission lifecycle.
- Ensuring the automatic deactivation logic (time-based and status-based) is robust.
- Securely managing the real-time data stream to prevent unauthorized access.

## 8.3.0.0 Technical Risks

- High battery drain if location updates are too frequent or not managed correctly.
- Instability of WebSocket connections over unreliable mobile networks.
- Inaccurate GPS data from the device ('GPS drift') affecting customer perception.
- Privacy concerns if location data is not handled with extreme care.

## 8.4.0.0 Integration Points

- Technician Mobile App <-> Backend Location Service (via WSS)
- Backend Location Service <-> User Mobile App (via US-072)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security
- Usability

## 9.2.0.0 Test Scenarios

- End-to-end flow: Technician activates mode, drives a simulated route, customer sees the pin move on their map, technician deactivates mode.
- Permission denial and subsequent re-request.
- Auto-deactivation based on the 4-hour timer.
- Auto-deactivation based on changing job status.
- Behavior during network loss and recovery.
- Battery consumption measurement over a 1-hour active session.

## 9.3.0.0 Test Data Needs

- Test accounts for a Technician, a Service Center Admin, and a User.
- An assigned service request linking the technician and user accounts.

## 9.4.0.0 Testing Tools

- Mobile device emulators/simulators with GPS location mocking capabilities.
- Physical iOS and Android devices for real-world testing.
- Network simulation tools (e.g., Charles Proxy, OS-native tools).
- WebSocket client for backend testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both iOS and Android.
- Code reviewed and approved by at least two peers.
- Unit and integration tests implemented with >80% coverage for new logic.
- E2E automated test case for the happy path is created and passing.
- UI/UX for the feature has been reviewed and approved by the design team.
- Battery impact analysis has been performed and results are within acceptable limits.
- Security review completed, ensuring no unauthorized access to location data.
- All related documentation (e.g., API specs) has been updated.
- Story deployed and verified in the staging environment by QA.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is tightly coupled with US-072 ('User Tracks Technician's Live Location'). They should be developed and released together to provide end-to-end value.
- Requires a dedicated backend effort to build or enhance the WebSocket-based Location Service.

## 11.4.0.0 Release Impact

This is a key feature for the customer experience and a major differentiator. It will be a highlight of the release in which it is included.

