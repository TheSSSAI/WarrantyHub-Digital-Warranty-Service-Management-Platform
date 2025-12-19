# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-051 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician Views Assigned Jobs List on Mobile App |
| As A User Story | As a Technician, I want to view a clear, organized... |
| User Persona | Technician: A field service professional who uses ... |
| Business Value | Improves operational efficiency for technicians by... |
| Functional Area | Technician Mobile Application |
| Story Theme | Technician Job Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Technician views their assigned jobs for the current day

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the Technician is authenticated and logged into the mobile app, and has multiple jobs assigned for the current date

### 3.1.5 When

the Technician navigates to the 'My Jobs' screen

### 3.1.6 Then

a list of all jobs assigned to them for the current day is displayed

### 3.1.7 And

each job card has a visible status indicator (e.g., 'New', 'Acknowledged').

### 3.1.8 Validation Notes

Verify the API call fetches jobs for the correct technician and date. Confirm the UI correctly renders the sorted list and all required data points on each card.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician has no jobs assigned for the current day

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Technician is authenticated and logged into the mobile app, and has no jobs assigned for the current date

### 3.2.5 When

the Technician navigates to the 'My Jobs' screen

### 3.2.6 Then

a user-friendly message is displayed, such as 'You have no jobs scheduled for today'

### 3.2.7 And

the screen does not show an empty list container or an error message.

### 3.2.8 Validation Notes

Verify that an empty array from the API triggers the 'no jobs' UI state, not an error state.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Technician manually refreshes the job list

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

the Technician is viewing the 'My Jobs' screen

### 3.3.5 When

the Technician performs a pull-to-refresh gesture

### 3.3.6 Then

the app re-fetches the latest job list from the server for the currently selected date

### 3.3.7 And

the list updates to reflect any new assignments or status changes.

### 3.3.8 Validation Notes

Use a tool like Charles or Fiddler to confirm a new API request is made upon pull-to-refresh. Manually assign a new job via the admin panel and verify it appears after refresh.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Technician views jobs for a future date

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

the Technician is viewing the 'My Jobs' screen for today

### 3.4.5 When

the Technician uses the date selector to choose a future date (e.g., tomorrow)

### 3.4.6 Then

the list updates to show all jobs assigned to them for the selected future date, sorted chronologically.

### 3.4.7 Validation Notes

Verify the API is called with the correct future date parameter and the UI updates accordingly.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Technician views job list while offline

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

the Technician has previously opened the app and successfully loaded their job list

### 3.5.5 When

the Technician opens the app or navigates to the 'My Jobs' screen with no network connectivity

### 3.5.6 Then

the app displays the last successfully cached version of the job list

### 3.5.7 And

a clear visual indicator (e.g., a banner at the top) is displayed stating 'Offline Mode. Data may not be up to date.'

### 3.5.8 Validation Notes

Load the app with network on. Turn on airplane mode. Close and reopen the app. Verify the cached list appears with the offline indicator.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

API fails to load the job list

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

the Technician is logged in with an active network connection

### 3.6.5 When

the app attempts to fetch the job list and the backend API returns a 5xx error

### 3.6.6 Then

a user-friendly error message is displayed, such as 'Could not load jobs. Please try again.'

### 3.6.7 And

a 'Retry' button is provided to allow the user to re-trigger the API call.

### 3.6.8 Validation Notes

Mock the API to return a 500 error and verify the error UI state is triggered correctly and the retry button functions as expected.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Date selector (e.g., calendar icon, left/right arrows for day navigation)
- List view for job cards
- Individual 'Job Card' component
- Pull-to-refresh indicator
- Loading state indicator (e.g., spinner)
- Empty state message component
- Error state message component with a 'Retry' button
- Offline mode indicator banner

## 4.2.0 User Interactions

- User can scroll vertically through the list of jobs.
- User can tap on a job card to navigate to the job details screen (as per US-052).
- User can use a pull-to-refresh gesture to update the list.
- User can interact with the date selector to change the displayed day.

## 4.3.0 Display Requirements

