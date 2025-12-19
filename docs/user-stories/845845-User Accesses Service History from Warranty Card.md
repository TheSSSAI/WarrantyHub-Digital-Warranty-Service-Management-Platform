# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-036 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Accesses Service History from Warranty Card |
| As A User Story | As a product owner (User), I want to access a comp... |
| User Persona | End-User/Consumer who has registered one or more p... |
| Business Value | Increases user trust and platform utility by provi... |
| Functional Area | User Product Management |
| Story Theme | Digital Warranty Card & Service Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Presence of Service History Link on Warranty Card

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged in and is viewing the digital warranty card for one of their registered products

### 3.1.5 When

the user examines the contents of the digital warranty card UI

### 3.1.6 Then

a clearly labeled and tappable element (e.g., button or link) titled 'View Service History' is visible.

### 3.1.7 Validation Notes

Verify on both mobile (React Native) and web (Next.js) interfaces. The element should be easily discoverable.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Navigation to Service History Screen

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the user is viewing a product's digital warranty card

### 3.2.5 When

the user taps on the 'View Service History' element

### 3.2.6 Then

the application navigates to a new screen titled 'Service History for [Product Name]' and a loading indicator is briefly displayed.

### 3.2.7 Validation Notes

The navigation should be smooth and the screen title must dynamically include the name of the specific product.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Displaying a List of Service Requests

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the user has navigated to the Service History screen for a product with one or more past service requests

### 3.3.5 When

the data successfully loads from the backend

### 3.3.6 Then

a list of all associated service requests is displayed in reverse chronological order (most recent first).

### 3.3.7 Validation Notes

Verify the sorting order is correct based on the creation date of the service requests.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Content of Each Service History Item

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the user is viewing the list of service requests

### 3.4.5 When

the user inspects an individual item in the list

### 3.4.6 Then

the item must display at a minimum: Service Request ID, Date Raised, Type of Issue, and the final Status (e.g., 'Resolved', 'Cancelled').

### 3.4.7 Validation Notes

Check that the data displayed matches the records in the database for that service request. The status should be visually distinct.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Handling Products with No Service History

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

the user navigates to the Service History screen for a product that has never had a service request

### 3.5.5 When

the screen finishes loading

### 3.5.6 Then

a user-friendly message is displayed, such as 'No service requests have been raised for this product yet.', instead of an empty list.

### 3.5.7 Validation Notes

The screen should not appear broken or empty. It should clearly communicate the state to the user.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

API Failure When Fetching History

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

the user taps the 'View Service History' link

### 3.6.5 When

the mobile or web client fails to fetch the data from the API due to a network or server error

### 3.6.6 Then

an informative error message is displayed to the user (e.g., 'Could not load service history. Please check your connection and try again.') and a retry mechanism is provided.

### 3.6.7 Validation Notes

Simulate API failure (e.g., 500 error, network timeout) to test the client's error handling and retry logic.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Navigating to Service Request Details

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

the user is viewing the list of service requests on the Service History screen

### 3.7.5 When

the user taps on any individual service request item in the list

### 3.7.6 Then

the application navigates to the detailed view for that specific service request.

### 3.7.7 Validation Notes

This confirms the link between the summary list and the detailed view (implemented in US-040/US-043) is functional.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'View Service History' button/link on the Digital Warranty Card component.
- A new 'Service History' screen/page.
- A list view to display service request summary cards/rows.
- A message container for 'no history' and 'error' states.
- Loading indicator/spinner.

## 4.2.0 User Interactions

- User taps the link to navigate.
- User scrolls through the list of service history items.
- User taps a list item to navigate to its details.
- User taps a 'Retry' button in case of an error.

## 4.3.0 Display Requirements

- The service history list must be sorted with the most recent request at the top.
- Each list item must show the Request ID, Date, Issue Type, and Status.
- The status of each request (e.g., Resolved, In Progress, Cancelled) should be visually distinct using color-coded badges or icons.

