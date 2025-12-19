import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApproveServiceCenterCommand } from './approve-service-center.command';
import { IServiceCenterRepository } from '../../domain/interfaces/service-center-repository.interface';
import { IEventPublisher } from '../../domain/interfaces/event-publisher.interface';
import { ServiceCenterStatus } from '../../domain/enums/service-center-status.enum';

@CommandHandler(ApproveServiceCenterCommand)
export class ApproveServiceCenterHandler implements ICommandHandler<ApproveServiceCenterCommand> {
  private readonly logger = new Logger(ApproveServiceCenterHandler.name);

  constructor(
    @Inject('IServiceCenterRepository')
    private readonly repository: IServiceCenterRepository,
    @Inject('IEventPublisher')
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(command: ApproveServiceCenterCommand): Promise<void> {
    const { serviceCenterId, adminId } = command;
    this.logger.log(`Admin ${adminId} attempting to approve service center ${serviceCenterId}`);

    // 1. Retrieve Entity
    const serviceCenter = await this.repository.findById(serviceCenterId);
    if (!serviceCenter) {
      throw new NotFoundException(`Service Center with ID ${serviceCenterId} not found.`);
    }

    // 2. Validate State Transition
    if (serviceCenter.status === ServiceCenterStatus.APPROVED) {
      this.logger.log(`Service Center ${serviceCenterId} is already approved.`);
      return; // Idempotent success
    }

    if (serviceCenter.status !== ServiceCenterStatus.PENDING_APPROVAL && serviceCenter.status !== ServiceCenterStatus.REJECTED) {
      // Depending on business rules, might not allow reactivating inactive centers via this specific command
      // Assuming here we only approve Pending or Rejected (re-review)
      throw new BadRequestException(`Current status ${serviceCenter.status} cannot be transitioned to APPROVED via this workflow.`);
    }

    // 3. Update Domain State
    serviceCenter.status = ServiceCenterStatus.APPROVED;
    // Potentially track approval metadata (approvedBy, approvedAt) if entity supports it
    // serviceCenter.approvedBy = adminId; 
    // serviceCenter.approvedAt = new Date();

    // 4. Persist
    await this.repository.save(serviceCenter);

    // 5. Publish Integration Event
    // This triggers the Notification Service to email the Service Center Admin
    await this.eventPublisher.publish('ServiceCenterApproved', {
      serviceCenterId: serviceCenter.id,
      name: serviceCenter.name,
      email: serviceCenter.email,
      approvedBy: adminId,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(`Service Center ${serviceCenterId} approved successfully.`);
  }
}