# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-030 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Recipient User Rejects a Product Transfer |
| As A User Story | As a Recipient User who has received a product tra... |
| User Persona | A registered platform user who has been designated... |
| Business Value | Enhances user control and data integrity by allowi... |
| Functional Area | User Product Management |
| Story Theme | Product Ownership Transfer |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Recipient successfully rejects a pending transfer

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Recipient User is logged in and has a pending product transfer request visible in their notifications or dashboard

### 3.1.5 When

the user clicks the 'Reject' button associated with the pending transfer and confirms the action in a confirmation dialog

### 3.1.6 Then

the system must update the status of the transfer record to 'Rejected' in the database, the pending transfer must be removed from the Recipient User's view of pending items, and the system must trigger a notification to the Initiating User informing them of the rejection.

### 3.1.7 Validation Notes

Verify the database status change. Verify the UI update for the recipient. Verify the notification is sent to the initiator (check notification logs or initiator's UI).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User cancels the rejection action from the confirmation dialog

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

a Recipient User has clicked the 'Reject' button for a pending transfer

### 3.2.5 When

the confirmation dialog is displayed and the user clicks 'Cancel' or closes the dialog

### 3.2.6 Then

no change is made to the transfer's status, and the transfer remains in the 'Pending' state in the user's view.

### 3.2.7 Validation Notes

Confirm that no API call is made to the reject endpoint and the UI remains unchanged.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

System provides feedback on successful rejection

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a Recipient User has successfully rejected a product transfer

### 3.3.5 When

the system confirms the rejection

### 3.3.6 Then

a clear, non-intrusive success message (e.g., a toast notification) is displayed to the user, such as 'Transfer rejected successfully.'

### 3.3.7 Validation Notes

Visually confirm the appearance and disappearance of the success message.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to reject an expired transfer

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a Recipient User has a pending transfer that is older than the 72-hour expiry window (as defined in US-031)

### 3.4.5 When

the user views the expired transfer request

### 3.4.6 Then

the transfer should be displayed with an 'Expired' status, and the 'Accept' and 'Reject' actions must be disabled or hidden.

### 3.4.7 Validation Notes

Set a transfer's creation timestamp to be > 72 hours in the past and verify the UI state.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Handling network error during rejection

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a Recipient User is attempting to reject a transfer

### 3.5.5 When

the API call to the backend fails due to a network error

### 3.5.6 Then

the system must display a user-friendly error message (e.g., 'Failed to reject transfer. Please check your connection and try again.'), and the transfer must remain in the 'Pending' state.

### 3.5.7 Validation Notes

Use browser developer tools to simulate a network failure for the API call and observe the UI's response.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Security: Unauthorized user attempts to reject a transfer

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

User A has a pending transfer intended for User B

### 3.6.5 When

User A (or any other unauthorized user) attempts to call the rejection API endpoint for that transfer

### 3.6.6 Then

the API must return a '403 Forbidden' or '404 Not Found' status code, and the transfer status must remain unchanged.

### 3.6.7 Validation Notes

Craft an API request using credentials of a user who is not the designated recipient and verify the server's response.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Reject' button, clearly distinct from the 'Accept' button, on each pending transfer item.
- A confirmation modal/dialog with a clear question (e.g., 'Are you sure you want to reject this transfer?'), a confirmation button ('Confirm Reject'), and a cancel button ('Cancel').
- A toast or snackbar component for displaying success or error messages.

## 4.2.0 User Interactions

- Clicking 'Reject' opens the confirmation modal.
- Clicking 'Confirm Reject' in the modal triggers the API call and closes the modal.
- Clicking 'Cancel' in the modal closes it with no further action.
- Upon successful rejection, the transfer item is removed from the list of pending transfers.

## 4.3.0 Display Requirements

- The pending transfer item must clearly show the product name/model and the name of the user who initiated the transfer.

## 4.4.0 Accessibility Needs

- All buttons and modal elements must be keyboard accessible and have appropriate ARIA labels.
- Confirmation dialogs must trap focus.
- Compliant with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A product transfer can only be rejected if its current status is 'Pending'.

### 5.1.3 Enforcement Point

Backend API (service layer)

### 5.1.4 Violation Handling

If an attempt is made to reject a transfer that is not 'Pending' (e.g., already 'Accepted' or 'Expired'), the API should return an error (e.g., 409 Conflict) and the action should fail.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A rejected transfer is a terminal state and cannot be undone by the recipient or initiator.

### 5.2.3 Enforcement Point

System logic

### 5.2.4 Violation Handling

There will be no UI or API functionality to 'un-reject' a transfer. The initiator would need to start a new transfer request.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-028

#### 6.1.1.2 Dependency Reason

A product transfer must be initiated before it can be rejected.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-029

#### 6.1.2.2 Dependency Reason

This story defines the alternative 'Accept' path and likely shares the same UI for viewing pending transfers.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-031

#### 6.1.3.2 Dependency Reason

Defines the 72-hour expiry rule, which is a critical edge case for this story.

## 6.2.0.0 Technical Dependencies

- A functioning notification service (Azure Service Bus + Azure Communication Services/FCM) to alert the initiator.
- A robust authentication and authorization service (Azure AD B2C) to secure the action.

## 6.3.0.0 Data Dependencies

- The database schema must support a 'product_transfers' table with a status field that can hold values like 'Pending', 'Accepted', 'Rejected', 'Expired'.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the rejection action must be under 250ms (P95).

## 7.2.0.0 Security

- The API endpoint for rejecting a transfer must be protected and can only be successfully executed by the authenticated user who is the designated recipient of the transfer.

## 7.3.0.0 Usability

- The rejection process should require no more than two clicks (Reject -> Confirm).
- The user must receive clear feedback on the outcome of their action.

## 7.4.0.0 Accessibility

- All UI components must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported mobile (iOS 14+, Android 8.0+) and web (latest Chrome, Firefox, Safari, Edge) platforms.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires a new API endpoint with business logic for state change and authorization.
- Requires frontend changes to an existing or new component to add the reject button and confirmation flow.
- Requires triggering a new type of notification event.

## 8.3.0.0 Technical Risks

- Potential for race conditions if the initiator cancels the transfer at the exact moment the recipient tries to reject it. The backend logic must handle this gracefully (e.g., first-write-wins).

## 8.4.0.0 Integration Points

- Database: Update status in the `product_transfers` table.
- Notification Service: Publish a 'transfer.rejected' event to Azure Service Bus.
- Authentication Service: Validate the user's JWT to authorize the action.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify a user can successfully reject a transfer.
- Verify the initiator receives a rejection notification.
- Verify a user cannot reject a transfer intended for someone else.
- Verify a user cannot reject an expired or already-accepted transfer.
- Verify the UI handles API errors gracefully.

## 9.3.0.0 Test Data Needs

- At least two distinct user accounts (Initiator, Recipient).
- A method to create 'Pending' product transfers in the test environment.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- NestJS testing modules (with Jest) for backend unit/integration tests.
- Cypress for E2E testing.
- Postman or similar for API-level security testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% coverage for new code
- E2E test scenario for rejection is automated and passing
- User interface changes reviewed and approved by UX/Product Owner
- API security (authorization) validated
- No performance regressions introduced
- Relevant API documentation (Swagger/OpenAPI) is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be prioritized alongside US-029 ('Accept Transfer') as they are complementary parts of the same feature.
- Dependent on the completion of US-028 ('Initiate Transfer').

## 11.4.0.0 Release Impact

- Completes the core user flow for the Product Ownership Transfer feature, making it ready for release.

