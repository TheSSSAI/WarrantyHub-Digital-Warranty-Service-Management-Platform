# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-028 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Initiates a Product Ownership Transfer |
| As A User Story | As a registered user (product owner), I want to in... |
| User Persona | A registered consumer who is the current owner of ... |
| Business Value | Increases user acquisition by onboarding new users... |
| Functional Area | User Product Management |
| Story Theme | Product Ownership Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Initiate transfer to an existing registered user

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of a product I own, and the product has no service requests with a status other than 'Resolved' or 'Closed'

### 3.1.5 When

I select the 'Transfer Ownership' option, enter the valid email address of another registered user, and confirm the action

### 3.1.6 Then

The system must create a transfer invitation record with a 'pending' status and a 72-hour expiry timestamp.

### 3.1.7 And

The product's status in my product list must be updated to 'Pending Transfer', and actions like raising a service request or deleting the product must be disabled for it.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: Initiate transfer to a non-registered user

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user viewing the details of a product I own

### 3.2.5 When

I select the 'Transfer Ownership' option, enter a valid email address that does not belong to any registered user, and confirm the action

### 3.2.6 Then

The system must create a transfer invitation record with a 'pending' status and a 72-hour expiry.

### 3.2.7 And

I must see a success message and the product's status must be updated to 'Pending Transfer' in my account.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: Attempting to transfer a product to oneself

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in user initiating a transfer for a product I own

### 3.3.5 When

I enter my own email address or phone number as the recipient

### 3.3.6 Then

The system must display an inline validation error message, such as 'You cannot transfer a product to yourself.'

### 3.3.7 And

The transfer initiation must be blocked.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: Attempting to transfer a product with an active service request

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am a logged-in user viewing the details of a product I own

### 3.4.5 And

The transfer process must not be initiated.

### 3.4.6 When

I attempt to access the 'Transfer Ownership' option

### 3.4.7 Then

The 'Transfer Ownership' button must be disabled or, if enabled, clicking it must show an error message like 'This product cannot be transferred while a service request is active.'

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Condition: Attempting to transfer a product already pending transfer

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a logged-in user viewing a product that already has a 'Pending Transfer' status

### 3.5.5 When

I attempt to initiate another transfer for the same product

### 3.5.6 Then

The 'Transfer Ownership' option must be disabled.

### 3.5.7 And

A clear message indicating a transfer is already in progress should be visible.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Error Condition: Invalid recipient identifier format

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am a logged-in user initiating a transfer

### 3.6.5 When

I enter an incorrectly formatted email address (e.g., 'user@domain') or phone number

### 3.6.6 Then

The system must display an inline validation error message indicating the format is invalid.

### 3.6.7 And

The form submission must be blocked until the format is corrected.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Transfer Ownership' button or link on the product details screen.
- A modal dialog or a dedicated page for the transfer process.
- A text input field for the recipient's email or phone number with appropriate validation.
- A confirmation dialog box that clearly explains the consequence of the transfer.
- A visual badge or status text (e.g., 'Pending Transfer') on the product card in the user's main product list.

## 4.2.0 User Interactions

- User clicks 'Transfer Ownership' to open the transfer modal.
- User types recipient's identifier; client-side validation provides real-time feedback on format.
- User clicks a 'Send Invitation' button, which triggers a confirmation dialog.
- User confirms the action, the modal closes, and a success toast/notification is displayed.

## 4.3.0 Display Requirements

- The confirmation dialog must display the name of the product being transferred.
- After initiation, the product details page should clearly indicate that a transfer is pending and show the recipient's identifier (partially masked, e.g., 'j***n@d***.com') and the expiry date of the invitation.

## 4.4.0 Accessibility Needs

- All interactive elements (buttons, inputs, modals) must be keyboard accessible and have appropriate ARIA labels to comply with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-TRANSFER-01

### 5.1.2 Rule Description

A product cannot be transferred if it has an active service request. An active request is any request not in a 'Resolved', 'Closed', or 'Cancelled' state.

### 5.1.3 Enforcement Point

Backend API before initiating the transfer; Frontend UI by disabling the transfer option.

### 5.1.4 Violation Handling

