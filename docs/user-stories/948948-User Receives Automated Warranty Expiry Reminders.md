# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-087 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Receives Automated Warranty Expiry Reminders |
| As A User Story | As a product owner (User), I want to receive autom... |
| User Persona | The end-user (Consumer) of the mobile and web appl... |
| Business Value | Increases user engagement and platform stickiness ... |
| Functional Area | Notifications & Alerts |
| Story Theme | Proactive User Engagement |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

30-Day Expiry Reminder (Happy Path)

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user has a registered product with a warranty that expires in exactly 30 days from today, AND the user has enabled 'Warranty Expiry' notifications.

### 3.1.5 When

The daily automated reminder job runs.

### 3.1.6 Then

The system sends a notification to the user via their preferred channels (e.g., push, email), AND the notification clearly states the product name and that its warranty expires in 30 days, AND the system logs that the 30-day reminder has been sent for this warranty.

### 3.1.7 Validation Notes

Verify by setting a warranty's expiry date to T+30 days in a test environment. Trigger the job and confirm the notification is received and the database flag is set.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

7-Day Expiry Reminder (Happy Path)

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A user has a registered product with a warranty that expires in exactly 7 days from today, AND the user has enabled 'Warranty Expiry' notifications.

### 3.2.5 When

The daily automated reminder job runs.

### 3.2.6 Then

The system sends a notification to the user via their preferred channels, AND the notification clearly states the product name and that its warranty expires in 7 days, AND the system logs that the 7-day reminder has been sent for this warranty.

### 3.2.7 Validation Notes

Verify by setting a warranty's expiry date to T+7 days in a test environment. Trigger the job and confirm the notification is received and the database flag is set.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User has disabled expiry reminders

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A user has a registered product with a warranty that expires in 30 days, AND the user has explicitly disabled 'Warranty Expiry' notifications in their settings.

### 3.3.5 When

The daily automated reminder job runs.

### 3.3.6 Then

The system does NOT send any notification to the user for this warranty, AND the system still logs that the reminder check was performed but skipped due to user preference.

### 3.3.7 Validation Notes

Configure a test user to have notifications disabled. Verify that no notification is sent via any channel and check system logs for the skip reason.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Reminder job does not send duplicate notifications

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

The 30-day reminder for a specific warranty has already been successfully sent.

### 3.4.5 When

The daily automated reminder job runs again (e.g., due to a retry after a partial failure).

### 3.4.6 Then

The system does NOT send the 30-day reminder for that warranty again.

### 3.4.7 Validation Notes

Manually set the '30-day reminder sent' flag in the database for a test warranty. Trigger the job and verify no duplicate notification is sent.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Product registered with less than 30 days on warranty

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A user registers a new product with a warranty that expires in 15 days.

### 3.5.5 When

The daily automated reminder job runs over the next 15 days.

### 3.5.6 Then

The system does NOT send a 30-day reminder, AND the system correctly sends the 7-day reminder when the warranty is 7 days from expiry.

### 3.5.7 Validation Notes

Create a product with an expiry date of T+15 days. Verify no 30-day reminder is sent. Verify the 7-day reminder is sent on T+8 days.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

No reminders for expired or deleted products

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A product's warranty is already expired OR the product has been soft-deleted by the user.

### 3.6.5 When

The daily automated reminder job runs.

### 3.6.6 Then

The system does NOT send any expiry reminders for that product.

### 3.6.7 Validation Notes

Query the database to ensure the job's logic correctly excludes records where `expiry_date` < NOW() or `is_deleted` = true.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Notification deep-links to the correct product

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A user receives a warranty expiry push notification.

### 3.7.5 When

The user taps on the notification.

### 3.7.6 Then

The mobile application opens and navigates directly to the Digital Warranty Card screen for the specific product mentioned in the notification.

### 3.7.7 Validation Notes

Perform an E2E test on a mobile device. Tap the received notification and verify the app navigates to the correct screen.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Push Notification UI Component
- Email Template for Warranty Reminder

## 4.2.0 User Interactions

- Tapping a push notification should deep-link into the app.
- Clicking a link within the reminder email should open the web portal to the specific product's warranty page.

## 4.3.0 Display Requirements

- Notification content must include: Product Name, Brand Name, and exact Warranty Expiry Date.
- Example Push Notification Text: 'Heads up! Your [Brand] [Product Model] warranty expires in 30 days on [YYYY-MM-DD].'

## 4.4.0 Accessibility Needs

