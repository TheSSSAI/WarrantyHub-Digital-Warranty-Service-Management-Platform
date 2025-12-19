import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';

/**
 * Health Module.
 * 
 * Provides health check endpoints (Liveness and Readiness probes) for Kubernetes
 * orchestration. It utilizes NestJS Terminus to perform checks on dependencies
 * such as external APIs and memory usage.
 * 
 * - Liveness: Checks if the application process is running.
 * - Readiness: Checks if the application is ready to accept traffic/work (dependencies up).
 */
@Module({
    imports: [
        TerminusModule,
        HttpModule,
    ],
    controllers: [
        HealthController
    ],
})
export class HealthModule {}