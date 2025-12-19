# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-079 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: Activate 'Travel Mode' to share my loc... |
| As A User Story | As a Technician, I want to activate a 'Travel Mode... |
| User Persona | Technician using the mobile application. |
| Business Value | Enhances customer satisfaction through real-time t... |
| Functional Area | Service Request Management |
| Story Theme | Real-Time Job Tracking |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful activation of Travel Mode with permissions granted

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The technician is logged into the mobile app and is viewing the details of an assigned job with the status 'Technician Assigned' or 'Acknowledged'

### 3.1.5 When

The technician taps the 'Activate Travel Mode' button and grants location permissions when prompted

### 3.1.6 Then

The button's UI state changes to indicate that Travel Mode is active (e.g., 'Deactivate Travel Mode' or a visual toggle).

### 3.1.7 And

An audit log is created that records the activation event, including Technician ID, Service Request ID, and a timestamp.

### 3.1.8 Validation Notes

Verify that location updates are received by the backend WebSocket service and are correctly associated with the job. The UI change on the technician's app must be immediate.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician denies location permissions

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

The technician is viewing the details of an assigned job

### 3.2.5 When

The technician taps the 'Activate Travel Mode' button and explicitly denies the OS-level location permission prompt

### 3.2.6 Then

A user-friendly message is displayed explaining that location permissions are required for this feature to work.

### 3.2.7 And

Travel Mode remains inactive.

### 3.2.8 Validation Notes

Test on both iOS and Android. The app should not crash. The feature should remain disabled until permissions are granted manually in settings.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Location sharing continues when the app is in the background

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

The technician has successfully activated Travel Mode for a job

### 3.3.5 When

The technician navigates away from the app or locks their device screen

### 3.3.6 Then

A persistent notification is displayed in the device's OS (e.g., status bar) indicating that location is being actively shared for a job.

### 3.3.7 And

The application continues to send location updates to the backend.

### 3.3.8 Validation Notes

Requires testing on physical devices for both iOS and Android. Verify that location updates are still being received by the backend while the app is backgrounded.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to activate Travel Mode without an internet connection

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The technician's device has no active internet connection (Wi-Fi or cellular)

### 3.4.5 When

The technician taps the 'Activate Travel Mode' button

### 3.4.6 Then

An error message is displayed informing the technician that an internet connection is required.

### 3.4.7 And

Travel Mode remains inactive.

### 3.4.8 Validation Notes

Use device settings to disable network connectivity and test the app's response.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Location data is associated only with the active job

### 3.5.3 Scenario Type

Security

### 3.5.4 Given

The technician has activated Travel Mode for a specific job (Job A)

### 3.5.5 When

The system processes the location updates

### 3.5.6 Then

The location data is only made available to the customer associated with Job A.

### 3.5.7 And

The location data is not visible to any other customer or associated with any other job.

### 3.5.8 Validation Notes

Backend test to ensure the WebSocket topic/channel for location data is specific to the service request ID and that authorization checks prevent cross-customer data leakage.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly labeled button or toggle switch on the job details screen, e.g., 'Activate Travel Mode'.
- A persistent OS-level notification (for background tracking) with text like 'Your location is being shared for Job #XXXXX'.
- A non-modal alert/toast message for error conditions (e.g., no internet, permissions denied).

## 4.2.0 User Interactions

- Tapping the button initiates the location sharing workflow.
- The button state must visually change to reflect whether Travel Mode is active or inactive.
- The app must handle the native OS permission dialog for location access.

## 4.3.0 Display Requirements

- The UI must provide clear, immediate feedback that the mode has been successfully activated or has failed.

## 4.4.0 Accessibility Needs

- The 'Activate Travel Mode' button must have a proper accessibility label for screen readers.
- State changes (active/inactive) must be announced by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Location sharing via 'Travel Mode' can only be activated for a job that is in an active state (e.g., 'Acknowledged', 'Technician Assigned').

### 5.1.3 Enforcement Point

Mobile application logic before attempting to activate.

### 5.1.4 Violation Handling

The 'Activate Travel Mode' button shall be disabled or hidden for jobs in terminal states like 'Resolved', 'Closed', or 'Cancelled'.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Location data history must be purged 24 hours after job completion, as per SRS section 3.5.

