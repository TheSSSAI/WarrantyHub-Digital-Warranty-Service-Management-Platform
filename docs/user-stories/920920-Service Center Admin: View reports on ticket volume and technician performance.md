# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-074 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: View reports on ticket volum... |
| As A User Story | As a Service Center Admin, I want to view and filt... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Provides data-driven insights into operational per... |
| Functional Area | Service Center Panel |
| Story Theme | Operational Analytics & Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Accessing the main reports page

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Service Center Admin

### 3.1.5 When

I navigate to the 'Reports' section in the web panel

### 3.1.6 Then

The reports page is displayed with two main sections available: 'Ticket Volume' and 'Technician Performance'.

### 3.1.7 Validation Notes

Verify that the navigation link to 'Reports' exists and that the page loads with the two report options, defaulting to the 'Ticket Volume' view.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Viewing the Ticket Volume report with default filters

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the reports page

### 3.2.5 When

The 'Ticket Volume' report loads

### 3.2.6 Then

A default date range of 'Last 30 Days' is applied.

### 3.2.7 And

A chart and a summary table display the total number of tickets created and closed within that period.

### 3.2.8 Validation Notes

Check that the date filter is pre-set and the data displayed corresponds to the last 30 days of activity for the admin's service center.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Filtering the Ticket Volume report by date and brand

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am viewing the 'Ticket Volume' report

### 3.3.5 When

I select a custom date range and filter by a specific brand

### 3.3.6 Then

The chart and summary data update to reflect only the tickets for the selected brand within the specified date range.

### 3.3.7 Validation Notes

Test with a custom date range and a brand filter. Verify the aggregated numbers in the UI against a direct database query for the same parameters.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Viewing the Technician Performance report

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am on the reports page

### 3.4.5 When

I switch to the 'Technician Performance' report

### 3.4.6 Then

A table is displayed listing all active technicians for my service center.

### 3.4.7 And

The data reflects the default date range of 'Last 30 Days'.

### 3.4.8 Validation Notes

Verify that all technicians are listed and the metrics are calculated correctly for the default period. Average Resolution Time should be calculated from 'Acknowledged' to 'Resolved' status.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Sorting the Technician Performance table

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am viewing the 'Technician Performance' report

### 3.5.5 When

I click on a sortable column header, such as 'Average Customer Rating'

### 3.5.6 Then

The table rows reorder based on the selected column in ascending or descending order.

### 3.5.7 Validation Notes

Click on each column header to test both ascending and descending sort functionality.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Viewing reports with no data for the selected filters

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am on the reports page

### 3.6.5 When

I apply a filter combination (e.g., a date range with no service requests)

### 3.6.6 Then

The report area displays a user-friendly message, such as 'No data available for the selected filters', instead of an empty chart or an error.

### 3.6.7 Validation Notes

Test with a future date range or a brand for which the service center has no tickets.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Technician performance report includes technicians with no activity

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I am viewing the 'Technician Performance' report for a specific date range

### 3.7.5 When

A technician has had no assigned or closed tickets in that period

### 3.7.6 Then

The technician is still listed in the table.

### 3.7.7 And

Their 'Average Resolution Time' and 'Average Customer Rating' metrics show 'N/A'.

### 3.7.8 Validation Notes

Ensure the report query includes all technicians, not just those with activity in the period, to give a complete roster view.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Attempting to filter with an invalid date range

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

I am on the reports page using the custom date range filter

### 3.8.5 When

I select a start date that is after the end date and try to apply the filter

### 3.8.6 Then

A validation error message is displayed (e.g., 'Start date cannot be after end date').

### 3.8.7 And

The report is not updated until a valid date range is provided.

### 3.8.8 Validation Notes

Verify that client-side validation prevents the API call with the invalid range.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Navigation link to 'Reports' in the Service Center Admin panel.
- Tabs or buttons to switch between 'Ticket Volume' and 'Technician Performance' reports.
- Date range picker with presets (e.g., Last 7 Days, Last 30 Days, This Month) and a custom range option.
- Dropdown filter for 'Brand'.
- Interactive charts (e.g., line or bar chart) for ticket volume visualization.
- Data table with sortable columns for technician performance.
- Loading indicators/spinners while data is being fetched.
- Informational message area for 'no data' states.

## 4.2.0 User Interactions

- User can click to switch between report types.
- User can select dates and filter options, which automatically updates the report view.
- User can click on table headers to sort data.
- UI should be responsive and functional on tablet and desktop screen sizes.

## 4.3.0 Display Requirements

