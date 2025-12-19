# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-094 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Brand Admin: Upload and manage warranty Terms and ... |
| As A User Story | As a Brand Admin, I want to upload, view, and mana... |
| User Persona | Brand Admin: A user responsible for managing a spe... |
| Business Value | Ensures legal compliance by providing consumers wi... |
| Functional Area | Brand Administration Portal |
| Story Theme | Brand Content & Compliance Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully upload a new T&C document

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Brand Admin on the 'Manage T&C Documents' page

### 3.1.5 When

I click 'Upload New Document', enter a unique name, select a valid PDF file under 10MB, and confirm the upload

### 3.1.6 Then

the file is successfully uploaded to Azure Blob Storage, a new record is created in the database, and the document appears in the list with its name, upload date, and an 'Active' status.

### 3.1.7 Validation Notes

Verify the file exists in the blob container for the brand. Check the database for the new metadata record. The UI list should update without a page refresh.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

View the list of all T&C documents for the brand

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a Brand Admin and my brand has one or more T&C documents uploaded

### 3.2.5 When

I navigate to the 'Manage T&C Documents' page

### 3.2.6 Then

I see a table or list displaying all documents for my brand, with columns for 'Document Name', 'Upload Date', 'Status' (Active/Inactive), and 'Actions'.

### 3.2.7 Validation Notes

The list should only show documents associated with my brand, not any others.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Deactivate an active T&C document

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a Brand Admin viewing the list of T&C documents, and there is more than one 'Active' document

### 3.3.5 When

I click the 'Deactivate' action for an 'Active' document and confirm my choice in a confirmation dialog

### 3.3.6 Then

the document's status in the list changes to 'Inactive'.

### 3.3.7 Validation Notes

Verify the status field is updated in the database. This document should no longer be available for selection when defining new product warranties, but must remain linked to existing warranties that already use it.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Reactivate an inactive T&C document

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am a Brand Admin viewing an 'Inactive' T&C document in the list

### 3.4.5 When

I click the 'Activate' action for that document

### 3.4.6 Then

the document's status in the list changes back to 'Active'.

### 3.4.7 Validation Notes

Verify the status field is updated in the database. The document should become available again for new warranty definitions.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to upload a non-PDF file

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a Brand Admin in the 'Upload New Document' modal

### 3.5.5 When

I select a file with an extension other than .pdf (e.g., .jpg, .docx)

### 3.5.6 Then

the system prevents the upload and displays a clear error message, such as 'Invalid file type. Only PDF files are permitted.'.

### 3.5.7 Validation Notes

Validation should occur on both the client-side for immediate feedback and on the server-side for security.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to upload a file exceeding the size limit

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am a Brand Admin in the 'Upload New Document' modal

### 3.6.5 When

I select a PDF file that is larger than 10MB

### 3.6.6 Then

the system prevents the upload and displays a clear error message, such as 'File size exceeds the 10MB limit.'.

### 3.6.7 Validation Notes

Validation should occur on both client and server-side.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Attempt to upload a document with a duplicate name

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I am a Brand Admin and a document named 'Standard Warranty 2024' already exists for my brand

### 3.7.5 When

I attempt to upload a new document and enter the name 'Standard Warranty 2024'

### 3.7.6 Then

the system prevents the upload and displays an inline error message, such as 'A document with this name already exists for your brand.'.

### 3.7.7 Validation Notes

The uniqueness constraint for the name should be scoped to the brand_id in the database.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Attempt to deactivate the last active T&C document

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

I am a Brand Admin and there is only one 'Active' T&C document for my brand

### 3.8.5 When

I click the 'Deactivate' action for that document

### 3.8.6 Then

the system prevents the action and displays a warning message, such as 'Cannot deactivate the only active T&C document. Please upload a replacement first.'.

### 3.8.7 Validation Notes

This business rule must be enforced in the backend service logic.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A table/list to display T&C documents.
- A primary button for 'Upload New Document'.
- A modal dialog for the upload process with fields for 'Document Name' and a file input.
- Action icons/buttons within the list for 'Download', 'Deactivate', and 'Activate'.
- Confirmation modals for destructive actions like 'Deactivate'.
- Clear error message displays for validation failures.

## 4.2.0 User Interactions

- Clicking 'Upload' opens a modal.
- Selecting a file from the local system.
- Clicking 'Deactivate' shows a confirmation prompt before proceeding.
- The list of documents should support sorting by name and date.

## 4.3.0 Display Requirements

- The list must clearly show Document Name, Upload Date, and Status.
- Status should be visually distinct (e.g., using colored badges like Green for 'Active' and Gray for 'Inactive').

## 4.4.0 Accessibility Needs

