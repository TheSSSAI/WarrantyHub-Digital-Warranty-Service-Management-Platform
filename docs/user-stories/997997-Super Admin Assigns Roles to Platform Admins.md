# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-112 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Assigns Roles to Platform Admins |
| As A User Story | As a Super Admin, I want to manage and assign pred... |
| User Persona | Super Admin: The highest-level administrator respo... |
| Business Value | Enhances platform security by implementing Role-Ba... |
| Functional Area | Super Admin Portal - User Management |
| Story Theme | Platform Administration & Security |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

View and assign a new role to a platform administrator

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Super Admin logged into the Super Admin portal and I am on the 'Platform Administrator Management' page

### 3.1.5 When

I select an administrator with a non-Super Admin role and change their role from a dropdown list of available roles, and then I confirm the change

### 3.1.6 Then

the system must update the administrator's role in the database, display a success confirmation message, and the administrator list must immediately reflect the new role.

### 3.1.7 Validation Notes

Verify the UI updates correctly. Check the database to confirm the role change. The new role's permissions should take effect on the user's next session or token refresh.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Role change is recorded in the audit log

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a Super Admin has successfully changed the role of another platform administrator

### 3.2.5 When

the role change action is completed

### 3.2.6 Then

a new entry must be created in the immutable audit log that records the acting Super Admin's ID, the target administrator's ID, the old role, the new role, and a precise timestamp.

### 3.2.7 Validation Notes

Query the audit log system (as per US-014) to confirm the presence and accuracy of the log entry.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempting to change one's own role

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a Super Admin logged into the Super Admin portal and I am on the 'Platform Administrator Management' page

### 3.3.5 When

I locate my own user account in the list of administrators

### 3.3.6 Then

the control to change the role for my account must be disabled or hidden, preventing me from modifying my own role.

### 3.3.7 Validation Notes

Inspect the UI to ensure the role-change dropdown/button is disabled for the currently logged-in user. Manually attempt to send an API request to change own role and verify it is rejected with a 403 Forbidden error.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to demote the last Super Admin

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am the only user with the 'Super Admin' role on the platform

### 3.4.5 When

I attempt to change the role of another administrator who is also a Super Admin to a non-Super Admin role, which would leave the platform with no Super Admins

### 3.4.6 Then

the system must prevent the action and display a clear error message, such as 'Action failed: Cannot remove the last Super Admin. At least one Super Admin must exist.'

### 3.4.7 Validation Notes

This requires specific test data setup with only one Super Admin account. Attempt the action and verify the error message is displayed and the role is not changed in the database.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Confirmation prompt before applying role change

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I am a Super Admin and I have selected a new role for another administrator

### 3.5.5 When

I click the 'Save' or 'Update' button

### 3.5.6 Then

a confirmation modal must appear, stating 'Are you sure you want to change this user's role to [New Role]? This will immediately alter their access permissions.' with 'Confirm' and 'Cancel' options.

### 3.5.7 Validation Notes

Verify the modal appears on save attempt. Clicking 'Cancel' should close the modal with no changes. Clicking 'Confirm' should proceed with the action described in AC-001.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A table listing all platform administrators with columns for Name, Email, and Current Role.
- Search and filter controls for the administrator list.
- Pagination for the administrator list.
- An 'Edit' button or action link for each administrator.
- A dropdown menu within the edit view/modal to select from a predefined list of platform administrator roles.
- A confirmation modal dialog with 'Confirm' and 'Cancel' buttons.

## 4.2.0 User Interactions

- Super Admin can search for a specific administrator by name or email.
- Super Admin clicks 'Edit' to open the role assignment interface for a user.
- Super Admin selects a new role from the dropdown.
- Super Admin clicks 'Save', which triggers the confirmation modal.
- Super Admin clicks 'Confirm' to apply the change.

## 4.3.0 Display Requirements

- The list of roles in the dropdown must be sourced from a predefined list of valid platform administrator roles.
- Success and error messages must be clearly displayed to the user.

