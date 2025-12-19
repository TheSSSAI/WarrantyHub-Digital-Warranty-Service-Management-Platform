# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-082 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Account is Locked After 5 Consecutive Failed ... |
| As A User Story | As a registered platform user, I want my account t... |
| User Persona | Any registered user of the platform (Consumer, Tec... |
| Business Value | Enhances platform security by mitigating brute-for... |
| Functional Area | User Authentication & Security |
| Story Theme | Account Security Hardening |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Account is locked after 5 consecutive failed password attempts

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A registered user exists and their account is currently unlocked

### 3.1.5 When

The user attempts to log in with an incorrect password 5 consecutive times

### 3.1.6 Then

On the 5th failed attempt, the system must change the account status to 'locked'

### 3.1.7 Validation Notes

Verify via API response and subsequent login attempts. The identity provider (Azure AD B2C) should reflect the locked state.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User is notified of the account lockout

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A user's account has just been locked after the 5th failed login attempt

### 3.2.5 When

The login form is submitted for the 5th time

### 3.2.6 Then

The UI must display a clear and specific error message: 'Your account has been temporarily locked due to too many failed login attempts. Please try again in 15 minutes or use the 'Forgot Password' link to reset it.'

### 3.2.7 Validation Notes

Visually inspect the login page on both web and mobile clients to ensure the message appears as specified.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Locked account prevents further login attempts during the lockout period

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A user's account is in a 'locked' state

### 3.3.5 When

The user attempts to log in with the correct password within the 15-minute lockout period

### 3.3.6 Then

The login attempt must fail, and the same lockout notification message from AC-002 must be displayed.

### 3.3.7 Validation Notes

Automated E2E test should attempt a valid login at T+1 minute after lockout and assert the failure and message.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Failed login attempt counter is reset after a successful login

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

A user has made 1 to 4 consecutive failed login attempts

### 3.4.5 When

The user successfully logs in with the correct password

### 3.4.6 Then

The system must grant access to the user

### 3.4.7 Validation Notes

After a successful login, log out and verify that the next failed login attempt is counted as the first, not a continuation of the previous count.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Account is automatically unlocked after the lockout period expires

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A user's account has been locked for the full 15-minute duration

### 3.5.5 When

The 15-minute lockout period has elapsed

### 3.5.6 And

The user attempts to log in with the correct password

### 3.5.7 Then

The login attempt must succeed, and the system must grant access.

### 3.5.8 Validation Notes

Automated test should wait for 15 minutes and 5 seconds, then attempt a valid login and assert success.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Failed login attempts for different users are tracked independently

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

User A and User B are two distinct registered users

### 3.6.5 When

An attacker makes 4 consecutive failed login attempts for User A

### 3.6.6 And

Then makes 4 consecutive failed login attempts for User B

### 3.6.7 Then

Neither User A's account nor User B's account should be locked.

### 3.6.8 Validation Notes

Test by interleaving failed login attempts for two separate test accounts and confirming neither gets locked.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Error message container on the login screen (Web and Mobile).

## 4.2.0 User Interactions

- On the 5th failed login, the standard 'Invalid credentials' message is replaced by the specific 'Account locked' message.

## 4.3.0 Display Requirements

- The lockout message must clearly state: 1) the account is locked, 2) the reason (too many attempts), 3) the duration (15 minutes), and 4) an alternative action ('Forgot Password').

## 4.4.0 Accessibility Needs

- The error message must be associated with the relevant input fields using `aria-describedby` and have a role of `alert` to be announced by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SEC-001

### 5.1.2 Rule Description

An account must be temporarily locked after 5 consecutive failed login attempts.

### 5.1.3 Enforcement Point

Server-side during the authentication process, managed by the Identity Provider (Azure AD B2C).

### 5.1.4 Violation Handling

The account is flagged as locked, and all subsequent authentication requests are denied until the lockout period expires.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SEC-002

### 5.2.2 Rule Description

The temporary account lockout duration is 15 minutes.

### 5.2.3 Enforcement Point

Identity Provider (Azure AD B2C) configuration.

### 5.2.4 Violation Handling

The account automatically transitions from 'locked' to 'unlocked' state after 15 minutes.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-096

#### 6.1.1.2 Dependency Reason

This story modifies the core login functionality, which must exist first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-095

#### 6.1.2.2 Dependency Reason

Requires the existence of user accounts to lock.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C: This feature should be implemented by configuring the 'Smart Lockout' policy within AAD B2C.
- Backend Authentication Service: Must be able to correctly interpret the specific error codes/responses from AAD B2C that indicate an account is locked.

## 6.3.0.0 Data Dependencies

- User account data within Azure AD B2C.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The lockout check must not add more than 50ms of latency to the overall login API response time.

## 7.2.0.0 Security

- The lockout mechanism must be enforced entirely on the server-side (via AAD B2C) and must not be bypassable via client-side manipulation.
- Failed attempt counters must not be exposed to the client.
- The system must log account lockout events for security auditing purposes.

## 7.3.0.0 Usability

- The error message must be clear and actionable, guiding the user on what to do next rather than being a dead end.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA. Error messages must be programmatically accessible.

## 7.5.0.0 Compatibility

- The functionality must work consistently across all supported browsers (Chrome, Firefox, Safari, Edge) and mobile OS versions (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- The primary implementation is through configuration of Azure AD B2C's Smart Lockout feature.
- Development work is limited to handling the specific API response for a locked account in the backend and displaying the corresponding message on the frontend.

## 8.3.0.0 Technical Risks

- Misconfiguration of the AAD B2C policy could lead to security vulnerabilities or poor user experience.
- The specific error code for a locked account from AAD B2C must be correctly identified and handled to avoid showing a generic error message.

## 8.4.0.0 Integration Points

- Azure Active Directory B2C User Flow/Custom Policy.
- Backend Authentication Microservice.
- Frontend Web (Next.js) and Mobile (React Native) login components.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify account lock after 5 failed attempts.
- Verify login is blocked during lockout period with correct password.
- Verify login is successful after lockout period expires.
- Verify failed attempt counter resets on successful login.
- Verify UI displays the correct message for a locked account.

## 9.3.0.0 Test Data Needs

- At least two dedicated test user accounts with known passwords.

## 9.4.0.0 Testing Tools

- Cypress for automated E2E testing.
- Postman/Insomnia for API-level integration testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Azure AD B2C Smart Lockout policy is configured and documented (preferably in Terraform)
- Code for handling lockout response in backend and displaying message in frontend is reviewed and approved
- Unit tests for response handling logic are implemented and passing with >80% coverage
- Automated E2E tests for the lockout and unlock scenarios are integrated into the CI/CD pipeline
- User interface displays the specified message correctly on all supported platforms
- Security review confirms the server-side enforcement of the policy
- Documentation for the feature is updated in the system knowledge base
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational security feature and should be prioritized to be completed with the initial login functionality.
- Requires access to configure Azure AD B2C policies.

## 11.4.0.0 Release Impact

- Critical for any public-facing release to ensure basic account security.

