import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const RedisClientProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: (configService: ConfigService) => {
    const host = configService.get<string>('redis.host', 'localhost');
    const port = configService.get<number>('redis.port', 6379);
    const password = configService.get<string>('redis.password');
    const db = configService.get<number>('redis.db', 0);
    const keyPrefix = configService.get<string>('redis.keyPrefix', 'geolocation:');

    const redis = new Redis({
      host,
      port,
      password,
      db,
      keyPrefix,
      retryStrategy: (times) => {
        // Exponential backoff with a max delay of 3 seconds
        const delay = Math.min(times * 50, 3000);
        return delay;
      },
      reconnectOnError: (err) => {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          // Only reconnect when the error starts with "READONLY"
          return true;
        }
        return false;
      },
    });

    redis.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redis.on('connect', () => {
      console.log('Successfully connected to Redis');
    });

    return redis;
  },
  inject: [ConfigService],
};