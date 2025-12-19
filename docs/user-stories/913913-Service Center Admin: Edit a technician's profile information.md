# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-070 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: Edit a technician's profile ... |
| As A User Story | As a Service Center Admin, I want to edit the prof... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Maintains data integrity for operational staff, wh... |
| Functional Area | Service Center Management |
| Story Theme | Technician Roster Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully update a technician's profile with valid data

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Service Center Admin viewing the 'Technician Roster' page for my service center

### 3.1.5 When

I click the 'Edit' action for a technician, change their 'Contact Number' and 'Skills', and click the 'Save Changes' button

### 3.1.6 Then

The system validates the input, saves the updated information, displays a success message like 'Technician profile updated successfully', and the roster list reflects the updated contact number.

### 3.1.7 Validation Notes

Verify the database record for the technician is updated. The UI on the roster page must show the new information without a page refresh.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Attempt to save with invalid data

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am on the 'Edit Technician' form

### 3.2.5 When

I enter an invalid email format (e.g., 'john.doe@invalid') and click 'Save Changes'

### 3.2.6 Then

The system prevents the form from submitting and displays an inline error message next to the email field, such as 'Please enter a valid email address'.

### 3.2.7 Validation Notes

Check that no API call is made to the backend if client-side validation fails. If server-side validation fails, the API should return a 400 Bad Request status with a clear error message.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to save with a required field left blank

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the 'Edit Technician' form

### 3.3.5 When

I clear the 'Full Name' field and click 'Save Changes'

### 3.3.6 Then

The system prevents the form from submitting and displays an inline error message, such as 'Full Name is required'.

### 3.3.7 Validation Notes

Verify that required fields (e.g., Full Name, Contact Number, Email) cannot be saved as empty.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Cancel the edit operation after making changes

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am on the 'Edit Technician' form and have modified several fields

### 3.4.5 When

I click the 'Cancel' button

### 3.4.6 Then

The system discards all changes, closes the form/modal, and returns me to the technician roster page with the original data unchanged.

### 3.4.7 Validation Notes

A confirmation dialog ('Are you sure you want to discard changes?') should be considered for better UX. Verify no update API call was made.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Update a technician's profile photo

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am on the 'Edit Technician' form

### 3.5.5 When

I upload a new valid image file (JPG, PNG, < 5MB) for the technician's photo and click 'Save Changes'

### 3.5.6 Then

The new photo is uploaded, a success message is shown, and the technician's profile picture is updated in the roster view.

### 3.5.7 Validation Notes

Test with various image sizes and formats. Test the error handling for invalid file types or sizes.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Unauthorized access attempt

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am a logged-in Service Center Admin for 'Center A'

### 3.6.5 When

I attempt to access the edit page for a technician belonging to 'Center B' via a direct URL

### 3.6.6 Then

The system must deny access and return a '403 Forbidden' error page or message.

### 3.6.7 Validation Notes

This must be enforced on the backend API by checking if the technician's `service_center_id` matches the admin's authorized `service_center_id`.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Edit' icon or button next to each technician in the roster list.
- A modal or dedicated page for the edit form.
- Input fields for: Full Name (text), Contact Number (text, tel), Email (text, email).
- A file upload component for the profile photo with a preview.
- A multi-select dropdown or tag input for 'Skills/Certifications'.
- 'Save Changes' and 'Cancel' buttons.
- Success and error notification components (e.g., toasts or banners).

## 4.2.0 User Interactions

- Clicking 'Edit' opens the form pre-populated with the selected technician's current data.
- Form fields provide real-time or on-submit validation feedback.
- Clicking 'Save Changes' triggers a loading state, then shows a success/error message.
- Clicking 'Cancel' closes the form, discarding any changes.

## 4.3.0 Display Requirements

- The form must clearly display all editable fields for a technician profile.
- The technician's current active/inactive status should be visible on the edit form, though not necessarily editable in this story.

## 4.4.0 Accessibility Needs

- All form inputs must have associated `<label>` tags.
- The form must be fully navigable and operable using only a keyboard.
- Validation errors must be programmatically associated with their respective inputs.
- The UI must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-TECH-01

### 5.1.2 Rule Description

A technician's email address must be unique within the platform to support potential future direct login capabilities.

### 5.1.3 Enforcement Point

Backend API during the save/update operation.

### 5.1.4 Violation Handling

The API will return a 409 Conflict error with a message: 'This email address is already in use by another technician.'

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-TECH-02

### 5.2.2 Rule Description

A Service Center Admin can only edit technicians who are part of their own service center roster.

### 5.2.3 Enforcement Point

Backend API middleware or service layer for any technician-related update endpoint.

### 5.2.4 Violation Handling

The API will return a 403 Forbidden status code.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-060

#### 6.1.1.2 Dependency Reason

Admin must be able to log in to access any functionality.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-069

#### 6.1.2.2 Dependency Reason

A technician must be created before their profile can be edited. This story defines the data model for a technician.

## 6.2.0.0 Technical Dependencies

- Authentication service (Azure AD B2C) to identify the admin and their role.
- Authorization logic to enforce service center boundaries.
- Azure Blob Storage for handling profile photo uploads.
- Backend API endpoint for updating technician data.

## 6.3.0.0 Data Dependencies

- Requires existing technician records in the database to edit.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the update operation (P95) must be less than 500ms.
- The edit form should load pre-populated data in under 1 second.

## 7.2.0.0 Security

- The API endpoint must be protected and require authentication and role-based authorization (Service Center Admin).
- All user-provided input must be sanitized on the backend to prevent XSS and other injection attacks.
- The system must validate that the authenticated admin belongs to the same service center as the technician being edited.

## 7.3.0.0 Usability

- The editing process should be intuitive, requiring minimal training.
- Error messages must be clear and guide the user on how to correct the input.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The web panel must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing the file upload component for the profile photo, including preview, validation, and secure transfer to Azure Blob Storage.
- Ensuring the backend authorization logic is robust and correctly isolates data between service centers.
- Designing a user-friendly UI for managing a potentially long list of skills/certifications.

## 8.3.0.0 Technical Risks

- Improper handling of file uploads could pose a security risk.
- Incorrectly implemented authorization could lead to a data breach between service centers.

## 8.4.0.0 Integration Points

- The backend service that manages service center data.
- The PostgreSQL database `technicians` table.
- Azure Blob Storage for photo assets.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify each field can be updated individually and all at once.
- Test form validation for all fields with both valid and invalid data.
- Test photo upload with different file types (JPG, PNG, GIF, SVG) and sizes (valid and oversized).
- Test the cancellation flow to ensure no data is saved.
- Perform a security test where an admin from Center A attempts to edit a technician from Center B using a manipulated API call.

## 9.3.0.0 Test Data Needs

- At least two service centers, each with at least two technicians.
- User accounts for a Service Center Admin for each center.
- Sample image files of various types and sizes.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend API tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >= 80% coverage for new code
- E2E test scenario for the happy path is automated and passing
- User interface reviewed for usability and adherence to design specifications
- Security requirements, especially authorization checks, are validated
- Accessibility audit passed for the new form components
- API documentation (OpenAPI/Swagger) is updated for the PATCH/PUT endpoint
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core CRUD functionality for service center management and a prerequisite for maintaining accurate operational data. It should be prioritized shortly after the ability to create technicians is complete.

## 11.4.0.0 Release Impact

- Enables service centers to self-manage their staff data, reducing the support burden on Super Admins and improving data quality across the platform.

