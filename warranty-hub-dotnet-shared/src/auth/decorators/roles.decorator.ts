import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';

/**
 * Metadata key for storing required roles.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator to enforce Role-Based Access Control (RBAC) on a route or controller.
 * Specifies which roles are authorized to access the decorated resource.
 *
 * @param roles - A list of user roles required to access the resource.
 * @example @Roles(UserRole.BrandAdmin, UserRole.SuperAdmin)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);