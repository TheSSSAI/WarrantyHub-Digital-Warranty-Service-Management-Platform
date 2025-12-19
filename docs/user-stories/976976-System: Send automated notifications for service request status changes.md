# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-101 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Send automated notifications for service r... |
| As A User Story | As a User (Consumer), I want to receive instant pu... |
| User Persona | User (Consumer) |
| Business Value | Improves user experience by providing proactive, r... |
| Functional Area | Notifications & Alerts |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Notification on successful service request creation

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is logged into the mobile app and has enabled notifications

### 3.1.5 When

The user successfully submits a new service request, and its status is set to 'Requested'

### 3.1.6 Then

The system must send a push notification to the user's registered device(s) with a message confirming the request creation (e.g., "Your service request #SR-12345 has been created.").

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Notification when a technician is assigned

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A service request exists with status 'Acknowledged' for a user with notifications enabled

### 3.2.5 When

A Service Center Admin assigns a technician to the request, changing its status to 'Technician Assigned'

### 3.2.6 Then

The system must send a push notification to the user with a message like "A technician has been assigned to your service request #SR-12345."

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Notification when a technician is on the way

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A service request exists with status 'Technician Assigned' for a user with notifications enabled

### 3.3.5 When

The assigned technician updates the job status to 'Technician On The Way'

### 3.3.6 Then

The system must send a push notification to the user with a message like "Your technician is on the way for request #SR-12345! Track their location in the app."

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Notification when a service request is resolved

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A service request exists with a status of 'Work In Progress' for a user with notifications enabled

### 3.4.5 When

The service request status is updated to 'Resolved' or 'Closed'

### 3.4.6 Then

The system must send a push notification to the user with a message prompting for feedback, such as "Your service request #SR-12345 has been resolved. Please rate your experience."

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Notification for an approved warranty claim

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

A service request has an associated warranty claim, and the user has notifications enabled

### 3.5.5 When

An administrator approves the warranty claim

### 3.5.6 Then

The system must send a push notification to the user, such as "Good news! Your warranty claim for request #SR-12345 has been approved."

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Notification for a rejected warranty claim

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

A service request has an associated warranty claim, and the user has notifications enabled

### 3.6.5 When

An administrator rejects the warranty claim

### 3.6.6 Then

The system must send a push notification prompting the user to view details, such as "An update on your warranty claim for request #SR-12345. Please see the app for details."

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Deep-linking from notification

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A user has received any service request-related push notification

### 3.7.5 When

The user taps on the notification

### 3.7.6 Then

The mobile application must open and navigate directly to the details screen of the corresponding service request.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

User has opted out of service update notifications

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

A user has disabled 'Service Request Updates' in their notification preferences (as per US-055)

### 3.8.5 When

Any service request status change occurs for that user

### 3.8.6 Then

The system must not send a push notification for that event.

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

User has no registered device token

### 3.9.3 Scenario Type

Error_Condition

### 3.9.4 Given

A user has an account but has never logged into the mobile app, or their device token is invalid/missing

### 3.9.5 When

A service request status change occurs for that user

### 3.9.6 Then

The system must fail gracefully, log the absence of a valid token, and not propagate any error to the service that triggered the event.

## 3.10.0 Criteria Id

### 3.10.1 Criteria Id

AC-010

### 3.10.2 Scenario

User is logged in on multiple devices

### 3.10.3 Scenario Type

Alternative_Flow

### 3.10.4 Given

A user is logged into the mobile app on two or more devices (e.g., an iPhone and an iPad)

### 3.10.5 When

A service request status change occurs

### 3.10.6 Then

The system must send the push notification to all active, registered devices for that user.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- N/A (This is a backend system story)

## 4.2.0 User Interactions

- User receives a standard OS-level push notification.
- Tapping the notification deep-links into the mobile app.

## 4.3.0 Display Requirements

