import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { IProductIntegrationPort, WarrantyValidationResult } from '../../modules/service-request/domain/ports/product-integration.port';

@Injectable()
export class HttpProductServiceAdapter implements IProductIntegrationPort {
  private readonly logger = new Logger(HttpProductServiceAdapter.name);
  private readonly productServiceUrl: string;
  private readonly timeoutDuration: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.productServiceUrl = this.configService.get<string>('PRODUCT_SERVICE_URL', 'http://product-service:3000');
    this.timeoutDuration = this.configService.get<number>('HTTP_TIMEOUT', 5000);
  }

  /**
   * Validates product warranty status and ownership via the external Product Service.
   * Implements the circuit breaker pattern implicitly via timeout and error handling.
   * 
   * @param productId The ID of the product to validate
   * @param userId The ID of the user claiming ownership
   * @returns WarrantyValidationResult containing validity status and details
   */
  async validateWarranty(productId: string, userId: string): Promise<WarrantyValidationResult> {
    const url = `${this.productServiceUrl}/api/v1/products/${productId}/warranty-status`;

    this.logger.debug(`Validating warranty for Product: ${productId}, User: ${userId}`);

    try {
      const { data } = await lastValueFrom(
        this.httpService.get(url, {
          params: { userId },
          timeout: this.timeoutDuration,
        }).pipe(
          timeout(this.timeoutDuration),
          catchError((error) => {
            this.handleHttpError(error, productId);
            throw error;
          }),
        ),
      );

      this.logger.debug(`Warranty validation successful for Product: ${productId}`);

      return {
        isValid: data.isValid,
        expiryDate: new Date(data.expiryDate),
        coverageType: data.coverageType,
        isOwner: data.isOwner,
      };

    } catch (error) {
      // In a production environment, this would likely interact with a formal Circuit Breaker
      // For this implementation, we ensure errors are logged and transformed to domain-understandable errors
      this.logger.error(`Failed to validate warranty for product ${productId}: ${error.message}`, error.stack);
      
      // Fallback or rethrow based on business rule strictness. 
      // Here we rethrow to block creation of invalid requests.
      throw new HttpException(
        'Unable to validate product warranty. Please try again later.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Centralized error handler for HTTP interactions
   */
  private handleHttpError(error: any, contextId: string): void {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      if (status === 404) {
        this.logger.warn(`Product not found: ${contextId}`);
        throw new HttpException(`Product ${contextId} not found`, HttpStatus.NOT_FOUND);
      }
      if (status === 403) {
        this.logger.warn(`User validation failed for product: ${contextId}`);
        throw new HttpException('User does not own this product', HttpStatus.FORBIDDEN);
      }
    } else if (error.request) {
      // The request was made but no response was received
      this.logger.error(`No response received from Product Service for ${contextId}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      this.logger.error(`Error setting up request for ${contextId}: ${error.message}`);
    }
  }
}