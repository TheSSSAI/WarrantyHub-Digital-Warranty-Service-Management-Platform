# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-102 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Re-assigns a Service Request |
| As A User Story | As a Service Center Admin, I want to re-assign an ... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Improves operational agility and service continuit... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successful Re-assignment

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Service Center Admin is logged into the web panel and is viewing a service request with the status 'Technician Assigned' to 'Technician A'

### 3.1.5 When

the admin initiates the 'Re-assign' action, selects 'Technician B' from the list of available technicians, and confirms the change

### 3.1.6 Then

the service request's assignment is updated to 'Technician B', the change is reflected immediately in the admin panel, and a success notification is displayed to the admin.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Notification to New Technician

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a service request has been successfully re-assigned to 'Technician B'

### 3.2.5 When

'Technician B' accesses their mobile application

### 3.2.6 Then

they receive a push notification about the new assignment and the service request now appears in their list of assigned jobs.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Update for Original Technician

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a service request has been successfully re-assigned from 'Technician A' to 'Technician B'

### 3.3.5 When

'Technician A' accesses their mobile application

### 3.3.6 Then

the service request is no longer visible in their list of assigned jobs and they receive a notification that the job has been re-assigned.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Notification to Customer

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a service request's technician assignment has been changed

### 3.4.5 When

the re-assignment is confirmed

### 3.4.6 Then

the customer receives a push notification and/or email informing them that a new technician has been assigned to their service request.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Audit Trail Creation

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a service request has been re-assigned

### 3.5.5 When

the admin views the service request's history or audit log

### 3.5.6 Then

a new entry is present that records the re-assignment action, the admin who performed it, the timestamp, the original technician, and the new technician.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to Re-assign a Closed Ticket

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a Service Center Admin is viewing a service request with a status of 'Resolved' or 'Closed'

### 3.6.5 When

the admin attempts to find or use the 'Re-assign' action

### 3.6.6 Then

the 'Re-assign' action is disabled or hidden in the UI, and any direct API call is rejected with an appropriate error (e.g., 400 Bad Request).

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Attempt to Re-assign a Ticket in Progress

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a Service Center Admin is viewing a service request where the technician has already set the status to 'Work In Progress'

### 3.7.5 When

the admin attempts to re-assign the ticket

### 3.7.6 Then

the system prevents the action and displays a confirmation prompt warning the admin, for example: 'This job is already in progress. Are you sure you want to re-assign it? This will notify the customer of a significant change.' If confirmed, the flow proceeds.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Re-assignment UI displays correct technician list

### 3.8.3 Scenario Type

Happy_Path

### 3.8.4 Given

the admin initiates the 'Re-assign' action for a ticket assigned to 'Technician A'

### 3.8.5 When

the list of technicians is displayed

### 3.8.6 Then

the list contains all other active technicians from that service center but explicitly excludes 'Technician A'.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Re-assign' option within a kebab menu ('...') or as a button on the service request details view in the admin panel.
- A modal dialog for re-assignment.
- A searchable dropdown or list view within the modal to select a new technician.
- 'Confirm' and 'Cancel' buttons within the modal.
- A success toast notification upon completion.

## 4.2.0 User Interactions

- Admin clicks the 'Re-assign' action to open the modal.
- Admin selects a new technician from the list.
- Admin clicks 'Confirm' to execute the re-assignment or 'Cancel' to close the modal with no changes.

## 4.3.0 Display Requirements

- The re-assignment modal must clearly display the current technician's name.
- The list of technicians for re-assignment should ideally display their current workload or availability status (dependency on US-101).
- The service request view must update instantly to show the new technician's name after re-assignment.

## 4.4.0 Accessibility Needs

- The re-assignment modal must be fully keyboard accessible (e.g., using Tab, Enter, Esc keys).
- All form elements (dropdown, buttons) must have ARIA labels for screen reader compatibility, adhering to WCAG 2.1 AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service request can only be re-assigned if its status is 'Acknowledged' or 'Technician Assigned'.

### 5.1.3 Enforcement Point

API endpoint and UI (action should be disabled/hidden for invalid statuses).

### 5.1.4 Violation Handling

