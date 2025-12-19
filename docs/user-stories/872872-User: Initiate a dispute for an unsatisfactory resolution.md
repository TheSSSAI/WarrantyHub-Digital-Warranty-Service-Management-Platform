# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-049 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Initiate a dispute for an unsatisfactory res... |
| As A User Story | As a product owner, I want to be able to formally ... |
| User Persona | End-User / Consumer who has raised a service reque... |
| Business Value | Increases user trust and satisfaction by providing... |
| Functional Area | Service Request Management |
| Story Theme | Post-Service User Experience & Quality Assurance |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User successfully disputes a recently resolved service request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of my service request, which was marked as 'Resolved' or 'Closed' within the last 7 calendar days

### 3.1.5 When

I tap the 'Dispute Resolution' button, enter a reason for the dispute (minimum 50 characters), and submit the form

### 3.1.6 Then

The system updates the service request status to 'Disputed', I see a confirmation message on the screen, the 'Dispute Resolution' button is no longer visible, and a notification is sent to the relevant Brand Administrator.

### 3.1.7 Validation Notes

Verify the status change in the database. Verify the audit log entry is created. Verify the notification event is triggered. Verify the UI updates correctly.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Dispute option is not available for old resolved tickets

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

I am a logged-in user viewing the details of my service request, which was marked as 'Resolved' or 'Closed' more than 7 calendar days ago

### 3.2.5 When

I view the service request details screen

### 3.2.6 Then

The 'Dispute Resolution' button is not visible or is disabled.

### 3.2.7 Validation Notes

Test with a ticket resolved exactly 7 days ago (should be visible) and one resolved 7 days and 1 minute ago (should not be visible).

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Dispute option is not available for tickets not in a 'Resolved' or 'Closed' state

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in user viewing the details of my service request, which has a status of 'Requested', 'Acknowledged', 'Technician Assigned', or 'Work In Progress'

### 3.3.5 When

I view the service request details screen

### 3.3.6 Then

The 'Dispute Resolution' button is not visible.

### 3.3.7 Validation Notes

Check this for every status except 'Resolved' and 'Closed'.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User attempts to submit a dispute with an insufficient reason

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am on the 'Dispute Resolution' form for a valid service request

### 3.4.5 When

I attempt to submit the form with a reason that is less than 50 characters long

### 3.4.6 Then

An inline validation error message is displayed, and the form is not submitted.

### 3.4.7 Validation Notes

Verify the API rejects the request with a 400-level error and the frontend displays a user-friendly message.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

A disputed ticket cannot be disputed again

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am a logged-in user viewing the details of my service request, which already has the status 'Disputed'

### 3.5.5 When

I view the service request details screen

### 3.5.6 Then

The 'Dispute Resolution' button is not visible.

### 3.5.7 Validation Notes

Ensure the UI logic correctly hides the button for the 'Disputed' status.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

System handles network failure during dispute submission

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am submitting a valid dispute form

### 3.6.5 When

The network connection is lost during the API call

### 3.6.6 Then

A user-friendly error message is displayed (e.g., 'Failed to submit dispute. Please check your connection and try again.'), and the form data is preserved for a retry.

### 3.6.7 Validation Notes

Simulate network failure using browser developer tools or a proxy.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly labeled 'Dispute Resolution' button on the service request details screen.
- A modal or dedicated screen for the dispute form.
- A multi-line text area for the dispute reason.
- A 'Submit Dispute' button.
- A confirmation message/toast upon successful submission.
- Inline validation error messages.

## 4.2.0 User Interactions

- The 'Dispute Resolution' button is only visible/enabled for tickets in a 'Resolved' or 'Closed' state and within the 7-day window.
- Clicking the button opens the dispute form.
- Submitting the form triggers an API call and displays a loading indicator.
- Upon success, the user is returned to the ticket details view, which now reflects the 'Disputed' status.

## 4.3.0 Display Requirements

- The service request details page must clearly display the current status, including 'Disputed'.
- The dispute form must clearly state the purpose and any requirements (e.g., minimum character count for the reason).

## 4.4.0 Accessibility Needs

- All interactive elements (buttons, form fields) must be keyboard accessible and have appropriate ARIA labels.
- Error and success messages must be announced by screen readers.
- The UI must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-049-01

