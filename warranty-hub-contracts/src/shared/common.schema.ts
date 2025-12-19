import { z } from 'zod';

/**
 * Standard UUID v4 schema with error customization.
 */
export const UuidSchema = z
  .string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be a string',
  })
  .uuid('Invalid UUID format');

/**
 * Standard ISO Date string schema.
 * Enforces UTC format generally used across the platform.
 */
export const IsoDateSchema = z
  .string()
  .datetime({ message: 'Invalid ISO 8601 date format' });

/**
 * Standard Pagination Request Parameters.
 */
export const PaginationParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

/**
 * Generic Paginated Response Schema Factory.
 * @param itemSchema The Zod schema for the items in the list.
 */
export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      total: z.number().int().min(0),
      page: z.number().int().min(1),
      limit: z.number().int().min(1),
      totalPages: z.number().int().min(0),
    }),
  });

/**
 * Standard API Error Response Schema.
 */
export const ApiErrorResponseSchema = z.object({
  statusCode: z.number().int(),
  message: z.string(),
  error: z.string(),
  details: z.record(z.any()).optional(),
  timestamp: IsoDateSchema,
  path: z.string().optional(),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;