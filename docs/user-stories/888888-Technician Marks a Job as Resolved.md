# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-057 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician Marks a Job as Resolved |
| As A User Story | As a Technician, I want to mark an assigned job as... |
| User Persona | Technician: A field service professional responsib... |
| Business Value | Provides a definitive closing action for a service... |
| Functional Area | Service Request Management |
| Story Theme | Technician Job Execution |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Technician resolves a job with all prerequisites met

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Technician is logged into the mobile app and is viewing the details of a job with the status 'Work In Progress'

### 3.1.5 When

the Technician taps the 'Mark as Resolved' button and confirms the action in the subsequent dialog

### 3.1.6 Then

the system updates the service request's status to 'Resolved' in the backend database

### 3.1.7 And

a push notification is sent to the User stating that their service request has been resolved.

### 3.1.8 Validation Notes

Verify database status change. Verify the job moves between lists in the Technician app. Verify the push notification is received on a User's device. Check Azure Service Bus monitor for the event.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: Attempting to resolve a job without required information

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

a Technician is viewing a job where mandatory completion information (e.g., customer signature) has not been entered

### 3.2.5 When

the Technician taps the 'Mark as Resolved' button

### 3.2.6 Then

the app displays an error message specifying the missing information (e.g., 'Customer signature is required before resolving the job')

### 3.2.7 And

the service request status remains unchanged.

### 3.2.8 Validation Notes

Configure a job to require a signature. Attempt to resolve without it and verify the specific error message is shown and the status does not change.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: Technician cancels the resolution action

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

a Technician has tapped the 'Mark as Resolved' button and a confirmation dialog is displayed

### 3.3.5 When

the Technician taps the 'Cancel' button in the confirmation dialog

### 3.3.6 Then

the dialog is dismissed

### 3.3.7 And

the service request status remains unchanged.

### 3.3.8 Validation Notes

Perform the action and cancel it. Verify the app returns to the job details screen with no change in status.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: Technician resolves a job while offline

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a Technician is using the app on a device with no network connectivity

### 3.4.5 When

the Technician taps 'Mark as Resolved' on a job and confirms

### 3.4.6 Then

the app queues the status update action locally

### 3.4.7 And

when the device regains network connectivity, the queued action is automatically sent to the backend to resolve the job.

### 3.4.8 Validation Notes

Enable airplane mode on a test device. Perform the action. Verify the UI shows a pending state. Disable airplane mode and verify the job status updates correctly on the server and other clients.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Security: Unauthorized user attempts to resolve a job

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a user who is not the assigned Technician or a Service Center Admin for that job is authenticated

### 3.5.5 When

they attempt to call the API endpoint to resolve the service request

### 3.5.6 Then

the API returns a '403 Forbidden' or '401 Unauthorized' status code

### 3.5.7 And

the service request status remains unchanged.

### 3.5.8 Validation Notes

Using an API client like Postman, attempt to call the resolve endpoint with JWTs from different user roles (another technician, a user, etc.) and verify the correct error response.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A primary action button labeled 'Mark as Resolved' on the active job details screen.
- A confirmation modal with 'Confirm' and 'Cancel' actions.
- A success toast/snackbar notification.
- An error message display area or modal.
- A 'Completed Jobs' tab or filter in the Technician's job list.

## 4.2.0 User Interactions

- Tapping the 'Mark as Resolved' button must trigger the confirmation modal.
- After successful resolution, the user should be navigated back to their job list, which should be refreshed to reflect the change.

## 4.3.0 Display Requirements

- The job details screen for a resolved job should clearly display the 'Resolved' status, possibly with a timestamp.
- The 'Mark as Resolved' button should be disabled or hidden for jobs that are not in a resolvable state (e.g., 'Acknowledged', 'Resolved', 'Closed').

## 4.4.0 Accessibility Needs

- The 'Mark as Resolved' button must have a minimum tap target size of 44x44 points.
- All text and notifications must be compatible with screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service request can only be moved to 'Resolved' status from 'Work In Progress' or 'Technician On The Way' statuses.

### 5.1.3 Enforcement Point

Backend API (Service Request State Machine)

