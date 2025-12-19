# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-047 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Filters and Searches Service ... |
| As A User Story | As a Service Center Admin, I want to filter the li... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Improves operational efficiency by significantly r... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Filter by a single status

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Service Center Admin viewing the list of service requests

### 3.1.5 When

I select a status, for example 'Technician Assigned', from the status filter dropdown

### 3.1.6 Then

the list of service requests immediately updates to display only the tickets with the 'Technician Assigned' status.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Filter by a single brand

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in Service Center Admin viewing the list of service requests for multiple brands

### 3.2.5 When

I select a specific brand from the brand filter dropdown

### 3.2.6 Then

the list updates to display only the service requests associated with that selected brand.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Filter by a single technician

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a logged-in Service Center Admin viewing the list of service requests

### 3.3.5 When

I select a specific technician's name from the technician filter dropdown

### 3.3.6 Then

the list updates to display only the service requests currently assigned to that technician.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Filter by a date range

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am a logged-in Service Center Admin viewing the list of service requests

### 3.4.5 When

I select a 'start date' and an 'end date' using the date range filter

### 3.4.6 Then

the list updates to display only service requests created on or between the selected dates, inclusive.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Combine multiple filters

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am a logged-in Service Center Admin viewing the list of service requests

### 3.5.5 When

I select 'Requested' from the status filter AND select 'Brand X' from the brand filter

### 3.5.6 Then

the list updates to display only service requests that have the status 'Requested' AND belong to 'Brand X'.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Perform a free-text search

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

I am a logged-in Service Center Admin viewing the list of service requests

### 3.6.5 When

I type a customer's name into the search bar and submit the search

### 3.6.6 Then

the list updates to display only service requests associated with that customer.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Clear all filters and search

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

I have applied several filters and a search term to the service request list

### 3.7.5 When

I click the 'Clear All' or 'Reset' button

### 3.7.6 Then

all filter selections are cleared, the search bar is emptied, and the list reverts to its default, unfiltered state.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

No results found after filtering

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

I am a logged-in Service Center Admin viewing the list of service requests

### 3.8.5 When

I apply a combination of filters that results in zero matching requests

### 3.8.6 Then

the list area becomes empty and a user-friendly message is displayed, such as 'No service requests found. Please try adjusting your filters.'

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

Pagination persists with active filters

### 3.9.3 Scenario Type

Edge_Case

### 3.9.4 Given

I have applied a filter that returns multiple pages of results

### 3.9.5 When

I navigate to the second page of the results

### 3.9.6 Then

the filter remains active and the second page of the filtered data is displayed correctly.

## 3.10.0 Criteria Id

### 3.10.1 Criteria Id

AC-010

### 3.10.2 Scenario

Invalid date range selection

### 3.10.3 Scenario Type

Error_Condition

### 3.10.4 Given

I am using the date range filter

### 3.10.5 When

I select an end date that is earlier than the start date

### 3.10.6 Then

a validation message appears, the filter is not applied, and the list remains unchanged.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A persistent filter bar above the service request list.
- Dropdown menu for 'Status' (multi-select optional).
- Dropdown menu for 'Brand'.
- Dropdown menu for 'Technician'.
- A date range picker component.
- A free-text search input field with a search icon/button.
- A 'Clear All' or 'Reset' button.
- Visual indicators (e.g., 'pills' or 'tags') to show which filters are currently active.

## 4.2.0 User Interactions

- Selecting an option from a dropdown should apply the filter.
- Typing in the search bar and pressing 'Enter' or clicking a search icon should trigger the search.
- The list of requests should update dynamically as filters are applied/removed.
- Clicking an 'x' on an active filter pill should remove that specific filter and update the list.
- Pagination controls must work correctly with the filtered dataset.

## 4.3.0 Display Requirements

- The total count of matching results should be displayed (e.g., 'Showing 25 of 150 requests').
- A clear 'No results found' message must be shown when applicable.

