# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-090 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Manages Notification Preferences |
| As A User Story | As a registered User, I want to access a dedicated... |
| User Persona | The registered end-user (Consumer) of the web and ... |
| Business Value | Improves user satisfaction and retention by giving... |
| Functional Area | User Account Management |
| Story Theme | User Profile & Settings |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User successfully views and modifies notification preferences

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user with a verified email and phone number, and I navigate to the 'Notification Preferences' screen.

### 3.1.5 When

I disable the 'Email' channel for the 'Warranty Expiry Reminder' and enable the 'SMS' channel for 'Technician On The Way'.

### 3.1.6 Then

The UI should update instantly to reflect these changes with a confirmation (e.g., a 'Saved' indicator).

### 3.1.7 Validation Notes

Verify that the API call to update preferences is successful (200 OK). Subsequently, trigger the relevant events and confirm that a warranty reminder is NOT sent via email and a technician status update IS sent via SMS.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

System handles OS-level disabling of push notifications

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

I am a logged-in user on the mobile app, and I have disabled push notifications for this app in my device's OS settings.

### 3.2.5 When

I navigate to the 'Notification Preferences' screen.

### 3.2.6 Then

All toggles in the 'Push' notification channel column must be disabled (greyed out).

### 3.2.7 And

A clear, non-intrusive message must be displayed, informing me that push notifications are disabled at the system level and providing guidance on how to re-enable them.

### 3.2.8 Validation Notes

Test on both iOS and Android. The app must correctly detect the OS-level permission status and render the UI accordingly.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

System handles missing user contact information for specific channels

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

I am a logged-in user who has registered with an email but has NOT provided a phone number in my profile.

### 3.3.5 When

I navigate to the 'Notification Preferences' screen.

### 3.3.6 Then

All toggles in the 'SMS' channel column must be disabled.

### 3.3.7 And

A message or tooltip should be present, prompting me to add a phone number to my profile to enable SMS notifications, potentially linking to the profile edit screen.

### 3.3.8 Validation Notes

Verify this for a user account with a null 'phone_number' field. The same logic should apply if an email is missing for the 'Email' channel.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

UI displays a structured and comprehensive list of notification types

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am a user on the 'Notification Preferences' screen.

### 3.4.5 When

I view the list of configurable notifications.

### 3.4.6 Then

The notifications must be grouped into logical categories such as 'Service Requests', 'Warranty & Product', and 'Account'.

### 3.4.7 And

The list must include toggles for all user-facing notifications mentioned in the SRS, including: Warranty Expiry Reminders, Recurring Service Reminders, Service Request Creation Confirmation, Technician Assignment, Technician 'On The Way', Service Request Resolution, Warranty Claim Approval/Rejection, and New Chat Messages.

### 3.4.8 Validation Notes

Review the UI against the defined list of notification triggers to ensure completeness. The categories should make the screen easy to scan.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

System fails to save preferences

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a logged-in user on the 'Notification Preferences' screen.

### 3.5.5 When

I change a preference, and the backend API call fails (e.g., returns a 5xx error).

### 3.5.6 Then

The UI toggle should revert to its original state.

### 3.5.7 And

A user-friendly error message (e.g., 'Could not save preferences. Please try again.') must be displayed.

### 3.5.8 Validation Notes

Use a tool like Charles Proxy or browser dev tools to mock a failed API response and verify the frontend handles the error gracefully.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A new navigation item for 'Notification Preferences' within the main Settings/Profile area.
- A screen with a clear title, e.g., 'Notification Preferences'.
- Group headings for notification categories (e.g., 'Service Requests').
- For each notification type, a row containing a descriptive label (e.g., 'When a technician is on the way').
- For each row, three distinct toggle switches or checkboxes for 'Push', 'Email', and 'SMS'.
- Informational messages for disabled channels (due to OS settings or missing contact info).
- Visual feedback for successful save operations (e.g., a temporary toast message or checkmark).

## 4.2.0 User Interactions

- Tapping a toggle should immediately attempt to save the new state.
- The UI should provide immediate visual feedback on the state change.
- If a channel is disabled, the toggle should be non-interactive.

## 4.3.0 Display Requirements

- The current state (enabled/disabled) of every notification channel must be clearly visible.
- The list of notification types must be comprehensive and use user-friendly language.

