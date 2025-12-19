# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-084 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: Mark a job as 'Resolved' |
| As A User Story | As a Technician, I want to mark an assigned job as... |
| User Persona | Technician using the mobile application on-site af... |
| Business Value | Finalizes the active service phase of a ticket, en... |
| Functional Area | Service Request Management |
| Story Theme | Technician Job Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Technician successfully marks a job as resolved

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Technician logged into the mobile app and viewing the details of an assigned job with the status 'Work In Progress'

### 3.1.5 When

I have entered the service completion notes, listed any parts used, captured the customer's digital signature, and I tap the 'Mark as Resolved' button

### 3.1.6 Then



```
The system must update the service request's status to 'Resolved' in the database.
AND The job must be removed from my primary 'Active Jobs' list and appear in a 'Completed Jobs' section.
AND A success confirmation message, such as 'Job successfully resolved', must be displayed on my screen.
AND A push notification must be sent to the User informing them that the service is complete and prompting them to provide a rating.
AND The Service Center Admin panel must reflect the updated 'Resolved' status for the ticket in real-time.
AND If 'Travel Mode' was active for this job, it must be automatically deactivated.
```

### 3.1.7 Validation Notes

Verify via E2E test: Technician marks job resolved. Check technician's app UI, user's app for notification and status change, and service center panel for status update. Check database for status change and audit log for entry.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: Attempting to resolve a job without completion notes

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am viewing the details of an assigned job with the status 'Work In Progress'

### 3.2.5 When

I tap the 'Mark as Resolved' button without having entered the service completion notes

### 3.2.6 Then



```
The system must prevent the status change.
AND An informative error message must be displayed, such as 'Please enter service completion notes before resolving the job'.
AND The service request status must remain 'Work In Progress'.
```

### 3.2.7 Validation Notes

Manual or E2E test: Attempt to resolve a job without notes. Verify the error message appears and the status does not change in the database or UI.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: Attempting to resolve a job without a customer signature

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am viewing the details of an assigned job with the status 'Work In Progress' and have entered notes

### 3.3.5 When

I tap the 'Mark as Resolved' button without having captured the customer's digital signature

### 3.3.6 Then



```
The system must prevent the status change.
AND An informative error message must be displayed, such as 'Please capture the customer's signature to complete the job'.
AND The service request status must remain 'Work In Progress'.
```

### 3.3.7 Validation Notes

Manual or E2E test: Attempt to resolve a job without a signature. Verify the error message appears and the status does not change.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: Network connectivity is lost during the action

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am viewing the details of a job and my device is offline

### 3.4.5 When

I tap the 'Mark as Resolved' button

### 3.4.6 Then



```
The app must display a clear error message indicating a network issue.
AND The app should ideally queue the status update action to be retried automatically once connectivity is restored.
```

### 3.4.7 Validation Notes

Manual test using network throttling tools. Verify the error message and check if the request is sent upon network restoration.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

UI Behavior: Button is not available for jobs in non-actionable states

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I am viewing the details of an assigned job

### 3.5.5 When

The job status is 'Technician Assigned' or any state other than 'Work In Progress'

### 3.5.6 Then

The 'Mark as Resolved' button must be either hidden or disabled.

### 3.5.7 Validation Notes

UI test: Check the job details screen for jobs in various states to confirm the button's visibility/state.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A primary action button labeled 'Mark as Resolved' on the job details screen.
- A loading indicator/spinner to show while the request is processing.
- A success toast or snackbar for confirmation.
- A modal or inline error message for validation failures (e.g., missing notes/signature).

## 4.2.0 User Interactions

- Tapping the 'Mark as Resolved' button triggers the status update workflow.
- The button should be disabled or hidden until the job status is 'Work In Progress'.
- Upon successful resolution, the user should be navigated from the job details screen back to their job list.

## 4.3.0 Display Requirements

- The job status on the details screen and list view must update immediately after the action is successful.

## 4.4.0 Accessibility Needs

- The 'Mark as Resolved' button must have a proper accessibility label for screen readers.
- The button must meet minimum tap target size requirements.
- All feedback (success, error, loading) must be accessible to users with disabilities.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service request can only be marked as 'Resolved' by the currently assigned technician.

