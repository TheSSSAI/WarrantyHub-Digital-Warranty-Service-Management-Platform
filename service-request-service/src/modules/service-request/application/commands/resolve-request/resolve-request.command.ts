export interface IResolveRequestProps {
  requestId: string;
  technicianId: string;
  resolutionNotes: string;
  partsUsed?: string[];
  signatureUrl?: string;
}

export class ResolveRequestCommand {
  public readonly requestId: string;
  public readonly technicianId: string;
  public readonly resolutionNotes: string;
  public readonly partsUsed: string[];
  public readonly signatureUrl?: string;

  /**
   * Creates a new command to mark a service request as resolved.
   *
   * @param props properties required to resolve the request
   */
  constructor(props: IResolveRequestProps) {
    this.validate(props);
    this.requestId = props.requestId;
    this.technicianId = props.technicianId;
    this.resolutionNotes = props.resolutionNotes;
    this.partsUsed = props.partsUsed || [];
    this.signatureUrl = props.signatureUrl;
  }

  private validate(props: IResolveRequestProps): void {
    if (!props.requestId) {
      throw new Error('Request ID is required to resolve a request');
    }
    if (!props.technicianId) {
      throw new Error('Technician ID is required to verify resolution authority');
    }
    if (!props.resolutionNotes || props.resolutionNotes.trim().length === 0) {
      throw new Error('Resolution notes are mandatory for resolving a request');
    }
  }
}