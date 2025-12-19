import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { ProductServiceClient } from '../../infrastructure/http/product-service.client';

@Injectable()
export class TransferExpirationJob {
  private readonly logger = new Logger(TransferExpirationJob.name);
  // Default to hourly if not configured
  private readonly cronSchedule: string;

  constructor(
    private readonly productServiceClient: ProductServiceClient,
    private readonly configService: ConfigService,
  ) {
    this.cronSchedule = this.configService.get<string>('CRON_SCHEDULE_TRANSFER_EXPIRY', '0 * * * *');
  }

  /**
   * Periodic job to identify and expire pending product transfers that have exceeded
   * the 72-hour acceptance window.
   * 
   * This worker acts as a trigger; the business logic for identifying and updating
   * records resides in the Product Service API.
   */
  @Cron(process.env.CRON_SCHEDULE_TRANSFER_EXPIRY || '0 * * * *')
  async expirePendingTransfers(): Promise<void> {
    this.logger.log('Starting scheduled job: Transfer Expiration');
    const startTime = Date.now();

    try {
      // Invoke the Product Service to perform the expiration logic
      const result = await this.productServiceClient.triggerExpirationProcess();

      const duration = Date.now() - startTime;
      this.logger.log(
        `Transfer Expiration job completed in ${duration}ms. Processed count: ${result?.expiredCount ?? 0}`,
      );
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(
        `Transfer Expiration job failed after ${duration}ms: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined,
      );
      // We do not re-throw here to prevent crashing the scheduler process.
      // The job will simply retry on the next schedule tick.
      // Critical alerts should be configured on the logger 'error' level.
    }
  }
}