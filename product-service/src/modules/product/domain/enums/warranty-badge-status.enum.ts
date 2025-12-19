/**
 * Defines the visual status badge for a product's warranty on the digital warranty card.
 * 
 * This enum maps directly to the UI requirements specified in REQ-FUNC-005.
 */
export enum WarrantyBadgeStatus {
  /**
   * Green: Warranty is active and expiry is more than 30 days in the future.
   */
  VALID = 'GREEN',

  /**
   * Amber: Warranty is active but expires within the next 30 days (1-30 days).
   */
  EXPIRING_SOON = 'AMBER',

  /**
   * Red: Warranty expiry date is in the past.
   */
  EXPIRED = 'RED',
  
  /**
   * Gray: Warranty status cannot be determined (e.g., missing purchase date).
   */
  UNKNOWN = 'GRAY'
}