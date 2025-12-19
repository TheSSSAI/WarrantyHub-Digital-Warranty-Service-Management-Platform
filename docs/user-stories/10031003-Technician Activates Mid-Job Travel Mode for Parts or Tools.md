# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-115 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician Activates Mid-Job Travel Mode for Parts... |
| As A User Story | As a Technician, I want to be able to re-activate ... |
| User Persona | Technician |
| Business Value | Enhances customer trust and satisfaction by provid... |
| Functional Area | Service Request Management |
| Story Theme | Technician Job Execution & Customer Communication |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Technician activates Travel Mode during a 'Work In Progress' job

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A Technician is logged into the mobile app and is viewing an active service request with the status 'Work In Progress'

### 3.1.5 When

The Technician taps the 'Activate Travel Mode' button on the job details screen

### 3.1.6 Then

The button's state changes to indicate that Travel Mode is active (e.g., 'Deactivate Travel Mode' or a visual toggle)

### 3.1.7 And

The User can view the technician's live location on the map within their app for this service request.

### 3.1.8 Validation Notes

Verify on two devices. The Technician's app should show the active state, and the User's app should display the map with the moving location pin and receive the correct push notification.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician deactivates Travel Mode upon returning to the job site

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Technician has an active service request with the status 'Work In Progress' and the mid-job 'Travel Mode' is currently active

### 3.2.5 When

The Technician taps the 'Deactivate Travel Mode' button

### 3.2.6 Then

The button's state reverts to its inactive state (e.g., 'Activate Travel Mode')

### 3.2.7 And

The User's map view for that service request stops showing the live location pin.

### 3.2.8 Validation Notes

Verify that the location pin disappears from the User's map and the button state changes correctly in the Technician's app.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

System automatically deactivates Travel Mode after the maximum duration

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

A Technician has activated mid-job 'Travel Mode' and it has been continuously active for the maximum allowed duration of 4 hours

### 3.3.5 When

The 4-hour threshold is crossed

### 3.3.6 Then

The system automatically deactivates 'Travel Mode' for that job

### 3.3.7 And

The UI in the Technician's app is updated to reflect that Travel Mode is no longer active.

### 3.3.8 Validation Notes

This may require time manipulation on a test server or a configurable timeout value in a test environment. Verify backend stops the session and the Technician's UI updates on the next data refresh.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Job status change automatically deactivates Travel Mode

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

A Technician has activated mid-job 'Travel Mode'

### 3.4.5 When

The Technician updates the job status to 'Resolved' or 'Closed'

### 3.4.6 Then

'Travel Mode' is automatically and immediately deactivated

### 3.4.7 And

Location sharing ceases for that job.

### 3.4.8 Validation Notes

Test by changing the job status while travel mode is active and confirming location sharing stops on the User's device.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Technician attempts to activate Travel Mode without location services enabled

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A Technician is on a 'Work In Progress' job and location services on their device are disabled

### 3.5.5 When

The Technician taps the 'Activate Travel Mode' button

### 3.5.6 Then

The app displays a user-friendly error message prompting the technician to enable location services

### 3.5.7 And

'Travel Mode' is not activated.

### 3.5.8 Validation Notes

Test on both iOS and Android by disabling location services at the OS level before attempting to activate the feature.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly labeled button or toggle switch on the Technician's active job screen, such as 'Activate Travel Mode' or 'Share Location for Parts Run'.

## 4.2.0 User Interactions

- Tapping the element should toggle the location sharing state.
- The element must provide clear visual feedback of its current state (active/inactive).

## 4.3.0 Display Requirements

- The User's app must display a message clarifying the context of this travel, distinguishing it from the initial 'On The Way' status.
- The Technician's app must show a persistent indicator that location is being shared while the mode is active.

## 4.4.0 Accessibility Needs

- The button/toggle must have a proper accessibility label for screen readers (e.g., 'Activate travel mode to share location with customer').

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Mid-job 'Travel Mode' can only be activated when the service request status is 'Work In Progress'.

