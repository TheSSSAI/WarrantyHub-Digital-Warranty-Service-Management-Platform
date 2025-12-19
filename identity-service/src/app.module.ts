import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import serviceBusConfig from './config/service-bus.config';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    // Configuration Module - Global Scope
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, databaseConfig, serviceBusConfig],
      cache: true,
      expandVariables: true,
    }),

    // Database Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          synchronize: dbConfig.synchronize, // Should be false in production
          autoLoadEntities: true,
          logging: configService.get('NODE_ENV') === 'development',
          ssl: dbConfig.ssl ? { rejectUnauthorized: false } : false,
          extra: {
            max: 20, // Connection pool size
            idleTimeoutMillis: 30000,
          },
        };
      },
    }),

    // Feature Modules
    AuthModule,
    UsersModule,
    
    // Shared Infrastructure Module
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}