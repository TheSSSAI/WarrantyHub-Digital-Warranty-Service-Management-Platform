import { Polygon } from 'geojson';

/**
 * Interface for validating geospatial data integrity.
 * Implementations should handle complex validations like self-intersection checks,
 * which may require libraries like Turf.js or database functions.
 */
export interface IGeoSpatialValidator {
  /**
   * Validates if a polygon is topologically valid (e.g., simple, non-self-intersecting).
   * @param polygon The GeoJSON polygon to validate
   * @returns boolean true if valid
   * @throws Error if validation fails with specific reason
   */
  validatePolygon(polygon: Polygon): Promise<boolean>;

  /**
   * Checks if a point is contained within a polygon.
   * @param latitude
   * @param longitude
   * @param polygon
   */
  isPointInPolygon(
    latitude: number,
    longitude: number,
    polygon: Polygon,
  ): boolean;
}

export const IGeoSpatialValidator = Symbol('IGeoSpatialValidator');