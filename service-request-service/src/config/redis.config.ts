import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => {
  const host = process.env.REDIS_HOST;
  const port = parseInt(process.env.REDIS_PORT || '6379', 10);
  const password = process.env.REDIS_PASSWORD;
  const db = parseInt(process.env.REDIS_DB || '0', 10);
  const tlsEnabled = process.env.REDIS_TLS_ENABLED === 'true';

  if (!host) {
    throw new Error('REDIS_HOST environment variable is not defined');
  }

  if (isNaN(port)) {
    throw new Error('REDIS_PORT must be a valid number');
  }

  return {
    host,
    port,
    password,
    db,
    tls: tlsEnabled ? {} : undefined, // Azure Redis often requires TLS
    url: `redis://${password ? ':' + password + '@' : ''}${host}:${port}/${db}`,
  };
});