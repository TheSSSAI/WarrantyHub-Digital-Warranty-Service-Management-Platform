# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-012 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: Define a service center's geographic ... |
| As A User Story | As a Super Admin, I want to assign a list of speci... |
| User Persona | Super Admin: A platform administrator responsible ... |
| Business Value | Enables the core functionality of automated servic... |
| Functional Area | Super Admin & Onboarding Module |
| Story Theme | Service Center Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

View the interface for managing service areas

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Super Admin is logged in and viewing the details of an approved Service Center that is linked to at least one Brand

### 3.1.5 When

the admin navigates to the 'Service Areas' section for that Service Center

### 3.1.6 Then

the admin should see an interface to select a Brand and manage the postal codes for that Brand/Service Center combination.

### 3.1.7 Validation Notes

Verify that the UI presents a dropdown or list of associated brands and an area to manage postal codes.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Add a single valid postal code

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Super Admin is on the 'Service Areas' management page for a specific Service Center and Brand

### 3.2.5 When

the admin enters a single, valid postal code into the input field and clicks 'Add'

### 3.2.6 Then

the postal code is added to a temporary list on the UI, awaiting save.

### 3.2.7 Validation Notes

The postal code should appear as a tag or list item with a 'remove' option. The database is not updated until 'Save' is clicked.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Save newly added postal codes

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the Super Admin has added one or more postal codes to the temporary list

### 3.3.5 When

the admin clicks the 'Save Changes' button

### 3.3.6 Then

the system persists the association between the Service Center, Brand, and the new postal codes, and a success message is displayed.

### 3.3.7 Validation Notes

Verify the records are correctly created in the database. Reloading the page should show the saved postal codes.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Remove an existing postal code

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the Super Admin is managing a service area with existing postal codes

### 3.4.5 When

the admin clicks the 'remove' icon next to a postal code and then clicks 'Save Changes'

### 3.4.6 Then

the system removes the association for that postal code and displays a success message.

### 3.4.7 Validation Notes

Verify the record is deleted from the database. The postal code should no longer be listed after the page is reloaded.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Add multiple postal codes by pasting a delimited list

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the Super Admin is on the 'Service Areas' management page

### 3.5.5 When

the admin pastes a comma-separated or space-separated list of valid postal codes into the input field and clicks 'Add'

### 3.5.6 Then

all unique, valid postal codes from the list are added to the temporary list on the UI.

### 3.5.7 Validation Notes

Test with both comma and space delimiters. The system should handle extra whitespace gracefully.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to add a postal code with an invalid format

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

the Super Admin is on the 'Service Areas' management page

### 3.6.5 When

the admin enters a postal code with an invalid format (e.g., 'ABC 12345', '$$$')

### 3.6.6 Then

the system should display an inline validation error message stating the format is invalid, and the code should not be added to the list.

### 3.6.7 Validation Notes

The exact validation rule for postal codes should be defined and consistently applied.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Attempt to add a postal code that is already in the list for the current service center

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

the postal code '90210' is already in the temporary list for the current Service Center and Brand

### 3.7.5 When

the admin tries to add '90210' again

### 3.7.6 Then

the system should ignore the duplicate entry and provide a subtle notification that the postal code is already in the list.

### 3.7.7 Validation Notes

The UI should not add a second '90210' tag. This check should be case-insensitive.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Attempt to add a postal code already assigned to another service center for the same brand

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

postal code '10001' is assigned to 'Service Center A' for 'Brand X'

### 3.8.5 When

the Super Admin tries to add '10001' to 'Service Center B' for 'Brand X' and clicks 'Save Changes'

### 3.8.6 Then

the system should prevent the save operation and display a clear error message: 'Error: Postal code 10001 is already assigned to another service center for this brand.'

### 3.8.7 Validation Notes

This requires a database unique constraint on the combination of (brand_id, postal_code).

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

Add a postal code that is assigned to another service center but for a different brand

### 3.9.3 Scenario Type

Alternative_Flow

### 3.9.4 Given

postal code '20500' is assigned to 'Service Center A' for 'Brand X'

### 3.9.5 When

the Super Admin adds '20500' to 'Service Center A' for 'Brand Y' and clicks 'Save Changes'

### 3.9.6 Then

the system successfully saves the association, as the brand is different.

### 3.9.7 Validation Notes

