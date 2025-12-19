import { z } from 'zod';

/**
 * GeoJSON Point Schema
 * Represents a specific location with Latitude and Longitude.
 * Structure: { type: "Point", coordinates: [longitude, latitude] }
 */
export const GeoJsonPointSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([
    z.number().min(-180).max(180), // Longitude
    z.number().min(-90).max(90),   // Latitude
  ]),
});

export type GeoJsonPoint = z.infer<typeof GeoJsonPointSchema>;

/**
 * GeoJSON Polygon Schema
 * Represents a closed area on a map (Service Area).
 * Structure: { type: "Polygon", coordinates: [[[long, lat], ...]] }
 * Note: First and last coordinates of the linear ring must be equivalent (closed loop).
 */
export const GeoJsonPolygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.array(
    z.array(
      z.tuple([
        z.number().min(-180).max(180), // Longitude
        z.number().min(-90).max(90),   // Latitude
      ])
    ).min(4, 'Polygon must have at least 4 coordinates (3 points + 1 closing point)')
  ).min(1, 'Polygon must define at least one linear ring'),
}).refine(
  (data) => {
    // Validate that the polygon is closed
    const outerRing = data.coordinates[0];
    if (!outerRing || outerRing.length === 0) return false;
    
    const first = outerRing[0];
    const last = outerRing[outerRing.length - 1];
    
    return first[0] === last[0] && first[1] === last[1];
  },
  {
    message: 'Polygon linear ring must be closed (first and last coordinates must match)',
    path: ['coordinates'],
  }
);

export type GeoJsonPolygon = z.infer<typeof GeoJsonPolygonSchema>;

/**
 * Simplified Address Schema for display and geocoding.
 */
export const AddressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Region is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(2, 'Country code is required'),
  coordinates: GeoJsonPointSchema.optional(),
});

export type Address = z.infer<typeof AddressSchema>;