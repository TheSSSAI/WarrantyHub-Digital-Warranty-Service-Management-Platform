# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-098 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Automatically route a new service request ... |
| As A User Story | As the system, I want to automatically identify an... |
| User Persona | System (Automated Process). Triggered by a 'User' ... |
| Business Value | Improves operational efficiency by automating manu... |
| Functional Area | Service Request Module |
| Story Theme | Service Request Lifecycle Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Request is routed to the single available service center for a given location

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A brand 'Brand-A' has only one authorized service center, 'SC-1', whose service area covers the user's postal code '12345'.

### 3.1.5 When

A user at postal code '12345' submits a new service request for a 'Brand-A' product.

### 3.1.6 Then

The system must assign the service request to 'SC-1'.

### 3.1.7 Validation Notes

Verify in the database that the service_request record is linked to the correct service_center_id. Verify that 'SC-1' receives a notification.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: Request is routed using round-robin when multiple service centers are available

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A brand 'Brand-B' has two authorized service centers, 'SC-2' and 'SC-3', both covering postal code '54321'. The round-robin counter for this brand/area is currently set to assign to 'SC-2' next.

### 3.2.5 When

A user at postal code '54321' submits a service request for a 'Brand-B' product.

### 3.2.6 Then

The system assigns the request to 'SC-2'.

### 3.2.7 Validation Notes

Verify the request is assigned to SC-2. Submit a second, identical request and verify it is assigned to SC-3, confirming the round-robin logic.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Happy Path: Request is routed based on a geofenced polygon service area

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A brand 'Brand-C' has an authorized service center 'SC-4' whose service area is defined by a geofenced polygon.

### 3.3.5 And

The user's address for the service request has GPS coordinates that fall within this polygon.

### 3.3.6 When

The user submits a service request for a 'Brand-C' product.

### 3.3.7 Then

The system must assign the service request to 'SC-4'.

### 3.3.8 Validation Notes

Requires a test setup with a user address that can be geocoded to a point within a predefined polygon in the test database. Use PostGIS functions like ST_Contains for verification.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: No service center is available due to location mismatch

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A brand 'Brand-D' has an authorized service center 'SC-5', but its service area does not cover the user's postal code '99999'.

### 3.4.5 When

A user at postal code '99999' submits a service request for a 'Brand-D' product.

### 3.4.6 Then

The system must determine that no service center is available.

### 3.4.7 And

The system must trigger the 'no service center available' flow, which informs the user as per US-038.

### 3.4.8 Validation Notes

Verify that the service request is not assigned and that the API response indicates the specific 'no service center found' status.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: No service center is available due to brand mismatch

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

Service center 'SC-6' is authorized for 'Brand-E' but not for 'Brand-F'.

### 3.5.5 And

The system must trigger the 'no service center available' flow.

### 3.5.6 When

The user submits a service request for a 'Brand-F' product.

### 3.5.7 Then

The system must not consider 'SC-6' as an eligible service center.

### 3.5.8 Validation Notes

Verify that the routing logic correctly filters service centers based on brand authorization before checking location.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Error Condition: Routing logic handles inactive service centers

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

Service center 'SC-7' is authorized for 'Brand-G' and covers the user's location, but its status is 'Inactive'.

### 3.6.5 When

A user submits a service request for a 'Brand-G' product in that location.

### 3.6.6 Then

The system must exclude 'SC-7' from the list of potential routing targets.

### 3.6.7 Validation Notes

Ensure the initial query for service centers filters out any that are not in an 'Active' state.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Not Applicable. This is a backend system process.

## 4.2.0 User Interactions

- Not Applicable. This process is triggered by an API call, not direct user interaction with the routing logic.

## 4.3.0 Display Requirements

- The outcome of this process (success or failure to find a service center) must be communicated back to the calling client (web/mobile app) via the API response.

## 4.4.0 Accessibility Needs

- Not Applicable.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A service request must be routed to a service center that is explicitly authorized to service the product's brand.

### 5.1.3 Enforcement Point

During the initial filtering stage of the routing algorithm.

### 5.1.4 Violation Handling

Service centers not authorized for the brand are excluded from consideration.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

A service request must be routed to a service center whose defined geographic service area (postal code list or geofenced polygon) contains the user's service address.

