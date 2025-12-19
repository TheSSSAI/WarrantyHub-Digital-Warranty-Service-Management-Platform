import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { ConfigService } from '@nestjs/config';
import { IEventPublisher } from '../../domain/interfaces/event-publisher.interface';

@Injectable()
export class AzureEventPublisher implements IEventPublisher, OnModuleInit, OnModuleDestroy {
  private sbClient: ServiceBusClient;
  private sender: ServiceBusSender;
  private readonly logger = new Logger(AzureEventPublisher.name);
  private readonly topicName = 'service-center-lifecycle-events'; // Should be config driven in real world

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const connectionString = this.configService.get<string>('AZURE_SERVICE_BUS_CONNECTION_STRING');
    if (!connectionString) {
      this.logger.warn('Azure Service Bus connection string not found. Event publishing will be disabled.');
      return;
    }
    this.sbClient = new ServiceBusClient(connectionString);
    this.sender = this.sbClient.createSender(this.topicName);
    this.logger.log(`Azure Service Bus initialized for topic: ${this.topicName}`);
  }

  async onModuleDestroy() {
    if (this.sender) {
      await this.sender.close();
    }
    if (this.sbClient) {
      await this.sbClient.close();
    }
  }

  async publish(eventType: string, payload: any): Promise<void> {
    if (!this.sender) {
      this.logger.warn(`Skipping event publication for ${eventType}: Sender not initialized.`);
      return;
    }

    try {
      const message = {
        body: payload,
        applicationProperties: {
          eventType: eventType,
          version: '1.0',
          source: 'service-center-service',
        },
        messageId: payload.id || crypto.randomUUID(),
        contentType: 'application/json',
      };

      await this.sender.sendMessages(message);
      this.logger.debug(`Event published successfully: ${eventType} (ID: ${message.messageId})`);
    } catch (error) {
      this.logger.error(
        `Failed to publish event ${eventType}: ${error.message}`,
        error.stack,
      );
      // In a robust system, we might want to throw or fallback to a dead-letter/database queue here
      // to ensure eventual consistency.
      throw new Error(`Event publication failed: ${error.message}`);
    }
  }
}