# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-062 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Filter and search service re... |
| As A User Story | As a Service Center Admin, I want to filter the li... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Improves operational efficiency by enabling admins... |
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

I am a logged-in Service Center Admin viewing the service request dashboard

### 3.1.5 When

I select the 'Technician Assigned' status from the status filter dropdown

### 3.1.6 Then

The list of service requests immediately updates to display only the tickets with the status 'Technician Assigned'.

### 3.1.7 Validation Notes

Verify the API call includes the correct status parameter and the UI renders only matching results.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Filter by date range

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in Service Center Admin viewing the service request dashboard

### 3.2.5 When

I select a start date and an end date using the date range picker

### 3.2.6 Then

The list updates to show only service requests created on or between the selected dates.

### 3.2.7 Validation Notes

Test with various date ranges, including a single day (start and end date are the same).

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Filter by assigned technician

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a logged-in Service Center Admin viewing the service request dashboard

### 3.3.5 When

I select a specific technician's name from the technician filter dropdown

### 3.3.6 Then

The list updates to show only service requests currently assigned to that technician.

### 3.3.7 Validation Notes

The technician dropdown should only list technicians associated with my service center.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Perform a free-text search

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am a logged-in Service Center Admin viewing the service request dashboard

### 3.4.5 When

I type a customer's name into the search bar

### 3.4.6 Then

The list updates as I type (after a short debounce delay) to show only requests where the customer name matches the search term.

### 3.4.7 Validation Notes

Search should be case-insensitive and match on partial strings. It should query fields like customer name, ticket ID, product model, and serial number.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Combine multiple filters

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am a logged-in Service Center Admin viewing the service request dashboard

### 3.5.5 When

I select 'Brand X' from the brand filter AND 'Requested' from the status filter

### 3.5.6 Then

The list updates to show only service requests that are for 'Brand X' AND have the status 'Requested'.

### 3.5.7 Validation Notes

Verify that combining filters uses an AND logic. Test with 3 or more combined filters.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Clear all applied filters

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

I have applied several filters and the service request list is narrowed down

### 3.6.5 When

I click the 'Clear Filters' button

### 3.6.6 Then

All filter controls are reset to their default state and the service request list displays all tickets again.

### 3.6.7 Validation Notes

The search bar should also be cleared. The list should return to its initial, unfiltered, paginated state.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Search or filter yields no results

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I am a logged-in Service Center Admin viewing the service request dashboard

### 3.7.5 When

I apply a combination of filters or a search term that matches no existing service requests

### 3.7.6 Then

The list area displays a user-friendly message, such as 'No service requests found. Please try adjusting your search or filters.'

### 3.7.7 Validation Notes

The system should not show a blank screen or a broken UI.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Invalid date range selection

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

I am using the date range filter

### 3.8.5 When

I select an end date that is earlier than the start date

### 3.8.6 Then

A validation message is displayed near the date picker, the 'Apply' button is disabled, and the filter is not applied.

### 3.8.7 Validation Notes

The list of service requests should not change until a valid date range is selected.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A persistent search input field.
- A dropdown menu for 'Status' (multi-select optional, but single-select for MVP).
- A dropdown menu for 'Brand'.
- A dropdown menu for 'Technician'.
- A date range picker component.
- A 'Clear Filters' button or link.
- A loading indicator/spinner to show while data is being fetched.
- A message display area for 'No results found'.

## 4.2.0 User Interactions

- The list of service requests must update dynamically as filters are applied, without a full page reload.
- The free-text search should trigger automatically after the user stops typing for a brief period (e.g., 300-500ms debounce).
- Applied filters should be visually indicated to the user (e.g., as tags above the list or by retaining values in the filter controls).

## 4.3.0 Display Requirements

- The total count of matching results should be displayed (e.g., 'Showing 25 of 150 requests').

## 4.4.0 Accessibility Needs

- All filter controls must be fully keyboard accessible (navigable with Tab, selectable with Enter/Space).
- All form elements (search input, dropdowns) must have associated `<label>` tags for screen readers.
- Focus states for all interactive elements must be clearly visible.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A Service Center Admin can only view, filter, and search for service requests associated with their own service center.', 'enforcement_point': 'Backend API (data query layer)', 'violation_handling': 'API will return a 403 Forbidden or 404 Not Found error if an admin attempts to access data from another service center.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-061

#### 6.1.1.2 Dependency Reason

This story adds filtering capabilities to the service request dashboard, which must be created first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-065

#### 6.1.2.2 Dependency Reason

The ability to assign technicians must exist to provide data for the 'filter by technician' feature.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-069

#### 6.1.3.2 Dependency Reason

The technician roster management feature is required to populate the list of technicians in the filter dropdown.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint capable of handling combined query parameters for filtering and searching.
- OpenSearch cluster for powering the free-text search functionality.
- Frontend state management library (Zustand) to manage filter states.

## 6.3.0.0 Data Dependencies

- Availability of service request data with populated fields for status, brand, and assigned technician.
- A list of technicians associated with the logged-in admin's service center.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for any filter or search query must be under 500ms for the 95th percentile (P95).
- The UI must render the filtered results in under 2 seconds, including API latency.

## 7.2.0.0 Security

- The API endpoint must be protected and enforce tenancy rules, ensuring an admin from one service center cannot access data from another.
- All search and filter inputs must be sanitized on the backend to prevent injection attacks (e.g., SQLi, XSS).

## 7.3.0.0 Usability

- The filter controls should be intuitive and follow standard web conventions.
- It must be easy to see which filters are currently active and to clear them.

## 7.4.0.0 Accessibility

- The feature must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend: Building a robust and performant database query that handles multiple optional filter parameters.
- Backend: Integrating with OpenSearch for efficient and relevant free-text searching.
- Frontend: Managing the state of multiple active filters and ensuring the UI updates smoothly.
- Frontend: Implementing a debounced search input to prevent excessive API calls.

## 8.3.0.0 Technical Risks

- Poorly constructed database queries could lead to slow performance as the number of service requests grows. Proper indexing on filterable columns is critical.
- Complex state management on the frontend could lead to bugs if not handled carefully.

## 8.4.0.0 Integration Points

- Backend API for service requests.
- OpenSearch service for search indexing and querying.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Test each filter individually.
- Test various combinations of 2, 3, and 4 filters.
- Test search functionality with full and partial terms.
- Test the 'Clear Filters' functionality.
- Test the 'No results found' scenario.
- Test pagination in conjunction with active filters.
- Verify that a Service Center Admin cannot see data from another center by attempting to manipulate API calls.

## 9.3.0.0 Test Data Needs

- A significant number of service requests (>1000) with varied statuses, brands, assignment dates, and assigned technicians.
- Multiple service centers, each with their own set of admins and technicians, to test data segregation.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend API tests.
- Playwright for E2E testing.
- A load testing tool (e.g., k6, JMeter) for performance testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests for new logic achieve at least 80% code coverage.
- E2E tests covering the main happy paths and edge cases are implemented and passing.
- Performance testing confirms API response times are within the defined NFRs.
- UI has been reviewed for usability and adherence to design specifications.
- Accessibility audit passed against WCAG 2.1 AA standards.
- Backend API endpoint is documented in the OpenAPI specification.
- Story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for the Service Center Admin panel and a high-value item for users. It requires coordinated work between frontend and backend developers.
- Ensure prerequisite stories are completed before starting this one.

## 11.4.0.0 Release Impact

- Significantly enhances the usability of the Service Center Admin portal, making it a key feature for the initial release to service centers.

