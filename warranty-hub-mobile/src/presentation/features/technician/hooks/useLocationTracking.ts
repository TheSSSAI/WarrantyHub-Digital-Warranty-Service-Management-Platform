import { useState, useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, Alert, Platform } from 'react-native';
import { LocationTrackingService } from '../../../application/technician/LocationTrackingService';
import { PermissionConfig } from '../../../app/config/PermissionConfig';
import { useServices } from '../../../app/AppProviders'; // Assuming this hook exposes the DI container
import { LocationUpdatePayload } from '../../../application/dtos/LocationUpdatePayload';

/**
 * Custom hook to manage Technician Travel Mode (Real-time Location Tracking).
 * Connects the UI to the domain LocationTrackingService.
 * Handles permission flows, UI state, and background/foreground transitions.
 */
export const useLocationTracking = () => {
  const { locationTrackingService } = useServices();

  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<LocationUpdatePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'undetermined'>('undetermined');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Ref to track app state for potential optimization (e.g., UI updates throttling)
  const appState = useRef<AppStateStatus>(AppState.currentState);

  // Subscribe to service state changes
  useEffect(() => {
    const trackingSubscription = locationTrackingService.isTracking$.subscribe(
      (tracking: boolean) => {
        setIsTracking(tracking);
      }
    );

    const locationSubscription = locationTrackingService.locationUpdates$.subscribe(
      (location: LocationUpdatePayload) => {
        setCurrentLocation(location);
        setError(null);
      },
      (err: any) => {
        console.error('[useLocationTracking] Stream error:', err);
        setError('Lost connection to location stream.');
      }
    );

    const errorSubscription = locationTrackingService.error$.subscribe(
      (err: Error | null) => {
        if (err) {
          setError(err.message);
          Alert.alert('Location Tracking Error', err.message);
        }
      }
    );

    // Initial check
    setIsTracking(locationTrackingService.isTrackingValue);

    return () => {
      trackingSubscription.unsubscribe();
      locationSubscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, [locationTrackingService]);

  // Handle App State changes (optional logic for UI-specific behaviors)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      // Note: The Service handles the actual background task logic.
      // This hook just ensures UI state consistency when returning to foreground.
      if (nextAppState === 'active') {
        // Re-sync basic state if needed
        setIsTracking(locationTrackingService.isTrackingValue);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [locationTrackingService]);

  /**
   * Activates Travel Mode for a specific job.
   * Handles permission requests and service activation.
   */
  const startTracking = useCallback(async (jobId: string) => {
    if (!jobId) {
      setError('Invalid Job ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Check/Request Permissions
      const hasPermission = await checkAndRequestLocationPermissions();
      
      if (!hasPermission) {
        setPermissionStatus('denied');
        setError('Location permission is required for Travel Mode.');
        setIsLoading(false);
        
        Alert.alert(
          'Permission Required',
          'To share your location with the customer, please enable "Always Allow" or "While Using" location access in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => PermissionConfig.openSettings() }
          ]
        );
        return;
      }

      setPermissionStatus('granted');

      // 2. Start Service
      await locationTrackingService.startTracking(jobId);
      
    } catch (err: any) {
      setError(err.message || 'Failed to start tracking');
      Alert.alert('Error', 'Could not activate Travel Mode. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [locationTrackingService]);

  /**
   * Deactivates Travel Mode.
   */
  const stopTracking = useCallback(async () => {
    setIsLoading(true);
    try {
      await locationTrackingService.stopTracking();
      // State updates via subscription
    } catch (err: any) {
      setError(err.message || 'Failed to stop tracking');
    } finally {
      setIsLoading(false);
    }
  }, [locationTrackingService]);

  /**
   * Internal helper to handle platform-specific permissions.
   */
  const checkAndRequestLocationPermissions = async (): Promise<boolean> => {
    try {
      // Use the PermissionConfig infrastructure helper
      const status = await PermissionConfig.checkLocationPermission();
      
      if (status === 'granted') {
        return true;
      }
      
      if (status === 'denied' || status === 'undetermined') {
        const newStatus = await PermissionConfig.requestLocationPermission();
        return newStatus === 'granted';
      }

      return false;
    } catch (e) {
      console.error('[useLocationTracking] Permission check failed', e);
      return false;
    }
  };

  return {
    isTracking,
    currentLocation,
    error,
    isLoading,
    permissionStatus,
    startTracking,
    stopTracking
  };
};