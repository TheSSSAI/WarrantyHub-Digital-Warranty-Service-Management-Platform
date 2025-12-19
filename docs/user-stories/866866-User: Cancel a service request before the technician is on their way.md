# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-046 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Cancel a service request before the technici... |
| As A User Story | As a consumer who has raised a service request, I ... |
| User Persona | End-User / Consumer |
| Business Value | Improves user satisfaction by providing self-servi... |
| Functional Area | Service Request Management |
| Story Theme | Service Request Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User cancels a request in 'Requested' status

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged in and is viewing the details of their service request which has a status of 'Requested'

### 3.1.5 When

the user taps the 'Cancel Request' button and confirms the action in the confirmation dialog

### 3.1.6 Then

the system updates the service request status to 'Cancelled', the 'Cancel Request' button is no longer displayed for that request, a success notification is shown to the user, and a notification is sent to the associated Service Center.

### 3.1.7 Validation Notes

Verify via UI that the status changes and the button disappears. Check service center panel for the cancellation notification. Check database for status update to 'Cancelled'.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User cancels a request in 'Acknowledged' status

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a user is logged in and is viewing the details of their service request which has a status of 'Acknowledged'

### 3.2.5 When

the user taps the 'Cancel Request' button and confirms the action in the confirmation dialog

### 3.2.6 Then

the system updates the service request status to 'Cancelled', the 'Cancel Request' button is no longer displayed, and a notification is sent to the associated Service Center.

### 3.2.7 Validation Notes

Verify via UI that the status changes and the button disappears. Check service center panel for the cancellation notification. Check database for status update to 'Cancelled'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User cancels a request in 'Technician Assigned' status

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a user is logged in and is viewing the details of their service request which has a status of 'Technician Assigned'

### 3.3.5 When

the user taps the 'Cancel Request' button and confirms the action in the confirmation dialog

### 3.3.6 Then

the system updates the service request status to 'Cancelled', the 'Cancel Request' button is no longer displayed, and notifications are sent to both the Service Center and the assigned Technician.

### 3.3.7 Validation Notes

Verify via UI, Service Center panel, and Technician app. Check database for status update. Confirm push notifications are received by both parties.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Cancellation option is unavailable for 'Technician On The Way' status

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a user is viewing the details of their service request which has a status of 'Technician On The Way'

### 3.4.5 When

the user inspects the available actions on the screen

### 3.4.6 Then

the 'Cancel Request' button is not visible or is disabled, preventing the user from initiating a cancellation.

### 3.4.7 Validation Notes

Manually or via E2E test, advance a ticket to 'Technician On The Way' and assert that the cancel button is not present or is disabled in the user's app.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User aborts the cancellation process

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

a user has tapped the 'Cancel Request' button for an eligible service request

### 3.5.5 When

the user dismisses the confirmation dialog or selects the 'Go Back' (or equivalent negative) option

### 3.5.6 Then

the service request status remains unchanged and the user is returned to the service request details view.

### 3.5.7 Validation Notes

Verify in the UI that the status does not change and the cancel button remains available.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

API rejects cancellation for a request in a non-cancellable state

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a service request exists with a status of 'Work In Progress'

### 3.6.5 When

an API call is made to the cancellation endpoint for that service request ID

### 3.6.6 Then

the API returns an appropriate error response (e.g., 409 Conflict) with a message indicating cancellation is not allowed, and the database status remains unchanged.

### 3.6.7 Validation Notes

This is an integration or API-level test. Check the API response code and body, and verify no change in the database.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Cancellation action is logged in the audit trail

### 3.7.3 Scenario Type

Non_Functional

### 3.7.4 Given

a user is about to cancel a service request

### 3.7.5 When

the user successfully cancels the request

### 3.7.6 Then

a new entry is created in the system's audit trail logging the User ID, action ('Service Request Cancelled'), Service Request ID, timestamp, and source IP address.

### 3.7.7 Validation Notes

Query the audit log database or service to confirm the presence and correctness of the new log entry.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Cancel Request' button on the service request details screen.
- A confirmation modal/dialog with 'Confirm' and 'Cancel' (or similar) actions.

## 4.2.0 User Interactions

