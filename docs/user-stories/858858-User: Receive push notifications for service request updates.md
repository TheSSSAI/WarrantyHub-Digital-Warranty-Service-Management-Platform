# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-042 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Receive push notifications for service reque... |
| As A User Story | As a consumer who has raised a service request, I ... |
| User Persona | The 'User' or 'Consumer' who has registered a prod... |
| Business Value | Improves customer satisfaction and trust through p... |
| Functional Area | Service Request Module |
| Story Theme | User Notifications & Communication |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Notification for 'Technician Assigned' status change

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user has an active service request with the status 'Acknowledged' and has enabled push notifications

### 3.1.5 When

a Service Center Admin assigns a technician, changing the request status to 'Technician Assigned'

### 3.1.6 Then

the user must receive a push notification within 5 seconds, and the notification message should clearly state that a technician has been assigned.

### 3.1.7 Validation Notes

Verify notification is received on a test device. The payload should contain the service request ID for deep-linking.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Notification for 'Technician On The Way' status change

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a user has a service request with the status 'Technician Assigned' and has enabled push notifications

### 3.2.5 When

the assigned technician updates the job status to 'Technician On The Way'

### 3.2.6 Then

the user must receive a push notification, and the message should state the technician is en route, including the ETA if available.

### 3.2.7 Validation Notes

Verify notification is received. The message content should be dynamic based on the new status.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Notification for 'Resolved' status change

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a user has a service request with the status 'Work In Progress' and has enabled push notifications

### 3.3.5 When

the service request status is updated to 'Resolved'

### 3.3.6 Then

the user must receive a push notification informing them the service is complete and prompting for feedback.

### 3.3.7 Validation Notes

Verify notification is received. The message should include a call-to-action like 'Rate your service'.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Deep-linking from notification

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a user has received a push notification for a service request update

### 3.4.5 When

the user taps on the notification

### 3.4.6 Then

the mobile application must open and navigate directly to the details screen of that specific service request.

### 3.4.7 Validation Notes

Test this with the app in three states: running in the foreground, running in the background, and terminated. The navigation must work correctly in all cases.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User has disabled notifications

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a user has an active service request

### 3.5.5 When

the user has disabled push notifications for the application in their device's OS settings and the service request status changes

### 3.5.6 Then

the user must not receive a push notification, and the backend system should handle the push failure gracefully without retries for this user.

### 3.5.7 Validation Notes

Disable notifications in device settings and trigger a status change. Confirm no notification is received. Check backend logs for a message indicating the user has opted out.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Notification for other status changes

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

a user has an active service request and has enabled push notifications

### 3.6.5 When

the service request status changes to 'Acknowledged', 'Work In Progress', or 'Closed'

### 3.6.6 Then

the user must receive a relevant push notification for each status change.

### 3.6.7 Validation Notes

Trigger each status change and verify a corresponding, correctly-worded notification is sent and received.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- OS-level push notification banner/alert

## 4.2.0 User Interactions

- Tapping the notification to open the app.

## 4.3.0 Display Requirements

- Notification must display the app icon.
- Notification title should be concise (e.g., 'Service Request Update').
- Notification body must mention the product and the new status (e.g., 'Your AC service request is now Resolved.').

## 4.4.0 Accessibility Needs

- Notification text must be clear and easy to understand, avoiding jargon.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Notifications are only sent for status changes on service requests initiated by the user.

### 5.1.3 Enforcement Point

Notification Service (Backend)

### 5.1.4 Violation Handling

A notification must not be sent to a user for a service request they do not own.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Users must be able to manage notification preferences within the app settings.

### 5.2.3 Enforcement Point

Notification Service (Backend) & User Mobile App

### 5.2.4 Violation Handling

If a user disables a specific notification type in-app (as per US-055), the system must honor that preference even if OS-level permissions are granted.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-036

#### 6.1.1.2 Dependency Reason

A service request must be created before its status can be updated.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

Defines the service request lifecycle and statuses that will trigger notifications.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-078

#### 6.1.3.2 Dependency Reason

Technician actions are a primary trigger for the status changes that generate notifications.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-055

#### 6.1.4.2 Dependency Reason

Provides the in-app settings for users to manage their notification preferences, which this story must respect.

## 6.2.0.0 Technical Dependencies

- A configured Firebase Cloud Messaging (FCM) project.
- Backend Notification Service capable of sending push notifications via FCM.
- Mobile application with FCM SDK integrated for receiving notifications.
- Azure Service Bus for event-driven communication between the Service Request service and the Notification service.

## 6.3.0.0 Data Dependencies

- A data store for user device tokens, linking a user ID to one or more FCM registration tokens.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) service must be available.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 latency from status change event to FCM API call must be less than 2 seconds.
- The notification delivery to the device should be near real-time, subject to FCM and network conditions.

## 7.2.0.0 Security

- Push notification payload must not contain sensitive Personally Identifiable Information (PII) like user address or full name.
- Deep links must correctly re-authenticate the user session upon opening the app.

## 7.3.0.0 Usability

- Notification content must be clear, concise, and provide immediate value to the user.

## 7.4.0.0 Accessibility

- Complies with WCAG 2.1 AA for any in-app notification UI, and OS-level notifications should use plain language.

## 7.5.0.0 Compatibility

- Push notifications must function correctly on supported iOS (14.0+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordinated effort between backend and mobile development teams.
- Implementation of a robust deep-linking mechanism in the mobile app.
- Setting up an event-driven flow using Azure Service Bus to decouple the core service logic from notification logic.
- Managing user device tokens, including handling token refreshes and multiple devices per user.

## 8.3.0.0 Technical Risks

- Potential delays or failures in the external FCM service.
- Complexity in testing the end-to-end notification flow across different device states (foreground, background, terminated).

## 8.4.0.0 Integration Points

- Service Request Service -> Azure Service Bus (publishes `StatusChanged` event).
- Notification Service <- Azure Service Bus (subscribes to `StatusChanged` event).
- Notification Service -> Firebase Cloud Messaging (FCM) API.
- FCM -> User's Mobile Device.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify notification content and deep-linking for each defined status change.
- Test notification delivery when the app is in the foreground, background, and terminated.
- Test the scenario where a user has notifications disabled at the OS level.
- Test the scenario where a user has multiple devices registered; both should receive the notification.
- Test tapping an older notification after the status has already changed again.

## 9.3.0.0 Test Data Needs

- Test user accounts with valid, registered FCM device tokens.
- Service requests in various states to trigger updates.

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- React Testing Library for mobile component tests.
- Playwright or a similar framework for E2E testing on emulated devices.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by both backend and mobile teams
- Unit tests implemented for notification service logic and mobile deep-link handling, with >80% coverage
- Integration testing between the Service Request service, Azure Service Bus, and Notification Service is completed successfully
- E2E tests are created and passing for notification delivery and deep-linking on both iOS and Android
- Performance requirement for notification dispatch latency is verified
- Security review of notification payload is complete
- Story deployed and verified in the staging environment on physical test devices

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires both backend and mobile development resources.
- The contract for the notification payload (including data for deep-linking) must be agreed upon by both teams at the beginning of the sprint.
- E2E testing will require a deployed environment with all components integrated.

## 11.4.0.0 Release Impact

This is a key feature for user experience and engagement in the service request lifecycle. It is a high-priority item for the initial launch.

