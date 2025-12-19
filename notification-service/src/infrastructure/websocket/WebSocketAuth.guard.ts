import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsArgumentsHost } from '@nestjs/common/interfaces';
import { Socket } from 'socket.io';

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  private readonly logger = new Logger(WebSocketAuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const wsContext: WsArgumentsHost = context.switchToWs();
    const client: Socket = wsContext.getClient();
    
    // Token is typically passed in query params for WebSockets: ?token=...
    // Or in Authorization header if the client supports custom headers during handshake
    const token = 
      this.extractTokenFromHeader(client) || 
      this.extractTokenFromQuery(client);

    if (!token) {
      this.logger.warn(`Connection attempt rejected: No token provided. Client ID: ${client.id}`);
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      // Attach user to the socket object for later use in Gateway
      // @ts-ignore - dynamic property assignment
      client.user = payload;
      return true;
    } catch (error) {
      this.logger.warn(`Connection attempt rejected: Invalid token. Client ID: ${client.id}. Error: ${error.message}`);
      throw new UnauthorizedException('Invalid authentication token');
    }
  }

  private extractTokenFromHeader(client: Socket): string | undefined {
    const authHeader = client.handshake.headers['authorization'];
    if (!authHeader) return undefined;
    
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromQuery(client: Socket): string | undefined {
    const token = client.handshake.query.token;
    return typeof token === 'string' ? token : undefined;
  }
}