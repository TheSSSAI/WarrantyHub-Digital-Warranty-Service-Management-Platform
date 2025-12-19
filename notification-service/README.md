# WarrantyHub - Notification Service

## Overview

The Notification Service is a specialized microservice within the WarrantyHub platform responsible for managing and dispatching all user-facing communications. It adheres to a Hexagonal Architecture (Ports and Adapters) to decouple core notification logic from external providers like Firebase Cloud Messaging (FCM) and Azure Communication Services (ACS).

## Key Responsibilities

1.  **Event Consumption**: Listens to business events (e.g., `ServiceRequestStatusChanged`, `WarrantyExpiring`) via Azure Service Bus.
2.  **Dispatcher Logic**: Orchestrates the notification flow:
    *   Determines user preferences (Redis-backed).
    *   Selects appropriate templates (Handlebars).
    *   Routes to valid channels (Push, Email, In-App).
3.  **Push Notifications**: Manages FCM tokens and dispatches mobile alerts.
4.  **In-App Updates**: Delivers real-time notifications via WebSockets.
5.  **History & Audit**: Persists notification logs for the user's "Notification Center".

## Architecture

*   **Framework**: NestJS v10.x
*   **Language**: TypeScript
*   **Transport**: Azure Service Bus (Consumers), HTTP (API), WebSockets (Gateway)
*   **Persistence**: PostgreSQL (TypeORM), Redis (Caching)

## Prerequisites

*   Node.js >= 18
*   Docker & Docker Compose
*   PostgreSQL 14+
*   Redis 6+
*   Azure Service Bus Namespace
*   Firebase Project (for FCM)
*   Azure Communication Services Resource

## Setup & Installation

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Configuration**:
    Copy the example environment file and configure secrets.
    ```bash
    cp backend-services/notification-service/.env.example backend-services/notification-service/.env
    ```

3.  **Run Locally**:
    ```bash
    # Run in development mode
    npm run start:dev
    ```

## Testing

The service includes comprehensive unit and integration tests.

*   **Unit Tests**: `npm run test`
*   **Coverage**: `npm run test:cov`
*   **End-to-End**: `npm run test:e2e`

## Project Structure

```
src/
├── application/       # Application services and DTOs (Use Cases)
├── config/            # Configuration namespaces
├── core/              # Domain entities and port interfaces
├── infrastructure/    # Adapters (FCM, Email, DB, Service Bus)
├── presentation/      # Controllers and Gateways
├── app.module.ts      # Root module
└── main.ts            # Entry point
```

## Contributing

Please adhere to the repository's `.eslintrc.js` and `.prettierrc` configurations. Ensure all new features are covered by tests.