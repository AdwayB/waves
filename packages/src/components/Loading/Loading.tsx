import { FC } from 'react';
import spinner from '../../assets/spinner.svg';
import styles from './loading.module.scss';

interface LoadingProps {
  loading?: boolean;
}

/**
 * A loading component.
 * @param {LoadingProps} props - The props for the component.
 */
const Loading: FC<LoadingProps> = (props) => {
  const { loading = true } = props;

  return (
    <div className={styles.loadingScreen}>
      <img src={spinner} alt={loading ? 'Loading...' : 'Loaded!'} className={styles.spinner} />
    </div>
  );
};

export { Loading, LoadingProps };
