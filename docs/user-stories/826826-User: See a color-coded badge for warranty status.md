# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-026 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: See a color-coded badge for warranty status |
| As A User Story | As a product owner (User), I want to see a simple,... |
| User Persona | End-User/Consumer of the web and mobile applicatio... |
| Business Value | Improves user experience by providing at-a-glance ... |
| Functional Area | Product Management & Digital Warranty |
| Story Theme | Digital Warranty Card Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Warranty is active and not expiring soon

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing my registered product's warranty card, and the warranty expiry date is more than 30 days from today's date

### 3.1.5 When

The warranty card is displayed

### 3.1.6 Then

A green badge with the text 'Active' is clearly visible on the card.

### 3.1.7 Validation Notes

Verify by setting a product's purchase date such that the warranty expires in 31 or more days. Check both mobile and web UIs.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Warranty is expiring soon (boundary check: 30 days)

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user viewing my registered product's warranty card, and the warranty expiry date is exactly 30 days from today's date

### 3.2.5 When

The warranty card is displayed

### 3.2.6 Then

An amber badge with the text 'Expires Soon' is clearly visible on the card.

### 3.2.7 Validation Notes

Verify by setting a product's purchase date such that the warranty expires in exactly 30 days. The comparison should be inclusive.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Warranty is expiring soon (within 30 days)

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a logged-in user viewing my registered product's warranty card, and the warranty expiry date is between 1 and 29 days from today's date

### 3.3.5 When

The warranty card is displayed

### 3.3.6 Then

An amber badge with the text 'Expires Soon' is clearly visible on the card.

### 3.3.7 Validation Notes

Verify with a warranty expiring in 15 days, and another expiring tomorrow.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Warranty expires today

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am a logged-in user viewing my registered product's warranty card, and the warranty expiry date is today's date

### 3.4.5 When

The warranty card is displayed

### 3.4.6 Then

An amber badge with the text 'Expires Soon' is clearly visible on the card.

### 3.4.7 Validation Notes

Verify that 'today' is considered within the 30-day window and is not yet expired.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Warranty is expired

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am a logged-in user viewing my registered product's warranty card, and the warranty expiry date is in the past

### 3.5.5 When

The warranty card is displayed

### 3.5.6 Then

A red badge with the text 'Expired' is clearly visible on the card.

### 3.5.7 Validation Notes

Verify with a warranty that expired yesterday and another that expired one year ago.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Badge status updates when toggling between multiple warranties

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

I am viewing a product that has both an active primary warranty (Green status) and an expired extended warranty (Red status)

### 3.6.5 When

I toggle the view from the primary warranty to the extended warranty

### 3.6.6 Then

The status badge must immediately update from the green 'Active' badge to the red 'Expired' badge.

### 3.6.7 Validation Notes

Requires US-029 to be implemented. Test by toggling back and forth to ensure the state updates correctly each time.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Graceful handling of missing warranty data

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

A product record is somehow corrupted and has a null or invalid warranty expiry date

### 3.7.5 When

The warranty card for this product is displayed

### 3.7.6 Then

A neutral (e.g., grey) badge with the text 'Status Unknown' is displayed, and no application error occurs.

### 3.7.7 Validation Notes

This requires manually manipulating test data to simulate a corrupted record. The front-end should not crash.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A visual badge component with configurable color (green, amber, red, grey) and text.
- Tooltip or on-press popover for the badge that displays the exact expiry date (e.g., 'Expires on: YYYY-MM-DD').

## 4.2.0 User Interactions

- The badge is a read-only indicator and is not interactive, but its container might be (e.g., the whole card).
- Hovering over the badge on web should display the tooltip.

## 4.3.0 Display Requirements

- The badge must be prominently displayed on the full Digital Warranty Card view.
- A smaller version of the badge should also be visible in the list view of all registered products, allowing for quick scanning of statuses.

## 4.4.0 Accessibility Needs

- In compliance with WCAG 2.1 AA, color must not be the only means of conveying information. The badge must include descriptive text ('Active', 'Expires Soon', 'Expired').
- The color contrast ratio of the text against the badge background must meet WCAG AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-WARRANTY-STATUS-01

### 5.1.2 Rule Description

