# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-065 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Assign a service request to ... |
| As A User Story | As a Service Center Admin, I want to assign an inc... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Enables the core dispatching function of the servi... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Assign an acknowledged service request to an available technician

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Service Center Admin viewing the service request dashboard, and a service request exists with the status 'Acknowledged'

### 3.1.5 When

I select the 'Assign Technician' action for that request, choose a technician with the status 'Available' from the list, and confirm the assignment

### 3.1.6 Then

The service request's status must update to 'Technician Assigned', the selected technician's ID must be associated with the request in the database, and the assigned technician must receive a push notification about the new job assignment.

### 3.1.7 Validation Notes

Verify the status change in the UI and via API. Check the database record for the correct technician_id. Confirm a notification event is triggered and logged.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician list displays relevant context for assignment

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

I am a logged-in Service Center Admin and I have initiated the 'Assign Technician' action for a service request

### 3.2.5 When

The list of technicians is displayed

### 3.2.6 Then

Each technician in the list must show their Full Name, Photo, current availability status ('Available', 'On-Job', 'Offline'), and current workload (number of open tickets).

### 3.2.7 Validation Notes

UI test to ensure all specified data points are present and correctly formatted for each technician in the assignment modal.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempting to assign a request that is not in an assignable state

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in Service Center Admin viewing a service request with a status of 'Technician On The Way', 'Resolved', or 'Closed'

### 3.3.5 When

I view the details or actions available for that service request

### 3.3.6 Then

The 'Assign Technician' action must be disabled or not visible.

### 3.3.7 Validation Notes

Verify through UI inspection and by attempting to call the assignment API endpoint for a request in a non-assignable state, which should return a 4xx error.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Assignment action is audited

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A service request is successfully assigned to a technician

### 3.4.5 When

The assignment action is completed

### 3.4.6 Then

An entry must be created in the system's audit trail logging the Service Center Admin's ID, the Service Request ID, the assigned Technician ID, the action ('ASSIGN_TECHNICIAN'), and a timestamp.

### 3.4.7 Validation Notes

Check the audit log table or service to confirm the creation of a correctly detailed audit record.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Concurrent assignment attempt by two admins

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

Two different Service Center Admins are viewing the same 'Acknowledged' service request

### 3.5.5 When

Admin A successfully submits an assignment request, and Admin B submits an assignment request for the same ticket moments later

### 3.5.6 Then

The system must process only Admin A's request successfully. Admin B's client must receive an error message stating 'This request has already been assigned. Please refresh the page.'

### 3.5.7 Validation Notes

Requires a specific integration test scenario to simulate a race condition. The backend must use a transactional or locking mechanism to ensure data integrity.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Assign Technician' button/link on service request list items or detail views.
- A modal or dedicated panel for technician selection.
- A searchable list of technicians.
- A 'Confirm Assignment' button.
- A 'Cancel' button to close the assignment modal.
- Success and error toast notifications.

## 4.2.0 User Interactions

- Admin clicks 'Assign Technician' to open the selection modal.
- Admin can scroll or search the technician list.
- Admin clicks on a technician to select them.
- Admin clicks 'Confirm Assignment' to finalize the action.
- The modal closes upon successful assignment or cancellation.

## 4.3.0 Display Requirements

- The technician selection modal must display each technician's name, photo, availability status, and current ticket count.
- After successful assignment, the service request's status in the main dashboard must immediately reflect 'Technician Assigned' and show the assigned technician's name.

## 4.4.0 Accessibility Needs

- The assignment modal must be fully keyboard navigable (WCAG 2.1).
- All interactive elements (buttons, search field, list items) must have accessible names and roles for screen readers.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "A service request can only be assigned if its current status is 'Acknowledged'.", 'enforcement_point': 'API Gateway and Backend Service Logic', 'violation_handling': 'The API will return a 409 (Conflict) or 400 (Bad Request) error if an attempt is made to assign a request in an invalid state. The UI will prevent the action by disabling the button.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-061

#### 6.1.1.2 Dependency Reason

Requires the service request dashboard to exist in order to select a request to assign.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-063

#### 6.1.2.2 Dependency Reason

Assignment logically follows the 'Acknowledge' step in the workflow; this story acts on requests in the 'Acknowledged' state.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-069

#### 6.1.3.2 Dependency Reason

Requires the ability to create technician profiles, as there must be technicians in the system to assign requests to.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

Depends on the system's notification capability to alert the technician of their new assignment.

## 6.2.0.0 Technical Dependencies

- Service Request Management microservice.
- User Management microservice (to fetch technician details).
- Notification Service (FCM via Azure Communication Services).
- Role-Based Access Control (RBAC) to ensure only Service Center Admins can perform this action.

## 6.3.0.0 Data Dependencies

- Availability of service requests in an 'Acknowledged' state.
- Availability of technician records associated with the admin's service center.
- Real-time or near-real-time data on technician availability and workload.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to assign a technician must have a P95 response time of less than 250ms.
- The technician list in the assignment modal must load in under 500ms for a service center with up to 200 technicians.

## 7.2.0.0 Security

- The API endpoint must be protected and only accessible to authenticated users with the 'Service Center Admin' role.
- The admin must only be able to see and assign technicians belonging to their own service center.

## 7.3.0.0 Usability

- The process of assigning a technician should take no more than 3 clicks from the service request dashboard.
- The technician list should be sorted by availability by default to aid in quick decision-making.

## 7.4.0.0 Accessibility

- All UI components must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend logic requires a transactional update to prevent race conditions.
- Requires aggregation of real-time data for technician status and workload, which may impact query performance.
- Frontend state management needs to handle the modal state and update the main dashboard list upon successful assignment without a full page reload.

## 8.3.0.0 Technical Risks

- Latency in fetching real-time technician status could make the displayed information stale.
- Potential for deadlocks if the database transaction for assignment is not designed carefully.

## 8.4.0.0 Integration Points

- Database: Update the `service_requests` table.
- Notification Service: Trigger a push notification.
- Audit Service: Log the assignment event.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify successful assignment and status change.
- Verify that the correct technician receives a notification.
- Verify that the 'Assign' option is unavailable for requests in non-assignable states.
- Test the race condition scenario with concurrent requests.
- Verify role-based access control prevents unauthorized users from assigning tickets.

## 9.3.0.0 Test Data Needs

- A test Service Center Admin user.
- Multiple test Technician users associated with the service center, with varying availability statuses.
- Service requests in 'Acknowledged', 'Resolved', and other states.

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- React Testing Library for frontend component tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing completed successfully
- User interface reviewed and approved by UX/Product
- Performance requirements verified under simulated load
- Security requirements validated (RBAC enforced)
- Documentation for the API endpoint is updated in the OpenAPI spec
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core workflow feature and a dependency for subsequent technician-facing stories. It should be prioritized early in the development cycle for this feature set.

## 11.4.0.0 Release Impact

- Critical for the Minimum Viable Product (MVP) release of the Service Center Panel.

