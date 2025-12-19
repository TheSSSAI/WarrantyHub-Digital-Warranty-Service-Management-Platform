# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-031 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Request an administrative change for locked ... |
| As A User Story | As a registered user, I want to initiate a formal ... |
| User Persona | Registered User/Consumer |
| Business Value | Provides a controlled workflow for correcting crit... |
| Functional Area | Product Management |
| Story Theme | User Account & Data Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User successfully submits a correction request for a locked product

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of a product for which a service request has previously been raised, and the 'Serial Number', 'Purchase Date', and 'Model' fields are non-editable

### 3.1.5 When

I enter a new value for at least one field, provide a reason, and click 'Submit Request'

### 3.1.6 Then

The system validates the inputs and creates a support ticket in the backend with a 'Pending Review' status.

### 3.1.7 And

I receive an email and a push notification confirming the submission of my request.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: User attempts to submit the form without providing a reason

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I have opened the 'Request Correction' form and entered a new value for a locked field

### 3.2.5 When

I click 'Submit Request' without filling in the 'Reason for Change' field

### 3.2.6 Then

The form displays an inline validation error message, such as 'A reason for the change is required', and the request is not submitted.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: User attempts to submit the form without changing any values

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I have opened the 'Request Correction' form

### 3.3.5 When

I click 'Submit Request' without entering any new values in the input fields

### 3.3.6 Then

The form displays a validation error message, such as 'Please provide at least one corrected value to submit a request', and the request is not submitted.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: User uploads an invalid file type or size

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the 'Request Correction' form

### 3.4.5 When

I attempt to upload a file that is larger than 10MB or is not a PDF, JPG, or PNG

### 3.4.6 Then

The UI displays an immediate error message indicating the file is invalid, and the file is not attached to the request.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: A correction request is already pending for the product

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I have previously submitted a correction request for a specific product, and its status is still 'Pending Review'

### 3.5.5 When

I view the details page for that same product

### 3.5.6 Then

The 'Request Correction' button is disabled or replaced with text indicating the status, such as 'Correction Request Pending'.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Alternative Flow: User cancels the correction request

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

I have opened the 'Request Correction' form

### 3.6.5 When

I click the 'Cancel' button or close the modal

### 3.6.6 Then

The form closes, no request is created, and I am returned to the product details view.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Request Correction' button or link, visible on the product details page when fields are locked.
- A modal dialog or dedicated form for the correction request.
- Read-only display fields for current values.
- Input fields for new values (text for Serial/Model, date picker for Purchase Date).
- A mandatory text area for the reason.
- A file input component for evidence upload with clear constraints displayed.
- Submit and Cancel buttons.
- Loading indicators during submission.
- Success and error notification banners/toasts.

## 4.2.0 User Interactions

- Clicking 'Request Correction' opens the form.
- The form should have client-side validation for required fields and file types/sizes.
- Closing the modal discards the request.
- Submitting the form triggers an API call and shows a loading state.

## 4.3.0 Display Requirements

- Locked fields must be visually distinct (e.g., greyed out) from editable fields.
- An info icon or tooltip should be present next to locked fields explaining why they are locked and how to request a change.

## 4.4.0 Accessibility Needs

- The form must be fully keyboard navigable.
- All form fields must have associated labels for screen readers.
- Validation errors must be programmatically associated with their respective fields and announced by screen readers.
- The modal must properly trap focus.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user can only have one active 'Pending Review' correction request per product at any given time.

### 5.1.3 Enforcement Point

Backend API before creating a new request; Frontend UI by disabling the request button.

### 5.1.4 Violation Handling

The API will return a 409 Conflict error. The UI will prevent the user from initiating a new request.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The correction request workflow is only available for products where critical details have been locked (i.e., after the first service request has been raised).

### 5.2.3 Enforcement Point

Frontend UI (the 'Request Correction' button is only shown/enabled when fields are locked).

### 5.2.4 Violation Handling

The option to initiate a request is not visible to the user.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-030

#### 6.1.1.2 Dependency Reason

Defines the initial editable state of product details before they are locked.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-036

#### 6.1.2.2 Dependency Reason

The action of raising a service request is the trigger that locks the product details, making this story's functionality necessary.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-001

#### 6.1.3.2 Dependency Reason

A Super Admin portal must exist to eventually handle and process the generated support tickets. This story creates the ticket; another story will be needed for an admin to resolve it.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint for submitting the request.
- Database schema for a new `product_correction_requests` table.
- Azure Blob Storage for storing uploaded evidence files.
- Notification service (FCM/Azure Communication Services) for user confirmations.

## 6.3.0.0 Data Dependencies

- Requires existing product data for a user.
- Requires a product to have a status indicating its details are locked.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for submitting the request, including file upload, should be under 2 seconds (P95).

## 7.2.0.0 Security

- The file upload endpoint must validate file types and sizes server-side.
- All uploaded files must be scanned for malware before being stored.
- The API endpoint must be protected and only accessible by the authenticated owner of the product.
- All data in the request must be encrypted in transit (TLS 1.3) and at rest.

## 7.3.0.0 Usability

- The process for requesting a correction should be intuitive and require minimal steps.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across supported web browsers (Chrome, Firefox, Safari, Edge) and mobile platforms (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires new UI components (modal/form with validation).
- Requires a new backend API endpoint and service logic.
- Requires a new database table and schema.
- Involves integration with blob storage for file uploads.
- Involves integration with a notification service.

## 8.3.0.0 Technical Risks

- Handling large file uploads efficiently without blocking the UI.
- Ensuring the atomicity of the operation (e.g., if file upload succeeds but DB write fails, the orphaned file must be handled).

## 8.4.0.0 Integration Points

- User Authentication Service (Azure AD B2C)
- Product Data Service
- Notification Service
- Azure Blob Storage

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify a user can successfully submit a request with all fields changed and with only one field changed.
- Verify validation errors for all required fields and invalid data formats.
- Verify the 'Request Correction' button is only visible/enabled for locked products.
- Verify the button is disabled if a request is already pending.
- Test file upload with valid and invalid file types/sizes.
- Verify that email and push notifications are triggered upon successful submission.
- Verify the created ticket in the database contains all the correct information.

## 9.3.0.0 Test Data Needs

- A test user account.
- A product registered to that user with its details in a 'locked' state (i.e., has at least one associated service request).
- A product registered to that user with its details in an 'unlocked' state to verify the button is not present.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- Vulnerability scanning tool for the file upload endpoint.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the project standard (e.g., >80%).
- Integration tests for the new API endpoint are implemented and passing.
- End-to-end tests covering the primary success and failure scenarios are implemented and passing.
- UI/UX has been reviewed and approved by the design team.
- Security review of the file upload mechanism has been completed.
- Accessibility checks (automated and manual) have been performed and passed.
- Documentation for the new API endpoint has been added to the OpenAPI specification.
- The corresponding story for the Admin to review/action this request has been created and linked.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story creates a dependency for a follow-up story where an admin can review and approve/reject these requests. The full value is not realized until both are complete.
- Requires coordination between frontend and backend developers.

## 11.4.0.0 Release Impact

This is a key feature for user satisfaction and data management. It should be included in the next major feature release.

