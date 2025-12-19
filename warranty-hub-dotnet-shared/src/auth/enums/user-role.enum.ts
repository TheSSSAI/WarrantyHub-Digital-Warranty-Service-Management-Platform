/**
 * Standardized system roles for Role-Based Access Control (RBAC) enforcement across all microservices.
 * These values must match the claims provided by the Identity Provider (Azure AD B2C).
 */
export enum UserRole {
  /**
   * System Administrator with full access to all resources and configuration.
   */
  SuperAdmin = 'super_admin',

  /**
   * Brand Manager responsible for managing brand specific data and analytics.
   */
  BrandAdmin = 'brand_admin',

  /**
   * Service Center Manager responsible for technician roster and ticket assignment.
   */
  ServiceCenterAdmin = 'service_center_admin',

  /**
   * Field Technician responsible for executing service requests.
   */
  Technician = 'technician',

  /**
   * End User / Consumer who owns products and requests services.
   */
  Customer = 'customer'
}