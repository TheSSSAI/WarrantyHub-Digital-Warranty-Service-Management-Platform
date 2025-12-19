# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-096 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Logs into the Platform |
| As A User Story | As a registered User, I want to securely log into ... |
| User Persona | Any registered user of the platform (Consumer, Tec... |
| Business Value | Provides secure, authenticated access to user-spec... |
| Functional Area | User Authentication & Access Control |
| Story Theme | Identity and Access Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful login with valid credentials and OTP

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A registered user with MFA enabled is on the login page

### 3.1.5 When

The user enters their correct email and password and submits the form

### 3.1.6 Then

The system validates the credentials and presents an OTP entry screen, having sent an OTP to the user's registered device. When the user enters the correct OTP within its validity period and submits, they are redirected to their role-specific dashboard and a secure session is established.

### 3.1.7 Validation Notes

Verify redirection to the correct dashboard (e.g., Consumer dashboard). Check for the presence of a valid JWT in the session/local storage.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Login attempt with incorrect password

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A registered user is on the login page

### 3.2.5 When

The user enters their correct email but an incorrect password

### 3.2.6 Then

A non-specific error message, such as 'Invalid credentials. Please try again.', is displayed. The user is not redirected, and the password field is cleared.

### 3.2.7 Validation Notes

Ensure the error message does not reveal whether the email exists or not to prevent user enumeration attacks.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Login attempt with a non-existent email

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

An unregistered user is on the login page

### 3.3.5 When

The user enters an email address that is not registered in the system

### 3.3.6 Then

The same non-specific error message, 'Invalid credentials. Please try again.', is displayed.

### 3.3.7 Validation Notes

This is a security measure to prevent attackers from discovering valid usernames.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Login attempt with empty credentials

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A user is on the login page

### 3.4.5 When

The user attempts to submit the login form with one or both fields empty

### 3.4.6 Then

Client-side validation prevents form submission and displays inline error messages like 'Email is required' and 'Password is required' next to the respective fields.

### 3.4.7 Validation Notes

Verify that no API call is made if fields are empty.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Account is locked after multiple failed attempts

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A user has made 4 consecutive failed login attempts with the correct email and incorrect password

### 3.5.5 When

The user makes a 5th consecutive failed attempt

### 3.5.6 Then

The system displays a message indicating the account is temporarily locked (e.g., 'Your account has been locked due to too many failed login attempts. Please try again in 15 minutes.') and prevents further login attempts for that account for the configured duration.

### 3.5.7 Validation Notes

Verify that subsequent login attempts within the lockout period fail immediately with the lockout message.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Successful login attempt resets the failed attempt counter

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

A user has made 1 to 4 consecutive failed login attempts

### 3.6.5 When

The user successfully logs in on the next attempt

### 3.6.6 Then

The failed login attempt counter for that user account is reset to zero.

### 3.6.7 Validation Notes

After a successful login, log out and verify that it still takes 5 new failed attempts to trigger a lockout.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

User enters an incorrect or expired OTP

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

A user has entered valid credentials and is on the OTP entry screen

### 3.7.5 When

The user enters an incorrect or expired OTP

### 3.7.6 Then

An error message like 'Invalid or expired OTP. Please try again.' is displayed. The user remains on the OTP screen and can re-enter a code.

### 3.7.7 Validation Notes

The OTP entry field should be cleared. A 'Resend OTP' link should be available.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Input field for 'Email or Phone Number'
- Input field for 'Password' (with show/hide toggle)
- Primary 'Login' button
- Link for 'Forgot Password?'
- Link for 'Don't have an account? Sign Up'
- OTP entry screen with a 6-digit input field
- Display of OTP expiry countdown timer
- Link to 'Resend OTP'

## 4.2.0 User Interactions

- On form submission, button should enter a disabled/loading state.
- Inline validation messages should appear on blur or on submit for empty fields.
- Successful credential validation should transition the user to the OTP entry screen.

## 4.3.0 Display Requirements

- Clear error messages for invalid credentials, locked accounts, and invalid OTPs.
- The login form should be centered and clearly visible on both web and mobile views.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags.
- The form must be fully navigable and submittable using only a keyboard.
- Error messages must be associated with their respective fields using `aria-describedby`.
- Color contrast must meet WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-AUTH-001

### 5.1.2 Rule Description

An account shall be temporarily locked for 15 minutes after 5 consecutive failed login attempts.

### 5.1.3 Enforcement Point

Backend authentication service, before validating credentials.

### 5.1.4 Violation Handling

The login attempt is rejected with a specific 'account locked' error status, which the frontend translates into a user-friendly message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-AUTH-002

### 5.2.2 Rule Description

All authenticated sessions on web portals must expire after 15 minutes of inactivity.

### 5.2.3 Enforcement Point

Backend session management and frontend client logic.

### 5.2.4 Violation Handling

The user is automatically logged out and redirected to the login page with a message indicating the session has expired.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

A user must be able to register an account before they can log in.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-080

#### 6.1.2.2 Dependency Reason

The MFA setup flow must be complete for a user to be able to receive and use an OTP during login.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C: Must be configured with a user flow for combined sign-in and MFA.
- Azure Communication Services: Must be configured to send OTPs via SMS.
- Azure API Management: Must be configured to protect the login endpoint.

## 6.3.0.0 Data Dependencies

- A data store (Azure PostgreSQL) containing user profiles with hashed passwords and MFA configuration details.

## 6.4.0.0 External Dependencies

- Availability of Azure AD B2C and Azure Communication Services APIs.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 latency for the credential validation API call must be < 250ms.
- OTP delivery via SMS should occur within 15 seconds.

## 7.2.0.0 Security

- All communication must use HTTPS/TLS 1.2+.
- JWTs issued upon login must be short-lived (e.g., 15 minutes) and managed via a refresh token mechanism.
- The system must be protected against brute-force, credential stuffing, and user enumeration attacks.
- Passwords must be hashed and salted using a strong algorithm (e.g., Argon2, bcrypt).

## 7.3.0.0 Usability

- The login process should be simple and intuitive, with clear instructions and error messages.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Web: Latest stable versions of Chrome, Firefox, Safari, Edge.
- Mobile: iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Configuration and integration with Azure AD B2C user flows.
- Implementing the two-step authentication process (credentials then OTP).
- Securely managing JWTs and refresh tokens on client devices.
- Implementing the failed attempt tracking and account lockout logic, likely requiring a distributed cache like Redis.

## 8.3.0.0 Technical Risks

- Misconfiguration of Azure AD B2C policies could lead to security vulnerabilities.
- Latency in the external OTP delivery service could negatively impact user experience.

## 8.4.0.0 Integration Points

- Frontend (Web/Mobile) -> API Gateway -> Backend Authentication Service
- Backend Authentication Service -> Azure AD B2C
- Backend Authentication Service -> Azure Communication Services (for OTP)
- Backend Authentication Service -> Redis Cache (for lockout tracking)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Performance

## 9.2.0.0 Test Scenarios

- Verify successful login for each user role.
- Test all defined error conditions (invalid password, invalid email, invalid OTP).
- Verify account lockout and automatic unlock after the timeout period.
- Test the 'Resend OTP' functionality.
- Validate session timeout on the web portal.

## 9.3.0.0 Test Data Needs

- Test accounts for each user role (Consumer, Technician, etc.).
- An account that does not exist.
- An account that can be used to test the lockout mechanism.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Integration)
- Jest (Backend Unit)
- Cypress (E2E)
- Postman/Insomnia (API Integration)
- OWASP ZAP/Burp Suite (Security)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >= 80% code coverage
- E2E automated tests for the happy path and key error conditions are implemented and passing
- Security review of the authentication flow completed and findings addressed
- Performance testing shows API latency is within the defined NFRs
- UI/UX for login and OTP screens reviewed and approved
- All accessibility requirements have been met and verified
- Relevant documentation (API specs, configuration guides) is updated
- Story deployed and successfully verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story and a blocker for most other user-facing features.
- Requires coordination with DevOps/Cloud Engineering for Azure AD B2C setup.
- Should be prioritized in one of the earliest development sprints.

## 11.4.0.0 Release Impact

- Critical path for the initial pilot release (Phase 1). The application cannot launch without this functionality.

