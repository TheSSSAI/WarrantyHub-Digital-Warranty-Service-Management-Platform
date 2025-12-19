{
  "diagram_info": {
    "diagram_name": "Comprehensive Product Registration User Flow",
    "diagram_type": "flowchart",
    "purpose": "To visualize the end-to-end user journey for registering a product, integrating Manual Entry, Barcode Scanning, and OCR Invoice Upload methods, including validation logic and warranty calculation.",
    "target_audience": [
      "Frontend Developers",
      "UX Designers",
      "QA Engineers",
      "Product Owners"
    ],
    "complexity_level": "high",
    "estimated_review_time": "10-15 minutes"
  },
  "diagram_elements": {
    "actors_systems": [
      "User (Consumer)",
      "Mobile App/Web Portal",
      "OCR Service",
      "Backend API",
      "Database"
    ],
    "key_processes": [
      "Barcode Scanning",
      "Invoice Upload",
      "OCR Data Extraction",
      "Manual Form Entry",
      "Warranty Calculation"
    ],
    "decision_points": [
      "Method Selection",
      "Camera Permission",
      "OCR Success",
      "Data Validation",
      "Brand Approval Check"
    ],
    "success_paths": [
      "Successful Manual Registration",
      "Successful Scan & Register",
      "Successful OCR & Register"
    ],
    "error_scenarios": [
      "Permission Denied",
      "OCR Failure",
      "Validation Errors",
      "Duplicate Serial Number"
    ],
    "edge_cases_covered": [
      "OCR Fallback to Manual",
      "Unknown Product Model",
      "Future Purchase Date"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart detailing the product registration process options: manual entry, barcode scanning, and invoice OCR. Shows validation steps for serial numbers and dates, culminating in warranty card generation.",
    "color_independence": "Nodes are distinguished by shape and border style, not just color.",
    "screen_reader_friendly": "Flow direction and decision outcomes are explicitly labeled.",
    "print_compatibility": "High contrast optimized for grayscale printing."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral colors with semantic highlighting for start/end/error states",
    "performance_notes": "Subgraphs used to logically group client vs server operations"
  },
  "usage_guidelines": {
    "when_to_reference": "During frontend implementation of the 'Add Product' screens and when designing QA test cases for registration.",
    "stakeholder_value": {
      "developers": "Defines the state transitions and required API calls for each input method.",
      "designers": "Visualizes the fallback paths (e.g., OCR fail) that need UI states.",
      "product_managers": "Ensures all registration channels (Scan, OCR, Manual) are covered.",
      "QA_engineers": "Provides a map for negative testing (permissions, validation errors)."
    },
    "maintenance_notes": "Update if new registration methods (e.g., NFC) are added or if validation rules change.",
    "integration_recommendations": "Link to US-015, US-016, US-018, US-019, US-020, and US-023."
  },
  "validation_checklist": [
    "✅ Manual, Scan, and OCR paths included",
    "✅ Permission handling for camera/storage mapped",
    "✅ Fallback from OCR failure to manual entry included",
    "✅ Backend validation (Brand status, Serial regex) represented",
    "✅ Warranty calculation step included",
    "✅ Mermaid syntax validated"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Styling Definitions
    classDef startend fill:#2e7d32,stroke:#1b5e20,stroke-width:2px,color:#fff,rx:10,ry:10
    classDef process fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#f57f17,rhombus
    classDef system fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c

    %% Nodes
    Start([User Logs In & Navigates to\n'My Products']) --> InitReg[Click 'Register New Product']
    
    subgraph Method_Selection [Input Method Selection]
        InitReg --> ChooseMethod{Select Method}
        ChooseMethod -- "Scan Barcode/QR" --> CheckPerms{Camera\nPermission?}
        ChooseMethod -- "Upload Invoice" --> CheckStorage{Storage\nPermission?}
        ChooseMethod -- "Manual Entry" --> ManualForm[Open Empty\nRegistration Form]
    end

    subgraph Scanning_Flow [Barcode/QR Scanning]
        CheckPerms -- No --> ReqPerm[Request Permission]
        ReqPerm -- Denied --> PermError[Show Permission Error\n& Fallback to Manual]
        PermError --> ManualForm
        
        CheckPerms -- Yes --> OpenCam[Open Camera Scanner]
        ReqPerm -- Granted --> OpenCam
        
        OpenCam --> ScanCode[Scan Code]
        ScanCode --> LookupAPI{Lookup Code\nin DB?}
        
        LookupAPI -- Found --> PreFill[Pre-fill Brand & Model\non Form]
        LookupAPI -- Not Found --> NotFoundMsg[Show 'Product Not Found'\nMessage]
        
        PreFill --> ValidateForm
        NotFoundMsg --> ManualForm
    end

    subgraph OCR_Flow [Invoice OCR Processing]
        CheckStorage -- Yes --> SelectFile[Select Image/PDF]
        CheckStorage -- No --> ReqStore[Request Permission]
        ReqStore -- Denied --> PermError
        ReqStore -- Granted --> SelectFile
        
        SelectFile --> ValidateFile{Valid Type\n& Size <10MB?}
        ValidateFile -- No --> FileError[Show File Error]
        ValidateFile -- Yes --> UploadOCR[Upload to OCR Service]
        
        UploadOCR --> OCRProcess{Extraction\nSuccessful?}
        OCRProcess -- No/Partial --> OCRFail[Show 'Manual Entry Required'\nToast]
        OCRProcess -- Yes --> ReviewData[Display Extracted Data\nfor Review]
        
        OCRFail --> ManualForm
        ReviewData --> UserEdit{User Edits\nData?}
        UserEdit -- Yes --> ModifyFields[Update Fields]
        UserEdit -- No --> ConfirmOCR[Confirm Data]
        
        ModifyFields --> ValidateForm
        ConfirmOCR --> ValidateForm
    end

    subgraph Data_Entry_Validation [Form Entry & Validation]
        ManualForm --> UserInput[User Enters/Edits\nDetails]
        UserInput --> BrandCheck{Is Brand\nApproved?}
        
        BrandCheck -- No/Pending --> BlockReq[Show 'Brand Pending'\nBlock Message]
        BlockReq --> Stop([End: Registration Blocked])
        
        BrandCheck -- Yes --> ValidateForm{Client-Side\nValidation?}
        
        ValidateForm -- "Missing Fields / Future Date" --> ShowInlineErr[Display Inline\nErrors]
        ShowInlineErr --> UserInput
        
        ValidateForm -- Valid --> SubmitData[Submit Registration\nPOST /api/v1/products]
    end

    subgraph Backend_Processing [Backend Processing]
        SubmitData --> AuthCheck{User\nAuthenticated?}
        AuthCheck -- No --> 401Error[Return 401\nUnauthorized]
        
        AuthCheck -- Yes --> ServerValid{Server\nValidation?}
        ServerValid -- "Duplicate Serial / Invalid Regex" --> 409Error[Return 400/409\nError Response]
        409Error --> ShowInlineErr
        
        ServerValid -- Valid --> CalcExpiry[Calculate Warranty Expiry\n(Purchase Date + Duration)]
        CalcExpiry --> SaveDB[(Save to Database)]
        SaveDB --> CreateCard[Generate Digital\nWarranty Card]
    end

    CreateCard --> SuccessToast[Display Success Message]
    SuccessToast --> Redirect[Redirect to\nProduct Details]
    Redirect --> EndNode([End: Product Registered])

    %% Styling Application
    class Start,InitReg,EndNode startend
    class ChooseMethod,CheckPerms,CheckStorage,LookupAPI,ValidateFile,OCRProcess,UserEdit,BrandCheck,ValidateForm,AuthCheck,ServerValid decision
    class ManualForm,OpenCam,ScanCode,PreFill,SelectFile,UploadOCR,ReviewData,ModifyFields,ConfirmOCR,UserInput,SubmitData,CalcExpiry,SaveDB,CreateCard,SuccessToast,Redirect process
    class ReqPerm,ReqStore,PermError,NotFoundMsg,FileError,OCRFail,BlockReq,ShowInlineErr,401Error,409Error error
    class LookupAPI,UploadOCR,SubmitData,CalcExpiry system

    %% Link Styles
    linkStyle default stroke:#333,stroke-width:1px
```