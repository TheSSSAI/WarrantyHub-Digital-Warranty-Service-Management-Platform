import { z } from 'zod';

/**
 * Money Value Object Schema.
 * Follows the pattern of Amount + Currency.
 * Amount is represented as a decimal string to avoid floating point errors in JS,
 * or as a safe integer (cents) depending on usage context.
 * Here we define it as a decimal string for broad compatibility.
 */
export const MoneySchema = z.object({
  amount: z
    .string()
    .regex(/^-?\d+(\.\d{1,4})?$/, 'Invalid monetary amount format')
    .or(z.number()), // Allow numbers but string is preferred for precision
  currency: z
    .string()
    .length(3, 'Currency must be a 3-letter ISO code')
    .toUpperCase(),
});

export type Money = z.infer<typeof MoneySchema>;