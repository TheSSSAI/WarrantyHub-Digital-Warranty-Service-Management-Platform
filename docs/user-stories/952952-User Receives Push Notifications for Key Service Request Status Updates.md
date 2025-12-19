# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-089 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Receives Push Notifications for Key Service R... |
| As A User Story | As a User who has submitted a service request, I w... |
| User Persona | The 'User' or 'Consumer' who has registered a prod... |
| Business Value | Improves customer satisfaction and transparency by... |
| Functional Area | Notifications & Alerts |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Notification for successful service request creation

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged into the mobile app and has granted notification permissions

### 3.1.5 When

the user successfully submits a new service request

### 3.1.6 Then

the user must receive a push notification on their device within 60 seconds

### 3.1.7 And

tapping the notification opens the app and navigates the user directly to the details screen for that specific service request.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Notification when a technician is assigned

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a user has an open service request with status 'Requested' or 'Acknowledged'

### 3.2.5 When

a Service Center Admin assigns a technician to that service request

### 3.2.6 Then

the user must receive a push notification on their device within 60 seconds

### 3.2.7 And

tapping the notification opens the app and navigates the user directly to the details screen for that specific service request.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Notification when a service request is resolved

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a user has an in-progress service request

### 3.3.5 When

a Technician or Service Center Admin updates the request status to 'Resolved'

### 3.3.6 Then

the user must receive a push notification on their device within 60 seconds

### 3.3.7 And

tapping the notification opens the app and navigates the user to the service request details screen, ideally with the rating/feedback section visible.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User has notifications disabled in app settings

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a user has explicitly disabled 'Service Update' notifications within the app's settings

### 3.4.5 When

any service request status update event occurs

### 3.4.6 Then

the system must not send a push notification to the user's device for that event.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User has notifications disabled at the OS level

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a user has disabled notifications for the application at the device's operating system level

### 3.5.5 When

a service request status update event occurs

### 3.5.6 Then

the backend system should attempt to send the notification via the push notification service (e.g., FCM)

### 3.5.7 And

the failure should be logged for potential pruning of invalid device tokens.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User is logged in on multiple devices

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a user is logged into their account on two separate mobile devices (e.g., a phone and a tablet)

### 3.6.5 When

a service request status update event occurs

### 3.6.6 Then

both devices must receive the same push notification.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Standard OS-level notification banner/alert (iOS/Android)

## 4.2.0 User Interactions

- Tapping the notification must deep-link the user to the specific service request details screen within the mobile app.

## 4.3.0 Display Requirements

- Notification must display the app icon.
- Notification must contain a clear, concise title and body text.
- Text content must be localized based on user's language preference.

## 4.4.0 Accessibility Needs

- Notification text must be readable by screen readers (standard OS functionality).

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "Push notifications for service updates are only sent if the user has explicitly opted in via the app's notification settings.", 'enforcement_point': 'Notification Service, before dispatching the notification payload.', 'violation_handling': 'The notification request is silently discarded if the user has opted out.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

Requires a user account to associate a device token with.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-096

#### 6.1.2.2 Dependency Reason

Requires a login mechanism to register the device for push notifications.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-037

#### 6.1.3.2 Dependency Reason

The service request entity is the trigger for these notifications.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-048

#### 6.1.4.2 Dependency Reason

The 'Technician Assigned' event is triggered by this story's functionality.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-057

#### 6.1.5.2 Dependency Reason

The 'Work Resolved' event is triggered by this story's functionality.

### 6.1.6.0 Story Id

#### 6.1.6.1 Story Id

US-090

#### 6.1.6.2 Dependency Reason

Provides the in-app settings for users to enable/disable these notifications. If not implemented, assume notifications are on by default.

## 6.2.0.0 Technical Dependencies

- A backend microservice responsible for handling notifications.
- Integration with Azure Service Bus for receiving events asynchronously.
- Integration with Firebase Cloud Messaging (FCM) for dispatching notifications to Android and iOS devices.
- A database schema to store and manage user device tokens.

## 6.3.0.0 Data Dependencies

- Access to user account data to retrieve device tokens.
- Access to service request data (ID, product name, status).
- Access to technician data (name).

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) service must be available.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 latency from event trigger (e.g., status update in DB) to notification delivery at the FCM gateway should be less than 10 seconds.
- End-to-end delivery to the user's device should be within 60 seconds under normal network conditions.

## 7.2.0.0 Security

- Notification payloads must not contain sensitive Personally Identifiable Information (PII) beyond what is necessary (e.g., no addresses or phone numbers).
- Communication with FCM must be over a secure channel.

## 7.3.0.0 Usability

- Notification content must be clear, unambiguous, and provide immediate value to the user.
- Deep linking must be reliable and take the user to the correct context.

## 7.4.0.0 Accessibility

- Complies with standard OS-level accessibility for notifications.

## 7.5.0.0 Compatibility

- Must function correctly on supported versions of iOS (14+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordination between multiple microservices (e.g., Service Request Service, Notification Service) via a message bus.
- Management of device registration tokens, including handling refreshes and pruning invalid tokens returned by FCM.
- Implementation of robust deep linking logic on both iOS and Android clients to handle various app states (foreground, background, terminated).

## 8.3.0.0 Technical Risks

- Potential for delays in the asynchronous processing pipeline, affecting notification timeliness.
- Reliability of the external FCM service.
- Complexity in testing the full end-to-end flow automatically.

## 8.4.0.0 Integration Points

- Service Request microservice (publishes events).
- Azure Service Bus (message transport).
- Notification microservice (consumes events, sends notifications).
- Firebase Cloud Messaging (FCM) API.
- Mobile client (receives notifications, handles deep links).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Manual

## 9.2.0.0 Test Scenarios

- Verify notification is received for each key status change: Created, Assigned, Resolved.
- Verify deep link functionality from all app states (foreground, background, terminated).
- Verify no notification is sent when opted-out in app settings.
- Verify notification is received on multiple logged-in devices.
- Verify graceful failure when OS-level notifications are disabled.

## 9.3.0.0 Test Data Needs

- Test user accounts with registered devices on both iOS and Android.
- Service requests that can be manipulated to trigger status changes.
- Test accounts for Service Center Admins and Technicians to perform the status updates.

## 9.4.0.0 Testing Tools

- Jest (Backend Unit Tests)
- Appium or similar for E2E mobile automation
- Firebase Console for monitoring notification delivery
- Azure Portal for monitoring Service Bus messages

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both iOS and Android.
- Code reviewed and approved by at least one other backend and mobile developer.
- Unit tests implemented for the notification service logic, achieving >80% coverage.
- Integration tests completed for the event publishing/consuming flow via Azure Service Bus.
- Deep linking functionality manually verified to work from all app states (foreground, background, terminated).
- Payloads and communication with FCM adhere to security requirements.
- Documentation for the notification event payload is created/updated.
- Story deployed and verified in the staging environment on physical devices.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires concurrent work from both backend and mobile (iOS/Android) developers.
- A clear contract for the notification payload structure must be defined early in the sprint.
- Access to physical test devices for both platforms is required for E2E validation.

## 11.4.0.0 Release Impact

This is a core feature for user engagement and is critical for a positive post-service-request experience. It should be included in any major release focused on user experience improvements.

