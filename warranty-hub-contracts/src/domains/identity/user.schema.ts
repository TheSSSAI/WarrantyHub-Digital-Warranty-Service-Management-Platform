import { z } from 'zod';
import { UserRole } from './role.enum';
import { AddressSchema } from '../../shared/common.schema';

/**
 * Domain Entity Schema: User
 * Represents a registered user in the system (Consumer, Technician, Admin, etc.)
 */
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({ message: "Invalid email address format" }),
  firstName: z.string().min(1, { message: "First name is required" }).max(100),
  lastName: z.string().min(1, { message: "Last name is required" }).max(100),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format (E.164 expected)" }).optional(),
  role: z.nativeEnum(UserRole),
  isEmailVerified: z.boolean().default(false),
  isPhoneVerified: z.boolean().default(false),
  avatarUrl: z.string().url().optional().nullable(),
  address: AddressSchema.optional().nullable(),
  preferences: z.object({
    newsletter: z.boolean().default(false),
    notifications: z.object({
      email: z.boolean().default(true),
      push: z.boolean().default(true),
      sms: z.boolean().default(false),
    }).optional(),
  }).optional(),
  lastLoginAt: z.string().datetime().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().optional().nullable(),
});

/**
 * DTO: Update User Profile
 * Used by users to update their own profile information
 */
export const UpdateUserProfileSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  phoneNumber: true,
  avatarUrl: true,
  address: true,
}).partial().extend({
  preferences: z.object({
    newsletter: z.boolean().optional(),
    notifications: z.object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
      sms: z.boolean().optional(),
    }).optional(),
  }).optional(),
});

/**
 * DTO: Admin Update User
 * Used by administrators to update user status or role
 */
export const AdminUpdateUserSchema = UpdateUserProfileSchema.extend({
  role: z.nativeEnum(UserRole).optional(),
  isEmailVerified: z.boolean().optional(),
  isPhoneVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

/**
 * DTO: User Summary
 * Lightweight representation for lists and references
 */
export const UserSummarySchema = UserSchema.pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  avatarUrl: true,
});

// Type Definitions
export type User = z.infer<typeof UserSchema>;
export type UpdateUserProfileDTO = z.infer<typeof UpdateUserProfileSchema>;
export type AdminUpdateUserDTO = z.infer<typeof AdminUpdateUserSchema>;
export type UserSummary = z.infer<typeof UserSummarySchema>;