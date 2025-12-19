/**
 * Defines the distinct roles a user can hold within the mobile application context.
 */
export enum UserRole {
  CONSUMER = 'CONSUMER',
  TECHNICIAN = 'TECHNICIAN'
}

/**
 * Represents the lifecycle states of a service request.
 * Maps to backend state machine.
 */
export enum ServiceRequestStatus {
  REQUESTED = 'Requested',
  ACKNOWLEDGED = 'Acknowledged',
  TECHNICIAN_ASSIGNED = 'TechnicianAssigned',
  TECHNICIAN_EN_ROUTE = 'TechnicianEnRoute',
  WORK_IN_PROGRESS = 'WorkInProgress',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
  CANCELLED = 'Cancelled',
  DISPUTED = 'Disputed'
}

/**
 * Tracks the synchronization state of local data (WatermelonDB) with the backend.
 * Critical for the Offline-First architecture.
 */
export enum SyncStatus {
  PENDING = 'pending',       // Created locally, waiting for network
  PROCESSING = 'processing', // Currently being sent to API
  COMPLETED = 'completed',   // Successfully synced
  FAILED = 'failed'          // Sync failed, requires retry or user intervention
}

/**
 * HTTP Methods supported for offline action queueing.
 */
export enum HttpMethod {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/**
 * Warranty status for UI badges and logic.
 */
export enum WarrantyStatus {
  ACTIVE = 'Active',
  EXPIRING_SOON = 'ExpiringSoon',
  EXPIRED = 'Expired'
}