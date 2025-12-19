# Software Requirements Specification

### **1. Introduction**

#### **1.1 Purpose**
This document specifies the software requirements for a centralized, cloud-native platform designed to connect consumers, brands, and service centers for the purpose of managing product warranties, invoices, and service requests. It provides a detailed description of the system's functional, non-functional, and interface requirements.

#### **1.2 Scope**

##### **1.2.1 In-Scope Capabilities**
*   The system shall provide a unified web and mobile platform for consumers to manage product warranties, invoices, and service requests.
*   The system shall provide a backend portal for Brands to view product analytics and manage service escalations.
*   The system shall provide a portal for Service Centers to manage incoming service requests and assign technicians.
*   The system shall provide a mobile application for Technicians to manage their assigned jobs.
*   The system shall include features for user registration, product management, digital warranty cards, and service request lifecycle management.
*   The system shall include features for warranty claim verification, automated reminders, and a secure invoice vault.
*   The system shall provide role-based dashboards for different user types.
*   The system shall provide real-time tracking of a technician's location for service visits.
*   The system shall implement secure, role-based access control for all user types.

##### **1.2.2 Out-of-Scope Capabilities**
*   The system shall not provide direct e-commerce functionality for selling products or extended warranties.
*   The system shall not process payments for out-of-warranty services.
*   The system shall not provide inventory management for spare parts for service centers.
*   The system shall not provide direct integration with brand or service center ERP systems beyond the defined APIs.
*   The system shall not provide Human Resource management features for service centers or brands.

### **2. Overall Description**

#### **2.1 Product Perspective & Architecture**
*   The system shall be a cloud-native, multi-tenant system.
*   The system shall be designed as a centralized hub connecting consumers, brands, and service centers.
*   The system shall be built on a microservices architecture, fronted by an API Gateway.
*   The system shall expose a set of REST and WebSocket APIs for consumption by client applications.

#### **2.2 Core Technology Stack**
*   **Cloud Provider:** The cloud provider shall be Microsoft Azure.
*   **Frontend Technologies:**
    *   **Mobile Frontend:** Shall be built with React Native 0.73.x.
    *   **Web Frontend:** Shall be built with Next.js 14.1.x (React).
    *   **State Management:** Shall use Zustand for lightweight, centralized state management across frontend applications.
*   **Backend Technologies:**
    *   **Runtime & Framework:** Shall be built with Node.js v20.11.x (LTS) and the NestJS Framework v10.3.x.
    *   **API Specification:** The API shall be a hybrid of REST and WebSocket, documented using the OpenAPI 3.0 standard.
*   **Data & Storage:**
    *   **Primary Database:** Shall be Azure Database for PostgreSQL - Flexible Server (v16) with the PostGIS extension enabled.
    *   **Database Migrations:** Shall be managed using pg-migrate.
    *   **Caching Layer:** Shall use Azure Cache for Redis 7.2.
    *   **Search Functionality:** Shall be powered by OpenSearch 2.11.
    *   **File Storage:** Shall use Azure Blob Storage for invoices, photos, and videos.
*   **Cloud & DevOps Infrastructure:**
    *   **API Gateway:** Shall use Azure API Management to secure, publish, and manage APIs.
    *   **Container Orchestration:** Shall be managed by Azure Kubernetes Service (AKS).
    *   **Container Registry:** Shall use Azure Container Registry (ACR) to store and manage container images.
    *   **CI/CD Pipeline:** Shall use GitHub Actions for automated build, test, and deployment workflows.
    *   **Infrastructure as Code:** All infrastructure shall be managed via Terraform.
    *   **Identity Provider:** The identity provider shall be Azure Active Directory B2C.
*   **Development & Testing:**
    *   **Code Quality:** Code shall be statically analyzed and formatted using ESLint and Prettier.
    *   **Backend Testing:** Unit and integration tests shall be written using Jest and Supertest.
    *   **Frontend Testing:** Unit and component tests shall be written using Jest and React Testing Library.
    *   **End-to-End Testing:** Shall be conducted using Playwright.