- All interactive elements (buttons, inputs, links) must be keyboard accessible.
- Action icons must have appropriate ARIA labels (e.g., 'aria-label="Download Standard Warranty 2024 T&C"').
- The file input should be properly labeled.
- Error messages must be associated with their respective form fields using 'aria-describedby'.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Uploaded T&C documents must be in PDF format.

### 5.1.3 Enforcement Point

File upload endpoint (server-side) and file selection (client-side).

### 5.1.4 Violation Handling

Reject the upload and return a '400 Bad Request' with a descriptive error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Uploaded T&C documents must not exceed 10MB in size.

### 5.2.3 Enforcement Point

File upload endpoint (server-side) and file selection (client-side).

### 5.2.4 Violation Handling

Reject the upload and return a '413 Payload Too Large' with a descriptive error message.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

A brand must have at least one 'Active' T&C document at all times.

### 5.3.3 Enforcement Point

Backend logic for the 'Deactivate' action.

### 5.3.4 Violation Handling

Prevent the deactivation and return a '409 Conflict' with a descriptive error message.

## 5.4.0 Rule Id

### 5.4.1 Rule Id

BR-004

### 5.4.2 Rule Description

Document names must be unique per brand.

### 5.4.3 Enforcement Point

Database constraint (UNIQUE on brand_id, name) and backend validation logic.

### 5.4.4 Violation Handling

Reject the upload and return a '409 Conflict' with a descriptive error message.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-085

#### 6.1.1.2 Dependency Reason

Brand Admin must be able to authenticate and access the brand portal before they can manage any content.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-004

#### 6.1.2.2 Dependency Reason

A brand must be created and approved by a Super Admin before a Brand Admin can be associated with it and manage its assets.

## 6.2.0.0 Technical Dependencies

- Azure Blob Storage for file persistence.
- A database table to store T&C document metadata (e.g., `brand_tnc_documents`).
- Authentication service (Azure AD B2C) to secure the endpoints.

## 6.3.0.0 Data Dependencies

- Requires a `brand_id` to associate the uploaded document with the correct brand.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- File upload of a 10MB file should complete within 10 seconds on a standard broadband connection.
- The list of T&C documents should load in under 1 second.

## 7.2.0.0 Security

- All endpoints must be protected and require Brand Admin role authentication.
- Server-side validation of file type (MIME type) and size is mandatory to prevent malicious file uploads.
- Files stored in Azure Blob Storage must be encrypted at rest.
- Access to download the files should be through a secure, time-limited URL if direct blob access is not used.

## 7.3.0.0 Usability

- The upload process should provide clear feedback on progress and success/failure.
- Error messages must be user-friendly and actionable.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web portal must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires frontend work for the UI (list, modal, file handling).
- Requires backend work for a new API endpoint to handle multipart/form-data.
- Requires integration with Azure Blob Storage SDK.
- Requires a new database table and associated data access logic.
- Requires robust error handling and security validation for file uploads.

## 8.3.0.0 Technical Risks

- Improper handling of file uploads can lead to security vulnerabilities.
- Ensuring transactional integrity between database record creation and file upload to blob storage.

## 8.4.0.0 Integration Points

- Backend API (NestJS) for handling the business logic.
- Primary Database (PostgreSQL) for storing metadata.
- File Storage (Azure Blob Storage) for the PDF files.
- Frontend Application (Next.js) for the user interface.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful upload and display of a valid PDF.
- Verify rejection of invalid file types and oversized files.
- Verify successful deactivation and reactivation of a document.
- Verify the business rule preventing deactivation of the last active document.
- Verify that a Brand Admin can only see and manage documents for their own brand.
- Verify that a downloaded file is identical to the uploaded one.

## 9.3.0.0 Test Data Needs

- At least two test Brand Admin accounts.
- Sample PDF files of various sizes (e.g., 1KB, 5MB, 11MB).
- Sample non-PDF files (e.g., .jpg, .txt, .exe) for negative testing.

## 9.4.0.0 Testing Tools

- Jest & Supertest (Backend Unit/Integration)
- Jest & React Testing Library (Frontend Component)
- Playwright (E2E)
- OWASP ZAP or similar for security scanning of the upload endpoint.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for the backend logic, achieving >80% code coverage
- Component tests implemented for the frontend UI
- E2E tests covering the primary happy path and key error conditions are passing
- User interface reviewed for accessibility (WCAG 2.1 AA) and approved
- Security validation (server-side checks) implemented and verified
- API documentation (OpenAPI/Swagger) for the new endpoints is created and accurate
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for brand compliance and is required before features that link T&Cs to warranties can be built.
- Requires both frontend and backend development, which can be parallelized once the API contract is defined.

## 11.4.0.0 Release Impact

This feature is critical for the initial pilot launch (Phase 1) as brands will need to upload their legal documents before going live.

