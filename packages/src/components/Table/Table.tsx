import { ChangeEvent, FC, useState } from 'react';
import {
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
} from '@mui/material';
import styles from './table.module.scss';
import { Pagination } from '../Pagination';
import { Search } from '../Search';
import { useDebounce } from '../../hooks';

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
  headerAlign?: 'left' | 'center' | 'right';
  rowAlign?: 'left' | 'center' | 'right';
  showActions?: boolean;
}

interface Order {
  column: string;
  direction: 'asc' | 'desc';
}

const Table: FC<TableProps> = (props) => {
  const {
    columns,
    rows,
    title,
    showActions = true,
    rowsPerPage = 10,
    headerAlign = 'center',
    rowAlign = 'right',
  } = props;

  const [searchWord, setSearchWord] = useState<string>('');
  const searchFilter = useDebounce(searchWord);
  const [order, setOrder] = useState<Order | null>(null);
  const [page, setPage] = useState(1);

  const handleSort = (columnName: string) => {
    const isAsc = order?.column === columnName && order.direction === 'asc';
    setOrder({ column: columnName, direction: isAsc ? 'desc' : 'asc' });
  };

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    setPage(1);
  };

  const filteredData = () => {
    return searchFilter.length === 0
      ? rows
      : rows.filter((row) =>
          columns.some((column) => `${row[column.name]}`.toLowerCase() === searchFilter.toLowerCase()),
        );
  };

  const sortedData = () => {
    const rowsToSort = filteredData();
    return order
      ? rowsToSort.sort((a, b) => {
          const valueA = `${a[order.column] || ''}`;
          const valueB = `${b[order.column] || ''}`;
          return (order.direction === 'asc' ? 1 : -1) * valueA.localeCompare(valueB);
        })
      : rowsToSort;
  };

  const paginatedData = () => {
    const startIndex = (page - 1) * rowsPerPage;
    return sortedData().slice(startIndex, startIndex + rowsPerPage);
  };

  return (
    <Box className={styles.tableWrapper}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <div className={styles.header}>
          {title && <span className={styles.title}>{title}</span>}
          <div className={styles.searchWrapper}>
            <Search value={searchWord} onChange={handleSearchChange} />
          </div>
        </div>
        <MTable className={styles.table}>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={headerAlign}>
                  <TableSortLabel
                    active={order?.column === column.name}
                    direction={order?.direction || 'asc'}
                    onClick={() => handleSort(column.name)}
                    className={styles.sortLabel}
                  >
                    {column.title}
                  </TableSortLabel>
                </TableCell>
              ))}
              {showActions && <TableCell align={headerAlign}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {paginatedData().map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell align={rowAlign} key={`${column.id}-${index}`}>{`${row[column.name] || ''}`}</TableCell>
                ))}
                {showActions && <TableCell align={rowAlign}>Coming soon</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </MTable>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredData().length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        className={styles.pagination}
      />
    </Box>
  );
};

export { Table };
