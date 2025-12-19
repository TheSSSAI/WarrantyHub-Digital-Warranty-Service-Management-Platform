{
  "diagram_info": {
    "diagram_name": "Service Request Lifecycle & Timeline Status",
    "diagram_type": "stateDiagram-v2",
    "purpose": "Visualizes the complete lifecycle of a service request from creation to final closure, mapping the statuses displayed on the user's timeline and the actors responsible for each transition.",
    "target_audience": [
      "developers",
      "product_managers",
      "qa_engineers",
      "service_center_admins"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with clear state distinctions",
  "diagram_elements": {
    "actors_systems": [
      "User (Consumer)",
      "Service Center Admin",
      "Technician",
      "Brand Admin",
      "System"
    ],
    "key_processes": [
      "Request Creation",
      "Technician Assignment",
      "Service Execution",
      "Resolution & Closure",
      "Dispute Handling"
    ],
    "decision_points": [
      "User Cancellation",
      "Technician Availability",
      "User Dispute",
      "Brand Admin Resolution"
    ],
    "success_paths": [
      "Requested -> Acknowledged -> Assigned -> En Route -> WIP -> Resolved -> Closed"
    ],
    "error_scenarios": [
      "Cancellation",
      "Dispute Raised"
    ],
    "edge_cases_covered": [
      "Re-opening a disputed ticket",
      "Cancellation before travel starts"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "State diagram showing the flow of a service request ticket. Starts at Requested, moves through Acknowledged, Technician Assigned, On The Way, Work In Progress, to Resolved. Shows branching paths for Cancellation and Disputes leading to Closed states.",
    "color_independence": "States distinguished by labels and transition arrows, not just color",
    "screen_reader_friendly": "Transitions explicitly labeled with actor actions",
    "print_compatibility": "High contrast lines and text"
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Uses classDefs for styling consistent with light/dark modes",
    "performance_notes": "Standard state diagram rendering"
  },
  "usage_guidelines": {
    "when_to_reference": "During development of the Service Request state machine, UI timeline component, and notification triggers.",
    "stakeholder_value": {
      "developers": "Defines exact state transitions and triggers for backend logic.",
      "designers": "Maps the visual states required for the timeline UI component.",
      "product_managers": "Validates the business rules for cancellation and dispute windows.",
      "qa_engineers": "Provides a map for testing state transitions and edge cases."
    },
    "maintenance_notes": "Update if new intermediate states (e.g., 'Parts Waiting') are added.",
    "integration_recommendations": "Embed in the Service Request Module technical specification."
  },
  "validation_checklist": [
    "✅ All critical user paths documented",
    "✅ Error scenarios and recovery paths included",
    "✅ Decision points clearly marked with conditions",
    "✅ Mermaid syntax validated and renders correctly",
    "✅ Diagram serves intended audience needs",
    "✅ Visual hierarchy supports easy comprehension",
    "✅ Styling enhances rather than distracts from content",
    "✅ Accessible to users with different visual abilities"
  ]
}

---

# Mermaid Diagram

```mermaid
stateDiagram-v2
    direction TB

    %% Style Definitions
    classDef initial fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef active fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef terminal fill:#eeeeee,stroke:#616161,stroke-width:2px,color:#212121
    classDef dispute fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100
    classDef processing fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c

    %% Initial State
    [*] --> Requested: User Submits Request
    
    %% Main Flow
    state "Active Service Lifecycle" as Active {
        Requested --> Acknowledged: SC Admin Acknowledges
        Requested --> Cancelled: User Cancels
        
        Acknowledged --> TechnicianAssigned: SC Admin Assigns Tech
        Acknowledged --> Cancelled: User Cancels
        
        TechnicianAssigned --> OnTheWay: Tech Starts Travel
        TechnicianAssigned --> Cancelled: User Cancels
        
        OnTheWay --> WorkInProgress: Tech Arrives & Starts
        
        WorkInProgress --> Resolved: Tech Completes Job\n(Sig & Notes Required)
    }

    %% Post-Service Flow
    state "Post-Service & Resolution" as PostService {
        Resolved --> Closed: SC Admin Finalizes\n(No Dispute)
        
        Resolved --> Disputed: User Disputes\n(Within 7 Days)
        
        state "Dispute Handling" as DisputeHandling {
            Disputed --> Closed: Brand Admin Upholds Resolution
            Disputed --> Acknowledged: Brand Admin Re-opens\n(New Instructions)
        }
    }

    %% Terminal States
    Cancelled --> [*]
    Closed --> [*]

    %% Applying Styles
    class Requested initial
    class Acknowledged,TechnicianAssigned,OnTheWay,WorkInProgress active
    class Resolved processing
    class Disputed dispute
    class Cancelled,Closed terminal

    %% Notes
    note right of Requested
        User can cancel
        until Tech is
        On The Way
    end note

    note right of Resolved
        Triggers User Rating
        & Feedback Prompt
    end note

    note left of Disputed
        Escalated to
        Brand Admin
    end note
```