import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDeviceTokenRepository } from '../../../../core/ports/IDeviceTokenRepository.interface';
import { DeviceToken } from '../../../../core/domain/entities/DeviceToken';

/**
 * TypeORM implementation of the DeviceToken repository.
 * Handles persistence of FCM tokens for mobile devices.
 */
@Injectable()
export class TypeOrmDeviceTokenRepository implements IDeviceTokenRepository {
  private readonly logger = new Logger(TypeOrmDeviceTokenRepository.name);

  constructor(
    @InjectRepository(DeviceToken)
    private readonly repository: Repository<DeviceToken>,
  ) {}

  /**
   * Saves or updates a device token.
   * This operation is idempotent: if the token exists, it updates the user association and timestamp.
   * If it does not exist, it creates a new record.
   *
   * @param userId The ID of the user owning the device.
   * @param token The FCM device token.
   * @param platform The platform ('ios' | 'android').
   */
  async saveToken(
    userId: string,
    token: string,
    platform: 'ios' | 'android',
  ): Promise<void> {
    try {
      this.logger.debug(
        `Attempting to save device token for user: ${userId}, platform: ${platform}`,
      );

      // Check if token already exists to handle potential user switching on the same device
      const existingToken = await this.repository.findOne({
        where: { token },
      });

      if (existingToken) {
        this.logger.debug(
          `Token exists. Updating user association from ${existingToken.userId} to ${userId}`,
        );
        existingToken.userId = userId;
        existingToken.platform = platform;
        existingToken.updatedAt = new Date();
        await this.repository.save(existingToken);
      } else {
        this.logger.debug('Token does not exist. Creating new record.');
        const newToken = this.repository.create({
          userId,
          token,
          platform,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await this.repository.save(newToken);
      }

      this.logger.log(`Successfully saved device token for user ${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to save device token for user ${userId}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * Retrieves all active device tokens associated with a specific user.
   *
   * @param userId The user ID.
   * @returns Array of FCM token strings.
   */
  async getTokensByUserId(userId: string): Promise<string[]> {
    try {
      const tokens = await this.repository.find({
        where: { userId },
        select: ['token'],
      });

      return tokens.map((t) => t.token);
    } catch (error) {
      this.logger.error(
        `Failed to retrieve tokens for user ${userId}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * Deletes a specific device token from the database.
   * Typically used when FCM reports a token as invalid or unregistered,
   * or when a user logs out.
   *
   * @param token The FCM token to remove.
   */
  async deleteToken(token: string): Promise<void> {
    try {
      this.logger.debug('Attempting to delete device token');
      const result = await this.repository.delete({ token });

      if (result.affected && result.affected > 0) {
        this.logger.log(`Successfully deleted device token`);
      } else {
        this.logger.warn(`Token to delete was not found: ${token}`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to delete device token`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}