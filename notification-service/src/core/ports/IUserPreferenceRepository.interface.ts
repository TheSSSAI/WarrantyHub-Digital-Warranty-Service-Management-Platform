import { NotificationPreference } from '../domain/entities/NotificationPreference';

/**
 * Interface for User Notification Preference persistence operations.
 * This port allows retrieving and updating user settings that control which notifications they receive
 * and through which channels (Push, Email, SMS).
 *
 * @see US-090 - Manage notification preferences.
 */
export interface IUserPreferenceRepository {
  /**
   * Retrieves the notification preferences for a specific user.
   * If no preferences exist, the implementation may return a default preference set or null.
   *
   * @param userId - The unique identifier of the user.
   * @returns The user's notification preference entity or null if not set.
   */
  findByUserId(userId: string): Promise<NotificationPreference | null>;

  /**
   * Saves or updates the notification preferences for a user.
   * This enables users to opt-in or opt-out of specific notification types or channels.
   *
   * @param preference - The notification preference entity to save.
   * @returns The saved notification preference entity.
   */
  save(preference: NotificationPreference): Promise<NotificationPreference>;
}