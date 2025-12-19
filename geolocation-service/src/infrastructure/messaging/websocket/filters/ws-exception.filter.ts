import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const error = exception instanceof WsException 
      ? exception.getError() 
      : exception instanceof Error 
        ? { message: exception.message, name: exception.name }
        : { message: 'Internal server error' };

    const details = exception instanceof WsException ? exception.message : 'Unknown error occurred';

    // Standardized error response format for WebSocket clients
    const response = {
      event: 'error',
      data: {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error,
        details: details,
      }
    };

    // Emit the error event back to the specific client
    client.emit('exception', response);
    
    // Log unexpected system errors for observability
    if (!(exception instanceof WsException)) {
      console.error(`[WsExceptionFilter] Unexpected error for client ${client.id}:`, exception);
    }
  }
}