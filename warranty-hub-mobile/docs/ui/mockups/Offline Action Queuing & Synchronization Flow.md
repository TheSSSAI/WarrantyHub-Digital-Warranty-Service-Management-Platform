{
  "diagram_info": {
    "diagram_name": "Offline Action Queuing & Synchronization Flow",
    "diagram_type": "sequenceDiagram",
    "purpose": "To illustrate how user actions are handled when the mobile application is offline, detailing the local queuing mechanism, optimistic UI updates, and the background synchronization process upon network restoration.",
    "target_audience": [
      "mobile developers",
      "backend engineers",
      "QA engineers",
      "product owners"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with clear separation of Offline and Online states.",
  "diagram_elements": {
    "actors_systems": [
      "User",
      "Mobile UI",
      "Sync Manager (Client Service)",
      "Local Storage (SQLite/Realm)",
      "Network Monitor",
      "Backend API"
    ],
    "key_processes": [
      "Offline detection",
      "Local data persistence",
      "Optimistic UI updates",
      "Background synchronization",
      "Queue processing (FIFO)"
    ],
    "decision_points": [
      "Is Network Available?",
      "Did API Request Succeed?",
      "Is Error Transient?"
    ],
    "success_paths": [
      "Action queued offline -> Network restored -> Auto-sync successful -> Local queue cleared"
    ],
    "error_scenarios": [
      "Sync failure due to server error (Retry logic)",
      "Sync failure due to validation error (User intervention required)"
    ],
    "edge_cases_covered": [
      "App restart while items are in queue",
      "Optimistic UI state vs Server state"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Sequence diagram showing a user performing an action offline. The app saves it locally and updates the UI immediately. Later, when the network connects, the app automatically sends the saved data to the server.",
    "color_independence": "Phases of connectivity are separated by clear notes and grouping boxes, not just color.",
    "screen_reader_friendly": "Flow is linear and descriptive labels explain the state transitions.",
    "print_compatibility": "High contrast lines and text ensure readability in grayscale."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Standard sequence diagram flow, best viewed on desktop or tablet.",
    "theme_compatibility": "Neutral styling for broad compatibility.",
    "performance_notes": "Focuses on logical flow; abstracting specific database implementation details."
  },
  "usage_guidelines": {
    "when_to_reference": "During the implementation of US-075 (Offline Capabilities) and when testing resilience scenarios.",
    "stakeholder_value": {
      "developers": "Defines the exact behavior of the Sync Manager and Local Database interactions.",
      "designers": "Clarifies when to show 'Pending Sync' vs 'Synced' status indicators.",
      "product_managers": "Validates the 'always-on' experience requirements.",
      "QA_engineers": "Provides step-by-step states for 'Airplane Mode' testing."
    },
    "maintenance_notes": "Update if the sync strategy changes from FIFO to priority-based, or if conflict resolution logic is added.",
    "integration_recommendations": "Include in the Mobile App Architecture Design Document (ADD)."
  },
  "validation_checklist": [
    "✅ Offline state handling clearly depicted",
    "✅ Local storage persistence shown",
    "✅ Network restoration trigger included",
    "✅ Successful sync flow documented",
    "✅ Error handling for sync failures included",
    "✅ Mermaid syntax validated",
    "✅ Matches requirements of US-075 and REQ-FUNC-009"
  ]
}

---

# Mermaid Diagram

```mermaid
sequenceDiagram
    actor User
    participant UI as Mobile App UI
    participant SyncMgr as Sync Manager
    participant LocalDB as Local Storage (SQLite)
    participant NetMon as Network Monitor
    participant API as Backend API

    Note over User, API: PHASE 1: User Action in Offline Mode

    User->>UI: Performs Action (e.g., Submit Service Request)
    activate UI
    UI->>SyncMgr: dispatchAction(payload)
    activate SyncMgr
    
    SyncMgr->>NetMon: checkConnectivity()
    activate NetMon
    NetMon-->>SyncMgr: Status: OFFLINE
    deactivate NetMon

    SyncMgr->>LocalDB: insertQueueItem(payload, status='PENDING')
    activate LocalDB
    LocalDB-->>SyncMgr: item_id: 123
    deactivate LocalDB

    SyncMgr-->>UI: Return Optimistic Success (status='PENDING_SYNC')
    deactivate SyncMgr

    UI-->>User: Show Success Toast & "Pending Sync" Icon
    deactivate UI

    Note right of User: The user continues using the app.<br/>Data is safe in Local Storage.

    Note over User, API: PHASE 2: Connectivity Restoration & Sync

    NetMon->>SyncMgr: event: NETWORK_CONNECTED
    activate SyncMgr
    
    SyncMgr->>LocalDB: getPendingItems(orderBy=CreatedASC)
    activate LocalDB
    LocalDB-->>SyncMgr: List[Item 123, Item 124...]
    deactivate LocalDB

    loop For Each Pending Item
        SyncMgr->>API: POST /api/v1/service-requests (Payload)
        activate API
        
        alt Sync Successful
            API-->>SyncMgr: 201 Created (ServerID: 999)
            SyncMgr->>LocalDB: deleteQueueItem(123)
            activate LocalDB
            LocalDB-->>SyncMgr: Success
            deactivate LocalDB
            SyncMgr->>UI: broadcastEvent(ItemSynced, id=123)
            UI-->>User: Update Status to "Synced" / Remove Icon
        else Sync Failed (Transient Error 5xx)
            API-->>SyncMgr: 503 Service Unavailable
            SyncMgr->>LocalDB: updateRetryCount(123, count++)
        else Sync Failed (Validation Error 4xx)
             API-->>SyncMgr: 400 Bad Request
             SyncMgr->>LocalDB: updateStatus(123, 'SYNC_FAILED', errorMsg)
             SyncMgr->>UI: broadcastEvent(SyncError, id=123)
             UI-->>User: Notification: "Action Failed. Tap to Retry."
        end
        deactivate API
    end

    deactivate SyncMgr
```