# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-033 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Views Color-Coded Warranty Status Badge on Di... |
| As A User Story | As a consumer managing my products, I want to see ... |
| User Persona | End-User / Consumer |
| Business Value | Improves user experience by providing at-a-glance,... |
| Functional Area | Digital Warranty Card |
| Story Theme | User Product Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Warranty is active and not expiring soon

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is viewing a digital warranty card for a product whose warranty expires more than 30 days from the current date

### 3.1.5 When

the warranty card is rendered on the screen

### 3.1.6 Then

a Green status badge with the text 'Active' must be displayed.

### 3.1.7 Validation Notes

Test with a warranty expiry date set to 31 days or more in the future. Verify color code and text.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Warranty is expiring soon

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a user is viewing a digital warranty card for a product whose warranty expires between 1 and 30 days (inclusive) from the current date

### 3.2.5 When

the warranty card is rendered on the screen

### 3.2.6 Then

an Amber status badge with the text 'Expires Soon' must be displayed.

### 3.2.7 Validation Notes

Test with expiry dates of 1 day, 15 days, and 30 days in the future. Verify color code and text.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Warranty is expired

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a user is viewing a digital warranty card for a product whose warranty expiry date is in the past

### 3.3.5 When

the warranty card is rendered on the screen

### 3.3.6 Then

a Red status badge with the text 'Expired' must be displayed.

### 3.3.7 Validation Notes

Test with an expiry date of yesterday. Verify color code and text.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Warranty expires today

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a user is viewing a digital warranty card for a product whose warranty expires on the current date

### 3.4.5 When

the warranty card is rendered on the screen

### 3.4.6 Then

an Amber status badge with the text 'Expires Soon' must be displayed.

### 3.4.7 Validation Notes

The warranty is still valid for the entirety of today. The status should only turn to 'Expired' the following day.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Accessibility: Badge is accessible to screen readers

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a user with a screen reader activated is viewing a digital warranty card

### 3.5.5 When

the user navigates to the warranty status badge

### 3.5.6 Then

the screen reader must announce the full status, such as 'Warranty Status: Active'.

### 3.5.7 Validation Notes

Use VoiceOver (iOS) or TalkBack (Android) to verify the accessibility label and announcement.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Accessibility: Color contrast is sufficient

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the warranty status badge is displayed

### 3.6.5 When

it is viewed on the screen

### 3.6.6 Then

the color contrast ratio between the badge text and its background color must meet WCAG 2.1 Level AA standards.

### 3.6.7 Validation Notes

Use a color contrast checker tool to verify the hex codes for the Green, Amber, and Red badges against the text color.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A visual badge (e.g., a pill-shaped tag) to display the warranty status.

## 4.2.0 User Interactions

- This is a display-only element; no user interaction is required.

## 4.3.0 Display Requirements

- The badge must be prominently displayed on the digital warranty card component.
- The badge must contain both a color (Green/Amber/Red) and a corresponding text label ('Active'/'Expires Soon'/'Expired').

## 4.4.0 Accessibility Needs

- Must include text labels to supplement color-coding for users with color vision deficiency.
- ARIA labels or equivalent mobile accessibility properties must be set for screen reader compatibility.
- Color contrast must comply with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Warranty status is Green if the expiry date is more than 30 days in the future.

### 5.1.3 Enforcement Point

Backend service when calculating product warranty status.

### 5.1.4 Violation Handling

N/A - System calculation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Warranty status is Amber if the expiry date is within the next 30 days (inclusive of today).

### 5.2.3 Enforcement Point

Backend service when calculating product warranty status.

### 5.2.4 Violation Handling

N/A - System calculation.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Warranty status is Red if the expiry date is in the past.

### 5.3.3 Enforcement Point

Backend service when calculating product warranty status.

### 5.3.4 Violation Handling

N/A - System calculation.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-032

#### 6.1.1.2 Dependency Reason

This story implements a component that is displayed *on* the Digital Warranty Card. The parent UI must exist first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-015

#### 6.1.2.2 Dependency Reason

Requires a product to be registered with a purchase date and warranty duration to calculate the expiry date.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint that provides product details, including the warranty expiry date. It is recommended the API also provides the pre-calculated status string (e.g., 'ACTIVE', 'EXPIRING_SOON', 'EXPIRED') to simplify client logic.

## 6.3.0.0 Data Dependencies

- Requires access to the `warranty_expiry_date` for a given product.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The status calculation must not add any noticeable latency to the API response for loading product details.

## 7.2.0.0 Security

- No specific security requirements beyond the standard authentication/authorization for accessing user data.

## 7.3.0.0 Usability

- The color and text combination must be instantly understandable to the user.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA for color contrast and screen reader compatibility.

## 7.5.0.0 Compatibility

- The badge must render correctly on all supported mobile OS versions (iOS 14+, Android 8.0+) and web browsers (latest stable Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Involves simple date comparison logic on the backend.
- Requires creating a straightforward conditional UI component on the frontend.
- Primary challenge is ensuring consistent date/time handling across the stack (recommend UTC for all backend calculations).

## 8.3.0.0 Technical Risks

- Potential for inconsistencies if date/time zone handling is not standardized between the server and clients.

## 8.4.0.0 Integration Points

- Frontend (Web/Mobile) integration with the product details API endpoint.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify correct badge for a warranty expiring in 6 months (Green).
- Verify correct badge for a warranty expiring in 29 days (Amber).
- Verify correct badge for a warranty expiring in 1 day (Amber).
- Verify correct badge for a warranty that expired yesterday (Red).
- Verify screen reader output for each status.
- Verify UI on different screen sizes and orientations.

## 9.3.0.0 Test Data Needs

- User accounts with products having various warranty expiry dates relative to the current date.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend component tests.
- Jest for backend unit tests.
- Cypress for web E2E tests.
- A color contrast analyzer tool.
- Platform-native screen readers (VoiceOver, TalkBack).

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests for the backend status calculation logic are implemented and passing with >80% coverage
- Frontend component tests for the badge are implemented and passing
- Integration testing between frontend and backend for this feature is completed successfully
- User interface reviewed and approved for both mobile and web
- Accessibility requirements (WCAG 2.1 AA contrast, screen reader support) are validated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

1

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a high-value, low-effort UI improvement. It should be prioritized early in the development of the product view.
- The API contract (what the backend will provide) should be agreed upon before frontend work begins.

## 11.4.0.0 Release Impact

Enhances the core user experience of managing products. Key feature for the initial release.

