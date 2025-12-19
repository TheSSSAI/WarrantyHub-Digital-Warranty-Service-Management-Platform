import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { appSchema } from './schema';
import { Platform } from 'react-native';

/**
 * Service class responsible for initializing and exposing the WatermelonDB instance.
 * Implements the Singleton pattern to ensure only one database instance exists.
 */
export class WatermelonDatabase {
  private static instance: WatermelonDatabase;
  private database: Database | null = null;

  private constructor() {}

  /**
   * Retrieves the singleton instance of the WatermelonDatabase service.
   */
  public static getInstance(): WatermelonDatabase {
    if (!WatermelonDatabase.instance) {
      WatermelonDatabase.instance = new WatermelonDatabase();
    }
    return WatermelonDatabase.instance;
  }

  /**
   * Initializes the database with the provided model classes.
   * This allows models (which may have circular dependencies or reside in higher layers)
   * to be injected at runtime setup.
   * 
   * @param modelClasses Array of WatermelonDB Model classes
   */
  public initialize(modelClasses: any[]): void {
    if (this.database) {
      console.warn('WatermelonDatabase: Database is already initialized.');
      return;
    }

    try {
      const adapter = new SQLiteAdapter({
        schema: appSchema,
        // (You might want to comment out migration events for production if noisy)
        // migrations, // Add migrations here when defined in Level 1 or 2
        dbName: 'warranty_hub_db',
        jsi: Platform.OS === 'ios', // Enable JSI on iOS for performance
        onSetUpError: (error) => {
          // Database failed to load -- check if you need to reload the app or recreate the DB
          console.error('WatermelonDatabase: Failed to set up database adapter', error);
        }
      });

      this.database = new Database({
        adapter,
        modelClasses,
      });

      console.log('WatermelonDatabase: Successfully initialized.');
    } catch (error) {
      console.error('WatermelonDatabase: Critical initialization error', error);
      throw error;
    }
  }

  /**
   * Returns the initialized Database instance.
   * Throws an error if accessed before initialization.
   */
  public getDatabase(): Database {
    if (!this.database) {
      throw new Error('WatermelonDatabase: Database has not been initialized. Call initialize() first.');
    }
    return this.database;
  }

  /**
   * Resets the database. Useful for clearing data on logout in a secure way.
   * Warning: This is a destructive operation.
   */
  public async resetDatabase(): Promise<void> {
    if (!this.database) {
      return;
    }
    try {
      await this.database.write(async () => {
        await this.database!.unsafeResetDatabase();
      });
      console.log('WatermelonDatabase: Database reset complete.');
    } catch (error) {
      console.error('WatermelonDatabase: Failed to reset database', error);
      throw error;
    }
  }
}