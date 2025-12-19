# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-090 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Brand Admin: Resolve a disputed ticket |
| As A User Story | As a Brand Admin, I want to review the complete hi... |
| User Persona | Brand Admin: A user responsible for managing a spe... |
| Business Value | Provides a critical customer service escalation pa... |
| Functional Area | Service Request Management |
| Story Theme | Dispute Resolution and Quality Assurance |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Brand Admin reviews the full history of a disputed ticket

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Brand Admin is logged into the brand portal and has navigated to the 'Disputed Tickets' view

### 3.1.5 When

the admin clicks on a specific disputed ticket

### 3.1.6 Then

the system displays a detailed view of the ticket, including the original problem description, all user-uploaded media, the full chat history, all status updates, technician notes, parts used, and the user's reason for the dispute.

### 3.1.7 Validation Notes

Verify that all historical data associated with the service request is loaded and displayed chronologically and is clearly attributed to the user, service center, or technician.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Brand Admin resolves a dispute by re-assigning the ticket to the original service center

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a Brand Admin is viewing a disputed ticket's details

### 3.2.5 When

the admin selects the action 'Re-assign to Original Service Center' and submits a comment with new instructions

### 3.2.6 Then

the service request's status is updated to 'Acknowledged' or a similar active state.

### 3.2.7 And

the user receives a notification that their dispute has been actioned and a new service is being arranged.

### 3.2.8 Validation Notes

Check the ticket status in the database, verify the comment is saved, and confirm that notifications are triggered for both the user and the service center.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Brand Admin resolves a dispute by re-assigning the ticket to a different service center

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a Brand Admin is viewing a disputed ticket's details for a user in a serviceable area with multiple authorized centers

### 3.3.5 When

the admin selects 'Re-assign to Different Service Center', chooses a new center from the provided list, and submits a comment

### 3.3.6 Then

the ticket is removed from the original service center's queue and appears in the new service center's queue.

### 3.3.7 And

the new service center and the user receive notifications about the escalation and re-assignment.

### 3.3.8 Validation Notes

Verify the ticket's `service_center_id` is updated in the database. Confirm the ticket appears in the new center's UI and is gone from the old one's.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Brand Admin resolves a dispute by upholding the service center's decision

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a Brand Admin is viewing a disputed ticket's details

### 3.4.5 When

the admin selects the action 'Uphold Original Resolution' and submits a final comment explaining the decision

### 3.4.6 Then

the service request's status is updated to 'Dispute Closed - Rejected'.

### 3.4.7 And

the user receives a notification with the final decision and the admin's comment.

### 3.4.8 Validation Notes

Check the final status in the database and attempt to add a new chat message as a user to confirm it's locked.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Brand Admin resolves a dispute with a custom resolution (e.g., replacement)

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a Brand Admin is viewing a disputed ticket's details

### 3.5.5 When

the admin selects the action 'Close with Final Resolution' and submits a comment detailing the outcome (e.g., 'Product replacement has been arranged')

### 3.5.6 Then

the service request's status is updated to 'Dispute Closed - Resolved'.

### 3.5.7 And

the user receives a notification with the final resolution details.

### 3.5.8 Validation Notes

Check the final status in the database and verify the ticket is locked from further edits or comments.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempting to re-assign a ticket when no other service centers are available

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a Brand Admin is viewing a disputed ticket for a user in an area with only one authorized service center for that brand

### 3.6.5 When

the admin views the available resolution actions

### 3.6.6 Then

the 'Re-assign to Different Service Center' option is disabled or hidden.

### 3.6.7 Validation Notes

Test with a geo-location and brand combination that has only one service center configured. The UI should prevent this action.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Submitting a resolution action without a required comment

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a Brand Admin has selected a resolution action that requires a comment

### 3.7.5 When

the admin attempts to submit the action without entering any text in the comment field

### 3.7.6 Then

the system displays a validation error message (e.g., 'A comment is required to resolve this dispute') and does not update the ticket.

### 3.7.7 Validation Notes

Verify that the frontend form validation prevents submission and that no API call is made, or if it is, the API returns a 400-level error.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A modal or dedicated section for taking resolution action.
- A dropdown or radio button group for selecting the resolution type: 'Re-assign to Original', 'Re-assign to Different', 'Uphold Resolution', 'Close with Resolution'.
- A dropdown list to select a new service center (populated dynamically).
- A mandatory text area for adding comments/instructions.
- A 'Submit Resolution' button.

## 4.2.0 User Interactions

- The list of alternative service centers should only appear if 'Re-assign to Different' is selected.
- The system should present a confirmation dialog before finalizing a closing action ('Uphold' or 'Close').

## 4.3.0 Display Requirements

