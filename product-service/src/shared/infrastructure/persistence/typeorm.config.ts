import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * Configuration factory for TypeORM.
 * Responsible for constructing the database connection options based on environment variables.
 * Supports Azure Database for PostgreSQL requirements (SSL).
 */
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(TypeOrmConfigService.name);

  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    
    // Azure PostgreSQL typically requires SSL. 
    // We default to true unless explicitly disabled for local dev.
    const sslEnabled = this.configService.get<string>('DB_SSL_ENABLED', 'true') === 'true';

    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      
      // Entity Loading Strategy
      // We load files ending in .entity.ts or .entity.js from the modules directory
      entities: [__dirname + '/../../../modules/**/*.entity{.ts,.js}'],
      
      // Automatic schema synchronization
      // CRITICAL: Always false in production to prevent data loss. Use migrations instead.
      synchronize: this.configService.get<string>('DB_SYNCHRONIZE', 'false') === 'true',
      
      // Logging
      logging: this.configService.get<string>('DB_LOGGING', 'false') === 'true',
      
      // SSL Configuration for Azure
      ssl: sslEnabled ? {
        rejectUnauthorized: false, // Often required for Azure Flex Server unless specific CA provided
      } : false,

      // Connection Pool Settings
      poolSize: this.configService.get<number>('DB_POOL_SIZE', 10),
      
      // Migration Settings
      migrations: [__dirname + '/../../../migrations/*{.ts,.js}'],
      migrationsRun: this.configService.get<string>('DB_RUN_MIGRATIONS', 'false') === 'true',
      
      // Timeout settings
      connectTimeoutMS: 10000,
    };

    this.validateConfig(config);
    
    return config;
  }

  private validateConfig(config: TypeOrmModuleOptions) {
    if (!config.host || !config.username || !config.password || !config.database) {
      this.logger.error('Database configuration is incomplete. Missing required connection details.');
      throw new Error('Invalid Database Configuration');
    }
    
    this.logger.log(`Database Configured: Host=${config.host}, DB=${config.database}, SSL=${config.ssl ? 'Enabled' : 'Disabled'}`);
  }
}