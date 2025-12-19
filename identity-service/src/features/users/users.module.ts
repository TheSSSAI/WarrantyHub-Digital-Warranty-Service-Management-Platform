import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { UsersController } from './users.controller';
import { User } from './domain/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { RegisterUserHandler } from './application/commands/register-user.handler';
import { UserDeletionSaga } from './sagas/user-deletion.saga';
import { SharedModule } from '../../shared/shared.module';

/**
 * Users Module
 * 
 * Bounded Context for User Management.
 * Handles user registration, profile management, and synchronization with the local database.
 * 
 * Dependencies:
 * - TypeOrmModule: For database persistence of the User entity.
 * - CqrsModule: For handling commands (RegisterUser) and events.
 * - SharedModule: For access to EventBus and AzureAdB2CService.
 */
@Module({
  imports: [
    // Registers the User entity with TypeORM for this module scope
    TypeOrmModule.forFeature([User]),
    // Enables CQRS pattern support
    CqrsModule,
    // Imports shared infrastructure (EventBus, Identity Provider)
    SharedModule,
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    // Repository binding using interface token for Dependency Inversion
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    // Command Handlers
    RegisterUserHandler,
    
    // Sagas (Event Processors)
    UserDeletionSaga,
    
    // Concrete repository available for internal module usage if strict decoupling isn't required
    UserRepository,
  ],
  exports: [
    // Exporting IUserRepository to allow AuthModule to fetch user details during login/token validation
    'IUserRepository',
    TypeOrmModule,
  ],
})
export class UsersModule {}