import React from 'react';
import { DataGridProps } from './types';
import { 
  DataGridContainer, 
  Table, 
  TableBody, 
  EmptyStateContainer, 
  EmptyStateMessage,
  PaginationContainer,
  PageInfo,
  PaginationButton,
  LoadingOverlay
} from './DataGrid.styles';
import { DataGridHeader } from './DataGridHeader';
import { DataGridRow } from './DataGridRow';

/**
 * Enterprise DataGrid component for displaying tabular data.
 * Supports generics for type safety, sorting, pagination, and custom cell rendering.
 * 
 * @template T The type of data item being displayed. Must contain a unique 'id'.
 */
export const DataGrid = <T extends { id: string | number }>({
  data,
  columns,
  isLoading = false,
  sortField,
  sortDirection,
  onSort,
  pagination,
  onPageChange,
  onRowClick,
  className,
  emptyMessage = 'No data available',
  ariaLabel = 'Data Grid'
}: DataGridProps<T>): JSX.Element => {

  // ---- Handlers ----

  const handlePageChange = (newPage: number) => {
    if (onPageChange && pagination) {
      // Ensure we don't go out of bounds
      const totalPages = Math.ceil(pagination.totalItems / pagination.pageSize);
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    }
  };

  // ---- Render Helpers ----

  const renderPagination = () => {
    if (!pagination || !onPageChange) return null;

    const { currentPage, pageSize, totalItems } = pagination;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
      <PaginationContainer>
        <PageInfo>
          Showing {totalItems > 0 ? startItem : 0} - {endItem} of {totalItems} items
        </PageInfo>
        <div>
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading}
            aria-label="Previous Page"
            type="button"
          >
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
            aria-label="Next Page"
            type="button"
          >
            Next
          </PaginationButton>
        </div>
      </PaginationContainer>
    );
  };

  const renderContent = () => {
    if (isLoading && data.length === 0) {
      // Initial loading state with no data
      return (
        <TableBody>
          <tr>
            <td colSpan={columns.length} style={{ height: '200px', textAlign: 'center' }}>
              Loading...
            </td>
          </tr>
        </TableBody>
      );
    }

    if (!isLoading && data.length === 0) {
      // Empty state
      return (
        <TableBody>
          <tr>
            <td colSpan={columns.length}>
              <EmptyStateContainer>
                <EmptyStateMessage>{emptyMessage}</EmptyStateMessage>
              </EmptyStateContainer>
            </td>
          </tr>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {data.map((item) => (
          <DataGridRow
            key={item.id}
            item={item}
            columns={columns}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            isClickable={!!onRowClick}
          />
        ))}
      </TableBody>
    );
  };

  // ---- Main Render ----

  return (
    <DataGridContainer className={className} role="region" aria-label={ariaLabel}>
      <div style={{ position: 'relative', overflowX: 'auto' }}>
        <Table role="grid">
          <DataGridHeader
            columns={columns}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          {renderContent()}
        </Table>
        {isLoading && data.length > 0 && (
          <LoadingOverlay>
            <span>Updating...</span>
          </LoadingOverlay>
        )}
      </div>
      {renderPagination()}
    </DataGridContainer>
  );
};