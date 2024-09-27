import { FC, useEffect, useState } from 'react';
import spinner from '../../assets/spinner.svg';
import styles from './loading.module.scss';
import { CircularProgress } from '@mui/material';

interface LoadingProps {
  loading?: boolean;
  type?: 'spinner' | 'progress';
  value?: number;
}

/**
 * A loading component.
 * @param {LoadingProps} props - The props for the component.
 */
const Loading: FC<LoadingProps> = (props) => {
  const { loading = true, type = 'spinner', value = 0 } = props;
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

  const getLoader = () => {
    switch (type) {
      case 'spinner':
        return <img src={spinner} alt={loading ? 'Loading...' : 'Loaded!'} className={styles.spinner} />;
      case 'progress':
        return <CircularProgress size={loaderSize} color="inherit" value={value} />;
      default:
        return <img src={spinner} alt={loading ? 'Loading...' : 'Loaded!'} className={styles.spinner} />;
    }
  };

  return <div className={styles.loadingScreen}>{loading && getLoader()}</div>;
};

export { Loading, LoadingProps };