This confirms that the uniqueness rule is correctly scoped to the brand.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Dropdown to select a Brand associated with the Service Center.
- Text input field for entering postal codes.
- An 'Add' button to add entered postal codes to a temporary list.
- A display area showing the list of added postal codes as tags, each with a 'remove' (x) icon.
- A 'Save Changes' button to persist the list.
- A 'Cancel' button to discard changes.
- Feedback areas for success and error messages.

## 4.2.0 User Interactions

- Admin selects a brand to manage its service area.
- Admin can type a single postal code and press Enter or click 'Add'.
- Admin can paste a list of postal codes (comma or space-separated).
- Admin can click the 'x' on a tag to remove it from the list before saving.
- The 'Save Changes' button should be disabled until there are unsaved changes.

## 4.3.0 Display Requirements

- The current list of saved postal codes for the selected brand must be displayed upon loading the page.
- Error messages must be specific and clearly indicate the problem (e.g., invalid format, duplicate assignment).

## 4.4.0 Accessibility Needs

- All UI elements (input fields, buttons, dropdowns) must have proper labels for screen readers.
- Functionality must be fully accessible via keyboard.
- Error messages must be associated with their respective input fields using `aria-describedby`.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A single postal code can only be assigned to one service center for any given brand.', 'enforcement_point': 'Backend API during the save operation; Database level via a unique constraint on (brand_id, postal_code).', 'violation_handling': 'The API request will fail with a 409 Conflict status code and a descriptive error message. The UI will display this error to the user.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-010

#### 6.1.1.2 Dependency Reason

A service center must be approved and exist in the system before a service area can be defined for it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-011

#### 6.1.2.2 Dependency Reason

A service center must be linked to a brand before a service area can be defined for that specific brand-service center relationship.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint (/api/v1/super-admin/service-centers/{id}/service-areas) for CRUD operations on service areas.
- Database table to store the `(service_center_id, brand_id, postal_code)` relationship.
- Frontend components in the Super Admin portal (Next.js) for the management interface.

## 6.3.0.0 Data Dependencies

- Requires existing and approved Brand and Service Center records in the database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for saving service areas should be under 500ms at the 95th percentile.
- The UI should handle lists of up to 1,000 postal codes without noticeable lag.

## 7.2.0.0 Security

- The API endpoint must be protected by RBAC, accessible only to users with the 'Super Admin' role.
- All input must be sanitized to prevent XSS and other injection attacks.

## 7.3.0.0 Usability

- The interface for managing postal codes should be intuitive, especially the bulk-add functionality.
- Error feedback must be immediate and clear.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Super Admin web portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing robust validation for various postal code formats.
- Handling bulk input with mixed valid/invalid/duplicate data gracefully.
- Ensuring the database schema and constraints correctly enforce the business rule of exclusivity per brand.
- Frontend state management for the temporary list of postal codes before saving.

## 8.3.0.0 Technical Risks

- The postal code validation logic might become complex if international formats with different rules need to be supported. An initial decision on supported formats is required.
- Potential for race conditions if two admins try to assign the same postal code simultaneously. The database unique constraint is the primary mitigation.

## 8.4.0.0 Integration Points

- The data stored by this feature will be read by the Service Request Routing Module (US-098).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify a Super Admin can add, save, and remove postal codes for a service center/brand pair.
- Test the enforcement of the unique postal code per brand rule by trying to assign a duplicate to a different service center.
- Test bulk-adding a list containing valid, invalid, and duplicate postal codes.
- Test the UI behavior when switching between different brands for the same service center.
- Verify that an E2E test using Playwright can successfully complete the entire workflow.

## 9.3.0.0 Test Data Needs

- At least two approved Service Centers.
- At least two approved Brands.
- Service Centers linked to one or both Brands.
- A list of valid and invalid postal codes for testing.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage and passing
- Integration testing completed successfully, including database constraint validation
- E2E test scenario for the feature is implemented and passes reliably
- User interface reviewed and approved for usability and accessibility (WCAG 2.1 AA)
- Performance requirements verified
- Security requirements validated (RBAC enforced)
- API documentation (OpenAPI) is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a foundational requirement for the automated service routing feature (US-098) and must be completed before work on routing logic can be finalized.

## 11.4.0.0 Release Impact

- This feature is essential for the platform's core functionality and is required for the pilot launch (Phase 1).

