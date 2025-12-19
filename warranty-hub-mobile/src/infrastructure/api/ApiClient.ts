import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ENV } from '../../app/config/env';

/**
 * Generic API response wrapper to enforce consistent typing.
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * Standardized error object for application-wide error handling.
 */
export interface ApiError {
  code: string;
  message: string;
  status?: number;
  details?: any;
}

/**
 * Infrastructure service responsible for low-level HTTP communication.
 * Wraps Axios to provide a consistent interface, automatic authentication header injection,
 * and centralized error handling.
 */
export class ApiClient {
  private static instance: ApiClient;
  private client: AxiosInstance;
  private token: string | null = null;

  private constructor() {
    this.client = axios.create({
      baseURL: ENV.API_URL,
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Configures global request and response interceptors.
   */
  private setupInterceptors(): void {
    // Request Interceptor: Inject Auth Token
    this.client.interceptors.request.use(
      (config) => {
        if (this.token && config.headers) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Global Error Handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle global error scenarios like 401 Unauthorized
        if (error.response?.status === 401) {
          // In a real app, this might trigger a token refresh flow or event emission
          console.warn('ApiClient: Unauthorized access detected.');
        }
        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  /**
   * Sets the JWT token for authenticated requests.
   */
  public setAuthToken(token: string): void {
    this.token = token;
  }

  /**
   * Clears the JWT token, effectively logging out for API purposes.
   */
  public clearAuthToken(): void {
    this.token = null;
  }

  /**
   * Generic GET request.
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      throw error; // Already normalized by interceptor
    }
  }

  /**
   * Generic POST request.
   */
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generic PUT request.
   */
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generic PATCH request.
   */
  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generic DELETE request.
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Uploads a file using multipart/form-data.
   */
  public async uploadFile<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, formData, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Converts Axios errors into a standardized application error format.
   */
  private normalizeError(error: any): ApiError {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data as any;

      return {
        code: data?.code || 'HTTP_ERROR',
        message: data?.message || error.message,
        status: status,
        details: data?.details || error.response?.data,
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: error instanceof Error ? error.message : 'An unknown error occurred during the API request.',
      status: 0,
    };
  }
}