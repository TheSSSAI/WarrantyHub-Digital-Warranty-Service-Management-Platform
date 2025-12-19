# Audit Service

This microservice acts as a dedicated worker to consume critical system events and persist them into an immutable audit log. It is built with NestJS and utilizes Azure Service Bus for event ingestion and PostgreSQL for data persistence.

## Architectural Overview

- **Type**: Background Worker Service
- **Pattern**: Event-Driven (Competing Consumers)
- **Input**: Azure Service Bus Topic Subscription (`CriticalActionOccurred` event)
- **Output**: Immutable records in the `audit_logs` table (PostgreSQL)

## Prerequisites

- Node.js (v20 LTS recommended)
- Docker & Docker Compose
- PostgreSQL Database
- Azure Service Bus Namespace

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

- `DB_HOST`: Database hostname
- `DB_PORT`: Database port (default: 5432)
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name (e.g., warranty_hub_audit)
- `ASB_CONNECTION_STRING`: Connection string for Azure Service Bus
- `ASB_TOPIC_NAME`: Name of the topic to subscribe to
- `ASB_SUBSCRIPTION_NAME`: Name of the subscription for this service

## Health Checks

The service exposes a health check endpoint for Kubernetes liveness/readiness probes:

- `GET /health`

## Architecture Compliance

This service implements **Level 5** of the repository dependency hierarchy. It depends on:
- Level 0: Domain Entities & DTOs
- Level 1: Interfaces
- Level 2: Infrastructure Implementations
- Level 3: App Module
- Level 4: Main Bootstrap

It adheres to strict separation of concerns, ensuring that the ingestion of audit events is completely decoupled from the services (Identity, Product, Service Request) generating them.