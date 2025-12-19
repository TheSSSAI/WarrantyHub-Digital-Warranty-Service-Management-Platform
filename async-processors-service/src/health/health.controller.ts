import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MemoryHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    const productServiceUrl = this.configService.get<string>('PRODUCT_SERVICE_INTERNAL_URL');

    return this.health.check([
      // Check memory usage to ensure the worker isn't leaking, 
      // critical for long-running node processes
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),   // 300MB

      // Check connectivity to the upstream Product Service
      // This ensures the worker can actually perform its callbacks
      () =>
        this.http.pingCheck(
          'product_service',
          `${productServiceUrl}/health`,
          {
            timeout: 5000,
          },
        ),

      // Note: Service Bus health checks are typically handled by the 
      // microservice transport layer or a specific MicroserviceHealthIndicator
      // if configured as a hybrid app. For a worker, checking the upstream 
      // dependency and self-health is primary.
    ]);
  }

  @Get('liveness')
  @HealthCheck()
  async checkLiveness(): Promise<HealthCheckResult> {
    // Lightweight check for K8s liveness probe
    return this.health.check([]);
  }

  @Get('readiness')
  @HealthCheck()
  async checkReadiness(): Promise<HealthCheckResult> {
    // Check if dependencies are ready
    const productServiceUrl = this.configService.get<string>('PRODUCT_SERVICE_INTERNAL_URL');
    return this.health.check([
      () => this.http.pingCheck('product_service', `${productServiceUrl}/health`),
    ]);
  }
}