# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-068 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Close a completed service ti... |
| As A User Story | As a Service Center Admin, I want to formally clos... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Ensures accurate workflow management by clearing c... |
| Functional Area | Service Request Management |
| Story Theme | Service Center Operations |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Admin successfully closes a resolved ticket

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A service ticket exists with the status 'Resolved', and the user is logged in as a Service Center Admin with permissions for that service center.

### 3.1.5 When

The admin navigates to the ticket's detail view, clicks the 'Close Ticket' button, and confirms the action in a confirmation modal.

### 3.1.6 Then

The system updates the ticket's status to 'Closed' in the database. The admin receives a success notification on the UI, such as 'Ticket [Ticket ID] has been successfully closed.'. The ticket details become read-only, disabling all edit, assignment, and status change controls. A 'ticket.closed' event is published to the message bus, triggering a push notification to the end-user prompting them to rate the service.

### 3.1.7 Validation Notes

Verify via E2E test: 1. Log in as admin. 2. Find a 'Resolved' ticket. 3. Click 'Close Ticket' and confirm. 4. Check that the status badge updates to 'Closed' and UI controls are disabled. 5. Check the notification service logs to confirm a notification event was triggered for the customer.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Attempting to close a ticket that is not in 'Resolved' state

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A service ticket exists with a status of 'Work In Progress' (or any status other than 'Resolved'), and the user is logged in as a Service Center Admin.

### 3.2.5 When

The admin navigates to the ticket's detail view.

### 3.2.6 Then

The 'Close Ticket' button must be disabled. A tooltip on the disabled button should inform the admin, 'This ticket can only be closed after a technician marks it as Resolved.'

### 3.2.7 Validation Notes

Verify via UI component test and E2E test. Check that for tickets with statuses like 'Requested', 'Acknowledged', 'Technician Assigned', 'Work In Progress', the button is not clickable.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Confirmation modal for closing a ticket

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A service ticket is in the 'Resolved' state, and the admin is viewing its details.

### 3.3.5 When

The admin clicks the 'Close Ticket' button.

### 3.3.6 Then

A confirmation modal appears with the text 'Are you sure you want to close this ticket? This action is final and cannot be undone.' and provides 'Confirm' and 'Cancel' options. If 'Cancel' is clicked, the modal closes and the ticket status remains 'Resolved'. If 'Confirm' is clicked, the flow from AC-001 proceeds.

### 3.3.7 Validation Notes

Verify via UI interaction test that the modal appears and that the 'Cancel' action correctly aborts the process without changing the ticket's state.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Audit trail creation upon ticket closure

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A service ticket with status 'Resolved' is about to be closed by an admin.

### 3.4.5 When

The admin confirms the closure of the ticket.

### 3.4.6 Then

An entry is created in the system's audit trail. The log entry must contain the Admin's User ID, the Service Request ID, the action ('TicketClosed'), a timestamp, and the source IP address.

### 3.4.7 Validation Notes

Verify by checking the audit log database or API after closing a ticket. The log entry must be present and contain all the required fields.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to close a disputed ticket

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A service ticket has been escalated by the user and has a status of 'Disputed'.

### 3.5.5 When

The Service Center Admin navigates to the ticket's detail view.

### 3.5.6 Then

The 'Close Ticket' button must be disabled. A tooltip should state, 'This ticket is in dispute and must be resolved by the Brand Administrator.'

### 3.5.7 Validation Notes

Verify via UI test that for a ticket in 'Disputed' state, the closure action is unavailable to the Service Center Admin.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Close Ticket' button on the service ticket detail page.
- A confirmation modal dialog.
- A success toast/notification message.
- A tooltip for the disabled 'Close Ticket' button.

## 4.2.0 User Interactions

- The 'Close Ticket' button is only enabled when the ticket status is 'Resolved'.
- Clicking the button triggers a confirmation modal.
- Confirming the action closes the ticket and makes the page read-only.
- Cancelling the action in the modal returns the user to the ticket detail view with no changes.

## 4.3.0 Display Requirements

- The ticket status must be clearly displayed and update immediately to 'Closed' upon successful action.
- The confirmation modal must clearly state that the action is final.

## 4.4.0 Accessibility Needs

- The 'Close Ticket' button must be keyboard accessible (focusable and activatable via Enter/Space).
- The confirmation modal must trap focus and be manageable via keyboard.
- All UI elements must have appropriate ARIA attributes and labels for screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service ticket can only be moved to 'Closed' status from the 'Resolved' status.

### 5.1.3 Enforcement Point

