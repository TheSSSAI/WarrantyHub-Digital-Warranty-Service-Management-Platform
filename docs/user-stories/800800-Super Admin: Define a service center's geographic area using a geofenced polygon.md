# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-013 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin: Define a service center's geographic ... |
| As A User Story | As a Super Admin, I want to draw, edit, and save a... |
| User Persona | Super Admin responsible for onboarding and configu... |
| Business Value | Increases the accuracy of the service request rout... |
| Functional Area | Super Admin Portal - Service Center Management |
| Story Theme | Platform Onboarding & Configuration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Super Admin successfully draws and saves a new polygon service area

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin on the configuration page for a specific Service Center and Brand relationship

### 3.1.5 When

I select the option to 'Add Geofenced Area', click at least three distinct points on the map to form a closed polygon, and click 'Save'

### 3.1.6 Then

The system validates the polygon, saves it as a GeoJSON object in the database, and associates it with the Service Center and Brand. A success message is displayed, and the map now shows the saved, filled-in polygon area.

### 3.1.7 Validation Notes

Verify in the database that a valid geometry object is stored for the correct service_center_brand link. The UI should reflect the saved state upon page reload.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Super Admin successfully edits an existing polygon service area

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Service Center already has a polygon-defined service area

### 3.2.5 When

I click the 'Edit' button for that area, drag an existing vertex to a new location, and click 'Save'

### 3.2.6 Then

The system updates the polygon's coordinates in the database and displays the modified shape on the map.

### 3.2.7 Validation Notes

Check the database to confirm the geometry data has been updated. The visual representation on the map must match the new coordinates.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Super Admin successfully deletes a polygon service area

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A Service Center has an existing polygon-defined service area

### 3.3.5 When

I click the 'Delete' button and confirm the action in a confirmation dialog

### 3.3.6 Then

The polygon data is removed from the database for that Service Center and Brand, and the polygon is no longer visible on the map.

### 3.3.7 Validation Notes

Verify the corresponding record is removed from the database. The UI should no longer display the geofenced area.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Super Admin attempts to save an invalid polygon (fewer than 3 vertices)

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am in the map drawing interface

### 3.4.5 When

I click only two points on the map and then click 'Save'

### 3.4.6 Then

The system prevents the save action and displays an informative error message, such as 'A valid polygon must have at least 3 vertices.'

### 3.4.7 Validation Notes

Ensure no data is written to the database. The error message should be clear and user-friendly.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Super Admin attempts to save a self-intersecting polygon

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am in the map drawing interface

### 3.5.5 When

I draw a polygon where the boundary lines cross over each other (e.g., a figure-eight shape) and click 'Save'

### 3.5.6 Then

The system's backend validation detects the invalid geometry and returns an error, preventing the save and displaying a message like 'Service area boundaries cannot intersect.'

### 3.5.7 Validation Notes

Backend should use a function like PostGIS's `ST_IsValid` to check the geometry before saving.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Super Admin cancels changes made during an edit

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

I am editing an existing polygon and have moved several vertices

### 3.6.5 When

I click the 'Cancel' button instead of 'Save'

### 3.6.6 Then

All my changes are discarded, and the polygon on the map reverts to its last saved state.

### 3.6.7 Validation Notes

Verify that the component's state is correctly reset and no API call is made to update the data.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An interactive map canvas (from Mapbox)
- Button to 'Add Geofenced Area'
- Buttons for 'Edit' and 'Delete' on existing areas
- Drawing controls within the map interface (e.g., 'Start Drawing')
- Action buttons: 'Save', 'Cancel'

## 4.2.0 User Interactions

- User clicks on the map to add vertices for a new polygon.
- A double-click on the starting vertex or a click on a 'Finish' button closes the polygon.
- User can drag existing vertices to modify the shape.
- User can click on a line segment between two vertices to add a new vertex.
- A confirmation modal appears before deleting an area.

## 4.3.0 Display Requirements

- The map should be centered on the service center's address by default.
- The saved polygon area should be displayed with a semi-transparent colored fill.
- Clear visual distinction between drawing mode, editing mode, and view mode.

## 4.4.0 Accessibility Needs

