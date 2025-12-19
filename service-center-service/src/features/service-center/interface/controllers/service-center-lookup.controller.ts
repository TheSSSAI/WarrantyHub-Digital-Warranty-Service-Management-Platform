import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Param,
  UseGuards,
  Logger,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { FindCentersByLocationQuery } from '../../application/queries/find-centers-by-location.query';
import { GetServiceCenterProfileQuery } from '../../application/queries/get-service-center-profile.query';
// Assuming ServiceCenterDto is exported from the domain or a DTO file based on Level 0 definitions
// If not explicitly in Level 0 file list, we define a return shape here for compilation safety
export class ServiceCenterPublicDto {
  id: string;
  name: string;
  address: any;
  contactPhone: string;
  status: string;
}

@ApiTags('Service Center Lookup')
@ApiBearerAuth()
@Controller('service-centers')
export class ServiceCenterLookupController {
  private readonly logger = new Logger(ServiceCenterLookupController.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Get('find-by-location')
  @ApiOperation({ summary: 'Find service centers covering a specific location' })
  @ApiQuery({ name: 'lat', required: true, type: Number, description: 'Latitude' })
  @ApiQuery({ name: 'lon', required: true, type: Number, description: 'Longitude' })
  @ApiQuery({ name: 'brandId', required: false, type: String, description: 'Filter by Brand ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of service centers covering the location.',
    type: [ServiceCenterPublicDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByLocation(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('brandId') brandId?: string,
  ): Promise<ServiceCenterPublicDto[]> {
    this.logger.debug(`Lookup request for lat:${lat}, lon:${lon}, brand:${brandId}`);

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      throw new BadRequestException('Invalid coordinate values');
    }

    const query = new FindCentersByLocationQuery(lat, lon, brandId);
    const results = await this.queryBus.execute(query);
    
    this.logger.debug(`Found ${results?.length || 0} service centers for location`);
    return results;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get public profile of a service center' })
  @ApiParam({ name: 'id', description: 'Service Center UUID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service center profile details.',
    type: ServiceCenterPublicDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service center not found.',
  })
  async getProfile(@Param('id') id: string): Promise<ServiceCenterPublicDto> {
    this.logger.debug(`Fetching profile for service center: ${id}`);

    if (!this.isValidUUID(id)) {
        throw new BadRequestException('Invalid UUID format');
    }

    const query = new GetServiceCenterProfileQuery(id);
    const result = await this.queryBus.execute(query);

    return result;
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}