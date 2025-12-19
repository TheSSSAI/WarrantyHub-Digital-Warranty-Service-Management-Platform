/**
 * Interface representing the structure of a validated user token payload.
 */
export interface UserContext {
  userId: string;
  email: string;
  roles: string[];
  serviceCenterId?: string;
  // For technicians specifically
  technicianId?: string;
}

/**
 * Abstract definition for the Authentication Service.
 * Used by the WebSocket Gateway to validate connections and retrieve user context
 * without coupling to the specific Identity Provider implementation.
 */
export abstract class IAuthService {
  /**
   * Verifies a JWT token and returns the user context if valid.
   * @param token The raw JWT token string.
   * @returns The decoded user context or null if invalid.
   * @throws Error if validation process fails (e.g., keyserver unreachable).
   */
  abstract verifyToken(token: string): Promise<UserContext | null>;

  /**
   * Checks if the given user context has the required permission/role.
   * @param user The validated user context.
   * @param requiredRole The role required for the operation.
   */
  abstract hasRole(user: UserContext, requiredRole: string): boolean;
}