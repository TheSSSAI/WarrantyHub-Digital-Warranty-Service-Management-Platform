import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as turf from '@turf/turf';
import { IGeoSpatialValidator } from '../../domain/interfaces/geo-spatial-validator.interface';

@Injectable()
export class TurfJsGeoValidator implements IGeoSpatialValidator {
  private readonly logger = new Logger(TurfJsGeoValidator.name);

  /**
   * Validates a GeoJSON Polygon for structural correctness, closure, and self-intersection.
   * 
   * @param geoJson The GeoJSON object to validate
   * @returns boolean True if valid
   * @throws BadRequestException if invalid
   */
  validatePolygon(geoJson: any): boolean {
    this.logger.debug('Validating GeoJSON Polygon structure');

    if (!geoJson || geoJson.type !== 'Polygon' || !Array.isArray(geoJson.coordinates)) {
      throw new BadRequestException('Invalid GeoJSON structure: Must be of type Polygon with coordinates array.');
    }

    const rings = geoJson.coordinates;
    if (rings.length === 0) {
      throw new BadRequestException('Polygon must have at least one linear ring.');
    }

    // Validate each ring
    for (let i = 0; i < rings.length; i++) {
      const ring = rings[i];
      
      // A linear ring must have at least 4 coordinates (3 points + closure)
      if (!Array.isArray(ring) || ring.length < 4) {
        throw new BadRequestException(`Polygon ring ${i} must have at least 4 coordinates to form a closed shape.`);
      }

      // Validate closure (first point == last point)
      const firstPoint = ring[0];
      const lastPoint = ring[ring.length - 1];

      if (
        firstPoint[0] !== lastPoint[0] ||
        firstPoint[1] !== lastPoint[1]
      ) {
        throw new BadRequestException(`Polygon ring ${i} is not closed. First and last coordinates must match.`);
      }
      
      // Validate coordinate ranges
      for (const coord of ring) {
        const [lon, lat] = coord;
        if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
           throw new BadRequestException(`Invalid coordinates found: [${lon}, ${lat}]. Latitude must be between -90/90, Longitude between -180/180.`);
        }
      }
    }

    // Validate Self-Intersection using Turf.js
    // Note: Complex polygons might need robust cleanup, but we enforce valid input for simplicity.
    try {
      const polygonFeature = turf.polygon(geoJson.coordinates);
      const kinks = turf.kinks(polygonFeature);
      
      if (kinks.features.length > 0) {
        this.logger.warn(`Polygon self-intersection detected: ${JSON.stringify(kinks.features)}`);
        throw new BadRequestException('Polygon geometry is invalid: Self-intersection detected. Service areas must be simple polygons.');
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      this.logger.error(`Turf.js validation error: ${error.message}`);
      throw new BadRequestException('Failed to validate polygon geometry.');
    }

    return true;
  }
}