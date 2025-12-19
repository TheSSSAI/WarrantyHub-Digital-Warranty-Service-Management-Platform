# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-081 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Logs In Using Multi-Factor Authentication (MF... |
| As A User Story | As a registered platform user, I want to complete ... |
| User Persona | Any registered platform user (Consumer, Technician... |
| Business Value | Enhances account security across the platform, red... |
| Functional Area | User Authentication & Security |
| Story Theme | Identity and Access Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful login with valid credentials and a valid OTP

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user with an active account and MFA enabled is on the login page

### 3.1.5 When

The user enters their correct username and password and submits the form

### 3.1.6 Then

The system validates the primary credentials and redirects the user to a dedicated OTP entry screen, and an OTP is sent to the user's registered mobile number via SMS.

### 3.1.7 Validation Notes

Verify redirection and that the SMS is triggered via Azure Communication Services logs.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successful OTP validation

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user is on the OTP entry screen after successful primary authentication

### 3.2.5 When

The user enters the correct, non-expired OTP and submits

### 3.2.6 Then

The system validates the OTP, logs the user in, issues a valid JWT, and redirects them to their designated dashboard.

### 3.2.7 Validation Notes

Check for successful redirection and the presence of a valid JWT in the client's storage.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Login attempt with an incorrect OTP

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The user is on the OTP entry screen

### 3.3.5 When

The user enters an incorrect OTP

### 3.3.6 Then

The system displays an inline error message, such as 'Invalid code. Please try again.', and the user remains on the OTP entry screen.

### 3.3.7 Validation Notes

Verify the error message is displayed and the user is not logged in.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Login attempt with an expired OTP

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The user is on the OTP entry screen and the OTP's validity period (e.g., 5 minutes) has passed

### 3.4.5 When

The user enters the correct but expired OTP

### 3.4.6 Then

The system displays an error message, such as 'Your code has expired. Please request a new one.', and the user remains on the OTP entry screen.

### 3.4.7 Validation Notes

This requires the ability to manipulate time in tests or wait for the expiry period.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Account lockout after multiple failed OTP attempts

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The user is on the OTP entry screen and has made 4 consecutive failed attempts

### 3.5.5 When

The user enters an incorrect OTP for the 5th time

### 3.5.6 Then

The system invalidates the login session, redirects the user back to the initial login page, and displays a message like 'Too many failed attempts. Your account is temporarily locked. Please try again in 15 minutes.'

### 3.5.7 Validation Notes

Verify the user is redirected and cannot initiate a new login for the specified lockout duration. This aligns with SRS 5.3.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User requests to resend the OTP

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

The user is on the OTP entry screen

### 3.6.5 When

The user clicks the 'Resend Code' link after the initial cooldown period (e.g., 60 seconds)

### 3.6.6 Then

The system invalidates the previous OTP, generates and sends a new OTP to the user's mobile number, and the cooldown timer on the 'Resend Code' link resets.

### 3.6.7 Validation Notes

Verify a new SMS is sent and the old OTP is no longer valid.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

User attempts to resend OTP during cooldown period

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

The user is on the OTP entry screen and the 'Resend Code' link is on cooldown

### 3.7.5 When

The user attempts to click the disabled 'Resend Code' link

### 3.7.6 Then

The action is blocked, and a visual indicator (e.g., a countdown timer) shows the remaining time until it can be used again.

### 3.7.7 Validation Notes

Verify the link/button is in a disabled state and the timer is visible and accurate.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated screen/page for OTP entry.
- A numeric input field for the 6-digit OTP (can be 6 individual boxes or a single input).
- A 'Submit' or 'Verify' button.
- A 'Resend Code' link/button.
- A countdown timer next to the 'Resend Code' link during its cooldown period.

## 4.2.0 User Interactions

- After entering the password, the user is automatically taken to the OTP screen.
- The OTP input field should auto-focus upon page load.
- The 'Resend Code' link is initially disabled for 60 seconds.
- Error messages are displayed inline, near the input field.

## 4.3.0 Display Requirements

- Instructional text like 'Enter the 6-digit code sent to your mobile number ending in XXXX'.
- Clear, user-friendly error messages for invalid, expired, or failed attempts.

## 4.4.0 Accessibility Needs

- The OTP input fields must be keyboard-navigable and have proper labels for screen readers.
- Error messages must be associated with the input field using `aria-describedby`.
- All UI elements must meet WCAG 2.1 Level AA contrast and usability standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

An OTP is valid for a single use only and expires 5 minutes after generation.

### 5.1.3 Enforcement Point

Server-side during OTP validation.

### 5.1.4 Violation Handling

The validation fails, and an appropriate error message is returned to the user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A user's account is temporarily locked for 15 minutes after 5 consecutive failed login attempts (at either the password or OTP stage).

### 5.2.3 Enforcement Point

Identity Provider (Azure AD B2C) policy.

### 5.2.4 Violation Handling

The user is prevented from attempting to log in and is shown a lockout message.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

A new OTP cannot be requested for 60 seconds after the previous one was sent.

### 5.3.3 Enforcement Point

Both client-side (disabling the button) and server-side (rate-limiting the resend endpoint).

### 5.3.4 Violation Handling

The UI button is disabled. Any direct API call within the cooldown period is rejected with a '429 Too Many Requests' error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-080

#### 6.1.1.2 Dependency Reason

The user must have already set up and enabled MFA on their account for this login flow to be triggered.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-096

#### 6.1.2.2 Dependency Reason

This story extends the basic login functionality. The primary username/password authentication must be functional first.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C: Must be configured with a custom policy for the MFA journey.
- Azure Communication Services: Must be integrated for sending OTPs via SMS.
- Azure Cache for Redis: Required for temporary storage of OTPs with a Time-To-Live (TTL).

## 6.3.0.0 Data Dependencies

- User profile must contain a verified mobile phone number designated for MFA.

## 6.4.0.0 External Dependencies

- Reliability of the Azure Communication Services SMS delivery.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 latency for the OTP validation API endpoint must be below 250ms.
- SMS containing the OTP must be delivered to the user within 10 seconds of the primary login success.

## 7.2.0.0 Security

- OTPs must be generated using a cryptographically secure pseudo-random number generator (CSPRNG).
- The OTP validation endpoint must be protected against brute-force attacks via strict rate limiting.
- The JWT issued upon successful login must be short-lived and follow security best practices.
- The full login flow must occur over HTTPS (TLS 1.2+).

## 7.3.0.0 Usability

- The process should be intuitive, with clear instructions at each step.
- The UI should be responsive and work seamlessly on both web and mobile devices.

## 7.4.0.0 Accessibility

- The entire login flow must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Web: Latest stable versions of Chrome, Firefox, Safari, Edge.
- Mobile: iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Configuration of Azure AD B2C custom policies for the conditional MFA flow.
- Secure server-side implementation of OTP generation, storage (in Redis), and validation logic.
- Frontend state management for a multi-step authentication process.
- Implementing robust error handling and attempt tracking.

## 8.3.0.0 Technical Risks

- Complexity and potential learning curve associated with Azure AD B2C custom policies.
- Latency or reliability issues with the third-party SMS gateway (Azure Communication Services).

## 8.4.0.0 Integration Points

- Azure AD B2C for identity management.
- Custom authentication microservice for OTP logic.
- Azure Communication Services for SMS delivery.
- Azure Cache for Redis for OTP storage.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Successful login flow.
- Login with invalid/expired OTP.
- Triggering and verifying the account lockout mechanism.
- Testing the 'Resend Code' functionality, including the cooldown period.
- Verifying session invalidation if the user abandons the flow at the OTP step.

## 9.3.0.0 Test Data Needs

- Test user accounts with MFA enabled.
- Test user accounts with MFA disabled (to ensure they are not prompted).
- A mechanism in the test environment to retrieve the generated OTP for automated E2E tests (e.g., a test-only API endpoint or logging).

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest for backend unit tests.
- Cypress for E2E testing.
- OWASP ZAP or similar tools for security scanning.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic meets the 80% project standard.
- Automated E2E tests for the happy path and key error conditions are implemented and passing.
- Azure AD B2C custom policy is deployed and verified.
- Security review of the MFA flow has been completed and any findings addressed.
- UI is responsive and meets WCAG 2.1 AA accessibility standards.
- Relevant technical documentation (e.g., on the AAD B2C configuration) has been created or updated.
- Story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-080 (MFA Setup).
- Requires a developer with permissions and expertise in Azure AD B2C custom policies.
- Coordination between frontend and backend developers is crucial for the multi-step flow.

## 11.4.0.0 Release Impact

This is a critical security feature required for the public launch. It impacts all authenticated user roles.

