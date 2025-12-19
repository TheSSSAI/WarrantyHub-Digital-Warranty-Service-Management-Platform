import Config from 'react-native-config';

/**
 * Defines the contract for Environment Variables expected by the application.
 * Utilizes react-native-config to load values from .env files.
 */
interface EnvironmentConfig {
  API_BASE_URL: string;
  ENV_NAME: 'development' | 'staging' | 'production';
  AUTH_B2C_TENANT_NAME: string;
  AUTH_B2C_CLIENT_ID: string;
  AUTH_B2C_POLICY_NAME: string;
  MAPBOX_ACCESS_TOKEN: string;
  SIGNALR_HUB_URL: string;
  IS_DEBUG_MODE: boolean;
}

/**
 * Validates existence of critical environment variables.
 * Fails fast if configuration is missing to prevent runtime ambiguity.
 */
function validateConfig(): void {
  const requiredKeys = [
    'API_BASE_URL',
    'AUTH_B2C_CLIENT_ID',
    'AUTH_B2C_TENANT_NAME',
    'MAPBOX_ACCESS_TOKEN'
  ];

  const missingKeys = requiredKeys.filter((key) => !Config[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      `CRITICAL: Missing environment variables: ${missingKeys.join(', ')}. ` +
      `Please ensure .env file is correctly configured.`
    );
  }
}

// Perform validation immediately upon module load
validateConfig();

const Env: EnvironmentConfig = {
  API_BASE_URL: Config.API_BASE_URL || 'http://localhost:3000',
  ENV_NAME: (Config.ENV_NAME as EnvironmentConfig['ENV_NAME']) || 'development',
  AUTH_B2C_TENANT_NAME: Config.AUTH_B2C_TENANT_NAME || '',
  AUTH_B2C_CLIENT_ID: Config.AUTH_B2C_CLIENT_ID || '',
  AUTH_B2C_POLICY_NAME: Config.AUTH_B2C_POLICY_NAME || 'B2C_1_SIGNUP_SIGNIN',
  MAPBOX_ACCESS_TOKEN: Config.MAPBOX_ACCESS_TOKEN || '',
  SIGNALR_HUB_URL: Config.SIGNALR_HUB_URL || '',
  IS_DEBUG_MODE: __DEV__,
};

export default Env;