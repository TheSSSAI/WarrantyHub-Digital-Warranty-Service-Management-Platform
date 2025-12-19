# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-105 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Platform User is Notified of Planned Maintenance v... |
| As A User Story | As a Platform User (including Consumer, Brand Admi... |
| User Persona | All active platform users: Consumer, Brand Admin, ... |
| Business Value | Increases user trust and satisfaction through tran... |
| Functional Area | System Communications & Notifications |
| Story Theme | Platform Reliability and User Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User receives an email notification 48 hours before maintenance

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A Super Admin has scheduled a platform maintenance window to begin in 50 hours

### 3.1.5 When

The system's scheduled notification job runs (which is configured to run for events 48 hours in the future)

### 3.1.6 Then

An email is sent to all active users with a verified email address.

### 3.1.7 Validation Notes

Verify that an email is received in a test user's inbox. The email content must match the defined template, including start time, expected duration, and impact description. This notification is considered critical and should bypass general marketing opt-outs.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Mobile app user receives a push notification for maintenance

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Super Admin has scheduled a platform maintenance window to begin in 48 hours

### 3.2.5 And

Tapping the notification opens the app and navigates the user to the in-app notification center (US-073) where a detailed message is visible.

### 3.2.6 When

The system's notification job sends the maintenance alert

### 3.2.7 Then

The user receives a native push notification on their device.

### 3.2.8 Validation Notes

Test on both iOS and Android devices. Verify the push notification is received and that tapping it leads to the correct in-app screen.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Web portal user sees a persistent banner notification

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A platform maintenance window is scheduled to begin in the next 48 hours

### 3.3.5 When

A user (Brand Admin, Service Center Admin, or Super Admin) logs into or navigates within their respective web portal

### 3.3.6 Then

A persistent, dismissible banner is displayed at the top of the viewport.

### 3.3.7 And

If the user dismisses the banner, it does not reappear during the same session but will reappear on their next login.

### 3.3.8 Validation Notes

Verify the banner appears on all web portals. Test the dismiss functionality and confirm it reappears after logging out and back in.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User is notified of a cancelled maintenance window

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A maintenance window was scheduled and initial notifications have been sent

### 3.4.5 When

A Super Admin cancels the scheduled maintenance window

### 3.4.6 Then

A new email and push notification are immediately sent to all users informing them of the cancellation.

### 3.4.7 And

The persistent banner in the web portals is immediately removed.

### 3.4.8 Validation Notes

Trigger a cancellation event and verify that follow-up notifications are sent and the UI is updated correctly.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Notification sending fails and is retried

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The system attempts to send maintenance notifications

### 3.5.5 And

A critical alert is sent to the on-call engineering team if all retries fail.

### 3.5.6 When

The notification job executes

### 3.5.7 Then

The system logs the initial sending failure.

### 3.5.8 Validation Notes

Simulate a failure from the email service API and verify that the system's retry logic is triggered and that monitoring alerts are generated.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Branded HTML email template for maintenance notifications.
- Persistent, dismissible banner component for web applications.
- Push notification payload (title, body).
- Detailed message view within the existing in-app notification center (US-073).

## 4.2.0 User Interactions

- User can dismiss the web banner.
- User can tap a push notification to view details in-app.

## 4.3.0 Display Requirements

- Notification content must include: Start Date & Time (with timezone), Expected End Date & Time or Duration, and a brief description of the services that will be impacted.

## 4.4.0 Accessibility Needs

- Email notifications must be screen-reader friendly.
- Web banner must have appropriate ARIA roles (e.g., 'alert') and be keyboard accessible.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Notifications for planned maintenance must be sent at least 48 hours before the maintenance window begins.

### 5.1.3 Enforcement Point

System Scheduler / Notification Service

### 5.1.4 Violation Handling

The system should prevent a Super Admin from scheduling maintenance that starts in less than 48 hours without an override flag. If an override is used, notifications are sent immediately.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Planned maintenance notifications are considered critical system communications and cannot be opted-out of by users.

### 5.2.3 Enforcement Point

Notification Service

### 5.2.4 Violation Handling

The notification service logic will ignore the user's general notification preferences (defined in US-090) when sending this specific type of alert.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-073

#### 6.1.1.2 Dependency Reason

The in-app notification center must exist to display detailed maintenance messages when a push notification is tapped.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-090

#### 6.1.2.2 Dependency Reason

The user's notification preference settings must be defined to determine which settings are bypassed by this critical alert.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

SUPER_ADMIN-010 (Implied)

#### 6.1.3.2 Dependency Reason

A mechanism for a Super Admin to schedule, define, update, and cancel maintenance windows must exist. This story only covers the user-facing notification part.

## 6.2.0.0 Technical Dependencies

- Azure Communication Services for sending transactional emails.
- Firebase Cloud Messaging (FCM) for sending push notifications.
- A reliable, time-based job scheduler (e.g., Kubernetes CronJob, Azure Functions Timer Trigger).
- A centralized Notification Microservice.

## 6.3.0.0 Data Dependencies

- Access to a list of all active users, their contact information (email), and their device tokens for push notifications.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The notification job must be capable of sending notifications to the entire user base (e.g., 100,000+ users) within a 1-hour window.

## 7.2.0.0 Security

- Email content should not contain any Personally Identifiable Information (PII) other than the recipient's name for salutation.
- Communication with external notification gateways (Azure, FCM) must be secure.

## 7.3.0.0 Usability

- Notification language must be clear, non-technical, and concise.
- The web banner must not obstruct critical UI elements.

## 7.4.0.0 Accessibility

- All UI components must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Email template must render correctly on major email clients (web and mobile).
- Web banner must function correctly on all supported browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a new backend capability for Super Admins to manage maintenance windows.
- Coordination across multiple notification channels (email, push, web).
- Implementation of a reliable, scalable, and timezone-aware scheduler.
- Logic to handle updates and cancellations of scheduled events.

## 8.3.0.0 Technical Risks

- Potential for delays or failures in third-party notification services (Azure, FCM).
- Ensuring the scheduler triggers accurately and reliably, especially with respect to timezones.

## 8.4.0.0 Integration Points

- Super Admin Portal (for creating the event).
- Notification Microservice (for sending alerts).
- All frontend clients (Mobile Apps, Web Portals) to display alerts.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability

## 9.2.0.0 Test Scenarios

- End-to-end flow: Super Admin schedules maintenance -> scheduler triggers -> test users on all platforms receive the correct notifications.
- Cancellation flow: Admin cancels event -> users receive cancellation notice -> UI elements are removed.
- Failure simulation: Test the system's retry logic by mocking a failure from the email/push notification service.
- UI verification: Manually verify email rendering on multiple clients and banner behavior on multiple browsers.

## 9.3.0.0 Test Data Needs

- Test user accounts for each role (Consumer, Technician, Brand Admin, etc.).
- Test devices (iOS and Android) with the app installed and notifications enabled.

## 9.4.0.0 Testing Tools

- Email testing tool (e.g., Litmus, Email on Acid) to check template rendering.
- Backend testing framework (e.g., Jest) for unit/integration tests.
- E2E testing framework (e.g., Cypress) for web portal verification.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least two peers
- Unit and integration tests implemented with >80% coverage for new logic
- Successful E2E test execution in the staging environment
- Email and web banner UI reviewed and approved by UX/UI designer
- Notification delivery performance tested against requirements
- Documentation for the notification process and templates is created/updated
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by the implementation of the Super Admin feature for scheduling maintenance. It should be planned for the sprint immediately following the completion of that prerequisite.
- Requires coordination between backend, frontend (web), and mobile development teams.

## 11.4.0.0 Release Impact

This is a significant improvement to user experience and platform management. It should be included in the next major or minor release after implementation.

