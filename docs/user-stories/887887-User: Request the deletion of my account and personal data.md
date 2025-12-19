# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-057 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Request the deletion of my account and perso... |
| As A User Story | As a registered user, I want to permanently delete... |
| User Persona | Any registered 'User' (Consumer) of the web or mob... |
| Business Value | Ensures compliance with data privacy regulations (... |
| Functional Area | Account Management & Security |
| Story Theme | User Data Privacy & Compliance |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successful account deletion request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A registered user is logged in and on their 'Account Settings' page

### 3.1.5 When

The user clicks the 'Delete Account' button, reads the confirmation warning, re-authenticates successfully (e.g., enters their password), and confirms the deletion

### 3.1.6 Then

The system immediately logs the user out of their current session, their account status is changed to 'Pending Deletion', an asynchronous process to purge their data is initiated, and a confirmation email is sent to their registered address stating the request has been received and will be processed.

### 3.1.7 Validation Notes

Verify the user is logged out. Check the database for the user's status change. Confirm the deletion event is published to the message bus. Check email service logs for the confirmation email.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: Attempting to delete account with active service requests

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A registered user is logged in and has at least one service request with a status other than 'Resolved/Closed' or 'Cancelled'

### 3.2.5 When

The user attempts to initiate the account deletion process

### 3.2.6 Then

The system prevents the deletion and displays a clear error message informing the user they must resolve or cancel all active service requests before deleting their account.

### 3.2.7 Validation Notes

Create a test user with an open service request. E2E test must confirm the error message is displayed and the deletion confirmation step is not shown.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: Failed re-authentication during deletion confirmation

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A user has initiated the account deletion process and is at the re-authentication step

### 3.3.5 When

The user enters an incorrect password or fails the MFA challenge

### 3.3.6 Then

The system displays an 'Invalid credentials' error message, the deletion process is halted, and the user remains on the confirmation screen.

### 3.3.7 Validation Notes

E2E test must simulate entering the wrong password and verify the error message appears and the account is not deleted.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Alternative Flow: User cancels the deletion process

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

A user has initiated the account deletion process and is on the confirmation screen

### 3.4.5 When

The user clicks the 'Cancel' button or closes the modal

### 3.4.6 Then

The deletion process is aborted, and the user is returned to their 'Account Settings' page with no changes made to their account.

### 3.4.7 Validation Notes

E2E test to click 'Cancel' and verify the user is returned to the previous screen and their account remains active.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Backend: Successful data purging and anonymization

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

An account deletion request has been successfully initiated and the asynchronous worker has picked up the job

### 3.5.5 When

The worker process executes the data deletion/anonymization logic

### 3.5.6 Then

All PII associated with the user (name, email, address, phone number) is hard-deleted from the primary database, all user-uploaded files (invoices, photos) are deleted from Azure Blob Storage, and any remaining records (e.g., service history for analytics) are fully anonymized by nullifying or replacing the user foreign key.

### 3.5.7 Validation Notes

Requires backend data verification. After the job runs, query all relevant tables and storage containers to confirm no trace of the user's PII remains. Anonymized records must not be linkable back to the original user.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Edge Case: Attempting to delete account with a pending product transfer

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A registered user has initiated a product ownership transfer that has not yet been accepted or rejected

### 3.6.5 When

The user attempts to initiate the account deletion process

### 3.6.6 Then

The system prevents the deletion and displays a clear error message informing the user they must wait for the pending product transfer to be resolved.

### 3.6.7 Validation Notes

Create a test scenario where User A transfers a product to User B. Have User A attempt to delete their account before User B responds. Verify the deletion is blocked.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly labeled 'Delete Account' button or link within the 'Account Settings' or 'Security' section.
- A confirmation modal or full-screen view that appears after clicking the button.
- A password input field or MFA prompt for re-authentication within the confirmation view.
- A final 'Permanently Delete My Account' confirmation button, which is disabled until re-authentication is successful.

## 4.2.0 User Interactions

- User clicks 'Delete Account' to trigger the confirmation flow.
- User must re-enter their password to confirm their identity.
- User must click a final confirmation button to submit the request.

## 4.3.0 Display Requirements

- The confirmation view must explicitly state that the action is permanent and irreversible.
- It should summarize the data that will be deleted (e.g., 'Your profile, all registered products, invoices, and service history will be permanently removed.').

## 4.4.0 Accessibility Needs

- All buttons, links, and form fields must be keyboard accessible and have proper ARIA labels.
- The confirmation modal must trap focus correctly.
- Warning text must be conveyed to screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user account cannot be deleted if it has any associated service requests that are not in a terminal state ('Resolved/Closed', 'Cancelled').

### 5.1.3 Enforcement Point

API level, before initiating the deletion process.

### 5.1.4 Violation Handling

The API request is rejected with a 409 Conflict status code and a descriptive error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A user account cannot be deleted if it has a pending product ownership transfer (either as sender or recipient).

### 5.2.3 Enforcement Point

API level, before initiating the deletion process.

### 5.2.4 Violation Handling

The API request is rejected with a 409 Conflict status code and a descriptive error message.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

The account deletion request must be logged in the audit trail before any data is purged.

### 5.3.3 Enforcement Point

Backend, at the start of the deletion workflow.

### 5.3.4 Violation Handling

If the audit log fails, the deletion process is aborted and retried.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-018

#### 6.1.1.2 Dependency Reason

Requires the existing authentication mechanism for the re-authentication step.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-114

#### 6.1.2.2 Dependency Reason

Requires the audit trail system to be in place to log the deletion request.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C for re-authentication.
- Azure Service Bus for queuing the asynchronous deletion job.
- A clear data map of all PII locations across all microservices (PostgreSQL, Blob Storage, OpenSearch, Redis).

## 6.3.0.0 Data Dependencies

- Access to the Service Request database to check for active requests.
- Access to the Product database to check for pending transfers.

## 6.4.0.0 External Dependencies

- Azure Communication Services to send the final confirmation email.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The user-facing API call to request deletion must respond in under 500ms.
- The asynchronous backend process can take up to 24 hours to complete, but this SLA must be documented.

## 7.2.0.0 Security

- Re-authentication (password and/or MFA) is mandatory to prevent account deletion via a compromised session.
- The deletion process must be idempotent; running it multiple times for the same user should not cause errors.
- The process must be comprehensive, ensuring no orphaned PII is left in any data store.

## 7.3.0.0 Usability

- The process must have sufficient friction (e.g., confirmation modal, re-authentication) to prevent accidental deletion.
- All user-facing text must be clear and unambiguous about the consequences.

## 7.4.0.0 Accessibility

- The entire flow must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must be functional on all supported web browsers and mobile OS versions as defined in the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

High

## 8.2.0.0 Complexity Factors

- Requires a distributed transaction or Saga pattern to coordinate data deletion across multiple microservices.
- Defining the precise anonymization strategy for analytical data requires careful design to avoid breaking referential integrity.
- The process must be robust and fault-tolerant, with retry mechanisms and alerting for failures.
- Thorough data verification is complex and time-consuming.

## 8.3.0.0 Technical Risks

- Incomplete deletion, leaving orphaned PII in one of the data stores.
- Failure in the middle of the saga, leaving the system in an inconsistent state.
- Accidental deletion of non-user data due to a bug in the anonymization logic.

## 8.4.0.0 Integration Points

- User Service (to mark user for deletion)
- Product Service (to anonymize product ownership)
- Service Request Service (to anonymize service history)
- Notification Service (to send email)
- Azure Blob Storage (to delete files)
- OpenSearch (to remove user from search index)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Data_Verification

## 9.2.0.0 Test Scenarios

- Full E2E deletion for a clean user.
- Attempted deletion for a user with an open service ticket.
- Attempted deletion with incorrect password.
- Backend verification script to confirm all PII has been purged/anonymized from all data stores (PostgreSQL, Blob Storage, OpenSearch, Redis caches).

## 9.3.0.0 Test Data Needs

- Test accounts with varying states: no activity, with products, with open service requests, with closed service requests, with pending product transfers.

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E tests.
- Custom SQL and Azure CLI scripts for data verification.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least two senior developers
- Unit and integration tests implemented with >85% coverage for new code
- E2E tests for the deletion flow are passing in the CI/CD pipeline
- A technical runbook for handling failed deletion jobs is created
- Data verification has been manually performed and signed off by QA in the staging environment
- Security review of the re-authentication and deletion logic is complete
- All UI elements meet WCAG 2.1 AA standards
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

13

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- A technical design spike is recommended before implementation to finalize the cross-service data deletion strategy (Saga pattern).
- This story may need to be broken down into smaller technical tasks for frontend, API, and backend workers, but should be delivered as a single functional unit.

## 11.4.0.0 Release Impact

This is a critical feature for legal compliance and should be included in the next major release. Its absence poses a legal and reputational risk.

