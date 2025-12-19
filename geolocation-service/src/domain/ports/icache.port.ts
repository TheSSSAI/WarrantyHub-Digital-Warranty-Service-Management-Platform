/**
 * Abstract definition for caching operations.
 * Allows the application layer to interact with a cache (e.g., Redis)
 * without depending on specific implementation details.
 * 
 * Used primarily for storing the "latest" location of a technician for
 * instant retrieval before broadcasting.
 */
export abstract class ICachePort {
  /**
   * Stores a value in the cache with an optional Time-To-Live (TTL).
   * @param key The key to store the value under.
   * @param value The string value to store (complex objects should be serialized).
   * @param ttlSeconds Optional expiration time in seconds.
   */
  abstract set(key: string, value: string, ttlSeconds?: number): Promise<void>;

  /**
   * Retrieves a value from the cache.
   * @param key The key to look up.
   * @returns The value string if found, or null if not found/expired.
   */
  abstract get(key: string): Promise<string | null>;

  /**
   * Deletes a value from the cache.
   * @param key The key to delete.
   */
  abstract del(key: string): Promise<void>;

  /**
   * Checks if a key exists in the cache.
   * @param key The key to check.
   * @returns 1 if exists, 0 if not.
   */
  abstract exists(key: string): Promise<number>;
}