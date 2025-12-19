import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { TokenValidatorService } from './services/token-validator.service';

/**
 * Interface defining the options for configuring the AuthModule.
 * Allows consuming services to inject configuration dependencies (e.g., ConfigService).
 */
export interface AuthModuleAsyncOptions {
  imports?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<AuthModuleOptions> | AuthModuleOptions;
  inject?: any[];
}

/**
 * Configuration options for the AuthModule.
 */
export interface AuthModuleOptions {
  issuer: string;
  audience: string;
  jwksUri: string;
}

/**
 * Global Authentication and Authorization Module.
 * 
 * This module standardizes security across all microservices by providing:
 * - JWT Validation Strategy
 * - Role-Based Access Control (RBAC) Guards
 * - Token Validation Services
 * 
 * It is designed to be imported into the root AppModule of each microservice.
 */
@Global()
@Module({})
export class AuthModule {
  static registerAsync(options: AuthModuleAsyncOptions): DynamicModule {
    const authOptionsProvider: Provider = {
      provide: 'AUTH_MODULE_OPTIONS',
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: AuthModule,
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: options.imports || [],
          useFactory: async (authOptions: AuthModuleOptions) => ({
            // Configuration for the JwtModule if we were using local signing.
            // Since we validate against external JWKS, this might be minimal,
            // but we register it to ensure the JwtService is available if needed.
            verifyOptions: {
              issuer: authOptions.issuer,
              audience: authOptions.audience,
            },
          }),
          inject: ['AUTH_MODULE_OPTIONS'], // Inject the resolved options
        }),
        ...(options.imports || []),
      ],
      providers: [
        authOptionsProvider,
        TokenValidatorService,
        // Registers the JWT Guard. Note: Typically guards are used via APP_GUARD or applied to controllers.
        // We export it so it can be used manually or globally by consumers.
        JwtAuthGuard,
        // Registers the Roles Guard for RBAC.
        RolesGuard,
      ],
      exports: [
        TokenValidatorService,
        JwtAuthGuard,
        RolesGuard,
        PassportModule,
        JwtModule,
      ],
    };
  }
}