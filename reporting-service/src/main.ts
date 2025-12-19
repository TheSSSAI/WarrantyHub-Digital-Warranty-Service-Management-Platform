import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * Bootstraps the Reporting Service application.
 * This service is responsible for read-optimized analytics and reporting,
 * connecting to a PostgreSQL Read Replica.
 */
async function bootstrap() {
  const logger = new Logger('ReportingService');
  
  // Create the NestJS application context
  const app = await NestFactory.create(AppModule);

  // Configuration Constants
  // Default to 3004 to avoid conflict with other microservices (e.g. Identity: 3001, Product: 3002)
  const port = process.env.PORT || 3004;
  const globalPrefix = 'api/v1';

  // Set global prefix for versioning (e.g., /api/v1/reports)
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS to allow dashboard frontends to access this API
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*', // Should be restricted in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global Validation Pipe Configuration
  // This ensures all inputs (Query params, Body) are validated against DTOs before reaching controllers
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      transformOptions: {
        enableImplicitConversion: true, // Allow automatic conversion of primitive types (e.g., string "123" to number 123)
      },
    }),
  );

  // Enable graceful shutdown for Kubernetes orchestration
  app.enableShutdownHooks();

  // Swagger / OpenAPI Documentation Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('WarrantyHub Reporting Service')
    .setDescription(
      'Read-optimized analytics service for Brand and Super Admin dashboards. ' +
      'Provides aggregated data on fault patterns, geographic distribution, and KPI summaries.',
    )
    .setVersion('1.0')
    .addBearerAuth() // Adds JWT Bearer token support to Swagger UI
    .addTag('Reporting', 'Endpoints for retrieving analytical reports')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Start the server
  await app.listen(port);

  logger.log(`🚀 Reporting Service is running on: http://localhost:${port}/${globalPrefix}`);
  logger.log(`📚 Swagger documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();