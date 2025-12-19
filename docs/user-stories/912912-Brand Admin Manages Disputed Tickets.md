# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-069 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Brand Admin Manages Disputed Tickets |
| As A User Story | As a Brand Admin, I want a dedicated interface to ... |
| User Persona | Brand Admin: A user responsible for overseeing pro... |
| Business Value | Provides a critical escalation path for dissatisfi... |
| Functional Area | Brand Dashboard |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Viewing the list of disputed tickets

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Brand Admin is logged into the Brand Dashboard

### 3.1.5 When

they navigate to the 'Disputed Tickets' section

### 3.1.6 Then

a list of all service tickets for their brand with the status 'Disputed' is displayed.

### 3.1.7 Validation Notes

Verify that the API call only fetches tickets with status='Disputed' and for the logged-in admin's brand_id. The list should be paginated.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Disputed tickets list content and functionality

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Brand Admin is viewing the list of disputed tickets

### 3.2.5 When

they observe the list

### 3.2.6 Then

each item in the list displays the Ticket ID, Product Model, Customer Name, Date of Dispute, and associated Service Center. The list is sortable by 'Date of Dispute' and filterable by 'Service Center'.

### 3.2.7 Validation Notes

Check the UI for the presence of all required data fields. Test the sorting (ASC/DESC) and filtering functionality.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Viewing the complete details of a single disputed ticket

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the Brand Admin is viewing the list of disputed tickets

### 3.3.5 When

they click on a specific ticket to view its details

### 3.3.6 Then

they are taken to a detailed view that includes: the original service request details (description, media), the technician's resolution notes, the customer's rating/feedback, the customer's reason for the dispute, and the complete in-app chat history associated with the ticket.

### 3.3.7 Validation Notes

Verify that all historical data related to the ticket is fetched and displayed correctly and in a readable format.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Resolving a dispute by upholding the original resolution

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the Brand Admin is viewing the details of a disputed ticket

### 3.4.5 When

they click the 'Uphold Resolution' action, enter a mandatory justification comment, and confirm

### 3.4.6 Then

the ticket's status is updated to 'Closed - Dispute Resolved', the admin's comment is saved, and a notification is sent to the user informing them of the decision and the justification.

### 3.4.7 Validation Notes

Check the database for the status change. Verify the notification is triggered. Ensure the user can see the admin's comment in their ticket history.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Resolving a dispute by re-opening the ticket for further action

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the Brand Admin is viewing the details of a disputed ticket

### 3.5.5 When

they click the 'Re-open Ticket' action, enter a mandatory comment with next steps, and confirm

### 3.5.6 Then

the ticket's status is updated to 'Acknowledged', the ticket reappears in the assigned Service Center's queue, and notifications are sent to both the user and the Service Center Admin.

### 3.5.7 Validation Notes

Verify the status change and that the ticket is visible again in the Service Center panel. Check that both user and service center notifications are sent.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Adding internal notes to a disputed ticket

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the Brand Admin is viewing the details of a disputed ticket

### 3.6.5 When

they add a comment to the 'Internal Notes' section and save it

### 3.6.6 Then

the note is saved with their username and a timestamp, and it is only visible to other Brand Admins for the same brand.

### 3.6.7 Validation Notes

Log in as the user and as a Service Center Admin to confirm the note is not visible. Log in as another Brand Admin for the same brand to confirm it is visible.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Viewing the disputed tickets list when none exist

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

a Brand Admin is logged in

### 3.7.5 When

they navigate to the 'Disputed Tickets' section and there are no tickets with that status for their brand

### 3.7.6 Then

the system displays a user-friendly message, such as 'No disputed tickets to review at this time.'

### 3.7.7 Validation Notes

Ensure the page doesn't show an empty table or an error, but rather a clear informational message.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Audit trail for dispute management actions

### 3.8.3 Scenario Type

Happy_Path

### 3.8.4 Given

a Brand Admin has resolved a disputed ticket

### 3.8.5 When

a Super Admin reviews the system audit log for that ticket

### 3.8.6 Then

an entry exists recording the Brand Admin's ID, the action taken ('Uphold Resolution' or 'Re-open Ticket'), the justification comment, and the exact timestamp of the action.

### 3.8.7 Validation Notes

Query the audit log table/service to confirm the event was captured with all required details.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A new navigation item in the Brand Dashboard sidebar: 'Disputed Tickets'.
- A data table/list view for disputed tickets with columns for Ticket ID, Product, Customer, Dispute Date, Service Center.
- Filtering controls for 'Service Center'.
- Sorting controls for table headers, especially 'Dispute Date'.
- A detailed view page with distinct sections for 'Ticket History', 'Resolution & Dispute Details', 'Chat History', and 'Internal Notes'.
- Action buttons: 'Uphold Resolution', 'Re-open Ticket'.
- A modal dialog for entering mandatory justification comments when taking action.

## 4.2.0 User Interactions

- Brand Admin clicks on a ticket in the list to navigate to the detail view.
- Clicking an action button opens a modal for confirmation and comment entry.
- Submitting the modal triggers the backend action and updates the UI.
- Adding an internal note is an asynchronous action that updates the notes section without a full page reload.

## 4.3.0 Display Requirements

