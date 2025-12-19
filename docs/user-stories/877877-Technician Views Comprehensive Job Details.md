# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-052 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician Views Comprehensive Job Details |
| As A User Story | As a Technician, I want to view a single, comprehe... |
| User Persona | Technician using the mobile application in the fie... |
| Business Value | Increases first-time fix rate, improves technician... |
| Functional Area | Technician Mobile Application |
| Story Theme | Service Job Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Technician views a job with complete details

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Technician and I am on the 'My Assigned Jobs' screen

### 3.1.5 When

I tap on a job from the list

### 3.1.6 Then

I am navigated to the 'Job Details' screen which displays distinct sections for Customer Details, Service Request Details, Product Details, and Service History.

### 3.1.7 Validation Notes

Verify that tapping a job item navigates to a new screen and all expected data sections are present.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Customer details are correctly displayed and interactive

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Job Details' screen

### 3.2.5 When

I view the 'Customer Details' section

### 3.2.6 Then



```
The customer's full name, full address, and primary contact number are displayed.
AND The address is a tappable link that launches the device's default map application with the address pre-filled.
AND The phone number is a tappable link that launches the device's default phone dialer with the number pre-filled.
```

### 3.2.7 Validation Notes

Test the tap actions for both the address and phone number to ensure they trigger the correct native OS intents.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Service request and product details are accurately displayed

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am on the 'Job Details' screen

### 3.3.5 When

I view the 'Service Request' and 'Product' sections

### 3.3.6 Then



```
I can see the Service Request ID, issue type, and the customer's full problem description.
AND I can see the product's Brand, Model, and Serial Number.
AND A clear, color-coded badge indicates the warranty status ('In Warranty' or 'Out of Warranty').
```

### 3.3.7 Validation Notes

Verify data accuracy against the source service request. Check that the warranty status badge color (e.g., Green/Red) matches the status.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Technician views customer-uploaded photos and videos

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am on the 'Job Details' screen for a job with customer-uploaded media

### 3.4.5 When

I tap on the media thumbnails or a 'View Media' button

### 3.4.6 Then

The photos are displayed in a full-screen image gallery or the video plays in a native video player.

### 3.4.7 Validation Notes

Test with both single and multiple photo uploads, as well as a video file.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Technician views a product's complete service history

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am on the 'Job Details' screen for a product with prior service history

### 3.5.5 When

I view the 'Service History' section

### 3.5.6 Then



```
A chronological list of past service requests for this product is displayed, ordered from most recent to oldest.
AND Each list item shows a summary (Date, Issue, Status).
AND Tapping a past service request reveals more details (e.g., previous technician's notes).
```

### 3.5.7 Validation Notes

Verify the list is correctly ordered and that the drill-down functionality works for past tickets.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Edge Case: Job for a product with no service history

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am on the 'Job Details' screen for a product with no prior service history

### 3.6.5 When

I view the 'Service History' section

### 3.6.6 Then

A clear message is displayed, such as 'No previous service history for this product.'

### 3.6.7 Validation Notes

Ensure the UI doesn't show an empty list or break, but instead displays the informative message.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Edge Case: Job with no customer-uploaded media

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I am on the 'Job Details' screen for a job where the customer did not upload media

### 3.7.5 When

I view the media section

### 3.7.6 Then

A clear message is displayed, such as 'No photos or videos provided.'

### 3.7.7 Validation Notes

Verify this section doesn't show broken image placeholders or an empty gallery.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Error Condition: Failure to load job details

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

I am a logged-in Technician with an unstable network connection

### 3.8.5 When

I tap on a job and the API call to fetch details fails

### 3.8.6 Then



```
A user-friendly error message is displayed (e.g., 'Could not load job details. Please check your connection and try again.').
AND A 'Retry' button is available to re-trigger the API call.
```

### 3.8.7 Validation Notes

Use a network proxy or device settings to simulate network failure and verify the error state.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Collapsible sections for 'Customer', 'Product', 'Service Request', 'Service History'
- Tappable links for address and phone number
- Color-coded badge for warranty status
- Image/video gallery for customer-uploaded media
- List view for service history items
- Error message overlay with a 'Retry' button

## 4.2.0 User Interactions

- Tap a job in the list to navigate to details.
- Scroll through all job details on a single screen.
- Tap to expand/collapse information sections.
- Tap address/phone to launch native apps.
- Tap media thumbnails to open a full-screen viewer.

