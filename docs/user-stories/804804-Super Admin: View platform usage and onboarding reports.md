# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-015 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: View platform usage and onboarding re... |
| As A User Story | As a Super Admin, I want to access a dedicated rep... |
| User Persona | Super Admin: A high-level platform administrator r... |
| Business Value | Provides critical business intelligence to make da... |
| Functional Area | Super Admin Portal |
| Story Theme | Platform Analytics & Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-015-01

### 3.1.2 Scenario

Dashboard displays all required report widgets

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Super Admin logged into the platform and have navigated to the 'Reports' section

### 3.1.5 When

the reports dashboard page loads

### 3.1.6 Then

I must see a 'Platform Usage Statistics' section and an 'Onboarding Funnel' section, both populated with data.

### 3.1.7 Validation Notes

Verify that all specified widgets and charts are present on the page.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-015-02

### 3.2.2 Scenario

Platform Usage Statistics are displayed correctly

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the reports dashboard

### 3.2.5 When

I look at the 'Platform Usage Statistics' section

### 3.2.6 Then

I must see metric cards for 'Total Registered Users', 'Total Registered Products', 'Total Active Brands', and 'Total Active Service Centers', and time-series charts for 'New User Registrations', 'New Product Registrations', and 'Service Requests Created'.

### 3.2.7 Validation Notes

Verify the presence of all 4 metric cards and 3 charts. The numbers should be validated against a direct database query for a specific time period.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-015-03

### 3.3.2 Scenario

Onboarding Funnels are displayed correctly

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am viewing the reports dashboard

### 3.3.5 When

I look at the 'Onboarding Funnel' section

### 3.3.6 Then

I must see two separate funnel visualizations: one for 'Brand Onboarding' and one for 'Service Center Onboarding', showing the counts for 'Requested', 'Approved', and 'Rejected' stages, along with conversion rates between stages.

### 3.3.7 Validation Notes

Verify the funnel charts display the correct stages and that the counts and conversion percentages are mathematically correct based on database records.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-015-04

### 3.4.2 Scenario

Filtering reports by a date range

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am viewing the reports dashboard

### 3.4.5 When

I select a new date range from the date filter (e.g., 'Last 7 Days') and apply it

### 3.4.6 Then

all metric cards and charts on the dashboard must update to display data exclusively from within that selected date range.

### 3.4.7 Validation Notes

Change the date filter and confirm via visual inspection and database queries that the data shown on the dashboard accurately reflects the new period.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-015-05

### 3.5.2 Scenario

Dashboard handles a period with no data

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am viewing the reports dashboard

### 3.5.5 When

I select a date range for which no platform activity has occurred

### 3.5.6 Then

all metric cards should display '0' and all charts should display a user-friendly message like 'No data available for this period'.

### 3.5.7 Validation Notes

Test with a future date range or on a clean test environment. The page should not error or display broken elements.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-015-06

### 3.6.2 Scenario

Attempting to apply an invalid custom date range

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am viewing the reports dashboard and have opened the custom date range picker

### 3.6.5 When

I select a 'Start Date' that is after the 'End Date' and attempt to apply the filter

### 3.6.6 Then

a validation error message must be displayed, and the filter must not be applied.

### 3.6.7 Validation Notes

Verify that a clear error message is shown to the user and the data on the dashboard remains unchanged.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-015-07

### 3.7.2 Scenario

Dashboard page load performance

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

the platform database contains a significant volume of data (e.g., 100,000+ users and products)

### 3.7.5 When

I navigate to the reports dashboard

### 3.7.6 Then

the page and all its data must load in under 3 seconds.

### 3.7.7 Validation Notes

This must be verified using browser developer tools or a performance testing tool against a seeded staging environment.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Date range filter component (supporting presets and custom ranges)
- Metric cards/widgets for key numbers
- Line chart components for time-series data
- Funnel chart components for onboarding visualization
- Tooltips on charts to show specific data points on hover

## 4.2.0 User Interactions

- User can select a preset date range from a dropdown.
- User can open a calendar to select a custom start and end date.
- Applying the filter triggers a data refresh for the entire dashboard.
- Hovering over a data point on a chart reveals a tooltip with details.

