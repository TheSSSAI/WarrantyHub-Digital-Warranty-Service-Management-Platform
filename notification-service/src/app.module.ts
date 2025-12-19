import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

// Configurations
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import serviceBusConfig from './config/service-bus.config';
import firebaseConfig from './config/firebase.config';
import redisConfig from './config/redis.config';
import communicationServicesConfig from './config/communication-services.config';

// Controllers
import { DeviceTokenController } from './presentation/controllers/DeviceToken.controller';
import { HealthController } from './presentation/controllers/Health.controller';

// Services
import { NotificationDispatcherService } from './application/services/NotificationDispatcher.service';
import { DeviceTokenManagerService } from './application/services/DeviceTokenManager.service';
import { TemplateRenderingService } from './application/services/TemplateRendering.service';

// Adapters & Repositories (Infrastructure)
import { FirebaseCloudMessagingAdapter } from './infrastructure/adapters/FirebaseCloudMessaging.adapter';
import { AzureEmailAdapter } from './infrastructure/adapters/AzureEmail.adapter';
import { HandlebarsTemplateAdapter } from './infrastructure/adapters/HandlebarsTemplate.adapter';
import { TypeOrmDeviceTokenRepository } from './infrastructure/persistence/typeorm/TypeOrmDeviceToken.repository';
import { TypeOrmNotificationLogRepository } from './infrastructure/persistence/typeorm/TypeOrmNotificationLog.repository';

// Consumers
import { ServiceRequestEventsConsumer } from './infrastructure/messaging/ServiceRequestEvents.consumer';
import { ChatEventsConsumer } from './infrastructure/messaging/ChatEvents.consumer';
import { ProductEventsConsumer } from './infrastructure/messaging/ProductEvents.consumer';

// WebSocket
import { NotificationGateway } from './infrastructure/websocket/Notification.gateway';
import { WebSocketAuthGuard } from './infrastructure/websocket/WebSocketAuth.guard';

// Entities
import { DeviceToken } from './core/domain/entities/DeviceToken';
import { NotificationLog } from './core/domain/entities/NotificationLog';
import { NotificationPreference } from './core/domain/entities/NotificationPreference';

// Symbols for DI
const FCM_PROVIDER = 'FCM_PROVIDER';
const EMAIL_PROVIDER = 'EMAIL_PROVIDER';
const TEMPLATE_PROVIDER = 'ITemplateProvider';
const DEVICE_TOKEN_REPO = 'IDeviceTokenRepository';
const LOG_REPO = 'INotificationLogRepository';
const USER_PREF_REPO = 'IUserPreferenceRepository';

// Assuming existence based on architectural patterns, though not explicitly in Level 3 list
import { TypeOrmUserPreferenceRepository } from './infrastructure/persistence/typeorm/TypeOrmUserPreference.repository';

@Module({
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        serviceBusConfig,
        firebaseConfig,
        redisConfig,
        communicationServicesConfig,
      ],
      cache: true,
    }),

    // Event Emitter for internal decoupling
    EventEmitterModule.forRoot(),

    // Database Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [DeviceToken, NotificationLog, NotificationPreference],
        synchronize: configService.get<string>('app.env') === 'development', // Auto-schema sync only in dev
        logging: configService.get<string>('app.env') === 'development',
        ssl: configService.get<boolean>('database.ssl') ? { rejectUnauthorized: false } : false,
      }),
    }),

    // Feature Entities Registration
    TypeOrmModule.forFeature([DeviceToken, NotificationLog, NotificationPreference]),
  ],
  controllers: [
    DeviceTokenController,
    HealthController,
  ],
  providers: [
    // Application Services
    NotificationDispatcherService,
    DeviceTokenManagerService,
    TemplateRenderingService,

    // Infrastructure: Repositories
    {
      provide: DEVICE_TOKEN_REPO,
      useClass: TypeOrmDeviceTokenRepository,
    },
    {
      provide: LOG_REPO,
      useClass: TypeOrmNotificationLogRepository,
    },
    {
      provide: USER_PREF_REPO,
      useClass: TypeOrmUserPreferenceRepository,
    },

    // Infrastructure: Adapters
    {
      provide: FCM_PROVIDER,
      useClass: FirebaseCloudMessagingAdapter,
    },
    {
      provide: EMAIL_PROVIDER,
      useClass: AzureEmailAdapter,
    },
    {
      provide: TEMPLATE_PROVIDER,
      useClass: HandlebarsTemplateAdapter,
    },

    // Messaging Consumers
    ServiceRequestEventsConsumer,
    ChatEventsConsumer,
    ProductEventsConsumer,

    // WebSocket
    NotificationGateway,
    WebSocketAuthGuard,
  ],
  exports: [
    NotificationDispatcherService,
    DeviceTokenManagerService,
  ],
})
export class AppModule {}