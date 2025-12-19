# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-098 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Service Center Admin Communicates with User via In... |
| As A User Story | As a Service Center Admin, I want to send and rece... |
| User Persona | Service Center Admin: A user responsible for manag... |
| Business Value | Improves first-time fix rates by allowing admins t... |
| Functional Area | Service Request Module |
| Story Theme | Service Ticket Communication |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Admin can access and view the chat interface for a service ticket

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a Service Center Admin is logged into the web panel and has navigated to the details page of an open service request

### 3.1.5 When

the admin views the page

### 3.1.6 Then

a chat interface/component is visible, displaying any existing conversation history for that ticket.

### 3.1.7 Validation Notes

Verify the chat component renders correctly on the ticket details page. The conversation history should be loaded and displayed in chronological order.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Admin successfully sends a message to the user

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the admin is viewing the chat interface for an open service ticket

### 3.2.5 When

the admin types a message into the text input field and clicks the 'Send' button

### 3.2.6 Then

the message instantly appears in the chat history, aligned to indicate it was sent by the admin, and includes a timestamp.

### 3.2.7 Validation Notes

The message must be persisted to the database and sent via WebSocket to the user's client. The UI should update optimistically.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Admin receives a real-time message from the user

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the admin has the chat interface for a service ticket open

### 3.3.5 When

the user sends a message related to that ticket from their mobile app

### 3.3.6 Then

the new message appears in the admin's chat window in near real-time without requiring a page refresh.

### 3.3.7 Validation Notes

Test the WebSocket connection to ensure messages from the user are pushed to and rendered in the admin's web panel.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Admin sees a notification for a new message on the dashboard

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the admin is on the main service request dashboard and not viewing the specific ticket

### 3.4.5 When

a user sends a new message for one of the tickets in the list

### 3.4.6 Then

a visual indicator (e.g., a notification badge with a count of unread messages) appears on that ticket's entry in the dashboard list.

### 3.4.7 Validation Notes

Verify that the dashboard's state updates in real-time to show the unread message indicator.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Admin cannot send an empty message

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

the admin is viewing the chat interface

### 3.5.5 When

the message input field is empty or contains only whitespace

### 3.5.6 Then

the 'Send' button is disabled and the admin cannot submit the message.

### 3.5.7 Validation Notes

Check the button's state attribute. It should be enabled only when the trimmed input field has a length greater than zero.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Chat is read-only for closed tickets

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

an admin is viewing a service ticket with a status of 'Resolved' or 'Closed'

### 3.6.5 When

the admin views the chat interface for that ticket

### 3.6.6 Then

the message input field and 'Send' button are disabled or hidden, making the chat history read-only.

### 3.6.7 Validation Notes

Verify that the UI prevents new messages from being sent on tickets in a terminal state.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Network failure during message sending

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

the admin is sending a message

### 3.7.5 When

a network error prevents the message from reaching the server

### 3.7.6 Then

the UI displays an error state for that message (e.g., a 'Failed to send' indicator) and provides an option to retry sending.

### 3.7.7 Validation Notes

Use browser developer tools to simulate network failure and verify the UI's error handling.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Chat window/panel within the service ticket view
- Scrollable message history area
- Text input field for typing messages
- Clickable 'Send' button
- Message bubbles for individual messages
- Timestamp and sender identification on each message
- Unread message indicator/badge on the main ticket list

## 4.2.0 User Interactions

- The chat window should automatically scroll to the most recent message upon opening or when a new message arrives.
- Pressing 'Enter' in the text input field should send the message as an alternative to clicking the 'Send' button.
- The 'Send' button should be disabled when the input field is empty.

## 4.3.0 Display Requirements

- Messages from the Service Center Admin should be visually distinct from messages from the User (e.g., different background color, right-aligned vs. left-aligned).
- Timestamps should be displayed in a user-friendly format (e.g., 'HH:MM AM/PM').

## 4.4.0 Accessibility Needs

- All chat elements (input field, send button, message list) must be keyboard accessible.
- Input fields must have associated labels for screen readers.
- New incoming messages should be announced by screen readers using ARIA live regions.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-CHAT-01

### 5.1.2 Rule Description

Communication via chat is only permitted on service tickets with an active status (e.g., 'Requested', 'Acknowledged', 'Technician Assigned', 'Work In Progress').

