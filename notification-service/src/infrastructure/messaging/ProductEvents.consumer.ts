import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationDispatcherService } from '../../application/services/NotificationDispatcher.service';
import { NotificationPayload } from '../../application/dtos/NotificationPayload';

interface WarrantyExpiringEvent {
  productId: string;
  userId: string;
  productName: string;
  expiryDate: Date;
  daysRemaining: number; // e.g., 30 or 7
}

@Controller()
export class ProductEventsConsumer {
  private readonly logger = new Logger(ProductEventsConsumer.name);

  constructor(
    private readonly notificationDispatcher: NotificationDispatcherService
  ) {}

  @EventPattern('product.warranty-expiring')
  async handleWarrantyExpiring(@Payload() event: WarrantyExpiringEvent): Promise<void> {
    this.logger.log(`Received warranty expiry event for Product: ${event.productId}, Days Remaining: ${event.daysRemaining}`);

    try {
      if (!event.userId || !event.productName) {
        this.logger.warn('Invalid warranty event payload: Missing userId or productName');
        return;
      }

      const formattedDate = new Date(event.expiryDate).toLocaleDateString();

      const notificationData: NotificationPayload = {
        title: 'Warranty Expiring Soon',
        body: `Your warranty for ${event.productName} expires in ${event.daysRemaining} days on ${formattedDate}.`,
        data: {
          type: 'WARRANTY_EXPIRY',
          entityId: event.productId,
          expiryDate: event.expiryDate.toString(),
          daysRemaining: event.daysRemaining.toString()
        }
      };

      await this.notificationDispatcher.dispatch(
        event.userId,
        'WARRANTY_EXPIRY_REMINDER', // Preference key
        notificationData
      );

    } catch (error) {
      this.logger.error(
        `Error processing warranty expiry event: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined
      );
      throw error;
    }
  }
}