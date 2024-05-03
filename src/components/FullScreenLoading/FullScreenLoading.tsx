import { FC } from 'react';
import styles from './fullScreenLoading.module.scss';
import { Loading } from '../Loading';

const FullScreenLoading: FC = () => {
  return (
    <div className={styles.fullScreenLoading}>
      <Loading />
    </div>
  );
};

export { FullScreenLoading };
