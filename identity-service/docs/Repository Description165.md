# 1 Id

REPO-BS-001

# 2 Name

identity-service

# 3 Description

This service is the authoritative source for user and identity management across the entire platform. It is exclusively responsible for user registration, authentication (issuing JWTs), authorization (managing roles like 'Customer', 'Technician', 'BrandAdmin'), and profile management. Extracted from the original `warranty-hub-backend`, this component isolates all security-critical operations, adhering to the principle of least privilege. It integrates directly with Azure AD B2C and exposes endpoints for creating and managing users, roles, and permissions. Its separation ensures that changes to authentication flows or user schemas can be developed, tested, and deployed independently without affecting other business logic services.

# 4 Type

🔹 Application Services

# 5 Namespace

WarrantyHub.Services.Identity

# 6 Output Path

services/identity

# 7 Framework

NestJS v10.3.x

# 8 Language

Node.js (TypeScript)

# 9 Technology

Node.js, NestJS, Azure AD B2C

# 10 Thirdparty Libraries

- @nestjs/jwt
- passport
- msal

# 11 Layer Ids

- service-layer

# 12 Dependencies

- REPO-CL-010
- REPO-SL-011

# 13 Requirements

- {'requirementId': '5.2 Security'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Microservice

# 17 Architecture Map

- identity-service-002

# 18 Components Map

- identity-service-002

# 19 Requirements Map

- REQ-SEC-001
- REQ-SEC-002

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-BK-001

## 20.3 Decomposition Reasoning

Extracted to isolate the critical security and identity concerns from general business logic. This separation allows for specialized security reviews, independent scaling based on authentication load, and focused development on user management features without impacting other services.

## 20.4 Extracted Responsibilities

- User authentication and token issuance
- Role-Based Access Control (RBAC) management
- User profile CRUD operations

## 20.5 Reusability Scope

- The JWTs it issues are reused and validated by the API Gateway and all other backend services.

## 20.6 Development Benefits

- Enables a dedicated team to focus on security and identity without needing context on other business domains.
- Allows for independent deployment of authentication-related updates.

# 21.0 Dependency Contracts

*No data available*

# 22.0 Exposed Contracts

## 22.1 Public Interfaces

- {'interface': 'IIdentityApi', 'methods': ['POST /auth/login(LoginDto) : JwtToken', 'POST /users/register(RegisterUserDto) : UserDto', 'GET /users/me() : UserProfileDto'], 'events': [], 'properties': [], 'consumers': ['REPO-GW-013', 'REPO-FE-002', 'REPO-FE-003']}

# 23.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Utilizes NestJS built-in DI for internal services ... |
| Event Communication | Publishes 'UserRegistered' and 'UserRoleChanged' e... |
| Data Flow | Receives credentials, validates against Azure AD B... |
| Error Handling | Standard HTTP error codes for auth failures (401, ... |
| Async Patterns | Async/await for all I/O operations with the databa... |

# 24.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Implement custom Passport.js strategies for JWT va... |
| Performance Considerations | Cache public keys for JWT validation to reduce lat... |
| Security Considerations | Store secrets in Azure Key Vault. Enforce password... |
| Testing Approach | Unit tests for logic, integration tests for endpoi... |

# 25.0 Scope Boundaries

## 25.1 Must Implement

- User registration, login, token refresh
- Role and permission management

## 25.2 Must Not Implement

- Any business logic related to products, warranties, or service requests.

## 25.3 Extension Points

- Adding new authentication providers (e.g., Google, Facebook).

## 25.4 Validation Rules

- Validate email format, password strength, and uniqueness of usernames.

