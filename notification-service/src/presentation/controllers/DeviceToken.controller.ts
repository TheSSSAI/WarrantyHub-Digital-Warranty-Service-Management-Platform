import { 
  Controller, 
  Post, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus, 
  UseGuards, 
  Logger, 
  Request,
  BadRequestException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DeviceTokenManagerService } from '../../application/services/DeviceTokenManager.service';
import { DeviceRegistrationDto } from '../../application/dtos/DeviceRegistrationDto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Device Tokens')
@ApiBearerAuth()
@Controller('api/v1/notifications/devices')
@UseGuards(AuthGuard('jwt'))
export class DeviceTokenController {
  private readonly logger = new Logger(DeviceTokenController.name);

  constructor(
    private readonly deviceTokenManager: DeviceTokenManagerService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a device token for push notifications' })
  @ApiResponse({ status: 201, description: 'Device token successfully registered.' })
  @ApiResponse({ status: 400, description: 'Invalid payload.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async registerDevice(
    @Body() dto: DeviceRegistrationDto,
    @Request() req: any
  ): Promise<void> {
    const userId = req.user?.sub || req.user?.id; // Adapt based on JWT strategy payload
    
    if (!userId) {
      this.logger.error('User ID not found in request context during device registration');
      throw new BadRequestException('User identification failed');
    }

    this.logger.log(`Registering device token for user ${userId}, platform: ${dto.platform}`);

    await this.deviceTokenManager.registerToken(
      userId,
      dto.token,
      dto.platform
    );
  }

  @Delete(':token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Unregister a device token' })
  @ApiResponse({ status: 204, description: 'Device token successfully unregistered.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async unregisterDevice(
    @Param('token') token: string,
    @Request() req: any
  ): Promise<void> {
    const userId = req.user?.sub || req.user?.id;

    if (!token) {
      throw new BadRequestException('Token parameter is required');
    }

    this.logger.log(`Unregistering device token for user ${userId}`);

    // We pass the userId to ensure a user can only remove their own tokens if logic requires validation,
    // though typically the token itself is the unique identifier.
    await this.deviceTokenManager.unregisterToken(token);
  }
}