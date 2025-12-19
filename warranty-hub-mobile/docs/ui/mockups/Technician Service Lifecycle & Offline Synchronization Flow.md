{
  "diagram_info": {
    "diagram_name": "Technician Service Lifecycle & Offline Synchronization Flow",
    "diagram_type": "sequenceDiagram",
    "purpose": "To illustrate the end-to-end workflow of a technician managing a service request, specifically highlighting status transitions, real-time location sharing, and the resilience pattern for offline data queuing and synchronization.",
    "target_audience": [
      "Mobile Developers",
      "Backend Engineers",
      "QA Engineers",
      "System Architects"
    ],
    "complexity_level": "High",
    "estimated_review_time": "10 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Uses detailed participant grouping and notes for state context. Optimized for wide layout.",
  "diagram_elements": {
    "actors_systems": [
      "Technician (User)",
      "Mobile App (Client)",
      "Local Storage (Device)",
      "API Gateway",
      "Service Request Svc",
      "Location Svc",
      "Notification Svc"
    ],
    "key_processes": [
      "Job Fetching & Caching",
      "Travel Mode Activation",
      "Status Updates",
      "Offline Action Queuing",
      "Background Synchronization"
    ],
    "decision_points": [
      "Network Availability Check",
      "Sync Success/Failure"
    ],
    "success_paths": [
      "Online Status Update",
      "Offline Queue -> Online Sync -> Resolution"
    ],
    "error_scenarios": [
      "API Failure",
      "Network Loss during critical action"
    ],
    "edge_cases_covered": [
      "Technician goes offline mid-job",
      "Travel mode auto-deactivation on status change"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Sequence diagram showing a technician's workflow: loading jobs, traveling with location sharing, working offline, queuing resolution data, and syncing when online.",
    "color_independence": "Flow direction and text labels define the logic, not just color.",
    "screen_reader_friendly": "All interactions are sequentially labeled.",
    "print_compatibility": "High contrast lines and text suitable for black and white printing."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Horizontal scrolling required on smaller screens due to complexity",
    "theme_compatibility": "Adaptive",
    "performance_notes": "Uses standard sequence syntax without heavy styling overhead"
  },
  "usage_guidelines": {
    "when_to_reference": "During development of the mobile offline sync engine and backend status state machine design.",
    "stakeholder_value": {
      "developers": "Blueprints the exact order of local vs remote operations.",
      "designers": "Highlights where 'Pending Sync' UI states are needed.",
      "product_managers": "Validates that the offline experience meets business continuity requirements.",
      "QA_engineers": "Provides a step-by-step script for testing offline/online transitions."
    },
    "maintenance_notes": "Update if the state machine logic for Service Requests changes or if the sync strategy moves from FIFO.",
    "integration_recommendations": "Embed in the Mobile Architecture Design Document (ADD) and Service Request API documentation."
  },
  "validation_checklist": [
    "✅ US-051: Job List Retrieval & Caching covered",
    "✅ US-053: Status Transitions covered",
    "✅ US-054: Travel Mode & Location Sharing covered",
    "✅ US-075: Offline Queuing & Sync covered",
    "✅ US-057: Job Resolution covered"
  ]
}

---

# Mermaid Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Tech as Technician
    participant App as Mobile App
    participant Local as Local Storage (Queue)
    participant API as API Gateway
    participant Svc as Service Request Svc
    participant Loc as Location Svc
    participant Notif as Notification Svc

    Note over Tech, Local: Phase 1: Job Retrieval (US-051)
    Tech->>App: Open 'My Jobs'
    App->>API: GET /technician/jobs?date=today
    API->>Svc: Query Assigned Jobs
    Svc-->>App: Job List JSON
    App->>Local: Cache Job Data (for Offline Use)
    App-->>Tech: Display Job List

    Note over Tech, Loc: Phase 2: Travel Mode (US-053, US-054)
    Tech->>App: Tap 'Start Travel' (Update Status)
    App->>API: PATCH /jobs/{id}/status {status: "ON_THE_WAY"}
    API->>Svc: Update Status
    Svc-->>Notif: Trigger Customer Notification
    App->>Loc: Activate Travel Mode (WebSocket)
    par Location Streaming
        App->>Loc: Stream GPS Coordinates
        Loc->>Loc: Broadcast to Customer App
    and
        Tech->>Tech: Travelling to Site...
    end

    Note over Tech, Local: Phase 3: Arrival & Offline Work (US-075)
    Tech->>App: Tap 'Arrived' (Update Status)
    App->>Loc: Deactivate Travel Mode
    App->>API: PATCH /jobs/{id}/status {status: "IN_PROGRESS"}
    API->>Svc: Update Status
    
    rect rgb(255, 240, 240)
        Note right of Tech: Network Connection Lost ❌
        Tech->>App: Enter Completion Notes & Parts Used
        App->>Local: Write to SyncQueue {action: "SAVE_NOTES", payload: ...}
        App-->>Tech: UI Feedback: "Saved Locally (Pending Sync)"
        
        Tech->>App: Capture Customer Signature
        App->>Local: Write to SyncQueue {action: "SAVE_SIGNATURE", payload: ...}
        
        Tech->>App: Tap 'Mark as Resolved' (US-057)
        App->>Local: Write to SyncQueue {action: "UPDATE_STATUS", status: "RESOLVED"}
        App-->>Tech: UI Feedback: "Job Resolved (Offline Mode)"
    end

    Note over Tech, Notif: Phase 4: Reconnection & Synchronization
    rect rgb(240, 255, 240)
        Note right of Tech: Network Connection Restored ✅
        App->>App: Detect Connectivity
        loop Process Sync Queue (FIFO)
            App->>Local: Read Next Action
            
            alt Save Notes
                App->>API: POST /jobs/{id}/notes
                API-->>App: 200 OK
            else Save Signature
                App->>API: POST /jobs/{id}/signature
                API-->>App: 200 OK
            else Resolve Job
                App->>API: PATCH /jobs/{id}/status {status: "RESOLVED"}
                API->>Svc: Finalize Job State
                Svc-->>Notif: Trigger "Service Completed" Notification
                API-->>App: 200 OK
            end
            
            App->>Local: Remove Action from Queue
        end
        App-->>Tech: UI Update: "All Changes Synced"
    end
```