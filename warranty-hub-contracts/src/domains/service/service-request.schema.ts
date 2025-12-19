import { z } from 'zod';
import { UserProductSchema } from '../inventory/user-product.schema';
import { ServiceCenterSchema } from './service-center.schema';
import { TechnicianSchema } from './technician.schema';
import { ChatMessageSchema } from './chat.schema';

/**
 * Enum: Service Request Status
 */
export const ServiceRequestStatus = z.enum([
  'Draft',
  'Submitted',
  'Assigned',       // Technician assigned
  'InTransit',      // Technician en route
  'InProgress',     // Work started
  'PendingParts',   // Waiting for spare parts
  'Resolved',       // Work finished, pending customer confirmation
  'Closed',         // Final state
  'Cancelled',
  'Disputed'
]);

export type ServiceRequestStatusEnum = z.infer<typeof ServiceRequestStatus>;

/**
 * Enum: Service Priority
 */
export const ServicePriority = z.enum(['Low', 'Medium', 'High', 'Critical']);

/**
 * Domain Entity Schema: ServiceRequest
 * Represents a ticket for a repair or service job
 */
export const ServiceRequestSchema = z.object({
  id: z.string().uuid(),
  referenceNumber: z.string(), // Human readable ID (e.g., SR-2023-001)
  
  // Relationships
  userId: z.string().uuid(),
  userProductId: z.string().uuid(),
  serviceCenterId: z.string().uuid().optional().nullable(),
  technicianId: z.string().uuid().optional().nullable(),
  
  // Ticket Details
  status: ServiceRequestStatus.default('Submitted'),
  priority: ServicePriority.default('Medium'),
  issueType: z.string(), // Could be enum or string depending on granularity
  description: z.string().min(10, "Description must be at least 10 characters"),
  mediaUrls: z.array(z.string().url()).optional(), // Photos/Videos of the issue
  
  // Scheduling
  requestedDate: z.string().datetime().optional(),
  scheduledDate: z.string().datetime().optional().nullable(),
  
  // Resolution
  resolutionNotes: z.string().optional(),
  customerRating: z.number().min(1).max(5).optional().nullable(),
  customerFeedback: z.string().optional().nullable(),
  
  // Expanded Data (Optional for list views, required for detail views)
  productSnapshot: UserProductSchema.optional(), // Snapshot of product at time of request
  serviceCenter: ServiceCenterSchema.optional(),
  technician: TechnicianSchema.optional(),
  
  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  closedAt: z.string().datetime().optional().nullable(),
});

/**
 * DTO: Create Service Request
 */
export const CreateServiceRequestSchema = z.object({
  userProductId: z.string().uuid({ message: "Product ID is required" }),
  issueType: z.string().min(1, "Issue type is required"),
  description: z.string().min(20, "Please provide a detailed description (min 20 chars)"),
  mediaUrls: z.array(z.string().url()).max(5, "Maximum 5 attachments allowed").optional(),
  requestedDate: z.string().datetime().refine((date) => new Date(date) > new Date(), {
    message: "Requested date must be in the future",
  }).optional(),
  addressId: z.string().uuid().optional(), // If service location differs from user profile
});

/**
 * DTO: Update Service Request Status
 * Used by technicians and system to transition states
 */
export const UpdateServiceRequestStatusSchema = z.object({
  serviceRequestId: z.string().uuid(),
  status: ServiceRequestStatus,
  notes: z.string().optional(),
  locationCoordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(), // For capturing location at state change
});

/**
 * DTO: Assign Technician
 */
export const AssignTechnicianSchema = z.object({
  serviceRequestId: z.string().uuid(),
  technicianId: z.string().uuid(),
  scheduledDate: z.string().datetime().refine((date) => new Date(date) > new Date(), {
    message: "Scheduled date must be in the future",
  }),
});

/**
 * DTO: Resolve Service Request
 */
export const ResolveServiceRequestSchema = z.object({
  serviceRequestId: z.string().uuid(),
  resolutionNotes: z.string().min(10, "Resolution notes are required"),
  partsUsed: z.array(z.object({
    partId: z.string().uuid().optional(),
    partName: z.string(),
    quantity: z.number().int().min(1),
    cost: z.number().min(0).optional()
  })).optional(),
});

/**
 * DTO: Service Request Feedback
 */
export const ServiceRequestFeedbackSchema = z.object({
  serviceRequestId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().max(1000).optional(),
});

// Type Definitions
export type ServiceRequest = z.infer<typeof ServiceRequestSchema>;
export type CreateServiceRequestDTO = z.infer<typeof CreateServiceRequestSchema>;
export type UpdateServiceRequestStatusDTO = z.infer<typeof UpdateServiceRequestStatusSchema>;
export type AssignTechnicianDTO = z.infer<typeof AssignTechnicianSchema>;
export type ResolveServiceRequestDTO = z.infer<typeof ResolveServiceRequestSchema>;
export type ServiceRequestFeedbackDTO = z.infer<typeof ServiceRequestFeedbackSchema>;