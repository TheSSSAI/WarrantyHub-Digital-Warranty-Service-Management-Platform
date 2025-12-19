import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from '@azure/ai-form-recognizer';
import { IOcrProvider } from '../../workers/ocr/interfaces/ocr-provider.interface';
import { ExtractedInvoiceDataDto } from '../../workers/ocr/dto/extracted-invoice-data.dto';

/**
 * Adapter for Azure AI Document Intelligence (formerly Form Recognizer).
 * Implements the IOcrProvider interface to decouple the domain worker from specific Azure SDKs.
 * Handles the communication with the Azure OCR service.
 */
@Injectable()
export class DocumentIntelligenceAdapter implements IOcrProvider {
  private readonly logger = new Logger(DocumentIntelligenceAdapter.name);
  private client: DocumentAnalysisClient;

  constructor(private readonly configService: ConfigService) {
    this.initializeClient();
  }

  private initializeClient() {
    const endpoint = this.configService.get<string>(
      'AZURE_DOC_INTELLIGENCE_ENDPOINT',
    );
    const key = this.configService.get<string>('AZURE_DOC_INTELLIGENCE_KEY');

    if (!endpoint || !key) {
      this.logger.error(
        'Azure Document Intelligence configuration is missing. OCR processing will fail.',
      );
      throw new InternalServerErrorException('OCR Configuration missing');
    }

    this.client = new DocumentAnalysisClient(
      endpoint,
      new AzureKeyCredential(key),
    );
  }

  /**
   * Extracts invoice data from a file stream using the 'prebuilt-invoice' model.
   * @param fileStream The readable stream of the invoice file (PDF/Image)
   * @returns ExtractedInvoiceDataDto with identified fields
   */
  public async extractData(
    fileStream: NodeJS.ReadableStream,
  ): Promise<ExtractedInvoiceDataDto> {
    this.logger.log('Starting document analysis with Azure AI...');

    try {
      // Use the prebuilt-invoice model provided by Azure
      const poller = await this.client.beginAnalyzeDocument(
        'prebuilt-invoice',
        fileStream,
        {
          onProgress: ({ status }) => {
            this.logger.debug(`Analysis status: ${status}`);
          },
        },
      );

      const result = await poller.pollUntilDone();

      if (!result.documents || result.documents.length === 0) {
        this.logger.warn('No documents were extracted from the stream.');
        return new ExtractedInvoiceDataDto();
      }

      const invoice = result.documents[0];
      const fields = invoice.fields;

      return this.mapFieldsToDto(fields);
    } catch (error) {
      this.logger.error(
        `Failed to analyze document: ${error.message}`,
        error.stack,
      );
      throw error; // Rethrow to be caught by the resilience layer in the worker
    }
  }

  /**
   * Maps Azure SDK specific fields to the application's domain DTO.
   * Logic handles extracting best-effort values for Brand and Serial Number,
   * which may not be standard fields in all invoices.
   */
  private mapFieldsToDto(fields: any): ExtractedInvoiceDataDto {
    const dto = new ExtractedInvoiceDataDto();

    // 1. Extract Purchase Date
    if (fields.InvoiceDate && fields.InvoiceDate.valueDate) {
      dto.purchaseDate = fields.InvoiceDate.valueDate;
    } else if (fields.InvoiceDate && fields.InvoiceDate.valueString) {
      // Fallback if valueDate is null but string exists, try parsing
      const parsed = new Date(fields.InvoiceDate.valueString);
      if (!isNaN(parsed.getTime())) {
        dto.purchaseDate = parsed;
      }
    }

    // 2. Extract Brand (Vendor)
    // Azure maps this to 'VendorName' usually
    if (fields.VendorName && fields.VendorName.valueString) {
      dto.brand = fields.VendorName.valueString;
    }

    // 3. Extract Product Name / Model
    // We look into the 'Items' array. We assume the first item or the one with the highest price might be the main product.
    if (fields.Items && fields.Items.values && fields.Items.values.length > 0) {
      // Simple heuristic: Take the description of the first line item
      const firstItem = fields.Items.values[0];
      if (
        firstItem.properties.Description &&
        firstItem.properties.Description.valueString
      ) {
        dto.productName = firstItem.properties.Description.valueString;
      }
    }

    // 4. Extract Serial Number
    // 'prebuilt-invoice' does not have a standard 'SerialNumber' field.
    // We check if it was extracted as a custom key-value pair or embedded in description.
    // Strategy: Look for a field explicitly named 'SerialNumber' if custom model was used,
    // otherwise, we might leave it null for manual entry as per US-020.
    // However, some invoices list S/N in line items.
    // Checking key-value pairs (if available in the model result) would be expensive here without the raw `keyValuePairs` from the root result object.
    // For this implementation, we check if 'InvoiceId' was mapped as a proxy or leave null.
    // The requirement says "extract... Serial Number". If not found, it remains null.
    // We will attempt to find a field named 'SerialNumber' if it exists in the dynamic fields dictionary.
    if (fields.SerialNumber && fields.SerialNumber.valueString) {
      dto.serialNumber = fields.SerialNumber.valueString;
    }

    // Logging the confidence of extraction for debugging
    this.logger.debug(
      `Extracted Data - Brand: ${dto.brand}, Date: ${dto.purchaseDate}, Product: ${dto.productName}`,
    );

    return dto;
  }
}