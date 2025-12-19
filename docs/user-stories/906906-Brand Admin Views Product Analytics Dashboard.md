# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-066 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Brand Admin Views Product Analytics Dashboard |
| As A User Story | As a Brand Admin, I want to view a dashboard with ... |
| User Persona | Brand Admin: A business user responsible for manag... |
| Business Value | Provides an at-a-glance, data-driven overview of p... |
| Functional Area | Brand Portal |
| Story Theme | Brand Analytics & Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful display of the dashboard with all widgets

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the user is a logged-in Brand Admin

### 3.1.5 When

the user navigates to the 'Dashboard' section of the Brand Portal

### 3.1.6 Then

the system displays a dashboard page titled with the brand's name (e.g., 'ExampleBrand Analytics Dashboard')

### 3.1.7 Validation Notes

Verify the page loads and the main title is present and correct.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

'Total Registered Products' widget displays the correct count

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Brand Admin is viewing the dashboard

### 3.2.5 When

the 'Total Registered Products' widget loads

### 3.2.6 Then

it must display a single numerical value representing the total count of all products registered under that specific brand

### 3.2.7 Validation Notes

The displayed number must match the result of a direct database query for the count of products associated with the brand's ID.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

'Warranty Status' widget displays the correct breakdown

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the Brand Admin is viewing the dashboard

### 3.3.5 When

the 'Warranty Status' widget loads

### 3.3.6 Then

it must display a visual breakdown (e.g., pie chart or bar graph) with counts for 'Active' and 'Expired' warranties for the brand's products

### 3.3.7 Validation Notes

The counts for 'Active' and 'Expired' must match database queries based on the warranty_expiry_date relative to the current date.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

'Ongoing Service Requests' widget displays the correct count

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the Brand Admin is viewing the dashboard

### 3.4.5 When

the 'Ongoing Service Requests' widget loads

### 3.4.6 Then

it must display a single numerical value for the total count of service requests for the brand that are not in a 'Resolved' or 'Closed' state

### 3.4.7 Validation Notes

The count must match a database query for service requests linked to the brand's products with statuses like 'Requested', 'Acknowledged', 'Technician Assigned', 'Work In Progress', etc.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

'Average Service Resolution Time' widget displays the correct calculation

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the Brand Admin is viewing the dashboard

### 3.5.5 When

the 'Average Service Resolution Time' widget loads

### 3.5.6 Then

it must display the average time (in days or hours) calculated from ticket creation to 'Resolved' status for tickets resolved within the last 30 days

### 3.5.7 Validation Notes

The value must match a manual or scripted calculation against the database for the time difference between creation and resolution timestamps for a sample set of tickets.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Dashboard behavior for a new brand with no data

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

the user is a logged-in Brand Admin for a brand with zero registered products

### 3.6.5 When

the user navigates to the dashboard

### 3.6.6 Then

all widgets must display '0' or a clear 'No data available' message, and the page must not show any errors

### 3.6.7 Validation Notes

Verify that the UI handles the zero-data state gracefully without crashing or showing technical error codes.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Dashboard behavior when analytics data fails to load

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

the Brand Admin is navigating to the dashboard

### 3.7.5 When

the backend API endpoint for analytics data returns an error or times out

### 3.7.6 Then

each affected widget must display a user-friendly error message like 'Could not load data'

### 3.7.7 Validation Notes

Use browser developer tools to mock a 500 server error from the API and verify the UI response.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Data is scoped only to the logged-in admin's brand

### 3.8.3 Scenario Type

Security

### 3.8.4 Given

there are multiple brands with registered products on the platform

### 3.8.5 When

a Brand Admin for 'Brand A' views their dashboard

### 3.8.6 Then

all data displayed in the widgets must exclusively belong to 'Brand A' and not include any data from 'Brand B'

### 3.8.7 Validation Notes

Requires a test setup with at least two distinct brands. Verify the numbers on Brand A's dashboard are correct for Brand A, and do not change if data is added to Brand B.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A main dashboard container/page.
- Four distinct 'widget' or 'card' components for each metric.
- Numerical displays for counts.
- A chart component (e.g., pie or donut chart) for warranty status.
- Loading indicators (spinners) for each widget while data is being fetched.
- Error message displays within widgets for failed data loads.

## 4.2.0 User Interactions

- The dashboard should be the default view upon logging in or accessible via a primary navigation link.
- Hovering over chart segments should display a tooltip with the exact count and status name.

