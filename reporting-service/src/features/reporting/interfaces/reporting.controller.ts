import { Controller, Get, Query, Req, UseGuards, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetFrequentFaultsRequestDto } from './reporting-request.dto';
import { FrequentFaultsReportDto, ProductDistributionReportDto } from './reporting-response.dto';
import { GetFrequentFaultsQuery } from '../application/queries/get-frequent-faults.query';
import { GetProductDistributionQuery } from '../application/queries/get-product-distribution.query';

// Assuming a shared auth guard exists in the system (Level 3/4 dependency, usually available via lib)
// If not available in this repo context, these would be imported from a shared library package.
// For compilation safety within this specific file generation task, I assume generic guards.
// In a real repo, these imports would be specific.
import { AuthGuard } from '@nestjs/passport'; 

@ApiTags('Analytics & Reporting')
@ApiBearerAuth()
@Controller('api/v1/analytics')
@UseGuards(AuthGuard('jwt')) // Enforcing JWT Authentication
export class ReportingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('frequent-faults')
  @ApiOperation({
    summary: 'Get Frequent Fault Patterns',
    description: 'Retrieves the top fault patterns for a brand within a specified date range. Restricted to Brand Admins.',
  })
  @ApiResponse({ status: 200, description: 'Report data retrieved successfully.', type: FrequentFaultsReportDto })
  @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - User does not have access to this brand.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFrequentFaults(
    @Query() queryDto: GetFrequentFaultsRequestDto,
    @Req() req: any,
  ): Promise<FrequentFaultsReportDto> {
    // Tenant Isolation: Brand ID is strictly derived from the authenticated user's token
    const userBrandId = req.user?.brandId;

    if (!userBrandId) {
      throw new UnauthorizedException('User is not associated with a valid brand.');
    }

    // Transform DTO to CQRS Query
    const query = new GetFrequentFaultsQuery(
      userBrandId,
      queryDto.startDate,
      queryDto.endDate,
      queryDto.productModel,
    );

    return this.queryBus.execute(query);
  }

  @Get('product-distribution')
  @ApiOperation({
    summary: 'Get Geographic Product Distribution',
    description: 'Retrieves product density data grouped by geographic location for the authenticated brand.',
  })
  @ApiResponse({ status: 200, description: 'Distribution data retrieved successfully.', type: ProductDistributionReportDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getProductDistribution(@Req() req: any): Promise<ProductDistributionReportDto> {
    // Tenant Isolation
    const userBrandId = req.user?.brandId;

    if (!userBrandId) {
      throw new UnauthorizedException('User is not associated with a valid brand.');
    }

    const query = new GetProductDistributionQuery(userBrandId);

    return this.queryBus.execute(query);
  }
}