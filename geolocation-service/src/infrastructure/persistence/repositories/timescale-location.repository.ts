import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILocationRepository } from '../../../domain/ports/ilocation-repository.port.ts';
import { LocationHistoryEntity } from '../entities/location-history.entity.ts';

@Injectable()
export class TimescaleLocationRepository implements ILocationRepository {
  private readonly logger = new Logger(TimescaleLocationRepository.name);

  constructor(
    @InjectRepository(LocationHistoryEntity)
    private readonly typeormRepository: Repository<LocationHistoryEntity>,
  ) {}

  /**
   * Persists a location history point to TimescaleDB.
   * This implementation handles the actual DB write.
   */
  async saveHistory(data: LocationHistoryEntity): Promise<void> {
    try {
      // TypeORM's save method validates the entity against the schema
      await this.typeormRepository.save(data);
    } catch (error) {
      this.logger.error(
        `Failed to save location history for technician ${data.technicianId} on job ${data.jobId}`, 
        error instanceof Error ? error.message : String(error)
      );
      throw new Error('Database persistence failed');
    }
  }

  /**
   * Retrieves historical path for a job.
   * Useful for auditing or replaying the route.
   */
  async getHistoryByJobId(jobId: string): Promise<LocationHistoryEntity[]> {
    try {
      return await this.typeormRepository.find({
        where: { jobId },
        order: { timestamp: 'ASC' },
      });
    } catch (error) {
      this.logger.error(`Failed to fetch history for job ${jobId}`, error);
      throw new Error('Database retrieval failed');
    }
  }

  /**
   * Prunes old data.
   * This might be called by a cron job service.
   * Implements the 24-hour retention policy requirement (REQ-FUNC-009).
   */
  async deleteOlderThan(date: Date): Promise<void> {
    try {
      await this.typeormRepository
        .createQueryBuilder()
        .delete()
        .where('timestamp < :date', { date })
        .execute();
        
      this.logger.log(`Purged location data older than ${date.toISOString()}`);
    } catch (error) {
      this.logger.error('Failed to purge old location data', error);
    }
  }
}