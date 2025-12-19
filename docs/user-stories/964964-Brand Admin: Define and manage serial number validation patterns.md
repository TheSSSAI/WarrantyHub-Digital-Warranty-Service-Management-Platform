# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-095 |
| Elaboration Date | 2024-05-22 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Brand Admin: Define and manage serial number valid... |
| As A User Story | As a Brand Admin, I want to define and manage a sp... |
| User Persona | Brand Admin: A user responsible for managing their... |
| Business Value | Improves data integrity by preventing incorrect se... |
| Functional Area | Brand Administration & Product Management |
| Story Theme | Platform Data Quality & Configuration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Brand Admin successfully creates a new validation pattern

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A Brand Admin is logged into the Brand Portal and navigates to the 'Brand Settings' page

### 3.1.5 When

They enter a valid regular expression (e.g., '^[A-Z]{2}\d{8}$') into the 'Serial Number Validation Pattern' field and click 'Save'

### 3.1.6 Then

The system successfully saves the pattern associated with their brand and displays a confirmation message, such as 'Validation pattern saved successfully.'

### 3.1.7 Validation Notes

Verify the regex string is correctly stored in the database for the specific brand. The page should reflect the newly saved pattern upon refresh.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Brand Admin successfully updates an existing validation pattern

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Brand Admin has a pre-existing validation pattern saved and is on the 'Brand Settings' page

### 3.2.5 When

They modify the existing regex pattern and click 'Save'

### 3.2.6 Then

The system updates the record in the database with the new pattern, and a confirmation message is displayed.

### 3.2.7 Validation Notes

Verify the database record for the brand reflects the updated pattern. The new pattern must be used for all subsequent product registrations.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Brand Admin tests their pattern with a valid sample serial number

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A Brand Admin has entered a regex pattern (e.g., '^[A-Z]{2}\d{8}$') on the 'Brand Settings' page

### 3.3.5 When

They enter a matching string (e.g., 'AB12345678') into the provided test input field and trigger the test

### 3.3.6 Then

The UI displays a clear, positive feedback message, such as '✓ Valid Format'.

### 3.3.7 Validation Notes

This validation should happen client-side for immediate feedback. Test with multiple valid inputs.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Brand Admin tests their pattern with an invalid sample serial number

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

A Brand Admin has entered a regex pattern (e.g., '^[A-Z]{2}\d{8}$') on the 'Brand Settings' page

### 3.4.5 When

They enter a non-matching string (e.g., 'ABC12345') into the test input field and trigger the test

### 3.4.6 Then

The UI displays a clear, negative feedback message, such as '✗ Invalid Format'.

### 3.4.7 Validation Notes

Test with various non-matching inputs, including different lengths, characters, and cases.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Brand Admin attempts to save a syntactically invalid regex pattern

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A Brand Admin is on the 'Brand Settings' page

### 3.5.5 When

They enter a syntactically incorrect regex (e.g., '[A-Z(') and click 'Save'

### 3.5.6 Then

The system prevents the form from being submitted and displays an inline validation error, such as 'Invalid regular expression syntax.'

### 3.5.7 Validation Notes

This check should be performed on the backend upon submission. A client-side check is also recommended for better UX.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User successfully registers a product with a valid serial number

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

A Brand has a validation pattern configured (e.g., '^[A-Z]{2}\d{8}$')

### 3.6.5 When

A User is on the product registration page, selects that brand, and enters a matching serial number (e.g., 'XY98765432')

### 3.6.6 Then

The serial number field is accepted without validation errors, and the user can proceed with registration.

### 3.6.7 Validation Notes

This requires integration with the Product Registration module (US-019). Validation should occur on the client and be re-verified on the server.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

User is prevented from registering a product with an invalid serial number

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

A Brand has a validation pattern configured (e.g., '^[A-Z]{2}\d{8}$')

### 3.7.5 When

A User is on the product registration page, selects that brand, and enters a non-matching serial number (e.g., 'invalid-sn')

### 3.7.6 Then

The UI displays an inline validation error message (e.g., 'Serial number format is incorrect for this brand') and prevents form submission until corrected.

### 3.7.7 Validation Notes

The error message should be user-friendly and clearly indicate the problem.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

User registers a product for a brand with no configured pattern

### 3.8.3 Scenario Type

Alternative_Flow

### 3.8.4 Given

A Brand has NOT configured a serial number validation pattern

### 3.8.5 When

A User registers a product of that brand and enters any non-empty string as the serial number

### 3.8.6 Then

The system does not perform any format-specific validation on the serial number, and the user can proceed.

### 3.8.7 Validation Notes

