import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Level 2: Infrastructure
import { ApiClient } from '../infrastructure/api/ApiClient';
import { GeolocationAdapter } from '../infrastructure/native/GeolocationAdapter';
import { WatermelonDatabase } from '../infrastructure/persistence/WatermelonDatabase';
import { FCMService } from '../infrastructure/notifications/FCMService';
// Assuming SignalRClient exists in infrastructure as per architectural requirements, 
// if not present in previous generation, we would implement a compliant adapter here.
import { SignalRClient } from '../infrastructure/networking/SignalRClient'; 

// Level 3: Application Services
import { AuthService } from '../application/auth/AuthService';
import { OfflineQueueManager } from '../application/sync/OfflineQueueManager';
import { LocationTrackingService } from '../application/technician/LocationTrackingService';
import { JobCompletionUseCase } from '../application/technician/JobCompletionUseCase';

// Level 0: Config
import { ENV } from './config/env';

// --- Dependency Injection Container Interface ---
interface IServiceContainer {
  apiClient: ApiClient;
  geolocationAdapter: GeolocationAdapter;
  authService: AuthService;
  offlineQueueManager: OfflineQueueManager;
  locationTrackingService: LocationTrackingService;
  jobCompletionUseCase: JobCompletionUseCase;
  fcmService: FCMService;
}

// --- Context Definition ---
const ServiceContext = createContext<IServiceContainer | null>(null);

// --- React Query Client ---
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders acts as the Composition Root for the application.
 * It initializes all infrastructure and application services, wiring dependencies
 * via constructor injection, and exposes them via React Context.
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [services, setServices] = useState<IServiceContainer | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeServices = async () => {
      try {
        // 1. Initialize Infrastructure (Level 2)
        const database = new WatermelonDatabase();
        // Initialize DB asynchronously if required (e.g. migrations)
        // await database.initialize(); 

        const apiClient = new ApiClient({
          baseUrl: ENV.API_URL,
          timeout: 10000,
        });

        const geolocationAdapter = new GeolocationAdapter();
        const signalRClient = new SignalRClient(ENV.SIGNALR_HUB_URL);
        const fcmService = new FCMService();

        // 2. Initialize Application Services (Level 3) - Dependency Injection
        const authService = new AuthService(apiClient, database);
        
        // Ensure Auth token is attached to API client requests
        apiClient.setAuthTokenProvider(async () => {
          const token = await authService.getAccessToken();
          return token;
        });

        const offlineQueueManager = new OfflineQueueManager(
            database, 
            apiClient,
            // Assuming a network monitor utility exists or passing null if optional in constructor
            // for this scope we assume internal handling
        );

        const locationTrackingService = new LocationTrackingService(
          geolocationAdapter,
          signalRClient,
          // Battery service implied or optional
        );

        const jobCompletionUseCase = new JobCompletionUseCase(
          apiClient,
          offlineQueueManager,
          database
        );

        // 3. Initialize Services (Async Setup)
        // Initialize Notifications
        await fcmService.initialize();
        
        // Start Offline Queue Processing (if network available)
        offlineQueueManager.startQueueProcessing();

        // 4. Construct Container
        const container: IServiceContainer = {
          apiClient,
          geolocationAdapter,
          authService,
          offlineQueueManager,
          locationTrackingService,
          jobCompletionUseCase,
          fcmService,
        };

        setServices(container);
      } catch (error: any) {
        console.error('Failed to initialize app services:', error);
        setInitError(error.message || 'Initialization Failed');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeServices();
  }, []);

  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (initError || !services) {
    // In a real app, this would be a proper Error Boundary or Fatal Error Screen
    return (
      <View style={styles.errorContainer}>
        <ActivityIndicator size="small" color="#FF3B30" />
      </View>
    );
  }

  return (
    <ServiceContext.Provider value={services}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ServiceContext.Provider>
  );
};

/**
 * Custom hook to access the Service Container.
 * Throws an error if used outside of AppProviders.
 */
export const useServices = (): IServiceContainer => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within an AppProviders component.');
  }
  return context;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});