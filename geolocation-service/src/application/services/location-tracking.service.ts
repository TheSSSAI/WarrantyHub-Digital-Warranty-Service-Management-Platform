import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICachePort } from '../../domain/ports/icache.port.ts';
import { ILocationRepository } from '../../domain/ports/ilocation-repository.port.ts';
import { LocationUpdateDto } from '../../infrastructure/websocket/dto/location-update.dto.ts';
import { LocationHistoryEntity } from '../../infrastructure/persistence/entities/location-history.entity.ts';

@Injectable()
export class LocationTrackingService {
  private readonly logger = new Logger(LocationTrackingService.name);
  private readonly LOCATION_CACHE_TTL = 86400; // 24 hours in seconds

  constructor(
    @Inject('ICachePort')
    private readonly cacheService: ICachePort,
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
  ) {}

  /**
   * Processes a location update from a technician.
   * 1. Updates the latest location in the hot cache (Redis) for low-latency retrieval.
   * 2. Asynchronously persists the location to the time-series database (TimescaleDB).
   * 
   * @param technicianId The ID of the technician sending the update.
   * @param data The location payload.
   */
  async processUpdate(technicianId: string, data: LocationUpdateDto): Promise<void> {
    try {
      const timestamp = new Date();
      
      // 1. Update Cache (Hot Path)
      // We store the latest location keyed by job ID for quick lookup by customers
      const cacheKey = `tracking:job:${data.jobId}:latest`;
      const locationState = {
        ...data,
        technicianId,
        lastUpdated: timestamp.toISOString(),
      };
      
      await this.cacheService.set(
        cacheKey, 
        JSON.stringify(locationState), 
        this.LOCATION_CACHE_TTL
      );

      // 2. Persist to Database (Async/Cold Path)
      // We do not await this to ensure the WebSocket loop remains as fast as possible.
      // In a production system, this might push to a queue (Kafka/RabbitMQ), 
      // but here we call the repository directly as a "fire and forget" task 
      // with its own error handling block.
      this.persistLocationAsync(technicianId, data, timestamp);

    } catch (error) {
      this.logger.error(
        `Failed to process location update for technician ${technicianId}`, 
        error instanceof Error ? error.stack : String(error)
      );
      throw error; // Rethrow to notify the gateway
    }
  }

  /**
   * Retrieves the last known location for a specific job.
   * Served directly from the cache for performance.
   */
  async getLatestLocation(jobId: string): Promise<any | null> {
    try {
      const cacheKey = `tracking:job:${jobId}:latest`;
      const cachedData = await this.cacheService.get(cacheKey);
      
      if (!cachedData) {
        return null;
      }
      
      return JSON.parse(cachedData);
    } catch (error) {
      this.logger.error(`Failed to retrieve latest location for job ${jobId}`, error);
      return null;
    }
  }

  /**
   * Internal helper to handle async persistence without blocking the main execution flow.
   */
  private async persistLocationAsync(
    technicianId: string, 
    data: LocationUpdateDto, 
    timestamp: Date
  ): Promise<void> {
    try {
      const entity = new LocationHistoryEntity();
      entity.technicianId = technicianId;
      entity.jobId = data.jobId;
      entity.latitude = data.latitude;
      entity.longitude = data.longitude;
      entity.heading = data.heading || 0;
      entity.speed = data.speed || 0;
      entity.timestamp = timestamp;
      entity.metadata = { source: 'mobile-app-v1' };

      await this.locationRepository.saveHistory(entity);
    } catch (error) {
      // We log persistence errors but do not crash the request 
      // as the real-time stream is the priority.
      this.logger.error(
        `Async persistence failed for job ${data.jobId}`, 
        error instanceof Error ? error.stack : String(error)
      );
    }
  }
}