import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dtos/api-response.dto';
import { RequestContextService } from '../context/request-context.service';

/**
 * Interceptor to transform all successful responses into a standard envelope.
 * Ensures consistent API contract across microservices.
 */
@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(private readonly requestContext: RequestContextService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // If the data is already wrapped in ApiResponse (e.g. from manual return), return as is
        // However, checking instance might be tricky if DTO is an interface.
        // We assume controllers return the raw data entity/DTO.
        
        // Handle case where specific endpoint might want to bypass (e.g. metrics or health)
        // This logic can be enhanced with decorators if needed.

        return {
          success: true,
          data: data,
          error: null,
          correlationId: this.requestContext.requestId,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}