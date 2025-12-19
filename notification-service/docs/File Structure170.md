# 1 Dependency Levels

## 1.1 Level

### 1.1.1 Level

🔹 0

### 1.1.2 Files

- src/config/app.config.ts
- src/config/database.config.ts
- src/config/service-bus.config.ts
- src/config/firebase.config.ts
- src/config/redis.config.ts
- src/config/communication-services.config.ts
- src/core/domain/entities/DeviceToken.ts
- src/core/domain/entities/NotificationLog.ts
- src/core/domain/entities/NotificationPreference.ts
- src/application/dtos/DeviceRegistrationDto.ts
- src/application/dtos/NotificationPayload.ts
- src/core/ports/INotificationProvider.interface.ts
- src/core/ports/ITemplateProvider.interface.ts

## 1.2.0 Level

### 1.2.1 Level

🔹 1

### 1.2.2 Files

- src/core/ports/IDeviceTokenRepository.interface.ts
- src/core/ports/INotificationLogRepository.interface.ts
- src/core/ports/IUserPreferenceRepository.interface.ts

## 1.3.0 Level

### 1.3.1 Level

🔹 2

### 1.3.2 Files

- src/infrastructure/persistence/typeorm/schemas/DeviceToken.schema.ts
- src/infrastructure/persistence/typeorm/schemas/NotificationLog.schema.ts
- src/infrastructure/adapters/FirebaseCloudMessaging.adapter.ts
- src/infrastructure/adapters/AzureEmail.adapter.ts
- src/infrastructure/adapters/HandlebarsTemplate.adapter.ts

## 1.4.0 Level

### 1.4.1 Level

🔹 3

### 1.4.2 Files

- src/infrastructure/persistence/typeorm/TypeOrmDeviceToken.repository.ts
- src/infrastructure/persistence/typeorm/TypeOrmNotificationLog.repository.ts

## 1.5.0 Level

### 1.5.1 Level

🔹 4

### 1.5.2 Files

- src/application/services/TemplateRendering.service.ts
- src/application/services/DeviceTokenManager.service.ts
- src/application/services/NotificationDispatcher.service.ts

## 1.6.0 Level

### 1.6.1 Level

🔹 5

### 1.6.2 Files

- src/presentation/controllers/DeviceToken.controller.ts
- src/presentation/controllers/Health.controller.ts
- src/infrastructure/messaging/ServiceRequestEvents.consumer.ts
- src/infrastructure/messaging/ChatEvents.consumer.ts
- src/infrastructure/messaging/ProductEvents.consumer.ts
- src/infrastructure/websocket/WebSocketAuth.guard.ts
- src/infrastructure/websocket/Notification.gateway.ts

## 1.7.0 Level

### 1.7.1 Level

🔹 6

### 1.7.2 Files

- src/app.module.ts
- src/main.ts

## 1.8.0 Level

### 1.8.1 Level

🔹 7

### 1.8.2 Files

- backend-services/{service-name}/package.json
- backend-services/{service-name}/tsconfig.json
- backend-services/{service-name}/tsconfig.build.json
- backend-services/{service-name}/nest-cli.json
- backend-services/{service-name}/jest.config.js
- backend-services/{service-name}/Dockerfile
- backend-services/{service-name}/.env.example
- README.md
- .eslintrc.js
- .prettierrc
- nx.json
- .gitignore

# 2.0.0 Total Files

44

# 3.0.0 Generation Order

- 0
- 1
- 2
- 3
- 4
- 5
- 6
- 7

