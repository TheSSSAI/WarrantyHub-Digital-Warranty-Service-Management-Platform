# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-066 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Re-assign a service request ... |
| As A User Story | As a Service Center Admin, I want to re-assign an ... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Enables operational flexibility and efficient work... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful re-assignment of a service request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Service Center Admin viewing a service request that is assigned to 'Technician A' and has a status of 'Technician Assigned'

### 3.1.5 When

I select the option to re-assign the ticket and choose 'Technician B' from the list of available technicians and confirm the change

### 3.1.6 Then

The service request's assignment is updated to 'Technician B' in the system and on the UI. 'Technician A' receives a notification that the job has been removed from their queue. 'Technician B' receives a notification about the new job assignment. The end-user (customer) receives a notification that their technician has been changed to 'Technician B'. An entry is created in the service request's audit log detailing the re-assignment.

### 3.1.7 Validation Notes

Verify the database record for the service request reflects the new technician_id. Check notification logs for all three parties. Check the audit log table for the re-assignment entry.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Attempting to re-assign a closed or cancelled ticket

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am a logged-in Service Center Admin viewing a service request with a status of 'Resolved/Closed' or 'Cancelled'

### 3.2.5 When

I look for the option to re-assign the ticket

### 3.2.6 Then

The 'Re-assign' button or option must be disabled or not visible. Any direct API call to re-assign must fail with a 409 Conflict error and a descriptive message.

### 3.2.7 Validation Notes

Inspect the UI to confirm the control is disabled. Use an API client like Postman to attempt the action and verify the error response.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Re-assigning a ticket that is already in progress

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am a logged-in Service Center Admin viewing a service request where the technician has set the status to 'Technician On The Way' or 'Work In Progress'

### 3.3.5 When

I select the option to re-assign the ticket

### 3.3.6 Then

A confirmation modal appears with a warning message, such as 'This job is already in progress. Are you sure you want to re-assign it?'. I must explicitly confirm the action to proceed with the re-assignment.

### 3.3.7 Validation Notes

Follow the steps and ensure the warning modal appears. Confirming should trigger the re-assignment flow (as in AC-001), while cancelling should leave the assignment unchanged.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Viewing the list of technicians for re-assignment

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am a logged-in Service Center Admin and I have initiated the re-assignment process for a ticket assigned to 'Technician A'

### 3.4.5 When

The system displays the list of technicians to choose from

### 3.4.6 Then

The list must only contain other active technicians from my service center. The currently assigned technician, 'Technician A', must not appear in the list.

### 3.4.7 Validation Notes

Check the list of technicians presented in the UI. It should match the active roster for the service center, excluding the one already assigned.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Audit trail is correctly updated

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

A service request has been successfully re-assigned from 'Technician A' to 'Technician B' by me, a Service Center Admin

### 3.5.5 When

I view the history or audit log for that service request

### 3.5.6 Then

An immutable log entry exists that contains the timestamp, the ID of the admin who performed the action, the previous technician's ID ('Technician A'), and the new technician's ID ('Technician B').

### 3.5.7 Validation Notes

Query the audit log database table for the specific service request ID and verify the presence and accuracy of the re-assignment log entry.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Re-assign' or 'Change Technician' button/link on the service request details page.
- A modal dialog for selecting the new technician.
- A searchable dropdown or list of available technicians within the modal.
- A 'Confirm' button to execute the re-assignment.
- A 'Cancel' button to abort the action.
- A confirmation warning modal for re-assigning in-progress jobs.

## 4.2.0 User Interactions

- Admin clicks 'Re-assign' to open the selection modal.
- Admin selects a new technician from the list.
- Admin clicks 'Confirm' to save the change, which closes the modal and updates the UI.
- Admin clicks 'Cancel' to close the modal with no changes.

## 4.3.0 Display Requirements

- The service request details page must clearly display the currently assigned technician's name.
- The technician selection list should display the technician's full name and, if possible, their current workload (e.g., number of open tickets).
- A success toast/notification should appear on the admin's screen after a successful re-assignment.

## 4.4.0 Accessibility Needs

