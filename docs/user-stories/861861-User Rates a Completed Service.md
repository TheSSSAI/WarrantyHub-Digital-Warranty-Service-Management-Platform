# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-044 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Rates a Completed Service |
| As A User Story | As a Consumer who has just had a service request c... |
| User Persona | The Consumer/End-User who initiated the service re... |
| Business Value | Collects quantitative (star rating) and qualitativ... |
| Functional Area | Service Request Module |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User submits a rating with text feedback

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the user is viewing a service ticket with the status 'Resolved' for which they have not yet submitted feedback

### 3.1.5 When

the user selects a 4-star rating, enters 'Great and timely service!' in the feedback text area, and taps the 'Submit Feedback' button

### 3.1.6 Then

the system successfully saves the 4-star rating and the text feedback associated with the service ticket, and the user is shown a confirmation message like 'Thank you for your feedback!'

### 3.1.7 Validation Notes

Verify in the database that a new record in the 'service_ratings' table is created with the correct service_ticket_id, user_id, rating_value=4, and the provided feedback text. The UI should update to show the submitted rating instead of the form.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: User submits a rating without text feedback

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the user is viewing the rating interface for a 'Resolved' service ticket

### 3.2.5 When

the user selects a 5-star rating and taps the 'Submit Feedback' button without entering any text

### 3.2.6 Then

the system successfully saves the 5-star rating with a null or empty feedback text, and the user is shown a confirmation message

### 3.2.7 Validation Notes

Verify in the database that a new record is created with rating_value=5 and an empty/null feedback field.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: User attempts to submit without a star rating

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

the user is viewing the rating interface for a 'Resolved' service ticket

### 3.3.5 When

the user attempts to tap the 'Submit Feedback' button without selecting any stars

### 3.3.6 Then

the submission is prevented, and a clear validation message, such as 'Please select a rating to continue', is displayed to the user

### 3.3.7 Validation Notes

The 'Submit Feedback' button should be in a disabled state until at least one star is selected. No API call should be made.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Alternative Flow: User dismisses the initial prompt to rate

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a service ticket's status has just been changed to 'Resolved', and the user has received a prompt (e.g., push notification) to provide feedback

### 3.4.5 When

the user dismisses the prompt and later navigates to the details screen of that completed service ticket

### 3.4.6 Then

the interface to submit a rating is still available on the ticket details screen

### 3.4.7 Validation Notes

The option to rate should persist on the ticket details page for a defined period (e.g., 7 days, aligning with the dispute window from US-045).

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: User attempts to rate a service twice

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

the user has already submitted feedback for a 'Resolved' service ticket

### 3.5.5 When

the user navigates back to that service ticket's details screen

### 3.5.6 Then

the user sees their previously submitted rating and feedback (in a read-only state) and is not presented with the option to submit a new rating

### 3.5.7 Validation Notes

The backend API must reject any subsequent attempts to post a rating for the same service ticket, returning a 409 Conflict or similar error.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Error Condition: Network failure during submission

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

the user has filled out the rating form and taps 'Submit Feedback'

### 3.6.5 When

a network error occurs preventing the request from reaching the server

### 3.6.6 Then

the system displays an informative error message (e.g., 'Could not submit feedback. Please check your connection and try again.') and the user's input (star rating and text) is preserved

### 3.6.7 Validation Notes

The user should be able to retry the submission without re-entering their feedback.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Interactive 5-star rating component
- Multi-line text area for optional feedback (e.g., max 1000 characters)
- Character count indicator for the text area
- A 'Submit Feedback' button
- Confirmation message/view upon successful submission
- Read-only display for previously submitted ratings

## 4.2.0 User Interactions

- Tapping a star selects that value (e.g., tapping the 4th star selects 4 stars).
- The 'Submit Feedback' button is disabled until at least one star is selected.
- The rating prompt is triggered by a push notification and/or an in-app banner on the relevant ticket details screen.

## 4.3.0 Display Requirements

- The rating interface must be clearly associated with the specific service ticket being rated.
- Validation messages must be clear and displayed close to the relevant input field.

## 4.4.0 Accessibility Needs

- The star rating component must be keyboard-navigable and compatible with screen readers, announcing the selected rating (e.g., 'Rating: 4 out of 5 stars').
- All UI elements must meet WCAG 2.1 Level AA contrast and labeling standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service rating can only be submitted for a service ticket with a status of 'Resolved' or 'Closed'.

### 5.1.3 Enforcement Point

Backend API and Frontend UI (UI should not show the option for other statuses).

### 5.1.4 Violation Handling