#### **2.3 Deployment Environments**
*   The entire backend infrastructure shall be deployed on Microsoft Azure.
*   The system shall maintain separate, isolated environments for Development, Staging, and Production, managed via Terraform workspaces.
*   The client mobile application shall require iOS 14.0 or newer.
*   The client mobile application shall require Android 8.0 (Oreo) or newer.
*   The client web portals shall require the latest stable version of Chrome, Firefox, Safari, or Edge.

#### **2.4 Assumptions and Dependencies**
*   The system's operation shall depend on the availability and performance of third-party services including FCM, Azure Communication Services, and Mapbox, which must meet their respective SLAs.
*   The system's functionality shall depend on the device's GPS for technician tracking.
*   The system's functionality shall depend on the device's camera for QR code scanning and photo uploads.
*   All users (consumers, technicians, admins) shall be assumed to have reliable internet connectivity (Wi-Fi or cellular) for the system to function correctly.

### **3. Functional Requirements**

#### **3.1 Super Admin & Onboarding Module**
*   The system shall provide a Super Admin portal for managing platform-wide operations.
*   The Super Admin portal shall provide a dashboard with key platform metrics (e.g., new users, registered products, active brands).
*   The Super Admin portal shall provide a workflow to review and approve new brand registration requests. Approval criteria shall include verification of business registration and contact details. Rejection shall require a reason to be provided to the applicant.
*   The Super Admin portal shall allow an admin to manage product categories (create, read, update, delete). Each category shall have attributes including Name, Description, and an optional Parent Category to support hierarchical structures.
*   The Super Admin portal shall allow an admin to associate brands with specific product categories.
*   The Super Admin portal shall provide a workflow to review and approve new service center registration requests. Approval criteria shall include verification of business address and brand authorizations.
*   The Super Admin portal shall provide an interface to link approved Service Centers to one or more Brands, defining their service relationship.
*   The system shall allow a Super Admin to define a service center's geographic service area using a list of postal codes and a geofenced polygon for each brand they are linked to. This data shall be used for routing service requests.
*   The Super Admin portal shall provide user management for platform administrators.

#### **3.2 User Product Registration**
*   The system shall allow a User to register a product by providing Brand, Model, Serial Number, and Purchase Date.
*   The system shall enforce data validation rules, ensuring the Purchase Date is not in the future.
*   The system shall validate the serial number format against a predefined regex pattern managed by the Brand Admin for their products.
*   The system shall allow a User to select a Brand from a list of approved brands. A user cannot add a new brand.
*   The system shall allow a User to input a Warranty Duration.
*   The system shall auto-populate the Warranty Duration field for known brand/model combinations based on a centrally managed data store; this field shall be non-editable to serve as the single source of truth for the primary warranty.
*   The system shall allow a User to upload an invoice photo or PDF during product registration, with a file size limit of 10MB and support for formats: PDF, JPG, PNG.
*   The system shall create a digital warranty card upon successful product registration.
*   The system shall securely store an uploaded invoice and link it to the registered product.
*   The system shall auto-calculate the warranty expiry date based on the provided purchase date and warranty duration.
*   The system shall allow Users to categorize products into predefined categories (e.g., Mobile, Electronics, Home Appliances, Furniture, Vehicles).
*   The system shall allow a User to add multiple warranties to a single product, each with its own duration and document. This feature shall be used for extended warranties.
*   The system shall allow a User to edit the details of a registered product, subject to specific restrictions.
*   Critical product details (Serial Number, Purchase Date, Model) shall become non-editable after the first service request has been raised for that product to preserve the integrity of claim records. Any subsequent changes to these fields shall require an administrative workflow initiated via a support ticket.
*   The system shall allow a User to delete a registered product. Deletion shall be a soft delete to preserve historical data for analytics. A data retention policy shall define that soft-deleted records are permanently purged after 5 years.
*   The system shall provide a 'Transfer Ownership' feature allowing a user to initiate a transfer of a product record, including its full service history, to another registered user via their registered email address.
*   The system shall send a notification to the recipient of a product transfer, who must accept or reject the transfer within 72 hours. If no action is taken, the transfer request expires. Any in-progress service requests for the product shall be paused until the transfer is accepted or rejected.

