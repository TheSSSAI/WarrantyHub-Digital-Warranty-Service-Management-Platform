# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- .NET 8
- ASP.NET Core 8
- Azure Kubernetes Service (AKS)
- Azure Database for PostgreSQL
- Azure Service Bus
- React 18
- Flutter 3.19+

## 1.3 Monitoring Requirements

- Trace requests across microservices for troubleshooting.
- Monitor application performance to meet P95 latency < 250ms (REQ-PERF-001).
- Monitor system health to ensure high reliability (REQ-REL-001, REQ-REL-002).
- Provide logs to diagnose failures in background jobs (OCR, Scheduled Tasks).
- Monitor AKS cluster and pod health to validate autoscaling (REQ-SCAL-001).

## 1.4 System Architecture

Microservices on Azure Kubernetes Service (AKS)

## 1.5 Environment

production

# 2.0 Log Level And Category Strategy

## 2.1 Default Log Level

INFO

## 2.2 Environment Specific Levels

### 2.2.1 Environment

#### 2.2.1.1 Environment

development

#### 2.2.1.2 Log Level

DEBUG

#### 2.2.1.3 Justification

Provides detailed trace information for developers during feature development and debugging.

### 2.2.2.0 Environment

#### 2.2.2.1 Environment

staging

#### 2.2.2.2 Log Level

DEBUG

#### 2.2.2.3 Justification

Allows for thorough debugging and validation of behavior during pre-production testing.

### 2.2.3.0 Environment

#### 2.2.3.1 Environment

production

#### 2.2.3.2 Log Level

INFO

#### 2.2.3.3 Justification

Captures essential application flow and business transactions without excessive verbosity, balancing visibility with performance and cost.

## 2.3.0.0 Component Categories

### 2.3.1.0 Component

#### 2.3.1.1 Component

All Microservices

#### 2.3.1.2 Category

🔹 Microsoft.*

#### 2.3.1.3 Log Level

WARN

#### 2.3.1.4 Verbose Logging

❌ No

#### 2.3.1.5 Justification

Suppresses verbose framework-level logs to reduce noise, focusing on application-specific logs. Warnings and errors are still captured.

### 2.3.2.0 Component

#### 2.3.2.1 Component

GeolocationService

#### 2.3.2.2 Category

🔹 WarrantyHub.GeolocationService

#### 2.3.2.3 Log Level

INFO

#### 2.3.2.4 Verbose Logging

❌ No

#### 2.3.2.5 Justification

High-volume service for GPS updates (REQ-FUNC-009). Logging is kept at INFO to avoid performance degradation. Debug logs should only be enabled temporarily for troubleshooting.

### 2.3.3.0 Component

#### 2.3.3.1 Component

API Gateway (YARP)

#### 2.3.3.2 Category

🔹 Yarp.ReverseProxy

#### 2.3.3.3 Log Level

INFO

#### 2.3.3.4 Verbose Logging

❌ No

#### 2.3.3.5 Justification

Logs all incoming requests and their routing decisions, essential for diagnosing client connectivity and routing issues.

## 2.4.0.0 Sampling Strategies

*No items available*

## 2.5.0.0 Logging Approach

### 2.5.1.0 Structured

✅ Yes

### 2.5.2.0 Format

JSON

### 2.5.3.0 Standard Fields

- Timestamp
- Level
- MessageTemplate
- Exception
- TraceId
- SpanId
- CorrelationId
- ServiceName
- Environment

### 2.5.4.0 Custom Fields

- RequestId
- UserId
- SourceContext

# 3.0.0.0 Log Aggregation Architecture

## 3.1.0.0 Collection Mechanism

### 3.1.1.0 Type

🔹 library

### 3.1.2.0 Technology

Serilog with Azure Monitor Sink

### 3.1.3.0 Configuration

*No data available*

### 3.1.4.0 Justification

