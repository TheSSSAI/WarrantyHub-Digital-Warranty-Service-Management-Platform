# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-014 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Super Admin Views the System Audit Log |
| As A User Story | As a Super Admin, I want to view a searchable and ... |
| User Persona | Super Admin: The highest-level platform administra... |
| Business Value | Enhances platform security, accountability, and co... |
| Functional Area | System Administration & Security |
| Story Theme | Platform Governance and Auditing |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful viewing of the audit log

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in Super Admin

### 3.1.5 When

I navigate to the 'System Audit Log' section of the Super Admin portal

### 3.1.6 Then

I should see a table displaying audit log entries in reverse chronological order (newest first).

### 3.1.7 Validation Notes

Verify the page loads and displays a list of logs. The default sort order must be by timestamp descending.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Audit log entry content verification

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the System Audit Log

### 3.2.5 When

I inspect any row in the log table

### 3.2.6 Then

The row must contain columns for: Timestamp (in UTC, localized to user's browser), User (email or ID), Action Type (e.g., 'BRAND_APPROVED'), Target Resource (e.g., 'Brand ID: 123'), and Outcome (e.g., 'Success').

### 3.2.7 Validation Notes

Check that all specified data points are present and correctly formatted for each log entry.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Filtering the audit log by a date range

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am viewing the System Audit Log

### 3.3.5 When

I select a start and end date using the date range filter and click 'Apply'

### 3.3.6 Then

The log table should update to show only the events that occurred within that selected date range, inclusive.

### 3.3.7 Validation Notes

Test with a date range that is known to contain log entries and one that is known to be empty.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Filtering the audit log by action type

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am viewing the System Audit Log

### 3.4.5 When

I select a specific action type (e.g., 'USER_LOGIN_SUCCESS') from a dropdown filter and click 'Apply'

### 3.4.6 Then

The log table should update to show only the events of that specific action type.

### 3.4.7 Validation Notes

Verify the filter dropdown is populated with all possible auditable action types.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Searching the audit log by user

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am viewing the System Audit Log

### 3.5.5 When

I enter a specific user's email address into the search bar and click 'Search'

### 3.5.6 Then

The log table should update to show only the events performed by that user.

### 3.5.7 Validation Notes

Test with a user who has performed actions and one who has not.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Handling of no results found

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

I am viewing the System Audit Log

### 3.6.5 When

I apply a filter or search that matches no log entries

### 3.6.6 Then

The log table area should display a clear message, such as 'No audit logs found matching your criteria.'

### 3.6.7 Validation Notes

Ensure the message is user-friendly and pagination controls are hidden or disabled.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Unauthorized access attempt

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I am logged in as a user without Super Admin privileges (e.g., a Brand Admin)

### 3.7.5 When

I attempt to access the System Audit Log page via its direct URL

### 3.7.6 Then

I must be redirected to an 'Access Denied' page or the dashboard, and I must not see the audit log data.

### 3.7.7 Validation Notes

This must be enforced by the backend API (returning a 403 Forbidden status) and handled gracefully by the frontend.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Log immutability verification

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

An audit log entry exists in the database

### 3.8.5 When

A developer or system process attempts to execute an UPDATE or DELETE command on the audit log table

### 3.8.6 Then

The database must reject the operation, and the log entry must remain unchanged.

### 3.8.7 Validation Notes

This is a backend/database level requirement. It can be verified by checking database user permissions or attempting a modification in a test environment.

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

Pagination of audit log results

### 3.9.3 Scenario Type

Happy_Path

### 3.9.4 Given

There are more log entries than the number of items per page (e.g., >25 entries)

### 3.9.5 When

I am viewing the System Audit Log

### 3.9.6 Then

I should see pagination controls (e.g., 'Next', 'Previous', page numbers).

### 3.9.7 Validation Notes

Clicking 'Next' should load the next set of results. The total number of entries should be displayed.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table with sortable columns for Timestamp, User, Action, Target, and Outcome.
- A date range picker component.
- A multi-select or single-select dropdown for 'Action Type'.
- A text input field for 'Search by User/Target'.
- An 'Apply Filters' or 'Search' button.
- Pagination controls at the bottom of the table.

## 4.2.0 User Interactions

- The user can click on column headers to sort the data (initially, only timestamp sorting is required).
- Applying filters should update the table content without a full page reload.
- The state of the filters should be maintained in the URL query parameters to allow for bookmarking and sharing of filtered views.

## 4.3.0 Display Requirements

- Timestamps must be displayed in a human-readable format and should indicate the timezone (e.g., by converting to the user's browser local time).
- A loading indicator should be displayed while the log data is being fetched or filtered.

## 4.4.0 Accessibility Needs

- The data table must be accessible, with proper `<th>` and `scope` attributes.
- All filter controls must have associated labels.
- The interface must be navigable using a keyboard.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Only users with the 'Super Admin' role can access the audit log view and its corresponding API endpoint.

### 5.1.3 Enforcement Point

API Gateway and Backend Microservice (redundant check).

### 5.1.4 Violation Handling

The API returns a 403 Forbidden HTTP status code. The frontend redirects the user to an access denied page.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Audit log entries are immutable. They cannot be altered or deleted after being created.

### 5.2.3 Enforcement Point

Database permissions and application logic (absence of update/delete functions).

### 5.2.4 Violation Handling

Database throws a permission error; application logs the failed attempt.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Audit logs must be retained for a minimum of 1 year, as per SRS 5.7.3.

### 5.3.3 Enforcement Point

Data retention policy script or database configuration.

### 5.3.4 Violation Handling

N/A - This is a system policy. A monitoring alert should be triggered if data is at risk of being purged prematurely.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-095

#### 6.1.1.2 Dependency Reason

A user registration and authentication system must exist to define and log in a Super Admin.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-112

#### 6.1.2.2 Dependency Reason

The system for assigning roles to platform admins must be in place to create a Super Admin user.

## 6.2.0.0 Technical Dependencies

- A centralized logging mechanism capable of capturing events from multiple microservices.
- The Role-Based Access Control (RBAC) framework must be implemented to protect the API endpoint.
- A frontend component library for building the data table and filter controls.

## 6.3.0.0 Data Dependencies

- This story requires other features to be implemented first to generate the log data that will be displayed (e.g., US-002: Brand Approval, US-059: Claim Approval).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for fetching the first page of logs must be under 1 second.
- API response time for filtered or searched queries must be under 2 seconds, assuming a database with up to 10 million log entries.
- The UI must remain responsive while data is being fetched.

## 7.2.0.0 Security

- Access to the audit log API must be strictly limited to authenticated Super Admins.
- The system must prevent modification or deletion of log entries (immutability).
- All data transmitted between the client and server must be encrypted via HTTPS/TLS 1.2+.

## 7.3.0.0 Usability

- Filters should be intuitive and easy to use.
- The log data must be presented in a clear and understandable format.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The web portal must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Designing a scalable database schema and indexing strategy for the audit log table to ensure query performance as data volume grows.
- Ensuring the event-capturing mechanism is robust and consistently implemented across all relevant microservices.
- Implementing the combined filter and search logic on the backend can be complex.

## 8.3.0.0 Technical Risks

- Poor query performance as the audit log table grows. Mitigation: Implement database table partitioning by date and ensure composite indexes are used effectively.
- Inconsistent or missing log entries if the logging aspect is forgotten in other feature stories. Mitigation: Create a 'Definition of Done' checklist item for all relevant stories to include audit logging.

## 8.4.0.0 Integration Points

- This feature integrates with the authentication service (Azure AD B2C) to identify the user.
- It requires a logging aspect/middleware to be integrated into the business logic of other microservices (e.g., Brand Management, Service Request Management).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Verify a Super Admin can view and filter logs.
- Verify a non-Super Admin cannot access the log page or API.
- Verify that critical actions (e.g., approving a brand) correctly generate a new log entry.
- Test query performance with a large, seeded dataset in the audit log table.
- Attempt to modify a log entry via API or other means to confirm immutability.

## 9.3.0.0 Test Data Needs

- A test database seeded with a large volume of audit log entries (e.g., 100,000+) across multiple users and action types.
- User accounts with 'Super Admin' and other roles (e.g., 'Brand Admin') for testing access control.

## 9.4.0.0 Testing Tools

- Jest for backend/frontend unit tests.
- Cypress for E2E testing.
- A load testing tool like k6 or JMeter for performance testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least two peers
- Unit and integration tests implemented with >80% code coverage for new logic
- E2E tests for the happy path and key error conditions are passing
- UI/UX has been reviewed and approved by the Product Owner
- Performance testing confirms API response times are within NFR limits
- Security review confirms access controls and immutability are correctly implemented
- API documentation (Swagger/OpenAPI) is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational security feature. While the UI can be built anytime, the underlying logging mechanism should be considered early in the project.
- Coordination is needed with teams working on other features to ensure they integrate the audit logging calls.

## 11.4.0.0 Release Impact

Essential for the initial launch to ensure platform security and administrative oversight from day one.

