import { BehaviorSubject, Subscription, interval, firstValueFrom, fromEvent } from 'rxjs';
import { filter, throttle, map, switchMap, takeUntil } from 'rxjs/operators';
import { IGeolocationAdapter } from '../interfaces/IGeolocationAdapter';
import { ISignalRClient } from '../interfaces/ISignalRClient';
import { LocationUpdatePayload } from '../dtos/LocationUpdatePayload';
import { GeolocationAdapter } from '../../infrastructure/native/GeolocationAdapter';

/**
 * Service responsible for orchestrating real-time location tracking for technicians.
 * Handles GPS signal acquisition, battery-efficient throttling, and WebSocket transmission.
 */
export class LocationTrackingService {
  private readonly _isTracking = new BehaviorSubject<boolean>(false);
  private _locationSubscription: Subscription | null = null;
  private _currentJobId: string | null = null;

  // Observable exposed for UI to react to tracking state
  public readonly isTracking$ = this._isTracking.asObservable();

  constructor(
    private readonly geolocationAdapter: IGeolocationAdapter,
    private readonly signalRClient: ISignalRClient
  ) {}

  /**
   * Starts the "Travel Mode" tracking session for a specific job.
   * @param jobId The active service request ID
   */
  public async startTracking(jobId: string): Promise<void> {
    if (this._isTracking.value) {
      console.warn('[LocationTrackingService] Already tracking. Stopping previous session.');
      await this.stopTracking();
    }

    this._currentJobId = jobId;

    try {
      // 1. Ensure permissions
      const hasPermission = await this.geolocationAdapter.requestPermissions();
      if (!hasPermission) {
        throw new Error('Location permissions denied');
      }

      // 2. Connect to Real-time Hub
      await this.signalRClient.connect();

      // 3. Configure and Start Background Location Updates
      // We use a strategy that balances accuracy with battery life
      const trackingOptions = {
        enableHighAccuracy: true,
        distanceFilter: 10, // Minimum 10 meters
        interval: 10000,    // Minimum 10 seconds
        fastestInterval: 5000
      };

      this._locationSubscription = this.geolocationAdapter
        .watchPosition(trackingOptions)
        .pipe(
          // Throttle updates to avoid flooding the socket and draining battery
          throttle(() => interval(15000)), // Max 1 update per 15s transmitted
          filter(position => position !== null && position !== undefined),
          map(position => this.mapToPayload(position, jobId))
        )
        .subscribe({
          next: (payload) => this.transmitLocation(payload),
          error: (err) => this.handleTrackingError(err)
        });

      this._isTracking.next(true);
      console.log(`[LocationTrackingService] Started tracking for job ${jobId}`);

    } catch (error) {
      console.error('[LocationTrackingService] Failed to start tracking', error);
      this._isTracking.next(false);
      throw error;
    }
  }

  /**
   * Stops the current tracking session and disconnects real-time channels.
   */
  public async stopTracking(): Promise<void> {
    if (!this._isTracking.value) return;

    try {
      // 1. Unsubscribe from GPS updates
      if (this._locationSubscription) {
        this._locationSubscription.unsubscribe();
        this._locationSubscription = null;
      }

      // 2. Notify backend of session end (optional, but good practice)
      if (this._currentJobId) {
        await this.signalRClient.send('StopLocationSharing', { jobId: this._currentJobId });
      }

      // 3. Reset State
      this._currentJobId = null;
      this._isTracking.next(false);

    } catch (error) {
      console.error('[LocationTrackingService] Error stopping tracking', error);
      // Force state reset even on error
      this._isTracking.next(false);
    }
  }

  /**
   * Maps a raw geolocation position to the DTO expected by the backend.
   */
  private mapToPayload(position: any, jobId: string): LocationUpdatePayload {
    // Assuming position structure matches standard Geolocation API
    return {
      jobId: jobId,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      heading: position.coords.heading || 0,
      speed: position.coords.speed || 0,
      timestamp: position.timestamp || Date.now(),
      accuracy: position.coords.accuracy
    };
  }

  /**
   * Transmits the payload via SignalR.
   */
  private async transmitLocation(payload: LocationUpdatePayload): Promise<void> {
    try {
      await this.signalRClient.send('UpdateLocation', payload);
    } catch (error) {
      console.error('[LocationTrackingService] Failed to transmit location', error);
      // In a robust system, we might queue these for retry, but real-time data is often ephemeral.
      // We maintain the stream hoping the next point succeeds.
    }
  }

  private handleTrackingError(error: any): void {
    console.error('[LocationTrackingService] GPS Stream Error', error);
    this.stopTracking(); // Safety failsafe
  }

  /**
   * Returns current tracking status
   */
  public get isTracking(): boolean {
    return this._isTracking.value;
  }
}