### 5.2.3 Enforcement Point

During the location-based filtering stage of the routing algorithm.

### 5.2.4 Violation Handling

Service centers whose service area does not cover the user's location are excluded from consideration.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

If multiple service centers are eligible after brand and location filtering, the assignment must follow a round-robin distribution to ensure fairness.

### 5.3.3 Enforcement Point

During the final selection stage of the routing algorithm.

### 5.3.4 Violation Handling

A persistent counter or pointer for the specific brand/area combination is incremented to select the next service center in the sequence.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-011

#### 6.1.1.2 Dependency Reason

Requires the ability to link service centers to the brands they are authorized to service.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-012

#### 6.1.2.2 Dependency Reason

Requires the ability to define a service center's geographic coverage using postal codes.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-013

#### 6.1.3.2 Dependency Reason

Requires the ability to define a service center's geographic coverage using a geofenced polygon.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-036

#### 6.1.4.2 Dependency Reason

This story implements the backend logic triggered when a user raises a service request.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-038

#### 6.1.5.2 Dependency Reason

This story handles the failure path where no service center can be found, which must be triggered by the routing logic.

## 6.2.0.0 Technical Dependencies

- Azure Database for PostgreSQL with the PostGIS extension enabled and configured.
- Azure Cache for Redis for managing the state of the round-robin algorithm.
- A geocoding service to convert user addresses into latitude/longitude coordinates for polygon matching.

## 6.3.0.0 Data Dependencies

- Access to service center data, including their brand authorizations and defined service areas (postal codes and polygons).
- Access to the user's address information from the submitted service request.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The entire routing and assignment process must complete with a P95 latency of less than 250ms.

## 7.2.0.0 Security

- The service must only be accessible via authenticated and authorized API calls from the API Gateway.

## 7.3.0.0 Usability

- Not Applicable.

## 7.4.0.0 Accessibility

- Not Applicable.

## 7.5.0.0 Compatibility

- Not Applicable.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires integration with a geospatial database (PostGIS) and writing efficient spatial queries.
- Requires state management for the round-robin algorithm, which must be atomic and persistent (e.g., using Redis).
- Involves orchestrating data from multiple domains (Users, Products, Service Centers).
- The logic must gracefully handle cases with zero, one, or multiple eligible service centers.

## 8.3.0.0 Technical Risks

- Performance of geospatial queries on a large dataset of service areas could be a bottleneck if not properly indexed.
- Race conditions in the round-robin state management if not implemented atomically, leading to unfair distribution.

## 8.4.0.0 Integration Points

- Service Request Service: This logic will likely reside within or be called by this service.
- Database (PostgreSQL/PostGIS): To query service center data and service areas.
- Cache (Redis): To read/write the round-robin state.
- Notification Service: To alert the assigned service center of the new job.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance

## 9.2.0.0 Test Scenarios

- Verify routing with a single matching service center.
- Verify round-robin distribution across multiple requests to an area with multiple eligible centers.
- Verify routing using a user location inside a geofenced polygon.
- Verify routing failure when a user is outside all defined service areas (both postal and polygon).
- Verify routing failure when no service center is authorized for the product's brand.
- Verify performance under a simulated load of concurrent service requests.

## 9.3.0.0 Test Data Needs

- Test data for multiple brands.
- Test data for service centers with various configurations: postal code areas, polygon areas, overlapping areas, and different brand authorizations.
- Test users with addresses inside, outside, and on the boundaries of these service areas.

## 9.4.0.0 Testing Tools

- Jest/Supertest for unit/integration tests.
- Playwright for E2E tests.
- A load testing tool like k6 or JMeter for performance testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >= 80% coverage for the routing logic
- Integration testing with a real PostGIS database and Redis instance completed successfully
- E2E test scenario for creating and routing a request is passing
- Performance requirement of <250ms P95 latency is verified
- Security requirements validated
- Documentation for the routing service API and its logic is updated
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires all prerequisite stories (US-011, US-012, US-013, US-036) to be completed first.
- The development environment must have a PostgreSQL instance with the PostGIS extension enabled.
- Requires a Redis instance to be available for development and testing.

## 11.4.0.0 Release Impact

This is a critical-path feature for the core functionality of raising and processing a service request. The platform cannot launch without it.

