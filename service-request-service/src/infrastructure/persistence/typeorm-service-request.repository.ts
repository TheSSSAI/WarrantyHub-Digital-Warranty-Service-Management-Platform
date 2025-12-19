import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { IServiceRequestRepository } from '../../modules/service-request/domain/ports/service-request.repository.port';
import { ServiceRequestEntity } from '../../modules/service-request/domain/service-request.entity';
import { ServiceRequestStatus } from '../../modules/service-request/domain/enums/service-request-status.enum';

@Injectable()
export class TypeOrmServiceRequestRepository implements IServiceRequestRepository {
  private readonly logger = new Logger(TypeOrmServiceRequestRepository.name);

  constructor(
    @InjectRepository(ServiceRequestEntity)
    private readonly repository: Repository<ServiceRequestEntity>,
  ) {}

  /**
   * Persists a ServiceRequestEntity to the database.
   * Handles both creation (insert) and updates.
   * 
   * @param request The domain entity to save
   * @returns The persisted entity
   */
  async save(request: ServiceRequestEntity): Promise<ServiceRequestEntity> {
    try {
      this.logger.debug(`Saving service request: ${request.id}`);
      return await this.repository.save(request);
    } catch (error) {
      this.logger.error(`Failed to save service request ${request.id}`, error.stack);
      // In a real-world app, parse TypeORM error codes (e.g., unique constraint) and throw Domain Exceptions
      throw new Error(`Persistence Error: ${error.message}`);
    }
  }

  /**
   * Finds a service request by its UUID.
   * Includes relations necessary for core business logic.
   * 
   * @param id The UUID of the request
   * @returns The entity or null
   */
  async findById(id: string): Promise<ServiceRequestEntity | null> {
    try {
      const request = await this.repository.findOne({
        where: { id } as FindOptionsWhere<ServiceRequestEntity>,
        // Pre-load relations often needed: chat messages might be lazy loaded, 
        // but simple metadata like signatures might be eager.
        // For now, we assume lazy loading or explicit query for heavy relations.
      });
      return request;
    } catch (error) {
      this.logger.error(`Error finding service request ${id}`, error.stack);
      throw new Error('Database read error');
    }
  }

  /**
   * Finds all service requests for a specific user.
   */
  async findByUserId(userId: string): Promise<ServiceRequestEntity[]> {
    return this.repository.find({
      where: { userId } as FindOptionsWhere<ServiceRequestEntity>,
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Finds requests by status for administrative dashboards.
   */
  async findByStatus(status: ServiceRequestStatus): Promise<ServiceRequestEntity[]> {
    return this.repository.find({
      where: { status } as FindOptionsWhere<ServiceRequestEntity>,
      order: { createdAt: 'ASC' }, // FIFO for processing queues
    });
  }

  /**
   * Updates the status of a request securely.
   * 
   * @param id Request UUID
   * @param status New Status
   */
  async updateStatus(id: string, status: ServiceRequestStatus): Promise<void> {
    const result = await this.repository.update(id, { status });
    if (result.affected === 0) {
      throw new NotFoundException(`Service Request ${id} not found for status update`);
    }
    this.logger.log(`Updated status for request ${id} to ${status}`);
  }

  /**
   * Deletes a request (Soft delete recommended for audit trails).
   */
  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
    this.logger.log(`Soft deleted service request ${id}`);
  }
}