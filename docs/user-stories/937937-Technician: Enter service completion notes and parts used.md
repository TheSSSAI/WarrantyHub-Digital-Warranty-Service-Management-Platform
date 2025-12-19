# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-082 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: Enter service completion notes and par... |
| As A User Story | As a Technician, I want to enter detailed service ... |
| User Persona | Technician using the mobile application. |
| Business Value | Creates a detailed, auditable service history for ... |
| Functional Area | Service Request Module |
| Story Theme | Service Job Execution & Resolution |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Technician successfully enters completion notes and a list of parts used

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Technician is logged into the mobile app and is viewing the details of a job with the status 'Work In Progress'

### 3.1.5 When

the Technician enters text into the 'Completion Notes' field, adds one or more parts with a name/number and quantity, and taps the 'Save' button

### 3.1.6 Then

the system validates the input, saves the notes and parts list associated with the service request, and displays a success confirmation message to the Technician.

### 3.1.7 Validation Notes

Verify in the database that the 'service_requests' table is updated with the notes and the related 'service_request_parts' table contains the correct entries. Also verify that another user role (e.g., Service Center Admin) can view these saved details.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician enters completion notes without using any parts

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a Technician is viewing the details of a job with the status 'Work In Progress'

### 3.2.5 When

the Technician enters text into the 'Completion Notes' field, does not add any parts, and taps the 'Save' button

### 3.2.6 Then

the system saves the notes successfully and the parts list for the service request remains empty.

### 3.2.7 Validation Notes

Verify in the database that the notes are saved and no entries are created in the 'service_request_parts' table for this service request.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Technician attempts to save without entering mandatory completion notes

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

a Technician is viewing the details of a job with the status 'Work In Progress'

### 3.3.5 When

the Technician attempts to save the completion details with the 'Completion Notes' field being empty

### 3.3.6 Then

the system prevents saving and displays a clear validation error message, such as 'Completion notes are required'.

### 3.3.7 Validation Notes

Test by leaving the notes field blank and tapping save. The app should not make an API call, and an error message must be visible.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Technician adds and removes parts from the list before saving

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a Technician is on the service completion screen

### 3.4.5 When

the Technician adds two parts to the list and then taps the 'remove' icon for one of them

### 3.4.6 Then

the selected part is immediately removed from the UI list, and only the remaining part is saved when the Technician taps 'Save'.

### 3.4.7 Validation Notes

Verify the UI state updates correctly upon removal. After saving, check the database to ensure only the final list of parts was persisted.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Technician saves completion details while the device is offline

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a Technician's mobile device has no internet connectivity

### 3.5.5 When

the Technician enters completion notes and parts, and taps 'Save'

### 3.5.6 Then

the application saves the data to local device storage, displays a message like 'Saved locally. Will sync when online.', and queues the data for synchronization.

### 3.5.7 Validation Notes

Put the device in airplane mode to test. After saving, close and reopen the app to ensure data persists locally. Then, restore connectivity and verify the data is successfully synced to the backend without further user interaction.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Data entered by the technician is visible to other relevant roles

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

a Technician has successfully saved completion notes and parts for a service request

### 3.6.5 When

a User (customer) or a Service Center Admin views the details of that same service request

### 3.6.6 Then

the completion notes and the list of parts used are clearly visible in the service history section.

### 3.6.7 Validation Notes

Requires logging in with different user roles to check the visibility and correct display of the data entered by the technician.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A multi-line text area for 'Completion Notes' with a placeholder text like 'Describe the resolution...'
- An 'Add Part' button.
- Input fields for 'Part Name/Number' (text) and 'Quantity' (numeric stepper or input restricted to positive integers).
- A dynamic list to display added parts, with a 'Remove' (e.g., trash can icon) button for each entry.
- A primary 'Save' button to submit the details.

## 4.2.0 User Interactions

- Tapping 'Add Part' should dynamically add a new set of input fields for a part.
- Tapping 'Remove' next to a part should delete that entry from the list without a confirmation prompt.
- The 'Save' button should be disabled until the 'Completion Notes' field contains text.

## 4.3.0 Display Requirements

