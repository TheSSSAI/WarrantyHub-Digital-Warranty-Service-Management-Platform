# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-116 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System: Purge technician location data 24 hours af... |
| As A User Story | As a System Administrator, I want an automated pro... |
| User Persona | System (Automated Process). Beneficiary: Technicia... |
| Business Value | Enhances technician privacy, ensures compliance wi... |
| Functional Area | Data Lifecycle Management & Compliance |
| Story Theme | Privacy & Security |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Location data is purged 24 hours after job resolution

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A service request (Job ID: 123) has its status changed to 'Resolved' at timestamp 'T'

### 3.1.5 And

An immutable audit log is created stating that location data for Job ID 123 was purged, including the timestamp of the purge action.

### 3.1.6 When

An automated purge process runs at any time after 'T + 24 hours'

### 3.1.7 Then

All location data records associated specifically with Job ID 123 are permanently deleted from the database

### 3.1.8 Validation Notes

Verify by checking the location data table for the absence of records for Job ID 123 and confirming the creation of a corresponding audit log entry.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Edge Case: Purge is cancelled if job is re-opened within the 24-hour window

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

A service request (Job ID: 456) has its status changed to 'Resolved' at timestamp 'T'

### 3.2.5 And

The job status is changed to 'Disputed' at 'T + 10 hours'

### 3.2.6 When

The automated purge process runs at 'T + 24 hours and 5 minutes'

### 3.2.7 Then

The location data records for Job ID 456 are NOT deleted.

### 3.2.8 Validation Notes

Verify that all location data for Job ID 456 still exists in the database after the purge process has run.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Edge Case: Job is re-opened after data has been purged

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

Location data for Job ID: 123 was successfully purged at 'T + 24 hours'

### 3.3.5 And

The job status is changed to 'Disputed' at 'T + 30 hours'

### 3.3.6 When

An administrator views the job history

### 3.3.7 Then

The system operates correctly, but the historical location data for that job is permanently unavailable, which is the expected behavior.

### 3.3.8 Validation Notes

Confirm that the system does not error and that no location data is present for the re-opened job.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Data Scoping: Purge for one job does not affect other jobs

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

A technician has completed Job A (status 'Resolved' at 'T') and has an active Job B (status 'Work In Progress')

### 3.4.5 And

All location data associated with Job B remains untouched.

### 3.4.6 When

The automated purge process runs at 'T + 24 hours and 5 minutes'

### 3.4.7 Then

Only the location data associated with Job A is deleted

### 3.4.8 Validation Notes

Query the database to confirm Job A's location data is gone while Job B's location data is still present.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Handling: System recovers from a failed purge job run

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

A service request (Job ID: 789) was resolved at timestamp 'T'

### 3.5.5 And

A critical alert is logged or sent to the operations team regarding the failed job run.

### 3.5.6 When

The purge job runs again successfully on its next scheduled interval (e.g., 'T + 25 hours')

### 3.5.7 Then

The location data for Job ID 789 is successfully purged

### 3.5.8 Validation Notes

Simulate a job failure, then run it again and verify data is purged. Check monitoring/alerting system for the failure notification.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

No-Op: Job with no location data is handled gracefully

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A service request (Job ID: 999) is resolved at timestamp 'T'

### 3.6.5 And

The technician never activated 'Travel Mode', so no location data was ever recorded for this job

### 3.6.6 When

The automated purge process runs at 'T + 24 hours and 5 minutes'

### 3.6.7 Then

The process identifies the job, finds no data to purge, and completes without errors.

### 3.6.8 Validation Notes

Verify that the purge job completes successfully and does not generate any errors for jobs without location data.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- None

## 4.2.0 User Interactions

- None. This is a backend, automated process with no direct user interaction.

## 4.3.0 Display Requirements

- None

## 4.4.0 Accessibility Needs

- Not applicable

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Technician location data must be retained for exactly 24 hours after the final resolution or closure of a service request.

### 5.1.3 Enforcement Point

Automated system job/scheduler.

### 5.1.4 Violation Handling

A violation (e.g., failure to delete) must trigger a high-priority alert to the system operations team for immediate investigation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

If a service request's status reverts from a terminal state ('Resolved', 'Closed') to an active state ('Disputed', 'Work In Progress') within the 24-hour window, the scheduled data purge for that request must be cancelled.

