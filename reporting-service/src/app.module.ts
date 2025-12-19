import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { ReportingModule } from './features/reporting/reporting.module';

@Module({
  imports: [
    // Global Configuration Module
    // Loads environment variables and custom configuration files
    // Sets isGlobal to true so ConfigService is available in all feature modules without import
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true, // Improves performance by caching environment variable lookups
      load: [databaseConfig], // Load the specific database configuration factory
      envFilePath: ['.env.local', '.env'], // Priority order for env files
    }),

    // Feature Modules
    // Importing the Reporting bounded context module which encapsulates 
    // all reporting logic, controllers, and infrastructure connections
    ReportingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}