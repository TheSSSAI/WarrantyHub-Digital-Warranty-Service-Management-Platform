import { LocationHistoryEntity } from '../../infrastructure/persistence/entities/location-history.entity';

/**
 * Abstract definition for the location persistence layer.
 * Decouples the application service from the specific database implementation (TimescaleDB).
 * 
 * This repository handles the write-heavy workload of storing historical GPS points.
 */
export abstract class ILocationRepository {
  /**
   * Persists a single location history point.
   * Implementation should likely utilize buffering or batching for performance.
   * @param location The location entity to save.
   */
  abstract saveHistory(location: LocationHistoryEntity): Promise<void>;

  /**
   * Persists a batch of location history points.
   * @param locations Array of location entities.
   */
  abstract saveHistoryBatch(locations: LocationHistoryEntity[]): Promise<void>;

  /**
   * Retrieves the route history for a specific service request.
   * Useful for auditing or replaying the technician's path.
   * @param serviceRequestId The Job ID.
   * @returns Array of location points sorted by time.
   */
  abstract getRouteForJob(serviceRequestId: string): Promise<LocationHistoryEntity[]>;

  /**
   * Purges location data older than the specified retention period.
   * Implementation of REQ-FUNC-009 (24h retention).
   * @param olderThan The cutoff date for deletion.
   */
  abstract purgeOldData(olderThan: Date): Promise<void>;
}