import { Catch, RpcExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

/**
 * Global Exception Filter for Microservices (Azure Service Bus).
 * Handles errors occurring during message processing.
 * 
 * Architecture: Infrastructure Layer (Level 0 - Messaging)
 */
@Catch()
export class ServiceBusExceptionFilter implements RpcExceptionFilter<any> {
  private readonly logger = new Logger(ServiceBusExceptionFilter.name);

  /**
   * Catches exceptions thrown during message handling.
   * Logs the error and re-throws it to ensure the message broker handles the retry policy or dead-lettering.
   * 
   * @param exception The exception thrown
   * @param host ArgumentsHost context
   * @returns Observable<any>
   */
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToRpc();
    const data = ctx.getData();
    
    // Detailed error logging for diagnostics
    this.logger.error(
      `Error processing message from Service Bus.`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    this.logger.warn(`Failed Message Payload: ${JSON.stringify(data)}`);

    // In Azure Service Bus via NestJS, throwing an exception triggers the retry mechanism 
    // configured on the subscription/queue. If max delivery count is exceeded, 
    // ASB automatically moves it to Dead Letter Queue (DLQ).
    
    // We wrap non-RpcExceptions in RpcException to ensure standard handling
    const rpcException = exception instanceof RpcException 
      ? exception 
      : new RpcException(exception instanceof Error ? exception.message : 'Unknown error');

    return throwError(() => rpcException);
  }
}