import { AsyncLocalStorage } from 'async_hooks';

/**
 * Interface defining the structure of the context store.
 */
export interface RequestContextStore {
  correlationId: string;
  user?: any; // Stores the decoded JWT payload
}

/**
 * Service to manage request-scoped data using Node.js AsyncLocalStorage.
 * Allows accessing correlation IDs and User information deep in the call stack
 * without passing them as arguments through every method.
 */
export class RequestContextService {
  private static readonly storage = new AsyncLocalStorage<RequestContextStore>();

  /**
   * Runs a callback within a new context scope.
   * @param context The context data to initialize.
   * @param callback The function to execute within this context.
   */
  static runWithContext<T>(context: RequestContextStore, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  /**
   * Sets the Correlation ID in the current context.
   * @param id The UUID string.
   */
  static setRequestId(id: string): void {
    const store = this.storage.getStore();
    if (store) {
      store.correlationId = id;
    }
  }

  /**
   * Retrieves the Correlation ID from the current context.
   * @returns The correlation ID or undefined if context is lost.
   */
  static getRequestId(): string | undefined {
    return this.storage.getStore()?.correlationId;
  }

  /**
   * Sets the authenticated user in the current context.
   * @param user The user object (JWT payload).
   */
  static setUser(user: any): void {
    const store = this.storage.getStore();
    if (store) {
      store.user = user;
    }
  }

  /**
   * Retrieves the authenticated user from the current context.
   * @returns The user object or undefined.
   */
  static getUser(): any | undefined {
    return this.storage.getStore()?.user;
  }
}