import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './infrastructure/messaging/websocket/adapters/redis-io.adapter';

/**
 * Bootstraps the Geolocation Service application.
 * 
 * This entry point configures:
 * 1. The core NestJS application instance.
 * 2. Global validation pipes for DTO integrity.
 * 3. The Redis IO Adapter for scalable WebSocket communication (Pub/Sub).
 * 4. Graceful shutdown hooks for Kubernetes lifecycle management.
 * 5. Global CORS policies for mobile client access.
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    // Create the NestJS application instance
    const app = await NestFactory.create(AppModule);

    // Retrieve the configuration service
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3000;
    const env = configService.get<string>('NODE_ENV') || 'development';

    // Enable CORS for mobile client access
    // In production, specific origins should be configured based on the client hosting or mobile app schemes
    app.enableCors({
      origin: true, // Allow all origins for mobile app connectivity; restrict in stricter environments
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // Enforce global validation for all incoming payloads (HTTP & WebSocket DTOs)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Strip properties not in the DTO
        forbidNonWhitelisted: true, // Throw error if extra properties are sent
        transform: true, // Automatically transform payloads to DTO instances
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Configure the Redis IO Adapter for WebSocket scalability
    // This enables the service to scale horizontally on AKS using Redis Pub/Sub
    const redisIoAdapter = new RedisIoAdapter(app);
    // Note: Assuming the adapter has a connection initialization method as per standard Redis adapter patterns
    // If the specific L3 implementation handles connection in constructor/createIOServer, this might be implicit,
    // but explicit connection handling is preferred for startup readiness.
    if ('connectToRedis' in redisIoAdapter && typeof redisIoAdapter.connectToRedis === 'function') {
      await redisIoAdapter.connectToRedis();
    }
    app.useWebSocketAdapter(redisIoAdapter);

    // Enable graceful shutdown for Kubernetes SIGTERM signals
    app.enableShutdownHooks();

    // Start listening for connections
    await app.listen(port);

    logger.log(`Geolocation Service is running in ${env} mode on port ${port}`);
    logger.log(`WebSocket Gateway initialized on namespace /geolocation`);
    
  } catch (error) {
    logger.error('Failed to bootstrap Geolocation Service', error);
    process.exit(1);
  }
}

bootstrap();