#### **3.3 Digital Warranty Card**
*   The system shall generate a unique digital warranty card, identified by a UUID, for each registered product warranty.
*   The system shall allow a user to toggle between multiple warranty cards if a product has more than one.
*   Each digital warranty card shall display the Warranty Expiry Date.
*   Each digital warranty card shall provide a link to view the uploaded Terms and Service Conditions document. These documents shall be managed and uploaded by Brand Admins.
*   Each digital warranty card shall display a color-coded badge indicating the warranty status.
*   The warranty status badge shall be Green if the warranty is valid.
*   The warranty status badge shall be Amber if the warranty will expire within 30 days.
*   The warranty status badge shall be Red if the warranty is expired.
*   Each digital warranty card shall provide a clear link to its associated invoice.
*   Each digital warranty card shall display a summary of the product's service history.

#### **3.4 Service Request Module**
*   The system shall allow a User to raise a service request from a product's digital warranty card.
*   The system shall prevent the creation of a service request for any product whose brand is in a 'pending approval' state. The user interface shall clearly communicate this restriction.
*   The system shall automatically route the service request to an appropriate service center based on the product's brand and the user's location, matching against the service center's defined service areas. If multiple service centers match, the request shall be routed using a round-robin algorithm.
*   The system shall display an informative message if no service centers are available for the user's location and product brand, guiding them to contact the brand directly via contact information provided by the Brand Admin.
*   The service request form shall pre-populate product details (Brand, Model, Serial).
*   The service request form shall require the User to select a type of issue from a dropdown list managed by Brand Admins per product category, or select 'Other' to enter free text.
*   The service request form shall require the User to provide a detailed description of the problem.
*   The service request form shall allow the User to upload up to 5 photos or 1 video (max 60 seconds) of the issue.
*   The service request form shall capture the User's address and contact information.
*   The service request form shall allow the User to select preferred visit date and time slots from the service center's available schedule.
*   Upon submission, the system shall create a service request ticket with the status 'Requested'.
*   The system shall notify the appropriate service center when a new ticket is created.
*   The system shall allow a User to track the status of a service request in real-time through the following stages: Requested, Acknowledged, Technician Assigned, Technician On The Way, Work In Progress, Resolved/Closed.
*   The system shall provide a two-way chat feature within the service request for communication between the User and the assigned Service Center/Technician. Chat history shall be retained for the life of the service request plus 1 year.
*   The system shall allow a User to cancel a service request before its status is changed to 'Technician On The Way'.
*   Upon resolution, the system shall allow the User to view a service summary, including notes from the technician and parts used.
*   The system shall prompt the User to provide a rating (1-5 stars) and optional feedback for the service once a ticket is closed.
*   The system shall allow a User to initiate a 'Dispute' within 7 days of a resolution if they are unsatisfied.
*   A disputed ticket's status shall be changed to 'Disputed', re-opening the ticket and notifying the Brand Administrator for review.

