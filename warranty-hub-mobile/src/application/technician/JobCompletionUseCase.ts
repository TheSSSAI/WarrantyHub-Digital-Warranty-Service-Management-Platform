import { OfflineQueueManager } from '../sync/OfflineQueueManager';
import { ApiClient } from '../../infrastructure/api/ApiClient';
import { WatermelonDatabase } from '../../infrastructure/persistence/WatermelonDatabase';
import { ISignatureService } from '../../features/technician/interfaces/ISignatureService';
import { SyncStatus } from '../../shared/types/enums';

export interface JobCompletionDTO {
  jobId: string;
  notes: string;
  partsUsed: Array<{ partId: string; quantity: number }>;
  signatureImage: string; // Base64 or local URI
  completedAt: string;
}

/**
 * Encapsulates the business logic for completing a job.
 * Handles the complexity of offline-first data, image handling, and queueing.
 */
export class JobCompletionUseCase {
  constructor(
    private readonly offlineQueue: OfflineQueueManager,
    private readonly database: WatermelonDatabase,
    private readonly apiClient: ApiClient,
    private readonly signatureService: ISignatureService
  ) {}

  /**
   * Executes the job completion workflow.
   */
  public async execute(completionData: JobCompletionDTO): Promise<void> {
    this.validateData(completionData);

    try {
      // 1. Process Signature (Compress/Save Local/Prepare Blob)
      const signatureBlobPath = await this.signatureService.saveSignatureLocally(
        completionData.jobId, 
        completionData.signatureImage
      );

      // 2. Update Local State (Optimistic UI Update)
      await this.updateLocalJobStatus(completionData.jobId, 'COMPLETED');

      // 3. Prepare Payload for Sync
      // Note: We might need to upload the image separately or as multipart.
      // For offline resilience, we queue the specialized upload logic.
      const syncPayload = {
        ...completionData,
        signaturePath: signatureBlobPath
      };

      // 4. Enqueue the mutation
      // The queue processor will handle reading the local image file and sending it.
      await this.offlineQueue.enqueue({
        endpoint: `/service-requests/${completionData.jobId}/complete`,
        method: 'POST',
        payload: syncPayload,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('[JobCompletionUseCase] Execution Failed', error);
      throw error;
    }
  }

  private validateData(data: JobCompletionDTO): void {
    if (!data.jobId) throw new Error('Job ID is required');
    if (!data.notes || data.notes.trim().length === 0) throw new Error('Completion notes are required');
    if (!data.signatureImage) throw new Error('Customer signature is required');
  }

  /**
   * Updates the local WatermelonDB record immediately so the UI reflects "Completed"
   * even if the network request hasn't fired yet.
   */
  private async updateLocalJobStatus(jobId: string, status: string): Promise<void> {
    const jobsCollection = this.database.getCollection('service_requests');
    
    await this.database.write(async () => {
      try {
        const job = await jobsCollection.find(jobId);
        await job.update((record: any) => {
          record.status = status;
          record.syncStatus = SyncStatus.PENDING; // Mark as dirty
        });
      } catch (err) {
        console.warn(`[JobCompletionUseCase] Local job ${jobId} not found for update`, err);
        // We continue even if local update fails, as the queue is the source of truth for the backend
      }
    });
  }
}