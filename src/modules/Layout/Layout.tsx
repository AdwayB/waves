import { useSelector } from 'react-redux';
import { Sidebar } from '../../components';
import { isAuth } from '../../helpers';
import { NestedRoutes } from '../../routes';
import styles from './layout.module.scss';
import { selectCurrentUser } from '../../redux';
import { FC } from 'react';

const AppLayout: FC = () => {
  const userName = useSelector(selectCurrentUser)?.LegalName;

  return (
    <div className={styles.appLayout}>
      <div className={styles.sidebar}>
        <Sidebar userName={userName} />
      </div>
      <div className={styles.main}>
        <NestedRoutes />
      </div>
    </div>
  );
};

const Layout = isAuth(AppLayout);
export { Layout };
