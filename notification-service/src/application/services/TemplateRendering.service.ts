import { Inject, Injectable, Logger } from '@nestjs/common';
import { ITemplateProvider } from '../../core/ports/ITemplateProvider.interface';

/**
 * Service responsible for resolving and rendering notification content
 * based on event types, channels, and locales.
 */
@Injectable()
export class TemplateRenderingService {
  private readonly logger = new Logger(TemplateRenderingService.name);

  constructor(
    @Inject('ITemplateProvider')
    private readonly templateProvider: ITemplateProvider,
  ) {}

  /**
   * Renders the notification content for a specific channel.
   * 
   * @param eventType - The type of business event (e.g., 'SERVICE_REQUEST_STATUS_CHANGED')
   * @param channel - The delivery channel (e.g., 'push', 'email', 'sms')
   * @param data - The dynamic data to inject into the template
   * @param locale - The user's preferred locale (default: 'en')
   * @returns The rendered content object
   */
  async renderMessage(
    eventType: string,
    channel: string,
    data: any,
    locale: string = 'en',
  ): Promise<{ title: string; body: string; html?: string }> {
    try {
      const templateKey = this.resolveTemplateKey(eventType, channel);
      this.logger.debug(
        `Rendering template '${templateKey}' for channel '${channel}' and locale '${locale}'`,
      );

      const rendered = await this.templateProvider.render(
        templateKey,
        data,
        locale,
      );

      return rendered;
    } catch (error) {
      this.logger.error(
        `Failed to render template for event '${eventType}' on channel '${channel}': ${error.message}`,
        error.stack,
      );
      // Fallback or rethrow depending on criticality. 
      // For notifications, we might want to throw to handle it in the dispatcher.
      throw new Error(`Template rendering failed: ${error.message}`);
    }
  }

  /**
   * Resolves the internal template key based on the event and channel.
   * This allows decoupling business event names from infrastructure template IDs.
   */
  private resolveTemplateKey(eventType: string, channel: string): string {
    // Mapping strategy: event_type + channel
    // Example: SERVICE_REQUEST_UPDATED_PUSH, SERVICE_REQUEST_UPDATED_EMAIL
    const normalizedEvent = eventType.toUpperCase().replace(/-/g, '_');
    const normalizedChannel = channel.toUpperCase();
    
    // In a production system, this might look up a database configuration
    // or a configuration file mapping. For now, we use a convention.
    return `${normalizedEvent}_${normalizedChannel}`;
  }
}