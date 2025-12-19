import { TransferStatus } from '../enums/transfer-status.enum';

/**
 * Represents the core domain data required for a Transfer Request.
 * Acts as a contract for the Entity that will be implemented in the persistence layer.
 */
export interface ITransferRequestDomain {
  id: string;
  productId: string;
  fromUserId: string;
  toEmail: string;
  status: TransferStatus;
  createdAt: Date;
  expiresAt: Date;
  updatedAt: Date;
}

/**
 * Port interface for Transfer Repository.
 * Follows the Dependency Inversion Principle, allowing the domain layer to 
 * define data access requirements without depending on infrastructure concerns.
 */
export abstract class ITransferRepository {
  /**
   * Persists a new transfer request or updates an existing one.
   * @param transfer - The transfer request domain object to save.
   * @returns The persisted transfer request.
   */
  abstract save(transfer: Partial<ITransferRequestDomain>): Promise<ITransferRequestDomain>;

  /**
   * Finds a transfer request by its unique identifier.
   * @param id - The UUID of the transfer request.
   * @returns The transfer request if found, otherwise null.
   */
  abstract findById(id: string): Promise<ITransferRequestDomain | null>;

  /**
   * Finds all pending transfer requests initiated by a specific user.
   * Useful for the "Sent Transfers" view.
   * @param userId - The UUID of the initiating user.
   */
  abstract findPendingBySender(userId: string): Promise<ITransferRequestDomain[]>;

  /**
   * Finds all pending transfer requests targeted at a specific email address.
   * Useful for the "Received Transfers" view.
   * @param email - The email address of the recipient.
   */
  abstract findPendingByRecipient(email: string): Promise<ITransferRequestDomain[]>;

  /**
   * Finds an active (Pending) transfer request for a specific product.
   * Used to enforce BR-TRANSFER-02 (Single pending transfer per product).
   * @param productId - The UUID of the product.
   */
  abstract findActiveByProduct(productId: string): Promise<ITransferRequestDomain | null>;

  /**
   * REQ-BR-002: Finds all transfer requests that are currently 'Pending' 
   * but have passed their expiration timestamp.
   * Used by the scheduled background job to expire stale requests.
   * 
   * @param thresholdDate - The current date/time to compare against expiresAt.
   */
  abstract findExpiredPending(thresholdDate: Date): Promise<ITransferRequestDomain[]>;

  /**
   * Updates the status of multiple transfers in a batch operation.
   * Critical for the expiration job performance.
   * 
   * @param ids - Array of transfer IDs to update.
   * @param status - The new status to apply (e.g., EXPIRED).
   */
  abstract updateStatusBatch(ids: string[], status: TransferStatus): Promise<void>;
}