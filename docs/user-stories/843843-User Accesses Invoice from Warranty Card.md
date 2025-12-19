# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-035 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Accesses Invoice from Warranty Card |
| As A User Story | As a Registered User, I want to tap a clear link o... |
| User Persona | The 'User' or 'Consumer' who has registered produc... |
| Business Value | Enhances user experience by centralizing all produ... |
| Functional Area | User Product Management |
| Story Theme | Digital Warranty Card & Document Access |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

View an uploaded image invoice from the warranty card

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the digital warranty card for a product

### 3.1.5 When

I tap the 'View Invoice' link and the associated invoice is an image file (e.g., JPG, PNG)

### 3.1.6 Then

an in-app modal or viewer opens, displaying the correct invoice image, and I can zoom and pan the image, and I can close the viewer to return to the warranty card.

### 3.1.7 Validation Notes

Verify on both mobile and web. The API call must fetch a secure, short-lived URL for the image from Azure Blob Storage.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

View an uploaded PDF invoice from the warranty card

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user viewing the digital warranty card for a product

### 3.2.5 When

I tap the 'View Invoice' link and the associated invoice is a PDF file

### 3.2.6 Then

an in-app modal or viewer opens, displaying the correct invoice PDF, and I can scroll through the PDF pages, and I can close the viewer to return to the warranty card.

### 3.2.7 Validation Notes

Verify on both mobile and web. The PDF viewer component must be functional. The API call must fetch a secure, short-lived URL for the PDF from Azure Blob Storage.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Invoice link is specific to the selected warranty card

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am a logged-in user viewing a product that has both a primary warranty and an extended warranty

### 3.3.5 When

I view the extended warranty's digital card and tap the 'View Document' link

### 3.3.6 Then

the system displays the document associated specifically with the extended warranty, not the original purchase invoice.

### 3.3.7 Validation Notes

This confirms that the link is tied to the specific warranty record, not just the product.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Handling a product with no uploaded invoice

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

I am a logged-in user viewing the digital warranty card for a product

### 3.4.5 When

no invoice document was ever uploaded for that specific warranty

### 3.4.6 Then

the 'View Invoice' link is either hidden or displayed in a disabled state, clearly indicating that no document is available.

### 3.4.7 Validation Notes

Check the UI state. If disabled, hovering or long-pressing should ideally show a tooltip like 'No invoice uploaded'.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

System handles failure to load an invoice file

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a logged-in user viewing the digital warranty card for a product with a linked invoice

### 3.5.5 When

I tap the 'View Invoice' link, but the file fails to load from the storage service (e.g., network error, corrupted file)

### 3.5.6 Then

the system displays a user-friendly error message, such as 'Could not load invoice. Please try again later.', instead of crashing or showing a blank screen.

### 3.5.7 Validation Notes

This can be tested by simulating a 404 or 500 error from the file URL or by interrupting the network connection.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Unauthorized access to an invoice is prevented

### 3.6.3 Scenario Type

Security

### 3.6.4 Given

I am a logged-in user (User A)

### 3.6.5 When

I attempt to access the invoice URL belonging to another user (User B) by manipulating the API request

### 3.6.6 Then

the system returns an authorization error (e.g., 403 Forbidden or 404 Not Found) and does not expose the invoice file.

### 3.6.7 Validation Notes

Requires an API-level test to ensure the backend properly validates that the requesting user owns the requested resource.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly identifiable and tappable element (button, link, or icon with a label) on the Digital Warranty Card component, labeled 'View Invoice' or similar.
- A modal or full-screen viewer for displaying image and PDF content.
- Controls within the viewer for 'Close', 'Zoom In/Out' (for images), and scrolling (for PDFs).

## 4.2.0 User Interactions

- A single tap/click on the 'View Invoice' element triggers the viewer.
- Pinch-to-zoom and pan gestures must be supported for images on mobile.
- A clear action (e.g., tapping an 'X' icon or a 'Close' button) dismisses the viewer.

## 4.3.0 Display Requirements

- The invoice content must be rendered clearly and legibly.
- The UI must gracefully handle the state where no invoice is available for a product.

## 4.4.0 Accessibility Needs

