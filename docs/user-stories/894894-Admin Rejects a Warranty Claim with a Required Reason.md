# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-060 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Admin Rejects a Warranty Claim with a Required Rea... |
| As A User Story | As a Brand or Service Center Administrator, I want... |
| User Persona | Brand Administrator, Service Center Administrator |
| Business Value | Enforces warranty policies to prevent financial lo... |
| Functional Area | Service Request Management |
| Story Theme | Warranty Claim Processing |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Admin rejects a claim using a predefined reason

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

An admin is viewing a service request with a pending warranty claim status

### 3.1.5 When

the admin clicks the 'Reject Claim' action

### 3.1.6 Then

a modal dialog is displayed, containing a dropdown list of predefined rejection reasons and a text area for additional notes.

### 3.1.7 Validation Notes

Verify the modal appears and is populated with reasons from the master list.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successful rejection with a predefined reason

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the 'Reject Claim' modal is open

### 3.2.5 When

the admin selects a reason from the dropdown and clicks 'Confirm Rejection'

### 3.2.6 Then

the service request's claim status is updated to 'Rejected', the selected reason and admin's details are saved with the record, an immutable audit log is created for the action, and a notification is triggered to be sent to the user.

### 3.2.7 Validation Notes

Check the database for the status update. Verify the audit log entry. Confirm a notification event is published to the message bus.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Admin rejects a claim using a custom reason

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

the 'Reject Claim' modal is open

### 3.3.5 When

the admin selects 'Other' from the reason dropdown, enters a custom reason in the text area, and clicks 'Confirm Rejection'

### 3.3.6 Then

the service request's claim status is updated to 'Rejected', the custom reason text is saved with the record, and all other outcomes from AC-002 occur.

### 3.3.7 Validation Notes

Verify the custom text is saved correctly in the database and is included in the user notification.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Admin attempts to reject a claim without providing a reason

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

the 'Reject Claim' modal is open

### 3.4.5 When

the admin clicks 'Confirm Rejection' without selecting a reason

### 3.4.6 Then

an inline validation error message is displayed, stating that a reason is required, and the claim status remains unchanged.

### 3.4.7 Validation Notes

The API call should be blocked client-side, and the API should return a 400 Bad Request if the validation is bypassed.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Admin attempts to reject a claim with 'Other' reason but no custom text

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

the 'Reject Claim' modal is open and the admin has selected 'Other'

### 3.5.5 When

the admin clicks 'Confirm Rejection' without entering text in the custom reason field

### 3.5.6 Then

an inline validation error message is displayed, stating that a custom reason is required, and the claim status remains unchanged.

### 3.5.7 Validation Notes

The 'Confirm Rejection' button should be disabled until text is entered.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Admin cancels the rejection process

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

the 'Reject Claim' modal is open

### 3.6.5 When

the admin clicks the 'Cancel' button or closes the modal

### 3.6.6 Then

the modal is dismissed and the service request's claim status remains unchanged.

### 3.6.7 Validation Notes

Verify no changes are persisted to the database.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Unauthorized user attempts to reject a claim

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a user without 'Brand Admin' or 'Service Center Admin' roles is logged in

### 3.7.5 When

they attempt to access the API endpoint for rejecting a claim

### 3.7.6 Then

the system returns a 403 Forbidden status code and the action is denied.

### 3.7.7 Validation Notes

This must be tested via an integration test that simulates an API call with an incorrect role.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Reject Claim' button on the service request details view.
- A modal dialog for the rejection workflow.
- A dropdown menu populated with predefined rejection reasons.
- A multi-line text area for entering a custom reason or additional notes.
- A 'Confirm Rejection' primary action button.
- A 'Cancel' secondary action button.

## 4.2.0 User Interactions

- Clicking 'Reject Claim' opens the modal.
- Selecting 'Other' from the dropdown makes the custom reason text area a required field.
- The 'Confirm Rejection' button is disabled until a valid reason is provided.
- The modal should be closed upon successful submission or cancellation.

## 4.3.0 Display Requirements

- The list of rejection reasons must be sourced from the central configuration.
- Validation error messages must be clear and displayed near the relevant input field.

## 4.4.0 Accessibility Needs

- The modal must be keyboard navigable and properly manage focus.
- All form elements must have associated labels.
- Buttons must have accessible names.
- Compliant with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A reason must be provided for every rejected warranty claim.

