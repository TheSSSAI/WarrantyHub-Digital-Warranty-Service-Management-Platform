import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  Logger,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { ApproveServiceCenterCommand } from '../../application/commands/approve-service-center.command';
import { DefineServiceAreaCommand } from '../../application/commands/define-service-area.command';
import { CreateServiceCenterCommand } from '../../application/commands/create-service-center.command';
import { DefineServiceAreaDto } from '../dtos/define-service-area.dto';

// Placeholder for Auth Guards (assuming shared infrastructure availability)
// In a real scenario, these would import from src/common/guards
import { AuthGuard } from '@nestjs/passport'; 
// Mocking RolesGuard decoration for compilation if not present in dependencies
const Roles = (...roles: string[]) => (target: any, key?: string, descriptor?: any) => {};

// Define Request DTO for Creation if not explicitly in Level 0
export class CreateServiceCenterRequest {
  name: string;
  contactEmail: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

@ApiTags('Service Center Admin')
@ApiBearerAuth()
@Controller('admin/service-centers')
export class ServiceCenterAdminController {
  private readonly logger = new Logger(ServiceCenterAdminController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Roles('SuperAdmin')
  //@UseGuards(AuthGuard('jwt')) // Uncomment when Auth module is linked
  @ApiOperation({ summary: 'Register a new Service Center' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The service center has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient permissions.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createDto: CreateServiceCenterRequest): Promise<void> {
    this.logger.log(`Creating new service center: ${createDto.name}`);
    
    const command = new CreateServiceCenterCommand(
      createDto.name,
      createDto.contactEmail,
      createDto.phoneNumber,
      createDto.address
    );

    await this.commandBus.execute(command);
    this.logger.log(`Service center creation command dispatched for ${createDto.name}`);
  }

  @Patch(':id/approve')
  @Roles('SuperAdmin')
  //@UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Approve a pending Service Center registration' })
  @ApiParam({ name: 'id', description: 'The UUID of the service center' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Service center approved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service center not found.',
  })
  async approveRegistration(@Param('id') id: string): Promise<void> {
    this.logger.log(`Approving service center registration: ${id}`);
    
    // UUID validation could be done via ParseUUIDPipe in method signature
    if (!this.isValidUUID(id)) {
        throw new BadRequestException('Invalid UUID format');
    }

    const command = new ApproveServiceCenterCommand(id);
    await this.commandBus.execute(command);
    
    this.logger.log(`Service center ${id} approved successfully`);
  }

  @Put(':id/service-area')
  @Roles('SuperAdmin')
  //@UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Define or update the geographic service area (polygon)' })
  @ApiParam({ name: 'id', description: 'The UUID of the service center' })
  @ApiBody({ type: DefineServiceAreaDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Service area updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid GeoJSON or input data.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async defineServiceArea(
    @Param('id') id: string,
    @Body() dto: DefineServiceAreaDto,
  ): Promise<void> {
    this.logger.log(`Defining service area for center: ${id}`);

    if (!this.isValidUUID(id)) {
        throw new BadRequestException('Invalid Service Center UUID format');
    }

    const command = new DefineServiceAreaCommand(
      id,
      dto.brandId,
      dto.geometry
    );

    await this.commandBus.execute(command);
    this.logger.log(`Service area definition command dispatched for center ${id}`);
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}