### 5.2.3 Enforcement Point

Logic within the service request status update service.

### 5.2.4 Violation Handling

N/A - System logic must prevent the violation.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-079

#### 6.1.1.2 Dependency Reason

Defines the creation and storage of technician location data that this story needs to purge.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-078

#### 6.1.2.2 Dependency Reason

Defines the 'Resolved' job status which acts as a primary trigger for the purge timer.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-068

#### 6.1.3.2 Dependency Reason

Defines the 'Closed' job status which acts as an alternative trigger for the purge timer.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-049

#### 6.1.4.2 Dependency Reason

Defines the 'Disputed' status which must cancel a pending purge.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-114

#### 6.1.5.2 Dependency Reason

Defines the requirements for the immutable audit trail where the purge action must be logged.

## 6.2.0.0 Technical Dependencies

- A robust, reliable task scheduling system (e.g., Kubernetes CronJob, Azure Functions Timer Trigger).
- The primary PostgreSQL database containing the service request and location data tables.
- The centralized logging and monitoring system (e.g., Azure Monitor, Prometheus, Alertmanager).

## 6.3.0.0 Data Dependencies

- The data model for service requests must include a status field and a `status_last_updated_at` timestamp.
- The location data table must have a foreign key relationship to the service request table to allow for targeted deletion.

## 6.4.0.0 External Dependencies

- None

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The purge process must be designed to run efficiently in batches to avoid long-running transactions or table locks on the database.
- The query to identify jobs eligible for purging must be optimized and use appropriate database indexes to perform well under high data volume.

## 7.2.0.0 Security

- The deletion of location data must be a permanent, irrecoverable (hard) delete.
- The audit log entry for the purge action must NOT contain any of the purged PII (i.e., no location coordinates).
- Access to run the purge job must be restricted to a specific system-level service account with minimal required permissions.

## 7.3.0.0 Usability

- Not applicable

## 7.4.0.0 Accessibility

- Not applicable

## 7.5.0.0 Compatibility

- Not applicable

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a fault-tolerant, state-aware scheduled job.
- Logic to handle cancellation of a pending purge adds complexity.
- Ensuring the process is performant and scalable as the number of completed jobs grows.
- Requires robust monitoring and alerting for a critical compliance-related process.

## 8.3.0.0 Technical Risks

- The scheduler fails silently, leading to a backlog of data that needs purging, potentially causing a compliance breach.
- A bug in the selection logic could delete data for active jobs or fail to delete data for completed jobs.
- The deletion process could cause database performance degradation if not properly optimized.

## 8.4.0.0 Integration Points

- Service Request Service: To read job statuses and completion timestamps.
- Location Service: To delete the location data from its database table.
- Audit Service: To write a log entry after a successful purge.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance

## 9.2.0.0 Test Scenarios

- Verify data is deleted after 24 hours.
- Verify data is NOT deleted if job is re-opened within 24 hours.
- Verify the job handles cases with no location data.
- Verify the job recovers from failure and processes the backlog on the next run.
- Verify the performance of the purge query against a large dataset.

## 9.3.0.0 Test Data Needs

- Jobs in 'Resolved' state older than 24 hours.
- Jobs in 'Resolved' state newer than 24 hours.
- Jobs that were 'Resolved' and then changed to 'Disputed'.
- Active jobs with location data.
- Completed jobs with no location data.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- A time-mocking library (e.g., `sinon.useFakeTimers` in Node.js) for E2E and integration tests to simulate the 24-hour delay without waiting.
- Playwright or Supertest for triggering API endpoints that change job status.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented with >80% coverage for the new logic
- Integration testing completed successfully between the scheduler, job service, and location data store
- E2E tests simulating the time-based purge are passing in a controlled environment
- Performance requirements verified against a representative data load
- Security requirements validated, including confirmation of hard delete and secure audit logging
- Documentation updated to reflect the new data retention policy for technician location data
- The scheduled job is deployed and verified as operational in the staging environment with appropriate monitoring and alerts configured

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a critical compliance and privacy feature.
- Requires dedicated time for setting up time-based test scenarios.
- This is a backend-only task and can be developed in parallel with frontend features, provided the prerequisite stories are complete.

## 11.4.0.0 Release Impact

This feature must be in place before any feature that collects technician location data (US-079) is released to production to ensure compliance from day one.

