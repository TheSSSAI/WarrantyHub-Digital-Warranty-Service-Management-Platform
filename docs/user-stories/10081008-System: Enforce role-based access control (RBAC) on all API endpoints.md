# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-117 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Enforce role-based access control (RBAC) o... |
| As A User Story | As a Platform Security Architect, I want the syste... |
| User Persona | System / Platform Security Architect |
| Business Value | Protects user data and platform integrity by ensur... |
| Functional Area | Security & Authentication |
| Story Theme | Platform Security Foundation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Authenticated user attempts to access their own resource

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A registered 'User' is authenticated and possesses a valid JWT containing their user ID and 'User' role

### 3.1.5 When

The user makes a GET request to an endpoint they own, such as '/api/v1/users/{their_own_user_id}/products'

### 3.1.6 Then

The system validates the token, confirms the 'User' role and resource ownership, grants access, and returns a 200 OK response.

### 3.1.7 Validation Notes

Test by making an API call with a valid user token and verifying the HTTP status code is 200 and the response body contains only that user's data.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Authenticated user attempts to access another user's resource

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A registered 'User' (User A) is authenticated and possesses a valid JWT

### 3.2.5 When

User A makes a GET request to a resource owned by another user (User B), such as '/api/v1/users/{user_B_id}/products'

### 3.2.6 Then

The system validates the token but the resource ownership check fails, access is denied, and the system returns a 403 Forbidden response.

### 3.2.7 Validation Notes

Test by logging in as User A and attempting to fetch data for User B via the API. The response must be HTTP 403.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User with insufficient permissions attempts to access an admin-only endpoint

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A 'Technician' is authenticated and possesses a valid JWT

### 3.3.5 When

The technician makes a GET request to a Super Admin endpoint, such as '/api/v1/admin/brands/pending'

### 3.3.6 Then

The system validates the token but determines the 'Technician' role is not authorized for this endpoint, denies access, and returns a 403 Forbidden response.

### 3.3.7 Validation Notes

Test using a valid technician JWT to call an endpoint restricted to 'Super Admin' or 'Brand Admin' roles. The response must be HTTP 403.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User with sufficient permissions accesses an admin-only endpoint

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A 'Super Admin' is authenticated and possesses a valid JWT

### 3.4.5 When

The Super Admin makes a GET request to '/api/v1/admin/brands/pending'

### 3.4.6 Then

The system validates the token and the 'Super Admin' role, grants access, and returns a 200 OK response.

### 3.4.7 Validation Notes

Test using a valid Super Admin JWT. The response must be HTTP 200.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Unauthenticated client attempts to access a protected endpoint

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

An API client does not provide an Authorization header with a JWT

### 3.5.5 When

The client makes a request to any protected endpoint, such as '/api/v1/products'

### 3.5.6 Then

The system's authentication layer rejects the request before the RBAC check and returns a 401 Unauthorized response.

### 3.5.7 Validation Notes

Use an API client like Postman or cURL to make a request to a protected endpoint without a bearer token. The response must be HTTP 401.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Technician attempts to access a job not assigned to them

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A 'Technician' (Technician A) is authenticated and possesses a valid JWT

### 3.6.5 When

Technician A makes a GET request to a job detail endpoint for a job assigned to another technician (Technician B), such as '/api/v1/jobs/{job_for_B_id}'

### 3.6.6 Then

The system validates the 'Technician' role but the resource-level check for job assignment fails, access is denied, and the system returns a 403 Forbidden response.

### 3.6.7 Validation Notes

Requires test data with two technicians and a job assigned to only one. Log in as the other technician and attempt to access the job details.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

RBAC check performance overhead

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

The RBAC mechanism is active on all protected endpoints

### 3.7.5 When

A high volume of authenticated requests are processed by the system

### 3.7.6 Then

The additional latency introduced by the RBAC check must be less than 15ms at the 95th percentile.

### 3.7.7 Validation Notes

Requires performance testing. Measure baseline response time without RBAC and compare to response time with RBAC under load.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Defense-in-depth validation

### 3.8.3 Scenario Type

Happy_Path

### 3.8.4 Given

A valid request from an authorized user is received

### 3.8.5 When

The request passes through the Azure API Management gateway and reaches a backend microservice

### 3.8.6 Then

The API Gateway successfully validates the role and forwards the request, AND the receiving microservice re-validates the permissions before processing the request.

### 3.8.7 Validation Notes

This is verified through code review and integration tests that specifically target the microservice's authorization guard/middleware.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Not Applicable

## 4.2.0 User Interactions

- Not Applicable

## 4.3.0 Display Requirements

- Not Applicable

## 4.4.0 Accessibility Needs

