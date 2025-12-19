import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProductService } from '@/services/consumer/hooks/useProductService';
import { useInvoiceService } from '@/services/invoices/hooks/useInvoiceService';
import { useGlobalStore } from '@/lib/store/globalStore';
import { IProductDto } from '@/services/consumer/types/ProductContracts';

// Schema Definition (Ideally imported from Level 0, but defined here for completeness based on context)
const productRegistrationSchema = z.object({
  brandName: z.string().min(1, 'Brand is required'),
  modelNumber: z.string().min(1, 'Model number is required'),
  serialNumber: z.string().min(3, 'Serial number is required'),
  purchaseDate: z.string().refine((date) => new Date(date) <= new Date(), {
    message: 'Purchase date cannot be in the future',
  }),
  invoiceFile: z.instanceof(File).optional(),
});

type ProductRegistrationFormData = z.infer<typeof productRegistrationSchema>;

export const ProductRegistrationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerProduct } = useProductService();
  const { uploadInvoice } = useInvoiceService();
  const { addToast } = useGlobalStore();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ProductRegistrationFormData>({
    resolver: zodResolver(productRegistrationSchema),
    defaultValues: {
      brandName: '',
      modelNumber: '',
      serialNumber: '',
      purchaseDate: new Date().toISOString().split('T')[0],
    },
  });

  const processSubmission = async (data: ProductRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      let invoiceId: string | undefined = undefined;

      // 1. Upload Invoice if present
      if (data.invoiceFile) {
        const uploadResult = await uploadInvoice(data.invoiceFile);
        if (!uploadResult?.id) {
          throw new Error('Invoice upload failed');
        }
        invoiceId = uploadResult.id;
      }

      // 2. Register Product
      const productPayload: Omit<IProductDto, 'id'> = {
        brandId: data.brandName, // Assuming simplified string for this form, usually would be an ID selection
        modelNumber: data.modelNumber,
        serialNumber: data.serialNumber,
        purchaseDate: new Date(data.purchaseDate),
        // invoiceId would be part of the extended DTO in a real scenario
      };

      await registerProduct(productPayload, invoiceId);

      addToast({ type: 'success', message: 'Product registered successfully!' });
      reset(); // Clear form
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      addToast({ 
        type: 'error', 
        message: error.message || 'Failed to register product. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(processSubmission)} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Register New Product</h2>
        <p className="mt-1 text-sm text-gray-500">Enter your product details to activate your warranty.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Brand Name */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            id="brandName"
            {...register('brandName')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.brandName ? 'border-red-300' : ''}`}
            placeholder="e.g. Sony"
            disabled={isSubmitting}
          />
          {errors.brandName && (
            <p className="mt-1 text-sm text-red-600">{errors.brandName.message}</p>
          )}
        </div>

        {/* Model Number */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="modelNumber" className="block text-sm font-medium text-gray-700">
            Model Number
          </label>
          <input
            type="text"
            id="modelNumber"
            {...register('modelNumber')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.modelNumber ? 'border-red-300' : ''}`}
            placeholder="e.g. WH-1000XM4"
            disabled={isSubmitting}
          />
          {errors.modelNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.modelNumber.message}</p>
          )}
        </div>

        {/* Serial Number */}
        <div className="col-span-2">
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
            Serial Number
          </label>
          <input
            type="text"
            id="serialNumber"
            {...register('serialNumber')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.serialNumber ? 'border-red-300' : ''}`}
            placeholder="Found on the back or bottom of your product"
            disabled={isSubmitting}
          />
          {errors.serialNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.serialNumber.message}</p>
          )}
        </div>

        {/* Purchase Date */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
            Purchase Date
          </label>
          <input
            type="date"
            id="purchaseDate"
            {...register('purchaseDate')}
            max={new Date().toISOString().split('T')[0]}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.purchaseDate ? 'border-red-300' : ''}`}
            disabled={isSubmitting}
          />
          {errors.purchaseDate && (
            <p className="mt-1 text-sm text-red-600">{errors.purchaseDate.message}</p>
          )}
        </div>

        {/* Invoice Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Upload Invoice (Optional)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
            <Controller
              control={control}
              name="invoiceFile"
              render={({ field: { onChange, value, ...field } }) => (
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="invoice-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="invoice-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                        disabled={isSubmitting}
                        {...field}
                        // Value needs to be managed manually for file inputs
                        value={undefined}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  {value && (
                    <p className="text-sm font-medium text-indigo-600 mt-2">
                      Selected: {(value as File).name}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Register Product'
          )}
        </button>
      </div>
    </form>
  );
};