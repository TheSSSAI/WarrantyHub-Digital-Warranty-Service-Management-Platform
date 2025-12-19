import { z } from 'zod';

/**
 * Zod schema for validating a single row of Product Model CSV import.
 * Used by the Bulk Import service.
 */
export const productModelCsvRowSchema = z.object({
  brandId: z.string().uuid({ message: 'Invalid Brand ID format' }),
  modelName: z.string().min(1, { message: 'Model Name is required' }).max(100, { message: 'Model Name too long' }),
  categoryId: z.string().uuid({ message: 'Invalid Category ID format' }),
  warrantyMonths: z.coerce
    .number()
    .int()
    .positive({ message: 'Warranty duration must be a positive integer' })
    .max(120, { message: 'Warranty duration cannot exceed 10 years (120 months)' }),
  description: z.string().optional(),
});

/**
 * Schema for the entire CSV upload action payload.
 */
export const bulkImportRequestSchema = z.object({
  file: z.any() // In actual implementation, this will be validated as FormData/File
    .refine((file) => file?.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['text/csv', 'application/vnd.ms-excel'].includes(file?.type),
      'Only .csv files are allowed'
    ),
  importType: z.enum(['ProductModels', 'Technicians', 'ServiceCenters']),
  dryRun: z.boolean().default(false),
});

/**
 * Schema for Technician CSV row validation.
 */
export const technicianCsvRowSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  skills: z.string().optional(), // Comma-separated string
});

export type ProductModelCsvRow = z.infer<typeof productModelCsvRowSchema>;
export type TechnicianCsvRow = z.infer<typeof technicianCsvRowSchema>;
export type BulkImportRequest = z.infer<typeof bulkImportRequestSchema>;