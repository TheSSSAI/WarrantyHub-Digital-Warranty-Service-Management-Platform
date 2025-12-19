import {
  GeoPosition,
  GeoError,
  GeoWatchOptions,
  IGeolocationAdapter as IDomainGeolocationAdapter
} from '../../shared/domain/interfaces/IGeolocationAdapter';

/**
 * Application-level interface for Geolocation services.
 * This extends the domain adapter to potentially include application-specific
 * concerns like background tracking configuration or battery optimization strategies.
 * 
 * In Clean Architecture, this acts as the Port that the Infrastructure layer (Adapter) must implement.
 */
export interface IGeolocationAdapter extends IDomainGeolocationAdapter {
  /**
   * Configure background location tracking specifics.
   * This is crucial for the Technician 'Travel Mode' (REQ-FUNC-009).
   * 
   * @param config Configuration object for background services
   */
  configureBackgroundTracking(config: {
    notificationTitle: string;
    notificationText: string;
    taskName: string;
    jobId?: string;
  }): Promise<void>;

  /**
   * Starts the background location service.
   * Unlike watchPosition, this is intended to run even when the app is minimized/killed
   * if the OS permits.
   */
  startBackgroundService(): Promise<void>;

  /**
   * Stops the background location service.
   */
  stopBackgroundService(): Promise<void>;

  /**
   * Checks if the location services are currently enabled on the device.
   */
  checkLocationServicesEnabled(): Promise<boolean>;
}

export type { GeoPosition, GeoError, GeoWatchOptions };