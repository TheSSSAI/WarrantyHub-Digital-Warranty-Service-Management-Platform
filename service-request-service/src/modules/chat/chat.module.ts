import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Domain Entities
import { ChatMessageEntity } from './domain/chat-message.entity';

// Gateways (Level 5)
import { ChatGateway } from './chat.gateway';

// Services (Level 3)
import { ChatService } from './chat.service';

// Dependent Modules
import { ServiceRequestModule } from '../service-request/service-request.module';

/**
 * ChatModule
 * 
 * Handles real-time communication for service requests using WebSockets.
 * Manages the persistence of chat messages and real-time event broadcasting.
 * 
 * Dependencies:
 * - ServiceRequestModule: To validate ticket existence and ownership.
 * - JwtModule: To authenticate WebSocket connections.
 */
@Module({
  imports: [
    // Database connectivity for Chat Messages
    TypeOrmModule.forFeature([ChatMessageEntity]),
    
    // Import ServiceRequestModule to access IServiceRequestRepository
    // This allows the chat service/gateway to verify if a ticket exists/is active
    ServiceRequestModule,

    // Configuration for JWT and Redis
    ConfigModule,

    // JWT Module registration for WebSocket Guard authentication
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRATION', '1h') 
        },
      }),
    }),
  ],
  providers: [
    // The WebSocket Gateway (Interface Layer)
    ChatGateway,
    
    // The Application Service handling business logic for chat
    ChatService,
  ],
  exports: [
    // Export ChatService if other modules need to send system messages programmatically
    ChatService,
  ],
})
export class ChatModule {}