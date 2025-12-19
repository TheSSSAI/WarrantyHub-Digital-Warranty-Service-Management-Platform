# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-101 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Views Real-Time Technician Av... |
| As A User Story | As a Service Center Admin, I want to view a real-t... |
| User Persona | Service Center Admin |
| Business Value | Improves operational efficiency by enabling data-d... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management & Dispatch |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-101-01

### 3.1.2 Scenario

Displaying all active technicians

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Service Center Admin is logged into the Service Center Panel and has multiple active technicians in their roster

### 3.1.5 When

the admin navigates to the 'Technician Availability' view

### 3.1.6 Then

a list of all technicians associated ONLY with their service center is displayed.

### 3.1.7 Validation Notes

Verify that technicians from other service centers are not visible. Test with an admin account that has technicians assigned.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-101-02

### 3.2.2 Scenario

Displaying key information for each technician

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Technician Availability view is open

### 3.2.5 When

the list of technicians is rendered

### 3.2.6 Then

each technician entry must display their Full Name, a defined Availability Status ('Available', 'On a Job', 'Traveling', 'Offline'), and a Daily Workload Summary (e.g., 'Assigned: 5, Completed: 2').

### 3.2.7 Validation Notes

Check that all required data fields are present and correctly formatted for each technician in the list.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-101-03

### 3.3.2 Scenario

Real-time status updates

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the Service Center Admin is viewing the Technician Availability dashboard

### 3.3.5 And

a technician in the field updates their job status from 'Work In Progress' to 'Resolved' via their mobile app

### 3.3.6 When

the status change is processed by the system

### 3.3.7 Then

the technician's Availability Status on the admin's dashboard automatically updates to 'Available' within 5 seconds without requiring a page refresh.

### 3.3.8 Validation Notes

This requires a real-time connection (e.g., WebSocket). Test by simulating a status update from the technician app and observing the admin panel.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-101-04

### 3.4.2 Scenario

Displaying technician location when in 'Travel Mode'

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a technician has activated 'Travel Mode' for an assigned job

### 3.4.5 When

the Service Center Admin views the Technician Availability dashboard

### 3.4.6 Then

that technician's entry displays their current location as a pin on an embedded map view, and their status is 'Traveling'.

### 3.4.7 Validation Notes

Verify that the location is only shown when 'Travel Mode' is active. If not active, no map should be shown for that technician.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-101-05

### 3.5.2 Scenario

Handling technicians with no assigned jobs

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a technician is active but has no jobs assigned for the day

### 3.5.5 When

the admin views the availability dashboard

### 3.5.6 Then

the technician's status is 'Available' and their workload summary shows 'Assigned: 0, Completed: 0'.

### 3.5.7 Validation Notes

Ensure the system correctly handles zero-job scenarios without errors.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-101-06

### 3.6.2 Scenario

Handling offline technicians

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a technician's mobile app has not sent a heartbeat to the server for more than 15 minutes

### 3.6.5 When

the admin views the availability dashboard

### 3.6.6 Then

the technician's status is displayed as 'Offline' and a 'Last seen' timestamp is shown (e.g., 'Last seen: 25 minutes ago').

### 3.6.7 Validation Notes

Test by stopping the technician app or blocking its network connection and verifying the status change on the admin panel after the timeout period.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-101-07

### 3.7.2 Scenario

View for a service center with no technicians

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a Service Center Admin has no technicians added to their roster

### 3.7.5 When

the admin navigates to the Technician Availability view

### 3.7.6 Then

the system displays an informative message, such as 'No technicians found. Please add technicians from the management panel to see their status.'

### 3.7.7 Validation Notes

Test with a newly created service center account that has not completed technician onboarding.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-101-08

### 3.8.2 Scenario

Deactivated technicians are not displayed

### 3.8.3 Scenario Type

Happy_Path

### 3.8.4 Given

a technician's profile has been set to 'deactivated'

### 3.8.5 When

the admin views the availability dashboard

### 3.8.6 Then

the deactivated technician does not appear in the list.

### 3.8.7 Validation Notes

Deactivate a technician via the roster management feature and confirm they are removed from this view.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A main dashboard/view for technician availability.
- A list/grid of technician cards.
- For each card: Technician Name, Status Indicator (icon and text), Workload counters/progress bar.
- Filter controls (e.g., dropdown) for Availability Status.
- Sort controls for the technician list (by Name, Status, Workload).
- An embedded map component to show location for technicians in 'Travel Mode'.

## 4.2.0 User Interactions

- The view should update in real-time without manual refresh.
- Admin can filter the list to show only 'Available' technicians.
- Admin can sort the list by technician name alphabetically.
- Clicking on a technician card could navigate to a detailed view of their assigned jobs for the day (potential future story).

