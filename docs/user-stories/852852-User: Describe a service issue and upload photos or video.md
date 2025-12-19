# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-039 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Describe a service issue and upload photos o... |
| As A User Story | As a Consumer raising a service request for a faul... |
| User Persona | Registered Consumer/End-User |
| Business Value | Improves service efficiency by providing technicia... |
| Functional Area | Service Request Management |
| Story Theme | Service Request Creation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User successfully submits a service request with a description and multiple photos

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am an authenticated user on the 'Create Service Request' screen for a registered product

### 3.1.5 When

I enter a problem description in the text area, select 3 photos (JPG/PNG) from my device that are within the size limits, and submit the form

### 3.1.6 Then

The form is submitted successfully, a new service request is created, and the 3 uploaded photos are securely stored and associated with the new service request ticket.

### 3.1.7 Validation Notes

Verify the service request record exists in the database. Verify that three corresponding media records linked to the request exist, with URLs pointing to Azure Blob Storage. Verify the files can be accessed via their URLs.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User successfully submits a service request with a description and one video

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am an authenticated user on the 'Create Service Request' screen

### 3.2.5 When

I enter a problem description, select 1 video (max 60 seconds) from my device that is within the size limits, and submit the form

### 3.2.6 Then

The form is submitted successfully, a new service request is created, and the uploaded video is securely stored and associated with the new service request ticket.

### 3.2.7 Validation Notes

Verify the service request record exists in the database. Verify a media record linked to the request exists, with a URL pointing to the video in Azure Blob Storage.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User attempts to submit the form without a problem description

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am on the 'Create Service Request' screen and have selected media to upload

### 3.3.5 When

I attempt to submit the form without entering any text in the 'Problem Description' field

### 3.3.6 Then

The submission is blocked, and a validation error message 'Problem description is required' is displayed next to the description field.

### 3.3.7 Validation Notes

The API request should not be sent. The UI should highlight the required field.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User attempts to upload more than the maximum number of photos

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the 'Create Service Request' screen and have already selected 5 photos

### 3.4.5 When

I attempt to select a 6th photo

### 3.4.6 Then

The file selection is prevented, and a user-friendly error message 'You can upload a maximum of 5 photos' is displayed.

### 3.4.7 Validation Notes

The file picker might open, but upon selection, the 6th file should be rejected by the client-side logic.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User attempts to upload both photos and a video

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the 'Create Service Request' screen and have already selected 1 video

### 3.5.5 When

I attempt to select a photo

### 3.5.6 Then

The file selection is prevented, and a message 'You can upload photos or a video, but not both' is displayed.

### 3.5.7 Validation Notes

Similarly, if photos are selected first, selecting a video should be disabled or trigger the same message.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User attempts to upload an unsupported file type

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am on the 'Create Service Request' screen

### 3.6.5 When

I attempt to select a file with an unsupported extension, such as '.pdf' or '.zip'

### 3.6.6 Then

The file is rejected, and an error message 'Invalid file type. Please upload JPG, PNG, or a supported video format' is displayed.

### 3.6.7 Validation Notes

This validation should exist on both the client-side (for immediate feedback) and server-side (for security).

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

User removes a selected media file before submission

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

I am on the 'Create Service Request' screen and have selected 3 photos

### 3.7.5 When

I click the 'remove' icon on one of the photo thumbnails

### 3.7.6 Then

The selected photo is removed from the upload queue, and the UI updates to show only 2 photos are selected.

### 3.7.7 Validation Notes

Verify that upon submission, only the remaining 2 photos are uploaded and associated with the service request.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Network connection fails during file upload

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

I have filled out the service request form and clicked 'Submit'

### 3.8.5 When

my device's network connection is lost while the files are being uploaded

### 3.8.6 Then

the upload process is terminated, and a clear error message 'Upload failed. Please check your connection and try again' is displayed, and the service request is not created.

### 3.8.7 Validation Notes

The backend should ensure that no partial data is saved; the entire transaction should be rolled back.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A multi-line text input field (`textarea`) for the problem description with a placeholder like 'Please describe the issue in detail...'
- A primary button labeled 'Add Photos / Video' to launch the device's native file picker or camera.
- A container area to display thumbnails of selected media files.
- An 'X' icon or similar control on each thumbnail to allow for removal of that specific file.
- A progress bar or spinner indicator displayed during the file upload process.
- A text label indicating the file constraints (e.g., 'Max 5 photos or 1 video. Supported types: JPG, PNG, MP4.').

## 4.2.0 User Interactions

- Tapping 'Add Photos / Video' opens the native file/media library.
- After selection, thumbnails of the chosen files appear instantly.
- Tapping the 'remove' icon on a thumbnail removes it from the selection without a confirmation prompt.
- The 'Submit' button should be disabled while an upload is in progress to prevent duplicate submissions.

## 4.3.0 Display Requirements

- The problem description field must clearly indicate it is a required field.
- Clear, non-technical error messages must be displayed for any validation failures.
- The number of selected files should be clearly visible (e.g., '3/5 photos selected').

## 4.4.0 Accessibility Needs

