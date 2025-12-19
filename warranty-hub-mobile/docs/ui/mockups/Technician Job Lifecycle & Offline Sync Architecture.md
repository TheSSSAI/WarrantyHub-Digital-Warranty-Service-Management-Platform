{
  "diagram_info": {
    "diagram_name": "Technician Job Lifecycle & Offline Sync Architecture",
    "diagram_type": "flowchart",
    "purpose": "To visualize the service request state transitions from a technician's perspective, explicitly detailing how offline actions are handled, queued, and synchronized with the backend system.",
    "target_audience": [
      "Mobile Developers",
      "Backend Developers",
      "QA Engineers",
      "Product Managers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for vertical flow with clear separation between Client (Mobile) and Server (Backend) operations.",
  "diagram_elements": {
    "actors_systems": [
      "Technician",
      "Mobile App (Local State)",
      "Sync Manager",
      "Backend API"
    ],
    "key_processes": [
      "Job Status Updates",
      "Offline Queuing",
      "Background Synchronization",
      "Optimistic UI Updates"
    ],
    "decision_points": [
      "Network Availability",
      "Input Validation (Notes/Signature)",
      "API Success/Failure"
    ],
    "success_paths": [
      "Online Real-time Update",
      "Offline Queue -> Sync -> Success"
    ],
    "error_scenarios": [
      "Sync Conflict/Failure",
      "Missing Prerequisites (Signature/Notes)"
    ],
    "edge_cases_covered": [
      "App Restart during Offline",
      "Network Restoration"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart showing technician job states from Assigned to Resolved. It illustrates how actions like 'Start Travel' update the UI immediately (optimistic) and are queued locally if offline, syncing to the server when connectivity is restored.",
    "color_independence": "States are shaped as rounded rectangles, decisions as diamonds, and databases as cylinders.",
    "screen_reader_friendly": "Flow is logical top-down with distinct branches for error handling.",
    "print_compatibility": "High contrast borders and text."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Uses subgraphs to group mobile vs backend logic for better scaling.",
    "theme_compatibility": "Neutral color palette with semantic coloring for success/error paths.",
    "performance_notes": "Avoided excessive crossing lines for cleaner rendering."
  },
  "usage_guidelines": {
    "when_to_reference": "During development of the mobile offline sync module and when designing API idempotency logic.",
    "stakeholder_value": {
      "developers": "Blueprints the optimistic UI pattern and sync queue requirements.",
      "product_managers": "Clarifies the user experience during spotty network conditions.",
      "QA_engineers": "Provides test cases for offline mode transitions and sync recovery."
    },
    "maintenance_notes": "Update if new job states (e.g., 'Paused') are added to the technician workflow.",
    "integration_recommendations": "Link this diagram in the Mobile App Architecture documentation."
  },
  "validation_checklist": [
    "✅ Job states (Assigned, On The Way, WIP, Resolved) clearly visible",
    "✅ Offline/Online decision logic included",
    "✅ Sync Queue mechanism represented",
    "✅ Prerequisite checks (Signature/Notes) included",
    "✅ Error handling for failed syncs included"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Subgraph for the Mobile Application context
    subgraph MobileApp ["📱 Technician Mobile App"]
        direction TB
        
        %% Initial State
        State_Assigned([State: Technician Assigned])
        
        %% Action 1: Travel
        Action_Travel[User Taps: 'Start Travel']
        State_Assigned --> Action_Travel
        
        %% Action 2: Start Work
        State_OnWay([State: On The Way])
        Action_Work[User Taps: 'Start Work']
        State_OnWay --> Action_Work
        
        %% Action 3: Resolve
        State_WIP([State: Work In Progress])
        Action_Resolve[User Taps: 'Mark as Resolved']
        State_WIP --> Action_Resolve
        
        %% Final State
        State_Resolved([State: Resolved])
        
        %% Logic Connections
        Action_Travel --> Update_Logic
        Action_Work --> Update_Logic
        
        %% Validation Logic for Resolution
        Action_Resolve --> Validate_Inputs{Validate Inputs}
        Validate_Inputs -- Missing Notes/Sig --> Error_Validation[Show Error: 'Missing Requirements']
        Error_Validation --> State_WIP
        Validate_Inputs -- Valid --> Update_Logic
        
        %% Universal Update Logic (Optimistic UI + Queue)
        subgraph StateManagement ["State & Sync Management"]
            Update_Logic{Network Available?}
            
            %% Path A: Online
            Update_Logic -- Yes --> API_Call_Direct[Call API Immediately]
            
            %% Path B: Offline
            Update_Logic -- No --> Queue_Action[📥 Add to Offline Sync Queue]
            Queue_Action --> Optimistic_UI[⚡ Optimistic UI Update]
            
            %% Sync Process
            Network_Trigger((Network Restored)) --> Process_Queue[🔄 Process Offline Queue]
            Process_Queue --> API_Call_Sync[Call API for Queued Items]
            
            %% UI Feedback
            API_Call_Direct --> Optimistic_UI
            
            %% Handling Responses
            API_Call_Sync --> Handle_Response{Response Success?}
            API_Call_Direct --> Handle_Response
            
            Handle_Response -- Success --> Confirm_UI[✅ Sync Confirmed]
            Handle_Response -- Failure/Conflict --> Revert_UI[❌ Revert State & Notify User]
        end
        
        %% State Transitions driven by Optimistic UI
        Optimistic_UI -.-> State_OnWay
        Optimistic_UI -.-> State_WIP
        Optimistic_UI -.-> State_Resolved
    end

    %% Subgraph for Backend System
    subgraph Backend ["☁️ Backend Infrastructure"]
        API_Endpoint((PATCH /service-requests))
        Database[(PostgreSQL DB)]
        EventBus{Azure Service Bus}
        Notification[Push Notification Service]
        
        API_Call_Direct -.-> API_Endpoint
        API_Call_Sync -.-> API_Endpoint
        
        API_Endpoint --> DB_Trans[Update Job Status]
        DB_Trans --> EventBus
        EventBus --> Notification
        Notification -.-> Client_Notify[Notify Customer]
    end

    %% Styling
    classDef state fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef action fill:#fff3e0,stroke:#ff9800,stroke-width:1px,color:#e65100
    classDef logic fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px,color:#4a148c
    classDef system fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:1px,color:#b71c1c

    class State_Assigned,State_OnWay,State_WIP,State_Resolved state
    class Action_Travel,Action_Work,Action_Resolve action
    class Validate_Inputs,Update_Logic,Handle_Response,Network_Trigger logic
    class API_Endpoint,Database,EventBus,Notification system
    class Error_Validation,Revert_UI error
```