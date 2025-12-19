import { IQuery } from '@nestjs/cqrs';

/**
 * GetProductDistributionQuery
 * 
 * Represents the intent to retrieve geographic distribution data for products.
 * This query encapsulates the parameters needed to aggregate product registration
 * counts by location.
 */
export class GetProductDistributionQuery implements IQuery {
  /**
   * @param brandId The ID of the brand for which to retrieve distribution data.
   */
  constructor(
    public readonly brandId: string,
  ) {
    this.validate();
  }

  /**
   * Performs validation to ensure the query has the necessary context (Tenancy).
   */
  private validate(): void {
    if (!this.brandId) {
      throw new Error('BrandID is required for GetProductDistributionQuery');
    }
  }
}