"use client";

import { useState, useCallback } from 'react';
import { ApiClient } from '../../../lib/api/ApiClient';
import { useGlobalStore } from '../../../lib/store/globalStore';

export type ExportFormat = 'csv' | 'pdf';
export type ReportType = 'fault-patterns' | 'geo-distribution' | 'warranty-status' | 'service-volume';

interface UseExportServiceResult {
    isExporting: boolean;
    exportReport: (reportType: ReportType, format: ExportFormat, filters: any) => Promise<void>;
}

/**
 * Hook for managing Report Exports.
 * Handles binary file downloads from the API and async job triggers for large reports.
 * Maps to US-071 and US-092.
 */
export const useExportService = (): UseExportServiceResult => {
    const [isExporting, setIsExporting] = useState<boolean>(false);
    const { addToast } = useGlobalStore();

    /**
     * Triggers the export process.
     * @param reportType The identifier for the report to export
     * @param format The desired file format (csv/pdf)
     * @param filters Current filters applied to the report (dates, categories, etc.)
     */
    const exportReport = useCallback(async (reportType: ReportType, format: ExportFormat, filters: any) => {
        setIsExporting(true);

        try {
            // Construct query parameters from filters
            const params = {
                ...filters,
                format,
                report_type: reportType
            };

            // Call the export endpoint
            // We expect a blob response for direct downloads, or a JSON response for async jobs
            const response = await ApiClient.get<Blob | { jobId: string; message: string }>('/api/v1/analytics/export', {
                params,
                responseType: 'blob' // Default to blob, but handle JSON if returned
            });

            // Check if response is a Blob (file download) or JSON (Async Job)
            // Axios responseType 'blob' forces the data into a Blob even if it's JSON.
            // We need to check the content-type header if available, or try to parse the blob.
            
            // Simplified check: If it's a small JSON indicating async job
            if (response instanceof Blob && response.type === 'application/json') {
                const text = await response.text();
                const json = JSON.parse(text);
                
                addToast({
                    type: 'info',
                    message: json.message || 'Export is processing. You will be notified via email.',
                    duration: 6000
                });
            } else if (response instanceof Blob) {
                // Handle File Download
                const url = window.URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                
                // Construct filename
                const dateStr = new Date().toISOString().split('T')[0];
                link.setAttribute('download', `${reportType}_report_${dateStr}.${format}`);
                
                document.body.appendChild(link);
                link.click();
                
                // Cleanup
                link.remove();
                window.URL.revokeObjectURL(url);

                addToast({
                    type: 'success',
                    message: 'Report downloaded successfully.'
                });
            }

        } catch (err: any) {
            console.error("Export failed", err);
            addToast({
                type: 'error',
                message: 'Failed to export report. Please try again.'
            });
        } finally {
            setIsExporting(false);
        }
    }, [addToast]);

    return {
        isExporting,
        exportReport
    };
};