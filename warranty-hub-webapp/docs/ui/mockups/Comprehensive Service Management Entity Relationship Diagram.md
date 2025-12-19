{
  "diagram_info": {
    "diagram_name": "Comprehensive Service Management Entity Relationship Diagram",
    "diagram_type": "erDiagram",
    "purpose": "To define the core data structure of the Warranty and Service Management Platform, illustrating the relationships between users, products, service centers, and the service request lifecycle. This serves as the source of truth for database schema implementation.",
    "target_audience": [
      "Database Architects",
      "Backend Developers",
      "Data Analysts",
      "Product Managers"
    ],
    "complexity_level": "high",
    "estimated_review_time": "15-20 minutes",
    "syntax_validation": "Mermaid syntax verified and tested",
    "rendering_notes": "Optimized for wide screens due to the number of entities. Best viewed with orthogonal edge routing."
  },
  "diagram_elements": {
    "actors_systems": [
      "User",
      "Brand",
      "Service Center",
      "Product",
      "Service Request"
    ],
    "key_processes": [
      "Product Registration",
      "Service Request Management",
      "Technician Assignment",
      "Ownership Transfer",
      "Audit Logging"
    ],
    "decision_points": [],
    "success_paths": [],
    "error_scenarios": [],
    "edge_cases_covered": [
      "Multi-brand service centers",
      "Geospatial service areas",
      "Audit trail immutability"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Entity Relationship Diagram showing connections between Users, Products, Brands, and Service Requests.",
    "color_independence": "Relationships defined by line endings (crows foot notation), not color.",
    "screen_reader_friendly": "Entities and attributes are clearly text-labeled.",
    "print_compatibility": "High contrast lines suitable for black and white printing."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vector-based rendering scales for zoom.",
    "theme_compatibility": "Neutral colors work with light and dark IDE themes.",
    "performance_notes": "Contains 18 entities; rendering may take 1-2 seconds."
  },
  "usage_guidelines": {
    "when_to_reference": "During database migration planning, backend API development, and data reporting logic design.",
    "stakeholder_value": {
      "developers": "Blueprints for TypeORM/Prisma schema definitions.",
      "designers": "Understanding of data availability for UI screens.",
      "product_managers": "Validation of domain model against business requirements.",
      "QA_engineers": "Guidance for creating test data sets with correct foreign key relationships."
    },
    "maintenance_notes": "Update when new core entities are added or relationship cardinalities change.",
    "integration_recommendations": "Include in the 'Database Architecture' section of the technical documentation."
  },
  "validation_checklist": [
    "✅ All core entities from Requirements included",
    "✅ Relationships accurately reflect business rules",
    "✅ Primary Keys identified for all entities",
    "✅ Cardinality (1:1, 1:N, M:N) verified",
    "✅ Service Center geography (Polygon/Postal) included",
    "✅ Audit and History tracking included",
    "✅ User role relationships (Technician, Admin) mapped",
    "✅ Communication logs (Chat) connected to Requests"
  ]
}

---

# Mermaid Diagram

```mermaid
erDiagram
    User {
        Guid userId PK
        String role "Consumer, Technician, Admin"
    }
    Device {
        Guid deviceId PK
        String pushToken
        String platform
    }
    Brand {
        Guid brandId PK
        String name
        String status
    }
    ProductModel {
        Guid productModelId PK
        String name
        String sku
    }
    UserProduct {
        Guid userProductId PK
        String serialNumber
        Date purchaseDate
    }
    OwnershipTransferRequest {
        Guid transferRequestId PK
        String status
        Date expiresAt
    }
    Invoice {
        Guid invoiceId PK
        String blobUrl
        String ocrStatus
    }
    Address {
        Guid addressId PK
        String street
        String city
        Geometry location
    }
    ServiceCenter {
        Guid serviceCenterId PK
        String name
        String status
    }
    ServiceCenterBrand {
        Guid serviceCenterId PK
        Guid brandId PK
    }
    ServiceAreaPolygon {
        Guid serviceAreaPolygonId PK
        Geometry polygon
    }
    ServiceAreaPostalCode {
        Guid serviceAreaPostalCodeId PK
        String postalCode
    }
    IssueType {
        Guid issueTypeId PK
        String name
        String category
    }
    ServiceRequest {
        Guid serviceRequestId PK
        String status
        String priority
    }
    ChatMessage {
        Guid chatMessageId PK
        DateTime sentAt PK
        String content
    }
    GpsLocationHistory {
        BIGSERIAL locationId PK
        DateTime timestamp PK
        Double latitude
        Double longitude
    }
    CustomerSignature {
        Guid signatureId PK
        String blobUrl
        DateTime signedAt
    }
    AuditLog {
        BIGSERIAL auditLogId PK
        DateTime timestamp PK
        String action
        Json changes
    }

    User ||--o{ Device : "has devices"
    User ||--o{ UserProduct : "owns products"
    User ||--o{ OwnershipTransferRequest : "initiates transfers"
    User ||--o{ ServiceRequest : "assigned as technician"
    User ||--o{ ChatMessage : "sends messages"
    User ||--o{ GpsLocationHistory : "tracks technician location"
    User ||--o{ AuditLog : "performs actions"

    Brand ||--o{ ProductModel : "defines models"
    Brand ||--o{ User : "managed by admins"
    Brand ||--o{ ServiceCenterBrand : "authorized for service"
    Brand ||--o{ ServiceRequest : "associated requests"

    ProductModel ||--o{ UserProduct : "instantiated as"
    ProductModel ||--o{ ServiceRequest : "related requests"

    UserProduct ||--o{ OwnershipTransferRequest : "subject of transfer"
    UserProduct ||--o| Invoice : "proven by"
    UserProduct ||--o{ ServiceRequest : "requires service"

    ServiceCenter ||--o{ User : "employs staff"
    ServiceCenter ||--o{ ServiceAreaPolygon : "serves geo-areas"
    ServiceCenter ||--o{ ServiceAreaPostalCode : "serves postal-zones"
    ServiceCenter ||--o{ ServiceRequest : "manages requests"
    ServiceCenter ||--o{ ServiceCenterBrand : "services brands"
    ServiceCenter ||--|| Address : "located at"

    IssueType ||--o{ ServiceRequest : "categorizes"

    ServiceRequest ||--o{ ChatMessage : "contains conversation"
    ServiceRequest ||--o{ GpsLocationHistory : "has travel history"
    ServiceRequest ||--o| CustomerSignature : "verified by"
```