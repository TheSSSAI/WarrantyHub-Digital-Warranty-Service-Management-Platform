import { z } from 'zod';
import { UuidSchema, IsoDateSchema } from '../../shared/common.schema';

export const WarrantyStatusSchema = z.enum(['Active', 'ExpiringSoon', 'Expired', 'PendingVerification', 'Void']);
export type WarrantyStatus = z.infer<typeof WarrantyStatusSchema>;

export const WarrantyTypeSchema = z.enum(['Manufacturer', 'Extended', 'Retailer']);
export type WarrantyType = z.infer<typeof WarrantyTypeSchema>;

/**
 * Base Schema for Warranty Data
 */
export const WarrantyBaseSchema = z.object({
  userProductId: UuidSchema,
  type: WarrantyTypeSchema.default('Manufacturer'),
  providerName: z.string().min(1),
  coverageStartDate: IsoDateSchema,
  coverageEndDate: IsoDateSchema,
  durationMonths: z.number().int().min(0),
  termsAndConditionsUrl: z.string().url().optional(),
  documentUrl: z.string().url().optional(), // Uploaded proof
});

/**
 * Schema for manually adding a warranty (e.g. Extended)
 */
export const WarrantyAddSchema = z.object({
  userProductId: UuidSchema,
  type: WarrantyTypeSchema,
  providerName: z.string().min(1, 'Provider name is required'),
  startDate: IsoDateSchema,
  durationValue: z.number().int().min(1),
  durationUnit: z.enum(['Months', 'Years']),
  documentUrl: z.string().url().optional(),
});
export type WarrantyAdd = z.infer<typeof WarrantyAddSchema>;

/**
 * Full Warranty Entity Schema
 */
export const WarrantySchema = WarrantyBaseSchema.extend({
  id: UuidSchema,
  status: WarrantyStatusSchema,
  createdAt: IsoDateSchema,
  updatedAt: IsoDateSchema,
});
export type Warranty = z.infer<typeof WarrantySchema>;

/**
 * Computed Warranty Status Badge data for UI
 */
export const WarrantyStatusBadgeSchema = z.object({
  status: WarrantyStatusSchema,
  label: z.string(),
  colorCode: z.enum(['green', 'amber', 'red', 'grey']),
  daysRemaining: z.number().int(),
});
export type WarrantyStatusBadge = z.infer<typeof WarrantyStatusBadgeSchema>;