import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExtractedInvoiceDataDto } from '../../workers/ocr/dto/extracted-invoice-data.dto';
import { AxiosError } from 'axios';

/**
 * HTTP Client wrapper for communicating with the internal Product Service API.
 * Handles the callbacks for OCR results and triggering scheduled jobs.
 */
@Injectable()
export class ProductServiceClient {
  private readonly logger = new Logger(ProductServiceClient.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'PRODUCT_SERVICE_INTERNAL_URL',
    );
    this.apiKey = this.configService.get<string>('INTERNAL_API_KEY');

    if (!this.baseUrl) {
      this.logger.warn(
        'PRODUCT_SERVICE_INTERNAL_URL is not defined. Inter-service calls will fail.',
      );
    }
  }

  /**
   * Callbacks to the Product Service with the results of the OCR extraction.
   * Implements Sequence 377 (Update Invoice).
   * @param invoiceId The unique ID of the invoice being processed
   * @param data The extracted data DTO
   */
  public async updateInvoiceExtraction(
    invoiceId: string,
    data: ExtractedInvoiceDataDto,
  ): Promise<void> {
    const url = `${this.baseUrl}/internal/v1/invoices/${invoiceId}/extraction-result`;

    this.logger.log(`Sending OCR results for invoice ${invoiceId} to ${url}`);

    try {
      await lastValueFrom(
        this.httpService
          .put(url, data, {
            headers: {
              'X-Internal-Api-Key': this.apiKey,
              'Content-Type': 'application/json',
            },
            timeout: 5000, // 5s timeout
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.handleAxiosError(error, 'updateInvoiceExtraction');
              throw error;
            }),
          ),
      );

      this.logger.log(
        `Successfully updated invoice ${invoiceId} with extracted data.`,
      );
    } catch (error) {
      // Error logging handled in pipe/catchError or above
      throw error;
    }
  }

  /**
   * Triggers the expiration process for pending product transfers.
   * Implements Sequence 382 (Trigger Job Execution).
   */
  public async triggerTransferExpirationProcess(): Promise<{
    expiredCount: number;
  }> {
    const url = `${this.baseUrl}/internal/v1/transfers/expire-pending`;

    this.logger.log(`Triggering transfer expiration job at ${url}`);

    try {
      const response = await lastValueFrom(
        this.httpService
          .post(
            url,
            {},
            {
              headers: {
                'X-Internal-Api-Key': this.apiKey,
              },
              timeout: 10000, // Longer timeout for batch processing
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.handleAxiosError(error, 'triggerTransferExpirationProcess');
              throw error;
            }),
          ),
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Standardized error handling for Axios requests.
   */
  private handleAxiosError(error: AxiosError, context: string): void {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      this.logger.error(
        `[${context}] API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
      );
      throw new HttpException(
        error.response.data || 'External Service Error',
        error.response.status,
      );
    } else if (error.request) {
      // The request was made but no response was received
      this.logger.error(`[${context}] No response received from server.`);
      throw new HttpException(
        'Service Unavailable / Timeout',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      this.logger.error(`[${context}] Request setup error: ${error.message}`);
      throw new HttpException(
        'Internal Client Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}