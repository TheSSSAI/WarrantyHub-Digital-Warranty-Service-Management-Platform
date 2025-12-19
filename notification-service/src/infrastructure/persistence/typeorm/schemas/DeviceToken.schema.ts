import { EntitySchema } from 'typeorm';
import { DeviceToken } from '../../../../core/domain/entities/DeviceToken';

/**
 * TypeORM Schema Definition for DeviceToken Entity
 * Maps the pure domain entity to the 'device_tokens' database table.
 * 
 * Architectural Layer: Infrastructure (Persistence)
 * Dependency Level: 2
 */
export const DeviceTokenSchema = new EntitySchema<DeviceToken>({
  name: 'DeviceToken',
  target: DeviceToken,
  tableName: 'device_tokens',
  columns: {
    token: {
      type: 'varchar',
      length: 512,
      primary: true,
      nullable: false,
      name: 'token',
      comment: 'The unique FCM registration token for the device',
    },
    userId: {
      type: 'uuid',
      nullable: false,
      name: 'user_id',
      comment: 'The user identifier associated with this device',
    },
    platform: {
      type: 'varchar',
      length: 20,
      nullable: false,
      name: 'platform',
      comment: 'The operating system of the device (ios/android)',
    },
    isActive: {
      type: 'boolean',
      default: true,
      name: 'is_active',
    },
    lastUsedAt: {
      type: 'timestamptz',
      createDate: true, // Default to creation time, updated on usage
      name: 'last_used_at',
    },
    createdAt: {
      type: 'timestamptz',
      createDate: true,
      name: 'created_at',
    },
    updatedAt: {
      type: 'timestamptz',
      updateDate: true,
      name: 'updated_at',
    },
  },
  indices: [
    {
      name: 'IDX_DEVICE_TOKENS_USER_ID',
      columns: ['userId'],
    },
    {
      name: 'IDX_DEVICE_TOKENS_PLATFORM',
      columns: ['platform'],
    },
    // Composite index for fast lookup of user's active devices
    {
      name: 'IDX_DEVICE_TOKENS_USER_ACTIVE',
      columns: ['userId', 'isActive'],
    },
  ],
  uniques: [
    {
      name: 'UQ_DEVICE_TOKEN',
      columns: ['token'],
    },
  ],
});