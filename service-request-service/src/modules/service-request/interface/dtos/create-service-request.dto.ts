import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GeoLocationDto {
  @ApiProperty({
    description: 'Latitude coordinate of the service location',
    example: 34.0522,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate of the service location',
    example: -118.2437,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}

export class CreateServiceRequestDto {
  @ApiProperty({
    description: 'The unique identifier of the product requiring service',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID('4')
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'A detailed description of the issue being experienced',
    example: 'The refrigerator is making a loud humming noise and not cooling properly.',
    minLength: 10,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  issueDescription: string;

  @ApiProperty({
    description: 'The category/type of issue selected by the user',
    example: 'Cooling System Failure',
  })
  @IsString()
  @IsNotEmpty()
  issueType: string;

  @ApiProperty({
    description: 'The physical address where the service will be performed',
    example: '123 Main St, Springfield, IL 62704',
  })
  @IsString()
  @IsNotEmpty()
  serviceAddress: string;

  @ApiProperty({
    description: 'Geospatial coordinates for the service location, used for routing',
    type: GeoLocationDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GeoLocationDto)
  coordinates: GeoLocationDto;

  @ApiPropertyOptional({
    description: 'Preferred date and time for the service visit (ISO 8601 format)',
    example: '2023-12-25T10:00:00Z',
  })
  @IsOptional()
  @IsString()
  preferredTimeSlot?: string;
}