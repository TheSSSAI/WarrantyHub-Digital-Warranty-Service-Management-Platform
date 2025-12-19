import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestContextService } from '../../common/context/request-context.service';

/**
 * Middleware that inspects incoming requests for a Correlation ID header (`x-correlation-id`).
 * If present, it uses it; otherwise, it generates a new UUID.
 * It sets the ID in the RequestContext for use throughout the request lifecycle (logging, auditing).
 */
@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  private readonly CORRELATION_HEADER = 'x-correlation-id';

  use(req: Request, res: Response, next: NextFunction) {
    const existingId = req.headers[this.CORRELATION_HEADER];
    const correlationId = Array.isArray(existingId) 
      ? existingId[0] 
      : existingId || uuidv4();

    // Set header on response so client can trace it
    res.setHeader(this.CORRELATION_HEADER, correlationId);

    // Initialize the Request Context with this ID
    RequestContextService.runWithContext({ correlationId }, () => {
      next();
    });
  }
}