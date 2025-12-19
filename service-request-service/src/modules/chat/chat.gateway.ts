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
import { Logger, UseGuards, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Level 0 Imports
import { SendMessageDto } from './dtos/send-message.dto';

// Level 3 Imports
import { ChatService } from './chat.service';

// Shared Kernel Imports (Assumed)
import { WsJwtGuard } from '../../common/guards/ws-jwt.guard'; 

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*', // Restrict this in production environment variables
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
@UseGuards(WsJwtGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Handles new WebSocket connections.
   * Validates JWT token and initializes user session data.
   */
  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = this.extractToken(client);
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      // Verify token and attach user payload to socket
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      
      // Join user to a private room for direct notifications/messages
      const userRoom = `user:${payload.sub}`;
      await client.join(userRoom);
      
      this.logger.log(`Client connected: ${client.id} (User: ${payload.sub})`);
    } catch (error) {
      this.logger.warn(`Connection rejected: ${error.message}`);
      client.disconnect();
    }
  }

  /**
   * Handles client disconnection.
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Allows a client to join a specific ticket's chat room.
   * Performs authorization check via ChatService.
   */
  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { ticketId: string },
  ) {
    const userId = client.data.user?.sub;
    if (!userId) {
      throw new WsException('Unauthorized');
    }

    try {
      // Validate that the user (Consumer, Technician, or Admin) has rights to this ticket
      const canAccess = await this.chatService.validateAccess(payload.ticketId, userId);
      
      if (!canAccess) {
        throw new WsException('Forbidden: You do not have access to this ticket');
      }

      const roomName = `ticket:${payload.ticketId}`;
      await client.join(roomName);
      
      this.logger.log(`User ${userId} joined room ${roomName}`);
      
      return { event: 'joined_room', data: { ticketId: payload.ticketId } };
    } catch (error) {
      this.logger.error(`Join room failed: ${error.message}`);
      throw new WsException(error.message || 'Failed to join room');
    }
  }

  /**
   * Handles sending a message to a ticket room.
   * Persists message and broadcasts to other participants.
   */
  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SendMessageDto,
  ) {
    const userId = client.data.user?.sub;
    if (!userId) {
      throw new WsException('Unauthorized');
    }

    try {
      // 1. Re-validate access (Security In-Depth)
      const canAccess = await this.chatService.validateAccess(payload.ticketId, userId);
      if (!canAccess) {
        throw new WsException('Forbidden: Cannot send message to this ticket');
      }

      // 2. Persist message via Application Service
      const savedMessage = await this.chatService.saveMessage(
        payload.ticketId,
        userId,
        payload.content,
      );

      // 3. Broadcast to the specific ticket room
      const roomName = `ticket:${payload.ticketId}`;
      this.server.to(roomName).emit('new_message', savedMessage);
      
      // Return acknowledgment to sender
      return { status: 'sent', data: savedMessage };
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`, error.stack);
      throw new WsException('Failed to send message');
    }
  }

  /**
   * Handles typing indicators.
   */
  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { ticketId: string; isTyping: boolean },
  ) {
    const roomName = `ticket:${payload.ticketId}`;
    // Broadcast to everyone in room except sender
    client.to(roomName).emit('typing_status', {
      userId: client.data.user.sub,
      isTyping: payload.isTyping,
      ticketId: payload.ticketId
    });
  }

  /**
   * Helper to extract JWT from handshake
   */
  private extractToken(client: Socket): string | null {
    const authHeader = client.handshake.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      return authHeader.split(' ')[1];
    }
    const queryToken = client.handshake.query.token;
    if (typeof queryToken === 'string') {
      return queryToken;
    }
    return null;
  }
}