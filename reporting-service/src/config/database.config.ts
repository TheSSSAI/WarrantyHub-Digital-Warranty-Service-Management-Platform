import { registerAs } from '@nestjs/config';

/**
 * Database Configuration Configuration
 * 
 * Defines the connection settings for the PostgreSQL Read Replica used by the Reporting Service.
 * This configuration adheres to the CQRS pattern by strictly defining the read-side connection parameters,
 * ensuring isolation from the primary transactional database.
 * 
 * Architectural Layer: Infrastructure / Configuration (Level 0)
 * Dependencies: None (External: process.env)
 */
export default registerAs('database', () => {
  // Validate critical environment variables to fail fast on startup if configuration is missing
  const requiredEnvVars = [
    'DB_READ_HOST',
    'DB_READ_PORT',
    'DB_READ_USERNAME',
    'DB_READ_PASSWORD',
    'DB_READ_NAME'
  ];

  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);
  
  if (missingVars.length > 0) {
    // In a production environment, this ensures the service doesn't start in an invalid state
    // We log a warning here but allow the application to throw at the validation pipe level or 
    // when the TypeORM module attempts to load this config if stricter validation isn't applied globally.
    // For this implementation, we return the config but marked as potentially incomplete.
    console.warn(`[DatabaseConfig] Warning: Missing environment variables: ${missingVars.join(', ')}`);
  }

  return {
    host: process.env.DB_READ_HOST || 'localhost',
    port: parseInt(process.env.DB_READ_PORT || '5432', 10),
    username: process.env.DB_READ_USERNAME,
    password: process.env.DB_READ_PASSWORD,
    database: process.env.DB_READ_NAME,
    
    // SSL Configuration is critical for Azure PostgreSQL connections
    ssl: process.env.DB_SSL_ENABLED === 'true' ? {
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
      ca: process.env.DB_SSL_CA, // Optional: Path to CA certificate content
    } : false,

    // Connection Pool Configuration
    // Optimized for read-heavy workloads
    poolSize: parseInt(process.env.DB_POOL_SIZE || '20', 10),
    
    // Timeout settings
    connectTimeoutMS: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || '10000', 10),
    
    // Application Name for database monitoring visibility
    applicationName: 'warranty-hub-reporting-service',
    
    // TypeORM specific settings
    // Synchronization must ALWAYS be false for a read-replica connection to prevent schema drift attempts
    synchronize: false,
    migrationsRun: false, 
    logging: process.env.DB_LOGGING === 'true',
    
    // Schema
    schema: process.env.DB_SCHEMA || 'public',
  };
});