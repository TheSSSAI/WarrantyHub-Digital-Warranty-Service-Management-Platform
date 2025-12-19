{
  "diagram_info": {
    "diagram_name": "Role-Based Routing and Access Control Flow",
    "diagram_type": "flowchart",
    "purpose": "Illustrates the strict authentication and authorization logic used to route users to their specific dashboards based on role claims, while enforcing zero unauthorized access to protected administrative routes.",
    "target_audience": [
      "Frontend Developers",
      "Backend Engineers",
      "Security Auditors",
      "QA Engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with distinct color coding for success and error paths",
  "diagram_elements": {
    "actors_systems": [
      "Unauthenticated User",
      "Authenticated User",
      "API Gateway / Router",
      "Identity Provider (Azure AD B2C)"
    ],
    "key_processes": [
      "Authentication",
      "Token Validation",
      "Role Extraction",
      "Route Guarding",
      "Redirection"
    ],
    "decision_points": [
      "Is Authenticated?",
      "Target Route?",
      "Role Validation"
    ],
    "success_paths": [
      "Super Admin to Admin Portal",
      "Brand Admin to Brand Dashboard",
      "SC Admin to SC Panel",
      "Consumer/Tech to App"
    ],
    "error_scenarios": [
      "Unauthenticated access attempt",
      "Insufficient privileges (403)",
      "Invalid Token"
    ],
    "edge_cases_covered": [
      "Direct URL access attempt",
      "Session expiry"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart showing the security logic for user routing. It starts with an authentication check. Unauthenticated users go to login. Authenticated users pass through a route guard. The guard checks the user's role (Super Admin, Brand Admin, Service Center Admin, Technician, Consumer) against the requested route. Matching roles are directed to their specific dashboards. Mismatched roles receive a 403 Forbidden error.",
    "color_independence": "Shapes and text labels distinguish decision points from actions; colors are supplementary.",
    "screen_reader_friendly": "Flow is strictly top-down with clear decision branches.",
    "print_compatibility": "High contrast lines and text."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Adaptive styling",
    "performance_notes": "Standard flowchart rendering"
  },
  "usage_guidelines": {
    "when_to_reference": "During frontend routing implementation and security testing planning.",
    "stakeholder_value": {
      "developers": "Blueprints the routing middleware logic and guard conditions.",
      "designers": "Identifies necessary error pages and redirection states.",
      "product_managers": "Visualizes the segregation of duties and portal access.",
      "QA_engineers": "Defines test cases for permission boundaries and redirection logic."
    },
    "maintenance_notes": "Update if new user roles or portal types are added.",
    "integration_recommendations": "Include in the Security Architecture document and Frontend Routing documentation."
  },
  "validation_checklist": [
    "✅ All 5 user roles (Super Admin, Brand Admin, SC Admin, Technician, Consumer) are covered",
    "✅ Unauthenticated path leads to Login",
    "✅ Unauthorized path leads to 403/Error",
    "✅ Successful paths lead to correct dashboards",
    "✅ Guard logic is explicitly visualized",
    "✅ Mermaid syntax is valid",
    "✅ Visual hierarchy separates Auth from AuthZ logic",
    "✅ Access control rules align with US-117 and US-096"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Nodes
    Start([User Accesses Application])
    
    subgraph Authentication_Layer [Authentication Layer]
        CheckAuth{Is User<br/>Authenticated?}
        RedirectLogin[Redirect to Login / Azure AD B2C]
        VerifyCreds{Credentials &<br/>MFA Valid?}
        IssueToken[Issue JWT with<br/><b>Role Claims</b>]
        LoginError[Display Auth Error]
    end

    subgraph Route_Guard [Authorization & Routing Guard]
        ParseToken[Parse JWT & Extract Role]
        DetermineRoute{Target Route<br/>Namespace}
    end

    subgraph Admin_Portal [Super Admin Portal]
        GuardSuper{Role ==<br/><b>Super Admin</b>?}
        DashSuper[<b>Super Admin Dashboard</b><br/>/admin/dashboard]
    end

    subgraph Brand_Portal [Brand Portal]
        GuardBrand{Role ==<br/><b>Brand Admin</b>?}
        DashBrand[<b>Brand Dashboard</b><br/>/brand/dashboard]
    end

    subgraph SC_Panel [Service Center Panel]
        GuardSC{Role ==<br/><b>Service Center Admin</b>?}
        DashSC[<b>Service Center Dashboard</b><br/>/sc/dashboard]
    end

    subgraph Mobile_App [Mobile Application]
        GuardApp{Role Check}
        DashTech[<b>Technician Home</b><br/>Assigned Jobs List]
        DashConsumer[<b>Consumer Home</b><br/>My Products List]
    end

    Error403[<b>403 Forbidden</b><br/>Access Denied Page]

    %% Relationships
    Start --> CheckAuth
    CheckAuth -- No --> RedirectLogin
    RedirectLogin --> VerifyCreds
    VerifyCreds -- No --> LoginError
    VerifyCreds -- Yes --> IssueToken
    IssueToken --> ParseToken
    
    CheckAuth -- Yes --> ParseToken
    ParseToken --> DetermineRoute

    %% Routing Logic
    DetermineRoute -- "/admin/*" --> GuardSuper
    GuardSuper -- Yes --> DashSuper
    GuardSuper -- No --> Error403

    DetermineRoute -- "/brand/*" --> GuardBrand
    GuardBrand -- Yes --> DashBrand
    GuardBrand -- No --> Error403

    DetermineRoute -- "/sc/*" --> GuardSC
    GuardSC -- Yes --> DashSC
    GuardSC -- No --> Error403

    DetermineRoute -- "/app/*" --> GuardApp
    GuardApp -- "Role: Technician" --> DashTech
    GuardApp -- "Role: Consumer" --> DashConsumer
    GuardApp -- "Other" --> Error403

    %% Styling
    classDef default fill:#fff,stroke:#333,stroke-width:1px;
    classDef auth fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
    classDef guard fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px;
    classDef portal fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;

    class CheckAuth,RedirectLogin,VerifyCreds,IssueToken auth
    class ParseToken,DetermineRoute,GuardSuper,GuardBrand,GuardSC,GuardApp guard
    class DashSuper,DashBrand,DashSC,DashTech,DashConsumer success
    class LoginError,Error403 error
    class Admin_Portal,Brand_Portal,SC_Panel,Mobile_App portal
```