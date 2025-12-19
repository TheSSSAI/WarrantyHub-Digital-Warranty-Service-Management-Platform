import { z } from 'zod';
import { UserRole } from './role.enum';

/**
 * DTO: Login Request
 * Standard email/password login payload
 */
export const LoginRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

/**
 * DTO: Register Request
 * Payload for creating a new user account
 */
export const RegisterRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" }).optional(),
  termsAccepted: z.literal(true, { errorMap: () => ({ message: "You must accept the terms and conditions" }) }),
});

/**
 * DTO: Token Refresh Request
 */
export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, { message: "Refresh token is required" }),
});

/**
 * DTO: Auth Response
 * Returned upon successful login/registration
 */
export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  tokenType: z.literal("Bearer"),
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
    firstName: z.string(),
    lastName: z.string(),
  }),
});

/**
 * DTO: Change Password Request
 */
export const ChangePasswordRequestSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  confirmNewPassword: z.string().min(1),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

/**
 * DTO: Forgot Password Request
 */
export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email(),
});

/**
 * DTO: Reset Password Request
 */
export const ResetPasswordRequestSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
  confirmNewPassword: z.string().min(1),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

/**
 * DTO: MFA Setup Response
 */
export const MfaSetupResponseSchema = z.object({
  secret: z.string(),
  qrCodeUrl: z.string().url(),
  backupCodes: z.array(z.string()),
});

/**
 * DTO: MFA Verify Request
 */
export const MfaVerifyRequestSchema = z.object({
  token: z.string().length(6, { message: "MFA code must be 6 digits" }).regex(/^\d+$/),
  secret: z.string().optional(), // Used during setup verification
});

// Type Definitions
export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
export type RegisterRequestDTO = z.infer<typeof RegisterRequestSchema>;
export type RefreshTokenRequestDTO = z.infer<typeof RefreshTokenRequestSchema>;
export type AuthResponseDTO = z.infer<typeof AuthResponseSchema>;
export type ChangePasswordRequestDTO = z.infer<typeof ChangePasswordRequestSchema>;
export type ForgotPasswordRequestDTO = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequestDTO = z.infer<typeof ResetPasswordRequestSchema>;
export type MfaSetupResponseDTO = z.infer<typeof MfaSetupResponseSchema>;
export type MfaVerifyRequestDTO = z.infer<typeof MfaVerifyRequestSchema>;