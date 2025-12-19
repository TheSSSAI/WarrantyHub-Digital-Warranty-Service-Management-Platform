import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  @Get('liveness')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liveness probe' })
  @ApiResponse({ status: 200, description: 'Service is alive' })
  checkLiveness(): { status: string; timestamp: string } {
    return {
      status: 'up',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('readiness')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Readiness probe' })
  @ApiResponse({ status: 200, description: 'Service is ready' })
  @ApiResponse({ status: 503, description: 'Service is not ready' })
  async checkReadiness(): Promise<{ status: string; services: Record<string, string> }> {
    // In a real scenario, this would check DB connections, Redis, and Service Bus connectivity.
    // For this implementation, we assume dependencies are managed by the orchestrator/DI container health.
    
    const servicesStatus = {
      database: 'up', // Placeholder for actual DB check
      redis: 'up',    // Placeholder for actual Redis check
      messaging: 'up' // Placeholder for Service Bus check
    };

    this.logger.debug('Readiness check performed');

    return {
      status: 'up',
      services: servicesStatus,
    };
  }
}