The API will return a 400 Bad Request error with a descriptive message. The UI will prevent the action.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A Service Center Admin can only re-assign tickets belonging to their own service center.

### 5.2.3 Enforcement Point

API endpoint, via tenancy checks in the business logic.

### 5.2.4 Violation Handling

The API will return a 403 Forbidden or 404 Not Found error.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

All re-assignment actions must be logged in an immutable audit trail for accountability.

### 5.3.3 Enforcement Point

Backend service logic, as part of the re-assignment transaction.

### 5.3.4 Violation Handling

The transaction should fail if the audit log entry cannot be created.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-048

#### 6.1.1.2 Dependency Reason

The initial assignment functionality must exist before a re-assignment feature can be built.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-049

#### 6.1.2.2 Dependency Reason

A roster of technicians must be manageable to provide a list for re-assignment.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-051

#### 6.1.3.2 Dependency Reason

The technician's mobile app view of assigned jobs must exist to reflect the changes from a re-assignment.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

While not a hard blocker, this story is highly recommended to provide technician availability/workload data in the re-assignment UI, making the feature significantly more useful.

## 6.2.0.0 Technical Dependencies

- Notification Service (Azure Service Bus + FCM) for sending push notifications.
- Audit Logging Service for recording the action.
- Authentication/Authorization Service (Azure AD B2C) to enforce role-based access control.

## 6.3.0.0 Data Dependencies

- Access to the Service Center's technician roster.
- Access to Service Request records and their current status.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for re-assignment must have a P95 response time of < 250ms.
- The modal containing the list of technicians must load in < 500ms for a service center with up to 200 technicians.

## 7.2.0.0 Security

- The action must be protected by Role-Based Access Control (RBAC), restricted to the 'Service Center Admin' role.
- Tenancy checks must be enforced at the API level to prevent an admin from one service center from modifying tickets of another.

## 7.3.0.0 Usability

- The process of re-assigning a ticket should be achievable in no more than 3 clicks from the main service request list.
- The UI should provide clear feedback (e.g., loading indicators, success/error messages) throughout the process.

## 7.4.0.0 Accessibility

- All UI components must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel functionality must be fully supported on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a database transaction to ensure atomicity of the assignment update and audit log creation.
- Involves coordinating state changes and notifications across multiple actors (admin, old tech, new tech, customer).
- Requires asynchronous event publishing to a message broker for handling notifications reliably.
- Frontend state management needs to handle real-time updates for multiple users.

## 8.3.0.0 Technical Risks

- Potential for race conditions if two admins try to modify the same ticket simultaneously. Optimistic or pessimistic locking should be considered.
- Ensuring notification delivery is reliable and timely.

## 8.4.0.0 Integration Points

- Service Request Microservice (to update the ticket).
- Notification Microservice (to trigger push/email alerts).
- User Management/Technician Roster Service (to fetch the list of technicians).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify successful re-assignment and all resulting notifications.
- Verify that the original technician's job list is updated.
- Verify that the new technician's job list is updated.
- Verify that an admin cannot re-assign a ticket in a 'Resolved' or 'Closed' state.
- Verify that an admin cannot re-assign a ticket belonging to another service center.

## 9.3.0.0 Test Data Needs

- A test service center with at least 3 technician accounts.
- Service requests in various states: 'Technician Assigned', 'Work In Progress', 'Resolved'.
- A test customer account associated with the service requests.

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- React Testing Library for frontend unit tests.
- Cypress for E2E testing of the admin panel flow.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other engineer
- Unit and integration tests implemented with >80% coverage for new logic
- E2E test suite updated with the re-assignment scenario and passing
- All notifications (to old tech, new tech, customer) are verified in a staging environment
- Audit log entry is correctly created and verified
- UI is responsive and meets accessibility requirements
- Documentation for the new API endpoint is created/updated
- Story deployed and verified in the staging environment by QA/Product Owner

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a critical operational feature for service centers. Its priority is high for achieving MVP for that user group.
- Ensure prerequisite stories are completed in a prior sprint or early in the same sprint.

## 11.4.0.0 Release Impact

- This feature is essential for the Service Center Admin portal to be considered functionally complete for daily operations.