#### **3.5 Service Center & Technician Panel**
*   The system shall provide a web panel for Service Center Admins.
*   The Service Center Panel shall display all incoming service requests for their associated brands.
*   The Service Center Panel shall allow admins to filter and search requests by status, date, brand, or technician.
*   The Service Center Panel shall allow admins to assign and re-assign requests to specific technicians.
*   The Service Center Panel shall allow admins to view technician availability (Available, On-Job, Offline) and current workload (number of open tickets).
*   The Service Center Panel shall allow admins to update service notes and add details of parts used.
*   The Service Center Panel shall allow admins to close service tickets after completion.
*   The Service Center Panel shall allow admins to manage their roster of technicians (add, edit, deactivate profiles). A technician profile shall include Full Name, Contact Number, Email, Photo, and Skills/Certifications.
*   The system shall provide a mobile application for Technicians.
*   The Technician mobile application shall display a list of jobs assigned to that technician, ordered by appointment time.
*   The Technician mobile application shall provide access to customer and product details for each assigned job.
*   The Technician mobile application shall allow a technician to update their job status (e.g., 'On The Way', 'Work In Progress').
*   The Technician mobile application shall allow a technician to activate a 'Travel Mode' for a specific job, which shares their location with the customer. This mode can be activated independently of the primary job status (e.g., 'On The Way' or 'Traveling for Parts' during a 'Work In Progress' job).
*   The Technician app shall, with explicit user permission, share the technician's location data only when 'Travel Mode' is active for a job. Activation and deactivation of this mode shall be logged. Location data history shall be purged 24 hours after job completion.
*   The Technician mobile application shall allow a technician to enter service completion notes, including parts used.
*   The Technician mobile application shall allow a technician to capture the customer's digital signature as an image file (PNG) as proof of service completion.
*   The Technician mobile application shall allow a technician to mark a job as 'Resolved' to close the ticket.

#### **3.6 Warranty Claim Verification**
*   The system shall automatically check a product's warranty validity against its expiry date when a service request is raised.
*   If multiple warranties exist (e.g., primary and extended), the system shall check against all valid warranties and flag the claim accordingly.
*   The system shall flag the service request ticket as 'In Warranty' or 'Out of Warranty'.
*   The system shall allow a Service Center Admin or Brand Admin to view the warranty status of a claim.
*   The system shall allow an Admin to approve or reject a claim for free service or parts.
*   The system shall require an Admin to provide a reason for rejecting a claim from a predefined list (e.g., 'Physical Damage', 'Unauthorized Repair', 'Out of Scope') or free text.
*   Reasons for rejection shall be visible to the user.
*   The system shall maintain a complete history of all claims, resolutions, and spare parts used for each product.
*   The system shall maintain an audit trail that logs which admin approved or rejected a claim, including Admin ID, Ticket ID, Action (Approved/Rejected), Reason, and Timestamp.

#### **3.7 Invoice Vault**
*   The system shall provide a secure, centralized digital storage vault for all invoices uploaded by a user.
*   The system shall utilize Optical Character Recognition (OCR) to attempt to automatically parse and pre-fill fields like Product Name, Brand, Purchase Date, and Serial Number from uploaded invoices, requiring user confirmation before saving.
*   The system shall store both the raw OCR-extracted text and the user-confirmed data to facilitate accuracy improvements. If OCR fails to extract a field, the user must input it manually.
*   The system shall allow a user to view, download, or share their stored invoices.
*   The system shall allow a user to search for invoices by product name, brand, or category.
*   The system shall allow a user to filter invoices by a purchase date range.

#### **3.8 Brand Dashboard**
*   The system shall provide a secure web portal for registered brands.
*   The Brand Dashboard shall display analytics related to the brand's products.
*   The Brand Dashboard shall include widgets for: Total registered products, Active vs. Expired warranties, and Volume of ongoing service requests.
*   The Brand Dashboard shall include a widget for the Average resolution time for service requests.
*   The Brand Dashboard shall provide an analysis of frequent fault patterns based on 'Type of issue' data.
*   The Brand Dashboard shall display the geographic distribution of registered products and service requests on a map, based on the user's address provided during service requests.
*   The Brand Dashboard shall provide a dedicated view to manage and resolve disputed service requests escalated to the brand.
*   The system shall allow a Brand Admin to export all reports in CSV and PDF formats.

