/**
 * Interface defining the contract for entities or repositories that support soft deletion.
 * Ensures that any service interacting with data persistence adheres to the non-destructive delete policy (REQ-BR-003).
 */
export interface ISoftDelete<T> {
  /**
   * Marks an entity as deleted without removing it from the database.
   * Sets the `deletedAt` timestamp and the `deletedBy` user ID.
   * @param id The unique identifier of the entity
   * @param userId The ID of the user performing the deletion
   */
  softDelete(id: string, userId?: string): Promise<void>;

  /**
   * Restores a previously soft-deleted entity.
   * Clears the `deletedAt` and `deletedBy` fields.
   * @param id The unique identifier of the entity
   */
  restore(id: string): Promise<void>;

  /**
   * Permanently removes an entity from the database (Hard Delete).
   * Should be restricted to admin-only or system cleanup tasks (e.g. US-102 Data Purge).
   * @param id The unique identifier of the entity
   */
  hardDelete?(id: string): Promise<void>;
}