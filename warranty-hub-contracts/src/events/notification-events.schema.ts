import { z } from 'zod';
import { ServiceRequestStatusEnumSchema } from '../domains/service/service-request.schema';
import { TransferStatusEnumSchema } from '../domains/inventory/transfer.schema';

/**
 * Enumeration of all supported notification event types within the system.
 * Used to discriminate between different event payloads for routing and processing.
 */
export const NotificationEventTypeSchema = z.enum([
  'ServiceRequestStatusChanged',
  'WarrantyExpiryReminder',
  'ChatMessageReceived',
  'ProductTransferUpdate',
  'WarrantyClaimUpdate'
]);

export type NotificationEventType = z.infer<typeof NotificationEventTypeSchema>;

/**
 * Schema for the payload of a Service Request Status Change event.
 * Triggered when a service request transitions between states (e.g., Requested -> Assigned).
 * Used to send push notifications/emails to the User or Technician.
 */
export const ServiceRequestStatusChangedPayloadSchema = z.object({
  serviceRequestId: z.string().uuid().describe('The unique identifier of the service request'),
  productName: z.string().min(1).describe('Name of the product associated with the request'),
  brandName: z.string().min(1).describe('Brand of the product'),
  userId: z.string().uuid().describe('ID of the user who owns the request'),
  previousStatus: ServiceRequestStatusEnumSchema.optional().describe('The status before the change'),
  newStatus: ServiceRequestStatusEnumSchema.describe('The new status of the service request'),
  technicianName: z.string().optional().describe('Name of the technician, if assigned/relevant'),
  timestamp: z.string().datetime().describe('UTC timestamp when the status change occurred'),
  deepLinkUrl: z.string().url().optional().describe('Deep link to the service request details screen')
}).strict();

export type ServiceRequestStatusChangedPayload = z.infer<typeof ServiceRequestStatusChangedPayloadSchema>;

export const ServiceRequestStatusChangedEventSchema = z.object({
  eventType: z.literal(NotificationEventTypeSchema.enum.ServiceRequestStatusChanged),
  payload: ServiceRequestStatusChangedPayloadSchema
});

export type ServiceRequestStatusChangedEvent = z.infer<typeof ServiceRequestStatusChangedEventSchema>;

/**
 * Schema for the payload of a Warranty Expiry Reminder event.
 * Triggered by scheduled jobs (e.g., 30 days before, 7 days before expiry).
 */
export const WarrantyExpiryReminderPayloadSchema = z.object({
  warrantyId: z.string().uuid().describe('The unique identifier of the warranty'),
  productId: z.string().uuid().describe('The unique identifier of the product'),
  productName: z.string().min(1).describe('Name of the product'),
  brandName: z.string().min(1).describe('Brand of the product'),
  userId: z.string().uuid().describe('ID of the user who owns the product'),
  expiryDate: z.string().datetime().describe('The date the warranty expires'),
  daysRemaining: z.number().int().min(0).describe('Number of days remaining until expiry'),
  timestamp: z.string().datetime().describe('UTC timestamp when the reminder was generated')
}).strict();

export type WarrantyExpiryReminderPayload = z.infer<typeof WarrantyExpiryReminderPayloadSchema>;

export const WarrantyExpiryReminderEventSchema = z.object({
  eventType: z.literal(NotificationEventTypeSchema.enum.WarrantyExpiryReminder),
  payload: WarrantyExpiryReminderPayloadSchema
});

export type WarrantyExpiryReminderEvent = z.infer<typeof WarrantyExpiryReminderEventSchema>;

/**
 * Schema for the payload of a Chat Message Received event.
 * Triggered when a message is sent in a service request chat.
 */
