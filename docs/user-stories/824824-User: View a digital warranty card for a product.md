# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-025 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: View a digital warranty card for a product |
| As A User Story | As a registered user, I want to view a detailed di... |
| User Persona | The end-user (Consumer) of the web and mobile appl... |
| Business Value | Provides users with immediate, transparent access ... |
| Functional Area | Product & Warranty Management |
| Story Theme | Digital Warranty Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display of a valid warranty card with all information

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user and have a registered product with a warranty that expires in more than 30 days

### 3.1.5 When

I navigate to and view the details of that product

### 3.1.6 Then

I should see a digital warranty card displaying the product's Brand, Model, and Serial Number, the correct Warranty Expiry Date, a prominent 'Green' color-coded badge with the status 'Valid', a tappable link to view the associated invoice, a tappable link to the brand's Terms and Conditions, and a summary of the product's service history.

### 3.1.7 Validation Notes

Verify all data fields are populated correctly from the backend. The 'Green' badge should be visually distinct. Links must be functional.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Display of a warranty card for a product with a soon-to-expire warranty

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user and have a registered product with a warranty that expires in 20 days

### 3.2.5 When

I view the digital warranty card for that product

### 3.2.6 Then

The card should display a prominent 'Amber' color-coded badge with a status like 'Expires Soon' or indicating the remaining days.

### 3.2.7 Validation Notes

The status calculation logic must correctly identify warranties expiring within the 30-day window.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Display of a warranty card for a product with an expired warranty

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a logged-in user and have a registered product with a warranty that expired 10 days ago

### 3.3.5 When

I view the digital warranty card for that product

### 3.3.6 Then

The card should display a prominent 'Red' color-coded badge with the status 'Expired'.

### 3.3.7 Validation Notes

The 'Raise Service Request' button on this card may be present but should lead to a flow that highlights the out-of-warranty status.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Display of a warranty card for a new product with no service history

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am a logged-in user and have a newly registered product with no service requests raised yet

### 3.4.5 When

I view the digital warranty card for that product

### 3.4.6 Then

The service history section should display a clear, user-friendly message, such as 'No service history available for this product'.

### 3.4.7 Validation Notes

The UI should not show an empty or broken state; it must handle the absence of service history data gracefully.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Display of a warranty card where optional documents are missing

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A user has a registered product but did not upload an invoice, and the brand has not provided a Terms & Conditions document

### 3.5.5 When

The user views the digital warranty card for that product

### 3.5.6 Then

The link to the invoice should be disabled or replaced with a message like 'Invoice not uploaded', and the link to the Terms and Conditions should be hidden or disabled.

### 3.5.7 Validation Notes

The component must handle null values for document links without crashing or showing broken UI elements.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Initial display for a product with multiple warranties

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

A user has a product with a primary warranty (expired) and an active extended warranty

### 3.6.5 When

The user views the digital warranty card for that product

### 3.6.6 Then

The card should initially display the details of the currently active warranty (the extended one), and there should be a clear UI element (e.g., tabs, a dropdown) indicating that other warranties exist for this product.

### 3.6.7 Validation Notes

The logic to determine the 'primary' or 'most relevant' warranty to display first must be clearly defined. This story sets the stage for US-029.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A container view for the 'card'
- Text fields for Product Brand, Model, Serial Number, Expiry Date
- A visually distinct, color-coded status badge (Green, Amber, Red)
- Clickable/tappable links or buttons for 'View Invoice', 'View Terms & Conditions'
- A section to display a summary list of past service requests
- An indicator for multiple warranties if applicable

## 4.2.0 User Interactions

- User navigates from a product list to this detailed view.
- User can tap on links to open associated documents (invoice, T&Cs) in a new view or modal.
- User can scroll to view the full service history if it is long.

## 4.3.0 Display Requirements

- All key product and warranty information must be visible without excessive scrolling on a standard mobile screen.
- The warranty status (Valid, Expiring Soon, Expired) must be the most prominent information on the card after the product name.

## 4.4.0 Accessibility Needs

- All text must meet WCAG 2.1 AA contrast ratios.
- The color-coded badges must be accompanied by clear text labels for color-blind users.
- All interactive elements (links, buttons) must have accessible names and be navigable via keyboard and screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-WARRANTY-STATUS-01

