import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

/**
 * Database configuration definition.
 * Specifically targets PostgreSQL with TimescaleDB extension.
 */
export const databaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  // Specific settings for connection pooling usually required for high-throughput
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '50', 10),
  sslEnabled: process.env.DB_SSL_ENABLED === 'true',
}));

/**
 * Joi validation schema for Database configuration.
 */
export const databaseConfigSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  DB_LOGGING: Joi.boolean().default(false),
  DB_MAX_CONNECTIONS: Joi.number().default(50),
  DB_SSL_ENABLED: Joi.boolean().default(false),
});