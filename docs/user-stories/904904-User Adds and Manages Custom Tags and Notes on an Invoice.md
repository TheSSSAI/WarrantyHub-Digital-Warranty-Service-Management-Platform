# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-065 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User Adds and Manages Custom Tags and Notes on an ... |
| As A User Story | As a User who manages multiple products and invoic... |
| User Persona | The 'User' (Consumer) of the web and mobile applic... |
| Business Value | Increases user engagement and platform stickiness ... |
| Functional Area | Invoice Vault |
| Story Theme | User Data Personalization & Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User adds a new note and a new tag to an invoice

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am an authenticated user viewing a specific invoice within my Invoice Vault

### 3.1.5 When

I select the option to add/edit metadata for the invoice

### 3.1.6 And

the invoice view should now display the note 'For 2024 tax return' and a tag labeled 'Taxes'.

### 3.1.7 Then

the system should confirm the save was successful

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User edits an existing note and removes a tag

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing an invoice that has a note and the tags 'Taxes' and 'Business'

### 3.2.5 When

I select the option to edit the metadata

### 3.2.6 And

only the 'Taxes' tag should remain visible.

### 3.2.7 Then

the updated note should be displayed

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User adds a tag that they have used before on another invoice

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am editing the tags for an invoice

### 3.3.5 And

I should be able to select the suggestion to add the tag.

### 3.3.6 When

I start typing 'War' into the tags input field

### 3.3.7 Then

the system should suggest 'Warranty' as an autocomplete option.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User attempts to add a duplicate tag to the same invoice

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am editing tags for an invoice that already has the tag 'Taxes'

### 3.4.5 When

I attempt to add a new tag called 'taxes' (case-insensitive)

### 3.4.6 Then

the system should prevent the duplicate tag from being added

### 3.4.7 And

the UI should provide feedback that the tag already exists.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User attempts to add a tag exceeding the character limit

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am editing tags for an invoice

### 3.5.5 When

I attempt to add a tag longer than 50 characters

### 3.5.6 Then

the system should prevent the tag from being added

### 3.5.7 And

the UI should display a validation message indicating the character limit.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User attempts to save changes with a network failure

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I have modified the notes and/or tags for an invoice

### 3.6.5 When

I attempt to save the changes and a network error occurs

### 3.6.6 Then

the system must display a non-intrusive error message (e.g., a toast notification)

### 3.6.7 And

the changes I made in the input fields must be preserved, not cleared.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

User clears an existing note

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

I am viewing an invoice that has an existing note

### 3.7.5 When

I edit the metadata and delete all text from the notes field

### 3.7.6 And

I save the changes

### 3.7.7 Then

the note section for that invoice should no longer be displayed.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Edit Notes & Tags' button/icon on the invoice details view.
- A modal or dedicated section for editing.
- A multi-line text area for the 'Notes' field.
- A tag input component that supports typing, autocomplete from the user's existing tags, and removal of individual tags.
- A 'Save' and 'Cancel' button for the edit mode.

## 4.2.0 User Interactions

- Clicking 'Edit' enters an editing state.
- Typing in the tag field should trigger autocomplete suggestions.
- Pressing 'Enter' or ',' in the tag field should create a tag from the typed text.
- Clicking an 'x' icon on a tag should remove it.
- Saving should provide immediate visual feedback (e.g., loading spinner followed by a success message).

## 4.3.0 Display Requirements

- Saved notes and tags must be clearly displayed in a read-only format on the invoice details view.
- If no note or tags exist, the corresponding sections should not be displayed to maintain a clean UI.

## 4.4.0 Accessibility Needs

- All input fields must have associated labels for screen readers.
- The tag list must be navigable and operable via keyboard.
- Color contrast for tags and text must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A single tag cannot exceed 50 characters in length.

### 5.1.3 Enforcement Point

Client-side validation on input and server-side validation on API request.

### 5.1.4 Violation Handling

Display a user-friendly validation message on the client. Reject the API request with a 400 Bad Request status on the server.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

An invoice cannot have more than 10 tags.

### 5.2.3 Enforcement Point

Client-side validation (disable input after 10 tags) and server-side validation.

### 5.2.4 Violation Handling

Display a message indicating the tag limit has been reached. Reject the API request if it contains more than 10 tags.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-003

### 5.3.2 Rule Description

Tags are unique per user, case-insensitively.

### 5.3.3 Enforcement Point

Server-side logic during tag creation. The database should enforce this with a unique index.

### 5.3.4 Violation Handling

The system reuses the existing canonical tag (e.g., if 'Taxes' exists, an input of 'taxes' will be linked to 'Taxes'). The UI should prevent adding a visual duplicate.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-062

#### 6.1.1.2 Dependency Reason

This story adds functionality to the invoice view, which must be built first as part of the Invoice Vault feature.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-017

#### 6.1.2.2 Dependency Reason

An invoice must exist in the system to be tagged or have notes added. This story covers invoice creation.

## 6.2.0.0 Technical Dependencies

- Backend API endpoints for fetching, creating, and updating invoice metadata (notes/tags).
- Database schema modifications to store notes and tags associated with an invoice.

## 6.3.0.0 Data Dependencies

- Requires existing invoice records in the database for a user to interact with.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Saving notes and tags should have a P95 latency of < 500ms.
- Autocomplete suggestions for tags should appear in < 200ms after typing.

## 7.2.0.0 Security

- A user must only be able to view and modify notes/tags on their own invoices. This must be enforced at the API level (RBAC).
- All user-generated content (notes, tags) must be sanitized on the backend to prevent XSS attacks when rendered.

## 7.3.0.0 Usability

- The process of adding/editing should be intuitive and require minimal clicks.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- The feature must be compliant with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported web browsers (latest Chrome, Firefox, Safari, Edge) and mobile OS versions (iOS 14+, Android 8.0+).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium-Low

## 8.2.0.0 Complexity Factors

- Requires database schema changes (new tables for tags and a join table).
- Requires new, secured API endpoints.
- Frontend implementation of a user-friendly tag input component with autocomplete can be moderately complex.

## 8.3.0.0 Technical Risks

- Ensuring efficient database queries for tag autocomplete as the number of tags per user grows.
- Potential for UI/UX inconsistencies between the web and mobile implementations if a shared component strategy is not used.

## 8.4.0.0 Integration Points

- The new API endpoints must be integrated with the Azure API Management gateway.
- The tags created here will be consumed by the search/filter functionality developed in US-063.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify adding, editing, and deleting notes.
- Verify adding and removing tags.
- Verify tag autocomplete functionality.
- Test all validation rules (tag length, tag count, duplicates).
- Test API security to ensure a user cannot modify another user's invoice metadata.
- Test the entire flow on both web and mobile platforms.

## 9.3.0.0 Test Data Needs

- A test user account with multiple uploaded invoices.
- A test user with no existing tags.
- A test user with a pre-populated list of tags to test autocomplete.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/integration tests.
- NestJS testing modules and Jest for backend unit tests.
- Cypress for E2E testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage and passing
- Integration testing completed successfully
- E2E tests for the user flow are created and passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements verified via API load testing
- Security requirements validated (penetration test of new endpoints)
- API documentation (Swagger/OpenAPI) is auto-generated and accurate
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story should be prioritized after US-062 (Invoice Vault View) is complete.
- It should be considered for the same sprint as US-063 (Search/Filter Invoices) to deliver the full organizational value proposition together.

## 11.4.0.0 Release Impact

Enhances the core functionality of the Invoice Vault. It is a significant value-add for users who manage many products.

