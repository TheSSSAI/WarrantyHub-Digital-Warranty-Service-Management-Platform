import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

/**
 * Represents an immutable record of a critical action within the system.
 * This entity maps to the 'audit_logs' table in the PostgreSQL database.
 * 
 * Architecture: Domain Layer (Level 0)
 * Pattern: Anemic Domain Model (Data Structure for Persistence)
 */
@Entity('audit_logs')
export class AuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Index()
  @Column({ name: 'action_type', type: 'varchar', length: 100, nullable: false })
  actionType: string;

  @Column({ name: 'target_entity', type: 'varchar', length: 100, nullable: false })
  targetEntity: string;

  @Index()
  @Column({ name: 'target_entity_id', type: 'varchar', length: 255, nullable: false })
  targetEntityId: string;

  @Column({ name: 'source_ip_address', type: 'varchar', length: 45, nullable: true })
  sourceIpAddress: string | null;

  @Column({ name: 'change_details', type: 'jsonb', nullable: true })
  changeDetails: Record<string, any> | null;

  @Index()
  @CreateDateColumn({ name: 'timestamp', type: 'timestamptz' })
  timestamp: Date;

  /**
   * Factory method to create a new AuditLogEntity instance.
   * Enforces object creation consistency.
   */
  static create(
    userId: string,
    actionType: string,
    targetEntity: string,
    targetEntityId: string,
    sourceIpAddress: string | null,
    changeDetails: Record<string, any> | null,
    timestamp?: Date
  ): AuditLogEntity {
    const auditLog = new AuditLogEntity();
    auditLog.userId = userId;
    auditLog.actionType = actionType;
    auditLog.targetEntity = targetEntity;
    auditLog.targetEntityId = targetEntityId;
    auditLog.sourceIpAddress = sourceIpAddress;
    auditLog.changeDetails = changeDetails;
    if (timestamp) {
      auditLog.timestamp = timestamp;
    }
    return auditLog;
  }
}