Warranty status is 'Active' (Green) if the expiry date is more than 30 days in the future.

### 5.1.3 Enforcement Point

Backend API when serializing product data; Frontend when rendering the badge component.

### 5.1.4 Violation Handling

N/A (Calculation rule)

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-WARRANTY-STATUS-02

### 5.2.2 Rule Description

Warranty status is 'Expires Soon' (Amber) if the expiry date is between 0 and 30 days in the future (inclusive).

### 5.2.3 Enforcement Point

Backend API when serializing product data; Frontend when rendering the badge component.

### 5.2.4 Violation Handling

N/A (Calculation rule)

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-WARRANTY-STATUS-03

### 5.3.2 Rule Description

Warranty status is 'Expired' (Red) if the expiry date is in the past.

### 5.3.3 Enforcement Point

Backend API when serializing product data; Frontend when rendering the badge component.

### 5.3.4 Violation Handling

N/A (Calculation rule)

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-023

#### 6.1.1.2 Dependency Reason

The system must first be able to calculate and store the warranty expiry date, which is the primary data point for this story.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-025

#### 6.1.2.2 Dependency Reason

A digital warranty card UI must exist to provide a location for this status badge to be displayed.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-029

#### 6.1.3.2 Dependency Reason

If a product can have multiple warranties, the logic to toggle between them is required to test AC-006.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint that serves product data including the `warrantyExpiryDate`.
- Frontend UI component library for creating the badge element.

## 6.3.0.0 Data Dependencies

- Access to registered product records in the PostgreSQL database, specifically the `warranty_expiry_date` column.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The status calculation logic must not add any noticeable latency to the API response time for fetching product lists or details. Target < 10ms for the calculation itself.

## 7.2.0.0 Security

- The warranty status is derived from user-owned data and should only be visible to the authenticated user and authorized admins (Brand, Service Center, Super Admin).

## 7.3.0.0 Usability

- The color and text of the badge must be instantly understandable to a non-technical user.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines, especially regarding color contrast and not using color as the sole indicator.

## 7.5.0.0 Compatibility

- The badge must render correctly on all supported browsers (Chrome, Firefox, Safari, Edge) and mobile OS versions (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- The core logic is a simple date comparison.
- Requires coordination between backend (providing the date) and frontend (rendering the logic).
- Timezone handling needs to be consistent. All date comparisons should be performed against the server's current date in UTC to avoid client-side timezone discrepancies.

## 8.3.0.0 Technical Risks

- Potential for off-by-one errors in date calculations if timezone boundaries are not handled carefully. The server should be the single source of truth for the current time.

## 8.4.0.0 Integration Points

- The backend Product/Warranty service API.
- The frontend mobile and web applications where product information is displayed.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Component
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify correct badge for a warranty expiring in 6 months (Green).
- Verify correct badge for a warranty expiring in 30 days (Amber).
- Verify correct badge for a warranty expiring tomorrow (Amber).
- Verify correct badge for a warranty expiring today (Amber).
- Verify correct badge for a warranty that expired yesterday (Red).
- Verify badge updates correctly when switching between multiple warranties on a single product.
- Verify accessibility with a screen reader and color contrast checker.

## 9.3.0.0 Test Data Needs

- User accounts with registered products having warranties with various expiry dates (far future, near future, past).
- A product with multiple warranties (one active, one expired).

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend component tests.
- Jest/Supertest for backend unit/integration tests.
- Playwright for E2E tests.
- Axe or similar tools for accessibility scanning.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Backend and frontend code has been peer-reviewed and merged into the main branch.
- Unit and component tests are written for the status calculation logic and UI component, achieving >= 80% coverage.
- E2E tests covering the primary scenarios are implemented and passing.
- UI/UX review confirms the badge is visually correct and adheres to design specifications.
- Accessibility review confirms compliance with WCAG 2.1 AA.
- The feature is documented in the user guide.
- The story has been successfully deployed to the production environment and verified.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

1

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core UI feature for the warranty card and should be prioritized early in the development of the feature set.
- Blocked by the creation of the basic digital warranty card (US-025).

## 11.4.0.0 Release Impact

- This feature is a fundamental part of the user-facing warranty management experience and is essential for the initial product launch.

