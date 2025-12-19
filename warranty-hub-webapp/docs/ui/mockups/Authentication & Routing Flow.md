{
  "diagram_info": {
    "diagram_name": "Authentication & Routing Flow",
    "diagram_type": "flowchart",
    "purpose": "Documents the critical security flow for handling user authentication state, token validation, role-based routing, and session expiration handling across web and mobile clients.",
    "target_audience": [
      "frontend developers",
      "backend developers",
      "security engineers",
      "QA engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with distinct colors for security states",
  "diagram_elements": {
    "actors_systems": [
      "Client App (Web/Mobile)",
      "Auth Service (Azure AD B2C)",
      "Token Validator"
    ],
    "key_processes": [
      "Token Validation",
      "Role Extraction",
      "Route Determination",
      "Session Cleanup"
    ],
    "decision_points": [
      "Token Existence",
      "Token Validity (Expiry/Signature)",
      "Role Identification"
    ],
    "success_paths": [
      "Valid token -> Role Extracted -> Correct Dashboard Redirect"
    ],
    "error_scenarios": [
      "Token missing",
      "Token expired",
      "Invalid signature",
      "Unknown role"
    ],
    "edge_cases_covered": [
      "Deep link access with expired session",
      "Role permission mismatch"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart illustrating the authentication lifecycle: starting with token validation, proceeding to role extraction from JWT claims, executing logic to redirect users to specific dashboards based on role, and handling session expiry by clearing state and redirecting to login.",
    "color_independence": "Shapes and text labels distinguish states; colors are supplementary.",
    "screen_reader_friendly": "Flow follows a logical top-down sequence",
    "print_compatibility": "High contrast borders ensure readability in grayscale"
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout suitable for documentation embedding",
    "theme_compatibility": "Neutral base colors with semantic highlighting",
    "performance_notes": "Low rendering overhead"
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of protected routes, login redirection logic, and HTTP interceptors.",
    "stakeholder_value": {
      "developers": "Blueprints the exact logic for frontend routing guards and API middleware.",
      "designers": "Clarifies the user journey when sessions timeout.",
      "product_managers": "Visualizes the security gates for different user personas.",
      "QA_engineers": "Provides test cases for token expiry and unauthorized access."
    },
    "maintenance_notes": "Update if new user roles are added or if the IDP provider changes.",
    "integration_recommendations": "Include in the Authentication Module technical specification."
  },
  "validation_checklist": [
    "✅ Token Validation logic included",
    "✅ Role Extraction from JWT visualized",
    "✅ Specific Redirect Logic for all personas mapped",
    "✅ Session Expiry/Logout flow defined",
    "✅ Visual hierarchy separates Client vs System logic",
    "✅ Error paths clearly lead to safe states",
    "✅ Accessible styling applied"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Nodes
    Start([User Accesses Protected Route/App])
    
    subgraph Security_Check ["0. Token Validation"]
        CheckExists{Token Exists?}
        ValidateSignature{Verify Signature}
        CheckExpiry{Check Expiration}
    end

    subgraph Access_Control ["1. Role Extraction"]
        DecodeJWT[Decode JWT Payload]
        ExtractClaim[Extract 'extension_UserRole']
    end

    subgraph Routing_Engine ["2. Redirect Logic"]
        RouteSwitch{Switch on Role}
        GoSuperAdmin[Redirect: Super Admin Portal]
        GoBrandAdmin[Redirect: Brand Dashboard]
        GoSCAdmin[Redirect: Service Center Panel]
        GoTech[Redirect: Technician App Home]
        GoConsumer[Redirect: My Products]
        GoError[Redirect: 403 Forbidden]
    end

    subgraph Session_Management ["3. Session Expiry"]
        ClearState[Clear Local Storage / Cookies]
        ResetState[Reset App State / Store]
        ToLogin[Redirect to Login Screen]
    end

    %% Flow
    Start --> CheckExists
    
    CheckExists -- No --> ToLogin
    CheckExists -- Yes --> ValidateSignature
    
    ValidateSignature -- Invalid --> Session_Management
    ValidateSignature -- Valid --> CheckExpiry
    
    CheckExpiry -- Expired --> Session_Management
    CheckExpiry -- Valid --> Access_Control
    
    Session_Management --> ClearState --> ResetState --> ToLogin

    DecodeJWT --> ExtractClaim --> Routing_Engine
    
    ExtractClaim --> RouteSwitch
    
    RouteSwitch -- "Super Admin" --> GoSuperAdmin
    RouteSwitch -- "Brand Admin" --> GoBrandAdmin
    RouteSwitch -- "Service Center Admin" --> GoSCAdmin
    RouteSwitch -- "Technician" --> GoTech
    RouteSwitch -- "Consumer" --> GoConsumer
    RouteSwitch -- "Unknown/None" --> GoError

    %% Styling
    classDef process fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
    classDef terminator fill:#f1f8e9,stroke:#558b2f,stroke-width:2px,color:#2e7d32
    classDef expiry fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c

    class Start,DecodeJWT,ExtractClaim,ClearState,ResetState process
    class CheckExists,ValidateSignature,CheckExpiry,RouteSwitch decision
    class GoSuperAdmin,GoBrandAdmin,GoSCAdmin,GoTech,GoConsumer terminator
    class ToLogin,GoError expiry

    %% Group Styling
    style Security_Check fill:#f5f5f5,stroke:#9e9e9e,stroke-dasharray: 5 5
    style Access_Control fill:#f5f5f5,stroke:#9e9e9e,stroke-dasharray: 5 5
    style Routing_Engine fill:#f5f5f5,stroke:#9e9e9e,stroke-dasharray: 5 5
    style Session_Management fill:#fff0f0,stroke:#ef9a9a,stroke-dasharray: 5 5
```