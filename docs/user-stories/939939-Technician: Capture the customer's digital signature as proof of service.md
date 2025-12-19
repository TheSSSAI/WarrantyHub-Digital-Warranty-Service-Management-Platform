# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-083 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: Capture the customer's digital signatu... |
| As A User Story | As a Technician, I want to capture the customer's ... |
| User Persona | Technician |
| Business Value | Provides legally admissible proof of service compl... |
| Functional Area | Service Request Module - Technician Panel |
| Story Theme | Job Completion & Verification |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successful signature capture and save with network connectivity

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The technician is on the 'Complete Job' screen for an active service request in the mobile app and has an active internet connection

### 3.1.5 When

The technician taps the 'Capture Signature' button

### 3.1.6 Then

A signature capture screen is displayed, showing the customer's name and a designated signature area.

### 3.1.7 And

The technician is returned to the 'Complete Job' screen, which now displays a confirmation (e.g., a thumbnail or checkmark) that the signature has been captured.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User clears the signature pad to re-sign

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

The customer is on the signature capture screen and has drawn a signature

### 3.2.5 When

The customer or technician taps the 'Clear' button

### 3.2.6 Then

The signature area is completely cleared, ready for a new signature to be drawn.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User cancels the signature capture process

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

The technician is on the signature capture screen

### 3.3.5 When

The technician taps the 'Cancel' or device back button

### 3.3.6 Then

A confirmation dialog appears asking 'Are you sure you want to cancel? The signature will not be saved.'

### 3.3.7 And

If the technician confirms, they are returned to the previous screen, and no signature is saved for the service request.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Signature capture while the device is offline

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

The technician's mobile device has no internet connectivity

### 3.4.5 When

The technician captures a customer signature and taps 'Save'

### 3.4.6 Then

The signature image is saved securely to the device's local storage.

### 3.4.7 And

The application automatically uploads the stored signature in the background once network connectivity is restored.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Signature upload fails despite network connectivity

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The technician has network connectivity and attempts to save a signature

### 3.5.5 When

The signature upload fails due to a server error (e.g., HTTP 500)

### 3.5.6 Then

A user-friendly error message is displayed, such as 'Could not save signature. Please try again.'

### 3.5.7 And

The technician is given the option to retry the upload without having to recapture the signature.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Viewing the captured signature

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

A signature has been successfully captured and associated with a service request

### 3.6.5 When

An authorized user (e.g., Service Center Admin, Brand Admin) views the details of that service request in their respective portal

### 3.6.6 Then

The captured signature is displayed as a viewable image, along with the timestamp of when it was captured.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Capture Signature' button on the job completion screen.
- A dedicated signature capture screen/modal.
- A canvas element for drawing the signature.
- Clearly labeled 'Save', 'Clear', and 'Cancel' buttons.
- A text display for the customer's name.
- A loading indicator during the upload process.
- A confirmation indicator (thumbnail or icon) on the job completion screen post-capture.

## 4.2.0 User Interactions

- The user can draw a continuous line on the canvas with their finger or a stylus.
- Tapping 'Clear' erases the canvas.
- Tapping 'Save' initiates the upload/save process.
- The interface should support both portrait and landscape orientations without losing the drawn signature.

## 4.3.0 Display Requirements

- The customer's full name must be displayed on the signature screen for verification.
- A timestamp should be displayed next to the signature image when viewed in the admin panels.

## 4.4.0 Accessibility Needs

- All buttons ('Save', 'Clear', 'Cancel') must have accessible labels for screen readers.
- The purpose of the signature area should be clear to users of assistive technologies.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A signature can only be captured for a service request that is in an active state (e.g., 'Work In Progress').

### 5.1.3 Enforcement Point

Mobile Application Logic

### 5.1.4 Violation Handling

The 'Capture Signature' button is disabled or hidden for service requests that are not in a valid state (e.g., 'Requested', 'Closed').

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Once a signature is saved for a service request, it cannot be replaced or deleted.

