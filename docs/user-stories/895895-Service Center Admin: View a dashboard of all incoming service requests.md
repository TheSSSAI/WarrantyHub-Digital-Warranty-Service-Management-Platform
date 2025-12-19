# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-061 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: View a dashboard of all inco... |
| As A User Story | As a Service Center Admin, I want to view a centra... |
| User Persona | Service Center Admin: An operations manager respon... |
| Business Value | Enables efficient service request management, impr... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful display of service requests on the dashboard

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Service Center Admin for 'City Electronics' service center

### 3.1.5 When

I navigate to the main dashboard page

### 3.1.6 Then

The system displays a list of all service requests currently assigned to 'City Electronics'.

### 3.1.7 Validation Notes

Verify by logging in as the admin and comparing the displayed list against a known set of requests for that center in the database.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Dashboard displays essential information for each request

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the service request dashboard

### 3.2.5 When

I look at any service request in the list

### 3.2.6 Then

I must see the following details at a minimum: Ticket ID, Customer Name, Product (Brand & Model), Status, and Date Created.

### 3.2.7 Validation Notes

UI inspection to confirm all required data fields are present and correctly populated for each list item.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Data is correctly scoped to the admin's service center

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in Service Center Admin for 'City Electronics'

### 3.3.5 And Given

A new service request has been created and assigned to a different center, 'Metro Repairs'

### 3.3.6 When

I view my dashboard

### 3.3.7 Then

I must NOT see the service request assigned to 'Metro Repairs'.

### 3.3.8 Validation Notes

Requires a test setup with at least two service centers. Log in as one admin and verify that no data from the other center is visible. This is a critical security and data integrity test.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Dashboard handles the 'no service requests' state gracefully

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am a logged-in Service Center Admin

### 3.4.5 And Given

There are zero service requests assigned to my center

### 3.4.6 When

I navigate to the dashboard

### 3.4.7 Then

The system should display a clear, user-friendly message, such as 'There are no active service requests at this time', instead of a blank table or an error.

### 3.4.8 Validation Notes

Test by ensuring a service center has no associated requests and verifying the UI displays the specified message.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Navigation to service request details

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am viewing the service request dashboard with a list of requests

### 3.5.5 When

I click on a specific service request entry (e.g., its row or a 'View' button)

### 3.5.6 Then

I am navigated to the detailed view page for that specific service request.

### 3.5.7 Validation Notes

E2E test: Log in, click a request on the dashboard, and verify the URL and page content correspond to the correct service request details.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Dashboard displays summary metrics

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

My service center has 3 requests with 'Requested' status and 8 with 'Work In Progress' status

### 3.6.5 When

I view the dashboard

### 3.6.6 Then

I should see summary widgets or cards at the top of the page indicating counts for key statuses, such as 'New Requests: 3' and 'In Progress: 8'.

### 3.6.7 Validation Notes

Verify that the counts in the summary widgets accurately reflect the status distribution of the requests listed below them.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

System handles API failure when loading dashboard

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I am a logged-in Service Center Admin

### 3.7.5 When

I navigate to the dashboard and the backend API call to fetch requests fails

### 3.7.6 Then

The system must display a user-friendly error message (e.g., 'Could not load service requests. Please try again.') and not crash.

### 3.7.7 Validation Notes

Use browser developer tools to mock a 500 server error for the API endpoint and verify the UI's response.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Summary cards/widgets for key metrics (e.g., New, Unassigned, In Progress).
- A data table or list view to display service requests.
- Pagination controls if the number of requests exceeds a set limit (e.g., 25 per page).
- Column headers for the data table (Ticket ID, Customer, Product, Status, Date).
- Color-coded status tags for at-a-glance identification.
- A loading indicator (spinner or skeleton screen) to show while data is being fetched.

## 4.2.0 User Interactions

- The entire row for a service request should be clickable to navigate to its detail page.
- Hovering over a request row should provide a visual cue.
- The dashboard should load the latest data upon initial page load and on manual refresh.

## 4.3.0 Display Requirements

