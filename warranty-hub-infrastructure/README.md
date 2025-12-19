# WarrantyHub Infrastructure

This repository contains the Terraform Infrastructure as Code (IaC) definitions for the WarrantyHub platform. It manages the provisioning and lifecycle of all Azure resources, ensuring compliance with security, reliability, and scalability requirements.

## Architecture

The infrastructure follows a modular, layer-based architecture:
- **Foundational Layer**: Networking (VNet, Subnets, NSGs), Security (Key Vault), Identity.
- **Data Layer**: PostgreSQL (Flexible Server), Redis Cache, Blob Storage.
- **Compute Layer**: Azure Kubernetes Service (AKS) for hosting microservices.
- **Integration Layer**: Service Bus, Event Grid.
- **Observability**: Log Analytics, Application Insights.

## Directory Structure

- `modules/`: Reusable Terraform modules for specific resources.
- `environments/`: Environment-specific configurations (Dev, Prod).
- `infrastructure/`: Shared infrastructure configurations.

## Prerequisites

- Terraform >= 1.9.0
- Azure CLI
- Valid Azure Subscription

## Usage

1. Navigate to the target environment:
   ```bash
   cd environments/dev
   ```
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Plan the deployment:
   ```bash
   terraform plan -out=tfplan
   ```
4. Apply the changes:
   ```bash
   terraform apply tfplan
   ```

## Disaster Recovery

To adhere to REQ-REL-001 (RTO < 4 hours), production configurations utilize GRS (Geo-Redundant Storage) and Zone-Redundant database deployments.

## Security

All sensitive outputs are marked as such. State files must be stored in a secure remote backend with encryption at rest.