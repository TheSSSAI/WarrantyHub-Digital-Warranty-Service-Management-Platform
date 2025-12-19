# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-018 |
| Elaboration Date | 2024-10-27 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Log into the application with multi-factor a... |
| As A User Story | As a registered user (Consumer, Technician, or Adm... |
| User Persona | Any registered user of the platform (Consumer, Tec... |
| Business Value | Enhances platform security, builds user trust, pro... |
| Functional Area | User Authentication & Security |
| Story Theme | User Identity and Access Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-018-01

### 3.1.2 Scenario

Successful login with valid credentials and OTP

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a registered user with a verified contact method for MFA and I am on the login page

### 3.1.5 When

I enter my correct email and password and submit the form

### 3.1.6 Then

I am successfully authenticated, a JWT is issued, and I am redirected to my role-specific dashboard.

### 3.1.7 And

I enter the correct OTP within its validity period (e.g., 5 minutes) and submit

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-018-02

### 3.2.2 Scenario

Login attempt with invalid credentials

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am on the login page

### 3.2.5 When

I enter an incorrect email or password and submit the form

### 3.2.6 Then

A user-friendly error message 'Invalid email or password' is displayed.

### 3.2.7 And

The password input field is cleared for security.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-018-03

### 3.3.2 Scenario

OTP verification with an incorrect OTP

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I have successfully authenticated with my credentials and am on the OTP verification screen

### 3.3.5 When

I enter an incorrect OTP and submit

### 3.3.6 Then

A user-friendly error message 'The OTP is incorrect. Please try again.' is displayed.

### 3.3.7 And

The OTP input field is cleared.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-018-04

### 3.4.2 Scenario

OTP verification with an expired OTP

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am on the OTP verification screen and the received OTP has expired

### 3.4.5 When

I enter the expired OTP and submit

### 3.4.6 Then

A user-friendly error message 'The OTP has expired. Please request a new one.' is displayed.

### 3.4.7 And

I remain on the OTP verification screen.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-018-05

### 3.5.2 Scenario

User requests to resend the OTP

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I am on the OTP verification screen

### 3.5.5 When

I click the 'Resend OTP' link/button

### 3.5.6 Then

A new OTP is generated and sent to my registered contact method.

### 3.5.7 And

The 'Resend OTP' link/button is temporarily disabled (e.g., for 60 seconds) to prevent abuse.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-018-06

### 3.6.2 Scenario

Account lockout after multiple failed attempts

### 3.6.3 Scenario Type

Security

### 3.6.4 Given

I am a user attempting to log in

### 3.6.5 When

I provide the wrong password more than 5 consecutive times OR the wrong OTP more than 3 consecutive times

### 3.6.6 Then

My account is temporarily locked for a configured duration (e.g., 15 minutes).

### 3.6.7 And

A clear message is displayed informing me about the temporary lockout and its duration.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Email/Username input field
- Password input field (masked)
- Login/Submit button
- Forgot Password link
- OTP input field
- Verify OTP button
- Resend OTP link/button

## 4.2.0 User Interactions

- User enters credentials and submits.
- User is presented with a second screen for OTP entry.
- User enters OTP and submits.
- Error messages are displayed inline, near the relevant field.
- The 'Resend OTP' link has a cooldown period after being clicked.

## 4.3.0 Display Requirements

- Clear instructions on both the login and OTP screens.
- Informative error messages for all failure scenarios.
- A timer or message indicating the cooldown period for the 'Resend OTP' action.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- All interactive elements must be keyboard accessible and have clear focus indicators.
- Error messages must be programmatically associated with their respective inputs for screen readers.
- Must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-AUTH-001

### 5.1.2 Rule Description

Multi-factor authentication is mandatory for all user roles.

### 5.1.3 Enforcement Point

During the login process, after successful primary credential validation.

### 5.1.4 Violation Handling

Access is denied. User cannot proceed without completing the MFA step.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-AUTH-002

### 5.2.2 Rule Description

An OTP is valid for 5 minutes.

### 5.2.3 Enforcement Point

At the time of OTP verification.

### 5.2.4 Violation Handling

Verification fails, and the user is prompted to request a new OTP.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-AUTH-003

### 5.3.2 Rule Description

A user's account is temporarily locked for 15 minutes after 5 failed password attempts or 3 failed OTP attempts.

### 5.3.3 Enforcement Point

After the final failed attempt in a sequence.

### 5.3.4 Violation Handling

The user is prevented from attempting to log in again until the lockout period expires.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-016', 'dependency_reason': 'A user account must be created via the registration process before a user can log in. The registration process captures the credentials and the contact method for OTP delivery.'}

## 6.2.0 Technical Dependencies

- Azure Active Directory B2C: Must be configured with a user flow or custom policy for combined username/password and OTP authentication.
- Azure Communication Services: Must be configured and integrated to send OTPs via SMS.
- Email Service (e.g., SendGrid, or via ACS): Must be configured to send OTPs via email as an alternative or primary method.
- API Gateway (Azure API Management): Must be configured to validate the JWT issued by Azure AD B2C on subsequent API requests.

## 6.3.0 Data Dependencies

- User records must exist in Azure AD B2C with a verified phone number and/or email address.

## 6.4.0 External Dependencies

- The availability and performance of the Azure AD B2C service.
- The availability and delivery speed of the Azure Communication Services for SMS OTPs.

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- P95 latency for the initial credential validation API call should be < 300ms.
- OTP delivery to the user's device should occur within 15 seconds.

## 7.2.0 Security

- All communication must be over HTTPS (TLS 1.3).
- JWT access tokens must be short-lived (e.g., 15-60 minutes).
- Refresh tokens must be used to maintain sessions and stored securely (e.g., in an HttpOnly cookie for web).
- The system must implement rate limiting on the login and OTP endpoints to mitigate brute-force attacks.
- Passwords must not be stored in plaintext; this is handled by Azure AD B2C.
- The system must log all successful and failed login attempts for auditing purposes.

## 7.3.0 Usability

- The login process should be intuitive and require minimal steps.
- Error messages must be clear and actionable.

## 7.4.0 Accessibility

- The entire login flow must be compliant with WCAG 2.1 Level AA.

## 7.5.0 Compatibility

- Web: Latest stable versions of Chrome, Firefox, Safari, Edge.
- Mobile: iOS 14.0+ and Android 8.0+.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Configuration of Azure AD B2C user flows or custom policies, including UI branding.
- Integration of frontend applications (React Native, Next.js) with the B2C authentication flow.
- Secure client-side handling, storage, and refresh of JWTs.
- Backend middleware implementation for validating JWTs on all protected routes.
- Implementing robust error handling and user feedback for all failure scenarios.

## 8.3.0 Technical Risks

- Misconfiguration of B2C policies could create security loopholes.
- Latency or failure in the external OTP delivery service (ACS) can block all users from logging in.
- Insecure client-side token storage could lead to session hijacking.

## 8.4.0 Integration Points

- Client applications (Web/Mobile) -> Azure AD B2C
- Azure AD B2C -> Azure Communication Services (for OTP)
- Client applications -> Backend APIs (passing JWT)
- Backend APIs -> API Gateway (for JWT validation)

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0 Test Scenarios

- Verify successful login for each user role.
- Test all error conditions: invalid password, invalid OTP, expired OTP.
- Test the 'Resend OTP' functionality, including the cooldown period.
- Test the account lockout mechanism for both password and OTP failures.
- Verify redirection to the correct role-based dashboard upon successful login.
- Perform security testing for token handling, brute-force, and session management vulnerabilities.

## 9.3.0 Test Data Needs

- Active user accounts for each role with verified phone numbers/emails.
- A set of invalid credentials.
- An account to test the lockout functionality.

## 9.4.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Supertest (Backend Integration)
- Playwright (E2E)
- OWASP ZAP or similar for security scanning.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and achieve required code coverage (>80%).
- E2E tests for the entire login flow are passing.
- Azure AD B2C policies are configured and tested.
- Security review has been conducted and any findings addressed.
- UI is responsive and meets accessibility standards (WCAG 2.1 AA).
- Relevant documentation (e.g., environment variable setup for B2C) is created/updated.
- Story has been successfully deployed and verified in the staging environment.

# 11.0.0 Planning Information

## 11.1.0 Story Points

8

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a foundational story and a blocker for most other authenticated features. It must be completed in an early sprint.
- Requires DevOps/Cloud Engineering support to configure Azure AD B2C and Azure Communication Services.
- Requires coordination between frontend and backend teams for token handling.

## 11.4.0 Release Impact

This feature is critical for the initial release (MVP) as it gates access to the entire platform.

