import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for Authentication Responses.
 * Standardizes the payload returned to clients upon successful login or token refresh.
 */
export class AuthResponseDto {
  @ApiProperty({
    description: 'The JWT access token used for authorizing API requests',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InRlc3Qt... (truncated)'
  })
  readonly accessToken: string;

  @ApiProperty({
    description: 'The refresh token used to obtain new access tokens without re-credentials',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InRlc3Qt... (truncated)'
  })
  readonly refreshToken: string;

  @ApiProperty({
    description: 'The expiration time of the access token in seconds',
    example: 3600
  })
  readonly expiresIn: number;

  @ApiProperty({
    description: 'The type of token returned',
    example: 'Bearer',
    default: 'Bearer'
  })
  readonly tokenType: string;

  /**
   * Creates a new AuthResponseDto instance.
   * @param accessToken - The signed JWT
   * @param refreshToken - The refresh token
   * @param expiresIn - Token lifetime in seconds
   * @param tokenType - defaults to 'Bearer'
   */
  constructor(
    accessToken: string, 
    refreshToken: string, 
    expiresIn: number, 
    tokenType: string = 'Bearer'
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.tokenType = tokenType;
  }
}