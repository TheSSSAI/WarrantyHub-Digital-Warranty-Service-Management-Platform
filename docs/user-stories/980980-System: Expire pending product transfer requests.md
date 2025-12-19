# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-103 |
| Elaboration Date | 2024-05-21 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Expire pending product transfer requests |
| As A User Story | As the system, I want to automatically expire pend... |
| User Persona | System (Automated Process). Beneficiaries are the ... |
| Business Value | Ensures a predictable and reliable product transfe... |
| Functional Area | Product Management |
| Story Theme | Product Ownership Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

A pending transfer request exceeds the 72-hour expiry window

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A product transfer request exists with a status of 'pending' and its creation timestamp is more than 72 hours in the past

### 3.1.5 When

The automated system expiration job runs

### 3.1.6 Then

The status of the transfer request is updated to 'expired'.

### 3.1.7 And

A notification is sent to the intended recipient user informing them that the request has expired and is no longer actionable.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

An expired transfer request un-pauses an associated service request

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A product transfer request is being expired per AC-001

### 3.2.5 And

The associated product has an active service request with a status of 'paused'

### 3.2.6 When

The transfer request status is updated to 'expired'

### 3.2.7 Then

The status of the paused service request is reverted to its state prior to the transfer initiation.

### 3.2.8 Validation Notes

This requires the service request model to store the pre-paused status. The system must correctly restore this previous status.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

A pending transfer request is within the 72-hour window

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

A product transfer request exists with a status of 'pending' and its creation timestamp is less than 72 hours in the past

### 3.3.5 When

The automated system expiration job runs

### 3.3.6 Then

The status of the transfer request remains 'pending'.

### 3.3.7 And

No status changes occur and no notifications are sent for this request.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

The expiration job encounters an already actioned transfer request

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A product transfer request has a status of 'accepted' or 'rejected'

### 3.4.5 And

Its creation timestamp is more than 72 hours in the past

### 3.4.6 When

The automated system expiration job runs

### 3.4.7 Then

The status of the transfer request is not changed.

### 3.4.8 Validation Notes

The job's query should specifically target only 'pending' requests to ensure efficiency and correctness.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

The notification service fails during the expiration process

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A transfer request is correctly identified for expiration

### 3.5.5 When

The system successfully updates the request status to 'expired' but fails to send one or both notifications due to a service outage

### 3.5.6 Then

The transfer request's status must remain 'expired'.

### 3.5.7 And

A retry mechanism for the failed notification should be triggered if available.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Notification display in the user's notification center (mobile app)
- Status indicator on the product transfer history list for both sender and recipient

## 4.2.0 User Interactions

- This is a background process with no direct user interaction. The user interaction is viewing the result of the process.

## 4.3.0 Display Requirements

- The sender's view of the transfer history must show the request with an 'Expired' status.
- The recipient's view of pending transfers should either remove the request or show it as 'Expired'.
- Notifications sent to users must clearly state which product transfer has expired.

## 4.4.0 Accessibility Needs

- N/A for the backend process. Any resulting UI changes (notifications, status updates) must adhere to WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A product transfer request is considered pending and eligible for expiration only if its status is 'pending'.

### 5.1.3 Enforcement Point

The database query executed by the scheduled expiration job.

### 5.1.4 Violation Handling

Requests with any other status (e.g., 'accepted', 'rejected', 'cancelled') are ignored by the job.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The expiration window for a pending product transfer request is exactly 72 hours from its creation timestamp.

### 5.2.3 Enforcement Point

The time-based condition in the database query of the scheduled job.

### 5.2.4 Violation Handling

Requests newer than 72 hours are ignored by the job.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-033

#### 6.1.1.2 Dependency Reason

This story defines the creation of product transfer requests with a 'pending' status and a creation timestamp, which are necessary for the expiration logic to function.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-034

#### 6.1.2.2 Dependency Reason

This story defines the 'accepted' and 'rejected' states that the expiration job must ignore.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-115

#### 6.1.3.2 Dependency Reason

This story defines the 'paused' state for service requests during a transfer. The expiration logic is dependent on the implementation of pausing to correctly un-pause them.

## 6.2.0.0 Technical Dependencies

- A system-level scheduler (e.g., Kubernetes CronJob, Azure Function Timer Trigger) to run the job periodically.
- The notification service (integrating with FCM and Azure Communication Services) must be available to send alerts.

## 6.3.0.0 Data Dependencies

- The `product_transfers` table must contain `status` and `created_at` columns.
- The `service_requests` table must have a mechanism to store and restore the pre-paused status.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The expiration job must be optimized to handle a large volume of pending requests without causing significant load on the database. The query should use appropriate indexes on status and creation date.
- The job should complete its run within 5 minutes, even with 100,000+ pending requests.

## 7.2.0.0 Security

- The job must run with the minimum necessary permissions to read and update the required tables.

## 7.3.0.0 Usability

- N/A

## 7.4.0.0 Accessibility

- N/A

## 7.5.0.0 Compatibility

- N/A

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires setting up and managing a scheduled (cron) job.
- Logic involves multiple system interactions: database reads/writes, triggering notifications, and conditional logic for un-pausing service requests.
- The process must be idempotent; running it multiple times over the same period should not cause unintended side effects.
- Database transactions are required to ensure atomicity of updates (transfer status and service request status).

## 8.3.0.0 Technical Risks

- The job failing mid-process could leave data in an inconsistent state if not handled with transactions.
- An inefficient database query could cause performance degradation as the number of transfers grows.

## 8.4.0.0 Integration Points

- Database (Azure PostgreSQL)
- Notification Service (FCM/Azure Communication Services)
- Container Orchestrator for scheduling (Azure Kubernetes Service)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify a request older than 72 hours is expired.
- Verify a request newer than 72 hours is not expired.
- Verify that an expired request with a paused service request correctly un-pauses it.
- Verify that accepted/rejected requests are ignored by the job.
- Simulate a notification service failure and confirm the job logs the error but completes the status update.

## 9.3.0.0 Test Data Needs

- Product transfer records with 'pending' status and `created_at` timestamps both before and after the 72-hour mark.
- Transfer records linked to products with and without 'paused' service requests.
- Transfer records with 'accepted' and 'rejected' statuses.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Supertest for integration tests of any API-triggered test harnesses.
- A testing environment where the system clock or record timestamps can be manipulated to trigger the time-based logic on demand.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with at least 80% coverage for the new logic and passing
- Integration testing completed successfully, verifying database changes and notification triggers
- The scheduled job is successfully deployed and configured in the staging environment
- The job has been manually triggered in staging and its effects (DB updates, notifications, UI changes) have been verified
- Logging for the job's execution (start, end, records processed, errors) is implemented and verified
- Documentation updated appropriately, including runbooks for monitoring or manually running the job

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-033, US-034, and US-115. It should be scheduled in a sprint after these dependencies are completed.
- Requires infrastructure setup for a scheduled job if one does not already exist.

## 11.4.0.0 Release Impact

- This is a key feature for maintaining the health and integrity of the product transfer system. It should be included in the release that launches the transfer feature.

