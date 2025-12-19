import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === 'true',
  db: parseInt(process.env.REDIS_DB, 10) || 0,
  keyPrefix: process.env.REDIS_KEY_PREFIX || 'notification:',
  ttl: {
    preferences: parseInt(process.env.REDIS_TTL_PREFERENCES, 10) || 3600, // 1 hour
    templates: parseInt(process.env.REDIS_TTL_TEMPLATES, 10) || 86400, // 24 hours
  },
}));