#### **3.9 User Mobile App**
*   The system shall provide a mobile application for end-users.
*   The mobile app shall allow a user to add a product by scanning a barcode or QR code (UPC, EAN, or custom QR formats) with the device's camera.
*   The system shall maintain a database to map known barcode values to product Brand and Model information.
*   The system shall attempt to pre-fill Brand and Model fields based on a scanned code.
*   The system shall require the user to manually enter or verify the serial number after scanning.
*   The mobile app shall allow a user to view all their registered products and digital warranty cards.
*   The mobile app shall allow a user to raise a new service request.
*   The mobile app shall allow a user to track the status of ongoing service requests.
*   The mobile app shall display the technician's profile (name, photo) and live location on a map, providing an updated ETA when the technician has activated 'Travel Mode' for their job.
*   The mobile app shall include a notification center where users can view a history of all alerts and messages.

### **4. Interface Requirements**

#### **4.1 User Interfaces**
*   All user interfaces shall have a clean, intuitive, and responsive design.
*   The mobile app shall follow platform-specific (iOS/Android) human interface guidelines.
*   All web panels shall be fully responsive and functional on screen sizes from desktop monitors down to tablets.
*   All user interfaces shall provide clear visual feedback for user actions, such as loading indicators, success messages, and validation errors.
*   All user interfaces shall comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
*   A consistent branding theme (logo, color palette, typography) shall be applied across all web and mobile interfaces.

#### **4.2 Hardware Interfaces**
*   The user mobile app shall require access to the device camera for scanning barcodes/QR codes and for uploading photos/videos of product issues.
*   The technician mobile app shall require access to the device's GPS for real-time location sharing.
*   The user mobile app shall require location services to display the technician's position on a map.
*   The system shall require an active internet connection (Wi-Fi or cellular data) on all client devices to function.

#### **4.3 Communication & Software Interfaces**
*   All communication between clients and the backend shall be over HTTPS using TLS 1.3.
*   Real-time location updates shall use Secure WebSockets (WSS).
*   The standard data format for all API requests and responses shall be JSON.
*   All REST APIs shall be versioned (e.g., /api/v1/...) to ensure backward compatibility for client applications.
*   The system shall integrate with Firebase Cloud Messaging (FCM) for sending push notifications.
*   The system shall integrate with Azure Communication Services for sending transactional emails and SMS messages for OTP.
*   The system shall integrate with Mapbox for displaying technician location and calculating ETAs.
*   Communication between microservices shall occur via a combination of synchronous REST APIs through the service mesh and asynchronous events via Azure Service Bus.
*   All asynchronous event schemas shall be formally defined using JSON Schema and maintained in a central schema registry.
*   The Location Service shall use WebSockets for real-time communication with clients.

### **5. Non-Functional Requirements**

#### **5.1 Performance**
*   The 95th percentile (P95) latency for all standard API endpoints shall be below 250ms.
*   The API for product registration, including invoice upload and processing, shall have a 95th percentile (P95) response time of less than 500ms.
*   Core web panel pages shall achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds.
*   The mobile application shall have a cold start time of less than 3 seconds.
*   Location updates from the technician's device to the user's map display shall have a latency of less than 2 seconds.

#### **5.2 Security**
*   All user access shall be authenticated via Azure Active Directory B2C.
*   Authentication shall enforce OTP-based multi-factor authentication for all users.
*   API access shall be controlled using short-lived JWT access tokens issued by Azure AD B2C and validated at the Azure API Management gateway.
*   The system shall implement rate limiting and throttling on all public-facing APIs to prevent denial-of-service and brute-force attacks.
*   The system shall perform strict input validation on all data received via APIs to prevent common vulnerabilities such as SQL Injection and Cross-Site Scripting (XSS).
*   A strict Role-Based Access Control (RBAC) model shall be enforced at the API Gateway and re-verified at the microservice level. The defined roles are:
    *   A 'User' role shall only be permitted to access and manage their own data.
    *   A 'Technician' role shall only be permitted to view and update details of jobs specifically assigned to them.
    *   A 'Service Center Admin' role shall be permitted to view all tickets for their center, manage their technicians, and assign jobs.
    *   A 'Brand Admin' role shall be permitted to view all data and analytics related to their brand, manage service claims, and oversee associated service centers.
    *   A 'Super Admin' role shall be permitted to manage the onboarding of brands and service centers and oversee the entire platform.
