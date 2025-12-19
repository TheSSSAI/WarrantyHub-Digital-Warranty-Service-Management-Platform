{
  "diagram_info": {
    "diagram_name": "Service Request Lifecycle State Machine",
    "diagram_type": "stateDiagram-v2",
    "purpose": "To define the comprehensive lifecycle of a service request, illustrating valid states, transitions, responsible actors, and edge cases such as disputes and ownership transfers.",
    "target_audience": [
      "Backend Developers",
      "Frontend Developers",
      "QA Engineers",
      "Product Managers"
    ],
    "complexity_level": "High",
    "estimated_review_time": "10-15 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for clarity with grouped states for active vs. terminal flows.",
  "diagram_elements": {
    "actors_systems": [
      "User (Consumer)",
      "Service Center Admin (SC Admin)",
      "Technician",
      "Brand Admin",
      "System (Automated)"
    ],
    "key_processes": [
      "Request Creation",
      "Assignment & Dispatch",
      "Job Execution",
      "Resolution & Closure",
      "Dispute Handling",
      "Ownership Transfer Pause"
    ],
    "decision_points": [
      "User cancels request",
      "Technician marks resolved",
      "User disputes resolution",
      "Brand Admin upholds/reopens",
      "Transfer initiated"
    ],
    "success_paths": [
      "Requested -> Acknowledged -> Assigned -> In Progress -> Resolved -> Closed"
    ],
    "error_scenarios": [
      "Dispute raised on resolved ticket",
      "Request paused due to product transfer"
    ],
    "edge_cases_covered": [
      "User cancellation allowed only in early stages",
      "7-day dispute window",
      "Transfer expiry resumes service"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "State diagram showing service request flow from creation to closure, including loops for disputes and pauses for transfers.",
    "color_independence": "Transitions are labeled with text describing the actor and action.",
    "screen_reader_friendly": "Structured hierarchically with clear state labels.",
    "print_compatibility": "High contrast suitable for black and white printing."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for scrolling.",
    "theme_compatibility": "Neutral styling for adaptability.",
    "performance_notes": "Uses standard state definitions for fast rendering."
  },
  "usage_guidelines": {
    "when_to_reference": "During backend state machine implementation and QA test case generation.",
    "stakeholder_value": {
      "developers": "Defines valid transitions and guard rails for API endpoints.",
      "designers": "Indicates which UI actions are available in each state.",
      "product_managers": "Visualizes the full service journey and exception paths.",
      "qa_engineers": "Basis for state transition testing and edge case validation."
    },
    "maintenance_notes": "Update if new states (e.g., 'Parts Waiting') are added to the workflow.",
    "integration_recommendations": "Include in the Service Request Module technical design document."
  },
  "validation_checklist": [
    "✅ All primary states (Requested to Closed) included",
    "✅ Dispute workflow (User -> Brand Admin) mapped",
    "✅ Cancellation logic restricted to specific states",
    "✅ 'Paused' state for transfers included",
    "✅ Actors identified for every transition",
    "✅ Terminal states clearly marked",
    "✅ Mermaid syntax valid"
  ]
}

---

# Mermaid Diagram

```mermaid
stateDiagram-v2
    direction TB
    
    %% Initial State
    [*] --> Requested : User Creates Request

    %% Active Lifecycle
    state "Active Service Lifecycle" as Active {
        
        state "Triage & Assignment" as Triage {
            Requested --> Acknowledged : SC Admin Acknowledges
            Acknowledged --> TechnicianAssigned : SC Admin Assigns Tech
            TechnicianAssigned --> TechnicianAssigned : SC Admin Re-assigns
        }

        state "Field Execution" as Execution {
            TechnicianAssigned --> TechnicianOnTheWay : Tech Activates Travel Mode
            TechnicianOnTheWay --> WorkInProgress : Tech Starts Work
            TechnicianOnTheWay --> TechnicianAssigned : Travel Mode Deactivated/Stopped
            WorkInProgress --> Resolved : Tech Marks Resolved\n(Req: Notes + Signature)
        }

        %% User Cancellation Path (Allowed in early stages)
        Requested --> Cancelled : User Cancels
        Acknowledged --> Cancelled : User Cancels
        TechnicianAssigned --> Cancelled : User Cancels
    }

    %% Paused State (Cross-cutting concern)
    state "Paused (Ownership Transfer)" as Paused
    
    %% Transitions to Pause
    Active --> Paused : Product Transfer Initiated\n(System)
    
    %% Transitions from Pause
    Paused --> Active : Transfer Accepted/Rejected/Expired\n(Resumes previous state)

    %% Post-Resolution Flows
    state "Resolution & Closure" as PostResolution {
        Resolved --> Closed : SC Admin Finalizes\n(No Dispute)
        
        %% Dispute Loop
        Resolved --> Disputed : User Disputes\n(Within 7 Days)
        Disputed --> Closed : Brand Admin Upholds Resolution\n(Dispute Rejected)
        Disputed --> Acknowledged : Brand Admin Re-opens Ticket\n(Dispute Valid)
    }

    %% Terminal States
    Closed --> [*]
    Cancelled --> [*]

    %% Notes
    note right of Requested
        User creates request
        from Warranty Card
    end note

    note right of Paused
        Freezes SLA timers
        & notifications
    end note

    note left of Disputed
        Escalates to
        Brand Admin
    end note

    note right of Closed
        Triggers User Rating
        & Feedback
    end note
```