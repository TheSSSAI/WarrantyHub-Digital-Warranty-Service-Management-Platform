# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- Microsoft Azure
- Azure Kubernetes Service (AKS)
- Azure Database for PostgreSQL (Flexible Server)
- Azure Cache for Redis
- Azure Service Bus
- Azure Blob Storage
- Azure API Management
- Azure AD B2C
- Node.js (NestJS)
- React (Next.js)
- React Native

## 1.3 Architecture Patterns

- Microservices
- Cloud-Native
- Event-Driven
- API Gateway
- Infrastructure as Code (Terraform)

## 1.4 Data Handling Needs

- Relational data (PostgreSQL)
- Geospatial data (PostGIS)
- Cached data (Redis)
- Unstructured file storage (Blob)
- Personally Identifiable Information (PII) requiring encryption and masking
- Asynchronous message queues (Service Bus)

## 1.5 Performance Expectations

High availability (99.9%), low latency (P95 < 250ms), and horizontal scalability to support 100,000 concurrent users.

## 1.6 Regulatory Requirements

- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)

# 2.0 Environment Strategy

## 2.1 Environment Types

### 2.1.1 Development

#### 2.1.1.1 Type

🔹 Development

#### 2.1.1.2 Purpose

Used by engineering teams for daily development, unit testing, and feature branching. Provides a sandbox for experimentation without affecting other environments.

#### 2.1.1.3 Usage Patterns

- Continuous integration builds
- Individual developer testing
- Low-volume, intermittent traffic

#### 2.1.1.4 Isolation Level

complete

#### 2.1.1.5 Data Policy

Seeded with sanitized, anonymized, or synthetic data. No production data allowed.

#### 2.1.1.6 Lifecycle Management

Can be ephemeral; resources may be scaled down or shut off during non-business hours to conserve costs.

### 2.1.2.0 Staging

#### 2.1.2.1 Type

🔹 Staging

#### 2.1.2.2 Purpose

A production-like environment for User Acceptance Testing (UAT), end-to-end testing, performance testing, and final validation before a production release.

#### 2.1.2.3 Usage Patterns

- Pre-release quality assurance
- End-to-end automated tests (Playwright)
- Performance load testing
- Stakeholder demos

#### 2.1.2.4 Isolation Level

complete

#### 2.1.2.5 Data Policy

A recent, fully anonymized snapshot of production data. PII must be masked as per REQ 5.2.

#### 2.1.2.6 Lifecycle Management

Persistently running, mirroring production infrastructure topology but at a smaller scale.

### 2.1.3.0 Production

#### 2.1.3.1 Type

🔹 Production

#### 2.1.3.2 Purpose

The live environment serving all end-users (consumers, brands, service centers). Hosts all live user data and handles all real-world traffic.

#### 2.1.3.3 Usage Patterns

- Live user traffic
- High-volume transactional and analytical workloads
- 24/7 availability

#### 2.1.3.4 Isolation Level

complete

#### 2.1.3.5 Data Policy

Live production data, subject to all security, privacy, and compliance controls (GDPR, CCPA).

#### 2.1.3.6 Lifecycle Management

Persistently running with high availability, monitoring, and on-call support. Changes are only made through a controlled CI/CD pipeline.

### 2.1.4.0 DR

#### 2.1.4.1 Type

🔹 DR

#### 2.1.4.2 Purpose

A disaster recovery environment in a secondary geographic region to ensure business continuity in case of a primary region failure. Fulfills RTO/RPO requirements.

#### 2.1.4.3 Usage Patterns

- Cold/Warm standby
- Periodic DR testing and failover drills

#### 2.1.4.4 Isolation Level

complete

#### 2.1.4.5 Data Policy

Geo-replicated data from the production environment (database snapshots, blob storage).

#### 2.1.4.6 Lifecycle Management

Maintained in a scaled-down state to minimize cost, ready to be scaled up during a DR event. Infrastructure is provisioned via Terraform.

## 2.2.0.0 Promotion Strategy

### 2.2.1.0 Workflow

GitFlow-based: Feature Branch -> Develop (Development) -> Release Branch -> Main (Staging -> Production).

### 2.2.2.0 Approval Gates

- Automated tests (unit, integration, E2E) must pass in CI pipeline.
- Code review and approval on pull requests.
- Successful deployment to Staging and sign-off from QA/Product Owner.
- Final approval for production deployment during a scheduled maintenance window.

### 2.2.3.0 Automation Level

automated

### 2.2.4.0 Rollback Procedure

Automated rollback to the previous stable release version via CI/CD pipeline if post-deployment health checks or smoke tests fail.

## 2.3.0.0 Isolation Strategies

### 2.3.1.0 Environment

#### 2.3.1.1 Environment

All

#### 2.3.1.2 Isolation Type

network

#### 2.3.1.3 Implementation

Each environment (Dev, Staging, Prod, DR) will be deployed into its own dedicated Azure Virtual Network (VNet), preventing any network-level crossover.

#### 2.3.1.4 Justification

Ensures strict security and stability boundaries, preventing development activities from impacting production.

### 2.3.2.0 Environment

#### 2.3.2.1 Environment

All

#### 2.3.2.2 Isolation Type

