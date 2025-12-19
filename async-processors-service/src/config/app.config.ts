import { registerAs } from '@nestjs/config';
import { IsString, IsNotEmpty, IsUrl, IsEnum, IsNumber, Min, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * Environment variables schema definition for validation.
 * Ensures the application fails fast if required configuration is missing.
 */
class EnvironmentVariables {
  // Service Bus Configuration
  @IsString()
  @IsNotEmpty()
  AZURE_SERVICE_BUS_CONNECTION_STRING: string;

  @IsString()
  @IsNotEmpty()
  AZURE_SERVICE_BUS_TOPIC_NAME: string;

  @IsString()
  @IsNotEmpty()
  AZURE_SERVICE_BUS_OCR_SUBSCRIPTION: string;

  // Azure AI Document Intelligence Configuration
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  AZURE_DOC_INTELLIGENCE_ENDPOINT: string;

  @IsString()
  @IsNotEmpty()
  AZURE_DOC_INTELLIGENCE_KEY: string;

  // Azure Storage Configuration (for downloading invoice blobs)
  @IsString()
  @IsNotEmpty()
  AZURE_STORAGE_CONNECTION_STRING: string;

  @IsString()
  @IsNotEmpty()
  AZURE_STORAGE_CONTAINER_NAME: string;

  // Product Service Integration (Internal API)
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  PRODUCT_SERVICE_INTERNAL_URL: string;

  @IsString()
  @IsNotEmpty()
  PRODUCT_SERVICE_API_KEY: string;

  // Scheduler Configuration
  @IsString()
  @IsNotEmpty()
  CRON_SCHEDULE_TRANSFER_EXPIRY: string = '0 * * * *'; // Default: Hourly
}

/**
 * Validates the process.env against the EnvironmentVariables class.
 * @param config The raw configuration object
 * @returns The validated configuration object
 * @throws Error if validation fails
 */
function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

/**
 * App Configuration Factory
 * Provides a type-safe configuration object for the application.
 */
export default registerAs('app', () => {
  // Validate environment variables before application startup
  validate(process.env);

  return {
    serviceBus: {
      connectionString: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
      topicName: process.env.AZURE_SERVICE_BUS_TOPIC_NAME,
      ocrSubscription: process.env.AZURE_SERVICE_BUS_OCR_SUBSCRIPTION,
    },
    docIntelligence: {
      endpoint: process.env.AZURE_DOC_INTELLIGENCE_ENDPOINT,
      key: process.env.AZURE_DOC_INTELLIGENCE_KEY,
    },
    storage: {
      connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
      containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
    },
    productService: {
      url: process.env.PRODUCT_SERVICE_INTERNAL_URL,
      apiKey: process.env.PRODUCT_SERVICE_API_KEY,
    },
    scheduler: {
      transferExpiryCron: process.env.CRON_SCHEDULE_TRANSFER_EXPIRY,
    },
  };
});