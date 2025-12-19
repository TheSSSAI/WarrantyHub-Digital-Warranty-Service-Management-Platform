import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AzureAdB2CService } from './infrastructure/services/azure-ad-b2c.service';
import { EventBusPublisher } from './infrastructure/services/event-bus.publisher';
import { AuditLoggerService } from './infrastructure/services/audit-logger.service';

/**
 * Shared Module
 * 
 * This module encapsulates infrastructure services and cross-cutting concerns used throughout the application.
 * It is marked as @Global() to avoid repetitive imports of common infrastructure components,
 * specifically the Event Bus and Audit Logger which are pervasive.
 * 
 * Architecture Layer: Infrastructure/Application Support
 */
@Global()
@Module({
  imports: [
    // Configuration module is required for accessing environment variables in services
    ConfigModule,
    // HttpModule is required for Azure AD B2C Service to make Graph API calls
    HttpModule,
  ],
  providers: [
    {
      provide: 'IAzureAdB2CService',
      useClass: AzureAdB2CService,
    },
    {
      provide: 'IEventPublisher',
      useClass: EventBusPublisher,
    },
    {
      provide: 'IAuditLoggerService',
      useClass: AuditLoggerService,
    },
    // Direct registration for class-based injection if needed, though interface tokens are preferred
    AzureAdB2CService,
    EventBusPublisher,
    AuditLoggerService,
  ],
  exports: [
    // Exporting tokens to allow dependency injection via interfaces in feature modules
    'IAzureAdB2CService',
    'IEventPublisher',
    'IAuditLoggerService',
    
    // Exporting concrete classes for modules that might rely on specific implementations or type checking
    AzureAdB2CService,
    EventBusPublisher,
    AuditLoggerService,
    
    // Exporting modules that are commonly needed when importing SharedModule
    HttpModule,
  ],
})
export class SharedModule {}