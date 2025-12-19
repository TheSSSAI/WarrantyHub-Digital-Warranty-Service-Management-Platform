# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-071 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Deactivate a technician's pr... |
| As A User Story | As a Service Center Admin, I want to deactivate th... |
| User Persona | Service Center Admin |
| Business Value | Enhances security by revoking access for former em... |
| Functional Area | Service Center Management |
| Story Theme | Technician Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Deactivate a technician with no open jobs

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am logged in as a Service Center Admin and am on the 'Manage Technicians' page

### 3.1.5 When

I locate an 'Active' technician who has no open service requests and click the 'Deactivate' action, and I confirm the action in the confirmation dialog

### 3.1.6 Then

The system updates the technician's status to 'Inactive' in the database, the technician's status is visually updated in the technician list, the technician can no longer log into the mobile application, and the technician no longer appears in the dropdown list for new job assignments.

### 3.1.7 Validation Notes

Verify the status change in the UI and database. Attempt to log in as the deactivated technician to confirm access is denied. Check the assignment UI to confirm the technician is not listed.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Edge Case: Attempt to deactivate a technician with open jobs

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

I am logged in as a Service Center Admin and am on the 'Manage Technicians' page

### 3.2.5 When

I attempt to deactivate a technician who has one or more service requests with a status other than 'Resolved' or 'Closed' assigned to them

### 3.2.6 Then

The system must prevent the deactivation, a user-friendly error message is displayed stating 'This technician cannot be deactivated as they have [X] open jobs. Please re-assign all open jobs before deactivating.', and the technician's status remains 'Active'.

### 3.2.7 Validation Notes

Set up a test technician with at least one open job. Attempt deactivation and verify the specific error message appears and the database status is unchanged.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User cancels the deactivation action

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am logged in as a Service Center Admin and have clicked the 'Deactivate' action for a technician

### 3.3.5 When

The confirmation dialog appears and I click the 'Cancel' button

### 3.3.6 Then

The dialog closes, no change is made to the technician's status, and the technician remains 'Active'.

### 3.3.7 Validation Notes

Click 'Deactivate', then 'Cancel' in the modal. Refresh the page and verify the technician's status is still 'Active'.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Security: Deactivation revokes active sessions

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A technician is currently logged into the mobile app with a valid session

### 3.4.5 When

A Service Center Admin deactivates that technician's profile

### 3.4.6 Then

The technician's current authentication token (JWT) is immediately invalidated, and their next API request from the mobile app results in a 401 Unauthorized error, forcing them to be logged out.

### 3.4.7 Validation Notes

Log in as a technician on a mobile device. Deactivate the technician via the admin panel. Attempt an action (e.g., view jobs) on the mobile app and verify it fails with a 401 error.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Auditability: Deactivation is logged

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am logged in as a Service Center Admin

### 3.5.5 When

I successfully deactivate a technician's profile

### 3.5.6 Then

An entry is created in the system audit trail containing the Admin's user ID, the ID of the deactivated technician, the action performed ('Technician Deactivated'), and a timestamp.

### 3.5.7 Validation Notes

After deactivating a technician, query the audit log table/service to confirm the correct entry was created.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Deactivate' button/icon for each active technician in the roster list.
- A confirmation modal with 'Confirm' and 'Cancel' buttons.
- A status indicator (e.g., badge) next to each technician showing 'Active' or 'Inactive'.
- A non-intrusive notification (toast) confirming successful deactivation.
- An alert/modal for displaying the error message when deactivation is blocked.

## 4.2.0 User Interactions

- Admin clicks 'Deactivate' -> Modal appears.
- Admin clicks 'Confirm' in modal -> Technician is deactivated, UI updates.
- Admin clicks 'Cancel' in modal -> Modal closes, no change.
- Admin can filter the technician list by status (Active, Inactive, All).

## 4.3.0 Display Requirements

- The technician list must clearly differentiate between active and inactive technicians.
- The error message for a blocked deactivation must be clear, specific, and actionable.

