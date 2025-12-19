# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-110 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: View my profile information |
| As A User Story | As a registered user, I want to access a 'My Profi... |
| User Persona | The primary 'User' or 'Consumer' of the mobile and... |
| Business Value | Enhances user trust through data transparency, red... |
| Functional Area | User Account Management |
| Story Theme | User Profile & Settings |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully view profile information

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a registered user and I am logged into the application

### 3.1.5 When

I navigate to the 'My Profile' screen from the main menu

### 3.1.6 Then

The system displays my correct Full Name, Email Address, and Contact Number in a read-only format.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Navigate to the edit profile screen

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

I am viewing my profile information on the 'My Profile' screen

### 3.2.5 When

I click or tap the 'Edit Profile' button

### 3.2.6 Then

I am successfully navigated to the screen where I can edit my profile information (as defined in US-111).

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to view profile when unauthenticated

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am not logged into the application

### 3.3.5 When

I attempt to access the 'My Profile' screen URL directly

### 3.3.6 Then

The system must redirect me to the login page.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Backend API fails to load profile data

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am logged into the application

### 3.4.5 When

I navigate to the 'My Profile' screen and the API call to fetch my data fails

### 3.4.6 Then

The system displays a user-friendly error message, such as 'Could not load your profile. Please try again later.'

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Profile data is displayed correctly on all supported platforms

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am a logged-in user viewing the 'My Profile' screen

### 3.5.5 When

I view the screen on a supported web browser and on the mobile application (iOS/Android)

### 3.5.6 Then

The layout is responsive and all my profile information is clearly legible and correctly formatted on each platform.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clear screen title, e.g., 'My Profile'.
- Read-only text fields with labels for 'Full Name', 'Email Address', and 'Contact Number'.
- A clearly visible 'Edit Profile' button or link.
- A loading indicator to show while data is being fetched.
- An error message display area for API failures.

## 4.2.0 User Interactions

- User can access this screen via a primary navigation element (e.g., in a user menu or settings area).
- Tapping the 'Edit Profile' button navigates the user to the edit screen.

## 4.3.0 Display Requirements

- The user's full name must be displayed as provided during registration.
- The user's email address (primary identifier) must be displayed.
- The user's contact phone number must be displayed.

## 4.4.0 Accessibility Needs

- The screen must comply with WCAG 2.1 Level AA standards.
- All text labels must be programmatically associated with their corresponding data fields for screen reader compatibility.
- The 'Edit Profile' button must be keyboard-focusable and operable.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A user can only view their own profile information.', 'enforcement_point': 'Backend API (Microservice Level)', 'violation_handling': "The API must not allow a request for a user's profile using another user's authentication token. Any such attempt should result in a 403 Forbidden or 404 Not Found response and be logged as a security event."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-016

#### 6.1.1.2 Dependency Reason

A user account must be created before a profile can exist to be viewed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-018

#### 6.1.2.2 Dependency Reason

User authentication is required to securely identify the user and fetch their specific profile data.

## 6.2.0.0 Technical Dependencies

- Azure Active Directory B2C: The identity provider that stores and serves the core user profile attributes.
- API Gateway (Azure API Management): Must be configured to expose and secure the profile endpoint.
- User/Identity Microservice: A backend service must exist to handle the logic of fetching user data from the identity provider.

## 6.3.0.0 Data Dependencies

- Requires access to the authenticated user's profile data (name, email, phone) from the identity store.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for fetching profile data must have a 95th percentile (P95) latency below 250ms as per SRS 5.1.

## 7.2.0.0 Security

- The API endpoint must be protected and require a valid JWT access token.
- The system must enforce that a user can only retrieve their own data by using the user identifier from the validated JWT token, not from any request parameter.
- All communication must be over HTTPS using TLS 1.3.

## 7.3.0.0 Usability

- The information must be presented in a clear, uncluttered, and easy-to-read format.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA guidelines.

## 7.5.0.0 Compatibility

- The web interface must be functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- The mobile interface must be functional on iOS 14.0+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- This is a standard read operation.
- Requires a simple frontend view and a single backend endpoint.
- Integration with the existing authentication system is straightforward.

## 8.3.0.0 Technical Risks

- Minimal risk. Potential for misconfiguration of security rules on the API endpoint, which must be carefully tested.

## 8.4.0.0 Integration Points

- Frontend (Web/Mobile) -> API Gateway -> User/Identity Microservice -> Azure AD B2C

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify that a logged-in user can see their correct profile data.
- Verify that an unauthenticated user is redirected to the login page.
- Verify the UI's response to an API error.
- Verify that the 'Edit Profile' button navigates to the correct screen.
- Security test: Verify that User A cannot fetch User B's profile data by manipulating API requests.

## 9.3.0.0 Test Data Needs

- At least two distinct test user accounts with complete profile information (name, email, phone).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Integration)
- Playwright (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests implemented for frontend and backend components, achieving >= 80% coverage
- API integration testing completed successfully
- E2E test script created and passing
- User interface reviewed and approved by UX/UI designer
- Performance of the API endpoint verified against the 250ms P95 requirement
- Security requirements validated, including authorization checks
- Accessibility audit passed against WCAG 2.1 AA
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

1

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for user account management and should be prioritized early in the development timeline, immediately following the completion of login and registration stories.
- It is a direct prerequisite for US-111 (Edit Profile).

## 11.4.0.0 Release Impact

This feature is a core expectation for any application with user accounts and is essential for the initial release.

