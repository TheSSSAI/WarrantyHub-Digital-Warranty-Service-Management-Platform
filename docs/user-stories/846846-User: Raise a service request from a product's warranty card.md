# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-036 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Raise a service request from a product's war... |
| As A User Story | As a registered user, I want to initiate a service... |
| User Persona | Consumer / End-User |
| Business Value | Streamlines the core process of requesting service... |
| Functional Area | Service Request Management |
| Story Theme | Product Servicing Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-036-01

### 3.1.2 Scenario

Happy Path: Successfully initiate and submit a service request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the digital warranty card for a product whose brand is approved and has an available service center for my location

### 3.1.5 When

I tap the 'Request Service' button, fill in all required fields (issue type, description, address, time slot), and tap 'Submit'

### 3.1.6 Then

A new service request ticket is created in the system with the status 'Requested', I see a success confirmation message, and I am redirected to the tracking screen for this new ticket.

### 3.1.7 Validation Notes

Verify ticket creation in the database with correct details. Verify the UI redirects correctly and the success message is displayed.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-036-02

### 3.2.2 Scenario

Form pre-population

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the digital warranty card for a registered product

### 3.2.5 When

I navigate to the 'New Service Request' form

### 3.2.6 Then

The Brand, Model, and Serial Number fields are automatically pre-populated with the product's information and are non-editable.

### 3.2.7 Validation Notes

Check the form fields upon loading to ensure they contain the correct data from the selected product.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-036-03

### 3.3.2 Scenario

Error Condition: Attempt to request service for a product with a pending brand

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am viewing the digital warranty card for a product whose brand is in a 'pending approval' state

### 3.3.5 When

I look for the option to request service

### 3.3.6 Then

The 'Request Service' button is disabled or hidden, and a clear message is displayed explaining that service is unavailable until the brand is approved.

### 3.3.7 Validation Notes

Use test data with a product linked to a pending brand. Verify the UI state and the presence of the informational message.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-036-04

### 3.4.2 Scenario

Error Condition: No service center available for the user's location

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I have filled out the service request form for a product

### 3.4.5 When

I submit the form, and the system determines there are no service centers for the product's brand in my geographical area

### 3.4.6 Then

The system does not create a service ticket, and I am shown an informative message with the brand's direct contact information.

### 3.4.7 Validation Notes

Configure test data so a user's location has no matching service center. Trigger the submission and verify that no ticket is created and the correct error message is displayed.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-036-05

### 3.5.2 Scenario

Error Condition: Form validation for required fields

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the 'New Service Request' form

### 3.5.5 When

I attempt to submit the form without filling in a required field, such as the problem description

### 3.5.6 Then

The form submission is prevented, and a clear validation error message is displayed next to the incomplete field.

### 3.5.7 Validation Notes

Attempt to submit the form with each required field left blank one by one and verify the correct error message appears.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-036-06

### 3.6.2 Scenario

Alternative Flow: User uploads media with the service request

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

I am filling out the service request form

### 3.6.5 When

I choose to upload up to 5 photos or 1 video (max 60 seconds) of the issue

### 3.6.6 Then

The media is successfully uploaded and associated with the service request ticket upon submission.

### 3.6.7 Validation Notes

Verify that the uploaded files are linked to the created ticket ID in Azure Blob Storage and are accessible from the service center panel.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-036-07

### 3.7.2 Scenario

Edge Case: Network error during form submission

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I have filled out the service request form and tapped 'Submit'

### 3.7.5 When

A network connection error occurs during the submission process

### 3.7.6 Then

I am shown a user-friendly error message, and the data I entered in the form is preserved, allowing me to retry the submission without re-entering everything.

### 3.7.7 Validation Notes

Use network throttling tools (like Chrome DevTools) to simulate a network failure on submit. Verify the error message and that form state is retained.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A prominent 'Request Service' button on the Digital Warranty Card view.
- A multi-section form for 'New Service Request'.
- Read-only fields for pre-populated product details (Brand, Model, Serial).
- Dropdown for 'Type of Issue'.
- Text area for 'Problem Description'.
- File upload component for photos/videos with progress indicator.
- Address selection/confirmation field.
- Date and time slot selection component.
- A 'Submit' button that is disabled until all required fields are valid.
- Success/Error message modals or toasts.

## 4.2.0 User Interactions

- Tapping 'Request Service' navigates the user to the form.
- The form should scroll smoothly on mobile devices.
- Selecting a date should dynamically show available time slots for that day.
- Tapping 'Submit' should show a loading indicator until a response is received.

## 4.3.0 Display Requirements

- Pre-populated product data must be clearly visible.
- Validation errors must be displayed inline, next to the relevant field.
- The success message must include the new service request ID for reference.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels for screen readers.
- All buttons must have accessible names.
- The UI must adhere to WCAG 2.1 Level AA contrast ratios and keyboard navigation standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SR-01

