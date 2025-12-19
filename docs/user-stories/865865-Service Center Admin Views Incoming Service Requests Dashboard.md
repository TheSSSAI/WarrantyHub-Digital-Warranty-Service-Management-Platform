# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-046 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Views Incoming Service Reques... |
| As A User Story | As a Service Center Admin, I want to view a dashbo... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Improves operational efficiency by providing a cen... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful display of service requests for an authenticated admin

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Service Center Admin is authenticated and logged into the Service Center web panel

### 3.1.5 When

the admin navigates to the main dashboard or 'Service Requests' page

### 3.1.6 Then

a list of all service requests assigned to their specific service center is displayed.

### 3.1.7 Validation Notes

Verify that the API call fetches requests only for the logged-in admin's service_center_id. The list should be populated with data.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Default sorting of service requests

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the service request dashboard is displayed

### 3.2.5 When

the page initially loads

### 3.2.6 Then

the service requests are sorted by creation date in descending order (newest first).

### 3.2.7 Validation Notes

Check the API response or the rendered list to confirm the default sort order is by 'created_at' descending.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Required information is visible for each request

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the service request dashboard is displayed with at least one request

### 3.3.5 When

the admin views a request in the list

### 3.3.6 Then

the following details are clearly visible for that request: Ticket ID, Customer Name, Product (Brand & Model), Status, and Request Date.

### 3.3.7 Validation Notes

Inspect a row in the UI to ensure all specified fields are present and correctly populated.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Display of assigned technician information

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a service request has been assigned to a technician

### 3.4.5 When

the admin views the dashboard

### 3.4.6 Then

the name of the assigned technician is displayed for that request.

### 3.4.7 Validation Notes

Test with a ticket that has a technician_id associated with it. The technician's name should appear.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Display for unassigned requests

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

a new service request has not yet been assigned to a technician

### 3.5.5 When

the admin views the dashboard

### 3.5.6 Then

the 'Assigned Technician' field for that request is clearly marked as 'Unassigned'.

### 3.5.7 Validation Notes

Test with a newly created ticket that has a null technician_id. The UI should show 'Unassigned' or similar text.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Dashboard view with no service requests

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a Service Center Admin is logged in

### 3.6.5 And

their service center has no new or ongoing service requests

### 3.6.6 When

the admin navigates to the dashboard

### 3.6.7 Then

a user-friendly message is displayed, such as 'There are no service requests at this time.', instead of an empty table.

### 3.6.8 Validation Notes

Test with a service center that has zero associated tickets in the database. The empty state UI should render correctly.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Data isolation between service centers

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

there are multiple service centers on the platform with active requests

### 3.7.5 When

an admin from 'Service Center A' views their dashboard

### 3.7.6 Then

they must only see requests assigned to 'Service Center A' and must not see any requests assigned to 'Service Center B'.

### 3.7.7 Validation Notes

This requires a robust security test. Use two different admin accounts from two different centers and verify that neither can access the other's data via the UI or by manipulating API calls.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Pagination for a large number of requests

### 3.8.3 Scenario Type

Happy_Path

### 3.8.4 Given

a service center has more than 25 service requests

### 3.8.5 When

the admin views the dashboard

### 3.8.6 Then

the list is paginated, showing only the first 25 requests.

### 3.8.7 And

pagination controls (e.g., 'Next', 'Previous', page numbers) are visible and functional.

### 3.8.8 Validation Notes

Seed the database with 30+ requests for a single service center and verify that only 25 are shown on the first page and that the pagination controls work as expected.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table or list view for service requests.
- Pagination controls.
- Visually distinct status badges/tags for each request (e.g., color-coded for 'Requested', 'Acknowledged', 'Technician Assigned').
- A message component for the 'no requests' empty state.

## 4.2.0 User Interactions

- Each row in the service request list should be a clickable link that navigates to the detailed view of that ticket.
- Hovering over a row should provide a visual cue that it is interactive.

## 4.3.0 Display Requirements

- The dashboard must clearly display the name of the service center the admin is managing.
- Dates should be formatted in a user-friendly way (e.g., 'Jan 15, 2025').