The architecture specifies Serilog. Using its native Azure Monitor sink is the most direct and efficient way to send structured application logs from .NET services to the central Log Analytics Workspace. All microservices will log to stdout, which is collected by the Azure Monitor Agent for Containers.

## 3.2.0.0 Strategy

| Property | Value |
|----------|-------|
| Approach | centralized |
| Reasoning | Essential for a microservices architecture to allo... |
| Local Retention | none |

## 3.3.0.0 Shipping Methods

- {'protocol': 'HTTP', 'destination': 'Azure Log Analytics Workspace', 'reliability': 'at-least-once', 'compression': True}

## 3.4.0.0 Buffering And Batching

| Property | Value |
|----------|-------|
| Buffer Size | Managed by Serilog Sink |
| Batch Size | 0 |
| Flush Interval | Managed by Serilog Sink |
| Backpressure Handling | Handled internally by the sink library. |

## 3.5.0.0 Transformation And Enrichment

### 3.5.1.0 Transformation

#### 3.5.1.1 Transformation

Add CorrelationId

#### 3.5.1.2 Purpose

To trace a single logical operation across multiple microservices.

#### 3.5.1.3 Stage

collection

### 3.5.2.0 Transformation

#### 3.5.2.1 Transformation

Add ServiceName and Environment

#### 3.5.2.2 Purpose

To allow filtering and querying logs by their source application and deployment environment.

#### 3.5.2.3 Stage

collection

### 3.5.3.0 Transformation

#### 3.5.3.1 Transformation

Add TraceId and SpanId

#### 3.5.3.2 Purpose

To correlate logs with distributed traces captured by Application Insights.

#### 3.5.3.3 Stage

collection

## 3.6.0.0 High Availability

| Property | Value |
|----------|-------|
| Required | ✅ |
| Redundancy | Provided by the Azure Monitor service platform. |
| Failover Strategy | Managed by Azure. |

# 4.0.0.0 Retention Policy Design

## 4.1.0.0 Retention Periods

### 4.1.1.0 Log Type

#### 4.1.1.1 Log Type

Application Diagnostic Logs

#### 4.1.1.2 Retention Period

90 days

#### 4.1.1.3 Justification

Provides a sufficient window for troubleshooting production issues, analyzing trends, and debugging recent incidents.

#### 4.1.1.4 Compliance Requirement

None specified

### 4.1.2.0 Log Type

#### 4.1.2.1 Log Type

AKS Control Plane Logs

#### 4.1.2.2 Retention Period

30 days

#### 4.1.2.3 Justification

Sufficient for monitoring cluster health and diagnosing recent deployment or scaling issues.

#### 4.1.2.4 Compliance Requirement

None specified

### 4.1.3.0 Log Type

#### 4.1.3.1 Log Type

Audit Trail

#### 4.1.3.2 Retention Period

24 months

#### 4.1.3.3 Justification

As per REQ-AUDIT-001. Note: This is handled in the application's 'AuditLog' database table, not the diagnostic log store.

#### 4.1.3.4 Compliance Requirement

REQ-AUDIT-001

## 4.2.0.0 Compliance Requirements

*No items available*

## 4.3.0.0 Volume Impact Analysis

| Property | Value |
|----------|-------|
| Estimated Daily Volume | 10-20 GB/day |
| Storage Cost Projection | Based on Azure Monitor pricing. |
| Compression Ratio | Managed by Azure Monitor. |

## 4.4.0.0 Storage Tiering

### 4.4.1.0 Hot Storage

| Property | Value |
|----------|-------|
| Duration | 90 days |
| Accessibility | immediate |
| Cost | high |

### 4.4.2.0 Warm Storage

| Property | Value |
|----------|-------|
| Duration | None |
| Accessibility | minutes |
| Cost | medium |

### 4.4.3.0 Cold Storage

| Property | Value |
|----------|-------|
| Duration | None |
| Accessibility | hours |
| Cost | low |

## 4.5.0.0 Compression Strategy

