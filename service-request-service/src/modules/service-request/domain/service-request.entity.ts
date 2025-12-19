import { ServiceRequestStatus } from './enums/service-request-status.enum';
import { GeoLocation } from './value-objects/geo-location.vo';
import { CreateServiceRequestDto } from '../interface/dtos/create-service-request.dto';
import { v4 as uuidv4 } from 'uuid';

export class ServiceRequestEntity {
  private _id: string;
  private _userId: string;
  private _productId: string;
  private _serviceCenterId: string | null;
  private _technicianId: string | null;
  private _status: ServiceRequestStatus;
  private _issueDescription: string;
  private _location: GeoLocation;
  private _resolutionNotes: string | null;
  private _customerSignatureUrl: string | null;
  private _disputeReason: string | null;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _resolvedAt: Date | null;
  private _closedAt: Date | null;

  constructor(
    id: string,
    userId: string,
    productId: string,
    issueDescription: string,
    location: GeoLocation,
    status: ServiceRequestStatus,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._userId = userId;
    this._productId = productId;
    this._issueDescription = issueDescription;
    this._location = location;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._serviceCenterId = null;
    this._technicianId = null;
    this._resolutionNotes = null;
    this._customerSignatureUrl = null;
    this._disputeReason = null;
    this._resolvedAt = null;
    this._closedAt = null;
  }

  // Factory method to ensure valid initial state
  public static create(dto: CreateServiceRequestDto, userId: string): ServiceRequestEntity {
    const now = new Date();
    // Assuming GeoLocation has a static create or constructor compatible with DTO
    const location = new GeoLocation(dto.coordinates.latitude, dto.coordinates.longitude);
    
    return new ServiceRequestEntity(
      uuidv4(),
      userId,
      dto.productId,
      dto.issueDescription,
      location,
      ServiceRequestStatus.REQUESTED,
      now,
      now
    );
  }

  // Getters
  public get id(): string { return this._id; }
  public get userId(): string { return this._userId; }
  public get productId(): string { return this._productId; }
  public get serviceCenterId(): string | null { return this._serviceCenterId; }
  public get technicianId(): string | null { return this._technicianId; }
  public get status(): ServiceRequestStatus { return this._status; }
  public get issueDescription(): string { return this._issueDescription; }
  public get location(): GeoLocation { return this._location; }
  public get resolutionNotes(): string | null { return this._resolutionNotes; }
  public get customerSignatureUrl(): string | null { return this._customerSignatureUrl; }
  public get disputeReason(): string | null { return this._disputeReason; }
  public get createdAt(): Date { return this._createdAt; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get resolvedAt(): Date | null { return this._resolvedAt; }
  public get closedAt(): Date | null { return this._closedAt; }

  // Domain Behaviors (State Machine)

  public assignServiceCenter(serviceCenterId: string): void {
    if (this._status !== ServiceRequestStatus.REQUESTED) {
      throw new Error(`Cannot assign service center when status is ${this._status}`);
    }
    this._serviceCenterId = serviceCenterId;
    this._status = ServiceRequestStatus.ASSIGNED; // Or kept as REQUESTED/ROUTED depending on specific sub-status needs, assuming ASSIGNED implies Center assignment
    this._updatedAt = new Date();
  }

  public assignTechnician(technicianId: string): void {
    if (!this._serviceCenterId) {
      throw new Error('Cannot assign technician before service center is assigned');
    }
    if (this._status === ServiceRequestStatus.CLOSED || this._status === ServiceRequestStatus.RESOLVED) {
      throw new Error('Cannot assign technician to a completed request');
    }
    
    this._technicianId = technicianId;
    this._status = ServiceRequestStatus.ASSIGNED;
    this._updatedAt = new Date();
  }

  public startWork(): void {
    if (this._status !== ServiceRequestStatus.ASSIGNED) {
      throw new Error('Job must be assigned before starting work');
    }
    this._status = ServiceRequestStatus.IN_PROGRESS;
    this._updatedAt = new Date();
  }

  public resolve(notes: string, signatureUrl: string): void {
    if (this._status !== ServiceRequestStatus.IN_PROGRESS) {
      throw new Error('Job must be in progress to be resolved');
    }
    if (!notes || !signatureUrl) {
      throw new Error('Resolution notes and customer signature are required to resolve a request');
    }

    this._resolutionNotes = notes;
    this._customerSignatureUrl = signatureUrl;
    this._status = ServiceRequestStatus.RESOLVED;
    this._resolvedAt = new Date();
    this._updatedAt = new Date();
  }

  public dispute(reason: string): void {
    if (this._status !== ServiceRequestStatus.RESOLVED) {
      throw new Error('Only resolved requests can be disputed');
    }
    
    // REQ-FUNC-008: Validate 7-day window
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const timeSinceResolution = new Date().getTime() - (this._resolvedAt?.getTime() || 0);
    
    if (timeSinceResolution > sevenDaysInMs) {
      throw new Error('Dispute window of 7 days has expired');
    }

    this._disputeReason = reason;
    this._status = ServiceRequestStatus.DISPUTED;
    this._updatedAt = new Date();
  }

  public close(): void {
    if (this._status !== ServiceRequestStatus.RESOLVED && this._status !== ServiceRequestStatus.DISPUTED) {
      // Depending on business rules, we might allow closing from DISPUTED if admin overrides
      throw new Error('Request must be resolved or disputed before final closure');
    }
    
    this._status = ServiceRequestStatus.CLOSED;
    this._closedAt = new Date();
    this._updatedAt = new Date();
  }

  // Hydration helper for persistence layer to reconstruct entity
  public static reconstitute(props: Partial<ServiceRequestEntity>): ServiceRequestEntity {
    const entity = new ServiceRequestEntity(
      props._id!,
      props._userId!,
      props._productId!,
      props._issueDescription!,
      props._location!,
      props._status!,
      props._createdAt!,
      props._updatedAt!
    );
    entity._serviceCenterId = props._serviceCenterId || null;
    entity._technicianId = props._technicianId || null;
    entity._resolutionNotes = props._resolutionNotes || null;
    entity._customerSignatureUrl = props._customerSignatureUrl || null;
    entity._disputeReason = props._disputeReason || null;
    entity._resolvedAt = props._resolvedAt || null;
    entity._closedAt = props._closedAt || null;
    return entity;
  }
}