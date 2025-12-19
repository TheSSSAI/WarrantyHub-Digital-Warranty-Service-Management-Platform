# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-024 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User is Prevented From Editing Critical Product De... |
| As A User Story | As a User, I want to be prevented from editing cri... |
| User Persona | End User / Consumer |
| Business Value | Ensures data integrity and auditability of a produ... |
| Functional Area | Product Management |
| Story Theme | Data Integrity and Governance |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Editing a product with no service history

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is logged in and is viewing the 'Edit Product' page for a product that has never had a service request raised.

### 3.1.5 When

The user inspects the input fields for 'Serial Number', 'Model', and 'Purchase Date'.

### 3.1.6 Then

All three fields are enabled and fully editable.

### 3.1.7 Validation Notes

Tester must verify that changes to these fields can be successfully saved.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Viewing the edit page for a product with a service history

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A user is logged in and is viewing the 'Edit Product' page for a product that has at least one service request (regardless of its status - e.g., Requested, Closed, Cancelled).

### 3.2.5 When

The user inspects the input fields for 'Serial Number', 'Model', and 'Purchase Date'.

### 3.2.6 Then

The fields are displayed as read-only (disabled) and cannot be edited.

### 3.2.7 Validation Notes

Verify the fields are visually greyed out and do not accept keyboard or mouse input.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Editing non-critical details on a locked product

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A user is on the 'Edit Product' page for a product with a locked set of critical details.

### 3.3.5 When

The user modifies a non-critical field, such as 'Product Category' or a custom note, and clicks 'Save'.

### 3.3.6 Then

The changes to the non-critical fields are saved successfully, while the critical fields remain unchanged.

### 3.3.7 Validation Notes

Confirm that after saving and reloading, the non-critical field shows the new value and critical fields show the original values.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Backend API rejects attempts to modify locked critical fields

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A product record exists that has at least one associated service request.

### 3.4.5 When

An API request (e.g., PUT /api/v1/products/{productId}) is sent with a modified value for 'serialNumber', 'model', or 'purchaseDate'.

### 3.4.6 Then

The API must reject the request with a 403 Forbidden (or 400 Bad Request) status code.

### 3.4.7 And

The API response body must contain a clear error message, such as 'Critical product details cannot be modified after a service request has been created.'

### 3.4.8 Validation Notes

This must be tested using an API client like Postman or Insomnia, bypassing the UI.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

UI provides an explanation for why fields are locked

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

A user is on the 'Edit Product' page for a product with locked critical details.

### 3.5.5 When

The user hovers over or taps on one of the disabled fields (e.g., 'Serial Number').

### 3.5.6 Then

A tooltip or helper text appears explaining the restriction, e.g., 'This detail cannot be changed after a service request has been created to ensure record integrity.'

### 3.5.7 Validation Notes

Verify the tooltip is present and its text is clear and informative.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Read-only/disabled input fields for 'Serial Number', 'Model', and 'Purchase Date'.
- Tooltip or icon with helper text to explain the lock.

## 4.2.0 User Interactions

- Locked fields must not be focusable via keyboard navigation (tabbing).
- Hovering or tapping on a locked field should trigger the explanatory tooltip.

## 4.3.0 Display Requirements

- The current values of the locked fields must be clearly displayed.
- The visual styling of locked fields must be distinct from editable fields (e.g., grey background).

## 4.4.0 Accessibility Needs

- Disabled input fields must use appropriate ARIA attributes (e.g., `aria-disabled="true"`) to be accessible to screen readers.
- The explanatory tooltip must be accessible via keyboard and screen reader.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The critical product details ('Serial Number', 'Model', 'Purchase Date') become permanently non-editable by the end-user once the first service request is created for that product.

### 5.1.3 Enforcement Point

Backend API (Product update endpoint) and Frontend UI (Edit Product screen).

### 5.1.4 Violation Handling

The API will return a 403 Forbidden error. The UI will prevent the user from attempting the action.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The lock is triggered by the creation of a service request, regardless of the request's subsequent status (e.g., Requested, Acknowledged, Resolved, Cancelled).

### 5.2.3 Enforcement Point

Backend logic within the Product service.

### 5.2.4 Violation Handling

N/A - This is a system logic rule.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

A product must be able to be registered before its details can be edited or locked.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-023

#### 6.1.2.2 Dependency Reason

This story modifies the behavior of the 'Edit Product' functionality defined in US-023.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-037

#### 6.1.3.2 Dependency Reason

The creation of a service request is the trigger event for the locking mechanism.

## 6.2.0.0 Technical Dependencies

- The Product microservice must be able to query the Service Request microservice (or a replicated data source) to check for the existence of a service request for a given product ID.
- The frontend 'Edit Product' component must be able to receive and interpret a flag indicating the locked state of the product.

## 6.3.0.0 Data Dependencies

- Requires access to both product data and service request data, linked by a common product identifier.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The check for an existing service request on the backend should not add more than 50ms of latency to the product update API call.

## 7.2.0.0 Security

- The primary enforcement of this rule MUST be on the backend API to prevent client-side bypass. The frontend implementation is for usability only.

## 7.3.0.0 Usability

- The reason for the fields being locked must be clearly communicated to the user to avoid confusion and support requests.

## 7.4.0.0 Accessibility

- The locked state and its explanation must be compliant with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The UI behavior must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) and mobile platforms (iOS, Android).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a cross-microservice communication pattern between the Product service and the Service Request service.
- Requires careful handling of potential failures or timeouts in the cross-service call.
- API contract for GET /products/{id} should be updated to include a boolean flag like `isCriticalDataLocked` to simplify frontend logic.

## 8.3.0.0 Technical Risks

- Increased latency or a point of failure if the cross-service communication is not implemented robustly (e.g., without proper timeouts, retries, or circuit breakers).

## 8.4.0.0 Integration Points

- Product Service: `PUT /api/v1/products/{productId}` endpoint.
- Service Request Service: An endpoint or data access layer to check for requests by `productId`.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify a new product without service requests has editable critical fields.
- Create a service request, then verify the product's critical fields become locked in the UI.
- Verify that an API call to modify a locked product's critical details is rejected with the correct error code.
- Verify that non-critical details on a locked product can still be successfully edited and saved via both UI and API.

## 9.3.0.0 Test Data Needs

- Test user account.
- A product with no service history.
- A product with at least one service request in 'Requested' state.
- A product with at least one service request in 'Closed' state.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Integration)
- Jest (Backend Unit)
- Cypress (E2E)
- Postman or similar (API Security/Error Testing)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Backend code implementing the API validation is peer-reviewed and merged.
- Frontend code implementing the UI changes is peer-reviewed and merged.
- Unit tests for both backend and frontend achieve >= 80% coverage for new logic.
- Integration tests confirming the cross-service check are implemented and passing.
- E2E tests covering the full user flow are implemented and passing.
- Security validation confirms the API cannot be bypassed.
- UI changes are verified for accessibility compliance.
- The feature is deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a dependency for US-025 (Admin Override). It should be completed before or in the same sprint as US-025.
- Requires coordination between frontend and backend developers due to changes in both the UI and the API.

## 11.4.0.0 Release Impact

This is a core feature for ensuring platform data integrity and is critical for a trustworthy production launch.

