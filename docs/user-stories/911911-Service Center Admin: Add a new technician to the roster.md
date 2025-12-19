# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-069 |
| Elaboration Date | 2024-05-22 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Add a new technician to the ... |
| As A User Story | As a Service Center Admin, I want to create a new ... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Enables the core operational workflow of assigning... |
| Functional Area | Service Center Management |
| Story Theme | Technician & Roster Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully add a new technician with all required information

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Service Center Admin on the 'Manage Technicians' page

### 3.1.5 When

I click 'Add New Technician', fill in all required fields (Full Name, Email, Contact Number) with valid data, and click 'Save'

### 3.1.6 Then

The system creates a new technician profile linked to my service center, the new technician appears in the roster list, and a success message 'Technician [Technician Name] added successfully' is displayed.

### 3.1.7 Validation Notes

Verify the new technician record exists in the database and is correctly associated with the service center's ID. Verify the new technician is visible in the UI list.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully add a technician with optional information

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Add New Technician' form

### 3.2.5 When

I fill in all required fields and also upload a valid photo (JPG/PNG, <5MB) and add text to the 'Skills/Certifications' field, then click 'Save'

### 3.2.6 Then

The technician is created successfully, and their profile in the roster list displays the uploaded photo and skills information.

### 3.2.7 Validation Notes

Verify the photo is successfully uploaded to Azure Blob Storage and the URL is stored with the technician's record. Verify the skills text is saved correctly.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to add a technician with missing required fields

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the 'Add New Technician' form

### 3.3.5 When

I attempt to save the form without filling in the 'Email' field

### 3.3.6 Then

The form submission is blocked, an inline validation error message 'Email is required' is displayed next to the email field, and the form remains on screen.

### 3.3.7 Validation Notes

Test this for each required field (Full Name, Email, Contact Number) individually.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to add a technician with an already existing email

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A user with the email 'tech@example.com' already exists in the identity provider (Azure AD B2C)

### 3.4.5 When

I attempt to create a new technician with the email 'tech@example.com'

### 3.4.6 Then

The system prevents the creation and displays a user-friendly error message, such as 'A user with this email address already exists.'

### 3.4.7 Validation Notes

This requires checking against the central identity provider, not just the local database. The check must be case-insensitive.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to upload an invalid file for the technician photo

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the 'Add New Technician' form

### 3.5.5 When

I attempt to upload a file that is larger than 5MB or is not a JPG/PNG format

### 3.5.6 Then

The system rejects the file and displays an informative error message, such as 'File size must be under 5MB' or 'Invalid file type. Please use JPG or PNG.'

### 3.5.7 Validation Notes

Test with oversized files and unsupported file types like .gif, .pdf, .tiff.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Cancel the add technician process

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

I am on the 'Add New Technician' form and have entered some data

### 3.6.5 When

I click the 'Cancel' button

### 3.6.6 Then

The form closes, no data is saved, and I am returned to the 'Manage Technicians' list view.

### 3.6.7 Validation Notes

Verify no new record was created in the database or identity provider.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

New technician receives an account setup invitation

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A new technician profile has been successfully created via the admin panel

### 3.7.5 When

The creation process completes successfully

### 3.7.6 Then

The system automatically sends an invitation email to the new technician's email address containing a link and instructions to set up their account password for the mobile app.

### 3.7.7 Validation Notes

Verify the email is triggered and sent via Azure Communication Services. The link should be a secure, one-time-use link for password setup.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A prominent 'Add New Technician' button on the technician roster page.
- A modal dialog or dedicated page for the 'Add New Technician' form.
- Input field: Full Name (Text, required)
- Input field: Email (Email, required, unique)
- Input field: Contact Number (Tel, required)
- File uploader for Photo (Optional, with client-side validation for file type/size)
- Text area for Skills/Certifications (Optional)
- Primary action button: 'Save' or 'Create Technician'
- Secondary action button: 'Cancel'

## 4.2.0 User Interactions

- Clicking 'Add New Technician' opens the form.
- The 'Save' button is disabled until all required fields are filled.
- Real-time inline validation provides feedback on invalid data formats (e.g., for email).
- A success toast/notification appears upon successful creation.
- Error messages are displayed clearly, either inline or as a summary at the top of the form.

## 4.3.0 Display Requirements

- The form should have a clear title, e.g., 'Add New Technician'.
- Required fields must be clearly marked with an asterisk (*).
- File upload constraints (size, type) should be displayed as helper text.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags.
- The form must be fully navigable and operable using only a keyboard.
- Validation errors must be programmatically associated with their respective fields for screen readers.
- The UI must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-TECH-001

