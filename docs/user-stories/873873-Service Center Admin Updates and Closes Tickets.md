# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-050 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Updates and Closes Tickets |
| As A User Story | As a Service Center Admin, I want to be able to ad... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Ensures data integrity by capturing a complete ser... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Admin can access the finalization interface for a ready ticket

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am logged in as a Service Center Admin and am viewing a service ticket with the status 'Resolved' (set by a technician)

### 3.1.5 When

I open the ticket's detail view

### 3.1.6 Then

I should see a button or control labeled 'Finalize & Close Ticket'.

### 3.1.7 Validation Notes

Verify the button is present and enabled for tickets in a 'Resolved' state. It can also be available for 'Work In Progress' to allow admins to override and close.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Admin successfully adds notes, parts, and closes the ticket

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I have clicked the 'Finalize & Close Ticket' button, and the finalization modal is open

### 3.2.5 When

I enter 'Replaced main capacitor' in the service notes, add a part with 'Capacitor 470uF', 'PN-CAP470', and quantity '1', and then click 'Confirm & Close'

### 3.2.6 Then

The service ticket's status is updated to 'Closed', the notes and parts data are saved permanently to the ticket's record, and the ticket is removed from the active queue.

### 3.2.7 Validation Notes

Check the database to confirm the status change and that the notes and parts records are correctly associated with the ticket ID.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Closing a ticket triggers a customer notification

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A service ticket has been successfully updated to 'Closed' status by an admin

### 3.3.5 When

the save operation is complete

### 3.3.6 Then

the system must trigger an event to the notification service to send a push notification and email to the customer, informing them the service is complete and prompting for a rating.

### 3.3.7 Validation Notes

Verify that a message is published to the Azure Service Bus topic for notifications. The content should include ticket ID and user ID.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Admin cannot close a ticket that is not in a valid state

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am logged in as a Service Center Admin and am viewing a service ticket with the status 'Requested' or 'Technician Assigned'

### 3.4.5 When

I view the ticket's details

### 3.4.6 Then

the 'Finalize & Close Ticket' button must be disabled or hidden.

### 3.4.7 Validation Notes

Test with tickets in each of the non-final states to ensure the UI prevents this action.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

System handles validation for required fields

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The system is configured to require service notes upon closure, and I am in the finalization modal

### 3.5.5 When

I attempt to click 'Confirm & Close' without entering any service notes

### 3.5.6 Then

a validation error message 'Service notes are required to close the ticket' is displayed, and the ticket status remains unchanged.

### 3.5.7 Validation Notes

Check that the API returns a 400 Bad Request error and the frontend displays a user-friendly message.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Admin can close a ticket without adding parts

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

I am in the finalization modal for a ticket where no parts were used

### 3.6.5 When

I enter the required service notes but do not add any parts, and click 'Confirm & Close'

### 3.6.6 Then

the ticket is successfully closed, and the service record shows no parts were used.

### 3.6.7 Validation Notes

Verify that the parts list for the service record is empty and the closure is successful.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Finalize & Close Ticket' button on the service ticket detail view.
- A modal dialog for ticket finalization.
- A multi-line textarea for 'Service Summary Notes'.
- A dynamic list component to add/edit/remove 'Parts Used', with fields for Part Name/Number, and Quantity.
- A 'Confirm & Close' primary action button within the modal.
- A 'Cancel' secondary action button to dismiss the modal without saving.

## 4.2.0 User Interactions

- Clicking 'Finalize & Close Ticket' opens the modal.
- The 'Parts Used' section should allow users to add multiple part entries dynamically.
- The 'Confirm & Close' button should be disabled until all mandatory fields are filled.
- Upon successful closure, the modal closes, and the main ticket list/view should refresh to reflect the new 'Closed' status.

## 4.3.0 Display Requirements

- The finalization modal should display the ticket ID for context.
- Technician's notes should be visible (read-only) or pre-populated in the admin's notes field for reference or editing.

