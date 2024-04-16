import { ChangeEvent, FC, useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import styles from './table.module.scss';
import { Pagination } from '../Pagination';
import { Search } from '../Search';
import { useDebounce } from '../../hooks';
import { Menu, MenuProps } from '../Menu';

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
  menuProps?: MenuProps;
  isLoading?: boolean;
  friendlyScreenMessage?: boolean;
  friendlyScreenHeight?: string;
}

interface Order {
  column: string;
  direction: 'asc' | 'desc';
}

const TableSet: FC<TableProps> = (props) => {
  const {
    columns,
    rows,
    title,
    showActions = true,
    rowsPerPage = 10,
    headerAlign = 'center',
    rowAlign = 'right',
    menuProps = {
      items: [
        {
          label: 'View',
          onClick: (id?: string | number) => {
            console.log(`View ${id}`);
          },
        },
        {
          label: 'Edit',
          onClick: (id?: string | number) => {
            console.log(`Edit ${id}`);
          },
        },
        {
          label: 'Delete',
          onClick: (id?: string | number) => {
            console.log(`Delete ${id}`);
          },
        },
      ],
    },
  } = props;

  const [searchWord, setSearchWord] = useState<string>('');
  const searchFilter = useDebounce(searchWord);
  const [order, setOrder] = useState<Order | null>(null);
  const [page, setPage] = useState<number>(1);

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
              {showActions && (
                <TableCell align={headerAlign} width={150}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {paginatedData().map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell align={rowAlign} key={`${column.id}-${index}`}>{`${row[column.name] || ''}`}</TableCell>
                ))}
                {showActions && (
                  <TableCell align={rowAlign}>
                    <Menu {...menuProps} />
                  </TableCell>
                )}
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

const TableFriendlyScreen: FC<TableProps> = (props) => {
  const { friendlyScreenMessage = 'No data to display!', friendlyScreenHeight = '300px' } = props;
  return (
    <div className={styles.tableFriendlyScreen} style={{ height: friendlyScreenHeight }}>
      <div className={styles.tableFriendlyScreenText}>{friendlyScreenMessage}</div>
    </div>
  );
};

const TableLoader: FC = () => {
  const [loaderSize, setLoaderSize] = useState('4rem');

  useEffect(() => {
    const handleResize = () => {
      const windowSize = window.innerWidth < 1366 ? '3rem' : '4rem';
      setLoaderSize(windowSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.tableLoaderWrapper}>
      <div className={styles.tableLoader}>
        <CircularProgress size={loaderSize} color="inherit" />
      </div>
      <Pagination count={5} page={1} onChange={() => null} disabled />
    </div>
  );
};

const Table: FC<TableProps> = (props) => {
  const { isLoading = false } = props;

  switch (true) {
    case isLoading:
      return <TableLoader />;
    case !isLoading && props.rows.length === 0:
      return <TableFriendlyScreen {...props} />;
    case !isLoading && props.rows.length > 0:
      return <TableSet {...props} />;
    default:
      return <TableSet {...props} />;
  }
};

export { TableSet, TableFriendlyScreen, TableLoader, Table };
export type { Column, TableProps, Order };
