# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-015 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Registers a Product Manually via Form Input |
| As A User Story | As a Consumer, I want to manually register a produ... |
| User Persona | Consumer / End-User |
| Business Value | Enables the core functionality of the platform by ... |
| Functional Area | Product Management |
| Story Theme | User Product Onboarding |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful product registration with all required fields

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is logged in and on the 'Add New Product' screen

### 3.1.5 When

The user selects an approved Brand, enters a Model, a Serial Number, a valid Purchase Date, and a Warranty Duration

### 3.1.6 Then

The system validates the inputs, saves the product to the user's account, and displays a success message, 'Product registered successfully.'

### 3.1.7 Validation Notes

Verify that a new product record is created in the database linked to the correct user ID. The warranty expiry date should be correctly calculated as (Purchase Date + Warranty Duration).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Attempt to submit form with missing required fields

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

The user is on the 'Add New Product' screen

### 3.2.5 When

The user attempts to submit the form without filling in a mandatory field (e.g., Brand or Serial Number)

### 3.2.6 Then

The form submission is prevented, and a clear, inline validation error message (e.g., 'This field is required') is displayed next to the corresponding empty field.

### 3.2.7 Validation Notes

Test each mandatory field individually to ensure validation triggers correctly. The submit button should ideally be disabled until all required fields are populated.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to submit form with an invalid purchase date

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The user is on the 'Add New Product' screen

### 3.3.5 When

The user selects a Purchase Date that is in the future

### 3.3.6 Then

The form submission is prevented, and an inline validation error message is displayed: 'Purchase date cannot be in the future.'

### 3.3.7 Validation Notes

The date picker component should be configured to disallow selection of future dates.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Warranty duration is auto-populated for a known product model

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

The user is on the 'Add New Product' screen and a master product model exists with a default warranty duration

### 3.4.5 When

The user selects the Brand and enters the Model name for that known product

### 3.4.6 Then

The 'Warranty Duration' field is automatically filled with the predefined value and becomes non-editable.

### 3.4.7 Validation Notes

Requires US-012 to be implemented. Test with a model that exists in the master data and one that does not to verify the conditional logic.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User enters warranty duration manually for an unknown product model

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

The user is on the 'Add New Product' screen

### 3.5.5 When

The user selects a Brand and enters a Model name that does not exist in the master product data

### 3.5.6 Then

The 'Warranty Duration' field remains empty and editable, allowing the user to input the value manually.

### 3.5.7 Validation Notes

Verify that the field is an active input field and accepts a numeric value.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to register a duplicate product

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

The user has already registered a product with a specific Brand and Serial Number

### 3.6.5 When

The user attempts to register a new product with the exact same Brand and Serial Number

### 3.6.6 Then

The system prevents the creation and displays a clear error message, such as 'A product with this Brand and Serial Number is already registered to your account.'

### 3.6.7 Validation Notes

The uniqueness constraint should be a combination of user_id, brand_id, and serial_number. This check must be performed on the server-side.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A form titled 'Register a New Product'
- A searchable dropdown for 'Brand'
- A text input field for 'Model'
- A text input field for 'Serial Number'
- A date picker component for 'Purchase Date'
- A numeric input field for 'Warranty Duration' (e.g., in months)
- A dropdown for 'Product Category'
- A 'Save Product' or 'Register' button
- Inline error message containers for each field

## 4.2.0 User Interactions

- The 'Brand' dropdown should be populated with the list of approved brands from the system.
- The 'Purchase Date' picker must not allow selection of future dates.
- The 'Save Product' button should be disabled until all mandatory fields are valid.
- Upon successful submission, the user should be redirected to their product list or the new product's detail page and see a success toast/notification.

## 4.3.0 Display Requirements

- All mandatory fields must be clearly marked (e.g., with an asterisk *).
- Validation errors must be displayed in a contrasting color (e.g., red) and be easy to understand.

## 4.4.0 Accessibility Needs

