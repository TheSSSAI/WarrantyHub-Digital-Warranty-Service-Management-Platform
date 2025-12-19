import { ApiClient } from '../../infrastructure/api/ApiClient';
import { FCMService } from '../../infrastructure/notifications/FCMService';

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password?: string; // Initial step
  otp?: string;      // MFA step
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    role: string;
    name: string;
  };
}

/**
 * Manages user authentication lifecycle, including login, session management,
 * and device registration for push notifications.
 */
export class AuthService {
  // Key for secure storage
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(
    private readonly apiClient: ApiClient,
    private readonly fcmService: FCMService
  ) {}

  /**
   * Step 1: Initiate login (Username/Password).
   * Triggers OTP sending on the backend.
   */
  public async initiateLogin(credentials: Omit<LoginCredentials, 'otp'>): Promise<{ challengeId: string }> {
    try {
      const response = await this.apiClient.post<{ challengeId: string }>('/auth/login/initiate', credentials);
      return response.data;
    } catch (error) {
      console.error('[AuthService] Initiate Login Failed', error);
      throw error;
    }
  }

  /**
   * Step 2: Verify OTP and finalize session.
   */
  public async verifyOtpAndLogin(challengeId: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>('/auth/login/verify', { challengeId, otp });
      
      const { token, refreshToken } = response.data;

      // 1. Set configured token in API Client for subsequent requests
      this.apiClient.setAuthToken(token);

      // 2. Persist tokens (Note: In a real app, use SecureStore adapter here. 
      // For this scope, we assume API client might handle persistence or we pass it up).
      // this.secureStorage.setItem(AuthService.TOKEN_KEY, token);

      // 3. Register device for Push Notifications
      await this.registerDeviceForNotifications();

      return response.data;
    } catch (error) {
      console.error('[AuthService] Verify OTP Failed', error);
      throw error;
    }
  }

  /**
   * Clears session and unregisters device.
   */
  public async logout(): Promise<void> {
    try {
      // 1. Unregister FCM token to stop notifications
      const fcmToken = await this.fcmService.getToken();
      if (fcmToken) {
        await this.apiClient.post('/notifications/unregister', { token: fcmToken });
      }

      // 2. Clear API client state
      this.apiClient.clearAuthToken();
      
      // 3. Clear stored tokens (Pseudo-code as storage adapter isn't in L2 deps provided)
      // await this.secureStorage.removeItem(AuthService.TOKEN_KEY);

    } catch (error) {
      console.warn('[AuthService] Logout cleanup partial failure', error);
    }
  }

  /**
   * Checks if a valid session exists.
   */
  public async isAuthenticated(): Promise<boolean> {
    // Implementation would check secure storage for token validity
    // For this scope, we rely on the ApiClient state
    return !!this.apiClient.getAuthToken();
  }

  private async registerDeviceForNotifications(): Promise<void> {
    try {
      const fcmToken = await this.fcmService.getToken();
      if (fcmToken) {
        await this.apiClient.post('/notifications/register', { 
          token: fcmToken,
          platform: 'mobile' 
        });
      }
    } catch (error) {
      // Non-blocking error
      console.error('[AuthService] FCM Registration Failed', error);
    }
  }
}