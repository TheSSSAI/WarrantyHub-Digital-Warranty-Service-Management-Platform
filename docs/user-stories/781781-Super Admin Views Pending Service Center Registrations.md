# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-004 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Views Pending Service Center Registrat... |
| As A User Story | As a Super Admin, I want to view a clear, paginate... |
| User Persona | Super Admin: A high-privilege platform administrat... |
| Business Value | Enables the platform to scale its service network ... |
| Functional Area | Super Admin Portal |
| Story Theme | Service Center Onboarding & Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Displaying a list of pending service center registrations

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Super Admin is logged into the Super Admin portal

### 3.1.5 When

the Super Admin navigates to the 'Service Center Management > Pending Registrations' section

### 3.1.6 Then

the system displays a table listing all service center registrations with a 'Pending' status.

### 3.1.7 Validation Notes

Verify that the API call `GET /api/v1/admin/service-centers?status=pending` is made and the response data is rendered in the table.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Table content and default sorting

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the list of pending service center registrations is displayed

### 3.2.5 When

the Super Admin views the table

### 3.2.6 Then

the table must contain the following sortable columns: 'Service Center Name', 'City', 'State/Region', and 'Submission Date'.

### 3.2.7 And

the list is sorted by 'Submission Date' in descending order (newest first) by default.

### 3.2.8 Validation Notes

Inspect the table columns and their content. Check the network request parameters to ensure the default sort order is applied.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Pagination for a large number of requests

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

there are more pending registrations than the page limit (e.g., more than 20)

### 3.3.5 When

the Super Admin views the pending registrations list

### 3.3.6 Then

the table displays only the first page of results.

### 3.3.7 And

pagination controls (e.g., 'Next', 'Previous', page numbers) are visible and functional at the bottom of the table.

### 3.3.8 Validation Notes

Seed the database with 25+ pending registrations. Verify that only 20 are shown initially and that clicking 'Next' or page '2' loads the subsequent set of records.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Navigating to review a specific registration

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the list of pending service center registrations is displayed

### 3.4.5 When

the Super Admin clicks the 'Review' button on a specific row

### 3.4.6 Then

the system navigates the admin to the detailed view page for that specific service center's registration application.

### 3.4.7 Validation Notes

This validates the UI routing. The target page is likely implemented in US-005/US-006, but the link/button and its routing must work here.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Empty state with no pending registrations

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a Super Admin is logged into the portal

### 3.5.5 And

there are no service center registrations with a 'Pending' status in the system

### 3.5.6 When

the Super Admin navigates to the pending registrations page

### 3.5.7 Then

the system displays a clear, user-friendly message such as 'There are no pending service center registrations at this time.' instead of an empty table.

### 3.5.8 Validation Notes

Ensure the database contains no records with status='Pending'. Verify the empty state message is displayed correctly.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

API failure when fetching data

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a Super Admin is on the pending registrations page

### 3.6.5 When

the backend API call to fetch the list of registrations fails or times out

### 3.6.6 Then

the system displays a user-friendly error message, such as 'Could not load registration requests. Please try again later.'

### 3.6.7 Validation Notes

Use browser developer tools to mock a 500 server error for the API endpoint and verify the UI response.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Unauthorized access attempt

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a user with a role other than 'Super Admin' (e.g., 'Brand Admin') is logged in

### 3.7.5 When

the user attempts to access the pending service center registrations URL directly

### 3.7.6 Then

the system must prevent access and display a 'Permission Denied' error or redirect them to their own dashboard.

### 3.7.7 Validation Notes

Log in as a Brand Admin and attempt to navigate to the URL. Verify the API endpoint returns a 403 Forbidden status for this user's token.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table with sortable column headers.
- Pagination controls (page numbers, next/previous buttons).
- A 'Review' button for each row in the table.
- A dedicated message container for empty state and error messages.

## 4.2.0 User Interactions

- Clicking on a column header sorts the table by that column.
- Clicking on pagination controls loads the corresponding page of data.
- Clicking the 'Review' button navigates the user to a different page.

## 4.3.0 Display Requirements

- The number of currently displayed items and the total number of items should be shown (e.g., 'Showing 1-20 of 55').
- The currently active sort column and direction should be visually indicated (e.g., with an arrow icon).

## 4.4.0 Accessibility Needs

- The data table must use `<th>` for headers with `scope` attributes.
- All interactive elements (buttons, links, sort headers) must be keyboard-focusable and operable.
- The page must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "Only registrations with a status of 'Pending' shall be displayed on this page.", 'enforcement_point': 'Backend API query', 'violation_handling': "Data with other statuses (e.g., 'Approved', 'Rejected') is filtered out and never sent to the client for this view."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-XXX (Unspecified)

#### 6.1.1.2 Dependency Reason

A mechanism for service centers to submit their registration application must exist first. This story consumes the data created by that process.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-XXX (Unspecified)

#### 6.1.2.2 Dependency Reason

The core Super Admin portal, including login and basic navigation, must be in place.

## 6.2.0.0 Technical Dependencies

- A backend REST API endpoint to fetch, filter, sort, and paginate service center data.
- The shared authentication service (Azure AD B2C) to issue JWTs.
- The shared authorization module (RBAC) to protect the endpoint.

## 6.3.0.0 Data Dependencies

- The `service_centers` table in the PostgreSQL database must exist with a `status` column (e.g., ENUM type with 'Pending', 'Approved', 'Rejected') and a `submission_date` timestamp.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for fetching the list must have a 95th percentile (P95) latency below 250ms.
- The web page must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- Access to the API endpoint and the UI page must be strictly restricted to users with the 'Super Admin' role.
- Role-based access control (RBAC) must be enforced at both the API Gateway and the microservice level.

## 7.3.0.0 Usability

- The interface should be intuitive, requiring no special training for a Super Admin to understand how to view and navigate the list.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The web portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- This is a standard list-view feature with common functionality (sorting, pagination).
- Complexity is low assuming a standard component library is available for the frontend table and a framework like NestJS/TypeORM is used for the backend.
- Security implementation (RBAC) is critical but should leverage existing platform patterns.

## 8.3.0.0 Technical Risks

- Inefficient database query could lead to poor performance as the number of pending registrations grows. The `status` and `submission_date` columns should be indexed.

## 8.4.0.0 Integration Points

- Frontend client integrates with the backend Admin API.
- Backend Admin API integrates with the authentication service to validate JWT and user role.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify list displays correctly with multiple pending items.
- Verify pagination works as expected.
- Verify sorting on each column works in both ascending and descending order.
- Verify the empty state message is shown when no items are pending.
- Verify the error message is shown on API failure.
- Verify a non-Super Admin user cannot access the page or its API endpoint.

## 9.3.0.0 Test Data Needs

- A set of at least 25 service center records with 'Pending' status to test pagination.
- At least one service center record with 'Approved' status to ensure it's correctly filtered out.
- User accounts with 'Super Admin' and 'Brand Admin' roles for testing access control.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests implemented for both frontend and backend, achieving >80% code coverage for new logic
- Integration testing for the API endpoint completed successfully
- E2E tests covering happy path, empty state, and error conditions are passing
- User interface is responsive and reviewed for UX consistency
- Performance requirements (API latency, LCP) are verified
- Security requirements (RBAC) are validated through automated and manual tests
- Accessibility audit passed against WCAG 2.1 AA standards
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a foundational requirement for the service center onboarding workflow.
- It is a blocker for US-005 (Approve Registration) and US-006 (Reject Registration).

## 11.4.0.0 Release Impact

- This feature is essential for the initial launch (MVP) as it enables the core business process of growing the service network.

