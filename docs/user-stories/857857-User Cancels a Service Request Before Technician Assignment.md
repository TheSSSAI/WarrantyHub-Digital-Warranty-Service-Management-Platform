# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-042 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Cancels a Service Request Before Technician A... |
| As A User Story | As a Consumer, I want to cancel a service request ... |
| User Persona | Consumer/End-User who has registered a product and... |
| Business Value | Improves user satisfaction by providing self-servi... |
| Functional Area | Service Request Management |
| Story Theme | User Self-Service & Control |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful cancellation from 'Requested' status

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a logged-in user has a service request with the status 'Requested'

### 3.1.5 When

the user navigates to the service request details, taps the 'Cancel Request' button, and confirms the action in the confirmation dialog

### 3.1.6 Then

the service request's status is updated to 'Cancelled', the user sees a success confirmation message (e.g., toast notification), and the 'Cancel Request' button is no longer visible or is disabled.

### 3.1.7 Validation Notes

Verify in the database that the status is 'Cancelled'. Check the mobile app UI to confirm the status update and button removal. Verify an audit log entry for the cancellation is created.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successful cancellation from 'Acknowledged' status

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a logged-in user has a service request with the status 'Acknowledged'

### 3.2.5 When

the user taps the 'Cancel Request' button and confirms the action

### 3.2.6 Then

the service request's status is updated to 'Cancelled', and a notification is sent to the associated Service Center's portal.

### 3.2.7 Validation Notes

Verify the Service Center portal receives a real-time update or notification indicating the request has been cancelled and removed from their active queue.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User aborts the cancellation process

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

the user has initiated the cancellation process and is viewing the confirmation dialog

### 3.3.5 When

the user taps 'Go Back' or dismisses the dialog without confirming

### 3.3.6 Then

the service request's status remains unchanged, and the user is returned to the service request details screen.

### 3.3.7 Validation Notes

Check that no API call to cancel the request is made and the database record is unchanged.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Cancellation option is unavailable for non-cancellable statuses

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a user has a service request with a status of 'Technician Assigned', 'Work In Progress', or 'Resolved'

### 3.4.5 When

the user views the details of this service request

### 3.4.6 Then

the 'Cancel Request' button is not visible or is permanently disabled.

### 3.4.7 Validation Notes

Test this for each status after 'Acknowledged' to ensure the business rule is enforced consistently in the UI.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Cancellation fails due to a race condition

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a user is on the cancellation confirmation screen for a request with status 'Acknowledged'

### 3.5.5 When

a Service Center Admin assigns a technician to that same request just before the user confirms the cancellation

### 3.5.6 Then

the cancellation API call fails with an error, the user is shown a message like 'This request can no longer be cancelled as a technician has been assigned', and the UI refreshes to show the new 'Technician Assigned' status.

### 3.5.7 Validation Notes

This requires a coordinated test. The backend must use a transactional check to ensure the status hasn't changed before updating it to 'Cancelled'.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Cancel Request' button on the service request details screen.
- A confirmation modal/dialog with 'Confirm' and 'Cancel' (or similar) actions.

## 4.2.0 User Interactions

- The 'Cancel Request' button is conditionally displayed based on the request's status.
- Tapping the button opens a confirmation dialog to prevent accidental cancellations.
- Upon successful cancellation, the UI should provide immediate feedback (e.g., toast notification) and update the request's status display.

## 4.3.0 Display Requirements

- The service request status must be clearly displayed as 'Cancelled' after the action is complete.
- The confirmation dialog must contain clear text explaining that the action is irreversible.

## 4.4.0 Accessibility Needs

- The confirmation dialog must be accessible, allowing keyboard navigation and screen reader support.
- The 'Cancel Request' button must have a clear, accessible label.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "A service request can only be cancelled by the user if its status is 'Requested' or 'Acknowledged'.", 'enforcement_point': 'Backend API endpoint for cancellation and Frontend UI where the cancel button is displayed.', 'violation_handling': 'The API will return a 409 Conflict (or similar) error if a cancellation is attempted on a request in an invalid state. The UI will prevent the action by not showing the button.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-037

#### 6.1.1.2 Dependency Reason

A service request must be creatable before it can be cancelled.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-040

#### 6.1.2.2 Dependency Reason

The system for tracking and displaying service request statuses must be in place.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-048

#### 6.1.3.2 Dependency Reason

The 'Technician Assigned' status, which is the key constraint for this story, is implemented as part of the technician assignment flow.

## 6.2.0.0 Technical Dependencies

- Service Request microservice with a database that supports status updates.
- Authentication service (Azure AD B2C) to authorize the user action.
- Notification service (Azure Service Bus and FCM) to alert the Service Center.

## 6.3.0.0 Data Dependencies

- Requires existing service request records in the database associated with the user.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to cancel the request must have a P95 response time of less than 250ms.

## 7.2.0.0 Security

- The API endpoint must validate that the JWT token belongs to the user who owns the service request.
- The cancellation action must be logged in an immutable audit trail, recording the user ID and timestamp.

## 7.3.0.0 Usability

- The cancellation process must be simple and require explicit confirmation to prevent accidental actions.

## 7.4.0.0 Accessibility

- All UI elements must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent on supported iOS and Android versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Backend logic requires an atomic transaction to check the current status and update it to 'Cancelled' to prevent race conditions.
- Asynchronous notification to the Service Center must be reliable.

## 8.3.0.0 Technical Risks

- A potential delay or failure in the notification to the Service Center could lead to them attempting to assign a cancelled request. The system of record (the database status) must be the source of truth.

## 8.4.0.0 Integration Points

- Service Request API: A new endpoint (e.g., `PATCH /api/v1/service-requests/{id}/cancel`) is needed.
- Notification Service: The Service Request service will publish a 'ServiceRequestCancelled' event to a message broker (Azure Service Bus).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- User successfully cancels a request in 'Requested' state.
- User successfully cancels a request in 'Acknowledged' state.
- User is unable to cancel a request in 'Technician Assigned' state.
- User attempts to cancel, but another user (admin) assigns a technician simultaneously (race condition test).
- Verify that the Service Center portal receives the cancellation notification.

## 9.3.0.0 Test Data Needs

- Test user accounts.
- Service requests in 'Requested', 'Acknowledged', and 'Technician Assigned' statuses.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Jest for backend unit/integration tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests implemented for backend logic and frontend components, with >80% coverage
- Integration tests completed for the API endpoint and notification event
- E2E tests for the full user flow are passing in the CI/CD pipeline
- User interface reviewed and approved by UX/Product Owner
- API endpoint is secured and passes authorization checks
- All related documentation (e.g., API spec) is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be prioritized after the core service request creation and assignment stories are complete.
- Requires coordination between frontend (mobile app) and backend (API) development.

## 11.4.0.0 Release Impact

This is a key feature for the initial release, significantly improving the user experience and operational flow.

