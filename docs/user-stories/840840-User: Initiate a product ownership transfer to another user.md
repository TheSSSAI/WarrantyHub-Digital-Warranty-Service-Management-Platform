# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-033 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Initiate a product ownership transfer to ano... |
| As A User Story | As a registered user (the current product owner), ... |
| User Persona | Registered User / Consumer (Current Product Owner) |
| Business Value | Enables the legitimate transfer of products betwee... |
| Functional Area | Product Management |
| Story Theme | User Account & Product Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Initiate transfer to an existing registered user

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of my registered product which has no active service requests

### 3.1.5 When

I select the 'Transfer Ownership' option, enter the email address of another registered user, and confirm the action

### 3.1.6 Then

A success message 'Transfer request sent successfully' is displayed.

### 3.1.7 And

The recipient user receives an in-app and email notification about the pending transfer.

### 3.1.8 Validation Notes

Verify the product status change in the database. Check notification logs for the recipient. Attempting to raise a service request for the product should result in an error message.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Alternative Flow: Initiate transfer to a non-registered user

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

I am a logged-in user initiating a transfer for my product

### 3.2.5 When

I enter a valid email address that does not belong to a registered user and confirm

### 3.2.6 Then

A success message is displayed.

### 3.2.7 And

An email is sent to the recipient's address containing an invitation to sign up for the platform to accept the product transfer.

### 3.2.8 Validation Notes

Verify the email is sent via the email service logs. The email must contain a unique, secure link for the transfer.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Edge Case: Initiate transfer for a product with an active service request

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

I am a logged-in user initiating a transfer for my product, which has an active service request (e.g., status 'Technician Assigned')

### 3.3.5 When

I successfully submit the transfer request

### 3.3.6 Then

The active service request's status must be updated to 'Paused - Pending Transfer'.

### 3.3.7 And

A notification about the pause must be sent to the assigned Service Center and Technician.

### 3.3.8 Validation Notes

Check the service request's status in the database. Verify that notifications are triggered for the service center/technician.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: Attempt to transfer a product to oneself

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am a logged-in user with the email 'owner@example.com'

### 3.4.5 When

I attempt to transfer a product to 'owner@example.com'

### 3.4.6 Then

The system must display an inline validation error: 'You cannot transfer a product to yourself.'

### 3.4.7 And

The transfer request is not created.

### 3.4.8 Validation Notes

The API call should return a 400 Bad Request status with a clear error message.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Condition: Attempt to transfer a product with an invalid email format

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the transfer ownership screen

### 3.5.5 When

I enter an invalid email address (e.g., 'invalid-email') and try to submit

### 3.5.6 Then

The system must display an inline validation error: 'Please enter a valid email address.'

### 3.5.7 And

The form submission is blocked.

### 3.5.8 Validation Notes

Verify frontend validation prevents submission and that backend API also rejects the request.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Error Condition: Attempt to transfer a product already pending transfer

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I have a product that is already in the 'Pending Transfer' state

### 3.6.5 When

I attempt to access the 'Transfer Ownership' option for that product

### 3.6.6 Then

The 'Transfer Ownership' option must be disabled or hidden.

### 3.6.7 And

If accessed via API, the request must be rejected with an error message 'This product already has a pending transfer.'

### 3.6.8 Validation Notes

Check the UI state for the product card. Test the API endpoint directly to ensure it returns a 409 Conflict status.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Alternative Flow: User cancels a pending transfer request

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

I have a product with a 'Pending Transfer' status

### 3.7.5 When

I select the 'Cancel Transfer' option and confirm

### 3.7.6 Then

The product's status reverts to 'Active'.

### 3.7.7 And

Any service requests that were 'Paused - Pending Transfer' are returned to their previous active status.

### 3.7.8 Validation Notes

Verify product and service request statuses in the database. The link sent to the recipient should now be expired or invalid.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Transfer Ownership' button/link on the product details screen.
- A modal or dedicated screen for the transfer process.
- An email input field with validation for the recipient's address.
- A confirmation dialog explaining the consequences of the transfer.
- A 'Cancel Transfer' button for products in a 'Pending Transfer' state.
- A visual badge or indicator on the product list/card showing 'Pending Transfer'.

## 4.2.0 User Interactions

