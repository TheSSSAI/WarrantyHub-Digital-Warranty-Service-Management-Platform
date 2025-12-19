# 1 Infrastructure Requirements Analysis

## 1.1 Compute Services

### 1.1.1 Container Orchestration

#### 1.1.1.1 Component

Microservices Backend

#### 1.1.1.2 Service

Azure Kubernetes Service (AKS)

#### 1.1.1.3 Type

🔹 Container Orchestration

#### 1.1.1.4 Justification

Required by SRS (Section 2.2) for deploying, managing, and scaling containerized microservices. Supports high availability across Availability Zones (REQ-5.3) and horizontal autoscaling (REQ-5.5).

### 1.1.2.0 Container Execution

#### 1.1.2.1 Component

Asynchronous Workers (OCR, Scheduled Jobs)

#### 1.1.2.2 Service

Azure Kubernetes Service (AKS)

#### 1.1.2.3 Type

🔹 Container Execution

#### 1.1.2.4 Justification

Background workers will be deployed as containerized applications (Deployments or CronJobs) within the same AKS cluster to unify the compute platform and leverage existing orchestration capabilities.

## 1.2.0.0 Storage Services

### 1.2.1.0 Object Storage

#### 1.2.1.1 Component

Application Files (Invoices, Photos)

#### 1.2.1.2 Service

Azure Blob Storage

#### 1.2.1.3 Type

🔹 Object Storage

#### 1.2.1.4 Justification

Explicitly required by SRS (Section 2.2) for storing unstructured user-generated content. Must be configured for geo-redundancy to meet DR requirements (REQ-5.3).

### 1.2.2.0 Container Registry

#### 1.2.2.1 Component

Container Images

#### 1.2.2.2 Service

Azure Container Registry (ACR)

#### 1.2.2.3 Type

🔹 Container Registry

#### 1.2.2.4 Justification

Explicitly required by SRS (Section 2.2) to securely store and manage Docker images for all microservices, enabling the CI/CD pipeline.

## 1.3.0.0 Database Services

### 1.3.1.0 Managed Relational Database (PaaS)

#### 1.3.1.1 Component

Primary Transactional Database

#### 1.3.1.2 Service

Azure Database for PostgreSQL - Flexible Server

#### 1.3.1.3 Type

🔹 Managed Relational Database (PaaS)

#### 1.3.1.4 Justification

The core data store specified in the SRS (Section 2.2). Must be deployed in a zone-redundant configuration for high availability (REQ-5.3) and include the PostGIS extension for geospatial features (REQ-3.1).

### 1.3.2.0 Database Replica

#### 1.3.2.1 Component

Analytics/Reporting Database

#### 1.3.2.2 Service

Azure Database for PostgreSQL - Read Replicas

#### 1.3.2.3 Type

🔹 Database Replica

#### 1.3.2.4 Justification

Required by SRS scalability strategy (Section 5.5) to offload read-heavy queries from brand dashboards and reporting services, preventing performance impact on the primary database.

## 1.4.0.0 Messaging Services

- {'component': 'Asynchronous Communication', 'service': 'Azure Service Bus', 'type': 'Managed Message Broker', 'justification': 'Specified in the SRS (Section 4.3) to enable event-driven communication between microservices, decoupling components for improved reliability and scalability (e.g., for OCR processing, notifications).'}

## 1.5.0.0 Caching Services

- {'component': 'Performance Caching & Real-time Backplane', 'service': 'Azure Cache for Redis', 'type': 'In-Memory Cache', 'justification': 'Required by SRS (Section 2.2) for low-latency data access to improve API performance and to act as a backplane for SignalR to scale real-time services across multiple pods in AKS.'}

# 2.0.0.0 Cloud Strategy

| Property | Value |
|----------|-------|
| Hosting Model | Cloud-Native |
| Provider | Microsoft Azure |
| Justification | The SRS explicitly defines Microsoft Azure as the ... |
| Migration Path Constraints | Not applicable; this is a greenfield development p... |

# 3.0.0.0 Region And Availability

## 3.1.0.0 Primary Region

### 3.1.1.0 Name

Primary Azure Region (e.g., East US 2)

### 3.1.2.0 Justification

The main region for deploying all active infrastructure components to serve user traffic.

## 3.2.0.0 Disaster Recovery Region

### 3.2.1.0 Name

Paired Secondary Azure Region (e.g., Central US)

### 3.2.2.0 Justification

Required to host geo-replicated backups of PostgreSQL and Blob Storage to meet the RTO/RPO requirements defined in SRS Section 5.3.

## 3.3.0.0 Availability Strategy

| Property | Value |
|----------|-------|
| Type | Multi-AZ (Availability Zone) Deployment |
| Justification | Explicitly required by SRS Section 5.3 to ensure h... |
| Topology | Active-Passive for Disaster Recovery. All user tra... |

## 3.4.0.0 Data Residency Constraints

None specified in the requirements. Assumed to be flexible based on the chosen primary region.

# 4.0.0.0 Resource Allocation And Scaling