## 4.4.0 Accessibility Needs

- All toggles must have proper ARIA attributes and labels for screen readers (e.g., 'Push notifications for Warranty Expiry Reminders').
- The layout must adhere to WCAG 2.1 Level AA standards for color contrast and text size.
- The screen must be fully navigable using a keyboard.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

All notification preferences are user-configurable. There are no mandatory, non-editable notifications for this phase, except for critical legal notices (e.g., ToS updates) which are handled outside this preference system.

### 5.1.3 Enforcement Point

Notification Dispatch Service

### 5.1.4 Violation Handling

N/A. The system must always check preferences before sending a notification.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A user's default preference upon registration is to have all Push and Email notifications enabled, and all SMS notifications disabled, where contact info is available.

### 5.2.3 Enforcement Point

User Registration Service

### 5.2.4 Violation Handling

A new user record must be created with these default preferences.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

A user account system must exist to store preferences against.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-089

#### 6.1.2.2 Dependency Reason

The underlying infrastructure for sending Push, Email (Azure Communication Services), and SMS (Azure Communication Services) notifications must be in place.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint to GET and PUT user notification preferences.
- A new database table to store preferences per user, per notification type, per channel.
- The central Notification Dispatch Service must be modified to query these preferences before sending any notification.

## 6.3.0.0 Data Dependencies

- Requires access to the user's profile data to check for the existence of a verified email and phone number.

## 6.4.0.0 External Dependencies

- Relies on the correct functioning of Firebase Cloud Messaging (FCM) and Azure Communication Services.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for updating preferences must have a P95 response time of less than 300ms.
- Loading the preferences screen must take less than 1 second.

## 7.2.0.0 Security

- A user must only be able to view and modify their own notification preferences. API endpoints must be secured to prevent unauthorized access (e.g., checking JWT claims against the requested user ID).
- All data must be transmitted over HTTPS.

## 7.3.0.0 Usability

- The screen must be intuitive and require no special instructions to use.
- Changes should be saved automatically upon interaction to reduce user effort.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA.

## 7.5.0.0 Compatibility

- The web interface must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- The mobile interface must function correctly on iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordinated changes across multiple components: frontend (web/mobile), backend (user service), and the notification service.
- The logic in every service that triggers a notification must be updated to first check the user's preferences.
- Requires native code or a reliable library in React Native to detect OS-level push notification permissions.
- The list of notification types must be maintained as a shared contract (e.g., enum) across services to avoid inconsistencies.

## 8.3.0.0 Technical Risks

- Risk of a notification-triggering service failing to check preferences, leading to unwanted notifications being sent.
- Inconsistent implementation of the preference check across different microservices.

## 8.4.0.0 Integration Points

- User Profile Service (for getting/setting preferences).
- Notification Dispatch Service (for reading preferences).
- All microservices that trigger notifications (e.g., Service Request Service, Warranty Service).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify each notification type can be independently configured for each channel.
- Test the end-to-end flow: User sets preference -> Event is triggered -> Notification is correctly sent or blocked based on the preference.
- Test the UI behavior on devices where push notifications are disabled at the OS level.
- Test the UI behavior for accounts missing an email or phone number.

## 9.3.0.0 Test Data Needs

- User accounts with: a) both email and phone, b) only email, c) only phone.
- Test devices (physical or emulated) where OS-level push permissions can be toggled.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Jest for backend unit tests.
- Cypress for web E2E tests.
- A framework like Detox or Appium for mobile E2E tests.
- A mock server or service virtualization to simulate notification service behavior during integration tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the project standard (e.g., >80%).
- End-to-end automated tests for the primary success and failure scenarios have been created and are passing.
- UI has been reviewed for consistency and usability by a UX designer.
- Accessibility audit (automated and manual) has been performed and any critical issues resolved.
- The feature has been successfully demonstrated to the Product Owner.
- Any necessary user documentation or help guides have been updated.
- Deployed and verified in the staging environment without regressions.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The backend API and database schema changes should be prioritized to unblock frontend development.
- A clear contract for the list of notification types should be established early in the sprint.
- Requires cross-functional collaboration between frontend, backend, and DevOps/SRE teams.

## 11.4.0.0 Release Impact

This is a significant user-facing feature that improves user experience and should be highlighted in release notes.

