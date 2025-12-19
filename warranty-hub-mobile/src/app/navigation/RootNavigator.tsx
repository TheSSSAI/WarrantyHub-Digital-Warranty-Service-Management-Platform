import React, { useEffect, useState, useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthService } from '../../application/auth/AuthService';
import { ENV } from '../config/env';

// Feature Screens - Assuming these exist in the project structure based on architecture
// If these files were not generated in previous levels, these imports reflect the intended architecture
import { JobDetailScreen } from '../../presentation/features/technician/screens/JobDetailScreen';

// Placeholder imports for screens that might not be in the current generation batch
// In a real scenario, these would be actual file imports. 
// For this generation, we assume standard architectural paths.
import { JobListScreen } from '../../presentation/features/technician/screens/JobListScreen'; 
import { LoginScreen } from '../../presentation/features/auth/screens/LoginScreen'; 

/**
 * Type definitions for the Root Stack Navigator.
 * Defines all available routes and their parameters.
 */
export type RootStackParamList = {
  // Auth Routes
  Login: undefined;
  
  // Technician Routes
  JobList: undefined;
  JobDetail: { jobId: string };
  
  // Common Routes
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Deep Linking Configuration
 * Maps URL schemes to navigation routes.
 * Supports: warrantyhub://job/{id} -> JobDetail
 */
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    'warrantyhub://', 
    'https://warrantyhub.com', 
    'https://*.warrantyhub.com'
  ],
  config: {
    screens: {
      Login: 'login',
      JobList: 'jobs',
      JobDetail: {
        path: 'job/:jobId',
        parse: {
          jobId: (id: string) => id,
        },
      },
      NotFound: '*',
    },
  },
};

/**
 * RootNavigator
 * 
 * The top-level navigation component that orchestrates the app's navigation flow.
 * It handles:
 * 1. Authentication State (Switching between Auth and App stacks)
 * 2. Deep Linking configuration
 * 3. Global loading states
 * 4. Screen registration
 */
export const RootNavigator: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Subscribe to authentication state changes
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // Check initial auth state
        const hasSession = await AuthService.getInstance().isAuthenticated();
        setIsAuthenticated(hasSession);
      } catch (e) {
        console.error('Failed to restore authentication state', e);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();

    // Subscribe to observable auth state changes
    const subscription = AuthService.getInstance().authState$.subscribe((isAuth: boolean) => {
      setIsAuthenticated(isAuth);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Loading Screen (Splash)
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer 
      linking={linking}
      fallback={<View style={styles.loadingContainer}><ActivityIndicator /></View>}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {!isAuthenticated ? (
          // Authentication Stack
          <Stack.Group>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ animationTypeForReplace: 'pop' }}
            />
          </Stack.Group>
        ) : (
          // Application Stack (Technician Persona)
          <Stack.Group>
            <Stack.Screen 
              name="JobList" 
              component={JobListScreen} 
              options={{ 
                headerShown: true,
                title: 'My Assignments'
              }}
            />
            <Stack.Screen 
              name="JobDetail" 
              component={JobDetailScreen} 
              options={{ 
                headerShown: true,
                title: 'Job Details',
                headerBackTitle: 'Back'
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});