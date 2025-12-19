# 1 Strategies

## 1.1 Retry

### 1.1.1 Type

🔹 Retry

### 1.1.2 Configuration

#### 1.1.2.1 Description

Handles transient, intermittent failures for external HTTP calls and database connections. Implemented using Polly in the .NET services.

#### 1.1.2.2 Policy Name

TransientHttpAndDbRetryPolicy

#### 1.1.2.3 Retry Strategy

ExponentialBackoffWithJitter

#### 1.1.2.4 Retry Attempts

3

#### 1.1.2.5 Backoff Delays

| Property | Value |
|----------|-------|
| Delay1 | 1s |
| Delay2 | 3s |
| Delay3 | 8s |

#### 1.1.2.6 Error Handling Rules

- HttpRequestException
- NpgsqlException_IsTransient
- HttpStatusCode_5xx
- HttpStatusCode_408_RequestTimeout

## 1.2.0.0 CircuitBreaker

### 1.2.1.0 Type

🔹 CircuitBreaker

### 1.2.2.0 Configuration

#### 1.2.2.1 Description

Protects the system from cascading failures when critical external dependencies (FCM, OCR) are unavailable. Applied on top of the Retry policy.

#### 1.2.2.2 Policy Name

ExternalServiceCircuitBreakerPolicy

#### 1.2.2.3 Failure Threshold

5

#### 1.2.2.4 Break Duration

30s

#### 1.2.2.5 Error Handling Rules

- HttpRequestException
- HttpStatusCode_5xx
- HttpStatusCode_408_RequestTimeout

## 1.3.0.0 DeadLetter

### 1.3.1.0 Type

🔹 DeadLetter

### 1.3.2.0 Configuration

#### 1.3.2.1 Description

For the asynchronous OCR Processing Worker, permanently failed messages (e.g., malformed invoice, non-retryable API error) are moved to a Dead-Letter Queue (DLQ) after all retries are exhausted. This prevents blocking the main queue.

#### 1.3.2.2 Source Queue

invoice-processing-queue

#### 1.3.2.3 Dead Letter Queue

invoice-processing-queue/$DeadLetterQueue

#### 1.3.2.4 Trigger Reason

MaxDeliveryCountExceeded

#### 1.3.2.5 Error Handling Rules

- UnprocessableInvoiceError
- ExternalServicePermanentError
- HttpStatusCode_4xx

# 2.0.0.0 Monitoring

## 2.1.0.0 Error Types

- HttpRequestException
- NpgsqlException_IsTransient
- CircuitBreakerOpenException
- MessageDeadLettered
- ExternalServicePermanentError

## 2.2.0.0 Alerting

Critical alerts are triggered via Azure Monitor for two primary conditions: 1) The 'ExternalServiceCircuitBreakerPolicy' enters an 'Open' state, indicating a sustained external dependency failure. 2) The message count in the 'invoice-processing-queue/$DeadLetterQueue' increases, indicating a persistent message processing failure. All caught exceptions are logged as structured events to Azure Monitor Logs with a correlation ID for end-to-end tracing.