## 4.1.0.0 Compute Scaling

| Property | Value |
|----------|-------|
| Component | AKS Microservices |
| Mechanism | Horizontal Pod Autoscaling (HPA) |
| Triggers | CPU and Memory Usage |
| Justification | Mandated by SRS Section 5.5 to automatically adjus... |

## 4.2.0.0 Cluster Scaling

| Property | Value |
|----------|-------|
| Component | AKS Cluster |
| Mechanism | Cluster Autoscaler |
| Triggers | Pod scheduling pressure (insufficient node resourc... |
| Justification | Essential for a scalable system (REQ-5.5). The Clu... |

## 4.3.0.0 Database Scaling

| Property | Value |
|----------|-------|
| Component | PostgreSQL Database |
| Mechanism | Read Replicas & Vertical Scaling |
| Justification | The primary scaling strategy for the database is o... |

## 4.4.0.0 Cost Optimization

Utilize autoscaling to match resources to demand. Implement resource requests and limits on Kubernetes pods to ensure efficient node packing. Use Terraform workspaces to easily tear down non-production environments when not in use.

# 5.0.0.0 Networking Topology

## 5.1.0.0 Virtual Network

### 5.1.1.0 Name

Primary Virtual Network (VNet)

### 5.1.2.0 Description

A single VNet in the primary region to provide a private, isolated network for all system components.

### 5.1.3.0 Subnets

#### 5.1.3.1 aks-subnet

##### 5.1.3.1.1 Name

aks-subnet

##### 5.1.3.1.2 Purpose

Hosts the AKS cluster nodes and pods.

#### 5.1.3.2.0 db-subnet

##### 5.1.3.2.1 Name

db-subnet

##### 5.1.3.2.2 Purpose

Delegated for PostgreSQL Flexible Server VNet integration, or to host its private endpoint.

#### 5.1.3.3.0 private-endpoint-subnet

##### 5.1.3.3.1 Name

private-endpoint-subnet

##### 5.1.3.3.2 Purpose

Hosts private endpoints for all other PaaS services (ACR, Blob, Redis, Service Bus, Key Vault) to ensure secure, private communication.

#### 5.1.3.4.0 app-gateway-subnet

##### 5.1.3.4.1 Name

app-gateway-subnet

##### 5.1.3.4.2 Purpose

Optional, for hosting an Application Gateway if used as the Ingress Controller.

## 5.2.0.0.0 Api Gateway

| Property | Value |
|----------|-------|
| Service | Azure API Management |
| Role | Manages all external API traffic, enforces securit... |
| Justification | Specified by SRS (Section 2.2). |

## 5.3.0.0.0 Ingress

| Property | Value |
|----------|-------|
| Component | NGINX Ingress Controller |
| Location | Within the AKS cluster |
| Role | Receives traffic from the API Gateway and routes i... |
| Justification | A standard, essential component for managing traff... |

## 5.4.0.0.0 Network Security

### 5.4.1.0.0 Components

#### 5.4.1.1.0 Network Security Groups (NSGs)

##### 5.4.1.1.1 Name

Network Security Groups (NSGs)

##### 5.4.1.1.2 Purpose

Act as a virtual firewall at the subnet level to control ingress and egress traffic, enforcing rules like allowing HTTPS traffic only from the API Gateway to the AKS subnet.

#### 5.4.1.2.0 Private Endpoints

##### 5.4.1.2.1 Name

Private Endpoints

##### 5.4.1.2.2 Purpose

Provides secure, private connectivity from the VNet to Azure PaaS services, ensuring that data does not traverse the public internet.

# 6.0.0.0.0 Security Implementation

## 6.1.0.0.0 Secrets Management

| Property | Value |
|----------|-------|
| Service | Azure Key Vault |
| Integration | Integrated with AKS using the Azure Key Vault Prov... |
| Justification | Explicitly required by SRS (Section 5.2) to secure... |

## 6.2.0.0.0 Identity And Access

### 6.2.1.0.0 Approach

Azure Managed Identities

### 6.2.2.0.0 Implementation

Assign a Managed Identity to the AKS cluster and use workload identity for pods. This allows Kubernetes components and running applications to securely authenticate to other Azure services (like Key Vault, ACR, Blob Storage) without storing any credentials.

## 6.3.0.0.0 Data Protection

### 6.3.1.0.0 Layer

#### 6.3.1.1.0 Layer

In-Transit

#### 6.3.1.2.0 Method

TLS 1.3 Encryption

#### 6.3.1.3.0 Justification

Required by SRS (Section 4.3). All communication from clients to the API Gateway and between internal services will be encrypted.

### 6.3.2.0.0 Layer

#### 6.3.2.1.0 Layer

At-Rest

#### 6.3.2.2.0 Method

Azure Storage Service Encryption

#### 6.3.2.3.0 Justification

Required by SRS (Section 5.2). All data in Azure PostgreSQL, Blob Storage, and Cache for Redis will be encrypted at rest using platform-managed keys.

