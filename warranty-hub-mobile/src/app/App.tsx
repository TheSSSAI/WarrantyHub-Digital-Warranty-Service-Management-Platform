import React from 'react';
import { StatusBar } from 'react-native';
import { AppProviders } from './AppProviders';
import { RootNavigator } from './navigation/RootNavigator';

/**
 * App.tsx
 * 
 * The Composition Root of the React Native application.
 * 
 * Responsibilities:
 * 1. Global Provider Composition: Wraps the application in necessary Context Providers 
 *    (Dependency Injection, Auth, Theme, Query Client, Offline Sync) via AppProviders.
 * 2. Navigation Root: Renders the RootNavigator which handles the authentication switch 
 *    and main application stacks.
 * 3. System UI Configuration: Configures global status bar settings.
 * 
 * Architectural Note:
 * This component sits at the top of the component tree (Dependency Level 7) and 
 * orchestrates the integration of lower-level presentation and infrastructure components.
 */
const App = (): React.JSX.Element => {
  return (
    <AppProviders>
      {/* 
        StatusBar configuration is placed here to ensure it applies globally.
        Specific screens may override this, but this provides a consistent default.
        Translucent is set to true to handle edge-to-edge displays on Android.
      */}
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true} 
      />
      
      {/* 
        RootNavigator manages the navigation state and hierarchy.
        It depends on the Authentication State provided by AppProviders to determine
        whether to show the Auth Stack or the Main App Stack.
      */}
      <RootNavigator />
    </AppProviders>
  );
};

export default App;