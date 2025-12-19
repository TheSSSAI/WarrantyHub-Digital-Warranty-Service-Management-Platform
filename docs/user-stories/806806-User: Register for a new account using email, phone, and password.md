# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-016 |
| Elaboration Date | 2024-05-21 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Register for a new account using email, phon... |
| As A User Story | As a new consumer, I want to create a secure accou... |
| User Persona | New Consumer (end-user of products) |
| Business Value | Enables user acquisition, which is the foundationa... |
| Functional Area | User Authentication & Onboarding |
| Story Theme | User Account Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful account registration (Happy Path)

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A new user is on the registration page

### 3.1.5 When

The user enters a valid Full Name, a unique Email, a valid Phone Number, a strong Password, matching confirmation password, and checks the 'Agree to Terms' box

### 3.1.6 And

The user is redirected to the login page or their new dashboard with a success message.

### 3.1.7 Then

The system creates a new user account in Azure AD B2C

### 3.1.8 Validation Notes

Verify the new user record exists in the Azure AD B2C tenant. E2E test should confirm redirection and success message.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Registration with an existing email address

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A user is on the registration page

### 3.2.5 When

The user enters an email address that is already associated with an existing account and submits the form

### 3.2.6 Then

The system displays a clear, non-blocking error message, such as 'An account with this email already exists. Please log in.'

### 3.2.7 And

No new account is created.

### 3.2.8 Validation Notes

Test with a pre-existing email in the database. The API should return a specific error code (e.g., 409 Conflict) which the frontend translates into the user message.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Registration with mismatched passwords

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A user is on the registration page and has filled out the form

### 3.3.5 When

The user enters a password in the 'Password' field that does not match the 'Confirm Password' field and attempts to submit

### 3.3.6 Then

The system displays an inline validation error next to the password fields indicating the mismatch

### 3.3.7 And

The form submission is prevented.

### 3.3.8 Validation Notes

This should be a client-side validation for immediate feedback, with a secondary check on the backend.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Registration with a weak password

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A user is on the registration page

### 3.4.5 When

The user enters a password that does not meet the platform's complexity requirements (e.g., length, character types)

### 3.4.6 Then

The system displays an inline validation error clearly stating the password requirements

### 3.4.7 And

The form submission is prevented.

### 3.4.8 Validation Notes

Password policy is defined by Azure AD B2C. The frontend should display these rules to the user.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to register without accepting Terms of Service

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A user is on the registration page and has filled all fields

### 3.5.5 When

The user attempts to click the 'Register' button without checking the 'Agree to Terms of Service and Privacy Policy' checkbox

### 3.5.6 Then

The 'Register' button should be disabled, or a message should prompt the user to accept the terms.

### 3.5.7 Validation Notes

The checkbox state should control the enabled/disabled state of the submit button.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Entering an incorrect OTP during phone verification

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A user has submitted the registration form and is on the OTP entry screen

### 3.6.5 When

The user enters an incorrect OTP

### 3.6.6 Then

The system displays an error message 'Invalid OTP. Please try again.'

### 3.6.7 And

The user is allowed to re-enter the OTP, up to a maximum of 3 attempts before the flow is locked.

### 3.6.8 Validation Notes

Verify that after 3 failed attempts, the user is prompted to restart the registration or resend a new OTP.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

OTP expires before entry

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

A user has submitted the registration form and is on the OTP entry screen

### 3.7.5 When

The user waits longer than the OTP validity period (e.g., 5 minutes) before entering it

### 3.7.6 Then

The system displays an error message 'OTP has expired. Please request a new one.'

### 3.7.7 And

A 'Resend OTP' option is available.

### 3.7.8 Validation Notes

The OTP service should be configured with an expiry time. Test by waiting for the specified duration.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Input field for 'Full Name'
- Input field for 'Email Address'
- Input field for 'Phone Number' (with country code selector)
- Input field for 'Password' (masked)
- Input field for 'Confirm Password' (masked)
- Icon to toggle password visibility
- Checkbox for 'I agree to the Terms of Service and Privacy Policy'
- Hyperlinks to 'Terms of Service' and 'Privacy Policy' pages/modals
- Primary button for 'Register' or 'Create Account'
- A separate screen or modal for OTP entry with an input field
- Link/button to 'Resend OTP'

## 4.2.0 User Interactions

- Inline validation messages appear on field blur or form submission attempt.
- The 'Register' button is disabled until all required fields are valid and the terms checkbox is checked.
- A loading indicator is displayed after the form is submitted.
- The user is automatically focused on the OTP input field when it appears.

## 4.3.0 Display Requirements

- Password complexity rules must be displayed near the password field.
- Success and error messages must be clear and user-friendly.

## 4.4.0 Accessibility Needs

