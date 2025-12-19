export interface IGeoLocationProps {
  latitude: number;
  longitude: number;
}

export class GeoLocation {
  private readonly _latitude: number;
  private readonly _longitude: number;

  private constructor(props: IGeoLocationProps) {
    this.validate(props);
    this._latitude = props.latitude;
    this._longitude = props.longitude;
  }

  public static create(props: IGeoLocationProps): GeoLocation {
    return new GeoLocation(props);
  }

  get latitude(): number {
    return this._latitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  private validate(props: IGeoLocationProps): void {
    if (props.latitude === undefined || props.latitude === null) {
      throw new Error('Latitude is required');
    }
    if (props.longitude === undefined || props.longitude === null) {
      throw new Error('Longitude is required');
    }
    if (props.latitude < -90 || props.latitude > 90) {
      throw new Error('Latitude must be between -90 and 90 degrees');
    }
    if (props.longitude < -180 || props.longitude > 180) {
      throw new Error('Longitude must be between -180 and 180 degrees');
    }
  }

  /**
   * Returns the location as a simple object.
   */
  public toValue(): IGeoLocationProps {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  /**
   * Returns a string representation of the location "lat,long".
   */
  public toString(): string {
    return `${this.latitude},${this.longitude}`;
  }

  /**
   * Calculates the distance to another location in kilometers using the Haversine formula.
   * @param other The other GeoLocation to measure distance to
   */
  public distanceTo(other: GeoLocation): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(other.latitude - this.latitude);
    const dLon = this.deg2rad(other.longitude - this.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.latitude)) *
        Math.cos(this.deg2rad(other.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}