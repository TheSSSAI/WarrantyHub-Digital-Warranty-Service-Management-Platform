import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { NotificationDispatcherService } from '../../application/services/NotificationDispatcher.service';
import { NotificationPayload } from '../../application/dtos/NotificationPayload';

// Defines the shape of the event coming from the Service Request Service
interface ServiceRequestStatusChangedEvent {
  serviceRequestId: string;
  userId: string;
  previousStatus: string;
  newStatus: string;
  timestamp: Date;
  productName: string;
}

@Controller()
export class ServiceRequestEventsConsumer {
  private readonly logger = new Logger(ServiceRequestEventsConsumer.name);

  constructor(
    private readonly notificationDispatcher: NotificationDispatcherService
  ) {}

  @EventPattern('service-request.status-changed')
  async handleStatusChanged(
    @Payload() message: ServiceRequestStatusChangedEvent,
    // @Ctx() context: any // Context specific to Azure Service Bus
  ): Promise<void> {
    this.logger.log(`Received service request status change for Request ID: ${message.serviceRequestId}`);

    try {
      if (!message.userId || !message.newStatus) {
        this.logger.warn('Invalid event payload: Missing userId or newStatus');
        return;
      }

      // Map the external event to the internal notification payload
      // This mapping logic could be moved to a separate mapper/factory if complexity grows
      const notificationData: NotificationPayload = {
        title: 'Service Request Update',
        body: `Your service request for ${message.productName} is now ${message.newStatus}.`,
        data: {
          type: 'SERVICE_REQUEST_UPDATE',
          entityId: message.serviceRequestId,
          status: message.newStatus,
          timestamp: message.timestamp ? new Date(message.timestamp).toISOString() : new Date().toISOString()
        }
      };

      // Dispatch to all configured channels based on user preferences
      await this.notificationDispatcher.dispatch(
        message.userId,
        'SERVICE_REQUEST_STATUS_CHANGE', // Event type key for preference lookup
        notificationData
      );

      this.logger.log(`Successfully processed status change for Request ID: ${message.serviceRequestId}`);
    } catch (error) {
      this.logger.error(
        `Error processing service request status change: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        error instanceof Error ? error.stack : undefined
      );
      // In Azure Service Bus via NestJS, throwing an error typically triggers the retry policy / dead letter
      throw error;
    }
  }
}