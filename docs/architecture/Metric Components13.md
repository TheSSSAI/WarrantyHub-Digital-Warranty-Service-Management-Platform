# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- .NET 8
- ASP.NET Core 8
- React 18
- Flutter 3.19+
- PostgreSQL 16 w/ PostGIS
- Azure Kubernetes Service (AKS)
- Azure Service Bus
- Azure Cache for Redis

## 1.3 Monitoring Components

- Azure Monitor for Containers
- Azure Application Insights
- Azure Monitor for PaaS services
- ASP.NET Core Health Checks

## 1.4 Requirements

- REQ-PERF-001
- REQ-PERF-002
- REQ-SCAL-001
- REQ-INTG-001
- REQ-DATA-001
- REQ-REL-001
- REQ-REL-002

## 1.5 Environment

production

# 2.0 Standard System Metrics Selection

## 2.1 Hardware Utilization Metrics

### 2.1.1 gauge

#### 2.1.1.1 Name

aks.node.cpu.utilization.percentage

#### 2.1.1.2 Type

🔹 gauge

#### 2.1.1.3 Unit

percent

#### 2.1.1.4 Description

CPU utilization percentage for each node in the AKS cluster.

#### 2.1.1.5 Collection

##### 2.1.1.5.1 Interval

60s

##### 2.1.1.5.2 Method

Azure Monitor for Containers

#### 2.1.1.6.0 Thresholds

##### 2.1.1.6.1 Warning

80

##### 2.1.1.6.2 Critical

90

#### 2.1.1.7.0 Justification

Essential for capacity planning, cost optimization, and validating the resource limits/requests for pods running on AKS.

### 2.1.2.0.0 gauge

#### 2.1.2.1.0 Name

aks.node.memory.utilization.percentage

#### 2.1.2.2.0 Type

🔹 gauge

#### 2.1.2.3.0 Unit

percent

#### 2.1.2.4.0 Description

Memory utilization percentage for each node in the AKS cluster.

#### 2.1.2.5.0 Collection

##### 2.1.2.5.1 Interval

60s

##### 2.1.2.5.2 Method

Azure Monitor for Containers

#### 2.1.2.6.0 Thresholds

##### 2.1.2.6.1 Warning

80

##### 2.1.2.6.2 Critical

90

#### 2.1.2.7.0 Justification

Essential for capacity planning, preventing OutOfMemory errors at the node level, and informing resource allocation for microservices.

### 2.1.3.0.0 gauge

#### 2.1.3.1.0 Name

postgresql.cpu.percentage

#### 2.1.3.2.0 Type

🔹 gauge

#### 2.1.3.3.0 Unit

percent

#### 2.1.3.4.0 Description

CPU utilization for the Azure Database for PostgreSQL instance.

#### 2.1.3.5.0 Collection

##### 2.1.3.5.1 Interval

60s

##### 2.1.3.5.2 Method

Azure Monitor

#### 2.1.3.6.0 Thresholds

##### 2.1.3.6.1 Warning

85

##### 2.1.3.6.2 Critical

95

#### 2.1.3.7.0 Justification

Directly indicates database load and performance. High CPU can be a leading indicator of slow queries or the need to scale the database tier.

## 2.2.0.0.0 Runtime Metrics

### 2.2.1.0.0 gauge

#### 2.2.1.1.0 Name

dotnet.gc.heap.size

#### 2.2.1.2.0 Type

🔹 gauge

#### 2.2.1.3.0 Unit

bytes

#### 2.2.1.4.0 Description

Total allocated memory in the .NET garbage collector heap for each microservice.

#### 2.2.1.5.0 Technology

.NET

#### 2.2.1.6.0 Collection

##### 2.2.1.6.1 Interval

30s

##### 2.2.1.6.2 Method

Application Insights (.NET Metrics)

#### 2.2.1.7.0 Criticality

medium

### 2.2.2.0.0 gauge

#### 2.2.2.1.0 Name

dotnet.threadpool.queue.length

#### 2.2.2.2.0 Type

🔹 gauge

#### 2.2.2.3.0 Unit

count

#### 2.2.2.4.0 Description

Number of work items queued in the .NET thread pool. A consistently high number indicates thread pool starvation and potential performance degradation.

#### 2.2.2.5.0 Technology

.NET

#### 2.2.2.6.0 Collection

##### 2.2.2.6.1 Interval

15s

##### 2.2.2.6.2 Method

Application Insights (.NET Metrics)

#### 2.2.2.7.0 Criticality

high

### 2.2.3.0.0 gauge

#### 2.2.3.1.0 Name

db.connection.pool.active.connections