### 5.1.3 Enforcement Point

Backend API (Service Request Microservice)

### 5.1.4 Violation Handling

The API request will be rejected with a 403 Forbidden status code.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A service request must be in the 'Work In Progress' state to be moved to 'Resolved'.

### 5.2.3 Enforcement Point

Backend API (Service Request Microservice)

### 5.2.4 Violation Handling

The API request will be rejected with a 409 Conflict status code.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Service completion notes and a customer signature must be present on the service request record before it can be marked as 'Resolved'.

### 5.3.3 Enforcement Point

Backend API (Service Request Microservice)

### 5.3.4 Violation Handling

The API request will be rejected with a 400 Bad Request status code, indicating the missing prerequisites.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-077

#### 6.1.1.2 Dependency Reason

Provides the job details screen where the 'Mark as Resolved' button will be located.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-078

#### 6.1.2.2 Dependency Reason

Establishes the mechanism for updating a job's status to 'Work In Progress', which is a precondition for this story.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-082

#### 6.1.3.2 Dependency Reason

Implements the feature for entering completion notes, which is a mandatory prerequisite for resolving a job.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-083

#### 6.1.4.2 Dependency Reason

Implements the feature for capturing a customer signature, which is a mandatory prerequisite for resolving a job.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-101

#### 6.1.5.2 Dependency Reason

The notification system must be in place to alert the user upon job completion.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., PATCH /api/v1/service-requests/{id}/status) to handle the status change.
- Integration with the Push Notification Service (FCM via Azure Communication Services).
- Integration with the Audit Logging Service to record the action.
- An asynchronous eventing system (Azure Service Bus) to decouple the status update from notification and auditing.

## 6.3.0.0 Data Dependencies

- The service request record must exist and be assigned to the technician making the request.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the status update request must be under 500ms (P95).

## 7.2.0.0 Security

- The API endpoint must be secured via JWT authentication and authorized to ensure only the assigned technician can perform the action.
- The action of resolving a ticket must be logged in an immutable audit trail, including Technician ID, Ticket ID, and Timestamp (as per SRS 5.9).

## 7.3.0.0 Usability

- The action should be achievable in a minimal number of taps from the job details screen.
- Feedback to the technician (loading, success, error) must be immediate and clear.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent on supported iOS (14.0+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend logic requires multiple validation checks (state, ownership, prerequisites).
- Requires coordination between multiple microservices (Service Request, Notifications, Audit) via an event bus.
- Mobile client needs to handle offline scenarios gracefully.
- The process is transactional; if any part fails (e.g., DB update), the entire operation should roll back.

## 8.3.0.0 Technical Risks

- Potential for race conditions if multiple updates to the same ticket can occur.
- Ensuring idempotency of the event processing for notifications and auditing.

## 8.4.0.0 Integration Points

- Service Request Microservice: To update the ticket status.
- Azure Service Bus: To publish a `ServiceRequestResolved` event.
- Notification Microservice: To consume the event and send a push notification.
- Audit Microservice: To consume the event and create an audit log entry.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify successful resolution with all prerequisites met.
- Verify failure when completion notes are missing.
- Verify failure when customer signature is missing.
- Verify failure when a non-assigned technician attempts to resolve.
- Verify user receives a push notification upon successful resolution.
- Verify offline attempt and successful sync upon reconnection.

## 9.3.0.0 Test Data Needs

- A test technician account.
- A test user account.
- Service requests in 'Work In Progress' state, assigned to the test technician.
- Service requests with and without completion notes/signatures for negative testing.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- Postman/Insomnia (API testing)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for both frontend and backend logic, achieving >80% coverage
- Integration testing completed successfully, verifying the event is published and consumed correctly
- E2E test scenario for the happy path is automated and passing
- User interface reviewed and approved by UX/UI designer
- Security requirements validated (endpoint is protected, action is audited)
- Documentation for the API endpoint is updated in the OpenAPI specification
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a critical story that completes the core technician workflow. It is blocked by US-082 and US-083.
- Requires backend and mobile development effort to be coordinated.

## 11.4.0.0 Release Impact

Essential for the Minimum Viable Product (MVP) as it enables the completion of the service request lifecycle.

