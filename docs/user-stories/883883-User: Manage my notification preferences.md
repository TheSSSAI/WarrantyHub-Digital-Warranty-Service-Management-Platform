# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-055 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Manage my notification preferences |
| As A User Story | As a registered user, I want to access a settings ... |
| User Persona | Registered User/Consumer of the web and mobile app... |
| Business Value | Increases user satisfaction and retention by preve... |
| Functional Area | User Profile & Settings |
| Story Theme | User Account Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Accessing the Notification Preferences screen

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user

### 3.1.5 When

I navigate to my profile/settings area and select 'Notification Preferences'

### 3.1.6 Then

I should be presented with a screen that lists all configurable notification events and their corresponding channel toggles (Push, Email, SMS).

### 3.1.7 Validation Notes

Verify the screen is accessible and correctly displays the UI for managing preferences.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Enabling and saving a specific notification preference

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Notification Preferences' screen and the 'Push Notification' for 'Technician Assigned' is disabled

### 3.2.5 When

I enable the 'Push Notification' toggle for the 'Technician Assigned' event and click 'Save'

### 3.2.6 Then

The system must persist this preference to my user profile.

### 3.2.7 And

The toggle must remain in the enabled state after the page is reloaded.

### 3.2.8 Validation Notes

Check the database to confirm the preference is saved. Trigger the event and verify a push notification is sent.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Disabling and saving a specific notification preference

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am on the 'Notification Preferences' screen and the 'Email' notification for 'Warranty Expiry Reminders' is enabled

### 3.3.5 When

I disable the 'Email' toggle for the 'Warranty Expiry Reminders' event and click 'Save'

### 3.3.6 Then

The system must update this preference in my user profile.

### 3.3.7 And

I must not receive an email when my product's warranty is about to expire.

### 3.3.8 Validation Notes

Check the database to confirm the preference is updated. Trigger the event and verify no email is sent.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to enable notifications for an unverified channel

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am a logged-in user who has not provided or verified a phone number

### 3.4.5 When

I view the 'Notification Preferences' screen

### 3.4.6 Then

All toggles for the 'SMS' channel must be disabled (greyed out).

### 3.4.7 And

An informative message should be displayed, prompting me to add and verify a phone number in my profile to enable SMS alerts.

### 3.4.8 Validation Notes

Verify the UI state for users with incomplete contact information. The same logic applies to an unverified email address.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Default notification settings for a new user

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

A new user has just completed registration

### 3.5.5 When

They view the 'Notification Preferences' screen for the first time

### 3.5.6 Then

A default set of preferences should be applied.

### 3.5.7 And

The defaults should be: Push (Enabled for all), Email (Enabled for all), SMS (Disabled for all).

### 3.5.8 Validation Notes

Verify the initial state of preferences for a newly created user account.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

API failure when saving preferences

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am on the 'Notification Preferences' screen and I have changed a setting

### 3.6.5 When

I click 'Save' and the backend API returns an error (e.g., 500 Internal Server Error)

### 3.6.6 Then

The UI must display a user-friendly error message (e.g., 'Failed to save preferences. Please try again.').

### 3.6.7 And

The toggles on the screen must revert to their last successfully saved state.

### 3.6.8 Validation Notes

Use browser developer tools or a proxy to simulate an API failure and verify the UI response.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated 'Notification Preferences' screen.
- A list of all notification events (e.g., 'Warranty Expiry', 'Technician Assigned').
- On/Off toggles for each channel (Push, Email, SMS) next to each event.
- A 'Save Changes' button.
- A toast/snackbar component for success and error messages.
- Informational text for disabled channels (e.g., 'Add a phone number to enable SMS').

## 4.2.0 User Interactions

- User can tap toggles to change their state.
- User must click a 'Save' button to persist changes.
- The 'Save' button should be disabled until a change is made.

## 4.3.0 Display Requirements

- The screen must clearly label each notification event and channel.
- The current state (enabled/disabled) of each preference must be clearly visible.

