import { FeatureCollection, Polygon, MultiPolygon } from 'geojson';

/**
 * Enumeration for Service Center verification status.
 */
export enum ServiceCenterStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  SUSPENDED = 'Suspended',
}

/**
 * Represents the structure of a Service Center entity.
 */
export interface IServiceCenter {
  id: string;
  name: string;
  registrationNumber: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  status: ServiceCenterStatus;
  brandsSupported: string[]; // List of Brand IDs
  createdAt: string;
  updatedAt: string;
}

/**
 * Data structure for defining geographic service areas.
 * Supports both postal code lists and GeoJSON polygons.
 */
export interface IServiceAreaDefinition {
  serviceCenterId: string;
  brandId: string; // Service areas are specific to a brand relationship
  postalCodes: string[];
  geoJson?: FeatureCollection<Polygon | MultiPolygon>;
}

/**
 * Represents a Technician associated with a Service Center.
 */
export interface ITechnician {
  id: string;
  serviceCenterId: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  skills: string[];
  currentLoad: number; // Number of active tickets
  availabilityStatus: 'Available' | 'OnJob' | 'Offline';
  lastKnownLocation?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
}

/**
 * DTO for creating a new Service Center application.
 */
export interface CreateServiceCenterRequest {
  name: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  address: IServiceCenter['address'];
  authorizedBrands: string[]; // IDs of brands applying for
}

/**
 * DTO for updating a Service Area.
 */
export interface UpdateServiceAreaRequest {
  postalCodes: string[];
  geoJson?: FeatureCollection<Polygon | MultiPolygon>;
}

/**
 * Summary metrics for Service Center dashboard.
 */
export interface IServiceCenterMetrics {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  avgResolutionTimeHours: number;
  customerRating: number;
}