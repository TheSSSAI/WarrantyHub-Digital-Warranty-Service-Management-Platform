# Warranty Hub - Enterprise Architecture Documentation

## Executive Summary
This document outlines the enterprise architecture for the Warranty Hub platform, a centralized, cloud-native SaaS solution designed to connect consumers, brands, and service centers. The architecture is built upon a decomposed microservices model deployed on Microsoft Azure, leveraging a modern technology stack including Node.js (NestJS), React, React Native, and PostgreSQL. The primary architectural driver was to evolve from a monolithic backend into a collection of independently deployable, domain-aligned services. This strategic decomposition enables parallel development, provides clear ownership boundaries, enhances system scalability and resilience, and allows for the use of specialized technologies (e.g., PostGIS for geospatial data) where appropriate. The result is an agile, maintainable, and highly scalable platform poised to meet its demanding functional and non-functional requirements.

## Solution Architecture Overview
- **Technology Stack**: The platform is built on a Node.js (v20 LTS) and NestJS (v10) backend, with Next.js (React) for web portals and React Native for mobile applications. Persistence is handled by Azure Database for PostgreSQL (v16) with PostGIS, Azure Cache for Redis for caching, and Azure Blob Storage for files. The entire solution is hosted on Microsoft Azure.
- **Architectural Patterns**: The system employs a **Microservices Architecture**, with services communicating via an **API Gateway** (Azure API Management). Internal communication leverages both synchronous **Request-Reply** (REST) for immediate needs and asynchronous **Publish-Subscribe** (Azure Service Bus) for decoupled, event-driven workflows. **Real-time Push** (WebSockets) is used for features like chat and live location tracking.
- **Integration Approach**: All external clients (web and mobile) interact with the system through the unified API Gateway, which handles authentication, routing, and rate limiting. Internally, services are decoupled through a combination of direct REST calls for tightly coupled queries and an event bus (Azure Service Bus) for broadcasting domain events, ensuring high cohesion and low coupling.

## Repository Architecture Strategy
- **Decomposition Rationale**: The architecture was refactored from a single backend monorepo into 15 distinct repositories. This was driven by the need to align software components with business domains (e.g., Identity, Product Management, Service Requests), enabling independent development, testing, scaling, and deployment. This fine-grained approach reduces cognitive load on development teams and minimizes the blast radius of failures.
- **Optimization Benefits**: This strategy yields significant benefits:
    - **Independent Deployability**: Each microservice can be deployed without impacting others, increasing release velocity.
    - **Technology Specialization**: Services can use the best tool for the job (e.g., `service-center-service` using PostGIS, `geolocation-service` optimized for WebSockets).
    - **Clear Ownership**: Teams have clear ownership of their services, from code to deployment.
    - **Enhanced Scalability**: Each service can be scaled independently based on its specific load profile.
- **Development Workflow**: Teams work in parallel on their respective service or library repositories. Shared dependencies (`warranty-hub-contracts`, `warranty-hub-nestjs-shared`, `warranty-hub-web-ui-components`) are versioned and published to a private registry, allowing consuming repositories to upgrade dependencies deliberately. Infrastructure is managed separately via a GitOps workflow in the `warranty-hub-infrastructure` repository.

## System Architecture Diagrams

### Repository Dependency Architecture
This diagram illustrates the dependencies between the various repositories, grouped by their architectural layer. Arrows indicate the direction of dependency (e.g., an application depends on a library).

### Component Integration Patterns
This diagram shows the runtime communication patterns between the major logical components of the system, including clients, the API gateway, microservices, and backing PaaS services.

## Repository Catalog

- **REPO-FE-002: warranty-hub-webapp**: The primary Next.js (React) web application for consumers, brand admins, and service center admins. It consumes the shared UI component library and interacts with the backend via the API Gateway.
- **REPO-FE-003: warranty-hub-mobile**: The React Native cross-platform mobile application for consumers and technicians. It leverages native device features and communicates with the backend via REST and WebSockets.
- **REPO-GW-013: api-gateway**: Declarative configuration (IaC) for the Azure API Management instance. It defines all routing, JWT authentication policies, and rate limiting for the public-facing API.
- **REPO-BS-001: identity-service**: Manages all user identity and access control. Responsible for registration, authentication (JWT issuance via Azure AD B2C), and role management.
- **REPO-BS-002: product-service**: Core domain service for managing brands, product models, user-registered products, and warranties. Triggers asynchronous invoice processing.
- **REPO-BS-003: service-center-service**: Specialized service for managing service center profiles and their complex geospatial service areas using PostGIS.
- **REPO-BS-004: service-request-service**: Orchestrates the entire service ticket lifecycle, including status management, routing logic, and the real-time chat feature via WebSockets.
- **REPO-BS-005: geolocation-service**: A performance-critical, specialized service for ingesting and broadcasting technician GPS coordinates in real-time via WebSockets.
- **REPO-BS-006: notification-service**: An event-driven service that listens for business events and sends notifications to users via various channels (FCM push, email, SMS).
- **REPO-BS-007: reporting-service**: A read-optimized service that queries a database read replica to generate analytics for admin dashboards without impacting transactional performance.
- **REPO-BW-008: audit-service**: A background worker that subscribes to audit events and persists them to an immutable log for compliance and security.
- **REPO-BW-009: async-processors-service**: Hosts background workers for long-running tasks, including the invoice OCR processor and a scheduled job for expiring ownership transfers.
- **REPO-CL-010: warranty-hub-contracts**: The single source of truth for all data contracts, including OpenAPI specifications and event schemas, published as a versioned package.
- **REPO-SL-011: warranty-hub-nestjs-shared**: A shared library for all backend NestJS services, providing common modules for logging, authentication, error handling, and other cross-cutting concerns.
- **REPO-SL-012: warranty-hub-web-ui-components**: A shared React component library, developed in Storybook, to ensure a consistent and accessible UI across all web portals.
- **REPO-IN-004: warranty-hub-infrastructure**: The Infrastructure as Code (IaC) repository, containing all Terraform definitions for provisioning the Azure cloud resources.

