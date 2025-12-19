import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, Logger, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateServiceRequestCommand } from './create-request.command';
import { IServiceRequestRepository } from '../../../domain/ports/service-request.repository.port';
import { IProductIntegrationPort } from '../../../domain/ports/product-integration.port';
import { IServiceCenterIntegrationPort } from '../../../domain/ports/service-center-integration.port';
import { RoutingDomainService } from '../../../domain/services/routing.domain-service';
import { ServiceRequestEntity } from '../../../domain/service-request.entity';
import { ServiceRequestStatus } from '../../../domain/enums/service-request-status.enum';
import { GeoLocation } from '../../../domain/value-objects/geo-location.vo';

@CommandHandler(CreateServiceRequestCommand)
export class CreateServiceRequestHandler implements ICommandHandler<CreateServiceRequestCommand> {
  private readonly logger = new Logger(CreateServiceRequestHandler.name);

  constructor(
    @Inject('IServiceRequestRepository')
    private readonly repository: IServiceRequestRepository,
    @Inject('IProductIntegrationPort')
    private readonly productPort: IProductIntegrationPort,
    @Inject('IServiceCenterIntegrationPort')
    private readonly serviceCenterPort: IServiceCenterIntegrationPort,
    private readonly routingService: RoutingDomainService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateServiceRequestCommand): Promise<ServiceRequestEntity> {
    this.logger.log(`Processing CreateServiceRequestCommand for ProductID: ${command.productId}`);

    try {
      // 1. Validate Product Ownership and Warranty Status
      const productValidation = await this.productPort.validateWarranty(
        command.productId,
        command.userId,
      );

      if (!productValidation.isValid) {
        this.logger.warn(`Product validation failed for ${command.productId}: ${productValidation.reason}`);
        throw new BadRequestException(`Product validation failed: ${productValidation.reason}`);
      }

      // 2. Resolve Geographic Location for Routing
      const userLocation = new GeoLocation(command.latitude, command.longitude);

      // 3. Find Eligible Service Centers via Port (Infrastructure Adapter)
      const candidateCenters = await this.serviceCenterPort.findCandidates(
        userLocation,
        productValidation.brandId,
      );

      if (!candidateCenters || candidateCenters.length === 0) {
        this.logger.warn(`No eligible service centers found for Brand ${productValidation.brandId} at location ${userLocation.toString()}`);
        throw new NotFoundException('No service center available for your location and product brand.');
      }

      // 4. Execute Domain Logic to Select Best Center
      const selectedCenter = this.routingService.selectBestCenter(userLocation, candidateCenters);

      if (!selectedCenter) {
        this.logger.error('Routing domain service failed to select a center from valid candidates.');
        throw new InternalServerErrorException('Failed to route service request.');
      }

      this.logger.log(`Routed to Service Center: ${selectedCenter.id}`);

      // 5. Create Domain Entity
      const serviceRequest = ServiceRequestEntity.create({
        userId: command.userId,
        productId: command.productId,
        productDetails: {
          model: productValidation.model,
          serialNumber: productValidation.serialNumber,
          brandId: productValidation.brandId,
        },
        issueDescription: command.issueDescription,
        issueType: command.issueType,
        location: userLocation,
        serviceCenterId: selectedCenter.id,
        warrantyStatus: productValidation.warrantyStatus,
        preferredSlotId: command.preferredSlotId,
      });

      // 6. Persist
      const savedRequest = await this.repository.save(serviceRequest);

      // 7. Publish Domain Events (RequestCreatedEvent)
      const requestWithEvents = this.publisher.mergeObjectContext(savedRequest);
      requestWithEvents.commit();

      this.logger.log(`Service Request ${savedRequest.id} created successfully.`);

      return savedRequest;

    } catch (error) {
      this.logger.error(`Failed to create service request: ${error.message}`, error.stack);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred while creating the service request.');
    }
  }
}