compute

#### 2.3.2.3 Implementation

Each environment will have its own dedicated AKS cluster and other PaaS resources (PostgreSQL, Redis, etc.).

#### 2.3.2.4 Justification

Prevents resource contention ('noisy neighbor' problem) and allows for environment-specific configuration and scaling.

### 2.3.3.0 Environment

#### 2.3.3.1 Environment

All

#### 2.3.3.2 Isolation Type

data

#### 2.3.3.3 Implementation

Separate Azure Database for PostgreSQL instances and Azure Blob Storage accounts for each environment.

#### 2.3.3.4 Justification

Critical for data security and compliance, ensuring production data never resides in non-production environments.

## 2.4.0.0 Scaling Approaches

### 2.4.1.0 Environment

#### 2.4.1.1 Environment

Production

#### 2.4.1.2 Scaling Type

horizontal

#### 2.4.1.3 Triggers

- CPU Utilization > 70%
- Memory Utilization > 75%

#### 2.4.1.4 Limits

Configured per-service via Kubernetes Horizontal Pod Autoscalers (HPA) and cluster autoscaler for nodes.

### 2.4.2.0 Environment

#### 2.4.2.1 Environment

Staging

#### 2.4.2.2 Scaling Type

horizontal

#### 2.4.2.3 Triggers

- CPU Utilization > 70%

#### 2.4.2.4 Limits

Limited to a lower maximum number of instances than production to control costs during load tests.

### 2.4.3.0 Environment

#### 2.4.3.1 Environment

Development

#### 2.4.3.2 Scaling Type

vertical

#### 2.4.3.3 Triggers

- Manual scaling by developers as needed.

#### 2.4.3.4 Limits

Fixed, small instance count (e.g., 1-2 replicas per service) to minimize costs.

## 2.5.0.0 Provisioning Automation

| Property | Value |
|----------|-------|
| Tool | terraform |
| Templating | Terraform modules will be used for reusable compon... |
| State Management | Terraform state will be stored remotely and secure... |
| Cicd Integration | ✅ |

# 3.0.0.0 Resource Requirements Analysis

## 3.1.0.0 Workload Analysis

### 3.1.1.0 Workload Type

#### 3.1.1.1 Workload Type

API Transactional

#### 3.1.1.2 Expected Load

High volume of short-lived read/write operations.

#### 3.1.1.3 Peak Capacity

100,000 concurrent users.

#### 3.1.1.4 Resource Profile

balanced

### 3.1.2.0 Workload Type

#### 3.1.2.1 Workload Type

Real-time Geolocation

#### 3.1.2.2 Expected Load

High frequency of WebSocket messages.

#### 3.1.2.3 Peak Capacity

Up to 10,000 concurrent technicians broadcasting location.

#### 3.1.2.4 Resource Profile

memory-intensive

### 3.1.3.0 Workload Type

#### 3.1.3.1 Workload Type

Asynchronous OCR Processing

#### 3.1.3.2 Expected Load

Bursty, background processing of uploaded files.

#### 3.1.3.3 Peak Capacity

Scales with user uploads.

#### 3.1.3.4 Resource Profile

cpu-intensive

### 3.1.4.0 Workload Type

#### 3.1.4.1 Workload Type

Reporting & Analytics

#### 3.1.4.2 Expected Load

Read-heavy queries on aggregated data.

#### 3.1.4.3 Peak Capacity

Concurrent dashboard usage by Brand Admins.

#### 3.1.4.4 Resource Profile

io-intensive

## 3.2.0.0 Compute Requirements

### 3.2.1.0 Environment

#### 3.2.1.1 Environment

Production

#### 3.2.1.2 Instance Type

Standard_D4as_v5 (General Purpose)

#### 3.2.1.3 Cpu Cores

4

#### 3.2.1.4 Memory Gb

16

#### 3.2.1.5 Instance Count

3

#### 3.2.1.6 Auto Scaling

##### 3.2.1.6.1 Enabled

✅ Yes

##### 3.2.1.6.2 Min Instances

3

##### 3.2.1.6.3 Max Instances

10

##### 3.2.1.6.4 Scaling Triggers

- Node CPU > 80%
- Node Memory > 80%

#### 3.2.1.7.0 Justification

Provides a balance of CPU and memory for mixed microservice workloads, with multi-AZ resilience and autoscaling to handle peak loads.

### 3.2.2.0.0 Environment

#### 3.2.2.1.0 Environment

Staging

#### 3.2.2.2.0 Instance Type

Standard_D2as_v5 (General Purpose)

#### 3.2.2.3.0 Cpu Cores

2

#### 3.2.2.4.0 Memory Gb

8

#### 3.2.2.5.0 Instance Count

2

#### 3.2.2.6.0 Auto Scaling

##### 3.2.2.6.1 Enabled

✅ Yes

##### 3.2.2.6.2 Min Instances

2

##### 3.2.2.6.3 Max Instances

4

##### 3.2.2.6.4 Scaling Triggers

- Node CPU > 80%

#### 3.2.2.7.0 Justification

Mirrors production architecture at a reduced scale for cost-effective UAT and performance testing.

### 3.2.3.0.0 Environment

#### 3.2.3.1.0 Environment