## 4.3.0 Display Requirements

- All numerical data must be clearly legible.
- Each widget must have a clear title (e.g., 'Total Registered Products').
- The dashboard layout must be responsive and adapt cleanly to desktop and tablet screen sizes.

## 4.4.0 Accessibility Needs

- All dashboard elements must comply with WCAG 2.1 Level AA.
- Charts must be accessible, with text alternatives or ARIA labels for screen readers.
- Sufficient color contrast must be used for all text and UI elements.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A Brand Admin can only view analytics data for the brand they are assigned to.

### 5.1.3 Enforcement Point

API Gateway and Backend Service Layer

### 5.1.4 Violation Handling

The API request will be rejected with a 403 Forbidden or 404 Not Found status. No data will be returned.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

'Ongoing' service requests are defined as any request not in 'Resolved' or 'Closed' status.

### 5.2.3 Enforcement Point

Backend Analytics Service (Query Logic)

### 5.2.4 Violation Handling

N/A (This is a data definition rule).

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

Requires product registration functionality to generate data for the 'Total Registered Products' widget.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-037

#### 6.1.2.2 Dependency Reason

Requires service request creation functionality to generate data for the 'Ongoing Service Requests' widget.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-057

#### 6.1.3.2 Dependency Reason

Requires the ability to resolve service requests to calculate the 'Average Service Resolution Time'.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-096

#### 6.1.4.2 Dependency Reason

Requires Brand Admin authentication and authorization to access the portal.

## 6.2.0.0 Technical Dependencies

- A backend analytics service or module capable of performing efficient data aggregation.
- A secure REST API endpoint to expose the dashboard data.
- A frontend charting library (e.g., Chart.js, Recharts) for data visualization.

## 6.3.0.0 Data Dependencies

- Access to production or production-like data for products, warranties, and service requests.
- Proper indexing on database tables (e.g., on `brand_id`, `status`, `created_at`, `resolved_at`) to ensure performant queries.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for the dashboard data must have a 95th percentile (P95) response time of less than 250ms.
- The dashboard web page must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- All API requests must be authenticated and authorized to ensure strict data tenancy.
- The system must prevent enumeration attacks or unauthorized access to other brands' data via the API.

## 7.3.0.0 Usability

- The dashboard must be intuitive and require no training for a Brand Admin to understand the key metrics.

## 7.4.0.0 Accessibility

- The interface must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Designing efficient, non-blocking database queries for data aggregation across multiple large tables.
- Potential need for a caching layer (e.g., Azure Cache for Redis) to meet performance requirements and reduce database load.
- Ensuring the data aggregation logic is accurate and handles all edge cases (e.g., tickets with no resolution date).

## 8.3.0.0 Technical Risks

- Poor query performance as data volume grows, leading to slow dashboard load times.
- Inaccurate metric calculations if the business logic in the aggregation service is flawed.

## 8.4.0.0 Integration Points

- Frontend (Next.js) calls to the Backend (NestJS) Analytics API.
- Backend Analytics Service queries the Azure Database for PostgreSQL.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Verify each widget's data against a known test dataset.
- Test the dashboard with a brand that has no products or activity.
- Test the API response when the database is unavailable.
- Run an E2E test that logs in as a Brand Admin and verifies the dashboard loads.
- Perform a security test to ensure one Brand Admin cannot access another brand's data by manipulating API requests.

## 9.3.0.0 Test Data Needs

- A test environment with at least two distinct brands.
- For each brand, a dataset including: multiple registered products, warranties with both active and expired statuses, and service requests in various states (new, in-progress, resolved).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Integration)
- Jest (Backend Unit)
- Cypress (E2E)
- K6/JMeter (Performance)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other engineer
- Unit test coverage for new logic is at or above 80%
- Integration tests for the API endpoint are implemented and passing
- E2E tests for the user flow are implemented and passing in the CI/CD pipeline
- User interface has been reviewed and approved by a UX designer or Product Owner
- Performance testing on the API endpoint confirms it meets the P95 latency requirement
- Security scan or manual penetration test confirms no data leakage between tenants
- All code is merged into the main branch
- Story is deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The API contract between the frontend and backend should be defined early in the sprint.
- Backend work on the data aggregation service can begin immediately.
- Frontend can work against a mocked API until the real endpoint is ready.

## 11.4.0.0 Release Impact

This is a key feature for the Brand Admin persona and is critical for demonstrating value to brands on the platform. It should be included in the initial release of the Brand Portal.

