# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-091 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Views Performance Reports |
| As A User Story | As a Service Center Admin, I want to access and vi... |
| User Persona | Service Center Admin: A manager responsible for th... |
| Business Value | Provides data-driven insights to improve operation... |
| Functional Area | Service Center Panel |
| Story Theme | Operational Analytics & Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Accessing the Reports Page

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Service Center Admin

### 3.1.5 When

I navigate to the 'Reports' section in the Service Center Panel

### 3.1.6 Then

The reports dashboard is displayed, showing sections for 'Ticket Volume' and 'Technician Performance'.

### 3.1.7 Validation Notes

Verify the navigation link exists and the page loads with the correct layout and default components.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Default Date Range Filter

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I have just loaded the Reports page

### 3.2.5 When

the page finishes loading

### 3.2.6 Then

a date range filter is visible and is pre-set to a default value of 'Last 30 days'.

### 3.2.7 And

all displayed report data corresponds to this default date range.

### 3.2.8 Validation Notes

Check the initial state of the date picker and verify the data shown matches a query for the last 30 days.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Viewing the Ticket Volume Report

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am on the Reports page

### 3.3.5 When

I view the 'Ticket Volume' section

### 3.3.6 Then

I can see a summary metric for 'Total Tickets Created' within the selected date range.

### 3.3.7 And

I can see a visual breakdown (e.g., pie chart or table) of tickets by the Brand they are associated with.

### 3.3.8 Validation Notes

Verify the accuracy of the counts for total tickets, status breakdown, and brand breakdown against the database for the selected period.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Viewing the Technician Performance Report

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am on the Reports page

### 3.4.5 When

I view the 'Technician Performance' section

### 3.4.6 Then

a table is displayed listing all technicians associated with my service center.

### 3.4.7 And

for each technician, the table shows columns for: 'Total Assigned Tickets', 'Total Resolved Tickets', 'Average Resolution Time', and 'Average Customer Rating' for the selected date range.

### 3.4.8 Validation Notes

Verify the accuracy of each metric for each technician. 'Average Resolution Time' should be calculated from 'Technician Assigned' to 'Resolved' status timestamps.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Filtering Reports by a Custom Date Range

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I am on the Reports page

### 3.5.5 When

I select a new date range using the date filter and click 'Apply'

### 3.5.6 Then

all data in both the 'Ticket Volume' and 'Technician Performance' sections immediately updates to reflect the new date range.

### 3.5.7 Validation Notes

Test with various date ranges (e.g., last 7 days, custom start/end dates) and confirm all report widgets refresh and display correct data.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

No Data Available for Selected Period

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am on the Reports page

### 3.6.5 When

I select a date range in which no service tickets were created or resolved

### 3.6.6 Then

each report section should display a user-friendly message, such as 'No data available for the selected period', instead of empty charts or tables.

### 3.6.7 Validation Notes

Query a date range known to be empty and verify the UI displays the informational message correctly.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Report Includes Deactivated Technicians with Historical Data

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

a technician has been deactivated but had resolved tickets in the past

### 3.7.5 When

I select a date range that includes the period when the technician was active

### 3.7.6 Then

the deactivated technician still appears in the 'Technician Performance' report with their historical data for that period.

### 3.7.7 And

their entry may include a visual indicator, such as an '(Inactive)' tag, next to their name.

### 3.7.8 Validation Notes

Deactivate a technician in the test data, then run the report for a period when they were active and confirm their data is present and accurate.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Exporting Report Data

### 3.8.3 Scenario Type

Happy_Path

### 3.8.4 Given

I am viewing the reports for a selected date range

### 3.8.5 When

I click the 'Export to CSV' button for either the Ticket Volume or Technician Performance report

### 3.8.6 Then

a CSV file is downloaded to my computer.

### 3.8.7 And

the contents of the CSV file accurately reflect the tabular data shown in the corresponding report for the selected date range.

### 3.8.8 Validation Notes

Perform an export and open the CSV file to verify its structure and data integrity.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Date range picker component (with presets like 'Last 7 Days', 'Last 30 Days', and custom range)
- Dashboard layout with distinct cards/sections for each report type
- Data tables for detailed breakdowns (e.g., Technician Performance)
- Graphical charts (bar, pie) for visual summaries (e.g., Tickets by Status)
- 'Export to CSV' button for each report section

## 4.2.0 User Interactions

- User selects a date range, and the report data updates automatically or via an 'Apply' button.
- Hovering over chart elements should display tooltips with specific data points.
- The technician performance table should be sortable by any column header.

