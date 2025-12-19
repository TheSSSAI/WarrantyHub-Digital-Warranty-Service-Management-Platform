# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-022 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Adds an Extended Warranty to a Product |
| As A User Story | As a product owner, I want to add multiple warrant... |
| User Persona | The 'Consumer' or 'End-User' of the mobile/web app... |
| Business Value | Increases application utility and user retention b... |
| Functional Area | Product Management |
| Story Theme | Warranty Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully add an extended warranty to an existing product

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of a product I have already registered, which has one existing (manufacturer's) warranty

### 3.1.5 When

I select the 'Add Warranty' option

### 3.1.6 And

the UI now indicates that the product has multiple warranties and allows me to toggle between them (as per US-100)

### 3.1.7 Then

a new, separate warranty record is created and associated with the product

### 3.1.8 Validation Notes

Verify in the database that a new record exists in the 'warranties' table linked to the correct 'product_id'. Verify the file exists in Azure Blob Storage. Verify on the UI that both warranty cards are viewable.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Attempt to add a warranty with a missing document

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am on the 'Add Warranty' form for a product

### 3.2.5 When

I enter a duration but do not upload a document

### 3.2.6 And

a clear validation message, such as 'A warranty document is required', is displayed to me

### 3.2.7 Then

the form submission is blocked

### 3.2.8 Validation Notes

Use an automated E2E test to attempt form submission without a file and assert that the error message appears and no API call is made.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to add a warranty with an invalid duration

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the 'Add Warranty' form for a product

### 3.3.5 When

I enter an invalid duration (e.g., 'abc', '-1', '0')

### 3.3.6 And

a clear validation message, such as 'Please enter a valid warranty duration', is displayed next to the duration field

### 3.3.7 Then

the form submission is blocked

### 3.3.8 Validation Notes

Test with various invalid inputs on both the client-side (UI validation) and server-side (API validation).

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

File upload fails during the process

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the 'Add Warranty' form and have filled in all details

### 3.4.5 When

I select a valid document to upload, but the upload fails due to a network error

### 3.4.6 Then

the system displays a non-blocking, user-friendly error message (e.g., 'File upload failed. Please try again.')

### 3.4.7 And

I am able to retry the upload without losing the data I entered in the form

### 3.4.8 Validation Notes

Simulate a network failure for the upload endpoint and verify the UI response.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Each warranty card displays its own unique information

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I have a product with both a manufacturer's warranty (1 year) and an extended warranty (3 years)

### 3.5.5 When

I view the manufacturer's warranty card

### 3.5.6 Then

it displays the 3-year expiry date and links to the extended warranty document

### 3.5.7 And

when I toggle to the extended warranty card

### 3.5.8 Validation Notes

Manually verify or use an E2E test to switch between cards and assert that the correct expiry date and document link are displayed for each.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Add Warranty' button or icon on the product details/warranty card screen.
- A modal or new screen for the 'Add Warranty' form.
- Form fields for 'Warranty Name' (optional text input), 'Duration' (e.g., number input and a dropdown for units like Days/Months/Years), and 'Document' (file upload control).
- A progress indicator for the file upload process.
- UI element (e.g., tabs, carousel dots) to indicate the presence of multiple warranties and to facilitate navigation between them.

## 4.2.0 User Interactions

- User taps 'Add Warranty' to open the form.
- User fills form and selects a file for upload.
- User submits the form to save the new warranty.
- User swipes or taps on tabs to switch between different warranty cards for the same product.

## 4.3.0 Display Requirements

- The form must clearly label which fields are required.
- Validation errors must be displayed inline, next to the relevant fields.
- Each warranty card must clearly display its own expiry date and provide a link to its specific associated document.

## 4.4.0 Accessibility Needs

- All form fields must have proper labels for screen readers.
- The file upload control must be keyboard accessible.
- The mechanism for switching between warranty cards must be operable via keyboard and screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A new warranty record requires a valid duration and an associated document.

### 5.1.3 Enforcement Point

API level (server-side validation) and Client level (form validation).

### 5.1.4 Violation Handling

The request is rejected with a 400 Bad Request status and a descriptive error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The expiry date for any added warranty is always calculated from the product's original 'Purchase Date'.

### 5.2.3 Enforcement Point

Backend service logic upon creation of the warranty record.

### 5.2.4 Violation Handling

N/A - This is a calculation rule.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

There is no system-enforced limit to the number of warranties a user can add to a single product.

### 5.3.3 Enforcement Point

N/A - This is a system capability rule.

### 5.3.4 Violation Handling

N/A.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

A product must be registered in the system before an additional warranty can be added to it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-032

#### 6.1.2.2 Dependency Reason

The basic digital warranty card view must exist to provide a starting point for adding a new warranty and for displaying it.

## 6.2.0.0 Technical Dependencies

- The database schema must support a one-to-many relationship between a Product and its Warranties. This may require a schema migration.
- A functioning file upload service that integrates with Azure Blob Storage.
- A new API endpoint (e.g., POST /api/v1/products/{productId}/warranties) must be created.

## 6.3.0.0 Data Dependencies

- Requires an existing registered product with a valid 'Purchase Date' to calculate the new warranty's expiry.

## 6.4.0.0 External Dependencies

- Azure Blob Storage service must be available and configured for storing uploaded documents.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for adding a warranty, including file upload, should have a P95 response time of less than 500ms (as per SRS 5.1).
- File uploads must be handled asynchronously to avoid blocking the user interface.

## 7.2.0.0 Security

- Uploaded warranty documents must be stored securely in Azure Blob Storage with encryption at rest.
- Access to warranty documents via generated URLs must be authenticated and authorized, ensuring only the product owner and relevant admins can view them.
- Server-side validation must be implemented to prevent malicious file uploads.

## 7.3.0.0 Usability

- The process of adding a new warranty should be intuitive and require minimal steps.
- Error messages should be clear, concise, and helpful.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported mobile OS versions (iOS 14+, Android 8.0+) and web browsers (latest stable Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Potential database schema migration from a one-to-one to a one-to-many relationship for products and warranties.
- Frontend UI/UX work to design and implement an intuitive way to display and toggle between multiple warranty cards.
- Backend logic to handle file upload, data persistence, and expiry date calculation.

## 8.3.0.0 Technical Risks

- The schema migration must be handled carefully to avoid data loss for existing products.
- The UI for toggling between warranties could become cluttered if a user adds many warranties to one product; consider UX for this edge case.

## 8.4.0.0 Integration Points

- Backend: Azure Database for PostgreSQL (schema change, new record creation).
- Backend: Azure Blob Storage (file storage).
- Frontend: API endpoint for creating the warranty.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Usability

## 9.2.0.0 Test Scenarios

- Add a second warranty to a product.
- Add a third warranty to the same product.
- Attempt to add a warranty with invalid data (no file, bad duration).
- Verify correct expiry date calculation for different durations (e.g., 18 months, 3 years).
- Upload different file types (PDF, JPG, PNG) and sizes (within limits).
- Cancel the 'Add Warranty' flow midway.
- Verify that toggling between cards shows the correct, distinct information for each warranty.

## 9.3.0.0 Test Data Needs

- A test user account with at least one registered product.
- Sample valid document files (PDF, JPG, PNG).
- Sample invalid files (e.g., .exe, oversized files) for security testing.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for web E2E tests.
- Postman/Insomnia for API endpoint testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic meets the 80% project standard.
- Automated E2E tests for the happy path and key error conditions are created and passing.
- Database migration scripts have been written, tested, and are ready for deployment.
- The feature has been successfully tested on all supported target platforms (iOS, Android, Web).
- Security review of the file upload mechanism has been completed.
- Any new UI components are responsive and meet accessibility standards.
- Relevant documentation (e.g., API specification) has been updated.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- The database schema migration should be the first task addressed and must be coordinated across the team.
- This story is a prerequisite for US-100 ('User Toggles Between Multiple Warranty Cards'), and they should ideally be planned in consecutive sprints or together if the team has capacity.

## 11.4.0.0 Release Impact

This is a significant feature enhancement that improves the core value proposition of the application. It should be highlighted in release notes and user communications.

