import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    
    // 1. Global Prefix
    // Sets the base path for all endpoints (e.g., /api/v1/auth/login)
    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);

    // 2. Global Validation Pipe
    // Enforces DTO validation rules across the entire application
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Strips properties not in the DTO
        forbidNonWhitelisted: true, // Throws error if extra properties are sent
        transform: true, // Automatically transforms payloads to DTO instances
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // 3. CORS Configuration
    // Allows cross-origin requests from frontend applications
    app.enableCors({
      origin: configService.get<string>('CORS_ORIGINS')?.split(',') || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // 4. Swagger / OpenAPI Documentation
    // Generates API documentation for the Identity Service
    if (configService.get('NODE_ENV') !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Identity Service API')
        .setDescription('Authentication, User Management, and Authorization API interacting with Azure AD B2C')
        .setVersion('1.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT token',
          },
          'access-token',
        )
        .addTag('Auth', 'Authentication operations')
        .addTag('Users', 'User management operations')
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document);
      logger.log(`Swagger documentation available at /${globalPrefix}/docs`);
    }

    // 5. Graceful Shutdown
    app.enableShutdownHooks();

    // 6. Start Listening
    const port = configService.get<number>('PORT') || 3000;
    await app.listen(port);
    
    logger.log(`Identity Service running on port ${port}`);
    logger.log(`Environment: ${configService.get('NODE_ENV')}`);
  } catch (error) {
    logger.error('Failed to bootstrap Identity Service', error);
    process.exit(1);
  }
}

bootstrap();