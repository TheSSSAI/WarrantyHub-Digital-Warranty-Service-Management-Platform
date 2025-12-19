import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

// Level 4: Interface Layer
import { TransferController } from './transfer.controller';

// Level 3: Application Layer (Command Handlers)
import { InitiateTransferHandler } from './application/commands/initiate-transfer.handler';
import { RespondTransferHandler } from './application/commands/respond-transfer.handler';
import { ExpireTransferHandler } from './application/commands/expire-transfer.handler';

// Level 1: Domain Layer (Entities & Ports)
// Assuming OwnershipTransferRequest is the entity name based on SDS
import { OwnershipTransferRequest } from './domain/ownership-transfer-request.entity';

// Level 2: Infrastructure
import { AzureServiceBusPublisher } from '../../shared/infrastructure/messaging/azure-service-bus.publisher';

// Infrastructure Implementations
import { TransferRepository } from './infrastructure/transfer.repository';

@Module({
  imports: [
    // Register Transfer Entity
    TypeOrmModule.forFeature([OwnershipTransferRequest]),
    // Enable CQRS
    CqrsModule,
  ],
  controllers: [
    // Transfer Management Controller
    TransferController,
  ],
  providers: [
    // Command Handlers for Transfer Lifecycle
    InitiateTransferHandler,
    RespondTransferHandler,
    ExpireTransferHandler,

    // Dependency Injection: Repository
    // Binds the abstract port ITransferRepository to the concrete adapter
    {
      provide: 'ITransferRepository',
      useClass: TransferRepository,
    },

    // Dependency Injection: Messaging
    // Required for publishing TransferInitiated, TransferAccepted, TransferRejected events
    {
      provide: 'IMessagePublisher',
      useClass: AzureServiceBusPublisher,
    },
  ],
  exports: [
    // Allow other modules to check transfer status if necessary
    'ITransferRepository',
  ],
})
export class TransferModule {}