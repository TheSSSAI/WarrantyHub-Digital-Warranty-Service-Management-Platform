import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { IServiceCenterRepository } from '../../domain/interfaces/service-center-repository.interface';
import { ServiceCenterEntity } from '../../domain/service-center.entity';
import { ServiceCenterStatus } from '../../domain/enums/service-center-status.enum';

@Injectable()
export class ServiceCenterTypeOrmRepository implements IServiceCenterRepository {
  private readonly logger = new Logger(ServiceCenterTypeOrmRepository.name);

  constructor(
    @InjectRepository(ServiceCenterEntity)
    private readonly repository: Repository<ServiceCenterEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(serviceCenter: ServiceCenterEntity): Promise<ServiceCenterEntity> {
    try {
      this.logger.debug(`Saving new service center: ${serviceCenter.name}`);
      return await this.repository.save(serviceCenter);
    } catch (error) {
      this.logger.error(`Error saving service center: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(serviceCenter: ServiceCenterEntity): Promise<void> {
    try {
      this.logger.debug(`Updating service center: ${serviceCenter.id}`);
      await this.repository.save(serviceCenter);
    } catch (error) {
      this.logger.error(`Error updating service center ${serviceCenter.id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findById(id: string): Promise<ServiceCenterEntity | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['serviceAreas', 'brands'],
    });
  }

  async findByStatus(status: ServiceCenterStatus, skip: number = 0, take: number = 20): Promise<[ServiceCenterEntity[], number]> {
    return await this.repository.findAndCount({
      where: { status },
      skip,
      take,
      order: { createdAt: 'ASC' },
      relations: ['brands'],
    });
  }

  /**
   * Finds service centers that have a service area polygon containing the specified location.
   * Utilizes PostGIS ST_Contains for spatial querying.
   * 
   * @param latitude The latitude of the location
   * @param longitude The longitude of the location
   * @param brandId Optional brand ID filter
   */
  async findCoveringLocation(latitude: number, longitude: number, brandId?: string): Promise<ServiceCenterEntity[]> {
    try {
      const queryBuilder: SelectQueryBuilder<ServiceCenterEntity> = this.repository.createQueryBuilder('sc');

      // Join with service areas to perform spatial query
      queryBuilder
        .innerJoinAndSelect('sc.serviceAreas', 'sa')
        .leftJoinAndSelect('sc.brands', 'brand')
        .where('sc.status = :status', { status: ServiceCenterStatus.APPROVED });

      // PostGIS spatial query: Check if the point is within the polygon
      // ST_SetSRID(ST_Point(lon, lat), 4326) creates a point with WGS84 coordinate system
      queryBuilder.andWhere(
        'ST_Contains(sa.geometry, ST_SetSRID(ST_Point(:longitude, :latitude), 4326))',
        { longitude, latitude }
      );

      if (brandId) {
        // Filter by brand association on the service area definition
        queryBuilder.andWhere('sa.brandId = :brandId', { brandId });
      }

      const results = await queryBuilder.getMany();
      return results;
    } catch (error) {
      this.logger.error(`Spatial query failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }
}