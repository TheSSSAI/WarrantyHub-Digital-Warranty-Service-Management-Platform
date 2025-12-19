# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-009 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Manages Platform Administrator Account... |
| As A User Story | As a Super Admin, I want to create, view, edit, an... |
| User Persona | Super Admin: The highest-level user responsible fo... |
| Business Value | Enables secure and efficient management of the adm... |
| Functional Area | Super Admin & Onboarding Module |
| Story Theme | Platform Administration & Security |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

View the list of all platform administrators

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is logged in as a Super Admin

### 3.1.5 When

The user navigates to the 'Platform Administrators' management page

### 3.1.6 Then

The system displays a list of all platform administrator accounts with columns for 'Full Name', 'Email', 'Role', and 'Status (Active/Inactive)'.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully create a new platform administrator

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The Super Admin is on the 'Platform Administrators' management page

### 3.2.5 When

The user clicks 'Add New Admin', fills in a valid Full Name, a unique Email, selects a Role, and submits the form

### 3.2.6 Then

A new administrator account is created in the system and provisioned in Azure AD B2C.

### 3.2.7 And

The creation event is recorded in the immutable audit log, including which Super Admin performed the action.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Successfully edit an existing administrator's role

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The Super Admin is viewing the list of platform administrators

### 3.3.5 When

The user selects an existing administrator, chooses to 'Edit', changes their role, and saves the changes

### 3.3.6 Then

The administrator's role is updated in the user interface and the backend system.

### 3.3.7 And

The modification event is recorded in the immutable audit log.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Successfully deactivate an active administrator

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

The Super Admin is viewing an active administrator in the list

### 3.4.5 When

The user clicks the 'Deactivate' action for that administrator and confirms the action in a modal dialog

### 3.4.6 Then

The administrator's status is updated to 'Inactive' in the list.

### 3.4.7 And

The deactivation event is recorded in the immutable audit log.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Successfully reactivate an inactive administrator

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

The Super Admin is viewing an inactive administrator in the list

### 3.5.5 When

The user clicks the 'Reactivate' action for that administrator and confirms the action

### 3.5.6 Then

The administrator's status is updated to 'Active' in the list.

### 3.5.7 And

The reactivation event is recorded in the immutable audit log.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to create an administrator with an existing email

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

The Super Admin is on the 'Add New Admin' form

### 3.6.5 When

The user enters an email address that already exists for any user in the system and submits the form

### 3.6.6 Then

The system displays a clear validation error message, such as 'An account with this email address already exists.'

### 3.6.7 And

The new administrator account is not created.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

A Super Admin cannot deactivate their own account

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

The Super Admin is logged in and viewing the list of administrators

### 3.7.5 When

The user finds their own account in the list

### 3.7.6 Then

The 'Deactivate' action for their own account is disabled or hidden, preventing self-deactivation.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table to list administrators
- Search input field for the list
- Filter dropdowns for 'Role' and 'Status'
- 'Add New Admin' button
- A modal form for creating/editing an administrator with fields for Full Name, Email, and a Role selector
- Action buttons/menu (e.g., kebab menu) on each row for 'Edit', 'Deactivate', and 'Reactivate'
- Confirmation modal for deactivation/reactivation actions

## 4.2.0 User Interactions

- Super Admin can sort the administrator list by any column.
- As the Super Admin types in the search box, the list filters in real-time.
- Clicking 'Deactivate' prompts a confirmation dialog to prevent accidental actions.

## 4.3.0 Display Requirements

- The list of administrators must clearly display Full Name, Email, Role, and Status.
- Status should be visually distinct (e.g., using colored badges like 'Active' in green and 'Inactive' in red).

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- All buttons and interactive elements must be keyboard-navigable and have clear focus states.
- The data table must be accessible to screen readers.
- Complies with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A Super Admin cannot deactivate their own account.

### 5.1.3 Enforcement Point

User Interface and API level.

### 5.1.4 Violation Handling

The UI control will be disabled. The API will return a 403 Forbidden error if a request is attempted.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

An administrator's email address must be unique across the entire platform user base.

### 5.2.3 Enforcement Point

During the creation of a new administrator account.

### 5.2.4 Violation Handling

The system will reject the creation request and return a user-friendly error message.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

All management actions (create, edit, deactivate, reactivate) on administrator accounts must be recorded in the audit log.

### 5.3.3 Enforcement Point

Backend service logic for each respective action.

### 5.3.4 Violation Handling

The transaction should fail if the audit log entry cannot be written, ensuring accountability.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-124

#### 6.1.1.2 Dependency Reason

The immutable audit log system must be in place to record all actions performed in this story.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

SYS-RBAC-001

#### 6.1.2.2 Dependency Reason

A foundational Role-Based Access Control (RBAC) framework defining the 'Super Admin' role and its permissions must exist.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C for identity management and user provisioning.
- Azure Communication Services for sending invitation emails.
- Backend audit logging service.

## 6.3.0.0 Data Dependencies

- A predefined list of available administrator roles (e.g., 'Super Admin', 'Platform Support') must be available.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The administrator list page should load in under 2 seconds.
- API response time for all CRUD operations should be under 300ms (P95).

## 7.2.0.0 Security

- Access to this functionality must be strictly limited to users with the 'Super Admin' role.
- API endpoints must be protected against unauthorized access, re-validating permissions on every request.
- Deactivating a user must immediately invalidate their authentication tokens/sessions.
- All data transmitted between the client and server must be encrypted via TLS 1.2+.

## 7.3.0.0 Usability

- The interface for managing admins should be intuitive, requiring minimal training.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The Super Admin portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration with Azure AD B2C for user provisioning and status management requires using the Microsoft Graph API.
- Implementing immediate session invalidation for deactivated users can be complex and may require a token revocation list or similar mechanism.
- Ensuring the atomicity of creating a user in the local database, provisioning in Azure AD B2C, and writing to the audit log.

## 8.3.0.0 Technical Risks

- Potential latency or errors when communicating with the external Azure AD B2C service.
- Permissions and configuration for the service principal to interact with Azure AD B2C must be correctly set up.

## 8.4.0.0 Integration Points

- Azure AD B2C (Identity Provider)
- Internal Audit Log Service
- Internal Notification Service (using Azure Communication Services)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify a Super Admin can perform the full lifecycle (Create, View, Edit, Deactivate, Reactivate) of another admin account.
- Verify a deactivated admin is immediately locked out of the system.
- Verify an attempt to create an admin with a duplicate email fails gracefully.
- Verify a Super Admin cannot deactivate their own account.
- Verify a non-Super Admin user receives a 403 Forbidden error when attempting to access the admin management API endpoints.

## 9.3.0.0 Test Data Needs

- At least two Super Admin accounts (one to perform actions, one to be acted upon, except for self-deactivation).
- Data for creating new admins with unique emails.
- An existing admin account to test deactivation and reactivation.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.
- Postman or similar for API-level security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other engineer
- Unit and integration tests implemented with at least 80% code coverage for new logic
- E2E tests for the primary user flows are created and passing
- User interface reviewed and approved by the design/product team
- Security requirements validated, including role-based access control checks
- All actions are confirmed to be writing to the audit log correctly
- Documentation for the new API endpoints is created/updated
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational security feature required early in the project.
- Developer will require appropriate permissions in the Azure AD B2C tenant for implementation and testing.
- Coordination with the DevOps team may be needed to configure service principals and permissions.

## 11.4.0.0 Release Impact

- Enables the onboarding of the initial administrative team for the platform.