### 5.1.2 Rule Description

A service request cannot be created for a product associated with a Brand whose status is not 'Approved'.

### 5.1.3 Enforcement Point

UI (disabling the button) and API (rejecting the request).

### 5.1.4 Violation Handling

The UI prevents the action. If the API receives such a request, it should return a 403 Forbidden error with a clear message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SR-02

### 5.2.2 Rule Description

The system must automatically route the request to an appropriate service center based on brand and user location.

### 5.2.3 Enforcement Point

Backend service request processing logic.

### 5.2.4 Violation Handling

If no service center is found, the request is not created, and the user is notified with alternative instructions.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-025

#### 6.1.1.2 Dependency Reason

The Digital Warranty Card UI is the entry point for this story. It must exist to place the 'Request Service' button.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-098

#### 6.1.2.2 Dependency Reason

The backend logic for automatically routing a service request to a service center is triggered by this story's submission. The end-to-end flow cannot be completed without it.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-011

#### 6.1.3.2 Dependency Reason

The routing logic depends on service centers being linked to brands. This data must be present for routing to succeed.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-013

#### 6.1.4.2 Dependency Reason

The routing logic depends on the geographic service areas of service centers. This data is essential for location-based matching.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-041

#### 6.1.5.2 Dependency Reason

The user is redirected to the service request tracking screen upon successful submission. That screen must exist.

## 6.2.0.0 Technical Dependencies

- Azure Blob Storage for handling photo/video uploads.
- Service Request Microservice endpoint for creating the ticket.
- Service Center Microservice for providing routing data (locations, brand associations).
- PostGIS extension for performing geospatial queries for routing.

## 6.3.0.0 Data Dependencies

- Availability of approved brands in the system.
- Availability of approved service centers with defined geographic service areas and brand associations.
- Availability of issue types defined by Brand Admins (US-093).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The service request form page must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.
- The API response time for submitting the form (excluding file upload time) must be under 500ms at the 95th percentile.

## 7.2.0.0 Security

- All data transmitted between the client and server must be encrypted using HTTPS/TLS 1.3.
- The file upload mechanism must include validation for file types (PDF, JPG, PNG, MP4) and size (10MB for images, 60s for video).
- Backend services must re-validate that the user owns the product for which they are raising a request.

## 7.3.0.0 Usability

- The process of raising a request should be intuitive and require minimal steps.
- Error messages must be clear, concise, and guide the user on how to resolve the issue.

## 7.4.0.0 Accessibility

- The entire flow must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must be fully functional on supported versions of iOS, Android, and major web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend: Requires a multi-part form with complex state management, client-side validation, and handling of asynchronous file uploads with progress feedback.
- Backend: The API endpoint must orchestrate multiple actions: validate data, handle file streams, invoke the complex routing logic, create the ticket, and trigger notifications.
- Integration: This story is a critical integration point between the user-facing application and multiple backend microservices (Product, Service Center, Service Request).

## 8.3.0.0 Technical Risks

- The service center routing logic (US-098) could be complex to implement and test correctly, potentially blocking the completion of this story's end-to-end flow.
- Handling large file uploads on mobile devices with varying network conditions can be challenging and requires robust error handling and retry mechanisms.

## 8.4.0.0 Integration Points

- User Authentication Service (to identify the user).
- Product Service (to fetch product details).
- Service Request Service (to create the ticket).
- Service Center Service (to get data for routing).
- Azure Blob Storage (for file persistence).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful submission and ticket creation.
- Verify the UI and API correctly block requests for products of unapproved brands.
- Verify the user journey when no service centers are available.
- Test all form field validations (required, format, etc.).
- Test file uploads with valid and invalid file types/sizes.
- Test the flow on a slow network connection.

## 9.3.0.0 Test Data Needs

- A user account with registered products.
- Products linked to 'Approved' brands with configured service centers.
- Products linked to 'Pending' brands.
- A user/product located in an area with no service center coverage.
- Service centers with defined postal code and polygon service areas.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component).
- Jest & Supertest (Backend Unit/Integration).
- Playwright (End-to-End).
- Browser/Mobile device emulators for compatibility testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the 80% threshold.
- End-to-end automated tests for the happy path and key error conditions are created and passing.
- The feature has been manually tested and approved by QA on target mobile and web platforms.
- All related non-functional requirements (performance, security) have been met.
- UI/UX has been reviewed and approved by the design team.
- Any necessary documentation (e.g., API documentation) has been updated.
- The story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for the platform's core value proposition.
- Requires close collaboration between frontend and backend developers due to the tight integration.
- Dependencies on US-098 (routing logic) and service center data setup must be managed. Consider using a mocked API response for the routing service to allow parallel frontend development.

## 11.4.0.0 Release Impact

This feature is critical for the Minimum Viable Product (MVP) and any pilot launch. The platform cannot function without it.

