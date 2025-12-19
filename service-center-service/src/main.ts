import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * Bootstrap function to initialize the Service Center Service.
 * This entry point configures the NestJS application with enterprise-grade settings,
 * including global validation, CORS security, versioning, and OpenAPI documentation.
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable CORS for external access (e.g., from Web Admin Portal)
  // In a production environment, 'origin' should be restricted to specific domains.
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Enable API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Set Global Prefix for all routes
  app.setGlobalPrefix('api');

  // Configure Global Validation Pipe
  // - whitelist: Strips properties that do not have decorators
  // - transform: Automatically transforms payloads to DTO instances
  // - forbidNonWhitelisted: Throws errors if extra properties are present (Security)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configure Swagger / OpenAPI Documentation
  // This is critical for the 'Exposed Interfaces' requirement to allow consumer repositories
  // (REPO-BS-004 Service Request Service, REPO-FE-002 Web Admin) to integrate correctly.
  const config = new DocumentBuilder()
    .setTitle('Service Center Service API')
    .setDescription(
      'Microservice for managing Service Centers, Brand Authorizations, and Geographic Service Areas using PostGIS.',
    )
    .setVersion('1.0')
    .addTag('Service Centers', 'Lifecycle and profile management')
    .addTag('Geospatial', 'Service area definitions and location lookups')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Enable Graceful Shutdown for Kubernetes environments
  app.enableShutdownHooks();

  // Start the Server
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Service Center Service running on port: ${port}`);
  logger.log(`📚 Swagger Documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap().catch((error) => {
  new Logger('Bootstrap').error('Failed to start application', error);
  process.exit(1);
});