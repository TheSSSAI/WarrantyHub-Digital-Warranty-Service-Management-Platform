# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-067 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Add service notes and parts ... |
| As A User Story | As a Service Center Admin, I want to add and view ... |
| User Persona | Service Center Admin, responsible for managing ser... |
| Business Value | Enhances data integrity by creating a complete ser... |
| Functional Area | Service Request Management |
| Story Theme | Service Center Operations |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Admin successfully adds a new service note to an open ticket

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A Service Center Admin is logged in and viewing the details of an open service request ticket

### 3.1.5 When

The admin types a message into the 'Service Notes' text area and clicks the 'Add Note' button

### 3.1.6 Then

The system saves the note, and the UI immediately displays the new note in the notes history list, showing the admin's full name, the note content, and the current timestamp. The text area is then cleared.

### 3.1.7 Validation Notes

Verify the note is persisted in the database with the correct `service_request_id`, `user_id`, and `timestamp`. Verify the API response is successful (e.g., HTTP 201).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Admin successfully adds a part to the 'Parts Used' list

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Service Center Admin is viewing an open service request ticket

### 3.2.5 When

The admin clicks 'Add Part', enters a 'Part Name', 'Part Number' (optional), a numeric 'Quantity', and saves the part

### 3.2.6 Then

The new part is added to the 'Parts Used' list on the UI, and the data is persisted in the backend.

### 3.2.7 Validation Notes

Verify the part details are saved correctly against the service request in the database. The UI should update without a full page reload.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Admin successfully removes a part from the 'Parts Used' list

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A service request has at least one part in its 'Parts Used' list

### 3.3.5 When

The admin clicks the 'Remove' or 'Delete' icon next to a part entry and confirms the action

### 3.3.6 Then

The part is removed from the list on the UI and deleted from the service request record in the database.

### 3.3.7 Validation Notes

Verify the corresponding record is removed from the database. The UI should update instantly.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Admin attempts to add a part with invalid data

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A Service Center Admin is adding a part to a service request

### 3.4.5 When

The admin leaves the 'Part Name' blank OR enters a non-numeric value (e.g., 'two') for 'Quantity' and attempts to save

### 3.4.6 Then

The system displays a clear validation error message next to the invalid field(s), the part is not saved, and the form remains open for correction.

### 3.4.7 Validation Notes

Test with empty Part Name, quantity of 0, negative quantity, and non-integer quantity. The API should return a 400 Bad Request with a descriptive error.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Notes and parts cannot be modified on a closed ticket

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A Service Center Admin is viewing a service request with a status of 'Resolved' or 'Closed'

### 3.5.5 When

The admin attempts to add a new note or add/remove a part

### 3.5.6 Then

The UI controls for adding/removing notes and parts are disabled or hidden, and a message indicates that the ticket is locked from further edits.

### 3.5.7 Validation Notes

Verify the API endpoint rejects any attempts to modify notes or parts on a closed ticket with an HTTP 403 Forbidden status.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Viewing a ticket with a history of notes and parts

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

A service request has been previously updated with notes and parts by a technician and/or another admin

### 3.6.5 When

A Service Center Admin opens the details page for that service request

### 3.6.6 Then

The admin can view the complete, chronologically ordered history of all notes, each with the correct author and timestamp, and the complete list of all parts currently associated with the ticket.

### 3.6.7 Validation Notes

Ensure the data is fetched and rendered correctly on page load.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Audit trail is updated when notes or parts are modified

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A Service Center Admin is viewing an open service request ticket

### 3.7.5 When

The admin adds a note OR adds/removes a part

### 3.7.6 Then

An entry is created in the system's immutable audit trail logging the admin's user ID, the action performed (e.g., 'SERVICE_NOTE_ADDED', 'PART_ADDED'), the service request ID, and a timestamp.

### 3.7.7 Validation Notes

Check the audit log database or service to confirm the event was recorded correctly.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated 'Service Log' or 'Internal Notes' section within the service ticket view.
- A multi-line text area for note input.
- An 'Add Note' button.
- A chronologically sorted list to display historical notes, each with author, timestamp, and content.
- A dedicated 'Parts Used' section.
- An 'Add Part' button which reveals a form/modal with fields for 'Part Name', 'Part Number', and 'Quantity'.
- A table or list displaying added parts with columns for Name, Number, and Quantity.
- A 'Remove' (e.g., trash can icon) button for each part in the list.

## 4.2.0 User Interactions

