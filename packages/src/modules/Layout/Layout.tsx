import { Sidebar } from '../../components';
import { isAuth } from '../../helpers';
import { NestedRoutes } from './NestedRoutes';
import styles from './layout.module.scss';

const AppLayout = () => {
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

const Layout = isAuth(AppLayout);
export { Layout };
