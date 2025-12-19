import { registerAs } from '@nestjs/config';

export default registerAs('serviceBus', () => ({
  connectionString: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
  topic: process.env.AUDIT_TOPIC || 'system-events',
  subscription: process.env.AUDIT_SUBSCRIPTION || 'audit-service-sub',
  prefetchCount: parseInt(process.env.SB_PREFETCH_COUNT || '10', 10),
  maxConcurrentCalls: parseInt(process.env.SB_MAX_CONCURRENT_CALLS || '10', 10),
  autoComplete: false, // We will manually acknowledge messages to ensure processing
}));