The API request will be rejected with a 409 Conflict error. The UI will display a user-friendly error message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-TRANSFER-02

### 5.2.2 Rule Description

A product can only have one pending transfer invitation at a time.

### 5.2.3 Enforcement Point

Backend API before creating a new transfer invitation.

### 5.2.4 Violation Handling

The API request will be rejected with a 409 Conflict error.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-TRANSFER-03

### 5.3.2 Rule Description

A user cannot transfer a product to themselves.

### 5.3.3 Enforcement Point

Client-side validation and Backend API validation.

### 5.3.4 Violation Handling

The API request will be rejected with a 400 Bad Request error. The UI will show an inline validation error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

A product must be registered in the system before it can be transferred.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-095

#### 6.1.2.2 Dependency Reason

The concept of a user account must exist for both the sender and potential recipient.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-089

#### 6.1.3.2 Dependency Reason

The notification system (push/email) must be implemented to alert the recipient of the transfer request.

## 6.2.0.0 Technical Dependencies

- User Authentication Service (Azure AD B2C) to identify the current owner.
- Notification Service (Azure Communication Services, FCM) to send invitations.
- Product Management Microservice to update product status.
- A new database table to manage the state and lifecycle of transfer invitations.

## 6.3.0.0 Data Dependencies

- Requires access to the user's product list.
- Requires access to the service request status for a given product.

## 6.4.0.0 External Dependencies

- Relies on the availability of Azure Communication Services for sending email invitations.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for initiating a transfer must have a 95th percentile (P95) response time of less than 500ms.

## 7.2.0.0 Security

- The API endpoint must be secured and only accessible by the authenticated owner of the product.
- The recipient's email/phone number must be handled as PII and protected accordingly.
- Rate limiting should be applied to the transfer initiation endpoint to prevent abuse.

## 7.3.0.0 Usability

- The transfer process should be intuitive and require minimal steps.
- Error messages must be clear and actionable for the user.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must be fully functional on all supported mobile (iOS 14+, Android 8.0+) and web (latest Chrome, Firefox, Safari, Edge) platforms.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a new database schema for tracking transfer invitations.
- Involves creating a state machine for the product's ownership status (e.g., OWNED, PENDING_TRANSFER, TRANSFERRED).
- Integration with the notification service for both registered and non-registered users.
- Requires careful handling of edge cases, such as an invitation expiring or being rejected.

## 8.3.0.0 Technical Risks

- Ensuring the atomicity of the operation: updating the product status and sending the notification should be a single transactional unit or handle failures gracefully.
- Handling the user experience for a non-registered recipient to ensure a smooth sign-up and acceptance flow.

## 8.4.0.0 Integration Points

- Product Service: To read product data and update its status.
- User Service: To validate recipient user existence.
- Notification Service: To dispatch the transfer invitation.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify transfer initiation to a registered user.
- Verify transfer initiation to a non-registered user.
- Verify transfer is blocked for a product with an active service request.
- Verify transfer is blocked when attempting to transfer to self.
- Verify UI updates correctly to show 'Pending Transfer' status.
- Verify the API rejects requests that violate business rules with correct HTTP status codes.

## 9.3.0.0 Test Data Needs

- At least two registered user accounts.
- A product owned by User A.
- A product owned by User A with an active service request.
- An email address not associated with any account.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Cypress for E2E tests.
- Postman/Insomnia for API integration testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic is at or above the 80% project standard.
- Integration tests for the transfer initiation flow are implemented and passing.
- E2E tests covering the happy path and key error conditions are passing.
- Security review has been conducted on the new API endpoint.
- UI/UX has been reviewed and approved by the design team.
- All new database migrations have been successfully applied and tested.
- Relevant documentation (API specs, user guides) has been updated.
- The feature has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a prerequisite for US-029 (Accept Transfer) and US-030 (Reject Transfer). The full feature value is only realized when the entire epic is complete.
- Requires coordination between frontend and backend developers due to new UI and API requirements.

## 11.4.0.0 Release Impact

This is a significant user-facing feature that enhances the platform's core value proposition. It should be highlighted in release notes and user communications.

