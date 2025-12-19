# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-006 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: Create a new product category |
| As A User Story | As a Super Admin, I want to create a new product c... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Enables a structured and scalable product taxonomy... |
| Functional Area | Platform Administration |
| Story Theme | Super Admin & Onboarding Module |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully create a new top-level product category

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin on the 'Manage Product Categories' page

### 3.1.5 When

I open the 'Create Category' form, enter a unique 'Name' (e.g., 'Electronics'), an optional 'Description', leave the 'Parent Category' field as 'None', and submit the form

### 3.1.6 Then

The system validates the data, creates a new top-level category in the database, displays a success notification (e.g., 'Category "Electronics" created successfully'), and the new category appears in the main list of categories.

### 3.1.7 Validation Notes

Verify the new record exists in the `product_categories` table with a `parent_id` of NULL. The UI should update to show the new category.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully create a new sub-category under an existing parent

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in Super Admin on the 'Manage Product Categories' page, and a category named 'Electronics' exists

### 3.2.5 When

I open the 'Create Category' form, enter a unique 'Name' (e.g., 'Mobile Phones'), select 'Electronics' from the 'Parent Category' dropdown, and submit the form

### 3.2.6 Then

The system creates a new category with 'Electronics' as its parent, displays a success notification, and 'Mobile Phones' appears as a sub-category of 'Electronics' in the UI.

### 3.2.7 Validation Notes

Verify the new record exists in the `product_categories` table with a `parent_id` pointing to the 'Electronics' category's ID.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to create a category with a name that already exists at the same level

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in Super Admin, and a top-level category named 'Electronics' already exists

### 3.3.5 When

I attempt to create another top-level category with the name 'Electronics'

### 3.3.6 Then

The system rejects the submission and displays a clear, field-specific error message, such as 'A category with this name already exists at this level.' The category is not created.

### 3.3.7 Validation Notes

This should be enforced by a database unique constraint on `(name, parent_id)`. The API should return a 409 Conflict or 400 Bad Request status.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to create a category with a missing name

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am a logged-in Super Admin on the 'Create Category' form

### 3.4.5 When

I leave the 'Name' field blank and attempt to submit the form

### 3.4.6 Then

The form submission is prevented, and a validation error message (e.g., 'Category Name is required') is displayed next to the 'Name' field.

### 3.4.7 Validation Notes

Test for empty strings, strings with only whitespace, and null values. This should be validated both on the frontend and backend.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to create a category with a name exceeding the maximum length

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am a logged-in Super Admin on the 'Create Category' form, and the maximum name length is defined (e.g., 100 characters)

### 3.5.5 When

I enter a name longer than the maximum allowed length and attempt to submit the form

### 3.5.6 Then

The form submission is prevented, and a validation error message (e.g., 'Name cannot exceed 100 characters') is displayed.

### 3.5.7 Validation Notes

Verify the database schema enforces the character limit and the API validation middleware rejects the request.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Create New Category' button on the category management page.
- A modal or dedicated form for creating a category.
- A required text input field for 'Category Name'.
- An optional textarea for 'Description'.
- A searchable dropdown or select list for 'Parent Category', populated with existing categories and a 'None' option for top-level.
- 'Save' and 'Cancel' buttons.
- Success and error notification components (toasts/alerts).

## 4.2.0 User Interactions

- Clicking 'Create New Category' opens the creation form.
- The 'Parent Category' dropdown should be searchable if the number of categories is expected to be large.
- Submitting the form triggers validation and an API call.
- The form closes upon successful submission or cancellation.

## 4.3.0 Display Requirements

- The list of categories should visually represent the hierarchy (e.g., using indentation or a tree view).
- Validation errors must be displayed inline, next to the relevant form field.

## 4.4.0 Accessibility Needs

- All form elements must have associated `<label>` tags.
- The form must be fully navigable and operable using only a keyboard.
- Focus management should be handled correctly when the form/modal opens and closes.
- All UI elements must meet WCAG 2.1 Level AA contrast requirements.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-CAT-001

### 5.1.2 Rule Description

A product category name must be unique within its direct parent. Two top-level categories cannot have the same name, and two sub-categories under the same parent cannot have the same name.

### 5.1.3 Enforcement Point

Backend API validation and Database unique constraint.

### 5.1.4 Violation Handling

The API will reject the request with a 409 Conflict status code and a descriptive error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-CAT-002

### 5.2.2 Rule Description

A product category cannot be its own parent or a descendant of itself (circular dependency).

### 5.2.3 Enforcement Point

Backend service logic during category creation and updates.

### 5.2.4 Violation Handling

The API will reject the request with a 400 Bad Request status code and an error message explaining the circular dependency.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Super Admin must be able to log in to access any administrative functionality.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

SA-Portal-Shell

#### 6.1.2.2 Dependency Reason

A basic Super Admin portal shell with navigation is required to host the 'Manage Product Categories' page.

## 6.2.0.0 Technical Dependencies

- A database schema for `product_categories` with columns for `id`, `name`, `description`, and a self-referencing `parent_id`.
- A backend API endpoint (e.g., `POST /api/v1/admin/categories`) protected by Role-Based Access Control (RBAC) for the 'Super Admin' role.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response for creating a category should be under 250ms (P95).
- The 'Parent Category' dropdown should load and be interactive within 1 second, even with 1,000+ existing categories.

## 7.2.0.0 Security

- The API endpoint must be protected and accessible only to authenticated users with the 'Super Admin' role.
- All input must be sanitized to prevent XSS and other injection attacks.

## 7.3.0.0 Usability

- The process of creating a category should be intuitive and require minimal instruction.
- Error messages must be clear and actionable for the user.

## 7.4.0.0 Accessibility

- The feature must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The Super Admin portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Standard CRUD operation.
- Requires careful implementation of hierarchical data validation (uniqueness at level, no circular dependencies).
- Database schema design for the self-referencing table.

## 8.3.0.0 Technical Risks

- Inefficient querying of hierarchical data could cause performance issues as the number of categories grows. Consider using appropriate indexing on `parent_id`.

## 8.4.0.0 Integration Points

- Backend: NestJS service for business logic, PostgreSQL database for storage.
- Frontend: Next.js page within the Super Admin portal, Zustand for state management.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Create a top-level category.
- Create a sub-category.
- Create a category with a multi-level hierarchy (e.g., A -> B -> C).
- Attempt to create a duplicate category at the top level.
- Attempt to create a duplicate category at a sub-level.
- Attempt to create a category with invalid data (empty name, name too long).
- Verify that only a Super Admin can access the creation endpoint.

## 9.3.0.0 Test Data Needs

- A test user account with the 'Super Admin' role.
- A set of pre-existing categories to test sub-category creation and duplicate validation.

## 9.4.0.0 Testing Tools

- Jest & Supertest (Backend)
- Jest & React Testing Library (Frontend)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in the staging environment.
- Backend and frontend code has been peer-reviewed and merged into the main branch.
- Unit test coverage for the new logic meets the project standard (e.g., >80%).
- Integration tests for the API endpoint are implemented and passing.
- E2E tests simulating the user flow are implemented and passing.
- API documentation (OpenAPI/Swagger) is updated for the new endpoint.
- The feature has been reviewed for and meets security and accessibility requirements.
- The feature is deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story and a prerequisite for other stories like US-007 (Manage Categories) and US-008 (Associate Brand to Category). It should be prioritized in an early sprint.

## 11.4.0.0 Release Impact

This feature is critical for the initial platform setup and must be included in the first release (MVP).

