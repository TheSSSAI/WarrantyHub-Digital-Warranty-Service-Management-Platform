import { z } from 'zod';

/**
 * Schema for Product Registration form.
 * Enforces business rules like no future purchase dates.
 */
export const productRegistrationSchema = z.object({
  brandId: z.string().uuid({ message: 'Please select a valid brand' }),
  modelNumber: z.string().min(1, { message: 'Model number is required' }),
  serialNumber: z.string()
    .min(3, { message: 'Serial number is too short' })
    .max(50, { message: 'Serial number is too long' })
    .regex(/^[A-Za-z0-9-]+$/, { message: 'Serial number contains invalid characters' }),
  purchaseDate: z.coerce
    .date()
    .max(new Date(), { message: 'Purchase date cannot be in the future' }),
  nickName: z.string().max(50).optional(),
  invoiceFileId: z.string().uuid().optional(),
});

/**
 * Schema for adding an Extended Warranty.
 */
export const addWarrantySchema = z.object({
  productId: z.string().uuid(),
  warrantyType: z.enum(['Extended', 'Retailer']),
  providerName: z.string().min(2, 'Provider name is required'),
  durationMonths: z.coerce.number().int().positive().max(120),
  startDate: z.coerce.date().optional(), // If omitted, defaults to product purchase date
  documentFileId: z.string().uuid({ message: 'Warranty document is required' }),
});

/**
 * Schema for initiating a product transfer.
 */
export const transferProductSchema = z.object({
  productId: z.string().uuid(),
  recipientEmail: z.string().email({ message: 'Invalid email address' }),
  notes: z.string().max(500).optional(),
});

export type ProductRegistrationInput = z.infer<typeof productRegistrationSchema>;
export type AddWarrantyInput = z.infer<typeof addWarrantySchema>;
export type TransferProductInput = z.infer<typeof transferProductSchema>;