### 5.1.3 Enforcement Point

Backend API and Frontend UI

### 5.1.4 Violation Handling

The API will reject message submissions for closed tickets. The UI will disable the chat input for these tickets.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-CHAT-02

### 5.2.2 Rule Description

All chat messages associated with a service ticket must be retained for 2 years after ticket closure.

### 5.2.3 Enforcement Point

Data Retention Policy / Database

### 5.2.4 Violation Handling

A scheduled job or database policy will handle the archival or deletion of data older than the retention period. No manual deletion is allowed.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

This is the user-facing counterpart. The core chat service and database schema must be built to support both sides of the conversation.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-046

#### 6.1.2.2 Dependency Reason

The Service Center Admin's dashboard and ticket detail view must exist to provide the context and location for the chat interface.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-099

#### 6.1.3.2 Dependency Reason

The backend event generated by this story (sending a message) is the trigger for the user push notification.

## 6.2.0.0 Technical Dependencies

- A configured and running WebSocket service for real-time communication.
- Azure Service Bus for queuing notifications asynchronously.
- Azure Active Directory B2C for authenticating the admin's session.
- A database schema for storing messages linked to service tickets.

## 6.3.0.0 Data Dependencies

- Requires access to service ticket data to associate conversations correctly.
- Requires access to user and admin profile data to identify message senders.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Message delivery latency (from sender client to receiver client) must be under 2 seconds under normal load.
- Loading the chat history for a ticket with up to 100 messages should take less than 500ms.

## 7.2.0.0 Security

- All chat communication must be encrypted in transit using WSS (Secure WebSockets) with TLS 1.2+.
- All chat messages must be encrypted at rest in the database.
- All message content must be sanitized on the backend to prevent Cross-Site Scripting (XSS) attacks.
- The API must enforce that an admin can only access chats for tickets belonging to their assigned service center.

## 7.3.0.0 Usability

- The chat interface should be intuitive and follow common messaging application conventions.

## 7.4.0.0 Accessibility

- The feature must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## 7.5.0.0 Compatibility

- The web panel interface must be fully functional on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires both backend (WebSocket service, API endpoints, database schema) and frontend (UI components, real-time state management) development.
- Implementing a scalable and resilient real-time messaging system is inherently more complex than standard REST APIs.
- Ensuring reliable message delivery and handling connection interruptions adds complexity.

## 8.3.0.0 Technical Risks

- Potential for performance bottlenecks in the WebSocket server under high concurrent connections.
- Complexity in managing client-side state for real-time updates without introducing bugs or memory leaks.

## 8.4.0.0 Integration Points

- WebSocket Service: For sending and receiving messages.
- Service Ticket API: For fetching ticket details and conversation history.
- Notification Service (Azure Service Bus -> FCM): To trigger push notifications to the user's mobile app.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Admin sends a message, user receives it on mobile.
- User sends a message, admin receives it on web panel.
- Chat history loads correctly upon opening a ticket.
- Sending a message on a closed ticket fails.
- Unread message indicator appears and disappears correctly.
- Simulate network disconnect and reconnect to test message queueing/resending.

## 9.3.0.0 Test Data Needs

- Test accounts for a Service Center Admin and a regular User.
- Service tickets in various states (Open, Acknowledged, Closed).
- Tickets with no chat history and tickets with extensive chat history.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Cypress for E2E testing of the web panel.
- Postman or similar tool for testing WebSocket connections.
- Appium or similar for mobile E2E tests (verifying user side).

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >= 80% coverage
- Integration testing between web panel, backend service, and mobile client completed successfully
- User interface reviewed and approved by UX/Product Owner
- Performance requirements for message latency verified
- Security requirements validated (XSS protection, authorization checks)
- API documentation for chat endpoints is updated
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story has a dependency on the user-side chat story (US-041) and the core WebSocket infrastructure. It should be planned concurrently or immediately after.
- Requires a developer with experience in both frontend real-time state management (e.g., with libraries like Socket.IO client, or custom hooks) and backend WebSocket implementation.

## 11.4.0.0 Release Impact

This is a core feature for improving the operational efficiency of service centers and is critical for a positive user experience. It is a key component of the service request management flow.

