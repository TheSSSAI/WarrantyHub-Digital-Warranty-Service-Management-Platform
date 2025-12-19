# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-097 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician Communicates with User via In-App Chat |
| As A User Story | As a Technician, I want to send and receive in-app... |
| User Persona | Technician |
| Business Value | Improves customer satisfaction through timely comm... |
| Functional Area | Service Request Management |
| Story Theme | In-App Communication |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Technician successfully sends a message to the user

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a Technician logged into the mobile app and am viewing the details of an active, assigned service request

### 3.1.5 When

I type a message into the chat input field and tap the 'Send' button

### 3.1.6 Then

The message immediately appears in my chat history with a 'sending' indicator, which then updates to a 'delivered' status.

### 3.1.7 And

The chat input field is cleared.

### 3.1.8 Validation Notes

Verify the message is persisted in the database and the user receives it in real-time via WebSocket. The UI should update optimistically.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Technician views the conversation history for a service request

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a Technician viewing a service request that has a pre-existing chat history

### 3.2.5 When

I open the chat interface for that service request

### 3.2.6 Then

I can view the full conversation history in chronological order.

### 3.2.7 And

Each message is clearly attributed to its sender (e.g., 'You', 'Customer', 'Service Center') and includes a timestamp.

### 3.2.8 Validation Notes

Test with a conversation involving all three potential parties (Technician, User, Service Center Admin) to ensure correct attribution.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Technician attempts to send a message while offline

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a Technician in the chat interface, but my device has no network connectivity

### 3.3.5 When

I type a message and tap 'Send'

### 3.3.6 Then

The message appears in my chat history with a 'Failed to send' status.

### 3.3.7 And

The message content is preserved in the input field or in the failed message bubble.

### 3.3.8 Validation Notes

Use device settings or a network simulator to disable connectivity and verify the app's behavior and retry mechanism.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Technician attempts to send an empty message

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am a Technician in the chat interface for a service request

### 3.4.5 When

I attempt to tap the 'Send' button when the input field is empty or contains only whitespace

### 3.4.6 Then

The 'Send' button is visually disabled and non-functional.

### 3.4.7 Validation Notes

Verify that the button's state updates correctly based on the input field's content.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Technician views chat for a resolved or closed service request

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am a Technician viewing a service request with a status of 'Resolved' or 'Closed'

### 3.5.5 When

I navigate to the chat interface for that ticket

### 3.5.6 Then

I can view the complete chat history.

### 3.5.7 And

A clear message is displayed, such as 'Messaging is disabled for closed tickets.'

### 3.5.8 Validation Notes

Check this for both 'Resolved' and 'Closed' statuses to ensure the rule is applied consistently.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A chat icon or button on the job details screen.
- A scrollable message history view with distinct message bubbles for sent and received messages.
- A text input field for composing messages.
- A 'Send' button.
- Timestamps and sender attribution for each message.
- Status indicators for messages (sending, delivered, failed).

## 4.2.0 User Interactions

- Tapping the chat icon opens the full-screen chat interface.
- The keyboard should appear automatically when the chat screen is opened.
- The message list should automatically scroll to the most recent message.
- Tapping a 'retry' option on a failed message should attempt to resend it.

## 4.3.0 Display Requirements

- The header of the chat screen should display the service request ID and the customer's name.
- Messages should wrap correctly and handle multi-line text.

## 4.4.0 Accessibility Needs

- Input fields and buttons must have proper labels for screen readers.
- Sufficient color contrast between message bubbles and background, and text and bubble color.
- The interface should be navigable using accessibility tools.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-CHAT-001

### 5.1.2 Rule Description

Communication via chat is only permitted for service tickets with an active (non-terminal) status.

### 5.1.3 Enforcement Point

Backend API and Frontend UI

### 5.1.4 Violation Handling

The API will reject message submissions for closed tickets with a 403 Forbidden error. The UI will disable the input controls.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-CHAT-002

