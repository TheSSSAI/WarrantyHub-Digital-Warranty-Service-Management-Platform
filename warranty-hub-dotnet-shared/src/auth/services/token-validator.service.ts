import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

/**
 * Service responsible for validating JWT tokens against the Identity Provider's JWKS.
 * Implements "Zero Trust" security by verifying signatures at the service level.
 */
@Injectable()
export class TokenValidatorService {
  private readonly logger = new Logger(TokenValidatorService.name);
  private jwksClientInstance: jwksClient.JwksClient;

  constructor() {
    // These should ideally come from configuration injection, but for level 0 independence 
    // we initialize with defaults or expect them to be set via initialization method
    // In a real implementation, ConfigService would inject these values.
    const jwksUri = process.env.JWKS_URI; 
    
    if (jwksUri) {
      this.initializeJwksClient(jwksUri);
    }
  }

  /**
   * Initializes the JWKS client with the provider URI.
   * @param jwksUri The URI to fetch JSON Web Key Sets
   */
  public initializeJwksClient(jwksUri: string): void {
    this.jwksClientInstance = jwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: jwksUri,
    });
    this.logger.log(`JWKS Client initialized for URI: ${jwksUri}`);
  }

  /**
   * Validates a JWT token string.
   * @param token The raw JWT token string
   * @param audience The expected audience (aud) claim
   * @param issuer The expected issuer (iss) claim
   * @returns The decoded token payload if valid
   * @throws UnauthorizedException if validation fails
   */
  public async validateToken(token: string, audience?: string, issuer?: string): Promise<any> {
    if (!this.jwksClientInstance) {
      const msg = 'JWKS Client not initialized. Cannot validate token.';
      this.logger.error(msg);
      throw new Error(msg);
    }

    try {
      const decodedHeader = jwt.decode(token, { complete: true });
      if (!decodedHeader || typeof decodedHeader === 'string' || !decodedHeader.header) {
        throw new Error('Invalid token structure');
      }

      const key = await this.getSigningKey(decodedHeader.header.kid);
      const signingKey = key.getPublicKey();

      return new Promise((resolve, reject) => {
        jwt.verify(
          token,
          signingKey,
          {
            algorithms: ['RS256'],
            audience: audience,
            issuer: issuer,
          },
          (err, decoded) => {
            if (err) {
              this.logger.warn(`Token validation failed: ${err.message}`);
              reject(new UnauthorizedException(`Token validation failed: ${err.message}`));
            } else {
              resolve(decoded);
            }
          },
        );
      });
    } catch (error) {
      this.logger.error(`Error during token validation: ${error.message}`);
      throw new UnauthorizedException('Invalid authorization token');
    }
  }

  /**
   * Retrieves the signing key from the JWKS client.
   * @param kid The Key ID from the JWT header
   */
  private async getSigningKey(kid: string): Promise<jwksClient.SigningKey> {
    return new Promise((resolve, reject) => {
      this.jwksClientInstance.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(key!);
        }
      });
    });
  }
}