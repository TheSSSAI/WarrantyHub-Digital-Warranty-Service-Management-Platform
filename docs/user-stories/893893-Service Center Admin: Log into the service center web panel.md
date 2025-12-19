# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-060 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Log into the service center ... |
| As A User Story | As a Service Center Admin, I want to securely log ... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Enables secure, role-based access to the service c... |
| Functional Area | User Authentication & Access Control |
| Story Theme | Service Center Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful login with valid credentials and OTP

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a registered Service Center Admin with an active account exists and they are on the service center login page

### 3.1.5 When

the admin enters their correct email and password and submits the form, and then enters the correct OTP sent to their registered device

### 3.1.6 Then

the system must authenticate the user, issue a secure session token (JWT), and redirect them to the Service Center Admin dashboard.

### 3.1.7 Validation Notes

Verify redirection to the correct dashboard URL. Inspect browser storage/cookies for a valid JWT. The dashboard should load user-specific data.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Login attempt with invalid password

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

a user is on the service center login page

### 3.2.5 When

they enter a valid email but an incorrect password

### 3.2.6 Then

the system must display a clear, non-specific error message (e.g., 'Invalid email or password.') and must not indicate which field was incorrect. The user must remain on the login page.

### 3.2.7 Validation Notes

Check that the error message appears and that no account information is leaked. The login attempt should be logged for security monitoring.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Login attempt with an unregistered email address

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

a user is on the service center login page

### 3.3.5 When

they enter an email address that is not registered for a Service Center Admin account

### 3.3.6 Then

the system must display the same generic error message ('Invalid email or password.') to prevent email enumeration attacks.

### 3.3.7 Validation Notes

Verify that the response time and message are identical to the invalid password scenario.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Login attempt with an incorrect OTP

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a Service Center Admin has successfully entered their primary credentials and is on the OTP entry screen

### 3.4.5 When

the admin enters an incorrect or expired OTP

### 3.4.6 Then

the system must display an error message (e.g., 'The one-time password you entered is incorrect. Please try again.') and allow the user to re-enter the OTP.

### 3.4.7 Validation Notes

The user should not be logged in and should remain on the OTP screen. A new OTP might need to be requested after a few failed attempts.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Account lockout after multiple failed attempts

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a valid Service Center Admin account exists

### 3.5.5 When

a user makes more than the configured number of failed login attempts (e.g., 5) with the correct email

### 3.5.6 Then

the system must temporarily lock the account for a configured duration (e.g., 15 minutes) and display a message indicating the account is locked.

### 3.5.7 Validation Notes

Test that subsequent login attempts during the lockout period fail immediately with the 'account locked' message. Verify the account is automatically unlocked after the duration expires.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to access a protected page without authentication

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

a user is not logged in

### 3.6.5 When

the user attempts to directly navigate to a protected URL within the service center panel (e.g., '/dashboard')

### 3.6.6 Then

the system must automatically redirect the user to the login page.

### 3.6.7 Validation Notes

Verify the browser URL changes to the login page URL. After successful login, the user should be redirected to the originally requested protected page.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Login with a deactivated or pending account

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a Service Center Admin's account has been created but is either pending approval or has been deactivated

### 3.7.5 When

the admin attempts to log in with their correct credentials

### 3.7.6 Then

the system must prevent login and display an appropriate message (e.g., 'Your account is not active. Please contact support.').

### 3.7.7 Validation Notes

This check should happen after successful credential validation with the identity provider but before a session is created in our system.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Email address input field
- Password input field
- "Log In" submit button
- "Forgot Password?" link
- OTP input field on a subsequent screen
- Error message display area

## 4.2.0 User Interactions

- Password input must be masked (e.g., using `type='password'`).
- The login form must be submittable by pressing the Enter key in the password field.
- Clear visual feedback (e.g., a spinner) must be shown while the login request is processing.
- Error messages should appear close to the input fields or in a prominent, accessible location.

## 4.3.0 Display Requirements

- The login page must display the platform's logo and branding.
- The page must be fully responsive, adapting to desktop, tablet, and mobile viewport sizes.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags.
- The entire login flow must be navigable using only a keyboard.
- Error messages must be associated with their respective fields using `aria-describedby` for screen reader users.
- Color contrast must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-AUTH-01

### 5.1.2 Rule Description

All Service Center Admin users must use Multi-Factor Authentication (MFA) via OTP.

