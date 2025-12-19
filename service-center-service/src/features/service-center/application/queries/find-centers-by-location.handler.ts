import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { FindCentersByLocationQuery } from './find-centers-by-location.query';
import { IServiceCenterRepository } from '../../domain/interfaces/service-center-repository.interface';
import { ServiceCenter } from '../../domain/service-center.entity';

@QueryHandler(FindCentersByLocationQuery)
export class FindCentersByLocationHandler implements IQueryHandler<FindCentersByLocationQuery> {
  private readonly logger = new Logger(FindCentersByLocationHandler.name);

  constructor(
    @Inject('IServiceCenterRepository')
    private readonly repository: IServiceCenterRepository,
  ) {}

  async execute(query: FindCentersByLocationQuery): Promise<any[]> {
    const { latitude, longitude, brandId } = query;

    this.logger.debug(
      `Executing spatial query: Lat ${latitude}, Lon ${longitude}, Brand: ${brandId || 'All'}`,
    );

    // Delegate spatial logic to the infrastructure repository which has PostGIS awareness
    const centers = await this.repository.findCentersByLocation(latitude, longitude, brandId);

    // Transform Domain Entities to DTOs/ViewModels
    // We strip sensitive internal data and return only what is needed for routing selection
    return centers.map((center: ServiceCenter) => ({
      id: center.id,
      name: center.name,
      address: center.address,
      phone: center.phone,
      email: center.email,
      // If we are filtering by brand, we confirm this center services that brand
      // If no brand filter, we might list all supported brands
      supportedBrands: center.brands ? center.brands.map(b => ({ id: b.id, name: b.name })) : [],
      status: center.status,
    }));
  }
}