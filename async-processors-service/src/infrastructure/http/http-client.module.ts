import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductServiceClient } from './product-service.client';

/**
 * HTTP Client Module.
 * 
 * Configures and exports HTTP clients used for inter-service communication.
 * specifically the ProductServiceClient used to communicate with the core Product Service API.
 * 
 * It leverages the NestJS HttpModule (Axios wrapper) and configures global defaults
 * such as timeouts to prevent resource exhaustion from hanging requests.
 */
@Module({
    imports: [
        // Register Axios with global defaults for timeout and max redirects
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                timeout: configService.get<number>('HTTP_TIMEOUT', 5000),
                maxRedirects: 5,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'AsyncProcessorsService/1.0',
                },
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
    ],
    providers: [
        ProductServiceClient
    ],
    exports: [
        ProductServiceClient,
        HttpModule
    ],
})
export class HttpClientModule {}