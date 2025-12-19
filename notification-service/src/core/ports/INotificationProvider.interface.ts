import { NotificationPayload } from '../../application/dtos/NotificationPayload';

/**
 * Dependency Injection Token for the Notification Provider.
 * Allows switching between different providers (FCM, AWS SNS, Azure Notification Hubs) via DI.
 */
export const NOTIFICATION_PROVIDER = Symbol('INotificationProvider');

/**
 * Result object returned after a send attempt.
 */
export interface ProviderSendResult {
  success: boolean;
  messageId?: string;
  error?: any;
  /**
   * For batch sends (multicast), list of tokens that failed and should be removed.
   */
  failedTokens?: string[];
}

/**
 * Port (Interface) defining the contract for any external notification service provider.
 * Implemented by Infrastructure Adapters (e.g., FirebaseCloudMessagingAdapter).
 */
export interface INotificationProvider {
  /**
   * Sends a notification to a single recipient or a list of device tokens.
   * 
   * @param recipient Target identifier (Device Token for Push, Email Address for Email, Phone for SMS)
   * @param payload The notification content and metadata
   */
  send(recipient: string | string[], payload: NotificationPayload): Promise<ProviderSendResult>;
}