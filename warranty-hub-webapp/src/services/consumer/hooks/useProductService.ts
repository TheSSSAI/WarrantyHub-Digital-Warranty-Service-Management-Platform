"use client";

import { useState, useCallback } from 'react';
import { registerProductAction } from '../actions/registerProductAction';
import { IProductDto, IProductRegistrationRequest } from '../types/ProductContracts';
import { ApiClient } from '../../../lib/api/ApiClient';
import { useGlobalStore } from '../../../lib/store/globalStore';
import { productRegistrationSchema } from '../validation/productSchema';

interface UseProductServiceResult {
    isSubmitting: boolean;
    isLoading: boolean;
    error: string | null;
    registerProduct: (data: IProductRegistrationRequest, invoiceFile?: File) => Promise<boolean>;
    getMyProducts: (page?: number, limit?: number) => Promise<IProductDto[]>;
    getProductDetails: (productId: string) => Promise<IProductDto | null>;
    validateSerialNumber: (serial: string, brandId: string) => Promise<boolean>;
}

/**
 * Hook for Consumer Product Management.
 * Handles Product Registration (with file upload orchestration) and Product Retrieval.
 */
export const useProductService = (): UseProductServiceResult => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const { addToast } = useGlobalStore();

    /**
     * Orchestrates the product registration flow.
     * 1. Validates input.
     * 2. Handles invoice file upload if present.
     * 3. Calls Server Action to register product.
     * Maps to US-015 and US-021.
     */
    const registerProduct = useCallback(async (data: IProductRegistrationRequest, invoiceFile?: File): Promise<boolean> => {
        setIsSubmitting(true);
        setError(null);

        try {
            // 1. Client-side Validation using Zod Schema (Level 0)
            const validationResult = productRegistrationSchema.safeParse(data);
            if (!validationResult.success) {
                const errorMsg = validationResult.error.errors[0].message;
                throw new Error(errorMsg);
            }

            let invoiceId: string | undefined = undefined;

            // 2. Handle File Upload if exists
            // Note: Upload logic is often separate, but orchestrated here for the consumer flow
            if (invoiceFile) {
                const formData = new FormData();
                formData.append('file', invoiceFile);
                
                // Using ApiClient directly for file upload to handle multipart/form-data
                // This assumes a dedicated endpoint for invoice uploads
                const uploadResult = await ApiClient.post<{ id: string }>('/api/v1/invoices/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                
                invoiceId = uploadResult.id;
            }

            // 3. Call Server Action
            const actionPayload = { ...data, invoiceId };
            const result = await registerProductAction(actionPayload);

            if (!result.success) {
                throw new Error(result.message || "Registration failed.");
            }

            addToast({
                type: 'success',
                message: 'Product registered successfully!',
                duration: 4000
            });

            return true;

        } catch (err: any) {
            const msg = err.message || "An error occurred during registration.";
            setError(msg);
            addToast({ type: 'error', message: msg });
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [addToast]);

    /**
     * Fetches the authenticated user's registered products.
     * Uses API Client.
     * Maps to US-024.
     */
    const getMyProducts = useCallback(async (page = 1, limit = 20): Promise<IProductDto[]> => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ApiClient.get<IProductDto[]>('/api/v1/consumer/products', {
                params: { page, limit }
            });
            return data;
        } catch (err: any) {
            setError(err.message || "Failed to load products.");
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Fetches details for a specific product.
     * Maps to US-025 (Digital Warranty Card).
     */
    const getProductDetails = useCallback(async (productId: string): Promise<IProductDto | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ApiClient.get<IProductDto>(`/api/v1/consumer/products/${productId}`);
            return data;
        } catch (err: any) {
            setError(err.message || "Failed to load product details.");
            addToast({ type: 'error', message: "Product details unavailable." });
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    /**
     * Validates serial number format/uniqueness before submission.
     * Maps to US-095 (Brand Admin Regex).
     */
    const validateSerial = useCallback(async (serial: string, brandId: string): Promise<boolean> => {
        try {
            const result = await ApiClient.post<{ isValid: boolean; message?: string }>(
                '/api/v1/products/validate-serial', 
                { serial, brandId }
            );
            
            if (!result.isValid) {
                setError(result.message || "Invalid serial number.");
                return false;
            }
            return true;
        } catch (err) {
            // Network error during validation shouldn't necessarily block the UI flow, 
            // but we log it.
            console.warn("Serial validation skipped due to network error");
            return true; 
        }
    }, []);

    return {
        isSubmitting,
        isLoading,
        error,
        registerProduct,
        getMyProducts,
        getProductDetails,
        validateSerialNumber: validateSerial
    };
};