### 5.1.3 Enforcement Point

Technician Mobile App UI and Backend API

### 5.1.4 Violation Handling

The 'Activate Travel Mode' button shall be disabled or hidden for all other job statuses.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A single continuous 'Travel Mode' session (initial or mid-job) cannot exceed 4 hours.

### 5.2.3 Enforcement Point

Backend Location Service

### 5.2.4 Violation Handling

The session is automatically terminated, and location sharing is stopped. A system log event should be generated.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-053

#### 6.1.1.2 Dependency Reason

The 'Work In Progress' job status must exist as a state that can be set by the technician.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-054

#### 6.1.2.2 Dependency Reason

The core infrastructure for activating 'Travel Mode' for the initial trip must be implemented first. This story extends that capability.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-072

#### 6.1.3.2 Dependency Reason

The User's mobile app must have the map interface to display the technician's live location.

## 6.2.0.0 Technical Dependencies

- Backend Location Service (WebSocket-based)
- Push Notification Service (FCM/Azure Communication Services)
- Azure Maps API
- Technician and User mobile applications

## 6.3.0.0 Data Dependencies

- An existing service request record that can be placed into a 'Work In Progress' state.

## 6.4.0.0 External Dependencies

- Device GPS hardware and OS-level location services must be functional and enabled by the technician.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Location updates from the technician's device to the user's map display shall have a latency of less than 2 seconds, as per SRS 5.1.
- Background location tracking should be optimized to minimize battery consumption on the technician's device.

## 7.2.0.0 Security

- Location data must be transmitted over a secure channel (WSS).
- Access to location data must be strictly limited to the specific user associated with the active service request.

## 7.3.0.0 Usability

- The feature should be easily discoverable and require minimal taps to activate/deactivate.

## 7.4.0.0 Accessibility

- Compliant with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Must function correctly on supported iOS (14+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Modifying the existing service request state machine to handle a 'traveling' sub-state within 'Work In Progress'.
- Ensuring robust handling of background location permissions and app states (foreground, background, terminated) on both iOS and Android.
- Implementing the server-side 4-hour timeout logic.
- Creating and routing a new, context-specific push notification.

## 8.3.0.0 Technical Risks

- Inconsistent GPS accuracy from technician devices.
- Potential for high battery drain if background processing is not optimized.
- Complexity in managing WebSocket connections and state across app lifecycle events.

## 8.4.0.0 Integration Points

- Technician App <-> Backend Service Request API (to signal mode activation)
- Technician App <-> Backend Location Service (to stream GPS data)
- Backend Location Service <-> User App (to push location updates via WebSocket)
- Backend Service <-> Push Notification Service (to alert the user)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Battery Performance

## 9.2.0.0 Test Scenarios

- Full E2E flow: Technician starts job, sets to WIP, activates travel mode, user sees location, technician deactivates mode, user sees location sharing stop.
- Test the 4-hour timeout.
- Test behavior when location services are toggled on/off mid-session.
- Test behavior when the app is backgrounded on the technician's device.
- Verify the correct push notification text is received by the user.

## 9.3.0.0 Test Data Needs

- A registered Technician account.
- A registered User account.
- An active service request assigned to the technician and owned by the user.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Cypress for E2E tests.
- Physical devices for real-world GPS and battery testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both iOS and Android.
- Code reviewed and approved by at least one other engineer.
- Unit and integration tests implemented with >= 80% coverage for new logic.
- E2E automated tests for the happy path flow are created and passing.
- UI/UX for both Technician and User apps reviewed and approved by the design team.
- Battery consumption benchmarks are established and met.
- Security review confirms location data is properly isolated and secured.
- Relevant documentation (e.g., technician user guide) is updated.
- Story deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- Requires coordinated testing across two separate applications (Technician and User).
- Availability of physical test devices for both platforms is crucial.
- Backend and frontend work can be done in parallel but requires a clear API contract for the location service interaction.

## 11.4.0.0 Release Impact

This is an enhancement to an existing feature. It can be released independently without impacting other core functionalities.

