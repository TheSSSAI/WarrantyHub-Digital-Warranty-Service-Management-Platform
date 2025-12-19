import { z } from 'zod';
import { UuidSchema, IsoDateSchema, MoneySchema } from '../../shared/common.schema';

/**
 * Schema for Invoice Upload Metadata
 */
export const InvoiceUploadSchema = z.object({
  fileUrl: z.string().url(),
  mimeType: z.enum(['image/jpeg', 'image/png', 'application/pdf']),
  fileSize: z.number().int().max(10485760), // 10MB limit
});

/**
 * Schema for data extracted via OCR (REQ-DATA-001).
 * All fields are optional/nullable as OCR is fallible.
 */
export const InvoiceOcrResultSchema = z.object({
  extractedText: z.string().optional(),
  confidenceScore: z.number().min(0).max(1),
  detectedData: z.object({
    purchaseDate: IsoDateSchema.optional().nullable(),
    retailerName: z.string().optional().nullable(),
    totalAmount: MoneySchema.optional().nullable(),
    lineItems: z.array(z.object({
      description: z.string().optional(),
      modelNumber: z.string().optional(),
      serialNumber: z.string().optional(),
    })).optional(),
  }),
});
export type InvoiceOcrResult = z.infer<typeof InvoiceOcrResultSchema>;

/**
 * Schema for Invoice Entity
 */
export const InvoiceSchema = z.object({
  id: UuidSchema,
  userProductId: UuidSchema,
  fileUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  uploadDate: IsoDateSchema,
  ocrStatus: z.enum(['Pending', 'Processing', 'Completed', 'Failed']),
  ocrData: InvoiceOcrResultSchema.optional(),
  metadata: z.object({
    tags: z.array(z.string()).optional(),
    notes: z.string().max(1000).optional(),
  }).optional(),
});
export type Invoice = z.infer<typeof InvoiceSchema>;

/**
 * Schema for updating Invoice Metadata (US-065)
 */
export const InvoiceMetadataUpdateSchema = z.object({
  tags: z.array(z.string().max(50)).max(10),
  notes: z.string().max(1000).optional(),
});
export type InvoiceMetadataUpdate = z.infer<typeof InvoiceMetadataUpdateSchema>;