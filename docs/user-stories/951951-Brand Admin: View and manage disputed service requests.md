# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-089 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Brand Admin: View and manage disputed service requ... |
| As A User Story | As a Brand Admin, I want a dedicated interface to ... |
| User Persona | Brand Admin: A user responsible for overseeing pro... |
| Business Value | Provides a critical customer service escalation pa... |
| Functional Area | Brand Dashboard |
| Story Theme | Service Request Management & Escalation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Viewing the list of disputed requests

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Brand Admin is logged into the brand portal and there are service requests for their brand with the status 'Disputed'

### 3.1.5 When

the Brand Admin navigates to the 'Disputed Requests' section

### 3.1.6 Then

a list of all disputed service requests for their brand is displayed.

### 3.1.7 Validation Notes

The list must contain columns for Ticket ID, Product Model, Customer Name, Service Center, and Date of Dispute. The list must be paginated if it exceeds 20 items and be sortable by the Date of Dispute.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Viewing the details of a specific disputed request

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Brand Admin is viewing the list of disputed requests

### 3.2.5 When

the Brand Admin clicks on a specific request from the list

### 3.2.6 Then

they are navigated to a detailed view of that service request.

### 3.2.7 Validation Notes

The detail view must clearly display: 1. The customer's reason for the dispute. 2. The complete service history (all status changes, technician notes, parts used). 3. The full chat history between the user and service center. 4. All associated product and customer information.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Resolving a dispute by upholding the service center's resolution

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the Brand Admin is viewing the details of a disputed request

### 3.3.5 When

the Brand Admin clicks 'Uphold Resolution' and enters a mandatory comment explaining the decision

### 3.3.6 Then

the service request status is updated to 'Closed - Dispute Resolved', the comment is saved to the ticket history, and a notification is sent to the customer.

### 3.3.7 Validation Notes

Verify the ticket is removed from the active 'Disputed Requests' list. Verify the customer can see the Brand Admin's comment. Verify the action is logged in the audit trail.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Resolving a dispute by re-opening the ticket for further service

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the Brand Admin is viewing the details of a disputed request

### 3.4.5 When

the Brand Admin clicks 'Re-open for Service' and enters mandatory instructions for the service center

### 3.4.6 Then

the service request status is updated to 'Acknowledged' with a high-priority flag, the instructions are saved, and notifications are sent to both the customer and the service center admin.

### 3.4.7 Validation Notes

Verify the ticket is removed from the 'Disputed Requests' list and reappears in the Service Center's main queue. Verify the service center can see the Brand Admin's instructions.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to resolve a dispute without providing a reason

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

the Brand Admin is viewing the details of a disputed request

### 3.5.5 When

they attempt to click 'Uphold Resolution' or 'Re-open for Service' without entering text in the comment/instruction field

### 3.5.6 Then

the action is blocked and a validation error message is displayed, indicating that a reason is required.

### 3.5.7 Validation Notes

The modal or form should not close, and the ticket status should remain 'Disputed'.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Viewing the disputed requests page when there are none

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a Brand Admin is logged into the brand portal

### 3.6.5 And

there are no service requests for their brand with the status 'Disputed'

### 3.6.6 When

the Brand Admin navigates to the 'Disputed Requests' section

### 3.6.7 Then

a user-friendly message is displayed, such as 'There are no disputed service requests at this time.'

### 3.6.8 Validation Notes

The page should not show an empty table or an error. It should clearly communicate the empty state.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A navigation link to 'Disputed Requests' in the Brand Admin portal.
- A paginated and sortable table/list to display disputed requests.
- A detailed view page for a single disputed request.
- Action buttons: 'Uphold Resolution', 'Re-open for Service'.
- A modal dialog with a mandatory text area for comments/instructions when taking action.
- A dedicated, highlighted section in the detail view for the 'Customer's Reason for Dispute'.

## 4.2.0 User Interactions

- Clicking a dispute in the list navigates to its detail view.
- Action buttons trigger a confirmation modal requiring a comment.
- Submitting the modal finalizes the action and updates the UI.
- Sorting the list by date re-orders the displayed requests.

## 4.3.0 Display Requirements

- The number of pending disputed requests should be visible as a badge on the navigation link.
- The complete, chronological history of the service request must be clearly presented.
- The final decision and comment from the Brand Admin must be visible to the end-user.

