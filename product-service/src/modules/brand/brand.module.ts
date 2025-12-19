import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

// Level 4: Interface Layer
import { BrandAdminController } from './brand.admin.controller';

// Level 3: Application Layer
import { ApproveBrandHandler } from './application/commands/approve-brand.handler';

// Level 1: Domain Layer (Entities)
// Assuming BrandEntity is located in domain/brand.entity.ts based on standard structure
import { BrandEntity } from './domain/brand.entity';

// Infrastructure (Assumed based on architecture patterns)
// In a real scenario, this would be imported from the infrastructure directory
import { BrandRepository } from './infrastructure/brand.repository';

@Module({
  imports: [
    // Register BrandEntity with TypeORM for this module
    TypeOrmModule.forFeature([BrandEntity]),
    // Enable CQRS for Command/Query bus injection
    CqrsModule,
  ],
  controllers: [
    // Register the admin-facing controller
    BrandAdminController,
  ],
  providers: [
    // Register Command Handlers
    ApproveBrandHandler,
    
    // Dependency Injection for Repository Interface
    // Binding the abstract IBrandRepository string token to the concrete implementation
    {
      provide: 'IBrandRepository',
      useClass: BrandRepository,
    },
    
    // Shared Infrastructure Services
    // Assuming message publisher is needed for domain events (e.g., BrandApproved)
    {
      provide: 'IMessagePublisher',
      useClass: await import('../../shared/infrastructure/messaging/azure-service-bus.publisher').then(m => m.AzureServiceBusPublisher),
    }
  ],
  exports: [
    // Export repository if other modules need direct access (optional based on requirements)
    'IBrandRepository',
  ],
})
export class BrandModule {}