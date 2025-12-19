import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IDeviceTokenRepository } from '../../core/ports/IDeviceTokenRepository.interface';
import { DeviceRegistrationDto } from '../dtos/DeviceRegistrationDto';
import { DeviceToken } from '../../core/domain/entities/DeviceToken';

/**
 * Service responsible for managing the lifecycle of mobile device tokens.
 * Handles registration, unregistration, and pruning of invalid tokens.
 */
@Injectable()
export class DeviceTokenManagerService {
  private readonly logger = new Logger(DeviceTokenManagerService.name);

  constructor(
    @Inject('IDeviceTokenRepository')
    private readonly deviceTokenRepository: IDeviceTokenRepository,
  ) {}

  /**
   * Registers or updates a device token for a user.
   * Used when the mobile app opens or the user logs in.
   */
  async registerDevice(userId: string, dto: DeviceRegistrationDto): Promise<void> {
    this.logger.log(`Registering device token for user ${userId} on platform ${dto.platform}`);

    try {
      // Check if token already exists to avoid duplication or ownership conflicts
      // In some cases, a token might move from one user to another (e.g., logout/login on same device)
      // The repository implementation should handle upsert logic, but we enforce business rules here.
      
      await this.deviceTokenRepository.saveToken(
        userId,
        dto.token,
        dto.platform
      );
      
      this.logger.debug(`Successfully registered device token for user ${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to register device token for user ${userId}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Removes a specific device token.
   * Used when the user logs out or disables notifications on a specific device.
   */
  async unregisterDevice(userId: string, token: string): Promise<void> {
    this.logger.log(`Unregistering device token for user ${userId}`);

    try {
      // Verify ownership before deletion to prevent malicious deletion of others' tokens
      const existingTokens = await this.deviceTokenRepository.getTokensByUserId(userId);
      const tokenExists = existingTokens.includes(token);

      if (!tokenExists) {
        this.logger.warn(`Attempted to unregister non-existent or unowned token for user ${userId}`);
        throw new NotFoundException('Device token not found for this user');
      }

      await this.deviceTokenRepository.deleteToken(token);
      this.logger.debug(`Successfully unregistered device token`);
    } catch (error) {
      this.logger.error(
        `Failed to unregister device token: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Removes a list of tokens identified as invalid by the Push Provider (FCM).
   * This is critical for maintaining a clean database and reputation with FCM.
   */
  async pruneInvalidTokens(tokens: string[]): Promise<void> {
    if (!tokens || tokens.length === 0) return;

    this.logger.log(`Pruning ${tokens.length} invalid device tokens`);

    const results = await Promise.allSettled(
      tokens.map((token) => this.deviceTokenRepository.deleteToken(token)),
    );

    const failedCount = results.filter((r) => r.status === 'rejected').length;
    const successCount = tokens.length - failedCount;

    if (failedCount > 0) {
      this.logger.warn(
        `Prune operation completed with issues. Success: ${successCount}, Failed: ${failedCount}`,
      );
    } else {
      this.logger.debug(`Successfully pruned ${successCount} invalid tokens`);
    }
  }

  /**
   * Retrieves all active tokens for a specific user.
   */
  async getUserTokens(userId: string): Promise<string[]> {
    return this.deviceTokenRepository.getTokensByUserId(userId);
  }
}