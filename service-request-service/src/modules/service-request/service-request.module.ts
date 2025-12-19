import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

// Domain Entities
import { ServiceRequestEntity } from './domain/service-request.entity';

// Controllers (Level 5)
import { ServiceRequestController } from './service-request.controller';

// Command Handlers (Level 3)
import { CreateServiceRequestHandler } from './application/commands/create-request/create-request.handler';
import { ResolveServiceRequestHandler } from './application/commands/resolve-request/resolve-request.handler';

// Domain Services (Level 2)
import { RoutingDomainService } from './domain/services/routing.domain-service.ts';

// Infrastructure / Adapters (Level 4)
import { TypeOrmServiceRequestRepository } from '../../infrastructure/persistence/typeorm-service-request.repository';
import { HttpProductServiceAdapter } from '../../infrastructure/adapters/http-product-service.adapter';
import { HttpServiceCenterAdapter } from '../../infrastructure/adapters/http-service-center.adapter';
import { AzureBlobStorageAdapter } from '../../infrastructure/adapters/azure-blob-storage.adapter';

/**
 * ServiceRequestModule
 * 
 * The composition root for the Service Request bounded context.
 * configured with CQRS pattern, Domain-Driven Design layering,
 * and Hexagonal Architecture ports/adapters.
 */
@Module({
  imports: [
    // Database connectivity for the Aggregate Root
    TypeOrmModule.forFeature([ServiceRequestEntity]),
    // CQRS support for Command/Query bus
    CqrsModule,
    // HTTP support for external service adapters
    HttpModule,
    // Config support for adapter environment variables
    ConfigModule,
  ],
  controllers: [
    ServiceRequestController,
  ],
  providers: [
    // Domain Services
    RoutingDomainService,

    // Command Handlers
    CreateServiceRequestHandler,
    ResolveServiceRequestHandler,

    // Repository Port Implementation
    {
      provide: 'IServiceRequestRepository',
      useClass: TypeOrmServiceRequestRepository,
    },

    // Integration Port Implementations
    {
      provide: 'IProductIntegrationPort',
      useClass: HttpProductServiceAdapter,
    },
    {
      provide: 'IServiceCenterIntegrationPort',
      useClass: HttpServiceCenterAdapter,
    },
    {
      provide: 'IBlobStoragePort',
      useClass: AzureBlobStorageAdapter,
    },
  ],
  exports: [
    // Exporting the repository port for use by other modules (e.g., Chat)
    // that need to validate or retrieve service requests.
    'IServiceRequestRepository',
  ],
})
export class ServiceRequestModule {}