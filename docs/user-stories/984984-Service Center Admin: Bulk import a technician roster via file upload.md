# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-105 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Bulk import a technician ros... |
| As A User Story | As a Service Center Admin, I want to upload a file... |
| User Persona | Service Center Admin |
| Business Value | Reduces the time and effort required for a new Ser... |
| Functional Area | Service Center Management |
| Story Theme | Onboarding & Setup Efficiency |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successful import of a valid CSV file

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The Service Center Admin is logged in and is on the 'Manage Technicians' page

### 3.1.5 When

The admin uploads a well-formed CSV file containing 15 new, valid technician records

### 3.1.6 Then

The system processes the file, creates 15 new technician profiles in the database, associates them with the admin's service center, and displays a success message: 'Import complete. 15 technicians successfully added.'

### 3.1.7 Validation Notes

Verify in the UI that 15 new technicians appear in the roster. Check the database to confirm the records were created correctly and linked to the correct service_center_id.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: Successful import of a valid JSON file

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The Service Center Admin is logged in and is on the 'Manage Technicians' page

### 3.2.5 When

The admin uploads a well-formed JSON file (array of objects) containing 10 new, valid technician records

### 3.2.6 Then

The system processes the file, creates 10 new technician profiles, and displays a success message: 'Import complete. 10 technicians successfully added.'

### 3.2.7 Validation Notes

Verify in the UI and database that 10 new technicians are correctly created and associated.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: Partial success with data validation errors

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The Service Center Admin is logged in and is on the 'Manage Technicians' page

### 3.3.5 When

The admin uploads a CSV file with 10 records, where 8 are valid, 1 is missing an email, and 1 has an email that already exists in the system

### 3.3.6 Then

The system processes the 8 valid records, creating 8 new technicians.

### 3.3.7 And

The system provides a link to download a detailed error report (CSV) that lists the row number and specific error for each of the 2 failed records.

### 3.3.8 Validation Notes

Verify that only 8 technicians were created. Download the error report and confirm it accurately describes the failures for the two specific rows.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: Uploading a file with an unsupported format

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The Service Center Admin is on the import page

### 3.4.5 When

The admin attempts to upload a file with an unsupported extension, such as '.xlsx' or '.txt'

### 3.4.6 Then

The system immediately rejects the file and displays a client-side validation error: 'Invalid file format. Please upload a CSV or JSON file.'

### 3.4.7 Validation Notes

Test by attempting to upload various unsupported file types. The upload process should not initiate.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Condition: Uploading a malformed file

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The Service Center Admin is on the import page

### 3.5.5 When

The admin uploads a structurally invalid file (e.g., a CSV with broken quotes or a JSON with syntax errors)

### 3.5.6 Then

The system fails to parse the file and displays an error message: 'File could not be processed. Please check the file format and try again.'

### 3.5.7 Validation Notes

Create deliberately broken CSV and JSON files to test the robustness of the parser.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Edge Case: Uploading an empty file

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

The Service Center Admin is on the import page

### 3.6.5 When

The admin uploads a CSV or JSON file that contains only a header row or is completely empty

### 3.6.6 Then

The system processes the file and displays an informative message: 'Import complete. 0 technicians successfully added. The file contained no valid records.'

### 3.6.7 Validation Notes

Ensure no error is thrown and the system handles the empty state gracefully.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

UI: Downloading the import template

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

The Service Center Admin is on the import page

### 3.7.5 When

The admin clicks the 'Download CSV Template' or 'Download JSON Template' link

### 3.7.6 Then

The browser initiates a download of the corresponding template file.

### 3.7.7 And

The downloaded file contains the correct headers/keys: 'Full Name', 'Contact Number', 'Email', 'Skills/Certifications'.

### 3.7.8 Validation Notes

Click both download links and inspect the contents of the downloaded files to ensure they are correct and empty of data.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Import Roster' button on the 'Manage Technicians' page.
- A modal or dedicated page for the import process.
- A file upload component (drag-and-drop and/or file browser).
- Hyperlinks to 'Download CSV Template' and 'Download JSON Template'.
- A loading indicator/progress bar during file processing.
- A summary message area to display the outcome (success, partial, failure).
- A link to download the error report if failures occur.

## 4.2.0 User Interactions

- User clicks 'Import Roster' to open the import UI.
- User can drag a file onto the upload area or click to select a file.
- The system provides immediate feedback on file selection and validation (e.g., file type).
- After processing, the results are clearly displayed to the user.

## 4.3.0 Display Requirements

- Clear instructions on required fields and data formats.
- The number of successful and failed imports must be displayed.
- The error report must clearly state the row number and a human-readable error message for each failure.

