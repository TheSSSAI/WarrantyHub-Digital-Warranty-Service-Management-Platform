import { z } from 'zod';
import { UuidSchema, IsoDateSchema } from '../../shared/common.schema';

/**
 * Base Schema for Product Model
 */
export const ProductModelBaseSchema = z.object({
  name: z.string().min(1, 'Model name is required').max(100),
  description: z.string().max(2000).optional(),
  brandId: UuidSchema,
  categoryId: UuidSchema,
  defaultWarrantyDurationMonths: z.number().int().min(0, 'Warranty duration cannot be negative'),
  isActive: z.boolean().default(true),
  identifiers: z.object({
    sku: z.string().optional(),
    upc: z.string().optional(),
    ean: z.string().optional(),
  }).optional(),
});

/**
 * Schema for creating a new Product Model
 */
export const ProductModelCreateSchema = ProductModelBaseSchema;
export type ProductModelCreate = z.infer<typeof ProductModelCreateSchema>;

/**
 * Schema for updating a Product Model
 */
export const ProductModelUpdateSchema = ProductModelBaseSchema.partial();
export type ProductModelUpdate = z.infer<typeof ProductModelUpdateSchema>;

/**
 * Full Product Model Entity Schema
 */
export const ProductModelSchema = ProductModelBaseSchema.extend({
  id: UuidSchema,
  createdAt: IsoDateSchema,
  updatedAt: IsoDateSchema,
});
export type ProductModel = z.infer<typeof ProductModelSchema>;

/**
 * Schema for bulk importing Product Models (CSV/JSON source)
 */
export const ProductModelBulkImportItemSchema = z.object({
  brandId: UuidSchema.optional(), // Optional if context is implied (e.g. Brand Admin import)
  name: z.string().min(1),
  categoryId: UuidSchema,
  defaultWarrantyDurationMonths: z.number().int().min(0),
  sku: z.string().optional(),
});
export type ProductModelBulkImportItem = z.infer<typeof ProductModelBulkImportItemSchema>;