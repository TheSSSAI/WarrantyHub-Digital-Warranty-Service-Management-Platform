# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-032 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Delete a registered product from my list |
| As A User Story | As a registered user, I want to delete a product f... |
| User Persona | Registered Consumer using the web or mobile applic... |
| Business Value | Improves user experience by allowing users to main... |
| Functional Area | Product Management |
| Story Theme | User Account & Data Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successful deletion of a product

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A logged-in user is viewing their list of registered products

### 3.1.5 When

The user selects the 'Delete' option for a product and confirms the action in the confirmation dialog

### 3.1.6 Then

The product is immediately removed from the user's visible product list, a success message 'Product successfully deleted' is displayed, and the backend record is marked as soft-deleted.

### 3.1.7 Validation Notes

Verify via UI that the product is gone. Verify via API call (e.g., GET /products) that the deleted product is no longer in the payload. Verify in the database that the product record has its `deleted_at` timestamp populated.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User cancels the deletion process

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

A logged-in user has initiated the delete action for a product and is viewing the confirmation dialog

### 3.2.5 When

The user selects the 'Cancel' button or closes the dialog

### 3.2.6 Then

The dialog closes, no deletion action is performed, and the product remains visible in their product list.

### 3.2.7 Validation Notes

Verify that the product is still present in the UI and that no API call to the delete endpoint was made.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempting to delete a product with an active service request

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A logged-in user is viewing a product that has an active service request (status is not 'Resolved' or 'Closed')

### 3.3.5 When

The user selects the 'Delete' option for that product

### 3.3.6 Then

The deletion is blocked, and an error message is displayed: 'This product cannot be deleted because it has an active service request. Please resolve or cancel the request first.'

### 3.3.7 Validation Notes

Set up a product with an active service request. Attempt to delete it and verify the specific error message is shown and the product remains in the list.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to delete a product with a pending ownership transfer

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A logged-in user is viewing a product for which they have initiated an ownership transfer that has not yet been accepted or rejected

### 3.4.5 When

The user selects the 'Delete' option for that product

### 3.4.6 Then

The deletion is blocked, and an error message is displayed: 'This product cannot be deleted while an ownership transfer is pending.'

### 3.4.7 Validation Notes

Set up a product with a pending transfer. Attempt to delete it and verify the error message and that the product is not deleted.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Backend data integrity after deletion

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

A user has successfully confirmed the deletion of a product

### 3.5.5 When

The backend processes the delete request

### 3.5.6 Then

The corresponding record in the `products` table is updated to mark it as deleted (e.g., `deleted_at` is set to the current timestamp) but the record is not physically removed from the database.

### 3.5.7 Validation Notes

Requires direct database inspection or an admin API to verify the state of the soft-deleted record.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Deletion fails due to a server or network error

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A user has confirmed the deletion of a product

### 3.6.5 When

The API call to the delete endpoint fails due to a network issue or a 5xx server error

### 3.6.6 Then

An appropriate error message is displayed to the user (e.g., 'Failed to delete product. Please try again.'), and the product remains in their list.

### 3.6.7 Validation Notes

Use browser developer tools or a proxy to simulate a failed API request and verify the UI response.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Delete' option for each product, likely within a kebab (three-dot) menu to prevent accidental clicks.
- A modal confirmation dialog with a clear warning message, a 'Confirm Delete' button (destructive action style, e.g., red), and a 'Cancel' button.
- A non-intrusive success notification (e.g., toast or snackbar) upon successful deletion.

## 4.2.0 User Interactions

- User taps 'Delete' -> Confirmation modal appears.
- User taps 'Confirm Delete' -> Modal closes, API call is made, list updates, success toast appears.
- User taps 'Cancel' -> Modal closes, no change.

## 4.3.0 Display Requirements

- The confirmation dialog must explicitly name the product being deleted (e.g., 'Are you sure you want to delete [Product Name]?').
- The product list must update in real-time after a successful deletion.

## 4.4.0 Accessibility Needs

- The delete icon/button must have an accessible name (e.g., 'aria-label="Delete [Product Name]"').
- The confirmation dialog must trap focus and be fully navigable via keyboard.
- All text must meet WCAG 2.1 AA contrast ratios.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A product with an active (not 'Resolved' or 'Closed') service request cannot be deleted.

