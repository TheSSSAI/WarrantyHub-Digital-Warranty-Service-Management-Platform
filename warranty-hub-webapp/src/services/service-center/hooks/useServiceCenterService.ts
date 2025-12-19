"use client";

import { useState, useCallback } from 'react';
import { updateServiceAreaAction } from '../../service-center/commands/updateServiceAreaAction';
import { IGeoFenceData } from '../types/ServiceContracts';
import { useGlobalStore } from '../../../lib/store/globalStore';
import { ApiClient } from '../../../lib/api/ApiClient';
import { serviceAreaSchema } from '../validation/inputSchema';
import { z } from 'zod';

// Define return type for the hook
interface UseServiceCenterServiceResult {
    isLoading: boolean;
    error: string | null;
    updateServiceArea: (data: IGeoFenceData) => Promise<void>;
    fetchServiceArea: (serviceCenterId: string) => Promise<IGeoFenceData | null>;
    validateGeoJson: (geoJson: any) => boolean;
}

/**
 * Hook for managing Service Center operations, specifically geospatial definitions.
 * Integrates with Server Actions for mutations and API Client for queries.
 */
export const useServiceCenterService = (): UseServiceCenterServiceResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    // Access global store for user feedback
    const { addToast } = useGlobalStore();

    /**
     * Validates GeoJSON structure before sending to server.
     * @param geoJson The GeoJSON object to validate
     */
    const validateGeoJson = useCallback((geoJson: any): boolean => {
        try {
            // Validate against the Zod schema defined in Level 0
            // Assuming serviceAreaSchema includes the geoJson validation logic
            const schema = z.object({
                geoJson: z.object({
                    type: z.literal("FeatureCollection"),
                    features: z.array(z.any())
                })
            });
            
            schema.parse({ geoJson });
            return true;
        } catch (err) {
            console.error("GeoJSON Validation Error:", err);
            return false;
        }
    }, []);

    /**
     * Updates the geographic service area for a service center.
     * Uses Server Action for the mutation.
     */
    const updateServiceArea = useCallback(async (data: IGeoFenceData): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            // Client-side validation
            if (!validateGeoJson(data.geoJson)) {
                throw new Error("Invalid geographic area format.");
            }

            // Invoke Server Action from Level 3
            const result = await updateServiceAreaAction(data);

            if (!result.success) {
                throw new Error(result.message || "Failed to update service area.");
            }

            addToast({
                type: 'success',
                message: 'Service area updated successfully.',
                duration: 5000
            });

        } catch (err: any) {
            const errorMessage = err.message || "An unexpected error occurred.";
            setError(errorMessage);
            addToast({
                type: 'error',
                message: errorMessage,
                duration: 5000
            });
            throw err; // Re-throw to allow component-level handling if needed
        } finally {
            setIsLoading(false);
        }
    }, [addToast, validateGeoJson]);

    /**
     * Fetches the current service area definition.
     * Uses API Client for query operations (CQRS separation).
     */
    const fetchServiceArea = useCallback(async (serviceCenterId: string): Promise<IGeoFenceData | null> => {
        setIsLoading(true);
        setError(null);

        try {
            // Using the singleton API Client from Level 1
            const response = await ApiClient.get<IGeoFenceData>(`/api/v1/service-centers/${serviceCenterId}/service-area`);
            return response;
        } catch (err: any) {
            const errorMessage = err.message || "Failed to fetch service area.";
            setError(errorMessage);
            addToast({
                type: 'error',
                message: errorMessage,
                duration: 5000
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    return {
        isLoading,
        error,
        updateServiceArea,
        fetchServiceArea,
        validateGeoJson
    };
};