## 4.4.0 Accessibility Needs

- All toggles and labels must be compliant with WCAG 2.1 Level AA.
- The screen must be fully navigable using a keyboard.
- All interactive elements must have proper ARIA attributes for screen reader compatibility.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Transactional notifications, such as OTP for login, are mandatory and cannot be disabled through this preference screen.

### 5.1.3 Enforcement Point

Notification Service

### 5.1.4 Violation Handling

The preference system will not include options for transactional messages. The Notification Service will bypass preference checks for messages flagged as 'transactional'.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A user must have a verified email address to enable email notifications and a verified phone number for SMS notifications.

### 5.2.3 Enforcement Point

Frontend UI and Backend API

### 5.2.4 Violation Handling

The UI will disable the corresponding toggles. The backend will reject any attempt to enable a channel for which verified contact info is missing.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-018

#### 6.1.1.2 Dependency Reason

Requires a logged-in user session to manage preferences.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-111

#### 6.1.2.2 Dependency Reason

Depends on the user profile system where contact information (email, phone) is managed and verified.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-101

#### 6.1.3.2 Dependency Reason

The core notification sending mechanism must exist. This story modifies that mechanism to check preferences before sending.

## 6.2.0.0 Technical Dependencies

- A backend service (e.g., User Profile Service) to store and retrieve user preferences.
- A new database table (e.g., `user_notification_preferences`) to store the settings.
- The centralized Notification Service must be capable of querying these preferences before dispatching a notification via FCM or Azure Communication Services.

## 6.3.0.0 Data Dependencies

- A finalized, enumerated list of notification event types that will be configurable.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for saving preferences must have a P95 response time of less than 500ms.
- The overhead of checking preferences in the Notification Service should add less than 20ms to the notification dispatch process.

## 7.2.0.0 Security

- The API endpoints for getting and setting preferences must be authenticated and authorized, ensuring a user can only modify their own settings.
- User preferences should be considered sensitive user data and protected accordingly.

## 7.3.0.0 Usability

- The settings screen must be intuitive and easy to understand for non-technical users.
- Changes should be confirmed with clear feedback.

## 7.4.0.0 Accessibility

- All UI components must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web interface must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- The mobile interface must be functional on supported iOS and Android versions as defined in the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a new database schema for storing preferences.
- Involves modifying a core, cross-cutting concern (the Notification Service), which affects many other features.
- Requires coordinated implementation across both frontend (Web/Mobile) and backend platforms.

## 8.3.0.0 Technical Risks

- Risk of performance degradation in the notification pipeline if the preference check is not optimized.
- Risk of inconsistent behavior if the list of notification events is not synchronized between frontend and backend.

## 8.4.0.0 Integration Points

- User Profile Service (for storing/retrieving preferences).
- Notification Service (for enforcing preferences).
- Frontend applications (for the UI).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify a user can enable/disable each notification type for each channel.
- Verify that when a preference is disabled, the corresponding notification is NOT sent.
- Verify that when a preference is enabled, the corresponding notification IS sent.
- Test the UI behavior for users without a verified email or phone number.
- Test the API error handling and UI feedback.

## 9.3.0.0 Test Data Needs

- User accounts with all contact info verified.
- User accounts with only email verified.
- User accounts with only phone verified.
- User accounts with no contact info verified.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- Axe (Accessibility)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >= 80% coverage and passing
- Integration testing between triggering services and the updated Notification Service is completed successfully
- User interface implemented on both web and mobile, reviewed, and approved by UX
- Performance requirements verified
- Security requirements validated
- API documentation (OpenAPI) for new endpoints is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a significant UX improvement and should be prioritized early after core features are stable.
- Requires backend and frontend (both web and mobile) work, which can be done in parallel once the API contract is defined.

## 11.4.0.0 Release Impact

- This feature is a key component for user satisfaction and should be included in a major user-facing release.

