import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAuditRepository } from '../../application/interfaces/audit-repository.interface';
import { AuditLogEntity } from '../../domain/entities/audit-log.entity';

/**
 * Implementation of the Audit Repository using TypeORM.
 * Responsible for persisting immutable audit logs to the PostgreSQL database.
 */
@Injectable()
export class TypeOrmAuditRepository implements IAuditRepository {
  private readonly logger = new Logger(TypeOrmAuditRepository.name);

  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly auditLogRepository: Repository<AuditLogEntity>,
  ) {}

  /**
   * Persists an audit log entry to the database.
   * This implementation uses 'save' which handles both insert and update,
   * though audit logs are architecturally append-only.
   *
   * @param log The audit log entity to save
   * @throws Error if the database operation fails
   */
  async save(log: AuditLogEntity): Promise<void> {
    try {
      // Using save ensures that hooks and validation decorators (if any) are executed.
      // Since ID is auto-generated UUID, this effectively acts as an INSERT.
      await this.auditLogRepository.save(log);
      
      this.logger.debug(
        `Audit log successfully persisted for User: ${log.userId}, Action: ${log.actionType}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to persist audit log for User: ${log.userId}, Action: ${log.actionType}`,
        error.stack,
      );
      // Re-throw to allow the caller (Consumer) or global filters to handle the retry/DLQ logic
      throw error;
    }
  }
}