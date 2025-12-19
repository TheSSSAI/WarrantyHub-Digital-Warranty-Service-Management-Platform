# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-100 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Toggles Between Multiple Warranty Cards for a... |
| As A User Story | As a User who has registered a product with multip... |
| User Persona | The 'User' (Consumer) of the web and mobile platfo... |
| Business Value | Enhances user experience by providing an organized... |
| Functional Area | User Mobile App - Product Management |
| Story Theme | Digital Warranty Card Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-100-01

### 3.1.2 Scenario

Displaying multiple warranties

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged in and views the details of a product that has more than one warranty registered

### 3.1.5 When

the digital warranty card screen is loaded

### 3.1.6 Then

a visual indicator (e.g., pagination dots, tabs like '1 of 2') must be displayed, signifying that multiple warranty cards are available for viewing.

### 3.1.7 Validation Notes

Verify the presence of the indicator on the UI. The number of dots/tabs should match the number of warranties.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-100-02

### 3.2.2 Scenario

Toggling between warranty cards

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the user is viewing a product with multiple warranty cards

### 3.2.5 When

the user performs a swipe gesture or taps a navigation control (e.g., an arrow)

### 3.2.6 Then

the view smoothly transitions to the next or previous warranty card in the sequence.

### 3.2.7 Validation Notes

Test on both mobile (swipe) and web (click) interfaces. The transition animation should be fluid.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-100-03

### 3.3.2 Scenario

Data updates on toggle

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the user is viewing a product with a primary and an extended warranty

### 3.3.5 When

the user toggles from the primary warranty card to the extended warranty card

### 3.3.6 Then

all displayed information, including Warranty Expiry Date, the color-coded status badge, the link to Terms & Conditions, and the link to the associated invoice, must update to reflect the details of the extended warranty.

### 3.3.7 Validation Notes

Prepare test data with two distinct warranties. Verify that every data point on the card changes as expected upon toggling.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-100-04

### 3.4.2 Scenario

Product with only one warranty

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a user is viewing the details of a product with only one registered warranty

### 3.4.5 When

the digital warranty card screen is loaded

### 3.4.6 Then

no toggling controls (arrows, pagination dots, tabs) shall be visible.

### 3.4.7 Validation Notes

Verify that the UI for a single-warranty product remains unchanged and does not show any navigation elements for switching cards.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-100-05

### 3.5.2 Scenario

Accessibility for toggling

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

a user with a screen reader enabled is viewing a product with two warranties

### 3.5.5 When

the screen reader focuses on the warranty card area

### 3.5.6 Then

the screen reader must announce the context, such as 'Displaying Manufacturer Warranty, card 1 of 2. Swipe to view next card.'

### 3.5.7 Validation Notes

Test with VoiceOver (iOS) and TalkBack (Android). Ensure navigation controls are properly labeled for screen readers.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-100-06

### 3.6.2 Scenario

Handling many warranties

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a user is viewing a product with a large number of warranties (e.g., 5 or more)

### 3.6.5 When

the digital warranty card screen is loaded

### 3.6.6 Then

the UI for the navigation indicator must handle the large number gracefully (e.g., scrollable tabs/dots) without breaking the layout.

### 3.6.7 Validation Notes

Test with a product having 5+ warranties to ensure the UI remains clean and functional.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A carousel or tab-like component to contain the multiple warranty cards.
- Pagination dots or numbered tabs (e.g., '1/3') to indicate the current card and total count.
- Optional: Left/right arrow buttons for navigation, especially for the web interface.
- Clear title/label on each card to distinguish them (e.g., 'Manufacturer Warranty', 'Extended Warranty').

## 4.2.0 User Interactions

- User can swipe left or right on the mobile app to navigate between cards.
- User can click navigation arrows on the web portal.
- The transition between cards should have a subtle, non-disruptive animation (e.g., slide).

## 4.3.0 Display Requirements

- The default card displayed should be the primary manufacturer's warranty, or if not specified, the one with the soonest expiry date.
- All data on the card must dynamically update to reflect the currently selected warranty.

## 4.4.0 Accessibility Needs

- The component must be keyboard-navigable.
- Swipe gestures must have an alternative tap-based control (e.g., arrows).
- Screen readers must announce the change of context when a new card is displayed.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-100-01

### 5.1.2 Rule Description

A product can have one or more associated warranties.

### 5.1.3 Enforcement Point

Data Model & API Layer

### 5.1.4 Violation Handling

N/A - This rule defines the data relationship.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-100-02

### 5.2.2 Rule Description

The warranty card toggling interface is only displayed if a product has more than one associated warranty.

### 5.2.3 Enforcement Point

Frontend Application Logic

### 5.2.4 Violation Handling

The UI will render the standard single-card view without navigation controls.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-022

#### 6.1.1.2 Dependency Reason

The system must first allow a user to add multiple warranties to a single product before they can be toggled.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-032

#### 6.1.2.2 Dependency Reason

This story enhances the base digital warranty card view. The component for displaying a single card must exist first.

## 6.2.0.0 Technical Dependencies

- The backend API endpoint for fetching product details must be updated to return an array of warranty objects, each with its own complete set of details (expiry, documents, etc.).

## 6.3.0.0 Data Dependencies

- Requires test data for products with a single warranty and products with multiple (2+) warranties to validate all scenarios.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The transition between warranty cards must complete in under 200ms on target devices.
- Loading a product with multiple warranties should not introduce a noticeable delay compared to loading one with a single warranty.

## 7.2.0.0 Security

- The API must ensure a user can only retrieve warranty information for products they own.

## 7.3.0.0 Usability

- The method for switching between cards must be intuitive and discoverable.
- It must be immediately obvious to the user that multiple warranties exist and which one they are currently viewing.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across supported iOS, Android, and modern web browser versions as defined in the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Frontend-heavy task involving UI component implementation (e.g., a carousel).
- Backend change is minor but critical: modifying the product details API response to include an array of warranties.
- State management on the client-side to handle the active card index.

## 8.3.0.0 Technical Risks

- The API change could be a breaking change for older mobile clients if the API is not versioned correctly. A new API version (`/api/v2/...`) or careful backward-compatible field addition is recommended.

## 8.4.0.0 Integration Points

- Frontend mobile and web applications.
- Backend Product/Warranty service API.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify UI for a product with 1 warranty.
- Verify UI and toggling for a product with 2 warranties.
- Verify UI and toggling for a product with 5+ warranties.
- Verify all data points update correctly on each toggle.
- Verify screen reader announcements and keyboard navigation.

## 9.3.0.0 Test Data Needs

- A user account with a product having only one warranty.
- A user account with a product having at least two warranties with distinct expiry dates, invoices, and T&C documents.
- A user account with a product having 5+ warranties.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Unit/Integration)
- Cypress (E2E for Web)
- Appium/Detox (E2E for Mobile)
- VoiceOver/TalkBack (Accessibility)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new components
- Integration testing between frontend and updated backend API completed successfully
- User interface reviewed and approved by UX/Product team
- Performance requirements for card transition verified
- Accessibility requirements validated with screen readers
- Backend API changes are documented in the OpenAPI specification
- Story deployed and verified in the staging environment on both mobile and web clients

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story must be scheduled in a sprint after its prerequisite, US-022, is completed and deployed.
- Requires coordination between frontend (mobile/web) and backend developers for the API change.

## 11.4.0.0 Release Impact

This is a significant UX improvement for a core feature. It should be included in the next minor or major release after implementation.

