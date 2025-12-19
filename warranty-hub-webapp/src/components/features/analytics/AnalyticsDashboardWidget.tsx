import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useBrandService } from '@/services/brand/hooks/useBrandService';
import { ReportExportControl } from './ReportExportControl';

// Types specific to visualization, mapping closely to what Recharts expects
export interface AnalyticsDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface AnalyticsWidgetProps {
  title: string;
  chartType: 'bar' | 'line' | 'pie';
  data?: AnalyticsDataPoint[];
  brandId?: string; // Optional if context provides it, but good for explicit data fetching
  dateRange?: { start: Date; end: Date };
  className?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const AnalyticsDashboardWidget: React.FC<AnalyticsWidgetProps> = ({
  title,
  chartType,
  data: providedData,
  brandId,
  dateRange,
  className = ""
}) => {
  // If data is not provided via props, we fetch it using the service
  const { data: fetchedData, isLoading, error } = useBrandService().useBrandAnalytics(
    brandId || 'current', // 'current' implies the logged-in brand context
    dateRange
  );

  const displayData = useMemo(() => {
    return providedData || fetchedData || [];
  }, [providedData, fetchedData]);

  // Loading State
  if (isLoading && !providedData) {
    return (
      <div className={`flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
          <span className="text-sm text-gray-500">Loading analytics...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error && !providedData) {
    return (
      <div className={`flex items-center justify-center h-64 bg-red-50 rounded-lg border border-red-100 ${className}`}>
        <div className="text-center text-red-600">
          <p className="font-medium">Failed to load data</p>
          <p className="text-sm opacity-75">Please try refreshing the dashboard.</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!displayData || displayData.length === 0) {
    return (
      <div className={`flex flex-col h-64 bg-white rounded-lg shadow-sm border border-gray-100 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex-1 flex items-center justify-center text-gray-400 italic">
          No data available for the selected period.
        </div>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '0.375rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f3f4f6' }}
              />
              <Legend />
              <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '0.375rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Trend" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-none">{title}</h3>
        <ReportExportControl 
          reportType={chartType} 
          data={displayData} 
          filename={`${title.toLowerCase().replace(/\s+/g, '-')}`} 
        />
      </div>
      
      <div className="flex-grow w-full min-h-[300px]" role="img" aria-label={`Chart showing ${title}`}>
        {renderChart()}
      </div>

      <div className="mt-4 text-xs text-gray-400 text-right">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};