# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-006 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Rejects a Service Center Registration |
| As A User Story | As a Super Admin, I want to reject a pending servi... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Ensures platform quality by preventing incomplete ... |
| Functional Area | Super Admin & Onboarding Module |
| Story Theme | Service Center Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Rejecting a pending registration with a predefined reason

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin viewing the details of a service center registration with the status 'Pending'.

### 3.1.5 When

I select a reason from the dropdown and click the 'Confirm Rejection' button.

### 3.1.6 Then

The service center's registration status is updated to 'Rejected' in the database.

### 3.1.7 And

A success notification (e.g., 'Service Center [Name] has been rejected.') is displayed on my interface.

### 3.1.8 Validation Notes

Verify the status change in the database. Check the audit log for the new entry. Confirm a message is sent to the Azure Service Bus topic for notifications. Verify the UI updates correctly.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Alternative Flow: Rejecting a registration with a custom reason

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

I am in the rejection confirmation modal for a 'Pending' service center.

### 3.2.5 When

I enter a custom reason into the text field and click 'Confirm Rejection'.

### 3.2.6 Then

The rejection is processed successfully, and the custom text is saved as the rejection reason.

### 3.2.7 And

The custom reason is included in the audit log and the notification email.

### 3.2.8 Validation Notes

Check the database and audit log to ensure the custom text is stored correctly. Verify the content of the notification email.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: Attempting to reject without providing a reason

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am in the rejection confirmation modal.

### 3.3.5 When

I click 'Confirm Rejection' without selecting a reason from the dropdown (or entering text for 'Other').

### 3.3.6 Then

A validation error message is displayed (e.g., 'A reason for rejection is required.').

### 3.3.7 And

No audit log or notification is generated.

### 3.3.8 Validation Notes

Verify that the form submission is blocked and the error message appears. Check the database to confirm the status has not changed.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: Attempting to reject a non-pending registration

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am viewing the details of a service center registration with a status of 'Approved' or 'Rejected'.

### 3.4.5 When

I view the available actions for this registration.

### 3.4.6 Then

The 'Reject' button is not visible or is disabled.

### 3.4.7 And

If the corresponding API endpoint is called directly for this registration, the system returns an error response (e.g., HTTP 409 Conflict) indicating the action is not allowed for the current state.

### 3.4.8 Validation Notes

UI check: Confirm the button is disabled/hidden. API check: Use a tool like Postman to attempt the action and verify the error response.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User cancels the rejection action

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I have opened the rejection confirmation modal.

### 3.5.5 When

I click the 'Cancel' button or close the modal without confirming.

### 3.5.6 Then

The modal closes, and no changes are made.

### 3.5.7 And

The service center's status remains 'Pending'.

### 3.5.8 Validation Notes

Verify that the UI returns to the previous state and the database record for the service center is unchanged.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Reject' button on the pending service center details view.
- A confirmation modal with a title (e.g., 'Reject Service Center Registration').
- A dropdown menu for selecting a predefined rejection reason.
- A text area for entering a custom reason, visible only when 'Other' is selected.
- A 'Confirm Rejection' button within the modal.
- A 'Cancel' button within the modal.

## 4.2.0 User Interactions

- Clicking 'Reject' opens the modal.
- Selecting 'Other' reveals the text area.
- Clicking 'Confirm Rejection' with valid input triggers the backend action and closes the modal.
- Clicking 'Cancel' closes the modal with no action.

## 4.3.0 Display Requirements

- The list of pending registrations must be dynamically updated after a rejection.
- A success toast/message should confirm the action was completed.

## 4.4.0 Accessibility Needs

- The modal must be keyboard navigable.
- All form elements must have associated labels.
- Confirmation and error messages must be accessible to screen readers (e.g., using ARIA live regions).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service center registration can only be rejected if its current status is 'Pending'.

### 5.1.3 Enforcement Point

API Gateway and Backend Service Logic

### 5.1.4 Violation Handling

The action is blocked. The API returns a 409 Conflict error. The UI button is disabled or hidden.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A reason (either predefined or custom) is mandatory for every rejection.

### 5.2.3 Enforcement Point

Frontend Form Validation and Backend Service Logic

### 5.2.4 Violation Handling

The submission is blocked. The API returns a 400 Bad Request error. The UI displays a validation message.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-004

#### 6.1.1.2 Dependency Reason

This story requires a user interface to view and select a pending service center registration, which is provided by US-004.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-104

#### 6.1.2.2 Dependency Reason

This story requires a mechanism for Super Admins to manage the master list of rejection reasons. US-104 (or a similar story for registration reasons) must be implemented to populate the reason dropdown.

## 6.2.0.0 Technical Dependencies

- Super Admin authentication and authorization service (Azure AD B2C).
- Audit logging service/module.
- Notification service (Azure Communication Services via Azure Service Bus).

## 6.3.0.0 Data Dependencies

- Access to the table/collection of service center registrations.
- Access to the master list of predefined rejection reasons.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the rejection action should be under 250ms (P95).
- The UI update (removing the item from the list) should feel instantaneous to the user.

## 7.2.0.0 Security

- The API endpoint must be protected and only accessible by users with the 'Super Admin' role.
- The rejection reason (especially custom text) must be sanitized to prevent XSS or other injection attacks.

## 7.3.0.0 Usability

- The rejection workflow should be clear and require explicit confirmation to prevent accidental rejections.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Super Admin portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordination between multiple microservices (e.g., Onboarding, Audit, Notification).
- Asynchronous processing for sending the email notification to ensure a fast API response.
- Requires a database transaction to ensure the status update and audit log creation are atomic.

## 8.3.0.0 Technical Risks

- Potential failure in the notification or audit log services. The core status update must succeed even if these downstream services fail, and failures should be logged for retry or manual intervention.

## 8.4.0.0 Integration Points

- Database: Update service center status.
- Audit Service: Create a new audit log entry.
- Azure Service Bus: Publish a message to trigger an email notification.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify successful rejection with a predefined reason.
- Verify successful rejection with a custom reason.
- Verify validation failure when no reason is provided.
- Verify the UI is correctly updated post-rejection.
- Verify the rejection email is correctly formatted and sent.
- Verify the audit log entry is created with the correct details.
- Verify that a non-Super Admin user cannot access the rejection functionality.

## 9.3.0.0 Test Data Needs

- A test Super Admin account.
- Service center registrations in 'Pending', 'Approved', and 'Rejected' states.
- A populated list of predefined rejection reasons in the database.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Cypress for E2E tests.
- Postman or similar for API-level testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% code coverage for new logic
- E2E tests for the rejection workflow are passing in the CI/CD pipeline
- User interface reviewed for usability and accessibility compliance
- Security requirements validated (RBAC enforced, input sanitized)
- Documentation for the API endpoint is updated in Swagger/OpenAPI
- Story deployed and verified in the staging environment by a QA engineer or product owner

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a critical part of the onboarding workflow and a prerequisite for launching the platform to service centers.
- Ensure prerequisite stories (US-004, US-104) are completed in a prior or the same sprint.

## 11.4.0.0 Release Impact

- Enables the core administrative function of quality control for the service network. Without this, there is no way to manage the onboarding queue other than approval.

