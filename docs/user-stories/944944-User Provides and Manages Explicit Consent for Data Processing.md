# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-085 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Provides and Manages Explicit Consent for Dat... |
| As A User Story | As a new and existing platform User, I want to be ... |
| User Persona | Any new or registered end-user (Consumer) of the w... |
| Business Value | Ensures legal compliance with data protection regu... |
| Functional Area | User Account Management & Compliance |
| Story Theme | User Onboarding and Trust |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

New user provides consent during registration

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a new user is on the final step of the account registration flow

### 3.1.5 When

the consent form is displayed

### 3.1.6 Then



```
the user must see a mandatory checkbox to agree to the 'Terms of Service and Privacy Policy', which is initially unchecked.
AND the user must see separate, optional, and unchecked checkboxes/toggles for 'Marketing Communications' and 'Location Tracking'.
AND the 'Complete Registration' button is disabled.
```

### 3.1.7 Validation Notes

Verify the UI elements are present and the button state is disabled by default.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

New user accepts mandatory consent to complete registration

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a new user is on the consent screen during registration

### 3.2.5 When

the user checks the mandatory 'Terms of Service and Privacy Policy' checkbox

### 3.2.6 Then

the 'Complete Registration' button becomes enabled.

### 3.2.7 Validation Notes

Test the state change of the button upon checking the box.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

System records user consent choices upon registration

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a new user has checked the mandatory consent and optionally checked the marketing and location consents

### 3.3.5 When

the user clicks the 'Complete Registration' button

### 3.3.6 Then



```
the user's account is successfully created.
AND the system records each consent choice (granted/denied) with the user's ID, the version of the policy agreed to, and a timestamp in an audit log.
```

### 3.3.7 Validation Notes

Verify the user record and the consent audit table in the database for the correct entries.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Registered user views their consent settings

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a registered user is logged into the platform

### 3.4.5 When

they navigate to the 'Account Settings' -> 'Privacy & Consent' page

### 3.4.6 Then



```
the user sees their current consent status for 'Marketing Communications' and 'Location Tracking' accurately reflected in UI toggles.
AND the user can view links to the current 'Terms of Service' and 'Privacy Policy'.
```

### 3.4.7 Validation Notes

Verify the UI toggles match the state stored in the database for the logged-in user.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Registered user successfully updates their consent settings

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a registered user is on the 'Privacy & Consent' page

### 3.5.5 When

the user changes the state of a consent toggle (e.g., turns off 'Marketing Communications')

### 3.5.6 Then



```
the system saves the new consent state immediately.
AND a confirmation message (e.g., 'Preferences updated') is displayed to the user.
AND the system records this change with the user's ID, the new status, and a timestamp in the audit log.
```

### 3.5.7 Validation Notes

Verify the database is updated and an audit record is created. The UI should provide immediate feedback.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User attempts to register without accepting mandatory terms

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a new user is on the consent screen during registration

### 3.6.5 When

they attempt to submit the form without checking the 'Terms of Service and Privacy Policy' checkbox

### 3.6.6 Then



```
the submission is blocked.
AND a clear error message is displayed instructing them to accept the terms to continue.
```

### 3.6.7 Validation Notes

Verify the button remains disabled or, if enabled, that clicking it shows an error and does not create an account.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Interaction with OS-level permissions for location

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

a user has granted 'Location Tracking' consent within the app but has denied location permissions for the app at the OS level (iOS/Android)

### 3.7.5 When

the user attempts to use a feature requiring location (e.g., technician tracking map)

### 3.7.6 Then

the app displays a user-friendly message guiding them to enable location permissions in their device's settings.

### 3.7.7 Validation Notes

This requires testing on actual devices or emulators where OS permissions can be toggled.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Mandatory checkbox for Terms of Service & Privacy Policy.
- Separate toggle switches or checkboxes for each optional consent type (Marketing, Location).
- A dedicated 'Privacy & Consent' section within the user's account settings.
- Confirmation toast/snackbar for successful updates.
- Informational tooltips or links next to each consent option explaining what it covers.

## 4.2.0 User Interactions

- The registration button's enabled/disabled state must be tied to the mandatory consent checkbox.
- Changing a consent toggle in settings should trigger an auto-save without needing a separate 'Save' button.
- Clicking on links for legal documents should open them in a web view or new tab.

## 4.3.0 Display Requirements

- The wording for each consent request must be clear, concise, and unambiguous.
- The current state of each consent must be clearly visible on the settings page.

