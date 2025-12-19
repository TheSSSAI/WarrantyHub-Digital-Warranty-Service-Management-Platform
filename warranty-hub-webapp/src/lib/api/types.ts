/**
 * Standard API Response envelope structure.
 * Wraps all successful responses from the API Gateway.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  traceId?: string;
}

/**
 * Standard Paginated Response structure.
 * Used for lists and grids (e.g., Product List, Service Requests).
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

/**
 * Standard API Error structure.
 * Consistent error handling across the application.
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  timestamp: string;
  path?: string;
}

/**
 * Request configuration for the API client.
 * Allows overriding headers, params, and timeout per request.
 */
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  signal?: AbortSignal;
  requiresAuth?: boolean;
}

/**
 * Interface for the HTTP Client wrapper.
 * Ensures dependency inversion for the API layer.
 */
export interface IWebGatewayClient {
  /**
   * Performs a GET request.
   * @param url - The endpoint URL (relative to base URL).
   * @param config - Optional request configuration.
   */
  get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;

  /**
   * Performs a POST request.
   * @param url - The endpoint URL.
   * @param data - The request payload.
   * @param config - Optional request configuration.
   */
  post<T>(url: string, data: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;

  /**
   * Performs a PUT request.
   * @param url - The endpoint URL.
   * @param data - The request payload.
   * @param config - Optional request configuration.
   */
  put<T>(url: string, data: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;

  /**
   * Performs a PATCH request.
   * @param url - The endpoint URL.
   * @param data - The request payload.
   * @param config - Optional request configuration.
   */
  patch<T>(url: string, data: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;

  /**
   * Performs a DELETE request.
   * @param url - The endpoint URL.
   * @param config - Optional request configuration.
   */
  delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;

  /**
   * Performs a multipart/form-data upload.
   * @param url - The endpoint URL.
   * @param formData - The FormData object containing files and fields.
   * @param config - Optional request configuration.
   */
  upload<T>(url: string, formData: FormData, config?: RequestConfig): Promise<ApiResponse<T>>;
}

/**
 * Common sorting direction.
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Common filter parameters for list endpoints.
 */
export interface BaseFilterParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: SortDirection;
  search?: string;
}