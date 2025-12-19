# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-112 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: Reject a service center registration ... |
| As A User Story | As a Super Admin, I want to reject a pending servi... |
| User Persona | Super Admin: A platform administrator responsible ... |
| Business Value | Ensures only qualified and verified service center... |
| Functional Area | Super Admin & Onboarding Module |
| Story Theme | Partner Onboarding Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successfully reject a pending request with a reason

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Super Admin logged into the platform and am viewing the details of a service center registration request with the status 'Pending Approval'

### 3.1.5 When

I click the 'Reject' button, enter a valid reason (e.g., 'Business address could not be verified') into the reason modal, and click 'Confirm Rejection'

### 3.1.6 Then

The system must update the status of the registration request to 'Rejected' in the database.

### 3.1.7 And

A success notification (e.g., 'Service Center request has been rejected.') is displayed on my screen.

### 3.1.8 Validation Notes

Verify the database record for the status change and saved reason. Check the email sending service logs (or a test inbox) for the notification. Confirm the UI list of pending requests is updated.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: Attempt to reject without providing a reason

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am a Super Admin viewing the 'Reject Registration Request' modal for a pending request

### 3.2.5 When

I click the 'Confirm Rejection' button without entering any text in the reason field

### 3.2.6 Then

The system must display an inline validation error message (e.g., 'A reason for rejection is required.').

### 3.2.7 And

The status of the registration request must remain 'Pending Approval'.

### 3.2.8 Validation Notes

Check that the form prevents submission with an empty reason field and that no API call is made.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: Cancel the rejection process

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am a Super Admin viewing the 'Reject Registration Request' modal

### 3.3.5 When

I click the 'Cancel' button or close the modal using the 'X' icon

### 3.3.6 Then

The modal must close.

### 3.3.7 And

The status of the request remains 'Pending Approval'.

### 3.3.8 Validation Notes

Verify that the UI returns to the request details view and the database record is unchanged.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: Request has already been processed by another admin

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am a Super Admin viewing the details of a pending request

### 3.4.5 And

The view should update to reflect the request's current status, with action buttons ('Approve'/'Reject') disabled.

### 3.4.6 When

I click the 'Reject' button

### 3.4.7 Then

The system should prevent the action and display an informative message, such as 'This request has already been processed. The page will now refresh.'

### 3.4.8 Validation Notes

This can be tested by having two test admin accounts attempt to action the same record simultaneously. The backend should use a transactional check on the request's status before updating.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Security: Non-admin user attempts to access rejection functionality

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A user with a role other than 'Super Admin' is logged in

### 3.5.5 When

they attempt to access the rejection API endpoint directly (e.g., `PATCH /api/v1/admin/service-center-requests/{id}/reject`)

### 3.5.6 Then

The system must return a 403 Forbidden status code.

### 3.5.7 Validation Notes

Use an API testing tool like Postman or Supertest with a JWT from a non-Super Admin user to verify the endpoint is protected.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Reject' button on the service center request details page, visually distinct from the 'Approve' button.
- A modal dialog titled 'Reject Registration Request'.
- A multi-line text area within the modal for the rejection reason, with a placeholder like 'Provide a clear reason for rejection...'.
- A primary 'Confirm Rejection' button within the modal.
- A secondary 'Cancel' button within the modal.

## 4.2.0 User Interactions

- Clicking 'Reject' opens the modal.
- The text area should enforce a character limit (e.g., 10-500 characters) with real-time feedback.
- The 'Confirm Rejection' button is disabled until the minimum character count is met.
- Successful rejection displays a temporary success message (toast notification).
- Failed rejection displays a temporary error message.

## 4.3.0 Display Requirements

- The name of the service center being rejected should be displayed in the modal's title or body for confirmation.
- Rejected requests should be viewable in a separate list or filterable view (e.g., a 'Rejected' tab).

## 4.4.0 Accessibility Needs