#### 2.2.3.2.0 Type

🔹 gauge

#### 2.2.3.3.0 Unit

count

#### 2.2.3.4.0 Description

Number of active connections in the EF Core database connection pool.

#### 2.2.3.5.0 Technology

.NET

#### 2.2.3.6.0 Collection

##### 2.2.3.6.1 Interval

30s

##### 2.2.3.6.2 Method

Npgsql EF Core Provider Metrics

#### 2.2.3.7.0 Criticality

high

## 2.3.0.0.0 Request Response Metrics

### 2.3.1.0.0 histogram

#### 2.3.1.1.0 Name

http.server.request.duration

#### 2.3.1.2.0 Type

🔹 histogram

#### 2.3.1.3.0 Unit

milliseconds

#### 2.3.1.4.0 Description

Latency of all incoming HTTP requests to the API Gateway and each backend microservice.

#### 2.3.1.5.0 Dimensions

- http.method
- http.route
- http.status_code
- service.name

#### 2.3.1.6.0 Percentiles

- p95
- p99

#### 2.3.1.7.0 Collection

##### 2.3.1.7.1 Interval

on_request

##### 2.3.1.7.2 Method

Application Insights (Auto-instrumentation)

### 2.3.2.0.0 gauge

#### 2.3.2.1.0 Name

http.server.active_requests

#### 2.3.2.2.0 Type

🔹 gauge

#### 2.3.2.3.0 Unit

count

#### 2.3.2.4.0 Description

Number of currently active HTTP requests being processed.

#### 2.3.2.5.0 Dimensions

- service.name

#### 2.3.2.6.0 Percentiles

*No items available*

#### 2.3.2.7.0 Collection

##### 2.3.2.7.1 Interval

15s

##### 2.3.2.7.2 Method

Application Insights (Auto-instrumentation)

## 2.4.0.0.0 Availability Metrics

- {'name': 'service.availability.percentage', 'type': 'gauge', 'unit': 'percent', 'description': 'Percentage of successful health probe checks over a time window, indicating service uptime.', 'calculation': '(successful_checks / total_checks) * 100', 'slaTarget': '99.9'}

## 2.5.0.0.0 Scalability Metrics

### 2.5.1.0.0 gauge

#### 2.5.1.1.0 Name

hpa.replicas.current

#### 2.5.1.2.0 Type

🔹 gauge

#### 2.5.1.3.0 Unit

count

#### 2.5.1.4.0 Description

The current number of running pods for a given microservice deployment managed by a Horizontal Pod Autoscaler (HPA).

#### 2.5.1.5.0 Capacity Threshold

Defined in HPA config (maxReplicas)

#### 2.5.1.6.0 Auto Scaling Trigger

✅ Yes

### 2.5.2.0.0 gauge

#### 2.5.2.1.0 Name

hpa.replicas.desired

#### 2.5.2.2.0 Type

🔹 gauge

#### 2.5.2.3.0 Unit

count

#### 2.5.2.4.0 Description

The desired number of pods as calculated by the HPA based on CPU/memory utilization metrics.

#### 2.5.2.5.0 Capacity Threshold

Defined in HPA config (maxReplicas)

#### 2.5.2.6.0 Auto Scaling Trigger

✅ Yes

# 3.0.0.0.0 Application Specific Metrics Design

## 3.1.0.0.0 Transaction Metrics

- {'name': 'app.transaction.duration', 'type': 'timer', 'unit': 'milliseconds', 'description': 'Measures the duration of critical business transactions from start to finish.', 'business_context': 'Service Request Creation, Product Registration, Ownership Transfer Initiation', 'dimensions': ['transaction.name', 'transaction.status'], 'collection': {'interval': 'on_transaction', 'method': 'Custom Telemetry (Application Insights)'}, 'aggregation': {'functions': ['avg', 'p95'], 'window': '1m'}}

## 3.2.0.0.0 Cache Performance Metrics

- {'name': 'redis.cache.hit_ratio', 'type': 'gauge', 'unit': 'ratio', 'description': 'The ratio of cache hits to total cache lookups for the Azure Cache for Redis instance.', 'cacheType': 'Azure Cache for Redis', 'hitRatioTarget': '0.90'}

## 3.3.0.0.0 External Dependency Metrics

### 3.3.1.0.0 histogram

#### 3.3.1.1.0 Name

dependency.call.duration

#### 3.3.1.2.0 Type

🔹 histogram

#### 3.3.1.3.0 Unit

milliseconds

#### 3.3.1.4.0 Description

Latency of outbound calls to critical external services.

#### 3.3.1.5.0 Dependency

