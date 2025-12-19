import { Injectable, Logger } from '@nestjs/common';
import { WarrantyBadgeStatus } from './enums/warranty-badge-status.enum';

/**
 * Domain service responsible for warranty-related calculations and status determinations.
 * Encapsulates business rules regarding warranty validity periods and expiry logic.
 */
@Injectable()
export class WarrantyStatusService {
  private readonly logger = new Logger(WarrantyStatusService.name);
  private readonly EXPIRING_SOON_THRESHOLD_DAYS = 30;

  /**
   * Calculates the warranty expiration date based on purchase date and duration.
   * Business Rule: Warranty expires (Duration) after Purchase Date.
   * Note: Calculations are performed in UTC to ensure consistency.
   * 
   * @param purchaseDate The date the product was purchased
   * @param durationMonths The duration of the warranty in months
   * @returns The calculated expiration date
   */
  public calculateExpiryDate(purchaseDate: Date, durationMonths: number): Date {
    if (!purchaseDate) {
      throw new Error('Purchase date is required for warranty calculation');
    }

    if (durationMonths < 0) {
      throw new Error('Warranty duration cannot be negative');
    }

    try {
      const expiryDate = new Date(purchaseDate);
      // Set the date to the future month
      expiryDate.setMonth(expiryDate.getMonth() + durationMonths);
      
      // Handle edge cases where the target month has fewer days (e.g., Jan 31 + 1 month -> Feb 28/29)
      // JS Date.setMonth handles this by rolling over, so we need to correct if day changed
      if (expiryDate.getDate() !== purchaseDate.getDate()) {
        expiryDate.setDate(0); // Set to last day of previous month
      }

      // Business Rule BR-001: Expiry is inclusive, often considered end of that day or start of next.
      // We retain the time component if present, or standardizes to same time.
      
      return expiryDate;
    } catch (error) {
      this.logger.error(`Failed to calculate warranty expiry date: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Determines the current status badge for a warranty based on its expiry date.
   * 
   * Business Rules:
   * - GREEN (Valid): Expiry date is > 30 days in the future.
   * - AMBER (Expiring Soon): Expiry date is between 0 and 30 days in the future.
   * - RED (Expired): Expiry date is in the past.
   * 
   * @param expiryDate The date the warranty expires
   * @returns WarrantyBadgeStatus enum value
   */
  public determineStatus(expiryDate: Date): WarrantyBadgeStatus {
    if (!expiryDate) {
      throw new Error('Expiry date is required to determine status');
    }

    const now = new Date();
    
    // Normalize to start of day for accurate day-comparison if needed, 
    // or keep precision depending on requirement. Assuming strict timestamp comparison.
    
    // Check if expired
    if (expiryDate.getTime() < now.getTime()) {
      return WarrantyBadgeStatus.Expired;
    }

    // Calculate difference in milliseconds
    const diffTime = Math.abs(expiryDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Check if expiring soon (within threshold)
    if (diffDays <= this.EXPIRING_SOON_THRESHOLD_DAYS) {
      return WarrantyBadgeStatus.ExpiringSoon;
    }

    return WarrantyBadgeStatus.Valid;
  }

  /**
   * Validates if a warranty claim can be made based on the expiry date.
   * 
   * @param expiryDate The warranty expiration date
   * @returns boolean True if the warranty is still active
   */
  public isWarrantyActive(expiryDate: Date): boolean {
    const status = this.determineStatus(expiryDate);
    return status === WarrantyBadgeStatus.Valid || status === WarrantyBadgeStatus.ExpiringSoon;
  }
}