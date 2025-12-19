# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-032 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Views a Digital Warranty Card with Status and... |
| As A User Story | As a registered User, I want to view a clear and c... |
| User Persona | Consumer/End-User who has registered one or more p... |
| Business Value | Provides a centralized, convenient, and clear view... |
| Functional Area | Product Management |
| Story Theme | Digital Warranty Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display of Core Product and Warranty Information

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged in and viewing the details of a registered product

### 3.1.5 When

the user selects the option to view the digital warranty card

### 3.1.6 Then

the system must display the product's Brand, Model, Serial Number, Purchase Date, and the calculated Warranty Expiry Date.

### 3.1.7 Validation Notes

Verify all fields are populated with the correct data from the product record.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Warranty Status is 'Active' (Green)

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a user is viewing a warranty card for a product whose warranty expires in more than 30 days

### 3.2.5 When

the card is rendered

### 3.2.6 Then

the card must display a visually distinct 'Green' status badge with the text 'Active'.

### 3.2.7 Validation Notes

Test with a warranty expiring in 31 days. The color and text must both be present for accessibility.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Warranty Status is 'Expiring Soon' (Amber)

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a user is viewing a warranty card for a product whose warranty expires within the next 30 days (inclusive)

### 3.3.5 When

the card is rendered

### 3.3.6 Then

the card must display a visually distinct 'Amber' status badge with the text 'Expiring Soon'.

### 3.3.7 Validation Notes

Test with warranties expiring in 30 days, 15 days, and 1 day. The color and text must both be present.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Warranty Status is 'Expired' (Red)

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a user is viewing a warranty card for a product whose warranty has already expired

### 3.4.5 When

the card is rendered

### 3.4.6 Then

the card must display a visually distinct 'Red' status badge with the text 'Expired'.

### 3.4.7 Validation Notes

Test with a warranty that expired yesterday. The color and text must both be present.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Accessing Linked Documents and History

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a user is viewing a digital warranty card

### 3.5.5 When

the user interacts with the card's action links

### 3.5.6 Then

the card must provide separate, clearly labeled links to: view the associated invoice, view the brand's Terms & Conditions, and view the product's complete service history.

### 3.5.7 Validation Notes

Verify each link navigates to the correct screen or document viewer.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Handling Multiple Warranties for a Single Product

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

a user has a product with both a primary and an extended warranty

### 3.6.5 When

the user views the warranty card for that product

### 3.6.6 Then

the UI must provide a clear mechanism (e.g., tabs, dropdown) to switch between viewing the primary warranty card and the extended warranty card.

### 3.6.7 Validation Notes

When switching, verify that all details on the card (Expiry Date, Status Badge, T&Cs link) update to reflect the selected warranty.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Card for Product with No Invoice

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

a user is viewing a warranty card for a product that was registered without an invoice

### 3.7.5 When

the card is rendered

### 3.7.6 Then

the 'View Invoice' link must be disabled or hidden, clearly indicating that no invoice is available.

### 3.7.7 Validation Notes

Ensure the UI state is unambiguous to the user.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Card for Product with No Service History

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

a user is viewing a warranty card for a product that has never had a service request

### 3.8.5 When

the user clicks the 'View Service History' link

### 3.8.6 Then

the user is navigated to a screen that displays a message like 'No service history for this product yet'.

### 3.8.7 Validation Notes

The link should still be active to provide a consistent user experience.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Card container
- Product Title (e.g., 'Brand Model')
- Serial Number display field
- Purchase Date display field
- Warranty Expiry Date display field
- Color-coded Status Badge with text label
- Button/Link to 'View Invoice'
- Button/Link to 'View Terms & Conditions'
- Button/Link to 'View Service History'
- Primary Call-to-Action Button: 'Raise Service Request'
- UI control (e.g., Tabs) to switch between multiple warranties if applicable

## 4.2.0 User Interactions

- User taps on a product from their product list to navigate to this view.
- User can tap on links to navigate to the invoice, T&Cs, and service history pages.
- If multiple warranties exist, the user can tap a control to switch the displayed card.

