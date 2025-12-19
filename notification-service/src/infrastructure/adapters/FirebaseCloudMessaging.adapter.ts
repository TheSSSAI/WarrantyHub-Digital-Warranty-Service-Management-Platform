import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { INotificationProvider, ProviderSendResult } from '../../core/ports/INotificationProvider.interface';
import { NotificationPayload } from '../../application/dtos/NotificationPayload';

/**
 * Firebase Cloud Messaging (FCM) Adapter
 * Implements the INotificationProvider port for Mobile Push Notifications.
 * Handles initialization of Firebase Admin SDK and batch sending logic.
 * 
 * Architectural Layer: Infrastructure (Adapter)
 * Dependency Level: 2
 */
@Injectable()
export class FirebaseCloudMessagingAdapter implements INotificationProvider, OnModuleInit {
  private readonly logger = new Logger(FirebaseCloudMessagingAdapter.name);
  private firebaseApp: admin.app.App;

  constructor(private readonly configService: ConfigService) {}

  /**
   * Initializes the Firebase Admin SDK using configuration credentials.
   * This is called once when the module loads.
   */
  onModuleInit() {
    const projectId = this.configService.get<string>('firebase.projectId');
    const clientEmail = this.configService.get<string>('firebase.clientEmail');
    const privateKey = this.configService.get<string>('firebase.privateKey')?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      this.logger.error('Missing Firebase configuration. FCM Adapter will not function correctly.');
      return;
    }

    try {
      if (!admin.apps.length) {
        this.firebaseApp = admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
        this.logger.log('Firebase Admin SDK initialized successfully.');
      } else {
        this.firebaseApp = admin.app();
      }
    } catch (error) {
      this.logger.error('Failed to initialize Firebase Admin SDK', error);
      throw error;
    }
  }

  /**
   * Sends a push notification to one or multiple device tokens.
   * 
   * @param recipients - A single FCM token or an array of FCM tokens.
   * @param payload - The notification content (title, body, data).
   * @returns Promise<ProviderSendResult> containing success/failure counts and invalid tokens.
   */
  async send(recipients: string | string[], payload: NotificationPayload): Promise<ProviderSendResult> {
    const tokens = Array.isArray(recipients) ? recipients : [recipients];
    
    if (tokens.length === 0) {
      this.logger.warn('No recipients provided for FCM send.');
      return { successCount: 0, failureCount: 0, failedRecipients: [] };
    }

    const message: admin.messaging.MulticastMessage = {
      tokens: tokens,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: this.flattenDataPayload(payload.data),
      android: {
        priority: 'high',
        notification: {
          icon: 'ic_notification',
          color: '#000000',
        },
      },
      apns: {
        payload: {
          aps: {
            alert: {
              title: payload.title,
              body: payload.body,
            },
            badge: 1,
            sound: 'default',
            'content-available': 1,
          },
        },
      },
    };

    try {
      this.logger.debug(`Sending FCM multicast message to ${tokens.length} tokens.`);
      const batchResponse = await this.firebaseApp.messaging().sendEachForMulticast(message);
      
      return this.processBatchResponse(tokens, batchResponse);
    } catch (error) {
      this.logger.error('Critical failure sending FCM messages', error);
      // If the entire batch fails due to a network/auth error, mark all as failed
      return {
        successCount: 0,
        failureCount: tokens.length,
        failedRecipients: tokens,
      };
    }
  }

  /**
   * Processes the batch response from Firebase to identify which specific tokens failed
   * and which ones are invalid (and should thus be removed from the database).
   */
  private processBatchResponse(tokens: string[], response: admin.messaging.BatchResponse): ProviderSendResult {
    const failedRecipients: string[] = [];
    const invalidTokens: string[] = [];

    if (response.failureCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const token = tokens[idx];
          failedRecipients.push(token);
          
          const errorCode = resp.error?.code;
          this.logger.warn(`FCM Send Error for token [${token.substring(0, 10)}...]: ${errorCode} - ${resp.error?.message}`);

          // Identify tokens that should be cleaned up
          if (
            errorCode === 'messaging/invalid-registration-token' ||
            errorCode === 'messaging/registration-token-not-registered'
          ) {
            invalidTokens.push(token);
          }
        }
      });
    }

    // Note: The 'failedRecipients' returned here include transient failures. 
    // The calling service might want to separate 'retryable' from 'terminal' failures.
    // For this implementation, we return all failures but log specific invalid ones for potential cleanup.

    return {
      successCount: response.successCount,
      failureCount: response.failureCount,
      failedRecipients: failedRecipients,
      invalidRecipients: invalidTokens, // Extension to interface allowing cleanup
    };
  }

  /**
   * Firebase data payload values must be strings.
   * This helper converts nested objects or numbers to string representations.
   */
  private flattenDataPayload(data: Record<string, any> | undefined): Record<string, string> {
    if (!data) return {};
    
    const flattened: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object') {
        flattened[key] = JSON.stringify(value);
      } else {
        flattened[key] = String(value);
      }
    }
    return flattened;
  }
}