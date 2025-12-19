# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-040 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Tracks Service Request Status in Real-Time |
| As A User Story | As a Consumer who has submitted a service request,... |
| User Persona | Consumer/End-User who has registered a product and... |
| Business Value | Increases customer satisfaction and trust through ... |
| Functional Area | Service Request Management |
| Story Theme | Post-Sale Customer Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Viewing the initial status of a newly created service request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user and have just successfully submitted a new service request

### 3.1.5 When

I navigate to the details screen for that service request

### 3.1.6 Then

I see a visual status tracker where the 'Requested' stage is highlighted as the current, active stage, and all subsequent stages are shown as pending.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Status updates in real-time when acknowledged by the service center

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

my service request is in the 'Requested' state and I am viewing the details screen

### 3.2.5 When

the Service Center Admin acknowledges the request from their portal

### 3.2.6 Then

my app's status tracker updates automatically (without a manual refresh) to show 'Requested' as complete and 'Acknowledged' as the new active stage.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Status updates when a technician is assigned

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

my service request is in the 'Acknowledged' state

### 3.3.5 When

the Service Center Admin assigns a technician to my request

### 3.3.6 Then

the status tracker updates to 'Technician Assigned' as active, and the assigned technician's name is displayed.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Status updates when the technician is on the way

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a technician is assigned to my service request

### 3.4.5 When

the technician updates their job status to 'On The Way' in their mobile app

### 3.4.6 Then

the status tracker updates to 'Technician On The Way' as active, and a link to view their live location becomes available.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Status updates when work begins

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the technician's status is 'On The Way'

### 3.5.5 When

the technician updates their job status to 'Work In Progress'

### 3.5.6 Then

the status tracker updates to 'Work In Progress' as active.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Status updates when the job is resolved

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the job status is 'Work In Progress'

### 3.6.5 When

the technician or service center marks the job as 'Resolved/Closed'

### 3.6.6 Then

the status tracker updates to show 'Resolved/Closed' as the final, completed stage, and I am prompted to rate the service.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Displaying a cancelled service request

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

my service request is in a cancellable state (e.g., 'Requested')

### 3.7.5 When

I cancel the service request

### 3.7.6 Then

the status tracker displays a terminal state of 'Cancelled', and all other stages are shown as inactive.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Displaying a disputed service request

### 3.8.3 Scenario Type

Alternative_Flow

### 3.8.4 Given

my service request has been marked 'Resolved/Closed'

### 3.8.5 When

I initiate a 'Dispute' for the service

### 3.8.6 Then

the status tracker updates to show a 'Disputed' status, clearly indicating it is under review by the brand.

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

Viewing status tracker while offline

### 3.9.3 Scenario Type

Edge_Case

### 3.9.4 Given

I have an active service request and my device is offline

### 3.9.5 When

I open the app and navigate to the service request details

### 3.9.6 Then

the status tracker displays the last known status and a clear visual indicator (e.g., a banner or icon) informs me that I am offline and the data may not be current.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A vertical or horizontal stepper/timeline component.
- Icons and text labels for each status: Requested, Acknowledged, Technician Assigned, Technician On The Way, Work In Progress, Resolved/Closed.
- A clear visual distinction for completed, active, and pending stages.
- Display area for technician's name next to the 'Technician Assigned' stage.
- Timestamp for the completion of each stage.

## 4.2.0 User Interactions

- The status tracker is a read-only component for the user.
- The view updates automatically via a push mechanism (e.g., WebSocket) when a status change occurs on the backend.

## 4.3.0 Display Requirements

- The full lifecycle of the service request must be visible.
- The current status must be immediately obvious to the user upon viewing the screen.

## 4.4.0 Accessibility Needs

- The component must be navigable via screen readers, which should announce the current status and the status of each stage (e.g., 'Step 1, Requested, Complete').
- Color indicators must be accompanied by text labels and/or icons to comply with WCAG 2.1 AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The service request status must follow the predefined lifecycle sequence and cannot skip stages (e.g., cannot go from 'Requested' to 'Work In Progress').

### 5.1.3 Enforcement Point

Backend Service Request state machine.

### 5.1.4 Violation Handling

The state transition request is rejected with an error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The status tracker must reflect all possible terminal states, including 'Resolved/Closed', 'Cancelled', and 'Disputed'.

### 5.2.3 Enforcement Point

Frontend UI component logic.

### 5.2.4 Violation Handling

The UI should gracefully handle and display any valid state received from the backend.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-037

#### 6.1.1.2 Dependency Reason

A service request must be created before its status can be tracked.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-048

#### 6.1.2.2 Dependency Reason

The 'Technician Assigned' status depends on the Service Center Admin's ability to assign a technician.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-053

#### 6.1.3.2 Dependency Reason

The 'On The Way' and 'Work In Progress' statuses depend on the Technician's ability to update their job status.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-045

#### 6.1.4.2 Dependency Reason

The 'Disputed' status depends on the user's ability to dispute a resolved ticket.

## 6.2.0.0 Technical Dependencies

- Backend Service Request Microservice with a defined state machine for ticket statuses.
- Real-time communication infrastructure (Secure WebSockets as per SRS 4.3) to push status updates to the client.
- Mobile app's state management library to handle and render real-time updates.

## 6.3.0.0 Data Dependencies

- Access to the service request record, including its current status, history, and associated technician data.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Status updates on the user's device should appear within 2 seconds of the action being performed by the service center or technician.

## 7.2.0.0 Security

- The user must only be able to view the status of their own service requests. API endpoints must enforce this ownership.
- WebSocket connections must be secure (WSS) and authenticated.

## 7.3.0.0 Usability

- The status tracker must be intuitive and require no user training to understand.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported iOS (14+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementation of the real-time WebSocket communication layer is the primary complexity driver.
- Ensuring robust connection management (handling disconnects/reconnects) on the mobile client.
- Coordinating state changes across multiple actors (User, Technician, Service Center) and ensuring consistency.

## 8.3.0.0 Technical Risks

- Potential for high battery consumption on the mobile device if WebSocket connections are not managed efficiently.
- Scalability of the WebSocket server infrastructure as the number of concurrent users grows.

## 8.4.0.0 Integration Points

- Service Request Microservice (for state changes).
- Notification Service (for WebSocket/Push notifications).
- User Authentication Service (to secure the WebSocket channel).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify each status transition from start to finish for a single service request.
- Test the UI's response to rapid, sequential status updates.
- Test the offline viewing experience: open app, go offline, check status, go back online, verify status syncs.
- Test the flow for alternative paths like cancellation and dispute.
- Verify that a user cannot see status updates for a service request belonging to another user.

## 9.3.0.0 Test Data Needs

- User accounts with service requests in each of the possible statuses.
- Service Center Admin and Technician accounts for triggering status changes.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Cypress or Appium for E2E testing.
- A WebSocket client tool for testing the real-time backend service.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage
- Integration testing between mobile client and backend services completed successfully
- User interface reviewed and approved by UX/UI designer
- Performance requirements for real-time updates verified under simulated load
- Security requirements validated (channel is secure, data is isolated)
- Documentation for the status tracking component and related APIs is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core user-facing feature that provides significant value. It has dependencies on the backend state machine and the actions that trigger state changes. The backend logic should be developed before or in parallel with the frontend UI.
- Requires coordination between backend and mobile development teams.

## 11.4.0.0 Release Impact

- This feature is critical for the initial product launch as it directly addresses a major customer pain point in the service industry.

