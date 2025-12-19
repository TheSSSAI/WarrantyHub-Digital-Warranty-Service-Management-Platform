import { z } from 'zod';
import { UserSummarySchema } from '../identity/user.schema';
import { UserProductSchema } from './user-product.schema';

/**
 * Enum: Transfer Status
 */
export const TransferStatus = z.enum([
  'Pending',
  'Accepted',
  'Rejected',
  'Cancelled',
  'Expired'
]);

export type TransferStatusEnum = z.infer<typeof TransferStatus>;

/**
 * Domain Entity Schema: ProductTransfer
 * Represents a request to transfer ownership of a product from one user to another
 */
export const ProductTransferSchema = z.object({
  id: z.string().uuid(),
  fromUserId: z.string().uuid(),
  toEmail: z.string().email(),
  toUserId: z.string().uuid().optional().nullable(), // Populated if the user exists/accepts
  userProductId: z.string().uuid(),
  status: TransferStatus,
  notes: z.string().max(500).optional(),
  
  // Snapshots for audit
  productSnapshot: UserProductSchema.optional(), // Snapshot of product at time of transfer
  
  // Relations
  fromUser: UserSummarySchema.optional(),
  toUser: UserSummarySchema.optional(),
  
  expiresAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * DTO: Initiate Transfer Request
 */
export const InitiateTransferSchema = z.object({
  userProductId: z.string().uuid({ message: "Invalid Product ID" }),
  recipientEmail: z.string().email({ message: "Invalid recipient email address" }),
  notes: z.string().max(500).optional(),
});

/**
 * DTO: Transfer Action
 * Used for accepting or rejecting a transfer
 */
export const TransferActionSchema = z.object({
  transferId: z.string().uuid(),
  action: z.enum(['Accept', 'Reject']),
  reason: z.string().max(250).optional(), // Optional reason for rejection
});

/**
 * DTO: Transfer Summary
 * For listing pending/history transfers
 */
export const TransferSummarySchema = ProductTransferSchema.pick({
  id: true,
  status: true,
  toEmail: true,
  createdAt: true,
  expiresAt: true,
}).extend({
  productName: z.string(),
  brandName: z.string(),
  serialNumber: z.string(),
  direction: z.enum(['Incoming', 'Outgoing']),
});

// Type Definitions
export type ProductTransfer = z.infer<typeof ProductTransferSchema>;
export type InitiateTransferDTO = z.infer<typeof InitiateTransferSchema>;
export type TransferActionDTO = z.infer<typeof TransferActionSchema>;
export type TransferSummaryDTO = z.infer<typeof TransferSummarySchema>;