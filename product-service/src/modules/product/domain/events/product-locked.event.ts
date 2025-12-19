/**
 * Event triggered when a product is locked due to the creation of a service request.
 * 
 * This event signifies that critical product details (Serial Number, Model, Purchase Date)
 * are no longer editable by the user to ensure data integrity during the service lifecycle.
 * This corresponds to Requirement REQ-BR-001.
 */
export class ProductLockedEvent {
  /**
   * @param productId - The unique identifier of the product being locked.
   * @param serviceRequestId - The ID of the service request that triggered the lock.
   * @param lockedAt - The timestamp when the lock occurred.
   * @param reason - The business reason for the lock (usually 'Service Request Created').
   */
  constructor(
    public readonly productId: string,
    public readonly serviceRequestId: string,
    public readonly lockedAt: Date,
    public readonly reason: string = 'Service Request Created',
  ) {}
}