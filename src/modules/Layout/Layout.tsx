import { Sidebar } from '../../components';
import { getCookie, isAuth } from '../../helpers';
import { NestedRoutes } from '../../routes';
import styles from './layout.module.scss';

const getUserType = () => {
  return getCookie('type') as 'Admin' | 'User';
};

const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <div className={styles.sidebar}>
        <Sidebar userType={getUserType()} />
      </div>
      <div className={styles.main}>
        <NestedRoutes />
      </div>
    </div>
  );
};

const Layout = isAuth(AppLayout);
export { Layout };
