# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-020 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Manually Enters Product Details When OCR Fail... |
| As A User Story | As a User trying to register a product, I want to ... |
| User Persona | End-User/Consumer using the web or mobile applicat... |
| Business Value | Ensures a resilient and frustration-free product r... |
| Functional Area | User Product Registration |
| Story Theme | Product Onboarding Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

OCR process fails completely to extract any data

### 3.1.3 Scenario Type

Error_Condition

### 3.1.4 Given

A user has uploaded an invoice and initiated the OCR scan process

### 3.1.5 When

The OCR process completes and returns a 'failure' status, indicating no data could be extracted

### 3.1.6 Then

The system displays the manual product registration form.

### 3.1.7 And

The previously uploaded invoice image remains visible on the screen for user reference.

### 3.1.8 Validation Notes

Verify by mocking an OCR API response that returns a total failure. Confirm the UI transitions correctly and all fields are blank.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

OCR process times out or encounters a system error

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A user has initiated an OCR scan on an uploaded invoice

### 3.2.5 When

The request to the OCR service times out or returns a server-side error (e.g., 5xx status code)

### 3.2.6 Then

The system treats this as a failure and transitions the user to the manual entry form.

### 3.2.7 And

All product detail fields are empty and ready for manual input.

### 3.2.8 Validation Notes

Use a tool like Charles Proxy or mock the API call to simulate a timeout or a 503 error. Ensure the UI handles the error gracefully.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User proactively skips the OCR process

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A user has uploaded an invoice and the OCR scan is in progress

### 3.3.5 When

The user clicks a 'Skip Scan' or 'Enter Manually' button

### 3.3.6 Then

The ongoing OCR process is cancelled on the client-side.

### 3.3.7 And

The uploaded invoice image remains visible for reference.

### 3.3.8 Validation Notes

Verify that the 'Enter Manually' button is visible during the OCR loading state and that clicking it correctly transitions the view without waiting for the OCR process to finish.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User successfully completes manual entry after OCR failure

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A user has been presented with the manual entry form after an OCR failure

### 3.4.5 When

The user manually fills in all the required product details and submits the form

### 3.4.6 Then

The product is successfully registered in the user's account, linked to the uploaded invoice.

### 3.4.7 And

The user is navigated to the success screen or the newly created digital warranty card.

### 3.4.8 Validation Notes

Perform an end-to-end test: trigger an OCR failure, manually fill the form, submit, and verify the product appears correctly in the user's product list.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A non-modal, user-friendly notification/toast to inform the user about the OCR failure.
- Standard input fields for Brand, Model, Serial Number.
- A date-picker component for the 'Purchase Date' field.
- A 'Skip Scan' or 'Enter Manually' button, visible during the OCR processing state.
- A persistent view of the uploaded invoice image alongside the manual entry form.

## 4.2.0 User Interactions

- The transition from the OCR loading/review state to the manual form should be seamless and not require a page reload.
- Standard form interactions: keyboard should appear for text fields, date picker should open for date field.
- The user must be able to complete the registration using the same 'Submit' or 'Register Product' button used in the standard manual flow.

## 4.3.0 Display Requirements

- Error messages must be clear, concise, and avoid technical jargon.
- The manual entry form must adhere to the application's existing design system and branding.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags for screen readers.
- Error messages must be programmatically linked to their respective input fields using `aria-describedby`.
- The 'Enter Manually' button must be keyboard-focusable and have a clear focus indicator.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'The manual entry form presented after an OCR failure must enforce the same validation rules as the standard manual registration form (e.g., required fields, data formats).', 'enforcement_point': 'Client-side upon form submission and Server-side upon API request.', 'violation_handling': 'Display clear, inline validation errors next to the corresponding fields.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

This story provides the core manual registration form and backend logic that US-020 reuses as a fallback mechanism.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-017

#### 6.1.2.2 Dependency Reason

The user must be able to upload an invoice, which is the trigger for the OCR process that might fail.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-018

#### 6.1.3.2 Dependency Reason

The OCR feature must be implemented for its failure state to trigger the flow described in this story. These stories are tightly coupled.

## 6.2.0.0 Technical Dependencies

- A defined API contract from the OCR service that clearly indicates success, partial success, or failure states.
- The client-side application must have a state management solution (e.g., Redux, Zustand) to handle the different states of the OCR process (idle, loading, success, failure).

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The transition from the OCR failure state to displaying the manual form must occur in under 500ms.

## 7.2.0.0 Security

- All data submitted through the manual form must be transmitted over HTTPS and be subject to the same input sanitization and validation as any other form in the application to prevent XSS and other injection attacks.

## 7.3.0.0 Usability

- The user must not lose the context of their task. The uploaded invoice must remain visible to avoid forcing the user to rely on memory.
- The messaging should be supportive, guiding the user to the next step rather than simply stating a failure.

## 7.4.0.0 Accessibility

- The flow must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The functionality must be consistent across supported browsers (Chrome, Firefox, Safari, Edge) and mobile OS versions (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- The core functionality (manual form) is already defined in US-015.
- This story is primarily concerned with client-side state management and conditional rendering.
- Complexity depends on a clear and consistent API response from the OCR service.

## 8.3.0.0 Technical Risks

- The OCR service API might not provide distinct, easily parsable error states, requiring more complex error handling logic on the client.

## 8.4.0.0 Integration Points

- Frontend client's integration with the OCR processing API endpoint.
- Frontend client's use of the existing manual product registration API endpoint.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Test with an API mock that returns a complete OCR failure.
- Test with an API mock that returns a 500 server error.
- Test the user flow of clicking the 'Enter Manually' button during the OCR loading state.
- End-to-end test: Upload an unreadable invoice, fill the form manually, submit, and verify the product is created.

## 9.3.0.0 Test Data Needs

- A sample image file that is known to cause OCR failure (e.g., a blurry photo, a blank image, an unsupported format).
- Valid product details for manual entry testing.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress (for web) or Appium (for mobile) for E2E tests.
- API mocking tools like MSW (Mock Service Worker) or Mirage JS.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for state transitions and component rendering, achieving >= 80% coverage
- Integration testing completed successfully for the OCR failure-to-manual-entry flow
- User interface reviewed and approved by UX/UI designer
- Performance requirements for UI transition verified
- Security requirements validated via code review
- Documentation for the OCR API error handling is updated if necessary
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is critical for the release of the OCR feature. It should be planned in the same sprint as US-018 (OCR Processing) and US-019 (OCR Review) to deliver a complete and robust feature.
- Requires close collaboration between frontend and backend to align on the OCR API's error response structure.

## 11.4.0.0 Release Impact

Without this story, the OCR feature (US-018) is not production-ready as it lacks a failure-handling mechanism, posing a significant risk to the user experience.

