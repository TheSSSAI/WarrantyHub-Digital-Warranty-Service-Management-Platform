import React, { useState } from 'react';
import { useExportService } from '@/services/analytics/hooks/useExportService';
import { useGlobalStore } from '@/lib/store/globalStore';

export interface ReportExportControlProps {
  reportType: string;
  data: any[];
  filename: string;
}

export const ReportExportControl: React.FC<ReportExportControlProps> = ({
  reportType,
  data,
  filename
}) => {
  const { exportReport } = useExportService();
  const { addToast } = useGlobalStore();
  const [isExporting, setIsExporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = async (format: 'csv' | 'pdf') => {
    if (data.length === 0) {
      addToast({ type: 'warning', message: 'No data available to export.' });
      return;
    }

    try {
      setIsExporting(true);
      setIsOpen(false); // Close dropdown immediately

      // Call the service layer to handle the actual file generation and download triggering
      // The service layer handles the browser-side blob creation or API call for server-side generation
      await exportReport({
        data,
        format,
        filename,
        type: reportType
      });

      addToast({ type: 'success', message: `${format.toUpperCase()} export completed successfully.` });
    } catch (error) {
      console.error('Export failed:', error);
      addToast({ type: 'error', message: 'Failed to export report. Please try again.' });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isExporting}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {isExporting ? 'Exporting...' : 'Export'}
          {!isExporting && (
            <svg className="-mr-1 ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleExport('csv')}
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
            >
              Download CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
            >
              Download PDF
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown on click outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};