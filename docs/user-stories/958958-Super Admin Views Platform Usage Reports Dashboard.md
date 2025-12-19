# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-092 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Views Platform Usage Reports Dashboard |
| As A User Story | As a Super Admin, I want to access a dedicated das... |
| User Persona | Super Admin: The highest-level platform administra... |
| Business Value | Provides critical business intelligence for platfo... |
| Functional Area | Super Admin Portal |
| Story Theme | Platform Monitoring & Analytics |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful navigation to and display of the reports dashboard

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the user is logged in with 'Super Admin' role privileges

### 3.1.5 When

the user navigates to the 'Platform Reports' section in the Super Admin portal

### 3.1.6 Then

the system must display the usage reports dashboard, with all widgets and charts loaded with data for the default date range (Last 30 days).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Verification of Key Performance Indicator (KPI) widgets

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Super Admin is viewing the usage reports dashboard

### 3.2.5 When

the dashboard page finishes loading

### 3.2.6 Then

the following KPI widgets must be displayed with accurate, up-to-date counts: Total Registered Users, Active Users (last 30 days), Total Registered Products, Total Onboarded Brands, Total Onboarded Service Centers, and Total Service Requests Created.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Verification of trend charts for new registrations

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the Super Admin is viewing the usage reports dashboard

### 3.3.5 When

the dashboard page finishes loading

### 3.3.6 Then

the dashboard must display line charts illustrating trends for 'New User Registrations' and 'New Products Registered' over the selected date period.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Verification of the onboarding funnel widget

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the Super Admin is viewing the usage reports dashboard

### 3.4.5 When

the dashboard page finishes loading

### 3.4.6 Then

a widget titled 'Brand and Service Center Onboarding Funnel' must be displayed, showing the counts for 'Pending Approval' and 'Approved' statuses for both entity types.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Filtering dashboard data using a predefined date range

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the Super Admin is viewing the usage reports dashboard

### 3.5.5 When

the user selects a predefined date range, such as 'Last 7 Days', from the date filter control

### 3.5.6 Then

all time-sensitive widgets and charts on the dashboard must refresh and display data corresponding only to that selected period.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Filtering dashboard data using a custom date range

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the Super Admin is viewing the usage reports dashboard

### 3.6.5 When

the user selects the 'Custom Range' option, chooses a valid start and end date, and applies the filter

### 3.6.6 Then

all time-sensitive widgets and charts must update to reflect the data within that specific custom range.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Dashboard behavior with no platform data

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

the platform is newly deployed and has no user, product, brand, or service center data

### 3.7.5 When

the Super Admin navigates to the usage reports dashboard

### 3.7.6 Then

all KPI widgets must display '0', and all charts must display a user-friendly message like 'No data available for this period' without causing any application errors.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Handling of an invalid custom date range

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

the Super Admin is using the custom date range filter

### 3.8.5 When

the user selects an end date that is earlier than the start date and attempts to apply the filter

### 3.8.6 Then

