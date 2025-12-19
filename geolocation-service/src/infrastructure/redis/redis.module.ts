import { Module, Global, Logger, Injectable, Inject } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { RedisClientProvider } from './redis.provider';
import { RedisHealthIndicator } from './redis.health';
import { ICachePort } from '../../domain/ports/icache.port';
import { Redis } from 'ioredis';

/**
 * Implementation of the Cache Port using Redis.
 * This adapter bridges the domain interface to the infrastructure implementation.
 */
@Injectable()
export class RedisService implements ICachePort {
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis
  ) {}

  /**
   * Retrieves a value from the cache.
   * @param key The cache key
   * @returns The string value or null if not found
   */
  async get(key: string): Promise<string | null> {
    try {
      const value = await this.redisClient.get(key);
      return value;
    } catch (error) {
      this.logger.error(`Failed to get key ${key} from Redis`, error);
      // Fail open: return null rather than crashing the request flow if cache is down
      return null;
    }
  }

  /**
   * Sets a value in the cache with an optional TTL.
   * @param key The cache key
   * @param value The value to store
   * @param ttl Time to live in seconds (optional)
   */
  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await this.redisClient.set(key, value, 'EX', ttl);
      } else {
        await this.redisClient.set(key, value);
      }
    } catch (error) {
      this.logger.error(`Failed to set key ${key} in Redis`, error);
      // In a caching scenario, write failures might be tolerated depending on consistency requirements
      throw error;
    }
  }

  /**
   * Deletes a key from the cache.
   * @param key The cache key
   */
  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      this.logger.error(`Failed to delete key ${key} from Redis`, error);
      throw error;
    }
  }
}

/**
 * RedisModule
 * Configures Redis connectivity, health checks, and exports the cache implementation
 * for use throughout the application.
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    RedisClientProvider,
    RedisHealthIndicator,
    RedisService,
    {
      provide: 'ICachePort',
      useExisting: RedisService,
    },
  ],
  exports: [
    'REDIS_CLIENT', // Export the raw client for the IoAdapter
    RedisHealthIndicator,
    'ICachePort', // Export the domain port implementation
  ],
})
export class RedisModule {}