- The form must comply with WCAG 2.1 Level AA.
- All form fields must have associated `<label>` tags.
- The form must be fully navigable and operable using a keyboard.
- Error messages must be programmatically associated with their respective form fields.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user cannot register a product with the same Brand and Serial Number more than once.

### 5.1.3 Enforcement Point

Server-side validation upon form submission.

### 5.1.4 Violation Handling

API returns a 409 Conflict error with a user-friendly message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The Purchase Date cannot be a date in the future.

### 5.2.3 Enforcement Point

Client-side (in date picker) and server-side validation.

### 5.2.4 Violation Handling

API returns a 400 Bad Request error; UI displays an inline error message.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

The Brand selected must be from the list of brands approved by the Super Admin.

### 5.3.3 Enforcement Point

Client-side (populating dropdown) and server-side (validating submitted brand ID).

### 5.3.4 Violation Handling

API returns a 400 Bad Request error if an invalid brand ID is submitted.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

User must have an account to register a product.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-096

#### 6.1.2.2 Dependency Reason

User must be logged in (authenticated) to access the registration form.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-002

#### 6.1.3.2 Dependency Reason

The system must contain at least one approved brand to populate the 'Brand' selection list.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-010

#### 6.1.4.2 Dependency Reason

The system must have a list of product categories for the user to select from.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., POST /api/v1/products) to receive and process the product registration data.
- A backend API endpoint (e.g., GET /api/v1/brands) to provide the list of approved brands.
- Database tables for `users`, `products`, `brands`, and `warranties` must be defined and migrated.

## 6.3.0.0 Data Dependencies

- Availability of approved brand data in the database.
- Availability of product category master data.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the form submission must be < 500ms (P95).
- The API call to fetch the list of brands should respond in < 250ms (P95).

## 7.2.0.0 Security

- All user-provided input must be sanitized on the server-side to prevent XSS and SQL Injection attacks.
- The API endpoint must be protected and only accessible by authenticated users.
- The user should only be able to register products for their own account (enforced by checking JWT token).

## 7.3.0.0 Usability

- The form should be intuitive and easy to complete with minimal cognitive load.
- Error messages should be clear, concise, and helpful.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web form must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- The mobile form must function correctly on iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing robust client-side and server-side validation for all fields.
- Conditional logic to auto-populate and disable the 'Warranty Duration' field based on the selected Brand/Model.
- Requires coordinated effort between frontend (Web and Mobile) and backend teams.
- Creation of new API endpoints and database schema modifications.

## 8.3.0.0 Technical Risks

- Potential for inconsistent validation logic between client and server if not carefully managed.
- Performance of the brand/model lookup for auto-populating warranty could be slow if not indexed properly.

## 8.4.0.0 Integration Points

- User authentication service (Azure AD B2C) to verify user identity.
- Database (Azure PostgreSQL) for data persistence.
- Frontend applications (Next.js, React Native) will consume the backend APIs.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful product creation with valid data.
- Test all validation rules for each input field (required, format, range).
- Test the duplicate product registration logic.
- Test the conditional logic for the 'Warranty Duration' field with both known and unknown models.
- Verify API security by attempting to submit data without authentication or for another user.

## 9.3.0.0 Test Data Needs

- Test user accounts.
- A list of at least 5 approved brands in the database.
- At least 2 master product models with pre-configured warranty durations.
- A list of product categories.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E testing on the web.
- Postman or similar for direct API testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing between frontend and backend completed successfully
- User interface reviewed and approved for both web and mobile
- Performance requirements verified via API load testing
- Security requirements validated (input sanitization, endpoint protection)
- API documentation (Swagger/OpenAPI) is generated and up-to-date
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the product management feature set.
- Requires prerequisite stories (User Auth, Brand Management) to be completed or their data to be mocked.
- Requires both frontend and backend development resources.

## 11.4.0.0 Release Impact

- This feature is critical for the initial pilot (Phase 1) launch. Without it, users cannot use the core application.

