{
  "diagram_info": {
    "diagram_name": "Technician Field Service Workflow & Lifecycle",
    "diagram_type": "flowchart",
    "purpose": "Visualizes the end-to-end workflow for a technician using the mobile app, covering authentication, job selection, status transitions, travel tracking, data capture (offline/online), and job resolution validation.",
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
      "Offline Queue"
    ],
    "key_processes": [
      "Authentication",
      "Job Status Updates",
      "Travel Mode Tracking",
      "Service Data Capture",
      "Resolution Validation"
    ],
    "decision_points": [
      "Network Availability",
      "Data Completeness Validation",
      "User Actions"
    ],
    "success_paths": [
      "Login -> Select Job -> Travel -> Work -> Capture Data -> Resolve"
    ],
    "error_scenarios": [
      "Missing mandatory notes/signature",
      "Network connectivity loss"
    ],
    "edge_cases_covered": [
      "Offline data queuing",
      "Auto-deactivation of travel mode"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart showing the technician's journey from login to job resolution, including travel tracking, offline data handling, and validation gates for closing a ticket.",
    "color_independence": "Shapes and labels distinguish between user actions, system processes, and validation states.",
    "screen_reader_friendly": "Flow follows a logical top-down progression with labeled decision diamonds.",
    "print_compatibility": "High contrast optimized for black and white printing."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral colors with semantic highlighting",
    "performance_notes": "Standard flowchart syntax for broad compatibility"
  },
  "usage_guidelines": {
    "when_to_reference": "During mobile app development, QA test case generation for offline mode, and API state machine verification.",
    "stakeholder_value": {
      "developers": "Defines the exact sequence of API calls and local state changes.",
      "designers": "Maps out the necessary UI screens and feedback states.",
      "product_managers": "Verifies the business rules for job completion are enforced.",
      "QA_engineers": "Provides a map for testing happy paths, error paths, and offline synchronization."
    },
    "maintenance_notes": "Update if new job statuses are added or if the prerequisites for resolving a job change.",
    "integration_recommendations": "Link to US-075 through US-084 in the requirements documentation."
  },
  "validation_checklist": [
    "✅ Offline data queuing logic included (US-075)",
    "✅ Travel mode activation/deactivation logic included (US-079, US-080)",
    "✅ Mandatory data checks (Signature/Notes) before resolution included (US-084)",
    "✅ Status transition flow matches business rules (US-078)",
    "✅ Chat integration point included (US-081)",
    "✅ Visual hierarchy separates travel phase from execution phase"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Start and Auth
    Start([App Launch]) --> CheckAuth{Authenticated?}
    CheckAuth -- No --> Login[Technician Login \n US-075 / US-096]
    CheckAuth -- Yes --> JobList
    Login --> JobList[View Assigned Jobs List \n US-076 / US-051]

    %% Job Selection
    JobList --> SelectJob{Select Job}
    SelectJob --> ViewDetails[View Job Details \n US-077 / US-052]

    %% Main Workflow Container
    subgraph Job_Lifecycle [Field Service Workflow]
        
        %% Travel Phase
        ViewDetails --> TravelDecision{Action?}
        TravelDecision -- Start Travel --> StatusOnWay[Set Status: 'On The Way' \n US-078 / US-053]
        StatusOnWay --> ActivateTravel[Activate Travel Mode \n (Share GPS) \n US-079 / US-054]
        ActivateTravel --> InTransit((Traveling))
        InTransit --> Arrive{Arrived?}
        Arrive -- Yes --> StatusWIP[Set Status: 'Work In Progress' \n US-078 / US-053]
        StatusWIP --> AutoStopTravel[System: Auto-Deactivate Travel Mode \n US-080]
        
        %% Communication
        TravelDecision -- Chat --> ChatUI[In-App Chat \n US-081 / US-097]
        ChatUI --> ViewDetails

        %% Execution Phase
        AutoStopTravel --> Execution{Technician Actions}
        
        %% Data Capture Path
        Execution -- Add Notes/Parts --> InputData[Enter Completion Notes & Parts \n US-082 / US-055]
        Execution -- Capture Sig --> Signature[Capture Customer Signature \n US-083 / US-056]
        
        %% Offline Logic Handling
        InputData --> NetworkCheck{Network Available?}
        Signature --> NetworkCheck
        
        NetworkCheck -- No --> QueueData[Queue Data Locally \n (Offline Mode) \n US-075]
        NetworkCheck -- Yes --> SyncAPI[Sync to Backend]
        
        QueueData -.-> ConnectionRestored{Connection Restored?}
        ConnectionRestored -- Yes --> SyncAPI
        SyncAPI --> Execution

        %% Completion Path
        Execution -- Mark Resolved --> ValidateResolution{Validation Check}
        
        ValidateResolution -- Missing Data --> ShowError[Error: Missing Notes or Signature \n US-084]
        ShowError --> Execution
        
        ValidateResolution -- Data Complete --> SetResolved[Set Status: 'Resolved' \n US-084 / US-057]
    end

    %% Post Resolution
    SetResolved --> NotifyCustomer[System: Notify Customer \n Prompt Rating]
    NotifyCustomer --> JobComplete([Job Moved to History])

    %% Styling
    classDef process fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
    classDef system fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c
    classDef offline fill:#e0f2f1,stroke:#00695c,stroke-width:2px,stroke-dasharray: 5 5,color:#004d40

    class Login,ViewDetails,ActivateTravel,ChatUI,InputData,Signature process
    class CheckAuth,SelectJob,TravelDecision,Arrive,NetworkCheck,ValidateResolution,ConnectionRestored decision
    class JobList,StatusOnWay,StatusWIP,AutoStopTravel,SyncAPI,SetResolved,NotifyCustomer system
    class ShowError error
    class QueueData offline
```