- The 'Cancel Request' button must only be visible and enabled for requests in 'Requested', 'Acknowledged', or 'Technician Assigned' states.
- Tapping the button must display the confirmation modal.
- Confirming the action triggers the cancellation flow; dismissing it closes the modal with no state change.
- Upon successful cancellation, a toast or snackbar message like 'Service request has been cancelled' should appear.

## 4.3.0 Display Requirements

- The service request status must immediately update to 'Cancelled' in the UI.
- The 'Cancel Request' button must be hidden or removed after cancellation.

## 4.4.0 Accessibility Needs

- The 'Cancel Request' button and all elements of the confirmation dialog must be keyboard-navigable and compatible with screen readers, adhering to WCAG 2.1 Level AA.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "A service request can only be cancelled by the user if its status is 'Requested', 'Acknowledged', or 'Technician Assigned'.", 'enforcement_point': 'Backend API (service layer) before database update. Frontend UI (disabling/hiding the button).', 'violation_handling': 'The API will return a 409 Conflict error. The UI will prevent the action from being initiated.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-036

#### 6.1.1.2 Dependency Reason

A service request must be created before it can be cancelled.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

The UI for tracking service request status is where the cancel functionality will be implemented.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-101

#### 6.1.3.2 Dependency Reason

The notification system is required to alert the Service Center and Technician of the cancellation.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-114

#### 6.1.4.2 Dependency Reason

The audit trail system must be in place to log this critical action.

## 6.2.0.0 Technical Dependencies

- Service Request State Machine Logic
- Notification Service (FCM Integration)
- Audit Logging Service

## 6.3.0.0 Data Dependencies

- A new 'Cancelled' value must be added to the service request status enum in the database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for cancellation must have a 95th percentile (P95) response time of less than 250ms.

## 7.2.0.0 Security

- The cancellation API endpoint must be protected by authentication and authorization.
- A user must only be able to cancel their own service requests (RBAC enforcement).
- The cancellation action must be logged in the immutable audit trail as per Section 5.9 of the SRS.

## 7.3.0.0 Usability

- The cancellation process should be intuitive, requiring no more than two taps (Cancel -> Confirm).
- Feedback to the user (success/failure) must be immediate and clear.

## 7.4.0.0 Accessibility

- All UI components related to this feature must comply with WCAG 2.1 Level AA.

## 7.5.0.0 Compatibility

- Functionality must be consistent across supported iOS, Android, and web browser versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordination between frontend, backend, and the notification service.
- Involves state management logic on both client and server.
- Requires adding a new state to the service request lifecycle, which may impact other areas (e.g., reporting).

## 8.3.0.0 Technical Risks

- Potential for race conditions if a service center admin updates the status at the exact same time the user tries to cancel. The backend logic must handle this gracefully (e.g., using transactions and re-checking status before update).

## 8.4.0.0 Integration Points

- Backend API for service requests.
- Azure Service Bus for publishing a `SERVICE_REQUEST_CANCELLED` event.
- Notification Service (consumer of the event).
- Audit Log Service.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify cancellation in each of the three valid states.
- Verify cancellation is blocked in all invalid states ('Technician On The Way', 'Work In Progress', 'Resolved', 'Closed', 'Disputed').
- Verify notifications are correctly sent to the right parties (Service Center only, or Service Center + Technician).
- Verify E2E flow from user app click to status update in Service Center panel.
- Verify API security: attempt to cancel another user's request should fail with a 403/404 error.

## 9.3.0.0 Test Data Needs

- Test users with service requests in each possible status.
- Test accounts for Service Center Admins and Technicians to verify notifications.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library (Frontend)
- Jest/Supertest (Backend)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other engineer
- Unit test coverage for new logic meets or exceeds the 80% project standard
- Integration tests for the API endpoint and notification event are implemented and passing
- E2E test scenarios are automated and passing in the CI/CD pipeline
- User interface changes are reviewed and approved by a UX/UI designer
- Performance of the cancellation endpoint is verified to be within NFR limits
- Security checks (RBAC) are validated
- API documentation (OpenAPI/Swagger) is updated for the new endpoint/logic
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be prioritized after the core service request creation and status tracking stories are complete.
- Requires backend and frontend (mobile) developers to be available in the same sprint for efficient collaboration.

## 11.4.0.0 Release Impact

This is a significant feature for the initial release, greatly enhancing the user experience of the service request module.

