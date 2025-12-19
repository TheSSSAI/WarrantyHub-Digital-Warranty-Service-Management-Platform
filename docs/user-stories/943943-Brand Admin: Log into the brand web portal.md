# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-085 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Brand Admin: Log into the brand web portal |
| As A User Story | As a Brand Admin, I want to securely log into the ... |
| User Persona | Brand Admin: A business user responsible for manag... |
| Business Value | Enables authorized brand representatives to access... |
| Functional Area | User Authentication & Access Control |
| Story Theme | Brand Portal Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful login with valid credentials and OTP

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A registered Brand Admin with an active account is on the brand portal login page

### 3.1.5 When

The admin enters their correct email and password and submits the form

### 3.1.6 Then

The system prompts the admin to enter a One-Time Password (OTP) sent to their registered device (email/SMS).

### 3.1.7 Validation Notes

Verify the user is presented with an OTP entry screen.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successful authentication and redirection

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Brand Admin has successfully submitted their credentials and is on the OTP entry screen

### 3.2.5 When

The admin enters the correct, non-expired OTP and submits it

### 3.2.6 Then

The admin is successfully authenticated, a secure session is created, and they are redirected to the Brand Dashboard.

### 3.2.7 Validation Notes

Verify the final URL is the brand dashboard and the page displays correctly. Check for a valid JWT in browser storage.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Login attempt with invalid password

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A user is on the brand portal login page

### 3.3.5 When

The user enters a valid email but an incorrect password and submits the form

### 3.3.6 Then

A non-specific error message like 'Invalid email or password' is displayed, and the user remains on the login page.

### 3.3.7 Validation Notes

The error message must not indicate whether the email or the password was incorrect. The password field should be cleared.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Login attempt with unregistered email

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A user is on the brand portal login page

### 3.4.5 When

The user enters an email address that is not registered as a Brand Admin and submits the form

### 3.4.6 Then

The same non-specific error message 'Invalid email or password' is displayed to prevent user enumeration.

### 3.4.7 Validation Notes

Verify the system response is identical to the invalid password scenario.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Login attempt with empty fields

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A user is on the brand portal login page

### 3.5.5 When

The user attempts to submit the form with the email or password field empty

### 3.5.6 Then

Client-side validation prevents form submission and displays an inline error message like 'Email is required' or 'Password is required'.

### 3.5.7 Validation Notes

Test with email empty, password empty, and both empty. No API call should be made.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Account lockout after multiple failed attempts

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A Brand Admin has made the maximum number of consecutive failed login attempts (e.g., 5)

### 3.6.5 When

The admin makes one more failed login attempt

### 3.6.6 Then

The system displays a message indicating the account is temporarily locked and prevents further login attempts for a configured duration (e.g., 15 minutes).

### 3.6.7 Validation Notes

This policy should be configured in Azure AD B2C. Test that login is blocked and then re-enabled after the lockout period.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Login attempt with incorrect OTP

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

A Brand Admin has submitted valid credentials and is on the OTP entry screen

### 3.7.5 When

The admin enters an incorrect OTP

### 3.7.6 Then

An error message 'The code you entered is incorrect. Please try again.' is displayed, and the user can re-enter the code.

### 3.7.7 Validation Notes

Verify the user is not logged in and remains on the OTP screen.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Email address input field
- Password input field (with show/hide toggle)
- Primary 'Login' button
- A 'Forgot Password?' link
- OTP input field on a separate screen/step
- A 'Resend Code' button on the OTP screen

## 4.2.0 User Interactions

- On form submission failure, error messages are displayed clearly and associated with the relevant fields.
- The 'Login' button should be disabled until both email and password fields are filled.
- The 'Forgot Password?' link navigates the user to the password reset flow.

## 4.3.0 Display Requirements

- The login page must display the platform's logo and branding.
- Error messages must be user-friendly and avoid technical jargon.

## 4.4.0 Accessibility Needs

- All form inputs must have corresponding `<label>` tags.
- The page must be fully navigable using a keyboard.
- Focus order must be logical.
- Error messages must be programmatically associated with their inputs for screen readers (e.g., using `aria-describedby`).
- Color contrast must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-AUTH-01