## 4.4.0 Accessibility Needs

- The administrator list and all interactive elements (buttons, dropdowns, modals) must be fully keyboard-navigable.
- All controls must have appropriate ARIA labels.
- The interface must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A Super Admin cannot modify their own role.

### 5.1.3 Enforcement Point

Backend API endpoint and Frontend UI.

### 5.1.4 Violation Handling

The UI control will be disabled. Any direct API call will be rejected with a 403 Forbidden status code.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The system must always have at least one active Super Admin.

### 5.2.3 Enforcement Point

Backend API endpoint when processing a role change request.

### 5.2.4 Violation Handling

The transaction will be rejected with a 400 Bad Request status code and a descriptive error message. The database state will remain unchanged.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-009

#### 6.1.1.2 Dependency Reason

This story extends the administrator management functionality. The ability to create, view, and deactivate administrators must exist before roles can be assigned to them.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-014

#### 6.1.2.2 Dependency Reason

This story requires an audit log system to be in place to record the security-sensitive action of changing an administrator's role.

## 6.2.0.0 Technical Dependencies

- A fully implemented Role-Based Access Control (RBAC) framework with predefined roles for platform administrators.
- Azure Active Directory B2C for user identity management.
- A centralized audit logging service/microservice.

## 6.3.0.0 Data Dependencies

- A predefined list of platform administrator roles (e.g., 'Super Admin', 'Platform Content Manager', 'Support Admin') must be available in the system configuration or database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for updating a user's role must have a P95 response time of less than 250ms.
- The administrator list page must load in under 2.5 seconds (LCP) with up to 1,000 administrators.

## 7.2.0.0 Security

- The API endpoint for assigning roles must be protected and only accessible by authenticated users with the 'Super Admin' role.
- The system must validate on the backend that the acting user is not modifying their own role.
- The system must validate on the backend that the action does not violate the 'last Super Admin' rule.
- All role change actions must be logged in an immutable audit trail as per SRS 3.1 and 5.7.3.

## 7.3.0.0 Usability

- The process of changing a role should be intuitive and require minimal steps.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- The feature must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The Super Admin portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend logic for security checks (self-modification, last admin) is critical and requires careful implementation.
- Requires tight integration with the existing RBAC and authentication systems.
- Frontend state management to ensure the UI reflects changes immediately and accurately.
- Requires robust error handling for critical security rules.

## 8.3.0.0 Technical Risks

- Risk of introducing a security vulnerability if backend validation is not implemented correctly.
- Potential for a lockout scenario if the 'last Super Admin' logic is flawed.

## 8.4.0.0 Integration Points

- Authentication Service (Azure AD B2C) to identify user and role.
- User Management Microservice to update user data.
- Audit Log Microservice to record the event.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Successfully change a 'Platform Admin' to a 'Super Admin'.
- Attempt to change own role and verify it is blocked.
- Set up a scenario with only one Super Admin and attempt to demote them, verifying it is blocked.
- Verify the audit log entry is created correctly with all required details.
- Cancel the action from the confirmation modal and verify no change is made.

## 9.3.0.0 Test Data Needs

- An active Super Admin account for test execution.
- At least two other platform administrator accounts with different roles.
- A specific test setup where only one Super Admin account exists to test the edge case.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Cypress for E2E tests.
- Postman or similar for direct API security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least two team members, with a focus on the security logic
- Unit tests implemented for all new logic with >80% code coverage
- Integration testing completed successfully between frontend, user service, and audit service
- E2E automated tests for the happy path and key error conditions are passing
- Security requirements validated, including manual API testing of authorization rules
- Documentation for the administrator role management feature is updated
- Story deployed and verified in the staging environment by a QA engineer

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-009 and US-014.
- Requires careful coordination with any team managing the core RBAC framework.
- Sufficient time must be allocated for thorough security testing.

## 11.4.0.0 Release Impact

This is a foundational security feature for platform administration and is critical for enabling safe delegation of administrative tasks.