- Service requests should be sorted by creation date in descending order by default (newest first).
- Dates and times should be displayed in a user-friendly, localized format.

## 4.4.0 Accessibility Needs

- The dashboard must be navigable using only a keyboard.
- All interactive elements must have clear focus indicators.
- Color-coded statuses must be accompanied by text labels to meet WCAG 2.1 AA contrast and information requirements.
- The data table must use proper semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<tr>`, `<td>`) for screen reader compatibility.

# 5.0.0 Business Rules

- {'rule_id': 'BR-SC-01', 'rule_description': 'A Service Center Admin can only view service requests that have been routed and assigned to their specific service center.', 'enforcement_point': 'Backend API (Data Access Layer)', 'violation_handling': 'The API query must include a `WHERE service_center_id = [current_user_center_id]` clause. Any attempt to access data outside this scope should result in an empty set or a 403 Forbidden error.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-060

#### 6.1.1.2 Dependency Reason

User must be able to log in to access the dashboard.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-098

#### 6.1.2.2 Dependency Reason

The system must have the logic to route and assign service requests to a service center before they can be displayed.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-036

#### 6.1.3.2 Dependency Reason

Users must be able to create service requests for them to appear on the dashboard.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., GET /api/v1/service-requests) that supports filtering by service center ID and pagination.
- The authentication service (Azure AD B2C) must provide the user's role and associated service center ID in the JWT or a user profile endpoint.
- A robust Role-Based Access Control (RBAC) mechanism enforced at the API Gateway or microservice level.

## 6.3.0.0 Data Dependencies

- The database must contain service center records, user accounts with the 'Service Center Admin' role, and service request records with a clear association to a service center.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint fetching the dashboard data must have a 95th percentile (P95) response time of less than 250ms.
- The web page for the dashboard must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- All API requests must be authenticated and authorized.
- The API must strictly enforce that a Service Center Admin can only access data for their own service center (prevent horizontal privilege escalation).

## 7.3.0.0 Usability

- The dashboard must provide a clear and immediate overview of the current workload without requiring excessive clicking or navigation.

## 7.4.0.0 Accessibility

- The dashboard must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing the backend data query with joins to related tables (users, products) while maintaining performance.
- Ensuring the RBAC and data scoping logic is secure and correctly implemented across the stack.
- Developing a responsive and accessible frontend data table component.
- Implementing efficient pagination on both the backend and frontend.

## 8.3.0.0 Technical Risks

- A poorly optimized database query could lead to slow dashboard load times as the number of service requests grows.
- A flaw in the data scoping logic could lead to a serious data leak between service centers.

## 8.4.0.0 Integration Points

- Authentication Service (Azure AD B2C) for user identity and role.
- Service Request Microservice for fetching the core data.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify dashboard loads with correct data for a specific admin.
- Verify dashboard shows an empty state message when there is no data.
- Verify dashboard shows an error message on API failure.
- CRITICAL: Verify an admin from Center A cannot see data from Center B by any means (API manipulation, etc.).
- Verify pagination works correctly.
- Verify navigation to the detail page from a dashboard item.

## 9.3.0.0 Test Data Needs

- At least two distinct service centers with their own admins.
- A set of service requests assigned to each service center, with varying statuses.
- A service center with zero assigned requests.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend integration tests.
- Playwright for E2E tests.
- Tools for security vulnerability scanning (e.g., OWASP ZAP).

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the project standard (e.g., 80%).
- E2E tests for all scenarios, including the critical data scoping test, are written and passing.
- The dashboard UI has been reviewed and approved by a UX/UI designer.
- Performance benchmarks for the API and frontend load times are met.
- The feature has been successfully deployed and verified in the staging environment.
- No critical or high-severity accessibility issues are found.
- Relevant documentation (e.g., API spec) has been updated.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the Service Center portal and blocks other management features (assigning, filtering, etc.). It should be prioritized in an early sprint.
- Requires both frontend and backend development effort, which can be parallelized once the API contract is defined.

## 11.4.0.0 Release Impact

This feature is essential for the Minimum Viable Product (MVP) of the Service Center Admin portal.

