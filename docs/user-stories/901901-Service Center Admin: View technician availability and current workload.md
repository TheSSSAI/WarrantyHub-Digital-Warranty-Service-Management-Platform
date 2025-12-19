# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-064 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: View technician availability... |
| As A User Story | As a Service Center Admin, I want to view a real-t... |
| User Persona | Service Center Admin |
| Business Value | Improves operational efficiency by enabling inform... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management & Dispatching |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display of all active technicians

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Service Center Admin is logged into the Service Center Panel

### 3.1.5 When

the admin navigates to the technician management or dashboard view

### 3.1.6 Then

a list of all active technicians associated with their service center is displayed.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Display of technician availability status

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the list of active technicians is displayed

### 3.2.5 When

the admin views the list

### 3.2.6 Then

each technician's entry clearly displays their current availability status: 'Available', 'On-Job', or 'Offline'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Display of technician workload count

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the list of active technicians is displayed

### 3.3.5 When

the admin views the list

### 3.3.6 Then

each technician's entry displays a numerical count of their currently open service requests.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Correct calculation of 'On-Job' status

### 3.4.3 Scenario Type

Business_Rule

### 3.4.4 Given

a technician is assigned to one or more service requests

### 3.4.5 When

at least one of those requests has a status of 'Technician On The Way' or 'Work In Progress'

### 3.4.6 Then

the technician's availability status is automatically displayed as 'On-Job'.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Correct calculation of 'Available' status

### 3.5.3 Scenario Type

Business_Rule

### 3.5.4 Given

a technician is logged into the mobile application

### 3.5.5 And

they have no service requests with a status of 'Technician On The Way' or 'Work In Progress'

### 3.5.6 When

the system checks their status

### 3.5.7 Then

the technician's availability status is displayed as 'Available'.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Correct calculation of 'Offline' status

### 3.6.3 Scenario Type

Business_Rule

### 3.6.4 Given

a technician is not actively logged into the technician mobile app (e.g., logged out or session expired)

### 3.6.5 When

the system checks their status

### 3.6.6 Then

the technician's availability status is displayed as 'Offline'.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Real-time updates to the dashboard

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

the Service Center Admin is viewing the technician availability dashboard

### 3.7.5 When

a technician's status changes (e.g., they log in, start a job, or a new ticket is assigned)

### 3.7.6 Then

the dashboard updates automatically to reflect the new status and workload count without requiring a manual page refresh.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

View when no technicians are registered

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

a Service Center Admin is logged in

### 3.8.5 And

their service center has no technicians added to the roster

### 3.8.6 When

they navigate to the technician availability view

### 3.8.7 Then

an informative message is displayed, such as 'No technicians found. Please add technicians to your roster.'

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

Deactivated technicians are not displayed

### 3.9.3 Scenario Type

Alternative_Flow

### 3.9.4 Given

a service center has both active and deactivated technicians

### 3.9.5 When

the admin views the technician availability list

### 3.9.6 Then

only the active technicians are displayed.

## 3.10.0 Criteria Id

### 3.10.1 Criteria Id

AC-010

### 3.10.2 Scenario

Data fails to load

### 3.10.3 Scenario Type

Error_Condition

### 3.10.4 Given

the admin is on the technician availability page

### 3.10.5 When

the backend API call to fetch technician data fails

### 3.10.6 Then

a user-friendly error message is displayed with an option to retry the action.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A table or list view for technicians.
- Columns/sections for Technician Name, Availability Status, and Workload Count.
- Color-coded status indicators (e.g., Green dot for 'Available', Orange for 'On-Job', Grey for 'Offline').
- Sortable headers for Name, Status, and Workload.

## 4.2.0 User Interactions

- Admin can sort the technician list by clicking on column headers.
- The view should update in near real-time without user intervention.

## 4.3.0 Display Requirements

- Technician's full name.
- A clear, textual status label alongside the color-coded indicator.
- An integer representing the count of open tickets.

## 4.4.0 Accessibility Needs

- The view must comply with WCAG 2.1 Level AA.
- Status indicators must have accessible text labels for screen readers (e.g., aria-label).
- The list/table must be fully navigable using a keyboard.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

