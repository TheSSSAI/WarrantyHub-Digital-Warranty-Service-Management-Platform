/**
 * Represents the lifecycle states of a Product Ownership Transfer request.
 * 
 * Supports the workflow defined in US-033, US-034, and US-031.
 */
export enum TransferStatus {
  /**
   * The transfer has been initiated by the sender but not yet acted upon by the recipient.
   */
  PENDING = 'PENDING',

  /**
   * The recipient has accepted the transfer. Ownership is moved.
   */
  ACCEPTED = 'ACCEPTED',

  /**
   * The recipient has rejected the transfer request. Ownership remains with the sender.
   */
  REJECTED = 'REJECTED',

  /**
   * The transfer request was not acted upon within the defined time window (e.g., 72 hours).
   * See REQ-BR-002.
   */
  EXPIRED = 'EXPIRED',

  /**
   * The sender cancelled the transfer request before the recipient acted on it.
   */
  CANCELLED = 'CANCELLED',
}