## 4.4.0 Accessibility Needs

- The 'Deactivate' action and confirmation modal must be fully keyboard accessible.
- All buttons and statuses must have appropriate ARIA labels for screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A technician with any open (not 'Resolved' or 'Closed') service requests cannot be deactivated.

### 5.1.3 Enforcement Point

API level, before processing the deactivation request.

### 5.1.4 Violation Handling

The API request is rejected with a 409 Conflict status code and a clear error message detailing the reason and the number of open jobs.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Deactivation is a logical 'soft delete' (status change), not a physical record deletion, to preserve historical data integrity for past service requests.

### 5.2.3 Enforcement Point

Backend service logic.

### 5.2.4 Violation Handling

The database record for the technician is updated (e.g., `status = 'inactive'`), not deleted.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-069

#### 6.1.1.2 Dependency Reason

The ability to add a technician must exist before one can be deactivated.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-065

#### 6.1.2.2 Dependency Reason

The system for assigning service requests to technicians must be in place to check for open jobs.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-066

#### 6.1.3.2 Dependency Reason

The ability to re-assign a service request is required to provide a resolution path when deactivation is blocked by open jobs.

## 6.2.0.0 Technical Dependencies

- Authentication Service (Azure AD B2C) API for revoking user sessions/refresh tokens.
- Audit Logging Service for recording the deactivation event.

## 6.3.0.0 Data Dependencies

- Requires a `technicians` table with a status field (e.g., 'active', 'inactive').
- Requires access to the `service_requests` table to check for assignments.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to deactivate a technician, including the check for open jobs, must complete within 500ms (P95).

## 7.2.0.0 Security

- The endpoint must be protected and only accessible by users with the 'Service Center Admin' role.
- Deactivation must trigger immediate invalidation of the technician's authentication tokens and sessions.
- The action must be logged in an immutable audit trail as per SRS 5.9.

## 7.3.0.0 Usability

- The process should be intuitive, with clear confirmation and error feedback to prevent accidental deactivations.

## 7.4.0.0 Accessibility

- All UI components must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported web browsers for the admin panel (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration with Azure AD B2C to programmatically revoke user access is a key complexity.
- Ensuring the immediate invalidation of existing JWTs requires a robust session management or token revocation strategy.
- The database query to check for open jobs must be efficient to meet performance requirements.

## 8.3.0.0 Technical Risks

- Potential difficulty in reliably invalidating active sessions in a distributed system. A token revocation list or similar mechanism might be needed.
- Failure to correctly handle the 'open jobs' check could lead to orphaned service requests.

## 8.4.0.0 Integration Points

- User Management Service (for changing status).
- Authentication Service (for revoking access).
- Service Request Service (for checking open jobs).
- Audit Service (for logging).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Successfully deactivate a technician with no jobs.
- Fail to deactivate a technician with one or more open jobs.
- Cancel the deactivation from the confirmation modal.
- Verify a deactivated technician cannot log in.
- Verify an already-logged-in technician is forced out after deactivation.
- Verify the audit log is correctly written upon deactivation.

## 9.3.0.0 Test Data Needs

- A Service Center Admin user account.
- At least two technician accounts: one with no assigned jobs, one with 1+ open jobs.
- Active service requests assigned to the second technician.

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E tests.
- Postman or similar for direct API security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new logic
- Integration testing completed successfully, including the check for open jobs and the call to the auth service
- E2E test scenario for deactivation (including the blocked case) is automated and passing
- Security requirement for session invalidation is manually tested and verified
- User interface reviewed and approved by UX/Product Owner
- Audit log creation is verified
- Documentation for the deactivation API endpoint is updated in OpenAPI spec
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked until US-065, US-066, and US-069 are completed and deployed.
- Requires coordination with security/platform team if the Azure AD B2C integration pattern is new.

## 11.4.0.0 Release Impact

Critical for enabling proper user lifecycle management for service centers. A key feature for operational readiness.