### 5.1.2 Rule Description

Warranty status is 'Amber' if the expiry date is within the next 30 days (inclusive) and has not passed.

### 5.1.3 Enforcement Point

Backend API when fetching warranty card data.

### 5.1.4 Violation Handling

N/A - This is a calculation rule.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-WARRANTY-STATUS-02

### 5.2.2 Rule Description

Warranty status is 'Red' if the expiry date is in the past.

### 5.2.3 Enforcement Point

Backend API when fetching warranty card data.

### 5.2.4 Violation Handling

N/A - This is a calculation rule.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-WARRANTY-STATUS-03

### 5.3.2 Rule Description

Warranty status is 'Green' if the expiry date is more than 30 days in the future.

### 5.3.3 Enforcement Point

Backend API when fetching warranty card data.

### 5.3.4 Violation Handling

N/A - This is a calculation rule.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

A product must be registered in the system before its warranty card can be viewed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-021

#### 6.1.2.2 Dependency Reason

The invoice upload functionality must exist to provide the data for the 'View Invoice' link.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-094

#### 6.1.3.2 Dependency Reason

The brand's T&C document must be manageable by an admin to be linked from the card.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-027

#### 6.1.4.2 Dependency Reason

The service history summary component is displayed on this card, so its data requirements must be defined first.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., GET /api/v1/products/{productId}/warranties) that aggregates and returns all necessary data for the card.
- Access to Azure Blob Storage to retrieve URLs for invoices and T&C documents.
- A defined database schema for products, warranties, and service_requests.

## 6.3.0.0 Data Dependencies

- Requires existing, populated product and warranty records for testing.
- Requires test data for products in all three warranty states (Valid, Expiring, Expired).
- Requires test data for products with and without service history.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to fetch warranty card data must have a 95th percentile (P95) latency below 250ms.
- The UI for the card must render on the client-side with a Largest Contentful Paint (LCP) of less than 2.5 seconds.

## 7.2.0.0 Security

- The API endpoint must be protected and enforce that a user can only request data for products they own (RBAC).
- Data must be transmitted over HTTPS.

## 7.3.0.0 Usability

- The card layout must be clean and intuitive, presenting the most critical information first.
- Interaction points (links, buttons) must be obvious and provide clear feedback when tapped.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Web: Must render correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- Mobile: Must render correctly on supported iOS (14.0+) and Android (8.0+) devices.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend data aggregation: The API needs to efficiently join data from multiple tables (products, warranties, invoices, service_requests, brands).
- Frontend state management: The UI component needs to handle multiple states based on the warranty status and the presence/absence of optional data (invoice, T&Cs, service history).
- Business logic for status calculation must be robust and handle timezones correctly.

## 8.3.0.0 Technical Risks

- The data aggregation query could become a performance bottleneck if not optimized properly. Consider caching strategies for relatively static data.
- Ensuring consistent date/time handling across the client, server, and database is critical for accurate status calculation.

## 8.4.0.0 Integration Points

- Frontend client (Web/Mobile) consumes the backend API.
- Backend API integrates with the PostgreSQL database and Azure Blob Storage.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify card display for a product with a valid warranty.
- Verify card display for a product with a warranty expiring in 10 days.
- Verify card display for a product with an expired warranty.
- Verify card display for a product with no invoice uploaded.
- Verify card display for a product with a long service history.
- Verify that a user cannot access the warranty card of another user's product via API manipulation.

## 9.3.0.0 Test Data Needs

- User accounts with products in each warranty status category.
- Products with and without associated invoices and service histories.
- A product with multiple associated warranties (primary and extended).

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend integration tests.
- Playwright for E2E tests.
- Axe for automated accessibility checks.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Backend and frontend code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new logic meets the project standard (e.g., 80%).
- API endpoint is documented in the OpenAPI specification.
- E2E tests covering the primary scenarios are implemented and passing.
- UI has been reviewed for responsiveness and adherence to design specifications.
- Accessibility checks (automated and manual) have been completed and passed.
- The feature has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational UI component for the user's product management experience.
- It is a direct prerequisite for the 'Raise Service Request' story (US-036) and should be planned accordingly.

## 11.4.0.0 Release Impact

This feature is critical for the Minimum Viable Product (MVP) as it delivers a core piece of the platform's value proposition.

