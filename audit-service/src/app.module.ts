import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';

// Level 0 Imports - Configuration & Domain
import databaseConfig from './config/database.config';
import serviceBusConfig from './config/service-bus.config';
import { AuditLogEntity } from './domain/entities/audit-log.entity';
import { HealthController } from './infrastructure/health/health.controller';

// Level 1 Imports - Contracts
import { IAuditRepository } from './application/interfaces/audit-repository.interface';

// Level 2 Imports - Infrastructure Implementation
import { TypeOrmAuditRepository } from './infrastructure/persistence/typeorm-audit.repository';
import { AuditEventConsumer } from './infrastructure/messaging/audit-event.consumer';

/**
 * AuditWorkerModule
 * 
 * The root module for the Audit Worker Microservice.
 * This module orchestrates the dependency injection container, configures
 * the database connection, loads environment configurations, and registers
 * the event consumers and health checks.
 * 
 * Architectural Role: Composition Root (Level 3)
 */
@Module({
  imports: [
    // Configuration Module
    // Loads environment variables and custom configuration files.
    // isGlobal: true ensures ConfigService is available everywhere without re-importing.
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig, serviceBusConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Database Module
    // Configures the connection to Azure Database for PostgreSQL.
    // Uses async configuration to inject ConfigService.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbConfig = configService.get('database');
        
        // Validation to ensure critical DB config is present
        if (!dbConfig) {
          throw new Error('Database configuration is missing. Ensure database.config.ts is loaded.');
        }

        const isProduction = configService.get<string>('NODE_ENV') === 'production';

        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port || 5432,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          
          // Explicitly register entities for strict control and bundling support
          entities: [AuditLogEntity],
          
          // Synchronization should be disabled in production to prevent data loss
          // Migrations should be run as a separate pipeline step
          synchronize: !isProduction,
          
          // Enable logging for non-production environments to aid debugging
          logging: !isProduction,

          // Connection Pooling Configuration
          // Optimized for worker service throughput
          extra: {
            max: 25, // Max connections in pool
            min: 5,  // Min connections in pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
            // SSL Configuration for Azure PostgreSQL
            ssl: {
              rejectUnauthorized: false, // In a strict environment, CA certs should be provided
            },
          },
          
          // Retry attempts for initial connection
          retryAttempts: 5,
          retryDelay: 3000,
          
          // Auto-load entities is convenient, but explicit list (above) is safer for webpack/builds
          autoLoadEntities: false, 
          keepConnectionAlive: true,
        };
      },
    }),

    // Health Checks Module
    // Required for Kubernetes Liveness/Readiness probes
    TerminusModule,
  ],
  controllers: [
    // The main consumer acting as the entry point for Service Bus messages
    AuditEventConsumer,
    // Health check endpoint controller
    HealthController,
  ],
  providers: [
    // Dependency Injection Mapping
    // Maps the abstract IAuditRepository token to the concrete TypeOrm implementation.
    // This allows the domain layer to remain decoupled from TypeORM.
    {
      provide: IAuditRepository,
      useClass: TypeOrmAuditRepository,
    },
  ],
})
export class AuditWorkerModule {}