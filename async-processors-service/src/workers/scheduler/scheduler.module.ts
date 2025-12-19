import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpClientModule } from '../../infrastructure/http/http-client.module';
import { TransferExpirationJob } from './transfer-expiration.job';

/**
 * SchedulerModule
 * 
 * Configures the scheduled background tasks for the application.
 * This module is responsible for registering cron jobs and their dependencies,
 * specifically focusing on time-sensitive business rules like transfer request expiration.
 * 
 * @module
 */
@Module({
  imports: [
    // Configuration for scheduling intervals and API endpoints
    ConfigModule,
    
    // HTTP Client for triggering domain logic in the Product Service
    HttpClientModule,
  ],
  providers: [
    // The scheduled job service containing @Cron decorators
    TransferExpirationJob,
  ],
  exports: [
    // Exporting the job service allows the root application to verify job registration
    TransferExpirationJob,
  ],
})
export class SchedulerModule {}