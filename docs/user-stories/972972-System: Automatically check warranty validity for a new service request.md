# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-099 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Automatically check warranty validity for ... |
| As A User Story | As the system, I want to automatically check all a... |
| User Persona | System (acting on behalf of Consumer, Service Cent... |
| Business Value | Automates a critical business rule to ensure servi... |
| Functional Area | Service Request Module |
| Story Theme | Warranty & Service Management Automation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Product has a single, valid warranty

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A product is registered with a single warranty that has not yet expired

### 3.1.5 When

A user creates a new service request for that product

### 3.1.6 Then

The system must flag the newly created service request record with the status 'In Warranty'.

### 3.1.7 Validation Notes

Verify the 'warranty_status' field in the 'service_requests' table is set to 'IN_WARRANTY' for the new record.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Product has an expired primary warranty but a valid extended warranty

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A product is registered with two warranties: a primary warranty that is expired and an extended warranty that is still valid

### 3.2.5 When

A user creates a new service request for that product

### 3.2.6 Then

The system must check all associated warranties and flag the service request as 'In Warranty'.

### 3.2.7 Validation Notes

The logic must iterate through all warranties and find at least one valid one. Verify the 'warranty_status' is 'IN_WARRANTY'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Product's only warranty has expired

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A product is registered with one or more warranties, and all of them have expired

### 3.3.5 When

A user creates a new service request for that product

### 3.3.6 Then

The system must flag the newly created service request as 'Out of Warranty'.

### 3.3.7 Validation Notes

Verify the 'warranty_status' field in the 'service_requests' table is set to 'OUT_OF_WARRANTY'.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Service request is raised on the last day of warranty coverage

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A product's warranty expiry date is today

### 3.4.5 When

A user creates a new service request for that product

### 3.4.6 Then

The system must flag the service request as 'In Warranty'.

### 3.4.7 Validation Notes

The date comparison must be inclusive of the expiry date (<= expiry_date). Test by setting the expiry date to the current date of the test execution.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Service request is raised on the day after warranty expiration

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A product's warranty expiry date was yesterday

### 3.5.5 When

A user creates a new service request for that product

### 3.5.6 Then

The system must flag the service request as 'Out of Warranty'.

### 3.5.7 Validation Notes

The date comparison must correctly identify that the request date is after the expiry date (> expiry_date). Test by setting the expiry date to the day before the test execution.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Product has no warranties associated with it

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A product exists in the system but has no warranty records linked to it

### 3.6.5 When

A user creates a new service request for that product

### 3.6.6 Then

The system must default the flag to 'Out of Warranty'.

### 3.6.7 Validation Notes

The system should handle an empty set of warranties gracefully and correctly categorize the request.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Transactional integrity of the check and creation process

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A valid service request is being created

### 3.7.5 When

The service request creation API is called

### 3.7.6 Then

The warranty status check and the creation of the service request record must occur within the same database transaction to ensure atomicity.

### 3.7.7 Validation Notes

This is a backend logic check. In testing, simulate a failure during the status update and verify that the service request record is not created (transaction is rolled back).

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- This is a backend process with no direct UI. However, the resulting 'In Warranty' / 'Out of Warranty' status must be displayed as a badge or label in the Service Request details view for Service Center Admins (US-072) and Brand Admins.

## 4.2.0 User Interactions

- No direct user interaction for this story.

## 4.3.0 Display Requirements

- The calculated warranty status must be persisted and made available via the API for frontend clients to display.

## 4.4.0 Accessibility Needs

- Not applicable for this backend story. Accessibility for displaying the result will be covered in the relevant frontend stories.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A product is considered 'In Warranty' if at least one of its associated warranties is active on the date the service request is created.

### 5.1.3 Enforcement Point

During the creation of a new service request.

### 5.1.4 Violation Handling

Not applicable, as this is a system calculation, not a user-violable rule.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The warranty check is based on the date of service request creation, not the date of product purchase or technician visit.

### 5.2.3 Enforcement Point

During the creation of a new service request.

### 5.2.4 Violation Handling

Not applicable.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-019

#### 6.1.1.2 Dependency Reason

Products must be registerable in the system.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-023

#### 6.1.2.2 Dependency Reason

The system must calculate and store warranty expiry dates, which is the primary data point for this check.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-028

#### 6.1.3.2 Dependency Reason

The system must support multiple warranties per product for the check logic to be comprehensive.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-036

#### 6.1.4.2 Dependency Reason

This story's logic is triggered by the creation of a service request.

## 6.2.0.0 Technical Dependencies

- Service Request creation microservice/API endpoint.
- Access to the PostgreSQL database, specifically the 'products' and 'warranties' tables.

## 6.3.0.0 Data Dependencies

- Product records with associated warranty records containing a valid and accurate 'expiry_date'.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The warranty check logic must not add more than 50ms of latency to the 95th percentile response time of the service request creation API.

## 7.2.0.0 Security

- The check must be performed server-side and cannot be influenced by client-side input other than the product ID for which the request is being raised.

## 7.3.0.0 Usability

- Not applicable.

## 7.4.0.0 Accessibility

- Not applicable.

## 7.5.0.0 Compatibility

- Not applicable.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires a simple database query to fetch warranties for a product.
- Date comparison logic needs to be robust and timezone-aware (standardize on UTC).
- Logic must be integrated into the existing service request creation transaction.

## 8.3.0.0 Technical Risks

- Potential for off-by-one errors if date and timezone handling is not implemented carefully.
- Performance could degrade if the 'warranties' table is not properly indexed by 'product_id'.

## 8.4.0.0 Integration Points

- This logic will be integrated directly within the 'Service Request' microservice, specifically in the function/method responsible for creating a new service request.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration

## 9.2.0.0 Test Scenarios

- Verify status for a product with a future expiry date.
- Verify status for a product with a past expiry date.
- Verify status for a product expiring on the current date.
- Verify status for a product with multiple warranties (one active, one expired).
- Verify status for a product with no warranties.
- Verify the entire API transaction rolls back if the warranty check fails unexpectedly.

## 9.3.0.0 Test Data Needs

- Test user accounts.
- Product records with various warranty configurations (active, expired, multiple, none).

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Supertest for integration/API tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for the warranty check logic with >80% coverage and passing
- Integration testing for the service request creation endpoint completed successfully, verifying the flag is set correctly
- Performance impact on the API is measured and within the defined NFR
- Logic is confirmed to be running within a database transaction
- Documentation for the 'warranty_status' field in the service request API response is updated
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the service workflow. It should be completed in the same sprint as or immediately after US-036 (Create Service Request). It is a blocker for any frontend stories that need to display the warranty status, such as US-072.

## 11.4.0.0 Release Impact

- Critical for the initial release of the service request functionality. Without this, service centers cannot operate efficiently.

