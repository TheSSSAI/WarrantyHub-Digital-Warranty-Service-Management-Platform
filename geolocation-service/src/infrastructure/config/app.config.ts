import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

/**
 * Application configuration definition.
 * Validates environment variables for core application settings.
 */
export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  serviceName: process.env.SERVICE_NAME || 'geolocation-service',
  logLevel: process.env.LOG_LEVEL || 'info',
}));

/**
 * Joi validation schema for application configuration.
 * Ensures critical environment variables are present and valid on startup.
 */
export const appConfigSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api/v1'),
  SERVICE_NAME: Joi.string().default('geolocation-service'),
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug', 'verbose')
    .default('info'),
});