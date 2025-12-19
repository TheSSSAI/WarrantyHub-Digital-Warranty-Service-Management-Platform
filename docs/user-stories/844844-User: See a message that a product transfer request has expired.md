# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-035 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: See a message that a product transfer reques... |
| As A User Story | As a user who has received a product transfer requ... |
| User Persona | Recipient of a product transfer request. (Also imp... |
| Business Value | Provides a clear and final status for time-sensiti... |
| Functional Area | User Product Registration |
| Story Theme | Product Ownership Transfer |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Recipient views an expired transfer request in the UI

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a user (Recipient) who has received a product transfer request from another user (Sender)

### 3.1.5 When

more than 72 hours have passed since the request was created, and I view the request in my notification center or transfer list

### 3.1.6 Then

the request's status must be displayed as 'Expired'

### 3.1.7 And

a clear message, such as 'This transfer request has expired', must be visible.

### 3.1.8 Validation Notes

Verify via frontend inspection. The status text, disabled buttons, and expiry message must be present.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Sender views their expired sent transfer request in the UI

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a user (Sender) who has sent a product transfer request to another user (Recipient)

### 3.2.5 When

more than 72 hours have passed since the request was created, and I view the request in my list of sent transfers

### 3.2.6 Then

the request's status must be displayed as 'Expired'

### 3.2.7 And

any option to 'Cancel' the request must be disabled or hidden.

### 3.2.8 Validation Notes

Verify via frontend inspection on the sender's account. The status text and disabled actions must be present.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

System automatically updates the transfer request status in the database

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a product transfer record exists in the database with a 'Pending' status and a creation timestamp

### 3.3.5 When

a scheduled background process runs and the current time is more than 72 hours past the record's creation timestamp

### 3.3.6 Then

the status of the transfer record in the database must be updated from 'Pending' to 'Expired'.

### 3.3.7 Validation Notes

Verify by checking the database state before and after the scheduled job runs on a test record. The status field must change.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Recipient receives a notification that the transfer request has expired

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am a user (Recipient) with a pending product transfer request

### 3.4.5 When

the 72-hour response window elapses and the request expires

### 3.4.6 Then

the system must send me a push notification informing me that the product transfer request has expired.

### 3.4.7 Validation Notes

Verify that a push notification is received on the recipient's device and the notification log shows the event.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Sender receives a notification that their transfer request has expired

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I am a user (Sender) who has sent a product transfer request that is pending

### 3.5.5 When

the 72-hour response window elapses and the request expires

### 3.5.6 Then

the system must send me a push notification informing me that my transfer request has expired.

### 3.5.7 Validation Notes

Verify that a push notification is received on the sender's device and the notification log shows the event.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

System un-pauses any in-progress service requests upon transfer expiry

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a product with an 'in-progress' service request was part of a transfer request, and that service request was 'paused'

### 3.6.5 When

the associated product transfer request expires after 72 hours

### 3.6.6 Then

the status of the paused service request must revert to its previous 'in-progress' state

### 3.6.7 And

the service request must remain assigned to the original owner (the sender).

### 3.6.8 Validation Notes

Requires setting up a product with an active service request, initiating a transfer, verifying the service request is paused, expiring the transfer, and then verifying the service request is active again.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A status badge/label for transfer requests that clearly displays 'Expired'.
- An informational text block or tooltip to explain why the request expired.
- Disabled 'Accept' and 'Reject' buttons for the recipient.
- Disabled 'Cancel' button for the sender.

## 4.2.0 User Interactions

- Users cannot perform any action on an expired transfer request.
- Tapping on an expired request might show its details but with all actions removed.

## 4.3.0 Display Requirements

- The 'Expired' status must be visually distinct from other statuses (e.g., 'Pending', 'Accepted') through color (e.g., grey) and/or text styling.

## 4.4.0 Accessibility Needs

- The 'Expired' status must be conveyed to screen readers.
- Color alone should not be the only indicator of the expired state; text labels are required (WCAG 2.1).

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A pending product transfer request automatically expires if not accepted or rejected by the recipient within 72 hours of its creation.', 'enforcement_point': 'System-level background job/process.', 'violation_handling': 'N/A - This is a system-enforced state change, not a user violation.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-033

#### 6.1.1.2 Dependency Reason

This story defines the creation of a transfer request, which is the prerequisite for it to expire.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-034

#### 6.1.2.2 Dependency Reason

This story defines the 'Pending' state and the user actions (Accept/Reject) that this story's expiry logic terminates.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-115

#### 6.1.3.2 Dependency Reason

This story defines the pausing of service requests during a transfer. The expiry logic must un-pause them, so the pausing mechanism must exist first.

## 6.2.0.0 Technical Dependencies

- A background job scheduling and execution system (e.g., cron, Azure Functions Timer Trigger).
- A notification service for sending push notifications (e.g., FCM).

## 6.3.0.0 Data Dependencies

- Requires access to the `product_transfers` table/collection, specifically the `status` and `created_at` fields.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The background job to check for expired transfers should complete its scan in under 5 minutes, even with millions of pending requests.

## 7.2.0.0 Security

- The background job must have appropriate, limited permissions to only read and update transfer request statuses.

## 7.3.0.0 Usability

- The 'Expired' status and accompanying message must be unambiguous to the user.

## 7.4.0.0 Accessibility

- All UI changes must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The display of the expired status must render correctly on all supported mobile and web clients.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires implementation of a reliable, scheduled background process, which is more complex than a standard API endpoint.
- Logic must handle time zones correctly to ensure the 72-hour window is accurate globally.
- Requires coordination between backend (job), database (status update), notification service, and frontend (UI display).
- Interaction with the service request module to un-pause tickets adds complexity.

## 8.3.0.0 Technical Risks

- The background job could fail, leading to requests not expiring on time. It needs robust error handling and monitoring.
- Incorrect time zone handling could cause requests to expire too early or too late.

## 8.4.0.0 Integration Points

- Database (PostgreSQL)
- Notification Service (FCM, Azure Communication Services)
- Service Request Microservice (to un-pause tickets)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify a request expires correctly after 72 hours.
- Verify a request does not expire before 72 hours.
- Verify UI for both sender and recipient after expiry.
- Verify notifications are sent to both parties upon expiry.
- Verify a paused service request is correctly resumed after expiry.

## 9.3.0.0 Test Data Needs

- Test accounts for a sender and a recipient.
- A product that can be transferred.
- Ability to create transfer requests with a `created_at` timestamp in the past to simulate the passage of time without waiting 72 hours.

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E tests.
- A tool to manually trigger the background job in test environments.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for the background job logic and passing with >80% coverage
- Integration testing completed successfully, verifying database changes and notification triggers
- E2E tests for both recipient and sender UI flows are passing
- User interface reviewed and approved by UX/Product
- The background job is documented, monitored, and has appropriate alerting
- Documentation updated to reflect the 72-hour expiry rule
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Ensure all prerequisite stories (US-033, US-034, US-115) are completed before starting this story.
- The team must have access to and understanding of the background job scheduling infrastructure.

## 11.4.0.0 Release Impact

This is a core feature for the product transfer workflow, ensuring the process is robust and complete.

