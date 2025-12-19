import { BaseIntegrationEvent } from '../base-integration-event';

/**
 * Contract for Event Publisher implementations.
 * Decouples the application layer from specific message broker implementations (e.g., Azure Service Bus).
 */
export interface IEventPublisher {
  /**
   * Publishes a single integration event to the message bus.
   *
   * @param event - The event to publish, extending BaseIntegrationEvent.
   * @returns A promise that resolves when the event is successfully dispatched.
   */
  publish<T extends BaseIntegrationEvent>(event: T): Promise<void>;

  /**
   * Publishes a batch of integration events.
   *
   * @param events - An array of events to publish.
   * @returns A promise that resolves when all events are successfully dispatched.
   */
  publishBatch<T extends BaseIntegrationEvent>(events: T[]): Promise<void>;
}

/**
 * Token for dependency injection to allow swapping implementations.
 */
export const EVENT_PUBLISHER_TOKEN = Symbol('IEventPublisher');