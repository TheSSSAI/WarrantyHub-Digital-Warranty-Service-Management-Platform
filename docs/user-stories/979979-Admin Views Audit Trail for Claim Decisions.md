# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-103 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Admin Views Audit Trail for Claim Decisions |
| As A User Story | As a Brand Admin, I want to view a detailed audit ... |
| User Persona | Brand Admin, Super Admin, Service Center Admin (wi... |
| Business Value | Provides a non-repudiable record of claim decision... |
| Functional Area | Service Request Management & Auditing |
| Story Theme | Platform Governance and Auditing |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Audit log entry is created upon claim approval

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A Brand Admin is viewing a pending warranty claim for service request 'SR-12345'.

### 3.1.5 When

The admin approves the warranty claim.

### 3.1.6 Then

A new, immutable entry is created in the audit log associated with 'SR-12345'.

### 3.1.7 And

The audit log entry must record the Admin's full name, their role (e.g., 'Brand Admin'), the action ('Claim Approved'), and the precise UTC timestamp of the action.

### 3.1.8 Validation Notes

Verify in the database that a new record exists in the 'ClaimDecisionAuditLog' table with the correct foreign keys and data. The action and the claim status update must be part of the same database transaction.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Audit log entry is created upon claim rejection with a reason

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Service Center Admin is viewing a pending warranty claim for service request 'SR-54321'.

### 3.2.5 When

The admin rejects the warranty claim and provides 'User-induced damage' as the reason.

### 3.2.6 Then

A new, immutable entry is created in the audit log associated with 'SR-54321'.

### 3.2.7 And

The audit log entry must record the Admin's full name, their role ('Service Center Admin'), the action ('Claim Rejected'), the reason ('User-induced damage'), and the precise UTC timestamp.

### 3.2.8 Validation Notes

Verify the database record includes the rejection reason text or a foreign key to the predefined reason.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Authorized admin can view the audit trail for a service request

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A service request has at least one claim decision in its history.

### 3.3.5 When

An authorized admin (Brand Admin or Super Admin) views the service request's detail or history page.

### 3.3.6 Then

An 'Audit Trail' or 'Decision History' section is visible.

### 3.3.7 And

Each entry clearly displays the timestamp, admin name, role, action, and reason (if applicable).

### 3.3.8 Validation Notes

Test this by logging in as a Brand Admin and a Super Admin. The API response for the service request details should contain the audit trail data.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Unauthorized users cannot view the admin audit trail

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A service request has a claim decision audit trail.

### 3.4.5 When

A user with a 'User' or 'Technician' role attempts to view the service request details via the API or UI.

### 3.4.6 Then

The audit trail data, specifically the deciding admin's name and role, is not included in the API response and is not visible in the UI.

### 3.4.7 Validation Notes

Perform security testing by making direct API calls with JWTs from different user roles and assert that the audit trail data is absent for unauthorized roles.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Audit log entries are immutable

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

An audit log entry for a claim decision exists in the database.

### 3.5.5 When

Any user, including a Super Admin, attempts to modify or delete the log entry via an API endpoint or any other method.

### 3.5.6 Then

The system must prevent the operation.

### 3.5.7 And

The original audit log entry remains unchanged.

### 3.5.8 Validation Notes

This should be enforced at the database level (e.g., revoking UPDATE/DELETE permissions for the application's DB user on the audit table) and verified via penetration testing.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Audit log correctly records details for a deactivated admin account

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

An admin named 'Jane Doe' approved a claim.

### 3.6.5 And

Jane Doe's admin account is later deactivated.

### 3.6.6 When

Another admin views the audit trail for that claim.

### 3.6.7 Then

The log entry still correctly displays 'Jane Doe' (or a persistent identifier) as the person who made the decision, possibly with an indicator that the account is no longer active.

### 3.6.8 Validation Notes

The admin's name should be denormalized and stored directly in the audit log record at the time of creation to prevent data loss if the original admin user is deleted.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated section or tab labeled 'Decision History' or 'Audit Trail' within the admin view of a service request.
- A list/timeline view to display multiple audit entries.

## 4.2.0 User Interactions

- The audit trail is a read-only display. No user interaction (clicking, editing) is possible on the entries themselves.

## 4.3.0 Display Requirements

- Entries must be displayed in reverse chronological order.
- Each entry must clearly show: Timestamp (localized to the admin's timezone), Admin Name, Admin Role, Action (Approved/Rejected), and Reason for rejection.

## 4.4.0 Accessibility Needs

- The audit trail must be readable by screen readers, with proper labels for each piece of information in an entry.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-AUD-001

### 5.1.2 Rule Description

Every manual change to a warranty claim's status (Approved/Rejected) must generate an audit log entry.

### 5.1.3 Enforcement Point

Application service layer, during the execution of the approve/reject claim function.

### 5.1.4 Violation Handling

The entire operation (status change and audit log creation) must be executed within a single database transaction. If the audit log fails to write, the status change must be rolled back, and an error returned.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-AUD-002

### 5.2.2 Rule Description

Audit log entries are immutable and cannot be altered or deleted after creation.

### 5.2.3 Enforcement Point

Database permissions and application logic.

### 5.2.4 Violation Handling

Any attempt to modify an entry will be blocked and logged as a security event.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-059

#### 6.1.1.2 Dependency Reason

This story implements the 'Approve Claim' action, which is the trigger for creating an audit log entry.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-060

#### 6.1.2.2 Dependency Reason

This story implements the 'Reject Claim' action, another trigger for creating an audit log entry.

## 6.2.0.0 Technical Dependencies

- A centralized authentication service (Azure AD B2C) to reliably identify the acting admin user.
- A robust Role-Based Access Control (RBAC) mechanism to enforce viewing permissions.
- A dedicated, append-only database table for storing audit logs.

## 6.3.0.0 Data Dependencies

- Requires access to the Service Request data model.
- Requires access to the Admin User data model to retrieve the name and role of the acting user.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Loading the audit trail for a service request with up to 20 entries must not add more than 50ms to the overall API response time.

## 7.2.0.0 Security

- Access to view the audit trail must be strictly controlled by RBAC. Only Super Admins, Brand Admins (for their brand), and Service Center Admins (for their center) are permitted.
- The system must prevent any modification or deletion of audit records, even by database administrators, through technical controls (e.g., database permissions).

## 7.3.0.0 Usability

- The audit trail should be presented in a clear, human-readable format.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The display must render correctly on all supported admin portal browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires creation of a new, secure database table with an append-only access pattern.
- Implementing the transactional logic to ensure the claim status update and audit log creation are atomic is critical.
- Denormalizing admin user data (name, role) into the audit log to preserve history even if the user is deleted.
- Backend API changes to embed this data in the service request response based on the requester's role.

## 8.3.0.0 Technical Risks

- Failure to implement the database transaction correctly could lead to data inconsistency (a claim status changes without a corresponding audit log).
- Improper RBAC implementation could lead to sensitive data exposure.

## 8.4.0.0 Integration Points

- The `approveClaim` and `rejectClaim` methods in the backend service.
- The API endpoint that serves service request details to the admin frontends.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify audit log creation for both approval and rejection.
- Verify all required data points are present and accurate in the log.
- Test RBAC by attempting to view the log with every user role (Super Admin, Brand Admin, Service Center Admin, Technician, User).
- Test the immutability by attempting to call a non-existent UPDATE/DELETE API endpoint for audit logs.
- Verify the audit trail still displays correctly after the deciding admin's account has been deactivated.

## 9.3.0.0 Test Data Needs

- Test accounts for each user role.
- Service requests in a 'Pending Claim' state.
- A deactivated admin account that has previously made a claim decision.

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- Cypress for E2E tests.
- Postman or a similar tool for API-level security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage for the new logic
- Integration testing completed successfully, verifying transactional integrity
- User interface on admin portals reviewed and approved
- Security requirements validated, including RBAC and immutability tests
- Documentation for the audit log feature is created
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-059 and US-060 and must be scheduled in a subsequent sprint.
- Requires both backend (database, API, service logic) and frontend (UI component) development effort.

## 11.4.0.0 Release Impact

This is a critical feature for platform trust and accountability. It is required for any release involving brand or service center partners.

