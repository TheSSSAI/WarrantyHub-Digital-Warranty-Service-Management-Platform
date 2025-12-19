import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { RequestContextService } from '../../common/context/request-context.service';

/**
 * Global Guard for JWT Authentication.
 * Extends the standard Passport JWT guard to provide consistent behavior
 * and integration with the RequestContext for distributed tracing.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly requestContext: RequestContextService) {
    super();
  }

  /**
   * Determines if the current request can proceed.
   * Validates the JWT and sets up the request context.
   *
   * @param context - The execution context of the request.
   * @returns boolean indicating access rights.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add logic here if public routes need to be bypassed via Reflector
    // For strict zero-trust, we assume secure-by-default unless explicitly public
    
    return super.canActivate(context);
  }

  /**
   * Handles the result of the passport strategy validation.
   * Populates the RequestContext with user details upon success.
   *
   * @param err - Error if authentication failed.
   * @param user - The user object returned by the strategy.
   * @param info - Additional info about the authentication process.
   * @param context - The execution context.
   * @returns The authenticated user object.
   * @throws UnauthorizedException if authentication fails.
   */
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): TUser {
    if (err || !user) {
      this.logger.warn(`Authentication failed: ${info?.message || err?.message}`);
      throw err || new UnauthorizedException('Invalid or expired authentication token');
    }

    // Set the user in the shared request context for use in services/repositories
    const req = context.switchToHttp().getRequest();
    this.requestContext.user = user;
    
    // Ensure correlation ID is propagated if not already set (though middleware should handle this)
    if (req.headers && req.headers['x-correlation-id']) {
      this.requestContext.requestId = req.headers['x-correlation-id'] as string;
    }

    return user;
  }
}