*   Database Row-Level Security (RLS) shall be used as a secondary defense layer in PostgreSQL to enforce data isolation between tenants.
*   All data shall be classified (e.g., Public, Confidential, PII) and handled according to a defined data protection policy.
*   All data shall be encrypted in transit using TLS 1.3.
*   All Personally Identifiable Information (PII) and sensitive documents shall be protected using standard data encryption at rest and in transit.
*   All data stored in databases (Azure Database for PostgreSQL), file storage (Azure Blob Storage), and caches (Azure Cache for Redis) shall be encrypted at rest using platform-managed keys.
*   All PII shall be masked or anonymized in non-production environments (Development, Staging).
*   All application secrets, including database credentials and API keys, shall be stored and managed securely using Azure Key Vault and injected into AKS pods at runtime via the Azure Key Vault Provider for Secrets Store CSI Driver.
*   The system shall undergo regular vulnerability scanning and penetration testing at least annually and after any major architectural changes.

#### **5.3 Reliability & Disaster Recovery**
*   The system shall have a Recovery Time Objective (RTO) of less than 4 hours.
*   The system shall have a Recovery Point Objective (RPO) of less than 15 minutes.
*   The primary database (Azure Database for PostgreSQL - Flexible Server) shall be configured for automated daily snapshots.
*   Automated database snapshots shall have a retention period of 30 days.
*   Point-in-time recovery shall be enabled for the primary database.
*   Database snapshots and file storage (Azure Blob Storage) shall be geo-replicated to a secondary Azure region for disaster recovery.
*   The disaster recovery plan, including failover to the secondary region, shall be tested and documented at least twice per year.
*   The system shall be deployed across multiple Availability Zones within an Azure region.
*   In case of a failure in one Availability Zone, traffic shall be automatically routed to healthy instances in other zones via Azure Load Balancer.

#### **5.4 Availability**
*   The platform shall have a target uptime of 99.9%, excluding planned maintenance.
*   Planned maintenance windows shall be scheduled during off-peak hours (1 AM - 4 AM local time).
*   Users shall be communicated to at least 24 hours in advance of planned maintenance via in-app notifications.
*   In the event of a non-critical service failure (e.g., reporting service), the core functionality of the platform (e.g., raising service requests) shall remain operational (graceful degradation).

#### **5.5 Scalability**
*   The system shall be able to scale horizontally to handle load.
*   Microservices deployed on AKS shall be configured with Horizontal Pod Autoscalers (HPA) to automatically adjust the number of running instances based on CPU and memory usage.
*   The system shall be designed to support an initial load of 10,000 concurrent users and architected to scale to 100,000 concurrent users with the addition of resources.
*   The database architecture shall use read replicas to offload read-heavy queries, such as those for analytics dashboards, from the primary database instance.

#### **5.6 Maintainability**
*   All code shall adhere to defined linting rules and style guides enforced by ESLint and Prettier in the CI pipeline.
*   All backend services shall have a minimum of 80% unit test coverage, validated in the CI/CD pipeline using Jest.
*   All API endpoints shall be documented using the OpenAPI specification, with interactive documentation available via a hosted Swagger UI instance.
*   All services shall implement structured logging (JSON format) with a unique correlation ID that is passed between services to allow for end-to-end request tracing.
*   All environment-specific configurations shall be managed centrally and not stored in the codebase.
*   The microservices architecture shall ensure high modularity and low coupling between components.

#### **5.7 Localization**
*   All user-facing text in web and mobile applications shall be externalized from the code to support internationalization.
*   The system shall initially support English (en-US). The architecture must allow for the addition of new languages without code changes.
*   The system shall correctly handle and display region-specific date, time, and number formats.

