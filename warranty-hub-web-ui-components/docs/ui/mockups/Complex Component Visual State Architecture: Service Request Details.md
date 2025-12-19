{
  "diagram_info": {
    "diagram_name": "Complex Component Visual State Architecture: Service Request Details",
    "diagram_type": "stateDiagram-v2",
    "purpose": "To define the standardized behavior and visual state transitions for complex UI components (specifically the Service Request Details view) across the platform, handling asynchronous data, error conditions, and connectivity changes.",
    "target_audience": [
      "frontend developers",
      "UI/UX designers",
      "QA engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with clear state differentiation",
  "diagram_elements": {
    "actors_systems": [
      "User Interface",
      "API Client",
      "Local Storage",
      "WebSocket Service"
    ],
    "key_processes": [
      "Data Fetching",
      "State Evaluation",
      "Offline Fallback",
      "Real-time Updates"
    ],
    "decision_points": [
      "Fetch Success/Fail",
      "Data Exists/Empty",
      "Network Available/Unavailable"
    ],
    "success_paths": [
      "Loading -> Active (Standard)",
      "Loading -> Active (Live Tracking)"
    ],
    "error_scenarios": [
      "API 5xx Errors",
      "Network Timeouts",
      "Empty Data Sets"
    ],
    "edge_cases_covered": [
      "Offline Mode transition",
      "Retry logic",
      "Real-time state injection"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "State diagram showing transitions between Loading, Error, Empty, and Active states for UI components",
    "color_independence": "States distinguished by labels and structure, not just color",
    "screen_reader_friendly": "Includes specific ARIA state indicators (aria-busy)",
    "print_compatibility": "High contrast outlines for state boundaries"
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Horizontal layout optimized for wide screens, stacks vertically on mobile",
    "theme_compatibility": "Uses CSS classes for state styling",
    "performance_notes": "Abstracts complex logic into composite states"
  },
  "usage_guidelines": {
    "when_to_reference": "During frontend component implementation (React/React Native) and when defining test cases for UI states.",
    "stakeholder_value": {
      "developers": "Standardized pattern for handling async states and offline mode",
      "designers": "Checklist for required UI mockups (Error, Empty, Loading, Offline)",
      "product_managers": "Understanding of user experience during failure scenarios",
      "QA_engineers": "Roadmap for state-based testing scenarios"
    },
    "maintenance_notes": "Update if new global states (e.g., 'Maintenance Mode') are introduced",
    "integration_recommendations": "Link to US-044 (Live Tracking) and US-075 (Offline Sync)"
  },
  "validation_checklist": [
    "✅ Loading (Skeleton) state defined",
    "✅ Error state with recovery path included",
    "✅ Empty state handling logic verified",
    "✅ Offline/Cached state transitions mapped",
    "✅ Real-time (Live) state specific to service requests included",
    "✅ Visual hierarchy supports easy comprehension"
  ]
}

---

# Mermaid Diagram

```mermaid
stateDiagram-v2
    direction LR
    
    %% Styling Definitions
    classDef loading fill:#f3f4f6,stroke:#6b7280,stroke-width:2px,stroke-dasharray: 5 5,color:#374151
    classDef error fill:#fef2f2,stroke:#ef4444,stroke-width:2px,color:#991b1b
    classDef success fill:#f0fdf4,stroke:#15803d,stroke-width:2px,color:#14532d
    classDef offline fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#9a3412
    classDef active fill:#eef2ff,stroke:#4f46e5,stroke-width:2px,color:#312e81
    classDef decision fill:#fff,stroke:#333,stroke-width:1px,stroke-dasharray: 1

    %% Initial Entry
    [*] --> LoadingState

    state "Loading State" as LoadingState {
        [*] --> SkeletonRender
        SkeletonRender : Display Shimmer Effect
        SkeletonRender : Disable Interactions
        SkeletonRender : Set aria-busy="true"
    }

    state "Error State" as ErrorState {
        APIError : 5xx/4xx Response
        NetworkError : Connection Timeout
        ErrorUI : Display Friendly Message
        ErrorUI : Show "Retry" Button
        
        APIError --> ErrorUI
        NetworkError --> ErrorUI
    }

    state "Data Evaluation" as DataCheck <<choice>>

    state "Content Display State" as ContentState {
        
        state "Empty State" as Empty {
            NullData : No records found
            EmptyUI : Display SVG Illustration
            EmptyUI : Show Call-to-Action
            NullData --> EmptyUI
        }

        state "Populated State" as Active {
            state "Standard View" as Standard {
                ReadOnly : Render Details (Text/Images)
                Interactive : Enable Buttons/Inputs
            }
            
            state "Live Tracking View" as Live {
                ConnectingWSS : Establish WebSocket
                Streaming : Update Map/Chat live
            }

            state "Offline/Cached View" as Offline {
                LoadFromLocal : Read AsyncStorage/SQLite
                OfflineUI : Show Stale Data
                OfflineBanner : Display "Offline Mode" Badge
                LoadFromLocal --> OfflineUI
                OfflineUI --> OfflineBanner
            }

            %% Transitions within Active Content
            Standard --> Live : Event: Tech "On The Way"
            Live --> Standard : Event: Job Started/Ended
            
            Standard --> Offline : Event: Network Loss
            Live --> Offline : Event: Network Loss
            
            Offline --> Standard : Event: Network Restored (Sync)
        }
    }

    %% Main Transitions
    LoadingState --> ErrorState : Fetch Failed
    ErrorState --> LoadingState : User Clicks Retry
    
    LoadingState --> DataCheck : Fetch Success
    DataCheck --> Empty : Data Array Empty / Null
    DataCheck --> Active : Valid Data Present

    %% Apply Styles
    class LoadingState loading
    class ErrorState error
    class Active active
    class Offline offline
    class Empty success
    class DataCheck decision
```