### 5.1.2 Rule Description

A technician's email address must be unique across the entire platform.

### 5.1.3 Enforcement Point

Backend service, during the creation of the technician profile.

### 5.1.4 Violation Handling

The API request fails with a 409 Conflict status code and a clear error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-TECH-002

### 5.2.2 Rule Description

A newly created technician must be automatically associated with the Service Center of the admin who created them.

### 5.2.3 Enforcement Point

Backend service, during the creation of the technician profile.

### 5.2.4 Violation Handling

This is an integrity constraint. The service must use the admin's session/token to identify their service center and enforce the link. A failure would result in a 500 Internal Server Error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-060

#### 6.1.1.2 Dependency Reason

The Service Center Admin must be able to log in and access their panel before they can manage technicians.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-061

#### 6.1.2.2 Dependency Reason

A dashboard or view for incoming service requests is needed, which will likely house the link to the 'Manage Technicians' section.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C: The backend service requires API access to create new user accounts.
- Azure Blob Storage: A configured storage container is needed for technician photo uploads.
- Azure Communication Services: Required for sending the account setup/invitation email.
- Database Schema: The `technicians` table must exist with columns for all profile fields and a foreign key to the `service_centers` table.

## 6.3.0.0 Data Dependencies

- The `service_center_id` of the currently authenticated Service Center Admin must be available to the backend service to correctly associate the new technician.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for creating a technician (including external calls) should be under 2000ms at the 95th percentile.
- The 'Add New Technician' form UI should load in under 1 second.

## 7.2.0.0 Security

- The API endpoint for creating technicians must be protected and only accessible by users with the 'Service Center Admin' role.
- All PII (name, email, phone) must be encrypted at rest in the database and in transit using TLS 1.3.
- File uploads must be scanned for malware and validated to prevent security vulnerabilities.

## 7.3.0.0 Usability

- The process of adding a technician should be intuitive and require minimal training.
- Error messages must be clear, user-friendly, and guide the user on how to correct the issue.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The Service Center web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration with the Azure AD B2C Graph API for user creation, which requires secure handling of credentials/tokens and error states.
- Orchestration of multiple service calls: 1) Create user in AD B2C, 2) Upload photo to Blob Storage, 3) Save record in PostgreSQL, 4) Trigger invitation email. This flow needs to be robust and handle partial failures.
- Implementing a transactional or compensatory logic to ensure data consistency between the local database and the external identity provider.

## 8.3.0.0 Technical Risks

- Latency or failure in the Azure AD B2C API could impact the user experience. Proper retry logic and user feedback are necessary.
- Potential for orphaned records if one step in the creation process fails. For example, a user is created in AD B2C but the local DB write fails.

## 8.4.0.0 Integration Points

- Backend User Management Service <-> Azure AD B2C API
- Backend User Management Service <-> Azure Blob Storage API
- Backend User Management Service <-> Azure Communication Services API
- Backend User Management Service <-> PostgreSQL Database

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful creation of a technician with and without optional data.
- Verify all form validation rules (required, format, uniqueness).
- Verify file upload constraints (size, type).
- Verify the end-to-end flow, including the receipt of the invitation email by a test account.
- Verify role-based access control prevents unauthorized users (e.g., a regular User or Technician) from accessing the creation endpoint.

## 9.3.0.0 Test Data Needs

- A test Service Center Admin account.
- A set of valid and invalid data for technician profiles (e.g., invalid emails, phone numbers).
- Test image files of various sizes and formats (valid and invalid).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (End-to-End)
- Azure Portal/CLI for verifying resource creation (AD B2C user, Blob file).

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in the staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the 80% project standard.
- Integration tests for Azure AD B2C and Blob Storage are implemented and passing.
- E2E test script for adding a technician is created and passing.
- The UI is responsive and meets accessibility (WCAG 2.1 AA) standards.
- Security checks, including endpoint authorization, have been verified.
- Relevant documentation (e.g., API spec, user guide) has been updated.
- The feature has been successfully deployed and verified in the staging environment by a QA engineer.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a blocker for technician assignment (US-065).
- Requires prior setup of service principal/managed identity with appropriate permissions on Azure AD B2C.
- The team needs to be familiar with the Azure SDKs for Node.js (Identity, Storage, Communication Services).

## 11.4.0.0 Release Impact

This is a foundational feature for the Service Center portal. The platform cannot fully launch to service centers without this capability.

