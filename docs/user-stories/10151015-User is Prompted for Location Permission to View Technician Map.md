# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-121 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User is Prompted for Location Permission to View T... |
| As A User Story | As a User with an active service request, I want t... |
| User Persona | The 'User' (Consumer) who has raised a service req... |
| Business Value | Ensures compliance with platform policies (Apple, ... |
| Functional Area | User Mobile App - Service Request Tracking |
| Story Theme | Real-Time Service Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User grants location permission on first request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is on the service request details screen for a job where the technician is in 'Travel Mode', and the app has not yet requested location permission

### 3.1.5 When

The user taps the 'Track Technician' button

### 3.1.6 Then

The native OS permission dialog for location services is displayed, showing a clear purpose string like 'This app uses your location to display the technician on the map and calculate their ETA.'

### 3.1.7 Validation Notes

Verify on both iOS and Android. The app should request 'While Using the App' permission, not 'Always'. After granting, the map view should load.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: User denies location permission on first request

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

The user is presented with the native OS location permission dialog for the first time

### 3.2.5 When

The user selects 'Don't Allow' or denies the permission

### 3.2.6 Then

The permission dialog is dismissed, and the user is shown an in-app message (e.g., a modal or a toast) explaining that the feature cannot function without location permission and providing guidance on how to enable it later in the device's settings.

### 3.2.7 Validation Notes

The user should be returned to the previous screen, and the map should not be displayed. The message must be user-friendly and helpful.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Edge Case: User attempts to use the feature after previously denying permission

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

The user has previously denied location permission for the app

### 3.3.5 When

The user taps the 'Track Technician' button again

### 3.3.6 Then

The native OS permission dialog is NOT displayed (as per OS behavior), and the in-app message with instructions to enable permission in settings is shown immediately.

### 3.3.7 Validation Notes

Test this by denying permission, closing and reopening the app, and trying again. The app should gracefully handle the 'permanently denied' state.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Edge Case: Device-wide location services are disabled

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

The user has disabled location services for the entire device in the system settings

### 3.4.5 When

The user taps the 'Track Technician' button

### 3.4.6 Then

The app displays an in-app message informing the user that device-wide location services must be enabled to use this feature, ideally providing a shortcut to the relevant device settings page.

### 3.4.7 Validation Notes

This state should be checked before attempting to request app-specific permission. The app should not crash.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Native OS Permission Dialog (iOS/Android)
- In-app modal or non-intrusive banner for fallback messages

## 4.2.0 User Interactions

- User taps a button to trigger the permission flow.
- User interacts with the native OS dialog to grant or deny permission.
- User can dismiss the fallback message.

## 4.3.0 Display Requirements

- The purpose string in the native dialog must clearly explain why location is needed.
- Fallback messages must clearly explain the consequence of denying permission and provide actionable instructions.

## 4.4.0 Accessibility Needs

- All text in fallback messages must be compatible with screen readers (e.g., VoiceOver, TalkBack).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The application must obtain explicit user consent before accessing device location services.

### 5.1.3 Enforcement Point

Before the first attempt to access location data for the technician tracking feature.

### 5.1.4 Violation Handling

The feature is disabled, and a user-friendly explanation is provided.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

The application must only request 'When In Use' location permission, not 'Always'.

### 5.2.3 Enforcement Point

During the native permission request configuration.

### 5.2.4 Violation Handling

App store rejection or user distrust. This is a strict implementation requirement.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-054

#### 6.1.1.2 Dependency Reason

The technician must be able to activate 'Travel Mode' for the user-facing tracking feature to be relevant.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-040

#### 6.1.2.2 Dependency Reason

Requires the service request tracking screen to exist, which contains the entry point (e.g., 'Track Technician' button) for this flow.

## 6.2.0.0 Technical Dependencies

- Native mobile OS (iOS/Android) APIs for permission handling.
- A library for abstracting permission requests in React Native (e.g., react-native-permissions).

## 6.3.0.0 Data Dependencies

- The service request status must be available to the app to determine if the technician is in 'Travel Mode'.

## 6.4.0.0 External Dependencies

- Adherence to Apple App Store and Google Play Store guidelines on location permissions.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The permission prompt should appear instantly (<200ms) after the user action.

## 7.2.0.0 Security

- The app must not attempt to access location data if permission is not explicitly granted.
- The scope of permission requested must be the minimum necessary for the feature to function ('When In Use').

## 7.3.0.0 Usability

- The reason for the permission request must be clear, concise, and written in plain language to maximize user understanding and acceptance.

## 7.4.0.0 Accessibility

- Compliant with WCAG 2.1 Level AA for all in-app UI elements related to this flow.

## 7.5.0.0 Compatibility

- Must be fully functional on supported OS versions: iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires handling platform-specific code/configuration for iOS (Info.plist) and Android (AndroidManifest.xml).
- Managing the different permission states (not-determined, granted, denied, restricted) within the app's state.
- Testing requires physical devices and manipulation of system settings.

## 8.3.0.0 Technical Risks

- Changes in future OS versions could deprecate current permission APIs, requiring maintenance.
- Incorrectly configured purpose strings can lead to app store rejection.

## 8.4.0.0 Integration Points

- Integrates with the mobile device's operating system for the permission dialog.
- Acts as a gatekeeper for the map component detailed in US-072.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Manual Integration
- E2E

## 9.2.0.0 Test Scenarios

- Fresh install: Grant permission and verify map loads.
- Fresh install: Deny permission and verify fallback message appears.
- Previously denied: Verify prompt does not reappear and fallback message is shown.
- Device location off: Verify correct fallback message is shown.
- Permission granted via settings: Verify feature works after enabling permission manually.

## 9.3.0.0 Test Data Needs

- A test user account with an active service request where the technician can be put into 'Travel Mode'.

## 9.4.0.0 Testing Tools

- React Native testing framework (Jest) for unit tests.
- Physical devices for manual testing of OS-level interactions.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on target iOS and Android versions.
- Code reviewed and approved by team.
- Unit tests for permission state logic are implemented and passing with >80% coverage.
- Integration testing completed successfully on physical devices.
- User interface (fallback messages) reviewed and approved for clarity and UX.
- Purpose strings in Info.plist and AndroidManifest.xml are finalized and reviewed.
- Security requirement of requesting 'When In Use' permission is verified.
- Story is demonstrated to the Product Owner.
- Story deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a hard blocker for US-072 ('User Tracks Technician's Live Location on a Map') and must be completed in a preceding or the same sprint.

## 11.4.0.0 Release Impact

- Enables a key feature for the initial release. Without this, the technician tracking functionality cannot be launched.

