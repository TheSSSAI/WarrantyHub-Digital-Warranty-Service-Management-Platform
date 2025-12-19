# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-077 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: View the full details of an assigned j... |
| As A User Story | As a Technician, I want to view a detailed screen ... |
| User Persona | Technician: A field service professional who uses ... |
| Business Value | Improves technician efficiency by providing all ne... |
| Functional Area | Technician Mobile Application |
| Story Theme | Job Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Viewing complete job details

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a technician is logged into the mobile app and is on the 'Assigned Jobs' list screen

### 3.1.5 When

the technician taps on a job card in the list

### 3.1.6 Then

the app navigates to a 'Job Details' screen for that specific job, and the screen correctly displays all of the following sections and data: 'Service Request ID', 'Appointment Date & Time', 'Customer Information' (Name, Contact Number), 'Service Address', 'Product Information' (Brand, Model, Serial Number), 'Warranty Status', 'Problem Description' (Issue Type, Detailed Description), and 'Customer Media' (if provided).

### 3.1.7 Validation Notes

Verify that an API call is made to fetch the job details and all returned data is rendered correctly in the UI in their respective sections.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Interaction: Tapping phone number initiates a call

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the technician is viewing the 'Job Details' screen

### 3.2.5 When

the technician taps on the customer's contact number

### 3.2.6 Then

the device's native phone dialer application opens with the customer's number pre-filled.

### 3.2.7 Validation Notes

Test on both iOS and Android to ensure the correct native intent is triggered.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Interaction: Tapping address opens map application

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the technician is viewing the 'Job Details' screen

### 3.3.5 When

the technician taps on the service address

### 3.3.6 Then

the device's default map application (e.g., Google Maps, Apple Maps) opens with the service address set as the destination.

### 3.3.7 Validation Notes

Test on both iOS and Android. The address string must be correctly formatted for the map intent.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Interaction: Viewing uploaded media

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the technician is viewing the 'Job Details' screen for a job with uploaded media

### 3.4.5 When

the technician taps on a photo or video thumbnail

### 3.4.6 Then

the media opens in a full-screen viewer, allowing the technician to inspect the details of the issue.

### 3.4.7 Validation Notes

Verify that both image (JPG, PNG) and video files can be viewed.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: Job with no uploaded media

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a technician is viewing the 'Job Details' screen for a job where the customer did not upload any media

### 3.5.5 When

the screen finishes loading

### 3.5.6 Then

the 'Customer Media' section is either hidden or displays a message like 'No media provided'. The application must not crash or show an error.

### 3.5.7 Validation Notes

Create test data for a service request with no associated media files.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Alternative Flow: Viewing job details while offline

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

the technician has previously viewed a job's details while online, and the data has been cached

### 3.6.5 And

the technician's device is now offline

### 3.6.6 When

the technician navigates to and views the same job's details

### 3.6.7 Then

the screen displays the last-known (cached) job details, and a clear visual indicator (e.g., a banner) is present, stating 'Offline Mode - Data may not be current'.

### 3.6.8 Validation Notes

Test by enabling airplane mode on the device after first viewing the job online.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Error Condition: API fails to load job details

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

the technician is online and taps on a job in their list

### 3.7.5 When

the API call to fetch the job details fails (e.g., 500 server error)

### 3.7.6 Then

a user-friendly error message is displayed, such as 'Could not load job details. Please try again.' with a retry option.

### 3.7.7 Validation Notes

Use a mock server or network tool to simulate an API failure.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Clearly labeled sections for each information category (Customer, Product, etc.)
- Tappable link for phone number
- Tappable link for address
- Image/video thumbnails grid or list
- Full-screen media viewer modal
- Prominent action buttons (e.g., 'Start Travel', 'Update Status')
- Offline mode indicator banner

## 4.2.0 User Interactions

- Tapping a job in the list navigates to this detail screen.
- Tapping contact info triggers native device actions (call, map).
- Tapping media thumbnails opens a full-screen viewer.
- The screen should be vertically scrollable to accommodate all information.

## 4.3.0 Display Requirements

- Customer Full Name, Primary Contact Number
- Full Service Address
- Scheduled Date and Time Slot (e.g., 'Feb 28, 2025, 10:00 AM - 12:00 PM')
- Product Brand, Model, Serial Number
- Warranty Status ('In Warranty' or 'Out of Warranty')
- Problem Issue Type and full user-provided description text, with proper text wrapping.