## Integration Architecture
- **Synchronous Communication (REST)**: Used for request-response interactions where an immediate response is required. This is the primary pattern for client-to-gateway communication and for internal service-to-service queries (e.g., `service-request-service` querying `product-service` for warranty details).
- **Asynchronous Communication (Events)**: Azure Service Bus is used to decouple services and handle background processing. The **Publish-Subscribe** pattern is used for domain events (e.g., `ServiceRequestStatusChanged`), allowing multiple consumers to react independently. The **Message Queue** pattern is used for commands (e.g., `InvoiceUploadedForProcessing`) that should be handled by a single worker.
- **Real-time Communication (WebSockets)**: Used for features requiring low-latency, bidirectional communication. The `geolocation-service` uses WebSockets to stream GPS data, and the `service-request-service` uses them to power the in-app chat.
- **Interface Contracts**: All integration points are formally defined in the `warranty-hub-contracts` repository. This contract-first approach ensures stability and allows for parallel development.

## Technology Implementation Framework
- **Backend**: Services are built with NestJS, leveraging its modular architecture, dependency injection, and decorators for routing and validation. Data access uses an ORM (like TypeORM or Prisma) with the shared library providing base repository patterns. Security is handled by NestJS Guards that validate JWTs.
- **Frontend (Web)**: The web application uses Next.js with TypeScript. State management is handled by Zustand. Data fetching is done via a typed API client generated from the OpenAPI contract. All UI is composed from the `warranty-hub-web-ui-components` library.
- **Frontend (Mobile)**: The mobile app uses React Native with TypeScript. It shares the same state management (Zustand) and API client patterns as the web app but adds native integrations for camera, GPS, and push notifications.

## Performance & Scalability Architecture
- **Scalability**: The entire backend is containerized with Docker and deployed on Azure Kubernetes Service (AKS). Each microservice is configured with a Horizontal Pod Autoscaler (HPA) to scale horizontally based on CPU and memory load, or custom metrics like queue length for workers.
- **Performance**: 
    - **API Latency (<250ms)**: Achieved through efficient code, database indexing, and caching of frequently accessed data (e.g., brand lists) in Azure Cache for Redis.
    - **Real-time Latency (<2s)**: The dedicated `geolocation-service` is highly optimized for WebSocket traffic and uses Redis as a fast in-memory store to meet this strict SLO.
    - **Reporting**: The `reporting-service` uses a PostgreSQL read replica to isolate analytical queries, ensuring they do not slow down the primary transactional database.

## Development & Deployment Strategy
- **Team Organization**: Teams can be aligned to specific business domains and own the corresponding microservice repositories, fostering expertise and accountability.
- **Workflows**: Development follows a standard GitFlow or Trunk-Based model within each repository. Pull requests trigger automated builds, linting, and tests.
- **CI/CD**: Each repository has its own independent CI/CD pipeline (e.g., using GitHub Actions). On merge to the main branch, a new version of the service's Docker image or library package is built, tested, and pushed to a registry. Deployments to different environments (Dev, Staging, Prod) are automated and can be triggered independently for each service.
- **Infrastructure**: The `warranty-hub-infrastructure` repository uses a GitOps model. Changes to Terraform code are reviewed via pull requests, and an automated pipeline plans and applies the changes to the Azure environment.

## Architecture Decision Records

- **ADR-001: Decompose Backend into Microservices**: We chose to break down the monolithic backend into multiple, domain-aligned microservices to enable independent scaling, deployment, and development, improving overall agility and maintainability.
- **ADR-002: Isolate Specialized & Critical Services**: Services with unique technological needs (PostGIS), extreme performance requirements (Geolocation), or critical functions (Identity) were separated to prevent their concerns from complicating or impacting the core system.
- **ADR-003: Centralize Data Contracts**: A dedicated repository (`warranty-hub-contracts`) was created for OpenAPI and event schemas. This establishes a single source of truth, enabling contract-first development and decoupling clients from services.
- **ADR-004: Create Shared Libraries for Cross-Cutting Concerns**: Common code for backend (logging, auth) and frontend (UI components) was extracted into versioned libraries to reduce code duplication, enforce consistency, and simplify platform-wide updates.
- **ADR-005: Separate Infrastructure from Application Code**: All Terraform code was isolated in its own repository to decouple the infrastructure lifecycle from the application lifecycle, enabling better security, management, and a GitOps approach to infrastructure.