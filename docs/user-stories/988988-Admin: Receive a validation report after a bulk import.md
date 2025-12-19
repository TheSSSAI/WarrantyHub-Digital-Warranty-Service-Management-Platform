# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-107 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Admin: Receive a validation report after a bulk im... |
| As A User Story | As an Admin (Super, Brand, or Service Center), I w... |
| User Persona | Admin (Super Admin, Brand Admin, Service Center Ad... |
| Business Value | Ensures high data integrity by providing clear, ac... |
| Functional Area | System Administration & Data Management |
| Story Theme | Bulk Data Operations |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Report for an import with mixed success and failure records

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

an Admin has uploaded a CSV file for bulk import containing 10 records, where 8 are valid and 2 contain validation errors (e.g., a missing required field and an invalid email format)

### 3.1.5 When

the asynchronous import process completes

### 3.1.6 Then

the system correctly imports the 8 valid records into the database

### 3.1.7 And

the report contains 2 rows with a 'Status' of 'Failed' and a specific, user-friendly message in 'Error Details' for each (e.g., "Row 5: The 'email' field is missing.", "Row 9: 'john@doe' is not a valid email address.")

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Report for an import where all records are successful

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

an Admin has uploaded a CSV file for bulk import where all records are valid

### 3.2.5 When

the import process completes

### 3.2.6 Then

all records from the file are successfully imported into the database

### 3.2.7 And

the downloaded validation report shows all rows with a 'Status' of 'Success' and empty 'Error Details'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Report for an import where all records fail

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

an Admin has uploaded a CSV file for bulk import where every record contains at least one validation error

### 3.3.5 When

the import process completes

### 3.3.6 Then

no records from the file are imported into the database

### 3.3.7 And

the downloaded validation report shows all rows with a 'Status' of 'Failed' and a corresponding error message for each.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Handling of a structurally invalid file

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

an Admin is on the bulk import page

### 3.4.5 When

they attempt to upload a file that is not a valid CSV/JSON or does not match the required header structure

### 3.4.6 Then

the system rejects the file immediately before starting the import process

### 3.4.7 And

no import job is created and no report is generated.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Asynchronous processing for large files

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

an Admin has initiated a bulk import with a large file (e.g., >500 records)

### 3.5.5 When

the import is processing in the background

### 3.5.6 Then

the Admin can navigate away from the import page without interrupting the process

### 3.5.7 And

upon completion, the Admin receives an in-app notification that the import has finished and the report is available for download from a 'Job History' or 'Notifications' section.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- File upload component
- "Processing..." indicator or progress bar
- "Download Report" button/link (enabled upon completion)
- In-app notification component

## 4.2.0 User Interactions

- User uploads a file and initiates the import.
- UI provides immediate feedback that the job has started and is processing.
- User receives a notification upon completion.
- User clicks a link to download the generated CSV report.

## 4.3.0 Display Requirements

- The report must clearly state the total number of records processed, succeeded, and failed.
- Error messages in the report must be human-readable and reference the specific field and row number from the original file.

## 4.4.0 Accessibility Needs

- All UI elements (buttons, links, notifications) must be keyboard accessible and compatible with screen readers (WCAG 2.1 AA).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

An import job is transactional per row. A row is either fully imported or fully rejected; no partial data for a single record will be saved.

### 5.1.3 Enforcement Point

Data persistence logic within the background worker.

### 5.1.4 Violation Handling

The entire row is rolled back and marked as 'Failed' in the report.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Generated reports are only accessible to Admins of the same tenant (Brand or Service Center) as the user who initiated the import.

### 5.2.3 Enforcement Point

API endpoint for downloading the report file.

### 5.2.4 Violation Handling

Request is denied with a 403 Forbidden status code.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-104

#### 6.1.1.2 Dependency Reason

Defines the data schema and validation rules for product model imports, which this story's validation engine must support.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-105

#### 6.1.2.2 Dependency Reason

Defines the data schema and validation rules for technician roster imports, which this story's validation engine must support.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-106

#### 6.1.3.2 Dependency Reason

This story and US-106 (dry-run mode) will share the same core data validation engine. The engine should be built to be reusable by both features.

## 6.2.0.0 Technical Dependencies

- Azure Blob Storage: For temporary storage of uploaded files and generated reports.
- Azure Service Bus (or similar message queue): For managing asynchronous processing of import jobs.
- Background Worker Service: A microservice to consume jobs from the queue and perform the data validation and import.
- Notification Service (FCM/Azure Communication Services): To send completion alerts to the user.

## 6.3.0.0 Data Dependencies

- Predefined CSV/JSON templates for each import type (Product Models, Technicians).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- For a file with 1,000 records, the entire asynchronous process (validation, import, report generation) should complete in under 90 seconds.
- The report download API endpoint must respond in under 500ms.

## 7.2.0.0 Security

- Access to download the report must be authenticated and authorized, ensuring an admin can only access reports for their own tenant.
- Generated reports stored in Blob Storage must be in a private container with access granted via short-lived Shared Access Signatures (SAS).
- Reports should be automatically deleted from storage after a defined period (e.g., 30 days) to prevent accumulation of potentially sensitive data.

## 7.3.0.0 Usability

- Error messages in the report must be clear and actionable, guiding the user on how to fix the data.

## 7.4.0.0 Accessibility

- The generated report must be in a standard, accessible format like CSV.

## 7.5.0.0 Compatibility

*No items available*

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires setting up an asynchronous processing pipeline (API -> Message Queue -> Worker).
- Development of a generic and extensible data validation engine that can handle different schemas and rules.
- State management for tracking the status of each import job.
- Secure generation and storage of report files.

## 8.3.0.0 Technical Risks

- Potential for long-running jobs with very large files; requires robust error handling and timeout management in the worker service.
- Ensuring data consistency if a worker process fails mid-import.

## 8.4.0.0 Integration Points

- API Gateway for the initial file upload endpoint.
- Message Queue for decoupling the API from the worker.
- Primary Database (PostgreSQL) for data insertion.
- Azure Blob Storage for file I/O.
- Notification Service for user alerts.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Upload a valid CSV with mixed data (success/fail) and verify the contents of the downloaded report.
- Upload a CSV with only invalid data and verify no records are added to the database.
- Upload a file with incorrect headers and verify the UI error.
- Simulate a large file upload to ensure the asynchronous flow works and a notification is received.
- Attempt to download a report belonging to another tenant to verify security controls.

## 9.3.0.0 Test Data Needs

- A suite of CSV files: all valid, all invalid, mixed data, invalid format, incorrect headers, empty file, large file (1000+ rows).

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E testing of the full user flow.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for validation logic and worker service, achieving >80% coverage
- Integration testing for the full async pipeline (API -> Queue -> Worker -> DB -> Blob) completed successfully
- E2E test case simulating file upload and report download is passing
- User interface reviewed and approved
- Performance requirements for processing time verified
- Security requirements for report access and storage validated
- Documentation for the import file formats and possible error codes is created or updated
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires infrastructure setup for the message queue and worker service if not already present.
- Should be developed in conjunction with US-106 (dry-run) to maximize code reuse of the validation engine.

## 11.4.0.0 Release Impact

Critical for enabling self-service data onboarding for new Brands and Service Centers, reducing manual support effort.

