# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-099 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Receives Push Notification for New Chat Messa... |
| As A User Story | As a User with an active service request, I want t... |
| User Persona | Consumer/End-User with a registered product and an... |
| Business Value | Improves customer satisfaction and engagement by p... |
| Functional Area | Service Request Module & Notifications |
| Story Theme | Real-time User Communication |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User receives notification when app is in background

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a User has an active service request and their mobile app is in the background or closed

### 3.1.5 When

the assigned Technician or Service Center Admin sends a new message regarding that service request

### 3.1.6 Then

the User's device receives a push notification within 5 seconds

### 3.1.7 And

the notification content includes the sender's role (e.g., 'Technician'), the service request context (e.g., 'Re: Service for Product X'), and a preview of the message.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Deep Linking: Tapping notification opens the correct chat screen

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the User has received a push notification for a new chat message

### 3.2.5 When

the User taps on the notification

### 3.2.6 Then

the application launches or is brought to the foreground

### 3.2.7 And

it navigates directly to the specific chat screen for the corresponding service request.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Notification is suppressed when user is actively in the chat

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

a User is actively viewing the chat screen for a specific service request

### 3.3.5 When

a new message is sent by the Technician in that same chat

### 3.3.6 Then

the User does NOT receive a push notification

### 3.3.7 And

the new message appears directly in the chat UI in real-time.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Notification is sent when user is in the app but on a different screen

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a User has the app open but is on a screen other than the relevant chat (e.g., the main dashboard)

### 3.4.5 When

a new message is sent by the Technician

### 3.4.6 Then

the User's device receives a push notification.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Notification is not sent if user has disabled this notification type

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a User has navigated to their notification settings and disabled notifications for 'New Chat Messages'

### 3.5.5 When

a new message is sent by the Service Center Admin

### 3.5.6 Then

the system does not send a push notification to the User's device.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

System handles invalid or expired device tokens

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a User's registered device token is invalid or expired in the system

### 3.6.5 When

the backend attempts to send a push notification to that token

### 3.6.6 Then

the system gracefully handles the error response from the push notification service (FCM)

### 3.6.7 And

the invalid token is flagged or removed to prevent future failed attempts.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Standard OS push notification banner/alert

## 4.2.0 User Interactions

- Tapping the notification must trigger a deep link into the specific chat screen.

## 4.3.0 Display Requirements

- Notification must display the app icon.
- Notification title should indicate a new message (e.g., 'New Message from Service Center').
- Notification body should provide context (e.g., 'Re: Ticket #12345 - Your TV') and a preview of the message text.

## 4.4.0 Accessibility Needs

- Notification text must be readable by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A push notification for a new chat message must only be sent if the user has not disabled this specific notification type in their preferences.

### 5.1.3 Enforcement Point

Backend Notification Service, before calling the external push notification provider.

### 5.1.4 Violation Handling

The notification send process is aborted for that user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A push notification must not be sent to a user for a chat they are actively viewing in the app.

### 5.2.3 Enforcement Point

Backend Notification Service, which must check the user's real-time presence status in the chat.

### 5.2.4 Violation Handling

The notification send process is aborted for that user.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

The core in-app chat functionality for the User must exist.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-097

#### 6.1.2.2 Dependency Reason

The Technician's ability to send messages in the chat must exist.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-098

#### 6.1.3.2 Dependency Reason

The Service Center Admin's ability to send messages in the chat must exist.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-090

#### 6.1.4.2 Dependency Reason

The user settings screen to manage notification preferences must be implemented to handle opt-outs.

## 6.2.0.0 Technical Dependencies

- Integration with Firebase Cloud Messaging (FCM) for push notification delivery.
- Backend infrastructure to securely store and manage user device tokens.
- Mobile client FCM SDK integration for receiving notifications and handling deep links.
- Azure Service Bus for decoupling the chat service from the notification service via asynchronous events.

## 6.3.0.0 Data Dependencies

- Access to the user's current, valid device token.
- Access to the user's notification preference settings.
- Real-time user presence data (to know if they are in the chat).

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) service must be available and operational.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 latency for the backend to process the event and trigger the FCM API call must be under 500ms.
- The end-to-end delivery of the notification should feel instantaneous to the user (typically under 5 seconds).

## 7.2.0.0 Security

- The push notification payload must not contain sensitive Personally Identifiable Information (PII) beyond what is necessary for context.
- Device tokens must be stored securely and transmitted over encrypted channels.

## 7.3.0.0 Usability

- Notifications should be concise and provide clear context to the user.
- Deep linking must be reliable and take the user to the exact correct location in the app.

## 7.4.0.0 Accessibility

- Compliant with WCAG 2.1 Level AA for any related in-app UI.

## 7.5.0.0 Compatibility

- Must function correctly on supported versions of iOS (14+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordinated work between backend, iOS, and Android developers.
- Implementing reliable deep linking across both platforms and all app states (killed, background, foreground).
- Backend logic to manage user presence in real-time to suppress redundant notifications.
- Asynchronous event-driven architecture using Azure Service Bus.

## 8.3.0.0 Technical Risks

- Misconfiguration of deep linking (Universal Links/App Links) can lead to a poor user experience.
- Failure to properly manage the lifecycle of device tokens can result in notifications not being delivered.
- Dependency on the reliability and latency of the external FCM service.

## 8.4.0.0 Integration Points

- Chat Microservice (publishes 'message_sent' event).
- Azure Service Bus (transports the event).
- Notification Microservice (consumes event, checks logic, calls FCM).
- Firebase Cloud Messaging (FCM) API.
- Mobile Client (receives notification, handles deep link).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability

## 9.2.0.0 Test Scenarios

- Verify notification receipt with app in background.
- Verify notification receipt with app killed.
- Verify notification is NOT received when user is in the active chat.
- Verify deep link functionality from both background and killed states.
- Verify notification is NOT sent when user preference is disabled.
- Test on a variety of physical devices and OS versions for both iOS and Android.

## 9.3.0.0 Test Data Needs

- Test accounts for User, Technician, and Service Center Admin.
- Active service tickets for test accounts.
- Devices with registered FCM tokens.

## 9.4.0.0 Testing Tools

- Backend: Jest for unit tests.
- Frontend: Cypress or Appium for E2E tests on emulators/real devices.
- Manual testing on physical devices.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both iOS and Android.
- Code reviewed and approved by team members from backend, iOS, and Android.
- Unit tests implemented for backend logic with >80% coverage.
- Integration tests for the event-driven flow are passing.
- E2E automated tests for the notification and deep link flow are passing.
- Manual verification performed on target physical devices.
- Performance requirements for notification trigger latency are met.
- Documentation for notification payloads and deep link structure is created/updated.
- Story deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires parallel work from backend, iOS, and Android developers.
- All prerequisite stories must be completed and merged before this story can begin.
- Access to FCM project credentials and configuration is required.

## 11.4.0.0 Release Impact

This is a critical feature for user engagement and satisfaction in the service request lifecycle. It is a key component of the real-time communication feature set.

