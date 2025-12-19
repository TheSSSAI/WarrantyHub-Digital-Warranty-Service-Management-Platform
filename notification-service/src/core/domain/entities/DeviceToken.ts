/**
 * Represents a registered device token for push notifications.
 * This entity is responsible for tracking the linkage between a user and their physical device.
 */
export class DeviceToken {
  private readonly _id: string;
  private readonly _userId: string;
  private _token: string;
  private _platform: 'ios' | 'android';
  private _isActive: boolean;
  private _lastUsedAt: Date;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    token: string,
    platform: 'ios' | 'android',
    isActive: boolean = true,
    lastUsedAt: Date = new Date(),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    if (!token) throw new Error('Device token cannot be empty');
    if (!userId) throw new Error('User ID cannot be empty');
    
    this._id = id;
    this._userId = userId;
    this._token = token;
    this._platform = platform;
    this._isActive = isActive;
    this._lastUsedAt = lastUsedAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // Getters
  get id(): string { return this._id; }
  get userId(): string { return this._userId; }
  get token(): string { return this._token; }
  get platform(): 'ios' | 'android' { return this._platform; }
  get isActive(): boolean { return this._isActive; }
  get lastUsedAt(): Date { return this._lastUsedAt; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  // Domain Behaviors

  /**
   * Updates the FCM token for the device.
   * Useful when the provider refreshes the token on the client side.
   */
  public updateToken(newToken: string): void {
    if (!newToken) throw new Error('New token cannot be empty');
    if (this._token !== newToken) {
      this._token = newToken;
      this._isActive = true; // Reactivate if it was disabled
      this.touch();
    }
  }

  /**
   * Marks the token as active and updates usage timestamp.
   */
  public markAsUsed(): void {
    this._isActive = true;
    this._lastUsedAt = new Date();
    this.touch();
  }

  /**
   * Marks the token as invalid (e.g., received specific error from FCM).
   */
  public invalidate(): void {
    this._isActive = false;
    this.touch();
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}