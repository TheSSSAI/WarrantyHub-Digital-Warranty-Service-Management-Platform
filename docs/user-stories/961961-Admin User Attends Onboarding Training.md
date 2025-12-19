# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-094 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Admin User Attends Onboarding Training |
| As A User Story | As a new Brand or Service Center Admin, I want to ... |
| User Persona | A newly onboarded Brand Administrator or Service C... |
| Business Value | Reduces the learning curve for new administrative ... |
| Functional Area | User Onboarding & Training |
| Story Theme | Transition & User Enablement |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

New Admin Receives Training Invitation

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a new Brand Admin or Service Center Admin account has been approved and activated by a Super Admin

### 3.1.5 When

the system's new admin onboarding workflow is triggered

### 3.1.6 Then

an automated email invitation for an upcoming instructor-led virtual training session is sent to the new admin's registered email address within 24 hours.

### 3.1.7 Validation Notes

Verify that the email is sent via Azure Communication Services and received in a test inbox. The email content must match the approved template.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Training Invitation Content Verification

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a new admin has received the training invitation email

### 3.2.5 When

they open the email

### 3.2.6 Then

the email clearly states the purpose of the training, the scheduled date and time (including timezone), the expected duration, a high-level agenda of topics to be covered, and a valid, clickable link to join the virtual session (e.g., Microsoft Teams, Zoom).

### 3.2.7 Validation Notes

Manually inspect the email template for all required information. Click the link to ensure it directs to the correct virtual meeting platform.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Admin Attends Role-Specific Training

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

an admin has joined the virtual training session

### 3.3.5 When

the training is conducted by the instructor

### 3.3.6 Then

the content delivered is specific to their role (e.g., Brand Admins are trained on analytics and dispute management; Service Center Admins are trained on ticket and technician management).

### 3.3.7 Validation Notes

This is a process validation. The training curriculum must be documented and reviewed to confirm role-specific content exists. QA may attend a dry-run session.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Admin Receives Post-Training Follow-up Materials

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

an admin has attended the training session

### 3.4.5 When

the session has concluded

### 3.4.6 Then

the admin receives a follow-up email within 48 hours containing a link to the session recording, a copy of the presentation slides, and a direct link to the 'Help' section within their portal.

### 3.4.7 Validation Notes

Verify the automated or manual process for sending follow-up materials. Check that the email is received and all links are valid.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Handling Missed or Rescheduled Sessions

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

a new admin cannot attend the scheduled training session

### 3.5.5 When

they follow the instructions provided in the invitation for rescheduling or assistance

### 3.5.6 Then

they are directed to a process (e.g., contact support, view a calendar of future sessions) that allows them to either register for a future session or access a pre-recorded version of the training.

### 3.5.7 Validation Notes

Verify the process for handling rescheduling requests is documented and functional. The invitation email must contain clear instructions for this flow.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Branded HTML email template for training invitations.
- Branded HTML email template for post-training follow-up.

## 4.2.0 User Interactions

- User clicks a link in an email to join a virtual meeting.
- User follows instructions in an email to request rescheduling.

## 4.3.0 Display Requirements

- Email must clearly display training date, time, duration, agenda, and join link.

## 4.4.0 Accessibility Needs

- Email templates must be accessible (e.g., proper color contrast, alt text for images, semantic HTML).

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'All new Brand and Service Center Admins must be invited to an onboarding training session.', 'enforcement_point': 'Upon successful creation and activation of a new Brand or Service Center Admin account.', 'violation_handling': 'The system should log a failure and trigger an alert to the operations/onboarding team if an invitation email fails to send.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-002

#### 6.1.1.2 Dependency Reason

The approval of a new brand is the event that creates the Brand Admin who needs training.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-005

#### 6.1.2.2 Dependency Reason

The approval of a new service center is the event that creates the Service Center Admin who needs training.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-093

#### 6.1.3.2 Dependency Reason

A 'Help' section with training materials must exist to be linked to in the follow-up communication.

## 6.2.0.0 Technical Dependencies

- Azure Communication Services for sending transactional emails.
- A third-party virtual meeting platform (e.g., Microsoft Teams, Zoom) for hosting the sessions.

## 6.3.0.0 Data Dependencies

- Access to the newly created admin user's profile, specifically their name and registered email address.

## 6.4.0.0 External Dependencies

- The internal Training or Customer Success team responsible for creating the training curriculum, scheduling sessions, and conducting the training.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The email invitation should be triggered and sent within 5 minutes of a new admin account being activated.

## 7.2.0.0 Security

- Virtual meeting links should be unique per session and managed securely to prevent unauthorized access.

## 7.3.0.0 Usability

- The process of receiving an invitation and joining the training must be simple and require minimal steps.

## 7.4.0.0 Accessibility

- Email communications must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Email templates must render correctly across major email clients (e.g., Outlook, Gmail, Apple Mail).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- This is primarily a process automation and coordination task, not a complex software feature.
- Effort involves creating email templates and setting up a trigger-based email dispatch.
- Coordination with the non-technical training team is required.

## 8.3.0.0 Technical Risks

- Potential for email delivery issues (spam filters).
- Manual scheduling process could be error-prone if not well-defined.

## 8.4.0.0 Integration Points

- The user management service must trigger the notification service upon new admin creation.
- Notification service integrates with Azure Communication Services.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Integration
- End-to-End (E2E)

## 9.2.0.0 Test Scenarios

- Verify the E2E flow: Super Admin approves a new Brand Admin, and the Brand Admin receives the correct email invitation.
- Verify the E2E flow for a new Service Center Admin.
- Test the validity of all links within the invitation and follow-up emails.
- Manually verify the process for rescheduling a session.

## 9.3.0.0 Test Data Needs

- Test admin accounts with valid, accessible email inboxes.
- A sample training schedule and valid meeting links for testing.

## 9.4.0.0 Testing Tools

- Email testing tool (e.g., Mailtrap, Litmus) to verify template rendering and delivery.
- Test automation framework (e.g., Cypress) could potentially be used to trigger the admin creation via API to start the process.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Email templates for invitation and follow-up are created, approved, and implemented
- Automated trigger for sending the invitation email is implemented and tested
- The process for scheduling, conducting, and managing training sessions is documented and agreed upon with the training team
- The E2E process has been successfully tested in the staging environment
- Documentation for the training process is created for internal teams

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is critical for the go-live readiness of the platform.
- Requires cross-functional collaboration with the Training/Customer Success team, which must be scheduled in advance.
- Should be completed before the first pilot brands are onboarded.

## 11.4.0.0 Release Impact

Enables the successful onboarding of the first set of administrative users, which is a prerequisite for pilot launch.

