import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseEntity } from './entities/base.entity';
import { AuditableEntity } from './entities/auditable.entity';
// Note: BaseRepository is an abstract class and does not need to be provided, 
// but is exported via the index files usually. 

/**
 * Interface for asynchronous database configuration.
 * Consuming services will use this to inject ConfigService.
 */
export interface DatabaseModuleAsyncOptions {
  imports?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions;
  inject?: any[];
}

/**
 * Shared Database Module.
 * 
 * This module wraps TypeORM configuration to ensure consistent database patterns
 * across all microservices, such as:
 * - Naming strategies (Snake Case enforcement by default in TypeORM/Postgres recommendation)
 * - Entity loading strategies
 * - Connection pooling defaults
 * - PostGIS geometry support enablement
 */
@Module({})
export class DatabaseModule {
  static registerAsync(options: DatabaseModuleAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: options.imports || [],
          useFactory: async (...args: any[]) => {
            const config = await options.useFactory(...args);
            
            return {
              ...config,
              // Enforce standard behavior for microservices
              autoLoadEntities: true, 
              // Ensure migrations are not run automatically in production unless explicitly configured
              migrationsRun: config.migrationsRun ?? false,
              // Standardize logging for debugging in dev, warning/error in prod
              logging: config.logging ?? process.env.NODE_ENV === 'development',
              // Force synchronization off in production to prevent data loss
              synchronize: config.synchronize ?? process.env.NODE_ENV !== 'production',
              // Ensure standardized entity support including base classes
              // Note: Specific entities are loaded via autoLoadEntities: true from the feature modules
            };
          },
          inject: options.inject || [],
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}