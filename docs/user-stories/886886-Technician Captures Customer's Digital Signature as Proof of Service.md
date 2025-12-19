# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-056 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician Captures Customer's Digital Signature a... |
| As A User Story | As a Technician, I want to capture the customer's ... |
| User Persona | Technician |
| Business Value | Provides an auditable, non-repudiable proof of ser... |
| Functional Area | Service Request Module - Technician Mobile App |
| Story Theme | Job Completion & Verification |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful Signature Capture and Save (Happy Path)

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Technician has an 'In Progress' service ticket open on their mobile app and is on the job completion screen

### 3.1.5 When

the Technician presents the device to the customer, who draws their signature in the designated area and the Technician taps 'Save'

### 3.1.6 Then

the signature is captured as a PNG image, uploaded to Azure Blob Storage, linked to the service ticket record, and a success confirmation is displayed to the Technician.

### 3.1.7 Validation Notes

Verify the image file exists in the blob storage container for the corresponding service ticket ID. Verify the service ticket record in the database contains the correct URL to the signature image.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Customer Clears Signature to Redraw

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

the customer is on the signature capture screen and has started drawing

### 3.2.5 When

they make a mistake and tap the 'Clear' button

### 3.2.6 Then

the signature pad area is completely cleared, allowing them to sign again from a blank state.

### 3.2.7 Validation Notes

The canvas element for the signature should be empty after tapping 'Clear'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to Save a Blank Signature

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

the Technician is on the signature capture screen

### 3.3.5 When

the Technician taps 'Save' without any signature being drawn in the pad

### 3.3.6 Then

the system prevents the save action and displays a user-friendly error message, such as 'Signature cannot be empty'.

### 3.3.7 Validation Notes

No API call should be made to upload a file. The user should remain on the signature screen.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Network Failure During Signature Upload

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a customer has provided their signature on the device

### 3.4.5 When

the Technician taps 'Save' but the device has no network connectivity

### 3.4.6 Then

the app displays an error message indicating a network issue, securely saves the signature image locally on the device, and provides a 'Retry Upload' option. The ticket status cannot be changed to 'Resolved' until the upload is successful.

### 3.4.7 Validation Notes

Test by enabling airplane mode before tapping save. Verify the image is stored in the app's local storage and that a background sync mechanism attempts to re-upload when connectivity is restored.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Viewing the Captured Signature in Service History

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a signature has been successfully captured and linked to a completed service ticket

### 3.5.5 When

an authorized user (User, Service Center Admin, Brand Admin) views the service summary for that ticket

### 3.5.6 Then

the captured signature image is displayed clearly as part of the service completion details.

### 3.5.7 Validation Notes

Check the service history view in the User mobile app, Service Center portal, and Brand portal.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Handling Device Orientation Change

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a customer is in the process of drawing their signature

### 3.6.5 When

the mobile device's orientation is changed from portrait to landscape (or vice-versa)

### 3.6.6 Then

the signature pad adapts to the new orientation, and the signature drawn so far is preserved without being cleared or distorted.

### 3.6.7 Validation Notes

Test on both iOS and Android emulators and physical devices to ensure the signature state is maintained across orientation changes.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated signature capture screen or modal.
- A clearly defined signature pad (canvas area).
- A 'Clear' button to reset the signature pad.
- A 'Save' or 'Confirm' button to finalize the capture.
- A text label displaying the customer's name above the signature line.

## 4.2.0 User Interactions

- The customer uses their finger or a stylus to draw on the signature pad.
- Tapping 'Clear' erases any drawing on the pad.
- Tapping 'Save' initiates the validation and upload process.

## 4.3.0 Display Requirements

- The screen must display a clear instruction, e.g., 'Please sign below to confirm service completion.'
- The customer's full name must be displayed to confirm who is signing.
- A disclaimer text should be visible: 'By signing, you acknowledge that the service has been completed.'

## 4.4.0 Accessibility Needs

- Buttons ('Clear', 'Save') must have proper labels for screen readers.
- The signature pad area should be clearly delineated with high-contrast borders.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A digital signature must be captured before a service ticket can be marked as 'Resolved' by a Technician.