- All form fields, buttons, and image thumbnails must have appropriate labels and ARIA attributes for screen reader compatibility (WCAG 2.1 AA).
- Error messages must be programmatically associated with their respective form fields.
- Sufficient color contrast must be used for all text and UI elements.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SR-01

### 5.1.2 Rule Description

A problem description is mandatory for all service requests.

### 5.1.3 Enforcement Point

Client-side form validation and Server-side API validation.

### 5.1.4 Violation Handling

The request submission is rejected with a '400 Bad Request' status and a clear error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SR-02

### 5.2.2 Rule Description

A user can upload a maximum of 5 photos OR 1 video per service request, not both.

### 5.2.3 Enforcement Point

Client-side UI logic and Server-side API validation.

### 5.2.4 Violation Handling

The UI prevents the invalid selection. The API rejects the request if the rule is bypassed.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-SR-03

### 5.3.2 Rule Description

The maximum duration for an uploaded video is 60 seconds.

### 5.3.3 Enforcement Point

Client-side validation before upload (if possible) and mandatory Server-side validation.

### 5.3.4 Violation Handling

The file is rejected with an appropriate error message.

## 5.4.0 Rule Id

### 5.4.1 Rule Id

BR-SR-04

### 5.4.2 Rule Description

Supported image formats are JPG and PNG. Supported video formats to be defined (e.g., MP4, MOV).

### 5.4.3 Enforcement Point

Client-side file picker filter and Server-side file type validation (checking MIME type, not just extension).

### 5.4.4 Violation Handling

The file is rejected with an error message indicating supported formats.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-036

#### 6.1.1.2 Dependency Reason

This story adds fields to the service request creation form, which is initiated by US-036.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-118

#### 6.1.2.2 Dependency Reason

This story relies on the system's capability to securely store uploaded files in Azure Blob Storage.

## 6.2.0.0 Technical Dependencies

- Azure Blob Storage container must be provisioned with appropriate access policies (CORS).
- Backend API endpoint capable of handling `multipart/form-data` requests.
- Database schema must be updated to associate media files with a service request (e.g., a `service_request_media` table).

## 6.3.0.0 Data Dependencies

- Requires an existing registered product to create a service request against.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- File uploads must be processed asynchronously and not block the UI thread.
- The API endpoint for request creation including file uploads should have a P95 response time under 3 seconds for typical file sizes (e.g., < 10MB total).

## 7.2.0.0 Security

- All uploaded files must be stored in a private Azure Blob Storage container.
- Access to uploaded files must be restricted via role-based access control (e.g., only the user, assigned technician, and relevant admins can view).
- Server-side validation must strictly enforce file types and sizes to prevent malicious file uploads.
- Consider running uploaded files through a virus/malware scanner as part of the processing pipeline.

## 7.3.0.0 Usability

- The upload process should provide clear, continuous feedback to the user (e.g., progress indicators).
- The interface for selecting and managing files before submission must be intuitive on both mobile and web platforms.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The file upload functionality must be compatible with the specified supported versions of iOS, Android, and web browsers.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Handling multipart/form-data on the backend.
- Managing asynchronous upload state and providing user feedback on the frontend.
- Implementing robust error handling for network failures and validation errors.
- Secure integration with Azure Blob Storage, potentially using SAS tokens for client-side uploads.
- Server-side validation of video duration could require a media processing library (e.g., FFmpeg), adding complexity.

## 8.3.0.0 Technical Risks

- Large video file uploads on unstable mobile networks may have a high failure rate, requiring a resilient upload strategy (e.g., chunking).
- Inconsistent behavior of native file pickers across different OS versions and browsers.

## 8.4.0.0 Integration Points

- Frontend (React Native/Next.js) -> Backend API (NestJS)
- Backend API (NestJS) -> Azure Blob Storage
- Backend API (NestJS) -> PostgreSQL Database

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful upload of each supported file type.
- Verify all validation rules (file count, file type, exclusivity of photo/video, required description) are enforced.
- Test file upload and form submission on a simulated poor network connection.
- Test removing and adding files multiple times before submission.
- E2E test: Create a service request with media, then log in as a service center admin to confirm the media is viewable (requires dependent story completion).

## 9.3.0.0 Test Data Needs

- Sample image files (JPG, PNG) of various sizes (small, medium, large).
- Sample video files (e.g., MP4) under and over the 60-second limit.
- Sample unsupported file types (.gif, .pdf, .exe).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- Browser developer tools for network throttling simulation.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new code
- Integration testing between backend and blob storage completed successfully
- E2E tests for the happy path scenarios are automated and passing
- User interface reviewed and approved for both mobile and web
- Performance requirements for upload speed verified
- Security requirements, especially server-side validation, are implemented and tested
- Documentation for the new API endpoint is updated in the OpenAPI specification
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires both frontend and backend development, which can be done in parallel once the API contract is defined.
- Azure Blob Storage infrastructure and security policies must be configured at the beginning of the sprint.
- The team needs to decide on the strategy for handling large file uploads (e.g., direct to blob storage from client vs. proxying through backend).

## 11.4.0.0 Release Impact

This is a core feature for the service request module and is critical for a valuable user experience. It significantly enhances the quality of data collected for service requests.

