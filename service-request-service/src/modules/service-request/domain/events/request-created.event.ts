import { ServiceRequestStatus } from '../enums/service-request-status.enum';

export class ServiceRequestCreatedEvent {
  constructor(
    public readonly requestId: string,
    public readonly userId: string,
    public readonly productId: string,
    public readonly initialStatus: ServiceRequestStatus,
    public readonly timestamp: Date,
    public readonly serviceCenterId?: string | null
  ) {}
}