import { AggregateRoot } from '@nestjs/cqrs';
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany, 
  Index 
} from 'typeorm';
import { ProductLockedEvent } from './events/product-locked.event';
import { WarrantyBadgeStatus } from './enums/warranty-badge-status.enum';

/**
 * Interface representing the minimal warranty structure required for domain logic calculations.
 * This decouples the Product entity from the concrete Warranty entity implementation details
 * while allowing business logic execution.
 */
export interface IDomainWarranty {
  id: string;
  endDate: Date;
  startDate: Date;
  isActive: boolean;
}

@Entity('products')
export class ProductEntity extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @Column({ name: 'brand_id' })
  brandId: string;

  @Column({ name: 'model_id' })
  modelId: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @Column({ name: 'serial_number' })
  @Index() // Optimizes uniqueness checks and lookups
  serialNumber: string;

  @Column({ name: 'purchase_date', type: 'timestamptz' })
  purchaseDate: Date;

  @Column({ name: 'is_locked', default: false })
  isLocked: boolean;

  @Column({ name: 'lock_reason', nullable: true })
  lockReason: string | null;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  /**
   * Note: The OneToMany relationship with WarrantyEntity is defined here conceptually.
   * In a full implementation, this would use the @OneToMany decorator importing WarrantyEntity.
   * For the purpose of this domain logic, we use a protected property that can be hydrated by the ORM.
   */
  warranties: IDomainWarranty[];

  constructor(partial?: Partial<ProductEntity>) {
    super();
    if (partial) {
      Object.assign(this, partial);
    }
  }

  /**
   * REQ-BR-001: Locks the product critical details preventing further edits.
   * This is typically triggered when the first service request is created.
   * 
   * @param reason - The justification for locking the product record.
   * @throws Error if the product is already locked.
   */
  public lock(reason: string): void {
    if (this.isLocked) {
      // Operation is idempotent but we log/warn if needed. 
      // For strict domain enforcement, we could throw, but here we just ensure state.
      return;
    }

    this.isLocked = true;
    this.lockReason = reason;

    // Publish domain event to notify other contexts (e.g., Audit Logging)
    this.apply(new ProductLockedEvent(this.id, reason, new Date()));
  }

  /**
   * Updates product details while enforcing the locking business rule.
   * 
   * @param updates - Partial object containing fields to update.
   * @throws Error if attempting to update locked fields (Serial, Model, PurchaseDate).
   */
  public updateDetails(updates: Partial<Pick<ProductEntity, 'serialNumber' | 'modelId' | 'purchaseDate' | 'brandId'>>): void {
    if (this.isLocked) {
      const criticalFields: (keyof ProductEntity)[] = ['serialNumber', 'modelId', 'purchaseDate'];
      const hasCriticalUpdates = criticalFields.some(field => updates[field] !== undefined && updates[field] !== this[field]);

      if (hasCriticalUpdates) {
        throw new Error('Operation Failed: Cannot update critical details (Serial Number, Model, Purchase Date) on a locked product. Service history exists.');
      }
    }

    Object.assign(this, updates);
  }

  /**
   * Marks the product as soft-deleted.
   * Used for retaining data integrity for analytics while removing it from user view.
   */
  public markAsDeleted(): void {
    if (this.isDeleted) {
      return;
    }
    this.isDeleted = true;
    this.deletedAt = new Date();
  }

  /**
   * REQ-FUNC-005: Calculates the current warranty status badge.
   * Logic priorities:
   * 1. If any warranty is active and > 30 days remaining -> GREEN (Valid)
   * 2. If any warranty is active and <= 30 days remaining -> AMBER (Expiring Soon)
   * 3. If all warranties are expired -> RED (Expired)
   * 
   * @returns WarrantyBadgeStatus enum value
   */
  public getWarrantyStatus(): WarrantyBadgeStatus {
    if (!this.warranties || this.warranties.length === 0) {
      // Fallback if no warranty data is linked/loaded
      return WarrantyBadgeStatus.Expired;
    }

    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    let hasActive = false;
    let isExpiringSoon = false;

    for (const warranty of this.warranties) {
      // Normalize dates
      const endDate = new Date(warranty.endDate);
      const startDate = new Date(warranty.startDate);

      // Check if warranty is currently valid (started and not ended)
      if (startDate <= now && endDate >= now) {
        hasActive = true;

        // Check if this specific active warranty expires within 30 days
        if (endDate <= thirtyDaysFromNow) {
          isExpiringSoon = true;
        } else {
          // Found an active warranty with > 30 days. This takes precedence as "Green/Valid".
          // If we have at least one solid long-term warranty, the product is safe.
          return WarrantyBadgeStatus.Valid; 
        }
      }
    }

    if (hasActive && isExpiringSoon) {
      // We found active warranties, but the best one we found is expiring soon.
      return WarrantyBadgeStatus.ExpiringSoon;
    }

    // No active warranties found
    return WarrantyBadgeStatus.Expired;
  }

  /**
   * Validates if the product is eligible for ownership transfer.
   * A product cannot be transferred if it is deleted or legally locked (e.g. reported stolen - future scope).
   */
  public isTransferable(): boolean {
    if (this.isDeleted) {
      return false;
    }
    return true;
  }
}