## 4.4.0 Accessibility Needs

- All buttons, links, and form elements must be keyboard accessible and have appropriate ARIA labels.
- Feedback messages (success, error) must be announced by screen readers.
- The UI must comply with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Each technician record in the import file must contain 'Full Name', 'Contact Number', and 'Email'. 'Skills/Certifications' is optional.

### 5.1.3 Enforcement Point

During file validation on the backend.

### 5.1.4 Violation Handling

The record is rejected, and the reason ('Missing required field: [Field Name]') is added to the error report.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The 'Email' field for each technician must be unique across the entire platform.

### 5.2.3 Enforcement Point

During data validation, before database insertion.

### 5.2.4 Violation Handling

The record is rejected, and the reason ('Email already exists') is added to the error report.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

The 'Email' field must be in a valid email format.

### 5.3.3 Enforcement Point

During file validation on the backend.

### 5.3.4 Violation Handling

The record is rejected, and the reason ('Invalid email format') is added to the error report.

## 5.4.0 Rule Id

### 5.4.1 Rule Id

BR-004

### 5.4.2 Rule Description

The import process should handle valid rows and reject invalid rows within the same file, rather than rejecting the entire file.

### 5.4.3 Enforcement Point

During the file processing logic.

### 5.4.4 Violation Handling

Valid rows are committed to the database. Invalid rows are logged for the error report.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-060

#### 6.1.1.2 Dependency Reason

The Service Center Admin must be able to log in to access any functionality.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-069

#### 6.1.2.2 Dependency Reason

The underlying API and business logic for creating a single technician must exist, as this bulk feature will utilize it.

## 6.2.0.0 Technical Dependencies

- A backend service capable of parsing CSV and JSON files.
- An asynchronous job processing queue (e.g., Azure Service Bus) to handle file processing without timing out HTTP requests.
- Azure Blob Storage for temporarily storing the uploaded file during processing.

## 6.3.0.0 Data Dependencies

- The database schema for 'Technicians' and its relationship to 'Service Centers' must be finalized.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The import process for a file containing 500 records should complete in under 30 seconds.
- The file upload size limit is 5MB.

## 7.2.0.0 Security

- The file upload endpoint must be authenticated and authorized for the 'Service Center Admin' role.
- Uploaded files must be scanned for malware before processing.
- The file parser must be hardened against CSV Injection vulnerabilities.
- Temporary files must be securely deleted from storage immediately after processing is complete.

## 7.3.0.0 Usability

- The import process should be intuitive, with clear instructions and feedback.
- The error report must be easy to understand and actionable for the user.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web portal interface must be compatible with the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires both frontend (UI for upload) and backend (parsing, validation, async processing) development.
- Implementing an asynchronous job queue adds complexity but is necessary for good user experience and scalability.
- Robust error handling and generating a detailed, user-friendly report is non-trivial.
- Requires careful transaction management to ensure data integrity.

## 8.3.0.0 Technical Risks

- Performance bottlenecks if processing large files synchronously.
- Handling diverse character encodings in uploaded CSV files can be challenging.
- Ensuring the process is atomic for valid records while isolating invalid ones.

## 8.4.0.0 Integration Points

- Integrates with the user authentication service (Azure AD B2C) to verify the user's role.
- Integrates with the core database (PostgreSQL) to create technician records.
- Integrates with an asynchronous task queue (Azure Service Bus).
- Integrates with file storage (Azure Blob Storage).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Performance

## 9.2.0.0 Test Scenarios

- Upload a perfectly valid CSV/JSON file.
- Upload a file with a mix of valid and invalid records (missing data, bad formats, duplicates).
- Upload a file with only invalid records.
- Upload an empty file.
- Upload a file with an unsupported format.
- Upload a malformed file.
- Test the download functionality for both templates.
- Verify the content and format of the downloaded error report.

## 9.3.0.0 Test Data Needs

- A set of CSV and JSON files covering all test scenarios.
- A pre-populated database with existing technicians to test duplicate email constraints.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for parsers and validators, achieving >80% coverage
- Integration testing for the async job processing flow completed successfully
- E2E tests for the happy path and primary error conditions are passing
- User interface reviewed and approved for usability and accessibility
- Performance requirements for a 500-record file verified
- Security requirements, including file scanning and endpoint protection, validated
- User-facing documentation for the feature is created and available in the help portal
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a key feature for streamlining service center onboarding and should be prioritized early in the development of the Service Center portal.
- Requires a clear API contract between frontend and backend to be defined at the start of the sprint to allow for parallel work.

## 11.4.0.0 Release Impact

- Significantly improves the value proposition for new service centers joining the platform.

