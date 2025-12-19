# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-072 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin: View the warranty status of ... |
| As A User Story | As a Service Center Admin, I want to clearly see a... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Improves operational efficiency by providing criti... |
| Functional Area | Service Center Panel |
| Story Theme | Service Request Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display 'In Warranty' status for a product with an active primary warranty

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A Service Center Admin is logged in and viewing a service request in the web panel

### 3.1.5 When

The associated product's primary warranty is active (expiry date is in the future)

### 3.1.6 Then

The system must display a prominent status indicator with the text 'In Warranty'.

### 3.1.7 Validation Notes

Verify on the service request details page. The indicator should be a visually distinct element, like a green badge.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Display 'Out of Warranty' status for a product with an expired warranty

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A Service Center Admin is logged in and viewing a service request in the web panel

### 3.2.5 When

All of the associated product's warranties (primary and extended) are expired (expiry date is in the past)

### 3.2.6 Then

The system must display a prominent status indicator with the text 'Out of Warranty'.

### 3.2.7 Validation Notes

Verify on the service request details page. The indicator should be a visually distinct element, like a red badge.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Display 'In Warranty' status for a product covered by an active extended warranty

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A Service Center Admin is logged in and viewing a service request in the web panel

### 3.3.5 When

The associated product's primary warranty is expired, but it has an active extended warranty

### 3.3.6 Then

The system must display a prominent status indicator with the text 'In Warranty'.

### 3.3.7 Validation Notes

This confirms the system correctly checks all available warranties for the product.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Warranty status is displayed on the service request details view

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A Service Center Admin navigates from the service request list to a specific ticket's detail view

### 3.4.5 When

The service request details page loads

### 3.4.6 Then

The warranty status indicator must be visible without any additional clicks, positioned near the product information (e.g., Brand, Model, Serial Number).

### 3.4.7 Validation Notes

Check the UI layout for prominence and clarity.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Backend API fails to provide warranty status

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A Service Center Admin is viewing a service request details page

### 3.5.5 When

The backend API call to fetch service request details fails or returns a null value for the warranty status field

### 3.5.6 Then

The UI should display a clear message in place of the status, such as 'Status Unavailable' or show a loading/error state, and not default to a misleading status.

### 3.5.7 Validation Notes

Can be tested by mocking an API failure response.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Warranty status is accessible

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

The warranty status indicator is displayed on the screen

### 3.6.5 When

A user interacts with the page using assistive technology (e.g., a screen reader)

### 3.6.6 Then

The screen reader must announce the full text of the status (e.g., 'Status: In Warranty'), and the color of the indicator must not be the only means of conveying the information.

### 3.6.7 Validation Notes

Verify using accessibility testing tools and manual screen reader testing. Complies with WCAG 2.1 Level AA.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A badge or label component to display the warranty status.

## 4.2.0 User Interactions

- This is a display-only feature. No user interaction with the status indicator itself is required for this story.

## 4.3.0 Display Requirements

- The indicator must clearly display the text 'In Warranty' or 'Out of Warranty'.
- The indicator should use color-coding for quick recognition: Green for 'In Warranty', Red for 'Out of Warranty'.
- The indicator must be prominently placed on the service request details page, near the product details section.

## 4.4.0 Accessibility Needs

- Color must not be the sole method of conveying information. Text labels are mandatory.
- The element must be keyboard-focusable if it ever becomes interactive in the future, and its text content must be accessible to screen readers.

# 5.0.0 Business Rules

- {'rule_id': 'BR-072-01', 'rule_description': "A service request is considered 'In Warranty' if at least one associated warranty (primary or extended) is active on the date the service request was created.", 'enforcement_point': 'Backend system (during the execution of US-099).', 'violation_handling': "N/A. This is a definitional rule for the system's logic."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-099

#### 6.1.1.2 Dependency Reason

This story depends on the backend system logic from US-099 to calculate and attach the warranty status to the service request data object. US-072 is the frontend presentation of the data provided by US-099.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-061

#### 6.1.2.2 Dependency Reason

The Service Center Admin must be able to access a list of service requests to navigate to the details page where this status will be displayed.

## 6.2.0.0 Technical Dependencies

- The GET /api/v1/service-requests/{id} endpoint must be updated (as part of US-099) to include a `warrantyStatus` field in its response payload.

## 6.3.0.0 Data Dependencies

- Requires service requests linked to registered products with valid purchase dates and warranty durations in the database for testing.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The warranty status must be loaded as part of the initial service request data fetch, adding no more than 50ms to the API response time.

## 7.2.0.0 Security

- The Service Center Admin must only be able to view warranty status for tickets belonging to their assigned service center, as enforced by the API's authorization layer (RBAC).

## 7.3.0.0 Usability

- The status indicator must be immediately understandable at a glance.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards, particularly for color contrast and use of text labels.

## 7.5.0.0 Compatibility

- The feature must render correctly on all supported web browsers for the portal (latest Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- This is primarily a frontend display task.
- The complex business logic for status calculation is handled in a separate, prerequisite story (US-099).
- Requires creating a simple, reusable UI component.

## 8.3.0.0 Technical Risks

- Minor risk of inconsistency if the enum values for the status (e.g., 'IN_WARRANTY') are not synchronized between the backend and frontend.

## 8.4.0.0 Integration Points

- Frontend (Next.js Service Center Panel) will consume the `warrantyStatus` field from the backend's service request API.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify correct display for an 'In Warranty' ticket.
- Verify correct display for an 'Out of Warranty' ticket.
- Verify correct display for a ticket covered by an extended warranty.
- Verify UI behavior when the API returns a null/error status.
- Verify with a screen reader that the status is announced correctly.

## 9.3.0.0 Test Data Needs

- A test user account with the 'Service Center Admin' role.
- At least three service requests in the test database: one in-warranty, one out-of-warranty, and one covered by an extended warranty.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit tests.
- Playwright for E2E tests.
- Browser accessibility audit tools (e.g., Lighthouse, Axe).

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests for the UI component are written and achieve >80% coverage
- E2E tests covering the primary scenarios are passing in the CI/CD pipeline
- User interface reviewed and approved by the Product Owner/UX designer
- Accessibility checks have been performed and passed
- No new high-priority bugs have been introduced
- The feature is deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

1

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-099 and cannot be started until the backend API changes are complete and deployed to the development environment.

## 11.4.0.0 Release Impact

- This is a core feature for the Service Center Admin workflow and is essential for the MVP release of the Service Center Panel.

