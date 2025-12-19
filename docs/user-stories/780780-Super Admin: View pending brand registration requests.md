# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-003 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: View pending brand registration reque... |
| As A User Story | As a Super Admin, I want to view a clear and organ... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Enables the core business process of onboarding ne... |
| Functional Area | Super Admin Portal |
| Story Theme | Brand & Service Center Onboarding |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display of pending brand requests

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Super Admin is logged into the admin portal and there are multiple brand registration requests with a 'pending approval' status in the system

### 3.1.5 When

the Super Admin navigates to the 'Brand Onboarding' or 'Pending Requests' section

### 3.1.6 Then

a table is displayed listing all and only the brand requests with the status 'pending approval'.

### 3.1.7 Validation Notes

Verify that the API call filters by status='pending approval' and the frontend renders the returned list. Check against the database to ensure no approved or rejected requests are shown.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Information displayed in the request list

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the list of pending brand requests is displayed

### 3.2.5 When

the Super Admin views the table

### 3.2.6 Then

the table must contain the following columns for each request: Brand Name, Contact Person Name, Contact Email, and Submission Date.

### 3.2.7 Validation Notes

Inspect the UI to confirm the presence and correct data population of all specified columns.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Default sorting order

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the list of pending brand requests is displayed

### 3.3.5 When

the page initially loads

### 3.3.6 Then

the requests are sorted by 'Submission Date' in ascending order (oldest requests first).

### 3.3.7 Validation Notes

Verify the API returns data sorted by submission date by default, or that the frontend performs this sort on initial load. The first item in the list should be the oldest pending request.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

No pending requests available

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a Super Admin is logged into the admin portal and there are no brand registration requests with a 'pending approval' status

### 3.4.5 When

the Super Admin navigates to the 'Pending Requests' section

### 3.4.6 Then

a user-friendly message is displayed, such as 'There are no pending brand registration requests at this time.'

### 3.4.7 Validation Notes

Ensure the empty table is not shown. The UI should display the specified message. The API should return an empty array.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Navigation to request details

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the list of pending brand requests is displayed

### 3.5.5 When

the Super Admin clicks on a row representing a specific brand request

### 3.5.6 Then

the system navigates them to the detailed view of that specific brand registration request.

### 3.5.7 Validation Notes

This confirms the list serves as an entry point for US-004 and US-005. The click action should route the user to a URL like '/admin/brands/requests/{requestId}'.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Pagination for large number of requests

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

there are more pending requests than the page size limit (e.g., 20)

### 3.6.5 When

the Super Admin views the list

### 3.6.6 Then

pagination controls (e.g., 'Next', 'Previous', page numbers) are visible and functional at the bottom of the table.

### 3.6.7 Validation Notes

Seed the database with 25+ pending requests. Verify that only 20 are shown initially and that clicking 'Next' or '2' loads the subsequent set of requests.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Unauthorized access attempt

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a user who is not a Super Admin is logged in

### 3.7.5 When

they attempt to access the URL for the pending brand requests page

### 3.7.6 Then

the system prevents access and displays an 'Access Denied' or '403 Forbidden' error page.

### 3.7.7 Validation Notes

Test by making a direct API call with a JWT token for a different role (e.g., 'Brand Admin') and verify a 403 status code is returned. Also test UI navigation.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table with sortable column headers.
- Pagination controls (if the list exceeds page size).
- A loading indicator/spinner to show while data is being fetched.
- A message display area for the 'no requests' scenario.

## 4.2.0 User Interactions

- Clicking a column header sorts the table by that column.
- Clicking a table row navigates the user to the detail page for that request.
- Interacting with pagination controls loads different pages of data.

## 4.3.0 Display Requirements

- The page must have a clear title, e.g., 'Pending Brand Registrations'.
- Dates should be displayed in a consistent, human-readable format (e.g., 'YYYY-MM-DD HH:mm').
- Long text in columns (e.g., a very long brand name) should be handled gracefully with truncation and a tooltip on hover to prevent breaking the UI layout.

## 4.4.0 Accessibility Needs

- The data table must be implemented with proper semantic HTML (`<table>`, `<thead>`, `<th>` with `scope` attributes) for screen reader compatibility.
- All interactive elements (sorting headers, rows, pagination) must be keyboard-focusable and operable.
- The page must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "Only brand registration requests with a status of 'pending approval' shall be displayed in this view.", 'enforcement_point': 'Backend API query', 'violation_handling': 'N/A - The query is designed to prevent violations.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

The Super Admin must be able to log in to the platform to access this functionality.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

Implied-Brand-Registration-Form

#### 6.1.2.2 Dependency Reason

A mechanism for brands to submit registration requests must exist to populate this list. The data model for a 'brand registration request' must be defined and implemented.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (`GET /api/v1/admin/brands/requests`) capable of filtering by status.
- A defined database schema for brand registration requests.
- The Role-Based Access Control (RBAC) middleware must be in place to secure the endpoint.

## 6.3.0.0 Data Dependencies

- The system must have a data entity for 'Brand Registration Request' with fields for brand name, contact info, submission date, and status.

## 6.4.0.0 External Dependencies

- Azure Active Directory B2C for authenticating the Super Admin's session.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint to fetch the list of pending requests must have a 95th percentile (P95) latency below 250ms.
- The page's Largest Contentful Paint (LCP) should be less than 2.5 seconds.

## 7.2.0.0 Security

- Access to this page and its backing API endpoint must be strictly restricted to users with the 'Super Admin' role.
- All communication must be over HTTPS using TLS 1.3.

## 7.3.0.0 Usability

- The list should be easy to scan and read. The default sort order should prioritize the most urgent items (oldest requests).

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA compliance.

## 7.5.0.0 Compatibility

- The web portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- This is primarily a read-only view, involving a straightforward API and a standard UI table component.
- Complexity would increase to 'Medium' if a reusable, feature-rich table component (with sorting, pagination, filtering) needs to be built from scratch.

## 8.3.0.0 Technical Risks

- Potential for slow query performance if the 'brand_requests' table grows very large and is not properly indexed on the 'status' and 'submission_date' columns.

## 8.4.0.0 Integration Points

- Frontend web portal integrates with the backend API Gateway.
- Backend service integrates with the PostgreSQL database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify list displays correctly with multiple pending requests.
- Verify the 'empty state' message appears when no requests are pending.
- Verify pagination works correctly with a dataset larger than the page size.
- Verify column sorting works for each column in both ascending and descending order.
- Verify that a non-Super Admin user receives a 403 Forbidden error when attempting to access the API endpoint.

## 9.3.0.0 Test Data Needs

- A set of brand registration requests with 'pending approval' status.
- At least one request with 'approved' status and one with 'rejected' status to ensure they are correctly filtered out.
- A dataset of 25+ pending requests to test pagination.

## 9.4.0.0 Testing Tools

- Jest & Supertest for backend unit/integration tests.
- Jest & React Testing Library for frontend component tests.
- Playwright for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >= 80% coverage and passing
- Integration testing completed successfully
- End-to-end tests for the user flow are created and passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements verified against NFRs
- Security requirements validated (RBAC enforced)
- Accessibility audit passed (WCAG 2.1 AA)
- Documentation for the API endpoint is created/updated in OpenAPI spec
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a prerequisite for the brand approval/rejection workflow (US-004, US-005) and should be prioritized accordingly.
- The data model for the 'brand registration request' entity must be finalized before development begins.

## 11.4.0.0 Release Impact

This is a foundational feature for the brand onboarding module. The platform cannot onboard new brands without it.

