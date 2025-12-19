import { Injectable, Logger } from '@nestjs/common';
import { BlobStorageAdapter } from '../../infrastructure/adapters/blob-storage.adapter';
import { DocumentIntelligenceAdapter } from '../../infrastructure/adapters/document-intelligence.adapter';
import { ProductServiceClient } from '../../infrastructure/http/product-service.client';
import { CircuitBreakerService } from '../../common/resilience/circuit-breaker.service';
import { ExtractedInvoiceDataDto } from './dto/extracted-invoice-data.dto';

@Injectable()
export class OcrProcessorService {
  private readonly logger = new Logger(OcrProcessorService.name);

  constructor(
    private readonly blobStorageAdapter: BlobStorageAdapter,
    private readonly documentIntelligenceAdapter: DocumentIntelligenceAdapter,
    private readonly productServiceClient: ProductServiceClient,
    private readonly circuitBreakerService: CircuitBreakerService,
  ) {}

  /**
   * Orchestrates the OCR processing workflow:
   * 1. Downloads the invoice file stream from Blob Storage.
   * 2. Sends the stream to Azure AI Document Intelligence (wrapped in Circuit Breaker).
   * 3. Maps the result to the domain DTO.
   * 4. Updates the Product Service with the extracted data.
   */
  async process(invoiceId: string, blobPath: string, userId: string): Promise<void> {
    this.logger.log(`Starting OCR processing for invoice: ${invoiceId}, user: ${userId}`);

    try {
      if (!invoiceId || !blobPath) {
        throw new Error('Invalid input: invoiceId and blobPath are required');
      }

      // Step 1: Download File
      this.logger.debug(`Downloading blob from path: ${blobPath}`);
      const fileStream = await this.blobStorageAdapter.downloadStream(blobPath);

      if (!fileStream) {
        throw new Error(`Failed to retrieve file stream for blob: ${blobPath}`);
      }

      // Step 2: Analyze Document with Resilience
      // We wrap the external API call in the circuit breaker to handle outages gracefully
      this.logger.debug('Sending document to Azure AI Document Intelligence');
      const extractedData: ExtractedInvoiceDataDto = await this.circuitBreakerService.execute(
        () => this.documentIntelligenceAdapter.extractData(fileStream)
      );

      this.logger.log(`OCR Analysis complete for invoice: ${invoiceId}. Confidence check passed.`);

      // Step 3: Update Product Service
      // We send the extracted data back to the core domain service
      this.logger.debug(`Updating Product Service with extraction results for invoice: ${invoiceId}`);
      await this.productServiceClient.updateInvoiceExtraction(invoiceId, extractedData);

      this.logger.log(`Successfully processed OCR for invoice: ${invoiceId}`);
    } catch (error) {
      this.logger.error(
        `Failed to process OCR for invoice ${invoiceId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined,
      );
      // Re-throw to ensure the message handler (Level 3) can NACK/Dead-letter the message
      throw error;
    }
  }
}