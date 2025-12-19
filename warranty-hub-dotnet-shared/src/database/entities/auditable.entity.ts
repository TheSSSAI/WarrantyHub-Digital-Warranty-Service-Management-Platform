import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

/**
 * Abstract entity class extending the base entity to include
 * audit trail fields for tracking user modifications.
 *
 * This implementation adheres to the auditing requirements (REQ-AUDIT-001)
 * by capturing who created, updated, or deleted the record.
 */
export abstract class AuditableEntity extends BaseEntity {
  /**
   * ID of the user who created the record.
   * Should be populated automatically by subscribers or repositories.
   */
  @Column({ name: 'created_by', type: 'varchar', nullable: true })
  createdBy?: string;

  /**
   * ID of the user who last updated the record.
   */
  @Column({ name: 'updated_by', type: 'varchar', nullable: true })
  updatedBy?: string;

  /**
   * ID of the user who performed the soft delete (if applicable).
   */
  @Column({ name: 'deleted_by', type: 'varchar', nullable: true })
  deletedBy?: string;
}