# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-081 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician: Communicate with the customer via in-a... |
| As A User Story | As a Technician, I want to access a real-time, in-... |
| User Persona | Technician using the mobile application while mana... |
| Business Value | Improves customer satisfaction through proactive c... |
| Functional Area | Service Request Management |
| Story Theme | Real-Time Communication |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Technician successfully sends a message to the customer

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the Technician is logged into the mobile app and is viewing the details of an active, assigned service request

### 3.1.5 When

the Technician taps the chat icon, types a message into the input field, and taps 'Send'

### 3.1.6 Then

the message immediately appears in the Technician's chat history for that request, timestamped and aligned to indicate it was sent by them.

### 3.1.7 Validation Notes

Verify the message is persisted in the database and the corresponding customer receives a push notification and can view the message in their app (dependent on US-045).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician receives a new message from the customer

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the Technician is logged into the mobile app and the app is in the foreground or background

### 3.2.5 When

the customer sends a message related to a service request assigned to the Technician

### 3.2.6 Then

the Technician receives a push notification containing the customer's name and a preview of the message.

### 3.2.7 Validation Notes

Tapping the notification should deep-link the Technician directly to the relevant chat screen. The message should appear as unread.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Viewing chat history for a service request

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a conversation has already occurred for a specific service request

### 3.3.5 When

the Technician navigates to the chat screen for that service request

### 3.3.6 Then

the full conversation history is displayed in chronological order, with messages from the Technician and customer clearly differentiated.

### 3.3.7 Validation Notes

Test by scrolling up to ensure older messages are loaded correctly.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to send a message with no network connectivity

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

the Technician is viewing the chat screen for a service request and their device has no internet connection

### 3.4.5 When

the Technician attempts to send a message

### 3.4.6 Then

the message appears in the chat UI with a 'Sending failed' or 'Pending' status indicator.

### 3.4.7 And

the app automatically retries sending the message once network connectivity is restored.

### 3.4.8 Validation Notes

Use device network throttling tools to simulate connection loss and restoration.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Accessing chat for a closed or resolved service request

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a service request assigned to the Technician has a status of 'Resolved' or 'Closed'

### 3.5.5 When

the Technician navigates to the chat screen for that service request

### 3.5.6 Then

the entire chat history is visible in a read-only mode.

### 3.5.7 And

a clear message is displayed, such as 'This service request is closed, and the chat is read-only.'

### 3.5.8 Validation Notes

Verify this behavior for both 'Resolved' and 'Closed' statuses.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Unread message indicator

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the customer has sent a new message that the Technician has not yet viewed

### 3.6.5 When

the Technician views their list of assigned jobs

### 3.6.6 Then

the job entry with the unread message has a visual indicator (e.g., a notification badge).

### 3.6.7 And

once the Technician opens the chat, the indicator is cleared.

### 3.6.8 Validation Notes

Ensure the 'read' status is updated correctly in the backend once the message is viewed.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A chat icon/button on the service request details screen.
- A chat screen with a scrollable message history view.
- A text input field for composing messages.
- A 'Send' button.
- Timestamp display for each message.
- Read/unread status indicators.
- A header displaying the customer's name and service request ID.

## 4.2.0 User Interactions

- Tapping the chat icon opens the chat screen.
- Typing in the input field and tapping 'Send' adds the message to the history.
- Scrolling up loads older messages in the conversation.
- Tapping a push notification for a new message opens the corresponding chat screen.

## 4.3.0 Display Requirements

- Messages sent by the Technician should be visually distinct from messages received from the customer (e.g., different background color and alignment).
- The system must display an error state if the chat service is unavailable.

## 4.4.0 Accessibility Needs

- All UI elements (buttons, input fields) must have proper labels for screen readers.
- Sufficient color contrast between text and background in chat bubbles.
- The app should announce new incoming messages via the screen reader.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-CHAT-001

### 5.1.2 Rule Description

Chat functionality is only enabled for service requests with a status that is not 'Resolved' or 'Closed'.

### 5.1.3 Enforcement Point

Backend API and Frontend UI

### 5.1.4 Violation Handling

The API will reject new messages for closed tickets. The UI will disable the input field.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-CHAT-002

