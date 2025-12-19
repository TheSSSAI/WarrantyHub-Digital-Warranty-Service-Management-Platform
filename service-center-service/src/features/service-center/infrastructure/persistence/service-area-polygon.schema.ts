import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  ManyToOne, 
  Index,
  JoinColumn
} from 'typeorm';
import { ServiceCenter } from '../../domain/service-center.entity';

/**
 * ServiceAreaPolygonSchema
 * Persistence entity for storing geographic service definitions.
 * Utilizes PostGIS geometry types for spatial operations.
 * Maps the relationship between a Service Center, a Brand, and a physical coverage area.
 */
@Entity('service_area_polygons')
export class ServiceAreaPolygonSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'service_center_id', type: 'uuid' })
  @Index()
  serviceCenterId: string;

  @Column({ name: 'brand_id', type: 'uuid' })
  @Index()
  brandId: string;

  /**
   * The geospatial definition of the service area.
   * Uses SRID 4326 (WGS 84) which is the standard for GPS coordinates (lat/long).
   * A spatial index (GiST) is required for performance on ST_Contains queries.
   */
  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: false
  })
  geometry: object; // TypeORM maps GeoJSON object to this geometry column

  /**
   * List of postal codes covered by this service area definition.
   * Used as a fallback or complementary definition to the polygon.
   */
  @Column({ type: 'jsonb', name: 'postal_codes', default: [] })
  postalCodes: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /**
   * Relationship to the parent Service Center.
   * Deleting the Service Center will cascade delete its service areas.
   */
  @ManyToOne(() => ServiceCenter, (serviceCenter) => serviceCenter.serviceAreas, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: 'service_center_id' })
  serviceCenter: ServiceCenter;

  /**
   * Factory method to create a new instance with validation logic if needed.
   */
  static create(
    serviceCenterId: string, 
    brandId: string, 
    geometry: object, 
    postalCodes: string[] = []
  ): ServiceAreaPolygonSchema {
    const area = new ServiceAreaPolygonSchema();
    area.serviceCenterId = serviceCenterId;
    area.brandId = brandId;
    area.geometry = geometry;
    area.postalCodes = postalCodes;
    return area;
  }
}