Development

#### 3.2.3.2.0 Instance Type

Standard_B2s (Burstable)

#### 3.2.3.3.0 Cpu Cores

2

#### 3.2.3.4.0 Memory Gb

4

#### 3.2.3.5.0 Instance Count

1

#### 3.2.3.6.0 Auto Scaling

##### 3.2.3.6.1 Enabled

❌ No

##### 3.2.3.6.2 Min Instances

1

##### 3.2.3.6.3 Max Instances

1

##### 3.2.3.6.4 Scaling Triggers

*No items available*

#### 3.2.3.7.0 Justification

Cost-optimized for intermittent developer workloads. A single node is sufficient for CI and individual testing.

## 3.3.0.0.0 Storage Requirements

### 3.3.1.0.0 Environment

#### 3.3.1.1.0 Environment

Production

#### 3.3.1.2.0 Storage Type

ssd

#### 3.3.1.3.0 Capacity

1TB (PostgreSQL), 5TB (Blob Storage)

#### 3.3.1.4.0 Iops Requirements

High

#### 3.3.1.5.0 Throughput Requirements

High

#### 3.3.1.6.0 Redundancy

Geo-redundant storage (GRS) for Blob; Geo-replicated read replicas for PostgreSQL.

#### 3.3.1.7.0 Encryption

✅ Yes

### 3.3.2.0.0 Environment

#### 3.3.2.1.0 Environment

Staging

#### 3.3.2.2.0 Storage Type

ssd

#### 3.3.2.3.0 Capacity

256GB (PostgreSQL), 500GB (Blob Storage)

#### 3.3.2.4.0 Iops Requirements

Medium

#### 3.3.2.5.0 Throughput Requirements

Medium

#### 3.3.2.6.0 Redundancy

Locally-redundant storage (LRS).

#### 3.3.2.7.0 Encryption

✅ Yes

### 3.3.3.0.0 Environment

#### 3.3.3.1.0 Environment

Development

#### 3.3.3.2.0 Storage Type

ssd

#### 3.3.3.3.0 Capacity

128GB (PostgreSQL), 100GB (Blob Storage)

#### 3.3.3.4.0 Iops Requirements

Low

#### 3.3.3.5.0 Throughput Requirements

Low

#### 3.3.3.6.0 Redundancy

Locally-redundant storage (LRS).

#### 3.3.3.7.0 Encryption

✅ Yes

## 3.4.0.0.0 Special Hardware Requirements

*No items available*

## 3.5.0.0.0 Scaling Strategies

- {'environment': 'Production', 'strategy': 'reactive', 'implementation': 'Kubernetes HPA for pods based on CPU/memory metrics; AKS Cluster Autoscaler for nodes.', 'costOptimization': 'Scale down during off-peak hours.'}

# 4.0.0.0.0 Security Architecture

## 4.1.0.0.0 Authentication Controls

### 4.1.1.0.0 Method

#### 4.1.1.1.0 Method

mfa

#### 4.1.1.2.0 Scope

All users across all portals and apps.

#### 4.1.1.3.0 Implementation

Azure Active Directory B2C policies enforcing OTP-based MFA.

#### 4.1.1.4.0 Environment

Production, Staging

### 4.1.2.0.0 Method

#### 4.1.2.1.0 Method

api-keys

#### 4.1.2.2.0 Scope

Programmatic access between services (if needed) and to third-party APIs.

#### 4.1.2.3.0 Implementation

Secrets stored in Azure Key Vault and injected into services at runtime.

#### 4.1.2.4.0 Environment

All

## 4.2.0.0.0 Authorization Controls

- {'model': 'rbac', 'implementation': 'Role-based claims in JWTs issued by Azure AD B2C, validated at Azure API Management gateway and re-verified at the microservice level.', 'granularity': 'fine-grained', 'environment': 'All'}

## 4.3.0.0.0 Certificate Management

| Property | Value |
|----------|-------|
| Authority | external |
| Rotation Policy | Automated renewal every 90 days. |
| Automation | ✅ |
| Monitoring | ✅ |

## 4.4.0.0.0 Encryption Standards

### 4.4.1.0.0 Scope

#### 4.4.1.1.0 Scope

data-in-transit

#### 4.4.1.2.0 Algorithm

TLS 1.3

#### 4.4.1.3.0 Key Management

Managed by Azure services (API Management, Load Balancer).

#### 4.4.1.4.0 Compliance

- GDPR
- CCPA

### 4.4.2.0.0 Scope

#### 4.4.2.1.0 Scope

data-at-rest

#### 4.4.2.2.0 Algorithm

AES-256

#### 4.4.2.3.0 Key Management

Azure platform-managed keys for PostgreSQL, Blob Storage, and Redis.

#### 4.4.2.4.0 Compliance

- GDPR
- CCPA

## 4.5.0.0.0 Access Control Mechanisms

- {'type': 'waf', 'configuration': 'Azure API Management policies to protect against common web vulnerabilities (OWASP Top 10).', 'environment': 'Production', 'rules': ['SQL Injection prevention', 'Cross-Site Scripting (XSS) prevention']}

## 4.6.0.0.0 Data Protection Measures

