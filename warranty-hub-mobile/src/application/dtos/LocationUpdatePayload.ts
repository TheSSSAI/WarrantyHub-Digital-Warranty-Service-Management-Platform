/**
 * Data Transfer Object for transmitting real-time technician location updates.
 * Used by LocationTrackingService to payload data for SignalR/WebSocket transmission.
 */
export class LocationUpdatePayload {
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly heading: number;
  public readonly speed: number;
  public readonly jobId: string;
  public readonly technicianId: string;
  public readonly timestamp: number;

  constructor(
    latitude: number,
    longitude: number,
    heading: number,
    speed: number,
    jobId: string,
    technicianId: string,
    timestamp: number = Date.now()
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.heading = heading;
    this.speed = speed;
    this.jobId = jobId;
    this.technicianId = technicianId;
    this.timestamp = timestamp;

    this.validate();
  }

  /**
   * Validates the integrity of the location data.
   * Throws errors if coordinates are invalid or required fields are missing.
   */
  private validate(): void {
    if (this.latitude < -90 || this.latitude > 90) {
      throw new Error(`Invalid latitude: ${this.latitude}. Must be between -90 and 90.`);
    }
    if (this.longitude < -180 || this.longitude > 180) {
      throw new Error(`Invalid longitude: ${this.longitude}. Must be between -180 and 180.`);
    }
    if (!this.jobId || this.jobId.trim() === '') {
      throw new Error('Location update requires a valid Job ID.');
    }
    if (!this.technicianId || this.technicianId.trim() === '') {
      throw new Error('Location update requires a valid Technician ID.');
    }
  }

  /**
   * Serializes the DTO for transmission over the wire.
   */
  public toJSON(): object {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      heading: this.heading,
      speed: this.speed,
      jobId: this.jobId,
      technicianId: this.technicianId,
      timestamp: this.timestamp,
    };
  }
}