### 5.1.3 Enforcement Point

Backend API, before performing the soft-delete operation.

### 5.1.4 Violation Handling

The API should return a 409 Conflict (or 400 Bad Request) status with a clear error message. The frontend must display this message to the user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A product with a pending ownership transfer cannot be deleted.

### 5.2.3 Enforcement Point

Backend API, before performing the soft-delete operation.

### 5.2.4 Violation Handling

The API should return a 409 Conflict (or 400 Bad Request) status with a clear error message. The frontend must display this message to the user.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Product deletion must be a soft delete to preserve data for analytics and historical records.

### 5.3.3 Enforcement Point

Backend API database transaction.

### 5.3.4 Violation Handling

The system must perform an UPDATE operation, not a DELETE FROM operation on the database table.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

A user must be able to register a product before they can delete it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-024

#### 6.1.2.2 Dependency Reason

The UI for deleting a product will be located on the product list or product detail page.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-117

#### 6.1.3.2 Dependency Reason

The delete API endpoint must be protected by RBAC to ensure a user can only delete their own products.

## 6.2.0.0 Technical Dependencies

- A database schema that supports soft deletes (e.g., a nullable `deleted_at` timestamp column on the products table).
- A backend API endpoint (e.g., DELETE /api/v1/products/{productId}) that handles the soft-delete logic and business rule validation.

## 6.3.0.0 Data Dependencies

- Requires access to the service request and product transfer modules to check for active/pending states.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the delete request should be under 500ms (P95).
- The UI update after deletion should feel instantaneous to the user (<200ms).

## 7.2.0.0 Security

- The API endpoint must validate that the authenticated user is the owner of the product being deleted.
- The action must be logged in the system's audit trail (as per US-114), including user ID, product ID, and timestamp.

## 7.3.0.0 Usability

- The delete action must require explicit confirmation to prevent accidental data loss.
- Feedback (success or error) must be immediate and clear.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported web browsers and mobile OS versions as defined in the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend logic requires checking for dependencies in other modules (Service Requests, Transfers) before allowing deletion.
- All existing queries for fetching user products across the application must be updated to filter out soft-deleted items (e.g., `WHERE deleted_at IS NULL`).
- Requires coordination between frontend (UI/UX for confirmation) and backend (API logic).

## 8.3.0.0 Technical Risks

- Risk of incomplete data filtering: A query somewhere in the system might forget to exclude soft-deleted products, leading to 'ghost' data appearing in reports or other features.
- Potential for race conditions if a service request is created at the exact moment a user tries to delete the product.

## 8.4.0.0 Integration Points

- Product Service: To perform the soft-delete.
- Service Request Service: To check for active requests.
- User Management/Transfer Service: To check for pending transfers.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify successful deletion and UI update.
- Verify cancellation of deletion.
- Verify deletion is blocked for a product with an active service request.
- Verify deletion is blocked for a product with a pending transfer.
- Verify that a user cannot delete another user's product via API manipulation.
- Verify that soft-deleted products do not appear in any user-facing lists or searches.

## 9.3.0.0 Test Data Needs

- A test user account with multiple registered products.
- A product with no dependencies.
- A product with an active service request.
- A product with a pending ownership transfer.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Jest/Supertest for backend API tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing.
- Code reviewed and approved by at least one other developer.
- Unit and integration tests are written and achieve >80% coverage for the new logic.
- E2E tests for the happy path and key error conditions are implemented and passing.
- API endpoint is secured, checking for user ownership of the product.
- All existing data queries for user products are confirmed to exclude soft-deleted items.
- UI/UX has been reviewed and approved by the design/product owner.
- The action is correctly logged in the audit trail.
- Documentation for the API endpoint is updated in the OpenAPI specification.
- Story deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story has a wide-reaching impact on data retrieval. A thorough code review is needed to ensure all product queries are updated.
- Dependent on the implementation of service requests (US-036) and transfers (US-033) to fully implement the blocking logic.

## 11.4.0.0 Release Impact

This is a core product management feature that improves user data hygiene. It should be included in an early release after the basic product registration is live.