export const ChatMessageReceivedPayloadSchema = z.object({
  messageId: z.string().uuid().describe('The unique identifier of the chat message'),
  serviceRequestId: z.string().uuid().describe('The service request context'),
  senderId: z.string().uuid().describe('ID of the user sending the message'),
  senderName: z.string().min(1).describe('Display name of the sender'),
  recipientId: z.string().uuid().describe('ID of the user receiving the notification'),
  contentPreview: z.string().max(100).describe('Truncated preview of the message content for the notification body'),
  timestamp: z.string().datetime().describe('UTC timestamp when the message was sent'),
  deepLinkUrl: z.string().url().optional().describe('Deep link to the chat screen')
}).strict();

export type ChatMessageReceivedPayload = z.infer<typeof ChatMessageReceivedPayloadSchema>;

export const ChatMessageReceivedEventSchema = z.object({
  eventType: z.literal(NotificationEventTypeSchema.enum.ChatMessageReceived),
  payload: ChatMessageReceivedPayloadSchema
});

export type ChatMessageReceivedEvent = z.infer<typeof ChatMessageReceivedEventSchema>;

/**
 * Schema for the payload of a Product Transfer Update event.
 * Triggered when a transfer request is created, accepted, rejected, or expired.
 */
export const ProductTransferUpdatePayloadSchema = z.object({
  transferId: z.string().uuid().describe('The unique identifier of the transfer request'),
  productId: z.string().uuid().describe('The unique identifier of the product being transferred'),
  productName: z.string().min(1).describe('Name of the product'),
  senderId: z.string().uuid().describe('ID of the current owner/sender'),
  recipientId: z.string().uuid().optional().describe('ID of the recipient (if registered)'),
  recipientEmail: z.string().email().describe('Email of the recipient'),
  status: TransferStatusEnumSchema.describe('The new status of the transfer'),
  actorName: z.string().optional().describe('Name of the user who performed the action (e.g., Accepted by John)'),
  timestamp: z.string().datetime().describe('UTC timestamp of the update')
}).strict();

export type ProductTransferUpdatePayload = z.infer<typeof ProductTransferUpdatePayloadSchema>;

export const ProductTransferUpdateEventSchema = z.object({
  eventType: z.literal(NotificationEventTypeSchema.enum.ProductTransferUpdate),
  payload: ProductTransferUpdatePayloadSchema
});

export type ProductTransferUpdateEvent = z.infer<typeof ProductTransferUpdateEventSchema>;

/**
 * Schema for the payload of a Warranty Claim Update event.
 * Triggered when a warranty claim is Approved or Rejected by an admin.
 */
export const WarrantyClaimUpdatePayloadSchema = z.object({
  serviceRequestId: z.string().uuid().describe('The service request associated with the claim'),
  userId: z.string().uuid().describe('The user who raised the request'),
  productName: z.string().min(1).describe('Name of the product'),
  claimStatus: z.enum(['Approved', 'Rejected']).describe('The new status of the claim'),
  rejectionReason: z.string().optional().describe('Reason for rejection if applicable'),
  adminComments: z.string().optional().describe('Any additional comments from the admin'),
  timestamp: z.string().datetime().describe('UTC timestamp of the decision'),
  deepLinkUrl: z.string().url().optional().describe('Deep link to the claim details')
}).strict();

export type WarrantyClaimUpdatePayload = z.infer<typeof WarrantyClaimUpdatePayloadSchema>;

export const WarrantyClaimUpdateEventSchema = z.object({
  eventType: z.literal(NotificationEventTypeSchema.enum.WarrantyClaimUpdate),
  payload: WarrantyClaimUpdatePayloadSchema
});

export type WarrantyClaimUpdateEvent = z.infer<typeof WarrantyClaimUpdateEventSchema>;

/**
 * Discriminated union of all notification events.
 * This is the main type consumed by the Notification Service to handle different event types type-safely.
 */
export const NotificationEventSchema = z.discriminatedUnion('eventType', [
  ServiceRequestStatusChangedEventSchema,
  WarrantyExpiryReminderEventSchema,
  ChatMessageReceivedEventSchema,
  ProductTransferUpdateEventSchema,
  WarrantyClaimUpdateEventSchema
]);

export type NotificationEvent = z.infer<typeof NotificationEventSchema>;