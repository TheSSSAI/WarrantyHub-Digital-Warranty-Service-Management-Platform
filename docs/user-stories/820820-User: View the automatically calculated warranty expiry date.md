# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-023 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: View the automatically calculated warranty e... |
| As A User Story | As a consumer managing my products, I want the sys... |
| User Persona | End-user (Consumer) of the web and mobile applicat... |
| Business Value | Provides critical, at-a-glance information to the ... |
| Functional Area | Product Management |
| Story Theme | Digital Warranty Card Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Calculate expiry date for a warranty specified in years

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is registering a product and has entered a Purchase Date of '2024-05-20'

### 3.1.5 When

The user provides a Warranty Duration of '2 years'

### 3.1.6 Then

The system must calculate the expiry date as '2026-05-19' and store it in the database.

### 3.1.7 Validation Notes

Verify the calculated date in the API response and the database. The calculation logic is (Purchase Date + Duration) - 1 day.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: Calculate expiry date for a warranty specified in months

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A user is registering a product and has entered a Purchase Date of '2024-08-10'

### 3.2.5 When

The user provides a Warranty Duration of '18 months'

### 3.2.6 Then

The system must calculate the expiry date as '2026-02-09' and store it.

### 3.2.7 Validation Notes

Verify the date calculation logic correctly handles adding months.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Happy Path: Display the calculated expiry date on the warranty card

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A user has successfully registered a product with a calculated warranty expiry date

### 3.3.5 When

The user navigates to and views the Digital Warranty Card for that product

### 3.3.6 Then

The calculated expiry date is clearly displayed with a label such as 'Expires On' or 'Valid Until'.

### 3.3.7 Validation Notes

Check both mobile and web UIs to confirm the date is present and correctly formatted.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: Calculation correctly handles leap years

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A user is registering a product and has entered a Purchase Date of '2024-02-29'

### 3.4.5 When

The user provides a Warranty Duration of '1 year'

### 3.4.6 Then

The system must calculate the expiry date as '2025-02-28'.

### 3.4.7 Validation Notes

This confirms the date math library correctly handles non-existent dates in subsequent years.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: Calculation correctly handles end-of-month dates

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A user is registering a product and has entered a Purchase Date of '2025-01-31'

### 3.5.5 When

The user provides a Warranty Duration of '1 month'

### 3.5.6 Then

The system must calculate the expiry date as '2025-02-28'.

### 3.5.7 Validation Notes

This confirms the logic correctly adjusts for shorter months.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Alternative Flow: Calculation for an extended warranty

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

A user is adding an extended warranty to an existing product

### 3.6.5 When

The user provides the start date and duration for the new warranty

### 3.6.6 Then

The system must calculate and store a separate expiry date for the extended warranty.

### 3.6.7 Validation Notes

The system must support multiple warranty records, each with its own expiry date, for a single product.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A text label and value on the Digital Warranty Card component.

## 4.2.0 User Interactions

- This is a display-only feature. The user views the date but does not interact with it directly on the warranty card.

## 4.3.0 Display Requirements

- The expiry date must be displayed in a human-readable, localized format (e.g., 'Month Day, Year' for en-US).
- The label must be unambiguous, e.g., 'Expires On:'.

## 4.4.0 Accessibility Needs

- The displayed date must be readable by screen readers.
- The text must meet WCAG 2.1 AA contrast ratio requirements.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The warranty expiry date is calculated as (Purchase Date + Warranty Duration) - 1 day. This ensures a one-year warranty covers a full 365/366 days.

### 5.1.3 Enforcement Point

Backend service during the creation or update of a product warranty record.

### 5.1.4 Violation Handling

N/A. This is a calculation rule, not a validation rule.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The expiry date calculation must be performed exclusively on the backend to serve as the single source of truth.

### 5.2.3 Enforcement Point

System architecture design.

### 5.2.4 Violation Handling

N/A. Architectural constraint.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

Requires the ability to input Purchase Date and Warranty Duration during product registration.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-025

#### 6.1.2.2 Dependency Reason

Requires the Digital Warranty Card UI component to exist in order to display the calculated date.

## 6.2.0.0 Technical Dependencies

- Backend (NestJS) service for product management.
- PostgreSQL database with a schema to store the calculated `expiry_date`.
- A robust server-side date manipulation library (e.g., date-fns, Luxon).

## 6.3.0.0 Data Dependencies

- Requires `purchase_date` and `warranty_duration` as inputs.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The backend calculation must be completed as part of the product registration API call, adding negligible overhead to the overall response time.

## 7.2.0.0 Security

- The expiry date, as part of user data, must be protected by the system's Role-Based Access Control (RBAC). A user must only be able to view expiry dates for their own products.

## 7.3.0.0 Usability

- The date must be presented clearly and unambiguously to avoid user confusion.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards for readability and screen reader compatibility.

## 7.5.0.0 Compatibility

- The displayed date format should be handled by the client (Web/Mobile) to respect the user's locale settings.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Date and time calculations can have subtle edge cases (leap years, time zones, different month lengths).
- Requires coordination between backend (calculation and storage) and frontend (display).

## 8.3.0.0 Technical Risks

- Risk of incorrect calculations if a non-robust date library is used or if edge cases are not properly tested.
- Potential for confusion if timezone handling is not standardized. Recommendation is to store and calculate using date-only values (e.g., PostgreSQL `DATE` type) to avoid timezone issues.

## 8.4.0.0 Integration Points

- Product Management Service (Backend): Performs the calculation.
- Database (PostgreSQL): Stores the `expiry_date`.
- API Gateway (Azure API Management): Exposes the product data, including the expiry date.
- Frontend Applications (React Native, Next.js): Fetch and display the data.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify calculation for durations in months and years.
- Verify calculation for dates on Feb 29.
- Verify calculation for dates on the 31st of a month, followed by a shorter month.
- Verify the date is correctly displayed on both mobile and web UIs after product registration.
- Verify the date is correctly recalculated if the purchase date or duration is edited (before locking, per US-030).

## 9.3.0.0 Test Data Needs

- A set of purchase dates and durations that cover all identified happy paths and edge cases.

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- Supertest for backend integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Backend calculation logic is implemented and covered by unit tests for all edge cases.
- The `expiry_date` is added to the database schema via a pg-migrate script.
- The product API endpoints are updated to include the `expiry_date`.
- Frontend mobile and web components correctly display the `expiry_date` on the warranty card.
- E2E tests confirm the flow from registration to viewing the date.
- Code reviewed and approved by team
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is foundational and should be prioritized early in the development cycle, immediately following the core product registration story (US-019).

## 11.4.0.0 Release Impact

This is a core feature for the Minimum Viable Product (MVP). The platform cannot provide its primary value without this functionality.

