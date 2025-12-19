# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-100 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Send automated warranty expiry reminders t... |
| As A User Story | As a User who has registered products, I want to r... |
| User Persona | User (Product Owner) |
| Business Value | Increases user engagement and satisfaction by prov... |
| Functional Area | Notifications & Reminders |
| Story Theme | User Engagement & Retention |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-100-01

### 3.1.2 Scenario

30-day reminder sent successfully via all enabled channels

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user has a registered product with a warranty that expires in exactly 30 days from today (UTC)

### 3.1.5 And

The system logs that the 30-day reminder for this specific warranty has been successfully sent to prevent duplicates.

### 3.1.6 When

The daily automated reminder job runs

### 3.1.7 Then

The system sends an email to the user's registered address with content identifying the product and stating the warranty expires in 30 days

### 3.1.8 Validation Notes

Verify email is received in a mock inbox (e.g., MailHog). Verify push notification payload is sent to the mock FCM service. Check system logs for the success entry.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-100-02

### 3.2.2 Scenario

7-day reminder sent successfully via all enabled channels

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A user has a registered product with a warranty that expires in exactly 7 days from today (UTC)

### 3.2.5 And

The system logs that the 7-day reminder for this specific warranty has been successfully sent.

### 3.2.6 When

The daily automated reminder job runs

### 3.2.7 Then

The system sends both an email and a push notification to the user identifying the product and the 7-day expiry

### 3.2.8 Validation Notes

Similar validation to AC-100-01, but for the 7-day interval.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-100-03

### 3.3.2 Scenario

No reminder is sent if user has disabled notifications

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

A user has a product with a warranty expiring in 30 days

### 3.3.5 And

The system logs that the reminder was skipped due to user preference.

### 3.3.6 When

The daily automated reminder job runs

### 3.3.7 Then

The system does NOT send any email or push notification to the user for this warranty

### 3.3.8 Validation Notes

Verify that no requests were made to the email or push notification services for this user. Check logs for the 'skipped' entry.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-100-04

### 3.4.2 Scenario

Reminder is sent only via the user's preferred channel

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

A user has a product with a warranty expiring in 7 days

### 3.4.5 And

The system does NOT send a push notification.

### 3.4.6 When

The daily automated reminder job runs

### 3.4.7 Then

The system sends an email reminder to the user

### 3.4.8 Validation Notes

Verify an email was sent but no push notification request was made for this user.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-100-05

### 3.5.2 Scenario

System does not send duplicate reminders

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The 30-day reminder for a specific warranty has already been successfully sent

### 3.5.5 When

The reminder job is re-run on the same day for any reason (e.g., manual trigger, system restart)

### 3.5.6 Then

The system identifies that the 30-day reminder for this warranty was already sent and does not send it again.

### 3.5.7 Validation Notes

Trigger the job twice. Verify that the notification services were only called once for the specific user and warranty.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-100-06

### 3.6.2 Scenario

System handles multiple warranties for a single product correctly

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A user has a product with a primary warranty expiring in 30 days and an extended warranty expiring in 395 days

### 3.6.5 When

The daily automated reminder job runs

### 3.6.6 Then

The system sends a 30-day reminder specifically for the primary warranty

### 3.6.7 And

The system does not send any reminder for the extended warranty.

### 3.6.8 Validation Notes