API endpoint and Frontend UI.

### 5.1.4 Violation Handling

The API will return a 409 Conflict error if the rule is violated. The UI will prevent the action by disabling the control.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Once a ticket is 'Closed', no further modifications (status changes, note additions, reassignments) are permitted by Service Center Admins or Technicians.

### 5.2.3 Enforcement Point

API endpoint for all modification actions.

### 5.2.4 Violation Handling

The API will return a 403 Forbidden error. The UI will disable all editing controls for a closed ticket.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-084

#### 6.1.1.2 Dependency Reason

A ticket must be marked as 'Resolved' by a technician before it can be closed by an admin. This story provides the necessary preceding state.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-061

#### 6.1.2.2 Dependency Reason

The Service Center Admin needs the dashboard/list view to find and access the specific ticket they wish to close.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-048

#### 6.1.3.2 Dependency Reason

The action of closing a ticket is the trigger for prompting the user to provide a rating and feedback. This story's functionality is initiated by the completion of US-068.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

The system notification mechanism must be in place to inform the user that their service request has been closed.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-114

#### 6.1.5.2 Dependency Reason

The audit trail system must be available to log this critical administrative action for compliance and tracking.

## 6.2.0.0 Technical Dependencies

- Service Request Microservice: To handle the state transition.
- Notification Service (Azure Service Bus & Consumers): To handle the asynchronous notification to the user.
- Audit Service: To log the closure event.
- Authentication/Authorization Service (Azure AD B2C): To enforce RBAC on the API endpoint.

## 6.3.0.0 Data Dependencies

- Requires access to the service request data model, specifically the 'status' field.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the PATCH request to close the ticket must be under 500ms at the 95th percentile (P95).

## 7.2.0.0 Security

- The API endpoint must be protected and accessible only by authenticated users with the 'Service Center Admin' role.
- The user's role must be re-verified at the microservice level to prevent bypass at the API gateway.
- The action must be logged in an immutable audit trail as per US-114.

## 7.3.0.0 Usability

- The action to close a ticket should be intuitive and require no more than two clicks (click button, click confirm).
- Clear feedback (success/error messages) must be provided to the user after the action is performed.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported web browsers (latest stable Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend logic involves a state machine validation.
- Requires orchestration of multiple asynchronous events (notification, audit, analytics update) via a message bus.
- Ensuring idempotency of the closure action.
- Frontend logic requires conditional rendering and state management to disable controls post-closure.

## 8.3.0.0 Technical Risks

- Potential for race conditions if multiple admins try to act on the same ticket simultaneously (should be mitigated by database transactions).
- Failure in the event publishing mechanism could lead to downstream tasks (like notifications) not being triggered. A dead-letter queue and monitoring are required.

## 8.4.0.0 Integration Points

- Service Request Database (PostgreSQL): Update ticket status.
- Message Bus (Azure Service Bus): Publish 'ticket.closed' event.
- Notification Service: Consumes the event to send push notifications/emails.
- Audit Service: Consumes the event to create an audit log.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify a 'Resolved' ticket can be closed.
- Verify a 'Work In Progress' ticket cannot be closed.
- Verify the confirmation modal's cancel functionality.
- Verify the ticket becomes read-only after closure.
- Verify an audit log is created upon closure.
- Verify that a user without the 'Service Center Admin' role receives a 403 Forbidden error when attempting to call the API endpoint.

## 9.3.0.0 Test Data Needs

- Test accounts for a Service Center Admin and a regular User.
- Service tickets in various states: 'Requested', 'Work In Progress', 'Resolved', and 'Disputed'.

## 9.4.0.0 Testing Tools

- Jest & Supertest (Backend Unit/Integration)
- Jest & React Testing Library (Frontend Component)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other engineer
- Unit and integration tests implemented with >80% coverage for new code
- E2E test scenario for the happy path is implemented and passing
- User interface reviewed and approved by the design/UX team
- API endpoint performance is benchmarked and meets the <500ms P95 requirement
- Security checks for RBAC are implemented and tested
- All UI elements meet WCAG 2.1 AA accessibility standards
- API documentation (OpenAPI/Swagger) is updated for the new endpoint/state transition
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a key part of the core service workflow and should be prioritized accordingly.
- Must be scheduled in a sprint after its prerequisite, US-084 ('Technician: Mark a job as Resolved'), is completed.

## 11.4.0.0 Release Impact

Completes a critical workflow for service centers, enabling them to manage their ticket lifecycle effectively. Without this, there is no formal closure process.

