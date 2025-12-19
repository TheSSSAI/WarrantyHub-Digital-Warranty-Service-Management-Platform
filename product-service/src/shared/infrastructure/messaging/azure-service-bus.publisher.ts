import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';

/**
 * Infrastructure implementation for publishing messages to Azure Service Bus.
 * Handles connection management, sender caching, and error resilience.
 */
@Injectable()
export class AzureServiceBusPublisher implements OnModuleInit, OnModuleDestroy {
  private sbClient: ServiceBusClient;
  private senders: Map<string, ServiceBusSender> = new Map();
  private readonly logger = new Logger(AzureServiceBusPublisher.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Initializes the Azure Service Bus Client upon module initialization.
   */
  async onModuleInit() {
    const connectionString = this.configService.get<string>('AZURE_SERVICE_BUS_CONNECTION_STRING');
    
    if (!connectionString) {
      this.logger.error('Azure Service Bus connection string is not configured.');
      throw new Error('AZURE_SERVICE_BUS_CONNECTION_STRING missing in configuration');
    }

    try {
      this.sbClient = new ServiceBusClient(connectionString);
      this.logger.log('Azure Service Bus Client initialized successfully.');
    } catch (error) {
      this.logger.error(`Failed to initialize Azure Service Bus Client: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Closes all senders and the client connection upon module destruction.
   */
  async onModuleDestroy() {
    try {
      for (const [topic, sender] of this.senders.entries()) {
        await sender.close();
        this.logger.debug(`Closed sender for topic/queue: ${topic}`);
      }
      if (this.sbClient) {
        await this.sbClient.close();
        this.logger.log('Azure Service Bus Client closed.');
      }
    } catch (error) {
      this.logger.error(`Error closing Azure Service Bus resources: ${error.message}`, error.stack);
    }
  }

  /**
   * Publishes a message to a specific topic or queue.
   * Implements sender caching to reuse connections.
   * 
   * @param destination The topic or queue name
   * @param payload The data to publish
   * @param correlationId Optional correlation ID for tracing
   */
  async publish<T>(destination: string, payload: T, correlationId?: string): Promise<void> {
    if (!this.sbClient) {
      throw new Error('Service Bus Client is not initialized');
    }

    try {
      const sender = this.getSender(destination);
      
      const message = {
        body: payload,
        contentType: 'application/json',
        correlationId: correlationId || crypto.randomUUID(),
        messageId: crypto.randomUUID(),
        applicationProperties: {
          timestamp: new Date().toISOString(),
          source: 'warranty-hub-backend',
        },
      };

      this.logger.debug(`Publishing message to ${destination}: ${JSON.stringify(message.messageId)}`);
      
      await sender.sendMessages(message);
      
      this.logger.log(`Successfully published message ${message.messageId} to ${destination}`);
    } catch (error) {
      this.logger.error(`Failed to publish message to ${destination}: ${error.message}`, error.stack);
      // In a production scenario, we might want to implement a retry policy or dead-lettering logic here
      // depending on the criticality. For now, we propagate the error.
      throw error;
    }
  }

  /**
   * Retrieves an existing sender or creates a new one for the specified destination.
   * 
   * @param destination Topic or Queue name
   * @returns ServiceBusSender instance
   */
  private getSender(destination: string): ServiceBusSender {
    if (this.senders.has(destination)) {
      return this.senders.get(destination)!;
    }

    const sender = this.sbClient.createSender(destination);
    this.senders.set(destination, sender);
    return sender;
  }
}