| Property | Value |
|----------|-------|
| Algorithm | Managed by Azure |
| Compression Level | N/A |
| Expected Ratio | N/A |

## 4.6.0.0 Anonymization Requirements

*No items available*

# 5.0.0.0 Search Capability Requirements

## 5.1.0.0 Essential Capabilities

### 5.1.1.0 Capability

#### 5.1.1.1 Capability

Trace request by CorrelationId

#### 5.1.1.2 Performance Requirement

< 5 seconds

#### 5.1.1.3 Justification

The single most critical troubleshooting capability in a microservices architecture.

### 5.1.2.0 Capability

#### 5.1.2.1 Capability

Filter logs by ServiceName, Environment, and LogLevel

#### 5.1.2.2 Performance Requirement

< 5 seconds

#### 5.1.2.3 Justification

Basic requirement for isolating logs to a specific component or problem severity.

### 5.1.3.0 Capability

#### 5.1.3.1 Capability

Full-text search on log messages

#### 5.1.3.2 Performance Requirement

< 10 seconds

#### 5.1.3.3 Justification

Needed to find specific error messages or keywords when troubleshooting unknown issues.

## 5.2.0.0 Performance Characteristics

| Property | Value |
|----------|-------|
| Search Latency | < 10 seconds for typical queries |
| Concurrent Users | 10 |
| Query Complexity | complex |
| Indexing Strategy | Managed by Azure Log Analytics. Key fields are aut... |

## 5.3.0.0 Indexed Fields

### 5.3.1.0 Field

#### 5.3.1.1 Field

CorrelationId

#### 5.3.1.2 Index Type

String

#### 5.3.1.3 Search Pattern

Exact match

#### 5.3.1.4 Frequency

high

### 5.3.2.0 Field

#### 5.3.2.1 Field

TraceId

#### 5.3.2.2 Index Type

String

#### 5.3.2.3 Search Pattern

Exact match

#### 5.3.2.4 Frequency

high

### 5.3.3.0 Field

#### 5.3.3.1 Field

ServiceName

#### 5.3.3.2 Index Type

String

#### 5.3.3.3 Search Pattern

Exact match

#### 5.3.3.4 Frequency

high

### 5.3.4.0 Field

#### 5.3.4.1 Field

UserId

#### 5.3.4.2 Index Type

String

#### 5.3.4.3 Search Pattern

Exact match

#### 5.3.4.4 Frequency

medium

## 5.4.0.0 Full Text Search

### 5.4.1.0 Required

✅ Yes

### 5.4.2.0 Fields

- RenderedMessage
- Exception

### 5.4.3.0 Search Engine

Kusto (KQL)

### 5.4.4.0 Relevance Scoring

✅ Yes

## 5.5.0.0 Correlation And Tracing

### 5.5.1.0 Correlation Ids

- CorrelationId

### 5.5.2.0 Trace Id Propagation

W3C Trace Context, propagated via HTTP headers and message bus properties.

### 5.5.3.0 Span Correlation

✅ Yes

### 5.5.4.0 Cross Service Tracing

✅ Yes

## 5.6.0.0 Dashboard Requirements

- {'dashboard': 'Overall System Health', 'purpose': 'To provide an at-a-glance view of error rates, API latency, and infrastructure health.', 'refreshInterval': '5 minutes', 'audience': 'SRE/Operations'}

# 6.0.0.0 Storage Solution Selection

## 6.1.0.0 Selected Technology

### 6.1.1.0 Primary

Azure Log Analytics Workspace

### 6.1.2.0 Reasoning

It is the native observability solution in Azure, providing seamless integration with AKS, Application Insights, and all other Azure PaaS services used in the architecture. It offers powerful query capabilities (KQL) and is designed for high-volume log ingestion.

### 6.1.3.0 Alternatives

- ELK Stack (Elasticsearch, Logstash, Kibana)
- Datadog

## 6.2.0.0 Scalability Requirements

