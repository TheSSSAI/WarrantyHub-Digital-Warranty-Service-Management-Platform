import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Polygon } from 'geojson';

class GeoJsonPolygonDto implements Polygon {
  @ApiProperty({ example: 'Polygon', description: 'The type of the GeoJSON geometry.' })
  @IsNotEmpty()
  type: 'Polygon';

  @ApiProperty({
    example: [
      [
        [100.0, 0.0],
        [101.0, 0.0],
        [101.0, 1.0],
        [100.0, 1.0],
        [100.0, 0.0],
      ],
    ],
    description: 'Array of linear rings. The first ring is the exterior boundary.',
  })
  @IsNotEmpty()
  coordinates: number[][][];
}

/**
 * Data Transfer Object for defining a service center's geographic service area.
 * Used in the Controller layer to validate incoming HTTP requests.
 */
export class DefineServiceAreaDto {
  @ApiProperty({
    description: 'The UUID of the Brand for which this service area applies.',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({
    description: 'The GeoJSON Polygon defining the service area.',
    type: GeoJsonPolygonDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => GeoJsonPolygonDto)
  geometry: Polygon;
}