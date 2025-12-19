# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-002 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: View platform metrics dashboard |
| As A User Story | As a Super Admin, I want to view a centralized das... |
| User Persona | Super Admin: A privileged user responsible for pla... |
| Business Value | Provides immediate, at-a-glance insight into platf... |
| Functional Area | Super Admin Portal |
| Story Theme | Platform Monitoring & Administration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful display of dashboard with accurate metrics

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The Super Admin is authenticated and has successfully logged into the Super Admin portal, and there is existing data on the platform

### 3.1.5 When

The Super Admin navigates to the main dashboard page

### 3.1.6 Then

The dashboard displays a series of metric cards with accurate, up-to-date numerical values for: 'New Users (Last 30 Days)', 'Total Registered Products', 'Active Brands', 'Pending Brand Requests', 'Active Service Centers', and 'Open Service Requests'.

### 3.1.7 Validation Notes

Verify by cross-referencing the displayed numbers with direct database queries for each metric. 'Active' means status is 'Approved'. 'Open' service requests include all non-closed/resolved statuses.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Dashboard display on a new platform with no data

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

The Super Admin is authenticated and logged into a newly deployed platform with no user, brand, or product data

### 3.2.5 When

The Super Admin navigates to the dashboard page

### 3.2.6 Then

All metric cards are displayed with a numerical value of '0'.

### 3.2.7 Validation Notes

The UI should not show errors, nulls, or blank spaces. It should gracefully handle the zero-data state.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Dashboard data is being fetched

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

The Super Admin is navigating to the dashboard page

### 3.3.5 When

The frontend is waiting for the metrics API to respond

### 3.3.6 Then

The dashboard area displays a clear loading indicator, such as skeleton loaders for each metric card, providing visual feedback to the user.

### 3.3.7 Validation Notes

This can be tested by simulating network latency in browser developer tools.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Backend API for metrics fails or returns an error

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The Super Admin is on the dashboard page

### 3.4.5 When

The API call to fetch the dashboard metrics fails (e.g., returns a 5xx error)

### 3.4.6 Then

The loading indicator is replaced with a user-friendly error message, such as 'Could not load platform metrics. Please try again later.', and a retry button may be offered.

### 3.4.7 Validation Notes

Use a mock API or network interception tool to simulate an API failure and verify the UI response.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Dashboard access is restricted to Super Admins

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A user with a role other than 'Super Admin' (e.g., 'Brand Admin') is authenticated

### 3.5.5 When

The user attempts to access the Super Admin dashboard URL directly

### 3.5.6 Then

The system denies access and displays an 'Access Denied' or '403 Forbidden' page, or redirects them to their own dashboard.

### 3.5.7 Validation Notes

Attempt to access the API endpoint and the frontend route with tokens for different user roles.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A grid-based layout for metric cards.
- Individual 'Metric Card' components, each containing a title, a large numerical value, and potentially a relevant icon.
- A loading state indicator (e.g., skeleton screen).
- An error message display area.

## 4.2.0 User Interactions

- The dashboard should be the default view after a Super Admin logs in.
- The metric cards are read-only and not clickable in this iteration.

## 4.3.0 Display Requirements

- The dashboard must be fully responsive, adapting cleanly from large desktop monitors to tablet-sized screens.
- All text must have sufficient color contrast against its background to meet accessibility standards.

## 4.4.0 Accessibility Needs

- The dashboard must comply with WCAG 2.1 Level AA.
- All elements, including metric cards, must be navigable using a keyboard.
- Metric cards must have appropriate ARIA roles and labels for screen reader compatibility.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

An 'Active Brand' is defined as a brand with a registration status of 'Approved'.

### 5.1.3 Enforcement Point

Backend API query for metric calculation.

### 5.1.4 Violation Handling

N/A - This is a definition.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

'New Users' are defined as users created within the last 30 calendar days.

### 5.2.3 Enforcement Point

Backend API query for metric calculation.

### 5.2.4 Violation Handling

N/A - This is a definition.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Super Admin must be able to log in before they can view any part of the portal.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-004

#### 6.1.2.2 Dependency Reason

The 'Active Brands' metric requires the functionality to approve brands.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-016

#### 6.1.3.2 Dependency Reason

The 'New Users' metric requires the functionality for users to register.

## 6.2.0.0 Technical Dependencies

- A backend microservice to provide the metrics via a REST API endpoint.
- The authentication service (Azure AD B2C) must be integrated to provide role-based access control.
- A caching layer (Azure Cache for Redis) should be considered for the aggregated metrics to ensure performance.

## 6.3.0.0 Data Dependencies

- Access to production database tables for users, brands, products, and service centers is required to calculate the metrics.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for dashboard metrics must have a 95th percentile (P95) response time of less than 250ms.
- The dashboard page must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- Access to the dashboard API endpoint and frontend route must be strictly enforced by the Role-Based Access Control (RBAC) mechanism, limited to the 'Super Admin' role.
- All communication must be over HTTPS using TLS 1.3.

## 7.3.0.0 Usability

- The dashboard must present information clearly and concisely, requiring no training to understand.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Frontend UI is straightforward component-based work.
- Backend involves writing several simple aggregation queries.
- A caching strategy for the metrics should be implemented to prevent performance degradation as data volume grows. The metrics can be pre-calculated and stored in Redis with a TTL (e.g., 1 hour).

## 8.3.0.0 Technical Risks

- Without caching, the database queries for these metrics could become slow over time, impacting dashboard load times. This risk is mitigated by implementing a caching layer from the start.

## 8.4.0.0 Integration Points

- Frontend (Next.js) will call a new endpoint on the Backend (NestJS).
- Backend will query the PostgreSQL database.
- Backend will read from/write to the Redis cache.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify each metric card displays the correct value based on a seeded test database.
- Test the UI's response to API loading, success, and error states.
- Confirm that a non-Super Admin user cannot access the dashboard page or its API endpoint.
- Run a Playwright E2E test to log in as a Super Admin and validate the dashboard's presence and content.
- Perform a load test on the metrics API endpoint.

## 9.3.0.0 Test Data Needs

- A test database seeded with a known quantity of users (some created <30 days ago), brands (with various statuses), products, and service requests.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- A load testing tool like k6 or JMeter.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the project standard (e.g., >80%).
- Integration and E2E tests are written and passing in the CI/CD pipeline.
- The dashboard UI has been reviewed and approved by the Product Owner/UX designer.
- Performance tests confirm the API endpoint meets latency requirements.
- Security scan confirms no new vulnerabilities and RBAC is correctly enforced.
- Accessibility audit (automated and manual) confirms WCAG 2.1 AA compliance.
- Relevant documentation (e.g., API spec) has been updated.
- The story has been deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for the Super Admin portal and should be prioritized early.
- Requires both frontend and backend development, which can be done in parallel once the API contract is defined.

## 11.4.0.0 Release Impact

Provides core visibility for platform administrators upon initial release. It is a key feature for demonstrating platform value to internal stakeholders.

