# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-007 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Links a Service Center to a Brand |
| As A User Story | As a Super Admin, I want to create and manage asso... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Enables the core service request routing logic of ... |
| Functional Area | Super Admin Portal - Onboarding & Configuration |
| Story Theme | Platform Configuration Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully link an approved Service Center to multiple approved Brands

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin on the 'Manage Service Center' page for an 'Approved' Service Center

### 3.1.5 When

I select two 'Approved' Brands that are not currently associated with this Service Center and click 'Save'

### 3.1.6 Then

The system displays a success message confirming the update, and the list of associated brands for the Service Center now includes the two newly added brands.

### 3.1.7 Validation Notes

Verify in the database that the new rows exist in the `brand_service_center_associations` join table. The UI should update immediately to reflect the new state.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully unlink a Brand from a Service Center

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in Super Admin on the 'Manage Service Center' page for a Service Center that is linked to 'Brand X'

### 3.2.5 And

There are no open or in-progress service requests for 'Brand X' assigned to this Service Center

### 3.2.6 When

I deselect 'Brand X' from the list of associated brands and click 'Save'

### 3.2.7 Then

The system displays a success message, and 'Brand X' is removed from the list of associated brands for that Service Center.

### 3.2.8 Validation Notes

Verify in the database that the corresponding row in the `brand_service_center_associations` join table has been removed.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to link to unapproved entities

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in Super Admin on the brand association management interface for a Service Center

### 3.3.5 When

I search for brands to associate

### 3.3.6 Then

The list of available brands for selection must only contain brands with an 'Approved' status. Brands in 'Pending' or 'Rejected' states must not be displayed.

### 3.3.7 Validation Notes

The API endpoint that fetches the list of brands for the selection UI must filter by `status = 'Approved'`.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to unlink a Brand from a Service Center with active service requests

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am a logged-in Super Admin on the 'Manage Service Center' page for a Service Center linked to 'Brand Y'

### 3.4.5 And

There is at least one service request for 'Brand Y' with a status other than 'Resolved' or 'Closed' assigned to this Service Center

### 3.4.6 When

I attempt to deselect 'Brand Y' and save the changes

### 3.4.7 Then

The system must prevent the action and display an informative error message, such as 'Cannot unlink Brand Y as there are active service requests. Please resolve or reassign them first.'

### 3.4.8 Validation Notes

The backend logic must query the service requests table before deleting the association. The UI must handle the error response gracefully.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

View existing brand associations for a Service Center

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am a logged-in Super Admin

### 3.5.5 When

I navigate to the details page for a specific Service Center

### 3.5.6 Then

I can clearly see a list of all Brands that are currently associated with this Service Center.

### 3.5.7 Validation Notes

The page should fetch and display the associated brands upon loading.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

All association changes are recorded in the audit log

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

I am a logged-in Super Admin

### 3.6.5 When

I successfully link or unlink a brand from a service center

### 3.6.6 Then

A new entry is created in the system's immutable audit log, recording my user ID, the action performed (e.g., 'LINK_BRAND_TO_SC' or 'UNLINK_BRAND_FROM_SC'), the IDs of the affected entities, and a timestamp.

### 3.6.7 Validation Notes

Check the audit log table/service to confirm the event was recorded as specified in SRS 3.1.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A list of approved Service Centers with a 'Manage' or 'Details' link for each.
- On the Service Center detail page, a dedicated section/card titled 'Associated Brands'.
- An 'Edit Associations' or 'Manage Brands' button.
- A modal or dedicated UI for editing associations, containing a searchable, multi-select list of all approved brands.
- Save and Cancel buttons within the editing UI.
- Success and error notification toasts/banners.

## 4.2.0 User Interactions

- Super Admin navigates to the Service Center management area.
- Super Admin selects a Service Center to manage.
- Super Admin clicks to edit brand associations.
- Super Admin uses the search bar to filter the list of available brands.
- Super Admin checks/unchecks boxes next to brand names to modify the association.
- Super Admin saves the changes, which closes the modal and refreshes the list of associated brands.

## 4.3.0 Display Requirements

- The list of associated brands should be clearly visible on the Service Center's detail page.
- The brand selection list should be performant, capable of handling hundreds or thousands of brands without UI lag (e.g., using virtualization or server-side search).

## 4.4.0 Accessibility Needs

