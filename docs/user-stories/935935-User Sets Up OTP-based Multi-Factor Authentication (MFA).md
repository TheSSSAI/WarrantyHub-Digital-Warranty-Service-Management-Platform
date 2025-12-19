# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-080 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Sets Up OTP-based Multi-Factor Authentication... |
| As A User Story | As a security-conscious User, I want to set up One... |
| User Persona | Any registered user of the platform (Consumer, Tec... |
| Business Value | Enhances platform security by protecting user acco... |
| Functional Area | User Account Management & Security |
| Story Theme | Account Security Hardening |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User initiates MFA setup

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user on my account's security settings page where MFA is currently disabled

### 3.1.5 When

I click the 'Enable Multi-Factor Authentication' button

### 3.1.6 Then

The system navigates me to a setup screen that displays a unique QR code and a corresponding manual setup key.

### 3.1.7 And

The screen includes a field prompting me to enter a 6-digit verification code from my authenticator app.

### 3.1.8 Validation Notes

Verify that the QR code is generated and scannable by standard authenticator apps (e.g., Google Authenticator, Microsoft Authenticator). Verify the manual key is present and can be copied.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: User successfully verifies and enables MFA

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the MFA setup screen and have scanned the QR code with my authenticator app

### 3.2.5 When

I enter the correct, current 6-digit code from my app and click 'Verify & Enable'

### 3.2.6 Then

The system validates the code and displays a success message confirming that MFA is now enabled.

### 3.2.7 And

I must check a box or click a button to acknowledge that I have safely stored the recovery codes before the flow is considered complete.

### 3.2.8 Validation Notes

Check the user's account status in the backend (Azure AD B2C) to confirm MFA is enabled. Verify that a set of unique recovery codes is generated and displayed.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: User enters an incorrect verification code

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the MFA setup screen

### 3.3.5 When

I enter an incorrect or expired 6-digit code and click 'Verify & Enable'

### 3.3.6 Then

The system displays an inline error message, such as 'Invalid code. Please try again.'

### 3.3.7 And

The MFA setup process is not completed, and my account remains without MFA enabled.

### 3.3.8 Validation Notes

Test with invalid codes (wrong numbers, too few/many digits) and expired codes (wait for the code to change in the app before submitting the old one).

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Alternative Flow: User cancels the MFA setup process

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I have initiated the MFA setup and am viewing the QR code screen

### 3.4.5 When

I click the 'Cancel' or 'Back' button without completing verification

### 3.4.6 Then

I am returned to the main security settings page.

### 3.4.7 And

My account's MFA status remains 'Disabled'.

### 3.4.8 Validation Notes

Verify that no changes are persisted to the user's MFA status if the flow is abandoned.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: User with MFA already enabled visits the security page

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am a logged-in user who has already successfully set up MFA

### 3.5.5 When

I navigate to my account's security settings page

### 3.5.6 Then

The page clearly indicates that 'Multi-Factor Authentication is Enabled'.

### 3.5.7 And

The primary action is to 'Disable MFA' or 'Manage MFA Settings' (e.g., view recovery codes), not to enable it.

### 3.5.8 Validation Notes

This confirms the UI correctly reflects the user's current security state.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Button to 'Enable Multi-Factor Authentication'
- Modal or page for MFA setup
- Display area for QR Code image
- Display area for manual setup key with a 'Copy' button
- Input field for 6-digit verification code
- 'Verify & Enable' button
- 'Cancel' button or link
- Success confirmation message
- Display area for recovery codes with 'Copy', 'Download', and 'Print' buttons
- Checkbox or button to acknowledge saving recovery codes

## 4.2.0 User Interactions

- User clicks to start the setup flow.
- User scans QR code with an external device/app.
- User types verification code into the input field.
- User must explicitly acknowledge saving recovery codes to complete the process.

## 4.3.0 Display Requirements

- Instructions must be clear and simple, guiding the user through each step.
- A strong warning must be displayed with the recovery codes, explaining their purpose and the importance of storing them securely.

## 4.4.0 Accessibility Needs

- The page must be navigable via keyboard.
- The QR code should have an ARIA label or alternative text.
- The manual setup key must be accessible to screen readers.
- All form fields and buttons must have proper labels.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The verification code (OTP) is time-based and typically valid for 30-60 seconds.

### 5.1.3 Enforcement Point

During the verification step of the MFA setup.

### 5.1.4 Violation Handling

The system will reject expired codes and return an 'Invalid code' error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Recovery codes are for one-time use only.

### 5.2.3 Enforcement Point

During the account recovery/MFA login process (covered in a separate story).

### 5.2.4 Violation Handling

A used recovery code will be invalidated and cannot be used again.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

A user must have a registered account before they can secure it with MFA.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-096

#### 6.1.2.2 Dependency Reason

A user must be able to log in with their primary credentials to access the security settings page.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C: The platform's identity provider, which manages the core MFA functionality. This story requires integration with the B2C API or custom policies for enabling TOTP for a user.

## 6.3.0.0 Data Dependencies

- User Profile Record: A flag or attribute in the user's profile must be updated to reflect that MFA is enabled.

## 6.4.0.0 External Dependencies

- User's Authenticator App (e.g., Google Authenticator, Authy): The user must have a compatible app on their mobile device to complete the setup.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The QR code generation and display should take less than 500ms.
- The OTP verification response time should be under 250ms.

## 7.2.0.0 Security

- The secret key used for TOTP generation must be created and stored securely within Azure AD B2C.
- Communication between the client, backend, and Azure AD B2C must be over HTTPS/TLS 1.2+.
- The verification endpoint must be rate-limited to prevent brute-force attacks on the OTP.
- Recovery codes must be securely generated and stored as hashes.

## 7.3.0.0 Usability

- The setup process should be intuitive and require minimal technical knowledge.
- Clear instructions and error messages must be provided to the user.

## 7.4.0.0 Accessibility

- The user interface must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web interface must be compatible with the latest versions of Chrome, Firefox, Safari, and Edge.
- The mobile interface must function correctly on supported iOS and Android versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires configuration of Azure AD B2C custom policies or user flows, which can be complex.
- Building a seamless, multi-step UI/UX for both web and mobile clients.
- Ensuring the secure handling of the entire flow, including the generation and presentation of recovery codes.

## 8.3.0.0 Technical Risks

- Misconfiguration of Azure AD B2C policies could lead to security vulnerabilities or a broken user experience.
- Inconsistent user experience between the web and mobile setup flows.

## 8.4.0.0 Integration Points

- Frontend (Web/Mobile) -> Backend API
- Backend API -> Azure Active Directory B2C Management API

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Full end-to-end setup of MFA for a new user.
- Attempting setup with an incorrect OTP.
- Attempting setup with an expired OTP.
- Canceling the setup process midway.
- Verifying the UI correctly displays 'MFA Enabled' status after successful setup.

## 9.3.0.0 Test Data Needs

- Test user accounts in Azure AD B2C with MFA disabled.
- Physical or virtual mobile devices with authenticator apps installed for testing.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Cypress for E2E testing.
- OWASP ZAP or similar for security scanning.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing with Azure AD B2C completed successfully in a staging environment
- User interface reviewed and approved for both web and mobile
- Security requirements validated, including rate limiting and secure key handling
- Accessibility audit passed for the setup flow
- User-facing documentation (FAQ/Help Guide) for setting up MFA is created
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational security feature and a prerequisite for the MFA login story (US-081).
- Requires a developer with experience or allocated time for learning Azure AD B2C custom policy configuration.
- Coordination between frontend and backend developers is crucial for the multi-step flow.

## 11.4.0.0 Release Impact

- Enables a critical security feature for the platform. Can be highlighted in release notes as a major security enhancement.