- The currently selected date must be clearly displayed.
- Each job card must show: Customer Name, Address (truncated), Issue Type, Time Slot, and Status.
- The list must be sorted chronologically by time slot.

## 4.4.0 Accessibility Needs

- The job list must be navigable using screen readers (e.g., VoiceOver, TalkBack).
- Each job card's content should be read out logically.
- All tappable elements must have a minimum touch target size of 44x44 points.
- Color contrast for text and status indicators must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A Technician can only view jobs that are explicitly assigned to them.', 'enforcement_point': "Backend API (server-side). The API must filter jobs based on the authenticated technician's ID from the JWT.", 'violation_handling': 'The API should return a 403 Forbidden error if a technician attempts to access jobs not assigned to them, though the primary mechanism is filtering.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-096

#### 6.1.1.2 Dependency Reason

Technician must be able to log in and be authenticated before they can view their assigned jobs.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-048

#### 6.1.2.2 Dependency Reason

A mechanism for a Service Center Admin to assign jobs to a technician must exist for there to be any data to display.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-049

#### 6.1.3.2 Dependency Reason

The system must support the creation and management of Technician user profiles.

## 6.2.0.0 Technical Dependencies

- A secure backend API endpoint (e.g., GET /api/v1/technician/jobs) that accepts a date parameter and returns jobs for the authenticated user.
- Azure AD B2C for technician authentication and JWT issuance.
- Mobile application local caching/storage solution (e.g., AsyncStorage, MMKV, or a local database like WatermelonDB) for offline support.

## 6.3.0.0 Data Dependencies

- Requires access to Service Request data, including customer details, product information, and scheduling information.
- Requires access to Technician assignment records.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The job list should load in under 2 seconds on a standard 4G connection.
- UI scrolling must be smooth (60 FPS) even with a list of 20+ jobs.

## 7.2.0.0 Security

- All API communication must be over HTTPS.
- The API endpoint must validate the technician's JWT and ensure they can only access their own data (enforce tenancy).

## 7.3.0.0 Usability

- The layout must be clean and information easily scannable.
- Feedback for all states (loading, error, empty, offline) must be immediate and clear.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The mobile application must function correctly on iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing a robust offline caching strategy with a clear 'stale data' indicator.
- Managing multiple UI states (loading, data, empty, error) effectively.
- Ensuring performant list rendering, potentially using virtualization (e.g., FlatList in React Native).
- Secure API endpoint design and implementation.

## 8.3.0.0 Technical Risks

- Poor network conditions in the field could lead to synchronization issues if the offline strategy is not robust.
- Potential for performance degradation if the list contains a very large number of jobs for a single day.

## 8.4.0.0 Integration Points

- Authentication service (Azure AD B2C).
- Backend Service Request/Job Management microservice.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Log in as a technician with 0, 1, and 20+ jobs for today.
- Log in and switch to a future date with jobs.
- Log in and switch to a future date with no jobs.
- Test pull-to-refresh functionality.
- Test offline mode by enabling airplane mode after initial load.
- Test API error handling by mocking a 500 server response.
- Verify that a technician cannot access another technician's jobs via API manipulation.

## 9.3.0.0 Test Data Needs

- Multiple technician accounts.
- Service requests assigned to different technicians on different dates.
- Service requests with varying statuses.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/integration tests.
- Cypress or a similar framework for E2E tests.
- Postman or Insomnia for API endpoint testing.
- Physical devices for manual QA.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and achieve a minimum of 80% code coverage for the new logic.
- E2E tests covering the happy path and key alternative flows are passing.
- The feature has been manually tested and verified on the target iOS and Android versions.
- Performance on a list of 20+ items is confirmed to be smooth.
- Backend API endpoint is secured and documented in Swagger/OpenAPI.
- Any new UI components meet accessibility standards (WCAG 2.1 AA).
- The feature is deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the Technician mobile app and is a blocker for other job management stories (US-052, US-053). It should be prioritized in an early sprint of the mobile app development track.

## 11.4.0.0 Release Impact

- This feature is critical for the Minimum Viable Product (MVP) of the Technician mobile application.