An 'open' service request, for the purpose of workload calculation, is defined as any ticket with a status of 'Acknowledged', 'Technician Assigned', 'Technician On The Way', or 'Work In Progress'.

### 5.1.3 Enforcement Point

Backend service that aggregates technician workload data.

### 5.1.4 Violation Handling

N/A - This is a definitional rule for a calculation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A technician's availability status is determined by their mobile app session and active job status, with 'On-Job' taking precedence over 'Available'.

### 5.2.3 Enforcement Point

Backend service that determines technician availability.

### 5.2.4 Violation Handling

N/A - This is a logic rule.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-060

#### 6.1.1.2 Dependency Reason

Admin must be able to log in to access the panel.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-069

#### 6.1.2.2 Dependency Reason

Functionality to add technicians must exist to populate the list.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-071

#### 6.1.3.2 Dependency Reason

The view must filter out deactivated technicians.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-075

#### 6.1.4.2 Dependency Reason

Technician login status from the mobile app is required to determine 'Available' vs 'Offline' status.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-078

#### 6.1.5.2 Dependency Reason

Technician job status updates from the mobile app are required to determine 'On-Job' status.

## 6.2.0.0 Technical Dependencies

- A backend service capable of aggregating data from technician profiles, service requests, and session management.
- A real-time communication channel (e.g., WebSockets via Azure SignalR or similar) to push updates from the backend to the Service Center web panel.

## 6.3.0.0 Data Dependencies

- Access to the Technicians table/collection.
- Access to the Service Requests table/collection.
- Access to technician session/status data (e.g., from Redis or a status service).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The initial load of the technician availability view must have a Largest Contentful Paint (LCP) of less than 2.5 seconds.
- Real-time status updates must appear on the admin's screen within 5 seconds of the triggering event (e.g., technician status change).

## 7.2.0.0 Security

- The API endpoint providing this data must be protected and only accessible by authenticated users with the 'Service Center Admin' role.
- The data returned must be strictly scoped to the technicians belonging to the admin's own service center.

## 7.3.0.0 Usability

- The view must be intuitive, providing an at-a-glance understanding of the team's status without requiring complex interpretation.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge, and be responsive down to tablet screen sizes.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementation of the real-time update mechanism (WebSockets) adds complexity over a standard REST API.
- Backend query requires efficient aggregation of data from multiple sources (technicians, service requests, sessions) to avoid performance issues.
- Defining and reliably tracking the 'Offline' status requires a robust session management or heartbeat mechanism from the technician mobile app.

## 8.3.0.0 Technical Risks

- Potential for performance bottlenecks in the data aggregation query as the number of technicians and service requests grows.
- Maintaining stable, persistent WebSocket connections can be complex and resource-intensive.

## 8.4.0.0 Integration Points

- Technician mobile app (for sending status updates).
- Service Request module (for ticket data).
- User Authentication/Authorization service (for session data).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify correct display for a service center with 0, 1, and multiple technicians.
- Simulate a technician logging in/out of the mobile app and verify the status changes to 'Available'/'Offline' on the admin panel.
- Simulate a technician starting a job ('On The Way') and verify the status changes to 'On-Job'.
- Simulate a technician completing all jobs and verify the status reverts to 'Available'.
- Verify workload count increments/decrements correctly as tickets are assigned and closed.

## 9.3.0.0 Test Data Needs

- A test service center account.
- Multiple test technician accounts.
- Test service requests that can be assigned to technicians and have their statuses changed.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage
- Integration testing completed successfully
- E2E tests for key scenarios are implemented and passing
- User interface reviewed and approved for responsiveness and usability
- Performance requirements verified under simulated load
- Security requirements validated (role-based access control)
- Accessibility audit passed (WCAG 2.1 AA)
- Documentation for the API endpoint is created/updated in OpenAPI spec
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core feature for the Service Center Admin persona and a prerequisite for efficient dispatching.
- Requires coordination between backend, frontend (web), and mobile app teams to ensure status updates are sent and received correctly.
- The backend API contract should be finalized early in the sprint to allow for parallel development.

## 11.4.0.0 Release Impact

- Significantly enhances the value of the Service Center Panel by providing critical operational visibility.

