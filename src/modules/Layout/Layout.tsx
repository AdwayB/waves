import { useSelector } from 'react-redux';
import { Sidebar } from '../../components';
import { isAuth } from '../../helpers';
import { NestedRoutes } from '../../routes';
import styles from './layout.module.scss';
import { selectCurrentUserType } from '../../redux';
import { FC } from 'react';

const AppLayout: FC = () => {
  const userType = useSelector(selectCurrentUserType) as 'Admin' | 'User';

  return (
    <div className={styles.appLayout}>
      <div className={styles.sidebar}>
        <Sidebar userType={userType} />
      </div>
      <div className={styles.main}>
        <NestedRoutes />
      </div>
    </div>
  );
};

const Layout = isAuth(AppLayout);
export { Layout };