## 4.3.0 Display Requirements

- Availability Status must be clear and distinct (e.g., 'Available', 'On a Job', 'Traveling', 'Offline').
- Workload must clearly show assigned vs. completed jobs for the current day.
- The 'Last seen' timestamp for offline technicians must be human-readable.

## 4.4.0 Accessibility Needs

- Status indicators must use both color and text/icons to be accessible to color-blind users.
- All interactive elements (filters, sort controls) must be keyboard-navigable and have proper ARIA labels.
- The view must comply with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-101-01

### 5.1.2 Rule Description

A Service Center Admin can only view technicians belonging to their own service center.

### 5.1.3 Enforcement Point

Backend API query

### 5.1.4 Violation Handling

API will return a 403 Forbidden or an empty list if an admin attempts to access data outside their tenancy.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-101-02

### 5.2.2 Rule Description

A technician is considered 'Offline' if no heartbeat signal is received from their mobile app within a 15-minute interval.

### 5.2.3 Enforcement Point

Backend status monitoring service

### 5.2.4 Violation Handling

The system updates the technician's status to 'Offline' in the database, which is then pushed to the admin panel.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-049

#### 6.1.1.2 Dependency Reason

The system must allow admins to add/manage technicians before their availability can be viewed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-053

#### 6.1.2.2 Dependency Reason

The technician mobile app must be able to report job status updates for this view to be meaningful.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-054

#### 6.1.3.2 Dependency Reason

The technician mobile app must be able to activate 'Travel Mode' and share location data to fulfill the location-tracking requirement.

## 6.2.0.0 Technical Dependencies

- Backend service for aggregating technician status and workload data.
- Real-time communication infrastructure (e.g., WebSockets via Azure Service Bus/SignalR) to push updates to the web client.
- Technician mobile application capable of sending status updates and location heartbeats.
- Azure Maps API for rendering technician locations.

## 6.3.0.0 Data Dependencies

- Access to the technicians table, filtered by the admin's service center ID.
- Access to the service requests table to calculate workload (jobs assigned/completed per technician).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The initial load of the availability dashboard must be under 2 seconds for a service center with up to 100 technicians.
- Real-time status updates must appear on the dashboard within 5 seconds of the event occurring on the technician's device.

## 7.2.0.0 Security

- All API endpoints for this feature must enforce tenancy, ensuring an admin can only access data for their own service center.
- Data transmission for real-time updates must be over a secure WebSocket (WSS) connection.

## 7.3.0.0 Usability

- The dashboard must provide an at-a-glance understanding of the team's status, requiring minimal clicks to make an assignment decision.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementation of the real-time data pipeline using WebSockets is the primary complexity driver.
- Defining and managing the technician's state machine (Available, Traveling, etc.) on the backend.
- Ensuring the database queries for workload aggregation are performant and do not cause bottlenecks.
- Handling the 'offline' detection logic reliably.

## 8.3.0.0 Technical Risks

- Potential for high latency in the real-time update pipeline if not architected correctly.
- Increased battery consumption on the technician's device due to frequent status/location updates; this must be optimized.

## 8.4.0.0 Integration Points

- Backend API for fetching initial technician list and status.
- WebSocket endpoint for receiving real-time updates.
- Technician mobile app for sending status and location data.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Verify an admin can only see their own technicians.
- Simulate a technician changing status and verify the dashboard updates in real-time.
- Simulate a technician going offline and verify the status changes after the timeout.
- Load test the dashboard with 100 technicians to ensure performance targets are met.

## 9.3.0.0 Test Data Needs

- A service center account with 0 technicians.
- A service center account with 10+ technicians in various states (Available, On a Job, Traveling, Offline).
- Technician accounts to simulate status changes from a mobile device/client.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for NestJS backend unit tests.
- Cypress for E2E testing.
- A WebSocket client tool for simulating technician updates during backend testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other engineer
- Unit and integration tests implemented with >80% code coverage
- E2E tests for core scenarios (viewing list, real-time update) are passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements verified under simulated load
- Security requirements (tenancy) validated via automated and manual tests
- Documentation for the new API endpoints and WebSocket events is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story introduces real-time functionality. If the WebSocket infrastructure is not yet in place, a technical spike may be needed first, or this story's estimate must account for that setup.
- Requires coordination between frontend, backend, and mobile development efforts.

## 11.4.0.0 Release Impact

This is a cornerstone feature for the Service Center Admin persona and is critical for achieving operational efficiency goals. It should be included in the first release targeted at Service Centers.

