{
  "diagram_info": {
    "diagram_name": "Technician Job Execution Lifecycle",
    "diagram_type": "flowchart",
    "purpose": "To visualize the end-to-end workflow of a technician processing a service request, including status transitions, travel mode logic, data capture requirements, and validation gates.",
    "target_audience": [
      "Mobile Developers",
      "Backend Developers",
      "QA Engineers",
      "Product Managers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "diagram_elements": {
    "actors_systems": [
      "Technician",
      "Mobile App",
      "Backend API",
      "Customer Notification Service"
    ],
    "key_processes": [
      "Job Selection",
      "Travel Mode Activation/Deactivation",
      "Service Execution",
      "Data Capture (Notes/Parts/Signature)",
      "Job Resolution"
    ],
    "decision_points": [
      "Activate Travel Mode?",
      "Location Permissions Granted?",
      "Validation (Notes/Signature present?)",
      "Network Connectivity Check"
    ],
    "success_paths": [
      "Assigned -> On The Way -> Work In Progress -> Resolved"
    ],
    "error_scenarios": [
      "Missing mandatory data (Signature/Notes)",
      "Location permission denied",
      "Offline mode queuing"
    ],
    "edge_cases_covered": [
      "Mid-job travel",
      "Offline resolution synchronization",
      "Force stop location sharing on resolution"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart detailing the technician's workflow from selecting a job to resolving it, showing states like 'On The Way' and 'Work In Progress', with validation checks for signatures and notes.",
    "color_independence": "States are grouped by subgraphs; shapes distinguish decisions from actions.",
    "screen_reader_friendly": "All nodes have descriptive labels indicating action or state.",
    "print_compatibility": "High contrast borders and clear flow lines suitable for black and white printing."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral color palette works in light and dark modes",
    "performance_notes": "Standard flowchart complexity"
  },
  "usage_guidelines": {
    "when_to_reference": "During development of the Technician Mobile App features US-053, US-054, US-057, and US-079.",
    "stakeholder_value": {
      "developers": "Defines exact state transitions and API trigger points.",
      "designers": "Maps out necessary UI states and error modals.",
      "product_managers": "Verifies the business logic for warranty service compliance.",
      "QA_engineers": "Provides a checklist for testing the job lifecycle and validation rules."
    },
    "maintenance_notes": "Update if new mandatory fields are added to job completion or if new statuses are introduced.",
    "integration_recommendations": "Link to US-078 and US-084 in documentation."
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
flowchart TD
    %% Definitions
    Start((Start))
    End((End))

    %% Subgraphs for Stages/States
    subgraph Stage_Assigned [State: Technician Assigned]
        ViewList[View 'My Jobs' List] --> SelectJob[Select Service Request]
        SelectJob --> ViewDetails[View Job Details]
        ViewDetails --> DecTravel{Start Travel?}
    end

    subgraph Stage_Travel [State: On The Way]
        DecTravel -- Yes --> PromptLoc{Activate Travel Mode?}
        PromptLoc -- Yes --> CheckPerm{Location Perm Granted?}
        
        CheckPerm -- No --> ErrPerm[Display: Permission Required Error]
        ErrPerm --> ViewDetails
        
        CheckPerm -- Yes --> StartWSS[Init WebSocket Location Stream]
        StartWSS --> UpdateStatusOTW[API: Update Status 'On The Way']
        PromptLoc -- No --> UpdateStatusOTW
        
        UpdateStatusOTW --> NotifyCust[System: Notify Customer & Show Map]
        NotifyCust --> Drive[Technician Travels to Site]
        Drive --> Arrive{Arrived at Site?}
    end

    subgraph Stage_WIP [State: Work In Progress]
        Arrive -- Yes --> StopTravel[Deactivate Travel Mode]
        StopTravel --> UpdateStatusWIP[API: Update Status 'Work In Progress']
        UpdateStatusWIP --> PerformService[Perform Service / Diagnosis]
        
        PerformService --> AddData[Enter Completion Notes & Parts Used]
        PerformService --> CapSig[Capture Customer Signature]
        
        AddData --> ReadyCheck{Ready to Resolve?}
        CapSig --> ReadyCheck
    end

    subgraph Stage_Resolution [Validation & Closure]
        ReadyCheck -- Tap 'Mark Resolved' --> ValidateData{Data Complete?}
        
        ValidateData -- Missing Sig/Notes --> ErrData[Display: Mandatory Fields Missing]
        ErrData --> PerformService
        
        ValidateData -- Valid --> NetCheck{Network Available?}
        
        NetCheck -- No --> QueueOffline[Queue 'Resolve' Action Locally]
        QueueOffline --> ShowPending[Display: Pending Sync Status]
        
        NetCheck -- Yes --> CallResolveAPI[API: PATCH /service-requests/{id}/status]
    end

    subgraph System_Finalization [Backend Processing]
        CallResolveAPI --> DBUpdate[Update DB Status: 'Resolved']
        DBUpdate --> KillTravel[Force Stop Location Sharing]
        DBUpdate --> AuditLog[Log Action in Audit Trail]
        AuditLog --> TriggerFeedback[Event: Trigger Customer Feedback Prompt]
    end

    ShowPending -.-> |Conn Restored| CallResolveAPI
    TriggerFeedback --> End

    %% Styling
    classDef process fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
    classDef system fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c
    classDef state fill:#f3e5f5,stroke:#4a148c,stroke-width:1px,stroke-dasharray: 5 5

    class ViewList,SelectJob,ViewDetails,Drive,PerformService,AddData,CapSig,QueueOffline process
    class DecTravel,PromptLoc,CheckPerm,Arrive,ReadyCheck,ValidateData,NetCheck decision
    class StartWSS,UpdateStatusOTW,NotifyCust,StopTravel,UpdateStatusWIP,CallResolveAPI,DBUpdate,KillTravel,AuditLog,TriggerFeedback system
    class ErrPerm,ErrData error
    class Stage_Assigned,Stage_Travel,Stage_WIP,Stage_Resolution state
```