# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-045 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Disputes a Resolved Service Ticket |
| As A User Story | As a consumer whose service request has been marke... |
| User Persona | The end-user (Consumer) who owns the product and r... |
| Business Value | Provides a critical customer satisfaction and qual... |
| Functional Area | Service Request Management |
| Story Theme | Customer Service & Escalation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User successfully disputes a ticket within the 7-day window

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged in and viewing a service ticket that was marked 'Resolved' 3 days ago

### 3.1.5 When

the user clicks the 'Dispute Resolution' button, enters a mandatory reason for the dispute, and confirms the submission

### 3.1.6 Then

the system must update the service ticket's status to 'Disputed' in the database, and this change must be reflected immediately in the UI

### 3.1.7 And

the 'Dispute Resolution' button for this ticket must be hidden or disabled permanently.

### 3.1.8 Validation Notes

Verify the status change in the database and UI. Check the notification queue (Azure Service Bus) for a new message destined for the Brand Admin. Confirm the UI confirmation message appears.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Edge Case: Dispute option is unavailable after the 7-day window expires

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

a user is logged in and viewing a service ticket that was marked 'Resolved' 8 or more days ago

### 3.2.5 When

the user views the ticket details screen

### 3.2.6 Then

the 'Dispute Resolution' button must not be visible or must be disabled

### 3.2.7 And

if disabled, hovering over the button should show a tooltip stating 'The 7-day dispute period has ended'.

### 3.2.8 Validation Notes

Manually set the 'resolved_at' timestamp on a test ticket to be more than 7 days in the past and verify the button's state in the UI.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: Dispute option is not available for non-resolved tickets

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

a user is logged in and viewing a service ticket with a status of 'Requested', 'Acknowledged', 'Technician Assigned', 'Work In Progress', or 'Closed'

### 3.3.5 When

the user views the ticket details screen

### 3.3.6 Then

the 'Dispute Resolution' button must not be visible.

### 3.3.7 Validation Notes

Check tickets in various non-resolved states to ensure the button does not appear.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: User attempts to submit a dispute without providing a reason

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a user has clicked the 'Dispute Resolution' button and is viewing the dispute submission form

### 3.4.5 When

the user clicks the 'Submit Dispute' button without entering any text in the reason field

### 3.4.6 Then

the system must prevent the submission

### 3.4.7 And

an inline validation error message such as 'A reason for the dispute is required' must be displayed next to the reason field.

### 3.4.8 Validation Notes

Verify that the API returns a 400-level error and the UI displays the specified error message without a page reload.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Auditability: Disputing a ticket is recorded in the audit trail

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a user is about to successfully submit a dispute for a service ticket

### 3.5.5 When

the dispute is submitted

### 3.5.6 Then

an entry must be created in the system's audit log

### 3.5.7 And

the audit log entry must contain the user ID, service ticket ID, the new 'Disputed' status, the reason provided by the user, and a timestamp.

### 3.5.8 Validation Notes

Query the audit log database table to confirm the creation and correctness of the new record.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Dispute Resolution' button on the service ticket details screen.
- A modal dialog or a dedicated screen for submitting the dispute.
- A mandatory multi-line text area for the dispute reason.
- 'Submit Dispute' and 'Cancel' buttons within the modal/screen.
- A success toast/notification component.
- A disabled button state with a tooltip for expired disputes.

## 4.2.0 User Interactions

- The 'Dispute Resolution' button is conditionally rendered based on ticket status ('Resolved') and the time elapsed since resolution (<= 7 days).
- Clicking the button opens the dispute submission modal.
- The system performs client-side and server-side validation on the reason field to ensure it's not empty.
- After successful submission, the modal closes, a success message is shown, and the ticket status in the UI updates to 'Disputed'.

## 4.3.0 Display Requirements

- The ticket status must clearly display as 'Disputed' in both the list and detail views after submission.
- The reason provided by the user must be visible to the Brand Admin when they review the disputed ticket.

## 4.4.0 Accessibility Needs

- The dispute modal must be keyboard navigable.
- All buttons and form fields must have appropriate ARIA labels.
- Error messages must be programmatically associated with their respective form fields.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user can only dispute a service ticket within 7 calendar days of it being marked 'Resolved'.

### 5.1.3 Enforcement Point

