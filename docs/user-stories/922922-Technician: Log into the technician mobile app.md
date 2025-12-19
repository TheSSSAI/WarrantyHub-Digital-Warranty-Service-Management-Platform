# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-075 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: Log into the technician mobile app |
| As A User Story | As a Technician, I want to securely log into the m... |
| User Persona | Technician: A field service professional who uses ... |
| Business Value | Enables secure access to the technician's core wor... |
| Functional Area | Authentication & User Access |
| Story Theme | Technician Mobile Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful login on the first attempt

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a registered Technician with an active account is on the mobile app's login screen

### 3.1.5 When

they enter their correct email and password, tap 'Login', and then enter the correct OTP received via SMS

### 3.1.6 Then

the system authenticates them successfully and navigates them to the 'Assigned Jobs' screen (US-076).

### 3.1.7 Validation Notes

Verify redirection to the correct screen and that a valid JWT is stored securely on the device.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Login attempt with an incorrect password

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

a Technician is on the login screen

### 3.2.5 When

they enter their correct email but an incorrect password and tap 'Login'

### 3.2.6 Then

the app displays a non-specific error message 'Invalid email or password' and the password field is cleared. The user is not advanced to the OTP screen.

### 3.2.7 Validation Notes

Ensure the error message does not confirm whether the email exists to prevent user enumeration.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Login attempt with a non-existent email

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

a user is on the login screen

### 3.3.5 When

they enter an email address that is not registered for a Technician account and tap 'Login'

### 3.3.6 Then

the app displays the same non-specific error message 'Invalid email or password'.

### 3.3.7 Validation Notes

This is a security measure to prevent attackers from discovering valid usernames.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Login attempt with a deactivated account

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a Technician's account has been deactivated by a Service Center Admin (US-071)

### 3.4.5 When

the Technician attempts to log in with their previously correct credentials

### 3.4.6 Then

the app displays an informative error message: 'Your account has been deactivated. Please contact your administrator.'

### 3.4.7 Validation Notes

Test by deactivating a user in the admin panel and then attempting to log in with that user's credentials.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Account is temporarily locked after multiple failed attempts

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a Technician has made 5 consecutive failed login attempts

### 3.5.5 When

they make a 6th attempt within the lockout period (e.g., 15 minutes)

### 3.5.6 Then

the app displays a message: 'Your account is temporarily locked. Please try again in 15 minutes or reset your password.' and prevents the login API call.

### 3.5.7 Validation Notes

Verify the rate-limiting and account locking policy is correctly implemented at the identity provider level (Azure AD B2C).

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Login attempt with an invalid OTP

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a Technician has entered correct credentials and is on the OTP entry screen

### 3.6.5 When

they enter an incorrect OTP and tap 'Verify'

### 3.6.6 Then

the app displays an error message 'Invalid or expired OTP. Please try again.' and the OTP field is cleared.

### 3.6.7 Validation Notes

The user should remain on the OTP screen with a limited number of retries before being sent back to the login screen.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Login attempt without network connectivity

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

the Technician's mobile device is not connected to the internet

### 3.7.5 When

they attempt to submit their credentials

### 3.7.6 Then

the app displays a clear, user-friendly message, such as 'No internet connection. Please check your connection and try again.'

### 3.7.7 Validation Notes

Test by enabling airplane mode on the device before attempting to log in.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

User requests to resend OTP

### 3.8.3 Scenario Type

Alternative_Flow

### 3.8.4 Given

a Technician is on the OTP entry screen and has not received the code

### 3.8.5 When

they tap the 'Resend OTP' link after a 60-second cooldown period

### 3.8.6 Then

the system sends a new OTP to their registered mobile number and the cooldown timer resets.

### 3.8.7 Validation Notes

Verify the 'Resend OTP' link is disabled during the cooldown period to prevent spam.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Email address input field
- Password input field with a toggle for visibility
- Primary 'Login' button
- A 'Forgot Password?' text link
- OTP input field (on a separate screen)
- Primary 'Verify' button for OTP
- 'Resend OTP' text link with a cooldown timer display

## 4.2.0 User Interactions

- Input fields should have clear labels and placeholder text.
- The 'Login' button should be disabled until both email and password fields are non-empty.
- Tapping 'Forgot Password?' navigates to the password reset flow.
- Error messages should appear inline or in a dismissible banner.
- The keyboard type should be appropriate for each field (e.g., email, number pad for OTP).

