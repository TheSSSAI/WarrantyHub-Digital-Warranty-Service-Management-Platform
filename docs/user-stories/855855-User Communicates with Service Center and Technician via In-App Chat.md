# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-041 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Communicates with Service Center and Technici... |
| As A User Story | As a User with an active service request, I want t... |
| User Persona | Consumer (End-User who raised the service request) |
| Business Value | Improves customer satisfaction by providing a conv... |
| Functional Area | Service Request Management |
| Story Theme | Real-Time Communication |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User successfully sends a message in the chat

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the User is logged in and has an active service request with an assigned Service Center

### 3.1.5 When

the User navigates to the service request details and opens the chat interface, types a message, and taps 'Send'

### 3.1.6 Then

the message immediately appears in the chat UI with a 'Sent' status and a timestamp, and is delivered to the other participants (Service Center/Technician).

### 3.1.7 Validation Notes

Verify the message appears in the User's UI and is received in the backend system, ready for the Service Center/Technician to view.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User successfully receives a message in the chat

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the User is logged in and has the app open on the service request chat screen

### 3.2.5 When

the Service Center or assigned Technician sends a message for that service request

### 3.2.6 Then

the new message appears in the chat UI, displaying the sender's role (e.g., 'Service Center') and a timestamp.

### 3.2.7 Validation Notes

Simulate a message sent from a Service Center/Technician test account and verify it appears in real-time on the User's device.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Chat history is persistent and loads correctly

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a chat conversation with multiple messages already exists for a service request

### 3.3.5 When

the User closes and reopens the app, or navigates away from and back to the chat screen

### 3.3.6 Then

the complete chat history for that ticket is loaded and displayed in the correct chronological order.

### 3.3.7 Validation Notes

Verify that after an app restart, the full conversation is present. Test with a conversation of 50+ messages to check for performance.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User receives a push notification for a new message when the app is in the background

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the User is logged in but the application is in the background or closed

### 3.4.5 When

a new message is sent by the Service Center or Technician

### 3.4.6 Then

the User receives a push notification on their device, and tapping it opens the app directly to the relevant chat screen.

### 3.4.7 Validation Notes

This is dependent on US-099. Test on both iOS and Android. Verify deep linking functionality.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to send a message while offline

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

the User is on the chat screen but the device has no network connectivity

### 3.5.5 When

the User types and attempts to send a message

### 3.5.6 Then

the message appears in the UI with a 'Failed to send' status, and an option to 'Retry' is available.

### 3.5.7 Validation Notes

Use network throttling tools or airplane mode to simulate offline conditions. Verify the retry mechanism works once connectivity is restored.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempting to send an empty message

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

the User is on the chat screen

### 3.6.5 When

the User taps the 'Send' button while the message input field is empty

### 3.6.6 Then

the 'Send' button should be disabled or non-responsive, and no message is sent.

### 3.6.7 Validation Notes

Verify the state of the 'Send' button. It should be disabled when the input is empty and enabled when it contains text.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Chat is specific to a single service request

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

the User has two separate active service requests

### 3.7.5 When

the User opens the chat for the first service request

### 3.7.6 Then

only the conversation for that specific request is visible.

### 3.7.7 Validation Notes

Check that there is no data leakage or crossover between conversations for different service tickets.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A chat icon or button on the service request details screen.
- A message list view displaying conversation history.
- A text input field for composing messages.
- A 'Send' button, which is disabled when the input field is empty.
- Timestamps for each message.
- Sender identification (e.g., 'You', 'Service Center', 'Technician: [Name]').

## 4.2.0 User Interactions

- User's messages are right-aligned; incoming messages are left-aligned.
- The message list automatically scrolls to the bottom when a new message is sent or received.
- The text input field should support multi-line text.
- Tapping on the chat icon opens the full-screen chat interface.

## 4.3.0 Display Requirements

- An unread message indicator must be shown on the service request list item.
- The header of the chat screen should display the service request ID and/or product name.

## 4.4.0 Accessibility Needs

- All UI elements (buttons, input fields) must have proper labels for screen readers.
- Sufficient color contrast between text and background in the chat bubbles.
- The chat interface must be navigable using keyboard or accessibility controls.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Chat functionality is only available for service requests with a status of 'Requested' or higher, and not for 'Resolved/Closed' tickets unless a dispute is initiated.