FCM_API, Azure_AI_Document_Intelligence_API

#### 3.3.1.6.0 Circuit Breaker Integration

✅ Yes

#### 3.3.1.7.0 Sla

##### 3.3.1.7.1 Response Time

1000ms

##### 3.3.1.7.2 Availability

99.5

### 3.3.2.0.0 gauge

#### 3.3.2.1.0 Name

dependency.circuit_breaker.state

#### 3.3.2.2.0 Type

🔹 gauge

#### 3.3.2.3.0 Unit

state

#### 3.3.2.4.0 Description

Current state of the circuit breaker for an external dependency (0=Closed, 1=Open, 2=HalfOpen).

#### 3.3.2.5.0 Dependency

FCM_API, Azure_AI_Document_Intelligence_API

#### 3.3.2.6.0 Circuit Breaker Integration

✅ Yes

#### 3.3.2.7.0 Sla

*Not specified*

## 3.4.0.0.0 Error Metrics

### 3.4.1.0.0 counter

#### 3.4.1.1.0 Name

http.server.errors.total

#### 3.4.1.2.0 Type

🔹 counter

#### 3.4.1.3.0 Unit

count

#### 3.4.1.4.0 Description

Total count of server-side errors (HTTP 5xx) per service and endpoint.

#### 3.4.1.5.0 Error Types

- 500
- 502
- 503
- 504

#### 3.4.1.6.0 Dimensions

- service.name
- http.route

#### 3.4.1.7.0 Alert Threshold

> 1% of total requests over 5 minutes

### 3.4.2.0.0 counter

#### 3.4.2.1.0 Name

servicebus.message.deadlettered.total

#### 3.4.2.2.0 Type

🔹 counter

#### 3.4.2.3.0 Unit

count

#### 3.4.2.4.0 Description

Total number of messages moved to a dead-letter queue, indicating a persistent processing failure.

#### 3.4.2.5.0 Error Types

- MaxDeliveryCountExceeded
- ProcessingException

#### 3.4.2.6.0 Dimensions

- queue.name

#### 3.4.2.7.0 Alert Threshold

> 0

## 3.5.0.0.0 Throughput And Latency Metrics

### 3.5.1.0.0 summary

#### 3.5.1.1.0 Name

api.latency.p95

#### 3.5.1.2.0 Type

🔹 summary

#### 3.5.1.3.0 Unit

milliseconds

#### 3.5.1.4.0 Description

95th percentile latency for standard API endpoints, measured at the API Gateway.

#### 3.5.1.5.0 Percentiles

- p95

#### 3.5.1.6.0 Buckets

*No items available*

#### 3.5.1.7.0 Sla Targets

##### 3.5.1.7.1 P95

< 250ms

##### 3.5.1.7.2 P99

< 500ms

### 3.5.2.0.0 histogram

#### 3.5.2.1.0 Name

gps.update.e2e.latency

#### 3.5.2.2.0 Type

🔹 histogram

#### 3.5.2.3.0 Unit

milliseconds

#### 3.5.2.4.0 Description

End-to-end latency from technician's device sending a GPS location update to it being rendered on the user's map display.

#### 3.5.2.5.0 Percentiles

- p95
- p99

#### 3.5.2.6.0 Buckets

- 100
- 250
- 500
- 1000
- 2000
- 5000

#### 3.5.2.7.0 Sla Targets

##### 3.5.2.7.1 P95

< 2000ms

##### 3.5.2.7.2 P99

< 3000ms

# 4.0.0.0.0 Business Kpi Identification

## 4.1.0.0.0 Critical Business Metrics

### 4.1.1.0.0 counter

#### 4.1.1.1.0 Name

app.service_requests.created.total

#### 4.1.1.2.0 Type

🔹 counter

#### 4.1.1.3.0 Unit

count

#### 4.1.1.4.0 Description

Total number of new service requests created in the system.

#### 4.1.1.5.0 Business Owner

Head of Operations

#### 4.1.1.6.0 Calculation

COUNT(serviceRequestId)

#### 4.1.1.7.0 Reporting Frequency

daily

#### 4.1.1.8.0 Target

N/A

### 4.1.2.0.0 counter

#### 4.1.2.1.0 Name

app.products.registered.total

#### 4.1.2.2.0 Type

🔹 counter

#### 4.1.2.3.0 Unit

count

#### 4.1.2.4.0 Description

Total number of products registered by users.

#### 4.1.2.5.0 Business Owner

Product Manager

#### 4.1.2.6.0 Calculation

COUNT(userProductId)

#### 4.1.2.7.0 Reporting Frequency

daily

#### 4.1.2.8.0 Target

N/A

