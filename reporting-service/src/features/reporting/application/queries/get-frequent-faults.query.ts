import { IQuery } from '@nestjs/cqrs';

/**
 * GetFrequentFaultsQuery
 * 
 * Represents the intent to retrieve frequent fault pattern data.
 * This class serves as a DTO for the Query Bus, carrying all necessary
 * filter criteria required to execute the analytical query.
 */
export class GetFrequentFaultsQuery implements IQuery {
  /**
   * @param brandId The ID of the brand for which to retrieve fault data (Tenancy filter).
   * @param startDate The start date of the reporting period.
   * @param endDate The end date of the reporting period.
   * @param productModel (Optional) Filter data by a specific product model.
   */
  constructor(
    public readonly brandId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly productModel?: string,
  ) {
    this.validate();
  }

  /**
   * Performs basic domain-level validation on the query parameters
   * to ensure the query is semantically valid before dispatch.
   */
  private validate(): void {
    if (!this.brandId) {
      throw new Error('BrandID is required for GetFrequentFaultsQuery');
    }
    if (!this.startDate || !this.endDate) {
      throw new Error('Date range is required for GetFrequentFaultsQuery');
    }
    if (this.startDate > this.endDate) {
      throw new Error('StartDate cannot be after EndDate');
    }
  }
}