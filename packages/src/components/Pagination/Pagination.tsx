import { ChangeEvent, FC } from 'react';
import { Pagination as MPagination } from '@mui/material';
import styles from './pagination.module.scss';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: ChangeEvent<unknown>, value: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = (props) => {
  const { count, page, onChange, className } = props;

  return <MPagination count={count} page={page} onChange={onChange} className={`${styles.pagination} ${className}`} />;
};

export { Pagination };
export type { PaginationProps };