| Property | Value |
|----------|-------|
| Expected Growth Rate | 20% month-over-month |
| Peak Load Handling | Handled by the Azure platform, which scales automa... |
| Horizontal Scaling | ✅ |

## 6.3.0.0 Cost Performance Analysis

- {'solution': 'Azure Log Analytics Workspace', 'costPerGB': 'Pay-as-you-go model', 'queryPerformance': 'High', 'operationalComplexity': 'low'}

## 6.4.0.0 Backup And Recovery

| Property | Value |
|----------|-------|
| Backup Frequency | Managed by Azure |
| Recovery Time Objective | N/A (Not a transactional system) |
| Recovery Point Objective | N/A (Not a transactional system) |
| Testing Frequency | N/A |

## 6.5.0.0 Geo Distribution

### 6.5.1.0 Required

❌ No

### 6.5.2.0 Regions

*No items available*

### 6.5.3.0 Replication Strategy



## 6.6.0.0 Data Sovereignty

*No items available*

# 7.0.0.0 Access Control And Compliance

## 7.1.0.0 Access Control Requirements

### 7.1.1.0 Role

#### 7.1.1.1 Role

SRE/Operator

#### 7.1.1.2 Permissions

- Read
- Write
- Query

#### 7.1.1.3 Log Types

- All

#### 7.1.1.4 Justification

Required for managing the system, troubleshooting, and configuring alerts.

### 7.1.2.0 Role

#### 7.1.2.1 Role

Developer

#### 7.1.2.2 Permissions

- Read
- Query

#### 7.1.2.3 Log Types

- All

#### 7.1.2.4 Justification

Required for debugging applications in all environments, with read-only access to prevent accidental changes in production.

## 7.2.0.0 Sensitive Data Handling

- {'dataType': 'PII', 'handlingStrategy': 'exclude', 'fields': ['User.passwordHash', 'User.email (in non-essential logs)'], 'complianceRequirement': 'Best practice for data privacy.'}

## 7.3.0.0 Encryption Requirements

### 7.3.1.0 In Transit

| Property | Value |
|----------|-------|
| Required | ✅ |
| Protocol | TLS 1.2+ |
| Certificate Management | Managed by Azure |

### 7.3.2.0 At Rest

| Property | Value |
|----------|-------|
| Required | ✅ |
| Algorithm | AES-256 |
| Key Management | Managed by Azure |

## 7.4.0.0 Audit Trail

| Property | Value |
|----------|-------|
| Log Access | ✅ |
| Retention Period | 90 days |
| Audit Log Location | Azure Activity Log |
| Compliance Reporting | ❌ |

## 7.5.0.0 Regulatory Compliance

*No items available*

## 7.6.0.0 Data Protection Measures

- {'measure': 'Log Sanitization', 'implementation': 'Developers are responsible for ensuring no sensitive data (passwords, secrets, excessive PII) is written to diagnostic logs.', 'monitoringRequired': False}

# 8.0.0.0 Project Specific Logging Config

## 8.1.0.0 Logging Config

### 8.1.1.0 Level

🔹 INFO

### 8.1.2.0 Retention

90 days

### 8.1.3.0 Aggregation

Centralized to Azure Log Analytics

### 8.1.4.0 Storage

Azure Log Analytics Workspace

### 8.1.5.0 Configuration

*No data available*

## 8.2.0.0 Component Configurations

- {'component': 'All .NET Microservices', 'logLevel': 'INFO', 'outputFormat': 'JSON to stdout', 'destinations': ['stdout'], 'sampling': {'enabled': False, 'rate': '1.0'}, 'customFields': ['CorrelationId', 'UserId']}

## 8.3.0.0 Metrics

### 8.3.1.0 Custom Metrics

*No data available*

## 8.4.0.0 Alert Rules

### 8.4.1.0 High 5xx Error Rate

#### 8.4.1.1 Name

High 5xx Error Rate

#### 8.4.1.2 Condition

Count of HTTP 5xx responses > 5% over 5 minutes

