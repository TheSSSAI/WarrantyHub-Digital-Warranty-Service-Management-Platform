# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-125 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Receives Push Notification for Warranty Claim... |
| As A User Story | As a User who has submitted a service request unde... |
| User Persona | The 'User' (Consumer) who has registered a product... |
| Business Value | Improves user experience by providing timely, crit... |
| Functional Area | Notifications & Alerts |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Claim Approval Notification (Happy Path)

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a User has a pending service request with an 'In Warranty' flag, and they are logged into the mobile app with push notifications enabled

### 3.1.5 When

an Administrator (Brand or Service Center) changes the warranty claim status to 'Approved'

### 3.1.6 Then

the system immediately triggers and sends a push notification to the user's registered device(s)

### 3.1.7 And

tapping the notification opens the mobile app and deep-links directly to the details screen for that specific service request.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Claim Rejection Notification (Happy Path)

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a User has a pending service request with an 'In Warranty' flag, and they are logged into the mobile app with push notifications enabled

### 3.2.5 When

an Administrator changes the warranty claim status to 'Rejected' and provides a reason

### 3.2.6 Then

the system immediately triggers and sends a push notification to the user's registered device(s)

### 3.2.7 And

tapping the notification opens the mobile app and deep-links directly to the details screen for that service request, where the rejection reason is clearly visible.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User has Notifications Disabled

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

a User has a pending service request but has disabled push notifications for the app in their device's OS settings

### 3.3.5 When

an Administrator approves or rejects the warranty claim

### 3.3.6 Then

the system attempts to send the notification but does not generate an error if delivery fails due to device settings

### 3.3.7 And

an entry for the status change appears in the user's in-app notification center.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Deep-linking when User is Logged Out

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a User receives a claim status notification but is currently logged out of the mobile app

### 3.4.5 When

the User taps on the notification

### 3.4.6 Then

the mobile app opens and presents the login screen

### 3.4.7 And

upon successful login, the app automatically redirects the user to the details screen of the relevant service request.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Notification Delivery to Multiple Devices

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a User is logged into their account on multiple devices (e.g., a phone and a tablet)

### 3.5.5 When

an Administrator approves or rejects the warranty claim

### 3.5.6 Then

the push notification is delivered to all active, registered devices for that user account.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Push notification banner/alert (handled by OS)

## 4.2.0 User Interactions

- User taps on the received push notification.

## 4.3.0 Display Requirements

- Notification text must be clear, concise, and dynamically include the product name and service request ID.
- The target screen (Service Request Details) must accurately reflect the new claim status (Approved/Rejected) and display the rejection reason if applicable.

## 4.4.0 Accessibility Needs

- Notification text must be human-readable and avoid jargon.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'Notifications for claim status changes must be sent in real-time (within seconds of the admin action).', 'enforcement_point': 'Backend event processing logic.', 'violation_handling': 'The event should be retried according to a defined policy. A critical alert should be raised if the notification queue backup exceeds a predefined threshold.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-059

#### 6.1.1.2 Dependency Reason

Provides the backend functionality for an Admin to approve a claim, which is the trigger for the 'Approved' notification.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-060

#### 6.1.2.2 Dependency Reason

Provides the backend functionality for an Admin to reject a claim, which is the trigger for the 'Rejected' notification.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-061

#### 6.1.3.2 Dependency Reason

Ensures the UI exists to display the rejection reason, which is required for the deep-link destination of a rejection notification.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-073

#### 6.1.4.2 Dependency Reason

The in-app notification center must exist to provide a fallback communication channel and history.

## 6.2.0.0 Technical Dependencies

- A configured Push Notification Service (e.g., Firebase Cloud Messaging - FCM).
- An event-driven messaging system (Azure Service Bus) to decouple the Service Request service from the Notification service.
- A mechanism for storing and managing user device tokens.

## 6.3.0.0 Data Dependencies

- Requires access to the Service Request ID, Product Name, and the User's device token(s).

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) or equivalent push notification provider must be available and operational.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P99 latency from admin action to FCM API call should be under 2 seconds.

## 7.2.0.0 Security

- Push notification payload must not contain any sensitive Personally Identifiable Information (PII) beyond what is necessary for the message (e.g., no user address, phone number).
- Deep-link handling must be secure to prevent unauthorized access to other users' data.

## 7.3.0.0 Usability

- The notification text must be easily understandable by a non-technical user.

## 7.4.0.0 Accessibility

- Complies with WCAG 2.1 AA for any related in-app content.

## 7.5.0.0 Compatibility

- Push notifications and deep-linking must be functional on supported versions of iOS (14+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordination between multiple microservices (Service Request, Notifications).
- Implementation of a robust event-driven flow using Azure Service Bus.
- Client-side implementation of deep-linking logic for React Native, including handling cases where the app is in the foreground, background, or terminated.
- Handling the post-authentication redirection for deep-links.

## 8.3.0.0 Technical Risks

- Potential delays or failures in the external push notification provider (FCM).
- Complexity in managing device token lifecycle (registration, refresh, invalidation).

## 8.4.0.0 Integration Points

- Service Request Microservice: Publishes a `ClaimStatusUpdated` event.
- Azure Service Bus: Transports the event.
- Notification Microservice: Subscribes to the event and calls the external push notification provider.
- Firebase Cloud Messaging (FCM): External service that delivers the notification to the device.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify 'Approved' notification is received and deep-link works.
- Verify 'Rejected' notification is received and deep-link works.
- Test deep-linking when app is in foreground, background, and terminated.
- Test deep-linking when user is logged out.
- Test scenario where user has notifications disabled at the OS level.
- Test on multiple physical devices (iOS and Android) and OS versions.

## 9.3.0.0 Test Data Needs

- Test user accounts with valid, registered device tokens.
- Service requests in a 'pending claim' state.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- A mobile E2E testing framework like Detox or Appium.
- Mocking tools for FCM and Azure Service Bus for integration tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for event publishing and consumption logic, passing with >80% coverage
- Integration testing between services via message bus completed successfully
- Automated E2E tests for receiving notifications and verifying deep-links are created and passing
- Manual testing confirms correct behavior on target physical devices (iOS & Android)
- Performance requirements for notification latency are verified
- Documentation for the `ClaimStatusUpdated` event schema is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires both backend (event publishing) and mobile (notification handling) development effort, which should be coordinated.
- Should be scheduled in a sprint after the prerequisite admin stories (US-059, US-060) are complete.

## 11.4.0.0 Release Impact

This is a key feature for user communication and satisfaction. Its inclusion is highly recommended for the initial public launch.

