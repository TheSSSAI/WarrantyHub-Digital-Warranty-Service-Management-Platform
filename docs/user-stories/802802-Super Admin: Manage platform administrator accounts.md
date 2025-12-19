# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-014 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: Manage platform administrator account... |
| As A User Story | As a Super Admin, I want to create, view, edit, an... |
| User Persona | Super Admin: The highest-level user responsible fo... |
| Business Value | Enhances platform security by providing granular c... |
| Functional Area | Platform Administration |
| Story Theme | Super Admin & Onboarding Module |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

View the list of all platform administrators

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin

### 3.1.5 When

I navigate to the 'Admin Management' section of the Super Admin portal

### 3.1.6 Then

I should see a paginated list of all platform administrator accounts

### 3.1.7 And

The list must provide controls for searching by name/email and sorting by each column.

### 3.1.8 Validation Notes

Verify the API returns the correct list of admins and the frontend renders it correctly with all specified data points and controls.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Create a new administrator via invitation

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Admin Management' page

### 3.2.5 When

I click the 'Add New Admin' button, fill in the new admin's Full Name and a valid Email, and submit the form

### 3.2.6 Then

A new administrator account is created in the system with a default 'Active' status

### 3.2.7 And

A success notification 'Administrator invited successfully' is displayed.

### 3.2.8 Validation Notes

Check the database for the new admin record. Verify the invitation email is sent and the link is functional. Confirm the UI updates correctly.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to create an administrator with an existing email

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the 'Add New Admin' form

### 3.3.5 When

I enter an email address that already exists for any user in the system (admin, brand, etc.) and submit

### 3.3.6 Then

The system must prevent the creation of the duplicate account

### 3.3.7 And

A clear, inline validation error message 'An account with this email address already exists.' is displayed next to the email field.

### 3.3.8 Validation Notes

Test with an email that is already registered. The API should return a 409 Conflict or 400 Bad Request status, and the frontend must display the error.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edit an existing administrator's details

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am on the 'Admin Management' page

### 3.4.5 When

I click the 'Edit' action for an existing administrator, change their Full Name, and save the changes

### 3.4.6 Then

The administrator's Full Name is updated in the system

### 3.4.7 And

A success notification 'Administrator details updated.' is displayed.

### 3.4.8 Validation Notes

Verify the name change is persisted in the database and reflected in the UI.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Deactivate an active administrator account

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am on the 'Admin Management' page viewing an active administrator who is not myself

### 3.5.5 When

I click the 'Deactivate' action and confirm the action in a confirmation modal

### 3.5.6 Then

The administrator's status is updated to 'Inactive' in the system

### 3.5.7 And

The admin list UI updates to show the new 'Inactive' status for that user.

### 3.5.8 Validation Notes

Confirm status change in the database. Attempt to log in as the deactivated user; it must fail. If possible, test session invalidation for an active session.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to deactivate one's own account

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am a logged-in Super Admin on the 'Admin Management' page

### 3.6.5 When

I locate my own account in the list of administrators

### 3.6.6 Then

The 'Deactivate' action/button must be disabled or hidden for my own account.

### 3.6.7 Validation Notes

Inspect the UI to ensure the control is not available for the currently logged-in user. Manually attempt an API call to deactivate self; it must be rejected with a 403 Forbidden error.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Reactivate an inactive administrator account

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

I am on the 'Admin Management' page viewing an inactive administrator

### 3.7.5 When

I click the 'Activate' action and confirm the action

### 3.7.6 Then

The administrator's status is updated to 'Active' in the system

### 3.7.7 And

The admin list UI updates to show the new 'Active' status for that user.

### 3.7.8 Validation Notes

Confirm status change in the database. Log in successfully as the reactivated user.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table/list to display administrators
- Search input field
- Sortable table headers
- Pagination controls
- 'Add New Admin' button
- Modal form for creating/editing an admin with fields for 'Full Name' and 'Email'
- Action buttons/menu per row for 'Edit', 'Deactivate', and 'Activate'
- Confirmation modal for deactivation/activation actions

## 4.2.0 User Interactions

- Super Admin can search the list in real-time or upon submission.
- Clicking a table header sorts the list.
- Clicking 'Add New Admin' opens a modal or navigates to a new page.
- Deactivating an admin requires a confirmation step to prevent accidental actions.

## 4.3.0 Display Requirements

- The list must clearly distinguish between 'Active' and 'Inactive' statuses, possibly with a color-coded badge.
- Validation errors on the creation/edit form must be displayed clearly and inline with the relevant field.