- Not Applicable

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SEC-001

### 5.1.2 Rule Description

Access to any resource requires a valid, non-expired JWT from the trusted identity provider (Azure AD B2C).

### 5.1.3 Enforcement Point

API Gateway (primary) and all backend microservices (secondary).

### 5.1.4 Violation Handling

Request is rejected with a 401 Unauthorized status.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SEC-002

### 5.2.2 Rule Description

Access to an endpoint is granted only if the role(s) present in the JWT are explicitly permitted for that endpoint's URL and HTTP method.

### 5.2.3 Enforcement Point

API Gateway (primary) and all backend microservices (secondary).

### 5.2.4 Violation Handling

Request is rejected with a 403 Forbidden status.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-SEC-003

### 5.3.2 Rule Description

Users with the 'User' role can only access or modify data entities that they own (e.g., their own products, their own service requests).

### 5.3.3 Enforcement Point

Backend microservices, as this requires a database lookup to verify ownership.

### 5.3.4 Violation Handling

Request is rejected with a 403 Forbidden status.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-018', 'dependency_reason': 'RBAC depends on a robust authentication system that generates trusted JWTs containing user identity and role claims. This story provides that foundation.'}

## 6.2.0 Technical Dependencies

- Azure AD B2C integration for issuing JWTs with role claims.
- Azure API Management instance for centralized policy enforcement.
- NestJS framework's Guard or Interceptor mechanism for implementing defense-in-depth checks in microservices.

## 6.3.0 Data Dependencies

- A finalized and documented list of user roles: User, Technician, Service Center Admin, Brand Admin, Super Admin.
- A defined mapping of roles to API endpoint permissions.

## 6.4.0 External Dependencies

- Configuration of custom claims (roles) within the Azure AD B2C user flow or token policy.

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The RBAC validation logic must add less than 15ms of latency to the P95 response time of any API call.

## 7.2.0 Security

- The implementation must follow the principle of least privilege.
- The system must fail-closed, meaning access is denied by default and only explicitly granted.
- The implementation must be resistant to common JWT vulnerabilities and privilege escalation attacks.
- All authorization failures (403 Forbidden) must be logged for security monitoring and auditing purposes.

## 7.3.0 Usability

- Not Applicable

## 7.4.0 Accessibility

- Not Applicable

## 7.5.0 Compatibility

- Not Applicable

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Implementing a hybrid enforcement model (API Gateway + microservices) requires careful coordination to keep logic consistent.
- Implementing resource-level ownership checks is complex and requires database access within the authorization logic of each microservice.
- Requires a robust and maintainable way to manage the role-to-permission mappings for dozens of endpoints.
- Thorough testing across all roles and numerous endpoints is time-consuming.

## 8.3.0 Technical Risks

- Misconfiguration of permissions could lead to either critical security vulnerabilities or legitimate users being locked out.
- Performance bottlenecks if resource-level checks are not optimized (e.g., inefficient database queries).

## 8.4.0 Integration Points

- Azure API Management policies.
- Azure AD B2C token claims configuration.
- A global or feature-specific Guard/Interceptor in each NestJS microservice.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Performance

## 9.2.0 Test Scenarios

- Verify each defined role can access its designated endpoints and is denied access to all others.
- Verify resource-level ownership checks for 'User' and 'Technician' roles.
- Verify unauthenticated and expired-token scenarios result in 401.
- Verify insufficient permission scenarios result in 403.
- Conduct penetration testing to attempt to bypass RBAC controls.

## 9.3.0 Test Data Needs

- Test user accounts for each defined role (Super Admin, Brand Admin, etc.).
- Data sets where ownership is clearly defined (e.g., User A owns Product 1, User B owns Product 2).

## 9.4.0 Testing Tools

- Jest and Supertest for backend integration tests.
- Postman or a similar API client for manual verification.
- Playwright for E2E tests simulating different user logins.
- OWASP ZAP or Burp Suite for security testing.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests implemented with >80% coverage for the authorization logic
- RBAC policies are applied to all existing protected API endpoints
- Security review of the implementation has been completed and any findings addressed
- Performance testing confirms latency overhead is within the acceptable limit
- Documentation is created for developers explaining how to secure new endpoints
- Story deployed and verified in the staging environment with tests against all user roles

# 11.0.0 Planning Information

## 11.1.0 Story Points

8

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a foundational, blocking story. It must be completed early in the project, before or alongside the first features that require authenticated access.
- Requires collaboration between backend developers and DevOps/Cloud engineers responsible for Azure AD B2C and API Management.

## 11.4.0 Release Impact

This is a critical security feature and is a mandatory prerequisite for any production release (MVP or later).

