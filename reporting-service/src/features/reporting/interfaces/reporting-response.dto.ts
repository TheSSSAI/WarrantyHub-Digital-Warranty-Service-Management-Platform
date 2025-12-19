import { ApiProperty } from '@nestjs/swagger';

// -----------------------------------------
// Frequent Faults Report DTOs
// -----------------------------------------

export class FaultCountItemDto {
  @ApiProperty({
    description: 'The type of issue reported (e.g., "Screen Flickering", "Won\'t Power On")',
    example: 'Compressor Failure'
  })
  issueType: string;

  @ApiProperty({
    description: 'The absolute count of service requests for this issue type within the period',
    example: 45
  })
  count: number;

  @ApiProperty({
    description: 'The percentage of total requests this issue type represents',
    example: 15.5
  })
  percentage: number;
}

/**
 * Response structure for US-087 Frequent Fault Patterns.
 */
export class FrequentFaultsReportDto {
  @ApiProperty({
    description: 'List of fault patterns sorted by frequency',
    type: [FaultCountItemDto]
  })
  data: FaultCountItemDto[];

  @ApiProperty({
    description: 'Total number of service requests analyzed in this dataset',
    example: 290
  })
  totalRequestsAnalyzed: number;
}

// -----------------------------------------
// Geographic Distribution Report DTOs (GeoJSON)
// -----------------------------------------

export class GeoGeometryDto {
  @ApiProperty({
    description: 'Geometry type, typically Point for specific locations',
    example: 'Point',
    enum: ['Point']
  })
  type: string;

  @ApiProperty({
    description: 'Coordinates [longitude, latitude]',
    example: [-73.935242, 40.730610],
    type: [Number]
  })
  coordinates: number[];
}

export class GeoPropertiesDto {
  @ApiProperty({
    description: 'The magnitude or count at this location (for clustering)',
    example: 1
  })
  count: number;

  @ApiProperty({
    description: 'Metadata string, e.g., Product Model or Service Request ID',
    example: 'WH-OVEN-2024-X'
  })
  label: string;
}

export class GeoFeatureDto {
  @ApiProperty({
    description: 'GeoJSON Feature type',
    example: 'Feature',
    enum: ['Feature']
  })
  type: string;

  @ApiProperty({
    description: 'Geometric data for the point',
    type: GeoGeometryDto
  })
  geometry: GeoGeometryDto;

  @ApiProperty({
    description: 'Properties associated with the geographic point',
    type: GeoPropertiesDto
  })
  properties: GeoPropertiesDto;
}

/**
 * Response structure for US-088 Geographic Distribution.
 * Compliant with GeoJSON FeatureCollection standard for easy integration with Mapbox.
 */
export class ProductDistributionReportDto {
  @ApiProperty({
    description: 'GeoJSON type',
    example: 'FeatureCollection',
    enum: ['FeatureCollection']
  })
  type: string;

  @ApiProperty({
    description: 'List of GeoJSON features representing products or requests',
    type: [GeoFeatureDto]
  })
  features: GeoFeatureDto[];
}

// -----------------------------------------
// KPI Summary DTOs
// -----------------------------------------

export class WarrantyStatusBreakdownDto {
  @ApiProperty({ description: 'Count of products with active warranties', example: 1250 })
  active: number;

  @ApiProperty({ description: 'Count of products with expired warranties', example: 300 })
  expired: number;
}

/**
 * Response structure for US-086 Brand Analytics Dashboard.
 */
export class KpiSummaryReportDto {
  @ApiProperty({
    description: 'Total number of products registered for the brand (all time)',
    example: 1550
  })
  totalRegisteredProducts: number;

  @ApiProperty({
    description: 'Breakdown of warranty statuses for registered products',
    type: WarrantyStatusBreakdownDto
  })
  warrantyStatus: WarrantyStatusBreakdownDto;

  @ApiProperty({
    description: 'Count of service requests currently not in Resolved or Closed status',
    example: 45
  })
  ongoingServiceRequests: number;

  @ApiProperty({
    description: 'Average time (in hours) from ticket creation to resolution for the selected period',
    example: 48.5
  })
  averageResolutionTimeHours: number;
}