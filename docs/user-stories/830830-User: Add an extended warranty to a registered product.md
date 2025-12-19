# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-028 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Add an extended warranty to a registered pro... |
| As A User Story | As a product owner, I want to add an extended or s... |
| User Persona | Registered Consumer/End-User |
| Business Value | Increases user engagement and platform stickiness ... |
| Functional Area | Product Management |
| Story Theme | Warranty Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User successfully adds an extended warranty to an existing product

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user and I am viewing the details of a product I have already registered

### 3.1.5 When

I select the 'Add Warranty' option, complete the form with valid details (Provider, Duration, Start Date), upload a supported document (PDF, JPG, or PNG under 10MB), and submit the form

### 3.1.6 Then

The system creates a new warranty record linked to the product, securely stores the uploaded document, displays a success confirmation message, and the product details view is updated to indicate the presence of multiple warranties.

### 3.1.7 Validation Notes

Verify a new record exists in the 'warranties' table linked to the correct 'product_id'. Verify the document is present in Azure Blob Storage. Verify the UI reflects the new state.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User attempts to submit the 'Add Warranty' form with missing required fields

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am on the 'Add Warranty' form for a registered product

### 3.2.5 When

I attempt to submit the form without filling in a mandatory field, such as 'Warranty Duration'

### 3.2.6 Then

The system prevents submission and displays a clear, inline validation error message next to the empty field, such as 'Warranty Duration is required'.

### 3.2.7 Validation Notes

Test each mandatory field individually for missing data validation.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User attempts to upload an unsupported file type

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the 'Add Warranty' form

### 3.3.5 When

I attempt to upload a file with an unsupported extension (e.g., .docx, .zip)

### 3.3.6 Then

The system rejects the file and displays a user-friendly error message, such as 'Invalid file type. Please upload a PDF, JPG, or PNG.'

### 3.3.7 Validation Notes

Test with multiple unsupported file types to ensure the validation logic is robust.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User attempts to upload a file exceeding the size limit

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the 'Add Warranty' form

### 3.4.5 When

I attempt to upload a file larger than 10MB

### 3.4.6 Then

The system rejects the file and displays a user-friendly error message, such as 'File size cannot exceed 10MB.'

### 3.4.7 Validation Notes

Test with a file slightly over the 10MB limit to confirm the boundary condition.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User cancels the process of adding a new warranty

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I have opened the 'Add Warranty' form and may have entered some data

### 3.5.5 When

I select the 'Cancel' or 'Back' option

### 3.5.6 Then

The form is dismissed, no data is saved, and I am returned to the previous product details screen.

### 3.5.7 Validation Notes

Verify that no new warranty record is created in the database if the process is cancelled.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Network error occurs during file upload

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I have filled out the 'Add Warranty' form and initiated the submission

### 3.6.5 When

a network connection error occurs during the file upload process

### 3.6.6 Then

The system displays an informative error message, preserves the data I entered in the form, and allows me to retry the submission without starting over.

### 3.6.7 Validation Notes

Can be tested using browser developer tools to simulate network failure or by testing on an unstable connection.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Add Warranty' button or link on the product detail screen.
- A modal or new screen for the 'Add Warranty' form.
- Input fields: Text input for 'Warranty Provider', inputs for 'Warranty Duration' (e.g., number and unit dropdown: Years/Months), a date picker for 'Start Date'.
- A file upload component with clear instructions on supported formats and size limits.
- A progress indicator for the file upload.
- Submit and Cancel buttons.

## 4.2.0 User Interactions

- Tapping 'Add Warranty' opens the form.
- The date picker should default to the product's original purchase date but be editable.
- After selecting a file, its name or a thumbnail should be displayed.
- Tapping 'Submit' with valid data triggers the save process and shows a loading indicator.
- Tapping 'Cancel' closes the form without saving.

## 4.3.0 Display Requirements

