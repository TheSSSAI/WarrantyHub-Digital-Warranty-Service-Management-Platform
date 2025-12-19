import { appSchema, tableSchema } from '@nozbe/watermelondb';
import { SyncStatus } from '../../shared/types/enums';

/**
 * WatermelonDB Schema Definition (Level 1).
 * Defines the structure of the local SQLite database used for offline-first capabilities.
 * 
 * Complies with US-075 (Offline Queue) and general offline data requirements.
 */

// Define table names constants to avoid magic strings
export const TABLE_OFFLINE_QUEUE = 'offline_action_queue';
export const TABLE_SERVICE_REQUESTS = 'local_service_requests';
export const TABLE_TECHNICIANS = 'local_technicians';
export const TABLE_PARTS_USED = 'local_parts_used';

export const myAppSchema = appSchema({
  version: 1,
  tables: [
    /**
     * Table: offline_action_queue
     * Stores mutations (POST/PUT/PATCH/DELETE) that occurred while offline.
     * These are processed FIFO when connectivity is restored.
     */
    tableSchema({
      name: TABLE_OFFLINE_QUEUE,
      columns: [
        { name: 'endpoint', type: 'string' },
        { name: 'method', type: 'string' },
        { name: 'payload', type: 'string' }, // JSON stringified body
        { name: 'status', type: 'string', isIndexed: true }, // SyncStatus enum
        { name: 'timestamp', type: 'number', isIndexed: true },
        { name: 'retry_count', type: 'number' },
        { name: 'error_message', type: 'string', isOptional: true },
      ],
    }),

    /**
     * Table: local_service_requests
     * Stores a cache of service requests assigned to the technician.
     * Allows viewing and updating job details while offline.
     */
    tableSchema({
      name: TABLE_SERVICE_REQUESTS,
      columns: [
        { name: 'remote_id', type: 'string', isIndexed: true }, // The ID from the backend
        { name: 'status', type: 'string', isIndexed: true },
        { name: 'customer_name', type: 'string' },
        { name: 'customer_address', type: 'string' },
        { name: 'customer_phone', type: 'string' },
        { name: 'product_details', type: 'string' }, // JSON blob of product info
        { name: 'issue_description', type: 'string' },
        { name: 'scheduled_date', type: 'number' },
        { name: 'sync_status', type: 'string' }, // To track if local changes are synced
        { name: 'last_updated_at', type: 'number' },
      ],
    }),

    /**
     * Table: local_parts_used
     * Stores parts added to a job while offline.
     */
    tableSchema({
      name: TABLE_PARTS_USED,
      columns: [
        { name: 'request_id', type: 'string', isIndexed: true },
        { name: 'part_name', type: 'string' },
        { name: 'part_number', type: 'string' },
        { name: 'quantity', type: 'number' },
        { name: 'cost', type: 'number', isOptional: true },
        { name: 'sync_status', type: 'string' },
      ],
    }),

    /**
     * Table: local_technicians
     * Stores profile information for the logged-in technician.
     */
    tableSchema({
      name: TABLE_TECHNICIANS,
      columns: [
        { name: 'remote_id', type: 'string', isIndexed: true },
        { name: 'full_name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'avatar_url', type: 'string', isOptional: true },
      ],
    }),
  ],
});