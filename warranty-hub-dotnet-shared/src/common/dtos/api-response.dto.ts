import { RequestContextService } from '../context/request-context.service';

/**
 * Standardized API Response Wrapper.
 * Ensures all microservices return data in a consistent structure.
 * 
 * @template T The type of the data payload.
 */
export class ApiResponse<T> {
  /**
   * Indicates if the operation was successful.
   */
  success: boolean;

  /**
   * The actual data payload. Null if error.
   */
  data: T | null;

  /**
   * Error details object, if success is false.
   */
  error: any | null;

  /**
   * Timestamp of the response.
   */
  timestamp: string;

  /**
   * Correlation ID for tracing the request.
   */
  correlationId: string;

  constructor(success: boolean, data: T | null, error: any = null) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.correlationId = RequestContextService.getRequestId() || '';
  }

  /**
   * Factory method for creating a success response.
   * @param data The data to return.
   */
  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(true, data, null);
  }

  /**
   * Factory method for creating an error response.
   * @param error The error object or message.
   */
  static fail<T>(error: any): ApiResponse<T> {
    return new ApiResponse<T>(false, null, error);
  }
}