# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-126 |
| Elaboration Date | 2024-10-27 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Receives Push Notification with ETA when Tech... |
| As A User Story | As a User with a scheduled service visit, I want t... |
| User Persona | The end-user (Consumer) who has raised a service r... |
| Business Value | Improves customer satisfaction by providing proact... |
| Functional Area | Service Request Management & Notifications |
| Story Theme | Real-Time Service Tracking |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User receives notification with ETA

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a User has an active service request with a Technician assigned, AND the User is logged into the mobile app and has enabled push notifications

### 3.1.5 When

the assigned Technician updates the service request status to 'On The Way' in their mobile application

### 3.1.6 Then

the system sends a push notification to the User's registered device(s) within 10 seconds of the status update event being processed, AND the notification content clearly states the technician is en route and includes a calculated ETA (e.g., 'Arriving in ~25 mins'), AND tapping the notification opens the app and deep-links directly to the corresponding service request tracking screen.

### 3.1.7 Validation Notes

Verify via E2E test: Technician updates status on one device, User receives notification on another. Check notification payload for ETA. Verify deep link navigation.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: ETA calculation service is unavailable

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

a User has an active service request, AND the external mapping service (Azure Maps) used for ETA calculation is unresponsive or returns an error

### 3.2.5 When

the assigned Technician updates the service request status to 'On The Way'

### 3.2.6 Then

the system sends a push notification to the User's device, AND the notification content states the technician is on the way but indicates the ETA is currently unavailable (e.g., 'Your technician is on the way. ETA is unavailable at this moment.').

### 3.2.7 Validation Notes

Mock the Azure Maps API to return an error state and verify that the fallback notification message is sent.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: User is logged out when notification is tapped

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

a User has an active service request, AND the User is logged out of the mobile app but the device has a valid push token

### 3.3.5 When

the User receives and taps the 'On The Way' push notification

### 3.3.6 Then

the mobile app opens to the login screen, AND upon successful login, the app redirects the User to the specific service request tracking screen associated with the notification.

### 3.3.7 Validation Notes

Log out of the user app, trigger the notification, tap it, and verify the login-then-redirect flow.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: User has notifications disabled for the app

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a User has an active service request, AND the User has disabled push notifications for the application at the operating system level

### 3.4.5 When

the assigned Technician updates the service request status to 'On The Way'

### 3.4.6 Then

the backend system attempts to send the notification and gracefully handles the 'not registered' or 'permission denied' response from the push notification service (FCM) without error, AND no notification is displayed on the user's device.

### 3.4.7 Validation Notes

Disable notifications in the device OS settings. Trigger the event and verify no notification appears and no server-side errors are logged for this specific failure case.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: Technician rapidly toggles status

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a User has an active service request

### 3.5.5 When

the Technician updates the status to 'On The Way' and then back to a different status within 30 seconds

### 3.5.6 Then

the User receives only one 'On The Way' notification corresponding to the first status change.

### 3.5.7 Validation Notes

Implement a de-duplication or rate-limiting logic for this specific notification type and verify that rapid status changes do not result in multiple notifications.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Push Notification (OS-level component)

## 4.2.0 User Interactions

- User taps the notification to open the app.

## 4.3.0 Display Requirements

- Notification Title: e.g., 'Service Update for [Ticket ID]'
- Notification Body: e.g., 'Your technician is on the way and will arrive in approximately [ETA]. Tap to see their location.'
- App Icon must be displayed with the notification.

## 4.4.0 Accessibility Needs

- Notification text must be clear and concise to be effectively read by OS screen readers.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "The 'On The Way' notification can only be triggered for service requests in a state that logically precedes it (e.g., 'Technician Assigned').", 'enforcement_point': 'Backend Service Request Microservice, upon receiving a status update request.', 'violation_handling': 'The status change request is rejected with an error, and no notification is sent.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-053

#### 6.1.1.2 Dependency Reason

The Technician mobile app must have the functionality to update a job status to 'On The Way' to trigger this notification.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-072

#### 6.1.2.2 Dependency Reason

The mobile app screen for tracking a technician's live location must exist to serve as the destination for the notification's deep link.

## 6.2.0.0 Technical Dependencies

- A functioning push notification service (e.g., Notification Microservice) integrated with Firebase Cloud Messaging (FCM).
- A functioning location service that can provide technician and user coordinates for ETA calculation.
- An event-driven messaging system (Azure Service Bus) to decouple the status update from the notification dispatch.

## 6.3.0.0 Data Dependencies

- Valid device push tokens for the user must be stored and accessible.
- User's address and Technician's real-time location must be available for ETA calculation.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) API for sending push notifications.
- Azure Maps API for calculating route and ETA.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 latency for the notification to be sent from the server after the status update event is processed must be less than 5 seconds.

## 7.2.0.0 Security

- Notification payload must not contain sensitive Personally Identifiable Information (PII) like full address or full name.
- Deep link mechanism must securely handle user authentication and authorization.

## 7.3.0.0 Usability

- The notification text must be unambiguous and provide clear, actionable information (ETA).

## 7.4.0.0 Accessibility

- Compliant with WCAG 2.1 AA standards for any in-app content linked from the notification.

## 7.5.0.0 Compatibility

- Push notifications must be supported on iOS 14+ and Android 8.0+ as specified in the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordination between multiple microservices (Service Request, Location, Notification).
- Integration with two external services (FCM, Azure Maps), including API key management and error handling.
- Implementation of a reliable event-driven flow using Azure Service Bus.
- Configuration of deep linking on both iOS and Android platforms.

## 8.3.0.0 Technical Risks

- Latency or failure of the external Azure Maps API could impact ETA calculation.
- Complexity in managing and refreshing device push tokens to ensure high delivery rates.

## 8.4.0.0 Integration Points

- Technician App -> Service Request Service (for status update)
- Service Request Service -> Azure Service Bus (publishes event)
- Notification Service <- Azure Service Bus (consumes event)
- Notification Service -> Location Service (gets coordinates)
- Notification Service -> Azure Maps API (calculates ETA)
- Notification Service -> FCM API (sends notification)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance

## 9.2.0.0 Test Scenarios

- Verify notification delivery for a valid status change.
- Verify correct ETA calculation for various start/end points.
- Verify fallback notification content when ETA service fails.
- Verify deep link navigation for both logged-in and logged-out states.
- Verify non-delivery of notification when disabled in OS settings.

## 9.3.0.0 Test Data Needs

- Test accounts for a User and a Technician.
- An active service request assigned to the test Technician.
- Valid geo-coordinates for user address and technician starting point.
- Registered test devices with valid push tokens.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Postman/Insomnia for API-level integration tests.
- Cypress or Appium for E2E mobile testing.
- Mocking frameworks for external dependencies (Azure Maps, FCM).

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage and passing
- Integration testing between services completed successfully
- E2E test scenario successfully executed on physical devices
- Performance requirement for notification latency is met
- Security review of notification payload and deep link is complete
- Documentation for the notification event and payload is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Ensure API keys and access for Azure Maps and FCM are configured in all environments.
- Prerequisite stories US-053 and US-072 must be scheduled in the same or a prior sprint.
- Requires developers with experience in both backend (Node.js, NestJS) and mobile (React Native).

## 11.4.0.0 Release Impact

This is a key feature for the real-time tracking theme and significantly enhances the user experience. It should be included in the initial launch or a very early feature release.