- The multi-select component must be fully keyboard accessible (e.g., using arrow keys, spacebar to select, enter to confirm).
- All UI elements must have appropriate labels for screen readers, compliant with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Only entities with an 'Approved' status can be associated. A Service Center cannot be linked to a Brand if either entity is in a 'Pending' or 'Rejected' state.

### 5.1.3 Enforcement Point

Backend API validation and Frontend UI filtering.

### 5.1.4 Violation Handling

The API request will be rejected with a 400 Bad Request error. The UI will prevent the selection of non-approved entities.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A brand-service center link cannot be removed if there are any active (not 'Resolved' or 'Closed') service requests for that brand currently assigned to that service center.

### 5.2.3 Enforcement Point

Backend API validation before deleting the association record.

### 5.2.4 Violation Handling

The API request will be rejected with a 409 Conflict error, and an informative message will be displayed to the user.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-002

#### 6.1.1.2 Dependency Reason

A Brand must be created and approved before it can be linked to a Service Center.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-005

#### 6.1.2.2 Dependency Reason

A Service Center must be created and approved before it can be linked to a Brand.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-014

#### 6.1.3.2 Dependency Reason

The audit log system must be in place to record the linking/unlinking actions as required.

## 6.2.0.0 Technical Dependencies

- A database schema with a many-to-many join table between the `brands` and `service_centers` tables.
- A secure API endpoint in the Super Admin microservice.
- Role-Based Access Control (RBAC) middleware to ensure only Super Admins can access the endpoint.

## 6.3.0.0 Data Dependencies

- Test data must include at least one 'Approved' Service Center and several 'Approved' Brands.
- Test data must also include 'Pending' brands to verify they are correctly filtered out.
- To test BR-002, test data must include a service center with active service requests for a specific brand.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for updating associations must respond within 250ms (P95) under expected load.
- The UI for selecting brands must load and be interactive within 1 second, even with 1,000+ brands in the system.

## 7.2.0.0 Security

- The API endpoint must be protected and accessible only by authenticated users with the 'Super Admin' role.
- All data modifications must be logged in an immutable audit trail as per SRS 3.1.

## 7.3.0.0 Usability

- The process of finding a service center and managing its brand associations should be intuitive and require minimal clicks.
- Error messages must be clear and actionable for the user.

## 7.4.0.0 Accessibility

- The user interface must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Super Admin web portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing the business rule to check for active service requests before unlinking requires an inter-service communication or a database query across domains, which adds complexity.
- Building a performant and accessible multi-select search component for the frontend.
- Ensuring the database transaction for updating associations is atomic (all succeed or all fail).

## 8.3.0.0 Technical Risks

- The query to check for active service requests could become a performance bottleneck if not properly indexed and optimized.
- Potential for race conditions if a new service request is assigned while an unlinking operation is in progress. This should be handled with appropriate transaction isolation levels.

## 8.4.0.0 Integration Points

- Super Admin Service: Owns the API endpoint and business logic.
- Service Request Service/Database: Must be queried to enforce the 'no unlinking with active tickets' rule.
- Audit Log Service: Must be called to record the changes.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify linking one brand.
- Verify linking multiple brands at once.
- Verify unlinking a brand with no active tickets.
- Verify failure when unlinking a brand with active tickets.
- Verify that only approved brands appear in the selection list.
- Verify that the audit log is correctly updated after each successful operation.
- Verify role-based access control prevents non-Super Admins from accessing the feature.

## 9.3.0.0 Test Data Needs

- Users with 'Super Admin' and other roles.
- Service Centers in 'Approved' and 'Pending' states.
- Brands in 'Approved' and 'Pending' states.
- A service center with active service requests for a specific brand.
- A service center with only resolved service requests for a specific brand.

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- React Testing Library for frontend component tests.
- Cypress for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and passing with at least 80% code coverage.
- End-to-end automated tests for the primary user flow are created and passing.
- The API endpoint is documented via auto-generated OpenAPI (Swagger) specifications.
- The action is confirmed to be correctly recorded in the audit log.
- The feature has been reviewed and approved by the Product Owner.
- No critical or high-severity security vulnerabilities have been introduced.
- The feature is deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature required before the service request module can be fully implemented. It should be prioritized early in the development cycle.
- Requires completion of US-002 and US-005 before it can be started.

## 11.4.0.0 Release Impact

- This story is a blocker for the end-to-end service request workflow. The platform cannot go live without this functionality.

