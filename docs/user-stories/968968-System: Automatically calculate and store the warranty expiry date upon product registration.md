# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-097 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Automatically calculate and store the warr... |
| As A User Story | As a User, when I register a product by providing ... |
| User Persona | User (Consumer), System (Actor) |
| Business Value | Ensures data integrity for all warranty-related fu... |
| Functional Area | Product Management |
| Story Theme | Product Registration & Warranty Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Calculation for warranty duration in years

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is registering a product and provides a Purchase Date of '2024-05-20'

### 3.1.5 When

The user enters a Warranty Duration of '2 years'

### 3.1.6 Then

The system must calculate the Warranty Expiry Date as '2026-05-19' and store it.

### 3.1.7 Validation Notes

Verify the date stored in the 'warranties' table for the new record is correct. The formula is (Purchase Date + Duration) - 1 day. All date calculations must be performed in UTC.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Calculation for warranty duration in months

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A user is registering a product and provides a Purchase Date of '2024-01-10'

### 3.2.5 When

The user enters a Warranty Duration of '18 months'

### 3.2.6 Then

The system must calculate the Warranty Expiry Date as '2025-07-09' and store it.

### 3.2.7 Validation Notes

Verify the date stored in the database is correct.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Calculation correctly handles leap years

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

A user is registering a product and provides a Purchase Date of '2024-03-15'

### 3.3.5 When

The user enters a Warranty Duration of '1 year'

### 3.3.6 Then

The system must calculate the Warranty Expiry Date as '2025-03-14', correctly accounting for the 366 days in 2024.

### 3.3.7 Validation Notes

Test with start dates both before and after February 29th in a leap year.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Calculation correctly handles end-of-month dates

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A user is registering a product and provides a Purchase Date of '2024-01-31'

### 3.4.5 When

The user enters a Warranty Duration of '1 month'

### 3.4.6 Then

The system must calculate the Warranty Expiry Date as '2024-02-29' (the last day of the following month).

### 3.4.7 Validation Notes

Test with various month lengths, e.g., 31st Jan -> 29th Feb (leap), 31st Mar -> 30th Apr.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Calculation uses auto-populated warranty duration

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

A user selects a Brand/Model combination for which a default warranty of '3 years' is configured in the system

### 3.5.5 When

The user enters a Purchase Date of '2023-11-01'

### 3.5.6 Then

The system must use the default duration to calculate the Warranty Expiry Date as '2026-10-31'.

### 3.5.7 Validation Notes

This depends on the data from US-104. The calculation logic should be the same, just with a system-provided duration.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Calculation is triggered when adding an extended warranty

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

A user is adding an extended warranty to an existing product with a Purchase Date of '2022-06-01'

### 3.6.5 When

The user enters a duration of '3 years' for the new extended warranty

### 3.6.6 Then

The system must calculate and store a new, separate expiry date of '2025-05-31' for that specific extended warranty record.

### 3.6.7 Validation Notes

Ensure the calculation does not affect the primary warranty's expiry date.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Real-time display of calculated expiry date on the UI

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A user is on the product registration form

### 3.7.5 When

The user provides a valid Purchase Date and Warranty Duration

### 3.7.6 Then

The UI must immediately display the calculated Warranty Expiry Date in a read-only field.

### 3.7.7 Validation Notes

This provides instant feedback to the user before they submit the form.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A read-only text field or display area for the 'Warranty Expiry Date' on the product registration form.

## 4.2.0 User Interactions

- The expiry date field should update automatically and instantly whenever the 'Purchase Date' or 'Warranty Duration' fields are changed.

## 4.3.0 Display Requirements

- The calculated date must be displayed in a user-friendly, localized format (e.g., 'May 19, 2026').
- The stored date in the database must be in a standard format (e.g., ISO 8601) in UTC.

## 4.4.0 Accessibility Needs

- The read-only expiry date field must be clearly labeled and accessible to screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The warranty period is inclusive of the purchase date. The expiry date is calculated as (Purchase Date + Duration) - 1 day.

### 5.1.3 Enforcement Point

Backend service during product or warranty registration.

### 5.1.4 Violation Handling

N/A - This is a calculation rule, not a validation rule.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

All date and time calculations must be performed in UTC to ensure consistency across all users and timezones.

### 5.2.3 Enforcement Point

Backend date/time calculation logic.

### 5.2.4 Violation Handling

N/A - This is an implementation constraint.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

Provides the UI form and API endpoint for product registration where this calculation is triggered.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-028

#### 6.1.2.2 Dependency Reason

Provides the workflow for adding an extended warranty, which also requires this calculation logic.

## 6.2.0.0 Technical Dependencies

- A robust, well-tested server-side date/time library (e.g., date-fns, Luxon) to handle date arithmetic accurately.
- Database schema for the 'warranties' table must include columns for `purchase_date`, `duration_value`, `duration_unit`, and `expiry_date`.

## 6.3.0.0 Data Dependencies

- For auto-population scenarios, this story depends on the default warranty data being available, which is created in US-104.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The expiry date calculation must be completed in under 50ms as it is part of a real-time user interaction.

## 7.2.0.0 Security

- Inputs for date and duration must be properly sanitized and validated by the API endpoint to prevent any injection or data corruption vulnerabilities.

## 7.3.0.0 Usability

- The automatic calculation and real-time display of the expiry date significantly improves usability by reducing user effort and preventing errors.

## 7.4.0.0 Accessibility

- WCAG 2.1 Level AA compliance for the UI elements.

## 7.5.0.0 Compatibility

- The calculation logic is backend-only and must be platform-agnostic.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- The core logic is simple date addition.
- Complexity is managed by using a standard library to handle edge cases like leap years and month-end calculations.

## 8.3.0.0 Technical Risks

- Potential for off-by-one errors if timezone handling is not consistently implemented as UTC across the entire stack (database, backend, frontend).

## 8.4.0.0 Integration Points

- The calculation logic will be integrated into the Product Registration service.
- The product registration API (`POST /api/v1/products`) will call this logic before saving the new product record.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- A comprehensive unit test suite for the calculation function, covering all scenarios in the acceptance criteria, especially leap years and month-end logic.
- Integration test for the product registration API to verify that a request with purchase date and duration results in a database record with the correct expiry date.
- E2E test using Playwright to simulate a user filling out the registration form and verifying the calculated date appears correctly on the UI.

## 9.3.0.0 Test Data Needs

- A set of date/duration pairs that cover normal cases, leap years, and various month lengths.

## 9.4.0.0 Testing Tools

- Jest for unit and integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests for the calculation logic implemented with >95% coverage and passing
- Integration testing for the API endpoint completed successfully
- E2E test script for the UI interaction is created and passes
- Performance of the calculation is verified to be under 50ms
- Documentation for the date calculation logic and its UTC handling is updated in the technical docs
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the warranty management system. It should be prioritized early as many other features (claim verification, reminders) depend on this data point.

## 11.4.0.0 Release Impact

This is a core feature required for the initial MVP launch.

