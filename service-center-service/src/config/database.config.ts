import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

export default registerAs('database', (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'service_center_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // We disable synchronization in production to rely on migrations for schema changes
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || !isProduction,
    logging: !isProduction,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    extra: {
      // Ensure PostGIS connection compatibility if needed
      max: 20, // Connection pool size
    },
    // Explicitly enabling autoLoadEntities for development convenience, 
    // though strict entity definition is preferred in production
    autoLoadEntities: true,
  };
});