- {'dataType': 'pii', 'protectionMethod': 'anonymization', 'implementation': 'Custom scripts to mask or replace PII data when restoring production backups to Staging/Development environments.', 'compliance': ['GDPR', 'CCPA']}

## 4.7.0.0.0 Network Security

- {'control': 'ddos-protection', 'implementation': 'Azure DDoS Protection Standard enabled on the production VNet.', 'rules': [], 'monitoring': True}

## 4.8.0.0.0 Security Monitoring

### 4.8.1.0.0 vulnerability-scanning

#### 4.8.1.1.0 Type

🔹 vulnerability-scanning

#### 4.8.1.2.0 Implementation

Microsoft Defender for Containers to scan container images in ACR and running pods in AKS.

#### 4.8.1.3.0 Frequency

On every push to ACR and continuously for running workloads.

#### 4.8.1.4.0 Alerting

✅ Yes

### 4.8.2.0.0 pen-testing

#### 4.8.2.1.0 Type

🔹 pen-testing

#### 4.8.2.2.0 Implementation

Annual penetration testing conducted by a third-party vendor.

#### 4.8.2.3.0 Frequency

Annually and after major architectural changes.

#### 4.8.2.4.0 Alerting

❌ No

## 4.9.0.0.0 Backup Security

| Property | Value |
|----------|-------|
| Encryption | ✅ |
| Access Control | Azure RBAC policies restricting access to backup d... |
| Offline Storage | ❌ |
| Testing Frequency | Quarterly |

## 4.10.0.0.0 Compliance Frameworks

### 4.10.1.0.0 Framework

#### 4.10.1.1.0 Framework

gdpr

#### 4.10.1.2.0 Applicable Environments

- Production

#### 4.10.1.3.0 Controls

- Data encryption at rest and in transit
- Mechanisms for data access and deletion requests
- PII handling policies

#### 4.10.1.4.0 Audit Frequency

Annually

### 4.10.2.0.0 Framework

#### 4.10.2.1.0 Framework

ccpa

#### 4.10.2.2.0 Applicable Environments

- Production

#### 4.10.2.3.0 Controls

- User consent management
- Privacy policy visibility
- Data access rights implementation

#### 4.10.2.4.0 Audit Frequency

Annually

# 5.0.0.0.0 Network Design

## 5.1.0.0.0 Network Segmentation

- {'environment': 'Production', 'segmentType': 'private', 'purpose': 'Isolate backend compute and data tiers from public internet access.', 'isolation': 'virtual'}

## 5.2.0.0.0 Subnet Strategy

### 5.2.1.0.0 Environment

#### 5.2.1.1.0 Environment

Production

#### 5.2.1.2.0 Subnet Type

private

#### 5.2.1.3.0 Cidr Block

10.0.1.0/24

#### 5.2.1.4.0 Availability Zone

1

#### 5.2.1.5.0 Routing Table

private-rt

### 5.2.2.0.0 Environment

#### 5.2.2.1.0 Environment

Production

#### 5.2.2.2.0 Subnet Type

database

#### 5.2.2.3.0 Cidr Block

10.0.2.0/24

#### 5.2.2.4.0 Availability Zone

1

#### 5.2.2.5.0 Routing Table

private-rt

### 5.2.3.0.0 Environment

#### 5.2.3.1.0 Environment

Production

#### 5.2.3.2.0 Subnet Type

public

#### 5.2.3.3.0 Cidr Block

10.0.0.0/24

#### 5.2.3.4.0 Availability Zone

1

#### 5.2.3.5.0 Routing Table

public-rt

## 5.3.0.0.0 Security Group Rules

### 5.3.1.0.0 Group Name

#### 5.3.1.1.0 Group Name

aks-node-nsg

#### 5.3.1.2.0 Direction

inbound

#### 5.3.1.3.0 Protocol

tcp

#### 5.3.1.4.0 Port Range

443

#### 5.3.1.5.0 Source

api-management-subnet-cidr

#### 5.3.1.6.0 Purpose

Allow HTTPS traffic from API Management to the AKS cluster.

### 5.3.2.0.0 Group Name

#### 5.3.2.1.0 Group Name

db-nsg

#### 5.3.2.2.0 Direction

inbound

#### 5.3.2.3.0 Protocol

tcp

#### 5.3.2.4.0 Port Range

5432

#### 5.3.2.5.0 Source

aks-node-subnet-cidr

#### 5.3.2.6.0 Purpose

Allow PostgreSQL traffic from backend services.

### 5.3.3.0.0 Group Name

#### 5.3.3.1.0 Group Name

aks-node-nsg

#### 5.3.3.2.0 Direction

outbound

#### 5.3.3.3.0 Protocol

all

#### 5.3.3.4.0 Port Range

*

#### 5.3.3.5.0 Source

0.0.0.0/0

#### 5.3.3.6.0 Purpose

Allow egress traffic for pulling container images and accessing external APIs.

## 5.4.0.0.0 Connectivity Requirements

- {'source': 'AKS Microservices', 'destination': 'Internet (FCM, Mapbox)', 'protocol': 'HTTPS', 'bandwidth': '1 Gbps', 'latency': '< 50ms'}

## 5.5.0.0.0 Network Monitoring

