import { HttpMethod, SyncStatus } from '../../types/enums';

/**
 * Data Transfer Object representing a queued offline action.
 * This DTO is used to hydrate/dehydrate the 'offline_action_queue' table in WatermelonDB.
 */
export class SyncActionDto {
  public readonly id: string;
  public readonly endpoint: string;
  public readonly method: HttpMethod;
  public readonly payload: string; // JSON stringified payload
  public readonly headers: string; // JSON stringified headers
  public readonly createdAt: number;
  public readonly retryCount: number;
  public readonly status: SyncStatus;

  constructor(
    id: string,
    endpoint: string,
    method: HttpMethod,
    payload: object | string,
    headers: object | string = {},
    createdAt: number = Date.now(),
    retryCount: number = 0,
    status: SyncStatus = SyncStatus.PENDING
  ) {
    this.id = id;
    this.endpoint = endpoint;
    this.method = method;
    this.payload = typeof payload === 'string' ? payload : JSON.stringify(payload);
    this.headers = typeof headers === 'string' ? headers : JSON.stringify(headers);
    this.createdAt = createdAt;
    this.retryCount = retryCount;
    this.status = status;

    this.validate();
  }

  /**
   * Validates the consistency of the sync action.
   */
  private validate(): void {
    if (!this.id) throw new Error('SyncAction requires a valid ID.');
    if (!this.endpoint) throw new Error('SyncAction requires a valid API endpoint.');
    if (!Object.values(HttpMethod).includes(this.method)) {
      throw new Error(`Invalid HTTP Method: ${this.method}`);
    }
    
    // Ensure payload is valid JSON
    try {
      JSON.parse(this.payload);
    } catch (e) {
      throw new Error('SyncAction payload must be a valid JSON string.');
    }
  }

  /**
   * Parses the JSON payload back into an object for API consumption.
   */
  public getParsedPayload<T>(): T {
    return JSON.parse(this.payload) as T;
  }

  /**
   * Parses the JSON headers back into an object.
   */
  public getParsedHeaders(): Record<string, string> {
    return JSON.parse(this.headers);
  }

  /**
   * Returns a new instance with incremented retry count.
   */
  public incrementRetry(): SyncActionDto {
    return new SyncActionDto(
      this.id,
      this.endpoint,
      this.method,
      this.payload,
      this.headers,
      this.createdAt,
      this.retryCount + 1,
      this.status
    );
  }

  /**
   * Returns a new instance with updated status.
   */
  public updateStatus(newStatus: SyncStatus): SyncActionDto {
    return new SyncActionDto(
      this.id,
      this.endpoint,
      this.method,
      this.payload,
      this.headers,
      this.createdAt,
      this.retryCount,
      newStatus
    );
  }
}