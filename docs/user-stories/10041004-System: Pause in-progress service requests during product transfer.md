# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-115 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Pause in-progress service requests during ... |
| As A User Story | As the System, I want to automatically pause any a... |
| User Persona | System (with impact on User, Service Center Admin,... |
| Business Value | Ensures data integrity and operational clarity by ... |
| Functional Area | Service Request Management |
| Story Theme | Product Ownership & Service Lifecycle Integrity |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Pause active service request when product transfer is initiated

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A product has an active service request with a status of 'Technician Assigned'

### 3.1.5 When

The current owner initiates an ownership transfer for that product

### 3.1.6 Then

The system must store the current status ('Technician Assigned') as the 'pre-pause status'

### 3.1.7 And

The system must send a notification to the current owner, the assigned technician, and the service center admin informing them the request is paused pending transfer confirmation.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Resume service request under new owner after transfer is accepted

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A service request is in the 'Paused - Ownership Transfer' state

### 3.2.5 When

The recipient user accepts the product ownership transfer

### 3.2.6 Then

The service request's ownership (customer_id) is reassigned to the new owner

### 3.2.7 And

The system must send a notification to the new owner, the assigned technician, and the service center admin informing them the request is now active under the new owner.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Resume service request under original owner after transfer is rejected

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A service request is in the 'Paused - Ownership Transfer' state

### 3.3.5 When

The recipient user rejects the product ownership transfer

### 3.3.6 Then

The service request's ownership remains with the original owner

### 3.3.7 And

The system must send a notification to the original owner, the assigned technician, and the service center admin informing them the transfer was rejected and the service request is active again.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Resume service request under original owner after transfer expires

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A service request is in the 'Paused - Ownership Transfer' state

### 3.4.5 And

The system must send a notification to the original owner, the assigned technician, and the service center admin informing them the transfer expired and the service request is active again.

### 3.4.6 When

The system's scheduled job marks the transfer request as 'Expired'

### 3.4.7 Then

The service request's ownership remains with the original owner

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Actions are blocked on a paused service request

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A service request is in the 'Paused - Ownership Transfer' state

### 3.5.5 When

A technician or service center admin attempts to update its status (e.g., to 'Work In Progress')

### 3.5.6 Then

The system must reject the action with an error message indicating the request is paused.

### 3.5.7 And

When any user attempts to use the chat feature associated with the service request, the action must be blocked and the UI should indicate it is disabled.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Transfer of a product with no active service requests

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A product has only 'Resolved' or 'Cancelled' service requests

### 3.6.5 When

The owner initiates an ownership transfer for that product

### 3.6.6 Then

The system must not change the status of any of the closed service requests

### 3.6.7 And

The transfer process proceeds without triggering any service request pause logic.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clear visual indicator (e.g., 'Paused' badge) on the service request details screen for all user roles (User, Technician, Service Center Admin).
- A disabled chat input field for paused requests with an explanatory message.

## 4.2.0 User Interactions

- Action buttons (e.g., 'Update Status', 'Cancel Request') on the service request screen must be disabled or hidden for paused requests.
- Hovering over the 'Paused' badge should display a tooltip explaining: 'This service request is paused pending the completion of a product ownership transfer.'

## 4.3.0 Display Requirements

- The service request list for technicians and service centers should visually differentiate paused requests (e.g., greyed out text).

## 4.4.0 Accessibility Needs

- The 'Paused' status must be accessible to screen readers, announced clearly when the user navigates to the service request.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-115-01

### 5.1.2 Rule Description

A service request is considered 'active' if its status is not 'Resolved', 'Closed', or 'Cancelled'.

### 5.1.3 Enforcement Point

System logic when a 'ProductTransferInitiated' event is received.

### 5.1.4 Violation Handling

N/A - System rule.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-115-02

### 5.2.2 Rule Description

No state-changing actions can be performed on a service request while its status is 'Paused - Ownership Transfer'.

### 5.2.3 Enforcement Point

API Gateway and/or Service Request microservice logic for all state-mutating endpoints.

### 5.2.4 Violation Handling

The API must return a 409 Conflict status code with a descriptive error message.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-033

#### 6.1.1.2 Dependency Reason

This story defines the event ('ProductTransferInitiated') that triggers the pause logic.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-034

#### 6.1.2.2 Dependency Reason

This story defines the events ('ProductTransferAccepted', 'ProductTransferRejected') that trigger the resume logic.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-103

#### 6.1.3.2 Dependency Reason

This story defines the expiration event ('ProductTransferExpired') that also triggers the resume logic.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-042

#### 6.1.4.2 Dependency Reason

Requires the notification framework to inform users of status changes.

## 6.2.0.0 Technical Dependencies

- Azure Service Bus for event-driven communication between the Product/User service and the Service Request service.
- A defined service request state machine that can accommodate the new 'Paused - Ownership Transfer' state.

## 6.3.0.0 Data Dependencies

- The service_requests table must have a field to store the 'pre-pause status' to allow for correct resumption.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The processing of the 'ProductTransferInitiated' event, including pausing any related service requests, must complete within 500ms.

## 7.2.0.0 Security

- When the service request is reassigned to a new owner, all access permissions for the original owner must be revoked immediately.

## 7.3.0.0 Usability

- The reason for the pause must be clearly communicated to all affected users to prevent confusion and support calls.

## 7.4.0.0 Accessibility

- WCAG 2.1 AA compliance for all UI changes.

## 7.5.0.0 Compatibility

*No items available*

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires cross-microservice communication (event-driven).
- Involves managing and reverting state for the service request lifecycle.
- Requires careful handling of database transactions to ensure atomicity between transfer initiation and service pausing.
- Logic must handle three distinct resume triggers (accept, reject, expire).

## 8.3.0.0 Technical Risks

- Potential for race conditions if transfer events are processed out of order. Event sourcing or idempotent consumers should be considered.
- Failure to correctly revert to the previous state could leave a service request stuck.

## 8.4.0.0 Integration Points

- Subscribes to events from the User/Product Management service (e.g., `ProductTransferInitiated`, `ProductTransferAccepted`).
- Publishes events to the Notification service (e.g., `ServiceRequestPaused`, `ServiceRequestResumed`).
- Service Request API endpoints must enforce the 'paused' state.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- End-to-end test of transfer initiation, acceptance by new user, and successful resumption of the service request.
- End-to-end test of transfer initiation, rejection by new user, and successful resumption for the original owner.
- End-to-end test of transfer initiation and automatic resumption after the 72-hour expiration period.
- Integration test to confirm API calls to update a paused service request are rejected with a 409 Conflict error.
- Unit test for the state machine logic, ensuring correct storage and restoration of the 'pre-pause status'.

## 9.3.0.0 Test Data Needs

- At least two user accounts (original owner, recipient).
- A registered product with an active service request in a specific state (e.g., 'Technician Assigned').

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage for new logic and passing
- Integration tests for event handling and API blocking are implemented and passing
- E2E tests for accept, reject, and expire scenarios are passing in the CI pipeline
- User interface changes reviewed and approved by UX team
- Performance requirements verified via automated tests
- Security requirements validated via code review and testing
- Technical documentation for the new service request state and event contracts is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by the completion of core transfer functionalities (US-033, US-034, US-103). It should be planned for a sprint after those are delivered.
- Requires coordination between developers working on the User/Product service and the Service Request service to finalize event schemas.

## 11.4.0.0 Release Impact

- This is a critical feature for the integrity of the product transfer functionality. The transfer feature should not be released without this story being implemented.