- {'type': 'flow-logs', 'implementation': 'Azure Network Watcher NSG Flow Logs enabled for all security groups.', 'alerting': True, 'retention': '90 days'}

## 5.6.0.0.0 Bandwidth Controls

*No items available*

## 5.7.0.0.0 Service Discovery

| Property | Value |
|----------|-------|
| Method | dns |
| Implementation | Kubernetes native CoreDNS for intra-cluster servic... |
| Health Checks | ✅ |

## 5.8.0.0.0 Environment Communication

*No items available*

# 6.0.0.0.0 Data Management Strategy

## 6.1.0.0.0 Data Isolation

- {'environment': 'All', 'isolationLevel': 'complete', 'method': 'separate-instances', 'justification': 'Provides the highest level of security and prevents any possibility of cross-environment data contamination.'}

## 6.2.0.0.0 Backup And Recovery

### 6.2.1.0.0 Environment

#### 6.2.1.1.0 Environment

Production

#### 6.2.1.2.0 Backup Frequency

Daily (automated snapshots)

#### 6.2.1.3.0 Retention Period

30 days

#### 6.2.1.4.0 Recovery Time Objective

< 4 hours

#### 6.2.1.5.0 Recovery Point Objective

< 15 minutes

#### 6.2.1.6.0 Testing Schedule

Biannually

### 6.2.2.0.0 Environment

#### 6.2.2.1.0 Environment

Staging

#### 6.2.2.2.0 Backup Frequency

Weekly

#### 6.2.2.3.0 Retention Period

14 days

#### 6.2.2.4.0 Recovery Time Objective

24 hours

#### 6.2.2.5.0 Recovery Point Objective

24 hours

#### 6.2.2.6.0 Testing Schedule

Ad-hoc

## 6.3.0.0.0 Data Masking Anonymization

- {'environment': 'Staging, Development', 'dataType': 'PII', 'maskingMethod': 'static', 'coverage': 'complete', 'compliance': ['GDPR', 'CCPA']}

## 6.4.0.0.0 Migration Processes

- {'sourceEnvironment': 'Any', 'targetEnvironment': 'Any', 'migrationMethod': 'dump-restore', 'validation': 'Post-migration data validation scripts to ensure integrity.', 'rollbackPlan': 'Restore from pre-migration backup.'}

## 6.5.0.0.0 Retention Policies

### 6.5.1.0.0 Environment

#### 6.5.1.1.0 Environment

Production

#### 6.5.1.2.0 Data Type

Soft-deleted product records

#### 6.5.1.3.0 Retention Period

5 years

#### 6.5.1.4.0 Archival Method

Permanent purge after retention period expires.

#### 6.5.1.5.0 Compliance Requirement

REQ 3.2

### 6.5.2.0.0 Environment

#### 6.5.2.1.0 Environment

Production

#### 6.5.2.2.0 Data Type

Audit Logs

#### 6.5.2.3.0 Retention Period

24 months

#### 6.5.2.4.0 Archival Method

Secure, tamper-proof storage.

#### 6.5.2.5.0 Compliance Requirement

REQ 5.9

## 6.6.0.0.0 Data Classification

- {'classification': 'confidential', 'handlingRequirements': ['Encrypted at rest and in transit'], 'accessControls': ['Strict RBAC'], 'environments': ['Production']}

## 6.7.0.0.0 Disaster Recovery

- {'environment': 'Production', 'drSite': 'Secondary Azure Region', 'replicationMethod': 'asynchronous', 'failoverTime': '< 4 hours (RTO)', 'testingFrequency': 'Biannually'}

# 7.0.0.0.0 Monitoring And Observability

## 7.1.0.0.0 Monitoring Components

### 7.1.1.0.0 Component

#### 7.1.1.1.0 Component

apm

#### 7.1.1.2.0 Tool

Azure Monitor Application Insights

#### 7.1.1.3.0 Implementation

OpenTelemetry SDK integrated into all .NET microservices.

#### 7.1.1.4.0 Environments

- Staging
- Production

### 7.1.2.0.0 Component

#### 7.1.2.1.0 Component

infrastructure

#### 7.1.2.2.0 Tool

Azure Monitor for Containers, Prometheus

#### 7.1.2.3.0 Implementation

Azure Monitor Agent for AKS scrapes Prometheus metrics from services.

#### 7.1.2.4.0 Environments

- Staging
- Production

### 7.1.3.0.0 Component

#### 7.1.3.1.0 Component

logs

#### 7.1.3.2.0 Tool

Azure Monitor Logs

#### 7.1.3.3.0 Implementation

All services output structured JSON logs to stdout, which are collected and aggregated into a central Log Analytics Workspace.

#### 7.1.3.4.0 Environments

- All

### 7.1.4.0.0 Component

#### 7.1.4.1.0 Component

alerting

#### 7.1.4.2.0 Tool

Alertmanager, PagerDuty, Slack

#### 7.1.4.3.0 Implementation

Prometheus/Azure Monitor alerts are routed to Alertmanager, which then notifies on-call engineers via PagerDuty and Slack.

#### 7.1.4.4.0 Environments

- Production

## 7.2.0.0.0 Environment Specific Thresholds

