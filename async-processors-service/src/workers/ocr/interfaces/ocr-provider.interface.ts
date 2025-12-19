import { Readable } from 'stream';
import { ExtractedInvoiceDataDto } from '../dto/extracted-invoice-data.dto';

/**
 * Contract for OCR (Optical Character Recognition) providers.
 * 
 * This interface adheres to the Dependency Inversion Principle, allowing
 * the domain logic to depend on this abstraction rather than concrete
 * implementations like Azure AI Document Intelligence.
 */
export interface IOcrProvider {
  /**
   * Extracts structured invoice data from a file stream.
   * 
   * @param fileStream - The readable stream of the invoice document (PDF, JPEG, PNG, etc.)
   * @param mimeType - The MIME type of the file (e.g., 'application/pdf') to hint the OCR engine
   * @returns A promise resolving to the standardized extracted data DTO
   * @throws {DocumentAnalysisError} If the analysis fails or the service is unreachable
   */
  extractData(
    fileStream: Readable,
    mimeType?: string
  ): Promise<ExtractedInvoiceDataDto>;

  /**
   * Checks the health/connectivity of the underlying OCR service.
   * Used for readiness/liveness probes.
   * 
   * @returns A promise resolving to true if healthy, false otherwise.
   */
  healthCheck(): Promise<boolean>;
}