/**
 * Interface for Real-Time Communication Client.
 * Abstracts the implementation of WebSocket/SignalR connections for
 * real-time features like Chat and Location Tracking.
 */
export interface ISignalRClient {
  /**
   * Initializes and starts the connection to the SignalR hub.
   * 
   * @param token The JWT access token for authentication
   * @param hubUrl The full URL to the SignalR hub endpoint
   * @returns Promise resolving when connection is established
   */
  connect(token: string, hubUrl: string): Promise<void>;

  /**
   * Stops the connection and releases resources.
   * @returns Promise resolving when disconnected
   */
  disconnect(): Promise<void>;

  /**
   * Invokes a method on the server hub.
   * 
   * @param methodName The name of the server method to call
   * @param args Arguments to pass to the server method
   * @returns Promise resolving with the server's response
   */
  invoke<T = any>(methodName: string, ...args: any[]): Promise<T>;

  /**
   * Sends a message to the server without expecting a response.
   * 
   * @param methodName The name of the server method
   * @param args Arguments to pass
   */
  send(methodName: string, ...args: any[]): Promise<void>;

  /**
   * Registers a handler for a server-sent event.
   * 
   * @param eventName The name of the event to listen for
   * @param newMethod The callback function to execute when the event is received
   */
  on(eventName: string, newMethod: (...args: any[]) => void): void;

  /**
   * Removes a handler for a server-sent event.
   * 
   * @param eventName The name of the event
   * @param method The specific callback to remove (optional, removes all if null)
   */
  off(eventName: string, method?: (...args: any[]) => void): void;

  /**
   * Checks if the client is currently connected.
   */
  isConnected(): boolean;

  /**
   * Manually attempts to reconnect if the connection was lost.
   */
  reconnect(): Promise<void>;
}