- All form fields must have corresponding `<label>` tags.
- The form must be fully navigable and operable via keyboard.
- Validation errors must be programmatically linked to their respective inputs and announced by screen readers.
- The UI must comply with WCAG 2.1 Level AA contrast and text size requirements.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user account must be associated with a unique email address.

### 5.1.3 Enforcement Point

During the registration form submission.

### 5.1.4 Violation Handling

Prevent account creation and display an error message indicating the email is already in use.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A user must explicitly accept the Terms of Service and Privacy Policy to create an account.

### 5.2.3 Enforcement Point

During the registration form submission.

### 5.2.4 Violation Handling

Prevent form submission until the acceptance checkbox is checked.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

The user's phone number must be verified via OTP before the account is fully activated.

### 5.3.3 Enforcement Point

Immediately after initial form submission, before finalizing account creation.

### 5.3.4 Violation Handling

Account creation process is halted until a valid OTP is provided. The user record may be in a 'pending verification' state.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-017', 'dependency_reason': 'The content for the Terms of Service and Privacy Policy pages must be available and accessible via links from the registration form.'}

## 6.2.0 Technical Dependencies

- Configuration of the 'Sign-up' user flow in Azure Active Directory B2C.
- Integration with Azure Communication Services (or another provider) for sending SMS-based OTPs.
- Availability of UI/UX designs for the registration and OTP verification screens.

## 6.3.0 Data Dependencies

- A defined password complexity policy to be enforced by Azure AD B2C.

## 6.4.0 External Dependencies

- The Azure AD B2C service must be operational.
- The third-party SMS gateway must be operational and have sufficient credits.

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The registration form page should achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.
- The API response time for the registration submission (pre-OTP) should be under 500ms (P95).

## 7.2.0 Security

- All communication must use HTTPS (TLS 1.3).
- User passwords must be securely handled and stored by Azure AD B2C, never logged or stored in plain text by the application.
- Strict input validation must be performed on all fields to prevent XSS, SQLi, and other injection attacks.
- Rate limiting must be implemented on the registration endpoint and the 'Resend OTP' function to prevent abuse and brute-force attacks.

## 7.3.0 Usability

- The registration process should be intuitive and require minimal effort from the user.
- Error messages should be constructive and guide the user toward a successful submission.

## 7.4.0 Accessibility

- The entire registration flow must be compliant with WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- The web registration form must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- The mobile registration form must be fully functional on supported iOS and Android versions as defined in the SRS (iOS 14+, Android 8.0+).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- External service integration with Azure AD B2C, which requires specific configuration and handling of its authentication flows (e.g., user flows, custom policies).
- Integration with a third-party SMS gateway for OTP, including handling potential delivery delays and failures.
- Implementing a robust and user-friendly error handling mechanism for all potential failure points (validation, network, external services).

## 8.3.0 Technical Risks

- Configuration complexity or limitations within Azure AD B2C user flows may require shifting to more complex custom policies.
- Unreliable SMS delivery from the chosen provider could negatively impact the user experience.

## 8.4.0 Integration Points

- Azure Active Directory B2C for identity management.
- Azure Communication Services for SMS OTP.
- Application's primary database (PostgreSQL) for storing user profile information linked to the B2C object ID.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0 Test Scenarios

- Full E2E registration with a new, valid user.
- Attempted registration with an email that already exists.
- Attempted registration with invalid data in each field (email format, phone format, weak password).
- OTP verification flow: correct OTP, incorrect OTP, expired OTP, resend OTP.
- Keyboard-only navigation and submission.
- Screen reader validation of the entire flow.

## 9.3.0 Test Data Needs

- A set of new, unused email addresses and phone numbers for happy path testing.
- A pre-existing user account to test the 'email already exists' scenario.
- A list of invalid inputs for each field to test validation logic.

## 9.4.0 Testing Tools

- Jest & React Testing Library for frontend unit tests.
- Playwright for E2E tests.
- Axe for automated accessibility checks.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage meets the project standard (e.g., 80%).
- E2E tests for the registration happy path and key failure scenarios are implemented and passing in the CI pipeline.
- The feature has been successfully tested on all supported browsers and mobile OS versions.
- Security requirements, including rate limiting and input validation, have been verified.
- Accessibility audit (automated and manual) has been completed and passed.
- Azure AD B2C and SMS gateway configurations are documented.
- The feature is deployed and verified in the staging environment by QA.

# 11.0.0 Planning Information

## 11.1.0 Story Points

5

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a foundational story and a blocker for most other user-facing features. It should be prioritized in an early sprint.
- Requires access and permissions for configuring Azure AD B2C and the SMS gateway service. This should be secured before the sprint begins.

## 11.4.0 Release Impact

This feature is critical for the initial launch (MVP). The platform cannot acquire users without it.

