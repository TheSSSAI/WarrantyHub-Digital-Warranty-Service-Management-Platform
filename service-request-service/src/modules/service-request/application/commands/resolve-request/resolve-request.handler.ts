import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException, ForbiddenException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ResolveServiceRequestCommand } from './resolve-request.command';
import { IServiceRequestRepository } from '../../../domain/ports/service-request.repository.port';
import { ServiceRequestEntity } from '../../../domain/service-request.entity';
import { ServiceRequestStatus } from '../../../domain/enums/service-request-status.enum';

@CommandHandler(ResolveServiceRequestCommand)
export class ResolveServiceRequestHandler implements ICommandHandler<ResolveServiceRequestCommand> {
  private readonly logger = new Logger(ResolveServiceRequestHandler.name);

  constructor(
    @Inject('IServiceRequestRepository')
    private readonly repository: IServiceRequestRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ResolveServiceRequestCommand): Promise<ServiceRequestEntity> {
    this.logger.log(`Processing ResolveServiceRequestCommand for RequestID: ${command.requestId} by Technician: ${command.technicianId}`);

    try {
      // 1. Retrieve the Aggregate
      const serviceRequest = await this.repository.findById(command.requestId);

      if (!serviceRequest) {
        this.logger.warn(`Service Request ${command.requestId} not found.`);
        throw new NotFoundException(`Service request with ID ${command.requestId} not found.`);
      }

      // 2. Validate Authorization (Technician Assignment)
      if (serviceRequest.technicianId !== command.technicianId) {
        this.logger.warn(`Technician ${command.technicianId} attempted to resolve unassigned ticket ${command.requestId}.`);
        throw new ForbiddenException('You are not authorized to resolve this service request.');
      }

      // 3. Execute Domain Logic for Resolution
      // This method on the entity should handle state validation (e.g., must be IN_PROGRESS)
      // and update the internal state, resolution notes, and signature.
      serviceRequest.resolve({
        notes: command.resolutionNotes,
        partsUsed: command.partsUsed,
        signatureUrl: command.customerSignatureUrl,
        resolvedAt: new Date(),
      });

      // 4. Persist Changes
      const updatedRequest = await this.repository.save(serviceRequest);

      // 5. Publish Domain Events (RequestResolvedEvent)
      const requestWithEvents = this.publisher.mergeObjectContext(updatedRequest);
      requestWithEvents.commit();

      this.logger.log(`Service Request ${command.requestId} resolved successfully.`);

      return updatedRequest;

    } catch (error) {
      this.logger.error(`Error resolving service request: ${error.message}`, error.stack);
      
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      
      // Domain errors (like invalid state transition) usually surface here
      if (error.message.includes('Invalid status transition')) {
         throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('Failed to resolve service request.');
    }
  }
}