export interface ProductWarrantyStatus {
  isValid: boolean;
  isExpired: boolean;
  expiryDate?: Date;
  warrantyType?: string; // e.g., 'Manufacturer', 'Extended'
  coverageDetails?: string;
}

export interface ProductDetails {
  id: string;
  model: string;
  brandId: string;
  categoryId: string;
  ownerId: string;
}

export interface IProductIntegrationPort {
  /**
   * Validates if a product has an active warranty and retrieves warranty status.
   * This method interacts with the Product Service.
   * @param productId UUID of the product
   * @param userId UUID of the user claiming ownership (for validation)
   * @returns Warranty status details
   * @throws Error if product does not exist or user is not owner
   */
  validateWarranty(productId: string, userId: string): Promise<ProductWarrantyStatus>;

  /**
   * Retrieves core details of a product required for service request routing/processing.
   * @param productId UUID of the product
   * @returns Product details DTO
   */
  getProductDetails(productId: string): Promise<ProductDetails>;
}