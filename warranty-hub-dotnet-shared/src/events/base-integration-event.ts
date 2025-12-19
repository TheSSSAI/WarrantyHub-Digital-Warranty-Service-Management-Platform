import { v4 as uuidv4 } from 'uuid';

/**
 * Abstract base class for all Integration Events.
 * Ensures consistent metadata envelope for asynchronous messaging via Azure Service Bus.
 * 
 * @property id Unique identifier for the event (idempotency key).
 * @property occurredOn ISO timestamp of when the event happened.
 * @property correlationId Trace ID for observability across services.
 * @property version Version of the event schema.
 */
export abstract class BaseIntegrationEvent {
  public readonly id: string;
  public readonly occurredOn: Date;
  public readonly correlationId: string;
  public readonly version: string;

  constructor(correlationId?: string) {
    this.id = uuidv4();
    this.occurredOn = new Date();
    this.correlationId = correlationId || uuidv4();
    this.version = '1.0';
  }

  /**
   * Returns the event topic name. Should be overridden or defined by metadata.
   */
  abstract getEventName(): string;
}