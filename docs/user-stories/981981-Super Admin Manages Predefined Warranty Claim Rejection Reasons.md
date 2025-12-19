# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-104 |
| Elaboration Date | 2024-10-27 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Manages Predefined Warranty Claim Reje... |
| As A User Story | As a Super Admin, I want to create, view, edit, an... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Ensures standardized and high-quality data for cla... |
| Functional Area | Super Admin Portal - Platform Configuration |
| Story Theme | Master Data Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-104-01

### 3.1.2 Scenario

Super Admin views the list of all claim rejection reasons

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Super Admin logged into the Super Admin portal

### 3.1.5 When

I navigate to the 'Claim Rejection Reasons' management page

### 3.1.6 Then

I should see a table displaying all existing rejection reasons, with columns for 'Reason Text', 'Status' (Active/Inactive), and 'Actions' (Edit, Deactivate/Reactivate).

### 3.1.7 Validation Notes

Verify the API call to fetch reasons is made and the table is populated correctly. The list should be sortable by Reason Text and Status.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-104-02

### 3.2.2 Scenario

Super Admin adds a new, valid rejection reason

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Claim Rejection Reasons' management page

### 3.2.5 When

I click 'Add New Reason', enter a unique reason text (e.g., 'Physical damage not covered by warranty'), and save

### 3.2.6 Then

The new reason should be added to the list with a status of 'Active' and a success message should be displayed.

### 3.2.7 Validation Notes

Check the database to confirm the new record is created with `is_active = true`. The UI list should update automatically.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-104-03

### 3.3.2 Scenario

Super Admin edits an existing rejection reason

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am on the 'Claim Rejection Reasons' management page and an existing reason 'User error' exists

### 3.3.5 When

I click 'Edit' for that reason, change the text to 'Damage due to user misuse', and save

### 3.3.6 Then

The reason's text in the list should be updated and a success message should be displayed.

### 3.3.7 Validation Notes

Verify the corresponding record in the database is updated. Ensure the audit log captures this change.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-104-04

### 3.4.2 Scenario

Super Admin deactivates an active rejection reason

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am on the 'Claim Rejection Reasons' management page and an active reason exists

### 3.4.5 When

I click 'Deactivate' for that reason and confirm the action in the confirmation dialog

### 3.4.6 Then

The reason's status should change to 'Inactive' in the list.

### 3.4.7 Validation Notes

Verify the `is_active` flag for the record is set to `false` in the database. This reason should no longer appear in the dropdown for Brand/Service Center Admins rejecting new claims.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-104-05

### 3.5.2 Scenario

Super Admin reactivates an inactive rejection reason

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am on the 'Claim Rejection Reasons' management page and an inactive reason exists

### 3.5.5 When

I click 'Reactivate' for that reason

### 3.5.6 Then

The reason's status should change to 'Active' in the list.

### 3.5.7 Validation Notes

Verify the `is_active` flag for the record is set to `true` in the database. This reason should now be available again for new claim rejections.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-104-06

### 3.6.2 Scenario

Super Admin attempts to add a duplicate rejection reason

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A rejection reason 'Water Damage' already exists

### 3.6.5 When

I attempt to add a new reason with the text 'water damage' (case-insensitive)

### 3.6.6 Then

The system should prevent the save action and display a clear error message, such as 'This rejection reason already exists.'

### 3.6.7 Validation Notes

Test with identical casing, different casing, and with leading/trailing whitespace which should be trimmed.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-104-07

### 3.7.2 Scenario

Super Admin attempts to add an empty or invalid rejection reason

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I am in the 'Add New Reason' form

### 3.7.5 When

I try to save with the reason text field empty or containing only spaces

### 3.7.6 Then

The system should prevent the save and display a validation error, such as 'Reason text cannot be empty.'

### 3.7.7 Validation Notes

Check for minimum and maximum character limits as well (e.g., min 5, max 255 characters).

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-104-08

### 3.8.2 Scenario

A deactivated reason is preserved in historical records

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

A claim was previously rejected with the reason 'Outdated Model'

### 3.8.5 When

A Super Admin deactivates the 'Outdated Model' reason

### 3.8.6 Then

The historical service record for that claim should still display 'Outdated Model' as the rejection reason.

### 3.8.7 Validation Notes

This confirms the importance of soft-deleting. The system should not use a foreign key that could be nullified, but rather store the reason text or link to a soft-deletable record.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table to list rejection reasons
- Columns: 'Reason Text', 'Status', 'Actions'
- Buttons: 'Add New Reason', 'Edit', 'Deactivate', 'Reactivate'
- A modal or form for adding/editing a reason with a text input field
- Confirmation dialog for deactivation
- Toast notifications for success/error messages