## 4.3.0 Display Requirements

- The dashboard must have a clear title, e.g., 'Platform Analytics'.
- All numbers should be formatted for readability (e.g., using commas for thousands).
- Charts must have clearly labeled axes.

## 4.4.0 Accessibility Needs

- All dashboard elements, including charts and filters, must be keyboard navigable.
- Charts must have appropriate ARIA labels and text alternatives for screen readers.
- Color contrast must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-015-01', 'rule_description': "Access to the reporting dashboard is restricted to users with the 'Super Admin' role.", 'enforcement_point': 'API Gateway and Backend Service Middleware.', 'violation_handling': 'An API request from a non-Super Admin user must return a 403 Forbidden status code.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Super Admin must be able to log in to access the portal.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-004

#### 6.1.2.2 Dependency Reason

Brand approval workflow must exist to generate data for the onboarding funnel.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-010

#### 6.1.3.2 Dependency Reason

Service Center approval workflow must exist to generate data for the onboarding funnel.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-016

#### 6.1.4.2 Dependency Reason

User registration functionality must exist to generate data for usage statistics.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-019

#### 6.1.5.2 Dependency Reason

Product registration functionality must exist to generate data for usage statistics.

## 6.2.0.0 Technical Dependencies

- A frontend charting library (e.g., Next.js compatible library like Recharts or Chart.js).
- Backend API endpoints designed to serve aggregated analytical data.
- Optimized data retrieval mechanism (e.g., using PostgreSQL read replicas as specified in SRS 5.5, or materialized views).

## 6.3.0.0 Data Dependencies

- Requires access to user, product, brand, service center, and service request tables to aggregate data.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoints serving report data must have a P95 response time of less than 2 seconds.
- The frontend dashboard page must achieve a Largest Contentful Paint (LCP) of less than 3 seconds.

## 7.2.0.0 Security

- API endpoints for this feature must be protected and accessible only by authenticated users with the 'Super Admin' role.
- Data aggregation queries must be parameterized to prevent SQL injection.

## 7.3.0.0 Usability

- The dashboard should present complex data in an easily digestible, visual format.
- The date filtering mechanism must be intuitive and easy to use.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Designing and optimizing database queries for efficient data aggregation across multiple large tables.
- Potential need for a data pre-aggregation strategy (e.g., a nightly cron job) to ensure performance as data volume grows.
- Frontend implementation of interactive and responsive charts.
- State management on the frontend to handle filtering and data refreshing.

## 8.3.0.0 Technical Risks

- Poorly optimized queries could lead to slow dashboard load times and high database load, impacting overall platform performance.
- The chosen charting library might have limitations or accessibility issues.

## 8.4.0.0 Integration Points

- Frontend portal integrates with a new set of backend analytics APIs.
- Backend analytics service integrates with the PostgreSQL read replica database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify dashboard data accuracy for various date ranges against manual DB queries.
- Test the behavior of the dashboard when no data is present.
- Test the responsiveness of the dashboard on different screen sizes.
- Test keyboard navigation and screen reader compatibility.
- Load test the analytics API endpoints to ensure they meet performance NFRs.

## 9.3.0.0 Test Data Needs

- A staging environment seeded with a large, realistic dataset (e.g., thousands of users, products, brands in various states) is required for meaningful performance testing and data validation.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- A load testing tool like k6 or JMeter (Performance)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing completed successfully
- E2E tests for the user flow are created and passing
- User interface reviewed and approved by the Product Owner/Designer
- Performance requirements (API response time, page load) are verified and met
- Security requirements (role-based access) are validated
- Accessibility audit passed against WCAG 2.1 AA
- Documentation for the new API endpoints is created/updated in OpenAPI spec
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The backend API contract should be finalized early in the sprint to allow for parallel frontend development.
- Requires access to a staging environment with a realistic dataset for proper testing.

## 11.4.0.0 Release Impact

This is a key feature for platform administrators and a major step in providing business value beyond core operations. It will be a highlight of the release for business stakeholders.

