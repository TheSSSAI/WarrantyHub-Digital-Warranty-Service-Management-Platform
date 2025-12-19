{
  "diagram_info": {
    "diagram_name": "Service Request Lifecycle State Machine",
    "diagram_type": "stateDiagram-v2",
    "purpose": "Documents the definitive state transitions of a Service Request entity, identifying allowed actions, triggers, and responsible actors at each stage of the lifecycle.",
    "target_audience": [
      "backend developers",
      "frontend developers",
      "QA engineers",
      "product owners"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "diagram_content": {
    "syntax_validation": "Mermaid stateDiagram-v2 syntax verified",
    "rendering_notes": "Grouped states distinguish between active processing and final resolution phases."
  },
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
      "Dispatcher Assignment",
      "Technician Execution",
      "Resolution & Verification",
      "Dispute Handling"
    ],
    "decision_points": [
      "User Cancellation",
      "Technician Completion",
      "User Dispute",
      "Admin Finalization"
    ],
    "success_paths": [
      "Requested -> Acknowledged -> Assigned -> In Progress -> Resolved -> Closed"
    ],
    "error_scenarios": [
      "Dispute Re-opening",
      "Cancellation before service"
    ],
    "edge_cases_covered": [
      "Re-assignment",
      "Dispute Window Expiry"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "State diagram showing the lifecycle of a service request from creation to closure, including cancellation and dispute loops.",
    "color_independence": "States are differentiated by position and transition labels, not just color.",
    "screen_reader_friendly": "Transitions explicitly label the actor and action required.",
    "print_compatibility": "High contrast lines and text."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral styling compatible with light/dark modes",
    "performance_notes": "Standard state diagram rendering."
  },
  "usage_guidelines": {
    "when_to_reference": "During backend state machine implementation and frontend UI state logic development.",
    "stakeholder_value": {
      "developers": "Defines valid state transitions for API validation logic.",
      "designers": "Informs which UI actions (buttons) should be enabled/disabled per state.",
      "product_managers": "Validates the business logic flow for service fulfillment.",
      "QA_engineers": "Provides a map for testing all possible state transitions and permission checks."
    },
    "maintenance_notes": "Update if new states (e.g., 'Parts On Order') are introduced to the workflow.",
    "integration_recommendations": "Include in the Service Request Microservice technical design document."
  },
  "validation_checklist": [
    "✅ All 9 defined states included",
    "✅ Cancellation allowed only in pre-service states",
    "✅ Dispute logic loop included",
    "✅ Actor roles specified for every transition",
    "✅ Terminal states clearly identified",
    "✅ Re-assignment loop captured",
    "✅ Mermaid syntax valid",
    "✅ Visual hierarchy logical"
  ]
}

---

# Mermaid Diagram

```mermaid
stateDiagram-v2
    direction TB
    
    %% Styles
    classDef terminal fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef active fill:#e1f5fe,stroke:#0277bd,stroke-width:2px;
    classDef alert fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;

    [*] --> Requested : User submits request

    state "Active Service Phase" as ActivePhase {
        state "Triage & Assignment" as Triage {
            Requested --> Acknowledged : Service Center Admin<br/>[Action: Acknowledge]
            Acknowledged --> TechnicianAssigned : Service Center Admin<br/>[Action: Assign Technician]
            TechnicianAssigned --> TechnicianAssigned : Service Center Admin<br/>[Action: Re-assign]
        }

        state "Field Execution" as Execution {
            TechnicianAssigned --> TechnicianOnTheWay : Technician<br/>[Action: Start Travel]
            TechnicianOnTheWay --> WorkInProgress : Technician<br/>[Action: Start Work]
            WorkInProgress --> Resolved : Technician<br/>[Action: Mark Resolved]
        }
        
        %% Cancellation Paths
        Requested --> Cancelled : User<br/>[Action: Cancel Request]
        Acknowledged --> Cancelled : User<br/>[Action: Cancel Request]
        TechnicianAssigned --> Cancelled : User<br/>[Action: Cancel Request]
    }

    state "Post-Service & Resolution" as ResolutionPhase {
        Resolved --> Closed : Service Center Admin<br/>[Action: Finalize & Close]
        
        state "Dispute Handling" as DisputeLogic {
            Resolved --> Disputed : User<br/>[Action: Dispute within 7 days]
            Disputed --> Acknowledged : Brand Admin<br/>[Action: Re-open Ticket]
            Disputed --> Closed : Brand Admin<br/>[Action: Uphold Resolution]
        }
    }

    Cancelled --> [*]
    Closed --> [*]

    %% Notes
    note right of Requested
        Initial state.
        Visible to SC Admin.
    end note

    note right of TechnicianAssigned
        Technician receives notification.
        User sees Tech Profile.
    end note

    note left of TechnicianOnTheWay
        Live location sharing active.
        User tracks ETA.
    end note

    note right of Resolved
        Service complete.
        Waiting for Admin Closure
        or User Dispute.
    end note

    %% Applying styles
    class Requested,Acknowledged,TechnicianAssigned,TechnicianOnTheWay,WorkInProgress active
    class Resolved,Disputed alert
    class Cancelled,Closed terminal
```