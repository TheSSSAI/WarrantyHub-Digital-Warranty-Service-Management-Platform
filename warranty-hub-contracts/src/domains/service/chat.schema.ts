import { z } from 'zod';
import { UuidSchema, IsoDateSchema } from '../../shared/common.schema';
import { UserRoleSchema } from '../identity/role.enum';

/**
 * Chat Message Payload for WebSocket transmission (REQ-FUNC-007)
 */
export const ChatMessagePayloadSchema = z.object({
  serviceRequestId: UuidSchema,
  content: z.string().min(1).max(1000),
  attachments: z.array(z.string().url()).optional(),
});
export type ChatMessagePayload = z.infer<typeof ChatMessagePayloadSchema>;

/**
 * Chat Message Entity Schema
 */
export const ChatMessageSchema = ChatMessagePayloadSchema.extend({
  id: UuidSchema,
  senderId: UuidSchema,
  senderRole: UserRoleSchema,
  senderName: z.string(),
  sentAt: IsoDateSchema,
  isRead: z.boolean().default(false),
  readAt: IsoDateSchema.optional().nullable(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

/**
 * Chat History Query Parameters
 */
export const ChatHistoryQuerySchema = z.object({
  serviceRequestId: UuidSchema,
  limit: z.number().int().min(1).max(100).default(50),
  beforeCursor: IsoDateSchema.optional(), // Pagination via timestamp
});