Backend API endpoint for creating a dispute. The UI should also reflect this rule by hiding/disabling the button.

### 5.1.4 Violation Handling

The API will return a 403 Forbidden or 400 Bad Request error with a clear message like 'The dispute period for this ticket has expired.'

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A reason for the dispute is mandatory.

### 5.2.3 Enforcement Point

Client-side validation in the UI and server-side validation in the API.

### 5.2.4 Violation Handling

The API will return a 400 Bad Request error. The UI will display an inline validation error.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

A ticket can only be disputed once.

### 5.3.3 Enforcement Point

Backend API logic will check if the ticket has ever had a 'Disputed' status.

### 5.3.4 Violation Handling

The API will return a 409 Conflict error. The UI prevents this by hiding the button after a dispute is initiated.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-040

#### 6.1.1.2 Dependency Reason

Requires the ability for a user to view the status of their service requests.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-057

#### 6.1.2.2 Dependency Reason

Requires the ability for a Technician to mark a job as 'Resolved', which starts the 7-day dispute timer.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-069

#### 6.1.3.2 Dependency Reason

CRITICAL: This story creates disputed tickets. US-069 is required for Brand Admins to view and manage these tickets. Without it, disputes go into a black hole.

## 6.2.0.0 Technical Dependencies

- The Service Ticket microservice must expose a new API endpoint (e.g., POST /api/v1/tickets/{id}/dispute).
- The database schema for service tickets requires a 'resolved_at' timestamp and potentially a 'disputed_at' timestamp.
- The system's notification service (leveraging Azure Service Bus) must be able to handle a 'TicketDisputed' event to notify Brand Admins.

## 6.3.0.0 Data Dependencies

- The system must have a clear data relationship to identify which Brand Admin(s) to notify based on the product associated with the service ticket.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for submitting a dispute should be under 300ms (P95).

## 7.2.0.0 Security

- The API endpoint must be secured, ensuring only the user who owns the ticket can dispute it.
- All user-provided text (the dispute reason) must be sanitized on the backend to prevent XSS and other injection attacks.

## 7.3.0.0 Usability

- The process to dispute a ticket should be simple and discoverable from the resolved ticket's detail screen.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported mobile OS versions (iOS 14+, Android 8.0+) and web browsers.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordinated changes across frontend (mobile app), backend (API), and database (schema migration).
- Implementation of the time-based business rule (7-day window) must be precise and handle timezones correctly (store and compare all timestamps in UTC).
- Integration with the asynchronous notification system adds a moving part.

## 8.3.0.0 Technical Risks

- Potential for timezone-related bugs if not handled carefully.
- Ensuring the notification to the Brand Admin is reliable and doesn't fail silently.

## 8.4.0.0 Integration Points

- Service Ticket microservice.
- Notification microservice (via Azure Service Bus).
- Audit Log service.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify a user can dispute a ticket on day 1 and day 7.
- Verify a user cannot dispute a ticket on day 8.
- Verify submitting a dispute with an empty reason fails.
- Verify the status change is correctly reflected in all relevant UI screens.
- Verify the Brand Admin receives a notification (or that the event is correctly placed on the message bus).

## 9.3.0.0 Test Data Needs

- Test user accounts.
- Service tickets in various statuses ('Resolved', 'Work In Progress', etc.).
- Service tickets with 'resolved_at' timestamps set to various points in the past (e.g., 2 days ago, 8 days ago) to test the time window logic.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest for backend unit/integration tests.
- Cypress (or equivalent) for E2E testing.
- A tool to inspect the Azure Service Bus queue for notification events.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other engineer
- Unit and integration tests implemented for new logic, achieving >80% code coverage
- E2E automated test for the happy path scenario is created and passing
- User interface changes reviewed and approved by the UX/Product team
- Security requirements (authorization, input sanitization) validated
- Audit log creation is verified
- Documentation for the new API endpoint is created/updated in Swagger/OpenAPI
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be prioritized alongside or immediately after US-069 (Brand Admin Manages Disputed Tickets) to ensure a complete end-to-end workflow.
- The development team needs to align on the event contract for the 'TicketDisputed' notification.

## 11.4.0.0 Release Impact

- This is a key feature for customer satisfaction and will be highlighted in release notes as an improvement to the customer support process.

