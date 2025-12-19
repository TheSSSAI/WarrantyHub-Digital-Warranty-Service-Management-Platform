import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to extract the authenticated user from the request object.
 * Assumes the request has been enriched by a Guard (likely JwtAuthGuard) upstream.
 * 
 * Usage:
 * @Get('profile')
 * getProfile(@User() user: any) {
 *   return user;
 * }
 * 
 * @Get('email')
 * getEmail(@User('email') email: string) {
 *   return email;
 * }
 */
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);