### 7.2.1.0.0 Environment

#### 7.2.1.1.0 Environment

Production

#### 7.2.1.2.0 Metric

API P95 Latency

#### 7.2.1.3.0 Warning Threshold

200ms

#### 7.2.1.4.0 Critical Threshold

250ms

#### 7.2.1.5.0 Justification

Aligns with the strict performance SLO defined in REQ 5.1.

### 7.2.2.0.0 Environment

#### 7.2.2.1.0 Environment

Staging

#### 7.2.2.2.0 Metric

API P95 Latency

#### 7.2.2.3.0 Warning Threshold

400ms

#### 7.2.2.4.0 Critical Threshold

500ms

#### 7.2.2.5.0 Justification

Allows for more tolerance as the environment may be under heavier load during testing and uses smaller compute resources.

### 7.2.3.0.0 Environment

#### 7.2.3.1.0 Environment

Production

#### 7.2.3.2.0 Metric

Service Bus Dead-Letter Queue Count

#### 7.2.3.3.0 Warning Threshold

N/A

#### 7.2.3.4.0 Critical Threshold

> 0

#### 7.2.3.5.0 Justification

Any message in a DLQ represents a permanent failure that requires immediate investigation.

## 7.3.0.0.0 Metrics Collection

### 7.3.1.0.0 Category

#### 7.3.1.1.0 Category

🔹 application

#### 7.3.1.2.0 Metrics

- API Latency (P95, P99)
- Error Rates (HTTP 5xx)
- Request Throughput

#### 7.3.1.3.0 Collection Interval

15s

#### 7.3.1.4.0 Retention

90 days

### 7.3.2.0.0 Category

#### 7.3.2.1.0 Category

🔹 infrastructure

#### 7.3.2.2.0 Metrics

- Node CPU/Memory Utilization
- Pod CPU/Memory Utilization
- Database CPU/IOPS

#### 7.3.2.3.0 Collection Interval

60s

#### 7.3.2.4.0 Retention

90 days

## 7.4.0.0.0 Health Check Endpoints

### 7.4.1.0.0 Component

#### 7.4.1.1.0 Component

All Microservices

#### 7.4.1.2.0 Endpoint

/healthz/live

#### 7.4.1.3.0 Check Type

liveness

#### 7.4.1.4.0 Timeout

2s

#### 7.4.1.5.0 Frequency

15s

### 7.4.2.0.0 Component

#### 7.4.2.1.0 Component

All Microservices

#### 7.4.2.2.0 Endpoint

/healthz/ready

#### 7.4.2.3.0 Check Type

readiness

#### 7.4.2.4.0 Timeout

5s

#### 7.4.2.5.0 Frequency

10s

## 7.5.0.0.0 Logging Configuration

### 7.5.1.0.0 Environment

#### 7.5.1.1.0 Environment

Production

#### 7.5.1.2.0 Log Level

info

#### 7.5.1.3.0 Destinations

- Azure Monitor Logs

#### 7.5.1.4.0 Retention

90 days

#### 7.5.1.5.0 Sampling

none

### 7.5.2.0.0 Environment

#### 7.5.2.1.0 Environment

Staging

#### 7.5.2.2.0 Log Level

debug

#### 7.5.2.3.0 Destinations

- Azure Monitor Logs

#### 7.5.2.4.0 Retention

30 days

#### 7.5.2.5.0 Sampling

none

### 7.5.3.0.0 Environment

#### 7.5.3.1.0 Environment

Development

#### 7.5.3.2.0 Log Level

debug

#### 7.5.3.3.0 Destinations

- Azure Monitor Logs

#### 7.5.3.4.0 Retention

7 days

#### 7.5.3.5.0 Sampling

none

## 7.6.0.0.0 Escalation Policies

### 7.6.1.0.0 Environment

#### 7.6.1.1.0 Environment

Production

#### 7.6.1.2.0 Severity

critical

#### 7.6.1.3.0 Escalation Path

- Primary On-Call Engineer
- Secondary On-Call Engineer
- Engineering Manager

#### 7.6.1.4.0 Timeouts

- 10m
- 15m

#### 7.6.1.5.0 Channels

- PagerDuty
- Slack

### 7.6.2.0.0 Environment

#### 7.6.2.1.0 Environment

Staging

#### 7.6.2.2.0 Severity

critical

#### 7.6.2.3.0 Escalation Path

- Dev Team Channel

#### 7.6.2.4.0 Timeouts

*No items available*

#### 7.6.2.5.0 Channels

- Slack

## 7.7.0.0.0 Dashboard Configurations

- {'dashboardType': 'operational', 'audience': 'On-call Engineers, DevOps', 'refreshInterval': '1m', 'metrics': ['Overall Error Rate', 'API P95 Latency', 'AKS Node CPU/Memory %', 'PostgreSQL CPU %', 'Dead-Letter Queue Count']}

# 8.0.0.0.0 Project Specific Environments

## 8.1.0.0.0 Environments

### 8.1.1.0.0 Production

#### 8.1.1.1.0 Id

prod-useast2

#### 8.1.1.2.0 Name

Production

#### 8.1.1.3.0 Type

🔹 Production