### 5.1.3 Enforcement Point

Technician Mobile App, during the 'Mark as Resolved' workflow.

### 5.1.4 Violation Handling

The application will prevent the status change and prompt the technician to capture the signature. An alternative flow for 'Customer Refused to Sign' must be available.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The captured signature image must be stored as an immutable record linked to the service ticket.

### 5.2.3 Enforcement Point

Backend API and Database.

### 5.2.4 Violation Handling

The signature record cannot be edited or deleted after being saved. It becomes a permanent part of the service history.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-053

#### 6.1.1.2 Dependency Reason

The signature capture is a key step within the workflow of updating a job's status to a completed state.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-057

#### 6.1.2.2 Dependency Reason

This feature is a prerequisite for the 'Mark as Resolved' action, providing the necessary proof of completion.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-043

#### 6.1.3.2 Dependency Reason

The service summary view needs to be able to display the captured signature, so this story depends on the signature being stored and accessible.

## 6.2.0.0 Technical Dependencies

- A React Native library for canvas drawing to implement the signature pad.
- Azure Blob Storage for secure file storage (as per SRS 2.2).
- A backend API endpoint capable of handling multipart/form-data file uploads.
- Database schema modification in the service ticket table to store the signature image URL.

## 6.3.0.0 Data Dependencies

- The service ticket ID must be available on the mobile client to associate the signature with the correct record.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The signature capture screen must load in under 1 second.
- The save and upload process should complete within 3 seconds on a stable 4G connection.

## 7.2.0.0 Security

- The signature image must be transmitted from the mobile app to the backend over HTTPS/TLS 1.2+.
- The signature image must be stored with encryption-at-rest in Azure Blob Storage.
- Access to the signature image must be restricted via RBAC to authorized roles only.

## 7.3.0.0 Usability

- The signature pad must be large enough to be easily usable on various mobile screen sizes.
- The drawing action must be smooth and responsive with minimal latency.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards where applicable for mobile applications.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported versions of iOS (14+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing a robust offline-first storage and synchronization mechanism for the signature image.
- Ensuring the signature pad component is performant and works consistently across different Android and iOS devices and screen sizes.
- Securely handling file uploads from a mobile client to the backend.

## 8.3.0.0 Technical Risks

- Potential for data loss if the local offline storage on the device is cleared before a successful sync.
- Variability in device performance affecting the smoothness of the signature drawing experience.

## 8.4.0.0 Integration Points

- Technician Mobile App (React Native)
- Backend Service Request Microservice (NestJS)
- Azure Blob Storage
- Azure Database for PostgreSQL

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Security
- Performance

## 9.2.0.0 Test Scenarios

- Verify signature capture on multiple physical devices (iOS and Android).
- Simulate network loss during upload to test the offline handling and retry mechanism.
- Test saving a very complex signature to check for performance issues.
- Verify that a user without proper permissions cannot access the signature image URL directly.

## 9.3.0.0 Test Data Needs

- Test service tickets in an 'In Progress' state assigned to a test technician account.
- User accounts for each role (User, SC Admin, Brand Admin) to verify access to the completed service record.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Cypress for mobile E2E tests.
- Postman or Insomnia for API endpoint testing.
- BrowserStack or a similar service for testing on a wide range of real devices.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both iOS and Android.
- Code reviewed and approved by at least one other developer.
- Unit and integration tests implemented with at least 80% code coverage for new code.
- E2E tests for the signature capture workflow are created and passing.
- User interface reviewed and approved by the UX/UI designer.
- Performance on a mid-range device meets the specified requirements.
- Security review completed for the file upload and storage process.
- Technical documentation for the signature API endpoint is created/updated.
- Story deployed and verified in the staging environment without regressions.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The offline handling adds significant complexity and should be the main focus of technical design. The team needs to agree on the local storage and sync strategy before starting implementation.
- Requires coordinated effort between frontend (mobile) and backend developers.

## 11.4.0.0 Release Impact

This is a critical feature for ensuring service completion integrity and is a core part of the v1.0 release for the Technician app.

