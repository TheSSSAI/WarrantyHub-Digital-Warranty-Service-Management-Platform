# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-083 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Web Session Times Out Due to Inactivity |
| As A User Story | As a logged-in user on any web portal, I want my s... |
| User Persona | Any authenticated user of a web portal (e.g., Cons... |
| Business Value | Enhances platform security by mitigating the risk ... |
| Functional Area | Security & Authentication |
| Story Theme | User Session Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Session timeout warning is displayed before automatic logout

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged into a web portal and has been inactive for 13 minutes

### 3.1.5 When

the inactivity timer reaches the 13-minute mark

### 3.1.6 Then

a modal dialog appears with a message 'Your session is about to expire. Do you want to stay logged in?'

### 3.1.7 And

the dialog presents 'Stay Logged In' and 'Log Out Now' options.

### 3.1.8 Validation Notes

Verify the modal appears at the correct time. The timeout values (15 min total, 2 min warning) should be sourced from a configuration setting.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User extends the session from the warning modal

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the session expiry warning modal is displayed

### 3.2.5 When

the user clicks the 'Stay Logged In' button

### 3.2.6 Then

the inactivity timer is reset to its full duration (15 minutes)

### 3.2.7 And

the user's session remains active on the current page.

### 3.2.8 Validation Notes

Confirm that after clicking, another 13 minutes of inactivity are required to trigger the warning again.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User is automatically logged out after ignoring the warning

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

the session expiry warning modal is displayed

### 3.3.5 When

the user takes no action and the 2-minute countdown expires

### 3.3.6 Then

the user is automatically logged out

### 3.3.7 And

a message is displayed stating 'You have been logged out due to inactivity.'

### 3.3.8 Validation Notes

Use E2E testing with a modified (shortened) timeout value to verify this flow without waiting the full 15 minutes.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User activity resets the inactivity timer

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a user is logged into a web portal and has been inactive for 10 minutes

### 3.4.5 When

the user performs any action such as a mouse click, key press, or page navigation

### 3.4.6 Then

the 15-minute inactivity timer is reset without any visible interruption to the user.

### 3.4.7 Validation Notes

Verify that various user events (click, keydown, scroll) successfully reset the timer.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User manually logs out from the warning modal

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

the session expiry warning modal is displayed

### 3.5.5 When

the user clicks the 'Log Out Now' button

### 3.5.6 Then

the user is immediately logged out and redirected to the login page.

### 3.5.7 Validation Notes

Ensure the logout is immediate and the session is terminated correctly.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Activity in one browser tab resets the timer in other tabs

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a user is logged into the same web portal in two separate browser tabs

### 3.6.5 When

the user is active in Tab A, while Tab B remains idle

### 3.6.6 Then

the inactivity timer in Tab B is also reset

### 3.6.7 And

the user is not logged out from Tab B due to inactivity.

### 3.6.8 Validation Notes

This can be tested using browser APIs like BroadcastChannel or localStorage events to synchronize state across tabs.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Client-side session tokens are cleared upon timeout

### 3.7.3 Scenario Type

Security

### 3.7.4 Given

a user's session has timed out and they have been redirected to the login page

### 3.7.5 When

a developer inspects the browser's storage (e.g., cookies, local storage)

### 3.7.6 Then

the JWT access token and any related session data must be cleared.

### 3.7.7 Validation Notes

Verify that after timeout, making a manual API call with a captured old token results in a 401 Unauthorized error from the backend.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A non-intrusive modal dialog for the timeout warning.
- A countdown timer display within the modal.
- Two buttons within the modal: 'Stay Logged In' (primary action) and 'Log Out Now' (secondary action).
- A notification/toast message on the login page to inform the user why they were logged out.

## 4.2.0 User Interactions

- The modal should overlay the current page content, preventing interaction with the page until a choice is made.
- Pressing the 'Escape' key should not dismiss the modal; an explicit choice is required.

## 4.3.0 Display Requirements

- The warning message must be clear and concise.
- The countdown should be easily visible, formatted as minutes and seconds (e.g., 1:59).

## 4.4.0 Accessibility Needs

- The modal must be keyboard navigable (tabbing between buttons).
- Focus should be trapped within the modal when it is active.
- The modal and its contents must be accessible to screen readers, adhering to WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The default idle session timeout for all web portals is 15 minutes.

### 5.1.3 Enforcement Point

Client-side application logic.

### 5.1.4 Violation Handling

The user session is terminated, and the user is redirected to the login page.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The idle timeout duration must be a system-level configuration parameter, not a hardcoded value.

### 5.2.3 Enforcement Point

Application startup/configuration loading.

### 5.2.4 Violation Handling

N/A (Development constraint).

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-096

#### 6.1.1.2 Dependency Reason

A user must be able to log in and establish a session before that session can time out.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

N/A - Auth Module

#### 6.1.2.2 Dependency Reason

Requires the core authentication module that handles JWT generation, validation, and client-side token storage.

## 6.2.0.0 Technical Dependencies

- Next.js 14 web frontend for all portals.
- Azure AD B2C for authentication and JWT issuance.
- A global state management solution or React Context for handling session state.
- A browser API for cross-tab communication (e.g., BroadcastChannel API).

## 6.3.0.0 Data Dependencies

- Access to a system configuration endpoint to fetch the timeout duration.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The inactivity detection script must be lightweight and not noticeably impact browser performance or responsiveness.

## 7.2.0.0 Security

- Upon timeout, client-side tokens MUST be securely cleared.
- The session timeout is a client-side UX feature; it does not replace the absolute expiry time (`exp` claim) of the JWT, which is the ultimate security control enforced by the backend.

## 7.3.0.0 Usability

- The warning modal must provide a clear choice and sufficient time for the user to respond before being logged out.

## 7.4.0.0 Accessibility

- All UI components related to this feature must comply with WCAG 2.1 Level AA.

## 7.5.0.0 Compatibility

- The feature must work consistently across the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Implementing reliable cross-tab session synchronization is non-trivial and requires careful handling of edge cases.
- Managing timers and event listeners in a performant way within a React application.
- Ensuring the solution is robust and does not create race conditions, especially with token refresh logic if implemented.

## 8.3.0.0 Technical Risks

- Inconsistent behavior of browser APIs (like BroadcastChannel) across different browsers.
- Potential for performance degradation if user activity event listeners are not implemented efficiently (e.g., without debouncing/throttling).

## 8.4.0.0 Integration Points

- Integrates with the global authentication state/context of the frontend application.
- Listens for user input events at the top level of the application.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility
- Cross-Browser

## 9.2.0.0 Test Scenarios

- Verify logout after full timeout with no interaction.
- Verify session extension by clicking 'Stay Logged In'.
- Verify timer reset on various user activities.
- Verify cross-tab synchronization prevents incorrect logouts.
- Verify manual logout from the modal.
- Verify accessibility of the warning modal.

## 9.3.0.0 Test Data Needs

- Valid login credentials for any user role with web portal access.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/integration tests.
- Cypress for E2E tests. The ability to manipulate the clock (`cy.clock()`, `cy.tick()`) will be essential for testing time-based functionality efficiently.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in all supported browsers.
- Code reviewed and approved by at least one other developer.
- Unit and E2E tests implemented with sufficient coverage and passing in the CI pipeline.
- Cross-tab session synchronization is implemented and verified.
- The timeout duration is loaded from a configuration source.
- The warning modal meets UI/UX and accessibility requirements.
- Security review confirms that tokens are properly cleared on logout.
- Documentation for the session timeout configuration is created or updated.
- Story deployed and verified in the staging environment by QA.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational security feature that should be implemented early in the development of the web portals.
- The team must decide on a strategy for cross-tab communication before starting implementation.

## 11.4.0.0 Release Impact

This feature is considered a mandatory security requirement for the initial public launch of any web portal.