- User taps 'Transfer Ownership' to open the transfer interface.
- User types in the recipient's email.
- User must explicitly confirm the action in a confirmation dialog.
- User receives immediate feedback (success/error message) after submitting.

## 4.3.0 Display Requirements

- The confirmation dialog must clearly state the product name and recipient's email.
- Error messages for invalid input must be clear and displayed close to the input field.

## 4.4.0 Accessibility Needs

- All interactive elements (buttons, inputs) must be keyboard accessible and have proper focus indicators.
- Labels must be correctly associated with form fields for screen readers.
- Confirmation and status messages must be announced by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A product transfer request automatically expires if not accepted by the recipient within 72 hours.

### 5.1.3 Enforcement Point

System-level check (e.g., a scheduled job or check on access).

### 5.1.4 Violation Handling

The transfer request is invalidated. The product status reverts to 'Active' for the original owner. Any paused service requests are resumed.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Any in-progress service requests for the product shall be paused until the transfer is accepted or rejected.

### 5.2.3 Enforcement Point

During the initiation of the transfer request.

### 5.2.4 Violation Handling

N/A - This is a system action, not a user violation.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

A user must be able to register a product before it can be transferred.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-025

#### 6.1.2.2 Dependency Reason

The user needs to access the product's detail/warranty card view to find the transfer option.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-115

#### 6.1.3.2 Dependency Reason

The system logic to pause an in-progress service request must exist to support transfers of products under service.

## 6.2.0.0 Technical Dependencies

- User Authentication Service (Azure AD B2C) to verify user identity.
- Notification Service (FCM, Azure Communication Services) to send transfer requests.
- Database (PostgreSQL) must support the new status fields on `products` and `service_requests` tables.

## 6.3.0.0 Data Dependencies

- Requires access to the user's list of registered products.
- Requires access to the user database to check if a recipient email is registered.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for initiating a transfer request must be under 500ms (P95).

## 7.2.0.0 Security

- The transfer request must be sent over HTTPS.
- The notification sent to the recipient must contain a secure, unique, single-use, and time-limited token to authorize the acceptance.
- The action must be logged in the system's audit trail, including initiator ID, recipient email, product ID, and timestamp.

## 7.3.0.0 Usability

- The process should be intuitive, requiring minimal steps.
- The consequences of the transfer must be clearly communicated to the user before confirmation.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must be fully functional on all supported mobile OS versions (iOS 14+, Android 8+) and web browsers.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires careful state management for both the product and any associated service requests.
- The process must be transactional to ensure data consistency (e.g., if pausing a service request fails, the transfer initiation should be rolled back).
- Requires secure token generation and validation logic.
- Interaction with the notification service adds a point of failure.

## 8.3.0.0 Technical Risks

- Race conditions if a service request status is updated at the same time a transfer is initiated.
- Ensuring the transfer acceptance link/token is secure and cannot be guessed or reused.

## 8.4.0.0 Integration Points

- Product Service: Manages product state.
- Service Request Service: Manages service request state.
- User Service: Looks up recipient user information.
- Notification Service: Sends email and push notifications.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify transfer to a registered user.
- Verify transfer to a non-registered user.
- Verify transfer of a product with an active service request.
- Verify transfer cancellation by the original owner.
- Verify transfer request expiration after 72 hours.
- Verify all error conditions (self-transfer, invalid email, etc.).

## 9.3.0.0 Test Data Needs

- At least two distinct user accounts.
- A product with no service history.
- A product with a completed service history.
- A product with an active, in-progress service request.

## 9.4.0.0 Testing Tools

- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E testing of the full user flow.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing between Product, Service Request, and Notification services completed successfully
- E2E tests for the transfer initiation and cancellation flows are passing
- User interface reviewed and approved by UX/UI designer
- Security review of the token generation and validation process is complete
- API endpoints are documented in the OpenAPI specification
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is tightly coupled with US-034 ('Receive and respond to a product transfer request'). They should be developed in close succession, ideally in the same or consecutive sprints, to deliver the full feature value.
- Requires coordination with the team responsible for the Service Request module to implement the 'Paused' state.

## 11.4.0.0 Release Impact

This is a significant feature for user engagement and lifecycle management. It should be highlighted in release notes.

