# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-043 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: View the assigned technician's profile |
| As A User Story | As a Consumer with an active service request, I wa... |
| User Persona | The 'Consumer' or 'End-User' who has raised a serv... |
| Business Value | Increases customer trust and safety, enhances the ... |
| Functional Area | Service Request Module |
| Story Theme | Service Request Tracking & Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: View profile of an assigned technician

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user and I am viewing the details of my service request which has the status 'Technician Assigned'

### 3.1.5 When

the service request details screen finishes loading

### 3.1.6 Then

I must see a component displaying the assigned technician's full name and profile photo.

### 3.1.7 Validation Notes

Verify via E2E test that for a ticket with an assigned technician, the name and an image are rendered on the mobile app's ticket detail screen.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Alternative Flow: No technician has been assigned yet

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

I am a logged-in user and I am viewing the details of my service request which has the status 'Requested' or 'Acknowledged'

### 3.2.5 When

the service request details screen finishes loading

### 3.2.6 Then

the technician profile section should either be hidden or display a placeholder message, such as 'A technician will be assigned shortly.'

### 3.2.7 Validation Notes

Verify that for a ticket in a pre-assignment state, no technician profile is shown. The UI should not appear broken.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Edge Case: Assigned technician has an incomplete profile (no photo)

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

a technician has been assigned to my service request

### 3.3.5 And

a default placeholder avatar image must be displayed in place of the photo.

### 3.3.6 When

I view the service request details

### 3.3.7 Then

the technician's full name must be displayed correctly

### 3.3.8 Validation Notes

Set up a technician profile in the test database without a photo URL. Assign this technician to a ticket and verify the mobile app displays the name and a default avatar.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Alternative Flow: Technician is re-assigned

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am viewing the service request details screen, which shows 'Technician A' is assigned

### 3.4.5 When

the service request is re-assigned to 'Technician B' by a Service Center Admin

### 3.4.6 Then

the profile information on my screen updates to display the name and photo of 'Technician B'.

### 3.4.7 Validation Notes

This can be tested by having the app screen open and triggering a re-assignment via an API call. The UI should update via WebSocket event or upon the next data refresh.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

UI: Loading state for technician profile

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am navigating to the service request details screen

### 3.5.5 When

the technician profile data is being fetched from the server

### 3.5.6 Then

a skeleton loader or shimmer effect should be displayed in the technician profile area until the data is rendered.

### 3.5.7 Validation Notes

Use network throttling in developer tools to simulate a slow connection and verify the loading state is visible.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated UI component on the service request details screen for the technician's profile.
- An image view for the technician's photo (circular or rounded square).
- A text label for the technician's full name.
- A placeholder avatar for when a photo is not available.
- A skeleton loader for the component's loading state.

## 4.2.0 User Interactions

- The profile is view-only for the user; no interaction is required for this story.
- The profile information should load automatically with the rest of the service request details.

## 4.3.0 Display Requirements

- Must clearly display the technician's full name as entered by the Service Center Admin.
- Must display the technician's profile photo if available.
- The display must be clean and integrated seamlessly into the service request tracking screen.

## 4.4.0 Accessibility Needs

- The technician's photo must have an `alt` tag or accessibility label containing their name (e.g., 'Profile photo of Jane Doe').
- All text must meet WCAG 2.1 AA color contrast ratios.
- The entire component must be navigable and readable by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A technician's profile information is only visible to the user who owns the corresponding service request.

### 5.1.3 Enforcement Point

API Gateway and Backend Service (Service Request API).

### 5.1.4 Violation Handling

The API request will be rejected with a 403 Forbidden or 404 Not Found status code.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Only non-sensitive technician information (Full Name, Photo, Skills/Certifications) can be exposed to the end-user. Contact details (phone, email) must not be included.

### 5.2.3 Enforcement Point

Backend Service (API data serialization layer).

### 5.2.4 Violation Handling

Sensitive fields are omitted from the API response payload.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-069

#### 6.1.1.2 Dependency Reason

The ability for a Service Center Admin to create a technician profile with a name and photo must exist first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-065

#### 6.1.2.2 Dependency Reason

The functionality for a Service Center Admin to assign a technician to a service request is required.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-041

#### 6.1.3.2 Dependency Reason

This story implements the UI on the service request tracking screen, which is created by US-041.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint to fetch service request details, which must be updated to include the assigned technician's profile data (ID, Full Name, Photo URL).
- Azure Blob Storage infrastructure for hosting and serving technician profile images.
- Authentication service (Azure AD B2C) to secure the API endpoint.

## 6.3.0.0 Data Dependencies

- Requires test data for technicians, including profiles with and without photos.
- Requires test data for service requests in various states ('Acknowledged', 'Technician Assigned').

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to fetch service request details (including technician info) must have a P95 latency below 250ms.
- Technician profile images should be optimized for mobile delivery to ensure fast loading times (e.g., serving scaled-down thumbnails).

## 7.2.0.0 Security

- The API endpoint must be protected by authentication and authorization, ensuring only the owner of the service request can view the assigned technician's details.
- The technician's photo URL should ideally be a short-lived signed URL from Azure Blob Storage to prevent hotlinking, if deemed necessary by security review.

## 7.3.0.0 Usability

- The technician's profile should be prominently and clearly displayed to immediately build trust.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The UI component must render correctly on all supported iOS (14.0+) and Android (8.0+) devices.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires coordination between backend (API modification) and frontend (UI component creation).
- Handling different states (loading, no technician, incomplete profile) in the UI.
- Real-time update on re-assignment requires leveraging the existing WebSocket infrastructure.

## 8.3.0.0 Technical Risks

- Potential for performance issues if profile images are not properly optimized for mobile clients.
- Ensuring the real-time update for technician re-assignment is reliable.

## 8.4.0.0 Integration Points

- Mobile App <-> Service Request API
- Service Request API <-> User/Technician Database
- Mobile App <-> Azure Blob Storage (for image rendering)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify profile displays correctly when a technician is assigned.
- Verify placeholder is shown when no technician is assigned.
- Verify default avatar is shown for a technician with no photo.
- Verify profile updates correctly upon technician re-assignment.
- Verify an unauthorized user cannot fetch technician details for another user's ticket.

## 9.3.0.0 Test Data Needs

- A user account with multiple service requests in different states.
- Technician accounts, one with a complete profile and one without a profile photo.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Backend and frontend code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the project standard (e.g., 80%).
- E2E tests for the primary success scenario are implemented and passing.
- UI component has been reviewed for visual consistency and adherence to design specs.
- Accessibility checks (screen reader and contrast) have been performed.
- API documentation (OpenAPI/Swagger) has been updated to reflect changes.
- Story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by the completion of technician profile creation (US-069) and assignment (US-065). It should be scheduled in a sprint after these dependencies are resolved.
- Requires both backend and frontend development effort.

## 11.4.0.0 Release Impact

This is a key feature for user trust and safety and is considered a core part of the service tracking experience for the initial launch.

