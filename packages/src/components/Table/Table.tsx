import React, { ChangeEvent, FC, useState } from 'react';
import {
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  Box,
  Pagination,
} from '@mui/material';

interface Column {
  id: number;
  title: string;
  name: string;
}

interface TableProps {
  title?: string;
  columns: Column[];
  rows: Array<Record<string, string | number | boolean>>;
  rowsPerPage?: number;
  showActions?: boolean;
}

interface Order {
  column: string;
  direction: 'asc' | 'desc';
}

const Table: FC<TableProps> = (props) => {
  const { columns, rows, title, showActions = true, rowsPerPage = 10 } = props;
  const [order, setOrder] = useState<Order | null>(null);
  const [page, setPage] = useState(1);

  const handleSort = (columnName: string) => {
    const isAsc = order?.column === columnName && order.direction === 'asc';
    setOrder({ column: columnName, direction: isAsc ? 'desc' : 'asc' });
  };

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const sortedData = () => {
    return order
      ? [...rows].sort((a, b) => {
          const valueA = String(a[order.column] || '');
          const valueB = String(b[order.column] || '');
          return (order.direction === 'asc' ? 1 : -1) * valueA.localeCompare(valueB);
        })
      : rows;
  };

  const paginatedData = () => {
    const startIndex = (page - 1) * rowsPerPage;
    return sortedData().slice(startIndex, startIndex + rowsPerPage);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        {title && (
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        )}
        <MTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={order?.column === column.name}
                    direction={order?.direction || 'asc'}
                    onClick={() => handleSort(column.name)}
                  >
                    {column.title}
                  </TableSortLabel>
                </TableCell>
              ))}
              {showActions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData().map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell key={`${column.id}-${index}`}>{`${row[column.name] || ''}`}</TableCell>
                ))}
                {showActions && <TableCell>Coming soon</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </MTable>
      </TableContainer>
      <Pagination
        count={Math.ceil(rows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
      />
    </Box>
  );
};

export { Table };
