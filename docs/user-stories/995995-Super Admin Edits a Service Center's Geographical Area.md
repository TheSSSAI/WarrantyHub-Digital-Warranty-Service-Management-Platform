# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-111 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Edits a Service Center's Geographical ... |
| As A User Story | As a Super Admin, I want to edit the existing geog... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Ensures accurate service request routing by keepin... |
| Functional Area | Super Admin & Onboarding Module |
| Story Theme | Platform Administration & Configuration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully edit and save a service center's geographical area

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The Super Admin is logged in and is viewing the details of a service center that has a pre-existing geographical service area

### 3.1.5 When

The Super Admin clicks an 'Edit Service Area' button and modifies the existing polygon on the interactive map, then clicks 'Save'

### 3.1.6 Then

The system validates that the new shape is a valid, non-self-intersecting GeoJSON polygon.

### 3.1.7 And

The action is recorded in the immutable audit log, noting the Super Admin, the service center ID, and the timestamp.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Cancel the editing of a geographical area

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

The Super Admin is in the process of editing a service area polygon and has made changes

### 3.2.5 When

The Super Admin clicks the 'Cancel' button

### 3.2.6 Then

The map editing interface closes or reverts, and all unsaved changes are discarded.

### 3.2.7 And

The service center's geographical area in the database remains unchanged.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to save an invalid geographical area shape

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The Super Admin is editing a service area on the map

### 3.3.5 When

They create a self-intersecting polygon or an unclosed shape and click 'Save'

### 3.3.6 Then

The system rejects the save operation.

### 3.3.7 And

The invalid shape remains on the map editor, allowing the Super Admin to correct it.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to navigate away with unsaved changes

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

The Super Admin has made unsaved modifications to a service area polygon

### 3.4.5 When

They attempt to navigate to a different page or close the browser tab

### 3.4.6 Then

A confirmation prompt appears, warning 'You have unsaved changes. Are you sure you want to leave?'

### 3.4.7 And

The navigation is prevented unless the Super Admin confirms the action.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

System fails to save the updated area due to a backend error

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The Super Admin has submitted a valid, updated service area polygon

### 3.5.5 When

A backend or database error prevents the data from being saved

### 3.5.6 Then

A user-friendly error message is displayed, such as 'An error occurred while saving the service area. Please try again.'

### 3.5.7 And

The user's modified polygon is not lost from the UI, allowing them to retry the save operation.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A search or select dropdown to choose a Service Center.
- An interactive map component (e.g., Azure Maps).
- Polygon drawing and editing tools on the map (move, add, delete vertices).
- A 'Save' button to commit changes.
- A 'Cancel' button to discard changes.
- Toast/modal notifications for success and error messages.
- Confirmation dialog for navigating away with unsaved changes.

## 4.2.0 User Interactions

- The current service area polygon is loaded and displayed on the map when the editor is opened.
- User can click and drag vertices to reshape the polygon.
- User can click on a polygon edge to add a new vertex.
- User can right-click (or use a dedicated tool) on a vertex to delete it.

## 4.3.0 Display Requirements

- The service center's name should be clearly visible on the editing screen.
- The service area polygon should be visually distinct from the map background (e.g., semi-transparent fill, colored border).

## 4.4.0 Accessibility Needs

- All map controls and buttons must be keyboard-navigable.
- All interactive elements must have accessible names (aria-labels).
- Sufficient color contrast must be used for the polygon and map controls, compliant with WCAG 2.1 AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service area must be a valid, closed, non-self-intersecting polygon.

### 5.1.3 Enforcement Point

Backend API, upon receiving the save request.

### 5.1.4 Violation Handling

The API request is rejected with a 400 Bad Request status and an error message explaining the validation failure.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Only a user with the 'Super Admin' role can edit a service center's geographical area.

### 5.2.3 Enforcement Point

API Gateway and Microservice endpoint.

### 5.2.4 Violation Handling

The API request is rejected with a 403 Forbidden status.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-005

#### 6.1.1.2 Dependency Reason

A service center must be approved and exist in the system before its attributes, like service area, can be managed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-008

#### 6.1.2.2 Dependency Reason

This story modifies an existing area; the functionality to initially define an area must exist first.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-014

#### 6.1.3.2 Dependency Reason

The system's audit log functionality must be implemented to record the changes made in this story.

## 6.2.0.0 Technical Dependencies

- Azure Maps SDK/API for the frontend map interface and editing tools.
- Azure Database for PostgreSQL with the PostGIS extension enabled for storing and validating geographic data.
- Super Admin web portal infrastructure.

## 6.3.0.0 Data Dependencies

- Requires existing service center records in the database.

## 6.4.0.0 External Dependencies

- Availability of the Azure Maps service.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The map editor should load within 3 seconds.
- Polygon manipulations (dragging vertices) should feel instantaneous with no discernible lag on a standard broadband connection.

## 7.2.0.0 Security

- All data transmitted between the client and server (including GeoJSON data) must be encrypted via HTTPS/TLS 1.2+.
- The action must be recorded in an immutable audit log as per SRS 3.1.

## 7.3.0.0 Usability

- The map editing tools should be intuitive and follow common conventions for web-based map editors.
- Clear visual feedback must be provided during interactions (e.g., highlighting a vertex when hovered).

## 7.4.0.0 Accessibility

- The feature must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The web portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend complexity in integrating and managing the state of an interactive map editing component.
- Backend complexity in implementing robust GeoJSON validation using PostGIS functions or a geometry library.
- Ensuring a smooth and performant user experience during polygon manipulation.

## 8.3.0.0 Technical Risks

- Potential limitations or unexpected behavior in the chosen map SDK's editing tools.
- Performance degradation when editing highly complex polygons with many vertices.

## 8.4.0.0 Integration Points

- Frontend integrates with the Azure Maps service.
- Backend API endpoint for updating the service center record.
- Backend service integrates with the PostGIS extension in the PostgreSQL database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful editing of a simple polygon (e.g., a square).
- Verify successful editing of a complex, concave polygon.
- Test saving a self-intersecting polygon and verify error handling.
- Test saving an unclosed line and verify error handling.
- Test the 'Cancel' and 'Unsaved Changes' warning flows.
- Verify the audit log entry is created correctly upon a successful save.
- Test keyboard navigation and screen reader compatibility for the map editor.

## 9.3.0.0 Test Data Needs

- A test Super Admin account.
- At least one approved service center with a pre-defined geographical area.
- Sample valid and invalid GeoJSON data for unit tests.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress for E2E testing.
- A browser accessibility checker tool (e.g., Axe).

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in the staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic meets the project standard (e.g., >80%).
- Automated E2E tests for the happy path and key error conditions are implemented and passing.
- The UI has been reviewed and approved by the UX/product owner.
- The feature has been tested for and meets accessibility (WCAG 2.1 AA) standards.
- Audit log generation has been manually verified.
- Relevant technical documentation has been updated.
- The story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is dependent on the completion of core service center management features (US-005, US-008).
- Requires developer expertise with frontend mapping libraries and potentially backend geospatial data handling.
- Ensure Azure Maps credentials and PostGIS extension are available in all development environments before starting.

## 11.4.0.0 Release Impact

This is a critical feature for maintaining the platform's core data integrity and operational effectiveness. It is required for any launch where service center coverage areas might change over time.