## 4.4.0 Accessibility Needs

- All filter controls must be fully keyboard accessible (navigable via Tab key).
- All controls must have appropriate ARIA labels for screen readers.
- Sufficient color contrast must be used for all UI elements, adhering to WCAG 2.1 AA.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A Service Center Admin can only view, filter, and search service requests that are associated with their specific, assigned service center.', 'enforcement_point': 'Backend API (Data Access Layer)', 'violation_handling': "The API query must include a non-negotiable 'WHERE service_center_id = [user's service center id]' clause. Any attempt to access other centers' data will return an empty set or an authorization error."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-046

#### 6.1.1.2 Dependency Reason

This story adds filtering to the service request list. The base list view must exist first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-049

#### 6.1.2.2 Dependency Reason

The list of technicians for the 'Technician' filter dropdown is populated by the technician roster management feature.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-048

#### 6.1.3.2 Dependency Reason

The ability to filter by technician requires that requests can be assigned to technicians first.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint capable of handling multiple query parameters for filtering and a parameter for free-text search.
- Database schema must have appropriate indexes on columns used for filtering (status, brand_id, technician_id, created_at) to ensure performance.

## 6.3.0.0 Data Dependencies

- Requires existing service request data with various statuses, brands, and technician assignments to test functionality thoroughly.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for any combination of filters or search must be under 2 seconds for a dataset of up to 100,000 records.
- The frontend UI must remain responsive while the data is being fetched and rendered.

## 7.2.0.0 Security

- The API endpoint must enforce tenancy, ensuring a Service Center Admin can only access data for their own service center.
- All input from search and filter parameters must be sanitized on the backend to prevent SQL injection or other injection attacks.

## 7.3.0.0 Usability

- The filtering mechanism should be intuitive and require minimal clicks to apply common filters.
- It must be obvious to the user which filters are currently active.

## 7.4.0.0 Accessibility

- The feature must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The feature must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend state management for multiple, combinable filters.
- Backend logic to dynamically build a performant database query based on variable parameters.
- Ensuring database indexes are correctly implemented to support fast queries.
- Potential integration with Azure OpenSearch Service for a more robust search experience than a simple SQL 'LIKE' query.

## 8.3.0.0 Technical Risks

- Poor query performance on large datasets if database is not indexed correctly.
- Complexity in frontend state management could lead to bugs where filters do not apply or clear correctly.

## 8.4.0.0 Integration Points

- Frontend Web Panel (Next.js) <-> Backend API (NestJS)
- Backend API (NestJS) <-> Azure Database for PostgreSQL

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Test each filter individually.
- Test various combinations of 2, 3, and 4 filters.
- Test search functionality with full and partial matches for Ticket ID, Customer Name, and Serial Number.
- Test combining search with filters.
- Test clearing filters individually and all at once.
- Test 'no results' state.
- Test pagination with active filters.

## 9.3.0.0 Test Data Needs

- A seeded database with a significant number of service requests (>1000) covering all possible statuses, multiple brands, and assignments to various technicians across a wide date range.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.
- A load testing tool (e.g., k6, JMeter) for performance testing the API.

# 10.0.0.0 Definition Of Done

- All acceptance criteria are validated and passing in a staging environment.
- Frontend and backend code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic meets the project standard (e.g., >80%).
- Automated E2E tests for the happy path scenarios are created and passing.
- Performance testing confirms API response times are within the defined NFR.
- A security review of the API endpoint has been completed.
- The UI has been reviewed for responsiveness and adherence to accessibility standards.
- Any necessary user or technical documentation has been updated.
- The story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core feature for the Service Center Admin persona and should be prioritized soon after the basic list view is available.
- Requires both frontend and backend development, which can be done in parallel after the API contract is defined.

## 11.4.0.0 Release Impact

- Significantly enhances the usability of the Service Center Panel. Its inclusion in a release is a major value-add for service center users.

