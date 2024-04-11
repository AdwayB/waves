import { Sidebar } from '../../components';
import { NestedRoutes } from './NestedRoutes';
import styles from './layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.appLayout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <NestedRoutes />
      </div>
    </div>
  );
};

export { Layout };
