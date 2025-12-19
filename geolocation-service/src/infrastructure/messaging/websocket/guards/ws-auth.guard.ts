import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { IAuthService } from '../../../domain/ports/iauth-service.port.ts';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger = new Logger(WsAuthGuard.name);

  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    
    // Attempt to extract token from handshake auth or query params
    const token = 
      client.handshake.auth?.token || 
      client.handshake.headers?.authorization?.split(' ')[1] ||
      client.handshake.query?.token;

    if (!token) {
      this.logger.warn(`Connection attempt missing token. Socket ID: ${client.id}`);
      // Throwing WsException here triggers the ExceptionFilter
      throw new WsException('Unauthorized: Missing authentication token');
    }

    try {
      // Verify token via the port (which abstracts JWT validation)
      const user = await this.authService.verifyToken(token as string);
      
      if (!user) {
        throw new WsException('Unauthorized: Invalid token');
      }

      // Attach user context to the socket instance for use in Gateways
      // The type casting is necessary because Socket.IO's default type doesn't know about our user property
      (client as any).user = user;
      
      return true;
    } catch (error) {
      this.logger.error(`Token validation failed for socket ${client.id}: ${error instanceof Error ? error.message : String(error)}`);
      throw new WsException('Unauthorized: Invalid or expired token');
    }
  }
}