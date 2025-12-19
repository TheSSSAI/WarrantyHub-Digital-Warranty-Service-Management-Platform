import { Provider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const READ_REPLICA_SOURCE = 'READ_REPLICA_SOURCE';

/**
 * Read Replica Connection Provider
 * 
 * This provider factory is responsible for establishing a connection to the 
 * PostgreSQL Read Replica. It isolates analytical read traffic from the 
 * primary transactional database to ensure high performance and stability.
 * 
 * It explicitly disables synchronization and migrations to prevent accidental
 * schema modifications on the replica.
 */
export const ReadReplicaConnectionProvider: Provider = {
  provide: READ_REPLICA_SOURCE,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('ReadReplicaConnection');
    
    // Retrieve configuration with strict type safety and defaults
    const host = configService.get<string>('database.readReplica.host', 'localhost');
    const port = configService.get<number>('database.readReplica.port', 5432);
    const username = configService.get<string>('database.readReplica.username', '');
    const password = configService.get<string>('database.readReplica.password', '');
    const database = configService.get<string>('database.readReplica.database', '');
    const sslEnabled = configService.get<boolean>('database.ssl', true);

    try {
      const dataSource = new DataSource({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        // Critical: Ensure no schema changes are attempted on the replica
        synchronize: false,
        migrationsRun: false,
        dropSchema: false,
        logging: configService.get<string>('NODE_ENV') === 'development',
        // Entities are not strictly required for raw SQL queries used in reporting, 
        // but can be included if QueryBuilder is used.
        entities: [], 
        ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        // Connection pool settings optimized for read-heavy workloads
        extra: {
          max: 20, // Maximum number of clients in the pool
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 5000,
        },
      });

      await dataSource.initialize();
      logger.log(`Successfully connected to Read Replica at ${host}:${port}/${database}`);
      
      return dataSource;
    } catch (error) {
      logger.error(`Failed to connect to Read Replica: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
      // In a robust system, we might want to throw to prevent the app from starting 
      // if reporting is critical, or handle gracefully if it's optional.
      throw error;
    }
  },
};