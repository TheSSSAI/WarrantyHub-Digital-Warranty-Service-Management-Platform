import React from 'react';
import {
  TableHead,
  HeaderRow,
  HeaderCell,
  SortIndicator,
} from './DataGrid.styles';
import { GridColumn, SortDirection } from './types';

export interface DataGridHeaderProps<T> {
  /**
   * Column definitions
   */
  columns: GridColumn<T>[];
  
  /**
   * Currently sorted column key
   */
  sortColumn?: keyof T;
  
  /**
   * Current sort direction
   */
  sortDirection?: SortDirection;
  
  /**
   * Callback when a header is clicked
   */
  onSort?: (column: keyof T) => void;
}

/**
 * Renders the header row of the DataGrid.
 * Handles sorting interactions and accessibility attributes.
 */
export const DataGridHeader = <T,>({
  columns,
  sortColumn,
  sortDirection,
  onSort,
}: DataGridHeaderProps<T>): JSX.Element => {
  
  const handleSortClick = (column: GridColumn<T>) => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  };

  const getAriaSort = (column: GridColumn<T>): React.AriaAttributes['aria-sort'] => {
    if (!column.sortable) return undefined;
    if (sortColumn === column.key) {
      return sortDirection === 'asc' ? 'ascending' : 'descending';
    }
    return 'none';
  };

  return (
    <TableHead>
      <HeaderRow>
        {columns.map((column, index) => {
          const isSorted = sortColumn === column.key;
          
          return (
            <HeaderCell
              key={`header-${String(column.key)}-${index}`}
              $width={column.width}
              $isSortable={!!column.sortable}
              onClick={() => handleSortClick(column)}
              scope="col"
              aria-sort={getAriaSort(column)}
              role="columnheader"
              tabIndex={column.sortable ? 0 : -1}
              onKeyDown={(e) => {
                if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSortClick(column);
                }
              }}
            >
              <span>{column.header}</span>
              
              {column.sortable && (
                <SortIndicator $isActive={isSorted} $direction={isSorted ? sortDirection : undefined}>
                  {/* Visual indicator handled by styled component via props, 
                      but we provide screen reader text for context */}
                  <span className="sr-only">
                    {isSorted 
                      ? (sortDirection === 'asc' ? ' (sorted ascending)' : ' (sorted descending)')
                      : ' (sortable)'
                    }
                  </span>
                </SortIndicator>
              )}
            </HeaderCell>
          );
        })}
      </HeaderRow>
    </TableHead>
  );
};