# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-021 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Views Auto-Populated Warranty Duration for Kn... |
| As A User Story | As a Consumer registering a new product, I want th... |
| User Persona | End-User/Consumer using the web or mobile applicat... |
| Business Value | Improves data integrity by ensuring standard warra... |
| Functional Area | User Product Registration |
| Story Theme | Product Management & Onboarding |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Warranty duration is auto-populated and locked for a known product model

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is on the 'Add Product' screen and the system has master data for 'BrandA's' 'ModelX' with a 24-month warranty

### 3.1.5 When

The user selects 'BrandA' and then selects 'ModelX'

### 3.1.6 Then

The 'Warranty Duration' input field is populated with the value '24 months' (or an equivalent standardized display)

### 3.1.7 And

A visual indicator (e.g., an info icon) appears next to the field, which on hover/tap displays text like 'Standard manufacturer warranty.'

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Warranty duration remains editable for an unknown product model

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

A user is on the 'Add Product' screen

### 3.2.5 When

The user selects a brand and enters a model name that does not exist in the system's master data

### 3.2.6 Then

The 'Warranty Duration' input field remains empty and fully editable

### 3.2.7 And

The user is able to manually enter a value into the 'Warranty Duration' field.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Warranty duration remains editable for a known model with no configured warranty period

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

A user is on the 'Add Product' screen and the system has master data for 'BrandB's' 'ModelY', but the warranty duration is not set (null or zero)

### 3.3.5 When

The user selects 'BrandB' and then selects 'ModelY'

### 3.3.6 Then

The 'Warranty Duration' input field remains empty and fully editable.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Warranty field state resets when the user changes the model selection

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

A user has selected a known model ('ModelX') and the warranty duration is auto-populated and locked

### 3.4.5 When

The user changes the model selection to an unknown model ('ModelZ')

### 3.4.6 Then

The 'Warranty Duration' input field is cleared and becomes fully editable again.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Warranty field state resets when the user changes the brand selection

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

A user has selected a known brand and model, and the warranty duration is auto-populated and locked

### 3.5.5 When

The user changes the brand selection

### 3.5.6 Then

The model selection field is cleared

### 3.5.7 And

The 'Warranty Duration' input field is cleared and becomes fully editable.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

System handles API lookup failure gracefully

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A user is on the 'Add Product' screen and selects a brand and model

### 3.6.5 When

The API call to fetch the master warranty data fails due to a network error or server issue

### 3.6.6 Then

The 'Warranty Duration' input field remains editable to not block the user

### 3.6.7 And

No error message is shown to the user, allowing for a seamless fallback to manual entry.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Brand selection dropdown
- Model selection input/dropdown
- Warranty Duration input field
- Informational icon/tooltip next to the warranty field

## 4.2.0 User Interactions

- Selecting a brand and model triggers an asynchronous data fetch.
- The warranty field should visually indicate its locked/read-only state (e.g., grey background).
- Hovering over or tapping the info icon reveals a tooltip.

## 4.3.0 Display Requirements

- A subtle loading indicator should appear while the warranty data is being fetched to provide user feedback.
- The warranty duration should be displayed in a user-friendly format (e.g., '12 months', '2 years').

## 4.4.0 Accessibility Needs

- The read-only warranty field must be announced as 'read-only' or 'disabled' by screen readers.
- The text in the informational tooltip must be accessible to screen readers.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "The standard manufacturer's warranty duration, when available in the master data, is the single source of truth and cannot be overridden by the user during initial product registration.", 'enforcement_point': 'Product Registration Screen (Client-side and Server-side validation).', 'violation_handling': 'The UI prevents editing. Any attempt to submit a modified value via API manipulation for a known model must be rejected by the server.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-012

#### 6.1.1.2 Dependency Reason

This story is functionally dependent on the existence of a master product model database where Super Admins can define default warranty durations. The backend infrastructure and data from US-012 must be in place first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-015

#### 6.1.2.2 Dependency Reason

This story enhances the manual product registration flow. The base form and logic for registering a product must exist.

## 6.2.0.0 Technical Dependencies

- A backend REST API endpoint to look up warranty duration by brand and model.
- A master data table for product models in the PostgreSQL database.

## 6.3.0.0 Data Dependencies

- The master product model table must be populated with test data covering various scenarios (model with warranty, model without warranty, etc.).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for warranty lookup must have a 95th percentile (P95) latency of less than 200ms to ensure a responsive user experience without noticeable delay.

## 7.2.0.0 Security

- The warranty lookup API endpoint must be protected and accessible only by authenticated users.
- Server-side validation must re-verify that a user-submitted warranty duration matches the master data for a known model to prevent tampering.

## 7.3.0.0 Usability

- The feature should be intuitive, providing clear visual cues when a field is auto-populated and locked.
- The fallback to manual entry in case of unknown models or API failure must be seamless.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported web browsers (latest Chrome, Firefox, Safari, Edge) and mobile platforms (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires coordination between frontend and backend for the new API endpoint.
- Frontend state management to handle the conditional read-only state of the input field.
- The core logic is a simple database lookup.

## 8.3.0.0 Technical Risks

- Potential for latency in the API call if the database is not properly indexed, impacting user experience.
- Ensuring consistent behavior across both web (Next.js) and mobile (React Native) platforms.

## 8.4.0.0 Integration Points

- Frontend Product Registration form.
- Backend Product Service (for the new lookup API).
- PostgreSQL Database (Master Product Model table).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify warranty auto-populates for a known model.
- Verify warranty field remains editable for an unknown model.
- Verify warranty field state correctly resets when brand/model selections are changed.
- Verify graceful failure (field remains editable) if the lookup API fails.
- Verify screen reader correctly announces the read-only state and tooltip information.

## 9.3.0.0 Test Data Needs

- Product models with a defined warranty duration.
- Product models with a null/zero warranty duration.
- Brands with no pre-configured models.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for frontend and backend logic, with >80% coverage
- Integration testing for the API endpoint completed successfully
- E2E tests for all specified scenarios are passing in the CI pipeline
- User interface reviewed and approved for both web and mobile
- Performance of the lookup API is verified to be under the 200ms P95 threshold
- Accessibility requirements (WCAG 2.1 AA) validated
- API documentation (Swagger/OpenAPI) is updated for the new endpoint
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-012 and cannot be started until it is complete.
- Requires both frontend and backend development effort, which should be coordinated within the same sprint.

## 11.4.0.0 Release Impact

This is a significant user experience improvement for the core product registration feature. It should be included in the next available release after completion.

