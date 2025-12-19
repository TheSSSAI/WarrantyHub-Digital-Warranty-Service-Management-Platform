import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INotificationLogRepository } from '../../../../core/ports/INotificationLogRepository.interface';
import { NotificationLog } from '../../../../core/domain/entities/NotificationLog';

/**
 * TypeORM implementation of the Notification Log repository.
 * Responsible for persisting notification history for the in-app Notification Center.
 */
@Injectable()
export class TypeOrmNotificationLogRepository
  implements INotificationLogRepository
{
  private readonly logger = new Logger(TypeOrmNotificationLogRepository.name);

  constructor(
    @InjectRepository(NotificationLog)
    private readonly repository: Repository<NotificationLog>,
  ) {}

  /**
   * Persists a notification log entry.
   * This is typically called after or during the dispatch process to ensure
   * the user has a record of the communication.
   *
   * @param log The notification log entity to save.
   */
  async createLog(log: NotificationLog): Promise<void> {
    try {
      this.logger.debug(`Persisting notification log for user: ${log.userId}`);
      // Ensure the repository saves the entity correctly, adhering to any schema constraints
      await this.repository.save(log);
      this.logger.log(`Notification log created successfully: ${log.id}`);
    } catch (error) {
      this.logger.error(
        `Failed to create notification log for user ${log.userId}`,
        error instanceof Error ? error.stack : String(error),
      );
      // We explicitly rethrow here as failure to log might be critical depending on audit requirements,
      // though upstream services might choose to swallow this to not fail the actual notification dispatch.
      throw error;
    }
  }

  /**
   * Retrieves a paginated list of notifications for a specific user.
   * Results are ordered by creation date descending (newest first).
   *
   * @param userId The ID of the user.
   * @param limit The maximum number of records to return.
   * @param offset The number of records to skip.
   * @returns Array of NotificationLog entities.
   */
  async findByUser(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<NotificationLog[]> {
    try {
      return await this.repository.find({
        where: { userId },
        order: { createdAt: 'DESC' },
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch notifications for user ${userId}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * Marks a specific notification as read.
   *
   * @param logId The unique identifier of the notification log.
   */
  async markAsRead(logId: string): Promise<void> {
    try {
      this.logger.debug(`Marking notification as read: ${logId}`);
      const result = await this.repository.update(logId, {
        readStatus: true,
        updatedAt: new Date(), // Explicitly update timestamp if not handled by DB trigger
      });

      if (result.affected === 0) {
        this.logger.warn(
          `Attempted to mark non-existent notification as read: ${logId}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to mark notification ${logId} as read`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * Counts the number of unread notifications for a user.
   * Useful for badge counts on mobile/web UI.
   *
   * @param userId The user ID.
   * @returns The count of unread notifications.
   */
  async countUnread(userId: string): Promise<number> {
    try {
      return await this.repository.count({
        where: {
          userId,
          readStatus: false,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to count unread notifications for user ${userId}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}