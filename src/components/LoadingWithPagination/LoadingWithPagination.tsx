import { CircularProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import styles from './loadingWithPagination.module.scss';

const LoadingWithPagination: FC = () => {
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
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <CircularProgress size={loaderSize} color="inherit" />
      </div>
      <Pagination count={5} page={1} onChange={() => null} disabled />
    </div>
  );
};

export { LoadingWithPagination };
