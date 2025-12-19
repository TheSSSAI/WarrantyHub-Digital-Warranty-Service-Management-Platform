# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-040 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Select a preferred date and time slot for a ... |
| As A User Story | As a product owner raising a service request, I wa... |
| User Persona | The end-user (Consumer) who owns a registered prod... |
| Business Value | Improves customer satisfaction by offering a conve... |
| Functional Area | Service Request Management |
| Story Theme | Service Request Lifecycle |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User successfully selects an available date and time slot

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is on the service request creation form and a service center has been determined for their request

### 3.1.5 When

The user navigates to the scheduling section of the form

### 3.1.6 Then

The system fetches and displays a calendar view, highlighting dates with available appointment slots within the next 90 days. Upon selecting an available date, a list of available time slots for that day is displayed. When the user selects a time slot, their selection is visually confirmed and stored with the service request data.

### 3.1.7 Validation Notes

Verify that the API call to fetch availability is made and the UI updates correctly. On form submission, the selected date and time slot ID must be present in the payload.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

No available slots for the service center

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

A user is on the service request creation form and the determined service center has no available appointment slots

### 3.2.5 When

The user navigates to the scheduling section

### 3.2.6 Then

The system displays an informative message stating 'No online scheduling slots are currently available. Please submit your request, and the service center will contact you directly to schedule a visit.' The user can proceed with the request submission without selecting a time.

### 3.2.7 Validation Notes

Simulate an API response with an empty availability array. Ensure the correct message is displayed and the form can still be submitted.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User cannot select past dates

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A user is viewing the scheduling calendar

### 3.3.5 When

The calendar is displayed

### 3.3.6 Then

All dates prior to the current date are visually disabled and are not selectable.

### 3.3.7 Validation Notes

Check the calendar UI to confirm past dates are greyed out or non-interactive. Attempting to select a past date via automated tests should fail.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

API failure when fetching schedule

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A user is on the service request creation form

### 3.4.5 When

The system attempts to fetch the service center's schedule and the API call fails or times out

### 3.4.6 Then

A user-friendly error message is displayed, such as 'We couldn't load the schedule right now.' The user is given the option to proceed with submitting the request without a scheduled time.

### 3.4.7 Validation Notes

Use a mock API to simulate a 500 error or a timeout. Verify the error message and the ability to continue are presented to the user.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Selected time slot becomes unavailable before submission (race condition)

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A user has selected a valid time slot on the form

### 3.5.5 And

That time slot is booked by another process before the user submits the form

### 3.5.6 When

The user submits the service request

### 3.5.7 Then

The submission fails, and an error message is displayed: 'The selected time slot is no longer available. Please choose another time.' The user is returned to the scheduling step, and the availability is refreshed.

### 3.5.8 Validation Notes

This requires an integration test where the slot's availability is changed in the database after it's been fetched by the client but before the submission API call is made.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Loading state while fetching schedule

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

A user navigates to the scheduling section

### 3.6.5 When

The system is fetching the availability data from the backend

### 3.6.6 Then

A loading indicator (e.g., a spinner) is displayed in place of the calendar until the data is loaded or the request fails.

### 3.6.7 Validation Notes

Use network throttling in browser developer tools to simulate a slow connection and verify the loading indicator is present and correct.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A calendar component for date selection.
- A time slot selector component (e.g., a list of buttons or a grid).
- Loading indicator/spinner.
- User-friendly error message display area.

## 4.2.0 User Interactions

- User clicks on a date to see available time slots for that day.
- User clicks on a time slot to select it; the selected slot should be visually highlighted.
- Clicking another slot should deselect the previous one and select the new one.
- Past dates and dates without available slots should be non-interactive.

## 4.3.0 Display Requirements

- Clearly distinguish between available, unavailable, and selected dates/times.
- Display time slots in the user's local time zone, clearly indicating the time zone (e.g., '10:00 AM - 12:00 PM Your Time').
- The calendar should prevent navigation beyond a configurable future limit (e.g., 90 days).

## 4.4.0 Accessibility Needs

