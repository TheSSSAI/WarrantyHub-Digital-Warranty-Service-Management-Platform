/**
 * Generic contract for message handlers in the event-driven architecture.
 * 
 * This interface standardizes how workers process messages from the message bus
 * (Azure Service Bus), ensuring a consistent implementation pattern across
 * different worker types (OCR, Email, etc.).
 * 
 * @template T - The type of the message payload (DTO)
 * @template C - The type of the context (e.g., RmqContext, SbContext)
 */
export interface IMessageHandler<T = any, C = any> {
  /**
   * Processes a received message.
   * 
   * Implementations should handle:
   * 1. Business logic execution
   * 2. Idempotency checks (if not handled by middleware)
   * 3. Error handling (retries, dead-lettering)
   * 4. Message acknowledgment (if manual ack is enabled)
   * 
   * @param message - The deserialized message payload
   * @param context - The context containing metadata (message ID, delivery count, etc.)
   */
  handle(message: T, context: C): Promise<void>;
}