## 4.4.0 Accessibility Needs

- The data table must be accessible, using proper `<table>`, `<thead>`, `<tbody>`, and `<th>` tags with scope attributes.
- Color-coded statuses must be accompanied by text labels to be accessible to color-blind users.
- All interactive elements must be keyboard-navigable and have clear focus states.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A Service Center Admin can only view service requests that are geographically routed and assigned to their specific service center.', 'enforcement_point': 'API Gateway and Backend Service Layer', 'violation_handling': 'The API must return a 403 Forbidden or 404 Not Found error if an admin attempts to access data outside their scope.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-037

#### 6.1.1.2 Dependency Reason

A mechanism to create service requests must exist before they can be viewed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-005

#### 6.1.2.2 Dependency Reason

A service center must be approved and exist in the system.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-007

#### 6.1.3.2 Dependency Reason

The service center must be linked to a brand to receive requests for that brand's products.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-049

#### 6.1.4.2 Dependency Reason

A mechanism to manage technicians must exist to display technician names.

## 6.2.0.0 Technical Dependencies

- A secure API endpoint (e.g., GET /api/v1/service-center/requests) to fetch service requests.
- The authentication service (Azure AD B2C) must provide the user's role and associated service_center_id in the JWT.
- Database schema for Service Requests, Users, Products, and Technicians must be finalized.

## 6.3.0.0 Data Dependencies

- Test data for multiple service centers, brands, and service requests is required for thorough testing of data isolation and pagination.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for fetching requests must have a 95th percentile (P95) response time of less than 250ms.
- The dashboard web page must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- Access to the dashboard and its underlying API must be strictly controlled by Role-Based Access Control (RBAC).
- The API must derive the service center ID from the authenticated user's server-side session/token, not from a client-provided parameter, to prevent enumeration attacks.

## 7.3.0.0 Usability

- The dashboard must provide an at-a-glance understanding of the current workload without requiring excessive clicking or navigation.

## 7.4.0.0 Accessibility

- The interface must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge, and be responsive down to tablet screen sizes.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend: Implementing a performant database query with joins across multiple tables (requests, users, products, technicians).
- Backend: Ensuring the RBAC and data tenancy logic is robust and secure.
- Frontend: Handling different states of the dashboard (loading, empty, with data, error).

## 8.3.0.0 Technical Risks

- Poor database query performance as the number of service requests grows. Proper indexing on foreign keys (service_center_id) and sort keys (created_at) is critical.
- Security vulnerability if data scoping is not correctly implemented on the backend.

## 8.4.0.0 Integration Points

- Authentication Service (Azure AD B2C) to get user identity and roles.
- Primary Database (Azure PostgreSQL) to fetch service request data.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Performance

## 9.2.0.0 Test Scenarios

- Verify an admin can see a newly created ticket for their center.
- Verify an admin cannot see a ticket for another center.
- Verify the empty state message when no tickets exist.
- Verify pagination works correctly with a large dataset.
- Verify that an unauthenticated user receives a 401 error when accessing the API.
- Verify that a user with a different role (e.g., Consumer) receives a 403 error.

## 9.3.0.0 Test Data Needs

- An account for a Service Center Admin.
- At least two service centers with associated admin accounts.
- Multiple service requests assigned to each service center, with varying statuses (new, assigned).
- A service center with zero requests.
- A service center with >25 requests to test pagination.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.
- Postman or similar for API security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit test coverage for new logic meets the 80% project standard
- Integration tests for the API endpoint are implemented and passing
- E2E test scenario for viewing the dashboard is automated and passing
- User interface is responsive and approved by the design team
- API performance meets the P95 < 250ms requirement under load
- Security review confirms data is properly isolated between tenants
- All UI components meet WCAG 2.1 AA accessibility standards
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the Service Center Admin portal. It blocks other stories like US-047 (Filter Requests) and US-048 (Assign Request).
- Requires collaboration between frontend and backend developers to define the API contract early.

## 11.4.0.0 Release Impact

This feature is critical for the Minimum Viable Product (MVP) of the Service Center Panel.

