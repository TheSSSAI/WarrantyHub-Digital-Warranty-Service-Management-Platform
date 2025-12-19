import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { GeoLocation } from '../value-objects/geo-location.vo';

/**
 * Interface representing a service center candidate for routing.
 * Contains the minimal information required to make a routing decision.
 */
export interface ServiceCenterCandidate {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    availableCapacity?: number;
}

/**
 * Domain Service responsible for selecting the optimal service center.
 * Encapsulates the business logic for geospatial routing and candidate selection.
 * This service is stateless and deterministic.
 */
@Injectable()
export class RoutingDomainService {
    private readonly EARTH_RADIUS_KM = 6371;

    /**
     * Selects the best service center from a list of candidates based on the user's location.
     * 
     * Logic:
     * 1. Validates inputs.
     * 2. Filters out inactive candidates.
     * 3. Calculates the distance from the user to each candidate.
     * 4. Sorts candidates by distance (ascending).
     * 5. Returns the nearest candidate.
     * 
     * Future expansion: Could implement Round-Robin or Capacity-based logic here if
     * specific metadata is passed within the ServiceCenterCandidate.
     * 
     * @param userLocation The geolocation of the service request.
     * @param candidates The list of eligible service centers retrieved from the directory.
     * @returns The selected ServiceCenterCandidate.
     * @throws BadRequestException if inputs are invalid.
     * @throws NotFoundException if no eligible candidates are available.
     */
    public selectBestCenter(
        userLocation: GeoLocation,
        candidates: ServiceCenterCandidate[],
    ): ServiceCenterCandidate {
        if (!userLocation) {
            throw new BadRequestException('User location is required for routing.');
        }

        if (!candidates || candidates.length === 0) {
            throw new NotFoundException('No service center candidates provided for routing.');
        }

        // 1. Filter for active candidates only
        const activeCandidates = candidates.filter((c) => c.isActive);

        if (activeCandidates.length === 0) {
            throw new NotFoundException('No active service centers available in the candidate list.');
        }

        // 2. Calculate distances and map to a sortable structure
        const candidatesWithDistance = activeCandidates.map((center) => {
            const distance = this.calculateHaversineDistance(
                userLocation.latitude,
                userLocation.longitude,
                center.latitude,
                center.longitude,
            );
            return { center, distance };
        });

        // 3. Sort by distance (nearest first)
        // If distances are effectively equal (e.g., within 100 meters), stable sort maintains order.
        // In a real-world scenario with high density, additional logic for load balancing could be applied here.
        candidatesWithDistance.sort((a, b) => a.distance - b.distance);

        // 4. Return the nearest
        // The nearest logic minimizes travel time for technicians, aligning with operational efficiency.
        const bestMatch = candidatesWithDistance[0];

        // Logging the decision logic (in a real app, use a logger service)
        // console.log(`Routing decision: Selected ${bestMatch.center.name} at distance ${bestMatch.distance.toFixed(2)}km`);

        return bestMatch.center;
    }

    /**
     * Calculates the great-circle distance between two points on a sphere using the Haversine formula.
     * 
     * @param lat1 User Latitude
     * @param lon1 User Longitude
     * @param lat2 Center Latitude
     * @param lon2 Center Longitude
     * @returns Distance in Kilometers
     */
    private calculateHaversineDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
    ): number {
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(lat1)) *
            Math.cos(this.degreesToRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return this.EARTH_RADIUS_KM * c;
    }

    /**
     * Converts degrees to radians.
     * @param degrees 
     */
    private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}