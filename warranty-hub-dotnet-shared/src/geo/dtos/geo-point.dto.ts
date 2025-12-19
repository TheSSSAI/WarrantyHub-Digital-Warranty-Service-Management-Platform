import { IsNumber, IsString, Equals, ArrayMinSize, ArrayMaxSize } from 'class-validator';

/**
 * Data Transfer Object for GeoJSON Point.
 * Used for API validation of location coordinates (Latitude/Longitude).
 * Complies with RFC 7946 GeoJSON format.
 */
export class GeoPointDto {
  /**
   * GeoJSON Type. Must be 'Point'.
   */
  @IsString()
  @Equals('Point')
  type: 'Point';

  /**
   * Coordinates array [longitude, latitude].
   * Note: GeoJSON uses (Lon, Lat) order, PostGIS matches this.
   */
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: number[];
}