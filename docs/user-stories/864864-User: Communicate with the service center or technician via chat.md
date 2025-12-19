# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-045 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User: Communicate with the service center or techn... |
| As A User Story | As a User with an active service request, I want t... |
| User Persona | End-User (Consumer) |
| Business Value | Improves customer satisfaction by providing a dire... |
| Functional Area | Service Request Module |
| Story Theme | Service Request Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User sends a message in an active service request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the details of an active service request (status is not 'Resolved' or 'Closed')

### 3.1.5 When

I type a message into the chat input field and tap the 'Send' button

### 3.1.6 Then

The message immediately appears in my chat view, marked as sent by 'You' with the current timestamp. The message is successfully transmitted to the service center/technician.

### 3.1.7 Validation Notes

Verify the message appears in the UI and is received by the backend WebSocket service. The corresponding Service Center/Technician UI should display the message.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User receives a message from the service provider

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user and the app is running in the foreground or background

### 3.2.5 When

The assigned Service Center or Technician sends a message related to my active service request

### 3.2.6 Then

I receive a push notification on my device. When I open the chat, the new message is visible, marked with the sender's role (e.g., 'Service Center' or 'Technician') and a timestamp.

### 3.2.7 Validation Notes

Test push notification delivery via FCM. Verify the message appears correctly in the user's chat UI.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Chat history is persistent

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I have previously exchanged messages within a service request

### 3.3.5 When

I close and reopen the app and navigate back to that service request's chat screen

### 3.3.6 Then

The complete chat history is loaded and displayed in chronological order.

### 3.3.7 Validation Notes

Verify that messages are stored in the database and fetched correctly when the chat view is loaded.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Chat functionality is disabled for closed tickets

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am viewing a service request with a status of 'Resolved' or 'Closed'

### 3.4.5 When

I navigate to the chat screen for that request

### 3.4.6 Then

I can view the entire chat history, but the message input field and 'Send' button are disabled, and a visual indicator states 'This chat is closed'.

### 3.4.7 Validation Notes

Check UI state for tickets in a terminal status. The SRS specifies chat history is retained for 1 year.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to send a message while offline

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am in an active chat screen and my device loses internet connectivity

### 3.5.5 When

I type a message and tap 'Send'

### 3.5.6 Then

The message appears in the UI with a 'Sending...' status, which then changes to a 'Failed to send' error, and a 'Retry' option is displayed next to the message.

### 3.5.7 Validation Notes

Simulate network loss on the client device and verify the UI feedback and retry mechanism.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Tapping a chat push notification

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

My application is closed or in the background

### 3.6.5 When

I receive and tap on a push notification for a new chat message

### 3.6.6 Then

The application opens and navigates me directly to the specific chat screen for the relevant service request.

### 3.6.7 Validation Notes

Test deep linking from push notifications on both iOS and Android.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Attempting to send an empty message

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I am in an active chat screen

### 3.7.5 When

The message input field is empty and I try to tap the 'Send' button

### 3.7.6 Then

The 'Send' button is disabled and no action is taken.

### 3.7.7 Validation Notes

Verify the state of the send button based on the input field's content.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Chat message list view with distinct styles for sender and receiver (bubbles)
- Text input field for composing messages
- Send button (icon)
- Timestamp display for each message
- Sender identification (e.g., 'You', 'Service Center', 'Technician: John D.')
- Visual indicator for closed chats
- Error state indicator for failed messages with a retry option

## 4.2.0 User Interactions

- The chat view automatically scrolls to the most recent message upon opening and when a new message arrives.
- Tapping 'Send' adds the message to the view and initiates sending.
- Tapping 'Retry' on a failed message attempts to send it again.

## 4.3.0 Display Requirements

- Messages must be displayed in chronological order.
- The sender of each message must be clearly identified.
- The chat history must be retained and viewable for the life of the service request plus 1 year, as per SRS 3.4.

## 4.4.0 Accessibility Needs

- All chat elements (input, buttons, messages) must be accessible via screen readers (e.g., VoiceOver, TalkBack).
- Sufficient color contrast for text and UI elements must be maintained per WCAG 2.1 AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Chat functionality is only available for service requests in an active state (e.g., 'Requested', 'Acknowledged', 'Technician Assigned', 'Work In Progress').

