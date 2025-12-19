import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import appConfig from './app.config';
import databaseConfig from './database.config';
import redisConfig from './redis.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        
        // Database
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        
        // Redis
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().default(6379),
        REDIS_PASSWORD: Joi.string().optional().allow(''),
        
        // JWT
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().default('3600s'),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}