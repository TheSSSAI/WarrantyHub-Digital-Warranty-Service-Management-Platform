/**
 * Data Transfer Object representing the core content of a notification
 * to be dispatched to a provider.
 */
export class NotificationPayload {
  /**
   * The subject or headline of the notification.
   */
  title: string;

  /**
   * The main content message.
   */
  body: string;

  /**
   * Additional data payload for deep linking or application logic.
   * For push notifications, this maps to the 'data' payload.
   */
  data?: Record<string, any>;

  /**
   * The specific type of notification (e.g., 'ServiceRequestStatusChanged').
   * Used for categorization and client-side handling.
   */
  type: string;

  /**
   * The ID of the user receiving this notification.
   */
  recipientId: string;

  constructor(
    recipientId: string,
    type: string,
    title: string,
    body: string,
    data?: Record<string, any>
  ) {
    this.recipientId = recipientId;
    this.type = type;
    this.title = title;
    this.body = body;
    this.data = data;
  }
}