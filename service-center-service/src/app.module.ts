import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { ServiceCenterModule } from './features/service-center/service-center.module';

@Module({
  imports: [
    // Global Configuration Module
    // Loads environment variables and custom configuration files (like database.config.ts)
    // Making it global ensures ConfigService is available in all modules without re-importing.
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig],
      envFilePath: ['.env'],
    }),

    // Database Persistence Layer
    // Asynchronously configures TypeORM using the configuration loaded by ConfigModule.
    // This ensures that PostGIS extensions and spatial types are properly configured via the
    // database.config.ts logic (Dependency Level 0).
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        // Retrieve the specific database configuration namespace
        const dbConfig = configService.get<TypeOrmModuleOptions>('database');
        
        if (!dbConfig) {
          throw new Error('Database configuration is missing. Ensure database.config.ts is loaded correctly.');
        }

        return dbConfig;
      },
    }),

    // Feature Modules
    // Importing the Service Center domain module (Dependency Level 5)
    // This activates the entire vertical slice including Controllers, CQRS handlers, and Repositories.
    ServiceCenterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}