- Ticket Volume report must clearly display 'Total Tickets Created' and 'Total Tickets Closed'.
- Technician Performance report must display all metrics as specified in AC-004.
- All numerical data should be clearly formatted.
- Average Resolution Time should be displayed in a human-readable format (e.g., 'X hours Y minutes').

## 4.4.0 Accessibility Needs

- All UI controls (filters, tabs, sortable headers) must be keyboard accessible.
- Charts must have appropriate ARIA labels and text alternatives for screen readers.
- Color contrast must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A Service Center Admin can only view report data for the service center they are assigned to.

### 5.1.3 Enforcement Point

Backend API (data query layer)

### 5.1.4 Violation Handling

The API query must be scoped by the authenticated user's `service_center_id`. Any attempt to access data for another center should result in an empty dataset or a 403 Forbidden error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Average Resolution Time is calculated as the average duration between a ticket's status changing to 'Acknowledged' and its status changing to 'Resolved'.

### 5.2.3 Enforcement Point

Backend data aggregation logic

### 5.2.4 Violation Handling

Tickets that have not been acknowledged or resolved should be excluded from this calculation for the specific technician.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-060

#### 6.1.1.2 Dependency Reason

User must be able to log in as a Service Center Admin to access the panel.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-063

#### 6.1.2.2 Dependency Reason

Ticket acknowledgment is required to calculate 'Average Resolution Time'.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-068

#### 6.1.3.2 Dependency Reason

Ticket closure is required for 'Tickets Closed' and 'Average Resolution Time' metrics.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-048

#### 6.1.4.2 Dependency Reason

User feedback/rating system must be in place to calculate 'Average Customer Rating'.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-069

#### 6.1.5.2 Dependency Reason

Technician roster management must exist to populate the list of technicians.

## 6.2.0.0 Technical Dependencies

- A frontend charting library (e.g., Chart.js, Recharts).
- Backend API endpoint for fetching aggregated report data.
- Database architecture must support efficient querying (e.g., appropriate indexes, potential use of read replicas as per SRS 5.5).

## 6.3.0.0 Data Dependencies

- Requires historical data for service requests, including statuses, timestamps, brand associations, and technician assignments.
- Requires data from user ratings on completed service requests.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for report data queries (up to a 90-day range) should be under 5 seconds.
- The frontend UI should remain responsive while data is loading.

## 7.2.0.0 Security

- The API endpoint must be secured and enforce that a Service Center Admin can only access data for their own center (tenant data isolation).

## 7.3.0.0 Usability

- The reports must be easy to understand for a non-technical user.
- Filters should be intuitive and easy to apply.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend query complexity for data aggregation, especially for calculating average resolution time.
- Potential performance optimization needed for the database (e.g., adding indexes or using read replicas) to handle large datasets.
- Frontend implementation of interactive charts and a feature-rich, sortable data table.

## 8.3.0.0 Technical Risks

- Report queries may be slow and impact primary database performance if not properly optimized or offloaded to a read replica.
- Inaccurate data calculations if edge cases (e.g., re-opened tickets) are not handled correctly in the aggregation logic.

## 8.4.0.0 Integration Points

- Integrates with the core service request data model in the PostgreSQL database.
- Integrates with the user authentication/authorization service to scope data access.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify report accuracy for various date ranges and filter combinations.
- Test sorting functionality on all sortable columns.
- Test the 'no data' state.
- Test the invalid date range validation.
- Verify that a deactivated technician no longer appears in new reports.
- Test performance with a large volume of seed data (e.g., 10,000+ tickets).

## 9.3.0.0 Test Data Needs

- A seeded database with multiple service centers, brands, and technicians.
- A large set of service requests with varying statuses, timestamps, brands, and assigned technicians spanning at least 6 months.
- Technicians with varying levels of activity, including some with no activity.
- Service requests with customer ratings.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend)
- Jest & Supertest (Backend)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for backend logic and frontend components, meeting >80% coverage for new code
- Integration testing for the reports API endpoint completed successfully
- E2E tests covering the primary user flows are created and passing
- User interface reviewed and approved by Product Owner/UX Designer
- Performance requirements for API response time are verified under load
- Security requirements for data isolation are validated
- Documentation for the new API endpoint is created/updated in OpenAPI spec
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story provides significant business value for service center partners and should be prioritized after core service management features are stable.
- Requires both frontend and backend development effort that can be worked on in parallel once the API contract is defined.

## 11.4.0.0 Release Impact

- This is a key feature for the Service Center Admin persona and a major value proposition for onboarding new service centers.