- The calendar and time slot selectors must be fully navigable using a keyboard (Tab, Arrow keys, Enter/Space to select).
- All interactive elements must have appropriate ARIA roles and labels for screen reader compatibility (WCAG 2.1 Level AA).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SCHED-001

### 5.1.2 Rule Description

Users can only schedule appointments up to a maximum of 90 days in the future.

### 5.1.3 Enforcement Point

Frontend UI (disabling dates) and Backend API (validation on submission).

### 5.1.4 Violation Handling

The UI will not allow selection. The API will reject any request with a date beyond the limit with a 400 Bad Request error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SCHED-002

### 5.2.2 Rule Description

A time slot must be explicitly reserved at the point of submission to prevent double-booking.

### 5.2.3 Enforcement Point

Backend API during the service request creation transaction.

### 5.2.4 Violation Handling

If the slot is already taken, the API transaction fails, and an error is returned to the user as per AC-005.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-036

#### 6.1.1.2 Dependency Reason

This story is a feature within the service request creation flow initiated by US-036.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-098

#### 6.1.2.2 Dependency Reason

The system must first determine the appropriate service center based on brand and location before it can query for that center's availability.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-XXX (Not in list)

#### 6.1.3.2 Dependency Reason

A story must exist for Service Center Admins to define their business hours, technician capacity, and block out dates. This availability data is required for this story to function.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint to GET `/service-centers/{id}/availability?startDate={date}&endDate={date}`.
- The service request creation endpoint (e.g., POST `/service-requests`) must be updated to accept and validate a `timeSlotId`.

## 6.3.0.0 Data Dependencies

- Availability of service center schedule data, including working hours, holidays, and existing appointments.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to fetch a month's worth of availability slots must respond in under 1000ms (P95).
- The frontend calendar component must render and become interactive in under 500ms after receiving API data.

## 7.2.0.0 Security

- The availability endpoint must be protected and only accessible to authenticated users.
- The endpoint should validate that the user's service request is eligible for the requested service center ID to prevent data snooping.

## 7.3.0.0 Usability

- The scheduling process should be intuitive, requiring minimal clicks to select a date and time.
- Error messages must be clear and guide the user on how to proceed.

## 7.4.0.0 Accessibility

- Must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The UI must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge, and on mobile viewports as per the SRS.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend logic for calculating available slots based on multiple factors (hours, capacity, existing bookings, holidays) can be complex.
- Handling time zones correctly between the user, the service center, and the server (UTC) is critical.
- Implementing a robust solution for the race condition (AC-005) requires careful transactional logic on the backend.

## 8.3.0.0 Technical Risks

- Poor performance of the availability calculation logic could lead to a slow user experience.
- Incorrect time zone handling could lead to scheduling errors and customer dissatisfaction.

## 8.4.0.0 Integration Points

- The Service Request microservice will need to call a new or existing Scheduling/Availability microservice.
- The frontend application will integrate with the new availability API endpoint.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- A user successfully books a slot.
- A user attempts to book a slot that was just taken.
- The availability API returns no slots.
- The availability API returns an error.
- A user tries to select a date in the past or too far in the future.
- Verify correct time zone conversions in the UI.

## 9.3.0.0 Test Data Needs

- A service center with a fully defined schedule (working hours, holidays).
- A service center with a partially booked schedule.
- A service center with a fully booked schedule.
- A service center with no schedule defined.

## 9.4.0.0 Testing Tools

- Jest/React Testing Library for frontend unit/component tests.
- Jest/Supertest for backend API tests.
- Playwright for E2E testing.
- Axe for automated accessibility checks.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage for new logic
- Integration testing between frontend and backend completed successfully
- E2E tests for happy path and key error conditions are created and passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements verified under simulated load
- Accessibility audit passed (automated and manual checks)
- Documentation for the new API endpoint is created/updated in OpenAPI spec
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked until the functionality for service centers to manage their availability is complete.
- Requires both frontend and backend development effort that can be parallelized once the API contract is defined.

## 11.4.0.0 Release Impact

This is a core feature for the service request experience and is critical for a user-friendly MVP launch.

