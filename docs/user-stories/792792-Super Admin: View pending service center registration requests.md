# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-009 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: View pending service center registrat... |
| As A User Story | As a Super Admin, I want to view a clear and organ... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Enables the platform to scale its service network ... |
| Functional Area | Super Admin Portal |
| Story Theme | Service Center Onboarding & Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Displaying a list of pending service center requests

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin and there are multiple service center registration requests with a 'pending approval' status in the system

### 3.1.5 When

I navigate to the 'Service Center Management' section and select the 'Pending Requests' view

### 3.1.6 Then

I must see a paginated table listing all service centers with a 'pending approval' status.

### 3.1.7 And

Each row in the table must have a clickable 'Review' button or be a clickable link to navigate to the detailed view of that specific request.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

No pending requests are available

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

I am a logged-in Super Admin

### 3.2.5 And

There are no service center registration requests with a 'pending approval' status in the system

### 3.2.6 When

I navigate to the 'Pending Requests' view

### 3.2.7 Then

The system must display a clear, user-friendly message, such as 'There are no pending service center registration requests at this time.' instead of an empty table.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Pagination for a large number of requests

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am a logged-in Super Admin viewing the pending requests list

### 3.3.5 And

Clicking on 'Next' or a page number correctly loads and displays the corresponding set of requests.

### 3.3.6 When

I scroll to the bottom of the table

### 3.3.7 Then

I must see pagination controls (e.g., 'Previous', 'Next', page numbers).

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Data loading state

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am a logged-in Super Admin

### 3.4.5 When

I navigate to the 'Pending Requests' view and the data is being fetched from the server

### 3.4.6 Then

A visual loading indicator (e.g., a spinner or skeleton screen) must be displayed until the data is loaded or an error occurs.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

API call fails to retrieve data

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a logged-in Super Admin

### 3.5.5 When

I navigate to the 'Pending Requests' view and the backend API call fails

### 3.5.6 Then

The loading indicator must disappear and a user-friendly error message must be displayed, such as 'Could not load requests. Please try again later.'

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Unauthorized access attempt

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am a logged-in user who does not have the 'Super Admin' role (e.g., Brand Admin, User)

### 3.6.5 When

I attempt to access the URL for the 'Pending Service Center Requests' page

### 3.6.6 Then

I must be redirected to an 'Access Denied' page or my default dashboard, and I must not see the pending requests list.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Data table with sortable headers
- Pagination controls (Next, Previous, Page numbers)
- 'Review' button for each row
- Loading state indicator (e.g., spinner)
- Empty state message container
- Error message container

## 4.2.0 User Interactions

- Clicking a column header sorts the table by that column.
- Clicking the 'Review' button navigates the user to the detailed request view (covered in US-010).
- Clicking pagination controls updates the table with the data for the selected page.

## 4.3.0 Display Requirements

- The page title must clearly indicate its purpose, e.g., 'Pending Service Center Registrations'.
- Dates should be displayed in a consistent, human-readable format (e.g., 'Jan 15, 2025').

## 4.4.0 Accessibility Needs

- The page must comply with WCAG 2.1 Level AA standards.
- The data table must use proper semantic HTML (`<table>`, `<thead>`, `<th>`, `<tbody>`).
- All interactive elements (buttons, links, sortable headers) must be keyboard-focusable and have clear focus indicators.
- Loading states and error messages must be announced by screen readers.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "Only service center accounts with a status of 'pending approval' shall appear in this list.", 'enforcement_point': 'Backend API query', 'violation_handling': "Requests with other statuses (e.g., 'Approved', 'Rejected') are filtered out and never sent to the frontend for this view."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Super Admin must be able to log in to access any part of the admin portal.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-XXX (Implied)

#### 6.1.2.2 Dependency Reason

A mechanism for service centers to submit registration requests must exist before they can be viewed. This implies a 'Service Center Registration Form' story.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (`GET /api/v1/admin/service-centers?status=pending`) to fetch the list of pending requests.
- Database schema for service centers must include a 'status' field and all required data points (name, location, contact, submission date).
- Role-Based Access Control (RBAC) middleware to protect the API endpoint and frontend route.

## 6.3.0.0 Data Dependencies

- Requires test data in the database with service centers in 'pending approval', 'approved', and 'rejected' states to validate filtering.

## 6.4.0.0 External Dependencies

- Azure Active Directory B2C for authenticating the Super Admin's session.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint to fetch the list must have a 95th percentile (P95) response time of less than 250ms.
- The page's Largest Contentful Paint (LCP) must be under 2.5 seconds.

## 7.2.0.0 Security

- Access to the API endpoint and the corresponding UI page must be strictly restricted to users with the 'Super Admin' role.
- API responses must not include sensitive data beyond what is necessary for the list view (e.g., no passwords, internal notes).

## 7.3.0.0 Usability

- The list must be easy to scan and understand, allowing the admin to quickly identify new requests.
- Pagination should be intuitive and prevent user confusion when dealing with large datasets.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The web portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Standard CRUD 'Read' operation with filtering and pagination.
- Requires a simple frontend data table component.
- Complexity could increase slightly if a reusable, feature-rich table component needs to be built from scratch.

## 8.3.0.0 Technical Risks

- Potential for slow query performance if the `service_centers` table grows very large and the 'status' and 'submission_date' columns are not properly indexed.

## 8.4.0.0 Integration Points

- Frontend Super Admin portal integrates with the backend API.
- Backend API integrates with the PostgreSQL database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify that only requests with 'pending approval' status are displayed.
- Verify that the empty state message appears when no pending requests exist.
- Verify that pagination works correctly when the number of requests exceeds the page size.
- Verify that sorting by submission date works as expected.
- Verify that a non-Super Admin user receives an access denied error when trying to access the page/API.

## 9.3.0.0 Test Data Needs

- A set of service center records with various statuses ('pending approval', 'approved', 'rejected').
- A large number of 'pending approval' records (e.g., >50) to test pagination.
- A user account with 'Super Admin' role and another without.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests implemented for both frontend and backend, achieving >80% coverage
- Integration testing for the API endpoint completed successfully
- E2E tests covering the user flow are passing
- User interface reviewed and approved by a UX/UI designer
- Performance requirements (API latency, LCP) verified
- Security requirements (RBAC) validated
- Accessibility audit passed against WCAG 2.1 AA
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the service center onboarding workflow.
- It is a prerequisite for the approval (US-010) and rejection (US-112) stories, so it should be prioritized to unblock them.

## 11.4.0.0 Release Impact

Core functionality for the initial platform launch (MVP). The platform cannot onboard new service centers without this feature.

