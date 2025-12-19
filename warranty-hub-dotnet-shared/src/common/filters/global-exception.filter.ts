import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../../observability/services/logger.service';
import { RequestContextService } from '../context/request-context.service';
import { ApiResponse } from '../dtos/api-response.dto';

/**
 * Global Exception Filter to standardize error responses across all microservices.
 * Complies with RFC 7807 principles and wraps errors in the standard ApiResponse DTO.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly requestContext: RequestContextService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal Server Error' };

    let errorMessage = 'An unexpected error occurred';
    let errors = null;

    if (typeof exceptionResponse === 'string') {
      errorMessage = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const respObj = exceptionResponse as any;
      errorMessage = respObj.message || errorMessage;
      errors = respObj.errors || respObj.error || null;
      
      // Handle array of validation errors (class-validator style)
      if (Array.isArray(respObj.message)) {
        errorMessage = 'Validation Failed';
        errors = respObj.message;
      }
    }

    const correlationId = this.requestContext.requestId;

    // Log the error with full context
    this.logger.error(`Exception caught in global filter: ${errorMessage}`, {
      statusCode: status,
      path: request.url,
      method: request.method,
      correlationId,
      stack: exception instanceof Error ? exception.stack : undefined,
      validationErrors: errors,
    });

    const apiResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: {
        code: status,
        message: errorMessage,
        details: errors,
      },
      correlationId,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(apiResponse);
  }
}