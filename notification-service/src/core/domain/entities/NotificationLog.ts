/**
 * Represents a persistent record of a notification that has been sent or attempted.
 * This entity supports the "Notification History" feature (US-073) and audit requirements.
 */
export class NotificationLog {
  private readonly _id: string;
  private readonly _userId: string;
  private readonly _title: string;
  private readonly _body: string;
  private readonly _channel: 'push' | 'email' | 'sms' | 'in-app';
  private readonly _type: string; // e.g., 'StatusChange', 'WarrantyExpiry'
  private _status: 'pending' | 'sent' | 'failed' | 'read';
  private _metadata: Record<string, any>;
  private _failureReason?: string;
  private _readAt?: Date;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    userId: string,
    title: string,
    body: string,
    channel: 'push' | 'email' | 'sms' | 'in-app',
    type: string,
    status: 'pending' | 'sent' | 'failed' | 'read' = 'pending',
    metadata: Record<string, any> = {},
    createdAt: Date = new Date(),
  ) {
    this._id = id;
    this._userId = userId;
    this._title = title;
    this._body = body;
    this._channel = channel;
    this._type = type;
    this._status = status;
    this._metadata = metadata;
    this._createdAt = createdAt;
  }

  // Getters
  get id(): string { return this._id; }
  get userId(): string { return this._userId; }
  get title(): string { return this._title; }
  get body(): string { return this._body; }
  get channel(): string { return this._channel; }
  get type(): string { return this._type; }
  get status(): string { return this._status; }
  get metadata(): Record<string, any> { return this._metadata; }
  get failureReason(): string | undefined { return this._failureReason; }
  get readAt(): Date | undefined { return this._readAt; }
  get createdAt(): Date { return this._createdAt; }

  // Domain Behaviors

  public markAsSent(): void {
    if (this._status !== 'read') {
      this._status = 'sent';
    }
  }

  public markAsFailed(reason: string): void {
    this._status = 'failed';
    this._failureReason = reason;
  }

  public markAsRead(): void {
    if (this._status !== 'failed') {
      this._status = 'read';
      this._readAt = new Date();
    }
  }

  public isUserFacing(): boolean {
    // Only persist/show notifications that provide value in history
    // Internal system alerts or pure data payloads might be excluded based on type
    return true; 
  }
}