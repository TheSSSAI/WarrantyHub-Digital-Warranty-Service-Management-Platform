# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-017 |
| Elaboration Date | 2024-05-22 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Accept Terms of Service and Privacy Policy d... |
| As A User Story | As a new user signing up for an account, I want to... |
| User Persona | A new user (of any role: Consumer, Technician, Adm... |
| Business Value | Ensures legal compliance (GDPR, CCPA), mitigates l... |
| Functional Area | User Onboarding & Authentication |
| Story Theme | User Registration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User accepts terms and completes registration

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A new user is on the account registration page and has filled in all other required fields correctly

### 3.1.5 When

The user ticks the checkbox labeled 'I have read and agree to the Terms of Service and Privacy Policy'

### 3.1.6 Then

The 'Create Account' button becomes enabled.

### 3.1.7 Validation Notes

Verify the button's 'disabled' attribute is removed or its state changes to enabled.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: User successfully creates account after accepting terms

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user has ticked the acceptance checkbox and the 'Create Account' button is enabled

### 3.2.5 When

The user clicks the 'Create Account' button

### 3.2.6 Then

The registration process completes successfully.

### 3.2.7 Validation Notes

The user should be redirected to the next step (e.g., dashboard, email verification) and a new user record should be created.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Happy Path: System logs the acceptance of terms

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A user has successfully completed registration after accepting the terms

### 3.3.5 When

The user account is created

### 3.3.6 Then

The system creates an immutable record in the database containing the user's ID, the version of the Terms of Service accepted, the version of the Privacy Policy accepted, and the exact timestamp of acceptance.

### 3.3.7 Validation Notes

Query the database to confirm the existence and accuracy of the acceptance log entry for the new user.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: User attempts to register without accepting terms

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A new user is on the account registration page and has filled in all other required fields correctly

### 3.4.5 And

A clear, user-friendly validation message (e.g., 'You must accept the Terms of Service and Privacy Policy to continue.') is displayed near the checkbox.

### 3.4.6 When

The user clicks the 'Create Account' button

### 3.4.7 Then

The form submission is prevented.

### 3.4.8 Validation Notes

Verify that no API call for registration is made and the error message appears and is associated with the checkbox for accessibility.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Alternative Flow: User views the legal documents

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

A new user is on the account registration page

### 3.5.5 When

The user clicks the 'Terms of Service' or 'Privacy Policy' hyperlink

### 3.5.6 Then

The corresponding document is displayed in a readable format, either in a new tab or a modal window.

### 3.5.7 Validation Notes

Verify that the links are correct and the documents are accessible and legible.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A single checkbox for acceptance.
- A text label associated with the checkbox, e.g., 'I have read and agree to the Terms of Service and Privacy Policy'.
- Hyperlinks within the label text for 'Terms of Service' and 'Privacy Policy'.
- A primary action button ('Create Account', 'Register', etc.) that is disabled by default.
- A designated area for a validation error message.

## 4.2.0 User Interactions

- The 'Create Account' button's state must be dynamically controlled by the status of the acceptance checkbox (and other form validation).
- Clicking the hyperlinks should open the documents without losing the user's progress on the registration form.

## 4.3.0 Display Requirements

- The full text of the Terms of Service and Privacy Policy must be available to the user before they are asked to accept.

## 4.4.0 Accessibility Needs

- The checkbox must be keyboard focusable and operable (e.g., using the spacebar).
- The label must be programmatically linked to the checkbox using 'for'/'id' attributes or 'aria-labelledby'.
- Validation errors must be programmatically announced to screen readers upon failed submission attempt.
- If documents are shown in a modal, the modal must adhere to accessibility best practices (e.g., trap focus, close with ESC key).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Account creation is strictly prohibited without explicit acceptance of the current versions of the Terms of Service and Privacy Policy.

### 5.1.3 Enforcement Point

Backend API endpoint for user registration.

### 5.1.4 Violation Handling

The API request will be rejected with a 400 Bad Request status and a clear error code/message indicating missing legal acceptance.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The record of a user's acceptance of legal terms must be stored and maintained as an immutable audit record.

### 5.2.3 Enforcement Point

Database layer upon successful user creation.

### 5.2.4 Violation Handling

The user creation transaction should fail if the acceptance log cannot be written, ensuring data consistency.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-016', 'dependency_reason': 'This story is a component of the user registration flow. The basic registration form and backend endpoint must exist before this acceptance logic can be added.'}

## 6.2.0 Technical Dependencies

- User registration endpoint in the authentication service.
- Azure Active Directory B2C custom policy or frontend logic for the registration flow.
- A database table schema for logging legal acceptances (e.g., `user_legal_acceptances`).
- A content delivery mechanism (e.g., Azure Blob Storage) to host versioned ToS and Privacy Policy documents.

## 6.3.0 Data Dependencies

- Availability of the final text for the initial versions of the Terms of Service and Privacy Policy documents.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The display of legal documents upon link click should be near-instantaneous (<500ms).

## 7.2.0 Security

- The acceptance log must be protected against unauthorized modification or deletion.
- The API must re-validate on the server-side that acceptance was given, not relying solely on frontend logic.

## 7.3.0 Usability

- The requirement to accept the terms must be clear and unambiguous.
- Accessing the legal documents should be simple and not disrupt the registration flow.

## 7.4.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards as specified in the SRS.

## 7.5.0 Compatibility

- Functionality must be consistent across all supported browsers (latest Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Frontend state management for the checkbox and button.
- Backend logic to create an additional record in a new table within the user creation transaction.
- Requires a simple mechanism to fetch/link to the current version of the legal documents.

## 8.3.0 Technical Risks

- Ensuring the user creation and acceptance logging is an atomic transaction to prevent data inconsistency (e.g., user created without an acceptance log).

## 8.4.0 Integration Points

- Frontend registration form.
- Backend user creation API endpoint.
- Database.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Verify registration is blocked if the checkbox is not ticked.
- Verify registration succeeds when the checkbox is ticked.
- Verify the acceptance record is correctly created in the database upon successful registration.
- Verify the ToS and Privacy Policy links open the correct documents.
- Verify keyboard navigation and screen reader compatibility for the checkbox and error messages.

## 9.3.0 Test Data Needs

- Test user accounts with unique email addresses.
- Placeholder URLs for the Terms of Service and Privacy Policy documents.

## 9.4.0 Testing Tools

- Jest & React Testing Library for frontend unit tests.
- Supertest for backend API tests.
- Playwright for E2E tests.
- Axe for automated accessibility checks.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing completed successfully, ensuring the user creation and acceptance log is an atomic operation
- E2E tests for happy path and error conditions are automated and passing
- User interface reviewed and approved for usability and accessibility (WCAG 2.1 AA)
- Security requirements validated (server-side check is in place)
- Documentation for the acceptance logging mechanism is created
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

2

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a blocking requirement for launching any user registration functionality.
- The legal team must provide the final text for the ToS and PP documents before this story can be completed.

## 11.4.0 Release Impact

Mandatory for the initial MVP release due to legal compliance requirements.

