import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  UseGuards, 
  Req, 
  Logger, 
  UnauthorizedException 
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiBody 
} from '@nestjs/swagger';
import { LoginDto } from './application/dtos/login.dto'; // Assuming existence based on standard pattern
import { AuthResponseDto } from './application/dtos/auth-response.dto';
import { RefreshTokenDto } from './application/dtos/refresh-token.dto'; // Assuming existence
import { LoginCommand } from './application/commands/login.command';
import { RefreshTokenCommand } from './application/commands/refresh-token.command';
import { LogoutCommand } from './application/commands/logout.command';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Assuming standard Guard wrapper around strategy
import { Request } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and issue JWT tokens' })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in.', 
    type: AuthResponseDto 
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    this.logger.log(`Login attempt for user: ${loginDto.email}`);
    
    try {
      const command = new LoginCommand(loginDto.email, loginDto.password);
      const result = await this.commandBus.execute<LoginCommand, AuthResponseDto>(command);
      
      this.logger.log(`User logged in successfully: ${loginDto.email}`);
      return result;
    } catch (error) {
      this.logger.warn(`Login failed for user: ${loginDto.email}. Reason: ${error.message}`);
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using a valid refresh token' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tokens successfully refreshed.', 
    type: AuthResponseDto 
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token.' })
  @ApiBody({ type: RefreshTokenDto })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    this.logger.log('Refresh token attempt');
    
    try {
      const command = new RefreshTokenCommand(refreshTokenDto.refreshToken);
      const result = await this.commandBus.execute<RefreshTokenCommand, AuthResponseDto>(command);
      
      return result;
    } catch (error) {
      this.logger.error(`Token refresh failed: ${error.message}`);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user and invalidate refresh tokens' })
  @ApiResponse({ status: 204, description: 'User successfully logged out.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async logout(@Req() req: Request): Promise<void> {
    const userId = req.user['sub']; // Assuming 'sub' claim holds user ID from JwtStrategy
    this.logger.log(`Logout request for user ID: ${userId}`);

    const command = new LogoutCommand(userId);
    await this.commandBus.execute(command);
  }
}