- The total count of disputed tickets should be displayed, possibly as a badge on the navigation item.
- All timestamps should be displayed in the Brand Admin's local timezone.
- The customer's reason for the dispute must be prominently displayed in the ticket detail view.

## 4.4.0 Accessibility Needs

- The data table must be keyboard navigable.
- All action buttons and form fields in the modal must have proper labels for screen readers.
- The interface must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A Brand Admin can only view and manage disputed tickets associated with their own brand.

### 5.1.3 Enforcement Point

API Gateway and Backend Service Logic.

### 5.1.4 Violation Handling

API request will return a 403 Forbidden or 404 Not Found error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A justification comment is mandatory when resolving a dispute (either upholding or re-opening).

### 5.2.3 Enforcement Point

Frontend UI (disabling confirm button) and Backend API (validation check).

### 5.2.4 Violation Handling

Frontend shows a validation error message. API returns a 400 Bad Request error if the comment is missing.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Internal notes are strictly confidential and must not be exposed on any API endpoints accessible by User, Technician, or Service Center Admin roles.

### 5.3.3 Enforcement Point

Backend API (RBAC on data fields).

### 5.3.4 Violation Handling

The 'internal_notes' field is omitted from API responses for unauthorized roles.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-045

#### 6.1.1.2 Dependency Reason

This story creates the 'Disputed' ticket status and captures the user's reason for the dispute, which is the entry point for this workflow.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-046

#### 6.1.2.2 Dependency Reason

The Service Center Admin's dashboard must exist to receive re-opened tickets.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-089

#### 6.1.3.2 Dependency Reason

The notification system must be in place to alert users and service centers of the dispute resolution outcome.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-124

#### 6.1.4.2 Dependency Reason

The system-wide audit trail functionality is required to log all actions taken by the Brand Admin.

## 6.2.0.0 Technical Dependencies

- A robust Role-Based Access Control (RBAC) mechanism.
- The notification microservice (integrating with FCM/Azure Communication Services).
- The core Service Request/Ticket management microservice.
- The audit logging service.

## 6.3.0.0 Data Dependencies

- Access to the service tickets data store.
- Access to user, brand, and service center relationship data.
- Access to the full chat history for a given ticket.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The disputed tickets list page should load in under 2 seconds.
- The ticket detail page, including all historical data, should load in under 3 seconds.

## 7.2.0.0 Security

- All actions (viewing, updating, commenting) must be authorized based on the Brand Admin's role and their brand association.
- Internal notes must be encrypted at rest and never exposed to unauthorized roles.

## 7.3.0.0 Usability

- The interface should clearly distinguish between public resolution comments and private internal notes.
- The complete history of a ticket should be presented in a clear, chronological timeline to be easily understood.

## 7.4.0.0 Accessibility

- All components must adhere to WCAG 2.1 Level AA.

## 7.5.0.0 Compatibility

- The Brand Dashboard must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires aggregating data from multiple sources (ticket details, chat logs, user info, resolution notes) into a single view.
- The state machine for the ticket status (Resolved -> Disputed -> Acknowledged/Closed) needs to be carefully implemented to be robust.
- Strict enforcement of RBAC is critical to prevent data leakage between brands or to other user roles.
- Requires API endpoint updates for both the Brand portal and the Service Center portal (for re-opened tickets).

## 8.3.0.0 Technical Risks

- Potential for slow performance when loading the ticket detail view if data aggregation queries are not optimized.
- Race conditions if two admins from the same brand attempt to resolve the same ticket simultaneously. Pessimistic or optimistic locking should be considered.

## 8.4.0.0 Integration Points

- Service Request Microservice: To fetch and update ticket status.
- Notification Microservice: To send alerts to users and service centers.
- User Management/Auth Service: To verify Brand Admin role and brand association.
- Audit Service: To log all resolution actions.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify a Brand Admin for Brand A cannot see disputed tickets for Brand B.
- End-to-end test of the 'Uphold Resolution' flow, from Brand Admin action to user notification.
- End-to-end test of the 'Re-open Ticket' flow, from Brand Admin action to the ticket appearing in the Service Center's queue.
- Test that internal notes are not visible in the API responses for User or Service Center Admin roles.
- Test the mandatory comment validation on both the frontend and backend.

## 9.3.0.0 Test Data Needs

- Multiple brands with their own Brand Admins.
- Multiple service centers linked to these brands.
- Several service tickets in the 'Disputed' state, complete with chat history and resolution notes.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Cypress for E2E tests.
- Postman/Insomnia for API-level security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other engineer
- Unit and integration tests implemented with >80% coverage for new code
- E2E tests for the primary user flows are created and passing
- UI/UX has been reviewed and approved by the design team
- Security review passed, ensuring no data leakage between roles or brands
- All API endpoints are documented in the OpenAPI specification
- Story has been deployed and successfully verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-045 and should not be started until US-045 is complete and merged.
- Requires both frontend (Brand Dashboard) and backend (API) development work.
- Coordination with the team working on the Service Center portal may be needed to ensure the 'Re-open' flow works correctly.

## 11.4.0.0 Release Impact

This is a key feature for brand partners and a major component of the platform's value proposition for managing service quality. It is critical for a full public launch.

