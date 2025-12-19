# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-058 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System Automatically Flags Warranty Status on Serv... |
| As A User Story | As a Service Center Admin, I want the system to au... |
| User Persona | Service Center Admin, Brand Admin (Primary Benefic... |
| Business Value | Automates a critical business decision, reducing m... |
| Functional Area | Service Request Module |
| Story Theme | Warranty Claim Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Product is clearly within its single warranty period

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A product was purchased on '2024-01-15' and has a single warranty with a '1 year' duration

### 3.1.5 When

A service request is created for that product on '2024-11-20'

### 3.1.6 Then

The service request ticket is automatically flagged with the status 'In Warranty'.

### 3.1.7 Validation Notes

Verify the 'warranty_status' field in the service_requests database table is set to 'IN_WARRANTY'. The UI should display an 'In Warranty' badge.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Product is clearly outside its single warranty period

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A product was purchased on '2023-01-15' and has a single warranty with a '1 year' duration

### 3.2.5 When

A service request is created for that product on '2024-02-20'

### 3.2.6 Then

The service request ticket is automatically flagged with the status 'Out of Warranty'.

### 3.2.7 Validation Notes

Verify the 'warranty_status' field in the database is set to 'OUT_OF_WARRANTY'. The UI should display an 'Out of Warranty' badge.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Service request is raised on the last day of the warranty period

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

A product was purchased on '2024-01-15' and has a single warranty with a '1 year' duration (expires at end of day 2025-01-14)

### 3.3.5 When

A service request is created for that product on '2025-01-14'

### 3.3.6 Then

The service request ticket is automatically flagged with the status 'In Warranty'.

### 3.3.7 Validation Notes

The check must be inclusive of the expiry date. `request_date <= expiry_date`.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Product's primary warranty is expired but an extended warranty is active

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

A product has a primary warranty that expired on '2024-06-30' and an active extended warranty valid until '2025-06-30'

### 3.4.5 When

A service request is created for that product on '2024-08-10'

### 3.4.6 Then

The service request ticket is automatically flagged with the status 'In Warranty'.

### 3.4.7 Validation Notes

The system must check all warranties associated with the product and flag as 'In Warranty' if at least one is valid.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Product has multiple warranties, all of which are expired

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

A product has a primary warranty that expired on '2023-12-31' and an extended warranty that expired on '2024-12-31'

### 3.5.5 When

A service request is created for that product on '2025-01-05'

### 3.5.6 Then

The service request ticket is automatically flagged with the status 'Out of Warranty'.

### 3.5.7 Validation Notes

Verify that if no active warranties are found, the status defaults to 'Out of Warranty'.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Product record is missing the purchase date required for calculation

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A product record exists but its 'Purchase Date' field is null

### 3.6.5 When

A service request is created for that product

### 3.6.6 Then

The service request ticket is automatically flagged with the status 'Requires Manual Verification'.

### 3.6.7 Validation Notes

Verify the 'warranty_status' field is set to 'MANUAL_VERIFICATION_REQUIRED'. The UI should display this status clearly, possibly with a warning icon.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Warranty status is visible to all relevant roles

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A service request has been created and its warranty status has been determined

### 3.7.5 When

A User, Service Center Admin, or Brand Admin views the details of that service request

### 3.7.6 Then

The warranty status ('In Warranty', 'Out of Warranty', or 'Requires Manual Verification') is clearly displayed.

### 3.7.7 Validation Notes

Check the UI for each user role to confirm the status badge/label is present and correct.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A prominent, color-coded status badge/label on the service request details page.

## 4.2.0 User Interactions

- The warranty status is a system-generated, read-only field for all users except those with claim management permissions (Admins).

## 4.3.0 Display Requirements

- Green badge for 'In Warranty'
- Red badge for 'Out of Warranty'
- Amber/Yellow badge for 'Requires Manual Verification'
- The text must always accompany the color for accessibility.

## 4.4.0 Accessibility Needs

- Must comply with WCAG 2.1 Level AA. Color should not be the only means of conveying information. Text labels are mandatory.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A product is considered 'In Warranty' if the service request creation date is less than or equal to the expiry date of at least one of its associated warranties.

### 5.1.3 Enforcement Point

Backend logic upon creation of a service request.

### 5.1.4 Violation Handling

N/A (System logic)

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

If a product's purchase date is not available, the warranty status cannot be determined automatically and must be flagged for manual review.

### 5.2.3 Enforcement Point

Backend logic upon creation of a service request.

### 5.2.4 Violation Handling

N/A (System logic)

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-015

#### 6.1.1.2 Dependency Reason

Provides the core product entity with purchase date and warranty duration.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-022

#### 6.1.2.2 Dependency Reason

Enables products to have multiple warranties, which this story's logic must handle.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-037

#### 6.1.3.2 Dependency Reason

The creation of a service request is the trigger for this story's functionality.

## 6.2.0.0 Technical Dependencies

- Service Request creation microservice.
- Database schema for Products, Warranties, and Service Requests. The Service Request table requires a new 'warranty_status' column (e.g., ENUM).

## 6.3.0.0 Data Dependencies

- Availability of accurate 'Purchase Date' and 'Warranty Duration' data for registered products.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The warranty check logic must execute in under 50ms and not add any perceptible delay to the service request creation API call, which must adhere to the P95 < 250ms requirement.

## 7.2.0.0 Security

- The warranty status calculation must be performed exclusively on the backend to prevent client-side manipulation.
- The calculated status must be stored securely and should only be modifiable by authorized roles (e.g., Brand Admin during claim override).

## 7.3.0.0 Usability

- The status must be immediately and clearly understandable to a non-technical user.

## 7.4.0.0 Accessibility

- UI representation of the status must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- N/A for this backend-focused story.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Core logic is a straightforward date comparison.
- Requires iterating through a potentially small list of warranties per product.
- Requires adding a new field to the Service Request data model and handling database migration.

## 8.3.0.0 Technical Risks

- Incorrect handling of time zones in date comparisons could lead to off-by-one-day errors. All dates should be stored and compared in UTC.

## 8.4.0.0 Integration Points

- This logic must be integrated as a step within the transaction that creates a new service request record.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Test with products having single vs. multiple warranties.
- Test boundary conditions: request on the first day of warranty, last day of warranty, and day after warranty expires.
- Test with products missing purchase date.
- Test scenarios involving leap years to ensure date calculations are correct.
- Verify UI display for all statuses across all relevant user roles.

## 9.3.0.0 Test Data Needs

- Test user accounts for Consumer, Service Center Admin, and Brand Admin.
- A set of pre-configured products with various warranty start dates, durations, and combinations (single, multiple, expired, active).

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- Cypress for E2E tests verifying the UI display.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests for the warranty calculation logic implemented with >80% coverage, including all edge cases
- Integration testing completed to ensure the logic is triggered correctly on service request creation
- User interface reviewed and approved by UX/Product Owner
- Performance impact on the service request creation API is verified to be negligible
- Security requirements validated
- Database migration script is created and tested
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the entire warranty claim workflow. It is a blocker for claim approval/rejection stories (US-059, US-060).

## 11.4.0.0 Release Impact

- This feature is critical for the MVP of the service management functionality.

