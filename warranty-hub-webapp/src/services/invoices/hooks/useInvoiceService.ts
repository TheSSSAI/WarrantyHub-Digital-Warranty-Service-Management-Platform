"use client";

import { useState, useCallback } from 'react';
import { ApiClient } from '../../../lib/api/ApiClient';
import { useGlobalStore } from '../../../lib/store/globalStore';

// Define Invoice DTO structure
export interface IInvoiceDto {
    id: string;
    fileName: string;
    uploadedAt: Date;
    productName: string;
    brandName: string;
    purchaseDate: Date;
    thumbnailUrl?: string;
    tags: string[];
    notes?: string;
}

export interface IInvoiceSearchParams {
    query?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
}

interface UseInvoiceServiceResult {
    invoices: IInvoiceDto[];
    isLoading: boolean;
    error: string | null;
    searchInvoices: (params: IInvoiceSearchParams) => Promise<void>;
    downloadInvoice: (invoiceId: string, fileName: string) => Promise<void>;
    updateInvoiceMetadata: (id: string, notes: string, tags: string[]) => Promise<boolean>;
    deleteInvoice: (id: string) => Promise<boolean>;
}

/**
 * Hook for managing the Invoice Vault.
 * Handles searching, listing, metadata updates (tagging), and downloading.
 * Maps to US-050, US-051, US-064, US-065.
 */
export const useInvoiceService = (): UseInvoiceServiceResult => {
    const [invoices, setInvoices] = useState<IInvoiceDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useGlobalStore();

    /**
     * Searches and filters invoices.
     * Uses the backend search API (OpenSearch integration).
     * Maps to US-051.
     */
    const searchInvoices = useCallback(async (params: IInvoiceSearchParams) => {
        setIsLoading(true);
        setError(null);
        try {
            const queryParams: any = {
                q: params.query,
                page: params.page || 1,
                limit: params.limit || 20
            };

            if (params.startDate) queryParams.start_date = params.startDate.toISOString();
            if (params.endDate) queryParams.end_date = params.endDate.toISOString();

            const data = await ApiClient.get<IInvoiceDto[]>('/api/v1/invoices/search', {
                params: queryParams
            });
            setInvoices(data);
        } catch (err: any) {
            const msg = "Failed to search invoices.";
            setError(msg);
            // Don't toast for search failures, just set error state for UI display
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Downloads an invoice file.
     * Handles the secure SAS token flow implicitly via the backend redirect or signed URL response.
     * Maps to US-064.
     */
    const downloadInvoice = useCallback(async (invoiceId: string, fileName: string) => {
        try {
            // Request a secure download URL
            const { url } = await ApiClient.get<{ url: string }>(`/api/v1/invoices/${invoiceId}/download-url`);
            
            // Create a temporary anchor to trigger download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (err: any) {
            addToast({ 
                type: 'error', 
                message: 'Failed to initiate download. Please try again.' 
            });
        }
    }, [addToast]);

    /**
     * Updates invoice notes and tags.
     * Maps to US-065.
     */
    const updateInvoiceMetadata = useCallback(async (id: string, notes: string, tags: string[]): Promise<boolean> => {
        try {
            await ApiClient.patch(`/api/v1/invoices/${id}/metadata`, { notes, tags });
            
            // Optimistic update of local state
            setInvoices(prev => prev.map(inv => 
                inv.id === id ? { ...inv, notes, tags } : inv
            ));

            addToast({ type: 'success', message: 'Invoice updated.' });
            return true;
        } catch (err) {
            addToast({ type: 'error', message: 'Failed to update invoice.' });
            return false;
        }
    }, [addToast]);

    /**
     * Deletes (soft deletes) an invoice.
     */
    const deleteInvoice = useCallback(async (id: string): Promise<boolean> => {
        try {
            await ApiClient.delete(`/api/v1/invoices/${id}`);
            
            // Update local state
            setInvoices(prev => prev.filter(inv => inv.id !== id));
            
            addToast({ type: 'success', message: 'Invoice deleted.' });
            return true;
        } catch (err) {
            addToast({ type: 'error', message: 'Failed to delete invoice.' });
            return false;
        }
    }, [addToast]);

    return {
        invoices,
        isLoading,
        error,
        searchInvoices,
        downloadInvoice,
        updateInvoiceMetadata,
        deleteInvoice
    };
};