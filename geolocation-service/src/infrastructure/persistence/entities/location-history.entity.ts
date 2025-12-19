import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

/**
 * Entity representing a point in the technician's location history.
 * Designed for TimescaleDB hypertable storage.
 * 
 * Composite Primary Key: timestamp + technicianId
 * This aligns with TimescaleDB's partitioning strategy where 'time' is the primary dimension.
 */
@Entity('location_history')
@Index(['serviceRequestId', 'timestamp']) // Optimize queries for replaying a specific job's path
export class LocationHistoryEntity {
  /**
   * The timestamp of the GPS reading.
   * Primary dimension for TimescaleDB partitioning.
   */
  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date;

  /**
   * Unique identifier of the technician.
   * Secondary dimension for uniqueness.
   */
  @PrimaryColumn({ type: 'uuid' })
  technicianId: string;

  /**
   * The service request (job) this location data belongs to.
   */
  @Column({ type: 'uuid' })
  serviceRequestId: string;

  /**
   * Latitude coordinate.
   * Using double precision for GPS accuracy.
   */
  @Column({ type: 'double precision' })
  latitude: number;

  /**
   * Longitude coordinate.
   * Using double precision for GPS accuracy.
   */
  @Column({ type: 'double precision' })
  longitude: number;

  /**
   * Heading in degrees (0-360).
   */
  @Column({ type: 'double precision', nullable: true })
  heading: number | null;

  /**
   * Speed in meters/second.
   */
  @Column({ type: 'double precision', nullable: true })
  speed: number | null;

  /**
   * Accuracy of the GPS reading in meters.
   */
  @Column({ type: 'double precision', nullable: true })
  accuracy: number | null;
}