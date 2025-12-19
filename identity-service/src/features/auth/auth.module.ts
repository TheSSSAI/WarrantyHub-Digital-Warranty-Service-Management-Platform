import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthController } from './auth.controller';
import { LoginHandler } from './application/commands/login.handler';
import { RefreshTokenHandler } from './application/commands/refresh-token.handler';
import { LogoutHandler } from './application/commands/logout.handler';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { TokenRevocationService } from './services/token-revocation.service';
import { SharedModule } from '../../shared/shared.module';
import { UsersModule } from '../users/users.module';

/**
 * Auth Module
 * 
 * Bounded Context for Authentication and Authorization.
 * Orchestrates login flows, token validation, and security guards.
 * 
 * Features:
 * - CQRS Handlers for Login, Logout, Refresh.
 * - JWT Strategy for validating Bearer tokens via Passport.
 * - RolesGuard for RBAC enforcement.
 * - TokenRevocation for security lifecycle management.
 */
@Module({
  imports: [
    // Access to configuration for JWT secrets and OAuth settings
    ConfigModule,
    // CQRS support for command handling
    CqrsModule,
    // UsersModule required to validate user existence and retrieve local roles during auth
    UsersModule,
    // SharedModule for Audit Logging and Azure AD interaction
    SharedModule,
    // Passport configuration
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JWT Configuration
    // Note: While Azure AD B2C issues tokens, this module helps in decoding/verifying 
    // or issuing internal tokens if a split-token architecture is used.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    // Command Handlers
    LoginHandler,
    RefreshTokenHandler,
    LogoutHandler,
    
    // Security Services & Strategies
    TokenRevocationService,
    JwtStrategy,
    RolesGuard,
    
    // Explicit provider registration if needed by other components
    {
      provide: 'ITokenRevocationService',
      useClass: TokenRevocationService,
    }
  ],
  exports: [
    // Exporting Guards and Services that might be used globally or by other modules
    RolesGuard,
    JwtStrategy,
    TokenRevocationService,
    PassportModule,
  ],
})
export class AuthModule {}