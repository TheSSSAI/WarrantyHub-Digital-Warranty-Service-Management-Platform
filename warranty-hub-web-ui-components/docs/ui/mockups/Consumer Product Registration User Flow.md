{
  "diagram_info": {
    "diagram_name": "Consumer Product Registration User Flow",
    "diagram_type": "flowchart",
    "purpose": "To visualize the end-to-end user journey for registering a product, detailing the interaction between manual entry, barcode scanning, invoice OCR processing, and final submission logic.",
    "target_audience": [
      "Frontend Developers",
      "UI Designers",
      "QA Engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "10 minutes"
  },
  "diagram_elements": {
    "actors_systems": [
      "User",
      "Mobile App",
      "Camera API",
      "Backend API",
      "OCR Service",
      "Blob Storage"
    ],
    "key_processes": [
      "Barcode Scanning",
      "Manual Form Entry",
      "Invoice Upload",
      "OCR Data Extraction",
      "Form Validation"
    ],
    "decision_points": [
      "Scan Barcode vs Manual",
      "Permission Granted?",
      "Product Found?",
      "Invoice Uploaded?",
      "OCR Successful?",
      "Validation Pass?"
    ],
    "success_paths": [
      "Scan -> Pre-fill -> Upload Invoice -> OCR -> Submit",
      "Manual -> Upload Invoice -> Submit"
    ],
    "error_scenarios": [
      "Permission Denied",
      "Product Not Found",
      "OCR Failure",
      "Validation Errors",
      "Network Failure"
    ],
    "edge_cases_covered": [
      "Offline Mode",
      "Unsupported File Types"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart illustrating the product registration process, including branching paths for barcode scanning and manual entry, integration with OCR for invoices, and validation steps.",
    "color_independence": "Shapes and text labels distinguish process steps from decisions; color is secondary.",
    "screen_reader_friendly": "Flow is logical top-down with clear decision branches.",
    "print_compatibility": "High contrast black and white compatible."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral styling for light/dark modes",
    "performance_notes": "Standard node count, efficient rendering"
  },
  "usage_guidelines": {
    "when_to_reference": "During frontend component implementation of the 'Add Product' screens and when designing the state management logic.",
    "stakeholder_value": {
      "frontend_developer": "Defines state transitions, API triggers, and error handling requirements.",
      "ui_designer": "Identifies necessary screens, modals, loading states, and feedback messages.",
      "qa_engineers": "Provides a map for test case generation covering happy paths and edge cases."
    },
    "maintenance_notes": "Update if the OCR provider changes or if new mandatory fields are added to the registration form.",
    "integration_recommendations": "Link to US-016, US-018, US-019, US-020 stories."
  },
  "validation_checklist": [
    "✅ Includes Barcode Scanning entry point (US-016)",
    "✅ Includes Invoice Upload and OCR loop (US-017, US-018)",
    "✅ Handles Manual Entry fallback (US-020)",
    "✅ Shows Form Validation logic (US-015)",
    "✅ Defines Success and Error states"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Nodes
    Start([Start: 'Add Product' Screen])
    
    subgraph InputMethod [Input Method Selection]
        DecisionScan{Scan Barcode?}
        ReqPermission[Request Camera Permission]
        PermissionCheck{Permission Granted?}
        ShowCamera[Open Camera View]
        ScanCode[Scan Barcode/QR]
        LookupProduct[API: Lookup Product Code]
        FoundCheck{Product Found?}
        ShowErrorScan[Show 'Product Not Found'<br/>Switch to Manual]
        PrefillForm[Pre-fill Brand & Model]
        ManualInit[Initialize Empty Form]
    end

    subgraph FormEntry [Details & Documentation]
        FormView[Display Registration Form]
        UserEdit[User Edits/Enters Details]
        
        DecisionInvoice{Upload Invoice?}
        SelectFile[Select File / Take Photo]
        ValFile{Valid Type/Size?}
        UploadBlob[Upload to Azure Blob Storage]
        TriggerOCR[Trigger OCR Process]
        OCRCheck{OCR Success?}
        PopulateOCR[Auto-populate Purchase Date, Serial]
        OCRFailMsg[Show 'Manual Entry Required' Toast]
        
        UserVerify[User Verifies/Corrects Data]
    end

    subgraph Submission [Validation & Commit]
        ClickSubmit(User Clicks 'Register')
        Validate{Client-side Validation?}
        ShowValErrors[Display Inline Errors]
        APIRequest[POST /api/v1/products]
        NetworkCheck{Network Available?}
        OfflineQueue[Queue for Sync (Offline Mode)]
        APISuccess{API 201 Created?}
        ShowAPIFail[Show Error Toast]
        SuccessState([Success: Navigate to Product Details])
    end

    %% Flow Connections
    Start --> DecisionScan
    
    %% Scanning Branch
    DecisionScan -- Yes --> ReqPermission
    ReqPermission --> PermissionCheck
    PermissionCheck -- No --> ManualInit
    PermissionCheck -- Yes --> ShowCamera
    ShowCamera --> ScanCode
    ScanCode --> LookupProduct
    LookupProduct --> FoundCheck
    FoundCheck -- Yes --> PrefillForm
    FoundCheck -- No --> ShowErrorScan
    ShowErrorScan --> ManualInit
    
    %% Manual Branch
    DecisionScan -- No --> ManualInit
    
    %% Converge on Form
    PrefillForm --> FormView
    ManualInit --> FormView
    
    %% Invoice Logic
    FormView --> UserEdit
    UserEdit --> DecisionInvoice
    DecisionInvoice -- No --> ClickSubmit
    DecisionInvoice -- Yes --> SelectFile
    SelectFile --> ValFile
    ValFile -- No --> SelectFile
    ValFile -- Yes --> UploadBlob
    UploadBlob --> TriggerOCR
    TriggerOCR --> OCRCheck
    OCRCheck -- Yes --> PopulateOCR
    OCRCheck -- No --> OCRFailMsg
    PopulateOCR --> UserVerify
    OCRFailMsg --> UserVerify
    UserVerify --> ClickSubmit
    
    %% Submission Logic
    ClickSubmit --> Validate
    Validate -- Fail --> ShowValErrors
    ShowValErrors --> UserEdit
    Validate -- Pass --> NetworkCheck
    NetworkCheck -- No --> OfflineQueue
    NetworkCheck -- Yes --> APIRequest
    APIRequest --> APISuccess
    APISuccess -- No --> ShowAPIFail
    ShowAPIFail --> UserEdit
    APISuccess -- Yes --> SuccessState
    OfflineQueue --> SuccessState

    %% Styles
    classDef primary fill:#eef2ff,stroke:#4f46e5,stroke-width:2px,color:#1e1b4b
    classDef action fill:#fff,stroke:#64748b,stroke-width:1px,color:#0f172a
    classDef decision fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    classDef error fill:#fef2f2,stroke:#ef4444,stroke-width:2px,color:#991b1b
    classDef success fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d
    classDef system fill:#f8fafc,stroke:#94a3b8,stroke-width:1px,stroke-dasharray: 5 5,color:#334155

    class Start,SuccessState success
    class DecisionScan,PermissionCheck,FoundCheck,ValFile,OCRCheck,DecisionInvoice,Validate,NetworkCheck,APISuccess decision
    class ShowErrorScan,OCRFailMsg,ShowValErrors,ShowAPIFail error
    class ReqPermission,ShowCamera,ScanCode,SelectFile,UploadBlob,UserEdit,UserVerify,ClickSubmit action
    class LookupProduct,TriggerOCR,PopulateOCR,APIRequest,OfflineQueue system
    class PrefillForm,ManualInit,FormView primary
```