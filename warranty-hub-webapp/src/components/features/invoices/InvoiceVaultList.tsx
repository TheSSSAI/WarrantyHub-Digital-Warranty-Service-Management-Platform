import React, { useState, useEffect, useMemo } from 'react';
import { useInvoiceService } from '@/services/invoices/hooks/useInvoiceService';
import { debounce } from 'lodash'; // Assuming lodash or similar utility is available or implement simpler debounce

interface Invoice {
  id: string;
  fileName: string;
  uploadDate: string;
  productName?: string;
  fileSize: number;
  url: string;
}

export const InvoiceVaultList: React.FC = () => {
  const { getInvoices, downloadInvoice } = useInvoiceService();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch invoices on mount
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        const data = await getInvoices();
        // Mapping DTO to local interface if necessary, assuming service returns compatible types
        setInvoices(data as unknown as Invoice[]); 
      } catch (err) {
        setError('Failed to load invoices. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [getInvoices]);

  // Handle Search with Debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredInvoices = useMemo(() => {
    if (!searchQuery) return invoices;
    const lowerQuery = searchQuery.toLowerCase();
    return invoices.filter(
      (inv) =>
        inv.fileName.toLowerCase().includes(lowerQuery) ||
        (inv.productName && inv.productName.toLowerCase().includes(lowerQuery))
    );
  }, [invoices, searchQuery]);

  const handleDownload = async (id: string, fileName: string) => {
    try {
        // Trigger service download logic
        await downloadInvoice(id, fileName);
    } catch (err) {
        console.error("Download failed", err);
        // Show toast error here via global store
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invoice Vault</h2>
          <p className="text-gray-500">Securely stored proof of purchase documents.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by registering a new product.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-10 w-10 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {invoice.productName || 'Unknown Product'}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 truncate" title={invoice.fileName}>
                          {invoice.fileName}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm flex justify-between items-center">
                  <div className="text-gray-500">
                    <span className="block">{formatDate(invoice.uploadDate)}</span>
                    <span className="block text-xs">{formatFileSize(invoice.fileSize)}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(invoice.id, invoice.fileName)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};