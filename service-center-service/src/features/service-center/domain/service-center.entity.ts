import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany 
} from 'typeorm';
import { ServiceCenterStatus } from './enums/service-center-status.enum';
import { ServiceAreaPolygonSchema } from '../infrastructure/persistence/service-area-polygon.schema';

/**
 * ServiceCenter Aggregate Root
 * Represents a service center profile and its lifecycle state.
 * Acts as the primary transactional boundary for onboarding and configuration.
 */
@Entity('service_centers')
export class ServiceCenter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: ServiceCenterStatus,
    default: ServiceCenterStatus.PENDING_APPROVAL
  })
  status: ServiceCenterStatus;

  @Column({ type: 'jsonb', name: 'contact_details' })
  contactDetails: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    primaryContactName: string;
  };

  /**
   * Stores list of Brand IDs that this Service Center is authorized to service.
   * In a full relational model, this might be a Many-to-Many relation, 
   * but for this service's scope, storing IDs allows for loose coupling with the Brand Service.
   */
  @Column({ type: 'simple-array', name: 'brand_ids', default: '' })
  brandIds: string[];

  @Column({ type: 'text', nullable: true, name: 'rejection_reason' })
  rejectionReason: string | null;

  @OneToMany(() => ServiceAreaPolygonSchema, (serviceArea) => serviceArea.serviceCenter, {
    cascade: true,
  })
  serviceAreas: ServiceAreaPolygonSchema[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * Approves the service center registration.
   * @throws Error if the service center is not in a pending state.
   */
  public approve(): void {
    if (this.status !== ServiceCenterStatus.PENDING_APPROVAL) {
      throw new Error(`Cannot approve Service Center. Current status is ${this.status}.`);
    }
    this.status = ServiceCenterStatus.APPROVED;
    this.rejectionReason = null;
  }

  /**
   * Rejects the service center registration with a mandatory reason.
   * @param reason The reason for rejection.
   * @throws Error if the service center is not in a pending state.
   */
  public reject(reason: string): void {
    if (this.status !== ServiceCenterStatus.PENDING_APPROVAL) {
      throw new Error(`Cannot reject Service Center. Current status is ${this.status}.`);
    }
    if (!reason || reason.trim().length === 0) {
      throw new Error('Rejection reason is required.');
    }
    this.status = ServiceCenterStatus.REJECTED;
    this.rejectionReason = reason;
  }

  /**
   * Activates the service center (e.g. after being inactive).
   */
  public activate(): void {
    if (this.status === ServiceCenterStatus.REJECTED) {
      throw new Error('Cannot activate a rejected Service Center. A new application is required.');
    }
    this.status = ServiceCenterStatus.APPROVED;
  }

  /**
   * Deactivates the service center.
   */
  public deactivate(): void {
    this.status = ServiceCenterStatus.INACTIVE;
  }

  /**
   * Grants authorization for the service center to service a specific brand.
   * @param brandId The UUID of the brand.
   */
  public addBrandAuthorization(brandId: string): void {
    if (!this.brandIds.includes(brandId)) {
      this.brandIds.push(brandId);
    }
  }

  /**
   * Revokes authorization for the service center to service a specific brand.
   * @param brandId The UUID of the brand.
   */
  public removeBrandAuthorization(brandId: string): void {
    this.brandIds = this.brandIds.filter(id => id !== brandId);
  }

  /**
   * Updates contact details for the service center.
   * @param details The new contact details.
   */
  public updateContactDetails(details: ServiceCenter['contactDetails']): void {
    this.contactDetails = {
      ...this.contactDetails,
      ...details
    };
  }
}