- Email templates must be designed with accessibility in mind (e.g., proper color contrast, alt text for images, semantic HTML).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Reminders are only sent at two fixed intervals: 30 days prior and 7 days prior to the warranty expiry date.

### 5.1.3 Enforcement Point

Automated Scheduler/Job Logic

### 5.1.4 Violation Handling

The job's query must strictly enforce these date intervals. No reminders should be sent for any other interval.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

User notification preferences must be honored. If a user has opted out of a channel or a notification type, the system must not send the reminder via that channel/type.

### 5.2.3 Enforcement Point

Notification Dispatch Service

### 5.2.4 Violation Handling

The service must check user preferences before attempting to send any notification. A failure to honor preferences is a high-severity bug.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

Requires products with warranty data to be present in the system.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-032

#### 6.1.2.2 Dependency Reason

Requires a destination screen (Digital Warranty Card) for the notification's deep-link to target.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-090

#### 6.1.3.2 Dependency Reason

CRITICAL: The reminder logic must read and respect the user's notification preferences defined in this story.

## 6.2.0.0 Technical Dependencies

- A robust job scheduling system (e.g., Azure Function with Timer Trigger, Kubernetes CronJob).
- A centralized Notification Service capable of sending push notifications (via FCM) and emails (via Azure Communication Services).
- Access to the User Profile service to retrieve notification preferences and contact details.
- Optimized database access with an index on the `warranty_expiry_date` column.

## 6.3.0.0 Data Dependencies

- Accurate `warranty_expiry_date` for each registered product.
- User notification preference settings.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) API for push notifications.
- Azure Communication Services API for email notifications.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The daily reminder job must complete its scan of the entire warranty table within a predefined time window (e.g., 1 hour) without degrading overall database performance.
- The database query to find expiring warranties must execute in under 500ms, even with millions of records.

## 7.2.0.0 Security

- Notification payloads should not contain sensitive Personally Identifiable Information (PII) beyond what is necessary (e.g., user's first name, product name).

## 7.3.0.0 Usability

- The content of the reminder must be clear, concise, and easily understandable by a non-technical user.

## 7.4.0.0 Accessibility

- Email reminders must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Deep-linking from notifications must be compatible with all supported iOS and Android versions (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires implementation of a reliable, scalable, and idempotent background job scheduler.
- Handling time zones correctly is critical. All dates should be stored and processed in UTC.
- Integration with multiple external notification services (FCM, Azure Communication Services) adds complexity.
- The database query must be highly optimized to avoid performance bottlenecks as the user base grows.

## 8.3.0.0 Technical Risks

- The scheduled job could fail, requiring a robust retry mechanism that prevents duplicate notifications.
- External notification service APIs could be unavailable or rate-limit requests, requiring error handling and queuing.
- Incorrect time zone handling could lead to reminders being sent on the wrong day.

## 8.4.0.0 Integration Points

- PostgreSQL Database (to query for expiring warranties).
- User Preferences Service (to check notification settings).
- Notification Dispatch Service (to send the actual notifications).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance

## 9.2.0.0 Test Scenarios

- Verify 30-day and 7-day reminders are sent correctly.
- Verify no reminders are sent when user preferences are disabled.
- Verify edge cases like late product registration and leap years.
- Verify deep-linking functionality on both iOS and Android.
- Verify job idempotency by running it multiple times for the same target date.

## 9.3.0.0 Test Data Needs

- Test users with various notification preferences (all on, some on, all off).
- Products with warranty expiry dates set to exactly T+30, T+7, T+1, T-1, and T+20 days from the test execution date.
- A soft-deleted product with an upcoming expiry date.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- A framework for mocking database and external service calls in integration tests.
- Cypress (for web) and a mobile E2E framework to test deep-linking.
- A load testing tool to benchmark the database query performance.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least two peers
- Unit and integration tests implemented with >80% code coverage for the new logic
- E2E tests for notification delivery and deep-linking are passing
- The scheduled job is proven to be idempotent
- Performance testing confirms the database query is scalable
- Security review of notification content completed
- Documentation for the scheduler job and its configuration is created
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires infrastructure setup for a scheduled job runner if one does not already exist.
- Dependencies on the Notification Service and User Preferences feature must be resolved before starting implementation.
- E2E testing will require coordination to set up test devices and accounts.

## 11.4.0.0 Release Impact

This is a high-visibility feature for users. Its successful release will significantly enhance the perceived value of the platform. It should be highlighted in release notes and marketing communications.

