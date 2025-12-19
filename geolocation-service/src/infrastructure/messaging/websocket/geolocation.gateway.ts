import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards, UseFilters, Logger } from '@nestjs/common';
import { LocationTrackingService } from '../../../application/services/location-tracking.service';
import { SubscriptionManagerService } from '../../../application/services/subscription-manager.service';
import { IAuthService } from '../../../domain/ports/iauth-service.port';
import { LocationUpdateDto } from '../../websocket/dto/location-update.dto';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { WsExceptionFilter } from './filters/ws-exception.filter';

@WebSocketGateway({
  namespace: 'geolocation',
  cors: {
    origin: '*', // Should be configured strictly in production via env vars
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
@UseFilters(new WsExceptionFilter())
export class GeolocationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(GeolocationGateway.name);

  constructor(
    private readonly locationTrackingService: LocationTrackingService,
    private readonly subscriptionManagerService: SubscriptionManagerService,
    // Injecting via token usually, assuming 'IAuthService' token is defined or using abstract class
    private readonly authService: IAuthService,
  ) {}

  /**
   * Handles incoming WebSocket connections.
   * Performs authentication via JWT token present in the handshake query or headers.
   */
  async handleConnection(client: Socket): Promise<void> {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.split(' ')[1] ||
        client.handshake.query?.token;

      if (!token) {
        this.logger.warn(`Connection attempt without token from ${client.id}`);
        client.disconnect();
        return;
      }

      const user = await this.authService.verifyToken(token as string);
      
      if (!user) {
        this.logger.warn(`Invalid token for client ${client.id}`);
        client.disconnect();
        return;
      }

      // Store user info in socket data for later use in guards/handlers
      client.data.user = user;
      this.logger.log(`Client connected: ${client.id}, User: ${user.id}, Role: ${user.role}`);
    } catch (error) {
      this.logger.error(`Connection error for client ${client.id}: ${error.message}`);
      client.disconnect();
    }
  }

  /**
   * Handles client disconnection.
   * Performs cleanup of active sessions if necessary.
   */
  async handleDisconnect(client: Socket): Promise<void> {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    // If a technician disconnects abruptly, we might want to mark them offline or handle session cleanup
    // However, Socket.IO rooms are automatically cleaned up on disconnect.
    // Explicit business logic cleanup (e.g. notify customer) is delegated to the service layer if needed.
    if (client.data.user && client.data.user.role === 'technician') {
        // Potential extension: await this.locationTrackingService.handleTechnicianDisconnect(client.data.user.id);
    }
  }

  /**
   * Technicians call this to broadcast their location.
   * Validates the payload and delegates to the application service.
   */
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('update_location')
  async handleLocationUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: LocationUpdateDto,
  ): Promise<void> {
    const user = client.data.user;

    // Security check: Ensure the authenticated user is the technician claiming to update the location
    // Alternatively, we rely on the user ID from the token, ignoring any user ID in the payload if present
    if (user.role !== 'technician') {
        throw new WsException('Only technicians can broadcast location updates');
    }

    try {
      await this.locationTrackingService.processUpdate(user.id, payload);
    } catch (error) {
      this.logger.error(`Failed to process location update: ${error.message}`);
      throw new WsException('Failed to process location update');
    }
  }

  /**
   * Customers or Admins call this to subscribe to a specific job's location stream.
   * Joins the socket to the specific job room.
   */
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('join_job_room')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { jobId: string },
  ): Promise<{ event: 'joined_room'; data: { jobId: string; success: boolean } }> {
    if (!body || !body.jobId) {
      throw new WsException('Job ID is required to join a room');
    }

    const user = client.data.user;

    try {
      // Validate that this user is authorized to view this job
      const canAccess = await this.subscriptionManagerService.validateAccess(user.id, user.role, body.jobId);
      
      if (!canAccess) {
        throw new WsException('Unauthorized access to this job location stream');
      }

      const roomName = `job_${body.jobId}`;
      await client.join(roomName);
      this.logger.debug(`User ${user.id} joined room ${roomName}`);

      return {
        event: 'joined_room',
        data: { jobId: body.jobId, success: true },
      };
    } catch (error) {
      this.logger.error(`Error joining room: ${error.message}`);
      throw new WsException(error.message || 'Failed to join room');
    }
  }

  /**
   * Allows clients to explicitly leave a tracking room.
   */
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('leave_job_room')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { jobId: string },
  ): Promise<void> {
    if (body && body.jobId) {
      const roomName = `job_${body.jobId}`;
      await client.leave(roomName);
      this.logger.debug(`User ${client.data.user?.id} left room ${roomName}`);
    }
  }
}