#### 8.1.1.4.0 Provider

azure

#### 8.1.1.5.0 Region

East US 2

#### 8.1.1.6.0 Configuration

| Property | Value |
|----------|-------|
| Instance Type | Standard_D4as_v5 |
| Auto Scaling | enabled |
| Backup Enabled | ✅ |
| Monitoring Level | enhanced |

#### 8.1.1.7.0 Security Groups

- prod-aks-nsg
- prod-db-nsg
- prod-redis-nsg

#### 8.1.1.8.0 Network

##### 8.1.1.8.1 Vpc Id

prod-vnet

##### 8.1.1.8.2 Subnets

- prod-aks-subnet
- prod-db-subnet
- prod-apim-subnet

##### 8.1.1.8.3 Security Groups

*No items available*

##### 8.1.1.8.4 Internet Gateway

prod-igw

##### 8.1.1.8.5 Nat Gateway

prod-nat

#### 8.1.1.9.0 Monitoring

##### 8.1.1.9.1 Enabled

✅ Yes

##### 8.1.1.9.2 Metrics

- All

##### 8.1.1.9.3 Alerts

*No data available*

##### 8.1.1.9.4 Dashboards

- prod-operational-dashboard

#### 8.1.1.10.0 Compliance

##### 8.1.1.10.1 Frameworks

- GDPR
- CCPA

##### 8.1.1.10.2 Controls

*No items available*

##### 8.1.1.10.3 Audit Schedule

Annually

#### 8.1.1.11.0 Data Management

| Property | Value |
|----------|-------|
| Backup Schedule | Daily |
| Retention Policy | 30 Days |
| Encryption Enabled | ✅ |
| Data Masking | ❌ |

### 8.1.2.0.0 DR

#### 8.1.2.1.0 Id

dr-uswest2

#### 8.1.2.2.0 Name

Disaster Recovery

#### 8.1.2.3.0 Type

🔹 DR

#### 8.1.2.4.0 Provider

azure

#### 8.1.2.5.0 Region

West US 2

#### 8.1.2.6.0 Configuration

| Property | Value |
|----------|-------|
| Instance Type | Standard_D2as_v5 |
| Auto Scaling | disabled |
| Backup Enabled | ✅ |
| Monitoring Level | basic |

#### 8.1.2.7.0 Security Groups

- dr-aks-nsg
- dr-db-nsg

#### 8.1.2.8.0 Network

##### 8.1.2.8.1 Vpc Id

dr-vnet

##### 8.1.2.8.2 Subnets

- dr-aks-subnet
- dr-db-subnet

##### 8.1.2.8.3 Security Groups

*No items available*

##### 8.1.2.8.4 Internet Gateway

dr-igw

##### 8.1.2.8.5 Nat Gateway

dr-nat

#### 8.1.2.9.0 Monitoring

##### 8.1.2.9.1 Enabled

✅ Yes

##### 8.1.2.9.2 Metrics

- Basic Health

##### 8.1.2.9.3 Alerts

*No data available*

##### 8.1.2.9.4 Dashboards

*No items available*

#### 8.1.2.10.0 Compliance

##### 8.1.2.10.1 Frameworks

- GDPR
- CCPA

##### 8.1.2.10.2 Controls

*No items available*

##### 8.1.2.10.3 Audit Schedule

Annually

#### 8.1.2.11.0 Data Management

| Property | Value |
|----------|-------|
| Backup Schedule | Geo-Replicated |
| Retention Policy | 30 Days |
| Encryption Enabled | ✅ |
| Data Masking | ❌ |

### 8.1.3.0.0 Staging

#### 8.1.3.1.0 Id

stg-useast2

#### 8.1.3.2.0 Name

Staging

#### 8.1.3.3.0 Type

🔹 Staging

#### 8.1.3.4.0 Provider

azure

#### 8.1.3.5.0 Region

East US 2

#### 8.1.3.6.0 Configuration

| Property | Value |
|----------|-------|
| Instance Type | Standard_D2as_v5 |
| Auto Scaling | enabled |
| Backup Enabled | ✅ |
| Monitoring Level | standard |

#### 8.1.3.7.0 Security Groups

- stg-aks-nsg
- stg-db-nsg

#### 8.1.3.8.0 Network

##### 8.1.3.8.1 Vpc Id

stg-vnet

##### 8.1.3.8.2 Subnets

- stg-aks-subnet
- stg-db-subnet

##### 8.1.3.8.3 Security Groups

*No items available*

##### 8.1.3.8.4 Internet Gateway

stg-igw

##### 8.1.3.8.5 Nat Gateway

stg-nat

#### 8.1.3.9.0 Monitoring

##### 8.1.3.9.1 Enabled

✅ Yes

##### 8.1.3.9.2 Metrics

- All

##### 8.1.3.9.3 Alerts

*No data available*

##### 8.1.3.9.4 Dashboards

- stg-operational-dashboard

#### 8.1.3.10.0 Compliance

##### 8.1.3.10.1 Frameworks

*No items available*

##### 8.1.3.10.2 Controls

*No items available*

##### 8.1.3.10.3 Audit Schedule

N/A

#### 8.1.3.11.0 Data Management