the system must display a validation error message (e.g., 'End date must be on or after the start date') and prevent the filter from being applied.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Date range filter dropdown (with options like 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Range')
- KPI 'scorecard' widgets for each primary metric
- Line chart components for trend analysis
- A component to display the onboarding funnel statistics

## 4.2.0 User Interactions

- Selecting a date range from the filter should trigger an asynchronous data refresh for the dashboard.
- Hovering over data points on the line charts should display a tooltip with the exact date and value.

## 4.3.0 Display Requirements

- All numerical data should be clearly labeled.
- The currently active date range filter must be clearly indicated.
- A loading indicator must be displayed while dashboard data is being refreshed.

## 4.4.0 Accessibility Needs

- All charts and graphs must have ARIA labels and attributes for screen reader compatibility.
- All UI elements must have sufficient color contrast to meet WCAG 2.1 AA standards.
- The dashboard must be navigable using a keyboard.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Access to the Platform Usage Reports dashboard is restricted to users with the 'Super Admin' role.

### 5.1.3 Enforcement Point

API Gateway and Backend Service (middleware).

### 5.1.4 Violation Handling

The system will return a 403 Forbidden status code and the user will be redirected to an 'Access Denied' page or their default dashboard.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The definition of an 'Active User' is a user who has logged into the platform at least once within the last 30 days.

### 5.2.3 Enforcement Point

Backend data aggregation logic.

### 5.2.4 Violation Handling

N/A (This is a definition for a calculation).

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

User registration functionality must exist to provide data for user counts.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-015

#### 6.1.2.2 Dependency Reason

Product registration functionality must exist to provide data for product counts.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-002

#### 6.1.3.2 Dependency Reason

Brand approval workflow must exist to provide data for the onboarding funnel.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-005

#### 6.1.4.2 Dependency Reason

Service Center approval workflow must exist to provide data for the onboarding funnel.

## 6.2.0.0 Technical Dependencies

- A robust authentication and authorization service (Azure AD B2C) to enforce role-based access.
- Backend API endpoints capable of performing efficient data aggregation.
- A frontend charting library (e.g., Next.js compatible library like Recharts or Chart.js).
- Configuration of database read replicas to handle read-heavy reporting queries without impacting transactional performance.

## 6.3.0.0 Data Dependencies

- Access to user, product, brand, and service_center tables/collections.
- A 'last_login' timestamp or similar activity metric must be tracked for each user to calculate 'Active Users'.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The dashboard page, including all data and charts, must load in under 3 seconds for a dataset representing 1 million users.
- API endpoints for fetching report data must have a 95th percentile (P95) response time of less than 1.5 seconds.

## 7.2.0.0 Security

- All API endpoints serving report data must be protected and only accessible by authenticated Super Admins.
- Data must be aggregated on the server-side; no sensitive raw data should be sent to the client.

## 7.3.0.0 Usability

- The dashboard must present complex data in a simple, easily digestible visual format.
- The date filtering mechanism must be intuitive and responsive.

## 7.4.0.0 Accessibility

- The entire dashboard must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The dashboard must render correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Designing and optimizing database queries for efficient aggregation of potentially large datasets.
- Potential need for creating materialized views or summary tables in the database to ensure performance.
- Implementing responsive and accessible data visualizations on the frontend.
- Ensuring the accuracy of time-series data across different time zones if applicable.

## 8.3.0.0 Technical Risks

- Slow query performance leading to long dashboard load times and potential timeouts.
- Inaccurate data reporting due to flaws in the aggregation logic or date range calculations.

## 8.4.0.0 Integration Points

- Integrates with the core PostgreSQL database (via read replicas).
- Integrates with the existing Super Admin portal's navigation and layout.
- Integrates with the central authentication/authorization service.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify the accuracy of all KPI counts against a known dataset.
- Test all predefined and custom date range filters to ensure data is filtered correctly.
- Test dashboard behavior with an empty database.
- Test dashboard behavior with a very large (1M+ records) database to validate performance NFRs.
- Validate role-based access by attempting to access the dashboard URL with a non-Super Admin user.

## 9.3.0.0 Test Data Needs

- A seeded database with a significant volume of anonymized data spanning at least 6 months to test filtering and trend analysis effectively.
- User accounts with 'Super Admin' and other roles for access control testing.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress for E2E tests.
- A load testing tool (e.g., k6, JMeter) for performance testing the APIs.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new backend logic is at or above 80%.
- E2E tests for the happy path and key error conditions are implemented and passing.
- Performance tests confirm that API response times and page load times meet the defined NFRs.
- An accessibility audit has been performed and any critical issues have been resolved.
- The feature has been demonstrated to and approved by the Product Owner.
- All related documentation has been updated.
- The feature is deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The backend API development and contract definition should be prioritized to unblock frontend development.
- Requires collaboration with a data engineer or DBA to optimize queries for performance.
- Availability of realistic test data in a lower environment is critical for accurate testing.

## 11.4.0.0 Release Impact

This is a key feature for platform administrators and provides foundational business intelligence. It is a high-value addition for the Super Admin persona.

