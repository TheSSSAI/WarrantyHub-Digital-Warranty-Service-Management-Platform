# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-117 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System Enforces Data Integrity with Database Const... |
| As A User Story | As a Platform Architect, I want the database schem... |
| User Persona | Platform Architect / Backend Developer |
| Business Value | Ensures the fundamental reliability and quality of... |
| Functional Area | System Architecture & Data Layer |
| Story Theme | Platform Foundation & Reliability |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Foreign Key Constraint prevents orphaned records

### 3.1.3 Scenario Type

Error_Condition

### 3.1.4 Given

The `products` table and `service_requests` table exist, with a FOREIGN KEY constraint on `service_requests.product_id` referencing `products.id`.

### 3.1.5 When

An attempt is made to insert a new service request with a `product_id` that does not exist in the `products` table.

### 3.1.6 Then

The database transaction MUST fail and return a foreign key violation error.

### 3.1.7 Validation Notes

Test via an integration test that attempts to create a ServiceRequest entity with a non-existent Product entity. The test should assert that a TypeORM `QueryFailedError` with a specific database error code for foreign key violation is thrown.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Foreign Key Constraint prevents deletion of referenced parent records

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A product with `id=123` exists in the `products` table, and at least one record in the `service_requests` table references it via `product_id=123`.

### 3.2.5 When

An attempt is made to delete the product with `id=123`.

### 3.2.6 Then

The database transaction MUST fail and return a foreign key violation error, because the `ON DELETE` behavior is set to `RESTRICT` or `NO ACTION`.

### 3.2.7 Validation Notes

Integration test: Create a product, create a service request linked to it, then attempt to delete the product. Assert that the operation fails with the expected database error.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

NOT NULL constraint prevents missing mandatory data

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The `users` table schema defines the `email` column with a `NOT NULL` constraint.

### 3.3.5 When

An attempt is made to insert a new user record where the `email` value is NULL.

### 3.3.6 Then

The database transaction MUST fail and return a not-null constraint violation error.

### 3.3.7 Validation Notes

Test via an integration test that attempts to save a User entity with its email property set to null. The test should assert that a `QueryFailedError` with a not-null violation code is thrown.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

UNIQUE constraint prevents duplicate business keys

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The `users` table schema defines a `UNIQUE` constraint on the `email` column, and a user with `email = 'duplicate@test.com'` already exists.

### 3.4.5 When

An attempt is made to insert a new user record with the same email `duplicate@test.com`.

### 3.4.6 Then

The database transaction MUST fail and return a unique constraint violation error.

### 3.4.7 Validation Notes

Integration test: Create a user with a specific email. Then, attempt to create a second user with the same email. Assert that the second operation fails with a unique violation error.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

CHECK constraint enforces a valid value range

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The `service_feedback` table schema defines a `CHECK` constraint on the `rating` column, restricting values to be between 1 and 5 (inclusive).

### 3.5.5 When

An attempt is made to insert a new feedback record with `rating = 0` or `rating = 6`.

### 3.5.6 Then

The database transaction MUST fail and return a check constraint violation error.

### 3.5.7 Validation Notes

Integration test: Attempt to save a feedback entity with an out-of-range rating. Assert that the operation fails with a check constraint violation error. Also test that a valid rating (e.g., 4) succeeds.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Schema review confirms comprehensive constraint coverage

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

The database migration scripts for the initial schema are complete.

### 3.6.5 When

A developer or DBA performs a code review of the TypeORM entity definitions and migration files.

### 3.6.6 Then

All key relationships (User-Product, Product-Warranty, Product-ServiceRequest, Brand-Product, ServiceCenter-Technician, etc.) MUST be enforced by foreign keys. All mandatory fields (e.g., user email, product serial number, request creation date) MUST have NOT NULL constraints. All business keys (e.g., user email) MUST have UNIQUE constraints.

### 3.6.7 Validation Notes

This is verified through a manual peer review process of the migration scripts and entity definitions before merging the code.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- N/A

## 4.2.0 User Interactions

- N/A

## 4.3.0 Display Requirements

