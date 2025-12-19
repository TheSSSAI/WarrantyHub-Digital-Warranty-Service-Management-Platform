import { Polygon, Position } from 'geojson';
import { BadRequestException } from '@nestjs/common';

export class ServiceAreaPolygon {
  private readonly _geometry: Polygon;

  constructor(geometry: Polygon) {
    this.validateStructure(geometry);
    this._geometry = geometry;
  }

  public get geometry(): Polygon {
    // Return a copy to maintain immutability
    return JSON.parse(JSON.stringify(this._geometry));
  }

  private validateStructure(geometry: Polygon): void {
    if (!geometry) {
      throw new BadRequestException('Geometry cannot be null or undefined');
    }

    if (geometry.type !== 'Polygon') {
      throw new BadRequestException('Geometry type must be Polygon');
    }

    if (!Array.isArray(geometry.coordinates) || geometry.coordinates.length === 0) {
      throw new BadRequestException('Polygon must contain coordinates');
    }

    const linearRing = geometry.coordinates[0];

    // A LinearRing is a closed LineString with 4 or more positions.
    // The first and last positions are equivalent, and they must contain at least 3 distinct positions.
    if (!Array.isArray(linearRing) || linearRing.length < 4) {
      throw new BadRequestException(
        'Polygon LinearRing must contain at least 4 positions (start, 2 points, end)',
      );
    }

    // Check if closed (first point equals last point)
    const firstPoint = linearRing[0];
    const lastPoint = linearRing[linearRing.length - 1];

    if (!this.arePointsEqual(firstPoint, lastPoint)) {
      throw new BadRequestException(
        'Polygon must be closed (first and last coordinates must match)',
      );
    }
  }

  private arePointsEqual(p1: Position, p2: Position): boolean {
    if (p1.length !== p2.length) return false;
    for (let i = 0; i < p1.length; i++) {
      if (p1[i] !== p2[i]) return false;
    }
    return true;
  }

  /**
   * Creates a new ServiceAreaPolygon from raw GeoJSON
   * @param json Raw GeoJSON Polygon object
   */
  public static fromGeoJSON(json: Polygon): ServiceAreaPolygon {
    return new ServiceAreaPolygon(json);
  }
}