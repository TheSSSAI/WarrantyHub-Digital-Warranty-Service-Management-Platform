# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-080 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: Deactivate 'Travel Mode' |
| As A User Story | As a Technician, I want to deactivate 'Travel Mode... |
| User Persona | Technician |
| Business Value | Enhances technician privacy and trust by giving th... |
| Functional Area | Service Center & Technician Panel |
| Story Theme | Technician Job Management & Real-Time Tracking |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Technician manually deactivates Travel Mode

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Technician is logged into the mobile app and has an active job with 'Travel Mode' enabled

### 3.1.5 When

the Technician taps the 'Stop Sharing Location' button on the active job screen

### 3.1.6 Then

the app immediately sends a deactivation signal to the backend, the button's UI state changes to reflect that Travel Mode is off, and a confirmation message 'Location sharing stopped' is briefly displayed to the Technician.

### 3.1.7 Validation Notes

Verify via E2E test that the customer's map view is removed within 3 seconds. Check backend logs to confirm location updates for the job have ceased.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Automatic Deactivation: Job status is updated to 'Work In Progress'

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

a Technician is logged into the mobile app and has an active job with 'Travel Mode' enabled

### 3.2.5 When

the Technician updates the job status to 'Work In Progress'

### 3.2.6 Then

'Travel Mode' is automatically deactivated without requiring manual intervention.

### 3.2.7 Validation Notes

The UI for 'Travel Mode' should update to the 'off' state. The customer's map view should be removed. This ensures the technician doesn't forget to turn it off upon arrival.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Automatic Deactivation: Job status is updated to 'Resolved'

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

a Technician is logged into the mobile app and has an active job with 'Travel Mode' enabled

### 3.3.5 When

the Technician updates the job status to 'Resolved'

### 3.3.6 Then

'Travel Mode' is automatically deactivated.

### 3.3.7 Validation Notes

This covers cases where the technician might resolve a job without first setting it to 'Work In Progress'.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

System Update: Customer view is updated upon deactivation

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a customer is viewing the service request details for a job where the technician has 'Travel Mode' active

### 3.4.5 When

the technician deactivates 'Travel Mode' either manually or automatically

### 3.4.6 Then

the customer's view updates in near real-time to remove the live location map and the ETA display.

### 3.4.7 Validation Notes

Test via WebSocket event or push notification that the customer's client receives the update signal promptly.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Handling: Deactivation attempt with no network connectivity

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a Technician has 'Travel Mode' active and their device loses internet connectivity

### 3.5.5 When

the Technician taps the 'Stop Sharing Location' button

### 3.5.6 Then

the app's UI immediately updates to show Travel Mode as 'off' to the technician, and the deactivation command is queued locally. The command is sent to the backend as soon as connectivity is restored.

### 3.5.7 Validation Notes

Use network throttling tools to simulate offline mode. Verify that the command is successfully sent upon reconnection by checking backend logs.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Security: Deactivation event is logged

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

a Technician has an active job

### 3.6.5 When

'Travel Mode' is deactivated for that job

### 3.6.6 Then

an entry is created in the system's audit trail logging the Technician ID, Job ID, the deactivation event, and the timestamp.

### 3.6.7 Validation Notes

Query the audit log database to confirm the entry is created correctly.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly labeled button or toggle on the active job screen, e.g., 'Stop Sharing Location' or 'End Travel Mode'.
- A toast or snackbar notification for confirmation messages.

## 4.2.0 User Interactions

- Tapping the button should provide immediate visual feedback (e.g., pressed state).
- After deactivation, the button should either become disabled, disappear, or toggle to an 'Activate Travel Mode' state.

## 4.3.0 Display Requirements

- The current state of 'Travel Mode' (On/Off) must always be clearly visible on the active job screen.

## 4.4.0 Accessibility Needs

- The button must have a minimum tap target size of 44x44 pixels.
- The button must have a descriptive accessibility label for screen readers, compliant with WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Changing job status to 'Work In Progress' or 'Resolved' must automatically deactivate 'Travel Mode'.

