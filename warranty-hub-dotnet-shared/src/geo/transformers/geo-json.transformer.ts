import { ValueTransformer } from 'typeorm';
import { GeoPointDto } from '../dtos/geo-point.dto';
import { GeoPolygonDto } from '../dtos/geo-polygon.dto';

/**
 * TypeORM ValueTransformer for handling PostGIS Geometry types.
 * Converts between Database Geometry objects (GeoJSON/WKB) and Application DTOs.
 *
 * Supports REQ-FUNC-002 for geospatial queries.
 */
export class GeoJsonTransformer implements ValueTransformer {
  /**
   * Converts the DTO to a format compatible with the database driver (PostGIS).
   * We store as GeoJSON object which PostGIS/TypeORM can cast to geometry.
   *
   * @param value - The GeoPointDto or GeoPolygonDto from the application.
   * @returns The GeoJSON object for database storage.
   */
  to(value: GeoPointDto | GeoPolygonDto | null): object | null {
    if (!value) {
      return null;
    }
    // Ensure the structure matches standard GeoJSON expectation
    return {
      type: value.type,
      coordinates: value.coordinates,
    };
  }

  /**
   * Converts the value retrieved from the database to the Application DTO.
   * Handles cases where the DB driver returns a string or an object.
   *
   * @param value - The raw value from the database.
   * @returns The typed GeoPointDto or GeoPolygonDto.
   */
  from(value: any): GeoPointDto | GeoPolygonDto | null {
    if (!value) {
      return null;
    }

    // Handle stringified JSON if the driver returns string
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }

    // Handle object if driver returns object (common with pg driver)
    if (typeof value === 'object' && value.type && value.coordinates) {
      return value as GeoPointDto | GeoPolygonDto;
    }

    return null;
  }
}