- Adding a note should be an asynchronous action that updates the note list without a page refresh.
- Adding/removing parts should update the parts list dynamically.
- Input fields for parts must have client-side validation for required fields and data types.
- On a closed ticket, all input fields and action buttons in these sections must be in a disabled state.

## 4.3.0 Display Requirements

- Timestamps for notes should be displayed in a user-friendly, localized format (e.g., 'Jan 24, 2025, 10:30 AM').
- The name of the user who added the note must be clearly displayed.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- All buttons must have accessible names (e.g., aria-label for icon buttons).
- The UI must be fully navigable and operable using a keyboard, in compliance with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Service notes are append-only. Once a note is added, it cannot be edited or deleted to maintain the integrity of the service log.

### 5.1.3 Enforcement Point

Backend API and Frontend UI.

### 5.1.4 Violation Handling

The UI will not provide options to edit/delete notes. The API will reject any requests attempting to modify existing note records.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The 'Parts Used' list can be modified (parts added/removed) at any time while the service request status is not 'Resolved' or 'Closed'.

### 5.2.3 Enforcement Point

Backend API and Frontend UI.

### 5.2.4 Violation Handling

The UI will disable editing controls for closed tickets. The API will return a 403 Forbidden error if an edit is attempted on a closed ticket.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-061

#### 6.1.1.2 Dependency Reason

The Service Center Admin must be able to view a list of service requests and navigate to a specific ticket's detail page to access this functionality.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-068

#### 6.1.2.2 Dependency Reason

The concept of a 'Closed' service ticket, which locks editing, must be defined and implemented.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-114

#### 6.1.3.2 Dependency Reason

The system's audit trail service must be available to log all changes made to notes and parts.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint(s) to create/read notes and create/read/delete parts associated with a service request.
- Database schema changes to support storing notes and parts (e.g., new tables `ServiceRequestNotes` and `ServiceRequestParts` linked to `ServiceRequests`).

## 6.3.0.0 Data Dependencies

- Requires existing `ServiceRequest` records to attach notes and parts to.
- Requires authenticated `User` records to associate authorship of notes.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for adding a note or part must be under 500ms (P95).
- Loading a ticket with a large history (e.g., 50+ notes) should not significantly degrade page load performance.

## 7.2.0.0 Security

- Only users with 'Service Center Admin', 'Brand Admin', or 'Super Admin' roles can view the full internal notes.
- Only users with the 'Service Center Admin' or 'Technician' role can add notes/parts to a ticket they have access to.
- All input must be sanitized to prevent XSS attacks.

## 7.3.0.0 Usability

- The process of adding multiple parts should be efficient, allowing the admin to remain in the 'add part' flow without unnecessary clicks.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires database schema design and migration.
- Involves creating dynamic UI components to manage lists of sub-entities (parts).
- Requires robust backend validation and authorization logic to enforce business rules based on ticket status.
- Integration with the audit trail service adds an extra step to the business logic.

## 8.3.0.0 Technical Risks

- Potential for race conditions if multiple users (e.g., an admin and a technician) try to modify the parts list simultaneously. A locking mechanism or optimistic concurrency control should be considered.

## 8.4.0.0 Integration Points

- Service Request API: To fetch ticket data and post updates.
- User Authentication Service: To identify the current user for note authorship.
- Audit Log Service: To record all modification events.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify an admin can add a note and multiple parts to a new ticket.
- Verify an admin can remove a part.
- Verify an admin cannot add/remove notes or parts on a closed ticket.
- Verify that notes added by a technician (from US-082) are visible to the admin.
- Verify input validation for the parts form.
- Verify role-based access: a 'User' role cannot see these internal notes via any API endpoint.

## 9.3.0.0 Test Data Needs

- Service tickets in 'Requested', 'Work In Progress', and 'Closed' states.
- User accounts with 'Service Center Admin' and 'Technician' roles.
- A service ticket with a pre-populated history of notes and parts.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest and Supertest for backend API tests.
- Playwright for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage
- Integration testing between frontend, backend, and database completed successfully
- User interface reviewed and approved for usability and responsiveness
- API endpoints are documented in the OpenAPI specification
- Security requirements validated (role checks, input sanitization)
- Documentation updated appropriately
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for service center operations. The backend API and database changes should be prioritized to unblock frontend development.
- Coordination with the team working on the Technician app (US-082) is needed to ensure note data structures are compatible.

## 11.4.0.0 Release Impact

This feature is critical for the pilot launch (Phase 1) as it enables the core documentation workflow for service centers.

