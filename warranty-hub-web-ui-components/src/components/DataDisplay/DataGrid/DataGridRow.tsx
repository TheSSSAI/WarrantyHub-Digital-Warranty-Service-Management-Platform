import React from 'react';
import {
  TableRow,
  TableCell,
} from './DataGrid.styles';
import { GridColumn } from './types';

export interface DataGridRowProps<T> {
  /**
   * The data item for this row
   */
  data: T;
  
  /**
   * Column definitions to determine how to render cells
   */
  columns: GridColumn<T>[];
  
  /**
   * Index of the row, useful for striping or accessibility
   */
  rowIndex: number;
}

/**
 * Renders a single data row in the DataGrid.
 * Handles custom cell rendering if defined in the column configuration.
 */
export const DataGridRow = <T extends { id: string | number }>({
  data,
  columns,
  rowIndex,
}: DataGridRowProps<T>): JSX.Element => {
  return (
    <TableRow $isEven={rowIndex % 2 === 0}>
      {columns.map((column, colIndex) => {
        const cellValue = data[column.key];
        
        // Determine content: Use custom renderer if available, otherwise raw value
        const cellContent = column.render 
          ? column.render(data) 
          : (cellValue as React.ReactNode);

        return (
          <TableCell 
            key={`row-${data.id}-col-${String(column.key)}-${colIndex}`}
            $width={column.width}
            role="cell"
          >
            {cellContent}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

/**
 * Optimization: Only re-render if data or columns structure changes.
 * This assumes 'data' is immutable or changes reference when updated.
 */
export const MemoizedDataGridRow = React.memo(
  DataGridRow,
  (prev, next) => {
    return (
      prev.data === next.data && 
      prev.columns === next.columns && 
      prev.rowIndex === next.rowIndex
    );
  }
) as typeof DataGridRow;