import { AuditLogEntity } from '../../domain/entities/audit-log.entity';

/**
 * Dependency Injection Token for the Audit Repository.
 * Use this token to inject the repository implementation into services/controllers.
 */
export const IAuditRepository = 'IAuditRepository';

/**
 * Contract for Audit Log data access operations.
 * This interface decouples the application layer from the specific persistence infrastructure.
 * 
 * @description
 * Adhering to the "Immutable Audit Trail" requirement (REQ-AUDIT-001), 
 * this repository primarily supports write operations.
 */
export interface IAuditRepository {
  /**
   * Persists a new audit log entry to the underlying storage.
   * 
   * @param auditLog - The domain entity representing the audit event to be saved.
   * @returns A promise resolving to the persisted entity, potentially with generated fields (e.g., ID) populated.
   * @throws {Error} If the persistence operation fails due to database connectivity or constraint violations.
   */
  save(auditLog: AuditLogEntity): Promise<AuditLogEntity>;

  /**
   * Checks the health of the repository connection.
   * Used by health check controllers to verify database connectivity.
   * 
   * @returns True if the repository is connected and writable, false otherwise.
   */
  isConnected(): Promise<boolean>;
}