### 5.2.2 Rule Description

All chat messages associated with a service ticket must be retained for 2 years after ticket closure, as per SRS 3.4.

### 5.2.3 Enforcement Point

Backend Data Retention Policy

### 5.2.4 Violation Handling

N/A - This is a system retention requirement.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-052

#### 6.1.1.2 Dependency Reason

The chat interface must be accessed from the Technician's job details screen.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

This story is the technician-side of the chat feature. The user-side (US-041) and the underlying backend service must be developed concurrently to enable a two-way conversation.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-099

#### 6.1.3.2 Dependency Reason

For the chat to be effective, the user must be notified of new messages via push notifications, which is covered in US-099.

## 6.2.0.0 Technical Dependencies

- A backend messaging microservice capable of handling real-time communication via Secure WebSockets (WSS).
- Authentication service to issue and validate JWTs for securing WebSocket connections.
- Integration with the push notification service (FCM via Azure Communication Services).

## 6.3.0.0 Data Dependencies

- Access to service request data to link chats to the correct ticket and participants (User, Technician, Service Center).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Real-time message delivery (user-to-user latency) should be under 2 seconds under normal network conditions.
- The chat history for a ticket with up to 100 messages should load in under 1 second.

## 7.2.0.0 Security

- All chat communication must be encrypted in transit using WSS (TLS 1.2+).
- The backend must enforce strict authorization, ensuring a technician can only access chats for service requests explicitly assigned to them.
- No Personally Identifiable Information (PII) other than the sender's role ('Customer', 'Technician') should be exposed without authorization.

## 7.3.0.0 Usability

- The chat interface should feel familiar and intuitive, following common mobile messaging app conventions.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must be fully functional on supported versions of iOS (14+) and Android (8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires implementation of a real-time communication layer using WebSockets, which is more complex than standard REST APIs.
- Requires careful state management on the client-side to handle message statuses (sending, delivered, failed) and offline scenarios.
- Backend authorization logic for WebSocket 'rooms' or 'channels' must be robust to prevent data leakage between tickets.

## 8.3.0.0 Technical Risks

- Managing WebSocket connections at scale can be challenging. Connection stability and reconnection logic must be solid.
- Potential for synchronization issues if a user is interacting with the chat on multiple devices.

## 8.4.0.0 Integration Points

- Backend Messaging Service (via WebSockets)
- Backend Service Request Service (to fetch ticket details and participants)
- Backend Notification Service (to trigger push notifications)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Security

## 9.2.0.0 Test Scenarios

- A full conversation between a Technician and a User.
- A three-way conversation involving the Service Center Admin.
- Sending and receiving messages while the app is in the foreground and background.
- Losing and regaining network connectivity during a chat session.
- Attempting to access a chat for an unassigned service request (should be denied).

## 9.3.0.0 Test Data Needs

- Test accounts for a Technician, a User, and a Service Center Admin.
- An active service request assigned to the test technician and owned by the test user.
- A closed/resolved service request for testing disabled chat functionality.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- Jest for backend unit tests.
- A WebSocket client testing tool (e.g., Postman) for API-level testing.
- Cypress or Appium for E2E automated testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with at least 80% code coverage and all are passing
- E2E automated test for a basic two-way conversation is created and passing
- User interface reviewed and approved by the UX/UI designer
- Backend API endpoints and WebSocket gateway are documented
- Security review completed to ensure chat authorization is correctly implemented
- Feature is successfully deployed and verified in the staging environment on both iOS and Android
- No regressions introduced to existing functionality

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The backend messaging service is a prerequisite and may need to be its own technical story if it doesn't exist.
- This story should be planned in the same sprint as US-041 (User chat) to allow for effective integration testing.

## 11.4.0.0 Release Impact

This is a major user-facing feature that significantly enhances the value proposition of the platform. It should be highlighted in release notes.

