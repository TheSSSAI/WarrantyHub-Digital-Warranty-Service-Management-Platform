# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-011 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Manages Service Issue Types and Catego... |
| As A User Story | As a Super Admin, I want to create, view, update, ... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Enables standardized data collection for service r... |
| Functional Area | System Administration & Master Data Management |
| Story Theme | Platform Configuration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-011-01

### 3.1.2 Scenario

View the list of all service issue types

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Super Admin logged into the Super Admin portal

### 3.1.5 When

I navigate to the 'Service Issue Types' management page

### 3.1.6 Then

I should see a paginated table of all existing service issue types with columns for 'Name', 'Associated Product Categories', 'Status' (Active/Inactive), and 'Actions' (Edit, Deactivate/Reactivate).

### 3.1.7 Validation Notes

Verify the API call fetches all issue types and the table renders correctly. Check that pagination controls are functional.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-011-02

### 3.2.2 Scenario

Successfully create a new service issue type

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Service Issue Types' management page

### 3.2.5 When

I click 'Create New', enter a unique name like 'Water Damage', select 'Mobile' and 'Electronics' from the product category multi-select, and save

### 3.2.6 Then

The new 'Water Damage' issue type appears in the table with an 'Active' status.

### 3.2.7 And

An entry is created in the system audit log for this action.

### 3.2.8 Validation Notes

Check the database to confirm the new record and its associations are saved. Verify the audit log entry contains the user, action, and timestamp.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-011-03

### 3.3.2 Scenario

Attempt to create a service issue type with a duplicate name

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A service issue type named 'Screen Cracked' already exists

### 3.3.5 When

I attempt to create another issue type with the name 'Screen Cracked' (case-insensitive)

### 3.3.6 Then

The system prevents saving the form and displays a validation error message: 'An issue type with this name already exists.'

### 3.3.7 Validation Notes

Test with same case, different case, and with leading/trailing whitespace to ensure robust validation.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-011-04

### 3.4.2 Scenario

Attempt to create a service issue type with missing required information

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the 'Create New Issue Type' form

### 3.4.5 When

I attempt to save the form without providing a name OR without selecting at least one product category

### 3.4.6 Then

The form submission is blocked and inline validation errors appear next to the empty required fields.

### 3.4.7 Validation Notes

Test both conditions separately: missing name, and missing category selection.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-011-05

### 3.5.2 Scenario

Successfully update an existing service issue type's name and associations

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

An existing service issue type 'Power Issue' is associated with the 'Electronics' category

### 3.5.5 When

I edit the issue type, change its name to 'Power Failure', and add the 'Home Appliances' category association, then save

### 3.5.6 Then

The table updates to show the name 'Power Failure' and its association with both 'Electronics' and 'Home Appliances'.

### 3.5.7 And

The update action is recorded in the system audit log.

### 3.5.8 Validation Notes

Verify the changes are persisted in the database. Check that the audit log captures the 'before' and 'after' state or a clear description of the change.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-011-06

### 3.6.2 Scenario

Deactivate an active service issue type

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

An active service issue type 'Battery Drain' exists

### 3.6.5 When

I click the 'Deactivate' action for this issue type and confirm the action in the confirmation dialog

### 3.6.6 Then

The status of 'Battery Drain' in the list changes to 'Inactive'.

### 3.6.7 And

The deactivation is recorded in the system audit log.

### 3.6.8 Validation Notes

This requires an E2E test. After deactivating, log in as a consumer and attempt to raise a service request for a relevant product to confirm the option is gone. Also, check a historical ticket that used this issue type to ensure it still displays correctly.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-011-07

### 3.7.2 Scenario

Reactivate an inactive service issue type

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

An inactive service issue type 'Battery Drain' exists

### 3.7.5 When

I click the 'Reactivate' action for this issue type

### 3.7.6 Then

The status of 'Battery Drain' in the list changes to 'Active'.

### 3.7.7 And

The 'Battery Drain' option becomes available again for new service requests.

### 3.7.8 Validation Notes

Verify the status change in the UI and database. Perform an E2E test to confirm the option reappears for consumers.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table with sorting, filtering (by name, status), and pagination.
- A 'Create New Issue Type' button.
- A modal or dedicated page for the create/edit form.
- Text input field for 'Name'.
- A multi-select dropdown or checkbox group for 'Associated Product Categories', which should be searchable.
- Action buttons/icons in the table for 'Edit' and 'Deactivate'/'Reactivate'.
- Confirmation modal for deactivation to prevent accidental clicks.