## 4.4.0 Accessibility Needs

- The 'View Service History' link must have a proper ARIA label.
- The list must be navigable via keyboard and screen readers.
- All text and UI elements must meet WCAG 2.1 Level AA contrast ratio requirements.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A user can only view the service history for products they currently own.', 'enforcement_point': 'API Gateway and Backend Service (Data Access Layer).', 'violation_handling': 'The API will return a 403 Forbidden or 404 Not Found error if a user attempts to access the service history of a product not associated with their account.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-032

#### 6.1.1.2 Dependency Reason

The Digital Warranty Card UI must exist to add the 'View Service History' link to it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-037

#### 6.1.2.2 Dependency Reason

The system must allow users to create service requests in order for any history to exist.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-040

#### 6.1.3.2 Dependency Reason

The detailed service request tracking screen must exist as a navigation target when a user taps on a history item.

## 6.2.0.0 Technical Dependencies

- A backend service (e.g., Service Request Microservice) must expose a secure REST API endpoint to fetch service history for a given product ID.
- The primary database (Azure PostgreSQL) must have an index on the `productId` column in the `ServiceRequests` table for efficient querying.

## 6.3.0.0 Data Dependencies

- Requires access to the service request records associated with a product.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for fetching service history must respond within 250ms (P95).
- The Service History screen on the client should render the list within 2 seconds on a standard 4G connection.
- The API should implement pagination to handle products with a very large number of service requests efficiently.

## 7.2.0.0 Security

- The API endpoint (`/api/v1/products/{productId}/service-history`) must be protected and require a valid JWT from an authenticated user.
- The backend logic must validate that the requested `productId` belongs to the authenticated user to prevent data leakage.

## 7.3.0.0 Usability

- The 'View Service History' link should be intuitively placed and easy to find.
- The information presented in the history list should be concise and easy to scan.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported mobile OS versions (iOS 14+, Android 8.0+) and modern web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires a new, straightforward API endpoint.
- Requires a standard list-view screen on the frontend.
- No complex business logic is involved; it is primarily a data retrieval and display feature.

## 8.3.0.0 Technical Risks

- Potential for slow query performance if the database is not properly indexed and a product has an exceptionally long service history. This is mitigated by pagination.

## 8.4.0.0 Integration Points

- Frontend (Mobile/Web) client calling the Backend Service Request API.
- Backend Service Request API querying the PostgreSQL database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance

## 9.2.0.0 Test Scenarios

- Verify history for a product with zero requests.
- Verify history for a product with one request.
- Verify history for a product with multiple requests (enough to require scrolling).
- Test the API failure and retry mechanism.
- Test navigation to and from the service history screen.
- Test tapping a history item navigates to the correct detail screen.

## 9.3.0.0 Test Data Needs

- A test user account.
- A registered product with no service history.
- A registered product with a single service request in a 'Resolved' state.
- A registered product with multiple service requests in various states ('Resolved', 'In Progress', 'Cancelled').

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- Cypress for E2E tests.
- Postman or similar for API endpoint testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both mobile and web platforms.
- Code reviewed and approved by at least one other developer.
- Unit test coverage for new backend and frontend code meets the 80% project standard.
- Integration tests for the API endpoint are implemented and passing.
- E2E automated test case for the happy path is created and passing.
- UI/UX has been reviewed and approved by the design team.
- Performance of the API endpoint and screen load time is verified against NFRs.
- All security requirements have been met and validated.
- Relevant documentation (e.g., API specification) has been updated.
- The story has been deployed and verified in the staging environment without regressions.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story provides significant value to the user by completing the product management loop. It should be prioritized soon after the core features of product registration and service request creation are stable.
- Ensure that the prerequisite stories, especially the destination screen for service details (US-040), are planned in the same or a preceding sprint.

## 11.4.0.0 Release Impact

This is a core feature for user engagement and should be included in any major release that focuses on post-registration user experience.

