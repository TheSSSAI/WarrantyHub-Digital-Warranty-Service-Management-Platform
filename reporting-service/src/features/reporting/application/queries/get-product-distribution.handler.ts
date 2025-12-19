import { Logger, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductDistributionQuery } from './get-product-distribution.query';
import { ProductDistributionReportDto } from '../../interfaces/reporting-response.dto';
import { IReportingRepository } from '../ports/i-reporting.repository';

@QueryHandler(GetProductDistributionQuery)
export class GetProductDistributionHandler implements IQueryHandler<GetProductDistributionQuery> {
  private readonly logger = new Logger(GetProductDistributionHandler.name);

  constructor(
    @Inject('IReportingRepository')
    private readonly reportingRepository: IReportingRepository,
  ) {}

  async execute(query: GetProductDistributionQuery): Promise<ProductDistributionReportDto> {
    const { brandId } = query;

    this.logger.log(`Processing Product Distribution Query for Brand: ${brandId}`);

    try {
      // Fetch distribution data from the read-optimized repository
      const distributionData = await this.reportingRepository.getProductGeographicDistribution(brandId);

      const totalProducts = distributionData.reduce((sum, item) => sum + item.count, 0);

      // Structure the response DTO
      return {
        data: distributionData,
        metadata: {
          totalTrackedProducts: totalProducts,
          generatedAt: new Date(),
        },
      };
    } catch (error) {
      this.logger.error(
        `Failed to handle GetProductDistributionQuery: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }
}