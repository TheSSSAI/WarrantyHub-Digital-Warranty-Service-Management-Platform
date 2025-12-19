import { NotificationLog } from '../domain/entities/NotificationLog';

/**
 * Interface for Notification Log persistence operations.
 * This port handles the history of notifications sent to users, supporting the In-App Notification Center.
 *
 * @see US-073 - View notification history in an In-App Notification Center.
 */
export interface INotificationLogRepository {
  /**
   * Persists a record of a dispatched notification.
   * This serves as both an audit trail and the source for the user's notification history.
   *
   * @param log - The notification log entity to save.
   * @returns The saved notification log entity.
   */
  save(log: NotificationLog): Promise<NotificationLog>;

  /**
   * Retrieves a paginated list of notifications for a specific user.
   * Results should typically be ordered by creation date descending.
   *
   * @param userId - The unique identifier of the user.
   * @param limit - The maximum number of records to return.
   * @param offset - The number of records to skip.
   * @returns A tuple containing the array of logs and the total count of records.
   */
  findByUserId(userId: string, limit: number, offset: number): Promise<[NotificationLog[], number]>;

  /**
   * Retrieves a specific notification log by its ID.
   *
   * @param id - The unique identifier of the notification log (UUID).
   * @returns The notification log entity or null if not found.
   */
  findById(id: string): Promise<NotificationLog | null>;

  /**
   * Marks a specific notification as read.
   * Updates the `readAt` timestamp and `isRead` status.
   *
   * @param id - The unique identifier of the notification log.
   * @returns A promise that resolves when the operation is complete.
   */
  markAsRead(id: string): Promise<void>;

  /**
   * Marks all notifications for a specific user as read.
   * Common feature for "Mark all as read" button in UI.
   *
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves when the operation is complete.
   */
  markAllAsRead(userId: string): Promise<void>;

  /**
   * Counts the number of unread notifications for a specific user.
   * Used for badge counts in the mobile app or web dashboard.
   *
   * @param userId - The unique identifier of the user.
   * @returns The count of unread notifications.
   */
  countUnread(userId: string): Promise<number>;
}