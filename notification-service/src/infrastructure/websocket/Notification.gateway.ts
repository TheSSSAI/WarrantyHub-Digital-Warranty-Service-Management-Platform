import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketAuthGuard } from './WebSocketAuth.guard';

// Interface for the user attached to the socket (from JWT)
interface AuthenticatedSocket extends Socket {
  user?: {
    sub: string; // User ID
    email?: string;
    roles?: string[];
  };
}

@WebSocketGateway({
  cors: {
    origin: '*', // Should be configured strictly in production
  },
  namespace: 'notifications',
  path: '/ws'
})
@UseGuards(WebSocketAuthGuard)
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationGateway.name);

  // Map to track active connections per user if needed for debugging metrics
  // private activeConnections = new Map<string, number>();

  async handleConnection(client: AuthenticatedSocket) {
    // Note: The Guard runs before this method. However, sometimes Guards 
    // on the class level for Gateways behave differently than HTTP controllers.
    // If the guard fails, the connection is usually terminated before reaching here.
    // We double check or simply utilize the user object.
    
    try {
      // The user object is attached by the WebSocketAuthGuard
      const userId = client.user?.sub;

      if (!userId) {
        this.logger.warn(`Client ${client.id} connected but no user ID found. Disconnecting.`);
        client.disconnect();
        return;
      }

      // Join a room specific to the user
      const roomName = `user:${userId}`;
      await client.join(roomName);
      
      this.logger.log(`Client ${client.id} connected and joined room ${roomName}`);
    } catch (error) {
      this.logger.error(`Error during connection handling for client ${client.id}: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    const userId = client.user?.sub || 'unknown';
    this.logger.log(`Client ${client.id} (User: ${userId}) disconnected`);
  }

  /**
   * Listens for internal application events emitted by the NotificationDispatcherService
   * or other services when an in-app notification needs to be delivered.
   * 
   * This decouples the Application Layer (Dispatcher) from the Infrastructure Layer (Gateway).
   */
  @OnEvent('notification.dispatch.in-app')
  handleInAppNotificationEvent(payload: { userId: string; data: any }) {
    this.logger.debug(`Received internal event to push in-app notification to user ${payload.userId}`);
    this.sendToUser(payload.userId, payload.data);
  }

  /**
   * Sends a notification payload to a specific user via their private room.
   * 
   * @param userId The ID of the user to receive the notification
   * @param payload The data to send
   */
  private sendToUser(userId: string, payload: any): void {
    const roomName = `user:${userId}`;
    this.server.to(roomName).emit('notification', payload);
    this.logger.debug(`Emitted 'notification' event to room ${roomName}`);
  }
}