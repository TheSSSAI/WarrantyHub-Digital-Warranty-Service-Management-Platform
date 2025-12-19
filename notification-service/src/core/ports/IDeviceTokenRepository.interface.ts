import { DeviceToken } from '../domain/entities/DeviceToken';

/**
 * Interface for Device Token persistence operations.
 * This port abstracts the storage mechanism for FCM tokens used in push notifications.
 * It supports device registration, retrieval for dispatch, and cleanup of invalid tokens.
 *
 * @see REQ-INTG-001 - FCM Integration
 */
export interface IDeviceTokenRepository {
  /**
   * Persists a device token for a user.
   * If the token already exists, it should update the timestamp or platform details (Upsert).
   *
   * @param deviceToken - The device token entity to save.
   * @returns The saved device token entity.
   */
  save(deviceToken: DeviceToken): Promise<DeviceToken>;

  /**
   * Retrieves all active device tokens associated with a specific user.
   * Used by the NotificationDispatcher to determine push targets.
   *
   * @param userId - The unique identifier of the user.
   * @returns An array of device tokens.
   */
  findByUserId(userId: string): Promise<DeviceToken[]>;

  /**
   * Retrieves a specific device token record.
   * Useful for validating existence before operations.
   *
   * @param token - The FCM token string.
   * @returns The device token entity or null if not found.
   */
  findByToken(token: string): Promise<DeviceToken | null>;

  /**
   * Removes a specific device token from the system.
   * This is critical for handling "NotRegistered" errors from FCM or user logout.
   *
   * @param token - The FCM token string to remove.
   * @returns A promise that resolves when the operation is complete.
   */
  deleteByToken(token: string): Promise<void>;

  /**
   * Removes all device tokens for a specific user.
   * Used during account deletion or security invalidation events.
   *
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves when the operation is complete.
   */
  deleteByUserId(userId: string): Promise<void>;
}