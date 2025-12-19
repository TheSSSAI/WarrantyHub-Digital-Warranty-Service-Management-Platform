import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFrequentFaultsQuery } from './get-frequent-faults.query';
import { FrequentFaultsReportDto } from '../../interfaces/reporting-response.dto';
import { IReportingRepository } from '../ports/i-reporting.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetFrequentFaultsQuery)
export class GetFrequentFaultsHandler implements IQueryHandler<GetFrequentFaultsQuery> {
  private readonly logger = new Logger(GetFrequentFaultsHandler.name);

  constructor(
    @Inject('IReportingRepository')
    private readonly reportingRepository: IReportingRepository,
  ) {}

  async execute(query: GetFrequentFaultsQuery): Promise<FrequentFaultsReportDto> {
    const { brandId, startDate, endDate, productModel } = query;

    this.logger.log(
      `Processing Frequent Faults Query for Brand: ${brandId}, Model: ${productModel || 'All'}`,
    );

    try {
      // Execute repository call to the read replica
      const faultCounts = await this.reportingRepository.getFaultCountsByIssueType(
        brandId,
        startDate,
        endDate,
        productModel,
      );

      // Perform any additional application-layer aggregation or transformation if needed
      // (e.g., calculating percentages vs totals, though often better done in DB or frontend)
      const totalFaults = faultCounts.reduce((sum, item) => sum + item.count, 0);

      const reportData = faultCounts.map((item) => ({
        ...item,
        percentage: totalFaults > 0 ? parseFloat(((item.count / totalFaults) * 100).toFixed(2)) : 0,
      }));

      return {
        data: reportData,
        metadata: {
          totalRecords: totalFaults,
          periodStart: startDate,
          periodEnd: endDate,
          generatedAt: new Date(),
        },
      };
    } catch (error) {
      this.logger.error(
        `Failed to handle GetFrequentFaultsQuery: ${error instanceof Error ? error.message : String(error)}`,
      );
      // In a real application, we might map this to a specific domain error
      throw error;
    }
  }
}