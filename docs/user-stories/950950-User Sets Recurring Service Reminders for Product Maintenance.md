# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-088 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Sets Recurring Service Reminders for Product ... |
| As A User Story | As a Product Owner, I want to create custom, recur... |
| User Persona | The 'User' or 'Consumer' who owns products and use... |
| Business Value | Increases long-term user engagement by making the ... |
| Functional Area | User Mobile App |
| Story Theme | Product Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User successfully creates a new annual service reminder

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of my registered 'Living Room AC' product

### 3.1.5 When

I navigate to the 'Service Reminders' section for this product, tap 'Add Reminder', enter a title 'Annual Filter Cleaning', set the first reminder date to a future date, set recurrence to 'Every 12 months', set notification lead time to '14 days before', and save the reminder

### 3.1.6 Then

The system saves the new recurring reminder associated with the 'Living Room AC' and I see it in the list of reminders for that product, showing the title and the next due date.

### 3.1.7 Validation Notes

Verify a new record is created in the `service_reminders` table linked to the correct user and product ID. The UI on the product details screen must update to show the new reminder.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User receives a timely push notification for a due reminder

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I have a service reminder for my 'Water Purifier' due on March 15th, with a 7-day notification lead time, and my notification preferences for reminders are enabled

### 3.2.5 When

The system's daily scheduler job runs on March 8th

### 3.2.6 Then

The system sends me a push notification with a message like 'Service Reminder: Your \'Water Purifier\' is due for \'Cartridge Replacement\' on March 15th.' and the notification includes a deep link.

### 3.2.7 Validation Notes

Requires a backend scheduler. Test by manually triggering the scheduler for a specific date. Verify the notification is received on a test device and the deep link opens the 'Raise Service Request' screen for the correct product.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User successfully edits an existing reminder

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I have an existing service reminder for my 'Car' set to recur every 6 months

### 3.3.5 When

I navigate to the reminder, choose to edit it, change the recurrence interval to 'Every 3 months', and save the changes

### 3.3.6 Then

The system updates the reminder's recurrence schedule, and the next reminder date is recalculated and displayed correctly.

### 3.3.7 Validation Notes

Verify the corresponding record in the `service_reminders` table is updated. The UI must reflect the new recurrence and next due date.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User successfully deletes a reminder

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I have an existing service reminder I no longer need

### 3.4.5 When

I select the 'Delete' option for that reminder and confirm the action in a confirmation dialog

### 3.4.6 Then

The reminder is permanently removed and no longer appears in the list of reminders for that product.

### 3.4.7 Validation Notes

Verify the record is hard-deleted or marked as inactive in the database. The UI must update immediately to remove the item from the list.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User attempts to create a reminder with a past date

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the 'Add Reminder' screen

### 3.5.5 When

I attempt to set the 'First Reminder Date' to a date in the past and try to save

### 3.5.6 Then

The UI displays a clear validation error message, such as 'Reminder date cannot be in the past', and prevents me from saving.

### 3.5.7 Validation Notes

This validation should exist on both the client-side for immediate feedback and the server-side to ensure data integrity.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Service reminders are transferred with product ownership

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I have set up two service reminders for my 'Smart Refrigerator'

### 3.6.5 When

I successfully transfer the ownership of the 'Smart Refrigerator' to another registered user

### 3.6.6 Then

All associated service reminders are transferred to the new owner's account, and I no longer see or receive notifications for them.

### 3.6.7 Validation Notes

Verify that the `user_id` on the `service_reminders` records is updated to the new owner's ID upon successful transfer.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Service reminders are deactivated when a product is deleted

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I have an active service reminder for my 'Microwave Oven'

### 3.7.5 When

I delete the 'Microwave Oven' from my product list (soft delete)

### 3.7.6 Then

The associated service reminder is marked as inactive or soft-deleted, and the system does not send any future notifications for it.

### 3.7.7 Validation Notes

The daily scheduler job must be designed to exclude reminders linked to inactive/deleted products.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Service Reminders' section on the product details screen.
- A list view to display existing reminders for a product.
- An 'Add Reminder' button/link.
- A form for creating/editing a reminder with fields for: Title (text input), First Reminder Date (date picker), Recurrence Interval (dropdown: e.g., 'Every 3 months', 'Every 6 months', 'Every 12 months', 'Custom'), Notification Lead Time (dropdown: e.g., '1 day before', '7 days before', '14 days before').
- Edit and Delete icons/buttons for each reminder in the list.
- A confirmation modal for the delete action.

## 4.2.0 User Interactions

- User taps on a product to see its details, then navigates to the 'Service Reminders' area.
- User fills out the reminder form and saves.
- User receives an actionable push notification that deep links into the app.