## 4.3.0 Display Requirements

- The OTP screen must display a partially masked phone number (e.g., 'An OTP has been sent to ***-***-1234') to confirm the destination.
- Loading indicators must be shown during API calls to provide feedback.

## 4.4.0 Accessibility Needs

- All input fields must have associated labels for screen readers (WCAG 2.1 AA).
- All buttons and links must have clear, descriptive text.
- Sufficient color contrast must be used for all text and UI elements.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-AUTH-001

### 5.1.2 Rule Description

A user's account shall be temporarily locked for 15 minutes after 5 consecutive failed login attempts.

### 5.1.3 Enforcement Point

Identity Provider (Azure AD B2C)

### 5.1.4 Violation Handling

The identity provider will refuse authentication attempts for the locked account until the lockout period expires.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-AUTH-002

### 5.2.2 Rule Description

A One-Time Password (OTP) is valid for 5 minutes.

### 5.2.3 Enforcement Point

Backend Authentication Service / Identity Provider

### 5.2.4 Violation Handling

The system will reject any OTP submitted after its expiration time.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-069

#### 6.1.1.2 Dependency Reason

A technician account must be created by a Service Center Admin before the technician can log in.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-076

#### 6.1.2.2 Dependency Reason

A destination screen (the assigned jobs list) must exist to navigate to after a successful login.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C tenant with custom policies for Technician login and MFA.
- Azure Communication Services configured for sending SMS OTPs.
- Backend Authentication microservice to handle token issuance and validation.
- React Native library/SDK for Azure AD B2C integration.

## 6.3.0.0 Data Dependencies

- Availability of technician user records in the identity provider, including registered phone numbers for OTP.

## 6.4.0.0 External Dependencies

- Operational status of Azure AD B2C and Azure Communication Services.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The P95 latency for the login API call (credentials + OTP validation) should be under 500ms.

## 7.2.0.0 Security

- All communication with the backend must be over HTTPS (TLS 1.3).
- Access tokens (JWT) must be stored securely on the device using platform-specific secure storage (e.g., iOS Keychain, Android Keystore).
- Refresh tokens must be used to manage sessions and must also be stored securely.
- The app must not log sensitive information like passwords or tokens in plain text.

## 7.3.0.0 Usability

- The login process should be simple and intuitive, requiring minimal steps.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The mobile application must support iOS 14.0+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration with a third-party identity provider (Azure AD B2C) in a mobile (React Native) environment.
- Secure management and storage of authentication tokens (access and refresh).
- Implementing a seamless user experience that combines a native UI with the B2C authentication flow.
- Coordination between frontend, backend, and DevOps for B2C policy configuration.

## 8.3.0.0 Technical Risks

- Potential compatibility issues or limitations with the React Native library for Azure AD B2C.
- Configuration complexity of Azure AD B2C custom policies for MFA and account lockout.
- Ensuring the token refresh logic is robust and handles edge cases like network loss.

## 8.4.0.0 Integration Points

- Azure Active Directory B2C for identity management.
- Backend Authentication Service for token exchange.
- Azure Communication Services for SMS delivery.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Successful login and redirection.
- Login with invalid credentials (password, email).
- Login with a deactivated account.
- Account lockout after multiple failures.
- OTP validation (correct, incorrect, expired).
- Forgot password flow initiation.
- Login attempt with no network.

## 9.3.0.0 Test Data Needs

- Test accounts for active technicians.
- Test accounts for deactivated technicians.
- A valid mobile number in the test environment to receive OTPs.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Supertest for backend API tests.
- Playwright or a similar framework for E2E testing on emulators/real devices.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and achieve >80% coverage for new code.
- E2E tests for the login flow are implemented and passing.
- Security review completed, including checks for secure token storage.
- UI/UX has been reviewed and approved by the product owner.
- All accessibility requirements have been met and verified.
- Relevant documentation (e.g., B2C integration notes) has been created or updated.
- Story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a blocker for all other technician-facing features in the mobile app.
- Requires prior or parallel setup of the Azure AD B2C tenant and custom policies by the DevOps/Cloud engineering team.

## 11.4.0.0 Release Impact

This is a foundational feature for the initial release of the Technician mobile application. The app cannot be released without it.

