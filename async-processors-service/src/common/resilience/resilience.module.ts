import { Module, Global } from '@nestjs/common';
import { CircuitBreakerService } from './circuit-breaker.service';

/**
 * Resilience Module.
 * 
 * This module encapsulates cross-cutting resilience concerns such as Circuit Breakers,
 * Retry policies, and Timeout handling. It makes these services available globally
 * or to specific importing modules to ensure external dependency failures (e.g., Azure AI,
 * Product Service API) are handled gracefully without cascading failures.
 */
@Global()
@Module({
    providers: [
        CircuitBreakerService
    ],
    exports: [
        CircuitBreakerService
    ],
})
export class ResilienceModule {}