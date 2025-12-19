# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-114 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Enters Free-Text Description for 'Other' Issu... |
| As A User Story | As a product owner raising a service request, I wa... |
| User Persona | End-User/Consumer (on Web or Mobile App) |
| Business Value | Ensures users are not blocked from reporting issue... |
| Functional Area | Service Request Management |
| Story Theme | Product Servicing Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User selects 'Other' and provides a description

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is on the 'Raise Service Request' form and the 'Type of issue' dropdown is visible

### 3.1.5 When

the user selects the 'Other' option from the dropdown AND enters text into the newly appeared description field

### 3.1.6 Then

the form submission is successful and the service request is created with the custom text stored as the issue description.

### 3.1.7 Validation Notes

Verify in the database that the service request record contains the custom text. Also, verify that the service center and technician panels display this custom description correctly.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: User selects 'Other' but leaves the description field blank

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

a user is on the 'Raise Service Request' form and has selected the 'Other' option

### 3.2.5 When

the user leaves the custom description field empty and attempts to submit the form

### 3.2.6 Then

the form submission must be prevented AND a clear, user-friendly validation message (e.g., 'Please describe the issue.') must be displayed adjacent to the description field.

### 3.2.7 Validation Notes

Automated E2E test should attempt to submit the form in this state and assert that the submission fails and the error message is visible.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: User toggles away from 'Other' after selecting it

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

a user is on the 'Raise Service Request' form and has selected the 'Other' option, revealing the description field

### 3.3.5 When

the user changes their selection in the 'Type of issue' dropdown to a predefined option

### 3.3.6 Then

the custom description field must be hidden or disabled AND its validation requirement must be removed, allowing the form to be submitted.

### 3.3.7 Validation Notes

Test by selecting 'Other', typing text, then selecting a different issue. The text field should disappear, and the form should submit successfully without the custom text.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

UI Interaction: Conditional visibility of the description field

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a user is on the 'Raise Service Request' form

### 3.4.5 When

the user has not selected 'Other' from the 'Type of issue' dropdown

### 3.4.6 Then

the custom description text field must not be visible or enabled.

### 3.4.7 Validation Notes

Verify the default state of the form upon loading. The field should only appear upon the specific selection of 'Other'.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Security: Input sanitization

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a user has selected 'Other' and is entering a description

### 3.5.5 When

the user enters a string containing HTML or script tags (e.g., '<script>alert("XSS")</script>') and submits the form

### 3.5.6 Then

the backend must sanitize the input, storing only the plain text content, and when this data is displayed anywhere in the application (e.g., technician panel), it must be rendered as plain text without executing any scripts.

### 3.5.7 Validation Notes

Requires a specific security test case where a malicious string is submitted via the API, and the response/stored data is verified to be clean.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Other' option within the 'Type of issue' dropdown menu.
- A multi-line text input field (textarea) for the custom description.
- A clear label for the text area, e.g., 'Please describe the issue'.
- A validation error message container associated with the text area.
- An optional character counter (e.g., '0/500') to guide the user.

## 4.2.0 User Interactions

- Selecting 'Other' from the dropdown dynamically reveals the text area.
- Selecting any other option from the dropdown hides the text area.
- The application provides immediate client-side validation feedback if the user tries to submit with 'Other' selected and the description empty.

## 4.3.0 Display Requirements

- The custom description must be clearly displayed in the service request details view for the User, Service Center Admin, Brand Admin, and Technician.

## 4.4.0 Accessibility Needs

- The text area must have a programmatically associated `<label>`. The appearance of the new field must be announced by screen readers. Validation errors must be programmatically linked to the input and announced to the user.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

If the 'Type of issue' for a service request is 'Other', a custom description is mandatory.

### 5.1.3 Enforcement Point

Client-side form validation and Server-side API validation upon service request creation.

### 5.1.4 Violation Handling

Prevent form submission and return a validation error to the user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The custom issue description field has a maximum length of 500 characters.

### 5.2.3 Enforcement Point

Client-side input constraint and Server-side API validation.

### 5.2.4 Violation Handling

Prevent user from typing more characters on the client. Reject API request with a 400 Bad Request error if the length is exceeded.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-037

#### 6.1.1.2 Dependency Reason

This story modifies the service request form, which is created in US-037. The base form must exist before this conditional logic can be added.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-113

#### 6.1.2.2 Dependency Reason

This story depends on the implementation of category-specific issue lists from US-113. The 'Other' option must be added as a standard choice to all such lists.

## 6.2.0.0 Technical Dependencies

- The backend API endpoint for creating a service request must be able to accept an optional field for the custom description.
- The database schema for the `ServiceRequests` table must include a nullable text column to store the custom description.

## 6.3.0.0 Data Dependencies

- Requires the master list of service issue types to be configurable to include 'Other'.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The UI response to selecting/deselecting 'Other' (showing/hiding the text area) must be perceived as instantaneous (<100ms).

## 7.2.0.0 Security

- All free-text input from the user must be sanitized on the server-side to prevent Cross-Site Scripting (XSS) and SQL Injection vulnerabilities.

## 7.3.0.0 Usability

- The interaction must be intuitive. The appearance of a required field should be obvious to the user.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA. Dynamic content changes must be accessible to assistive technologies.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) and mobile OS versions (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Standard conditional form logic on the frontend.
- Minor schema and validation change on the backend.
- Input sanitization is a critical but standard security practice.

## 8.3.0.0 Technical Risks

- Failure to properly implement input sanitization could introduce a significant security vulnerability (XSS).

## 8.4.0.0 Integration Points

- Frontend Service Request Form
- Backend Service Request Creation API Endpoint
- Database `ServiceRequests` Table

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- User successfully submits a request with 'Other' and a description.
- User is blocked from submitting with 'Other' and no description.
- User toggles between 'Other' and a standard issue, then submits successfully.
- An XSS payload is entered in the description field to verify sanitization.

## 9.3.0.0 Test Data Needs

- A user account with a registered product ready for a service request.
- A sample XSS string for security testing.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress for E2E tests.
- Jest for backend unit tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for both frontend and backend logic, achieving >80% coverage
- Integration testing completed successfully between UI and API
- E2E tests for happy path and error conditions are automated and passing in the CI pipeline
- User interface reviewed and approved for usability and accessibility (WCAG 2.1 AA)
- Security requirements validated, specifically server-side input sanitization
- Documentation updated for the API change
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a high-priority usability feature that unblocks users with uncommon issues. It should be prioritized soon after the base service request functionality (US-037) is complete.

## 11.4.0.0 Release Impact

- Enhances the core feature of raising a service request. Its absence would be a significant gap in functionality for the initial release.