## 4.4.0 Accessibility Needs

- All text must have a contrast ratio of at least 4.5:1 against its background (WCAG AA).
- All interactive elements (buttons, links) must have a minimum tap target size of 44x44 pixels.
- Content should be structured with proper headings for screen reader navigation.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A technician can only view the details of jobs that are explicitly assigned to them.', 'enforcement_point': 'API Gateway and Backend Service', 'violation_handling': 'The API will return a 403 Forbidden or 404 Not Found error if a technician attempts to access a job ID not assigned to them.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-075

#### 6.1.1.2 Dependency Reason

Technician must be able to log in to access any part of the app.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-076

#### 6.1.2.2 Dependency Reason

This story is the navigation target from the job list screen; the list must exist first.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-065

#### 6.1.3.2 Dependency Reason

A job must be assigned to a technician by a Service Center Admin before it can be viewed.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., GET /api/v1/technician/jobs/{jobId}) must be available to provide all required job details in a single response.
- Mobile application navigation framework must be in place.
- State management solution (Zustand) for handling API data, loading states, and offline caching.

## 6.3.0.0 Data Dependencies

- The backend database schema must correctly link service requests to users (customers), products, addresses, media uploads, and assigned technicians.

## 6.4.0.0 External Dependencies

- Device's native phone dialer for making calls.
- Device's native map application for navigation.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The job details screen, including all remote data and thumbnails, must load in under 2 seconds on a stable 4G connection.
- Scrolling on the details screen must be smooth (60fps) even with a long problem description and multiple media items.

## 7.2.0.0 Security

- All communication with the backend API must be over HTTPS (TLS 1.3).
- Customer PII (name, address, phone) must be handled securely. If cached on the device, it must be stored in encrypted storage.

## 7.3.0.0 Usability

- The layout must be clean and easily scannable, prioritizing the most critical information (address, time, customer name) at the top.
- Actionable items (phone, address) should be visually distinct and intuitive to use.

## 7.4.0.0 Accessibility

- The application must comply with WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The feature must be fully functional on iOS 14.0+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The API endpoint requires joining data from multiple database tables (service_requests, users, products, addresses, etc.), which needs to be performant.
- The mobile UI needs to handle various states: loading, success, error, and offline.
- Implementing a robust offline caching strategy for job details adds complexity.
- Integration with native device features (dialer, maps) requires platform-specific code and permissions handling.

## 8.3.0.0 Technical Risks

- The API query to aggregate all job details could become slow as the database grows. It needs to be carefully designed and indexed.
- Inconsistent address formatting from users could cause issues when passing data to map applications.

## 8.4.0.0 Integration Points

- Backend Job Service API
- iOS and Android native phone/map intents

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify all data fields for a complete job.
- Verify UI gracefully handles a job with missing optional data (e.g., no media).
- Test call and map integrations on both iOS and Android physical devices.
- Test offline data display and the 'Offline Mode' indicator.
- Test the UI's response to API errors and the retry mechanism.

## 9.3.0.0 Test Data Needs

- A test technician account with multiple assigned jobs.
- A job with all fields populated, including multiple photos and a video.
- A job with only the required fields populated (no media, no extended description).
- A job with a very long problem description to test text wrapping.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Supertest for backend API integration tests.
- Playwright for end-to-end tests.
- Physical devices for manual UI/UX and native integration testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both iOS and Android.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the project standard (e.g., >80%).
- API endpoint and mobile UI integration testing completed successfully.
- UI/UX has been reviewed and approved by the design/product owner.
- Performance on a mid-range device meets the specified requirements.
- No critical accessibility violations are found.
- Backend API documentation (OpenAPI) is updated for the new endpoint.
- Story has been deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the technician's in-field workflow.
- It is a prerequisite for stories related to updating job status (US-078) and location sharing (US-079), so it must be completed first.
- Requires coordinated effort between backend (API) and frontend (mobile app) developers.

## 11.4.0.0 Release Impact

This feature is critical for the Minimum Viable Product (MVP) of the Technician mobile application. The app is not usable in the field without it.