### 5.1.3 Enforcement Point

During the login process, after primary credential validation.

### 5.1.4 Violation Handling

Access is denied. The user cannot proceed to the application without completing the OTP step.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-AUTH-02

### 5.2.2 Rule Description

An account will be temporarily locked for 15 minutes after 5 consecutive failed login attempts.

### 5.2.3 Enforcement Point

At the identity provider level (Azure AD B2C).

### 5.2.4 Violation Handling

The account is locked, and subsequent login attempts are blocked until the lockout period expires.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-010

#### 6.1.1.2 Dependency Reason

A Service Center must be approved by a Super Admin before its admin account can be activated and used for login.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-071

#### 6.1.2.2 Dependency Reason

The ability to deactivate a technician implies an admin account exists. This story provides the login for that admin.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C must be configured with a User Flow or Custom Policy for Service Center Admin sign-in, including MFA.
- Azure Communication Services must be configured to send OTPs via SMS or email.
- The frontend web application (Next.js) must be set up with the MSAL (Microsoft Authentication Library) or equivalent for integrating with Azure AD B2C.
- The backend API Gateway (Azure API Management) must be configured to validate JWTs issued by Azure AD B2C.

## 6.3.0.0 Data Dependencies

- A data store (managed by Azure AD B2C) must exist for user credentials.
- The application's primary database must contain a table linking B2C user object IDs to the Service Center Admin role and their associated service center.

## 6.4.0.0 External Dependencies

- Availability of the Microsoft Azure AD B2C service.
- Availability of Azure Communication Services for OTP delivery.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The P95 latency for the authentication API call (token validation) must be below 250ms.
- The login page must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- All communication must be over HTTPS (TLS 1.3).
- JWTs must be short-lived and stored securely on the client (e.g., in memory or secure, HttpOnly cookies).
- The system must implement rate limiting on the login endpoint to mitigate brute-force attacks.
- The login flow must be protected against CSRF attacks if using cookie-based sessions.

## 7.3.0.0 Usability

- The login process should be simple and intuitive, with clear instructions and error messages.

## 7.4.0.0 Accessibility

- The login page and flow must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The web panel must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration with a third-party identity provider (Azure AD B2C) requires specific configuration and SDK usage.
- Setting up custom policies in B2C for MFA, account lockout, and UI branding can be complex.
- Ensuring secure handling of tokens on both the client and server side.
- Coordinating the user record in B2C with the user profile and role in the application's own database.

## 8.3.0.0 Technical Risks

- Misconfiguration of B2C policies could lead to security vulnerabilities.
- Latency or downtime of the external Azure AD B2C service could prevent all users from logging in.
- Challenges in customizing the B2C-hosted UI to perfectly match the application's branding.

## 8.4.0.0 Integration Points

- Frontend (Next.js) -> Azure AD B2C (for user authentication flow).
- Backend (NestJS) -> Azure AD B2C (for token validation using public keys).
- Azure AD B2C -> Azure Communication Services (for sending OTPs).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Successful login and redirection.
- Login with incorrect password/email.
- Login with incorrect/expired OTP.
- Account lockout after N failed attempts.
- Accessing a protected route while unauthenticated.
- Keyboard-only navigation and form submission.
- Screen reader validation of form labels and error messages.

## 9.3.0.0 Test Data Needs

- An active Service Center Admin test account.
- A test account with a known incorrect password.
- A deactivated Service Center Admin test account.
- A test account that can be used to trigger the account lockout policy.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit tests.
- Playwright for E2E testing of the full login flow.
- A security scanning tool (e.g., OWASP ZAP) to check for common vulnerabilities.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests are written and achieve >80% code coverage for new code.
- E2E tests for the login flow are implemented and passing.
- The feature is successfully integrated with Azure AD B2C.
- Security review has been completed and any findings addressed.
- Accessibility audit (automated and manual) has been performed and passed.
- The feature is documented in the technical documentation.
- The story has been deployed and verified in the staging environment by QA.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story and a blocker for all other Service Center Admin features.
- Requires upfront configuration work in Azure AD B2C which should be started early in the sprint.
- Close collaboration between frontend and backend developers is required to handle the token exchange and validation correctly.

## 11.4.0.0 Release Impact

This feature is critical for the initial release of the Service Center Admin portal. The portal cannot be launched without it.