## 4.2.0.0.0 User Engagement Metrics

*No items available*

## 4.3.0.0.0 Conversion Metrics

*No items available*

## 4.4.0.0.0 Operational Efficiency Kpis

### 4.4.1.0.0 ratio

#### 4.4.1.1.0 Name

app.ocr.success.rate

#### 4.4.1.2.0 Type

🔹 ratio

#### 4.4.1.3.0 Unit

percent

#### 4.4.1.4.0 Description

Percentage of uploaded invoices that were successfully processed by OCR without errors. Directly measures the effectiveness of REQ-DATA-001.

#### 4.4.1.5.0 Calculation

(successful_ocr_jobs / total_ocr_jobs) * 100

#### 4.4.1.6.0 Benchmark Target

95%

### 4.4.2.0.0 ratio

#### 4.4.2.1.0 Name

app.push_notification.delivery.rate

#### 4.4.2.2.0 Type

🔹 ratio

#### 4.4.2.3.0 Unit

percent

#### 4.4.2.4.0 Description

Percentage of push notifications successfully delivered by FCM. Measures the effectiveness of REQ-INTG-001.

#### 4.4.2.5.0 Calculation

(delivered_notifications / sent_notifications) * 100

#### 4.4.2.6.0 Benchmark Target

98%

### 4.4.3.0.0 ratio

#### 4.4.3.1.0 Name

app.ownership_transfers.expired.rate

#### 4.4.3.2.0 Type

🔹 ratio

#### 4.4.3.3.0 Unit

percent

#### 4.4.3.4.0 Description

Percentage of ownership transfer requests that expired due to inaction. Measures the business process defined in REQ-BR-002.

#### 4.4.3.5.0 Calculation

(expired_transfers / total_initiated_transfers) * 100

#### 4.4.3.6.0 Benchmark Target

< 10%

## 4.5.0.0.0 Revenue And Cost Metrics

*No items available*

## 4.6.0.0.0 Customer Satisfaction Indicators

- {'name': 'app.service_requests.disputed.rate', 'type': 'gauge', 'unit': 'percent', 'description': 'Percentage of resolved service requests that are later disputed by the customer. A key indicator of service quality, related to REQ-FUNC-008.', 'dataSource': 'ServiceRequest Table', 'updateFrequency': 'daily'}

# 5.0.0.0.0 Collection Interval Optimization

## 5.1.0.0.0 Sampling Frequencies

### 5.1.1.0.0 Metric Category

#### 5.1.1.1.0 Metric Category

Request/Response Performance

#### 5.1.1.2.0 Interval

15s

#### 5.1.1.3.0 Justification

High frequency is needed to accurately calculate percentiles and quickly detect performance degradation for user-facing APIs (REQ-PERF-001).

#### 5.1.1.4.0 Resource Impact

medium

### 5.1.2.0.0 Metric Category

#### 5.1.2.1.0 Metric Category

Hardware Utilization

#### 5.1.2.2.0 Interval

60s

#### 5.1.2.3.0 Justification

System-level metrics change less frequently and a 60-second interval provides sufficient resolution for capacity planning without excessive overhead.

#### 5.1.2.4.0 Resource Impact

low

### 5.1.3.0.0 Metric Category

#### 5.1.3.1.0 Metric Category

Business KPIs

#### 5.1.3.2.0 Interval

300s

#### 5.1.3.3.0 Justification

Business metrics are typically analyzed over longer time windows, so high-frequency collection is unnecessary.

#### 5.1.3.4.0 Resource Impact

low

## 5.2.0.0.0 High Frequency Metrics

- {'name': 'http.server.request.duration', 'interval': 'on_request', 'criticality': 'high', 'costJustification': 'Required to meet the P95 < 250ms SLA of REQ-PERF-001.'}

## 5.3.0.0.0 Cardinality Considerations

- {'metricName': 'http.server.request.duration', 'estimatedCardinality': 'high', 'dimensionStrategy': 'Use templated routes (e.g., /products/{id}) instead of raw URLs to keep cardinality manageable. Avoid adding user-specific IDs as dimensions.', 'mitigationApproach': 'Route templating, dimension filtering'}

## 5.4.0.0.0 Aggregation Periods

- {'metricType': 'Performance', 'periods': ['1m', '5m', '1h'], 'retentionStrategy': 'Raw data for 14 days, 1-minute aggregates for 90 days.'}

## 5.5.0.0.0 Collection Methods

- {'method': 'real-time', 'applicableMetrics': ['http.server.request.duration'], 'implementation': 'Application Insights auto-instrumentation', 'performance': 'Low overhead'}