| Property | Value |
|----------|-------|
| Backup Schedule | Weekly |
| Retention Policy | 14 Days |
| Encryption Enabled | ✅ |
| Data Masking | ✅ |

## 8.2.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Global Timeout | 30s |
| Max Instances | 10 |
| Backup Schedule | Daily |
| Deployment Strategy | rolling |
| Rollback Strategy | Automated |
| Maintenance Window | Sunday 1 AM - 4 AM Local Time |

## 8.3.0.0.0 Cross Environment Policies

- {'policy': 'access-control', 'implementation': 'Azure AD groups are used to grant permissions. A separate group exists for Production access, requiring elevated privileges and manager approval.', 'enforcement': 'automated'}

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

Terraform IaC for Foundational Infrastructure (VNet, Subnets, Security)

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

*No items available*

### 9.1.4.0.0 Estimated Effort

2 Sprints

### 9.1.5.0.0 Risk Level

medium

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

Development Environment Provisioning

### 9.2.2.0.0 Priority

🔴 high

### 9.2.3.0.0 Dependencies

- Terraform IaC for Foundational Infrastructure (VNet, Subnets, Security)

### 9.2.4.0.0 Estimated Effort

1 Sprint

### 9.2.5.0.0 Risk Level

low

## 9.3.0.0.0 Component

### 9.3.1.0.0 Component

Staging Environment Provisioning and Data Anonymization Pipeline

### 9.3.2.0.0 Priority

🟡 medium

### 9.3.3.0.0 Dependencies

- Development Environment Provisioning

### 9.3.4.0.0 Estimated Effort

2 Sprints

### 9.3.5.0.0 Risk Level

medium

## 9.4.0.0.0 Component

### 9.4.1.0.0 Component

Production Environment Provisioning with HA/DR

### 9.4.2.0.0 Priority

🟡 medium

### 9.4.3.0.0 Dependencies

- Staging Environment Provisioning and Data Anonymization Pipeline

### 9.4.4.0.0 Estimated Effort

3 Sprints

### 9.4.5.0.0 Risk Level

high

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

Cloud Cost Overrun

### 10.1.2.0.0 Impact

medium

### 10.1.3.0.0 Probability

high

### 10.1.4.0.0 Mitigation

Implement strict cost monitoring and alerts using Azure Cost Management. Use cost-effective instance types (Burstable) in Development. Enforce resource tagging for accountability. Automate shutdown of dev environments during off-hours.

### 10.1.5.0.0 Contingency Plan

Regular cost optimization reviews to resize underutilized resources.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

Security Misconfiguration of Network Rules

### 10.2.2.0.0 Impact

high

### 10.2.3.0.0 Probability

medium

### 10.2.4.0.0 Mitigation

All network changes must be peer-reviewed via Terraform pull requests. Use Azure Policy to enforce security baselines (e.g., deny public IPs on specific subnets). Regularly run automated security scans.

### 10.2.5.0.0 Contingency Plan

Have an incident response plan that includes steps to isolate the affected network segment immediately.

## 10.3.0.0.0 Risk

### 10.3.1.0.0 Risk

Production Data Leak into Non-Production Environments

### 10.3.2.0.0 Impact

high

### 10.3.3.0.0 Probability

low

### 10.3.4.0.0 Mitigation

Automate the data sanitization/anonymization process as part of the Staging data refresh pipeline. Use separate IAM roles with no cross-environment permissions for data access.

### 10.3.5.0.0 Contingency Plan

Incident response plan to identify the scope of the leak, notify affected parties as per GDPR/CCPA, and purge the leaked data.

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Security

### 11.1.2.0.0 Recommendation

Implement a GitOps workflow using a tool like Argo CD or Flux for deploying applications to AKS.

### 11.1.3.0.0 Justification

Enhances security by removing direct kubectl access for developers. Provides a declarative, auditable trail of all changes to the production environment, improving stability and rollback capabilities.

### 11.1.4.0.0 Priority

🔴 high

### 11.1.5.0.0 Implementation Notes

Integrate with the existing GitHub Actions pipeline. The pipeline would build and push the image, then update a Git repository that the GitOps agent monitors.

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Cost Optimization

### 11.2.2.0.0 Recommendation

Leverage AKS Spot Node Pools for stateless, non-critical workloads in non-production environments.

### 11.2.3.0.0 Justification

Can significantly reduce compute costs (up to 90%) for workloads that can tolerate interruptions, such as CI builds or certain types of testing.

### 11.2.4.0.0 Priority

🟡 medium

### 11.2.5.0.0 Implementation Notes

Requires applications to be designed for fault tolerance. Start with the Development environment to assess stability.

## 11.3.0.0.0 Category

### 11.3.1.0.0 Category

🔹 Reliability

### 11.3.2.0.0 Recommendation

Conduct regular Chaos Engineering experiments in the Staging environment.

### 11.3.3.0.0 Justification

Proactively identifies weaknesses in the system's resilience (e.g., improper retry logic, cascading failures) before they impact production users. Validates that monitoring and alerting are effective.

### 11.3.4.0.0 Priority

🟡 medium

### 11.3.5.0.0 Implementation Notes

Start with simple experiments like terminating random pods or injecting latency into network calls between services.

