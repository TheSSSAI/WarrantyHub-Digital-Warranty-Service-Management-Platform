import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

// Level 4: Interface Layer (Controllers)
import { ProductController } from './product.controller';
import { ProductInternalController } from './product.internal.controller';
import { ProductLookupController } from './product.lookup.controller';

// Level 3: Application Layer (Event Handlers)
import { ServiceRequestCreatedHandler } from './application/events/service-request-created.handler';

// Level 2: Domain Services
import { WarrantyStatusService } from './domain/warranty-status.service';

// Level 1: Domain Layer (Entities)
import { ProductEntity } from './domain/product.entity';
// Assuming WarrantyEntity is defined in domain
import { WarrantyEntity } from './domain/warranty.entity';

// Level 2: Infrastructure
import { AzureServiceBusPublisher } from '../../shared/infrastructure/messaging/azure-service-bus.publisher';

// Infrastructure Implementations (Assumed)
import { ProductRepository } from './infrastructure/product.repository';

@Module({
  imports: [
    // Register Entities for Persistence
    TypeOrmModule.forFeature([
      ProductEntity,
      WarrantyEntity
    ]),
    // Enable CQRS for Command/Query/Event Buses
    CqrsModule,
  ],
  controllers: [
    // Public User Facing Controller
    ProductController,
    // Internal Microservice-to-Microservice Controller
    ProductInternalController,
    // Barcode/QR Code Lookup Controller
    ProductLookupController,
  ],
  providers: [
    // Domain Services
    WarrantyStatusService,

    // Event Handlers
    ServiceRequestCreatedHandler,

    // Dependency Injection: Repositories
    // Binding IProductRepository interface token to concrete implementation
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },

    // Dependency Injection: Messaging
    // Binding IMessagePublisher interface token to Azure Service Bus implementation
    {
      provide: 'IMessagePublisher',
      useClass: AzureServiceBusPublisher,
    },
  ],
  exports: [
    // Exporting Domain Service if needed by other modules (e.g. for validation)
    WarrantyStatusService,
    'IProductRepository',
  ],
})
export class ProductModule {}