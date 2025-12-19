import { ReactNode } from 'react';

/**
 * Defines a column configuration for the DataGrid.
 * @template T The data type of the row items.
 */
export interface GridColumn<T> {
  /**
   * The key of the property in the data object.
   */
  key: keyof T;

  /**
   * The text to display in the column header.
   */
  header: string;

  /**
   * Whether this column can be sorted.
   * @default false
   */
  sortable?: boolean;

  /**
   * Optional custom width for the column (e.g., '20%', '100px').
   */
  width?: string;

  /**
   * Optional custom renderer for the cell content.
   * If provided, this function is called with the row item and should return a ReactNode.
   * Useful for formatting dates, displaying badges, or action buttons.
   */
  render?: (item: T) => ReactNode;
}

/**
 * Configuration for pagination.
 */
export interface PaginationConfig {
  /**
   * The current page number (0-indexed or 1-indexed depending on implementation, assume 1-indexed here).
   */
  currentPage: number;

  /**
   * The total number of pages available.
   */
  totalPages: number;

  /**
   * The number of items per page.
   */
  pageSize: number;

  /**
   * Total number of items across all pages.
   */
  totalItems: number;
}

/**
 * Props for the DataGrid component.
 * @template T The type of data to be displayed, must contain an id field for React keys.
 */
export interface DataGridProps<T extends { id: string | number }> {
  /**
   * Array of data objects to display in the grid.
   */
  data: T[];

  /**
   * Configuration for the grid columns.
   */
  columns: GridColumn<T>[];

  /**
   * Optional pagination configuration. If provided, pagination controls are rendered.
   */
  pagination?: PaginationConfig;

  /**
   * Callback fired when a column header is clicked for sorting.
   */
  onSort?: (field: keyof T, direction: 'asc' | 'desc') => void;

  /**
   * Callback fired when the page is changed via pagination controls.
   */
  onPageChange?: (newPage: number) => void;

  /**
   * Currently active sort field.
   */
  sortField?: keyof T;

  /**
   * Currently active sort direction.
   */
  sortDirection?: 'asc' | 'desc';

  /**
   * Whether data is currently loading.
   */
  isLoading?: boolean;

  /**
   * Accessibility label for the table.
   */
  ariaLabel?: string;
}