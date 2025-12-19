import { Controller, Inject, Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CriticalActionEventDto } from '../../application/dtos/critical-action-event.dto';
import { IAuditRepository } from '../../application/interfaces/audit-repository.interface';
import { AuditLogEntity } from '../../domain/entities/audit-log.entity';
import { ServiceBusExceptionFilter } from './service-bus.filter';

/**
 * Controller responsible for consuming 'CriticalActionOccurred' events from Azure Service Bus.
 * It acts as the entry point for the Audit Worker Service, orchestrating the validation,
 * transformation, and persistence of audit events.
 */
@Controller()
@UseFilters(ServiceBusExceptionFilter)
export class AuditEventConsumer {
  private readonly logger = new Logger(AuditEventConsumer.name);

  constructor(
    @Inject('IAuditRepository')
    private readonly auditRepository: IAuditRepository,
  ) {}

  /**
   * Handles the 'CriticalActionOccurred' event.
   * 
   * This method:
   * 1. Validates the incoming payload against the DTO schema.
   * 2. Maps the DTO to the Domain Entity.
   * 3. Persists the entity using the repository.
   * 4. Relies on the ServiceBusExceptionFilter to handle failures (Retry/DLQ).
   * 
   * @param payload Validated event data containing critical action details
   * @param context Azure Service Bus context
   */
  @EventPattern('CriticalActionOccurred')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async handleCriticalAction(
    @Payload() payload: CriticalActionEventDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const messageId = context.getMessage?.().messageId || 'unknown';
    
    this.logger.log(
      `Received 'CriticalActionOccurred' event. MessageId: ${messageId}, Action: ${payload.action}, User: ${payload.userId}`,
    );

    try {
      const auditLogEntity = this.mapDtoToEntity(payload);
      
      await this.auditRepository.save(auditLogEntity);

      this.logger.log(
        `Successfully processed audit event. MessageId: ${messageId}`,
      );
    } catch (error) {
      this.logger.error(
        `Error processing audit event. MessageId: ${messageId}`,
        error.stack,
      );
      // Throwing ensures the ExceptionFilter catches it and decides on NACK/Retry logic
      throw error;
    }
  }

  /**
   * Maps the Data Transfer Object to the Audit Log Entity.
   * Handles field name impedance mismatches (e.g., action -> actionType).
   * 
   * @param dto The validated input DTO
   * @returns A populated AuditLogEntity ready for persistence
   */
  private mapDtoToEntity(dto: CriticalActionEventDto): AuditLogEntity {
    const entity = new AuditLogEntity();
    
    // Explicit mapping to ensure data integrity and decoupling of external DTO contract from internal DB schema
    entity.timestamp = new Date(dto.timestamp);
    entity.userId = dto.userId;
    entity.actionType = dto.action; // Map 'action' from event to 'actionType' in DB
    entity.targetEntity = dto.targetEntity;
    entity.targetEntityId = dto.targetEntityId;
    entity.sourceIpAddress = dto.sourceIpAddress || null;
    entity.changeDetails = dto.details || null; // Map 'details' to 'changeDetails' JSONB column

    return entity;
  }
}