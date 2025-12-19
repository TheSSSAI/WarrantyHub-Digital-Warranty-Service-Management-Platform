import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

// Domain Entities
import { ServiceCenterEntity } from './domain/service-center.entity';
// Importing the schema/entity for ServiceAreaPolygon. 
// Assuming the schema file exports the entity class compatible with TypeOrmModule.
import { ServiceAreaPolygonEntity } from './infrastructure/persistence/service-area-polygon.schema';

// Controllers (Entry Points)
import { ServiceCenterAdminController } from './interface/controllers/service-center-admin.controller';
import { ServiceCenterLookupController } from './interface/controllers/service-center-lookup.controller';

// Command Handlers
import { CreateServiceCenterHandler } from './application/commands/create-service-center.handler';
import { ApproveServiceCenterHandler } from './application/commands/approve-service-center.handler';
import { DefineServiceAreaHandler } from './application/commands/define-service-area.handler';

// Query Handlers
import { FindCentersByLocationHandler } from './application/queries/find-centers-by-location.handler';

// Infrastructure Implementations
import { ServiceCenterTypeOrmRepository } from './infrastructure/persistence/service-center.typeorm-repository';
import { TurfJsGeoValidator } from './infrastructure/validation/turf-js-geo.validator';
import { AzureEventPublisher } from './infrastructure/messaging/azure-event-publisher';

/**
 * Dependency Injection Tokens
 * These strings must match the @Inject() decorators used in the Application Layer handlers.
 */
const SERVICE_CENTER_REPOSITORY_TOKEN = 'IServiceCenterRepository';
const GEO_SPATIAL_VALIDATOR_TOKEN = 'IGeoSpatialValidator';
const EVENT_PUBLISHER_TOKEN = 'IEventPublisher';

@Module({
  imports: [
    // CQRS module to enable CommandBus, QueryBus, and EventBus
    CqrsModule,
    // TypeORM module to register entities and enable Repository injection
    TypeOrmModule.forFeature([
      ServiceCenterEntity,
      ServiceAreaPolygonEntity,
    ]),
  ],
  controllers: [
    // Registering controllers that handle incoming HTTP requests
    ServiceCenterAdminController,
    ServiceCenterLookupController,
  ],
  providers: [
    // -- Command Handlers --
    CreateServiceCenterHandler,
    ApproveServiceCenterHandler,
    DefineServiceAreaHandler,

    // -- Query Handlers --
    FindCentersByLocationHandler,

    // -- Infrastructure Providers --
    // Binding abstract interfaces to concrete infrastructure implementations
    {
      provide: SERVICE_CENTER_REPOSITORY_TOKEN,
      useClass: ServiceCenterTypeOrmRepository,
    },
    {
      provide: GEO_SPATIAL_VALIDATOR_TOKEN,
      useClass: TurfJsGeoValidator,
    },
    {
      provide: EVENT_PUBLISHER_TOKEN,
      useClass: AzureEventPublisher,
    },
  ],
  exports: [
    // Exporting the Repository token to allow other modules to interact with Service Center data if necessary
    // primarily for cross-module validation or read operations not covered by queries
    SERVICE_CENTER_REPOSITORY_TOKEN,
  ],
})
export class ServiceCenterModule {}