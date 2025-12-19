# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-061 |
| Elaboration Date | 2024-10-27 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Views Reason for a Rejected Warranty Claim |
| As A User Story | As a product owner (User), I want to see the clear... |
| User Persona | The end-user (Consumer) who has registered a produ... |
| Business Value | Increases transparency and user trust, reduces cus... |
| Functional Area | Service Request Module |
| Story Theme | Warranty Claim Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display of Rejection Reason on Service Ticket

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a User has a service request with a warranty claim status of 'Rejected'

### 3.1.5 When

the User navigates to and views the details of that specific service request

### 3.1.6 Then

the UI must clearly display the warranty claim status as 'Rejected', using a visually distinct indicator (e.g., red text or icon)

### 3.1.7 And

a section titled 'Reason for Rejection' must be visible, containing the exact text provided by the administrator.

### 3.1.8 Validation Notes

Verify that the text displayed to the user matches the reason stored in the database for that service request ID.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Push Notification on Claim Rejection

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a User's warranty claim is changed to 'Rejected' by an administrator

### 3.2.5 When

the system processes the status update

### 3.2.6 Then

the User must receive a push notification with a clear message, such as 'Your warranty claim for [Product Name] has been rejected.'

### 3.2.7 And

tapping on the notification must navigate the user directly to the corresponding service request details screen.

### 3.2.8 Validation Notes

Test on both iOS and Android. Verify deep linking functionality from the notification to the correct screen in the app.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Handling of Long Rejection Reasons

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

an administrator has provided a long, multi-sentence reason for rejection

### 3.3.5 When

the User views the service request details

### 3.3.6 Then

the UI must display the full reason without breaking the layout, using proper text wrapping or a 'show more/less' mechanism.

### 3.3.7 Validation Notes

Test with a reason of at least 500 characters to ensure the UI component handles overflow correctly.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Rejection Reason Persists in Service History

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a User's service request was rejected weeks or months ago

### 3.4.5 When

the User views the product's complete service history and selects the old, rejected ticket

### 3.4.6 Then

the original rejection reason must still be accurately displayed.

### 3.4.7 Validation Notes

Verify that the rejection reason is permanently stored and retrieved as part of the historical service record.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

System Handles Missing Rejection Reason Gracefully

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a service request's claim status is 'Rejected' but, due to a system error, the reason text is null or empty in the database

### 3.5.5 When

the User views the service request details

### 3.5.6 Then

the system must display a user-friendly default message, such as 'A reason for this rejection was not recorded. Please contact support for assistance.'

### 3.5.7 Validation Notes

Manually set the reason field to NULL in the database for a test ticket and verify the UI displays the default message instead of crashing or showing a blank space.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A status label/badge for 'Warranty Claim Status' on the service request details screen.
- A text block or card to display the rejection reason, which is only visible when the claim status is 'Rejected'.

## 4.2.0 User Interactions

- User taps a service request from their list to view details.
- User taps a push notification to be taken directly to the service request details.

## 4.3.0 Display Requirements

- The 'Rejected' status must be visually distinct (e.g., color-coded red).
- The rejection reason text must be rendered as plain text, with any special characters or potential HTML sanitized to prevent XSS.

## 4.4.0 Accessibility Needs

- The 'Rejected' status must be accessible to screen readers.
- Color must not be the only means of conveying the rejected status; it should be accompanied by text and/or an icon (WCAG 2.1 AA).

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'The rejection reason is immutable once set and cannot be edited by the User.', 'enforcement_point': 'Application Logic (Frontend/Backend)', 'violation_handling': 'The UI will not provide any editing capabilities for this field for the User role.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-060

#### 6.1.1.2 Dependency Reason

This story depends on the functionality for an Admin to reject a claim and provide a reason. The data must be captured before it can be displayed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-040

#### 6.1.2.2 Dependency Reason

Requires the existence of a service request tracking/details screen where the rejection information can be displayed.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-125

#### 6.1.3.2 Dependency Reason

This story implements the push notification aspect of the user being notified. The underlying notification infrastructure must be in place.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint to fetch service request details must be updated to include a 'rejectionReason' field.
- Integration with a push notification service (FCM via Azure Communication Services).

## 6.3.0.0 Data Dependencies

- The database schema for the service requests or warranty claims table must include a nullable text field to store the rejection reason.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to fetch service request details, including the rejection reason, must adhere to the P95 latency target of <250ms.

## 7.2.0.0 Security

- The rejection reason text, being user-generated content from an Admin, must be sanitized on the backend before being sent to the client to mitigate Cross-Site Scripting (XSS) vulnerabilities.

## 7.3.0.0 Usability

- The reason for rejection must be presented clearly and unambiguously to the user, avoiding technical jargon where possible.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The display must function correctly on all supported iOS and Android versions and modern web browsers as defined in the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Involves modifying an existing API response and an existing UI screen.
- The logic is straightforward conditional rendering.
- Push notification logic might add minor complexity if not already standardized.

## 8.3.0.0 Technical Risks

- Potential for layout issues on the mobile app if the rejection reason text is extremely long. Requires robust UI component design.

## 8.4.0.0 Integration Points

- Backend: Service Request microservice.
- Frontend: Mobile (React Native) and Web (Next.js) applications.
- External: Azure Communication Services for push notifications.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify reason is displayed correctly after an admin rejects a claim.
- Verify push notification is received and deep-links correctly.
- Verify UI handles long and short reasons without breaking.
- Verify a user-friendly message is shown if the reason is missing.
- Verify the reason persists in the service history view.

## 9.3.0.0 Test Data Needs

- A test user account with a registered product.
- A service request in a 'Pending' state for that product.
- An admin account with permissions to reject claims.
- Pre-defined rejection reasons of varying lengths.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Jest for backend unit tests.
- Cypress for web E2E tests.
- Appium or similar for mobile E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Backend and frontend code has been peer-reviewed and merged.
- Unit test coverage for new logic meets the 80% project standard.
- E2E automated tests for the happy path and notification flow are created and passing.
- UI has been reviewed by a UX designer for clarity and consistency.
- Accessibility checks (e.g., screen reader compatibility) have been performed.
- Backend API changes are documented in the OpenAPI/Swagger specification.
- Story has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-060 and cannot be started until US-060 is complete.
- Close collaboration between backend and frontend developers will be needed to align on the API contract change.

## 11.4.0.0 Release Impact

This is a critical feature for user experience and transparency. It should be included in the next release after its prerequisite is complete.

