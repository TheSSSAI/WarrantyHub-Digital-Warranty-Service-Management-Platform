import { z } from 'zod';
import { UuidSchema, IsoDateSchema } from '../../shared/common.schema';

export const BrandStatusSchema = z.enum(['Pending', 'Approved', 'Rejected', 'Active', 'Inactive']);
export type BrandStatus = z.infer<typeof BrandStatusSchema>;

/**
 * Base Schema for Brand Data
 */
export const BrandBaseSchema = z.object({
  name: z.string().min(2, 'Brand name must be at least 2 characters').max(100),
  description: z.string().max(1000).optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  logoUrl: z.string().url().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5).max(20).optional(),
});

/**
 * Schema for creating a new Brand (Registration Request)
 */
export const BrandCreateSchema = BrandBaseSchema;
export type BrandCreate = z.infer<typeof BrandCreateSchema>;

/**
 * Schema for updating a Brand
 */
export const BrandUpdateSchema = BrandBaseSchema.partial().extend({
  status: BrandStatusSchema.optional(),
  rejectionReason: z.string().optional(),
});
export type BrandUpdate = z.infer<typeof BrandUpdateSchema>;

/**
 * Full Brand Entity Schema (DTO)
 */
export const BrandSchema = BrandBaseSchema.extend({
  id: UuidSchema,
  status: BrandStatusSchema,
  createdAt: IsoDateSchema,
  updatedAt: IsoDateSchema,
  rejectionReason: z.string().optional().nullable(),
});
export type Brand = z.infer<typeof BrandSchema>;

/**
 * Schema for Serial Number Validation Rules configured by Brand.
 */
export const SerialNumberValidationRuleSchema = z.object({
  brandId: UuidSchema,
  regexPattern: z.string().min(1, 'Regex pattern is required'),
  errorMessage: z.string().optional(),
  isEnabled: z.boolean().default(true),
});
export type SerialNumberValidationRule = z.infer<typeof SerialNumberValidationRuleSchema>;