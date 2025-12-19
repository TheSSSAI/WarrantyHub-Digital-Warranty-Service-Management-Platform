# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-013 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Manages Brand-Specific Terms and Condi... |
| As A User Story | As a Super Admin, I want a dedicated interface to ... |
| User Persona | Super Admin: A platform administrator with the hig... |
| Business Value | Ensures legal compliance by providing consumers wi... |
| Functional Area | Super Admin & Onboarding Module |
| Story Theme | Platform Configuration & Master Data Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Super Admin successfully uploads the first T&C document for a brand

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin on the 'Manage Terms & Conditions' page

### 3.1.5 When

I select an approved brand from the dropdown, provide a version name (e.g., 'T&C v1.0 - 2024'), upload a valid PDF file, and submit the form

### 3.1.6 Then

The PDF file is securely uploaded to Azure Blob Storage, a new database record is created linking the document URL to the brand and version, and the new document appears in the list with a status of 'Active'.

### 3.1.7 Validation Notes

Verify the file exists in the designated Blob Storage container. Check the database for the new record with the correct brand_id and status. The UI list should update to show the new entry.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Super Admin uploads a new version of a T&C, archiving the previous one

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A brand already has an 'Active' T&C document

### 3.2.5 When

I upload a new T&C document for the same brand and confirm I want to make it the new active version

### 3.2.6 Then

The new document is saved with an 'Active' status, and the previously active document for that brand is automatically updated to 'Archived' status.

### 3.2.7 Validation Notes

Check the database to confirm the new document's status is 'ACTIVE' and the old one's is 'ARCHIVED'. Only one document per brand should be 'ACTIVE' at any time.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Super Admin views and filters the list of T&C documents

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

Multiple T&C documents for various brands have been uploaded

### 3.3.5 When

I navigate to the 'Manage Terms & Conditions' page

### 3.3.6 Then

I see a paginated table displaying all T&C documents with columns for 'Version Name', 'Brand', 'Status' (Active/Archived), and 'Upload Date'.

### 3.3.7 And

I can filter the list by selecting a brand from a dropdown, and the table updates to show only documents for that brand.

### 3.3.8 Validation Notes

Verify the table displays correct data. Test the filter functionality with a brand that has multiple documents and one that has none.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Super Admin attempts to upload an invalid file type

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the T&C upload form

### 3.4.5 When

I attempt to upload a file that is not a PDF (e.g., a .jpg or .docx file)

### 3.4.6 Then

The system rejects the upload and displays a user-friendly error message, such as 'Invalid file type. Only PDF documents are allowed.'

### 3.4.7 Validation Notes

Test with multiple non-PDF file extensions to ensure the validation is robust.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Super Admin attempts to submit the upload form with missing information

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the T&C upload form

### 3.5.5 When

I attempt to submit the form without selecting a Brand or providing a version name

### 3.5.6 Then

The form submission is prevented, and validation errors are displayed next to the required fields.

### 3.5.7 Validation Notes

Test each required field individually to ensure proper validation messages appear.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Super Admin attempts to delete a T&C document linked to existing warranties

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A T&C document (either 'Active' or 'Archived') is linked to at least one registered product's warranty card

### 3.6.5 When

I attempt to delete that document

### 3.6.6 Then

The system prevents the deletion and displays an informative message, such as 'Cannot delete. This document is linked to existing warranties. Please archive it by uploading a new version if needed.'

### 3.6.7 Validation Notes

Requires test data where a product is linked to a specific T&C version. Verify the database record and the file in Blob Storage are not deleted.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Super Admin successfully deletes an unlinked T&C document

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

A T&C document was uploaded but is not linked to any product warranty cards (e.g., uploaded in error)

### 3.7.5 When

I click the 'Delete' action for that document and confirm the action in a confirmation dialog

### 3.7.6 Then

The document record is removed from the database, the file is deleted from Azure Blob Storage, and the entry is removed from the UI list.

### 3.7.7 Validation Notes

Verify the record is gone from the database and the file is deleted from Blob Storage.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table to list T&C documents with columns for Version, Brand, Status, and Upload Date.
- A 'Filter by Brand' dropdown.
- Pagination controls for the table.
- An 'Upload New T&C' button.
- A modal or form for uploading, containing a 'Brand' dropdown, a 'Version Name' text input, and a file input field.
- Action buttons/icons in each table row for 'Download' and 'Delete'.

## 4.2.0 User Interactions

- Clicking 'Upload New T&C' opens the upload form.
- Selecting a brand from the filter dropdown automatically refreshes the list.
- Clicking 'Delete' shows a confirmation prompt before proceeding.
- Clicking 'Download' initiates a file download of the associated PDF.

