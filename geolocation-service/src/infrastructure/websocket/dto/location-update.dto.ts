import { IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min, IsOptional } from 'class-validator';

/**
 * Data Transfer Object for incoming location updates via WebSocket.
 * Represents the payload sent by the technician's device.
 */
export class LocationUpdateDto {
  @IsUUID('4', { message: 'Job ID must be a valid UUID v4' })
  @IsNotEmpty({ message: 'Job ID is required' })
  jobId: string;

  @IsNumber({}, { message: 'Latitude must be a number' })
  @Min(-90, { message: 'Latitude must be greater than or equal to -90' })
  @Max(90, { message: 'Latitude must be less than or equal to 90' })
  @IsNotEmpty({ message: 'Latitude is required' })
  latitude: number;

  @IsNumber({}, { message: 'Longitude must be a number' })
  @Min(-180, { message: 'Longitude must be greater than or equal to -180' })
  @Max(180, { message: 'Longitude must be less than or equal to 180' })
  @IsNotEmpty({ message: 'Longitude is required' })
  longitude: number;

  @IsNumber({}, { message: 'Heading must be a number' })
  @Min(0, { message: 'Heading must be greater than or equal to 0' })
  @Max(360, { message: 'Heading must be less than or equal to 360' })
  @IsOptional()
  heading?: number;

  @IsNumber({}, { message: 'Speed must be a number' })
  @Min(0, { message: 'Speed must be non-negative' })
  @IsOptional()
  speed?: number;

  @IsNumber({}, { message: 'Timestamp must be a number (epoch milliseconds)' })
  @IsNotEmpty({ message: 'Timestamp is required' })
  timestamp: number;

  @IsString()
  @IsOptional()
  technicianId?: string; // Often set by the Auth Guard from the socket context, but defined here for internal passing
}