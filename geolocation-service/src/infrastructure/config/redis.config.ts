import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

/**
 * Redis configuration definition.
 * Used for both caching and WebSocket Pub/Sub adapter.
 */
export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0', 10),
  keyPrefix: process.env.REDIS_KEY_PREFIX || 'geo:',
  ttl: parseInt(process.env.REDIS_TTL || '86400', 10), // Default 24 hours
}));

/**
 * Joi validation schema for Redis configuration.
 */
export const redisConfigSchema = Joi.object({
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),
  REDIS_DB: Joi.number().default(0),
  REDIS_KEY_PREFIX: Joi.string().default('geo:'),
  REDIS_TTL: Joi.number().default(86400),
});