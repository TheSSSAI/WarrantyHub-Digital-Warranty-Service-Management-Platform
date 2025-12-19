# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-076 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: View my list of assigned jobs |
| As A User Story | As a Technician, I want to see a list of all servi... |
| User Persona | Technician: A field service professional using the... |
| Business Value | Provides technicians with a clear, organized view ... |
| Functional Area | Technician Mobile Application |
| Story Theme | Job Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display of assigned jobs in correct chronological order

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Technician is logged into the mobile application and has multiple jobs assigned for the day with different appointment times

### 3.1.5 When

the Technician navigates to the 'My Jobs' screen

### 3.1.6 Then

a list of all jobs assigned only to them is displayed, sorted by appointment date and time in ascending order (earliest first).

### 3.1.7 Validation Notes

Verify via API response and UI rendering that the job list is filtered for the logged-in technician and the primary sort order is by appointment time.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Information displayed for each job in the list

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Technician is viewing their list of assigned jobs

### 3.2.5 When

they look at any single job item in the list

### 3.2.6 Then

the item must display at a minimum: Customer Name, Appointment Time, Service Address (City, Postal Code), and the current Job Status (e.g., 'Acknowledged').

### 3.2.7 Validation Notes

Check the UI to confirm that all required data fields are present and correctly populated for each list item.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Technician has no jobs assigned

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

a Technician is logged into the mobile application and has no jobs currently assigned to them

### 3.3.5 When

the Technician navigates to the 'My Jobs' screen

### 3.3.6 Then

an empty state message is displayed, such as 'You have no jobs assigned at the moment.'

### 3.3.7 Validation Notes

Test with a technician user who has a zero count of assigned jobs in the database. The UI should show the specified message, not a blank screen or a loading spinner.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Failure to fetch job list from the server

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

the Technician's device has no internet connectivity or the backend API is unavailable

### 3.4.5 When

the Technician attempts to view the 'My Jobs' screen

### 3.4.6 Then

a user-friendly error message is displayed, such as 'Could not load jobs. Please check your connection and try again.'

### 3.4.7 And

a 'Retry' button or a pull-to-refresh mechanism is available to re-attempt the data fetch.

### 3.4.8 Validation Notes

Simulate network failure using device settings or network throttling tools. Verify the error message and the functionality of the retry mechanism.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Loading state while fetching jobs

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

a Technician is navigating to the 'My Jobs' screen

### 3.5.5 When

the application is fetching the job list from the server

### 3.5.6 Then

a visual loading indicator (e.g., a spinner) is displayed until the data is loaded or an error occurs.

### 3.5.7 Validation Notes

Use network throttling to slow down the API response and confirm the loading indicator is visible during the fetch.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Manually refreshing the job list

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the Technician is viewing their list of assigned jobs

### 3.6.5 When

they perform a pull-to-refresh gesture on the list

### 3.6.6 Then

the application re-fetches the latest job list from the server and updates the view.

### 3.6.7 Validation Notes

While the list is open, assign a new job to the technician via the admin panel. Perform pull-to-refresh and verify the new job appears in the list.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Scrollable list view (e.g., React Native FlatList)
- Individual list item component for each job
- Loading indicator (spinner)
- Empty state message component
- Error message component with a 'Retry' button

## 4.2.0 User Interactions

- The user can scroll vertically through the list of jobs.
- The user can perform a pull-to-refresh gesture to update the list.
- Tapping on a job item will navigate the user to the job details screen (US-077).

## 4.3.0 Display Requirements

- Jobs must be sorted chronologically (ascending) by appointment time.
- Each list item must clearly display Customer Name, Appointment Time, Address, and Status.
- The UI should be clean and easily readable in various lighting conditions, typical for field work.

## 4.4.0 Accessibility Needs

- List items must be compatible with screen readers (e.g., VoiceOver, TalkBack).
- Text must meet WCAG 2.1 AA contrast ratio standards.
- Tappable areas for list items and buttons must be at least 44x44 points.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A technician can only view jobs that are explicitly assigned to their user profile.', 'enforcement_point': 'Backend API endpoint for fetching jobs.', 'violation_handling': "API request will return an empty list or a 403 Forbidden error if a technician attempts to access jobs not assigned to them. The primary enforcement is filtering by the authenticated user's ID."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-075

#### 6.1.1.2 Dependency Reason

Technician must be able to log in to be authenticated and identified by the system.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-065

#### 6.1.2.2 Dependency Reason

A mechanism must exist for a Service Center Admin to assign jobs to a technician. Without this, the list will always be empty.

## 6.2.0.0 Technical Dependencies

- A secure backend API endpoint (e.g., GET /api/v1/technician/jobs) that returns jobs for the authenticated technician.
- The mobile app's authentication system (Azure AD B2C JWT) must be functional to make authorized API calls.
- Database schema must support the assignment of a Service Request to a Technician.

## 6.3.0.0 Data Dependencies

- Requires test data including multiple technicians and service requests assigned to them with varying appointment times and statuses.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The job list must load in under 3 seconds on a standard 4G mobile connection.
- Scrolling through the list must be smooth (60 FPS) even with 50+ items.

## 7.2.0.0 Security

- The API endpoint must be protected and require a valid JWT from an authenticated Technician.
- The API logic must strictly enforce that a technician can only retrieve their own jobs (no IDOR vulnerabilities).

## 7.3.0.0 Usability

- The job list should be the default or home screen for the technician upon logging in.
- Information density should be optimized for quick scanning on a mobile device.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported versions of iOS (14.0+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Standard list-view implementation with a backend API call.
- Requires state management for loading, data, empty, and error states.
- Backend query is a simple filtered and sorted select statement.

## 8.3.0.0 Technical Risks

- Potential for slow performance if the API response is not paginated and a technician has a very large number of historical jobs. Pagination should be considered for future-proofing.

## 8.4.0.0 Integration Points

- Backend: Integrates with the authentication service to identify the user and the database to fetch service requests.
- Frontend: Integrates with the navigation stack to transition to the job details screen (US-077).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Log in as a technician with multiple jobs and verify the list and sort order.
- Log in as a technician with zero jobs and verify the empty state message.
- Simulate a network error and verify the error message and retry functionality.
- Verify that tapping a job navigates to the correct details screen.
- Use an API client to test that one technician cannot fetch another technician's jobs.

## 9.3.0.0 Test Data Needs

- At least two technician accounts.
- One technician account with 5+ assigned jobs with different statuses and appointment times.
- One technician account with 0 assigned jobs.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend API tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for new code, meeting 80% coverage target
- E2E test scenario for viewing the job list is automated and passing
- User interface reviewed by a UX designer and approved
- Performance requirements (load time) verified on a target device
- API endpoint security (RBAC) validated
- API documentation (OpenAPI) is updated for the new endpoint
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the Technician app and likely a blocker for other technician-related stories.
- Requires both frontend (React Native) and backend (NestJS) development effort.

## 11.4.0.0 Release Impact

This feature is critical for the Minimum Viable Product (MVP) of the Technician mobile application.