## 4.4.0 Accessibility Needs

- All checkboxes and toggles must be properly labeled for screen readers (WCAG 2.1 AA).
- Sufficient color contrast for text, links, and UI controls.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Consent for 'Terms of Service and Privacy Policy' is mandatory for account creation and use of the service.

### 5.1.3 Enforcement Point

User Registration API.

### 5.1.4 Violation Handling

Account creation request is rejected with a 400-level error code and a descriptive message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

All consent actions (granting or revoking) must be recorded in an immutable audit log, including user ID, consent type, consent state, policy version, and timestamp.

### 5.2.3 Enforcement Point

Consent Management Service (Backend).

### 5.2.4 Violation Handling

The consent change operation fails if the audit log entry cannot be created.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Marketing communications (email, push notifications) must only be sent to users who have explicitly opted in.

### 5.3.3 Enforcement Point

Notification Service, before sending any promotional message.

### 5.3.4 Violation Handling

The message is not sent to the user.

## 5.4.0 Rule Id

### 5.4.1 Rule Id

BR-004

### 5.4.2 Rule Description

Technician location data can only be collected and shared if the user has explicitly opted in.

### 5.4.3 Enforcement Point

Location Service, before initiating a tracking session.

### 5.4.4 Violation Handling

The location tracking feature is disabled for the user, and the UI reflects this.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

This story adds the consent step to the user registration flow defined in US-095.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-096

#### 6.1.2.2 Dependency Reason

User must be able to log in to access the consent management settings page.

## 6.2.0.0 Technical Dependencies

- A finalized User model and authentication service (Azure AD B2C).
- A backend service capable of managing user profile data.
- A database schema designed to store and audit consent records.

## 6.3.0.0 Data Dependencies

- Finalized, versioned text for the Terms of Service and Privacy Policy from the legal team.
- Finalized, legally-approved wording for the consent request prompts.

## 6.4.0.0 External Dependencies

- Sign-off from the Legal/Compliance team on the entire consent flow and wording to ensure it meets regulatory requirements.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for updating consent preferences must be under 500ms (P95).
- The consent management page must load in under 2 seconds.

## 7.2.0.0 Security

- Consent records must be stored securely with access strictly controlled.
- The audit trail for consent changes must be immutable or tamper-evident.
- API endpoints for managing consent must be protected and require user authentication.

## 7.3.0.0 Usability

- The language used must be simple and easily understood by a non-technical audience.
- It must be as easy to withdraw consent as it is to give it.

## 7.4.0.0 Accessibility

- All UI components must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The consent management page must be fully functional on all supported web browsers and mobile OS versions as defined in SRS 2.3.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires database schema design for an auditable consent log.
- Modification of the core user registration workflow.
- Requires creating a centralized way for other microservices (Notifications, Location) to check a user's consent status efficiently.
- Coordination with the legal team is critical and can introduce delays.

## 8.3.0.0 Technical Risks

- Ensuring the audit log is truly immutable and performant.
- Potential for race conditions if a user changes consent while a related action (e.g., sending an email) is in progress.

## 8.4.0.0 Integration Points

- User Registration Service: To inject the consent step.
- User Profile/Settings Service: To host the management UI and API.
- Notification Service: Must query consent status before sending marketing messages.
- Location Service: Must query consent status before activating technician tracking.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Full user registration flow with all combinations of consent choices.
- Logged-in user successfully viewing and updating their consent settings.
- Attempting to register without mandatory consent.
- Verifying that revoking marketing consent stops promotional emails (requires integration test with Notification service).
- Verifying that revoking location consent disables the technician tracking map (requires integration test with Location service).

## 9.3.0.0 Test Data Needs

- Test accounts with different consent configurations (all granted, none granted, mixed).
- Test accounts for new user registration.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Cypress for E2E tests.
- A screen reader (e.g., NVDA, VoiceOver) for accessibility testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least two peers
- Unit and integration tests implemented with >80% coverage for new logic
- E2E tests for registration and consent management are passing in the CI/CD pipeline
- User interface and wording reviewed and signed off by the Product and Legal teams
- Performance requirements for API and page load times are verified
- Security review completed for the consent storage and API endpoints
- Technical documentation for the consent service API and audit schema is created/updated
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for compliance and must be completed before launching features that depend on optional consent.
- Requires lead time for legal review and sign-off, which should be initiated at the start of the sprint.

## 11.4.0.0 Release Impact

This is a blocker for any public release due to its legal compliance implications.

