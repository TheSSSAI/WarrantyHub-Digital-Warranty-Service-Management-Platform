import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';

/**
 * Data Transfer Object for registering a mobile device token.
 * Used by the Presentation Layer (Controllers).
 */
export class DeviceRegistrationDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsEnum(['ios', 'android'])
  @IsNotEmpty()
  platform: 'ios' | 'android';

  @IsString()
  @IsOptional()
  deviceId?: string; // Optional unique hardware ID if needed for tracking multiple devices per user
}