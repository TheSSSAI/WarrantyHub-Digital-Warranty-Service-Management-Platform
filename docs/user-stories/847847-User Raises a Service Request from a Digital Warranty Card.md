# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-037 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Raises a Service Request from a Digital Warra... |
| As A User Story | As a registered User with a faulty product, I want... |
| User Persona | End-User/Consumer with a registered product on the... |
| Business Value | This is a core platform function that connects a u... |
| Functional Area | Service Request Management |
| Story Theme | Service Request Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-037-01

### 3.1.2 Scenario

Happy Path: Successful Service Request Submission

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the digital warranty card for my registered product

### 3.1.5 When

I tap the 'Request Service' button, fill in all required fields (issue type, description), upload 2 photos, select a preferred service date/time, and tap 'Submit Request'

### 3.1.6 Then

The system creates a new service request ticket with the status 'Requested', links it to my product, and stores the uploaded media securely.

### 3.1.7 Validation Notes

Verify a new record exists in the 'service_requests' table with the correct status and foreign keys. Verify the uploaded files exist in Azure Blob Storage and are linked to the request. The user should be redirected to the new ticket's tracking screen.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-037-02

### 3.2.2 Scenario

Form Pre-population

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user and I navigate to the 'New Service Request' screen from a specific product's warranty card

### 3.2.5 When

The service request form loads

### 3.2.6 Then

The Brand, Model, and Serial Number fields must be pre-populated with the correct data from the selected product and must be read-only.

### 3.2.7 Validation Notes

Inspect the UI to confirm the fields are correctly filled and disabled for editing.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-037-03

### 3.3.2 Scenario

Confirmation and Notification

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I have successfully submitted a new service request

### 3.3.5 When

The request is processed by the system

### 3.3.6 Then

I must receive an in-app push notification and an email confirming the submission, which includes the unique service request ticket ID.

### 3.3.7 Validation Notes

Check notification logs (FCM) and email service logs (Azure Communication Services) to confirm messages were sent. The content of the messages should be verified.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-037-04

### 3.4.2 Scenario

Error: Attempting to submit an incomplete form

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the 'New Service Request' screen

### 3.4.5 When

I attempt to submit the form without selecting an 'Issue Type' or providing a 'Problem Description'

### 3.4.6 Then

The submission must be blocked, and clear, inline validation error messages must be displayed next to the required fields.

### 3.4.7 Validation Notes

Use an E2E test to attempt form submission with empty required fields and assert that the error messages appear and no API call is made.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-037-05

### 3.5.2 Scenario

Error: 'Other' issue type selected without a description

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the 'New Service Request' screen and have selected 'Other' from the 'Issue Type' dropdown

### 3.5.5 When

I attempt to submit the form without entering any text in the 'Problem Description' field

### 3.5.6 Then

The submission must be blocked, and a validation error must specify that a description is mandatory when 'Other' is selected.

### 3.5.7 Validation Notes

E2E test to verify this specific validation rule.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-037-06

### 3.6.2 Scenario

Edge Case: Media upload limits are enforced

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am on the 'New Service Request' screen

### 3.6.5 When

I attempt to upload a 6th photo (after 5 are already selected) OR a video file longer than 60 seconds

### 3.6.6 Then

The application must prevent the upload and display a user-friendly message explaining the limit (e.g., 'Maximum 5 photos allowed', 'Video cannot exceed 60 seconds').

### 3.6.7 Validation Notes

Manually test with files exceeding the limits. Automate with mock file objects if possible in the test framework.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-037-07

### 3.7.2 Scenario

Edge Case: Product brand is not yet approved

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I am viewing the digital warranty card for a product whose brand is in a 'pending approval' state

### 3.7.5 When

I view the card's actions

### 3.7.6 Then

The 'Request Service' button must be disabled or hidden, and a message must inform me that service for this brand is not yet active.

### 3.7.7 Validation Notes

Requires test data with a product linked to a pending brand. Verify the UI state.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-037-08

### 3.8.2 Scenario

Error: Network failure during submission

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

I have filled out the service request form

### 3.8.5 When

I tap 'Submit Request' while my device is offline

### 3.8.6 Then

The application must display a 'No connection' error message, and the data entered in the form must be preserved for when I retry.

### 3.8.7 Validation Notes

Use browser/emulator tools to simulate network failure and verify the app's behavior and data persistence in the form.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Read-only fields for Brand, Model, Serial Number
- Dropdown for 'Type of issue' (dynamically populated based on product category)
- Text area for 'Problem Description'
- File upload component for photos/videos with progress indicator
- Address display/confirmation field
- Date and Time slot picker for preferred visit schedule
- Submit button
- Loading indicator/spinner during submission

## 4.2.0 User Interactions

- Tapping 'Request Service' on the warranty card navigates to the form.
- Selecting 'Other' in the issue dropdown makes the description field mandatory.
- User can preview and remove uploaded media before submission.
- Successful submission navigates the user to the ticket tracking screen.

## 4.3.0 Display Requirements

- The form must clearly indicate which fields are required.
- Media upload constraints (file count, video length) should be displayed near the upload component.
- A success message with the new ticket ID should be briefly displayed upon successful submission.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels for screen readers.
- Validation errors must be programmatically associated with their respective form fields.
- All interactive elements must have sufficient color contrast and be keyboard-navigable (for web).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SR-01

