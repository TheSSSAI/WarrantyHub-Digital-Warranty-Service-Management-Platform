import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { RequestContextService } from '../../common/context/request-context.service';

/**
 * Structured Logger Service that extends the default NestJS ConsoleLogger.
 * It automatically injects the Correlation ID from the Request Context into every log entry.
 * This ensures traceability across distributed microservices (REQ-PERF-001 Observability).
 */
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  constructor(context?: string) {
    super(context || 'Application');
  }

  /**
   * Formats the log message to include structured metadata.
   */
  protected formatMessage(message: any, context?: string): string {
    const correlationId = RequestContextService.getRequestId();
    const user = RequestContextService.getUser();
    
    const structuredLog = {
      timestamp: new Date().toISOString(),
      level: 'INFO', // Overridden by specific methods
      context: context || this.context,
      correlationId: correlationId || 'N/A',
      userId: user?.sub || 'anonymous',
      message: message,
    };

    // In production, this would be JSON.stringify(structuredLog)
    // For development readability, we might keep it text-based or partial JSON
    if (process.env.NODE_ENV === 'production') {
      return JSON.stringify(structuredLog);
    }
    
    return `[${structuredLog.correlationId}] ${message}`;
  }

  log(message: any, context?: string) {
    if (typeof message === 'object') {
      super.log({ ...message, correlationId: RequestContextService.getRequestId() }, context);
    } else {
      super.log(this.formatMessage(message, context), context);
    }
  }

  error(message: any, stack?: string, context?: string) {
    const correlationId = RequestContextService.getRequestId();
    const structuredError = {
      message,
      stack,
      correlationId,
      timestamp: new Date().toISOString(),
    };
    
    if (process.env.NODE_ENV === 'production') {
      super.error(JSON.stringify(structuredError), stack, context);
    } else {
      super.error(`[${correlationId}] ${message}`, stack, context);
    }
  }

  warn(message: any, context?: string) {
    super.warn(this.formatMessage(message, context), context);
  }

  debug(message: any, context?: string) {
    super.debug(this.formatMessage(message, context), context);
  }

  verbose(message: any, context?: string) {
    super.verbose(this.formatMessage(message, context), context);
  }
}