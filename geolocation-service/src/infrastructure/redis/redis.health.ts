import { Injectable, Inject } from '@nestjs/common';
import { 
  HealthIndicator, 
  HealthIndicatorResult, 
  HealthCheckError 
} from '@nestjs/terminus';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.provider';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const pingResult = await this.redisClient.ping();
      
      if (pingResult !== 'PONG') {
        throw new Error('Redis did not respond with PONG');
      }

      const info = await this.redisClient.info();
      const isReady = this.redisClient.status === 'ready';

      if (!isReady) {
        throw new Error(`Redis status is ${this.redisClient.status}`);
      }

      return this.getStatus(key, true, {
        status: this.redisClient.status,
        info: 'Redis is reachable and ready',
      });
    } catch (error) {
      const status = this.getStatus(key, false, {
        message: error instanceof Error ? error.message : 'Unknown Redis error',
      });
      throw new HealthCheckError('Redis check failed', status);
    }
  }
}