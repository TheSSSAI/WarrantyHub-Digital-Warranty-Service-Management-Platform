# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-122 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Technician is Prompted for Location Permission on ... |
| As A User Story | As a Technician, I want the app to request my perm... |
| User Persona | Technician using the dedicated mobile application. |
| Business Value | Ensures compliance with iOS and Android platform p... |
| Functional Area | Technician Mobile App - Service Job Management |
| Story Theme | User Permissions and Privacy |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

First-time activation of 'Travel Mode' with permission granted

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A technician is logged into the mobile app, has an assigned job, and has never activated 'Travel Mode' before

### 3.1.5 When

The technician taps the 'Activate Travel Mode' button for the first time

### 3.1.6 Then

The permission dialog closes, 'Travel Mode' is successfully activated, and the app begins sharing location data for the job.

### 3.1.7 And

The technician grants the permission

### 3.1.8 Validation Notes

Verify on both iOS and Android. After this flow, subsequent activations of 'Travel Mode' should not trigger the permission prompt.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

First-time activation of 'Travel Mode' with permission denied

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A technician is logged into the mobile app, has an assigned job, and has never activated 'Travel Mode' before

### 3.2.5 When

The technician taps the 'Activate Travel Mode' button for the first time

### 3.2.6 Then

'Travel Mode' is not activated

### 3.2.7 And

A user-friendly in-app message is displayed explaining that location permission is required to use the feature and how to enable it later in the device's settings.

### 3.2.8 Validation Notes

The in-app message should be clear and provide guidance. The 'Activate Travel Mode' button should return to its inactive state.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempting to activate 'Travel Mode' after permission was previously denied

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A technician has previously denied location permission for the app

### 3.3.5 When

The technician taps the 'Activate Travel Mode' button

### 3.3.6 Then

The native OS permission dialog is NOT shown again

### 3.3.7 And

The message includes a button/link (e.g., 'Open Settings') that deep-links the user directly to the app's permission settings page within the device's OS settings.

### 3.3.8 Validation Notes

Verify the deep link functionality works correctly on target versions of iOS and Android.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to activate 'Travel Mode' after permission was revoked in settings

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A technician had previously granted location permission but has since manually revoked it in the device's OS settings

### 3.4.5 When

The technician taps the 'Activate Travel Mode' button

### 3.4.6 Then

The system behaves exactly as described in AC-003, displaying an in-app message with a deep link to the settings page.

### 3.4.7 Validation Notes

This ensures the app gracefully handles permissions being changed outside of the application's direct flow.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Native OS Location Permission Dialog (iOS/Android)
- In-app modal/toast message for explaining denied permissions
- Button within the in-app message to deep-link to device settings

## 4.2.0 User Interactions

- User taps 'Allow' or 'Deny' on the native OS prompt.
- User taps 'Open Settings' button to be taken out of the app to the device settings screen.
- User taps 'Cancel' or 'OK' to dismiss the in-app explanation message.

## 4.3.0 Display Requirements

- The purpose string in the native OS prompt must clearly and concisely explain why location is needed.
- The in-app message for denied permissions must be user-friendly and non-technical.

## 4.4.0 Accessibility Needs

- All in-app messages and buttons must be compatible with screen readers (e.g., VoiceOver, TalkBack).

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'Location data must only be accessed after the user has explicitly granted permission.', 'enforcement_point': 'Application logic before any attempt to initialize location services.', 'violation_handling': 'The feature requiring location (Travel Mode) must fail gracefully with a user-facing explanation. The app must not crash.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-054

#### 6.1.1.2 Dependency Reason

This story implements the permission check that is triggered by the 'Activate Travel Mode' feature defined in US-054. They are tightly coupled and this story is a functional blocker for US-054.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-051

#### 6.1.2.2 Dependency Reason

Requires the 'Assigned Jobs' view from US-051 to exist, as this is where the 'Activate Travel Mode' button will be located.

## 6.2.0.0 Technical Dependencies

- React Native location services library (e.g., react-native-geolocation-service).
- React Native library for deep-linking to OS settings (e.g., Linking API).
- Correct configuration of `Info.plist` (iOS) and `AndroidManifest.xml` (Android) with appropriate permission strings.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

- Apple App Store and Google Play Store review guidelines regarding location permissions.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The permission prompt should appear instantly (<200ms) after the user action.

## 7.2.0.0 Security

- The app must not request 'Always Allow' location permission, only 'While Using the App', to adhere to the principle of least privilege.

## 7.3.0.0 Usability

- The reason for the permission request must be clear and directly related to the user's current action to maximize the grant rate.

## 7.4.0.0 Accessibility

- Compliant with WCAG 2.1 Level AA for all custom UI elements (e.g., the in-app message).

## 7.5.0.0 Compatibility

- Must be fully functional on supported OS versions: iOS 14+ and Android 8.0+.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Standard, well-documented mobile development pattern.
- Requires handling of different permission states (not determined, granted, denied).
- Minor complexity in implementing the deep-link to settings, which can vary slightly between OS versions.

## 8.3.0.0 Technical Risks

- App rejection by stores if the purpose string in `Info.plist` or `AndroidManifest.xml` is missing, vague, or misleading.
- App crashing if location services are called without checking for permission status first.

## 8.4.0.0 Integration Points

- Native device OS for displaying the permission dialog.
- Native device OS for deep-linking to the settings application.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E (Manual)

## 9.2.0.0 Test Scenarios

- Fresh install: Test the 'grant' and 'deny' flows on first attempt.
- Post-denial: Test that subsequent attempts show the in-app message and that the settings link works.
- Post-grant: Test that subsequent attempts do not show any prompt.
- Revoked permission: Grant permission, then revoke it in OS settings, then test the app's behavior.

## 9.3.0.0 Test Data Needs

- A test account for a Technician.
- At least one job assigned to the technician.

## 9.4.0.0 Testing Tools

- iOS Simulator and Android Emulator to easily reset permissions.
- Physical devices (iOS and Android) for final verification.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on both iOS and Android platforms.
- Code reviewed and approved by at least one other developer.
- Unit tests implemented for permission-checking logic.
- Manual E2E tests completed for all scenarios described in testing_requirements.
- Purpose strings for location usage have been reviewed and approved by the Product Owner.
- The feature is verified on the oldest and newest supported OS versions.
- No crashes occur regardless of the permission state.
- Documentation for developers on how permissions are handled is created or updated.
- Story deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a blocking story for any feature that uses technician location. It should be prioritized and completed before or in the same sprint as US-054 ('Technician Activates Travel Mode').

## 11.4.0.0 Release Impact

- Critical for the initial release of the technician mobile app. The app cannot be submitted to stores without this functionality.

