import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureServiceBusServer } from '@nestjs/azure-microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Initialize Logger
  const logger = new Logger('Bootstrap');

  // Create Hybrid Application (HTTP + Microservice)
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Get Configuration Service
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const connectionString = configService.get<string>('AZURE_SERVICE_BUS_CONNECTION_STRING');

  // 1. Configure HTTP Interface (Health Checks, Metrics)
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: ['health', 'health/(.*)'],
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable Graceful Shutdown
  app.enableShutdownHooks();

  // 2. Configure Azure Service Bus Microservice Strategy
  // This enables the application to consume messages using @EventPattern / @MessagePattern
  if (connectionString) {
    app.connectMicroservice({
      strategy: new AzureServiceBusServer({
        connectionString: connectionString,
        options: {
          // Retry policy for Service Bus interactions
          retryOptions: {
            maxRetries: 5,
            delayInMs: 1000,
            maxDelayInMs: 30000,
          },
          // Auto-completion behavior
          autoCompleteMessages: false, // We handle ACK/NACK manually in the handler (see invoice-event.handler.ts)
        },
      }),
    });
    
    logger.log('Azure Service Bus Microservice configuration loaded.');
  } else {
    logger.warn('AZURE_SERVICE_BUS_CONNECTION_STRING not provided. Microservice consumer will not start.');
  }

  // 3. Start Microservices and HTTP Server
  try {
    await app.startAllMicroservices();
    await app.listen(port);

    const url = await app.getUrl();
    logger.log(`Async Processors Service is running on: ${url}`);
    if (connectionString) {
      logger.log('Worker is listening for Azure Service Bus messages.');
    }
  } catch (error) {
    logger.error('Failed to start application', error);
    process.exit(1);
  }
}

// Execute bootstrap
bootstrap();