- The form must clearly label all fields.
- Validation errors must be displayed inline, next to the relevant field.
- A success toast/notification should be displayed upon successful submission.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags for screen reader compatibility.
- The UI must be navigable using a keyboard.
- Color contrast must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A product can have multiple associated warranties (one primary, multiple secondary/extended).

### 5.1.3 Enforcement Point

Database Schema, Backend Logic

### 5.1.4 Violation Handling

N/A - This rule defines a system capability.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Uploaded warranty documents must be in PDF, JPG, or PNG format and must not exceed 10MB.

### 5.2.3 Enforcement Point

Frontend validation and Backend API validation.

### 5.2.4 Violation Handling

The request is rejected with a 400 Bad Request status and a descriptive error message.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

A product must be registered in the system before an additional warranty can be added to it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-025

#### 6.1.2.2 Dependency Reason

The core concept and UI for a single digital warranty card must exist as a baseline.

## 6.2.0.0 Technical Dependencies

- The backend file upload service must be operational and configured to use Azure Blob Storage.
- The database schema must support a one-to-many relationship between products and warranties.

## 6.3.0.0 Data Dependencies

- Requires an existing, user-owned product record in the database to associate the new warranty with.

## 6.4.0.0 External Dependencies

- Azure Blob Storage service for storing the uploaded warranty documents.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for form submission (excluding file transfer) should have a P95 of less than 500ms.

## 7.2.0.0 Security

- Uploaded warranty documents must be stored securely with encryption at rest in Azure Blob Storage.
- Access to warranty documents via the API must be restricted to the product owner and authorized administrators (e.g., Brand Admin, Super Admin) only.
- All data must be transmitted over HTTPS/TLS 1.3.

## 7.3.0.0 Usability

- The process of adding a warranty should be intuitive and require minimal steps.
- Error messages must be clear, concise, and helpful.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported mobile OS versions (iOS 14+, Android 8.0+) and web browsers (latest stable Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordinated changes across frontend (new UI form), backend (new API endpoint with file handling), and database (schema support).
- Handling multipart/form-data on the backend requires specific middleware and logic.
- Ensuring robust error handling for file uploads (network issues, size/type validation) adds complexity.

## 8.3.0.0 Technical Risks

- Potential for inconsistent state if the database write succeeds but the file upload to blob storage fails. The API logic must handle this transactionally or have a rollback mechanism.

## 8.4.0.0 Integration Points

- Backend API (NestJS) -> Azure Blob Storage for file persistence.
- Backend API (NestJS) -> PostgreSQL Database for metadata persistence.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Happy path: Add a new warranty with a PDF, a JPG, and a PNG file.
- Error path: Attempt to submit with each required field empty.
- Error path: Attempt to upload various unsupported file types.
- Error path: Attempt to upload a file of 10.1MB.
- Edge case: Simulate network failure during upload and verify retry capability.
- Security: Attempt to access another user's uploaded warranty document via API manipulation.

## 9.3.0.0 Test Data Needs

- A test user account with at least one registered product.
- Sample files for testing: valid PDF/JPG/PNG under 10MB, a file over 10MB, and an unsupported file type (e.g., .txt).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- Browser developer tools for simulating network conditions.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for new logic, with code coverage meeting the project standard (>=80%)
- A new E2E test case covering the happy path is created and passing
- The new API endpoint is documented in the OpenAPI (Swagger) specification
- User interface reviewed for consistency and usability by the design team
- Security requirements (file access control) have been explicitly tested and verified
- Documentation for the feature is created or updated in the user guide
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story is a prerequisite for US-029 ('Toggle between multiple warranties'). For a complete user experience, both stories should be planned in close succession, ideally in the same or consecutive sprints.
- Requires both frontend and backend development effort.

## 11.4.0.0 Release Impact

This is a significant feature enhancement that improves the core value proposition of the app. It should be highlighted in release notes as a key new capability for users.