## 4.4.0 Accessibility Needs

- All UI elements must be keyboard-navigable.
- All buttons and form fields must have accessible labels for screen readers.
- The interface must comply with WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A Brand Admin can only view and manage disputed requests associated with their own brand.

### 5.1.3 Enforcement Point

API Gateway and Backend Service Logic

### 5.1.4 Violation Handling

The API request will return a 403 Forbidden or 404 Not Found error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A comment or instruction is mandatory for any resolution action taken on a disputed ticket.

### 5.2.3 Enforcement Point

Frontend UI and Backend API Validation

### 5.2.4 Violation Handling

The UI will display a validation error. The API will return a 400 Bad Request error if the comment is missing.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Once a Brand Admin resolves a dispute (either by upholding or re-opening), the ticket can no longer be disputed by the user again.

### 5.3.3 Enforcement Point

Backend State Machine Logic

### 5.3.4 Violation Handling

The 'Dispute' button will be disabled for the user in their app for this specific service request.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-049

#### 6.1.1.2 Dependency Reason

The functionality for a user to initiate a dispute and change a ticket's status to 'Disputed' must exist before an admin can manage them.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-085

#### 6.1.2.2 Dependency Reason

The Brand Admin portal must exist as the container for this feature.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-114

#### 6.1.3.2 Dependency Reason

The audit trail service is required to log all resolution actions taken by the Brand Admin.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

The notification service is required to inform users and service centers about the outcome of the dispute.

## 6.2.0.0 Technical Dependencies

- Service Request state machine must be updated to include 'Disputed' and 'Closed - Dispute Resolved' states and their transitions.
- Role-Based Access Control (RBAC) middleware must be in place to enforce brand-level data segregation.

## 6.3.0.0 Data Dependencies

- Requires access to the complete service request data model, including status, history, chat logs, and user/product details.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The Disputed Requests list page must load within 2 seconds.
- API response time for fetching the list of disputes (P95) must be under 300ms.

## 7.2.0.0 Security

- All actions must be authenticated and authorized via the Brand Admin role.
- Data access must be strictly limited to the admin's assigned brand (tenant isolation).

## 7.3.0.0 Usability

- The interface for reviewing and resolving disputes must be intuitive, requiring minimal training.
- The history of the ticket must be easy to read and understand.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The web portal must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires modifications to the core Service Request state machine.
- Involves creating new UI components for both list and detail views in the frontend application.
- Requires new, secured API endpoints with specific business logic for state transitions and notifications.
- Integration with the notification and audit trail services is necessary.

## 8.3.0.0 Technical Risks

- Potential for race conditions if multiple admins from the same brand try to act on the same ticket simultaneously (though unlikely, should be considered).
- Ensuring the service request history view is performant and does not slow down when loading long chat histories or many status updates.

## 8.4.0.0 Integration Points

- Service Request Database/Service
- Notification Service (FCM/Azure Communication Services)
- Audit Trail Service
- User Management/Authentication Service (Azure AD B2C for roles)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify a Brand Admin can only see disputes for their own brand.
- End-to-end flow: User disputes -> Admin sees dispute -> Admin re-opens -> Service Center sees re-opened ticket.
- End-to-end flow: User disputes -> Admin sees dispute -> Admin upholds -> User is notified of final decision.
- Test API security by attempting to access/modify a dispute with an unauthorized user role or a user from another brand.

## 9.3.0.0 Test Data Needs

- Multiple user accounts.
- At least two distinct Brand Admin accounts for different brands.
- Service requests in a 'Resolved' state to be disputed.
- Service requests already in a 'Disputed' state.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (E2E)
- Axe (Accessibility)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new code
- Integration testing completed successfully
- End-to-end tests covering key scenarios are created and passing
- User interface reviewed and approved for UX and accessibility compliance
- Performance requirements verified
- Security requirements validated (RBAC enforced)
- All admin actions are correctly logged in the audit trail
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a key feature for brand partners and directly impacts customer satisfaction. It should be prioritized after its prerequisite (US-049) is complete.
- Requires both frontend and backend development effort, which can be parallelized after the API contract is defined.

## 11.4.0.0 Release Impact

- This is a major feature for the Brand Admin portal and should be highlighted in release notes for brand partners.