- The modal must be fully keyboard accessible (trapping focus within the modal).
- All form elements (text area) and buttons must have accessible labels for screen readers, compliant with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service center registration request can only be rejected if its current status is 'Pending Approval'.

### 5.1.3 Enforcement Point

Backend API before processing the rejection request.

### 5.1.4 Violation Handling

If the status is not 'Pending Approval', the API should return an error (e.g., 409 Conflict) with a message like 'This request is not in a pending state and cannot be rejected.'

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A reason for rejection is mandatory.

### 5.2.3 Enforcement Point

Both frontend (form validation) and backend (API payload validation).

### 5.2.4 Violation Handling

The request is denied with a 400 Bad Request error if the reason is missing or does not meet length requirements.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Super Admin must be able to log in to access the admin portal.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-009

#### 6.1.2.2 Dependency Reason

Super Admin needs a list of pending service center requests to select one for review and rejection.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C for Super Admin authentication and role verification.
- Azure Communication Services for sending the rejection email notification.
- An existing email template for service center rejection.
- Azure Service Bus for asynchronous event publishing (`ServiceCenterRegistrationRejected`).

## 6.3.0.0 Data Dependencies

- A `service_center_requests` table with columns for `status` and `rejection_reason` must exist.
- The system must have at least one service center request in 'Pending Approval' status for testing.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the rejection action must be under 500ms (P95).

## 7.2.0.0 Security

- The endpoint must be protected by Role-Based Access Control (RBAC), accessible only to the 'Super Admin' role.
- All user-provided text (rejection reason) must be sanitized on the backend to prevent Cross-Site Scripting (XSS) vulnerabilities.
- An audit trail entry must be created for this action, logging the admin ID, request ID, action ('Reject'), reason, and timestamp (as per US-114).

## 7.3.0.0 Usability

- The rejection workflow should be intuitive, requiring minimal steps for the admin.
- Error messages must be clear and user-friendly.

## 7.4.0.0 Accessibility

- All UI components must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Super Admin portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend implementation of the modal and state management.
- Backend API endpoint creation with status checks and RBAC.
- Integration with the notification service via an asynchronous event bus.
- Requires creation of a new email template for the rejection notification.
- Handling of potential race conditions if multiple admins are active.

## 8.3.0.0 Technical Risks

- Potential delays if the email notification template is not ready.
- Ensuring the asynchronous notification event is handled reliably without data loss.

## 8.4.0.0 Integration Points

- Authentication Service (Azure AD B2C) for role validation.
- Primary Database (PostgreSQL) for state change.
- Messaging Queue (Azure Service Bus) to trigger notifications.
- Notification Service (Azure Communication Services) to send the email.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify successful rejection and email notification.
- Verify rejection is blocked without a reason.
- Verify the cancel action works correctly.
- Verify API security by attempting the action with a non-admin user token.
- Verify the race condition handling by simulating concurrent requests.

## 9.3.0.0 Test Data Needs

- A Super Admin user account.
- A non-admin user account.
- At least two service center registration requests in 'Pending Approval' status.
- A test email inbox to verify receipt of the rejection notification.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend)
- Jest & Supertest (Backend)
- Playwright (E2E)
- A mail-trapping tool (e.g., MailHog) for the test environment.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in the staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new backend logic is at or above 80%.
- Integration tests for the API endpoint and event publishing are implemented and passing.
- E2E test script for the rejection workflow is created and passing.
- The new email notification template is created and approved.
- API documentation (OpenAPI/Swagger) is updated for the new endpoint.
- The action is successfully logged in the audit trail.
- Product Owner has reviewed and accepted the feature.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core feature for the platform's go-live. It depends on the ability to view pending requests (US-009).
- The email template content must be provided by the business/product team before development can be completed.

## 11.4.0.0 Release Impact

This feature is critical for the initial pilot launch (Phase 1) as it completes the basic onboarding workflow for platform administrators.

