import Geolocation, { 
    GeoPosition, 
    GeoError, 
    GeoWatchOptions 
  } from 'react-native-geolocation-service';
  import { PermissionsAndroid, Platform } from 'react-native';
  import { IGeolocationAdapter, GeoLocation } from '../../application/interfaces/IGeolocationAdapter';
  
  /**
   * Adapter implementation for native geolocation services.
   * Wraps 'react-native-geolocation-service' to provide a clean interface for
   * the application layer, handling permissions and platform-specific quirks.
   */
  export class GeolocationAdapter implements IGeolocationAdapter {
    /**
     * Requests location permissions from the OS.
     * Handles differences between iOS (handled by plist/library) and Android (runtime permissions).
     */
    public async requestPermissions(): Promise<boolean> {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        return auth === 'granted';
      }
  
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'WarrantyHub needs access to your location for Technician Travel Mode.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn('GeolocationAdapter: Failed to request Android permissions', err);
          return false;
        }
      }
  
      return false;
    }
  
    /**
     * Retrieves the current device position once.
     * @param highAccuracy Whether to use GPS (true) or Network (false)
     */
    public getCurrentPosition(highAccuracy: boolean = true): Promise<GeoLocation> {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position: GeoPosition) => {
            resolve(this.mapPositionToDomain(position));
          },
          (error: GeoError) => {
            reject(this.mapErrorToDomain(error));
          },
          { 
            enableHighAccuracy: highAccuracy, 
            timeout: 15000, 
            maximumAge: 10000 
          }
        );
      });
    }
  
    /**
     * Starts watching the device position and emits updates via callback.
     * Used for Technician Travel Mode.
     * 
     * @param onSuccess Callback for successful location updates
     * @param onError Callback for errors
     * @param options Configuration for frequency and accuracy
     * @returns A watch ID that can be used to stop tracking
     */
    public watchPosition(
      onSuccess: (location: GeoLocation) => void,
      onError: (error: any) => void,
      options?: { interval?: number; distanceFilter?: number }
    ): number {
      const watchOptions: GeoWatchOptions = {
        enableHighAccuracy: true,
        distanceFilter: options?.distanceFilter || 10, // Default to 10 meters
        interval: options?.interval || 5000, // Default to 5 seconds
        fastestInterval: 2000,
        showLocationDialog: true,
        forceRequestLocation: true,
        useSignificantChanges: false,
      };
  
      return Geolocation.watchPosition(
        (position: GeoPosition) => {
          onSuccess(this.mapPositionToDomain(position));
        },
        (error: GeoError) => {
          onError(this.mapErrorToDomain(error));
        },
        watchOptions
      );
    }
  
    /**
     * Stops a specific location watch.
     * @param watchId The ID returned by watchPosition
     */
    public stopWatch(watchId: number): void {
      Geolocation.clearWatch(watchId);
    }
  
    /**
     * Maps the native library's position object to the domain's GeoLocation DTO.
     */
    private mapPositionToDomain(position: GeoPosition): GeoLocation {
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
        timestamp: position.timestamp,
      };
    }
  
    /**
     * Normalizes native errors into a standard format.
     */
    private mapErrorToDomain(error: GeoError): Error {
      let message = 'Unknown location error';
      switch (error.code) {
        case 1:
          message = 'Location permission denied';
          break;
        case 2:
          message = 'Position unavailable (GPS signal lost)';
          break;
        case 3:
          message = 'Location request timed out';
          break;
        case 4:
            message = 'Play services not available';
            break;
        case 5:
            message = 'Settings not satisfied';
            break;
        default:
          message = error.message;
      }
      return new Error(message);
    }
  }