/**
 * @format
 */

// 'react-native-gesture-handler' must be imported at the very top of the entry file
// to ensure proper initialization for React Navigation.
import 'react-native-gesture-handler';

import { AppRegistry, LogBox } from 'react-native';
import App from './src/app/App';
import { name as appName } from './app.json';

// Architectural Note:
// This file serves as the infrastructure entry point for the React Native bundler (Metro).
// It connects the JavaScript realm to the Native realm via the AppRegistry.

// Optional: Suppress specific warnings that are known and non-critical during development cycles.
// In a production environment, structured logging would handle error reporting.
// LogBox.ignoreLogs(['...']);

/**
 * Register the main application component.
 * This is the bridge where the native iOS/Android code mounts the React Native bundle.
 */
AppRegistry.registerComponent(appName, () => App);