## 4.3.0 Display Requirements

- All numerical data must be clearly labeled.
- Average Resolution Time should be displayed in a human-readable format (e.g., 'X hours, Y minutes').
- Loading indicators must be shown while report data is being fetched or recalculated.

## 4.4.0 Accessibility Needs

- All charts and graphs must have accessible labels and ARIA attributes for screen readers.
- Data tables must be properly structured with `<thead>`, `<tbody>`, and `<th>` scope attributes.
- All interactive elements (filters, buttons) must be keyboard-navigable and have clear focus states.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Average Resolution Time is calculated as the mean duration between the 'Technician Assigned' status timestamp and the 'Resolved' status timestamp for all tickets resolved by a technician within the period.

### 5.1.3 Enforcement Point

Backend API when aggregating technician performance data.

### 5.1.4 Violation Handling

Tickets that have been assigned but not yet resolved are not included in the average calculation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A Service Center Admin can only view report data for their own service center and its associated technicians and tickets.

### 5.2.3 Enforcement Point

Backend API query layer, using the admin's service center ID to scope all data.

### 5.2.4 Violation Handling

Any attempt to access data from another service center will result in an empty dataset or an authorization error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-040

#### 6.1.1.2 Dependency Reason

Requires the system to track and store service request statuses and their timestamps.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-044

#### 6.1.2.2 Dependency Reason

Requires customer rating data to calculate the 'Average Customer Rating' metric for technicians.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-048

#### 6.1.3.2 Dependency Reason

Requires the system to link service requests to specific technicians.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-049

#### 6.1.4.2 Dependency Reason

Requires the system to manage the roster of technicians for a service center.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-057

#### 6.1.5.2 Dependency Reason

Requires the 'Resolved' status and its timestamp to calculate resolution time.

## 6.2.0.0 Technical Dependencies

- A frontend charting library (e.g., Chart.js, Recharts).
- Backend data aggregation logic must be in place.
- As per SRS 5.6, queries should leverage database read replicas to avoid impacting transactional performance.

## 6.3.0.0 Data Dependencies

- Accurate and complete historical data for service requests, including status change timestamps, technician assignments, and customer ratings.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for fetching report data must be under 3 seconds for a date range of up to one year, assuming a high volume of tickets.
- The reports page should achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds, as per SRS 5.1.

## 7.2.0.0 Security

- The API endpoint for reports must be protected and ensure that a Service Center Admin can only access data for their own center (enforce data tenancy).

## 7.3.0.0 Usability

- Reports must be intuitive and easy to understand for a non-technical manager.
- The date filtering mechanism must be simple and responsive.

## 7.4.0.0 Accessibility

- The page must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires potentially complex and performance-intensive database queries for data aggregation.
- Integration of a frontend charting library and making it responsive.
- Ensuring the accuracy of calculated metrics like 'Average Resolution Time'.

## 8.3.0.0 Technical Risks

- Poorly optimized database queries could lead to slow page loads and timeouts, especially as data volume grows.
- Inaccurate metric calculations if the underlying data or timestamps are unreliable.

## 8.4.0.0 Integration Points

- Integrates with the core service request data model in the PostgreSQL database.
- Leverages the existing authentication/authorization service to identify the user's service center.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance

## 9.2.0.0 Test Scenarios

- Verify all metrics are calculated correctly for a given dataset.
- Test date filtering with various ranges, including those that cross month/year boundaries.
- Test the 'no data' scenario.
- Test the deactivated technician scenario.
- Verify the CSV export content and format.
- Load test the report endpoints to ensure they meet performance NFRs.

## 9.3.0.0 Test Data Needs

- A seeded database with a significant number of service requests (~10,000+) spread across multiple months.
- Data should include multiple technicians, brands, and all possible ticket statuses.
- At least one technician who has been deactivated but has historical data.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress for E2E tests.
- A performance testing tool like k6 or JMeter for load testing the API.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing completed successfully
- User interface reviewed and approved by a UX designer or Product Owner
- Performance requirements verified under load
- Security requirements validated (data scoping is enforced)
- Documentation for the API endpoint is updated in Swagger/OpenAPI
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story should be scheduled after all prerequisite stories related to the service ticket lifecycle are completed and stable.
- Requires both backend (API and query optimization) and frontend (UI and charting) development effort, which can be parallelized.

## 11.4.0.0 Release Impact

This is a key feature for Service Center Admins, providing significant value for operational management. It is a strong candidate for inclusion in the first major release after the core MVP functionality is launched.