- Notification must contain a concise, clear message indicating the status change.
- Notification must include the service request ticket ID for reference.

## 4.4.0 Accessibility Needs

- Notification text must be clear and easily understood by screen readers.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'Notifications for service request status changes must only be sent if the user has explicitly opted in via their notification preference settings.', 'enforcement_point': 'Notification Service, before dispatching the message to the push notification provider.', 'violation_handling': 'The notification is silently dropped, and no action is taken.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-036

#### 6.1.1.2 Dependency Reason

Creates the service request entity and the initial 'Requested' status.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

Defines the service request lifecycle and statuses that trigger these notifications.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-055

#### 6.1.3.2 Dependency Reason

Provides the user notification preference settings that this story must respect.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-078

#### 6.1.4.2 Dependency Reason

Technician actions in the mobile app trigger status changes like 'On The Way'.

## 6.2.0.0 Technical Dependencies

- A mechanism for registering and storing user device tokens (FCM tokens).
- An event bus (e.g., Azure Service Bus) to decouple the Service Request service from the Notification service.
- A dedicated Notification service responsible for consuming events and sending push notifications.
- Integration with Firebase Cloud Messaging (FCM) API.

## 6.3.0.0 Data Dependencies

- Access to user profile data to retrieve device tokens.
- Access to user notification preferences.
- A defined event schema for 'ServiceRequestStatusUpdated' and 'WarrantyClaimStatusUpdated' events.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) service must be available and operational.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Notifications should be dispatched to the push notification provider (FCM) within 5 seconds of the triggering event being committed to the database.

## 7.2.0.0 Security

- Device tokens must be stored securely.
- Communication with FCM must be over a secure channel (HTTPS).

## 7.3.0.0 Usability

- Notification content must be clear, concise, and provide immediate value to the user.

## 7.4.0.0 Accessibility

- N/A

## 7.5.0.0 Compatibility

- Notifications must be deliverable to both iOS (14.0+) and Android (8.0+) devices.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires an event-driven architecture for decoupling services.
- Involves integration with a third-party service (FCM).
- Requires robust management of user device tokens (registration, refresh, removal).
- Logic must handle user preferences and multi-device scenarios.
- Requires implementation of a reliable, potentially retry-able, dispatch mechanism.

## 8.3.0.0 Technical Risks

- Latency or unavailability of the external FCM service.
- Complexity in managing the lifecycle of device tokens, especially when they expire or are invalidated.
- Ensuring the event bus is reliable and messages are not lost (requires dead-letter queue handling).

## 8.4.0.0 Integration Points

- Service Request Service (publishes events).
- Azure Service Bus (or other message queue).
- Notification Service (consumes events).
- User Service (provides device tokens and preferences).
- Firebase Cloud Messaging (FCM) (sends notifications).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E (Manual)

## 9.2.0.0 Test Scenarios

- Verify notification is sent for each key status change.
- Verify notification is NOT sent when user has opted out.
- Verify notification is sent to all devices for a multi-device user.
- Verify tapping a notification deep-links to the correct service request screen.
- Verify graceful failure when no device token is present for a user.

## 9.3.0.0 Test Data Needs

- Test users with single, multiple, and no registered device tokens.
- Test users with notification preferences enabled and disabled.
- Service requests in each stage of the lifecycle.

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- Mocking library for FCM client.
- Physical test devices (iOS and Android) for manual E2E validation.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new logic
- Integration testing between the event-publishing service, message bus, and notification service is completed successfully
- User interface reviewed and approved
- Performance requirements verified
- Security requirements validated
- Documentation for the event schema and notification service logic is updated
- Story deployed and verified in staging environment by QA on both iOS and Android devices

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a critical part of the user experience and should be prioritized soon after the core service request functionality is stable.
- Requires the event bus infrastructure and device token management to be in place before work can begin.

## 11.4.0.0 Release Impact

- Significantly enhances the perceived quality and responsiveness of the platform for end-users.