### 5.1.3 Enforcement Point

The chat entry point in the UI should be disabled or hidden for closed tickets.

### 5.1.4 Violation Handling

API requests to send messages to a closed ticket's chat channel should be rejected with an error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

As per SRS 3.4, all chat messages must be retained for 2 years after ticket closure for audit and dispute resolution.

### 5.2.3 Enforcement Point

Backend data retention policy.

### 5.2.4 Violation Handling

N/A - System design requirement.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-037

#### 6.1.1.2 Dependency Reason

A service request must exist to have a chat associated with it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-040

#### 6.1.2.2 Dependency Reason

The chat interface is accessed from the service request tracking/details screen.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-048

#### 6.1.3.2 Dependency Reason

The system needs to know which Service Center and/or Technician to route messages to.

## 6.2.0.0 Technical Dependencies

- Backend WebSocket service for real-time communication (as per SRS 4.3).
- Firebase Cloud Messaging (FCM) integration for push notifications (as per SRS 4.3).
- Database schema to store messages with foreign keys to service_requests, users, technicians, and service_centers.

## 6.3.0.0 Data Dependencies

- Requires a valid Service Request ID to initialize a chat channel.
- Requires authenticated User, Service Center, and Technician IDs to manage participants.

## 6.4.0.0 External Dependencies

- Firebase Cloud Messaging (FCM) service must be available and configured.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 message delivery latency (client-to-client) must be under 2 seconds.
- Loading a chat history of up to 200 messages should take less than 1 second.

## 7.2.0.0 Security

- All communication must use Secure WebSockets (WSS) with TLS 1.2+ encryption.
- All chat data must be encrypted at rest.
- API must enforce authorization, ensuring a user can only access chats for their own service requests.

## 7.3.0.0 Usability

- The chat interface should be intuitive and follow common design patterns of popular messaging applications.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Must function correctly on supported iOS (14+) and Android (8.0+) versions.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

High

## 8.2.0.0 Complexity Factors

- Requires implementation of a real-time messaging backend using WebSockets, which is more complex than standard REST APIs.
- Managing the WebSocket connection lifecycle on the mobile client (reconnection logic, offline handling).
- Complex state management on the client to handle real-time updates.
- Integration with a push notification service for offline messaging.

## 8.3.0.0 Technical Risks

- Scalability of the WebSocket server under high load (many concurrent connections).
- Ensuring reliable message delivery and order across different network conditions.
- Battery consumption on mobile devices due to persistent connections.

## 8.4.0.0 Integration Points

- Backend User Authentication Service (Azure AD B2C).
- Backend Service Request Service.
- External FCM Push Notification Service.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- A full conversation between a User and a Service Center Admin.
- A full conversation between a User and a Technician after assignment.
- Receiving messages while the app is open, in the background, and closed.
- Chat functionality during network interruptions and recovery.
- Verifying chat history is correctly loaded after logging out and back in.

## 9.3.0.0 Test Data Needs

- Test accounts for each role: User, Service Center Admin, Technician.
- Multiple service requests in various states (e.g., 'Acknowledged', 'Technician Assigned').

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit/integration tests.
- Detox or Appium for mobile E2E testing.
- A WebSocket client tool (e.g., Postman) for backend API testing.
- Load testing tools capable of simulating thousands of concurrent WebSocket connections.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new logic
- Integration testing between mobile client, WebSocket server, and database completed successfully
- E2E test scenario for a complete conversation is automated and passing
- User interface reviewed and approved by UX/UI designer
- Performance requirements for message latency and history loading are verified
- Security requirements (WSS, authorization) validated via code review and testing
- Documentation for the chat service API is updated
- Story deployed and verified in staging environment by QA on both iOS and Android devices

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

13

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be developed in parallel with US-097 (Technician Chat) and US-098 (Service Center Chat) as they share the same backend infrastructure.
- The initial setup of the WebSocket server and infrastructure should be considered a foundational task for this feature and may need to be a separate technical spike or story.

## 11.4.0.0 Release Impact

This is a major user-facing feature that significantly enhances the value proposition of the platform. It is a key component for the initial release.

