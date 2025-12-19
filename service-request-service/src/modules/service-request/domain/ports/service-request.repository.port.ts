import { ServiceRequestEntity } from '../service-request.entity';
import { ServiceRequestStatus } from '../enums/service-request-status.enum';

export interface IServiceRequestRepository {
  /**
   * Persists a Service Request entity. Handles both Insert and Update operations.
   * @param request The domain entity to save
   * @returns The persisted entity
   */
  save(request: ServiceRequestEntity): Promise<ServiceRequestEntity>;

  /**
   * Finds a Service Request by its unique ID.
   * @param id UUID of the request
   * @returns The entity if found, null otherwise
   */
  findById(id: string): Promise<ServiceRequestEntity | null>;

  /**
   * Finds all Service Requests associated with a specific user.
   * @param userId UUID of the user
   * @returns Array of entities
   */
  findByUserId(userId: string): Promise<ServiceRequestEntity[]>;

  /**
   * Finds all Service Requests assigned to a specific technician.
   * @param technicianId UUID of the technician
   * @returns Array of entities
   */
  findByTechnicianId(technicianId: string): Promise<ServiceRequestEntity[]>;

  /**
   * Finds requests for a service center, optionally filtered by status.
   * @param serviceCenterId UUID of the service center
   * @param status Optional status filter
   * @returns Array of entities
   */
  findByServiceCenterId(serviceCenterId: string, status?: ServiceRequestStatus): Promise<ServiceRequestEntity[]>;
}