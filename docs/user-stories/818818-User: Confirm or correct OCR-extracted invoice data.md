# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-022 |
| Elaboration Date | 2024-05-22 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Confirm or correct OCR-extracted invoice dat... |
| As A User Story | As a User registering a new product, I want to rev... |
| User Persona | The end-user (Consumer) of the web or mobile appli... |
| Business Value | Increases the accuracy and reliability of user-sub... |
| Functional Area | User Product Registration |
| Story Theme | Product Onboarding & Data Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: All required fields are successfully extracted by OCR and confirmed by the user

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user has successfully uploaded a clear invoice image via the product registration flow

### 3.1.5 When

The OCR service processes the image and successfully extracts the Brand, Model, Serial Number, and Purchase Date

### 3.1.6 Then

The user is presented with a confirmation screen displaying the uploaded invoice image.

### 3.1.7 And

The system saves the confirmed data and proceeds to the next step in the product registration flow.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Alternative Flow: OCR partially extracts data and the user corrects and completes the form

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

A user has uploaded an invoice where the OCR could only extract the Brand and Purchase Date

### 3.2.5 When

The user manually types the correct Model and Serial Number into the empty fields.

### 3.2.6 Then

The system validates and saves all the user-provided data and proceeds with product registration.

### 3.2.7 And

The user clicks the 'Confirm' button.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: OCR fails to extract any data and user manually enters all information

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A user has uploaded a low-quality invoice and the OCR service fails to extract any required fields

### 3.3.5 When

The user manually fills in all the required fields.

### 3.3.6 Then

The system validates and saves the data, proceeding with product registration.

### 3.3.7 And

The user clicks the 'Confirm' button.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: User attempts to confirm with missing required information

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A user is on the invoice confirmation screen and the Serial Number field is empty

### 3.4.5 When

The user clicks the 'Confirm' button without entering the Serial Number

### 3.4.6 Then

The form submission is prevented.

### 3.4.7 And

The field is visually highlighted to draw the user's attention.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Condition: User enters data in an invalid format

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A user is on the invoice confirmation screen

### 3.5.5 When

The user enters a Purchase Date that is in the future

### 3.5.6 And

An inline validation error message appears, such as 'Purchase Date cannot be in the future'.

### 3.5.7 Then

The form submission is prevented.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Edge Case: User decides to re-upload a different invoice

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A user is on the invoice confirmation screen and realizes they uploaded the wrong document

### 3.6.5 When

The user clicks a 'Back' or 'Re-upload' button

### 3.6.6 Then

The user is navigated back to the invoice upload step (from US-021).

### 3.6.7 And

Any data entered on the confirmation screen is discarded.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An area to display the uploaded invoice image or PDF thumbnail.
- Input fields for: Brand, Model, Serial Number, Purchase Date.
- A date picker component for the Purchase Date field.
- A primary 'Confirm' or 'Save & Continue' button.
- A secondary 'Back' or 'Re-upload' button.
- Visual indicators (e.g., asterisk *) for mandatory fields.
- Inline error message containers for validation feedback.

## 4.2.0 User Interactions

- The user can edit text in any of the pre-populated input fields.
- The user can type text into any of the empty input fields.
- Clicking the Purchase Date field opens a calendar/date picker.
- The 'Confirm' button is disabled until all required fields are filled.
- The UI should be responsive, adapting the layout of the image and form for mobile and web screens.

## 4.3.0 Display Requirements

- The system must clearly display which data was automatically extracted versus what needs to be entered manually.
- Validation errors must be displayed clearly and be associated with the relevant input field.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags.
- The interface must be fully navigable using a keyboard.
- Error messages must be programmatically linked to their inputs using `aria-describedby` to be accessible to screen readers.
- The UI must adhere to WCAG 2.1 Level AA contrast and text size guidelines.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The Purchase Date for a product cannot be a future date.

### 5.1.3 Enforcement Point

Client-side form validation and server-side API validation upon submission.

### 5.1.4 Violation Handling

The system rejects the submission and displays a user-friendly error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Both the raw OCR-extracted text and the final user-confirmed data must be stored.

### 5.2.3 Enforcement Point

Backend service logic upon form submission.

### 5.2.4 Violation Handling

N/A - This is a system storage requirement to facilitate accuracy improvements.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-021

#### 6.1.1.2 Dependency Reason

This story is for confirming data extracted from an invoice that must first be uploaded in US-021.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-019

#### 6.1.2.2 Dependency Reason

The product registration flow, form structure, and validation logic are established in US-019 and will be reused here.

## 6.2.0.0 Technical Dependencies

- A functioning OCR service API endpoint that accepts an image/PDF and returns structured data.
- A backend API endpoint to receive the user-confirmed data and continue the product registration process.
- Frontend state management library (Zustand) for handling form state.

## 6.3.0.0 Data Dependencies

- Access to the temporarily stored invoice file (from US-021) to display to the user.
- The JSON response from the OCR service containing the extracted key-value pairs.

## 6.4.0.0 External Dependencies

- Availability of the third-party or internal OCR service.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The confirmation screen, with the invoice image and pre-populated form, must load in under 1.5 seconds after OCR processing is complete.
- The API response time for submitting the confirmed data must be under 500ms (P95).

## 7.2.0.0 Security

- All user-submitted data must be sanitized on the backend to prevent XSS and other injection attacks.
- Communication between the client and server must be over HTTPS using TLS 1.3.

## 7.3.0.0 Usability

- The layout should be intuitive, making it easy for the user to compare the invoice image with the form fields.
- The process of correcting data should be frictionless and straightforward.

## 7.4.0.0 Accessibility

- The feature must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The feature must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge, and on supported iOS/Android versions as per the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Designing a responsive UI that effectively displays both an image and a form on various screen sizes.
- Handling the full lifecycle of OCR data: request, response, potential failure, and mapping results to form fields.
- Managing form state, including pre-population, user edits, and validation.
- Backend logic to store both raw OCR and confirmed user data for future analysis.

## 8.3.0.0 Technical Risks

- The OCR service may have high latency or inconsistent accuracy, requiring robust error handling and a smooth UX for manual correction.
- Mapping the varied and unstructured output of an OCR service to a standardized set of form fields can be complex.

## 8.4.0.0 Integration Points

- Internal OCR Service (or third-party equivalent).
- Product Registration Service (backend API).
- Azure Blob Storage (for retrieving the invoice image).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility
- Usability

## 9.2.0.0 Test Scenarios

- Test with an invoice where all data is extracted correctly.
- Test with an invoice where some data is missing.
- Test with a blurry/unreadable invoice where no data is extracted.
- Test all validation rules (e.g., future date, required fields).
- Test the 'Back' button functionality to ensure the user can re-upload.
- Test on both mobile and web viewports to ensure responsiveness.

## 9.3.0.0 Test Data Needs

- A set of sample invoice images: high-quality, low-quality, skewed, different formats (JPG, PNG, PDF).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (End-to-End)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% code coverage
- End-to-end tests for the confirmation flow are written and passing
- User interface is responsive and has been reviewed and approved by a UX designer
- Accessibility (WCAG 2.1 AA) standards have been met and verified
- Performance requirements for screen load and API submission are met
- All backend input is validated and sanitized
- Story deployed and verified in the staging environment without regressions

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-021 and cannot be started until the invoice upload functionality is complete.
- Access to a stable OCR service endpoint (or a reliable mock) is required for development and testing.

## 11.4.0.0 Release Impact

This is a critical feature for the product registration flow, directly impacting data quality for the entire platform.

