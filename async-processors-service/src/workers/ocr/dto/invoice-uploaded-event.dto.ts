import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';

/**
 * Data Transfer Object representing the event payload received when an invoice
 * is uploaded to the system.
 * 
 * This event triggers the OCR processing workflow.
 */
export class InvoiceUploadedEventDto {
  /**
   * Unique identifier of the invoice record in the database.
   * Used to correlate the OCR results back to the specific record.
   */
  @IsUUID()
  @IsNotEmpty()
  invoiceId: string;

  /**
   * The full URL or path to the blob storage where the invoice file is stored.
   * The worker uses this to download the file stream.
   */
  @IsString()
  @IsNotEmpty()
  blobUrl: string;

  /**
   * The ID of the user who uploaded the invoice.
   * Useful for auditing, tenancy checks, or personalized notifications upon failure.
   */
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  /**
   * Correlation ID for tracing requests across microservices.
   */
  @IsUUID()
  @IsNotEmpty()
  correlationId: string;

  constructor(partial: Partial<InvoiceUploadedEventDto>) {
    Object.assign(this, partial);
  }
}