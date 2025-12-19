# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-027 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Deletes a Registered Product |
| As A User Story | As a User, I want to delete a product I've registe... |
| User Persona | The 'User' or 'Consumer' who manages their persona... |
| Business Value | Improves user experience by providing control over... |
| Functional Area | User Product Management |
| Story Theme | Product Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful Deletion of a Product (Happy Path)

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of a registered product that has no active service requests

### 3.1.5 When

I select the 'Delete Product' option and then confirm my choice in the confirmation dialog

### 3.1.6 Then

a success notification is displayed, the product is immediately removed from my list of registered products, and I am returned to the main product list screen.

### 3.1.7 Validation Notes

Verify via UI that the product is no longer visible. Check the database to confirm the product record has its 'deleted_at' timestamp set or 'is_deleted' flag set to true.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User Cancels the Deletion

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

I am a logged-in user viewing the details of a registered product

### 3.2.5 When

I select the 'Delete Product' option but then select 'Cancel' in the confirmation dialog

### 3.2.6 Then

the confirmation dialog closes, no change is made, and the product remains in my list of registered products.

### 3.2.7 Validation Notes

Verify that no API call to delete the product is made and the UI state remains unchanged.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to Delete a Product with an Active Service Request

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in user viewing the details of a registered product that has an active service request (status is not 'Resolved' or 'Closed')

### 3.3.5 When

I attempt to delete the product

### 3.3.6 Then

the system prevents the deletion and displays an informative error message, such as 'This product cannot be deleted while a service request is in progress.'

### 3.3.7 Validation Notes

The 'Delete Product' button may be disabled, or if enabled, the API call should fail with a specific error code (e.g., 409 Conflict) which the client displays to the user.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Backend Verification of Soft Delete

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a user has successfully performed the delete action on a product

### 3.4.5 When

an administrator or system process queries the database

### 3.4.6 Then

the product record still exists but is marked as deleted (e.g., 'deleted_at' is not null) and is excluded from all standard user-facing queries and brand analytics counts.

### 3.4.7 Validation Notes

Requires direct database inspection or using an admin tool to verify the record's state. Also verify that API endpoints for listing products for the user exclude this record.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Unauthorized Deletion Attempt

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

User A is logged in and knows the ID of a product belonging to User B

### 3.5.5 When

User A attempts to make a direct API call to delete User B's product

### 3.5.6 Then

the API must return an authorization error (e.g., 403 Forbidden or 404 Not Found) and the product must not be deleted.

### 3.5.7 Validation Notes

This must be tested at the integration or API testing level, simulating a malicious request.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Delete Product' button or menu item, clearly visible on the product details screen.
- A confirmation modal/dialog with 'Confirm' and 'Cancel' actions.
- A temporary success notification (toast/snackbar) upon successful deletion.
- An error message display area for failed deletions.

## 4.2.0 User Interactions

- User taps 'Delete Product' to open the confirmation modal.
- The confirmation modal must clearly state the consequence of the action (e.g., 'Are you sure you want to permanently delete this product? This action cannot be undone.').
- Upon successful deletion, the user is navigated away from the now-deleted product's detail page, typically back to their main product list.

## 4.3.0 Display Requirements

- The deleted product must no longer appear in the user's product list, invoice vault search results, or any other user-facing list.
- If a product has an active service request, the 'Delete' button should ideally be disabled with a tooltip explaining why.

## 4.4.0 Accessibility Needs

- The confirmation dialog must be keyboard-navigable and screen-reader accessible.
- The 'Delete' button must have a proper accessible name.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A product with an active (not 'Resolved' or 'Closed') service request cannot be deleted.

### 5.1.3 Enforcement Point

Backend API (service layer) before performing the delete operation.

### 5.1.4 Violation Handling

The API should reject the request with an appropriate error code (e.g., 409 Conflict) and a descriptive error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Product deletion must be a soft delete to preserve historical data for analytics, as per SRS section 3.2.

### 5.2.3 Enforcement Point

Backend API (data access layer).

### 5.2.4 Violation Handling

The system must perform an UPDATE operation to mark the record as deleted, not a physical DELETE from the database.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

A user must be able to register a product before they can delete it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-032

#### 6.1.2.2 Dependency Reason

A user must be able to view their list of products and select one to see its details, where the delete option will be located.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-095

#### 6.1.3.2 Dependency Reason

User registration and authentication are required to ensure the user is authorized to delete the product.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint for deleting (soft-deleting) a product.
- The database schema for the 'products' table must support soft deletion (e.g., a nullable 'deleted_at' timestamp column).
- All existing and future backend services that query for products must be updated to filter out soft-deleted records by default.

## 6.3.0.0 Data Dependencies

- Test user accounts must exist with registered products, some of which have active service requests and some that do not.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to delete a product should respond within 250ms (P95), as per general system performance requirements.

## 7.2.0.0 Security

- The delete endpoint must be protected and only accessible by the authenticated owner of the product. This must be enforced at the API level.
- The system must prevent Mass Assignment vulnerabilities on the update operation for the soft delete.

## 7.3.0.0 Usability

- The consequence of the deletion action must be clearly communicated to the user in the confirmation dialog to prevent accidental data loss.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported mobile OS versions (iOS 14+, Android 8.0+) and web browsers (latest stable Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The primary complexity is not the delete action itself, but the cross-cutting concern of ensuring all product-fetching queries throughout the entire application are updated to filter out soft-deleted records (`WHERE deleted_at IS NULL`).
- Implementing the business rule to check for active service requests requires interaction with the service request data model/microservice.
- If this is the first feature to implement soft-delete, it will require establishing a new data access pattern.

## 8.3.0.0 Technical Risks

- Risk of 'zombie' data: A soft-deleted product might reappear in a list or report if a developer forgets to add the `WHERE deleted_at IS NULL` clause to a new or existing query.
- In a microservices architecture, ensuring that all services correctly handle the soft-deleted state of a product can be challenging.

## 8.4.0.0 Integration Points

- User Authentication Service (Azure AD B2C) for authorization.
- Product Database (Azure PostgreSQL) for the soft-delete update.
- Service Request Service/Database to check for active requests.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify successful deletion and removal from UI.
- Verify cancellation of deletion.
- Verify deletion is blocked for products with active service requests.
- Verify that a user cannot delete another user's product (API level).
- Regression test key areas like the Brand Dashboard and Invoice Vault to ensure they correctly handle (exclude) soft-deleted products.

## 9.3.0.0 Test Data Needs

- A test user with multiple products.
- At least one product linked to an active service request.
- At least one product with no service history.
- A second test user account to test for authorization failures.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit tests.
- Jest for backend unit/integration tests.
- Cypress for E2E testing.
- Postman or a similar tool for direct API security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests implemented for both frontend and backend logic, with coverage meeting the project standard (80%)
- Integration tests completed to verify the API and database interaction, including the soft-delete filter
- E2E tests successfully run to validate the complete user flow
- Security requirements validated, specifically preventing unauthorized deletion
- All existing API endpoints that return lists of products have been updated to exclude soft-deleted items
- Documentation for the API endpoint is updated/generated
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story introduces a soft-delete pattern. The effort estimation assumes this pattern needs to be established and applied to all relevant product queries, which may touch multiple parts of the codebase. If the pattern already exists, this could be a 2-point story.
- Requires coordination between frontend and backend developers.

## 11.4.0.0 Release Impact

Provides a fundamental data management feature for users. Its absence would be a noticeable gap in functionality.