## 4.3.0 Display Requirements

- All key information must be visible without excessive scrolling where possible.
- Text must be legible on a mobile device in various lighting conditions.
- Long problem descriptions must be handled gracefully (e.g., with a 'Read More' expander).

## 4.4.0 Accessibility Needs

- All interactive elements (buttons, links) must have a tap target size of at least 44x44 points.
- Content must be screen-reader accessible with proper labels for icons and interactive elements.
- Sufficient color contrast must be used, especially for the warranty status badge, per WCAG 2.1 AA.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A Technician can only view the details of jobs that are explicitly assigned to them.', 'enforcement_point': 'API Gateway and Backend Service Layer', 'violation_handling': 'The API must return a 403 Forbidden or 404 Not Found error if a technician attempts to access a job ID not assigned to them.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-051

#### 6.1.1.2 Dependency Reason

The technician must be able to see their list of assigned jobs before they can select one to view its details.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-048

#### 6.1.2.2 Dependency Reason

A job must be assigned to a technician by a Service Center Admin for it to be viewable.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-037

#### 6.1.3.2 Dependency Reason

The data for the service request (problem description, media) is created in this story.

## 6.2.0.0 Technical Dependencies

- A backend REST API endpoint (e.g., GET /api/v1/technician/jobs/{jobId}) that aggregates and provides all required data for the job details view.
- Mobile application framework (React Native) must be set up with navigation capabilities.

## 6.3.0.0 Data Dependencies

- Access to User, Product, Warranty, and Service Request data models.
- Access to Azure Blob Storage for retrieving customer-uploaded media.

## 6.4.0.0 External Dependencies

- Device's native mapping application (e.g., Google Maps, Apple Maps).
- Device's native phone dialer application.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The Job Details screen must load all data and render within 2 seconds on a standard 4G connection.
- API response time for the job details endpoint must be under 300ms (P95).

## 7.2.0.0 Security

- API endpoint must be secured and only accessible by an authenticated user with the 'Technician' role.
- The endpoint must enforce that the authenticated technician is the one assigned to the requested job ID.

## 7.3.0.0 Usability

- The layout must be intuitive and require minimal training for a technician to understand.
- Critical information (address, issue) should be immediately visible upon screen load.

## 7.4.0.0 Accessibility

- The mobile application must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The feature must be fully functional on supported versions of iOS (14+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend API requires data aggregation from multiple microservices (User, Product, Service), which can impact performance if not optimized.
- Designing a clean, information-dense UI for a mobile screen is challenging.
- Handling various media types (images, videos) and displaying them efficiently in-app.

## 8.3.0.0 Technical Risks

- Potential for slow API response time due to complex database joins or multiple service calls. Caching strategies should be considered.
- Ensuring a smooth user experience when loading and displaying high-resolution media on mobile devices.

## 8.4.0.0 Integration Points

- Backend Service Request Microservice
- Backend User Microservice
- Backend Product Microservice
- Azure Blob Storage for media files

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Usability

## 9.2.0.0 Test Scenarios

- Verify all data points on the screen for a job with full history and media.
- Test the edge case of a new product with no service history.
- Test the edge case of a job with no uploaded media.
- Simulate network failure during data load and verify error handling.
- Test the deep-linking to maps and dialer apps on both iOS and Android devices.

## 9.3.0.0 Test Data Needs

- A technician account.
- At least two assigned jobs: one for a product with no service history, and one for a product with 2+ past service records.
- One job must have multiple photos and one video uploaded.
- One job must have no media uploaded.
- One product must be 'In Warranty' and another 'Out of Warranty'.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for mobile unit/integration tests.
- Postman or Insomnia for API endpoint testing.
- Appium or a similar framework for E2E mobile testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >= 80% code coverage for new logic
- E2E tests for the happy path and key error conditions are passing
- User interface reviewed and approved by the UX/UI designer
- API performance meets the P95 <300ms requirement under load
- Security checks confirm a technician cannot access another's jobs
- Relevant technical documentation for the new API endpoint is created/updated
- Story deployed and verified in the staging environment by a QA engineer

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires the backend API endpoint to be ready before the mobile UI can be fully integrated and tested.
- Coordination between backend and mobile developers is crucial.

## 11.4.0.0 Release Impact

This is a core feature for the Technician mobile app and is essential for the application to be useful in the field. It is a blocker for subsequent technician workflow stories like updating job status (US-053).