### 5.1.2 Rule Description

Multi-factor authentication (MFA) via OTP is mandatory for all Brand Admin accounts.

### 5.1.3 Enforcement Point

During the login process, after successful primary credential validation.

### 5.1.4 Violation Handling

Access is denied. The user cannot proceed to the portal without completing the MFA step.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-AUTH-02

### 5.2.2 Rule Description

An account will be temporarily locked after 5 consecutive failed login attempts.

### 5.2.3 Enforcement Point

At the identity provider (Azure AD B2C) level during authentication attempts.

### 5.2.4 Violation Handling

The account is locked for 15 minutes. The user is notified of the lockout.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-004

#### 6.1.1.2 Dependency Reason

A brand must be approved and have an associated admin account created by the Super Admin before the Brand Admin can log in.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-086

#### 6.1.2.2 Dependency Reason

The Brand Dashboard must exist as a destination for the user to be redirected to upon successful login.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory (AD) B2C must be configured with a sign-in user flow for the Brand Admin role.
- Azure Communication Services must be configured to send OTPs via SMS and/or email.
- The frontend application must be integrated with an authentication library (e.g., MSAL.js) to handle the B2C redirect flow.
- Backend APIs must be configured to validate JWTs issued by Azure AD B2C.

## 6.3.0.0 Data Dependencies

- A test Brand Admin user account must exist in Azure AD B2C for development and testing.

## 6.4.0.0 External Dependencies

- Availability of the Microsoft Azure AD B2C service.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The 95th percentile (P95) latency for the initial credential validation API call shall be below 250ms.
- The brand portal login page shall achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- All communication must be encrypted using HTTPS/TLS 1.3.
- User passwords must not be stored in plaintext; all credential management is handled by Azure AD B2C.
- The system must implement rate limiting on the login endpoint to mitigate brute-force attacks.
- The JWT access token issued upon login must be short-lived (e.g., 1 hour) and validated on every API request.
- Strict input validation must be performed on all fields to prevent XSS and other injection attacks.

## 7.3.0.0 Usability

- The login process should be intuitive and require minimal user effort.
- Error messages should be clear, concise, and helpful.

## 7.4.0.0 Accessibility

- The login page and flow must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The brand web portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Configuration of Azure AD B2C custom policies and user flows.
- Integration of the frontend with the MSAL library, including handling of tokens and redirects.
- Securing backend APIs to validate B2C-issued tokens.
- Coordinating the OTP delivery mechanism via Azure Communication Services.

## 8.3.0.0 Technical Risks

- Misconfiguration of B2C policies could lead to security vulnerabilities or a broken login flow.
- Complexity in managing token refresh and session state on the client-side.

## 8.4.0.0 Integration Points

- Client (Next.js) -> Azure AD B2C
- Azure AD B2C -> Azure Communication Services (for OTP)
- Client (Next.js) -> Backend APIs (NestJS) using JWT
- Backend APIs (NestJS) -> Azure API Management (for token validation)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Successful login and redirection.
- Login with incorrect password.
- Login with incorrect email.
- Account lockout after N failed attempts.
- Successful login with correct OTP.
- Login attempt with incorrect OTP.
- Keyboard-only navigation and form submission.
- Screen reader compatibility check.

## 9.3.0.0 Test Data Needs

- An active Brand Admin account.
- A deactivated Brand Admin account.
- Credentials for an account that does not exist.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- Axe-core (Accessibility)
- OWASP ZAP or similar for security scanning.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and achieve >80% code coverage.
- End-to-end automated tests for the login flow are created and passing.
- Security checks, including verification of rate limiting and lockout policies, are complete.
- Accessibility audit (WCAG 2.1 AA) has been performed and any issues resolved.
- The feature is documented in the technical and user guides.
- The story has been successfully deployed and verified in the staging environment by QA.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the Brand Admin persona and blocks almost all other brand-related stories.
- Requires a developer with experience in Azure AD B2C configuration or allocates time for learning.
- Azure AD B2C and Communication Services must be provisioned and accessible to the development team before starting.

## 11.4.0.0 Release Impact

Critical for the launch of the Brand Portal. The entire feature set for brands is inaccessible without this story.

