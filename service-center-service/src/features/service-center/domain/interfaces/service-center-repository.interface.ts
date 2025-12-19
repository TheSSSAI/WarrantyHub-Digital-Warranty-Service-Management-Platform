import { ServiceCenterEntity } from '../service-center.entity';
import { ServiceCenterStatus } from '../enums/service-center-status.enum';

/**
 * Dependency Injection Token for the Service Center Repository.
 * Use this token with @Inject() in Application services.
 */
export const IServiceCenterRepository = Symbol('IServiceCenterRepository');

/**
 * Repository interface for managing Service Center aggregates.
 * Acts as a Port in the Hexagonal Architecture, abstracting the persistence mechanism (PostgreSQL/PostGIS).
 * 
 * @see REQ-FUNC-002 for geospatial requirements.
 * @see US-009, US-010 for lifecycle management.
 */
export interface IServiceCenterRepository {
  /**
   * Persists a Service Center entity to the database.
   * Handles both creation of new records and updates to existing ones.
   * If the entity has geospatial data (serviceArea), it must be persisted as a GEOMETRY type.
   * 
   * @param serviceCenter The aggregate root to save.
   * @returns The persisted entity with generated IDs and timestamps.
   */
  save(serviceCenter: ServiceCenterEntity): Promise<ServiceCenterEntity>;

  /**
   * Retrieves a Service Center by its unique identifier.
   * Includes relation loading for Brands and Service Areas if specified in implementation.
   * 
   * @param id The UUID of the service center.
   * @returns The entity if found, null otherwise.
   */
  findById(id: string): Promise<ServiceCenterEntity | null>;

  /**
   * Retrieves a list of Service Centers based on their approval status.
   * Used primarily for Admin dashboards to view Pending or Active centers.
   * 
   * @param status The lifecycle status to filter by (e.g., PENDING, APPROVED).
   * @param skip Number of records to skip (pagination).
   * @param take Number of records to retrieve (pagination).
   * @returns A tuple containing the array of entities and the total count.
   */
  findAllByStatus(
    status: ServiceCenterStatus, 
    skip: number, 
    take: number
  ): Promise<[ServiceCenterEntity[], number]>;

  /**
   * Executes a geospatial query to find Service Centers whose service area polygon
   * contains the provided point (latitude, longitude).
   * 
   * This is the core routing logic for REQ-FUNC-002.
   * Implementation must utilize PostGIS ST_Contains or ST_Intersects.
   * 
   * @param latitude The latitude of the consumer's location.
   * @param longitude The longitude of the consumer's location.
   * @param brandId Optional filter to find centers authorized for a specific brand.
   * @returns A list of Service Centers capable of serving the location.
   */
  findServingLocation(
    latitude: number, 
    longitude: number, 
    brandId?: string
  ): Promise<ServiceCenterEntity[]>;

  /**
   * Checks if a Service Center with the given registration number or email already exists.
   * Used for pre-registration validation to prevent duplicates.
   * 
   * @param email The contact email to check.
   * @param registrationNumber The business registration number to check (optional).
   * @returns True if a duplicate exists, false otherwise.
   */
  exists(email: string, registrationNumber?: string): Promise<boolean>;

  /**
   * Removes a Service Center entity from the system.
   * Depending on the implementation, this may be a soft-delete or hard-delete.
   * 
   * @param id The UUID of the service center to delete.
   */
  delete(id: string): Promise<void>;
}