- The 'View Invoice' element must have an accessible label, such as 'View invoice for [Product Name]'.
- The viewer's controls (e.g., Close button) must be keyboard-navigable and have proper ARIA attributes.
- The interface must comply with WCAG 2.1 Level AA.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'A user can only view invoices associated with products they own.', 'enforcement_point': 'Backend API (Microservice responsible for product/document management).', 'violation_handling': 'The API must return an authorization error (403 Forbidden) if a user attempts to access an invoice not linked to their account.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-017

#### 6.1.1.2 Dependency Reason

The ability to upload an invoice must exist before it can be viewed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-032

#### 6.1.2.2 Dependency Reason

The Digital Warranty Card UI must be implemented first, as it is the container for the 'View Invoice' link.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-095

#### 6.1.3.2 Dependency Reason

User registration and authentication are required to access any user-specific data.

## 6.2.0.0 Technical Dependencies

- Azure Blob Storage for file hosting.
- Backend API endpoint to provide a secure, pre-signed, time-limited URL to the invoice file.
- Frontend PDF viewing library for both React Native and Next.js.
- Frontend image viewing component with zoom/pan capabilities.

## 6.3.0.0 Data Dependencies

- The database schema must have a clear relationship between a user's account, a registered product, its specific warranty records, and the associated invoice file identifiers stored in Blob Storage.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The invoice viewer should appear within 2 seconds of the user's tap under a standard 4G/WiFi connection.
- The backend API endpoint that generates the pre-signed URL must respond in under 250ms (P95).

## 7.2.0.0 Security

- All requests to fetch invoice data must be authenticated via JWT.
- The system must use short-lived, pre-signed URLs for accessing files in Azure Blob Storage to prevent unauthorized sharing and access.
- The backend must perform an authorization check to ensure the requesting user owns the product associated with the invoice.

## 7.3.0.0 Usability

- The process of finding and viewing an invoice should be intuitive and require minimal taps.
- The invoice viewer must be easy to navigate and close.

## 7.4.0.0 Accessibility

- The feature must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on iOS 14+ and Android 8.0+.
- The feature must function correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires both backend (secure URL generation) and frontend (UI components) work.
- Selection and integration of reliable image and PDF viewer libraries for both web and mobile platforms.
- Implementing the secure access pattern using pre-signed URLs requires careful backend logic.
- Handling different file types (image vs. PDF) requires conditional rendering logic on the frontend.

## 8.3.0.0 Technical Risks

- Performance of third-party PDF/image viewer libraries on large files.
- Ensuring the pre-signed URL generation logic is secure and correctly configured with appropriate expiry times.

## 8.4.0.0 Integration Points

- Backend API for user authentication (Azure AD B2C).
- Backend API for fetching product/warranty data (PostgreSQL).
- Backend integration with Azure Blob Storage SDK to generate pre-signed URLs.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Usability
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify viewing of JPG, PNG, and PDF files.
- Verify the disabled/hidden state when no invoice is present.
- Verify error handling on network failure or file corruption.
- Verify access control by attempting to access another user's invoice via API.
- Verify UI responsiveness and usability on various screen sizes (mobile, tablet, desktop).

## 9.3.0.0 Test Data Needs

- User accounts with products that have: an image invoice, a PDF invoice, multiple warranties with different documents, and no invoice at all.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for frontend unit tests.
- Cypress for web E2E tests.
- Postman or similar for API security testing.
- Browser developer tools and mobile emulators for UI/UX validation.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing on supported platforms.
- Code reviewed and approved by at least one other developer.
- Unit and integration tests implemented with >80% coverage for new code.
- E2E tests for the happy path scenario are created and passing.
- API endpoint is secured and passes security review.
- UI/UX has been reviewed and approved by the design/product team.
- Performance targets for API response and file loading are met.
- Accessibility (WCAG 2.1 AA) standards are met.
- Feature is documented in the user guide.
- Story is deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Backend API task can be developed in parallel with frontend component creation.
- Requires coordination between frontend and backend developers on the API contract for fetching the secure URL.
- Ensure prerequisite stories are completed before starting this one.

## 11.4.0.0 Release Impact

This is a core feature for the user's document management capabilities and is a key part of the initial product offering.