### 5.1.3 Enforcement Point

Backend API and Client UI

### 5.1.4 Violation Handling

API requests to send messages to a closed ticket chat will be rejected with an error. The client UI will disable the chat input.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Only the user who raised the ticket, the assigned service center, and the assigned technician can participate in the chat.

### 5.2.3 Enforcement Point

Backend WebSocket connection authorization

### 5.2.4 Violation Handling

Unauthorized users attempting to connect to the chat's WebSocket room will be denied.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-036

#### 6.1.1.2 Dependency Reason

A service request entity must exist to associate a chat with.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

The chat interface is part of the service request details/tracking screen.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-065

#### 6.1.3.2 Dependency Reason

The system needs to know which service center and technician to route messages to.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-101

#### 6.1.4.2 Dependency Reason

The push notification infrastructure (FCM integration) must be in place to alert users of new messages.

## 6.2.0.0 Technical Dependencies

- A configured WebSocket service for real-time communication (as per SRS 4.3).
- Backend service for message persistence and business logic.
- Integration with Firebase Cloud Messaging (FCM) for push notifications.

## 6.3.0.0 Data Dependencies

- Requires access to Service Request data, User data, Service Center data, and Technician data to correctly route and display messages.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) service must be operational.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 latency for sending a message and receiving confirmation from the server should be < 500ms.
- Loading chat history for a ticket with 100 messages should take < 1 second.

## 7.2.0.0 Security

- All chat communication must be encrypted in transit using Secure WebSockets (WSS).
- Chat message content must be encrypted at rest in the database.
- Input from chat messages must be sanitized on the backend to prevent XSS attacks.

## 7.3.0.0 Usability

- The chat interface should be intuitive and follow common messaging app conventions.
- Users should receive clear and immediate feedback on message status (sending, sent, failed).

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must be fully functional on supported iOS and Android versions (SRS 2.3).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires implementation of a real-time WebSocket-based communication layer.
- Coordination is needed across three different frontends (User App, SC Panel, Tech App) to ensure a consistent experience.
- Reliable handling of offline scenarios and message synchronization adds complexity.
- Backend logic for managing chat rooms, permissions, and message persistence.

## 8.3.0.0 Technical Risks

- Scalability of the WebSocket server under high load (many concurrent connections).
- Ensuring 'exactly once' message delivery to prevent duplicates or lost messages.
- Reliability of third-party push notification services.

## 8.4.0.0 Integration Points

- Backend Service (WebSocket endpoint)
- PostgreSQL Database (for message storage)
- Firebase Cloud Messaging (FCM)
- User Mobile App (React Native)
- Service Center Web Panel (Next.js)
- Technician Mobile App (React Native)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Full E2E conversation flow: User sends message -> Technician receives and replies -> User receives reply and notification.
- Offline message sending and successful retry upon reconnection.
- Deep linking from a push notification when the app is closed.
- Verify chat is disabled on a 'Resolved' ticket.
- Attempt to access chat for a ticket not belonging to the user (security test).

## 9.3.0.0 Test Data Needs

- Test accounts for a User, a Service Center Admin, and a Technician.
- An active service request that links all three test accounts.
- A closed/resolved service request for testing disabled chat.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Playwright (Web E2E)
- Detox or Appium (Mobile E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage
- Integration testing between clients and backend WebSocket service completed successfully
- E2E test scenarios for a full conversation flow are automated and passing
- User interface reviewed and approved for all three platforms (User, SC, Tech)
- Performance requirements for message delivery are verified
- Security requirements (encryption, authorization) are validated
- Documentation for the chat service API is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story has dependencies on core service request features and notification infrastructure.
- It may be beneficial to break down the work by platform (e.g., Backend API, User App UI, Technician App UI) into smaller tasks within the same sprint.
- Requires significant E2E testing effort across multiple user roles and platforms.

## 11.4.0.0 Release Impact

This is a major user-facing feature that significantly enhances the value proposition of the service request module. It is a key feature for the initial launch.

