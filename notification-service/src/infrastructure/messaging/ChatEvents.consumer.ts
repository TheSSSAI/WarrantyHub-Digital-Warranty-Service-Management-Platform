import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationDispatcherService } from '../../application/services/NotificationDispatcher.service';
import { NotificationPayload } from '../../application/dtos/NotificationPayload';

interface ChatMessageSentEvent {
  messageId: string;
  serviceRequestId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  senderName: string;
}

@Controller()
export class ChatEventsConsumer {
  private readonly logger = new Logger(ChatEventsConsumer.name);

  constructor(
    private readonly notificationDispatcher: NotificationDispatcherService
  ) {}

  @EventPattern('chat.message-sent')
  async handleMessageSent(@Payload() message: ChatMessageSentEvent): Promise<void> {
    this.logger.debug(`Received chat message event for Service Request: ${message.serviceRequestId}`);

    try {
      if (!message.recipientId || !message.content) {
        this.logger.warn('Invalid chat event payload: Missing recipientId or content');
        return;
      }

      // Truncate message for push notification body if too long
      const previewText = message.content.length > 100 
        ? `${message.content.substring(0, 97)}...` 
        : message.content;

      const notificationData: NotificationPayload = {
        title: `New Message from ${message.senderName}`,
        body: previewText,
        data: {
          type: 'CHAT_MESSAGE',
          entityId: message.serviceRequestId, // Deep link to the ticket chat
          messageId: message.messageId,
          senderId: message.senderId
        }
      };

      await this.notificationDispatcher.dispatch(
        message.recipientId,
        'CHAT_MESSAGE_RECEIVED', // Preference key
        notificationData
      );

    } catch (error) {
      this.logger.error(
        `Error processing chat event: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined
      );
      throw error;
    }
  }
}