- While there is no direct UI, the backend application MUST catch database constraint violation errors and translate them into user-friendly error messages for the frontend (e.g., 'This email address is already in use.').

## 4.4.0 Accessibility Needs

- N/A

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-117-01

### 5.1.2 Rule Description

A record in a child table must always point to a valid, existing record in the parent table.

### 5.1.3 Enforcement Point

Database (via FOREIGN KEY constraint)

### 5.1.4 Violation Handling

The data modification (INSERT, UPDATE, DELETE) operation is rejected by the database.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-117-02

### 5.2.2 Rule Description

A field designated as mandatory for business operations must never be empty or null.

### 5.2.3 Enforcement Point

Database (via NOT NULL constraint)

### 5.2.4 Violation Handling

The data modification (INSERT, UPDATE) operation is rejected by the database.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

The `users` table schema must be defined before constraints can be applied to it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-015

#### 6.1.2.2 Dependency Reason

The `products` and `warranties` table schemas must be defined before constraints can be applied.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-037

#### 6.1.3.2 Dependency Reason

The `service_requests` table schema must be defined to apply foreign key constraints linking it to products and users.

## 6.2.0.0 Technical Dependencies

- Azure Database for PostgreSQL 16 must be provisioned.
- TypeORM framework must be set up for data access and migrations.

## 6.3.0.0 Data Dependencies

- A finalized data model (Entity-Relationship Diagram) is required to correctly identify all relationships and constraints.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- All foreign key columns must be indexed to prevent performance degradation on JOIN and WHERE clauses.
- The performance overhead of constraints must be negligible for standard transactional operations.

## 7.2.0.0 Security

- Enforcing data integrity at the database level acts as a critical defense-in-depth measure, protecting against data corruption if application-level validation is bypassed.

## 7.3.0.0 Usability

- N/A

## 7.4.0.0 Accessibility

- N/A

## 7.5.0.0 Compatibility

- All constraints must be defined using standard SQL syntax compatible with PostgreSQL 16.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- This story touches nearly every data entity in the system, requiring a holistic understanding of the data model.
- Writing correct and reversible TypeORM migration scripts is critical.
- Requires implementing a global exception filter in NestJS to catch `QueryFailedError` and map specific database error codes to standardized HTTP responses (e.g., 409 Conflict for unique violations, 400 Bad Request for others).

## 8.3.0.0 Technical Risks

- Incorrectly defined constraints or migration scripts could lead to data loss or prevent valid operations.
- Forgetting to index foreign keys could lead to significant performance issues as the database grows.

## 8.4.0.0 Integration Points

- This story integrates with the data persistence layer (TypeORM) and the application's global error handling mechanism (NestJS Exception Filters).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Integration

## 9.2.0.0 Test Scenarios

- Attempting to create a child record with a non-existent parent ID.
- Attempting to create a record with a NULL value in a NOT NULL column.
- Attempting to create a record with a duplicate value in a UNIQUE column.
- Attempting to create a record with an out-of-range value in a column with a CHECK constraint.
- Attempting to delete a parent record that is still referenced by child records.

## 9.3.0.0 Test Data Needs

- Test data that both conforms to and violates the defined constraints.

## 9.4.0.0 Testing Tools

- Jest (for running tests)
- A test database instance (e.g., in a Docker container) that can be reset between test runs.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code (TypeORM entities and migrations) reviewed and approved by the team
- Comprehensive integration tests implemented for all key constraints, verifying both success and failure cases
- A global exception filter is implemented in the NestJS backend to handle database constraint violations gracefully
- All foreign keys are confirmed to have corresponding indexes
- The migration scripts have been successfully applied and verified in the 'Development' and 'Staging' environments

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story that should be completed in one of the earliest sprints. It is a blocker for most feature development involving data persistence.
- The scope covers all initial core entities (users, products, brands, etc.). Future stories adding new entities will need to include their own constraints.

## 11.4.0.0 Release Impact

- Critical for the stability and reliability of the initial platform release. Without this, the platform is at high risk of data corruption.

