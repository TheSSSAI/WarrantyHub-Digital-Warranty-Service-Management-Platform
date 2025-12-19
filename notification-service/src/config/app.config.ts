import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  serviceName: process.env.SERVICE_NAME || 'notification-service',
  logLevel: process.env.LOG_LEVEL || 'info',
  enableSwagger: process.env.ENABLE_SWAGGER === 'true',
  corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
}));