## 4.2.0 User Interactions

- Super Admin can sort the list by clicking on column headers.
- Super Admin can type in a search box to filter the list of issue types by name.
- The form should provide real-time validation feedback for required fields and uniqueness constraints.

## 4.3.0 Display Requirements

- The list must clearly display the name, all associated categories, and the current status (Active/Inactive) for each issue type.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- All buttons and interactive elements must be keyboard accessible.
- The interface must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-011-01

### 5.1.2 Rule Description

The name of a service issue type must be unique across the entire platform (case-insensitive).

### 5.1.3 Enforcement Point

Backend API upon create/update request.

### 5.1.4 Violation Handling

API returns a 409 Conflict error with a descriptive message. Frontend displays this message to the user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-011-02

### 5.2.2 Rule Description

A service issue type must be associated with at least one product category.

### 5.2.3 Enforcement Point

Backend API upon create/update request.

### 5.2.4 Violation Handling

API returns a 400 Bad Request error. Frontend form validation prevents submission.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-011-03

### 5.3.2 Rule Description

A service issue type cannot be hard-deleted. It can only be deactivated (soft delete).

### 5.3.3 Enforcement Point

Backend API logic.

### 5.3.4 Violation Handling

The system will only ever update an 'is_active' flag to false. This preserves historical data integrity for existing service requests.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-010

#### 6.1.1.2 Dependency Reason

This story requires the ability to fetch and associate with Product Categories, which are managed by US-010.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-009

#### 6.1.2.2 Dependency Reason

Requires the existence of a Super Admin role and authentication/authorization mechanism.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-014

#### 6.1.3.2 Dependency Reason

Requires the audit log service to be available to record all create, update, and deactivate actions.

## 6.2.0.0 Technical Dependencies

- Super Admin portal frontend framework and component library.
- Backend RBAC middleware to secure the API endpoints.
- A generic data table component with pagination and search capabilities.

## 6.3.0.0 Data Dependencies

- The `product_categories` table must be populated with data to be selectable in the form.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint to list service issue types should respond within 300ms under normal load.
- The UI page should load in under 2 seconds.

## 7.2.0.0 Security

- Access to this functionality (both UI and API) must be strictly limited to users with the 'Super Admin' role.
- All input from the form must be sanitized on the backend to prevent XSS and other injection attacks.

## 7.3.0.0 Usability

- The process of creating and associating an issue type should be intuitive and require minimal steps.
- Error messages must be clear and actionable for the user.

## 7.4.0.0 Accessibility

- The feature must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The Super Admin portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing the many-to-many relationship between `service_issue_types` and `product_categories`.
- Ensuring the soft-delete (deactivation) logic is correctly applied and does not affect historical records.
- Building a user-friendly multi-select component with search for category association.
- Coordinating with the feature team working on the consumer-facing service request form (US-113) to ensure the API provides correctly filtered lists.

## 8.3.0.0 Technical Risks

- Potential for performance degradation if the list of categories or issue types becomes very large. The UI and API must be designed with pagination and efficient querying from the start.

## 8.4.0.0 Integration Points

- Database: `service_issue_types` table, `product_categories` table, and a join table.
- Audit Log Service: Must be called on every CUD operation.
- Service Request Module API: The API that provides issue types to consumers must be updated to filter by product category and 'is_active' status.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify full CRUD functionality for a Super Admin.
- Verify that a non-admin user cannot access the API endpoints or UI page.
- Verify the deactivation flow: deactivate an issue type, then confirm it is unavailable for new service requests but visible on old ones.
- Verify validation rules for duplicate names and required fields.
- Verify that audit logs are generated correctly for each action.

## 9.3.0.0 Test Data Needs

- A set of at least 5-10 product categories.
- A mix of active and inactive service issue types.
- User accounts with 'Super Admin' and standard 'User' roles.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new backend logic is at or above 80%.
- E2E automated tests for the happy path (create, update, deactivate) are implemented and passing.
- API endpoints are secured and tested for unauthorized access.
- The feature is compliant with WCAG 2.1 Level AA.
- Technical documentation for the new API endpoints is created/updated in Swagger/OpenAPI.
- The changes have been verified by a QA engineer.
- The Product Owner has reviewed and accepted the feature.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for service request management and reporting. It is a blocker for US-113 (User Selects Issue from Category-Specific List).
- Must be scheduled in a sprint after US-010 (Category Management) is complete.

## 11.4.0.0 Release Impact

This feature is essential for the initial platform launch as it governs the data quality of one of the core user journeys (raising a service request).

