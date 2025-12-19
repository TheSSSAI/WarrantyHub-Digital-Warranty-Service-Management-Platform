# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-048 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Assigns a Request to a Techni... |
| As A User Story | As a Service Center Admin, I want to assign an inc... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Improves operational efficiency by enabling inform... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully assign an unassigned service request to an available technician

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am logged in as a Service Center Admin and am viewing a service request with the status 'Acknowledged'

### 3.1.5 When

I initiate the 'Assign Technician' action for that request

### 3.1.6 And

The assignment action is recorded in the service request's audit trail, including the admin's ID, technician's ID, and timestamp.

### 3.1.7 Then

The service request's status must be updated to 'Technician Assigned'

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician list displays correct availability and workload information

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a Service Center Admin in the technician assignment view

### 3.2.5 When

I view the list of technicians

### 3.2.6 Then

Each technician entry must display their full name, a visual indicator of their availability (e.g., 'Available', 'On a Job', 'Off Duty'), and a count of their currently assigned open tickets for the day.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempting to assign a request that is already assigned

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am a Service Center Admin viewing a service request with a status of 'Technician Assigned' or later

### 3.3.5 When

I view the actions available for the request

### 3.3.6 Then

The 'Assign Technician' action must be disabled or replaced with a 'Re-assign Technician' action.

### 3.3.7 Validation Notes

This story focuses on the initial assignment. The re-assignment flow is covered in US-102.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Deactivated technicians do not appear in the assignment list

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

My service center has technicians whose profiles are marked as 'deactivated'

### 3.4.5 When

I open the 'Assign Technician' interface for any service request

### 3.4.6 Then

The list of available technicians must not include any deactivated technicians.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Assignment action fails due to a server or network error

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a Service Center Admin and I have confirmed a technician assignment

### 3.5.5 When

The backend API call fails to complete successfully

### 3.5.6 Then

I must be shown a non-technical error message, such as 'Assignment failed. Please try again.'

### 3.5.7 And

The service request's status must remain 'Acknowledged' and no technician should be assigned, ensuring data consistency.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Assign Technician' button on the service request details page (for unassigned requests).
- A modal or dedicated panel for technician selection.
- A list of technicians within the modal.
- A search/filter bar within the modal to find technicians by name.
- A 'Confirm Assignment' button.
- A 'Cancel' button to close the assignment modal without making changes.

## 4.2.0 User Interactions

- Admin clicks 'Assign Technician' to open the selection modal.
- Admin can scroll or search through the list of technicians.
- Admin clicks on a technician to select them.
- Admin clicks 'Confirm Assignment' to finalize the action.

## 4.3.0 Display Requirements

- The technician selection modal must display each technician's name, availability status (e.g., color-coded badge), and current workload (e.g., '3 jobs').
- After successful assignment, the service request details page must be updated to show the assigned technician's name and the new status.

## 4.4.0 Accessibility Needs

- The technician selection modal must be keyboard navigable.
- Color-coded status indicators must be accompanied by text labels to comply with WCAG standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service request can only be assigned to an active technician belonging to the same service center that received the request.

### 5.1.3 Enforcement Point

Backend API (service layer).

### 5.1.4 Violation Handling

The API will return a 403 Forbidden or 400 Bad Request error if an admin from Service Center A attempts to assign a technician from Service Center B.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A service request can only be assigned if its current status is 'Requested' or 'Acknowledged'.

### 5.2.3 Enforcement Point

Backend API and Frontend UI (disabling the button).

### 5.2.4 Violation Handling

The API will return a 409 Conflict error if an attempt is made to assign an already-assigned ticket. The UI will prevent the action.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-046

#### 6.1.1.2 Dependency Reason

Requires the interface to view and select an incoming service request.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-049

#### 6.1.2.2 Dependency Reason

Requires the ability to manage a roster of technicians that can be assigned to requests.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-101

#### 6.1.3.2 Dependency Reason

Requires the backend logic and data model to determine and display technician availability and workload, which is a core part of the assignment decision.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint for assignment (e.g., PATCH /api/v1/service-requests/{id}/assign).
- Database schema with a foreign key from `service_requests` to `technicians`.
- Integration with Azure Service Bus for dispatching asynchronous notification events.
- Integration with the Push Notification Service (FCM) to deliver alerts to technician and user mobile apps.

## 6.3.0.0 Data Dependencies

- Requires existing service request records in an 'Acknowledged' state.
- Requires existing active technician records associated with the service center.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The technician selection modal, including all technician availability data, must load in under 1.5 seconds.
- The API response time for the assignment action must be under 500ms (P95).

## 7.2.0.0 Security

- The assignment API endpoint must be protected by Role-Based Access Control (RBAC), accessible only by users with the 'Service Center Admin' role.
- The endpoint must enforce data tenancy, ensuring an admin can only assign technicians from their own service center.

## 7.3.0.0 Usability

- The process of assigning a technician should take no more than 3 clicks from the service request details view.

## 7.4.0.0 Accessibility

- All UI components must comply with WCAG 2.1 Level AA.

## 7.5.0.0 Compatibility

- The Service Center web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Real-time calculation and display of technician availability and workload.
- Ensuring the assignment process is an atomic transaction (database update, notification event, audit log).
- Frontend state management to reflect the updated request status without a full page reload.

## 8.3.0.0 Technical Risks

- Potential for performance degradation when calculating availability for a large number of technicians. Caching strategies for workload data may be necessary.
- Ensuring the reliability of the asynchronous notification delivery.

## 8.4.0.0 Integration Points

- Service Request Microservice (to update the ticket).
- User/Technician Microservice (to fetch technician data).
- Notification Microservice (to trigger push notifications).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify a request can be assigned to a technician with zero current jobs.
- Verify a request can be assigned to a technician who already has other jobs.
- Verify the UI correctly reflects the new status and assigned technician after assignment.
- End-to-end test: Admin assigns job -> Technician logs in and sees the new job in their list.
- Negative test: Attempt to assign a request using an admin account from a different service center.

## 9.3.0.0 Test Data Needs

- A test service center with at least 5 technicians.
- Technicians with varying workloads (0, 1, 5+ assigned jobs).
- At least one 'deactivated' technician.
- Multiple service requests in 'Acknowledged' status.

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- React Testing Library for frontend component tests.
- Cypress for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit test coverage for new logic is at or above 80%
- Integration tests for the assignment workflow are implemented and passing
- E2E test scenario for successful assignment is automated and passing
- User interface reviewed and approved by the Product Owner and a UX designer
- Performance of the technician list and assignment API meets specified requirements
- RBAC and data tenancy security requirements are validated
- API documentation (Swagger/OpenAPI) is updated
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core workflow for service centers and a blocker for the end-to-end service lifecycle.
- Confirm that prerequisite stories US-046, US-049, and US-101 are completed in a prior or the same sprint.

## 11.4.0.0 Release Impact

- Enables the primary dispatch functionality for service centers, which is critical for the platform's value proposition.

