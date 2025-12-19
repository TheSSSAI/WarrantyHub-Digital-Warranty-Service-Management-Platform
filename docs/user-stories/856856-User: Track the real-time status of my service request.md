# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-041 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Track the real-time status of my service req... |
| As A User Story | As a consumer who has submitted a service request,... |
| User Persona | End-User / Consumer |
| Business Value | Increases customer satisfaction and trust through ... |
| Functional Area | Service Request Module |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Viewing a newly created service request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user has successfully submitted a new service request

### 3.1.5 When

the user navigates to the details screen for that service request

### 3.1.6 Then

a status timeline is displayed, the 'Requested' status is shown as the current active stage with a creation timestamp, and all subsequent stages ('Acknowledged', 'Technician Assigned', etc.) are shown as pending.

### 3.1.7 Validation Notes

Verify the UI component renders correctly and the timestamp matches the creation time of the service request record in the database.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Status updates in real-time via push notification

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a user is viewing the service request details screen

### 3.2.5 When

a Service Center Admin or Technician updates the status of the request (e.g., to 'Acknowledged' or 'Technician Assigned')

### 3.2.6 Then

the status timeline on the user's screen automatically updates within 2 seconds to reflect the new current status, the previous status is marked as complete, and a timestamp for the new status is displayed.

### 3.2.7 Validation Notes

This requires testing the WebSocket or FCM push mechanism. The update should occur without a manual user refresh.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Viewing status history with timestamps

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a service request has progressed through several stages (e.g., is currently 'Work In Progress')

### 3.3.5 When

the user views the service request details

### 3.3.6 Then

the timeline correctly shows all previous stages ('Requested', 'Acknowledged', 'Technician Assigned', 'Technician On The Way') as complete, each with the correct timestamp of when that stage was reached.

### 3.3.7 Validation Notes

Check the displayed timestamps against the audit log or history table for the service request in the database.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Viewing a fully resolved service request

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a service request has been marked as 'Resolved/Closed'

### 3.4.5 When

the user views the service request details

### 3.4.6 Then

the timeline shows all stages up to and including 'Resolved/Closed' as complete, with the final stage being highlighted as the terminal status.

### 3.4.7 Validation Notes

The UI should clearly indicate that the process is complete.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Status updates via manual refresh

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a user is on the service request details screen and the real-time connection has failed

### 3.5.5 When

the user performs a 'pull-to-refresh' action

### 3.5.6 Then

the system fetches the latest status and history for the request and updates the timeline display accordingly.

### 3.5.7 Validation Notes

Test by disabling WebSocket/network push and verifying that a manual refresh correctly syncs the state.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Viewing a disputed service request

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

a user has disputed a 'Resolved' service request

### 3.6.5 When

the user views the details of that request

### 3.6.6 Then

the status timeline shows 'Disputed' as the new current status, following the 'Resolved/Closed' status.

### 3.6.7 Validation Notes

The UI should visually differentiate the 'Disputed' state, as it re-opens the ticket for brand review.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Viewing a cancelled service request

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

a user has cancelled a service request

### 3.7.5 When

the user views the details of that request

### 3.7.6 Then

the timeline shows the final status as 'Cancelled' with a timestamp, and all subsequent stages are removed or disabled.

### 3.7.7 Validation Notes

The UI should clearly indicate the request is terminated and no further action will be taken.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A vertical or horizontal stepper/timeline component.
- Icons and text labels for each status: Requested, Acknowledged, Technician Assigned, Technician On The Way, Work In Progress, Resolved/Closed.
- Timestamp display area next to each completed status.
- Loading indicator for initial data fetch and manual refresh.

## 4.2.0 User Interactions

- The screen should load and display the current status automatically.
- The UI should update in real-time upon receiving a push event.
- User can perform a 'pull-to-refresh' gesture to manually update the status.

## 4.3.0 Display Requirements

- The current status must be visually distinct and highlighted (e.g., different color, larger icon).
- Completed statuses must be visually marked as such (e.g., with a checkmark).
- Pending statuses must be visually distinct (e.g., grayed out).
- Timestamps should be displayed in a user-friendly, localized format (e.g., 'Jan 15, 2025, 10:30 AM').

## 4.4.0 Accessibility Needs

