# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-005 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: Reject a brand registration request w... |
| As A User Story | As a Super Admin, I want to reject a pending brand... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Enforces platform governance, mitigates risk by pr... |
| Functional Area | Super Admin & Onboarding Module |
| Story Theme | Platform Governance and Onboarding Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successfully rejecting a brand request with a reason

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Super Admin logged into the platform and I am viewing the details of a brand registration request with the status 'Pending'.

### 3.1.5 When

I click the 'Reject' button, enter a valid reason for rejection into the text field, and click 'Confirm Rejection'.

### 3.1.6 Then

The system updates the brand request's status to 'Rejected' in the database, the request is removed from the 'Pending' view, a success message 'Brand request has been rejected' is displayed, and an email notification containing the rejection reason is sent to the brand applicant.

### 3.1.7 Validation Notes

Verify the status change in the database. Check the admin UI to confirm the request is no longer in the pending list. Verify the success toast/message appears. Check the email logs or a test inbox to confirm the rejection email was sent with the correct reason.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: Attempting to reject a request without providing a reason

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am a Super Admin logged in and viewing the rejection modal for a pending brand request.

### 3.2.5 When

I attempt to click the 'Confirm Rejection' button without entering any text in the reason field.

### 3.2.6 Then

The 'Confirm Rejection' button should be disabled, or if enabled, clicking it should display a validation error message like 'A reason for rejection is required.' and the rejection process is halted.

### 3.2.7 Validation Notes

Test the form's client-side validation. The API call should not be made. The brand request status must remain 'Pending'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: Canceling the rejection process

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am a Super Admin and have opened the rejection modal for a pending brand request.

### 3.3.5 When

I click the 'Cancel' button or close the modal.

### 3.3.6 Then

The modal closes, and no changes are made to the brand request. Its status remains 'Pending'.

### 3.3.7 Validation Notes

Verify that no API call is made and the request's status in the database is unchanged.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: Attempting to reject a request that is no longer pending

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am a Super Admin viewing a brand request that was just approved or rejected by another admin.

### 3.4.5 When

I attempt to perform the rejection action on this request.

### 3.4.6 Then

The system should prevent the action and display an informative error message, such as 'This request has already been processed and cannot be rejected.'

### 3.4.7 Validation Notes

This requires a state check on the backend before processing the update. The API should return a 409 Conflict status code.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Audit Trail: Rejection action is logged

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

A Super Admin is about to reject a pending brand request.

### 3.5.5 When

The admin successfully rejects the request.

### 3.5.6 Then

An entry is created in the system's audit trail logging the Super Admin's ID, the brand request ID, the action ('Brand Request Rejected'), the reason provided, and a timestamp.

### 3.5.7 Validation Notes

Query the audit log table/system to confirm the new record exists and contains the correct information.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Reject' button on the brand request details page.
- A modal dialog for the rejection confirmation.
- A multi-line text input field (`textarea`) for the rejection reason within the modal.
- A 'Confirm Rejection' button within the modal.
- A 'Cancel' button within the modal.
- A success notification/toast message.

## 4.2.0 User Interactions

- Clicking 'Reject' opens the confirmation modal.
- The 'Confirm Rejection' button is disabled until text is entered in the reason field.
- The modal can be dismissed via the 'Cancel' button or standard close controls (e.g., ESC key, 'x' icon).
- After successful rejection, the user is returned to the request list, which should be updated to reflect the change.

## 4.3.0 Display Requirements

- The rejection modal must have a clear title, e.g., 'Reject Brand Registration'.
- The reason field must have a descriptive label, e.g., 'Please provide a reason for rejection.'
- Validation error messages must be clear and displayed near the relevant input field.

## 4.4.0 Accessibility Needs

- The modal must be fully keyboard accessible (trapping focus within it).
- All form elements (input field, buttons) must have associated labels for screen readers.
- The UI must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A reason must be provided for every brand registration rejection.

### 5.1.3 Enforcement Point

API and Client-side form validation.

### 5.1.4 Violation Handling

The rejection request is denied with a validation error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Only requests in 'Pending' status can be rejected.

### 5.2.3 Enforcement Point

Backend API logic before database update.

### 5.2.4 Violation Handling

The request is denied with a state conflict error (HTTP 409).

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Super Admin must be able to log in to access any administrative functions.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-003

#### 6.1.2.2 Dependency Reason

Super Admin needs a user interface to view and select a pending brand request to reject.

## 6.2.0.0 Technical Dependencies

- Authentication Service (Azure AD B2C) for role verification.
- Notification Service (Azure Communication Services) to send the rejection email.
- Database schema for brand registration requests must exist with a 'status' and 'rejection_reason' field.
- Audit logging service must be available.

## 6.3.0.0 Data Dependencies

- A brand registration request must exist in the system with a 'Pending' status for testing.
- An email template for brand rejection notifications must be created and available to the Notification Service.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response for the rejection action should be under 500ms (P95).

## 7.2.0.0 Security

- The API endpoint must be protected and accessible only by users with the 'Super Admin' role.
- All user-provided input (the rejection reason) must be sanitized on the backend to prevent XSS and other injection attacks.
- The action must be logged in an immutable audit trail as per NFR 5.9.

## 7.3.0.0 Usability

- The process of rejecting a request should be intuitive and require minimal steps.

## 7.4.0.0 Accessibility

- All UI components must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The Super Admin portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Standard CRUD operation with a status update.
- Requires frontend modal/form implementation.
- Integration with an existing notification service.
- Logic to check request state before update.

## 8.3.0.0 Technical Risks

- Potential delays if the email notification template is not ready.
- Ensuring atomic state transition in the database to prevent race conditions if multiple admins act simultaneously.

## 8.4.0.0 Integration Points

- Backend API endpoint (e.g., PATCH /api/v1/admin/brand-requests/{id}/reject).
- Asynchronous event published to Azure Service Bus to trigger the Notification Service.
- Database write to the 'brand_requests' table.
- Database write to the 'audit_logs' table.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify successful rejection and email dispatch.
- Verify rejection is blocked without a reason.
- Verify rejection is blocked for non-pending requests.
- Verify rejection is blocked for unauthorized user roles (e.g., Brand Admin, User).
- Verify the audit log is correctly populated after rejection.

## 9.3.0.0 Test Data Needs

- A test Super Admin account.
- At least one brand registration request in 'Pending' status.
- At least one brand registration request in 'Approved' status to test the edge case.

## 9.4.0.0 Testing Tools

- Jest & Supertest for backend unit/integration tests.
- Jest & React Testing Library for frontend component tests.
- Playwright for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% code coverage for the new logic
- End-to-end tests for the rejection flow are created and passing
- User interface reviewed and approved by the design/product team
- Security requirements (RBAC, input sanitization) validated
- All actions are correctly logged in the audit trail
- Documentation for the new API endpoint is created/updated in the OpenAPI specification
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a core part of the admin workflow and should be prioritized alongside the approval story (US-004).
- Requires the brand registration data model to be finalized.
- The content for the rejection email template should be provided by the product owner before development begins.

## 11.4.0.0 Release Impact

This feature is essential for the initial launch (MVP) as it provides a necessary governance control for the platform.

