# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-008 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Defines a Service Center's Geographica... |
| As A User Story | As a Super Admin, I want to visually define and ma... |
| User Persona | Super Admin: A platform administrator responsible ... |
| Business Value | Enables automated and accurate routing of service ... |
| Functional Area | Super Admin & Onboarding Module |
| Story Theme | Service Center Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully define a new service area for a service center

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin on the Service Center management page, and I have selected an 'Approved' service center that has no service area defined

### 3.1.5 When

I click the 'Define Service Area' button, draw a valid, closed polygon on the interactive map, and click 'Save Area'

### 3.1.6 Then

The system saves the polygon data as GeoJSON associated with the service center, a success message is displayed, and viewing the service center's details now shows the defined area on a map.

### 3.1.7 Validation Notes

Verify the GeoJSON data is correctly stored in the database's PostGIS column for the specific service center ID. The UI should reflect the saved area upon refresh.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully edit an existing service area

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in Super Admin viewing the details of a service center that has an existing service area

### 3.2.5 When

I click 'Edit Service Area', modify the shape of the polygon on the map, and click 'Save Changes'

### 3.2.6 Then

The system updates the GeoJSON data for that service center, a success message is displayed, and the details page shows the newly modified area.

### 3.2.7 Validation Notes

Confirm in the database that the geometry data for the service center has been updated. The old polygon should be replaced, not supplemented.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Successfully delete an existing service area

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a logged-in Super Admin viewing the details of a service center with a defined service area

### 3.3.5 When

I click 'Delete Service Area' and confirm the action in the confirmation prompt

### 3.3.6 Then

The service area data for that service center is removed from the system, a success message is displayed, and the service center details page no longer shows a defined area.

### 3.3.7 Validation Notes

Verify that the geometry column for the service center record in the database is set to NULL.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to save an invalid or incomplete polygon

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am in the 'Define Service Area' map interface

### 3.4.5 When

I attempt to save a polygon that is not closed or that intersects itself

### 3.4.6 Then

The system must prevent the save operation and display a user-friendly error message, such as 'Please draw a valid, closed area that does not intersect itself.'

### 3.4.7 Validation Notes

Test with an open line, a single point, and a figure-8 shape. The save button should be disabled or the API call should be rejected with a 400-level error.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Cancel the creation or editing of a service area

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I am in the process of drawing or editing a service area polygon

### 3.5.5 When

I click the 'Cancel' button or close the interface without saving

### 3.5.6 Then

No changes are persisted to the database, and I am returned to the service center details view.

### 3.5.7 Validation Notes

Check the database to ensure the service area data remains unchanged from its state before the operation began.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

UI prevents defining area for a non-approved service center

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am a logged-in Super Admin viewing the details of a service center with a status of 'Pending Approval'

### 3.6.5 When

I view the actions available for this service center

### 3.6.6 Then

The 'Define Service Area' button must not be visible or must be disabled.

### 3.6.7 Validation Notes

Check the UI rendering logic to confirm it depends on the service center's status.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Define Service Area' button on the service center details page (visible only if no area exists).
- An 'Edit Service Area' and 'Delete Service Area' button (visible only if an area exists).
- An interactive map modal/page powered by Azure Maps.
- Map drawing tools for creating and editing a polygon.
- 'Save Area'/'Save Changes', 'Cancel', and 'Delete' buttons within the map interface.
- A confirmation modal for the delete action.
- A static map view on the service center details page to display the saved area.

## 4.2.0 User Interactions

- User can pan and zoom the map.
- User can click on the map to add vertices to a polygon.
- User can drag existing vertices to modify the polygon's shape.
- User can close the polygon by clicking on the starting vertex.

## 4.3.0 Display Requirements

- The name of the service center being edited must be clearly displayed in the map interface.
- The saved service area must be visually rendered with a colored fill and border.

## 4.4.0 Accessibility Needs

