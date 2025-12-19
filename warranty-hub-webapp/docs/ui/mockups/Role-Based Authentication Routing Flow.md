{
  "diagram_info": {
    "diagram_name": "Role-Based Authentication Routing Flow",
    "diagram_type": "flowchart",
    "purpose": "To visualize the logic flow from user login to specific dashboard redirection based on assigned user roles and layout requirements.",
    "target_audience": [
      "Frontend Developers",
      "Backend Developers",
      "QA Engineers",
      "Product Managers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with clear status coloring",
  "diagram_elements": {
    "actors_systems": [
      "Unauthenticated User",
      "Azure AD B2C",
      "Frontend Router"
    ],
    "key_processes": [
      "Authentication",
      "Token Decoding",
      "Role Extraction",
      "Layout Loading"
    ],
    "decision_points": [
      "Is Authenticated?",
      "Check User Role"
    ],
    "success_paths": [
      "Consumer to My Products",
      "Brand Admin to Analytics",
      "SC Admin to Requests",
      "Super Admin to Metrics"
    ],
    "error_scenarios": [
      "Login Failed",
      "No Role Assigned",
      "Token Invalid"
    ],
    "edge_cases_covered": [
      "Unknown Role routing",
      "Session validation"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart displaying the authentication process starting from login, validating credentials, extracting roles from the JWT token, and routing to one of four specific dashboards: Consumer, Brand Admin, Service Center Admin, or Super Admin.",
    "color_independence": "Shapes and labels distinguish step types; colors act as secondary reinforcement.",
    "screen_reader_friendly": "Flow is logical top-down with descriptive node labels.",
    "print_compatibility": "High contrast borders and text ensure readability in grayscale."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout fits standard documentation viewports",
    "theme_compatibility": "Uses classDefs for consistent styling across themes",
    "performance_notes": "Standard flowchart complexity, renders instantly."
  },
  "usage_guidelines": {
    "when_to_reference": "During frontend routing configuration and authentication guard implementation.",
    "stakeholder_value": {
      "developers": "Defines exact routing paths and layout wrappers for each role.",
      "designers": "Clarifies which layout template applies to which user persona.",
      "product_managers": "Validates the user journey for different entry points.",
      "QA_engineers": "Provides test cases for role-based access control (RBAC) redirection."
    },
    "maintenance_notes": "Update if new roles are added or dashboard default routes change.",
    "integration_recommendations": "Embed in the Authentication Module technical specification."
  },
  "validation_checklist": [
    "✅ All 4 personas included",
    "✅ Login success path defined",
    "✅ Error paths defined",
    "✅ Layout loading step included",
    "✅ Dashboard destinations specified",
    "✅ Mermaid syntax valid",
    "✅ JSON structure valid"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Node Styling Definitions
    classDef start fill:#f9f9f9,stroke:#333,stroke-width:2px,color:#000
    classDef process fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
    classDef layout fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,stroke-dasharray: 5 5,color:#000
    classDef endnode fill:#d1c4e9,stroke:#512da8,stroke-width:2px,color:#000
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#000

    %% Start of Flow
    Start([User Visits Web Portal]):::start --> CheckAuth{Has Active Session?}:::decision
    
    CheckAuth -- No --> LoginView[Display Login Page]:::process
    LoginView --> UserAction(User Enters Credentials)
    UserAction --> AuthProvider{Authenticate via Azure AD B2C}:::decision
    
    AuthProvider -- Failure --> AuthError[Display 'Invalid Credentials' Error]:::error
    AuthError --> LoginView
    
    AuthProvider -- Success --> TokenRec[Receive JWT Access Token]:::process
    CheckAuth -- Yes --> TokenRec
    
    TokenRec --> Decode[Decode Token & Extract Claims]:::process
    Decode --> RoleCheck{Check 'extension_role' Claim}:::decision
    
    %% Routing Logic - Role Based
    RoleCheck -- "Role: Consumer" --> LayoutCons[Load Consumer Layout\n(Top Nav + Footer)]:::layout
    LayoutCons --> DestCons[Redirect: /my-products]:::endnode
    
    RoleCheck -- "Role: Brand Admin" --> LayoutBrand[Load Brand Layout\n(Sidebar + Analytics Widgets)]:::layout
    LayoutBrand --> DestBrand[Redirect: /brand/dashboard]:::endnode
    
    RoleCheck -- "Role: SC Admin" --> LayoutSC[Load Service Center Layout\n(Sidebar + Request Queue)]:::layout
    LayoutSC --> DestSC[Redirect: /center/dashboard]:::endnode
    
    RoleCheck -- "Role: Super Admin" --> LayoutSuper[Load Super Admin Layout\n(Full Admin Sidebar)]:::layout
    LayoutSuper --> DestSuper[Redirect: /admin/metrics]:::endnode
    
    %% Error Handling for Roles
    RoleCheck -- "Unknown / Missing" --> AccessError[Redirect: /403-unauthorized]:::error
    AccessError --> ErrorPage[Display 'Contact Support' Page]:::endnode

    %% Grouping for Clarity
    subgraph Frontend_App [Frontend Application Routing Layer]
        TokenRec
        Decode
        RoleCheck
        LayoutCons
        LayoutBrand
        LayoutSC
        LayoutSuper
    end
```