#### 8.4.1.3 Severity

High

#### 8.4.1.4 Actions

- {'type': 'Email', 'target': 'SRE/Operator Team', 'configuration': {}}

#### 8.4.1.5 Suppression Rules

*No items available*

#### 8.4.1.6 Escalation Path

*No items available*

### 8.4.2.0 High P95 API Latency

#### 8.4.2.1 Name

High P95 API Latency

#### 8.4.2.2 Condition

P95 response time > 250ms over 10 minutes

#### 8.4.2.3 Severity

Medium

#### 8.4.2.4 Actions

- {'type': 'Email', 'target': 'SRE/Operator Team', 'configuration': {}}

#### 8.4.2.5 Suppression Rules

*No items available*

#### 8.4.2.6 Escalation Path

*No items available*

# 9.0.0.0 Implementation Priority

## 9.1.0.0 Component

### 9.1.1.0 Component

Base logging configuration (Serilog) in all microservices

### 9.1.2.0 Priority

🔴 high

### 9.1.3.0 Dependencies

*No items available*

### 9.1.4.0 Estimated Effort

Low

### 9.1.5.0 Risk Level

low

## 9.2.0.0 Component

### 9.2.1.0 Component

CorrelationId propagation middleware

### 9.2.2.0 Priority

🔴 high

### 9.2.3.0 Dependencies

- Base logging configuration (Serilog) in all microservices

### 9.2.4.0 Estimated Effort

Medium

### 9.2.5.0 Risk Level

low

## 9.3.0.0 Component

### 9.3.1.0 Component

Provisioning Azure Log Analytics and configuring sinks

### 9.3.2.0 Priority

🔴 high

### 9.3.3.0 Dependencies

*No items available*

### 9.3.4.0 Estimated Effort

Low

### 9.3.5.0 Risk Level

low

# 10.0.0.0 Risk Assessment

## 10.1.0.0 Risk

### 10.1.1.0 Risk

Excessive logging volume degrades application performance.

### 10.1.2.0 Impact

medium

### 10.1.3.0 Probability

medium

### 10.1.4.0 Mitigation

Set default log level to INFO. Use asynchronous logging sinks. Avoid verbose logging in performance-critical code paths (e.g., GeolocationService).

### 10.1.5.0 Contingency Plan

Dynamically adjust log levels via configuration without redeploying the application.

## 10.2.0.0 Risk

### 10.2.1.0 Risk

Sensitive PII is leaked into logs.

### 10.2.2.0 Impact

high

### 10.2.3.0 Probability

low

### 10.2.4.0 Mitigation

Establish clear development guidelines and conduct code reviews to prevent logging of sensitive data. Do not log entire objects; log specific, safe properties instead.

### 10.2.5.0 Contingency Plan

If a leak is discovered, immediately purge the affected logs and rotate any compromised credentials.

# 11.0.0.0 Recommendations

## 11.1.0.0 Category

### 11.1.1.0 Category

🔹 Implementation

### 11.1.2.0 Recommendation

Create a shared .NET library for logging configuration (Serilog setup, enrichers, sink configuration) to be consumed by all microservices.

### 11.1.3.0 Justification

Ensures consistency in log format, enrichment, and destination across the entire system, reducing boilerplate code and simplifying maintenance.

### 11.1.4.0 Priority

🔴 high

### 11.1.5.0 Implementation Notes

The library should read configuration from the standard IConfiguration provider.

## 11.2.0.0 Category

### 11.2.1.0 Category

🔹 Observability

### 11.2.2.0 Recommendation

Integrate Serilog with Application Insights to ensure log messages are automatically correlated with distributed traces.

### 11.2.3.0 Justification

Provides a seamless experience in Azure Monitor, allowing navigation from a slow trace directly to the logs generated during that specific operation.

### 11.2.4.0 Priority

🔴 high

### 11.2.5.0 Implementation Notes

Use the Serilog.Sinks.ApplicationInsights package and configure it to emit events.

