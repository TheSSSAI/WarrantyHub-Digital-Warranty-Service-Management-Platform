import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IReportingRepository } from '../application/ports/i-reporting.repository';
import { FaultCountItem, GeoDistributionItem } from '../interfaces/reporting-response.dto';
import { READ_REPLICA_SOURCE } from './read-replica-connection.provider';

@Injectable()
export class ReportingRepository implements IReportingRepository {
  private readonly logger = new Logger(ReportingRepository.name);

  constructor(
    @Inject(READ_REPLICA_SOURCE)
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Retrieves the count of faults grouped by issue type for a specific brand.
   * Uses raw SQL for performance optimization on the read replica.
   */
  async getFaultCountsByIssueType(
    brandId: string,
    startDate: Date,
    endDate: Date,
    productModel?: string,
  ): Promise<FaultCountItem[]> {
    try {
      this.logger.debug(
        `Fetching fault counts for brand ${brandId} between ${startDate} and ${endDate}`,
      );

      const params: any[] = [brandId, startDate, endDate];
      let query = `
        SELECT 
          sr.issue_type as "issueType", 
          COUNT(*) as "count"
        FROM service_requests sr
        INNER JOIN products p ON sr.product_id = p.id
        WHERE p.brand_id = $1
        AND sr.created_at >= $2
        AND sr.created_at <= $3
      `;

      if (productModel) {
        query += ` AND p.model = $4`;
        params.push(productModel);
      }

      query += `
        GROUP BY sr.issue_type
        ORDER BY "count" DESC
        LIMIT 10
      `;

      const result = await this.dataSource.query(query, params);

      // Map raw result to DTO structure to ensure type safety
      return result.map((row: any) => ({
        issueType: row.issueType || 'Unknown',
        count: parseInt(row.count, 10) || 0,
      }));
    } catch (error) {
      this.logger.error(
        `Error fetching fault counts: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw new Error('Failed to retrieve fault count data from the analytics store.');
    }
  }

  /**
   * Retrieves the geographic distribution of registered products for a specific brand.
   * Aggregates data based on user location (City/State).
   */
  async getProductGeographicDistribution(
    brandId: string,
  ): Promise<GeoDistributionItem[]> {
    try {
      this.logger.debug(`Fetching geographic distribution for brand ${brandId}`);

      // Assuming 'users' table holds location data and is linked via product ownership
      // If location is on the product registration directly, this join would be adjusted.
      // Using COALESCE to handle missing location data gracefully.
      const query = `
        SELECT 
          COALESCE(u.city, 'Unknown') as "city",
          COALESCE(u.state, 'Unknown') as "region",
          COALESCE(u.country, 'Unknown') as "country",
          COUNT(p.id) as "count"
        FROM products p
        INNER JOIN users u ON p.user_id = u.id
        WHERE p.brand_id = $1
        AND p.deleted_at IS NULL
        GROUP BY u.city, u.state, u.country
        ORDER BY "count" DESC
        LIMIT 100
      `;

      const result = await this.dataSource.query(query, [brandId]);

      return result.map((row: any) => ({
        city: row.city,
        region: row.region,
        country: row.country,
        count: parseInt(row.count, 10) || 0,
      }));
    } catch (error) {
      this.logger.error(
        `Error fetching geographic distribution: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw new Error('Failed to retrieve geographic distribution data.');
    }
  }
}