### 5.1.3 Enforcement Point

Technician Mobile App (Client-side logic) and Backend (Server-side validation).

### 5.1.4 Violation Handling

N/A - This is an automated system action.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Location data sharing for a job must cease immediately upon deactivation of 'Travel Mode'.

### 5.2.3 Enforcement Point

Backend Location Service.

### 5.2.4 Violation Handling

The system must log an error if it continues to receive location data for a job after deactivation. This could indicate a client-side bug.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-079

#### 6.1.1.2 Dependency Reason

This story implements the deactivation of a feature enabled by US-079. Activation must exist before deactivation can be built.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-078

#### 6.1.2.2 Dependency Reason

This story depends on the job status update mechanism from US-078 to trigger automatic deactivation.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-044

#### 6.1.3.2 Dependency Reason

The customer-facing UI for viewing the technician's location, built in US-044, must be updated by the logic in this story.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-114

#### 6.1.4.2 Dependency Reason

The system audit trail, defined in US-114, is required to log the deactivation event for security and compliance.

## 6.2.0.0 Technical Dependencies

- Technician Mobile App's state management library (Zustand).
- Backend Location Service (microservice).
- Real-time communication channel (Secure WebSockets) to the customer's app.

## 6.3.0.0 Data Dependencies

- Requires access to the current state of a service request ticket (Job ID, assigned Technician ID, current status).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The deactivation signal from the technician app to the backend must be processed in under 1 second.
- The customer's UI must reflect the change (map removal) within 3 seconds of the technician's action under normal network conditions.

## 7.2.0.0 Security

- The API endpoint used to deactivate location sharing must be authenticated and authorized to ensure only the assigned technician can perform this action for their job.
- The deactivation event must be logged in an immutable audit trail as per US-114.

## 7.3.0.0 Usability

- The action to stop sharing location must be simple, intuitive, and require a single tap.

## 7.4.0.0 Accessibility

- All UI elements must comply with WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- Functionality must be consistent on supported iOS (14.0+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing the real-time update to the customer's client requires a robust event-driven architecture (WebSockets/Push Notifications).
- Building a reliable offline-first queuing mechanism for the deactivation command on the mobile client adds complexity.
- Coordinating state changes between three components (Technician App, Backend, Customer App) requires careful integration.

## 8.3.0.0 Technical Risks

- Potential for race conditions if a status update and a manual deactivation occur simultaneously.
- Latency in the real-time messaging system could lead to a poor user experience where the customer sees the technician's location for several seconds after they've arrived.

## 8.4.0.0 Integration Points

- Technician App -> API Gateway -> Location Service
- Location Service -> Event Bus (Azure Service Bus) -> Notification Service
- Notification Service -> Customer App (via WebSocket or FCM)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify manual deactivation flow.
- Verify automatic deactivation when job status changes to 'Work In Progress'.
- Verify automatic deactivation when job status changes to 'Resolved'.
- Simulate network loss, deactivate, then regain network and verify the command is sent.
- Full E2E scenario: Technician activates, Customer sees map, Technician deactivates, Customer sees map disappear.

## 9.3.0.0 Test Data Needs

- Test accounts for a Technician and a Customer.
- A service request ticket assigned to the test Technician and owned by the test Customer.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Supertest (Backend Integration)
- Playwright (E2E Testing)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage
- Integration testing between mobile client and backend services completed successfully
- E2E test scenario for deactivation flow is automated and passing
- User interface reviewed and approved for usability and accessibility
- Performance requirements for signal processing and UI updates are met
- Security requirements, including audit logging, are validated
- Documentation for the deactivation API endpoint is updated in OpenAPI spec
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is critical for the location tracking feature loop and should be prioritized alongside its counterpart US-079.
- Requires coordinated testing effort across both the Technician and Customer applications.

## 11.4.0.0 Release Impact

Completes the core functionality for technician-controlled location sharing, a key feature for the service request module.

