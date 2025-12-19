# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-093 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Brand Admin: Manage the list of issue types for my... |
| As A User Story | As a Brand Admin, I want to create, view, update, ... |
| User Persona | Brand Admin: A user responsible for managing their... |
| Business Value | Enables structured data collection for service req... |
| Functional Area | Brand Portal - Service Management |
| Story Theme | Brand Configuration & Data Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

View issue types for a product category

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Brand Admin logged into the brand portal and my brand is associated with the 'Electronics' category

### 3.1.5 When

I navigate to the 'Issue Type Management' page and select the 'Electronics' category

### 3.1.6 Then

I should see a list of all active issue types defined for my brand within the 'Electronics' category, with options to 'Edit' and 'Delete' each one.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Add a new issue type successfully

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Issue Type Management' page with the 'Electronics' category selected

### 3.2.5 When

I click 'Add New', enter 'Won't Power On' into the name field, and click 'Save'

### 3.2.6 Then

The new issue type 'Won't Power On' appears in the list for the 'Electronics' category and a success notification is displayed.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Edit an existing issue type

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

An issue type named 'Screen Flickers' exists for the 'Electronics' category

### 3.3.5 When

I click 'Edit' for 'Screen Flickers', change the name to 'Screen is Flickering', and click 'Save'

### 3.3.6 Then

The issue type is updated to 'Screen is Flickering' in the list and a success notification is displayed.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Delete an issue type (soft delete)

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

An issue type named 'Overheating' exists

### 3.4.5 When

I click 'Delete' for 'Overheating' and confirm the action in the confirmation dialog

### 3.4.6 Then

The 'Overheating' issue type is removed from the active list, a success notification is displayed, and it is no longer available for selection when a user creates a *new* service request.

### 3.4.7 Validation Notes

The record should be soft-deleted (e.g., an 'is_active' flag set to false) in the database to maintain integrity for historical service requests that used this issue type.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to add a duplicate issue type for the same category

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

An issue type named 'Won't Power On' already exists for the 'Electronics' category

### 3.5.5 When

I attempt to add another issue type named 'Won't Power On' to the 'Electronics' category

### 3.5.6 Then

The system must prevent the creation and display a clear validation error message, such as 'This issue type already exists for this category.'

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to save an issue type with an empty name

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am in the process of adding or editing an issue type

### 3.6.5 When

I clear the name field and attempt to save

### 3.6.6 Then

The system must prevent the save and display a validation error, such as 'Issue type name cannot be empty.'

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Cancel a deletion action

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

I have clicked the 'Delete' button for an issue type and a confirmation dialog is displayed

### 3.7.5 When

I click 'Cancel' in the confirmation dialog

### 3.7.6 Then

The dialog closes and the issue type remains in the list, unchanged.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Access control for issue types

### 3.8.3 Scenario Type

Security

### 3.8.4 Given

I am a Brand Admin for 'Brand A'

### 3.8.5 When

I attempt to view or modify issue types for 'Brand B' via a direct API call or URL manipulation

### 3.8.6 Then

The system must deny the request with an appropriate authorization error (e.g., HTTP 403 Forbidden).

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dropdown or list to select the Product Category.
- A data table/list to display existing issue types for the selected category.
- An 'Add New Issue Type' button.
- 'Edit' and 'Delete' buttons/icons for each issue type in the list.
- A modal or form for adding/editing an issue type name.
- A confirmation dialog for the delete action.
- Toast/snackbar notifications for success and error messages.

## 4.2.0 User Interactions

- Selecting a category should dynamically load the corresponding issue types without a full page refresh.
- CRUD operations should be performed via asynchronous API calls, with loading indicators shown during requests.

## 4.3.0 Display Requirements

- The page must clearly indicate which product category is currently selected.
- The list of issue types should be clearly readable and sortable alphabetically.

## 4.4.0 Accessibility Needs

- All controls (buttons, forms, modals) must be keyboard accessible and have appropriate ARIA labels.
- The interface must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

An issue type name must be unique per brand and per product category.

### 5.1.3 Enforcement Point

Backend API validation upon creation or update of an issue type.

### 5.1.4 Violation Handling

The API will return a 409 Conflict (or similar) error with a descriptive message. The frontend will display this message to the user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Deleting an issue type must be a soft delete to preserve historical data integrity.

### 5.2.3 Enforcement Point

The DELETE API endpoint will update an 'is_active' or 'deleted_at' field instead of physically removing the database row.

### 5.2.4 Violation Handling

N/A - This is a system behavior rule.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-085

#### 6.1.1.2 Dependency Reason

Brand Admin must be able to log in to access their portal.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-008

#### 6.1.2.2 Dependency Reason

The association between a brand and its product categories must be established by a Super Admin before a Brand Admin can manage issue types for those categories.

## 6.2.0.0 Technical Dependencies

- Backend API endpoints for CRUD operations on issue types.
- Authentication and authorization middleware to enforce brand-level data isolation.
- Frontend components within the Next.js Brand Portal.

## 6.3.0.0 Data Dependencies

- A new database table is required: `issue_types` with columns for `id`, `brand_id`, `product_category_id`, `name`, and `is_active`.
- A composite unique key on `(brand_id, product_category_id, name)` is required.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for all CRUD operations must be under 250ms (P95).
- Loading the list of issue types after selecting a category should take less than 1 second.

## 7.2.0.0 Security

- All API endpoints must be protected and require authentication as a Brand Admin.
- Strict authorization must be enforced to ensure a Brand Admin can only manage data for their own brand.

## 7.3.0.0 Usability

- The interface for managing issue types should be intuitive and require minimal training.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The Brand Portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a new database schema migration.
- Requires new, secured API endpoints with multi-tenant logic.
- Requires new frontend components and state management.
- The soft-delete logic and its impact on the consumer-facing service request form must be handled carefully.

## 8.3.0.0 Technical Risks

- Ensuring the soft-delete logic correctly hides inactive types from new requests while preserving them in old records.
- Potential for performance degradation if a brand defines a very large number of issue types for a category.

## 8.4.0.0 Integration Points

- The data created here will be consumed by the Service Request Module (FR 3.4) when a user creates a new service request.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Full CRUD lifecycle of an issue type.
- Attempting to create a duplicate issue type.
- Verifying that a soft-deleted issue type does not appear in the dropdown for a new service request.
- Testing access control by logging in as an admin for Brand A and attempting to manipulate data for Brand B.
- Validating form inputs (e.g., empty strings).

## 9.3.0.0 Test Data Needs

- At least two separate Brand Admin accounts for two different brands.
- Multiple product categories associated with each brand.
- Existing service requests linked to an issue type that will be deleted, to verify historical data is unaffected.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest and Supertest for backend integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing completed successfully for all new API endpoints
- User interface reviewed and approved by UX/Product Owner
- Performance requirements verified
- Security requirements validated, including multi-tenancy checks
- Documentation for the new API endpoints is created/updated in OpenAPI spec
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story is a prerequisite for advanced service analytics features.
- The backend API and database changes should be completed before or in parallel with the frontend work.

## 11.4.0.0 Release Impact

This feature enhances the brand's ability to manage their service data. It is a key component for delivering the promised analytics capabilities to brands.

