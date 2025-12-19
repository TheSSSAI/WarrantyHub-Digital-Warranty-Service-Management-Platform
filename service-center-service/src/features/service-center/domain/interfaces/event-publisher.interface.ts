/**
 * Interface for the infrastructure infrastructure layer responsible for publishing 
 * domain and integration events to the message bus (e.g., Azure Service Bus).
 * This decouples the domain/application layer from the specific messaging implementation.
 */
export interface IEventPublisher {
  /**
   * Publishes an event to a specific topic.
   * 
   * @param topic The name of the topic or queue (e.g., 'service-center.events').
   * @param event The event payload object.
   * @param correlationId Optional correlation ID for distributed tracing.
   */
  publish<T>(topic: string, event: T, correlationId?: string): Promise<void>;

  /**
   * Publishes an event to a queue (point-to-point).
   * 
   * @param queue The name of the queue.
   * @param event The event payload object.
   */
  sendToQueue<T>(queue: string, event: T): Promise<void>;
}