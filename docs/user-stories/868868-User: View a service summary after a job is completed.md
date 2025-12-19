# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-047 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: View a service summary after a job is comple... |
| As A User Story | As a product owner (User), I want to view a detail... |
| User Persona | The 'User' or 'Consumer' who owns the product and ... |
| Business Value | Increases user trust and transparency by providing... |
| Functional Area | Service Request Module |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-047-01

### 3.1.2 Scenario

Happy Path: Viewing a complete service summary

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user and have a service request with the status 'Resolved' or 'Closed'

### 3.1.5 When

I navigate to the details screen of that service request and select the 'View Service Summary' option

### 3.1.6 Then

The application displays a dedicated Service Summary screen containing the product details (Brand, Model), technician's name, service completion date, a section for 'Technician Notes' with the full text, a section for 'Parts Used' listing each part, and an image of the captured digital signature.

### 3.1.7 Validation Notes

Verify all fields are populated with the correct data from the backend for a fully detailed, completed service ticket.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-047-02

### 3.2.2 Scenario

Summary access is restricted for in-progress jobs

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am a logged-in user and have a service request with a status other than 'Resolved' or 'Closed' (e.g., 'Work In Progress')

### 3.2.5 When

I navigate to the details screen of that service request

### 3.2.6 Then

The 'View Service Summary' option is not visible or is disabled, preventing access.

### 3.2.7 Validation Notes

Check the UI state for tickets in various active statuses like 'Requested', 'Acknowledged', 'Technician Assigned', 'Technician On The Way', and 'Work In Progress'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-047-03

### 3.3.2 Scenario

Summary for a service with no parts used

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

I am viewing the service summary for a 'Resolved' service request where no parts were used

### 3.3.5 When

I look at the 'Parts Used' section

### 3.3.6 Then

The section displays a clear message, such as 'No parts were used for this service', instead of an empty list.

### 3.3.7 Validation Notes

Test with a service record specifically created without any associated parts.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-047-04

### 3.4.2 Scenario

Summary for a service with no technician notes

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am viewing the service summary for a 'Resolved' service request where the technician did not enter any notes

### 3.4.5 When

I look at the 'Technician Notes' section

### 3.4.6 Then

The section displays a clear message, such as 'No notes were provided by the technician'.

### 3.4.7 Validation Notes

Test with a service record where the technician notes field is null or empty.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-047-05

### 3.5.2 Scenario

Summary for a service where a signature was not captured

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am viewing the service summary for a 'Resolved' service request where the customer's digital signature was not captured

### 3.5.5 When

I look at the signature area

### 3.5.6 Then

The area displays a message like 'Signature not captured' instead of a broken image or empty space.

### 3.5.7 Validation Notes

Test with a service record where the signature file link is null.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-047-06

### 3.6.2 Scenario

API fails to load summary data

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am a logged-in user on the service request details screen

### 3.6.5 When

I select 'View Service Summary' and the backend API returns an error

### 3.6.6 Then

The application displays a user-friendly error message, such as 'Unable to load service summary. Please check your connection and try again.'

### 3.6.7 Validation Notes

Use browser/app developer tools to mock a 500 or network error response from the summary API endpoint.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'View Service Summary' button/link on the completed service request details screen.
- A new screen or modal dedicated to displaying the Service Summary.
- Clearly labeled sections for 'Technician Notes', 'Parts Used', and 'Customer Signature'.

## 4.2.0 User Interactions

- User taps the 'View Service Summary' button to open the summary view.
- The summary view is scrollable if the content exceeds the screen height.

## 4.3.0 Display Requirements

- Service Completion Date & Time.
- Assigned Technician's Full Name.
- Full text of technician's resolution notes.
- A list of parts used, ideally with columns for Part Name/Number and Quantity.
- An image rendering of the captured digital signature.

## 4.4.0 Accessibility Needs

