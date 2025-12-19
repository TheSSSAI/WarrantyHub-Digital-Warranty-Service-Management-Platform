import { EntitySchema } from 'typeorm';
import { NotificationLog } from '../../../../core/domain/entities/NotificationLog';

/**
 * TypeORM Schema Definition for NotificationLog Entity
 * Maps the pure domain entity to the 'notification_logs' database table.
 * Used for the In-App Notification Center history (US-073) and audit trails.
 * 
 * Architectural Layer: Infrastructure (Persistence)
 * Dependency Level: 2
 */
export const NotificationLogSchema = new EntitySchema<NotificationLog>({
  name: 'NotificationLog',
  target: NotificationLog,
  tableName: 'notification_logs',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      name: 'id',
    },
    userId: {
      type: 'uuid',
      nullable: false,
      name: 'user_id',
      comment: 'Recipient user identifier',
    },
    title: {
      type: 'varchar',
      length: 255,
      nullable: false,
      name: 'title',
    },
    body: {
      type: 'text',
      nullable: true,
      name: 'body',
    },
    channel: {
      type: 'varchar',
      length: 50,
      nullable: false,
      name: 'channel',
      comment: 'Delivery channel used (Push, Email, SMS, InApp)',
    },
    type: {
      type: 'varchar',
      length: 100,
      nullable: false,
      name: 'notification_type',
      comment: 'Business event type (e.g., WarrantyExpiring, StatusChange)',
    },
    status: {
      type: 'varchar',
      length: 20,
      default: 'Sent',
      name: 'delivery_status',
    },
    readAt: {
      type: 'timestamptz',
      nullable: true,
      name: 'read_at',
    },
    metadata: {
      type: 'jsonb',
      nullable: true,
      name: 'metadata',
      comment: 'Additional context payload (e.g., serviceRequestId) for deep linking',
    },
    createdAt: {
      type: 'timestamptz',
      createDate: true,
      name: 'created_at',
    },
  },
  indices: [
    {
      name: 'IDX_NOTIF_LOG_USER_CREATED',
      columns: ['userId', 'createdAt'],
    },
    {
      name: 'IDX_NOTIF_LOG_READ_STATUS',
      columns: ['userId', 'readAt'],
    },
  ],
});