- All map controls (zoom, pan, draw) must be operable via keyboard.
- A textual representation of the defined area (e.g., a list of coordinates) should be available for screen reader users.
- Complies with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service area polygon must be a valid, simple (non-self-intersecting), closed shape with at least 3 vertices.

### 5.1.3 Enforcement Point

Backend API upon save/update request.

### 5.1.4 Violation Handling

The API request is rejected with a 400 Bad Request status and a descriptive error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A single Service Center can have multiple distinct, non-overlapping polygon service areas for the same Brand.

### 5.2.3 Enforcement Point

Backend API upon save/update request.

### 5.2.4 Violation Handling

If a new polygon overlaps with an existing one for the same service center/brand, the API should reject the request with an appropriate error message.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-010

#### 6.1.1.2 Dependency Reason

A service center must be created and approved before its service area can be defined.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-011

#### 6.1.2.2 Dependency Reason

A service center must be linked to a brand, as service areas are defined for each specific brand relationship.

## 6.2.0.0 Technical Dependencies

- Microsoft Azure for hosting.
- Azure Database for PostgreSQL with the PostGIS extension enabled and configured.
- Mapbox API for map rendering and interaction. Requires a valid API key.
- Super Admin web portal (Next.js) must be in place to host the new UI component.

## 6.3.0.0 Data Dependencies

- Requires existing Service Center and Brand records in the database.

## 6.4.0.0 External Dependencies

- Availability of the Mapbox third-party service.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The map interface must load within 3 seconds.
- Drawing and editing interactions (adding/dragging vertices) must be real-time with no perceivable lag (<100ms response).

## 7.2.0.0 Security

- The API endpoint for saving/updating polygon data must be secured and accessible only to authenticated users with the 'Super Admin' role.
- Input data (GeoJSON) must be sanitized and validated on the backend to prevent injection attacks.

## 7.3.0.0 Usability

- The drawing tools should be intuitive and follow common conventions for map-based editors.
- Error messages must be clear and guide the user on how to correct the issue.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA compliance.

## 7.5.0.0 Compatibility

- The feature must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend: Requires integrating a third-party map library and its drawing plugins (e.g., react-map-gl with nebula.gl or similar).
- Frontend: Managing the complex state of the polygon during drawing and editing.
- Backend: Requires handling and validating GeoJSON data.
- Database: Schema modification to add a `geometry` type column using `pg-migrate`. Requires knowledge of PostGIS.
- Integration: The core service routing logic (US-098) must be updated to use this new geospatial data via point-in-polygon queries (e.g., `ST_Contains`).

## 8.3.0.0 Technical Risks

- Potential performance issues with rendering very complex polygons (many vertices) on the frontend.
- Ensuring consistent and accurate geospatial calculations across the stack.

## 8.4.0.0 Integration Points

- Database (PostgreSQL with PostGIS).
- Service Request Routing Microservice (to use the polygon data for matching).
- Mapbox API.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- Create, edit, and delete a simple triangular polygon.
- Create a complex polygon with 20+ vertices.
- Attempt to save an open shape or a line.
- Attempt to save a self-intersecting polygon.
- Verify that a user's location inside the saved polygon correctly matches the service center during a test service request routing.
- Verify that a user's location outside the polygon does not match.

## 9.3.0.0 Test Data Needs

- A test Super Admin account.
- At least one approved Service Center linked to a Brand.
- Known geographic coordinates (latitude/longitude) for testing inside and outside the drawn polygons.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- Browser developer tools for performance and accessibility checks.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for backend logic and frontend components, achieving >80% coverage
- Integration testing completed successfully between frontend, backend, and database
- E2E tests covering the full user flow are passing in the CI/CD pipeline
- User interface reviewed for usability and approved by the product owner
- Performance requirements for map loading and interaction are verified
- Security requirements validated, including role-based access control on the API
- API documentation (OpenAPI/Swagger) is updated for the new endpoint
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for the service routing logic. It should be prioritized before or alongside the implementation of the routing algorithm itself.
- Requires setup of Mapbox API keys and PostGIS extension in all development environments before work can begin.

## 11.4.0.0 Release Impact

- Enables a key differentiator for the platform: high-precision service routing. This feature is critical for launching in dense urban areas where postal codes are insufficient.

