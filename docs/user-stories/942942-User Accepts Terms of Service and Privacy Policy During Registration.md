# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-084 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Accepts Terms of Service and Privacy Policy D... |
| As A User Story | As a new user registering for an account, I want t... |
| User Persona | A new, unregistered user attempting to create an a... |
| Business Value | Ensures legal and regulatory compliance (e.g., GDP... |
| Functional Area | User Onboarding & Authentication |
| Story Theme | User Registration & Account Security |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User accepts terms and enables registration

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A new user is on the registration page and has filled in all other required fields correctly

### 3.1.5 When

The user clicks the checkbox to agree to the Terms of Service and Privacy Policy

### 3.1.6 Then

The 'Create Account' button transitions from a disabled state to an enabled state.

### 3.1.7 Validation Notes

Verify the button's 'disabled' attribute is removed and its visual style changes to indicate it is clickable. This must be testable via E2E automation.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: Attempting to register without accepting terms

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A new user is on the registration page with all required fields filled

### 3.2.5 And

The checkbox for accepting the terms is unchecked

### 3.2.6 When

The user attempts to submit the form (e.g., by pressing Enter or if the button were somehow enabled)

### 3.2.7 Then

The form submission is blocked, and the 'Create Account' button remains disabled.

### 3.2.8 Validation Notes

Verify that no API call for registration is triggered. The button should be visually and functionally disabled.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Viewing Legal Documents

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A new user is on the registration page

### 3.3.5 When

The user clicks the hyperlink for 'Terms of Service' or 'Privacy Policy'

### 3.3.6 Then

The corresponding legal document is displayed in a modal window or a new browser tab without losing the data entered in the registration form.

### 3.3.7 Validation Notes

Test both links. Ensure the content is readable and the user can easily close the view to return to the registration form.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Backend records consent upon successful registration

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A new user has filled the registration form and checked the acceptance box

### 3.4.5 When

The user clicks the enabled 'Create Account' button and the account is successfully created

### 3.4.6 Then

The system must create an immutable record of the user's consent, including the user's ID, the specific versions of the documents accepted, and a UTC timestamp of the acceptance.

### 3.4.7 Validation Notes

Verify in the database that a new record exists in the `user_consents` table (or equivalent) linking the new user ID to the correct document versions and a valid timestamp.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User unchecks the box after checking it

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A new user has filled the registration form and has checked the acceptance box, enabling the 'Create Account' button

### 3.5.5 When

The user then unchecks the acceptance box

### 3.5.6 Then

The 'Create Account' button immediately transitions back to a disabled state.

### 3.5.7 Validation Notes

Verify the button's state changes in real-time based on the checkbox state.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A standard checkbox input.
- A text label next to the checkbox, e.g., 'I have read and agree to the {Terms of Service} and {Privacy Policy}'.
- Hyperlinks for 'Terms of Service' and 'Privacy Policy' within the label text.
- The primary registration submission button (e.g., 'Create Account').

## 4.2.0 User Interactions

- The registration button's state (enabled/disabled) must be controlled by the checkbox's checked status (and the validity of other form fields).
- Clicking the hyperlinks must open the documents without disrupting the registration flow.
- The checkbox must be clickable on both its box and its associated label text.

## 4.3.0 Display Requirements

- The full text of the acceptance statement must be clearly visible.
- The links must be visually distinct from the surrounding text (e.g., different color and underlined).

## 4.4.0 Accessibility Needs

- The checkbox must be keyboard-navigable and operable (e.g., using the spacebar).
- The checkbox must have a `for/id` association with its label for screen readers.
- The disabled state of the button must be programmatically conveyed to assistive technologies (e.g., using `aria-disabled='true'`).
- The legal documents presented in the modal/new tab must be accessible (e.g., proper heading structure, sufficient color contrast).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user account cannot be created without explicit acceptance of the current, active versions of the platform's Terms of Service and Privacy Policy.

### 5.1.3 Enforcement Point

Backend API endpoint for user registration.

### 5.1.4 Violation Handling

The API request will be rejected with a '400 Bad Request' status code and an error message indicating that terms must be accepted.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The record of consent must be stored immutably and include the specific version of the document that was accepted.

### 5.2.3 Enforcement Point

Database transaction during user creation.

### 5.2.4 Violation Handling

If the consent record cannot be created, the entire user creation transaction must be rolled back to ensure data integrity.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

This story adds a mandatory step to the core user registration flow defined in US-095.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-013

#### 6.1.2.2 Dependency Reason

A mechanism for Super Admins to manage and version platform-wide legal documents (similar to US-013 for brand-specific T&Cs) must exist to provide the documents to be accepted.

## 6.2.0.0 Technical Dependencies

- User creation endpoint in the backend User/Auth service.
- Frontend registration UI component.
- A data store (e.g., Azure Blob Storage) for hosting the static legal document files (HTML or PDF).
- Database schema with a table to log user consent history (e.g., `user_consents`).

## 6.3.0.0 Data Dependencies

- Access to the live, published versions of the Terms of Service and Privacy Policy documents.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The state change of the registration button (enabled/disabled) should feel instantaneous (<100ms) after the checkbox is toggled.

## 7.2.0.0 Security

- The consent record must be stored securely in the database and protected from unauthorized modification.
- The API must validate on the server-side that consent was given; client-side validation is not sufficient.

## 7.3.0.0 Usability

- The requirement to accept the terms must be clear and unambiguous to the user.
- Accessing the legal documents should be simple and not navigate the user away from their registration task permanently.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) and mobile platforms (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Frontend state management is straightforward.
- Backend logic requires adding a check and a new record insertion within an existing transaction.
- The main complexity lies in ensuring the consent-tracking data model is robust and auditable for future legal needs.

## 8.3.0.0 Technical Risks

- Risk of creating a user without a consent record if the database transaction is not handled correctly (mitigated by using atomic transactions).
- Dependency on the admin feature for managing legal documents. If not ready, placeholder documents/links will be needed for development.

## 8.4.0.0 Integration Points

- The registration API endpoint.
- The user database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify button enables/disables correctly with checkbox.
- Verify form cannot be submitted without checking the box.
- Verify legal documents can be opened and viewed.
- Verify consent is correctly recorded in the database upon successful registration.
- Verify API rejects requests that are missing the consent flag.

## 9.3.0.0 Test Data Needs

- A set of valid user registration data (email, password, etc.).
- URLs to placeholder or actual ToS and PP documents.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress for E2E tests.
- Jest for backend unit tests.
- Axe for accessibility scanning.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests are written for both frontend and backend logic, achieving >= 80% coverage for new code.
- E2E automated tests for the registration flow (including this step) are passing.
- UI/UX has been reviewed and approved by the design team.
- Accessibility scan (WCAG 2.1 AA) passes for the registration page.
- Backend API changes are documented in the OpenAPI/Swagger specification.
- The consent data model is documented in the data dictionary.
- Story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a blocker for any user registration functionality going live.
- Must be developed in conjunction with or immediately after the core registration story (US-095).
- Confirm availability of the admin story for managing legal documents; if not available, plan for using placeholder links.

## 11.4.0.0 Release Impact

This feature is mandatory for the initial public release due to legal and compliance requirements.

