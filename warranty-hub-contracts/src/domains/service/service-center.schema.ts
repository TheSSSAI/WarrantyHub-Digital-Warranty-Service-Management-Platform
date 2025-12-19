import { z } from 'zod';
import { AddressSchema } from '../../shared/common.schema';
import { GeoJsonPolygonSchema } from '../../shared/geo-json.schema';
import { BrandSchema } from '../catalog/brand.schema';

/**
 * Enum: Service Center Status
 */
export const ServiceCenterStatus = z.enum([
  'Pending',
  'Approved',
  'Rejected',
  'Suspended',
  'Inactive'
]);

export type ServiceCenterStatusEnum = z.infer<typeof ServiceCenterStatus>;

/**
 * Domain Entity Schema: ServiceCenter
 * Represents a physical service center location
 */
export const ServiceCenterSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Service Center Name is required").max(200),
  address: AddressSchema,
  contactName: z.string().min(1, "Contact Name is required"),
  contactEmail: z.string().email("Invalid contact email"),
  contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  status: ServiceCenterStatus.default('Pending'),
  
  // Operating Hours (Simplified for schema)
  operatingHours: z.string().optional(), // e.g., "Mon-Fri: 9AM-5PM"
  
  // Coverage Areas
  serviceAreaPolygon: GeoJsonPolygonSchema.optional().nullable(),
  postalCodes: z.array(z.string()).optional(),
  
  // Brand Associations
  authorizedBrands: z.array(BrandSchema).optional(),
  
  // Metrics
  rating: z.number().min(0).max(5).default(0),
  activeTechniciansCount: z.number().int().default(0),
  
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * DTO: Register Service Center
 */
export const RegisterServiceCenterSchema = z.object({
  name: z.string().min(2).max(200),
  address: AddressSchema,
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  authorizedBrandIds: z.array(z.string().uuid()).min(1, "At least one brand association is required"),
  postalCodes: z.array(z.string()).optional(), // Initial coverage
});

/**
 * DTO: Update Service Center
 */
export const UpdateServiceCenterSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  address: AddressSchema.optional(),
  contactName: z.string().min(2).optional(),
  contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
  operatingHours: z.string().optional(),
  status: ServiceCenterStatus.optional(), // Admin only
});

/**
 * DTO: Update Service Area
 * Specialized DTO for updating geospatial boundaries
 */
export const UpdateServiceAreaSchema = z.object({
  serviceCenterId: z.string().uuid(),
  serviceAreaPolygon: GeoJsonPolygonSchema.optional(),
  postalCodes: z.array(z.string()).optional(),
}).refine(data => data.serviceAreaPolygon || (data.postalCodes && data.postalCodes.length > 0), {
  message: "Either a polygon or a list of postal codes must be provided",
});

/**
 * DTO: Service Center Search Query
 */
export const ServiceCenterSearchQuerySchema = z.object({
  brandId: z.string().uuid().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  radiusKm: z.number().min(1).max(500).default(50),
});

// Type Definitions
export type ServiceCenter = z.infer<typeof ServiceCenterSchema>;
export type RegisterServiceCenterDTO = z.infer<typeof RegisterServiceCenterSchema>;
export type UpdateServiceCenterDTO = z.infer<typeof UpdateServiceCenterSchema>;
export type UpdateServiceAreaDTO = z.infer<typeof UpdateServiceAreaSchema>;
export type ServiceCenterSearchQuery = z.infer<typeof ServiceCenterSearchQuerySchema>;