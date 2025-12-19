import { z } from 'zod';
import { UuidSchema, IsoDateSchema } from '../shared/common.schema';
import { UserRoleSchema } from '../domains/identity/role.enum';

/**
 * Base Event Schema for all Integration Events
 */
const BaseEventSchema = z.object({
  eventId: UuidSchema,
  timestamp: IsoDateSchema,
  correlationId: UuidSchema.optional(),
  version: z.string().default('1.0'),
  source: z.string(), // Service name
});

/**
 * User Registered Event
 */
export const UserRegisteredEventSchema = BaseEventSchema.extend({
  type: z.literal('Identity.UserRegistered'),
  payload: z.object({
    userId: UuidSchema,
    email: z.string().email(),
    role: UserRoleSchema,
  }),
});

/**
 * Product Ownership Transfer Initiated
 */
export const ProductTransferInitiatedEventSchema = BaseEventSchema.extend({
  type: z.literal('Inventory.ProductTransferInitiated'),
  payload: z.object({
    transferId: UuidSchema,
    productId: UuidSchema,
    fromUserId: UuidSchema,
    toEmail: z.string().email(),
    expiryDate: IsoDateSchema,
  }),
});

/**
 * Service Request Status Changed
 */
export const ServiceRequestStatusChangedEventSchema = BaseEventSchema.extend({
  type: z.literal('Service.RequestStatusChanged'),
  payload: z.object({
    serviceRequestId: UuidSchema,
    oldStatus: z.string(),
    newStatus: z.string(),
    updatedBy: UuidSchema,
    userId: UuidSchema, // Owner of request, useful for routing notifications
    technicianId: UuidSchema.optional(),
  }),
});

/**
 * Warranty Claim Decision Event
 */
export const WarrantyClaimDecisionEventSchema = BaseEventSchema.extend({
  type: z.literal('Service.WarrantyClaimDecided'),
  payload: z.object({
    serviceRequestId: UuidSchema,
    claimStatus: z.enum(['Approved', 'Rejected']),
    rejectionReason: z.string().optional(),
    decidedBy: UuidSchema,
  }),
});

/**
 * Union of all Integration Events
 * Useful for type narrowing in consumers.
 */
export const IntegrationEventSchema = z.discriminatedUnion('type', [
  UserRegisteredEventSchema,
  ProductTransferInitiatedEventSchema,
  ServiceRequestStatusChangedEventSchema,
  WarrantyClaimDecisionEventSchema,
]);

export type IntegrationEvent = z.infer<typeof IntegrationEventSchema>;