## 4.2.0 User Interactions

- Super Admin can sort the list by clicking on table headers.
- Super Admin can filter the list by status (Active, Inactive, All).
- The form for adding/editing should have real-time validation feedback.

## 4.3.0 Display Requirements

- The status column should clearly differentiate between 'Active' and 'Inactive' states (e.g., using colored badges).
- The total count of reasons should be displayed.

## 4.4.0 Accessibility Needs

- All UI elements (buttons, forms, table) must be keyboard navigable.
- All form inputs must have associated labels.
- Confirmation dialogs must trap focus.
- Complies with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-104-01

### 5.1.2 Rule Description

Rejection reason text must be unique (case-insensitive).

### 5.1.3 Enforcement Point

Server-side validation upon creating or updating a reason.

### 5.1.4 Violation Handling

API returns a 409 Conflict error with a descriptive message. Frontend displays this message to the user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-104-02

### 5.2.2 Rule Description

Rejection reasons cannot be permanently deleted (hard-deleted) from the system to maintain historical data integrity.

### 5.2.3 Enforcement Point

API logic for the DELETE endpoint.

### 5.2.4 Violation Handling

The DELETE operation must perform a soft delete by setting an `is_active` flag to false.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-104-03

### 5.3.2 Rule Description

Only active rejection reasons are available for selection by Brand and Service Center Admins when rejecting a new claim.

### 5.3.3 Enforcement Point

API endpoint that populates the rejection reason dropdown for Brand/Service Center Admins.

### 5.3.4 Violation Handling

The API query must filter records where `is_active = true`.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-009

#### 6.1.1.2 Dependency Reason

The Super Admin role and login functionality must exist to access this feature.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-014

#### 6.1.2.2 Dependency Reason

The system audit log mechanism must be in place to record all create, update, and deactivate actions performed on rejection reasons.

## 6.2.0.0 Technical Dependencies

- A new database table (`claim_rejection_reasons`) is required.
- A new set of CRUD API endpoints secured for the Super Admin role.
- Super Admin frontend portal infrastructure must be in place.

## 6.3.0.0 Data Dependencies

- This story creates master data that will be consumed by the claim rejection workflow (US-060).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint to fetch all rejection reasons must respond within 250ms (P95).
- The UI page for managing reasons must load in under 2 seconds.

## 7.2.0.0 Security

- Access to this feature (both UI and API) must be strictly restricted to users with the 'Super Admin' role.
- All actions (create, update, deactivate) must be logged in an immutable audit trail, including the admin's ID and timestamp, as per requirement 3.1.
- Input validation must be enforced on the server-side to prevent injection attacks.

## 7.3.0.0 Usability

- The interface for managing reasons should be intuitive and require minimal training.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Super Admin portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Standard CRUD functionality.
- Simple data model and business logic.
- No complex integrations.

## 8.3.0.0 Technical Risks

- Risk of implementing a hard delete instead of a soft delete, which would break historical data integrity. This must be a key point in code review.

## 8.4.0.0 Integration Points

- The data from this module will be consumed by the 'Warranty Claim Verification' module (specifically US-060) to populate a dropdown menu.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Full CRUD lifecycle of a rejection reason (Create -> Edit -> Deactivate -> Reactivate).
- Validation checks for duplicate and empty inputs.
- Role-based access control: Verify a non-Super Admin user cannot access the API endpoints or UI page.
- Verify that a deactivated reason does not appear for selection in the claim rejection flow.
- Verify that historical records correctly display a reason that has since been deactivated.

## 9.3.0.0 Test Data Needs

- A Super Admin user account.
- A Brand/Service Center Admin account for verifying the dropdown list.
- A pre-existing service request that can be used to test the rejection flow.

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- Cypress for frontend E2E tests.
- Postman or similar for API integration testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests implemented for the API service layer with >80% coverage
- Integration tests for the API endpoints are passing
- E2E tests for the user workflow are passing in the CI/CD pipeline
- Role-based access controls are verified
- All actions are correctly logged in the audit trail
- Documentation for the new API endpoints is generated and published via Swagger
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational master data story. It should be completed before or in the same sprint as the story for rejecting a claim (US-060) to avoid blocking development.

## 11.4.0.0 Release Impact

- This is a core administrative feature required for the platform to manage service claims effectively. It is essential for the initial launch.

