# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-095 |
| Elaboration Date | 2024-10-27 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Registers for an Account via Email or Phone |
| As A User Story | As a new prospective user, I want to create a secu... |
| User Persona | A new, unauthenticated individual visiting the pla... |
| Business Value | Enables user acquisition, which is the primary gat... |
| Functional Area | User Identity and Access Management |
| Story Theme | User Onboarding |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful registration using a unique email address

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a new user on the registration page and have selected the 'Register with Email' option

### 3.1.5 When

I enter a valid first name, last name, a unique and valid email address, a password that meets complexity requirements, confirm the password correctly, accept the Terms of Service, and submit the form

### 3.1.6 Then

My account is created in a 'pending verification' state, I am redirected to a page instructing me to check my email, and a verification email is sent to the provided address via Azure Communication Services.

### 3.1.7 Validation Notes

Verify the user record is created in Azure AD B2C. Verify the verification email is sent and received. The user should not be able to log in until the email is verified.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successful registration using a unique phone number

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a new user on the registration page and have selected the 'Register with Phone' option

### 3.2.5 When

I enter a valid first name, last name, a unique and valid phone number, a password that meets complexity requirements, confirm the password correctly, accept the Terms of Service, and submit the form

### 3.2.6 Then

I am redirected to an OTP entry screen, and an SMS containing a one-time password (OTP) is sent to the provided phone number via Azure Communication Services.

### 3.2.7 Validation Notes

Verify the OTP is sent and received. The user account creation should be finalized only after successful OTP validation on a subsequent screen (covered in a separate verification story).

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempting to register with an existing email address

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the registration page

### 3.3.5 When

I enter an email address that already exists in the system and submit the form

### 3.3.6 Then

The form submission is prevented, and an inline error message is displayed stating 'This email address is already in use. Please log in or use a different email.'

### 3.3.7 Validation Notes

Test with a pre-existing user email. The system must not reveal any more information about the account.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to register with an existing phone number

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the registration page

### 3.4.5 When

I enter a phone number that already exists in the system and submit the form

### 3.4.6 Then

The form submission is prevented, and an inline error message is displayed stating 'This phone number is already in use. Please log in or use a different number.'

### 3.4.7 Validation Notes

Test with a pre-existing user phone number.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Password and confirmation password do not match

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the registration page

### 3.5.5 When

I enter a password in the 'Password' field and a different value in the 'Confirm Password' field

### 3.5.6 Then

An inline error message is displayed under the 'Confirm Password' field stating 'Passwords do not match.'

### 3.5.7 Validation Notes

This validation should ideally trigger on field blur for better UX.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Password does not meet complexity requirements

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am on the registration page

### 3.6.5 When

I enter a password that does not meet the defined complexity rules

### 3.6.6 Then

An inline error message is displayed detailing the requirements: 'Password must be at least 12 characters and include uppercase, lowercase, numbers, and special characters.'

### 3.6.7 Validation Notes

Test various combinations that fail the complexity check (e.g., too short, missing a character type).

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Attempting to register without accepting Terms of Service

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I have filled out all registration fields correctly

### 3.7.5 When

I attempt to submit the form without checking the 'I accept the Terms of Service and Privacy Policy' checkbox

### 3.7.6 Then

The form submission is blocked, and a validation message is displayed next to the checkbox, prompting me to accept the terms.

### 3.7.7 Validation Notes

Verify the submit button is disabled or the submission is rejected if the box is not checked.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Inputting an invalid email or phone number format

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

I am on the registration page

### 3.8.5 When

I enter text that is not a valid email format (e.g., 'test@test') in the email field OR an invalid phone number format in the phone field

### 3.8.6 Then

An inline validation error is displayed in real-time or on field blur, indicating the required format.

### 3.8.7 Validation Notes

Client-side validation should provide immediate feedback.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Tabs or radio buttons to select between 'Email' and 'Phone' registration
- Input field for First Name
- Input field for Last Name
- Input field for Email or Phone Number (conditional)
- Input field for Password (masked by default)
- Input field for Confirm Password (masked by default)
- Show/Hide password toggle icon for password fields
- Checkbox for accepting Terms of Service and Privacy Policy
- Clickable links to 'Terms of Service' and 'Privacy Policy' documents
- 'Register' or 'Create Account' button
- Link to the 'Log In' page for existing users

## 4.2.0 User Interactions

- The form should perform client-side validation for required fields, format, and password match before submission.
- Error messages should appear inline, next to the relevant fields.
- The 'Register' button should be disabled until all required fields are filled and the T&C checkbox is checked.

## 4.3.0 Display Requirements

