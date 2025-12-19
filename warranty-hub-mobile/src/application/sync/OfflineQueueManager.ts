import { SyncActionDto } from '../../shared/infrastructure/storage/dtos/SyncActionDto';
import { SyncStatus } from '../../shared/types/enums';
import { ApiClient } from '../../infrastructure/api/ApiClient';
import { WatermelonDatabase } from '../../infrastructure/persistence/WatermelonDatabase';
import { Model } from '@nozbe/watermelondb';

/**
 * Manages the "Offline-First" synchronization queue.
 * Intercepts mutations when offline, persists them to local storage,
 * and orchestrates synchronization when connectivity is restored.
 */
export class OfflineQueueManager {
  private isSyncing = false;

  constructor(
    private readonly database: WatermelonDatabase,
    private readonly apiClient: ApiClient
  ) {}

  /**
   * Enqueues an action to be performed. If online, attempts immediately.
   * If offline or fails, persists to local queue.
   * 
   * @param action The definition of the API call to make
   */
  public async enqueue(action: Omit<SyncActionDto, 'id' | 'status' | 'createdAt' | 'retryCount'>): Promise<void> {
    try {
      // 1. Persist to local database first (WAL - Write Ahead Log pattern)
      const queueRecord = await this.persistAction(action);

      // 2. Attempt immediate sync if we think we are online
      // Note: Actual network checking should be handled by a NetworkMonitor, 
      // but for this implementation we try and catch.
      await this.processItem(queueRecord);

    } catch (error) {
      console.log('[OfflineQueueManager] Action queued for retry due to:', error);
      // Suppress error to UI? Depends on UX requirements. 
      // Usually offline actions are "fire and forget" from UI perspective with optimistic updates.
    }
  }

  /**
   * Triggers processing of the pending queue. 
   * Should be called by NetworkMonitor when connection is restored.
   */
  public async processQueue(): Promise<void> {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      const pendingActions = await this.database.getPendingSyncActions();

      if (pendingActions.length === 0) {
        return;
      }

      console.log(`[OfflineQueueManager] Processing ${pendingActions.length} pending actions...`);

      // Process sequentially to maintain order of operations
      for (const actionRecord of pendingActions) {
        try {
          await this.processItem(actionRecord);
        } catch (error) {
          // If one fails, we stop the queue processing to preserve order dependency?
          // Or we skip? For simplicity and robustness, we usually stop on non-retryable errors
          // or increment retry count on transient errors.
          console.error(`[OfflineQueueManager] Failed to sync item ${actionRecord.id}`, error);
          
          // If it's a 500 or Network Error, we stop processing the queue.
          // If it's a 400 (Bad Request), the action is invalid and should be marked failed to unblock queue.
          const isFatal = this.isFatalError(error);
          if (isFatal) {
            await this.markAsFailed(actionRecord, error);
            continue; // Continue to next item if this one is permanently failed
          } else {
            // Transient error, stop queue processing until next network event
            break; 
          }
        }
      }
    } finally {
      this.isSyncing = false;
    }
  }

  private async persistAction(action: any): Promise<any> {
    const table = this.database.getCollection('sync_queue');
    let record;
    await this.database.write(async () => {
      record = await table.create((entry: any) => {
        entry.endpoint = action.endpoint;
        entry.method = action.method;
        entry.payload = JSON.stringify(action.payload);
        entry.headers = JSON.stringify(action.headers || {});
        entry.status = SyncStatus.PENDING;
        entry.retryCount = 0;
        entry.createdAt = Date.now();
      });
    });
    return record;
  }

  private async processItem(record: any): Promise<void> {
    const payload = JSON.parse(record.payload);
    const headers = JSON.parse(record.headers);

    // Execute API Call
    switch (record.method.toUpperCase()) {
      case 'POST':
        await this.apiClient.post(record.endpoint, payload, { headers });
        break;
      case 'PUT':
        await this.apiClient.put(record.endpoint, payload, { headers });
        break;
      case 'PATCH':
        await this.apiClient.patch(record.endpoint, payload, { headers });
        break;
      case 'DELETE':
        await this.apiClient.delete(record.endpoint, { headers });
        break;
      default:
        throw new Error(`Unsupported method ${record.method}`);
    }

    // On Success: Remove from queue
    await this.database.write(async () => {
      await record.destroyPermanently(); // Or mark as COMPLETED if history is needed
    });
  }

  private async markAsFailed(record: any, error: any): Promise<void> {
    await this.database.write(async () => {
      await record.update((entry: any) => {
        entry.status = SyncStatus.FAILED;
        entry.error = JSON.stringify(error);
      });
    });
  }

  private isFatalError(error: any): boolean {
    // Basic heuristic: 4xx errors are usually fatal (logic/validation errors), 
    // 5xx and network errors are transient.
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      return true;
    }
    return false;
  }
}