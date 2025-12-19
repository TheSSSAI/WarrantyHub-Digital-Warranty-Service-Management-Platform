import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

/**
 * Abstract Base Entity that provides standard ID and audit timestamp fields.
 * All domain entities should extend this class to ensure consistency across the database schema.
 * Supports Soft Delete automatically via TypeORM decorators.
 */
export abstract class BaseEntity {
  /**
   * Primary Key - UUID
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Timestamp when the record was created.
   * Automatically managed by TypeORM.
   */
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  /**
   * Timestamp when the record was last updated.
   * Automatically managed by TypeORM.
   */
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  /**
   * Timestamp when the record was soft-deleted.
   * If null, the record is active. If set, the record is considered deleted.
   * Automatically managed by TypeORM when softDelete is called.
   */
  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  /**
   * ID of the user who created the record.
   * Should be populated manually or via subscriber.
   */
  @Column({ name: 'created_by', type: 'varchar', nullable: true })
  createdBy?: string;

  /**
   * ID of the user who last updated the record.
   */
  @Column({ name: 'updated_by', type: 'varchar', nullable: true })
  updatedBy?: string;

  /**
   * ID of the user who deleted the record.
   */
  @Column({ name: 'deleted_by', type: 'varchar', nullable: true })
  deletedBy?: string;
}