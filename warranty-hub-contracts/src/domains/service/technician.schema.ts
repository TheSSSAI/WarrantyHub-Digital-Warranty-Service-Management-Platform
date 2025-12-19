import { z } from 'zod';
import { UuidSchema, IsoDateSchema, GeoJsonPointSchema } from '../../shared/common.schema';

export const TechnicianAvailabilityStatusSchema = z.enum(['Available', 'OnJob', 'Traveling', 'Offline']);
export type TechnicianAvailabilityStatus = z.infer<typeof TechnicianAvailabilityStatusSchema>;

/**
 * Schema for Technician Profile
 */
export const TechnicianSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema, // Links to Identity User
  serviceCenterId: UuidSchema,
  status: z.enum(['Active', 'Inactive']),
  availabilityStatus: TechnicianAvailabilityStatusSchema,
  skills: z.array(z.string()),
  currentLocation: GeoJsonPointSchema.optional(),
  lastHeartbeat: IsoDateSchema.optional(),
  createdAt: IsoDateSchema,
});
export type Technician = z.infer<typeof TechnicianSchema>;

/**
 * Schema for Real-time Location Update (REQ-FUNC-009)
 * High-frequency payload.
 */
export const TechnicianLocationUpdateSchema = z.object({
  technicianId: UuidSchema,
  serviceRequestId: UuidSchema, // Context is required for privacy scoping
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timestamp: z.number(), // Epoch timestamp for efficiency
  heading: z.number().min(0).max(360).optional(),
  speed: z.number().min(0).optional(),
});
export type TechnicianLocationUpdate = z.infer<typeof TechnicianLocationUpdateSchema>;

/**
 * Schema for Technician Roster Import item
 */
export const TechnicianImportItemSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(5),
  skills: z.array(z.string()).optional(),
});