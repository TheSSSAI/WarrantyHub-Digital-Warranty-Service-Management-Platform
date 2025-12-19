import { Inject, Injectable, Logger } from '@nestjs/common';
import { INotificationProvider } from '../../core/ports/INotificationProvider.interface';
import { IDeviceTokenRepository } from '../../core/ports/IDeviceTokenRepository.interface';
import { IUserPreferenceRepository } from '../../core/ports/IUserPreferenceRepository.interface';
import { INotificationLogRepository } from '../../core/ports/INotificationLogRepository.interface';
import { TemplateRenderingService } from './TemplateRendering.service';
import { DeviceTokenManagerService } from './DeviceTokenManager.service';
import { NotificationPayload } from '../dtos/NotificationPayload';
import { NotificationLog } from '../../core/domain/entities/NotificationLog';

/**
 * Interface describing the internal event structure passed to the dispatcher.
 */
export interface DispatchEvent {
  userId: string;
  eventType: string; // e.g. SERVICE_REQUEST_STATUS_CHANGED
  data: Record<string, any>;
  channels?: string[]; // Optional override, otherwise deduced from type/prefs
  traceId?: string;
}

@Injectable()
export class NotificationDispatcherService {
  private readonly logger = new Logger(NotificationDispatcherService.name);

  constructor(
    @Inject('FCM_PROVIDER')
    private readonly pushProvider: INotificationProvider,
    @Inject('EMAIL_PROVIDER')
    private readonly emailProvider: INotificationProvider,
    @Inject('IDeviceTokenRepository')
    private readonly deviceTokenRepository: IDeviceTokenRepository,
    @Inject('IUserPreferenceRepository')
    private readonly preferenceRepository: IUserPreferenceRepository,
    @Inject('INotificationLogRepository')
    private readonly logRepository: INotificationLogRepository,
    private readonly templateService: TemplateRenderingService,
    private readonly tokenManager: DeviceTokenManagerService,
  ) {}

  /**
   * Main entry point to dispatch a notification.
   * Determines channels, checks preferences, renders content, and sends.
   */
  async dispatch(event: DispatchEvent): Promise<void> {
    const { userId, eventType, data, traceId } = event;
    this.logger.log(`Processing notification '${eventType}' for user ${userId} [Trace: ${traceId || 'N/A'}]`);

    try {
      // 1. Determine Channels based on Business Rules (Defaults)
      // In a real app, this might come from a configuration service.
      const targetChannels = event.channels || this.getDefaultChannelsForEvent(eventType);

      // 2. Filter Channels based on User Preferences
      const allowedChannels = await this.filterByPreferences(userId, eventType, targetChannels);

      if (allowedChannels.length === 0) {
        this.logger.log(`Notification '${eventType}' for user ${userId} skipped due to user preferences.`);
        return;
      }

      // 3. Process each channel in parallel
      const dispatchPromises = allowedChannels.map(channel => 
        this.processChannel(channel, userId, eventType, data)
      );

      await Promise.allSettled(dispatchPromises);
      this.logger.log(`Dispatch processing complete for user ${userId}`);

    } catch (error) {
      this.logger.error(`Critical error dispatching notification for user ${userId}: ${error.message}`, error.stack);
      // In an event-driven system, we might want to throw here to trigger a retry at the consumer level
      // depending on the type of error (transient vs permanent).
      throw error;
    }
  }

  private async processChannel(channel: string, userId: string, eventType: string, data: any): Promise<void> {
    try {
      // 4. Render Template
      // We render separate content for each channel as email vs push formats differ significantly.
      const content = await this.templateService.renderMessage(eventType, channel, data);
      
      const payload: NotificationPayload = {
        title: content.title,
        body: content.body,
        data: {
          ...data,
          click_action: 'FLUTTER_NOTIFICATION_CLICK', // Common pattern for deep linking
          type: eventType
        }
      };

      // 5. Send via Specific Provider
      if (channel === 'push') {
        await this.handlePushDispatch(userId, payload, eventType);
      } else if (channel === 'email') {
        await this.handleEmailDispatch(userId, payload, content.html, eventType);
      }

    } catch (error) {
      this.logger.error(`Failed to process channel '${channel}' for user ${userId}: ${error.message}`);
      // Swallow error here so one channel failure doesn't affect others, 
      // but ensure it's logged.
    }
  }

