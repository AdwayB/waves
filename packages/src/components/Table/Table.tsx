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

interface ColumnType {
  id: number;
  title: string;
  name: string;
}

type RowType = Array<Record<string, string | number>>;

interface TableProps {
  title?: string;
  columns: ColumnType[];
  rows: RowType;
  rowsPerPage?: number;
  headerAlign?: 'left' | 'center' | 'right';
  rowAlign?: 'left' | 'center' | 'right';
  showActions?: boolean;
  customMenu?: MenuProps;
  handleViewClick?: (id?: string | number) => void;
  handleEditClick?: (id?: string | number) => void;
  handleDeleteClick?: (id?: string | number) => void;
  isLoading?: boolean;
  friendlyScreenMessage?: string;
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
    customMenu,
    handleViewClick,
    handleEditClick,
    handleDeleteClick,
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
                    {customMenu ? (
                      <Menu {...customMenu} />
                    ) : (
                      <Menu
                        items={[
                          { label: 'View', onClick: () => handleViewClick && handleViewClick(row.id) },
                          { label: 'Edit', onClick: () => handleEditClick && handleEditClick(row.id) },
                          { label: 'Delete', onClick: () => handleDeleteClick && handleDeleteClick(row.id) },
                        ]}
                      />
                    )}
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

/**
 * A highly versatile themed table component.
 *
 * @param title - The title of the table.
 * @param columns - The columns of the table.
 * @param rows - The rows of the table. Not type-checked, maps to the column names.
 * @param isLoading - Loader for when the table is loading data.
 * @param friendlyScreenMessage - Message to display when the table has no data.
 * @param friendlyScreenHeight - Height of the friendly screen.
 *
 *
 * @param props - The props for the Table component.
 */
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

// EXAMPLE USAGE
{
  /* <Table
          title="Test Table"
          columns={[
            { id: 1, title: 'Test1', name: 'test1' },
            { id: 2, title: 'Test2', name: 'test2' },
            { id: 3, title: 'Test3', name: 'test3' },
          ]}
          rows={[
            { test1: 'test1', test2: 'test2', test3: 'test3' },
            { test1: 'test16', test2: 'test26', test3: 'test36' },
            { test1: 'test19', test2: 'test29', test3: 'test39' },
            { test1: 'test10', test2: 'test20', test3: 'test30' },
            { test1: 'test11', test2: 'test21', test3: 'test31' },
            { test1: 'test17', test2: 'test27', test3: 'test37' },
            { test1: 'test12', test2: 'test22', test3: 'test32' },
            { test1: 'test13', test2: 'test23', test3: 'test33' },
            { test1: 'test14', test2: 'test24', test3: 'test34' },
            { test1: 'test15', test2: 'test25', test3: 'test35' },
            { test1: 'test16', test2: 'test26', test3: 'test36' },
            { test1: 'test17', test2: 'test27', test3: 'test37' },
            { test1: 'test18', test2: 'test28', test3: 'test38' },
            { test1: 'test12', test2: 'test22', test3: 'test32' },
            { test1: 'test13', test2: 'test23', test3: 'test33' },
            { test1: 'test14', test2: 'test24', test3: 'test34' },
            { test1: 'test15', test2: 'test25', test3: 'test35' },
            { test1: 'test18', test2: 'test28', test3: 'test38' },
            { test1: 'test19', test2: 'test29', test3: 'test39' },
            { test1: 'test10', test2: 'test20', test3: 'test30' },
          ]}
          rowsPerPage={10}
        /> */
}

export { TableSet, TableFriendlyScreen, TableLoader, Table };
export type { ColumnType, RowType, TableProps, Order };
