# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-030 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Edit the details of a registered product |
| As A User Story | As a registered user, I want to edit the details o... |
| User Persona | Consumer / End-User |
| Business Value | Improves data accuracy, enhances user satisfaction... |
| Functional Area | Product Management |
| Story Theme | User Product Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Editing a product with no service history

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged in and is viewing the details of a registered product that has never had a service request raised

### 3.1.5 When

the user initiates the 'Edit' action, modifies an editable field (e.g., Model), and saves the changes

### 3.1.6 Then

the system must validate and save the updated information, display a success confirmation message, and the product details view must reflect the new information.

### 3.1.7 Validation Notes

Verify via UI and by checking the database record for the product has been updated.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Attempting to edit a product with an existing service history

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

a user is logged in and is viewing the details of a registered product that has one or more service requests associated with it

### 3.2.5 When

the user initiates the 'Edit' action

### 3.2.6 Then

the system must display the edit form where the critical fields ('Serial Number', 'Purchase Date', 'Model') are visible but are in a read-only/disabled state, preventing modification.

### 3.2.7 Validation Notes

Verify that the input fields for critical data are disabled in the DOM and do not accept user input.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

A message explains why critical fields are locked

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

a user is viewing the edit form for a product with a service history

### 3.3.5 When

the user sees the disabled critical fields

### 3.3.6 Then

a clear, user-friendly message or tooltip must be displayed explaining that these fields are locked because a service history exists for the product.

### 3.3.7 Validation Notes

Check for the presence and content of the explanatory text in the UI.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Editing non-critical fields on a locked product

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a user is on the edit form for a product with a service history

### 3.4.5 When

the user modifies a non-critical, editable field (e.g., a user-defined nickname or category) and saves the changes

### 3.4.6 Then

the system must save the changes to the non-critical field and display a success message, while the critical fields remain unchanged.

### 3.4.7 Validation Notes

Verify in the database that only the non-critical field was updated.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Canceling the edit action

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

a user is on the product edit form and has made unsaved changes

### 3.5.5 When

the user clicks the 'Cancel' button or action

### 3.5.6 Then

the system must discard all changes, close the edit form, and return the user to the product details view, which displays the original, unmodified data.

### 3.5.7 Validation Notes

Verify that no API call to update the data is made and the UI reverts to the original state.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Backend validation of the edit request for a locked product

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a product has a service history, making its critical details non-editable

### 3.6.5 When

a malicious or malformed API request is sent to the backend attempting to change a critical field (e.g., Serial Number)

### 3.6.6 Then

the backend must reject the request with an appropriate error status (e.g., 403 Forbidden or 400 Bad Request) and a descriptive error message, and no changes must be committed to the database.

### 3.6.7 Validation Notes

This must be tested at the API level using a tool like Postman or an integration test.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Saving with invalid data

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a user is on the product edit form for an unlocked product

### 3.7.5 When

the user enters invalid data (e.g., a purchase date in the future) and attempts to save

### 3.7.6 Then

the system must prevent the save, display an inline validation error message next to the invalid field, and keep the form open for correction.

### 3.7.7 Validation Notes

Test various invalid inputs like future dates, malformed serial numbers, and empty required fields.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Edit' button/icon on the product details view.
- A form/modal for editing product details, pre-populated with existing data.
- Standard input fields for text, dates, etc.
- Read-only/disabled display for locked fields.
- A 'Save' or 'Update' button to submit changes.
- A 'Cancel' button or 'X' icon to discard changes.
- Inline validation error messages.
- Success/error notification toasts or banners.

## 4.2.0 User Interactions

- User clicks 'Edit' to open the form.
- Locked fields are visually distinct (e.g., greyed out) and do not respond to clicks or keyboard input.
- Hovering over a locked field may display a tooltip explaining why it's locked.
- User clicks 'Save' to submit the form.
- User clicks 'Cancel' to exit without saving.

## 4.3.0 Display Requirements

- The edit form must clearly label all fields.
- The current values for all product attributes must be pre-filled in the form.
- The reason for locked fields must be clearly communicated to the user.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels for screen readers.
- Disabled fields must be correctly identified with `aria-disabled='true'`.
- Validation errors must be programmatically associated with their respective fields.
- All interactive elements must be keyboard-navigable and operable.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'Critical product details (Serial Number, Purchase Date, Model) become non-editable after the first service request has been raised for that product.', 'enforcement_point': 'Both Frontend (disabling UI elements) and Backend (API validation before database write).', 'violation_handling': 'Frontend: UI prevents input. Backend: API request is rejected with a 4xx error code.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

A product must be created before it can be edited.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-024

#### 6.1.2.2 Dependency Reason

User needs to be able to view their list of products to select one for editing.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-036

#### 6.1.3.2 Dependency Reason

The locking mechanism is dependent on the existence of service requests, which are created in this story.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint to fetch a single product's details (`GET /api/v1/products/{productId}`).
- Backend API endpoint to update a product's details (`PUT /api/v1/products/{productId}`).
- Database schema supporting products and their relationship to service requests.

## 6.3.0.0 Data Dependencies

- Requires access to product records and their associated service request history.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to update a product should respond within 250ms (P95).
- The edit form should load with pre-populated data in under 500ms.

## 7.2.0.0 Security

- The API endpoint must ensure the authenticated user owns the product they are attempting to edit.
- The backend must re-validate the 'is locked' status of the product upon receiving the update request, not trusting the client.
- All user-provided input must be sanitized to prevent XSS attacks.

## 7.3.0.0 Usability

- The distinction between editable and locked fields must be immediately obvious.
- Error messages must be clear and guide the user toward a solution.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) and mobile platforms (iOS, Android).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Conditional logic on both frontend and backend to check for service request history.
- Requires a database query that checks for relationships before allowing an update.
- Frontend state management for the form, including handling both editable and read-only states.
- Robust backend validation is critical to enforce the business rule at the API level.

## 8.3.0.0 Technical Risks

- Potential for race conditions if a service request is created while a user has the edit form open. The backend must be the final authority on the product's locked status.
- Inconsistent application of the locking rule between frontend and backend could lead to a poor user experience or security vulnerabilities.

## 8.4.0.0 Integration Points

- User Authentication service to verify user identity and ownership.
- Product Service to fetch and update product data.
- Service Request Service to check for a product's service history.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Test editing a product with no service history.
- Test attempting to edit a product with one or more service requests.
- Test API-level attempts to bypass the editing restriction.
- Test cancellation of an edit.
- Test form validation for all editable fields.

## 9.3.0.0 Test Data Needs

- A test user account.
- At least one registered product with no service history.
- At least one registered product with one or more associated service requests.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% coverage for new code
- E2E tests for both locked and unlocked scenarios are created and passing
- User interface reviewed and approved by UX/Product Owner
- Backend security checks (ownership, locking logic) are verified
- Accessibility requirements (WCAG 2.1 AA) are met and verified
- Documentation for the API endpoint is updated in the OpenAPI specification
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for data management. Its priority is high as it directly impacts data quality and user experience.
- Ensure prerequisite stories are completed in a prior or the same sprint.

## 11.4.0.0 Release Impact

- This feature is essential for the initial release as it provides a basic data management capability for users.