#### **5.8 Documentation**
*   The system shall have comprehensive technical documentation, including the auto-generated OpenAPI specification for APIs.
*   User Guides shall be provided for each user role (Consumer, Brand Admin, Service Center Admin, Technician).
*   A System Administration Guide shall be created, detailing procedures for platform management, user onboarding, and configuration.

#### **5.9 Auditability**
*   The system shall maintain an immutable audit trail for all critical actions.
*   Auditable events shall include, but are not limited to: user login/logout, changes to user roles and permissions, creation/modification/deletion of key data entities (products, warranties, service requests), and all administrative actions performed by Super Admins.
*   Each audit log entry shall contain the user ID, the action performed, a timestamp, the source IP address, and the outcome of the action.
*   Audit logs shall be retained for a minimum of 24 months in a secure, tamper-proof storage system.

### **6. Reporting, Reminders & Alerts**

#### **6.1 Reminders & Alerts**
*   The system shall send automated warranty expiry reminders to users via push notification and email at 30 days and 7 days before expiry.
*   The system shall allow users to set and receive recurring service schedule reminders for products with maintenance needs (e.g., AC servicing).
*   The system shall send a push notification to the user when a service request is successfully created.
*   The system shall send a push notification to the user when a technician has been assigned to their service request.
*   The system shall send a push notification to the user when a technician's status is 'On The Way', including an ETA.
*   The system shall send a push notification to the user when a service request status is updated to 'Resolved' or 'Closed'.
*   The system shall send a push notification to the user when their warranty claim has been Approved or Rejected.
*   The system shall send a push notification to the user when a new message is received in the service ticket chat.
*   The system shall provide a settings area where users can manage their notification preferences (e.g., enable/disable specific alert types for push, email, or SMS).

#### **6.2 Reports**
*   The system shall provide Brand Admins with reports on Product Registration Trends (by model, region), Warranty Status Distribution (Active vs. Expired), Service Request Volume & Trends, Average Service Resolution Time, and Frequent Fault Pattern Analysis.
*   All Brand Admin reports shall be exportable to CSV and PDF.
*   The system shall provide Service Centers with reports on Ticket Volume (by brand, status) and Technician Performance (tickets closed, average resolution time, customer ratings).
*   The system shall provide Super Admins with reports on Platform Usage Statistics (active users, products registered) and the Brand and Service Center Onboarding Funnel.
*   All reports shall support filtering by custom date ranges.

### **7. Monitoring & Observability**
*   The system shall use Prometheus to scrape performance metrics from all services and infrastructure within the AKS cluster.
*   Key metrics including API latency, error rates (HTTP 4xx/5xx), CPU/memory utilization, and queue lengths shall be collected.
*   All services shall output structured JSON logs to stdout.
*   All logs shall be aggregated into a centralized Azure Monitor Logs workspace for long-term storage and analysis.
*   The system shall integrate OpenTelemetry into all services to enable distributed tracing, with traces exported to Azure Monitor Application Insights.
*   The system shall use Grafana for real-time operational dashboards visualizing metrics from Prometheus.
*   The system shall use Alertmanager, integrated with Prometheus, to send critical alerts to the on-call engineering team via Slack and PagerDuty based on predefined thresholds and rules.
*   An on-call rotation and escalation policy shall be defined and implemented.
*   Runbooks shall be created for common critical alerts to guide on-call engineers in troubleshooting and resolution.

### **8. Business Rules & Constraints**

#### **8.1 General Business Rules**
*   A service request cannot be created for a product associated with a Brand whose status is not 'Approved'.
*   Critical product details (Serial Number, Purchase Date, Model) are locked from user edits after the first service request is raised for that product.
*   A product transfer request automatically expires if not accepted by the recipient within 72 hours.
*   A user can dispute a resolved service request only within 7 calendar days of its resolution.
*   A service request is automatically routed to the next available service center in a round-robin fashion if multiple centers serve the same brand and geographic area.

