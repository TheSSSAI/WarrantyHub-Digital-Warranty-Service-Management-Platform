import { Injectable, Logger } from '@nestjs/common';
import {
  CircuitBreakerPolicy,
  RetryPolicy,
  handleAll,
  wrap,
  Policy,
} from 'cockatiel';

/**
 * Provides resilience patterns including Circuit Breaker and Retry
 * to protect the application from cascading failures in external dependencies.
 * Implements the resilience logic defined in Sequence 390.
 */
@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
  private readonly policy: Policy;

  constructor() {
    // Configure Retry Policy: Exponential backoff with jitter
    // Retries 3 times on any error, initial delay 200ms
    const retry = parseFloat(process.env.RESILIENCE_RETRY_COUNT || '3');
    const retryDelay = parseFloat(process.env.RESILIENCE_RETRY_DELAY_MS || '200');

    const retryPolicy = CheckRetryPolicy(retry, retryDelay, this.logger);

    // Configure Circuit Breaker Policy
    // Breaks after 5 consecutive failures, resets after 30 seconds (Half-Open)
    const failureThreshold = parseFloat(process.env.RESILIENCE_CIRCUIT_THRESHOLD || '5');
    const resetTimeout = parseFloat(process.env.RESILIENCE_CIRCUIT_RESET_MS || '30000');

    const circuitBreakerPolicy = CheckCircuitBreakerPolicy(
      failureThreshold,
      resetTimeout,
      this.logger,
    );

    // Combine policies: Retry first, then Circuit Breaker
    // The circuit breaker protects the external resource, the retry handles transient glitches within the allowed circuit
    this.policy = wrap(retryPolicy, circuitBreakerPolicy);
  }

  /**
   * Executes a promise-based operation within the resilience policy wrapper.
   * @param operation The async operation to execute
   * @param fallback Optional fallback function to execute if the operation fails after retries or circuit is open
   */
  public async execute<T>(
    operation: () => Promise<T>,
    fallback?: () => Promise<T>,
  ): Promise<T> {
    try {
      return await this.policy.execute(async () => {
        return await operation();
      });
    } catch (error) {
      this.logger.error(
        `Operation failed after resilience policies applied: ${error.message}`,
        error.stack,
      );

      if (fallback) {
        this.logger.log('Executing fallback logic...');
        return await fallback();
      }

      throw error;
    }
  }
}

function CheckRetryPolicy(count: number, delay: number, logger: Logger) {
  const policy = getAllHandler()
    .retry()
    .attempts(count)
    .exponential({
      initialDelay: delay,
      maxDelay: delay * 10,
    });

  policy.onRetry((reason) => {
    logger.warn(
      `Retry attempt ${reason.attempt} due to: ${reason.lastError.message}`,
    );
  });

  return policy;
}

function CheckCircuitBreakerPolicy(
  threshold: number,
  resetMs: number,
  logger: Logger,
) {
  const policy = getAllHandler()
    .circuitBreaker()
    .failureThreshold(threshold)
    .samplingDuration(60 * 1000) // 1 minute rolling window
    .minimumSamples(threshold)
    .resetTimeout(resetMs);

  policy.onBreak((reason) => {
    logger.error(
      `Circuit Breaker OPENED. Failures detected. Blocking downstream calls for ${resetMs}ms.`,
    );
  });

  policy.onReset(() => {
    logger.log('Circuit Breaker CLOSED. Service recovered.');
  });

  policy.onHalfOpen(() => {
    logger.warn('Circuit Breaker HALF-OPEN. Testing downstream service.');
  });

  return policy;
}

function getAllHandler() {
  return handleAll();
}