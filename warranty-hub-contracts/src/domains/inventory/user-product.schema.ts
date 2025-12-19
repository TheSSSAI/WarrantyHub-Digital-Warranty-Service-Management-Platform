import { z } from 'zod';
import { ProductModelSchema } from '../catalog/product-model.schema';
import { WarrantySchema } from './warranty.schema';
import { InvoiceSchema } from './invoice.schema';

/**
 * Enum: User Product Status
 */
export const UserProductStatus = z.enum([
  'Active',
  'Transferred',
  'Scrapped',
  'Lost'
]);

export type UserProductStatusEnum = z.infer<typeof UserProductStatus>;

/**
 * Domain Entity Schema: UserProduct
 * Represents a specific physical product instance owned by a user
 */
export const UserProductSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  productModelId: z.string().uuid(),
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  purchaseDate: z.string().datetime({ message: "Invalid purchase date format" }),
  nickname: z.string().optional().nullable(),
  status: UserProductStatus.default('Active'),
  
  // Relations (can be populated or referenced by ID)
  productModel: ProductModelSchema.optional(),
  warranties: z.array(WarrantySchema).optional(),
  invoices: z.array(InvoiceSchema).optional(),
  
  // Metadata
  isVerified: z.boolean().default(false), // e.g. via QR scan or receipt validation
  metadata: z.record(z.any()).optional(), // Flexible field for custom attributes
  
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().optional().nullable(),
});

/**
 * DTO: Create User Product
 * Payload for registering a new product
 */
export const CreateUserProductSchema = z.object({
  productModelId: z.string().uuid({ message: "Invalid Product Model ID" }),
  serialNumber: z.string().min(1, { message: "Serial number is required" }).max(100),
  purchaseDate: z.string().datetime().refine((date) => new Date(date) <= new Date(), {
    message: "Purchase date cannot be in the future",
  }),
  nickname: z.string().max(50).optional(),
  invoiceIds: z.array(z.string().uuid()).optional(),
});

/**
 * DTO: Update User Product
 */
export const UpdateUserProductSchema = z.object({
  nickname: z.string().max(50).optional(),
  purchaseDate: z.string().datetime().optional().refine((date) => !date || new Date(date) <= new Date(), {
    message: "Purchase date cannot be in the future",
  }),
  serialNumber: z.string().min(1).max(100).optional(), // Only editable by admins or under specific conditions
  status: UserProductStatus.optional(),
});

/**
 * DTO: Product Details (Composite View)
 * A rich DTO often used for the product details screen
 */
export const ProductDetailsDtoSchema = z.object({
  id: z.string().uuid(),
  modelName: z.string(),
  brandName: z.string(),
  categoryName: z.string(),
  imageUrl: z.string().url().optional(),
  serialNumber: z.string(),
  purchaseDate: z.string().datetime(),
  warrantyStatus: z.enum(['Active', 'ExpiringSoon', 'Expired', 'PendingVerification']),
  warrantyExpiryDate: z.string().datetime().optional(),
  isTransferable: z.boolean(),
  activeServiceRequestCount: z.number().int().nonnegative(),
});

// Type Definitions
export type UserProduct = z.infer<typeof UserProductSchema>;
export type CreateUserProductDTO = z.infer<typeof CreateUserProductSchema>;
export type UpdateUserProductDTO = z.infer<typeof UpdateUserProductSchema>;
export type ProductDetailsDTO = z.infer<typeof ProductDetailsDtoSchema>;