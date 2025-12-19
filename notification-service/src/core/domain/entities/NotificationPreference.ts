/**
 * Represents a user's configuration for receiving notifications.
 * Supports granular opt-in/opt-out per channel and notification type (US-090).
 */
export class NotificationPreference {
  private readonly _id: string;
  private readonly _userId: string;
  private readonly _notificationType: string; // e.g., 'service_update', 'marketing', 'warranty_alert'
  private _channels: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  private _updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    notificationType: string,
    channels: { push: boolean; email: boolean; sms: boolean },
    updatedAt: Date = new Date()
  ) {
    this._id = id;
    this._userId = userId;
    this._notificationType = notificationType;
    this._channels = channels;
    this._updatedAt = updatedAt;
  }

  // Getters
  get id(): string { return this._id; }
  get userId(): string { return this._userId; }
  get notificationType(): string { return this._notificationType; }
  get channels(): { push: boolean; email: boolean; sms: boolean } { return { ...this._channels }; }
  get updatedAt(): Date { return this._updatedAt; }

  // Domain Behaviors

  public updateChannelPreference(channel: 'push' | 'email' | 'sms', isEnabled: boolean): void {
    this._channels[channel] = isEnabled;
    this._updatedAt = new Date();
  }

  public isChannelEnabled(channel: 'push' | 'email' | 'sms'): boolean {
    return this._channels[channel];
  }

  /**
   * Factory method to create default preferences for a new user.
   */
  public static createDefault(id: string, userId: string, type: string): NotificationPreference {
    return new NotificationPreference(id, userId, type, {
      push: true,
      email: true,
      sms: false, // SMS usually opt-in due to cost/intrusiveness
    });
  }
}