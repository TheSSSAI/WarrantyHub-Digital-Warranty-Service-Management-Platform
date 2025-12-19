# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-048 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Rate and provide feedback on a completed ser... |
| As A User Story | As a consumer who has just had a product serviced,... |
| User Persona | End-User / Consumer |
| Business Value | Provides a direct measure of customer satisfaction... |
| Functional Area | Service Request Module |
| Story Theme | Post-Service User Engagement |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User submits a rating with optional feedback after service completion

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user's service request has a status of 'Resolved' or 'Closed'

### 3.1.5 When

the user views the details of this completed service request

### 3.1.6 Then

the rating and feedback are successfully submitted and associated with the service request in the database

### 3.1.7 And

the feedback form is replaced by a read-only view of the submitted rating.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Alternative Flow: User submits a rating without providing text feedback

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

the user is on the feedback submission screen for a completed service

### 3.2.5 When

the user selects a star rating (e.g., 5 stars) and leaves the text area empty

### 3.2.6 And

the user sees a confirmation message.

### 3.2.7 Then

the rating is successfully submitted and stored

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Validation: User attempts to submit feedback without a star rating

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

the user is on the feedback submission screen

### 3.3.5 When

the user enters text in the feedback area but does not select a star rating

### 3.3.6 And

the submission must be prevented.

### 3.3.7 Then

the 'Submit Feedback' button should be disabled or a validation message ('Please select a rating to continue.') should be displayed

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: User attempts to rate a service more than once

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a user has already submitted feedback for a service request

### 3.4.5 When

the user navigates back to the details of that same completed service request

### 3.4.6 Then

the system must display the previously submitted rating in a read-only format

### 3.4.7 And

the feedback submission form must not be displayed.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Condition: Feedback submission fails due to a network error

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

the user is submitting feedback

### 3.5.5 When

the device loses internet connectivity during the submission process

### 3.5.6 Then

the system must display an informative error message (e.g., 'Submission failed. Please check your connection and try again.')

### 3.5.7 And

the user's selected rating and entered text must be preserved in the UI to avoid data loss.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User is prompted to provide feedback via push notification

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

a user's service request status is updated to 'Resolved' or 'Closed'

### 3.6.5 When

the system processes this status change

### 3.6.6 Then

a push notification is sent to the user's device with a message like 'How was your service? Please rate your experience.'

### 3.6.7 And

tapping the notification navigates the user directly to the feedback screen for that specific service request.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Data Verification: Submitted feedback is correctly associated and viewable by admins

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

a user has submitted a rating and feedback for a service request handled by a specific technician

### 3.7.5 When

a Service Center Admin or Brand Admin views a report or the details of that service request

### 3.7.6 Then

they must be able to see the exact star rating and feedback text provided by the user

### 3.7.7 And

the feedback must be correctly linked to the service request, user, and technician.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Interactive star rating component (1 to 5 stars)
- Multi-line text input field for feedback (with a character limit, e.g., 1000 characters)
- Submit button
- Confirmation message/toast notification
- Read-only display for submitted ratings

## 4.2.0 User Interactions

- Tapping a star should select that rating.
- The submit button should be disabled until at least one star is selected.
- After submission, the form should be replaced by a confirmation or a read-only view without a page reload.

## 4.3.0 Display Requirements

- The feedback prompt should be clearly visible on the completed service request details screen.
- Character count for the feedback text area is recommended.

## 4.4.0 Accessibility Needs

- Star rating component must be accessible via keyboard and screen readers (e.g., announce 'Star 4 of 5 selected').
- All form elements must have proper labels.
- Confirmation and error messages must be announced by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Feedback can only be submitted for a service request once.

### 5.1.3 Enforcement Point

Backend API before saving the feedback data.

### 5.1.4 Violation Handling

The API should return an error (e.g., 409 Conflict) if a submission is attempted for a request that already has feedback. The UI should prevent this by design.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A star rating (1-5) is mandatory for feedback submission; the text comment is optional.

### 5.2.3 Enforcement Point

Both client-side (UI validation) and server-side (API validation).

### 5.2.4 Violation Handling

Client-side: Prevent submission and show a validation message. Server-side: Return a 400 Bad Request error if rating is missing.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

Requires the existence of service request statuses, specifically 'Resolved' and 'Closed', to trigger the feedback mechanism.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-047

#### 6.1.2.2 Dependency Reason

The feedback UI will be located on the service summary screen, which this story defines.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-084

#### 6.1.3.2 Dependency Reason

The technician marking a job as 'Resolved' is a primary trigger for making a service request eligible for rating.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

The push notification prompt for feedback relies on the core notification system being implemented.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint to receive and persist feedback (e.g., POST /api/v1/service-requests/{id}/feedback).
- Database schema to store feedback data (e.g., a `ServiceFeedback` table with foreign keys to service_requests, users, and technicians).
- Integration with the push notification service (FCM) to send prompts.

## 6.3.0.0 Data Dependencies

- Requires a service request record in a 'Resolved' or 'Closed' state.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Feedback submission API call should have a P95 response time of < 300ms.

## 7.2.0.0 Security

- User must be authenticated to submit feedback.
- User can only submit feedback for their own service requests (enforced by backend).
- All feedback text must be sanitized on the backend to prevent XSS attacks before being displayed in admin panels.

## 7.3.0.0 Usability

- The process of leaving feedback should be quick and intuitive, requiring minimal taps.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The UI component must render correctly on all supported iOS and Android versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Standard UI form development.
- Simple backend CRUD endpoint.
- Minor database schema modification.
- Integration with existing notification service.

## 8.3.0.0 Technical Risks

- Ensuring the push notification is reliably triggered and deep-links correctly to the feedback screen.

## 8.4.0.0 Integration Points

- Service Request Service: To read request status and trigger events.
- Notification Service: To send push notifications.
- User Database: To associate feedback with a user.
- Reporting/Analytics Service: The generated data will be consumed by this service for dashboards (US-074, US-086).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful submission with and without text feedback.
- Verify submission is blocked if a rating is missing.
- Verify submission is blocked for an already-rated service.
- Verify UI state is preserved on network failure.
- Verify push notification is received and navigates correctly.
- Verify submitted data appears correctly in admin-facing reports.

## 9.3.0.0 Test Data Needs

- User accounts with service requests in 'Resolved' state (one with no feedback, one with existing feedback).
- Service Center and Brand Admin accounts to verify data visibility.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% coverage for new code
- E2E tests for the feedback submission flow are created and passing
- User interface reviewed for UX consistency and accessibility compliance
- API endpoint is documented in the OpenAPI specification
- Security requirements (sanitization, authorization) are validated
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a high-value feature for closing the service loop. It should be prioritized as soon as its prerequisite stories are complete.
- Requires coordinated work between frontend (mobile app) and backend teams.

## 11.4.0.0 Release Impact

Enhances the core service lifecycle by adding a critical feedback mechanism. Its data is foundational for future analytics and performance management features.

