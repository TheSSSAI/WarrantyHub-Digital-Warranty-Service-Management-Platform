# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-053 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician Updates Job Status in Mobile App |
| As A User Story | As a Technician, I want to update the status of my... |
| User Persona | Technician: A field service professional who uses ... |
| Business Value | Provides real-time visibility into job progress fo... |
| Functional Area | Technician Mobile Application |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Technician updates status to 'On The Way'

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Technician is logged into the mobile app and is viewing the details of a job with the status 'Technician Assigned'

### 3.1.5 When

the Technician selects the action to update the status and chooses 'On The Way'

### 3.1.6 Then

the system must update the job's status to 'On The Way' in the backend, the mobile app UI must immediately reflect the new status, and a push notification event must be triggered for the customer (as per US-089 and US-126).

### 3.1.7 Validation Notes

Verify the status change in the database. Confirm the customer receives a push notification. The Service Center Admin panel should also reflect the status change.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician updates status to 'Work In Progress'

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a Technician is viewing the details of a job with the status 'On The Way'

### 3.2.5 When

the Technician selects the action to update the status and chooses 'Work In Progress'

### 3.2.6 Then

the system must update the job's status to 'Work In Progress' in the backend and the mobile app UI must reflect the new status.

### 3.2.7 Validation Notes

Verify the status change in the database and on the Service Center Admin panel. No customer notification is required for this specific status change unless defined elsewhere.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Status update while offline

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

a Technician is logged in but their device has no internet connectivity

### 3.3.5 When

the Technician attempts to update a job's status

### 3.3.6 Then

the app must queue the status update action locally, display a visual indicator that the action is pending sync, and automatically execute the update once connectivity is restored.

### 3.3.7 Validation Notes

Test by enabling airplane mode, performing the action, and then re-enabling connectivity. Verify the backend is updated after the device comes online.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

API failure during status update

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a Technician attempts to update a job's status and the backend API returns an error (e.g., 5xx)

### 3.4.5 When

the update fails

### 3.4.6 Then

the mobile app must display a non-intrusive error message (e.g., a toast notification) to the Technician and allow them to retry the action.

### 3.4.7 Validation Notes

Use a mock server or network interceptor to simulate an API failure and verify the app's response.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Contextual display of available statuses

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

a Technician is viewing a job with the status 'Technician Assigned'

### 3.5.5 When

they open the status update interface

### 3.5.6 Then

the list of available next statuses must only show valid transitions (e.g., 'On The Way') and must not show invalid ones (e.g., 'Resolved').

### 3.5.7 Validation Notes

Check the available options at each stage of the job lifecycle: 'Technician Assigned', 'On The Way', 'Work In Progress'.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempting to update a non-assigned job

### 3.6.3 Scenario Type

Security

### 3.6.4 Given

a Technician is authenticated

### 3.6.5 When

they attempt to update the status of a job not assigned to them via a direct API call

### 3.6.6 Then

the API must reject the request with a '403 Forbidden' status code and the job status must remain unchanged.

### 3.6.7 Validation Notes

Requires an integration or API-level test where a valid token for Technician A is used to try and modify a job assigned to Technician B.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clear, read-only display of the current job status on the job details screen.
- An interactive element (e.g., a button labeled 'Update Status') to initiate a status change.
- A modal, bottom sheet, or dropdown menu that presents the available next statuses for selection.

## 4.2.0 User Interactions

- Tapping the 'Update Status' button reveals the list of valid next statuses.
- Selecting a new status triggers an API call and provides immediate visual feedback (e.g., loading spinner).
- Upon successful update, the UI refreshes to show the new status and a confirmation message is briefly displayed (e.g., toast).

## 4.3.0 Display Requirements

- The current status must be prominently displayed.
- The list of selectable statuses must be context-aware based on the current status.

## 4.4.0 Accessibility Needs

- All buttons and interactive elements must have accessible labels for screen readers.
- Sufficient color contrast must be used for status indicators and text, compliant with WCAG 2.1 AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A Technician can only update the status of jobs that are explicitly assigned to them.

