import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError,
  InternalAxiosRequestConfig 
} from 'axios';
import { useGlobalStore } from '../store/globalStore';

/**
 * Standardized API Response wrapper to match Backend DTOs.
 */
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  traceId?: string;
}

/**
 * Configuration options for API requests.
 */
export interface RequestConfig extends AxiosRequestConfig {
  requiresAuth?: boolean;
  skipErrorHandling?: boolean;
}

/**
 * Enterprise-grade HTTP Client wrapper using Axios.
 * Handles token injection, centralized error processing, and response standardization.
 */
class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;

  private constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000, // 30s timeout
    });

    this.setupInterceptors();
  }

  /**
   * Singleton accessor.
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Configures Request and Response interceptors.
   */
  private setupInterceptors(): void {
    // REQUEST INTERCEPTOR
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Access token from Zustand store (localStorage)
        // Note: For Server Components, tokens should be passed via arguments or cookies
        const state = useGlobalStore.getState();
        const token = state.accessToken;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add correlation ID for tracing
        const correlationId = crypto.randomUUID();
        if (config.headers) {
          config.headers['X-Correlation-ID'] = correlationId;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // RESPONSE INTERCEPTOR
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Return the data directly if it matches our standard envelope, 
        // or wrap it if it's a raw response
        return response;
      },
      async (error: AxiosError) => {
        const state = useGlobalStore.getState();
        
        if (error.response) {
          const { status, data } = error.response;

          // Handle 401 Unauthorized
          if (status === 401) {
            state.addNotification({
              type: 'error',
              title: 'Session Expired',
              message: 'Please log in again to continue.',
            });
            state.logout();
            // In a browser environment, redirect to login
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
          }
          
          // Handle 403 Forbidden
          if (status === 403) {
            state.addNotification({
              type: 'error',
              title: 'Access Denied',
              message: 'You do not have permission to perform this action.',
            });
          }

          // Handle 500+ Server Errors
          if (status >= 500) {
            state.addNotification({
              type: 'error',
              title: 'Server Error',
              message: 'An unexpected error occurred. Please try again later.',
            });
          }
        } else if (error.request) {
          // Network error (no response)
          state.addNotification({
            type: 'error',
            title: 'Network Error',
            message: 'Unable to reach the server. Please check your connection.',
          });
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  /**
   * Normalizes Axios errors into a consistent format.
   */
  private normalizeError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'An unknown error occurred';
      return new Error(message);
    }
    return new Error('An unexpected error occurred');
  }

  /**
   * Generic GET method.
   */
  public async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * Generic POST method.
   */
  public async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * Generic PUT method.
   */
  public async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * Generic PATCH method.
   */
  public async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * Generic DELETE method.
   */
  public async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * Specialized method for file uploads (Multipart/Form-Data).
   * Used for invoices, product images, etc.
   */
  public async upload<T>(url: string, file: File, additionalData?: Record<string, any>, config?: RequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    }

    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
}

// Export a singleton instance for use throughout the application
export const apiClient = ApiClient.getInstance();