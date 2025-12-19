# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-053 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Receive automated warranty expiry reminders |
| As A User Story | As a product owner, I want to receive automated re... |
| User Persona | End-User/Consumer with registered products in the ... |
| Business Value | Increases user engagement and satisfaction by prov... |
| Functional Area | Notifications & Alerts |
| Story Theme | User Engagement & Retention |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

30-Day Expiry Reminder (Happy Path)

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user has a registered product with a warranty that expires in exactly 30 days from today, AND the user has enabled warranty expiry notifications in their settings

### 3.1.5 When

The daily automated reminder job runs

### 3.1.6 Then

The system sends a push notification and an email to the user, stating that their '[Product Name]' warranty will expire on [Expiry Date].

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

7-Day Expiry Reminder (Happy Path)

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A user has a registered product with a warranty that expires in exactly 7 days from today, AND the user has enabled warranty expiry notifications in their settings

### 3.2.5 When

The daily automated reminder job runs

### 3.2.6 Then

The system sends a push notification and an email to the user, stating that their '[Product Name]' warranty is expiring soon, on [Expiry Date].

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User has opted out of reminders

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A user has a registered product with a warranty that expires in 30 days or 7 days, AND the user has disabled warranty expiry notifications in their settings

### 3.3.5 When

The daily automated reminder job runs

### 3.3.6 Then

The system does NOT send any notification to the user for that warranty.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Warranty not within reminder window

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A user has a registered product with a warranty that expires in 29 days (or any day other than 30 or 7)

### 3.4.5 When

The daily automated reminder job runs

### 3.4.6 Then

The system does NOT send an expiry reminder for that product.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Warranty is already expired

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A user has a product with a warranty that expired yesterday

### 3.5.5 When

The daily automated reminder job runs

### 3.5.6 Then

The system does NOT send an expiry reminder for that product.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Push notification interaction

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

A user has received a warranty expiry push notification on their mobile device

### 3.6.5 When

The user taps on the notification

### 3.6.6 Then

The mobile app opens and deep-links directly to the digital warranty card screen for the specific product mentioned in the notification.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Email content and interaction

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A user has received a warranty expiry email

### 3.7.5 When

The user opens the email

### 3.7.6 Then

The email has a clear subject line like 'Your [Product Name] Warranty is Expiring Soon', contains the product name and expiry date in the body, and includes a call-to-action button/link to 'View Warranty Details'.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Date calculation handles leap years

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

A product's warranty expires on February 29th of a leap year

### 3.8.5 When

The daily automated reminder job runs on January 30th of that year

### 3.8.6 Then

The system correctly identifies the warranty as expiring in 30 days and sends the reminder.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Push Notification (system level UI)
- Email Template (HTML)

## 4.2.0 User Interactions

- Tapping a push notification should deep-link to the relevant warranty card.
- Clicking a link in the email should open the web portal to the relevant warranty card.

## 4.3.0 Display Requirements

- Notification must clearly state the product name/model.
- Notification must clearly state the warranty expiry date.

## 4.4.0 Accessibility Needs

- Email template must follow accessibility best practices (e.g., proper alt text for images, sufficient color contrast, semantic HTML).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Reminders are sent at two specific intervals: 30 days prior and 7 days prior to the warranty expiry date.

### 5.1.3 Enforcement Point

Daily scheduled background job.

### 5.1.4 Violation Handling

No reminder is sent if the expiry date does not match the exact intervals.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Reminders are only sent if the user has opted-in via their notification preferences.

### 5.2.3 Enforcement Point

The background job must check user preferences before queuing a notification.

### 5.2.4 Violation Handling

The notification for the specific user is skipped.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

Users must be able to register products and their warranties for this story to have any data to act upon.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-023

#### 6.1.2.2 Dependency Reason

The system must calculate and store the warranty expiry date, which is the key data point for this feature.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-055

#### 6.1.3.2 Dependency Reason

The system must provide a way for users to manage notification preferences, which this story must respect.

## 6.2.0.0 Technical Dependencies

- A robust job scheduling system (e.g., Kubernetes CronJob, Azure Functions Timer Trigger).
- Integration with Firebase Cloud Messaging (FCM) for push notifications.
- Integration with Azure Communication Services for sending emails.
- A performant database query mechanism to find expiring warranties.

## 6.3.0.0 Data Dependencies

- Access to user product and warranty data, specifically the `expiry_date`.
- Access to user notification preference settings.
- Access to user device tokens for push notifications and email addresses.

## 6.4.0.0 External Dependencies

- Availability of FCM and Azure Communication Services APIs.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The daily background job must complete its scan of the entire warranty database within a 1-hour window.
- The database query to find expiring warranties must be optimized (e.g., using an index on the expiry date column) to avoid performance degradation as the user base grows.

## 7.2.0.0 Security

- Deep links from notifications must be secure and properly authenticated to prevent unauthorized access to user data.

## 7.3.0.0 Usability

- Notification content must be clear, concise, and easily understandable.
- The process of acting on a notification (tapping it) should be seamless and take the user to the most relevant screen.

## 7.4.0.0 Accessibility

- Emails must be WCAG 2.1 AA compliant.

## 7.5.0.0 Compatibility

- Push notifications must be compatible with supported iOS and Android versions.
- Emails must render correctly on major modern email clients (web and mobile).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a reliable, scalable background job processing architecture.
- Coordination between the database, scheduler, and multiple external notification services.
- Date and timezone calculations must be precise to avoid off-by-one errors.
- The process must be idempotent to prevent duplicate notifications if the job is accidentally re-run.

## 8.3.0.0 Technical Risks

- The database query could become slow at scale if not properly indexed and optimized.
- Failures in external notification services could lead to missed reminders. The system should have logging and monitoring for such failures.

## 8.4.0.0 Integration Points

- Database (PostgreSQL)
- Job Scheduler (e.g., K8s CronJob)
- FCM API
- Azure Communication Services API

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify notification is sent for a warranty expiring in exactly 30 days.
- Verify notification is sent for a warranty expiring in exactly 7 days.
- Verify NO notification is sent for a warranty expiring in 29 days.
- Verify NO notification is sent if the user has opted out.
- Verify deep-linking from a push notification works correctly.
- Verify email link works correctly.
- Verify date logic with leap year scenarios.

## 9.3.0.0 Test Data Needs

- Test user accounts with products having warranties expiring in 30 days, 7 days, 29 days, 1 day, and already expired.
- Test user accounts with notification preferences enabled and disabled.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- A tool to manually trigger the background job in a test environment.
- A mock email service (e.g., MailHog) to intercept and verify emails.
- Test devices to receive and interact with push notifications.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage for the new logic and passing
- Integration testing for the background job and notification services completed successfully
- Push notification and email templates reviewed and approved
- Performance of the database query verified under simulated load
- Security of deep-links validated
- Documentation for the background job (configuration, scheduling) is created/updated
- Story deployed and verified in staging environment by manually triggering the job and confirming notifications are received

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core feature for user retention and should be prioritized.
- Requires coordination with both backend (job logic) and mobile (deep-linking) development.
- Ensure prerequisite story US-055 (Notification Preferences) is completed or being worked on concurrently.

## 11.4.0.0 Release Impact

- This feature will be a key highlight in release notes and marketing communications to users, emphasizing the platform's proactive benefits.