Check the content of the notification to ensure it references the correct warranty (e.g., 'Your manufacturer's warranty...').

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-100-07

### 3.7.2 Scenario

System handles notification service failure gracefully

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

A warranty is due for a 30-day reminder

### 3.7.5 And

The system retries sending the failed notification according to a defined policy (e.g., 3 retries within 24 hours).

### 3.7.6 When

The reminder job attempts to send the email

### 3.7.7 Then

The system logs the failure to send the notification, including the error from the service

### 3.7.8 Validation Notes

Use a mock service that returns a 5xx error. Verify that the system logs the error, continues processing, and that a retry is scheduled/attempted.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Email Template: A branded, responsive HTML email template for the reminder.
- Push Notification: A standard mobile push notification.

## 4.2.0 User Interactions

- Tapping the push notification should deep-link the user directly to the relevant product's digital warranty card within the mobile app.
- Clicking a link within the reminder email should deep-link the user to the relevant product's digital warranty card in the web portal or mobile app.

## 4.3.0 Display Requirements

- Notification content must clearly state the product name (Brand & Model) and the exact warranty expiry date.
- Email must contain a clear call-to-action, such as 'View Warranty Details'.

## 4.4.0 Accessibility Needs

- Email template must be compliant with WCAG 2.1 AA, including proper alt text for images, semantic HTML structure, and sufficient color contrast.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-100-01

### 5.1.2 Rule Description

Reminders are sent at two specific intervals: 30 days and 7 days before the warranty expiry date.

### 5.1.3 Enforcement Point

Within the daily scheduled reminder job's logic.

### 5.1.4 Violation Handling

N/A. This is the core logic of the feature.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-100-02

### 5.2.2 Rule Description

Reminders are only sent if the user has explicitly opted-in via their notification preference settings.

### 5.2.3 Enforcement Point

The reminder job must check user preferences before queuing a notification.

### 5.2.4 Violation Handling

If a user receives an unwanted reminder, it is considered a bug.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

System needs the ability for users to register products and their warranties.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-097

#### 6.1.2.2 Dependency Reason

System must calculate and store warranty expiry dates for the job to query.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-055

#### 6.1.3.2 Dependency Reason

System needs a way for users to manage notification preferences, which this job must respect.

## 6.2.0.0 Technical Dependencies

- A reliable job scheduling system (e.g., Kubernetes CronJob, Azure Functions Timer Trigger).
- An internal Notification Service to abstract communication with external providers.
- Integration with Azure Communication Services for email delivery.
- Integration with Firebase Cloud Messaging (FCM) for push notifications.
- Access to the primary PostgreSQL database with an efficient index on the warranty expiry date column.

## 6.3.0.0 Data Dependencies

- Accurate warranty expiry dates in the database.
- User notification preference settings.
- Valid user email addresses and mobile device push tokens.

## 6.4.0.0 External Dependencies

- Availability of Azure Communication Services API.
- Availability of Firebase Cloud Messaging (FCM) API.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The database query to find all expiring warranties must complete in under 5 seconds, even with millions of records.
- The entire job should be able to process 100,000 reminders per hour.

## 7.2.0.0 Security

- Notification content must not contain sensitive Personally Identifiable Information (PII) beyond what is necessary (e.g., user's first name, product name).
- Deep links must be properly formed to prevent open redirect vulnerabilities.

## 7.3.0.0 Usability

- Notification content must be clear, concise, and easily understandable by a non-technical user.

## 7.4.0.0 Accessibility

- Emails must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Email template must render correctly on major modern email clients (web and mobile).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a robust, scalable background job processing architecture.
- Query performance on a potentially very large `warranties` table is critical.
- Ensuring idempotency to prevent duplicate notifications adds logical complexity.
- Requires fault-tolerant design to handle external service failures without halting the entire process.
- Time zone handling must be precise (all calculations based on UTC).

## 8.3.0.0 Technical Risks

- An inefficient database query could cause high database load and slow job execution.
- Failure or rate-limiting from external notification providers could cause a backlog of unsent reminders.
- Incorrectly implemented idempotency logic could lead to spamming users or missing reminders.

## 8.4.0.0 Integration Points

- Database (read warranties, users, preferences; write notification logs).
- Notification Service (to send emails and push notifications).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify reminders are triggered for warranties expiring in exactly 30 and 7 days.
- Verify no reminders are sent for warranties expiring in 29, 31, 6, or 8 days.
- Verify behavior with various combinations of user notification preferences (all on, all off, some on).
- Test the job's retry logic by simulating failures from notification services.
- Test the job's idempotency by running it multiple times for the same day.

## 9.3.0.0 Test Data Needs

- A set of users with products having warranties expiring at various future dates.
- Users with different notification preference configurations.
- Products with multiple associated warranties (primary, extended).

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Supertest for integration tests of any internal APIs.
- A tool to manipulate system time in the test environment or an endpoint to trigger the job for a specific 'as-of' date.
- Mock services for FCM and Azure Communication Services.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests for the job logic have been written and achieve >= 80% coverage.
- Integration tests verifying database queries and interaction with notification services are passing.
- The scheduled job is configured and runs successfully on schedule in the staging environment.
- Logging is implemented to track job execution (start, end, success, failures, number of reminders sent).
- Monitoring and alerts are configured to notify the team of job failures.
- The reminder intervals (30, 7 days) are stored as configurable parameters, not hardcoded.
- Technical documentation for the job's operation and configuration is created or updated.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a backend-heavy story. Frontend involvement is minimal (reviewing email/push content).
- Requires coordination with DevOps/SRE to set up the job scheduler and monitoring in all environments.
- The design for query optimization and idempotency should be confirmed during sprint planning.

## 11.4.0.0 Release Impact

This is a significant user-facing feature that should be highlighted in release notes and marketing communications as a key benefit of the platform.