- The 'Completion Notes' field should support and display multi-line text.
- The list of parts should clearly display the Part Name/Number and the Quantity for each item.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels for screen readers.
- Actionable elements like buttons ('Add Part', 'Remove', 'Save') must have clear, accessible names.
- The UI must be navigable using keyboard-equivalent controls.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Service completion notes are mandatory to ensure a record of work is always captured.

### 5.1.3 Enforcement Point

Client-side (mobile app) validation before submission and server-side API validation upon receipt.

### 5.1.4 Violation Handling

The submission is rejected, and a user-friendly error message is displayed.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The list of parts used is optional, as not all service requests require parts.

### 5.2.3 Enforcement Point

N/A (Absence of a rule).

### 5.2.4 Violation Handling

N/A.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Technicians can edit their own completion notes and parts list until the service request is moved to a final 'Closed' state by a Service Center Admin.

### 5.3.3 Enforcement Point

API will check the service request status before allowing updates to these fields.

### 5.3.4 Violation Handling

The API will return a 403 Forbidden error with a message indicating the ticket is locked from editing.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-077

#### 6.1.1.2 Dependency Reason

This functionality must be placed within the job details screen, which is defined in US-077.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-078

#### 6.1.2.2 Dependency Reason

Entering completion notes is part of the job status workflow, typically performed while the job is 'Work In Progress' before moving to 'Resolved'.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., PATCH /api/v1/service-requests/{id}/completion) must exist to receive and persist the data.
- The mobile application must have a local storage mechanism (e.g., SQLite, AsyncStorage) to support the offline functionality.

## 6.3.0.0 Data Dependencies

- The database schema must be updated to support storing completion notes (TEXT) and a related list of parts (separate table like 'service_request_parts' linked by foreign key).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for saving the data must be under 500ms (P95).
- The UI for adding/removing parts must respond instantly with no perceivable lag.

## 7.2.0.0 Security

- The API endpoint must be secured and only accessible by an authenticated user with the 'Technician' role.
- The technician must only be able to update jobs that are assigned to them.
- All input text must be sanitized on the backend to prevent XSS or other injection attacks.

## 7.3.0.0 Usability

- The process of adding multiple parts should be quick and intuitive.
- Error messages must be clear and guide the user on how to correct the issue.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported iOS (14.0+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementation of the offline save and automatic synchronization logic adds significant complexity compared to a simple online form.
- The UI for the dynamic list of parts requires careful state management.
- Backend API needs robust validation and authorization logic.

## 8.3.0.0 Technical Risks

- Potential for data loss or sync conflicts with the offline feature if not implemented and tested thoroughly.
- The database schema change requires a coordinated migration (using pg-migrate).

## 8.4.0.0 Integration Points

- The data saved via this story will be read by other parts of the system, including the User's service history view (US-047) and the Service Center Admin panel (US-067).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Security

## 9.2.0.0 Test Scenarios

- Verify successful submission with notes and multiple parts.
- Verify successful submission with notes only.
- Verify validation failure for empty notes.
- Verify offline saving and successful sync upon reconnection.
- Verify that a technician cannot edit notes for a job not assigned to them.
- Verify that a technician cannot edit notes for a job that is already closed.
- Verify that submitted data is correctly displayed to the customer and service center admin.

## 9.3.0.0 Test Data Needs

- Test accounts for Technician, User, and Service Center Admin roles.
- An active service request assigned to the test technician.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit/component tests.
- Jest & Supertest for backend unit/integration tests.
- Playwright (or equivalent like Appium) for mobile E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for the backend API, achieving >80% coverage
- Component tests implemented for the frontend UI
- E2E tests for the happy path and offline scenario are passing in the CI/CD pipeline
- Feature manually verified on representative iOS and Android physical devices
- Offline synchronization logic has been stress-tested
- API documentation (OpenAPI/Swagger) is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The backend API endpoint should be prioritized to unblock frontend development.
- The offline capability is a key requirement and should be accounted for in estimation; it is not a stretch goal.

## 11.4.0.0 Release Impact

This is a core feature for the technician workflow and is essential for the MVP launch of the technician mobile application.