- The re-assignment modal must be fully keyboard accessible (WCAG 2.1 AA).
- All buttons and interactive elements must have appropriate ARIA labels.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service request can only be re-assigned if its status is not 'Resolved/Closed' or 'Cancelled'.

### 5.1.3 Enforcement Point

API endpoint and User Interface

### 5.1.4 Violation Handling

The UI control will be disabled. The API will return a 409 Conflict error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A service request can only be re-assigned to another active technician within the same service center.

### 5.2.3 Enforcement Point

Backend Service Logic

### 5.2.4 Violation Handling

The list of available technicians is filtered by the backend to only include valid options. Any invalid technician ID submitted via API will be rejected with a 400 Bad Request error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-061

#### 6.1.1.2 Dependency Reason

Admin must be able to view the list of service requests to select one for re-assignment.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-065

#### 6.1.2.2 Dependency Reason

The initial assignment functionality must exist before a ticket can be re-assigned.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-069

#### 6.1.3.2 Dependency Reason

A roster of technicians must exist in the system to provide options for re-assignment.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

The notification system must be in place to alert the old technician, new technician, and the customer of the change.

## 6.2.0.0 Technical Dependencies

- Service Request Microservice (for updating the ticket)
- User/Technician Microservice (for fetching the technician roster)
- Notification Microservice (for sending push notifications/emails)
- Audit Logging System

## 6.3.0.0 Data Dependencies

- Requires access to the service center's roster of active technicians.
- Requires access to the service request's current state and assignment.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) or similar push notification service.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to re-assign a ticket must have a P95 response time of less than 500ms.
- The UI modal to fetch and display the list of available technicians must load in under 1 second.

## 7.2.0.0 Security

- The API endpoint must be protected by Role-Based Access Control (RBAC), accessible only by users with the 'Service Center Admin' role.
- The endpoint must validate that the admin belongs to the same service center as the service request they are trying to modify.

## 7.3.0.0 Usability

- The process of re-assigning should be intuitive and require no more than 3 clicks from the service request details view.

## 7.4.0.0 Accessibility

- All UI components must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Service Center web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Orchestration of multiple downstream effects: database update, notifications to three distinct parties (old tech, new tech, customer), and audit logging.
- The process should be transactional or idempotent to handle potential failures in downstream systems (e.g., notification service being down). The assignment should succeed even if a notification fails, but the failure should be logged and alerted.
- Frontend state management to correctly fetch and display the list of technicians and update the UI upon success.

## 8.3.0.0 Technical Risks

- Potential for race conditions if two admins try to modify the same ticket simultaneously. Optimistic or pessimistic locking should be considered.
- Failure in the notification service could lead to a poor user experience. A robust retry mechanism for notifications is required.

## 8.4.0.0 Integration Points

- API endpoint: `PATCH /api/v1/service-requests/{id}/assign`
- Publishes events to a message bus (e.g., Azure Service Bus) for `TechnicianReassigned` which downstream services (like notifications) can subscribe to.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify a successful re-assignment and check for all side effects (DB update, notifications, audit log).
- Verify that a closed ticket cannot be re-assigned via the UI or API.
- Verify the confirmation prompt appears for an in-progress ticket.
- Log in as the old technician and confirm the job is removed from their list.
- Log in as the new technician and confirm the job appears in their list.

## 9.3.0.0 Test Data Needs

- A test service center with one admin and at least two technician accounts.
- A service request in an 'Acknowledged' or 'Technician Assigned' state.
- A service request in a 'Resolved/Closed' state.
- A service request in a 'Work In Progress' state.

## 9.4.0.0 Testing Tools

- Jest & Supertest (Backend Unit/Integration)
- React Testing Library (Frontend Component)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage and passing
- Integration testing completed successfully, verifying database changes and event publishing
- E2E tests for the re-assignment flow are passing
- User interface reviewed and approved by the Product Owner
- Performance requirements verified under simulated load
- Security requirements (RBAC) validated
- Documentation for the API endpoint is updated in the OpenAPI specification
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core operational feature for service centers and should be prioritized early in the development of the Service Center Panel.
- Dependent on the completion of the notification and basic assignment user stories.

## 11.4.0.0 Release Impact

- This feature is critical for the Minimum Viable Product (MVP) for the Service Center persona.

