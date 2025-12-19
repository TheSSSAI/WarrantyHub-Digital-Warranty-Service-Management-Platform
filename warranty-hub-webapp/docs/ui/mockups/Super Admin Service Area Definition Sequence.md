{
  "diagram_info": {
    "diagram_name": "Super Admin Service Area Definition Sequence",
    "diagram_type": "sequenceDiagram",
    "purpose": "Documents the technical flow for defining a service center's geographic coverage area using GeoJSON polygons and postal codes.",
    "target_audience": [
      "Backend Developers",
      "Frontend Developers",
      "QA Engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "10 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with clear status colors",
  "diagram_elements": {
    "actors_systems": [
      "Super Admin (Web Client)",
      "API Gateway",
      "Service Center Service",
      "PostGIS Database"
    ],
    "key_processes": [
      "GeoJSON Generation",
      "JWT Validation",
      "Geometry Parsing",
      "Geospatial Persistence"
    ],
    "decision_points": [
      "Token Validity",
      "Role Authorization",
      "Geometry Validity"
    ],
    "success_paths": [
      "Successful polygon save and persistence"
    ],
    "error_scenarios": [
      "Unauthorized Access (401/403)",
      "Invalid Geometry (Self-intersecting/Open)",
      "Database Persistence Error"
    ],
    "edge_cases_covered": [
      "Async Audit Logging"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Sequence diagram showing the flow of defining a service area map polygon from the admin client through the API gateway to the PostGIS database.",
    "color_independence": "Flow paths are distinguishable by logic, not just color.",
    "screen_reader_friendly": "Nodes are labeled with descriptive roles.",
    "print_compatibility": "High contrast lines and text."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Standard sequence diagram scaling",
    "theme_compatibility": "Neutral colors for broad compatibility",
    "performance_notes": "Grouped asynchronous actions for clarity"
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of the map editing feature (US-013) and backend routing logic (US-098).",
    "stakeholder_value": {
      "developers": "Defines the exact API contract and validation steps for geospatial data.",
      "designers": "Clarifies the success/error states the UI must handle.",
      "product_managers": "Visualizes the complexity of the geographic definition process.",
      "QA_engineers": "Provides clear failure paths for test case generation."
    },
    "maintenance_notes": "Update if the geospatial library (e.g., PostGIS) or data format (GeoJSON) changes.",
    "integration_recommendations": "Link to API Schema documentation for the POST /service-centers/{id}/area endpoint."
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
sequenceDiagram
    autonumber
    actor Admin as Super Admin (Web Client)
    participant Gateway as API Gateway
    participant Service as Service Center Service
    participant DB as PostGIS Database

    Note over Admin: 1. Admin draws polygon on map.<br/>Client logic converts shape<br/>to valid GeoJSON object.

    Admin->>Gateway: POST /api/v1/service-centers/{id}/area<br/>Body: { geoJson, postalCodes }
    activate Gateway
    
    Gateway->>Gateway: Validate JWT Signature & Expiry
    
    alt Invalid or Expired Token
        Gateway-->>Admin: 401 Unauthorized
    else Valid Token
        Gateway->>Service: Forward Request
        activate Service
        
        Service->>Service: Authorize Role (Must be Super Admin)
        
        alt Insufficient Permissions
            Service-->>Gateway: 403 Forbidden
            Gateway-->>Admin: 403 Forbidden
        else Authorized
            Service->>Service: Validate DTO & Parse GeoJSON
            
            alt Invalid Geometry (e.g., Self-intersecting)
                Service-->>Gateway: 400 Bad Request (ValidationException)
                Gateway-->>Admin: 400 Bad Request
                Note right of Admin: UI displays specific<br/>geometry error message.
            else Valid Geometry
                Service->>Service: Transform to WKT/Geometry Object
                
                Service->>DB: UPDATE ServiceAreas<br/>SET area_polygon = @geom,<br/>postal_codes = @codes<br/>WHERE center_id = @id
                activate DB
                
                alt Database Error
                    DB-->>Service: DbUpdateException
                    deactivate DB
                    Service-->>Gateway: 500 Internal Server Error
                    Gateway-->>Admin: 500 Internal Server Error
                else Success
                    DB-->>Service: Rows Affected: 1
                    activate DB
                    deactivate DB
                    
                    par Async Operations
                        Service->>Service: Log Audit Event (AREA_UPDATED)
                    and Send Response
                        Service-->>Gateway: 200 OK (Updated Entity)
                        deactivate Service
                        Gateway-->>Admin: 200 OK
                        deactivate Gateway
                    end
                    
                    Admin->>Admin: Update Map UI (Render Saved Layer)
                end
            end
        end
    end
```