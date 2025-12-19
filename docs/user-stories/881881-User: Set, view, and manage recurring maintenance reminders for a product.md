# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-054 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Set, view, and manage recurring maintenance ... |
| As A User Story | As a product owner, I want to set custom, recurrin... |
| User Persona | The end-user ('User' role) of the mobile or web ap... |
| Business Value | Increases user engagement and app utility beyond r... |
| Functional Area | Product Management & Notifications |
| Story Theme | User Engagement & Value-Add Features |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully create a new recurring maintenance reminder

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is logged in and is viewing the details of one of their registered products

### 3.1.5 When

The user navigates to the maintenance reminder section and initiates the creation of a new reminder, fills in a title, selects a future start date, chooses a recurrence frequency (e.g., 'Every 6 Months'), and saves the form

### 3.1.6 Then

The system validates the input, saves the new reminder associated with the product, and displays a success confirmation.

### 3.1.7 And

The new reminder, showing its title and the next scheduled date, appears in the list of maintenance reminders for that product.

### 3.1.8 Validation Notes

Verify a new record is created in the `product_maintenance_reminders` table with the correct `product_id`, `start_date`, and `recurrence_rule`. The `next_due_date` should be correctly calculated.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

View existing maintenance reminders for a product

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A user has previously created one or more maintenance reminders for a product

### 3.2.5 When

The user navigates to the details page of that product

### 3.2.6 Then

The user can see a list of all active reminders, each displaying the reminder title and the next due date.

### 3.2.7 Validation Notes

The UI should fetch and correctly display all active reminders associated with the current product ID.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Edit an existing maintenance reminder

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A user is viewing an existing maintenance reminder for a product

### 3.3.5 When

The user chooses to edit the reminder, changes its title or recurrence frequency, and saves the changes

### 3.3.6 Then

The system updates the reminder's details in the database.

### 3.3.7 And

The list of reminders reflects the updated information, including a potentially recalculated next due date.

### 3.3.8 Validation Notes

Verify the corresponding record in the database is updated. If the frequency or start date changed, confirm the `next_due_date` is recalculated.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Delete an existing maintenance reminder

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A user is viewing an existing maintenance reminder

### 3.4.5 When

The user chooses to delete the reminder and confirms the action in a confirmation prompt

### 3.4.6 Then

The reminder is removed from the user's view.

### 3.4.7 And

The system cancels all future scheduled notifications for this reminder.

### 3.4.8 Validation Notes

Verify the reminder record is soft-deleted or marked as inactive in the database. The background job scheduler should no longer trigger notifications for it.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to create a reminder with a past date

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A user is on the 'Create Reminder' form

### 3.5.5 When

The user selects a 'First Reminder Date' that is in the past and attempts to save

### 3.5.6 Then

The system displays a clear validation error message stating that the date must be in the future.

### 3.5.7 And

The reminder is not saved.

### 3.5.8 Validation Notes

Check for frontend and backend validation that rejects dates earlier than the current date.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to create a reminder with missing required information

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A user is on the 'Create Reminder' form

### 3.6.5 When

The user leaves the 'Title' field blank and attempts to save

### 3.6.6 Then

The system displays a validation error message indicating the title is required.

### 3.6.7 And

The reminder is not saved.

### 3.6.8 Validation Notes

Check for frontend and backend validation for all required fields.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Receive a scheduled maintenance reminder notification

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A user has set a maintenance reminder for a specific date and has enabled notifications

### 3.7.5 When

The scheduled date and time for the reminder arrives

### 3.7.6 Then

The system sends a notification (push and/or email, per user preferences) to the user.

### 3.7.7 And

The system correctly calculates and updates the `next_due_date` for the reminder in the database.

### 3.7.8 Validation Notes

Requires testing the background scheduling service. Verify a notification is received on a test device and that the database record for the reminder is updated with the next occurrence's date.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Add Reminder' button on the product details screen.
- A modal or new screen for the reminder creation/editing form.
- Input field for 'Reminder Title' (text).
- A native date picker for 'First Reminder Date'.
- A dropdown/selector for 'Recurrence Frequency' with options: 'Monthly', 'Every 3 Months', 'Every 6 Months', 'Annually'.
- A list view to display existing reminders on the product details screen.
- Edit and Delete icons/buttons for each reminder in the list.
- A confirmation dialog for the delete action.