- The password complexity requirements must be clearly displayed as helper text near the password field.
- The UI must be fully responsive, adapting to mobile, tablet, and desktop screen sizes.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels for screen readers (WCAG 2.1 AA).
- All interactive elements must have clear focus indicators.
- Error messages must be programmatically associated with their respective input fields.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user account must be uniquely identified by either an email address or a phone number. The same identifier cannot be used for multiple accounts.

### 5.1.3 Enforcement Point

During form submission, at the server-side/Azure AD B2C level.

### 5.1.4 Violation Handling

The registration attempt is rejected, and a user-friendly error message is returned.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

User passwords must be at least 12 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.

### 5.2.3 Enforcement Point

During form submission, enforced by Azure AD B2C password policy.

### 5.2.4 Violation Handling

The registration is rejected, and an error message detailing the requirements is shown.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Users must explicitly accept the platform's Terms of Service and Privacy Policy to create an account.

### 5.3.3 Enforcement Point

Client-side validation on the registration form and re-verified server-side.

### 5.3.4 Violation Handling

The registration process is blocked until consent is provided.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

*No items available*

## 6.2.0 Technical Dependencies

- Azure Active Directory (AAD) B2C must be configured with a custom user flow or policy for sign-up.
- Azure Communication Services must be configured for sending transactional emails and SMS.
- Backend API endpoint to orchestrate the registration flow with AAD B2C.
- Frontend UI components for the registration form.

## 6.3.0 Data Dependencies

- Access to the final versions of the 'Terms of Service' and 'Privacy Policy' documents to be linked from the UI.

## 6.4.0 External Dependencies

- Availability and correct configuration of the Azure AD B2C service.
- Availability and reliability of the Azure Communication Services for message delivery.

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The registration form page should load in under 2 seconds.
- The server-side validation and response after form submission should be under 500ms (P95).

## 7.2.0 Security

- All communication must be over HTTPS (TLS 1.2+).
- Passwords must be securely hashed and salted by Azure AD B2C before storage.
- The registration endpoint must be protected against brute-force attacks and credential stuffing (e.g., via rate limiting, CAPTCHA after several attempts from the same IP).

## 7.3.0 Usability

- The registration process should be simple, intuitive, and require minimal steps.
- Error messages must be clear, concise, and helpful.

## 7.4.0 Accessibility

- The registration form must comply with WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- The web form must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- The mobile form must function correctly on supported iOS (14+) and Android (8.0+) versions.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Configuration and customization of Azure AD B2C user flows can be complex and requires specialized knowledge.
- Integrating the frontend applications (React Native, Next.js) with the AAD B2C redirect-based authentication flow.
- Setting up and testing the email and SMS delivery pipelines via Azure Communication Services.

## 8.3.0 Technical Risks

- Misconfiguration of AAD B2C policies could lead to security vulnerabilities.
- Potential for email/SMS delivery delays or failures impacting the user experience.
- Handling the different states (e.g., pending verification) of a user account correctly across the system.

## 8.4.0 Integration Points

- Azure Active Directory B2C for identity management.
- Azure Communication Services for email and SMS.
- Backend user management service.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0 Test Scenarios

- All scenarios outlined in the Acceptance Criteria.
- Test the end-to-end flow for both email and phone registration.
- Test password field security (e.g., input not visible in plain text, copy/paste is disabled).
- Verify that clicking the T&C and Privacy Policy links opens the correct documents.

## 9.3.0 Test Data Needs

- A set of new, unused email addresses.
- A set of new, unused phone numbers for SMS testing.
- A list of pre-registered email addresses and phone numbers to test the 'already exists' error condition.

## 9.4.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress for E2E testing.
- A mail-trapping service (like MailHog or a dedicated test inbox) to verify email content and delivery without spamming real accounts.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% code coverage for new logic
- E2E tests for both email and phone registration happy paths are automated and passing
- Azure AD B2C user flow is configured and tested in all environments (Dev, Staging)
- User interface reviewed and approved by UX/UI designer
- Security scan performed on the registration endpoint
- Accessibility audit (automated and manual) passed for the registration screen
- Documentation for the AAD B2C configuration is created or updated
- Story deployed and verified in the staging environment by a QA engineer

# 11.0.0 Planning Information

## 11.1.0 Story Points

8

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a foundational story and a blocker for almost all other user-centric stories (e.g., Login, Product Registration). It should be prioritized in an early sprint.
- Requires coordination between frontend, backend, and cloud infrastructure (DevOps) teams to configure AAD B2C.

## 11.4.0 Release Impact

- This feature is critical for the Minimum Viable Product (MVP) and any public release.

