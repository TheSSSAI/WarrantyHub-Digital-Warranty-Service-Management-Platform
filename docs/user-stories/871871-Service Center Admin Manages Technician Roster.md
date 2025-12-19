# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-049 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Manages Technician Roster |
| As A User Story | As a Service Center Admin, I want to be able to ad... |
| User Persona | Service Center Admin: A user responsible for the d... |
| Business Value | Enables efficient and secure service request assig... |
| Functional Area | Service Center Management |
| Story Theme | Technician & Job Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

View Technician Roster

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am logged in as a Service Center Admin and have navigated to the 'Technician Management' section

### 3.1.5 When

the roster page loads

### 3.1.6 Then

I see a table displaying all technicians associated with my service center, showing their Full Name, Email, Phone Number, and Status ('Active' or 'Inactive').

### 3.1.7 Validation Notes

Verify that the API returns only technicians for the logged-in admin's service center. The table should be sortable by name and status.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Add a New Technician Successfully

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the technician roster page

### 3.2.5 When

I click 'Add Technician', fill in a unique email and other required fields (First Name, Last Name, Phone Number) with valid data, and submit the form

### 3.2.6 Then

the new technician is added to the roster with an 'Active' status and appears in the list.

### 3.2.7 Validation Notes

Verify a new user account is created in Azure AD B2C. An invitation email with password setup instructions must be sent to the technician's email address. A success toast/message should be displayed.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to Add a Technician with a Duplicate Email

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the 'Add Technician' form

### 3.3.5 When

I enter an email address that already exists in the system and submit the form

### 3.3.6 Then

the system rejects the submission and displays a clear inline error message, such as 'This email address is already in use.'

### 3.3.7 Validation Notes

The check for email uniqueness must be case-insensitive and system-wide, not just within the same service center.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edit an Existing Technician's Details

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am on the technician roster page

### 3.4.5 When

I select 'Edit' for a technician, change their phone number, and save the changes

### 3.4.6 Then

the technician's record is updated with the new phone number, and I see a success confirmation message.

### 3.4.7 Validation Notes

Verify that the email address field is read-only and cannot be edited, as it is the primary user identifier.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Deactivate an Active Technician

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

there is an active technician with no open service requests assigned to them

### 3.5.5 When

I select 'Deactivate' for that technician and confirm the action in the confirmation prompt

### 3.5.6 Then

the technician's status changes to 'Inactive' in the roster.

### 3.5.7 Validation Notes

Verify the technician can no longer log into the mobile app. Verify they no longer appear in the dropdown list for assigning new jobs. Their historical job records must be preserved.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to Deactivate a Technician with Open Jobs

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a technician has one or more service requests assigned to them that are not in a 'Resolved' or 'Closed' state

### 3.6.5 When

I attempt to deactivate that technician

### 3.6.6 Then

the system prevents the deactivation and displays a descriptive error message, such as 'Cannot deactivate. Technician has X open jobs. Please re-assign them first.'

### 3.6.7 Validation Notes

The error message should be specific and guide the admin on the necessary next steps.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Reactivate an Inactive Technician

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

I am viewing the list of inactive technicians

### 3.7.5 When

I select 'Activate' for an inactive technician and confirm the action

### 3.7.6 Then

the technician's status changes to 'Active' and they are able to log in and be assigned new jobs again.

### 3.7.7 Validation Notes

Verify the technician's access is restored in Azure AD B2C and they reappear in assignment lists.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A table/list view for the technician roster with columns for Name, Email, Phone, Status.
- Search input field for filtering the roster by name.
- Filter dropdown/tabs for 'Active' and 'Inactive' technicians.
- 'Add Technician' button.
- A modal or dedicated page with a form for adding/editing a technician.
- Action buttons/menu (Edit, Deactivate/Activate) for each technician row.
- Confirmation dialogs for deactivation and activation actions.
- Success and error notification toasts/banners.

## 4.2.0 User Interactions

- Admin can search the roster in real-time as they type.
- Admin can sort the roster table by clicking on column headers.
- The add/edit form must provide real-time validation for required fields and email format.

## 4.3.0 Display Requirements