#### **8.2 Regulatory & Legal Compliance**
*   The system shall comply with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) regarding user data, consent, and data subject rights (e.g., right to access, right to be forgotten).
*   All users must accept the platform's Terms of Service and Privacy Policy during the registration process before their account is created.
*   The system shall provide a mechanism for users to request the export or deletion of their personal data.
*   The Privacy Policy shall be accessible from within the application at all times.

#### **8.3 Organizational Policies & SLAs**
*   **Brand/Service Center Onboarding:** New Brand and Service Center registration requests shall be reviewed by a Super Admin within 3 business days.
*   **Service Request Acknowledgment:** Service Centers must change the status of a new service request from 'Requested' to 'Acknowledged' within 4 business hours of receipt.
*   **Dispute Resolution:** Disputed service requests escalated to a Brand Admin must be reviewed and actioned within 5 business days.

### **9. System Transition Requirements**

#### **9.1 Implementation Strategy**
*   The system shall be deployed using a phased rollout strategy.
*   **Phase 1 (Pilot):** The platform will launch with a limited set of 2-3 pre-selected brands and their associated service centers in a single geographic region for a period of 60 days to gather feedback and validate core functionality.
*   **Phase 2 (Regional Expansion):** Based on the success of the pilot, the system will gradually onboard new brands and service centers within the initial country or region over a period of 6 months.
*   **Phase 3 (Full Launch):** The platform will be made available for public and international onboarding following the successful completion of Phase 2.

#### **9.2 Data Migration Strategy**

##### **9.2.1 Bulk Data Import**
*   The system shall provide a mechanism for bulk import of data for new Brands and Service Centers.
*   Supported data entities for bulk import shall include Product Models, Warranty Defaults, and Technician Rosters.
*   Data for bulk import shall be provided in a predefined CSV or JSON format.
*   The system shall provide a data validation tool that checks imported files for formatting errors, data type mismatches, and constraint violations before committing the data to the database.
*   A detailed report of successful and failed records shall be generated after each import process.
*   A dry-run mode shall be available to allow administrators to validate a data file without making any changes to the system.

##### **9.2.2 Pre-Launch Data Loading**
*   A dedicated data migration plan shall be executed prior to the pilot launch to populate initial brand, service center, and product category data.
*   This process will involve data extraction from sources provided by pilot partners, transformation to the platform's required schema, and loading into the production database.
*   Post-migration data validation scripts shall be executed to ensure data integrity, and a formal sign-off from business stakeholders is required before go-live.

#### **9.3 Training Plan**
*   Role-based training materials shall be developed for each user type: Super Admin, Brand Admin, Service Center Admin, and Technician.
*   Training materials shall include user manuals (PDF), instructional videos, and FAQs, accessible through a dedicated help portal.
*   Live webinar training sessions shall be conducted for all pilot partners prior to the Phase 1 launch.

#### **9.4 Cutover Plan**
*   A detailed cutover plan shall be documented for the initial production deployment and any subsequent major releases.
*   The plan shall include a pre-cutover checklist, a minute-by-minute schedule of activities, and a communication plan for all stakeholders.
*   Go/No-Go criteria must be met before the cutover begins, including successful completion of all E2E tests and user acceptance testing (UAT) sign-off.
*   A post-cutover support team shall be on standby for a period of 72 hours to address any immediate issues.
*   A documented fallback procedure shall be in place to restore the previous state in case of a critical failure during the cutover window.

#### **9.5 Legacy System Decommissioning**
*   For any partner brands or service centers transitioning from a legacy system, a decommissioning plan shall be established.
*   The legacy system shall run in a read-only parallel mode for a stabilization period of 30 days post-launch.
*   After the stabilization period and stakeholder sign-off, a formal process for data archival and final shutdown of the legacy system shall be executed.