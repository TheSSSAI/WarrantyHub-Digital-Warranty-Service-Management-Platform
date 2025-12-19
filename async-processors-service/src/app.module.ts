import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

// Level 0 Dependencies
import appConfig from './config/app.config';

// Level 3 Dependencies
import { HealthModule } from './health/health.module';
import { HttpClientModule } from './infrastructure/http/http-client.module';
import { ResilienceModule } from './common/resilience/resilience.module';

// Level 4 Dependencies
import { OcrModule } from './workers/ocr/ocr.module';
import { SchedulerModule } from './workers/scheduler/scheduler.module';

@Module({
  imports: [
    // Configuration Module - Global
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      cache: true,
      expandVariables: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),

    // Scheduling Module - Global for Cron Jobs
    ScheduleModule.forRoot(),

    // Core Infrastructure Modules
    HealthModule,
    HttpClientModule,
    ResilienceModule,

    // Feature/Worker Modules
    OcrModule,
    SchedulerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}