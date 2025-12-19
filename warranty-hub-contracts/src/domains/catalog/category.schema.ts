import { z } from 'zod';
import { UuidSchema, IsoDateSchema } from '../../shared/common.schema';

/**
 * Base Schema for Product Category
 */
export const CategoryBaseSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  description: z.string().optional(),
  parentId: UuidSchema.optional().nullable(),
  isActive: z.boolean().default(true),
});

/**
 * Schema for creating a Category
 */
export const CategoryCreateSchema = CategoryBaseSchema;
export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;

/**
 * Schema for updating a Category
 */
export const CategoryUpdateSchema = CategoryBaseSchema.partial();
export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>;

/**
 * Full Category Entity Schema
 */
export const CategorySchema = CategoryBaseSchema.extend({
  id: UuidSchema,
  createdAt: IsoDateSchema,
  updatedAt: IsoDateSchema,
});
export type Category = z.infer<typeof CategorySchema>;

/**
 * Category Tree Node for recursive display
 */
export type CategoryTree = Category & {
  children?: CategoryTree[];
};