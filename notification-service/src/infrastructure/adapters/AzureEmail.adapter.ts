import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailClient, EmailMessage, EmailSendStatus } from '@azure/communication-email';
import { INotificationProvider, ProviderSendResult } from '../../core/ports/INotificationProvider.interface';
import { NotificationPayload } from '../../application/dtos/NotificationPayload';

/**
 * Azure Communication Services (ACS) Email Adapter
 * Implements the INotificationProvider port for Email delivery.
 * 
 * Architectural Layer: Infrastructure (Adapter)
 * Dependency Level: 2
 */
@Injectable()
export class AzureEmailAdapter implements INotificationProvider {
  private readonly logger = new Logger(AzureEmailAdapter.name);
  private emailClient: EmailClient;
  private senderAddress: string;

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get<string>('communication.connectionString');
    this.senderAddress = this.configService.get<string>('communication.senderEmail');

    if (!connectionString || !this.senderAddress) {
      this.logger.error('Azure Communication Services configuration missing (connection string or sender email).');
      // We don't throw here to avoid crashing the app on startup, but send() will fail.
    } else {
      this.emailClient = new EmailClient(connectionString);
    }
  }

  /**
   * Sends an email to one or multiple recipients using Azure Communication Services.
   * 
   * @param recipients - Email address or array of email addresses.
   * @param payload - Contains email subject (title) and HTML body.
   */
  async send(recipients: string | string[], payload: NotificationPayload): Promise<ProviderSendResult> {
    if (!this.emailClient) {
      this.logger.error('EmailClient not initialized. Cannot send email.');
      return { successCount: 0, failureCount: Array.isArray(recipients) ? recipients.length : 1, failedRecipients: Array.isArray(recipients) ? recipients : [recipients] };
    }

    const recipientList = Array.isArray(recipients) ? recipients : [recipients];
    
    // Azure ACS requires a specific object structure for recipients
    const toRecipients = recipientList.map(email => ({ address: email }));

    const message: EmailMessage = {
      senderAddress: this.senderAddress,
      content: {
        subject: payload.title,
        html: payload.body, // Assuming body contains HTML content from Template Engine
        plainText: this.stripHtml(payload.body) // Fallback text
      },
      recipients: {
        to: toRecipients,
      },
    };

    try {
      this.logger.debug(`Initiating email send to ${recipientList.length} recipients.`);
      
      // Begin the send operation
      const poller = await this.emailClient.beginSend(message);
      
      // Wait for the result (optional: for high throughput, we might fire-and-forget or use a separate poller job)
      // For reliability in this scope, we wait for completion or a timeout.
      const result = await poller.pollUntilDone();

      if (result.status === 'Succeeded') {
        this.logger.log(`Email successfully sent. Operation ID: ${result.id}`);
        return {
          successCount: recipientList.length,
          failureCount: 0,
          failedRecipients: [],
        };
      } else {
        this.logger.error(`Email send failed status: ${result.status}, Error: ${JSON.stringify(result.error)}`);
        return {
          successCount: 0,
          failureCount: recipientList.length,
          failedRecipients: recipientList,
        };
      }

    } catch (error) {
      this.logger.error('Exception during Azure Email send operation', error);
      return {
        successCount: 0,
        failureCount: recipientList.length,
        failedRecipients: recipientList,
      };
    }
  }

  /**
   * Simple utility to strip HTML tags for the plain text fallback.
   * In a real enterprise scenario, a library like 'html-to-text' would be robust.
   */
  private stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
  }
}