{
  "diagram_info": {
    "diagram_name": "Technician Service Job State Machine",
    "diagram_type": "stateDiagram-v2",
    "purpose": "To visualize the lifecycle of a service job from the technician's perspective, detailing state transitions, location tracking activation/deactivation triggers, validation requirements, and offline handling logic.",
    "target_audience": [
      "mobile developers",
      "backend engineers",
      "product managers",
      "QA engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for clarity with nested states for Location Sharing context",
  "diagram_elements": {
    "actors_systems": [
      "Technician",
      "Mobile App (Offline Queue)",
      "Backend System",
      "Location Service"
    ],
    "key_processes": [
      "Job Status Update",
      "Travel Mode Activation",
      "Job Completion",
      "Offline Synchronization"
    ],
    "decision_points": [
      "Validation (Notes/Sig)",
      "Network Connectivity",
      "Timeouts"
    ],
    "success_paths": [
      "Assigned -> On The Way -> Work In Progress -> Resolved"
    ],
    "error_scenarios": [
      "Validation Failure (Missing Signature)",
      "Network Failure (Queued Action)"
    ],
    "edge_cases_covered": [
      "Mid-job travel for parts",
      "Travel mode timeout (4hr)",
      "Offline resolution"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "State diagram showing the flow of a service job. Starts at Technician Assigned, moves to On The Way (with location tracking), then Work In Progress. Shows loop for mid-job travel and final transition to Resolved with validation checks.",
    "color_independence": "States distinguished by labels and structure, not just color",
    "screen_reader_friendly": "Transitions include descriptive labels for user actions",
    "print_compatibility": "High contrast lines and text"
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for mobile documentation viewing",
    "theme_compatibility": "Neutral styling works in dark/light modes",
    "performance_notes": "Standard state diagram rendering"
  },
  "usage_guidelines": {
    "when_to_reference": "During mobile app development for state management and QA testing of job workflows.",
    "stakeholder_value": {
      "developers": "Defines exact triggers for status updates and location service start/stop",
      "designers": "Maps out necessary UI states and button availability",
      "product_managers": "Validates business rules regarding travel mode and job completion",
      "QA_engineers": "Provides a map for testing state transitions, including offline scenarios"
    },
    "maintenance_notes": "Update if new job statuses (e.g., Paused) are introduced.",
    "integration_recommendations": "Include in the Technician App technical specification document."
  },
  "validation_checklist": [
    "✅ Location tracking states clearly isolated",
    "✅ Offline queueing logic annotated",
    "✅ Job completion prerequisites defined",
    "✅ Mermaid syntax validated",
    "✅ Edge cases like mid-job travel included"
  ]
}

---

# Mermaid Diagram

```mermaid
stateDiagram-v2
    direction TB

    %% Definition of Global Styles
    classDef tracking fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,color:#000
    classDef static fill:#f5f5f5,stroke:#616161,stroke-width:1px,color:#000
    classDef terminal fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef offline stroke-dasharray: 5 5

    state "Technician Job Lifecycle" as MainContext {
        
        state "Technician Assigned" as Assigned
        
        state "Location Tracking Active" as TrackingContext {
            direction LR
            state "On The Way\n(Initial Travel)" as OnTheWay
            state "Mid-Job Travel\n(Parts/Tools)" as MidTravel
            
            note right of OnTheWay
                Backend: Start WSS Stream
                Client: FG/BG Location Svc
                Timeout: 4 Hours Max
            end note
        }

        state "Work In Progress" as WIP {
            direction TB
            state "Service Execution" as Execution
            state "Data Entry" as DataEntry
            
            Execution --> DataEntry : Add Notes/Parts
            DataEntry --> Execution : Save Draft
        }

        state "Job Resolved" as Resolved

        %% Transitions
        [*] --> Assigned

        %% Start Travel
        Assigned --> OnTheWay : [Action] Tap 'Activate Travel Mode'
        
        %% Arrive / Start Work
        OnTheWay --> WIP : [Action] Tap 'Start Work'\n(Auto-Stop Location Sharing)

        %% Mid-Job Travel Loop
        WIP --> MidTravel : [Action] Tap 'Activate Travel Mode'
        MidTravel --> WIP : [Action] Tap 'Stop Sharing'\nOR [System] Timeout (4h)

        %% Job Completion
        WIP --> Resolved : [Action] Tap 'Mark Resolved'
        MidTravel --> Resolved : [Action] Tap 'Mark Resolved'\n(Auto-Stop Location Sharing)

        %% Validation Logic
        state ValidationCheck <<choice>>
        WIP --> ValidationCheck : Validate Prerequisites
        ValidationCheck --> Resolved : [Success] Notes & Sig Present
        ValidationCheck --> WIP : [Failure] Show Error\n"Sig/Notes Required"
    }

    %% Offline Handling Notation
    note left of MainContext
        OFFLINE RESILIENCE:
        1. User performs action (Transition)
        2. UI updates Optimistically
        3. Action stored in Local Queue (AsyncStorage/SQLite)
        4. Network Restore -> Queue Flush (FIFO) -> Backend Sync
    end note

    %% Apply Styles
    class OnTheWay,MidTravel tracking
    class Assigned,WIP static
    class Resolved terminal
```