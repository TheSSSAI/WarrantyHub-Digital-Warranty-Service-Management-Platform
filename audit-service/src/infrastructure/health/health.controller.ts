import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, TypeOrmHealthIndicator, MemoryHealthIndicator, HealthCheckResult } from '@nestjs/terminus';

/**
 * Controller responsible for exposing health check endpoints.
 * Used by Kubernetes/Container Orchestrators for Liveness and Readiness probes.
 * 
 * Architecture: Infrastructure Layer (Level 0 - Framework integration)
 */
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  /**
   * Performs a comprehensive health check of the service and its dependencies.
   * Checks database connectivity and memory usage.
   * 
   * @returns Promise<HealthCheckResult>
   */
  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      // Check connection to the primary database
      () => this.db.pingCheck('database', { timeout: 3000 }),
      
      // Check if heap usage is within reasonable limits (e.g., 300MB)
      // This helps restart the pod if there's a memory leak
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      
      // Additional RSS check
      () => this.memory.checkRSS('memory_rss', 500 * 1024 * 1024),
    ]);
  }

  /**
   * Simple liveness probe to verify the application is running.
   * Does not check dependencies to prevent restart loops during downstream outages.
   */
  @Get('liveness')
  liveness(): { status: string } {
    return { status: 'up' };
  }
}