## 4.4.0 Accessibility Needs

- The modal must be fully keyboard accessible (trapping focus).
- All form fields must have associated labels for screen readers.
- Buttons must have clear, descriptive aria-labels.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service ticket can only be moved to 'Closed' status from 'Work In Progress' or 'Resolved' statuses by a Service Center Admin.

### 5.1.3 Enforcement Point

Backend API endpoint for updating ticket status.

### 5.1.4 Violation Handling

The API request will be rejected with a 403 Forbidden or 409 Conflict status code if the current state is invalid.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Once a ticket is 'Closed', its core details (notes, parts used, status) become immutable to preserve the integrity of the service record.

### 5.2.3 Enforcement Point

Backend API logic for any subsequent update attempts.

### 5.2.4 Violation Handling

API will reject any attempts to modify a closed ticket with a 403 Forbidden error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-046

#### 6.1.1.2 Dependency Reason

Admin needs the service request dashboard to find and select a ticket to manage.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-057

#### 6.1.2.2 Dependency Reason

A technician marking a job as 'Resolved' is the primary trigger for an admin to perform the final closure action.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-044

#### 6.1.3.2 Dependency Reason

This story's completion action must trigger the notification and rating prompt defined in US-044.

## 6.2.0.0 Technical Dependencies

- Service Request microservice for state management and data storage.
- Azure Service Bus for publishing the 'ticket.closed' event.
- Notification microservice to consume the event and send alerts.

## 6.3.0.0 Data Dependencies

- Requires access to the service ticket data entity, including its current status.
- May require access to a master parts list for autocomplete functionality (future enhancement).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the close ticket action must be under 500ms (P95).
- The UI for the ticket list should update to reflect the change in under 1 second after the modal closes.

## 7.2.0.0 Security

- The API endpoint must be protected and accessible only by users with the 'Service Center Admin' role.
- The endpoint must enforce tenancy, ensuring an admin can only close tickets belonging to their own service center.

## 7.3.0.0 Usability

- The process of adding parts should be intuitive and quick.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Service Center web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend logic requires an atomic transaction to update multiple tables (ticket status, notes, parts).
- Frontend implementation of a dynamic form for adding/removing parts.
- Asynchronous communication via a message broker (Azure Service Bus) to decouple the closure action from the notification process.

## 8.3.0.0 Technical Risks

- Potential for race conditions if multiple admins attempt to act on the same ticket simultaneously. Optimistic locking should be considered.
- Ensuring the reliability of the event publishing to the message broker.

## 8.4.0.0 Integration Points

- Service Request Database (Azure PostgreSQL).
- Azure Service Bus (messaging).
- Frontend Web Application (Next.js).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify successful closure of a ticket with notes and parts.
- Verify successful closure of a ticket with notes but no parts.
- Verify UI prevents closure of tickets in invalid states ('Requested', 'Assigned').
- Verify API validation for mandatory fields.
- Verify that the 'ticket.closed' event is correctly published to the message bus with the right payload.
- Verify the entire flow from an admin closing a ticket to the user receiving a notification (in a test environment).

## 9.3.0.0 Test Data Needs

- Service tickets in various statuses: 'Requested', 'Technician Assigned', 'Work In Progress', 'Resolved'.
- User accounts for Service Center Admin and a standard Consumer.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for backend and frontend logic, achieving >80% coverage
- Integration testing completed for the API endpoint and the event publishing mechanism
- E2E test scenario for the happy path is automated and passing
- User interface reviewed and approved for usability and accessibility compliance
- API performance is benchmarked and meets the <500ms P95 requirement
- Security checks (role and tenancy enforcement) are validated
- API documentation (Swagger/OpenAPI) is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a critical part of completing the service workflow. It depends on the technician's ability to update status (US-057) and enables the customer feedback loop (US-044). Should be planned accordingly.

## 11.4.0.0 Release Impact

- Completes a key administrative function for service centers, making the platform viable for managing the full lifecycle of a service request.

