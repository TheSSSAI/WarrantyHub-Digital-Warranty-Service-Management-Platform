"use client";

import { useState, useCallback } from 'react';
import { ApiClient } from '../../../lib/api/ApiClient';
import { useGlobalStore } from '../../../lib/store/globalStore';

// Types for Analytics Data (Mapping to API DTOs)
export interface IBrandAnalyticsFilter {
    startDate: Date;
    endDate: Date;
    productCategoryId?: string;
    productModelId?: string;
}

export interface IFaultPatternData {
    issueType: string;
    count: number;
    percentage: number;
}

export interface IGeographicDistributionData {
    region: string;
    productCount: number;
    serviceRequestCount: number;
    coordinates: { lat: number; lng: number };
}

export interface IBrandAnalyticsSummary {
    totalRegisteredProducts: number;
    activeWarranties: number;
    expiredWarranties: number;
    openServiceRequests: number;
    avgResolutionTimeHours: number;
}

interface UseBrandServiceResult {
    isLoading: boolean;
    error: string | null;
    getFaultPatterns: (filter: IBrandAnalyticsFilter) => Promise<IFaultPatternData[]>;
    getGeographicDistribution: (filter: IBrandAnalyticsFilter) => Promise<IGeographicDistributionData[]>;
    getDashboardSummary: () => Promise<IBrandAnalyticsSummary | null>;
}

/**
 * Hook for accessing Brand-specific services, primarily Analytics and Reporting.
 * Consumes the API Client (Level 1) to fetch aggregated data.
 */
export const useBrandService = (): UseBrandServiceResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useGlobalStore();

    /**
     * Fetches frequent fault pattern analysis.
     * Maps to REQ-FUNC-011.
     */
    const getFaultPatterns = useCallback(async (filter: IBrandAnalyticsFilter): Promise<IFaultPatternData[]> => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                start_date: filter.startDate.toISOString(),
                end_date: filter.endDate.toISOString(),
                category_id: filter.productCategoryId,
                model_id: filter.productModelId
            };

            const data = await ApiClient.get<IFaultPatternData[]>('/api/v1/brand/analytics/fault-patterns', { params });
            return data;
        } catch (err: any) {
            const msg = "Failed to load fault patterns.";
            setError(msg);
            addToast({ type: 'error', message: msg });
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    /**
     * Fetches geographic distribution of products and requests.
     * Maps to US-088.
     */
    const getGeographicDistribution = useCallback(async (filter: IBrandAnalyticsFilter): Promise<IGeographicDistributionData[]> => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                start_date: filter.startDate.toISOString(),
                end_date: filter.endDate.toISOString()
            };

            const data = await ApiClient.get<IGeographicDistributionData[]>('/api/v1/brand/analytics/geo-distribution', { params });
            return data;
        } catch (err: any) {
            const msg = "Failed to load geographic data.";
            setError(msg);
            addToast({ type: 'error', message: msg });
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    /**
     * Fetches high-level KPI summary for the Brand Dashboard.
     * Maps to US-066.
     */
    const getDashboardSummary = useCallback(async (): Promise<IBrandAnalyticsSummary | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await ApiClient.get<IBrandAnalyticsSummary>('/api/v1/brand/dashboard/summary');
            return data;
        } catch (err: any) {
            const msg = "Failed to load dashboard summary.";
            setError(msg);
            addToast({ type: 'error', message: msg });
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    return {
        isLoading,
        error,
        getFaultPatterns,
        getGeographicDistribution,
        getDashboardSummary
    };
};