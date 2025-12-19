import { Module } from '@nestjs/common';
import { InfrastructureConfigModule } from './infrastructure/config/config.module';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { WebsocketModule } from './infrastructure/messaging/websocket/websocket.module';

/**
 * The root module of the application.
 *
 * This module aggregates all the feature and infrastructure modules required
 * for the Geolocation Service to function. It serves as the entry point
 * for the NestJS IoC container.
 *
 * Architectural Role:
 * - Composition Root: Assembles the application graph.
 * - Configuration Loading: Initializes environment configuration via InfrastructureConfigModule.
 * - Infrastructure Initialization: Sets up Database (PersistenceModule) and Redis (RedisModule).
 * - Feature Orchestration: Loads the WebSocket module which handles the core business logic and I/O.
 */
@Module({
  imports: [
    // Level 2: Configuration Module
    // Loads and validates environment variables for the entire application.
    // Must be imported first to ensure config is available for other modules.
    InfrastructureConfigModule,

    // Level 3: Persistence Module
    // Establishes connections to TimescaleDB/PostgreSQL.
    // Provides repositories for location history persistence.
    PersistenceModule,

    // Level 4: Redis Module
    // Establishes connections to Redis.
    // Provides Redis client for Pub/Sub and Caching.
    RedisModule,

    // Level 4: WebSocket Module
    // Contains the Geolocation Gateway, Application Services (LocationTracking, SubscriptionManager),
    // and handles the real-time bidirectional communication logic.
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}