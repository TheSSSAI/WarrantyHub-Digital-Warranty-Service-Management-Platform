import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsDateString, 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUUID 
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Enum for defining the type of data view for the geographic distribution map.
 * Corresponds to US-088 acceptance criteria.
 */
export enum GeoDistributionViewType {
  PRODUCT_DISTRIBUTION = 'PRODUCT_DISTRIBUTION',
  SERVICE_REQUEST_DISTRIBUTION = 'SERVICE_REQUEST_DISTRIBUTION'
}

/**
 * Base DTO for date-range filtered reports.
 * Used to standardize date filtering across multiple report types.
 */
export class DateRangeQueryDto {
  @ApiProperty({
    description: 'Start date for the report data aggregation (ISO 8601 format)',
    example: '2023-01-01T00:00:00Z',
    required: true
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date for the report data aggregation (ISO 8601 format)',
    example: '2023-12-31T23:59:59Z',
    required: true
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

/**
 * Request DTO for the Frequent Fault Patterns report (US-087).
 * Supports filtering by date range, product category, and specific model.
 */
export class GetFrequentFaultsRequestDto extends DateRangeQueryDto {
  @ApiPropertyOptional({
    description: 'Filter faults by a specific product category ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsOptional()
  @IsUUID('4')
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Filter faults by a specific product model name',
    example: 'WH-OVEN-2024-X'
  })
  @IsOptional()
  @IsString()
  productModel?: string;
}

/**
 * Request DTO for the Geographic Distribution Map report (US-088).
 * Allows toggling between product locations and service request locations.
 */
export class GetGeoDistributionRequestDto extends DateRangeQueryDto {
  @ApiProperty({
    description: 'Type of data to visualize on the map',
    enum: GeoDistributionViewType,
    example: GeoDistributionViewType.PRODUCT_DISTRIBUTION
  })
  @IsNotEmpty()
  @IsEnum(GeoDistributionViewType)
  viewType: GeoDistributionViewType;

  @ApiPropertyOptional({
    description: 'Filter map data by product model',
    example: 'WH-FRIDGE-500'
  })
  @IsOptional()
  @IsString()
  productModel?: string;
}

/**
 * Request DTO for the KPI Summary dashboard (US-086).
 * Standard date range filter applies to metrics like "New Users" or "Avg Resolution Time".
 * Total counts might ignore dates, but the request structure supports the filtered widgets.
 */
export class GetKpiSummaryRequestDto extends DateRangeQueryDto {
  // No additional properties required for the high-level KPI summary
  // based on current requirements, but extending for future scalability.
}