import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
// Assuming the port definition based on architectural analysis, as it wasn't in the provided level 1 file list explicitly
// but is required for the Routing Domain Service at Level 2
import { IServiceCenterIntegrationPort, ServiceCenterDto } from '../../modules/service-request/domain/ports/service-center-integration.port';
import { GeoLocation } from '../../modules/service-request/domain/value-objects/geo-location.vo';

@Injectable()
export class HttpServiceCenterAdapter implements IServiceCenterIntegrationPort {
  private readonly logger = new Logger(HttpServiceCenterAdapter.name);
  private readonly serviceCenterUrl: string;
  private readonly timeoutDuration: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceCenterUrl = this.configService.get<string>('SERVICE_CENTER_SERVICE_URL', 'http://service-center-service:3000');
    this.timeoutDuration = this.configService.get<number>('HTTP_TIMEOUT', 5000);
  }

  /**
   * Retrieves a list of eligible service centers based on geospatial location and brand affiliation.
   * 
   * @param location The GPS coordinates of the service request
   * @param brandId The UUID of the brand associated with the product
   * @returns Array of ServiceCenterDto objects
   */
  async findCandidates(location: GeoLocation, brandId: string): Promise<ServiceCenterDto[]> {
    const url = `${this.serviceCenterUrl}/api/v1/service-centers/candidates`;
    
    this.logger.debug(`Finding service center candidates for Brand: ${brandId} at [${location.latitude}, ${location.longitude}]`);

    try {
      const { data } = await lastValueFrom(
        this.httpService.get<ServiceCenterDto[]>(url, {
          params: {
            lat: location.latitude,
            long: location.longitude,
            brandId: brandId,
          },
          timeout: this.timeoutDuration,
        }).pipe(
          timeout(this.timeoutDuration),
          catchError((error) => {
            this.logger.error(`Error querying Service Center Service: ${error.message}`);
            throw error;
          }),
        ),
      );

      this.logger.debug(`Found ${data.length} candidate service centers`);
      return data;

    } catch (error) {
      this.handleHttpError(error);
      // Return empty array to allow the domain service to handle "no candidates" logic gracefully
      return [];
    }
  }

  /**
   * Validates if a specific service center is active and capable of accepting new requests.
   * 
   * @param serviceCenterId UUID of the service center
   */
  async validateServiceCenterAvailability(serviceCenterId: string): Promise<boolean> {
    const url = `${this.serviceCenterUrl}/api/v1/service-centers/${serviceCenterId}/availability`;

    try {
      const { data } = await lastValueFrom(
        this.httpService.get<{ isAvailable: boolean }>(url, {
          timeout: this.timeoutDuration
        }).pipe(timeout(this.timeoutDuration))
      );
      return data.isAvailable;
    } catch (error) {
      this.logger.warn(`Failed to validate availability for SC ${serviceCenterId}: ${error.message}`);
      return false; // Fail safe
    }
  }

  private handleHttpError(error: any): void {
    if (error.response) {
      this.logger.error(`Service Center Service responded with status: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      this.logger.error('No response received from Service Center Service');
    } else {
      this.logger.error(`Request setup failed: ${error.message}`);
    }
    
    // If critical connectivity issues exist, we might throw a specific infrastructure exception here
    // For finding candidates, we return empty list in the main method, but we log heavily here.
  }
}