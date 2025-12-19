import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICachePort } from '../../domain/ports/icache.port.ts';

@Injectable()
export class SubscriptionManagerService {
  private readonly logger = new Logger(SubscriptionManagerService.name);

  constructor(
    @Inject('ICachePort')
    private readonly cacheService: ICachePort,
  ) {}

  /**
   * Validates if a user is authorized to subscribe to a specific job's location stream.
   * This prevents unauthorized users from tracking technicians.
   * 
   * @param userId The ID of the user requesting subscription.
   * @param jobId The Service Request ID they want to track.
   * @param userRole The role of the user (Customer, Admin, etc.)
   */
  async validateSubscriptionPermission(userId: string, jobId: string, userRole: string): Promise<boolean> {
    try {
      // Admins can track any job
      if (userRole === 'admin' || userRole === 'service_center_admin') {
        return true;
      }

      // For customers, we should check if they own the ticket.
      // Ideally, this checks a cached mapping of JobID -> CustomerID to avoid DB hits on every connect.
      // Assuming 'job_ownership:{jobId}' stores the customerId.
      const ownershipKey = `job_ownership:${jobId}`;
      const ownerId = await this.cacheService.get(ownershipKey);

      if (!ownerId) {
        // If not in cache, we default to deny (fail-safe) or trigger a DB lookup (omitted here for performance focus)
        // In a real scenario, the Service Request Service would hydrate this cache when a job is assigned.
        this.logger.warn(`Ownership cache miss for job ${jobId}. Denying subscription for user ${userId}.`);
        return false;
      }

      return ownerId === userId;
    } catch (error) {
      this.logger.error(`Error validating subscription for user ${userId} on job ${jobId}`, error);
      return false;
    }
  }

  /**
   * Tracks active viewer counts for a job.
   * Useful for analytics and resource optimization.
   */
  async incrementViewerCount(jobId: string): Promise<void> {
    const key = `tracking:job:${jobId}:viewers`;
    try {
      // This is a simplified increment. Real implementations might use Redis INCR.
      // Since ICachePort is generic, we do a best-effort approach or assume specific Redis capabilities if extended.
      // Here we assume the underlying implementation handles basic string storage.
      const current = await this.cacheService.get(key);
      const count = current ? parseInt(current, 10) + 1 : 1;
      await this.cacheService.set(key, count.toString(), 3600);
    } catch (error) {
      this.logger.error(`Failed to increment viewer count for job ${jobId}`, error);
    }
  }

  async decrementViewerCount(jobId: string): Promise<void> {
    const key = `tracking:job:${jobId}:viewers`;
    try {
      const current = await this.cacheService.get(key);
      if (current) {
        const count = Math.max(0, parseInt(current, 10) - 1);
        await this.cacheService.set(key, count.toString(), 3600);
      }
    } catch (error) {
      this.logger.error(`Failed to decrement viewer count for job ${jobId}`, error);
    }
  }
}