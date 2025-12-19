import { IsString, IsArray, Equals, ArrayMinSize } from 'class-validator';

/**
 * Data Transfer Object for GeoJSON Polygon.
 * Used for defining Service Center service areas (REQ-FUNC-002).
 */
export class GeoPolygonDto {
  /**
   * GeoJSON Type. Must be 'Polygon'.
   */
  @IsString()
  @Equals('Polygon')
  type: 'Polygon';

  /**
   * Array of LinearRings. 
   * The first element is the exterior ring. Subsequent elements are interior rings (holes).
   * Each LinearRing is an array of [longitude, latitude] pairs.
   */
  @IsArray()
  @ArrayMinSize(1)
  coordinates: number[][][];
}