### 5.1.3 Enforcement Point

API Gateway and Backend Service (microservice level).

### 5.1.4 Violation Handling

The API request is rejected with a 403 Forbidden error. The action is logged for security auditing.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Job status transitions must follow a predefined state machine logic (e.g., 'Assigned' -> 'On The Way' -> 'Work In Progress' -> 'Resolved').

### 5.2.3 Enforcement Point

Backend Service logic before persisting the status change.

### 5.2.4 Violation Handling

The API request is rejected with a 400 Bad Request error indicating an invalid state transition.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-048

#### 6.1.1.2 Dependency Reason

A job must be assigned to a technician before its status can be updated.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-051

#### 6.1.2.2 Dependency Reason

The technician needs a list of their jobs to select one for a status update.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-052

#### 6.1.3.2 Dependency Reason

The status update functionality will be located on the job details screen.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint for updating job status.
- A state machine implementation on the backend to enforce valid transitions.
- Integration with the notification service (Azure Communication Services/FCM) to trigger alerts.
- Mobile app offline storage and synchronization mechanism (as per US-075).

## 6.3.0.0 Data Dependencies

- Requires access to the job record, including its current status and the assigned technician's ID.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) for push notifications.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for status updates must have a 95th percentile (P95) response time of less than 250ms.
- The mobile app UI should feel responsive, with status changes reflected in under 500ms on a stable connection.

## 7.2.0.0 Security

- All API calls must be authenticated using JWTs.
- Authorization must be enforced to ensure a technician can only modify their own assigned jobs (RBAC).

## 7.3.0.0 Usability

- Updating a status should require no more than three taps from the job details screen.
- The language used for statuses must be clear and unambiguous.

## 7.4.0.0 Accessibility

- The mobile application interface must comply with WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The functionality must be fully supported on iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing a robust state machine on the backend.
- Handling offline synchronization reliably.
- Coordinating the backend update, real-time UI updates for the admin panel (via WebSockets), and push notifications for the customer.
- Ensuring the API is idempotent to handle retries safely.

## 8.3.0.0 Technical Risks

- Race conditions if multiple updates are attempted in quick succession (e.g., by admin and technician simultaneously).
- Complexity in managing the offline queue, especially if the user logs out before the queue is synced.

## 8.4.0.0 Integration Points

- Backend Job Management Service
- Notification Service (Azure Service Bus topic)
- Real-time Update Service (WebSockets)
- Mobile App's local database/storage for offline queueing.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Security

## 9.2.0.0 Test Scenarios

- Verify each valid state transition.
- Verify invalid state transitions are blocked.
- Test the offline update and sync process with intermittent network connectivity.
- End-to-end test: Technician updates status -> Customer receives notification -> Admin panel updates.
- Security test: Attempt to update another technician's job.

## 9.3.0.0 Test Data Needs

- Test accounts for a Technician, a Service Center Admin, and a Customer.
- Multiple service request tickets in various initial states assigned to the test technician.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for mobile app unit tests.
- Jest for backend unit/integration tests.
- Cypress or a similar tool for E2E testing of the admin panel.
- Appium for E2E testing of the mobile app.
- Postman or Insomnia for API-level testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic meets the 80% project standard.
- Integration tests for the API endpoint and notification trigger are implemented and passing.
- E2E automated tests confirm the workflow from technician update to customer notification.
- UI/UX has been reviewed and approved by the design team.
- Performance of the API endpoint is verified under load.
- Security checks (authorization) have been manually and automatically tested.
- Relevant technical documentation (e.g., API spec, state machine diagram) has been updated.
- The feature has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core feature for the Technician persona. Its completion is critical for enabling the end-to-end service workflow.
- Ensure dependencies on the notification and offline sync frameworks are resolved before or during the sprint this story is in.

## 11.4.0.0 Release Impact

This story is a key component of the initial MVP for the Technician mobile application. The app is not viable for field use without this functionality.

