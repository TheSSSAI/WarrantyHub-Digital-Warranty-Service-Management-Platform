# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-034 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Accesses Brand's Terms & Conditions from Digi... |
| As A User Story | As a registered User viewing my digital warranty c... |
| User Persona | The 'User' or 'Consumer' who has registered a prod... |
| Business Value | Increases user trust and transparency by providing... |
| Functional Area | Digital Warranty Card & User Experience |
| Story Theme | Product & Warranty Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User views T&Cs for a product with an available document

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a User is logged in and is viewing the digital warranty card for a product

### 3.1.5 When

the associated brand has a Terms & Conditions document uploaded and linked by a Super Admin, and the User taps the 'Terms & Conditions' link

### 3.1.6 Then

the system displays the correct T&C document in a readable, in-app viewer (e.g., a modal or a new screen) that allows for scrolling and zooming.

### 3.1.7 Validation Notes

Verify that the document displayed matches the one uploaded for the specific brand. The viewer must have a clear 'close' or 'back' button.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Edge Case: Brand has no T&C document uploaded

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

a User is logged in and is viewing the digital warranty card for a product

### 3.2.5 When

the associated brand does NOT have a Terms & Conditions document uploaded

### 3.2.6 Then

the 'Terms & Conditions' link is not displayed on the digital warranty card.

### 3.2.7 Validation Notes

The UI should adapt gracefully, and there should be no placeholder or disabled button. The element should be absent to avoid user confusion.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: Network failure while fetching the document

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

a User is viewing a digital warranty card and taps the 'Terms & Conditions' link

### 3.3.5 When

the device is offline or a network error occurs while fetching the document

### 3.3.6 Then

a user-friendly error message is displayed, such as 'Could not load document. Please check your connection and try again.'

### 3.3.7 Validation Notes

The app should not crash. The user should be able to dismiss the error message and return to the warranty card screen.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: The stored document is corrupt or in an unsupported format

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a User taps the 'Terms & Conditions' link

### 3.4.5 When

the document fetched from storage is corrupt or cannot be rendered by the in-app viewer

### 3.4.6 Then

a user-friendly error message is displayed, such as 'This document could not be displayed.'

### 3.4.7 Validation Notes

This event should be logged on the server side for administrative review, as it indicates a data integrity issue.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Security: Document access is secure

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a User requests to view a T&C document

### 3.5.5 When

the client application requests the document from the backend

### 3.5.6 Then

the backend provides a secure, short-lived URL (e.g., using an Azure Blob Storage SAS token) to access the document, ensuring the storage is not publicly exposed.

### 3.5.7 Validation Notes

Confirm through network inspection that the URL provided to the client is temporary and access-controlled.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly labeled, tappable link or button on the Digital Warranty Card component, with text such as 'Terms & Conditions' or 'View Terms & Conditions'.
- An in-app document viewer (modal or full-screen) with a 'Close' or 'Back' button.

## 4.2.0 User Interactions

- User taps the link to open the document viewer.
- User can scroll vertically through the document.
- User can use pinch gestures to zoom in and out of the document.
- User taps the 'Close' or 'Back' button to dismiss the viewer and return to the warranty card.

## 4.3.0 Display Requirements

- The T&C document must be rendered clearly and legibly.
- Loading indicators should be displayed while the document is being fetched and rendered.

## 4.4.0 Accessibility Needs

- The 'Terms & Conditions' link/button must have a proper accessibility label for screen readers.
- The document viewer should be navigable using accessibility tools. If displaying a PDF, it should be a tagged PDF where possible.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "The Terms & Conditions document displayed must be the one specifically associated with the product's brand.", 'enforcement_point': 'Backend API logic when fetching the document reference from the database.', 'violation_handling': 'If no document is associated with the brand, the API should return a null or empty reference, which the client interprets as a signal to hide the link.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-013

#### 6.1.1.2 Dependency Reason

This story requires the functionality for a Super Admin to upload and associate T&C documents with brands. Without it, there are no documents to display.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-032

#### 6.1.2.2 Dependency Reason

This story adds a feature to the Digital Warranty Card UI, so that UI must exist first.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint to securely retrieve the URL of the T&C document for a given brand.
- Azure Blob Storage for hosting the T&C documents.
- A client-side (React Native) library capable of rendering PDF or other document formats.

## 6.3.0.0 Data Dependencies

- The `brands` table in the database must have a field to store the reference/path to the T&C document in Azure Blob Storage.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The document viewer should begin to load within 500ms of a user tap.
- The full document should be rendered within 3 seconds on an average mobile data connection (e.g., 4G).

## 7.2.0.0 Security

- Access to T&C documents in Azure Blob Storage must not be public.
- The client application must fetch a short-lived, secure access token (SAS token) from the backend API to view a document.
- All communication must be over HTTPS.

## 7.3.0.0 Usability

- The document viewer must be intuitive and easy to navigate on a mobile screen.
- Text must be legible by default, with easy-to-use zoom functionality.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported iOS (14+) and Android (8.0+) versions.
- If implemented on the web portal, it must work on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires both frontend and backend changes.
- Frontend complexity depends on the choice of a third-party document viewer library and its integration.
- Backend work involves a simple database lookup and SAS token generation, which is a standard pattern.

## 8.3.0.0 Technical Risks

- The chosen document viewer library might have performance issues with very large documents.
- Ensuring consistent rendering and behavior of the viewer across different OS versions and devices.

## 8.4.0.0 Integration Points

- Client (Mobile App) <> Backend API
- Backend API <> Azure Database for PostgreSQL
- Backend API <> Azure Blob Storage

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify T&C link appears and works for a brand with a document.
- Verify T&C link is hidden for a brand without a document.
- Test document rendering, scrolling, and zooming on both iOS and Android devices of varying screen sizes.
- Test network error handling by simulating an offline state.
- Test the flow with a large (e.g., 10MB) PDF to check performance.

## 9.3.0.0 Test Data Needs

- A test brand with a T&C document (e.g., a sample PDF) uploaded.
- A test brand with no T&C document.
- Optionally, a test brand linked to a corrupt/unsupported document file to test error handling.

## 9.4.0.0 Testing Tools

- Jest / React Testing Library for frontend unit tests.
- Cypress for web E2E tests.
- Appium or a similar framework for mobile E2E tests.
- Postman or similar for API endpoint testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for both frontend and backend logic, with >80% coverage
- Integration testing between client, API, and blob storage completed successfully
- User interface reviewed and approved by UX/UI designer
- Performance requirements verified on a target device
- Security requirements (SAS token usage) validated
- Documentation for the new API endpoint is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story is dependent on US-013 and US-032 and must be scheduled after their completion.
- The team should decide on a PDF/document viewer library for React Native before starting implementation.

## 11.4.0.0 Release Impact

This is a valuable user-facing feature that enhances transparency. It should be included in an early user-facing release after the core functionality is stable.