### 5.2.2 Rule Description

Chat history must be retained for the life of the service request plus one year, after which it can be archived or purged.

### 5.2.3 Enforcement Point

Backend data retention policy/job

### 5.2.4 Violation Handling

N/A - System process.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-CHAT-003

### 5.3.2 Rule Description

A chat channel is strictly one-to-one between the assigned Technician and the Customer for a specific service request.

### 5.3.3 Enforcement Point

Backend service authorization logic

### 5.3.4 Violation Handling

API requests to send or receive messages will be rejected if the user is not a party to the specified service request.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-077

#### 6.1.1.2 Dependency Reason

The chat interface must be accessible from the job details screen.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-045

#### 6.1.2.2 Dependency Reason

This is the customer-side counterpart of the chat feature. Both are required for a complete end-to-end user experience.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-101

#### 6.1.3.2 Dependency Reason

The push notification infrastructure (FCM) and patterns established in this story are required to notify technicians of new messages.

## 6.2.0.0 Technical Dependencies

- A configured and deployed WebSocket service for real-time communication.
- Integration with Firebase Cloud Messaging (FCM) for push notifications.
- A backend service (microservice) to handle chat authentication, message routing, and persistence.

## 6.3.0.0 Data Dependencies

- A database schema to store chat messages, including service_request_id, sender_id, message content, and timestamps.
- Access to user and technician profile data to display names in the chat UI.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) service must be operational.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 latency for message delivery (sender to receiver's screen) must be under 2 seconds on a stable 4G/Wi-Fi connection.
- Opening a chat screen with a history of <100 messages should load in under 1 second.

## 7.2.0.0 Security

- All chat communication must be encrypted in transit using Secure WebSockets (WSS) with TLS 1.3.
- WebSocket connections must be authenticated using the user's JWT access token.
- The backend must perform authorization checks to ensure a user can only access chats for service requests they are part of.
- Chat messages stored at rest must be encrypted.

## 7.3.0.0 Usability

- The chat interface should follow common messaging app conventions to be immediately intuitive to users.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must be fully functional on supported iOS (14.0+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires backend implementation of a WebSocket server.
- State management on the client-side (React Native) to handle real-time updates.
- Implementation of a reliable push notification flow for when the app is in the background or closed.
- Handling of network interruptions and message retry logic.

## 8.3.0.0 Technical Risks

- Scalability of the WebSocket service under high load (many concurrent connections).
- Reliability of push notification delivery across different Android device manufacturers and iOS versions.
- Potential for message duplication if retry logic is not implemented carefully.

## 8.4.0.0 Integration Points

- Authentication Service (Azure AD B2C) for JWT validation.
- Service Request Service to fetch ticket details and status.
- Notification Service (FCM).
- Primary Database (PostgreSQL) for message persistence.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- End-to-end conversation between a technician and a customer.
- Receiving a push notification while the app is closed, opening it, and seeing the message.
- Sending/receiving messages during intermittent network connectivity.
- Verifying that chat is disabled for a closed ticket.
- Attempting to access a chat for a service request not assigned to the technician (negative security test).

## 9.3.0.0 Test Data Needs

- Test accounts for one Technician and one Customer.
- An active service request assigned from the Customer to the Technician.
- A closed/resolved service request assigned to the same Technician.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit tests.
- Supertest for backend API tests.
- Playwright or a similar tool for E2E testing of the mobile app.
- A WebSocket client tool for testing the backend service directly.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for new code meets the project standard (e.g., 80%).
- Successful E2E test simulating a conversation between a technician and a customer.
- UI/UX has been reviewed and approved by the design team.
- Performance criteria for message delivery have been verified.
- Security review of the WebSocket authentication and authorization logic is complete.
- Relevant documentation (API specs, user guides) has been updated.
- The feature is deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The backend WebSocket service is a foundational piece and should be prioritized.
- This story should be developed in the same sprint as its customer-facing counterpart, US-045, to enable end-to-end testing.
- Requires coordination between backend and mobile frontend developers.

## 11.4.0.0 Release Impact

This is a key feature for improving user engagement and service quality. It is a major component of the service request management module.

