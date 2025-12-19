import { z } from 'zod';

/**
 * Zod schema for validating GeoJSON Geometry.
 * Ensures the shape is a Polygon or MultiPolygon as required for service areas.
 */
const positionSchema = z.tuple([z.number(), z.number()]);

const polygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.array(z.array(positionSchema)).min(1),
});

const multiPolygonSchema = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(z.array(z.array(positionSchema))).min(1),
});

const geometrySchema = z.union([polygonSchema, multiPolygonSchema]);

const featureSchema = z.object({
  type: z.literal('Feature'),
  geometry: geometrySchema,
  properties: z.record(z.any()).optional(),
});

const featureCollectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(featureSchema),
});

/**
 * Schema for updating a Service Center's Service Area.
 * Validates both postal codes and GeoJSON geofencing.
 */
export const updateServiceAreaSchema = z.object({
  serviceCenterId: z.string().uuid(),
  brandId: z.string().uuid(),
  postalCodes: z.array(
    z.string().regex(/^[A-Za-z0-9\s-]{3,10}$/, 'Invalid postal code format')
  ).default([]),
  geoJson: featureCollectionSchema.optional(),
});

/**
 * Schema for creating or updating a Service Center profile.
 */
export const serviceCenterProfileSchema = z.object({
  name: z.string().min(2).max(100),
  registrationNumber: z.string().min(5).max(50),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(3),
    country: z.string().length(2), // ISO code
  }),
});

export type UpdateServiceAreaInput = z.infer<typeof updateServiceAreaSchema>;
export type ServiceCenterProfileInput = z.infer<typeof serviceCenterProfileSchema>;