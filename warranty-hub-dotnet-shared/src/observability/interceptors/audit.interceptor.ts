import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestContextService } from '../../common/context/request-context.service';
import { LoggerService } from '../services/logger.service';

/**
 * Interceptor to log critical actions for auditing purposes.
 * Implements REQ-AUDIT-001 by automatically recording mutations.
 *
 * It monitors HTTP requests and logs details about the actor, action, and outcome.
 * Primarily targets state-changing methods (POST, PUT, PATCH, DELETE).
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  constructor(
    private readonly requestContext: RequestContextService,
    private readonly loggerService: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, ip } = req;
    
    // We primarily audit mutations. GET requests are usually access logs, not audit logs.
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    return next.handle().pipe(
      tap({
        next: (data) => {
          if (isMutation) {
            this.logAudit(method, url, ip, 'SUCCESS', data);
          }
        },
        error: (error) => {
          // We audit failed mutations as well for security monitoring
          if (isMutation) {
            this.logAudit(method, url, ip, 'FAILURE', undefined, error);
          }
        },
      }),
    );
  }

  private logAudit(
    method: string,
    url: string,
    ip: string,
    outcome: 'SUCCESS' | 'FAILURE',
    responseData?: any,
    error?: any,
  ) {
    const user = this.requestContext.user;
    const userId = user?.id || 'anonymous';
    const correlationId = this.requestContext.requestId;

    const auditEntry = {
      event: 'AUDIT_LOG',
      timestamp: new Date().toISOString(),
      correlationId,
      actor: {
        userId,
        role: user?.role,
        ip,
      },
      action: {
        method,
        endpoint: url,
      },
      outcome,
      resourceId: responseData?.id || responseData?.data?.id, // Attempt to capture ID of created/modified resource
      error: error?.message,
    };

    // Use the structured logger service to emit the audit record
    this.loggerService.log('Audit Record Created', auditEntry);
  }
}