### 5.2.3 Enforcement Point

Backend system via a scheduled job or TTL policy.

### 5.2.4 Violation Handling

N/A - System process. Failure should trigger a high-priority alert to the engineering team.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-077

#### 6.1.1.2 Dependency Reason

This story adds the 'Activate Travel Mode' button to the job details screen, which is provided by US-077.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-044

#### 6.1.2.2 Dependency Reason

This story provides the location data that US-044 (customer view) will consume. The two stories should be developed and tested in conjunction.

## 6.2.0.0 Technical Dependencies

- A backend microservice (Location Service) capable of handling secure WebSocket (WSS) connections.
- Azure API Management configured to route WebSocket traffic.
- Mobile app access to native device GPS hardware and background location services APIs (iOS Core Location, Android FusedLocationProviderClient).

## 6.3.0.0 Data Dependencies

- Requires a valid, assigned Service Request ID to associate the location data with.

## 6.4.0.0 External Dependencies

- Relies on the device's operating system (iOS/Android) to provide location services and manage user permissions.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Location updates from the technician's device to the user's map display shall have a latency of less than 2 seconds.
- The frequency of location updates should be optimized to balance real-time tracking with device battery and data consumption (e.g., every 10-15 seconds or on significant location change).

## 7.2.0.0 Security

- All location data must be transmitted over a secure, encrypted channel (WSS using TLS 1.3).
- Access to location data must be strictly controlled via RBAC, ensuring only the customer associated with the specific service request can view it.
- The system must log the activation and deactivation of Travel Mode for auditing purposes.
- Location data must be purged from all systems within 24 hours of job completion.

## 7.3.0.0 Usability

- Activating the feature should require a single, intuitive action from the technician.
- The status of location sharing must be clearly visible to the technician at all times while active.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported versions of iOS (14.0+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

High

## 8.2.0.0 Complexity Factors

- Implementing reliable background location tracking is platform-specific and complex on modern mobile OSes.
- Managing the lifecycle of WebSocket connections on the backend for scalability and reliability.
- Handling various failure modes such as loss of GPS signal or network connectivity.
- Ensuring strict data privacy and security controls are correctly implemented and enforced.

## 8.3.0.0 Technical Risks

- Changes in future iOS/Android versions may break background location functionality.
- High battery consumption on the technician's device if not implemented efficiently.
- Potential for location data inaccuracies due to poor GPS signal in certain areas.

## 8.4.0.0 Integration Points

- Technician Mobile App <-> Device GPS Hardware
- Technician Mobile App <-> Backend Location Service (via WSS)
- Backend Location Service <-> Customer Mobile App (via WSS)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security
- Usability

## 9.2.0.0 Test Scenarios

- Verify successful activation/deactivation of Travel Mode.
- Test handling of location permission denial and subsequent granting in device settings.
- Validate continuous location tracking while the app is in the background and the device is locked.
- Simulate loss and restoration of network connectivity and GPS signal during active tracking.
- E2E test: Technician activates mode, drives a route, and a test client (as customer) verifies the location updates on a map in near real-time.

## 9.3.0.0 Test Data Needs

- Test accounts for a Technician and a Customer.
- An assigned service request linking the two accounts.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for mobile app unit tests.
- Supertest for backend unit/integration tests.
- Requires manual testing on physical iOS and Android devices to validate real-world GPS and background behavior.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage
- Integration testing between mobile app and backend WebSocket service completed successfully
- User interface reviewed and approved for both button states and error messages
- Performance requirements for latency and battery impact are verified through testing
- Security requirements for data transmission and access control are validated
- Documentation for the Location Service API and mobile implementation is created/updated
- Story deployed and verified in the staging environment on both iOS and Android physical devices

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

13

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a high-complexity story requiring expertise in both mobile (native background services) and backend (WebSockets).
- Should be planned in the same sprint as US-080 (Deactivate Travel Mode) and US-044 (Customer view) for cohesive feature delivery.
- Allocate sufficient time for manual testing on physical devices in various network conditions.

## 11.4.0.0 Release Impact

This is a major customer-facing feature that significantly enhances the value proposition of the platform. It will be a key feature in release notes and marketing.