## 4.3.0 Display Requirements

- The list of reminders for a product should clearly show the reminder title and the next due date.
- The date picker should prevent selection of past dates.

## 4.4.0 Accessibility Needs

- All form fields must have proper labels for screen readers.
- Tap targets for buttons and controls must meet minimum size requirements.
- Compliant with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The first reminder date for a new service reminder must be in the future.

### 5.1.3 Enforcement Point

Client-side form validation and server-side API validation.

### 5.1.4 Violation Handling

Display a user-friendly error message and reject the save request.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Service reminders are intrinsically linked to a specific product and user. They cannot exist without a valid, active parent product.

### 5.2.3 Enforcement Point

Database schema (foreign key constraints) and business logic for product deletion/transfer.

### 5.2.4 Violation Handling

Reminders are deactivated or transferred when the parent product's state changes.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

A user must be able to register a product before they can set a reminder for it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-090

#### 6.1.2.2 Dependency Reason

The notification system for reminders must respect the user's global notification preferences.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-037

#### 6.1.3.2 Dependency Reason

The reminder notification's primary call-to-action is to deep link to the 'Raise Service Request' flow.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-028

#### 6.1.4.2 Dependency Reason

The product ownership transfer process must also handle the transfer of associated service reminders.

## 6.2.0.0 Technical Dependencies

- A robust, scalable backend scheduler service (e.g., cron job, NestJS Schedule, or a message-queue-based scheduler) capable of running daily tasks.
- Integration with the notification services (FCM for push, Azure Communication Services for email) must be complete.
- A new database table (`service_reminders`) with appropriate schema and indexing.

## 6.3.0.0 Data Dependencies

- Requires access to the user's registered product list.

## 6.4.0.0 External Dependencies

- Relies on the availability and performance of FCM and Azure Communication Services for notification delivery.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The daily scheduler job must complete its run for the entire user base within a defined off-peak window.
- API endpoints for CRUD operations on reminders must adhere to the P95 latency of <250ms.

## 7.2.0.0 Security

- Users must only be able to create, view, edit, or delete reminders for their own products. This must be enforced at the API level.

## 7.3.0.0 Usability

- The process of creating a reminder should be intuitive and require minimal steps.
- Recurrence options should cover the most common use cases, with a clear 'custom' option if needed.

## 7.4.0.0 Accessibility

- The feature must be fully usable via screen readers and keyboard navigation, adhering to WCAG 2.1 Level AA.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported iOS and Android versions as defined in the SRS (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementation of a reliable and scalable backend scheduler service is the primary complexity driver.
- Handling timezones correctly for a global user base is critical.
- Implementing robust recurrence logic (recommend using a standard like iCal RRULE).
- Configuration of deep linking from push notifications into the React Native application.

## 8.3.0.0 Technical Risks

- The scheduler job failing or taking too long to run, causing delayed or missed notifications.
- Inaccurate calculation of next reminder dates for complex recurrence rules.

## 8.4.0.0 Integration Points

- Backend API for reminder CRUD.
- Backend Scheduler Service.
- Notification Service (FCM/Azure).
- Database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance

## 9.2.0.0 Test Scenarios

- Create, read, update, and delete a reminder.
- Verify notification is triggered at the correct lead time.
- Verify deep link functionality from the notification.
- Test edge cases like product transfer and deletion.
- Test form validation for invalid inputs (e.g., past dates).

## 9.3.0.0 Test Data Needs

- Test users with multiple registered products.
- Reminders with various recurrence rules and lead times.
- A mechanism in the test environment to manually trigger the scheduler for a specific virtual date to avoid waiting for real time to pass.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest for backend unit/integration tests.
- Cypress or similar for E2E testing of the web interface.
- A tool like Postman for API testing.
- Firebase console for verifying push notification delivery.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic meets the project standard (e.g., >80%).
- Integration tests for the API and scheduler interaction are implemented and passing.
- End-to-end tests confirm the user flow from creation to notification.
- The backend scheduler job is deployed and has been verified to run correctly on schedule in the staging environment.
- UI/UX has been reviewed and approved by the design team.
- All related documentation (e.g., API docs) has been updated.
- The story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story can be broken down into frontend (UI for CRUD) and backend (API + Scheduler) tasks.
- The backend scheduler is a new component and may require initial research and setup, which should be factored into planning.
- Coordination between frontend and backend developers on the API contract is essential.

## 11.4.0.0 Release Impact

This is a significant feature enhancement that improves user retention and platform utility. It should be highlighted in release notes and marketing materials.