- Status indicators must use both color and icons/text to convey meaning (WCAG 2.1 AA).
- All elements of the timeline must be keyboard-navigable and compatible with screen readers.
- Text must have sufficient contrast.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The sequence of statuses must follow the defined lifecycle: Requested -> Acknowledged -> Technician Assigned -> Technician On The Way -> Work In Progress -> Resolved/Closed.

### 5.1.3 Enforcement Point

Backend service logic that handles status updates.

### 5.1.4 Violation Handling

The system should prevent illogical status jumps (e.g., from 'Requested' to 'Resolved'). An error should be logged.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A timestamp must be recorded for every status change.

### 5.2.3 Enforcement Point

Backend database transaction when updating a service request's status.

### 5.2.4 Violation Handling

The status update transaction should fail if a timestamp cannot be recorded.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-036

#### 6.1.1.2 Dependency Reason

A service request must be created before its status can be tracked.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-063

#### 6.1.2.2 Dependency Reason

The 'Acknowledged' status is set by the Service Center Admin.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-065

#### 6.1.3.2 Dependency Reason

The 'Technician Assigned' status is set by the Service Center Admin.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-078

#### 6.1.4.2 Dependency Reason

The Technician app is the source for 'On The Way', 'Work In Progress', and 'Resolved' statuses.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-049

#### 6.1.5.2 Dependency Reason

The 'Disputed' status is set by the user after a request is resolved.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint to fetch service request details and status history (e.g., GET /api/v1/service-requests/{id}).
- Real-time communication infrastructure (Secure WebSockets or FCM) for pushing status updates to clients.
- Database schema to store service request status and a history/audit log of all status changes with timestamps.

## 6.3.0.0 Data Dependencies

- Requires access to the service request record, including its unique ID and current status.
- Requires access to the service request history log.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) or another push notification service if WebSockets are not the chosen implementation for real-time updates.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Real-time status updates should be reflected on the client UI within 2 seconds of the event occurring on the backend.
- The API call to fetch the service request history should have a P95 latency below 250ms.

## 7.2.0.0 Security

- API endpoints must enforce that a user can only view the status of their own service requests (RBAC).

## 7.3.0.0 Usability

- The status timeline must be intuitive and easy to understand at a glance.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web portal view must be responsive and function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- The mobile app view must function correctly on iOS 14.0+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementation of the real-time update mechanism (WebSocket or push notifications) adds complexity over a simple REST API.
- Frontend development of a responsive and accessible timeline component.
- Requires robust backend logic to manage and log the state transitions accurately.
- Coordination across multiple services/modules that trigger status changes (User App, Admin Panel, Technician App).

## 8.3.0.0 Technical Risks

- Potential for message delivery failure in the real-time system; requires a fallback mechanism like pull-to-refresh.
- Ensuring chronological consistency of status updates if events are processed asynchronously.

## 8.4.0.0 Integration Points

- Service Request Microservice (for status logic and data).
- Notification Service (for pushing updates via WebSockets/FCM).
- API Gateway (to expose the service request endpoint).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify the timeline UI for each possible status.
- End-to-end test: A technician updates a job status, and the user's app reflects the change in real-time.
- Test the pull-to-refresh functionality when the real-time connection is simulated to be down.
- Test the display of a disputed request.
- Test the display on various screen sizes (mobile, tablet, desktop).

## 9.3.0.0 Test Data Needs

- Service requests in each of the possible statuses.
- A service request with a complete history of status changes.
- User accounts linked to service requests.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest and Supertest for backend unit/integration tests.
- Playwright for end-to-end testing.
- Browser developer tools for simulating network conditions.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing between frontend, backend, and notification service completed successfully
- End-to-end test scenario for real-time updates is automated and passing
- User interface reviewed and approved by UX/UI designer for responsiveness and accessibility
- Performance requirements for API response and real-time update latency are verified
- Security requirements validated
- API documentation (OpenAPI) is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a core feature of the post-service experience and highly visible to the user.
- Should be scheduled after the prerequisite stories that create and modify service requests are complete.
- Requires both frontend and backend development effort, which should be coordinated.

## 11.4.0.0 Release Impact

- Significantly enhances the user experience and is a key feature for the initial launch.

