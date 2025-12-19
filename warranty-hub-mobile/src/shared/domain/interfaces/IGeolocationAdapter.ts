/**
 * Domain-level definitions for Geolocation data structures.
 * This file defines the core value objects and error types related to location services
 * shared across the application domain.
 */

export interface GeoCoordinates {
  /** Latitude in decimal degrees */
  latitude: number;
  /** Longitude in decimal degrees */
  longitude: number;
  /** Altitude in meters, relative to sea level */
  altitude: number | null;
  /** Accuracy of the latitude and longitude coordinates in meters */
  accuracy: number;
  /** Accuracy of the altitude in meters */
  altitudeAccuracy: number | null;
  /** Direction of travel in degrees (0-360), relative to true north */
  heading: number | null;
  /** Instantaneous speed in meters per second */
  speed: number | null;
}

export interface GeoPosition {
  /** The coordinates of the position */
  coords: GeoCoordinates;
  /** The time at which the position was retrieved (milliseconds since epoch) */
  timestamp: number;
  /** Whether the location is mocked (Android only) */
  mocked?: boolean;
}

export enum GeoErrorCodes {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
  SERVICE_NOT_AVAILABLE = 4,
  SETTINGS_NOT_SATISFIED = 5,
}

export interface GeoError {
  /** Error code identifying the type of error */
  code: GeoErrorCodes;
  /** Human-readable error message */
  message: string;
}

export interface GeoWatchOptions {
  /** Lower accuracy means lower battery consumption */
  enableHighAccuracy?: boolean;
  /** Distance in meters before an update is triggered */
  distanceFilter?: number;
  /** Time in milliseconds to wait before erroring */
  timeout?: number;
  /** Maximum age of a cached location in milliseconds */
  maximumAge?: number;
  /** (Android) Frequency of updates in milliseconds */
  interval?: number;
  /** (Android) Fast frequency of updates in milliseconds */
  fastestInterval?: number;
}

/**
 * Core interface for Geolocation hardware adapter.
 * Defines the contract for interacting with the device's GPS capabilities.
 */
export interface IGeolocationAdapter {
  /**
   * Request location permissions from the OS.
   * @returns Promise resolving to the permission status (granted/denied/restricted)
   */
  requestPermissions(): Promise<string>;

  /**
   * Retrieves the device's current location once.
   * @param options Configuration for the location request
   */
  getCurrentPosition(options?: GeoWatchOptions): Promise<GeoPosition>;

  /**
   * Starts observing the device's location.
   * @param successCallback Function called with position updates
   * @param errorCallback Function called when errors occur
   * @param options Configuration for the watcher
   * @returns A numeric ID or function to clear the watch
   */
  watchPosition(
    successCallback: (position: GeoPosition) => void,
    errorCallback: (error: GeoError) => void,
    options?: GeoWatchOptions
  ): number | (() => void);

  /**
   * Stops observing the device's location.
   * @param watchId The ID returned by watchPosition
   */
  clearWatch(watchId: number | (() => void)): void;
}