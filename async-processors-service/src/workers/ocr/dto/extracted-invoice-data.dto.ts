import { IsDate, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object representing the structured data extracted from an invoice
 * via the OCR provider.
 * 
 * This DTO represents the standardized output from the OCR layer, regardless of
 * the underlying provider (Azure AI, AWS Textract, etc.).
 */
export class ExtractedInvoiceDataDto {
  /**
   * The name of the product identified in the invoice.
   * Can be null if extraction failed or confidence was too low.
   */
  @IsOptional()
  @IsString()
  productName: string | null = null;

  /**
   * The brand or manufacturer of the product.
   * Can be null if extraction failed.
   */
  @IsOptional()
  @IsString()
  brand: string | null = null;

  /**
   * The purchase date extracted from the invoice.
   * Transformed to a Date object.
   */
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  purchaseDate: Date | null = null;

  /**
   * The serial number or unique identifier of the product.
   */
  @IsOptional()
  @IsString()
  serialNumber: string | null = null;

  /**
   * The overall confidence score of the extraction process.
   * Value ranges from 0.0 to 1.0.
   */
  @IsNumber()
  @Min(0)
  @Max(1)
  overallConfidence: number;

  /**
   * Raw text extracted for auditing or manual review purposes.
   * Optional field depending on verbosity requirements.
   */
  @IsOptional()
  @IsString()
  rawText?: string;

  constructor(partial: Partial<ExtractedInvoiceDataDto>) {
    Object.assign(this, partial);
    this.overallConfidence = partial.overallConfidence ?? 0;
  }
}