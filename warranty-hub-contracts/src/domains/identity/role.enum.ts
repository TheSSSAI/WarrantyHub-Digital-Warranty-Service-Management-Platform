import { z } from 'zod';

/**
 * System Roles Enumeration.
 * Defines the authorized roles within the platform RBAC system.
 */
export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  BrandAdmin = 'BrandAdmin',
  ServiceCenterAdmin = 'ServiceCenterAdmin',
  Technician = 'Technician',
  Consumer = 'Consumer',
}

/**
 * Zod Schema for UserRole validation.
 */
export const UserRoleSchema = z.nativeEnum(UserRole);

export type UserRoleType = z.infer<typeof UserRoleSchema>;