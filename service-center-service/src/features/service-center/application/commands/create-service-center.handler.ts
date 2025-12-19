import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, BadRequestException } from '@nestjs/common';
import { CreateServiceCenterCommand } from './create-service-center.command';
import { IServiceCenterRepository } from '../../domain/interfaces/service-center-repository.interface';
import { ServiceCenterEntity } from '../../domain/service-center.entity';
import { ServiceCenterStatus } from '../../domain/enums/service-center-status.enum';

@CommandHandler(CreateServiceCenterCommand)
export class CreateServiceCenterHandler implements ICommandHandler<CreateServiceCenterCommand> {
  private readonly logger = new Logger(CreateServiceCenterHandler.name);

  constructor(
    private readonly repository: IServiceCenterRepository
  ) {}

  async execute(command: CreateServiceCenterCommand): Promise<string> {
    this.logger.log(`Handling CreateServiceCenterCommand for: ${command.name}`);

    // Business Logic: Check for duplicates or other pre-conditions could go here
    // Note: In this simplified handler, we assume uniqueness constraints are handled by DB or earlier validation

    const serviceCenter = new ServiceCenterEntity();
    serviceCenter.name = command.name;
    serviceCenter.address = command.address;
    serviceCenter.contactEmail = command.contactEmail;
    serviceCenter.contactPhone = command.contactPhone;
    serviceCenter.status = ServiceCenterStatus.PENDING_APPROVAL;
    serviceCenter.createdAt = new Date();
    
    // Initialize empty collections
    serviceCenter.brands = [];
    serviceCenter.serviceAreas = [];

    try {
      const savedEntity = await this.repository.create(serviceCenter);
      this.logger.log(`Service Center created successfully with ID: ${savedEntity.id}`);
      return savedEntity.id;
    } catch (error) {
      this.logger.error(`Failed to create service center: ${error.message}`, error.stack);
      throw new BadRequestException('Could not create service center. Please check the input data.');
    }
  }
}