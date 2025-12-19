import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DefineServiceAreaCommand } from './define-service-area.command';
import { IServiceCenterRepository } from '../../domain/interfaces/service-center-repository.interface';
import { IGeoSpatialValidator } from '../../domain/interfaces/geo-spatial-validator.interface';
import { ServiceCenterStatus } from '../../domain/enums/service-center-status.enum';
import { ServiceAreaPolygonEntity } from '../../infrastructure/persistence/service-area-polygon.schema'; // Assuming Infrastructure entity availability

@CommandHandler(DefineServiceAreaCommand)
export class DefineServiceAreaHandler implements ICommandHandler<DefineServiceAreaCommand> {
  private readonly logger = new Logger(DefineServiceAreaHandler.name);

  constructor(
    private readonly repository: IServiceCenterRepository,
    private readonly geoValidator: IGeoSpatialValidator
  ) {}

  async execute(command: DefineServiceAreaCommand): Promise<void> {
    const { serviceCenterId, brandId, geometry } = command;
    this.logger.log(`Defining service area for Center: ${serviceCenterId}, Brand: ${brandId}`);

    // 1. Fetch Service Center
    const serviceCenter = await this.repository.findById(serviceCenterId);
    if (!serviceCenter) {
      throw new NotFoundException(`Service Center ${serviceCenterId} not found.`);
    }

    // 2. Validate Service Center State
    if (serviceCenter.status !== ServiceCenterStatus.APPROVED) {
      throw new BadRequestException('Cannot define service area for a Service Center that is not APPROVED.');
    }

    // 3. Validate GeoJSON Polygon
    try {
      this.geoValidator.validatePolygon(geometry);
    } catch (validationError) {
      this.logger.warn(`GeoJSON validation failed: ${validationError.message}`);
      throw validationError;
    }

    // 4. Check if Brand is Associated (Business Rule)
    const isBrandLinked = serviceCenter.brands && serviceCenter.brands.some(b => b.id === brandId);
    if (!isBrandLinked && serviceCenter.brands) { // Assuming brands are loaded
       // Note: In a real scenario, we might need to load brands specifically if not eager loaded.
       // Here assuming repository findById loads them. 
       // If brands is empty array but relations loaded, then fail.
       throw new BadRequestException(`Brand ${brandId} is not associated with this Service Center.`);
    }

    // 5. Update/Add Service Area
    // We treat this as an "Add" or "Replace for Brand" logic. 
    // Assuming for this command we are defining a NEW area polygon.
    
    // We need to construct the ServiceAreaPolygonEntity manually or via a factory method on the domain entity.
    // Since ServiceAreaPolygon is managed via the aggregate root (ServiceCenter) in DDD,
    // we should add it to the serviceCenter.serviceAreas collection.

    const newArea = new ServiceAreaPolygonEntity();
    newArea.brandId = brandId;
    newArea.serviceCenter = serviceCenter;
    newArea.geometry = geometry;
    newArea.createdAt = new Date();

    if (!serviceCenter.serviceAreas) {
      serviceCenter.serviceAreas = [];
    }

    // Logic Decision: Do we replace existing areas for this brand or append?
    // Requirement implies "defining a service area", often meaning "setting the area".
    // Let's remove existing areas for this brand to avoid overlaps/confusion unless specified otherwise.
    serviceCenter.serviceAreas = serviceCenter.serviceAreas.filter(sa => sa.brandId !== brandId);
    serviceCenter.serviceAreas.push(newArea);

    // 6. Persist
    await this.repository.update(serviceCenter);
    this.logger.log(`Service area updated successfully for Center ${serviceCenterId}`);
  }
}