- All buttons and controls must be keyboard-navigable and have appropriate ARIA labels.
- The map interface should be compliant with WCAG 2.1 Level AA where possible.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service area can only be defined for a service center with an 'Approved' status.

### 5.1.3 Enforcement Point

User Interface (button disabled/hidden) and Backend API (authorization check).

### 5.1.4 Violation Handling

The UI prevents the action. If the API is called directly, it returns a 403 Forbidden or 400 Bad Request error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A service center can have only one service area polygon defined at a time.

### 5.2.3 Enforcement Point

Database schema and backend logic.

### 5.2.4 Violation Handling

An attempt to create a second area should result in an update (edit) operation, not an addition.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

The defined polygon must be a valid, closed shape and must not self-intersect.

### 5.3.3 Enforcement Point

Backend API validation using PostGIS functions (e.g., ST_IsValid).

### 5.3.4 Violation Handling

The API rejects the request with a 400 Bad Request status and a descriptive error message.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-005

#### 6.1.1.2 Dependency Reason

A service center must be approved before a service area can be defined for it. This story provides the 'Approved' state.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-004

#### 6.1.2.2 Dependency Reason

This story likely creates the UI page for managing and viewing service centers, where the entry point for this feature will reside.

## 6.2.0.0 Technical Dependencies

- Azure Maps SDK for the frontend interactive map.
- Azure Database for PostgreSQL with the PostGIS extension enabled.
- A backend API endpoint capable of receiving and processing GeoJSON data.

## 6.3.0.0 Data Dependencies

- Access to the list of approved service centers from the database.

## 6.4.0.0 External Dependencies

- The Azure Maps service must be available and accessible.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The map interface should load within 3 seconds.
- Saving or updating the polygon data via the API should have a P95 response time of less than 500ms.

## 7.2.0.0 Security

- Only users with the 'Super Admin' role can access this functionality.
- The API endpoint must be protected by authentication and role-based authorization.
- Input GeoJSON data must be sanitized to prevent injection attacks.

## 7.3.0.0 Usability

- The map drawing tools must be intuitive and provide clear visual feedback during polygon creation and editing.

## 7.4.0.0 Accessibility

- The feature must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web portal must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend integration with a third-party map SDK (Azure Maps) and its drawing libraries.
- Backend implementation requires knowledge of geospatial data types and functions (PostGIS).
- Database schema migration is required to add a geometry column and enable the PostGIS extension.
- Validation of complex shapes (e.g., non-self-intersecting polygons) requires specialized libraries or database functions.

## 8.3.0.0 Technical Risks

- Potential performance issues when rendering or editing very complex polygons with many vertices.
- Dependency on the availability and pricing model of the external Azure Maps service.

## 8.4.0.0 Integration Points

- Frontend integrates with Azure Maps API.
- Backend API integrates with the PostgreSQL/PostGIS database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Security

## 9.2.0.0 Test Scenarios

- Create, edit, and delete a service area.
- Attempt to save an invalid (open, self-intersecting) polygon.
- Verify the feature is inaccessible for non-approved service centers.
- Test the workflow on all supported browsers.

## 9.3.0.0 Test Data Needs

- Test accounts for Super Admins.
- Service centers in 'Approved' and 'Pending Approval' states.
- Sample valid and invalid GeoJSON payloads for API-level testing.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress for E2E tests.
- Postman or similar for API testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for new code, achieving at least 80% coverage
- E2E automated test for the create/edit happy path is implemented and passing
- User interface reviewed and approved by the product owner/designer
- API endpoint is secured and documented in the OpenAPI/Swagger specification
- Database migration scripts are created and tested
- Feature is deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for service request routing. It blocks subsequent routing logic development.
- Developer access to an Azure Maps API key must be provisioned before work begins.
- The database migration should be planned early in the sprint.

## 11.4.0.0 Release Impact

- Enables the core functionality of automated service request assignment, which is critical for the platform's value proposition.