- The roster must clearly distinguish between 'Active' and 'Inactive' technicians, possibly using color-coded badges.
- The total count of active and inactive technicians should be displayed.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- All buttons and interactive elements must be keyboard-navigable and have clear focus states.
- The roster table must be accessible to screen readers.
- Complies with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A technician's email address must be unique across the entire platform.

### 5.1.3 Enforcement Point

Backend API during the creation of a new technician profile.

### 5.1.4 Violation Handling

The API will return a 409 Conflict error with a descriptive message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A technician cannot be deactivated if they have any service requests assigned to them that are not in a 'Resolved' or 'Closed' status.

### 5.2.3 Enforcement Point

Backend API when a deactivation request is received.

### 5.2.4 Violation Handling

The API will return a 400 Bad Request error with a message indicating the number of open jobs.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

A deactivated technician cannot be assigned to new service requests.

### 5.3.3 Enforcement Point

Backend API for service request assignment.

### 5.3.4 Violation Handling

The deactivated technician will not be included in the list of available technicians returned by the API.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-005

#### 6.1.1.2 Dependency Reason

A Service Center must be approved and exist in the system before an admin can be associated with it and manage its technicians.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-096

#### 6.1.2.2 Dependency Reason

The authentication and authorization framework must be in place for a Service Center Admin to log in and access their panel.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C for creating and managing technician user accounts.
- Role-Based Access Control (RBAC) module to enforce that only Service Center Admins can access this functionality.
- Azure Communication Services for sending invitation emails.

## 6.3.0.0 Data Dependencies

- Requires access to the Service Center's own data scope.
- Requires read access to the service request table to check for a technician's open jobs.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The technician roster page should load in under 2 seconds with up to 500 technicians.
- API response time for fetching the roster must be under 250ms (P95).

## 7.2.0.0 Security

- All API endpoints for technician management must be protected and require authentication.
- A Service Center Admin must only be able to view and manage technicians belonging to their own service center (Data Tenancy).
- Deactivating a technician must immediately invalidate their authentication token/session.

## 7.3.0.0 Usability

- The process of adding a new technician should be quick and intuitive, requiring minimal clicks.
- Error messages must be clear, user-friendly, and guide the user toward a solution.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration with the external identity provider (Azure AD B2C) for user creation and status management.
- The business logic for preventing deactivation of technicians with open jobs requires careful implementation and testing.
- Ensuring strict data tenancy so one service center cannot see another's data.

## 8.3.0.0 Technical Risks

- Potential latency or errors in the API calls to Azure AD B2C could affect user creation.
- Race conditions if a job is assigned to a technician at the exact moment an admin is trying to deactivate them.

## 8.4.0.0 Integration Points

- User Management Service (for creating/updating user profiles).
- Identity Provider (Azure AD B2C).
- Service Request Service (for checking open jobs).
- Notification Service (for sending invitation emails).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Full CRUD lifecycle of a technician: Add, Edit, Deactivate, Reactivate.
- Verify error handling for duplicate emails and invalid form data.
- Verify the business rule preventing deactivation of a technician with open jobs.
- Security test: Log in as Admin for Center A and attempt to access/modify technicians for Center B via API manipulation.
- Verify the invitation email is correctly formatted and sent.

## 9.3.0.0 Test Data Needs

- At least two separate service centers with their own admins.
- Technicians with no assigned jobs.
- Technicians with one or more open jobs.
- A list of emails to test the uniqueness constraint.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Cypress for E2E tests.
- Postman or similar for API-level security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >= 80% coverage for new logic
- Automated E2E tests for the primary user flows are passing in the CI/CD pipeline
- User interface reviewed and approved by the UX/UI designer
- Security requirements, especially data tenancy, have been tested and verified
- Documentation for the new API endpoints is generated and accurate
- Story deployed and verified in the staging environment by a QA engineer

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a blocker for US-048 (Assign Request) and US-101 (View Availability). It should be prioritized early in the project.
- Requires coordination with the team managing the Azure AD B2C configuration.

## 11.4.0.0 Release Impact

- This is a core feature for the Service Center Portal. The portal cannot be considered functional for pilot release without this capability.