### 5.1.4 Violation Handling

The API request will be rejected with a 409 Conflict error, indicating an invalid state transition.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A service request cannot be marked as 'Resolved' unless all mandatory completion fields are filled (e.g., Service Completion Notes, Customer Digital Signature).

### 5.2.3 Enforcement Point

Backend API and Mobile App (Client-side validation as a UX enhancement)

### 5.2.4 Violation Handling

The API request will be rejected with a 400 Bad Request error. The mobile app will prevent the action and display a user-friendly error message.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-053

#### 6.1.1.2 Dependency Reason

The ability to update a job's status in general must exist before this specific status update can be implemented.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-055

#### 6.1.2.2 Dependency Reason

The ability to enter service completion notes is a mandatory prerequisite for resolving a job.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-056

#### 6.1.3.2 Dependency Reason

The ability to capture a customer's digital signature is a mandatory prerequisite for resolving a job.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-075

#### 6.1.4.2 Dependency Reason

The mobile app's offline data synchronization capability is required to handle the offline resolution scenario.

## 6.2.0.0 Technical Dependencies

- A defined Service Request state machine in the backend.
- The notification service (integrating with FCM via Azure Communication Services) must be operational.
- The eventing system (Azure Service Bus) must be configured to handle 'ServiceRequestResolved' events.

## 6.3.0.0 Data Dependencies

- Requires an existing service request record in the database assigned to the technician.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) for push notifications.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to resolve the job must have a P95 response time of less than 500ms.

## 7.2.0.0 Security

- The API endpoint for resolving a job must be protected and only accessible by the assigned Technician or a Service Center Admin.
- The request must be validated to prevent unauthorized status changes.

## 7.3.0.0 Usability

- The action to resolve a job should be easily discoverable and require no more than two taps (e.g., tap 'Resolve', tap 'Confirm').

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA guidelines as applicable to mobile applications.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported iOS (14+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordination between the mobile app (React Native) and the backend (NestJS).
- Involves a transactional database update and publishing an asynchronous event.
- Implementation of client-side logic for offline queueing adds complexity.
- Requires robust state management on both client and server.

## 8.3.0.0 Technical Risks

- Race conditions if multiple actors (e.g., technician and their admin) try to update the same ticket simultaneously. Optimistic locking should be considered.
- Failure in the event publishing step could lead to downstream processes (like notifications) not being triggered. A reliable outbox pattern is recommended.

## 8.4.0.0 Integration Points

- Backend Service Request Microservice (for status update).
- Azure Service Bus (for event publishing).
- Backend Notification Microservice (for consuming the event and sending push notifications).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify successful resolution and all subsequent effects (DB update, event, notification).
- Test resolution failure due to missing mandatory data (notes, signature).
- Test resolution failure due to invalid initial state.
- Test the offline resolution and successful sync upon reconnection.
- Perform security testing by attempting to resolve a job using credentials of an unauthorized user.

## 9.3.0.0 Test Data Needs

- Test accounts for a Technician, a User, and a Service Center Admin.
- Service requests in various states ('Work In Progress', 'Acknowledged', etc.).
- A service request with all prerequisites met.
- A service request missing one or more prerequisites.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Integration)
- Jest (Backend Unit/Integration)
- Detox or Appium (Mobile E2E)
- Postman or similar (API Security Testing)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code for both mobile and backend has been peer-reviewed and merged.
- Unit test coverage for new logic is at or above the 80% project standard.
- Integration tests for the API endpoint and event consumer are implemented and passing.
- A new E2E test case covering the happy path has been added to the regression suite and is passing.
- Security checks for the API endpoint have been performed and passed.
- Any necessary documentation (e.g., API spec, state machine diagram) has been updated.
- The feature has been successfully deployed and verified in the staging environment by a QA engineer or Product Owner.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a key part of the core service workflow and a blocker for post-service features like customer ratings (US-044).
- Ensure that prerequisite stories (US-055, US-056) are completed before starting this story.

## 11.4.0.0 Release Impact

This feature is essential for the Minimum Viable Product (MVP) as it completes the primary service delivery loop.