# 6.0.0.0.0 Aggregation Method Selection

## 6.1.0.0.0 Statistical Aggregations

- {'metricName': 'servicebus.message.deadlettered.total', 'aggregationFunctions': ['sum'], 'windows': ['5m', '1h'], 'justification': 'Summing dead-lettered messages over a window is essential for alerting on processing failures.'}

## 6.2.0.0.0 Histogram Requirements

- {'metricName': 'api.latency.p95', 'buckets': ['50', '100', '200', '250', '300', '500', '1000'], 'percentiles': ['p95', 'p99'], 'accuracy': 'High'}

## 6.3.0.0.0 Percentile Calculations

- {'metricName': 'api.latency.p95', 'percentiles': ['p95'], 'algorithm': 't-digest', 'accuracy': 'Required for SLO monitoring of REQ-PERF-001.'}

## 6.4.0.0.0 Metric Types

### 6.4.1.0.0 http.server.errors.total

#### 6.4.1.1.0 Name

http.server.errors.total

#### 6.4.1.2.0 Implementation

counter

#### 6.4.1.3.0 Reasoning

Errors are a monotonically increasing count, making a counter the appropriate type to measure rate of change.

#### 6.4.1.4.0 Resets Handling

Handled by Prometheus/OpenTelemetry model on pod restart.

### 6.4.2.0.0 hpa.replicas.current

#### 6.4.2.1.0 Name

hpa.replicas.current

#### 6.4.2.2.0 Implementation

gauge

#### 6.4.2.3.0 Reasoning

The number of replicas is a point-in-time value that can go up or down, requiring a gauge.

#### 6.4.2.4.0 Resets Handling

N/A

## 6.5.0.0.0 Dimensional Aggregation

*No items available*

## 6.6.0.0.0 Derived Metrics

- {'name': 'service.error.rate.percentage', 'calculation': '(SUM(http.server.errors.total) / SUM(http.server.requests.total)) * 100', 'sourceMetrics': ['http.server.errors.total', 'http.server.requests.total'], 'updateFrequency': '1m'}

# 7.0.0.0.0 Storage Requirements Planning

## 7.1.0.0.0 Retention Periods

### 7.1.1.0.0 Metric Type

#### 7.1.1.1.0 Metric Type

Performance (High Resolution)

#### 7.1.1.2.0 Retention Period

14 days

#### 7.1.1.3.0 Justification

Allows for detailed performance troubleshooting of recent events.

#### 7.1.1.4.0 Compliance Requirement

None

### 7.1.2.0.0 Metric Type

#### 7.1.2.1.0 Metric Type

Aggregated (1-hour resolution)

#### 7.1.2.2.0 Retention Period

13 months

#### 7.1.2.3.0 Justification

Supports long-term trend analysis and capacity planning.

#### 7.1.2.4.0 Compliance Requirement

None

## 7.2.0.0.0 Data Resolution

### 7.2.1.0.0 Time Range

#### 7.2.1.1.0 Time Range

0-14 days

#### 7.2.1.2.0 Resolution

15s

#### 7.2.1.3.0 Query Performance

High

#### 7.2.1.4.0 Storage Optimization

None

### 7.2.2.0.0 Time Range

#### 7.2.2.1.0 Time Range

14 days - 13 months

#### 7.2.2.2.0 Resolution

1h

#### 7.2.2.3.0 Query Performance

Low

#### 7.2.2.4.0 Storage Optimization

Downsampling

## 7.3.0.0.0 Downsampling Strategies

- {'sourceResolution': '15s', 'targetResolution': '1h', 'aggregationMethod': 'avg, sum, p95', 'triggerCondition': 'After 14 days'}

## 7.4.0.0.0 Storage Performance

| Property | Value |
|----------|-------|
| Write Latency | < 2s |
| Query Latency | < 5s for standard dashboards |
| Throughput Requirements | 10,000 DPM (Data Points per Minute) |
| Scalability Needs | Elastic scaling provided by Azure Monitor |

## 7.5.0.0.0 Query Optimization

*No items available*

## 7.6.0.0.0 Cost Optimization

- {'strategy': 'Downsampling and Retention Policies', 'implementation': 'Configure Azure Monitor data retention and archiving rules.', 'expectedSavings': '60-80% on long-term storage costs', 'tradeoffs': 'Loss of high-resolution data for historical analysis.'}

# 8.0.0.0.0 Project Specific Metrics Config

*Not specified*

# 9.0.0.0.0 Implementation Priority

*Not specified*

# 10.0.0.0.0 Risk Assessment

*Not specified*

# 11.0.0.0.0 Recommendations

*Not specified*