The system should gracefully handle cases where the pattern is null or empty in the database.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A text input field for the regular expression pattern within the Brand Admin portal.
- A 'Save' or 'Update' button to persist the pattern.
- A separate 'Test' section with a text input for a sample serial number and a 'Test' button.
- A display area for showing the result of the test ('Valid'/'Invalid').
- Help text or a tooltip explaining what a regular expression is, with a link to a resource like regex101.com.

## 4.2.0 User Interactions

- Admin enters or pastes a regex string into the pattern field.
- Admin can test the pattern against sample inputs without saving.
- The system provides immediate visual feedback for the test result.
- The system provides clear success or error notifications upon saving.

## 4.3.0 Display Requirements

- The currently saved pattern must be displayed when the Brand Admin visits the settings page.
- Validation error messages must be clear and displayed next to the relevant field.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- Feedback messages (success, error, test results) must be accessible to screen readers using ARIA live regions.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A configured serial number validation pattern is only enforced for new product registrations or edits.

### 5.1.3 Enforcement Point

Product Registration & Product Edit API endpoints.

### 5.1.4 Violation Handling

The system will not retroactively validate or invalidate serial numbers of already registered products if the pattern is added or changed.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

If a brand has not defined a validation pattern, no format-specific validation is performed on the serial number field.

### 5.2.3 Enforcement Point

Product Registration API endpoint.

### 5.2.4 Violation Handling

N/A. The system proceeds with basic validation only (e.g., checking for non-empty value).

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-085

#### 6.1.1.2 Dependency Reason

Brand Admin must be able to log in and access a portal to manage this setting.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-019

#### 6.1.2.2 Dependency Reason

The product registration form is the primary consumer of this validation rule. This story modifies that flow.

## 6.2.0.0 Technical Dependencies

- A backend service for managing brand-specific settings.
- An API endpoint to Create/Read/Update the validation pattern for an authenticated Brand Admin.
- The Product Registration service must be updated to fetch and apply this rule during validation.

## 6.3.0.0 Data Dependencies

- Requires a database schema modification to the 'brands' table (or a related settings table) to store the regex pattern string.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The regex validation on the server-side must complete within 50ms to avoid impacting the product registration API response time.
- Client-side validation should provide feedback in under 200ms.

## 7.2.0.0 Security

- The backend must sanitize all regex pattern inputs to mitigate Regular Expression Denial of Service (ReDoS) attacks. This can be done by using a safe regex library or applying a strict execution timeout to the validation logic.
- The API endpoint for managing the pattern must be protected and only accessible by an authenticated user with the 'Brand Admin' role.

## 7.3.0.0 Usability

- The feature should be intuitive for a semi-technical user. The 'Test' functionality and help text are critical for usability.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Brand Admin portal feature must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires backend API development and database schema changes.
- Requires frontend development in two separate applications: the Brand Admin portal and the User-facing mobile/web app.
- Implementing a user-friendly and safe regex test feature adds complexity.
- Security considerations around ReDoS require careful implementation and testing.

## 8.3.0.0 Technical Risks

- A poorly written regex from a Brand Admin could cause performance degradation. The backend must have safeguards (e.g., timeouts) against this.
- Ensuring consistent validation behavior between the client-side JavaScript regex engine and the server-side Node.js engine.

## 8.4.0.0 Integration Points

- Backend: Product Registration Service (to apply the rule).
- Backend: Brand Management Service (to store the rule).
- Frontend: User Product Registration Form (to apply client-side validation).
- Frontend: Brand Admin Portal (to manage the rule).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify a Brand Admin can create, read, update, and test a validation pattern.
- Verify saving fails for a syntactically incorrect regex.
- Verify a user can register a product with a valid serial number against a configured pattern.
- Verify a user is blocked from registering a product with an invalid serial number.
- Verify registration proceeds normally for brands without a configured pattern.
- Test the ReDoS protection by attempting to save and use a known 'evil' regex pattern.

## 9.3.0.0 Test Data Needs

- Test accounts for Brand Admins.
- Test accounts for regular Users.
- Brands with and without validation patterns configured.
- A list of sample regex patterns and corresponding valid/invalid serial numbers.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Jest/Supertest for backend API tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and passing with sufficient coverage for the new logic.
- An E2E test covering the primary user flow (set pattern -> register product) is implemented and passing.
- Security review for ReDoS vulnerability has been completed and any findings addressed.
- The UI in the Brand Admin portal has been reviewed and approved for usability.
- Help documentation for the feature is created and accessible to Brand Admins.
- The story has been successfully deployed to the production environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- Requires coordinated effort between backend and frontend developers.
- The backend API for managing the pattern should be prioritized to unblock frontend work.
- The two frontend tasks (Brand Portal and User App) can potentially be worked on in parallel once the API is ready.

## 11.4.0.0 Release Impact

This feature enhances data quality for brands that choose to use it. It is not a breaking change and can be released in any upcoming minor or major version.

