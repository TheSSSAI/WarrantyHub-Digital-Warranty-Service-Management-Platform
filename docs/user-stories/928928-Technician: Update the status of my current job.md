# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-078 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: Update the status of my current job |
| As A User Story | As a Technician, I want to update the status of my... |
| User Persona | Technician using the dedicated mobile application ... |
| Business Value | Provides real-time visibility of job progress to c... |
| Functional Area | Service Request Management |
| Story Theme | Technician Job Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Technician changes status from 'Technician Assigned' to 'On The Way'

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A Technician is logged into the mobile app and is viewing the details of a job with the status 'Technician Assigned'

### 3.1.5 When

The Technician taps the action button to indicate they are starting travel (e.g., a button labeled 'Start Travel')

### 3.1.6 Then

The system updates the service request's status to 'Technician On The Way' in the database.

### 3.1.7 And

The Service Center Admin's dashboard is updated in real-time to show the new status.

### 3.1.8 Validation Notes

Verify the status change in the database. Confirm the push notification is triggered. Check the admin panel for the updated status.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician changes status from 'On The Way' to 'Work In Progress'

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Technician is viewing the details of a job with the status 'On The Way'

### 3.2.5 When

The Technician taps the action button to indicate they have arrived and started work (e.g., 'Begin Work')

### 3.2.6 Then

The system updates the service request's status to 'Work In Progress'.

### 3.2.7 And

The Service Center Admin's dashboard is updated to reflect the 'Work In Progress' status.

### 3.2.8 Validation Notes

Verify the status change in the database and on the admin panel. No customer notification is required for this specific status change unless defined elsewhere.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Technician changes status from 'Work In Progress' to 'Resolved'

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A Technician is viewing the details of a job with the status 'Work In Progress'

### 3.3.5 When

The Technician completes the job and taps the action button to resolve the ticket (e.g., 'Mark as Resolved')

### 3.3.6 Then

The system updates the service request's status to 'Resolved'.

### 3.3.7 And

A push notification is sent to the customer informing them the work is complete (handled by US-101).

### 3.3.8 Validation Notes

Verify the status change and subsequent notification. This status is the final one a technician can set before the ticket is formally 'Closed' by an admin or system.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to update status with no network connectivity

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A Technician's mobile device has no active internet connection

### 3.4.5 When

The Technician attempts to change the job status

### 3.4.6 Then

The app's UI should optimistically update to show the new status.

### 3.4.7 And

The app automatically retries sending the update when network connectivity is restored.

### 3.4.8 Validation Notes

Test by enabling airplane mode. Perform a status update. Re-enable network and verify the backend receives the update.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

System prevents invalid status transitions

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A Technician is viewing a job with the status 'Resolved'

### 3.5.5 When

The Technician views the available actions for the job

### 3.5.6 Then

There should be no option presented to change the status back to 'Work In Progress' or 'On The Way'.

### 3.5.7 And

The backend API should reject any direct calls attempting to make an invalid state transition, returning a 409 Conflict error.

### 3.5.8 Validation Notes

Check the UI to ensure only valid next-state actions are shown. Use an API client to attempt an invalid transition and verify the error response.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clear text label displaying the current job status (e.g., 'Status: On The Way').
- A primary action button that is context-aware, showing the next logical action (e.g., 'Start Travel', 'Begin Work', 'Mark as Resolved').

## 4.2.0 User Interactions

- Tapping the primary action button initiates the status change.
- The app must provide immediate visual feedback upon successful update (e.g., status label changes, button updates).
- The app must show a loading indicator while the API call is in progress.
- The app must display a clear error message if the update fails for a reason other than network loss (e.g., server error).

## 4.3.0 Display Requirements

- The job details screen must always show the current, most up-to-date status of the service request.

## 4.4.0 Accessibility Needs

- The status label and action button must be compatible with screen readers.
- The button must have a sufficient touch target size (min 44x44px).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A Technician can only update the status of a service request that is currently assigned to them.

### 5.1.3 Enforcement Point

Backend API (Microservice Level)

### 5.1.4 Violation Handling

The API will return a 403 Forbidden status code if a technician attempts to update a job not assigned to them.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Service request status must follow a predefined lifecycle: Technician Assigned -> On The Way -> Work In Progress -> Resolved.

### 5.2.3 Enforcement Point

Backend State Machine Logic

### 5.2.4 Violation Handling

The API will return a 409 Conflict status code if an invalid state transition is attempted.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-065

#### 6.1.1.2 Dependency Reason

A job must be assigned to a technician before they can update its status.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-077

#### 6.1.2.2 Dependency Reason

The status update functionality will be located on the job details screen.

## 6.2.0.0 Technical Dependencies

- A backend service for managing service requests with a state machine for status transitions.
- An event bus (Azure Service Bus) for publishing status change events.
- A notification service (integrating with FCM) that subscribes to status change events.

## 6.3.0.0 Data Dependencies

- Requires access to the service request record, including its current status and the assigned technician's ID.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) for sending push notifications to the customer.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for status updates must have a 95th percentile (P95) response time of less than 250ms.
- The UI update on the mobile app after a status change should feel instantaneous (<200ms).

## 7.2.0.0 Security

- The API endpoint must be protected and require a valid JWT from an authenticated Technician.
- The endpoint must perform authorization checks to ensure the technician is assigned to the job they are trying to update.

## 7.3.0.0 Usability

- The action to update the status should be one of the most prominent and easily accessible controls on the job details screen.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported iOS (14.0+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing a robust offline-first queuing mechanism on the mobile client.
- Backend implementation of a state machine to enforce the job lifecycle.
- Ensuring the event-driven architecture for notifications is reliable and idempotent.

## 8.3.0.0 Technical Risks

- Handling race conditions if a Service Center Admin re-assigns the job at the same time the technician updates the status.
- Ensuring the offline queue syncs correctly without creating duplicate or out-of-order updates.

## 8.4.0.0 Integration Points

- Service Request Microservice: To update the status in the database.
- Notification Microservice: To trigger push notifications.
- API Gateway (Azure API Management): For authentication and routing.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability

## 9.2.0.0 Test Scenarios

- Verify each valid status transition (Assigned -> On The Way -> In Progress -> Resolved).
- Verify invalid status transitions are blocked by the API.
- Test the offline update scenario: go offline, update status, go back online, and verify the update is synced.
- E2E Test: As a technician, update status. As a customer, verify notification is received. As an admin, verify dashboard is updated.

## 9.3.0.0 Test Data Needs

- Test accounts for a Technician, a Customer, and a Service Center Admin.
- Service requests in each of the possible initial states ('Technician Assigned', 'On The Way', 'Work In Progress').

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest and Supertest for backend unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in the staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic meets the 80% minimum requirement.
- Integration tests for the API endpoint and event publishing are implemented and passing.
- E2E tests simulating the technician, customer, and admin experiences are passing.
- The mobile app's offline functionality has been manually tested and verified.
- API documentation (OpenAPI) has been updated for the new/modified endpoints.
- The feature has been signed off by the Product Owner.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core feature for the Technician persona and a prerequisite for location tracking (US-079). It should be prioritized early in the development of the technician module.

## 11.4.0.0 Release Impact

- This feature is critical for the Minimum Viable Product (MVP) release of the technician mobile application.

