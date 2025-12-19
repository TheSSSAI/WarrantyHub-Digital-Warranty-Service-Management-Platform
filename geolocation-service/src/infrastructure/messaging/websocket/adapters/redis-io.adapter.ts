import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(private app: INestApplicationContext) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const configService = this.app.get(ConfigService);
    
    const host = configService.get<string>('redis.host', 'localhost');
    const port = configService.get<number>('redis.port', 6379);
    const password = configService.get<string>('redis.password');
    const db = configService.get<number>('redis.db', 0);

    const pubClient = new Redis({ host, port, password, db });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]).catch(err => {
        // Handle connection errors gracefully or log them
        // Note: ioredis connects automatically, but explicit handling is good for startup checks
        console.error('Failed to connect Redis adapter clients', err);
    });

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    
    if (this.adapterConstructor) {
      server.adapter(this.adapterConstructor);
    }

    return server;
  }
}