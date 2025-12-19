import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

/**
 * Interface definition for the notification handler callbacks.
 * Allows the application layer to define behavior without coupling to FCM types directly.
 */
export interface NotificationHandlers {
  onMessageReceived: (message: any) => void;
  onNotificationOpenedApp: (message: any) => void;
  onTokenRefresh: (token: string) => void;
}

/**
 * Infrastructure service wrapper for Firebase Cloud Messaging (FCM).
 * Handles permission requests, token retrieval, and message listening.
 */
export class FCMService {
  private static instance: FCMService;
  private messageUnsubscriber: (() => void) | null = null;
  private tokenRefreshUnsubscriber: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): FCMService {
    if (!FCMService.instance) {
      FCMService.instance = new FCMService();
    }
    return FCMService.instance;
  }

  /**
   * Requests permission from the user to send push notifications.
   * Required for iOS; Android permissions are handled via manifest but checked here for API 33+.
   */
  public async requestPermission(): Promise<boolean> {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      console.log(`FCMService: Authorization status: ${authStatus}`);
      return enabled;
    } catch (error) {
      console.error('FCMService: Permission request failed', error);
      return false;
    }
  }

  /**
   * Retrieves the current FCM device token.
   * This token should be sent to the backend to target this device.
   */
  public async getFCMToken(): Promise<string | null> {
    try {
      // Ensure we have permission before asking for token
      const hasPermission = await messaging().hasPermission();
      if (hasPermission !== messaging.AuthorizationStatus.AUTHORIZED && 
          hasPermission !== messaging.AuthorizationStatus.PROVISIONAL) {
            console.warn('FCMService: Cannot get token without permission');
            return null;
      }

      const token = await messaging().getToken();
      console.log('FCMService: Token retrieved successfully');
      return token;
    } catch (error) {
      console.error('FCMService: Failed to get FCM token', error);
      return null;
    }
  }

  /**
   * Deletes the FCM token.
   * Useful during logout to prevent notifications being sent to the wrong user.
   */
  public async deleteToken(): Promise<void> {
    try {
      await messaging().deleteToken();
      console.log('FCMService: Token deleted');
    } catch (error) {
      console.error('FCMService: Failed to delete token', error);
    }
  }

  /**
   * Sets up listeners for foreground messages, background open events, and token refreshes.
   * 
   * @param handlers Object containing callback functions for different events
   */
  public initializeListeners(handlers: NotificationHandlers): void {
    // 1. Listen for messages while app is in Foreground
    this.messageUnsubscriber = messaging().onMessage(async (remoteMessage) => {
      console.log('FCMService: Foreground message received', remoteMessage);
      handlers.onMessageReceived(this.mapMessageToDomain(remoteMessage));
    });

    // 2. Listen for app opening from a background state notification tap
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('FCMService: App opened from background state', remoteMessage);
      handlers.onNotificationOpenedApp(this.mapMessageToDomain(remoteMessage));
    });

    // 3. Listen for app opening from a quit state notification tap
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('FCMService: App opened from quit state', remoteMessage);
          handlers.onNotificationOpenedApp(this.mapMessageToDomain(remoteMessage));
        }
      });

    // 4. Listen for token refresh
    this.tokenRefreshUnsubscriber = messaging().onTokenRefresh((token) => {
      console.log('FCMService: Token refreshed', token);
      handlers.onTokenRefresh(token);
    });
  }

  /**
   * Cleans up listeners to prevent memory leaks.
   */
  public removeListeners(): void {
    if (this.messageUnsubscriber) {
      this.messageUnsubscriber();
      this.messageUnsubscriber = null;
    }
    if (this.tokenRefreshUnsubscriber) {
      this.tokenRefreshUnsubscriber();
      this.tokenRefreshUnsubscriber = null;
    }
  }

  /**
   * Subscribes to a specific topic.
   */
  public async subscribeToTopic(topic: string): Promise<void> {
    try {
      await messaging().subscribeToTopic(topic);
    } catch (error) {
      console.error(`FCMService: Failed to subscribe to topic ${topic}`, error);
    }
  }

  /**
   * Unsubscribes from a specific topic.
   */
  public async unsubscribeFromTopic(topic: string): Promise<void> {
    try {
      await messaging().unsubscribeFromTopic(topic);
    } catch (error) {
      console.error(`FCMService: Failed to unsubscribe from topic ${topic}`, error);
    }
  }

  /**
   * Maps the raw FCM RemoteMessage to a simpler domain object.
   */
  private mapMessageToDomain(remoteMessage: FirebaseMessagingTypes.RemoteMessage): any {
    return {
      messageId: remoteMessage.messageId,
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      data: remoteMessage.data, // Custom data payload (e.g., jobId, type)
      sentTime: remoteMessage.sentTime,
    };
  }
}