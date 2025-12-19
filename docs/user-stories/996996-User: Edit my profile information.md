# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-111 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Edit my profile information |
| As A User Story | As an authenticated platform user, I want to edit ... |
| User Persona | Any authenticated user of the platform (e.g., Cons... |
| Business Value | Enhances user control and data accuracy, improves ... |
| Functional Area | User Account Management |
| Story Theme | User Profile & Settings |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully edit profile information (name and contact number)

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am an authenticated user and I am on the 'Edit Profile' page

### 3.1.5 When

I update my 'Full Name' and 'Contact Number' with valid information and click the 'Save Changes' button

### 3.1.6 Then

The system should display a success message, and when I revisit the page, the updated information is displayed correctly.

### 3.1.7 Validation Notes

Verify that the user's attributes are updated in the Azure AD B2C directory.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully change password

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am an authenticated user and I am on the 'Change Password' section of my profile

### 3.2.5 When

I enter my correct 'Current Password', a new valid 'New Password', and the same password in 'Confirm New Password', then click 'Change Password'

### 3.2.6 Then

The system should display a success message, and I should be able to log out and log back in using the new password.

### 3.2.7 Validation Notes

Test the complete logout/login cycle with the new credentials. The old password must no longer work.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to save profile with invalid contact number

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am an authenticated user on the 'Edit Profile' page

### 3.3.5 When

I enter an invalid format for the 'Contact Number' (e.g., 'abc-123') and click 'Save Changes'

### 3.3.6 Then

The system should display an inline validation error message next to the contact number field, and the profile information should not be saved.

### 3.3.7 Validation Notes

The API call to update the profile should not be made if client-side validation fails.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to change password with incorrect current password

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am an authenticated user on the 'Change Password' section

### 3.4.5 When

I enter an incorrect 'Current Password' and valid new passwords, then click 'Change Password'

### 3.4.6 Then

The system should display an error message stating 'The current password you entered is incorrect.' and the password should not be changed.

### 3.4.7 Validation Notes

The API should return a specific error code for this condition.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to change password with mismatched new passwords

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am an authenticated user on the 'Change Password' section

### 3.5.5 When

I enter a 'New Password' that does not match the 'Confirm New Password' field and click 'Change Password'

### 3.5.6 Then

The system should display an inline validation error message stating 'Passwords do not match.' and the password should not be changed.

### 3.5.7 Validation Notes

This should be a client-side validation to provide immediate feedback.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to change password to one that does not meet complexity requirements

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am an authenticated user on the 'Change Password' section

### 3.6.5 When

I enter a new password that does not meet the defined complexity policy (e.g., too short) and click 'Change Password'

### 3.6.6 Then

The system should display an error message detailing the password requirements (e.g., 'Password must be at least 8 characters long and include a number.') and the password should not be changed.

### 3.6.7 Validation Notes

The password policy is defined in Azure AD B2C. The API should return a descriptive error from the identity provider.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Email address field is read-only

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

I am an authenticated user on the 'Edit Profile' page

### 3.7.5 When

I view my profile information

### 3.7.6 Then

The email address field should be displayed but should be non-editable (read-only).

### 3.7.7 Validation Notes

Changing the primary user identifier (email) is a separate, more complex workflow and is out of scope for this story.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Cancel editing profile information

### 3.8.3 Scenario Type

Alternative_Flow

### 3.8.4 Given

I am an authenticated user on the 'Edit Profile' page and have made unsaved changes

### 3.8.5 When

I click the 'Cancel' button

### 3.8.6 Then

The form fields should revert to their original saved values and I should be navigated away or the form should reset.

### 3.8.7 Validation Notes

Verify that no API call is made and the data remains unchanged.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated 'Profile' or 'Account Settings' page.
- Input field for 'Full Name'.
- Input field for 'Contact Number'.
- Read-only display for 'Email Address'.
- A separate section/tab for 'Change Password'.
- Input field for 'Current Password' (masked).
- Input field for 'New Password' (masked, with an option to toggle visibility).
- Input field for 'Confirm New Password' (masked).
- 'Save Changes' button for profile information.
- 'Change Password' button.
- 'Cancel' button or link.
- Success/Error notification components (e.g., toasts or banners).

## 4.2.0 User Interactions

- The 'Save Changes' button should be disabled until a change is made to a profile field.
- Inline validation messages should appear as the user types or on losing focus from a field with invalid data.
- A loading indicator should be displayed while changes are being saved.
- Password fields must mask the input characters.

## 4.3.0 Display Requirements

- The user's current profile information must be pre-populated in the form fields.
- Password complexity requirements should be clearly displayed near the new password field.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags.
- Error messages must be programmatically linked to their respective input fields using `aria-describedby`.
- All interactive elements must be keyboard-navigable and operable.
- Complies with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The user's primary email address cannot be changed through this interface.

### 5.1.3 Enforcement Point

User Interface (field is read-only) and API (reject any attempt to change email).

### 5.1.4 Violation Handling

The UI prevents the action. The API returns a '403 Forbidden' or '400 Bad Request' error if attempted.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A new password must meet the platform's defined complexity policy.

### 5.2.3 Enforcement Point

Azure AD B2C during the password update API call.

### 5.2.4 Violation Handling

The API call fails and returns an error message from the identity provider, which is then displayed to the user.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

The current password must be verified before a new password can be set.

### 5.3.3 Enforcement Point

Backend API and Azure AD B2C during the password change transaction.

### 5.3.4 Violation Handling

The API call fails with an 'invalid credentials' error, which is displayed to the user.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-016

#### 6.1.1.2 Dependency Reason

A user account must exist before its profile can be edited.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-018

#### 6.1.2.2 Dependency Reason

User must be able to log in to access their profile page.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C: All profile and password updates are managed through the IdP's APIs.
- Backend Authentication Service: A secure backend endpoint is required to proxy requests to Azure AD B2C, rather than making calls directly from the client.

## 6.3.0.0 Data Dependencies

- A defined and configured password complexity policy within Azure AD B2C.

## 6.4.0.0 External Dependencies

- Availability of the Microsoft Azure AD B2C service.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for saving profile information must respond within the P95 latency of 250ms.
- The page load time for the profile screen should have a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- All communication with the backend API must be over HTTPS (TLS 1.3).
- The user's current password must never be stored in client-side state or logs.
- The password change API endpoint must be protected against brute-force attacks via rate limiting.
- New passwords must be hashed by the identity provider (Azure AD B2C) and never stored in plain text.

## 7.3.0.0 Usability

- The process for editing profile info and changing a password should be intuitive and require minimal instruction.
- Feedback (success, error, loading) must be immediate and clear.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The web interface must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- The mobile interface must be fully functional on supported iOS and Android versions (iOS 14.0+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Direct integration with the Azure AD B2C identity provider API for user attribute updates and password changes.
- Implementing a secure, multi-step password change flow.
- Ensuring a consistent user experience across both web (Next.js) and mobile (React Native) platforms.
- Handling and displaying specific error messages returned from the external identity provider.

## 8.3.0.0 Technical Risks

- Potential difficulties or limitations with the Azure AD B2C API.
- Security vulnerabilities if the password change flow is not implemented correctly on the backend.
- Ensuring data consistency between the IdP and any local user data cache.

## 8.4.0.0 Integration Points

- Backend User Management Service.
- Azure Active Directory B2C User Management API (e.g., Microsoft Graph API).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful update of user's name and contact number.
- Verify successful password change and re-login.
- Test all validation rules: invalid phone number, empty name, mismatched passwords, weak password.
- Test providing an incorrect current password.
- Verify the email field is not editable.
- Test the 'Cancel' functionality to ensure no data is saved.
- Verify UI responsiveness and functionality across supported devices and browsers.

## 9.3.0.0 Test Data Needs

- Test user accounts with known credentials in the development/staging Azure AD B2C tenant.
- A set of invalid data inputs for testing validation logic (e.g., invalid phone numbers, passwords that violate policy).

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend unit/integration tests.
- Playwright for E2E testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both web and mobile platforms.
- Code reviewed and approved by at least two team members.
- Unit and integration tests implemented with minimum 80% code coverage for new logic.
- E2E tests for both happy paths (profile update, password change) are automated and passing.
- User interface reviewed and approved by UX/UI designer for consistency and accessibility.
- Security review of the password change endpoint completed and any findings addressed.
- No new high or critical accessibility issues are introduced.
- Relevant API documentation (OpenAPI) is updated.
- Story deployed and verified in the staging environment by a QA engineer.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires access and permissions to a non-production Azure AD B2C tenant for development and testing.
- The password complexity policy must be defined and configured in Azure AD B2C before development begins.

## 11.4.0.0 Release Impact

This is a core account management feature expected by users in the initial release.