  private async handlePushDispatch(userId: string, payload: NotificationPayload, eventType: string): Promise<void> {
    // Fetch tokens
    const tokens = await this.deviceTokenRepository.getTokensByUserId(userId);
    
    if (!tokens || tokens.length === 0) {
      this.logger.debug(`No device tokens found for user ${userId}. Skipping push.`);
      return;
    }

    // Send
    const result = await this.pushProvider.send(tokens, payload);

    // Handle invalid tokens (Feedback loop)
    if (result.failedRecipients && result.failedRecipients.length > 0) {
      await this.tokenManager.pruneInvalidTokens(result.failedRecipients);
    }

    // Log History
    await this.logNotification(userId, eventType, 'push', payload, result.successCount > 0);
  }

  private async handleEmailDispatch(userId: string, payload: NotificationPayload, htmlBody: string | undefined, eventType: string): Promise<void> {
    // For email, we assume the provider needs the user ID to look up the email address,
    // or the email address is passed in the 'payload' or 'data'. 
    // Here we pass the userId and let the adapter resolve the destination or look it up.
    
    // Construct email specific payload
    const emailPayload = {
        ...payload,
        body: htmlBody || payload.body, // Prefer HTML if available
        subject: payload.title
    };

    const result = await this.emailProvider.send(userId, emailPayload);
    
    // Log History
    await this.logNotification(userId, eventType, 'email', payload, result.successCount > 0);
  }

  private async filterByPreferences(userId: string, eventType: string, channels: string[]): Promise<string[]> {
    // If transactional/critical, bypass preferences
    if (this.isCriticalEvent(eventType)) {
        return channels;
    }

    const preferences = await this.preferenceRepository.getUserPreferences(userId);
    
    if (!preferences) {
        // Default behavior: Allow all if no preferences set (Opt-out model)
        return channels; 
    }

    return channels.filter(channel => {
        // Assuming preference structure maps event categories to channel booleans
        // This is a simplification; real logic depends on granularity of Preference Entity
        return preferences.isChannelEnabled(eventType, channel);
    });
  }

  private async logNotification(
    userId: string, 
    type: string, 
    channel: string, 
    payload: NotificationPayload, 
    success: boolean
  ): Promise<void> {
    try {
      const log = new NotificationLog();
      log.userId = userId;
      log.type = type;
      log.channel = channel;
      log.title = payload.title;
      log.body = payload.body;
      log.metadata = payload.data;
      log.status = success ? 'SENT' : 'FAILED';
      log.createdAt = new Date();

      await this.logRepository.createLog(log);
    } catch (error) {
      // Non-blocking logging failure
      this.logger.error(`Failed to persist notification log: ${error.message}`);
    }
  }

  private getDefaultChannelsForEvent(eventType: string): string[] {
    // Business Rules for defaults
    switch (eventType) {
        case 'SERVICE_REQUEST_STATUS_CHANGED':
        case 'WARRANTY_EXPIRING':
            return ['push', 'email'];
        case 'CHAT_MESSAGE_RECEIVED':
            return ['push']; // Chat usually push only to avoid spam
        case 'USER_WELCOME':
            return ['email'];
        default:
            return ['push'];
    }
  }

  private isCriticalEvent(eventType: string): boolean {
    // Critical events ignore user opt-outs (e.g. Security alerts, Policy updates)
    const criticalEvents = ['ACCOUNT_LOCKED', 'PASSWORD_RESET', 'POLICY_UPDATE'];
    return criticalEvents.includes(eventType);
  }
}