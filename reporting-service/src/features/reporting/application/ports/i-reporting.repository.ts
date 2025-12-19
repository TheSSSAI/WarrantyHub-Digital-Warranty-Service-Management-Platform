import { FaultCountItem } from '../../interfaces/reporting-response.dto';

/**
 * Domain-specific model for geographic distribution data.
 * Defined here to keep the port self-contained regarding domain shapes,
 * though it often maps closely to the response DTO.
 */
export interface GeoDistributionResult {
  region: string;
  count: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * IReportingRepository
 * 
 * Abstract class acting as the Port in Hexagonal Architecture.
 * This defines the contract for data retrieval operations required by the
 * application layer, decoupling the business logic from the specific
 * database implementation (TypeORM/Raw SQL).
 * 
 * Used as a Dependency Injection token in NestJS.
 */
export abstract class IReportingRepository {
  /**
   * Retrieves aggregated fault counts grouped by issue type for a specific brand.
   * 
   * @param brandId The unique identifier of the brand.
   * @param startDate The start of the date range filter.
   * @param endDate The end of the date range filter.
   * @param productModel Optional product model filter.
   * @returns A promise resolving to a list of fault count items.
   */
  abstract getFaultCountsByIssueType(
    brandId: string,
    startDate: Date,
    endDate: Date,
    productModel?: string,
  ): Promise<FaultCountItem[]>;

  /**
   * Retrieves product distribution data grouped by geographic region/location.
   * 
   * @param brandId The unique identifier of the brand.
   * @returns A promise resolving to a list of geographic distribution results.
   */
  abstract getProductGeographicDistribution(
    brandId: string,
  ): Promise<GeoDistributionResult[]>;
}