## 4.3.0 Display Requirements

- The layout must be clean, uncluttered, and prioritize the warranty status and expiry date.
- The design must be responsive, adapting gracefully to various screen sizes on both the mobile app and web portal.

## 4.4.0 Accessibility Needs

- Must comply with WCAG 2.1 Level AA.
- Color-coded status badges must be accompanied by descriptive text.
- All interactive elements must be focusable and operable via keyboard.
- Sufficient color contrast must be used for all text and UI elements.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The 'Expiring Soon' status is triggered for warranties with 30 or fewer days remaining until expiry.

### 5.1.3 Enforcement Point

Backend API when fetching warranty card data.

### 5.1.4 Violation Handling

N/A - System calculation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The warranty expiry date is automatically calculated based on the purchase date and the warranty duration (either from master data or user input).

### 5.2.3 Enforcement Point

Backend logic during product registration and data retrieval.

### 5.2.4 Violation Handling

N/A - System calculation.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

A product must be registered in the system before its warranty card can be viewed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-017

#### 6.1.2.2 Dependency Reason

The invoice upload functionality is required for the 'View Invoice' link to be meaningful.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-013

#### 6.1.3.2 Dependency Reason

The ability for an admin to manage T&Cs is required for the 'View T&Cs' link to function.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-022

#### 6.1.4.2 Dependency Reason

The data model and logic for adding multiple warranties must exist to implement the multi-warranty view.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint must exist to provide all required data for the warranty card in a single, optimized response.
- Frontend UI components for both React Native and Next.js must be created or adapted.

## 6.3.0.0 Data Dependencies

- Access to product, warranty, invoice, and brand T&C data in the database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for fetching warranty card data must be < 250ms (P95).
- The card UI must render on the client-side within 500ms after receiving data.

## 7.2.0.0 Security

- The API endpoint must be secured, ensuring a user can only view warranty cards for products they own.

## 7.3.0.0 Usability

- The information on the card must be easily scannable. Key information (status, expiry date) should be the most prominent.

## 7.4.0.0 Accessibility

- The feature must be fully compliant with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Web: Latest stable versions of Chrome, Firefox, Safari, Edge.
- Mobile: iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend data aggregation from multiple tables (products, warranties, brands).
- Frontend logic to handle multiple states (different statuses, single vs. multiple warranties).
- Ensuring a consistent and responsive UI across both web and mobile platforms.

## 8.3.0.0 Technical Risks

- Potential for slow database queries if not properly indexed and optimized.
- Complexity in state management on the frontend, especially for the multi-warranty view.

## 8.4.0.0 Integration Points

- Integrates with the User's product list screen (as the entry point).
- Links out to the Invoice Viewer, Service History screen, and the 'Raise Service Request' flow.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility
- UI/UX

## 9.2.0.0 Test Scenarios

- Verify card display for each status: Active, Expiring Soon, Expired.
- Verify card display for a product with a single warranty.
- Verify card display and functionality for a product with multiple warranties.
- Verify all navigation links work as expected.
- Verify UI on a range of device screen sizes.
- Test with a screen reader to ensure accessibility compliance.

## 9.3.0.0 Test Data Needs

- User account with a product expiring in >30 days.
- User account with a product expiring in <30 days.
- User account with an expired product.
- User account with a product having both an active and an expired warranty.
- User account with a product that has no invoice.

## 9.4.0.0 Testing Tools

- Jest
- React Testing Library
- Cypress
- Axe for accessibility scanning

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >= 80% coverage and passing
- Integration testing between frontend and backend completed successfully
- User interface reviewed and approved by UX/Product Owner for both web and mobile
- Performance requirements verified under simulated load
- Accessibility audit passed (automated and manual checks)
- Documentation for the API endpoint and frontend components is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The backend API contract should be finalized before frontend work begins.
- This is a foundational UI component for the user's core journey and a blocker for the 'Raise Service Request' story (US-037).

## 11.4.0.0 Release Impact

- This is a critical feature for the initial product launch (MVP). The platform's core value is not realized without it.