## 4.3.0 Display Requirements

- The 'Status' column should use color-coded badges for clarity (e.g., Green for 'Active', Gray for 'Archived').
- The 'Brand' dropdown in the upload form must only list brands with an 'Approved' status.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- The data table must be keyboard navigable.
- Action icons ('Download', 'Delete') must have accessible names (e.g., via aria-label).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Only one Terms and Conditions document can be 'Active' for a single brand at any given time.

### 5.1.3 Enforcement Point

Backend service logic during the creation of a new T&C document or when updating a document's status.

### 5.1.4 Violation Handling

When a new T&C is set to 'Active' for a brand, the system must automatically set the status of the previously 'Active' T&C for that same brand to 'Archived'.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A Terms and Conditions document that is linked to any existing product warranty cannot be hard deleted.

### 5.2.3 Enforcement Point

Backend API endpoint for deleting a T&C document.

### 5.2.4 Violation Handling

The system will check for foreign key relationships to the `product_warranties` table. If any exist, the delete operation is rejected with a 409 Conflict error and a user-facing message.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Only PDF file types are permitted for Terms and Conditions documents.

### 5.3.3 Enforcement Point

Client-side file input validation and server-side validation at the API endpoint.

### 5.3.4 Violation Handling

The upload is rejected, and an error message is returned to the user.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-002', 'dependency_reason': 'This story requires a list of approved brands to associate T&C documents with. The brand management functionality must exist first.'}

## 6.2.0 Technical Dependencies

- Azure Blob Storage for file storage.
- Azure Key Vault for storing Blob Storage access credentials.
- Super Admin web portal (Next.js) to host the UI.
- A database migration to create the `brand_terms_and_conditions` table.

## 6.3.0 Data Dependencies

- Access to the `brands` table to populate the brand selection dropdown.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The T&C list page with filtering should load in under 2 seconds.
- File uploads up to 10MB should complete within 5 seconds on a standard broadband connection.

## 7.2.0 Security

- Access to this functionality must be strictly restricted to users with the 'Super Admin' role, enforced at the API Gateway and microservice level.
- All uploaded files must be scanned for malware upon upload.
- File download links should be pre-signed, short-lived URLs to prevent unauthorized access.

## 7.3.0 Usability

- The process of uploading and managing documents should be intuitive, requiring minimal training for a Super Admin.

## 7.4.0 Accessibility

- The interface must comply with WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- The Super Admin portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Integration with Azure Blob Storage for secure file handling (upload/download/delete).
- Backend logic to enforce business rules (single active T&C per brand, no deletion of linked documents).
- Database schema design and migration for the new `brand_terms_and_conditions` table.
- Frontend work to build a responsive data table with filtering, pagination, and a file upload modal.

## 8.3.0 Technical Risks

- Properly securing the file upload endpoint to prevent malicious file uploads.
- Ensuring transactional integrity when updating document statuses in the database.

## 8.4.0 Integration Points

- The `product_warranties` table will need a foreign key to the `brand_terms_and_conditions` table. This will be implemented as part of the product registration stories (e.g., US-015).

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0 Test Scenarios

- Full CRUD lifecycle of a T&C document (Create, Read, Update status, Delete).
- Attempting to delete a linked document and verifying failure.
- Uploading a new version and verifying the old version is archived.
- Testing file type validation with various non-PDF files.
- Role-based access control: verifying a non-Super Admin user cannot access the page or its APIs.

## 9.3.0 Test Data Needs

- At least 3 approved brands in the test database.
- Sample PDF files of varying sizes.
- Sample non-PDF files (.jpg, .txt, .exe) for negative testing.
- A registered product linked to a specific T&C version to test the deletion constraint.

## 9.4.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest for backend unit/integration tests.
- Cypress for E2E tests.
- OWASP ZAP or similar for security scanning.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit test coverage for new backend logic is at or above 80%
- Integration tests for API endpoints and Blob Storage interaction are implemented and passing
- E2E tests for the primary user flows are created and passing in the CI/CD pipeline
- User interface has been reviewed for usability and accessibility compliance
- Security requirements, including role-based access and file upload scanning, have been validated
- API documentation (Swagger/OpenAPI) is auto-generated and accurate
- Story has been deployed and verified in the staging environment by a QA engineer or product owner

# 11.0.0 Planning Information

## 11.1.0 Story Points

8

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This story is a foundational requirement for the digital warranty card feature. It should be prioritized before work on the consumer-facing warranty card UI begins.
- Requires coordinated effort between frontend and backend developers.

## 11.4.0 Release Impact

- This feature is critical for the initial pilot launch (Phase 1) as it handles essential legal documentation for the first onboarded brands.