## 4.4.0 Accessibility Needs

- All controls (buttons, inputs, links) must be keyboard-navigable and have accessible labels.
- Modals must trap focus correctly.
- Status indicators must have a text equivalent for screen readers (e.g., not rely on color alone).
- Complies with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

An administrator's email address must be unique across all user types in the system.

### 5.1.3 Enforcement Point

During the creation of a new administrator account.

### 5.1.4 Violation Handling

The system rejects the creation request and returns a specific error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A Super Admin cannot deactivate their own account.

### 5.2.3 Enforcement Point

Both at the User Interface (disabling the control) and at the API level (rejecting the request).

### 5.2.4 Violation Handling

The action is prevented. If an API call is attempted, a 403 Forbidden error is returned.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

An administrator's email address cannot be changed after account creation.

### 5.3.3 Enforcement Point

In the 'Edit Administrator' user interface and API.

### 5.3.4 Violation Handling

The email field is presented as read-only. Any API attempt to modify it is ignored or rejected.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-001', 'dependency_reason': 'The Super Admin must be able to log into the platform to access the admin management functionality.'}

## 6.2.0 Technical Dependencies

- Azure Active Directory B2C: All user creation and status changes must be performed via the Microsoft Graph API or relevant SDKs.
- Azure Communication Services: Required for sending invitation emails to new administrators.
- Backend User Management Microservice: A dedicated service to handle the business logic and orchestrate calls to the IdP and database.
- API Gateway (Azure API Management): Endpoints for admin management must be defined, secured, and exposed.

## 6.3.0 Data Dependencies

- A `users` table in the PostgreSQL database to store platform-specific metadata (e.g., status, internal user ID) linked to the Azure AD B2C user object ID.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- API response time for listing administrators should be under 300ms (P95).
- API response time for create/update/deactivate actions should be under 500ms (P95), accounting for external API calls to Azure AD B2C.

## 7.2.0 Security

- All endpoints for this functionality must be protected and accessible only to users with the 'Super Admin' role.
- Role-Based Access Control (RBAC) must be enforced at the API Gateway and re-verified at the microservice level.
- Deactivating a user must immediately revoke their access tokens or render them invalid.
- All actions (create, edit, deactivate, reactivate) must be logged in the system's audit trail (ref US-114).

## 7.3.0 Usability

- The interface for managing admins should be intuitive, requiring minimal training.
- Error messages must be clear and actionable.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- The Super Admin portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Integration with the external identity provider (Azure AD B2C) for user lifecycle management.
- Implementing immediate session invalidation for deactivated users.
- Ensuring data consistency between the local database and Azure AD B2C.

## 8.3.0 Technical Risks

- Latency or failure of the external Azure AD B2C API could impact functionality. Proper error handling and retry mechanisms are needed.
- Incorrectly configured permissions for the service principal interacting with the Microsoft Graph API could block development.

## 8.4.0 Integration Points

- Microsoft Graph API (for Azure AD B2C user management).
- Azure Communication Services API (for sending emails).
- Internal Audit Logging Service.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0 Test Scenarios

- Full CRUD (Create, Read, Update, Deactivate/Reactivate) lifecycle of an admin account.
- Attempting to create an admin with a duplicate email.
- A Super Admin attempting to deactivate their own account.
- A deactivated admin attempting to log in.
- Verifying the invitation email is sent and the link works.

## 9.3.0 Test Data Needs

- A dedicated Super Admin account for testing.
- A set of test email addresses that can receive invitation emails.
- At least one pre-existing user account to test the duplicate email scenario.

## 9.4.0 Testing Tools

- Jest & Supertest for backend unit/integration tests.
- Playwright for E2E testing.
- A tool like MailHog or a dedicated test inbox for verifying email delivery during automated tests.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing in the staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and passing with at least 80% coverage for the new logic.
- E2E tests covering the primary success and failure scenarios are implemented and passing.
- Security checks confirm that only Super Admins can access the functionality and that deactivation works as expected.
- All actions are correctly logged in the audit trail.
- API documentation (OpenAPI/Swagger) is updated for the new endpoints.
- The feature has been verified by the Product Owner or a QA representative.

# 11.0.0 Planning Information

## 11.1.0 Story Points

5

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- Requires access credentials and permissions for the Azure AD B2C tenant to be available before the sprint begins.
- The email template for the administrator invitation needs to be designed and approved.

## 11.4.0 Release Impact

This is a foundational security feature required for managing the platform post-launch. It is critical for the initial release.

