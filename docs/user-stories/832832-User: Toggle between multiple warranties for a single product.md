# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-029 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Toggle between multiple warranties for a sin... |
| As A User Story | As a Consumer who has purchased an extended warran... |
| User Persona | End-User/Consumer using the web or mobile applicat... |
| Business Value | Enhances user experience by providing a clear, cen... |
| Functional Area | Product Management |
| Story Theme | Digital Warranty Card Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User toggles between multiple warranties

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged in and is viewing the digital warranty card for a product that has more than one warranty registered

### 3.1.5 When

the user interacts with the warranty selection control (e.g., taps on a tab or swipes a carousel) to view a different warranty

### 3.1.6 Then

the displayed warranty information (including Warranty Expiry Date, color-coded status badge, link to T&Cs, and link to invoice) must immediately update to reflect the details of the selected warranty.

### 3.1.7 Validation Notes

Verify that all data points on the card change and correspond to the correct warranty record in the database. The transition should be client-side without a page reload.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Default warranty view logic

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a user navigates to the digital warranty card for a product with multiple warranties

### 3.2.5 When

the screen finishes loading

### 3.2.6 Then

the system must display the most relevant warranty by default, based on the following priority: 1. The active warranty that expires soonest. 2. If no warranties are active, the expired warranty that ended most recently.

### 3.2.7 Validation Notes

Test with various data combinations: two active warranties, one active and one expired, two expired warranties.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

UI control visibility for single warranty

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

a user is viewing the digital warranty card for a product that has only one warranty registered

### 3.3.5 When

the screen finishes loading

### 3.3.6 Then

no warranty selection control (e.g., tabs, dots, arrows) shall be visible.

### 3.3.7 Validation Notes

The UI should appear identical to a standard single-warranty product view. There should be no visual clutter indicating other warranties are possible.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Clear visual indication of selected warranty

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a user is viewing a product with multiple warranties

### 3.4.5 When

the user switches between the available warranties

### 3.4.6 Then

the selection control must provide a clear and unambiguous visual cue indicating which warranty is currently being displayed (e.g., an active tab state, a highlighted dot).

### 3.4.7 Validation Notes

Verify that the visual state of the selector accurately reflects the displayed data.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Performance of warranty switching

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a user is viewing a product with multiple warranties

### 3.5.5 When

the user interacts with the selection control

### 3.5.6 Then

the UI update to display the new warranty's details must be perceived as instantaneous, with a latency of less than 100ms.

### 3.5.7 Validation Notes

This should be a client-side state change, not requiring a new API call. All warranty data should be fetched in the initial product detail call.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Accessibility of the warranty switcher

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

a user is navigating the product detail screen using only a keyboard or a screen reader

### 3.6.5 When

the focus is on the warranty selection control

### 3.6.6 Then

the user must be able to switch between warranties using standard keyboard inputs (e.g., arrow keys, Tab) and the screen reader must announce the selected warranty's title or index (e.g., 'Warranty 2 of 3, selected').

### 3.6.7 Validation Notes

Test using keyboard navigation and a screen reader like NVDA, JAWS, or VoiceOver.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A UI control for switching between warranties, such as tabs, a swipeable carousel with indicator dots, or a dropdown menu.
- Clear labels for each warranty (e.g., 'Warranty 1', 'Warranty 2', or a user-defined name if that feature exists).
- Visual state indicators for the active/selected warranty.

## 4.2.0 User Interactions

- User can tap or swipe to change the displayed warranty.
- The interaction should trigger an immediate client-side update of the warranty card content.

## 4.3.0 Display Requirements

- The warranty card must dynamically display the Expiry Date, Status Badge, T&C link, and Invoice link for the currently selected warranty.
- The total number of warranties should be implicitly or explicitly clear (e.g., '1 of 3').

## 4.4.0 Accessibility Needs

- The warranty selection control must be fully keyboard accessible.
- The control must have appropriate ARIA attributes to announce its state (e.g., selected, not selected) to screen readers.
- WCAG 2.1 Level AA compliance is required.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'The default warranty displayed must be the most relevant one: the active warranty with the nearest expiry date, or the most recently expired one if none are active.', 'enforcement_point': 'On load of the product detail/digital warranty card screen.', 'violation_handling': 'If logic fails, default to the first warranty in the array to prevent a blank screen.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-025

#### 6.1.1.2 Dependency Reason

This story enhances the digital warranty card view. The base view must exist first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-028

#### 6.1.2.2 Dependency Reason

This story is critically dependent on the ability for a user to add more than one warranty to a single product. The data model must support a one-to-many relationship between a product and its warranties.

## 6.2.0.0 Technical Dependencies

- The backend API endpoint for fetching product details (e.g., GET /api/v1/products/{id}) must be updated to return an array of all associated warranty objects, not just a single object.
- Frontend state management (Zustand) must be used to manage the currently selected warranty index and trigger UI re-renders.

## 6.3.0.0 Data Dependencies

- The database schema must support a one-to-many relationship between the 'products' table and the 'warranties' table.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The UI transition between warranties must complete in under 100ms.

## 7.2.0.0 Security

- The API must ensure that the user requesting the product details is the legitimate owner of that product record.

## 7.3.0.0 Usability

- The method for switching warranties must be intuitive and discoverable for the average user.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported mobile OS versions (iOS 14+, Android 8.0+) and web browsers (latest stable Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Frontend UI/UX design for the switcher component.
- Client-side state management to handle the active warranty.
- Minor backend API modification to return an array of warranties.
- Ensuring consistent implementation across both React Native (mobile) and Next.js (web) platforms.

## 8.3.0.0 Technical Risks

- Potential for UI flicker or 'flash of incorrect content' if state updates are not handled atomically.
- Ensuring the default warranty selection logic correctly handles all edge cases (e.g., multiple active warranties with same expiry date).

## 8.4.0.0 Integration Points

- Frontend Product Detail Component.
- Backend Product Details API Endpoint.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify a product with 1 warranty shows no toggle.
- Verify a product with 3 warranties allows switching between all 3.
- Verify the correct default warranty is shown for various data combinations.
- Verify all displayed data updates correctly upon toggle.
- Verify keyboard-only navigation and screen reader announcements for the switcher.
- Verify behavior on different screen sizes and devices.

## 9.3.0.0 Test Data Needs

- A test user account with at least three products:
- 1. Product with a single warranty.
- 2. Product with two active warranties with different expiry dates.
- 3. Product with one active and one expired warranty.

## 9.4.0.0 Testing Tools

- Jest
- React Testing Library
- Playwright
- Axe for accessibility scanning

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage for new logic
- Integration testing between frontend and updated backend API completed successfully
- User interface reviewed and approved by UX/UI designer
- Performance requirements for UI transition verified
- Accessibility requirements validated via automated and manual testing
- Documentation for the updated API endpoint is published
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story should be planned in a sprint after US-028 (Add extended warranty) is completed and merged.
- Requires coordinated effort between frontend (web and mobile) and backend teams.

## 11.4.0.0 Release Impact

This is a significant usability improvement for a core feature. It should be included in the next minor or major release after its prerequisite is complete.