API will return a 403 Forbidden error if a rating is attempted on a ticket with an invalid status.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A service rating is a one-time action and cannot be edited or deleted after submission.

### 5.2.3 Enforcement Point

Backend API.

### 5.2.4 Violation Handling

API will return a 409 Conflict error if a second rating is attempted for the same ticket.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

The star rating (1-5) is mandatory for submission.

### 5.3.3 Enforcement Point

Frontend UI validation and Backend API validation.

### 5.3.4 Violation Handling

UI prevents submission. API returns a 400 Bad Request error if the rating value is missing or invalid.

## 5.4.0 Rule Id

### 5.4.1 Rule Id

BR-004

### 5.4.2 Rule Description

The option to provide a rating expires 7 days after the ticket is marked 'Resolved'.

### 5.4.3 Enforcement Point

Backend API and Frontend UI.

### 5.4.4 Violation Handling

The UI will no longer display the rating option. The API will return a 403 Forbidden error if a rating is attempted after the window has closed.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-040

#### 6.1.1.2 Dependency Reason

The service request lifecycle, specifically the 'Resolved' status, is the primary trigger for this story's functionality.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-057

#### 6.1.2.2 Dependency Reason

The action of a Technician marking a job as 'Resolved' initiates the workflow that prompts the user for a rating.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-089

#### 6.1.3.2 Dependency Reason

A push notification is required to proactively prompt the user to submit their feedback.

## 6.2.0.0 Technical Dependencies

- A new database table (`service_ratings`) to store rating data.
- A new API endpoint (`POST /api/v1/service-requests/{id}/rating`) to receive and process submissions.
- An event-driven mechanism (e.g., Azure Service Bus) to trigger the rating prompt asynchronously when a ticket is resolved.

## 6.3.0.0 Data Dependencies

- Requires access to the `service_requests` table to link ratings to specific service events and verify ticket status.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) via Azure Communication Services for sending the push notification prompt.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for submitting a rating must have a 95th percentile (P95) response time of less than 500ms.

## 7.2.0.0 Security

- All text feedback submitted by users must be sanitized on the backend to prevent Cross-Site Scripting (XSS) vulnerabilities.
- The API endpoint must verify that the authenticated user is the owner of the service ticket they are attempting to rate.

## 7.3.0.0 Usability

- The rating process should be quick and intuitive, requiring minimal taps to complete.
- The prompt to rate should be timely but not overly intrusive.

## 7.4.0.0 Accessibility

- The entire rating feature must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The feature must function correctly on supported iOS (14+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Coordination between the service that closes the ticket, the event bus (Azure Service Bus), the notification service, and the client application.
- Implementing the state management on the client to correctly show/hide the rating prompt and form.
- Ensuring the one-time submission logic is robust and handles race conditions.

## 8.3.0.0 Technical Risks

- Potential delays in the event-driven notification pipeline could lead to a poor user experience (e.g., user gets the prompt long after the service is complete).

## 8.4.0.0 Integration Points

- Service Request Microservice: Publishes a 'TicketResolved' event.
- Notification Microservice: Consumes the 'TicketResolved' event and sends a push notification.
- API Gateway: Exposes the new endpoint for submitting the rating.
- Mobile Client (React Native): Implements the UI and calls the API.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful submission with and without text feedback.
- Verify validation error for submission without a star rating.
- Verify that a user cannot rate the same service twice.
- Verify that the rating prompt appears after a ticket is resolved.
- Verify that the rating option disappears after the 7-day window.
- Test the flow with a simulated network failure.

## 9.3.0.0 Test Data Needs

- User accounts with service tickets in various states (e.g., 'In Progress', 'Resolved' but not rated, 'Resolved' and rated).
- A service ticket that was resolved more than 7 days ago to test the expiry rule.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress or a similar tool for E2E testing of the full user flow.
- Postman/Insomnia for API endpoint testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least two peers
- Unit test coverage for new code is at or above 80%
- Integration testing of the event-driven notification and API submission flow is completed successfully
- User interface reviewed and approved by UX/UI designer
- Performance requirements (API latency) verified via load testing
- Security requirements (input sanitization, authorization) validated
- Accessibility audit passed for the new UI components
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is critical for collecting service quality metrics and should be prioritized soon after the core service request lifecycle is complete.
- Requires backend, frontend, and potentially DevOps resources to configure the event bus topic/subscription.

## 11.4.0.0 Release Impact

This feature is a key component of the feedback loop for the platform and is a prerequisite for the Brand Admin's customer satisfaction analytics dashboard (US-070).