### 5.2.3 Enforcement Point

Backend API

### 5.2.4 Violation Handling

The API will reject any subsequent attempts to upload a signature for the same service request, returning an error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-077

#### 6.1.1.2 Dependency Reason

The technician must be able to view the details of an assigned job to access the job completion workflow where this feature resides.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-084

#### 6.1.2.2 Dependency Reason

This signature capture is a critical step within the 'Mark a job as Resolved' workflow. The two stories are functionally linked and should be developed in close coordination.

## 6.2.0.0 Technical Dependencies

- A React Native library for signature capture (e.g., react-native-signature-capture).
- A backend API endpoint (e.g., POST /api/v1/service-requests/{id}/signature) to handle secure file uploads.
- Azure Blob Storage container for storing signature images.
- Mobile device local storage mechanism for offline support (e.g., SQLite, AsyncStorage).

## 6.3.0.0 Data Dependencies

- The `service_request_id` and customer's name must be available in the mobile app's state when initiating this feature.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The signature capture screen must load in under 500ms.
- The saved signature image file size should be optimized to be under 200KB to ensure fast uploads on cellular networks.
- The API response time for the upload endpoint should be under 1 second (P95).

## 7.2.0.0 Security

- Signature images must be transmitted over HTTPS/TLS 1.3.
- Signature images must be stored with encryption-at-rest in Azure Blob Storage.
- Access to view captured signatures via the API must be restricted by the RBAC model to authorized roles (Technician for their job, Service Center Admin, Brand Admin, Super Admin).

## 7.3.0.0 Usability

- The signature area must be large and responsive enough for easy signing with a finger on various device sizes.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards where applicable for mobile applications.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported versions of iOS (14.0+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing robust offline storage and a reliable background synchronization mechanism is the primary complexity driver.
- Handling file uploads securely on the backend, including validation and storage integration.
- Ensuring a smooth and responsive drawing experience across different mobile devices and OS versions.

## 8.3.0.0 Technical Risks

- Potential data loss of locally stored signatures if the app is uninstalled before synchronization.
- Inconsistent performance of the signature capture library across different Android device manufacturers.
- Managing background sync processes without excessively draining the device battery.

## 8.4.0.0 Integration Points

- Technician Mobile App <-> Backend API (Signature Upload Endpoint)
- Backend API <-> Azure Blob Storage (File Storage)
- Backend API <-> PostgreSQL Database (Storing signature metadata)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Security

## 9.2.0.0 Test Scenarios

- Verify signature capture and save on a stable network.
- Verify signature capture and save while offline, then verify successful sync after reconnecting.
- Verify the 'Clear' and 'Cancel' functionalities.
- Verify that an authorized admin can view the saved signature in the web portal.
- Attempt to upload a non-image file or an oversized file to the API endpoint to verify error handling.
- Test on multiple physical devices (iOS and Android) with different screen sizes.

## 9.3.0.0 Test Data Needs

- Test accounts for Technician, Service Center Admin, and Brand Admin roles.
- Active service requests assigned to the test technician.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit tests.
- Supertest for backend API integration tests.
- Playwright or a similar framework for E2E testing of the mobile app.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both iOS and Android.
- Code reviewed and approved by at least one other developer.
- Unit and integration tests implemented with >80% coverage for new code.
- Offline functionality is tested and verified to be reliable.
- The signature image is confirmed to be stored securely in Azure Blob Storage.
- The API endpoint is secured and validated against the RBAC model.
- The feature is successfully deployed and verified in the staging environment.
- Relevant documentation for the API endpoint is updated in the OpenAPI specification.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a critical feature for the job completion workflow. The offline capability is a core requirement and should not be deferred.
- Requires coordinated effort between mobile frontend and backend developers. The API endpoint should be developed and deployed early in the sprint to unblock frontend work.

## 11.4.0.0 Release Impact

Enables the full end-to-end digital service completion process. A key feature for the initial pilot launch.

