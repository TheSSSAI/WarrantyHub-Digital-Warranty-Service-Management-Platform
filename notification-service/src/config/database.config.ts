import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'notification_db',
  synchronize: process.env.NODE_ENV !== 'production', // Disable in production
  logging: process.env.DB_LOGGING === 'true',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  keepConnectionAlive: true,
  poolSize: parseInt(process.env.DB_POOL_SIZE, 10) || 10,
}));