### 5.1.2 Rule Description

A service request can only be raised for a product whose brand is in an 'Approved' state.

### 5.1.3 Enforcement Point

UI (disabling the button) and API (backend validation).

### 5.1.4 Violation Handling

UI shows an informative message. API returns a 403 Forbidden or 400 Bad Request error with a clear message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SR-02

### 5.2.2 Rule Description

A maximum of 5 photos OR 1 video (max 60 seconds) can be uploaded per service request.

### 5.2.3 Enforcement Point

Client-side validation before upload and server-side validation upon submission.

### 5.2.4 Violation Handling

Client shows an error message. Server rejects the request with a 400 Bad Request error.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-SR-03

### 5.3.2 Rule Description

If 'Other' is selected as the issue type, a free-text description is mandatory.

### 5.3.3 Enforcement Point

Client-side form validation and server-side API validation.

### 5.3.4 Violation Handling

Client shows a validation error. Server rejects the request with a 400 Bad Request error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-032

#### 6.1.1.2 Dependency Reason

The entry point for this user story is the 'Request Service' button on the Digital Warranty Card.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-015

#### 6.1.2.2 Dependency Reason

A user must have a registered product to raise a service request against.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-011

#### 6.1.3.2 Dependency Reason

The master list of service issue types must be manageable by an admin and available to be fetched by the client.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-007

#### 6.1.4.2 Dependency Reason

The system needs the Brand-to-Service-Center relationship to determine where to route the new service request.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-089

#### 6.1.5.2 Dependency Reason

The push notification infrastructure must be in place to send submission confirmations.

## 6.2.0.0 Technical Dependencies

- Azure Blob Storage: For storing uploaded photos and videos.
- Azure Service Bus: For asynchronous processing of the request and notifying the appropriate service center.
- Azure Communication Services: For sending email confirmations.
- Firebase Cloud Messaging (FCM): For sending push notifications.
- Service Center Scheduling API: An endpoint is required to fetch available service slots for the technician visit picker. This may be a separate story.

## 6.3.0.0 Data Dependencies

- Access to the user's registered product data.
- Access to the master list of product categories and their associated service issue types.
- Access to service center operational data, including geographical service areas and technician schedules.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The service request form should load in under 2 seconds on a standard 4G connection.
- The API response time for the submission (excluding file upload time) must be under 300ms (P95).
- Media uploads must show a real-time progress indicator to manage user perception of wait time.

## 7.2.0.0 Security

- All data must be transmitted over HTTPS/WSS.
- Uploaded files must be scanned for malware on the server side before being made accessible.
- The API endpoint must validate that the authenticated user owns the product for which the service request is being raised.

## 7.3.0.0 Usability

- The form should be broken into logical sections to avoid overwhelming the user.
- The process should require a minimum number of taps/clicks to complete.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Mobile App: iOS 14+, Android 8.0+.
- Web Portal: Latest stable versions of Chrome, Firefox, Safari, Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Handling of file uploads (photos/videos), including progress tracking, client-side validation, and secure server-side storage.
- Backend logic for routing the service request to the correct service center based on brand and geo-location.
- Integration with a message broker (Azure Service Bus) for reliable, asynchronous processing.
- Dependency on a potentially complex API for fetching real-time service center availability slots.

## 8.3.0.0 Technical Risks

- The Service Center Scheduling API might not be ready, requiring this feature to be simplified to just 'preferred time' without validation in the initial release.
- Handling large video file uploads on mobile devices with unstable connections can be challenging and may require a robust retry mechanism.

## 8.4.0.0 Integration Points

- Backend API for form submission.
- Azure Blob Storage API for file uploads.
- Azure Service Bus for publishing a 'ServiceRequestCreated' event.
- Internal API to fetch service issue types.
- Internal API to fetch service center time slots.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Security

## 9.2.0.0 Test Scenarios

- Verify successful submission with photos only.
- Verify successful submission with a video only.
- Test form validation for all required fields.
- Test file upload limits for both photos and videos.
- Test the workflow on a product from a pending brand.
- Simulate network loss during submission and verify data is retained.
- Verify the created ticket in the database has all the correct information.

## 9.3.0.0 Test Data Needs

- A registered user account.
- At least one registered product with an 'Approved' brand.
- A registered product with a 'Pending' brand.
- Sample image and video files of various sizes (some within limits, some exceeding).
- Configured service issue types for the product's category.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Integration)
- Jest (Backend Unit/Integration)
- Cypress (E2E)
- Postman/Insomnia (API Testing)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code is at or above 80%.
- Automated E2E tests for the happy path and key error conditions are created and passing.
- UI/UX has been reviewed and approved by the Product Owner/Designer.
- Performance of the form load and submission API meets specified NFRs.
- Security checks, including validation of user ownership of the product, are implemented and tested.
- All relevant documentation (API specs, user guides) has been updated.
- The story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a cornerstone feature of the user-facing application. Its completion is critical for the core user journey.
- The dependency on the Service Center Scheduling API is a potential blocker. A decision must be made on whether to build a simplified version (user states preference) or wait for the full API before starting this story.

## 11.4.0.0 Release Impact

- This feature is essential for the Minimum Viable Product (MVP) release. The platform cannot launch without this functionality.