## 4.2.0 User Interactions

- User taps to add, edit, or delete a reminder.
- User interacts with standard form elements to define the reminder.
- User must explicitly confirm deletion to prevent accidental data loss.

## 4.3.0 Display Requirements

- The list of reminders must clearly show the title and the next due date.
- If no reminders exist, a helpful message should be displayed encouraging the user to create one.

## 4.4.0 Accessibility Needs

- All form fields must have proper labels for screen readers.
- All interactive elements (buttons, icons) must be keyboard-accessible and have accessible names (aria-labels).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The first reminder date for a new maintenance reminder must be in the future.

### 5.1.3 Enforcement Point

Client-side form validation and server-side API validation.

### 5.1.4 Violation Handling

Prevent form submission and display an inline error message to the user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A reminder must be associated with a valid, existing registered product.

### 5.2.3 Enforcement Point

Database level (foreign key constraint).

### 5.2.4 Violation Handling

API returns a 404 or 400 error if the product ID is invalid.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

A product must be registered in the system before a reminder can be associated with it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-025

#### 6.1.2.2 Dependency Reason

The UI for managing reminders will be located on the product's detail/warranty card view.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-055

#### 6.1.3.2 Dependency Reason

The system needs to respect the user's notification preferences (push, email, etc.) when sending reminders.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

The underlying notification infrastructure (FCM/Azure Communication Services integration) must be implemented to send the actual reminder alerts.

## 6.2.0.0 Technical Dependencies

- A backend job scheduling mechanism (e.g., Azure Functions Timer Trigger, NestJS Schedule, or a dedicated cron service) is required to trigger notifications at the correct time.
- Database schema for a new `product_maintenance_reminders` table.

## 6.3.0.0 Data Dependencies

- Requires access to the user's registered product list.
- Requires access to the user's notification settings.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) for push notifications.
- Azure Communication Services for email notifications.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for CRUD operations on reminders should be under 300ms (P95).
- The background scheduling job must be efficient and not cause significant load on the database, even with millions of scheduled reminders.

## 7.2.0.0 Security

- Users must only be able to create, view, edit, or delete reminders for their own products. This must be enforced at the API level via ownership checks.

## 7.3.0.0 Usability

- The process of creating a reminder should be quick and intuitive, requiring minimal steps.
- Error messages must be clear and helpful.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must work on all supported iOS, Android, and web browser versions as defined in the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementation of a robust and scalable background job scheduler.
- Handling of time zones correctly is critical. All dates should be stored in UTC and scheduled based on UTC.
- Logic for calculating the next occurrence date based on different recurrence rules (e.g., monthly, annually).

## 8.3.0.0 Technical Risks

- The scheduler service could be a single point of failure. It must be designed for high availability and include monitoring and alerting.
- Missed or delayed notifications due to scheduler failure or high load.

## 8.4.0.0 Integration Points

- Backend API for managing reminders.
- Database for storing reminder data.
- Background job scheduler.
- Notification services (FCM, Azure Communication Services).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- CRUD operations for reminders.
- Validation of form inputs (past dates, empty fields).
- Verification of notification delivery at the scheduled time.
- Correct recalculation of the next due date after a notification is sent or a reminder is edited.
- Time zone handling: create a reminder in one time zone and verify it triggers at the correct local time for the user.

## 9.3.0.0 Test Data Needs

- Test users with registered products.
- Products with no reminders, one reminder, and multiple reminders.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E tests.
- A method to manually trigger the scheduler for a specific user/reminder to test notification delivery without waiting.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage for new logic
- Integration testing between API, database, and scheduler completed successfully
- User interface reviewed and approved by UX/Product Owner
- Performance requirements verified
- Security requirements validated (ownership checks)
- Documentation for the new API endpoints created/updated in OpenAPI spec
- Story deployed and verified in staging environment, including a successful end-to-end test of a notification being sent and received.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- The backend work on the scheduler is the most complex part and may require a technical spike if a solution is not already in place.
- Dependencies on notification infrastructure (US-101) must be resolved before this story can be completed.
- Frontend and backend tasks can be developed in parallel against a defined API contract.

## 11.4.0.0 Release Impact

This is a significant value-add feature that should be highlighted in release notes and marketing communications to users.

