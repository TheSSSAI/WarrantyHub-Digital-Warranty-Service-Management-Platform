# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-113 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: View the reason for a rejected warranty clai... |
| As A User Story | As a product owner (User), I want to see the speci... |
| User Persona | The end-user (Consumer) who has registered a produ... |
| Business Value | Increases transparency and user trust by providing... |
| Functional Area | Service Request Module |
| Story Theme | Warranty Claim Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display rejection reason for a claim rejected with a predefined reason

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of my service request

### 3.1.5 When

the warranty claim for that request has been rejected by an administrator with the predefined reason 'Physical Damage'

### 3.1.6 Then

the UI must display a clearly labeled section indicating the claim was rejected and show the reason 'Physical Damage'.

### 3.1.7 Validation Notes

Verify via E2E test. An admin rejects a claim, then the user logs in and confirms the reason is displayed as entered.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Display rejection reason for a claim rejected with a free-text reason

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user viewing the details of my service request

### 3.2.5 When

the warranty claim has been rejected by an administrator with the custom reason 'Evidence of unauthorized third-party repair attempt found.'

### 3.2.6 Then

the UI must display a clearly labeled section indicating the claim was rejected and show the exact custom reason provided by the admin.

### 3.2.7 Validation Notes

E2E test should confirm that the full, un-truncated text is visible.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

No rejection reason is displayed for an approved claim

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am a logged-in user viewing the details of my service request

### 3.3.5 When

the warranty claim for that request has been approved

### 3.3.6 Then

the UI must display the 'Approved' status for the claim and must not display any section or field for a rejection reason.

### 3.3.7 Validation Notes

Verify that the UI component for the rejection reason is not rendered in the DOM.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

No rejection reason is displayed for a pending claim

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am a logged-in user viewing the details of my service request

### 3.4.5 When

the warranty claim for that request is still pending review

### 3.4.6 Then

the UI must display the 'Pending' status for the claim and must not display any section or field for a rejection reason.

### 3.4.7 Validation Notes

Verify that the UI component for the rejection reason is not rendered in the DOM.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

UI handles long rejection reasons gracefully

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am a logged-in user viewing the details of my service request on a mobile device

### 3.5.5 When

the claim has been rejected with a very long, multi-paragraph reason

### 3.5.6 Then

the full text of the reason must be displayed and wrap correctly within its container, without breaking the page layout or becoming unreadable.

### 3.5.7 Validation Notes

Manual QA on various mobile screen sizes (e.g., iPhone SE, large Android) is required.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated, clearly labeled text area or section on the Service Request Details screen.
- A status indicator (e.g., text label, badge) showing the claim status is 'Rejected'.

## 4.2.0 User Interactions

- The user action is purely viewing; no interaction with the displayed reason is required.

## 4.3.0 Display Requirements

- The rejection reason must be displayed only when the associated warranty claim status is 'Rejected'.
- The text must be clearly legible and distinct from other service request details.

## 4.4.0 Accessibility Needs

- The displayed text must meet WCAG 2.1 AA contrast ratio requirements.
- The reason must be readable by screen readers and associated with a proper label (e.g., 'Reason for rejection').

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A rejection reason is only applicable and displayable for service requests where the warranty claim has been explicitly rejected.', 'enforcement_point': 'Frontend rendering logic for the Service Request Details page/screen.', 'violation_handling': "The rejection reason component should not be rendered if the claim status is not 'Rejected'."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-073

#### 6.1.1.2 Dependency Reason

This story depends on the functionality for a Service Center Admin to reject a claim and provide a reason. The backend API and database schema changes to store the reason are implemented in US-073.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

This story adds a new element to the existing Service Request Details view, which is established in US-041.

## 6.2.0.0 Technical Dependencies

- The backend API endpoint for retrieving service request details must be updated to include the `claim_rejection_reason` field in its response payload.

## 6.3.0.0 Data Dependencies

- Requires test data for service requests in various states: claim approved, claim rejected (with both predefined and free-text reasons), and claim pending.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Displaying the rejection reason should not introduce any noticeable latency to the loading of the Service Request Details page. The data should be part of the initial API call for the page.

## 7.2.0.0 Security

- The system must ensure, via Role-Based Access Control (RBAC), that a user can only view rejection reasons for their own service requests.

## 7.3.0.0 Usability

- The reason for rejection must be presented in a clear, unambiguous, and easy-to-find manner within the service request's context.

## 7.4.0.0 Accessibility

- All UI elements and text must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must render correctly on all supported browsers (latest Chrome, Firefox, Safari, Edge) and mobile OS versions (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Backend change is minimal (adding one field to a DTO).
- Frontend change involves adding a conditionally rendered component to an existing page.
- No new business logic is required on the client-side.

## 8.3.0.0 Technical Risks

- Potential for UI layout issues on small screens if a very long rejection reason is provided. Requires thorough responsive testing.

## 8.4.0.0 Integration Points

- Frontend (Web/Mobile) integration with the Service Request API endpoint.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify reason is shown for a rejected claim.
- Verify reason is NOT shown for an approved or pending claim.
- Verify both predefined and free-text reasons are displayed correctly.
- Verify UI on multiple device screen sizes with a long rejection reason.
- Verify screen reader correctly announces the rejection reason.

## 9.3.0.0 Test Data Needs

- A user account.
- A service request linked to the user with a claim status of 'Rejected' and a populated reason field.
- A service request linked to the user with a claim status of 'Approved'.
- A service request linked to the user with a claim status of 'Pending'.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new components
- Integration testing of the API endpoint completed successfully
- E2E test scenario automated and passing in the CI/CD pipeline
- User interface reviewed and approved by UX/Product for both web and mobile
- Accessibility requirements (WCAG 2.1 AA) validated
- Documentation for the API response field updated in the OpenAPI specification
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

1

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-073 and cannot be started until US-073 is complete and its changes are available in the development environment.

## 11.4.0.0 Release Impact

This is a key user experience feature for handling a common negative path. Its absence would make the platform feel incomplete and could lead to user frustration.