### 5.1.3 Enforcement Point

Server-side API validation upon submission of the rejection form.

### 5.1.4 Violation Handling

The API request is rejected with a 400 Bad Request status and an error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Only an authorized Brand Admin or Service Center Admin can approve or reject a claim for their associated brands/centers.

### 5.2.3 Enforcement Point

API Gateway and Microservice middleware (RBAC check).

### 5.2.4 Violation Handling

The API request is rejected with a 403 Forbidden status.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Once a claim is rejected, its status is considered final unless escalated to a 'Dispute'.

### 5.3.3 Enforcement Point

Application logic layer.

### 5.3.4 Violation Handling

The UI should not present options to re-process a rejected claim, except for the user's 'Dispute' action.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-037

#### 6.1.1.2 Dependency Reason

A service request must exist before its associated claim can be rejected.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-058

#### 6.1.2.2 Dependency Reason

The system needs to flag the warranty status on a service request to create a claim that can be actioned.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-104

#### 6.1.3.2 Dependency Reason

The master list of predefined rejection reasons must be manageable by a Super Admin.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-124

#### 6.1.4.2 Dependency Reason

The system's audit trail service must be available to log this critical action.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-125

#### 6.1.5.2 Dependency Reason

The notification system must be in place to inform the user of the rejection.

### 6.1.6.0 Story Id

#### 6.1.6.1 Story Id

US-061

#### 6.1.6.2 Dependency Reason

The user-facing view must be able to display the rejection reason saved by this story.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint for updating claim status.
- Audit Logging Service.
- Notification Service (Azure Service Bus, FCM).
- Role-Based Access Control (RBAC) middleware.

## 6.3.0.0 Data Dependencies

- Access to the `ServiceRequests` table.
- Access to the master `RejectionReasons` table.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the rejection action must be under 250ms (P95).
- The modal dialog must render in under 500ms.

## 7.2.0.0 Security

- The API endpoint must be protected and require authentication and authorization.
- The user performing the action must be validated against the brand/service center associated with the service request.
- All data in transit must be encrypted via TLS 1.2+.

## 7.3.0.0 Usability

- The rejection workflow should be intuitive and require minimal clicks.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- All UI components must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a transactional operation on the backend to ensure data consistency (update status, create audit log, queue notification).
- Frontend modal requires state management and validation logic.
- Strict enforcement of Role-Based Access Control (RBAC) is critical.
- Integration with three separate services (Database, Audit, Notifications).

## 8.3.0.0 Technical Risks

- Potential for race conditions if multiple admins try to action the same claim simultaneously. Pessimistic or optimistic locking should be considered.
- Failure in the notification or audit service should not fail the primary transaction of updating the claim status; these should be handled asynchronously and be resilient.

## 8.4.0.0 Integration Points

- Database: `ServiceRequests` table update.
- Audit Service: Creation of a new audit log entry.
- Message Broker (Azure Service Bus): Publishing a `ClaimRejected` event for the notification service to consume.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful rejection with both predefined and custom reasons.
- Verify validation errors for missing reasons.
- Verify RBAC by attempting rejection with an unauthorized user role.
- Verify the user receives the correct notification with the correct reason.
- Verify the audit log contains the correct details of the action.

## 9.3.0.0 Test Data Needs

- User accounts with 'Brand Admin', 'Service Center Admin', and 'User' roles.
- A service request in a 'Requested' or 'Acknowledged' state with a pending claim.
- A populated list of predefined rejection reasons in the database.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.
- Postman or similar for API-level security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests implemented for all new logic with >80% code coverage
- Integration tests for the API endpoint and its side-effects (audit, notification) are implemented and passing
- E2E test scenario is automated and passing in the CI/CD pipeline
- User interface is responsive and meets WCAG 2.1 AA accessibility standards
- Security requirements (RBAC) are validated via testing
- API documentation (OpenAPI/Swagger) is updated to reflect changes
- Story deployed and verified by QA in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by the completion of US-104 (Super Admin manages reasons).
- Should be developed in coordination with US-125 (User notifications) and US-061 (User views reason) to ensure a complete end-to-end feature.

## 11.4.0.0 Release Impact

This is a critical feature for the MVP launch, as it completes a core workflow for administrators managing service requests.

