import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureServiceBusServer } from '@nestjs/azure-service-bus';
import { CustomStrategy } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ServiceBusExceptionFilter } from './infrastructure/messaging/service-bus.filter';

/**
 * Application Bootstrap
 * 
 * Initializes the Audit Worker Service as a Hybrid Application:
 * 1. HTTP Server: Provides Health Check endpoints for Kubernetes probes (Liveness/Readiness).
 * 2. Microservice Listener: Consumes events from Azure Service Bus via a custom strategy.
 * 
 * Architectural Role: Composition Root
 * Dependency Level: 4
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    // 1. Create the Hybrid Application (HTTP + Microservice capability)
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true, // Buffer logs until custom logger is attached (if any)
    });

    // 2. Retrieve Configuration Service
    const configService = app.get(ConfigService);

    // 3. Configure Global Pipes for Data Validation (Security & Integrity)
    // Ensures all incoming DTOs are validated and transformed before reaching controllers
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // Automatically transform payloads to DTO instances
        whitelist: true, // Strip properties not in the DTO
        forbidNonWhitelisted: true, // Throw error if unknown properties are present
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // 4. Configure Global Exception Filters
    // Ensures Service Bus exceptions are handled, logged, and routed to DLQ if necessary
    app.useGlobalFilters(new ServiceBusExceptionFilter(new Logger('ServiceBusGlobalFilter')));

    // 5. Configure Graceful Shutdown
    // Essential for Kubernetes to allow active connections to close before killing the pod
    app.enableShutdownHooks();

    // 6. Configure Azure Service Bus Microservice Strategy
    const connectionString = configService.get<string>('ServiceBus.connectionString');
    const topicName = 'system-events'; // Defined in requirements
    const subscriptionName = 'audit-service-sub'; // Defined in requirements

    if (!connectionString) {
      throw new Error('Critical Configuration Missing: ServiceBus.connectionString is not defined.');
    }

    app.connectMicroservice<CustomStrategy>({
      strategy: new AzureServiceBusServer({
        connectionString: connectionString,
        options: {
          // Optimization: processing multiple messages if supported/needed
          // autoComplete: false, // If we want manual acknowledgement (handled in consumer)
        },
      }),
    });

    // 7. Start Microservices
    await app.startAllMicroservices();
    logger.log(`Audit Worker Microservice connected to Azure Service Bus Topic: ${topicName}, Subscription: ${subscriptionName}`);

    // 8. Start HTTP Server (Health Checks)
    const port = configService.get<number>('PORT') || 3000;
    
    // Enable CORS for health check access if needed from dashboards
    app.enableCors();

    await app.listen(port);
    logger.log(`Audit Worker HTTP Health Server running on port ${port}`);

  } catch (error) {
    logger.error('Fatal Error during Application Bootstrap', error instanceof Error ? error.stack : String(error));
    process.exit(1);
  }
}

// Execute Bootstrap
bootstrap();