- All text content must be readable by screen readers.
- The summary must have a logical content structure (headings for sections).
- Ensure sufficient color contrast for all text as per WCAG 2.1 AA.

# 5.0.0 Business Rules

- {'rule_id': 'BR-047-01', 'rule_description': "The service summary can only be viewed for service requests in a terminal state ('Resolved', 'Closed').", 'enforcement_point': 'User Interface (disabling the button) and API level (returning a 403 Forbidden error if the status is incorrect).', 'violation_handling': 'The UI element to access the summary is hidden or disabled. API requests for non-terminal states are rejected.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-082

#### 6.1.1.2 Dependency Reason

This story defines how technicians enter the notes and parts data that must be displayed in the summary.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-083

#### 6.1.2.2 Dependency Reason

This story defines the capture of the customer's digital signature, which is a required element of the summary.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-084

#### 6.1.3.2 Dependency Reason

This story defines the action of marking a job as 'Resolved', which is the trigger that makes the service summary available to the user.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-041

#### 6.1.4.2 Dependency Reason

This story provides the base 'Service Request Details' screen from which the user will access the summary.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., GET /api/v1/service-requests/{id}/summary) must be created to serve the aggregated summary data.
- Access to Azure Blob Storage to retrieve the URL for the stored signature image.

## 6.3.0.0 Data Dependencies

- Requires access to service request records, technician profiles, service notes, parts usage logs, and signature metadata in the PostgreSQL database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response for the service summary must have a P95 latency below 250ms.
- The summary screen in the mobile app must load and render within 2 seconds of being requested.

## 7.2.0.0 Security

- The API endpoint must be protected and only accessible by the authenticated user who owns the service request.
- All data must be transmitted over HTTPS/TLS 1.3.

## 7.3.0.0 Usability

- The summary must be presented in a clean, easily scannable format.
- Language used should be simple and non-technical for the average consumer.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported iOS and Android versions as defined in the SRS (iOS 14.0+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires both frontend (new UI component) and backend (new API endpoint) development.
- Backend logic involves joining data from multiple tables (service_requests, technicians, service_notes, parts_used, signatures).
- Handling various states (e.g., no parts, no notes) gracefully in both the API response and the UI rendering.

## 8.3.0.0 Technical Risks

- The database query to aggregate summary data could be inefficient if not properly indexed, potentially impacting performance.
- Ensuring the signature image URL from Blob Storage is correctly retrieved and securely served.

## 8.4.0.0 Integration Points

- Frontend (React Native app) integrates with the new Backend (NestJS) API endpoint.
- Backend integrates with Azure Database for PostgreSQL and Azure Blob Storage.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify summary for a job with all data present.
- Verify summary for a job with no parts used.
- Verify summary for a job with no technician notes.
- Verify summary for a job with no signature.
- Verify that the summary cannot be accessed for an in-progress job.
- Verify UI response to an API error.

## 9.3.0.0 Test Data Needs

- A test user account.
- Multiple service requests in the database linked to the test user, with statuses 'Resolved', 'Closed', and 'Work In Progress'.
- Completed service requests must have varied data: one with all details, one missing parts, one missing notes, one missing a signature.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest and Supertest for backend integration tests.
- Playwright for end-to-end testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing.
- Code reviewed and approved by team.
- Unit tests implemented for both frontend and backend, with >80% coverage.
- Backend API integration testing completed successfully.
- E2E test scenario for viewing the summary is automated and passing.
- User interface reviewed and approved by UX/UI designer for consistency and accessibility.
- Performance requirements for API and UI load times are verified.
- Security requirements (API authorization) are validated.
- New API endpoint is documented in the OpenAPI specification.
- Story deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by the completion of technician-side stories (US-082, US-083, US-084). It should be planned for a sprint immediately following the completion of its prerequisites.
- Requires coordinated effort between a frontend and a backend developer.

## 11.4.0.0 Release Impact

This is a key feature for completing the user-facing service lifecycle. Its absence would create a significant gap in the user experience.