- The ticket detail view must clearly separate and label comments from the user, service center, and Brand Admin.
- The final resolution status and comment must be prominently displayed on the closed ticket.

## 4.4.0 Accessibility Needs

- All action buttons, forms, and modals must be keyboard accessible and properly labeled for screen readers, adhering to WCAG 2.1 AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-090-1

### 5.1.2 Rule Description

A resolution action on a disputed ticket can only be performed by a Brand Admin associated with the product's brand.

### 5.1.3 Enforcement Point

API Gateway and Microservice Level (RBAC).

### 5.1.4 Violation Handling

The API request is rejected with a 403 Forbidden status code.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-090-2

### 5.2.2 Rule Description

A comment is mandatory for all dispute resolution actions to ensure clarity for the user and for auditing purposes.

### 5.2.3 Enforcement Point

Frontend form validation and Backend API validation.

### 5.2.4 Violation Handling

The request is rejected with a 400 Bad Request status code and a descriptive error message.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-090-3

### 5.3.2 Rule Description

Once a disputed ticket is closed (either 'Rejected' or 'Resolved'), it cannot be reopened or further modified.

### 5.3.3 Enforcement Point

Backend service logic.

### 5.3.4 Violation Handling

Any API calls attempting to modify a closed ticket are rejected with a 409 Conflict status code.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-049

#### 6.1.1.2 Dependency Reason

This story depends on the user's ability to initiate a dispute and for the ticket to be in a 'Disputed' state.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-089

#### 6.1.2.2 Dependency Reason

This story implements the action taken from the list of disputed tickets, which is provided by US-089.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-098

#### 6.1.3.2 Dependency Reason

Requires the service center routing logic to find alternative service centers based on brand and geo-location.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

Requires the notification system to be in place to send alerts to users and service centers upon resolution.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-114

#### 6.1.5.2 Dependency Reason

The resolution action is a critical event that must be logged in the immutable audit trail.

## 6.2.0.0 Technical Dependencies

- Service Request State Machine/Workflow Engine
- Notification Service (Push & Email)
- Role-Based Access Control (RBAC) Middleware

## 6.3.0.0 Data Dependencies

- Access to the complete service request history, including chat logs.
- Access to service center data, including brand authorizations and geographic service areas.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The detailed ticket history view, including all chats and media thumbnails, must load within 3 seconds on a standard internet connection.
- The API response time for submitting a resolution action must be under 300ms (P95).

## 7.2.0.0 Security

- The API endpoint for resolving disputes must be protected and ensure the authenticated Brand Admin belongs to the same brand as the product in the ticket.
- All comments and resolution details must be sanitized to prevent XSS attacks.

## 7.3.0.0 Usability

- The resolution workflow should be clear and intuitive, guiding the admin through the necessary steps without ambiguity.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The Brand Admin portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Modification of the existing service request state machine to include several new 'Dispute' related statuses.
- Implementation of robust RBAC checks to ensure data segregation between brands.
- Dynamic fetching and filtering of alternative service centers based on brand and geo-location.
- Coordination of multiple state changes, notifications, and audit logging in a single transaction.

## 8.3.0.0 Technical Risks

- The query to fetch the complete ticket history could become slow as tickets accumulate many events. Optimization with proper indexing will be crucial.
- Ensuring the state transitions are atomic and handle race conditions correctly.

## 8.4.0.0 Integration Points

- Service Request Microservice (state management)
- Notification Microservice (to trigger alerts)
- User Management/Auth Service (for RBAC)
- Audit Log Service (to record the action)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- A Brand Admin successfully resolves a dispute via all four resolution paths (re-assign same, re-assign different, uphold, close).
- A Brand Admin from Brand A attempts to resolve a ticket for Brand B and is denied access.
- A User confirms they receive the correct notification and can view the final resolution comment after a dispute is closed.
- A Service Center confirms they receive a re-assigned ticket in their queue.

## 9.3.0.0 Test Data Needs

- A test brand with at least two distinct service centers covering the same postal code.
- A test user account.
- A registered product for the test brand.
- A service request that has been moved to 'Disputed' status.

## 9.4.0.0 Testing Tools

- Jest & Supertest (Backend)
- React Testing Library (Frontend)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new logic
- Integration testing completed successfully, verifying state changes and notifications
- E2E tests for all resolution paths are automated and passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements for loading ticket history are verified
- Security requirements validated, especially RBAC rules
- Documentation for the new API endpoints and service request statuses is updated
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a key feature for the brand-facing value proposition. It has several dependencies (US-049, US-089) that must be completed first or in the same sprint.
- Requires coordination between backend (API, state machine) and frontend (Brand Portal UI) development.

## 11.4.0.0 Release Impact

Completes the core dispute resolution loop, which is a major milestone for the platform's service quality management features.