### 5.1.2 Rule Description

A user can only dispute a resolved service request within 7 calendar days of its resolution.

### 5.1.3 Enforcement Point

Backend API and Frontend UI.

### 5.1.4 Violation Handling

The API will return a 'Forbidden' (403) error. The UI will hide or disable the dispute option.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-049-02

### 5.2.2 Rule Description

A disputed ticket is escalated to the Brand Administrator for review and cannot be actioned further by the Service Center until the brand provides a directive.

### 5.2.3 Enforcement Point

Backend state machine for service requests.

### 5.2.4 Violation Handling

Actions available to the Service Center Admin role for a 'Disputed' ticket will be restricted.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

Requires the existence of a service request with a trackable status, including 'Resolved'.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-047

#### 6.1.2.2 Dependency Reason

User needs to view the service summary to determine if the resolution was satisfactory.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-089

#### 6.1.3.2 Dependency Reason

This story creates the dispute; US-089 is required for the Brand Admin to view and manage it. Without it, disputes go into a black hole.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

Requires a notification system to be in place to alert the Brand Admin of a new dispute.

## 6.2.0.0 Technical Dependencies

- User authentication and authorization service (Azure AD B2C).
- Notification service integration (FCM, Azure Communication Services).
- Asynchronous messaging queue (Azure Service Bus).

## 6.3.0.0 Data Dependencies

- The `service_requests` table must have a `resolved_at` timestamp column to calculate the 7-day window.
- The service request status enum/type must include a 'Disputed' state.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for submitting a dispute must have a 95th percentile (P95) response time of less than 500ms.

## 7.2.0.0 Security

- The API endpoint must be protected and accessible only by the authenticated user who owns the service request.
- All user-provided text (dispute reason) must be sanitized on the backend to prevent Cross-Site Scripting (XSS) vulnerabilities.
- An audit trail entry must be created for every dispute submission (references US-114).

## 7.3.0.0 Usability

- The process to initiate a dispute should be intuitive and require minimal steps.
- Feedback to the user (confirmation, errors) must be immediate and clear.

## 7.4.0.0 Accessibility

- All UI components related to this feature must comply with WCAG 2.1 Level AA.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported mobile OS versions and web browsers as defined in the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordinated changes across frontend, backend, and the notifications service.
- Involves time-based business logic (the 7-day window).
- Requires modification of the service request state machine.
- Integration with an asynchronous event bus for notifications.

## 8.3.0.0 Technical Risks

- Incorrectly calculating the 7-day window across different time zones could be a risk. All timestamps must be stored in UTC.
- Failure in the asynchronous event bus could lead to Brand Admins not being notified. A dead-letter queue and monitoring are required.

## 8.4.0.0 Integration Points

- Backend API for service requests.
- PostgreSQL Database.
- Azure Service Bus (for publishing `serviceRequest.disputed` event).
- Notifications Microservice (for consuming the event).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify a user can dispute a ticket resolved 2 days ago.
- Verify a user cannot dispute a ticket resolved 8 days ago.
- Verify a user cannot dispute a ticket that is still 'In Progress'.
- Verify form validation for the dispute reason.
- Verify that a Brand Admin test account receives a notification when a dispute is submitted.
- Verify API security by attempting to dispute a ticket owned by another user (should fail).

## 9.3.0.0 Test Data Needs

- User accounts.
- Service requests in various statuses ('Resolved', 'In Progress', etc.).
- Service requests with `resolved_at` timestamps set to various points in the past (e.g., 1 day ago, 8 days ago).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- OWASP ZAP or similar for security scanning.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage
- Integration testing completed successfully between the API and notification service
- User interface reviewed and approved for UX and accessibility
- Performance requirements verified under simulated load
- Security requirements validated (input sanitization, authorization checks)
- Documentation for the new API endpoint and event schema is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be prioritized alongside US-089 (Brand Admin: View and manage disputed service requests) to deliver the complete feature loop.
- Requires test data setup for tickets with specific resolution dates.

## 11.4.0.0 Release Impact

This is a key feature for user trust and platform quality assurance. It is a significant enhancement to the service request lifecycle.

