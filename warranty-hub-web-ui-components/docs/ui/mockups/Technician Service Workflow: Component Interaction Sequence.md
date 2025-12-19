{
  "diagram_info": {
    "diagram_name": "Technician Service Workflow: Component Interaction Sequence",
    "diagram_type": "sequenceDiagram",
    "purpose": "Documents the complex interaction flow between the Technician Mobile App components, the Consumer Mobile App components, and backend services during the critical 'Travel' and 'Job Completion' phases. It highlights the real-time location streaming via WebSockets and the secure signature upload process.",
    "target_audience": [
      "Mobile Developers",
      "Backend Engineers",
      "QA Engineers",
      "System Architects"
    ],
    "complexity_level": "high",
    "estimated_review_time": "10-15 minutes"
  },
  "diagram_elements": {
    "actors_systems": [
      "Technician App (JobExecutionScreen)",
      "Technician App (BackgroundLocService)",
      "Consumer App (MapTrackingView)",
      "API Gateway",
      "Location Service (WebSocket)",
      "Service Request Service",
      "Azure Blob Storage",
      "Notification Service"
    ],
    "key_processes": [
      "Job Status Transition",
      "Real-time Location Streaming",
      "Signature Capture & Upload",
      "Job Completion"
    ],
    "decision_points": [
      "Status Update Validation",
      "Location Permission Check",
      "Signature Upload Success"
    ],
    "success_paths": [
      "Travel Mode Activation -> Streaming -> Arrival -> Signature Upload -> Job Resolution"
    ],
    "error_scenarios": [
      "WebSocket Disconnection",
      "Blob Storage Upload Failure"
    ],
    "edge_cases_covered": [
      "Background location updates",
      "Offline signature capture (implied via local storage handling)"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Sequence diagram showing the flow of data from the Technician app updating job status, streaming location to the consumer app, and uploading a digital signature to close the ticket.",
    "color_independence": "Standard Mermaid high-contrast styling used; flow direction indicates sequence regardless of color.",
    "screen_reader_friendly": "Nodes and messages use descriptive text labels.",
    "print_compatibility": "Diagram optimized for vertical reading flow."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout scales well for scrollable documentation",
    "theme_compatibility": "Neutral color scheme compatible with light/dark modes",
    "performance_notes": "Focuses on logical data flow rather than internal class-level details to maintain readability."
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of the 'Travel Mode' and 'Complete Job' features in the mobile apps.",
    "stakeholder_value": {
      "developers": "Defines exact API calls and WebSocket events required.",
      "designers": "Visualizes the timing of UI state changes (e.g., when to show the map vs. the signature pad).",
      "product_managers": "Validates the user experience flow across two distinct apps.",
      "qa_engineers": "Provides a step-by-step test plan for the real-time tracking feature."
    },
    "maintenance_notes": "Update if the WebSocket protocol or Blob Storage authentication method changes.",
    "integration_recommendations": "Include in the technical design document for the Service Request Module."
  },
  "validation_checklist": [
    "✅ Includes both Technician and Consumer client interactions",
    "✅ Details the WebSocket real-time loop",
    "✅ Covers the file upload for signatures",
    "✅ Shows asynchronous notification triggers",
    "✅ Valid Mermaid syntax",
    "✅ Clear actor distinctions (UI vs Background Service)"
  ]
}

---

# Mermaid Diagram

```mermaid
sequenceDiagram
    autonumber
    
    box "Technician Mobile App" #e3f2fd
        participant TechUI as JobExecutionScreen
        participant TechBG as BackgroundLocService
        participant SigPad as SignatureCanvas
    end
    
    box "Backend Infrastructure" #f3e5f5
        participant Gateway as API Gateway
        participant LocSvc as Location Service (WS)
        participant ReqSvc as Service Request Svc
        participant Blob as Azure Blob Storage
        participant Notify as Notification Svc
    end
    
    box "Consumer Mobile App" #e8f5e9
        participant UserMap as MapTrackingView
    end

    %% Phase 1: Activate Travel Mode
    Note over TechUI, UserMap: Phase 1: Travel Mode Activation
    
    TechUI->>Gateway: POST /jobs/{id}/status (ON_THE_WAY)
    Gateway->>ReqSvc: Update Status
    activate ReqSvc
    ReqSvc->>Notify: Publish Event (Status Changed)
    ReqSvc-->>TechUI: 200 OK
    deactivate ReqSvc
    
    Notify--)UserMap: Push Notification ("Tech is en route")
    
    TechUI->>TechBG: Start Location Tracking
    activate TechBG
    TechBG->>LocSvc: WebSocket Connect (Auth Token)
    LocSvc-->>TechBG: Connection Established
    
    %% Phase 2: Real-time Streaming
    Note over TechBG, UserMap: Phase 2: Real-time Location Streaming
    
    UserMap->>LocSvc: WebSocket Subscribe (JobChannel)
    
    loop Every 15 Seconds
        TechBG->>LocSvc: Emit(GPS Coordinates)
        LocSvc->>LocSvc: Validate & Enrich
        LocSvc-->>UserMap: Broadcast(New Coordinates)
        UserMap->>UserMap: Update Map Marker & ETA
    end
    
    %% Phase 3: Arrival and Work
    Note over TechUI, UserMap: Phase 3: Arrival
    
    TechUI->>TechBG: Stop Location Tracking
    deactivate TechBG
    TechUI->>Gateway: POST /jobs/{id}/status (IN_PROGRESS)
    Gateway->>ReqSvc: Update Status
    ReqSvc->>Notify: Publish Event (Status Changed)
    Notify--)UserMap: Push Notification ("Tech Arrived")
    UserMap->>UserMap: Unmount MapTrackingView
    
    %% Phase 4: Job Completion
    Note over TechUI, Blob: Phase 4: Job Completion & Signature
    
    TechUI->>SigPad: Customer Signs Device
    SigPad->>SigPad: Convert to PNG Blob
    SigPad->>TechUI: Return Image Data
    
    TechUI->>Gateway: Request SAS Token (Upload)
    Gateway->>Blob: Generate SAS
    Blob-->>TechUI: Returns Secure Upload URL
    
    TechUI->>Blob: PUT /container/{id}/sig.png (Image Data)
    activate Blob
    Blob-->>TechUI: 201 Created
    deactivate Blob
    
    TechUI->>Gateway: POST /jobs/{id}/resolve
    Note right of TechUI: Payload includes parts used & sig URL
    Gateway->>ReqSvc: Finalize Job
    activate ReqSvc
    ReqSvc->>ReqSvc: Persist Data
    ReqSvc->>Notify: Publish Event (Job Resolved)
    ReqSvc-->>TechUI: 200 OK (Job Closed)
    deactivate ReqSvc
    
    Notify--)UserMap: Push Notification ("Rate Service")
```