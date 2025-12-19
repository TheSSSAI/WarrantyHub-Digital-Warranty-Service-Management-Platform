/**
 * Enumeration for Warranty Status badges.
 */
export enum WarrantyStatus {
  ACTIVE = 'Active',
  EXPIRING_SOON = 'Expiring Soon',
  EXPIRED = 'Expired',
  VOID = 'Void',
}

/**
 * Represents a registered product owned by a consumer.
 */
export interface IProduct {
  id: string;
  userId: string;
  brandId: string;
  brandName: string;
  modelNumber: string;
  serialNumber: string;
  nickName?: string;
  purchaseDate: string;
  registrationDate: string;
  categoryId: string;
  categoryName: string;
  imageUrl?: string;
  isDeleted: boolean;
  warrantyStatus: WarrantyStatus; // Computed property
}

/**
 * Represents a Warranty associated with a Product.
 * A product can have multiple warranties (Manufacturer, Extended).
 */
export interface IWarranty {
  id: string;
  productId: string;
  warrantyType: 'Manufacturer' | 'Extended' | 'Retailer';
  providerName: string;
  startDate: string;
  endDate: string;
  coverageDetails: string;
  documentUrl?: string; // Link to T&C or specific warranty doc
  status: WarrantyStatus;
}

/**
 * Represents an uploaded Invoice/Proof of Purchase.
 */
export interface IInvoice {
  id: string;
  productId: string;
  fileUrl: string; // Secure SAS URL
  fileName: string;
  uploadDate: string;
  mimeType: string;
  fileSize: number;
  ocrData?: {
    extractedText: string;
    confidenceScore: number;
    purchaseDate?: string;
    vendorName?: string;
    totalAmount?: number;
  };
}

/**
 * DTO for registering a new product.
 */
export interface CreateProductRequest {
  brandId: string;
  modelNumber: string;
  serialNumber: string;
  purchaseDate: string; // ISO Date
  nickName?: string;
  invoiceFileId?: string; // ID of previously uploaded invoice
}

/**
 * DTO for adding a warranty to a product.
 */
export interface AddWarrantyRequest {
  warrantyType: IWarranty['warrantyType'];
  providerName: string;
  durationMonths: number;
  startDate?: string; // Defaults to purchase date if null
  documentFileId?: string;
}

/**
 * DTO for initiating a product transfer.
 */
export interface InitiateTransferRequest {
  productId: string;
  recipientEmail: string;
  notes?: string;
}

/**
 * Response for Product List with pagination.
 */
export interface ProductListResponse {
  items: IProduct[];
  total: number;
  page: number;
  limit: number;
}